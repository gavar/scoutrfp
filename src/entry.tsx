import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";

const store = configureStore();

/** Application entry point. */
export function Entry() {
  return <Provider store={store}>

  </Provider>;
}
