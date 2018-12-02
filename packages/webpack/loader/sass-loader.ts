import fs from "fs";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Importer, Options as SassOptions } from "node-sass";
import path, { join } from "path";
import postcssPresetEnv from "postcss-preset-env";
import { ImporterReturnType } from "~node-sass";
import { RuleSetRule } from "~webpack";

/** Default options for 'sass-loader'. */
interface SassOptionsDefaults extends SassOptions {
  /**
   * @inheritDoc
   * @default [`${context}/src`]
   */
  includePaths?: string[];
}

export interface SassLoaderOptions {
  hmr?: boolean;
  context?: string;
  optimize?: boolean;
  outputPath?: string;
  production?: boolean;

  /**
   * Options for 'sass-loader'.
   * @default {@link SassOptionsDefaults}
   */
  sass?: SassOptions;

  /**
   * List of resource to <code>@import</code> into every SASS module.
   * @default null
   */
  resources?: string[];
}

export function sassLoader(options: SassLoaderOptions): RuleSetRule {
  // defaults
  const PRODUCTION = process.env.NODE_ENV === "production";
  options = {
    sass: {},
    production: PRODUCTION,
    optimize: PRODUCTION,
    ...options,
  };

  const {hmr, context, optimize, production, outputPath} = options;

  // postcss-url options
  const urls = [
    // copy asset to destination folder in production
    optimize && {
      url: "copy",
      assetsPath: "img",
      useHash: true,
    },
    // rewrite url in development mode
    !optimize && {
      url: "rebase",
    }];

  // postcss-preset-env
  let postcssPresetEnvOptions = void 0;
  if (!production) postcssPresetEnvOptions = {
    browsers: "last 1 version",
  };

  // postcss-loader
  const postcssLoader = {
    loader: "postcss-loader",
    ident: "postcss",
    options: {
      plugins: (loader) => [
        require("postcss-import")({addDependencyTo: loader}),
        postcssPresetEnv(postcssPresetEnvOptions),
        require("./postcss-url")(urls.filter(identity), outputPath),
        // disable autoprefixer, because it's already included in cssnext
        optimize && require("cssnano")({autoprefixer: false}),
        require("postcss-reporter")({clearReportedMessages: true}),
      ].filter(identity),
    },
  };

  // sass-loader
  const {sass} = options;
  const sassLoader = {
    loader: "sass-loader",
    options: {...sass},
  };

  // sass-resources-loader
  let sassResourceLoader;
  const {resources} = options;
  if (resources && resources.length) {
    sassResourceLoader = {
      loader: "sass-resources-loader",
      options: {resources},
    };
  }

  // css-loader
  const importLoaders = [
    postcssLoader,
    sassLoader,
    sassResourceLoader,
  ].filter(identity);

  const cssLoader = {
    loader: "css-loader",
    options: {
      url: false, // by postcss-url
      import: false, // by postcss-import
      importLoaders: importLoaders.length,
    },
  };

  return {
    test: /\.(sa|sc|c)ss$/,
    use: [
      hmr && "css-hot-loader",
      hmr ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoader,
      ...importLoaders,
    ].filter(identity),
  };
}

function fixImporters(options: SassOptions) {
  const {includePaths, importer} = options;
  if (includePaths && includePaths.length) {
    const array: Importer[] = options.importer = [];
    if (importer instanceof Array) array.push.apply(array, importer);
    else if (importer) array.push(importer as Importer);
    array.push(includePathsImporter(includePaths));
    delete options.includePaths;
  }
}

function includePathsImporter(includePaths: string[]): Importer {
  // super simple importer until sass-loader 'includePaths' wont work again
  return function (url: string, prev: string, done: (data: ImporterReturnType) => void): ImporterReturnType | void {
    const paths = [];
    const dir = path.dirname(url);
    const base = path.basename(url);

    for (const includePath of includePaths) {
      paths.push(join(includePath, dir, `${base}.scss`));
      paths.push(join(includePath, dir, `_${base}.scss`));
    }

    for (const file of paths)
      if (fs.existsSync(file))
        return done({file});

    done(null);
  };
}

function identity(x) {
  return x;
}
