import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";
import { sassLoader, SassLoaderOptions } from "../loader";

export interface SassOptions {
  output?: MiniCssExtractPlugin.PluginOptions;
  loader?: SassLoaderOptions;
}

export class SassConfigurer implements WebpackExtension {

  constructor(options: WebpackExtensionOptions<SassOptions>) {
    this.options = options;
  }

  /** Configuration options. */
  public options?: WebpackExtensionOptions<SassOptions>;

  /** @inheritDoc */
  install(context: WebpackContext): void {
    // options
    const options: SassOptions = {
      ...context.options(this.options),
    };

    // loader options
    const {isDevServer, production} = context;
    options.loader = {
      hmr: isDevServer,
      context: context.config.context,
      optimize: production,
      production,
      ...options.loader,
    };

    context.module.rule(sassLoader(options.loader));
    context.plugin(new MiniCssExtractPlugin(options.output));
  }
}
