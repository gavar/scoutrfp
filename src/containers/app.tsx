import { exchange } from "$/actions";
import { RatesConnect } from "$/connect";
import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { Header } from "./header";

export interface AppProps extends DispatchProp {

}

export class AppView extends Component<AppProps> {

  componentDidMount(): void {
    const {dispatch} = this.props;
    dispatch(exchange.latest.fetch() as any);
  }

  render() {
    return <Paper>
      <Header/>
      <RatesConnect/>
    </Paper>;
  }
}

export const App = connect()(AppView);
