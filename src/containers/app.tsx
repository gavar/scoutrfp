import { exchange } from "$/actions";
import { RatesTableConnect } from "$/connect";
import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";

export interface AppProps extends DispatchProp {

}

export class App extends Component<AppProps> {

  componentDidMount(): void {
    const {dispatch} = this.props;
    dispatch(exchange.latest.fetch() as any);
  }

  render() {
    return <div className="app">
      <RatesTableConnect/>
    </div>;
  }
}

export default connect()(App);
