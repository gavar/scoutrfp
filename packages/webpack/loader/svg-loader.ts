import { Options } from "svgo";
import { RuleSetRule } from "webpack";

export interface SvgLoaderOptions {
  jsx?: boolean;
  svgo?: Options;
}

export function svgLoader(options?: SvgLoaderOptions): RuleSetRule {
  return {
    test: /\.svg$/,
    loader: "react-svg-loader",
    options,
  };
}
