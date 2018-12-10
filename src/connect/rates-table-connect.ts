import { StoreState } from "$/store";
import { RatesTable } from "$/view";
import { connect } from "react-redux";

function stateToProps(state: StoreState) {
  const {fetching, rates, error} = state.exchange.latest;
  return {fetching, rates, error};
}

export const RatesTableConnect = connect(stateToProps)(RatesTable);
