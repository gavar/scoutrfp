import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";
import { svgLoader, SvgLoaderOptions } from "../loader";

export interface SvgOptions {
  loader?: SvgLoaderOptions;
}

export class SvgConfigurer implements WebpackExtension {

  constructor(options: WebpackExtensionOptions<SvgOptions>) {
    this.options = options;
  }

  /** Configuration options. */
  public options?: WebpackExtensionOptions<SvgOptions>;

  /** @inheritDoc */
  install(context: WebpackContext): void {
    // options
    const options: SvgOptions = {
      ...context.options(this.options),
    };

    // loader
    context.module.rule(svgLoader(options.loader));
  }
}
