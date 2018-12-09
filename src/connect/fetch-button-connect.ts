import { StoreState } from "$/store";
import { FetchButton } from "$/view";
import { exchange } from "$actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

function stateToProps(state: StoreState) {
  const {exchange} = state;
  const {latest} = exchange;
  const {fetching} = latest;
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
)(FetchButton);
