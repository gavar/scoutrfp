import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";
import { tsLoader, TsLoaderOptions } from "../loader";

export interface TsOptions {
  hmr?: boolean;
  loader?: TsLoaderOptions;
}

export class TsConfigurer implements WebpackExtension {

  constructor(options?: WebpackExtensionOptions<TsOptions>) {
    this.options = options;
  }

  /** Configuration options. */
  public options?: WebpackExtensionOptions<TsOptions>;

  /** @inheritDoc */
  install(context: WebpackContext): void {
    const {isDevServer, production} = context;

    // options
    const options = {
      loader: {},
      hmr: !production && isDevServer,
      ...context.options(this.options),
    } as TsOptions;

    // rules
    const {hmr, loader} = options;
    context.module.rule(tsLoader(loader, hmr));

    // resolve extensions
    context.resolve.extension(
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
    );

    // resolve plugins
    context.resolve.plugin(
      new TsconfigPathsPlugin({
        logLevel: "INFO",
        configFile: options.loader.configFile,
      }),
    );
  }
}
