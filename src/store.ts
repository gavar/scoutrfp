import { applyMiddleware, createStore, DeepPartial } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { StateType } from "typesafe-actions";
import { configureContext, Context } from "./context";
import { configureReducer, ReducerType } from "./reducer";

/** Default application store state type definition. */
export type StoreState = StateType<ReducerType>;

/**
 * Create and configure application state store.
 * Provides {@link Context} as an extra argument of "redux-thunk".
 * @param initialState - initial store state.
 * @see https://redux.js.org/recipes/configuringyourstore
 */
export function configureStore(initialState?: DeepPartial<StoreState>) {
  const context = configureContext();
  const middlewareEnhancer = applyMiddleware(
    createLogger(),
    thunk.withExtraArgument(context),
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const reducer = configureReducer();
  const store = createStore(reducer, initialState, composedEnhancers);
  return store;
}
