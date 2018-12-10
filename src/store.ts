import { LatestState } from "$/state";
import { applyMiddleware, createStore, DeepPartial } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { configureContext, Context } from "./context";
import { configureReducer } from "./reducer";

const PRODUCTION = process.env.NODE_ENV === "production";
const DEVELOPMENT = !PRODUCTION;

/** Default application store state type definition. */
export type StoreState = {
  exchange: {
    latest: LatestState,
  }
};

/**
 * Create and configure application state store.
 * Provides {@link Context} as an extra argument of "redux-thunk".
 * @param initialState - initial store state.
 * @see https://redux.js.org/recipes/configuringyourstore
 */
export function configureStore(initialState?: DeepPartial<StoreState>) {
  const context = configureContext();
  const middleware = [
    DEVELOPMENT && createLogger(),
    thunk.withExtraArgument(context),
  ].filter(x => x);

  const middlewareEnhancer = applyMiddleware(...middleware);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const reducer = configureReducer();
  const store = createStore(reducer, initialState, composedEnhancers);
  return store;
}
