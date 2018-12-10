import Jasmine from "jasmine";
import JasmineConsoleReporter from "jasmine-console-reporter";
import path from "path";
import yargs from "yargs";
import { JSDOM } from "jsdom";

const args = yargs.options({
  reporter: {type: "string"},
}).parse();

function reporter() {
  if (args.reporter) {
    const file = args.reporter;
    const Reporter = require(file);
    return new Reporter();
  }

  return new JasmineConsoleReporter({
    colors: 2,
    cleanStack: 1,
    verbosity: 4,
    listStyle: "indent",
    activity: true,
    emoji: false,
    beep: false,
  });
}

const jasmine = new Jasmine({});
jasmine.projectBaseDir = path.resolve(".");
jasmine.addReporter(reporter());

// INITIALIZE ENV
console.log("initializing environment...");
process.env.NODE_ENV = "test";

// INITIALIZE DOM
console.log("initializing DOM...");
const env = global as any;
const {window} = new JSDOM("<!doctype html><html><body></body></html>");
window.fetch = require("node-fetch");
require("raf/polyfill");
Object.defineProperties(env, {
  ...Object.getOwnPropertyDescriptors(window),
  ...Object.getOwnPropertyDescriptors(env),
});
Object.defineProperties(window, {
  ...Object.getOwnPropertyDescriptors(env),
  ...Object.getOwnPropertyDescriptors(window),
});

// FIND SPECS
console.log("resolving specs...");
jasmine.addSpecFiles([
  "src/**/*.spec.ts?(x)",
]);
console.log(jasmine.specFiles);

// LOAD
console.log("loading specs...");
jasmine.loadSpecs();

// RUN
console.log("running tests...");
export = jasmine.execute();
