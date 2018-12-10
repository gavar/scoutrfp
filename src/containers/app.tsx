import { exchange } from "$/actions";
import { RatesConnect } from "$/connect";
import { createStyles, Paper, Theme, withStyles, WithStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { HeaderConnect } from "./header";

const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: 1024,
    margin: "auto",
  },
});

export interface AppProps extends DispatchProp, WithStyles<typeof styles> {

}

export class App extends Component<AppProps> {

  componentDidMount(): void {
    const {dispatch} = this.props;
    dispatch(exchange.latest.fetch());
  }

  render() {
    const {classes} = this.props;
    return <Paper className={classes.root}>
      <HeaderConnect/>
      <RatesConnect/>
    </Paper>;
  }
}

const AppStyled = withStyles(styles)(App);
export const AppConnect = connect()(AppStyled);
