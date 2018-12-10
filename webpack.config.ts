require("tsconfig-paths/register");

import { TsPreset, TsPresetOptions, WebpackContext } from "$/webpack";
import { join } from "path";

const resolve = require.resolve;

export = WebpackContext.boot(function (context: WebpackContext) {
  const root = process.cwd();
  const {isDevServer} = context;

  const options: TsPresetOptions = {
    entry: resolve("src/index.tsx"),
    output: {
      path: join(root, "dist"),
      filename: isDevServer ? "[name].[hash:8].js" : "[name].[contenthash:8].js",
    },
    html: {
      title: "Scout RFP",
      favicon: "assets/favicon.ico",
    },
  };

  context.extension(TsPreset, options);
})
