import { combineReducers } from "redux";

/**
 * Configure application state reducers.
 */
export function configureReducer() {
  return combineReducers({

  });
}

/** Application state reducer type. */
export type ReducerType = ReturnType<typeof configureReducer>;
