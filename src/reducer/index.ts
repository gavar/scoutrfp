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
