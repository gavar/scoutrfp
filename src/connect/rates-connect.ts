import { StoreState } from "$/store";
import { RatesStyled } from "$/view";
import { connect } from "react-redux";

function stateToProps(state: StoreState) {
  const {fetching, rates, error, updatedAt} = state.exchange.latest;
  return {fetching, rates, error, updatedAt};
}

export const RatesConnect = connect(stateToProps)(RatesStyled);
