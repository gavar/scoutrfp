/**
 * Webpack options which describes the options passed to webpack.
 * @see https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 */
export interface WebpackArgv {
  mode: "development" | "production" | "none";
  watch: boolean;
  debug: boolean;
  profile: boolean;
}
