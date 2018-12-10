import { configureStore, StoreState } from "$/store";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { render } from "react-testing-library";
import { DeepPartial, Store } from "redux";

/**
 * Handy function to render "redux" connected component.
 * @param ui - component to provide with a store.
 * @param state - store initial state state.
 * @param store - store to supply for the given component.
 */
export function renderWithRedux(ui: ReactElement<any>,
                                state: DeepPartial<StoreState> = {},
                                store: Store<StoreState> = configureStore(state)) {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>,
  );
}
