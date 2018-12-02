import DotEnvPlugin from "dotenv-webpack";
import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";

export interface DotEnvOptions extends DotEnvPlugin.Options {

}

export class DotEnvConfigurer implements WebpackExtension {

  constructor(options?: WebpackExtensionOptions<DotEnvOptions>) {
    this.options = options;
  }

  /** Configuration options. */
  public options?: WebpackExtensionOptions<DotEnvOptions>;

  /** @inheritDoc */
  install(context: WebpackContext): void {
    // options
    const options: DotEnvOptions = {
      ...context.options(this.options),
    };

    // plugin
    context.plugin(new DotEnvPlugin(options));
  }
}
