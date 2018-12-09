import { CurrencyCode } from "$/api";
import { FetchButtonConnect } from "$/connect";
import { StoreState } from "$/store";
import { createStyles, Paper, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
  title: {
    width: "100%",
    marginBottom: theme.spacing.unit,
  },
  fetch: {
    margin: "auto",
  },
});

export interface HeaderProps extends WithStyles<typeof styles> {
  base: CurrencyCode,
}

export class HeaderView extends Component<HeaderProps> {

  render() {
    const {classes, base} = this.props;
    return <Paper component="header" className={classes.root}>
      <Typography variant="headline" align="center" className={classes.title}>
        Exchange Rate
      </Typography>

      <Typography variant="subheading" align="center" className={classes.title}>
        Base Currency: <b>{base}</b>
      </Typography>

      <FetchButtonConnect className={classes.fetch}/>
    </Paper>;
  }
}

function stateToProps(state: StoreState) {
  const {base} = state.exchange.latest;
  return {base};
}

export const Header = connect(stateToProps)
(withStyles(styles)(HeaderView));
