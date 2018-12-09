import React from "react";
import { render } from "react-dom";
import { Entry } from "./entry";

declare const module: {
  hot: any;
};

const PRODUCTION = process.env.NODE_ENV === "production";

// HMR
if (!PRODUCTION && module.hot) {
  console.warn("using HMR for the react rendering");
  // create root element for HMR support
  const root = document.createElement("div");
  root.className = "hmr";

  // initial render
  $render();
  document.body.appendChild(root);

  // configuring HMR
  module.hot.accept("./entry.tsx", $render);
  function $render() { render(<Entry/>, root); }
} else {
  // fragment flattens structure of the application root
  const root = document.createDocumentFragment() as any;
  render(<Entry/>, root);
  document.body.appendChild(root);
}
