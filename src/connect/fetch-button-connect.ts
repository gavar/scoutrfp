import { StoreState } from "$/store";
import { FetchButtonStyled } from "$/view";
import { exchange } from "$actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

function stateToProps(state: StoreState) {
  const {fetching} = state.exchange.latest;
  return {
    fetching,
  };
}

function dispatchToProps(dispatch: Dispatch) {
  return {
    onClick: () => dispatch(exchange.latest.fetch(true)),
  };
}

export const FetchButtonConnect = connect(
  stateToProps,
  dispatchToProps,
)(FetchButtonStyled);
