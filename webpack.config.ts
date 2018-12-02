import "tsconfig-paths/register";
import { TsPreset, TsPresetOptions, WebpackContext } from "$webpack";
import { join } from "path";

const resolve = require.resolve;

export = WebpackContext.boot(function (context: WebpackContext) {
  const root = process.cwd();
  const {isDevServer, production} = context;
  const hash = production && !isDevServer;

  const options: TsPresetOptions = {
    entry: resolve("src/entry.ts"),
    output: {
      path: join(root, "dist"),
      filename: hash ? "[name].[contenthash:8].js" : "[name].js",
    },
  };

  context.extension(TsPreset, options);
})
