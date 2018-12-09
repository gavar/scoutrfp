import { App } from "$/containers";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

export interface EntryProps {
  store: Store,
}

/** Application entry point. */
export function Entry({store}: EntryProps) {
  return <Provider store={store}>
    <App/>
  </Provider>;
}
