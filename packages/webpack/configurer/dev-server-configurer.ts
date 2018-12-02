import { Stats } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";

// @ts-ignore: TS2430
export interface DevServerOptions extends WebpackDevServer.Configuration {
  stats?: Stats.ToStringOptions & object;
}

/** Configures webpack dev server. */
export class DevServerConfigurer implements WebpackExtension {

  constructor(options?: WebpackExtensionOptions<DevServerOptions>) {
    this.options = options;
  }

  /** Configuration options. */
  public options?: WebpackExtensionOptions<DevServerOptions>;

  /** @inheritDoc */
  install(context: WebpackContext): void {
    const {config} = context;

    // options
    const options: DevServerOptions = {
      hot: true,
      inline: true,
      contentBase: context.config.output.path,
      ...context.options(this.options),
    };

    // stats
    options.stats = {
      colors: true,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false,
      hash: false,
      modules: false,
      version: false,
      ...options.stats,
    };

    // apply options
    config.devServer = {
      ...config.devServer,
      ...options as any,
    };
  }
}
