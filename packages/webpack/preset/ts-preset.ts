import { Entry, Output } from "~webpack";
import {
  HtmlConfigurer,
  HtmlOptions,
  SassConfigurer,
  SassOptions,
  SvgConfigurer,
  SvgOptions,
  TsConfigurer,
  TsOptions,
} from "../configurer";
import { WebpackContext, WebpackExtension, WebpackExtensionOptions } from "../core";
import { CommonPreset, CommonPresetOptions } from "./common-preset";

export interface TsPresetOptions {
  entry: string | Entry;
  output: Output;

  ts?: TsOptions;
  svg?: SvgOptions;
  sass?: SassOptions;
  html?: HtmlOptions;
  common?: CommonPresetOptions;
}

/**
 * Preset which covers most common configuration of the app powered by TypeScript language.
 */
export class TsPreset implements WebpackExtension {

  constructor(options?: WebpackExtensionOptions<TsPresetOptions>) {
    this.options = options;
  }

  /** Preset options. */
  public options: WebpackExtensionOptions<TsPresetOptions>;

  /** @inheritDoc */
  async install(context: WebpackContext): Promise<void> {
    const options = context.options(this.options);
    const {entry, output} = options;

    // entry / output
    context.entry(entry);
    context.output(output);

    await context.install(CommonPreset, options.common);
    await context.install(TsConfigurer, options.ts);
    await context.install(SvgConfigurer, options.svg);
    await context.install(SassConfigurer, options.sass);
    await context.install(HtmlConfigurer, options.html);
  }
}
