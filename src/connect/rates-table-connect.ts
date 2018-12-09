import { StoreState } from "$/store";
import { RatesTable } from "$/view";
import { connect } from "react-redux";

function stateToProps(state: StoreState) {
  const {rates} = state.exchange.latest;
  return {rates};
}

export const RatesTableConnect = connect(stateToProps)(RatesTable);
