import { exchange } from "$/actions";
import { RatesConnect } from "$/connect";
import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { HeaderConnect } from "./header";

export interface AppProps extends DispatchProp {

}

export class App extends Component<AppProps> {

  componentDidMount(): void {
    const {dispatch} = this.props;
    dispatch(exchange.latest.fetch() as any);
  }

  render() {
    return <Paper>
      <HeaderConnect/>
      <RatesConnect/>
    </Paper>;
  }
}

export const AppConnect = connect()(App);
