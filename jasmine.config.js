const project = "tsconfig.test.json";
process.env.TS_NODE_PROJECT = project;
require("ts-node").register({
  project,
  cache: false,
  typeCheck: false,
  transpileOnly: true,
});
require("tsconfig-paths/register");
require("./jasmine.config.ts");
