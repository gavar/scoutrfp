import { combineReducers } from "redux";
import exchange from "./exchange";

/**
 * Configure application state reducers.
 */
export function configureReducer() {
  return combineReducers({
    exchange,
  });
}

/** Application state reducer type. */
export type ReducerType = ReturnType<typeof configureReducer>;
