import { exchange } from "$/actions";
import { Latest } from "$/api";
import { isAction } from "$/core";
import { LatestState, Rate } from "$/state";
import { Action } from "redux";

function requesting(state: LatestState, action: exchange.latest.RequestingAction): LatestState {
  state = {...state};
  state.error = null;
  state.fetching = true;
  return state;
}

function receive(state: LatestState, action: exchange.latest.ReceiveAction): LatestState {
  const {latest} = action;
  state = {...state, ...latest};
  state.fetching = false;
  if (latest.error) {
    state.error = latest.error;
  } else {
    state.error = null;
    state.rates = ratesToArray(latest);
  }

  return state;
}

function ratesToArray({base, rates}: Latest): Rate[] {
  const array: Rate[] = [];
  for (const quote in rates) {
    const rate = rates[quote];
    array.push({base, quote, rate});
  }
  return array;
}

export default function (state: LatestState, action: Action): LatestState {
  // initial state
  state = state || {
    base: "",
    rates: [],
    fetching: false,
  };

  if (isAction(action, exchange.latest.isFetching))
    return requesting(state, action);

  if (isAction(action, exchange.latest.receive))
    return receive(state, action);

  return state;
}