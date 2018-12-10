import { isFunction, Newable, Type, TypeDef } from "$/lang";
import { Logger, logging } from "$/logger";
import { Tapable } from "tapable";
import { Configuration, Entry, Output, ResolvePlugin, RuleSetRule } from "webpack";
import { WebpackArgv } from "./webpack-argv";
import { WebpackEnv } from "./webpack-env";
import { WebpackExtension } from "./webpack-extension";
import { WebpackFactory } from "./webpack-factory";

/**
 * Configuration hook provided by {@link WebpackContext#boot} to easily setup webpack.
 */
export interface WebpackBoot {
  (context: WebpackContext): void | Promise<void>;
}

/**
 * Represents function that provides some value by evaluating webpack context.
 */
export interface WebpackProvider<T> {
  (context: WebpackContext): T;
}

/**
 * Webpack configuration utility provide easy way to modularize webpack configuration process.
 */
@logging
export class WebpackContext {

  /**
   * Create function that should be execute by webpack.
   * @param setup - function providing possibility to install extensions into a configurer.
   * @returns function to return as webpack configuration result.
   */
  public static boot(setup: WebpackBoot): WebpackFactory {
    return async function (env: WebpackEnv, argv: WebpackArgv): Promise<Configuration> {
      const context = new WebpackContext(setup);
      return context.configure(env, argv);
    };
  }

  protected readonly boot: WebpackBoot;
  protected readonly logger: Logger;
  protected readonly entries: WebpackConfigurerEntry[] = [];

  public env: WebpackEnv;
  public argv: WebpackArgv;
  public config: Configuration;
  public isDevServer: boolean;

  public readonly module: ModuleSyntax;
  public readonly resolve: ResolveSyntax;

  constructor(boot?: WebpackBoot) {
    this.boot = boot;
    this.module = new ModuleSyntax(this);
    this.resolve = new ResolveSyntax(this);
  }

  /** Whether configured to run in production mode. */
  get production() {
    return this.config.mode === "production";
  }

  /**
   * Sets value of {@link webpack#Configuration#entry}.
   * @param value - entry to use.
   */
  entry(value: string | Entry) {
    this.config.entry = value;
  }

  /**
   * Applies given value to existing {@link webpack#Configuration#output}.
   * @param value - output values to apply.
   */
  output(value: Partial<Output>) {
    if (value) {
      const config = this.config;
      if (config.output) Object.apply(config.output, value);
      else config.output = {...value};
    }
  }

  /**
   * Adds a plugin to {@link webpack#Configuration#plugins}.
   * @param plugin - plugin to add.
   */
  plugin(plugin: Tapable.Plugin): void {
    this.config.plugins.push(plugin);
  }

  /**
   * Resolve the option from the given object or provider.
   * @param value - object or provider to resolve to an actual options value.
   */
  options<T>(value: T | WebpackProvider<T>): T {
    return (value instanceof Function)
      ? value(this)
      : value
      ;
  }

  /**
   * Configure to use provided extension while configuring resulting configuration object.
   * @param extension - extension instance to install while configuration.
   */
  extension(extension: WebpackExtension): void;

  /**
   * Configure to use provided extension while configuring resulting configuration object.
   * @param type - type of the extension that will be lazily instantiate and install while configuration.
   * @param options - options to pass when instantiating extension.
   */
  extension<T = void>(type: Newable.$1<WebpackExtension, T>, options?: T): void;

  /** @private */
  extension<T>(extension, options?: T): void {
    const entry = new WebpackConfigurerEntry(extension, options);
    this.entries.push(entry);
  }

  /**
   * Apply the given extension by calling {@link WebpackExtension#install} with this context.
   * @param extension - extension to apply.
   */
  install(extension: WebpackExtension): Promise<void>;

  /**
   * Apply an extension of the given type by calling {@link WebpackExtension#install} with this context.
   * @param type - type of the extension to install.
   * @param options - options to pass to extension.
   */
  install<T = void>(type: Newable.$1<WebpackExtension, T>, options?: T): Promise<void>;

  /** @private */
  async install<T = void>(extension, options?: T): Promise<void> {
    const entry = new WebpackConfigurerEntry(extension, options);
    this.logger.info("installing webpack extension: '%s'", entry.name);
    await entry.resolve().install(this);
  }

  /**
   * Create configuration object by installing all extension.
   * @param env - webpack environment options.
   * @param argv - webpack arguments.
   */
  async configure(env: WebpackEnv, argv: WebpackArgv): Promise<Configuration> {
    try {
      this.logger.info("configuring webpack");
      this.initialize(env, argv);
      if (this.boot) await this.boot(this);

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.entries.length; i++) {
        const entry = this.entries[i];
        this.logger.info("installing webpack extension: '%s'", entry.name);
        const extension = entry.resolve();
        await extension.install(this);
      }

      this.logger.info("webpack configuration complete");
      return this.config;
    }
    finally {
      this.finalize();
    }
  }

  private initialize(env: WebpackEnv, argv: WebpackArgv): void {
    this.env = env;
    this.argv = argv;
    this.config = defaultConfig(argv);
    this.isDevServer = isDevServer();
  }

  private finalize(): void {
    this.env = null;
    this.argv = null;
    this.config = null;
    this.isDevServer = null;
  }
}

class ModuleSyntax {
  public readonly context: WebpackContext;

  constructor(context: WebpackContext) {
    this.context = context;
  }

  rule(rule: RuleSetRule): void {
    this.context.config.module.rules.push(rule);
  }
}

class ResolveSyntax {
  public readonly context: WebpackContext;

  constructor(context: WebpackContext) {
    this.context = context;
  }

  extension(...extensions: string[]): void {
    const array = this.context.config.resolve.extensions;
    array.push.apply(array, extensions);
  }

  plugin(plugin: ResolvePlugin): void {
    const array = this.context.config.resolve.plugins;
    array.push(plugin);
  }
}

class WebpackConfigurerEntry<T = any> {

  name: string;
  type: TypeDef<WebpackExtension>;
  options: T;
  extension: WebpackExtension;

  constructor(value: WebpackExtension | Newable.$1<WebpackExtension, T>, options?: T) {
    if (isFunction(value)) {
      this.type = value as Newable<WebpackExtension, T>;
      this.options = options;
    }
    else {
      this.type = Type.of(value);
      this.extension = value;
    }

    this.name = Type.name(this.type);
  }

  resolve(): WebpackExtension {
    if (this.extension)
      return this.extension;

    const ctor = this.type as Newable.$1<WebpackExtension, T>;
    this.extension = new ctor(this.options);
    return this.extension;
  }
}

function defaultConfig(argv: WebpackArgv): Configuration {
  const {NODE_ENV} = process.env;
  const production = NODE_ENV === "production" || argv.mode === "production";
  return {
    mode: production ? "production" : "development",
    plugins: [],
    module: {
      rules: [],
    },
    resolve: {
      extensions: [],
      plugins: [],
    },
  };
}

function isDevServer(): boolean {
  for (const value of process.argv)
    if (value.includes("webpack-dev-server"))
      return true;

  return false;
}
