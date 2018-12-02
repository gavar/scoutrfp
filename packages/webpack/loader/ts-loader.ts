import { Options } from "ts-loader";
import { RuleSetLoader, RuleSetRule } from "webpack";

export interface TsLoaderOptions extends Options {

}

export function tsLoader(options: TsLoaderOptions, hmr: boolean): RuleSetRule {
  // defaults
  options = {
    logLevel: "INFO",
    transpileOnly: true,
    ...options,
  };

  // react-hot-loader
  let babelLoader: RuleSetLoader;
  if (hmr) {
    console.log("[TS]: enabling react-hot-loader");
    options.compilerOptions = {
      ...options.compilerOptions,
      target: "es5" as any,
    };
    babelLoader = {
      loader: "babel-loader",
      options: {
        babelrc: false,
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
        ],
        plugins: [
          "react-hot-loader/babel",
        ],
      },
    };
  }

  // ts-loader
  const tsLoader: RuleSetLoader = {
    loader: "ts-loader",
    options,
  };

  return {
    test: /\.(jsx?|tsx?)$/,
    use: [
      babelLoader,
      tsLoader,
    ].filter(identity),
    exclude: /node_modules/,
  };
}

function identity(value) {
  return value;
}
