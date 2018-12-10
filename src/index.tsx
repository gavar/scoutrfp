import React from "react";
import { render } from "react-dom";
import { configureStore } from "./store";

declare const module: {
  hot: any;
};

const PRODUCTION = process.env.NODE_ENV === "production";
const store = configureStore();

// root HTML element
const root = document.createElement("div");
root.className = "root";

// initial render
const {Entry} = require("./entry");
render(<Entry store={store}/>, root);
document.body.appendChild(root);

// configuring HMR
if (!PRODUCTION && module.hot) {
  module.hot.accept("./entry.tsx", function () {
    const {Entry} = require("./entry");
    render(<Entry store={store}/>, root);
  });
}
