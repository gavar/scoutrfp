import HtmlWebpackPlugin from "html-webpack-plugin";
import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";

export interface HtmlOptions extends HtmlWebpackPlugin.Options {

}

export class HtmlConfigurer implements WebpackExtension {

  constructor(options: WebpackExtensionOptions<HtmlOptions>) {
    this.options = options;
  }

  /** Configuration options. */
  public options: WebpackExtensionOptions<HtmlOptions>;

  /** @inheritDoc */
  install(context: WebpackContext): void {
    const {config, argv} = context;
    const optimize = (config.mode || argv.mode) === "production";
    const options: HtmlOptions = {
      inject: true,
      minify: optimize && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      ...context.options(this.options),
    };

    // plugins
    context.plugin(new HtmlWebpackPlugin(options));
  }
}
