import { DevServerOptions } from "$webpack/configurer/dev-server-configurer";
import CleanWebpackPlugin from "clean-webpack-plugin";
import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { EnvironmentPlugin } from "~webpack";
import { DevServerConfigurer, DotEnvConfigurer, DotEnvOptions } from "../configurer";
import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";

export interface CommonPresetOptions {
  /**
   * Whether to clean output directory.
   * @default true
   */
  clean?: boolean;

  /** Options of {@link DotEnvConfigurer}. */
  dotenv?: false | DotEnvOptions;

  /** Options of {@link DevServerConfigurer}. */
  devServer?: false | DevServerOptions
}

/**
 * Preset which configures webpack config defaults and installs useful extension and plugins, like:
 * - {@link EnvironmentPlugin}
 * - {@link CleanWebpackPlugin}
 * - {@link BundleAnalyzerPlugin}
 * - {@link DotEnvConfigurer}
 * - {@link DevServerConfigurer}
 */
export class CommonPreset implements WebpackExtension {

  constructor(options?: WebpackExtensionOptions<CommonPresetOptions>) {
    this.options = options;
  }

  /** Preset options. */
  public options: WebpackExtensionOptions<CommonPresetOptions>;

  /** @inheritDoc */
  async install(context: WebpackContext): Promise<void> {
    // options
    const options: CommonPresetOptions = {
      clean: true,
      ...context.options(this.options),
    };

    const {argv} = context;
    const root = process.cwd();
    const {production} = context;

    // config defaults
    context.config = {
      context: root,
      devtool: production ? false : "source-map",
      ...context.config,
    };

    // output defaults
    context.config.output = {
      path: path.join(root, "dist"),
      ...context.config.output,
    };

    // stats defaults
    context.config.stats = {
      colors: true,
      children: false,
      ...context.config.stats as object,
    };

    const {config} = context;

    // dev server support\
    const {devServer} = options;
    if (devServer !== false)
      if (context.isDevServer)
        await context.install(DevServerConfigurer, devServer);

    // .dotenv
    if (options.dotenv !== false)
      await context.install(DotEnvConfigurer, options.dotenv);

    // clean output directory
    if (options.clean)
      context.plugin(new CleanWebpackPlugin(config.output.path, {
        root,
        verbose: true,
      }));

    // use environment variables
    context.plugin(new EnvironmentPlugin({
        PUBLIC_URL: "./",
        ...process.env,
      }),
    );

    // profile mode
    if (argv.profile)
      context.plugin(new BundleAnalyzerPlugin({
          openAnalyzer: false,
          analyzerMode: "static",
        }),
      );
  }
}
