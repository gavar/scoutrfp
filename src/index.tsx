import { configureStore } from "$store";
import React from "react";
import { render } from "react-dom";

declare const module: {
  hot: any;
};

const PRODUCTION = process.env.NODE_ENV === "production";
const store = configureStore();

// HMR
if (!PRODUCTION && module.hot) {
  console.warn("using HMR for React");
  // create root element for HMR support
  const root = document.createElement("div");
  root.className = "hmr";

  // initial render
  const {Entry} = require("./entry");
  render(<Entry store={store}/>, root);
  document.body.appendChild(root);

  // configuring HMR
  module.hot.accept("./entry.tsx", function () {
    const {Entry} = require("./entry");
    render(<Entry store={store}/>, root);
  });
} else {
  // fragment flattens structure of the application root
  const root = document.createDocumentFragment() as any;
  const {Entry} = require("./entry");
  render(<Entry store={store}/>, root);
  document.body.appendChild(root);
}
