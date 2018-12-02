// tslint:disable:no-submodule-imports

import path from "path";
import postcss from "postcss";
import { declProcessor } from "postcss-url/src/lib/decl-processor";

/**
 * Custom versions of postcss-url giving possibility to specify 'to' directory which is removed by postcss plugin.
 */
export = postcss.plugin("postcss-url", (options: any, toDirectory?: string) => {
  options = options || {};
  return function (styles, result) {
    const opts = result.opts;
    const from = opts.from ? path.dirname(opts.from) : ".";
    const to = toDirectory ? toDirectory : opts.to ? path.dirname(opts.to) : from;
    styles.walkDecls(decl => declProcessor(from, to, options || options, result, decl));
  };
});
