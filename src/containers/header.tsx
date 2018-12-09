import { FetchButtonConnect } from "$/connect";
import { createStyles, Paper, Theme, Typography, WithStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "~@material-ui/core";

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

}

export class HeaderView extends Component<HeaderProps> {

  render() {
    const {classes} = this.props;
    return <Paper component="header" className={classes.root}>
      <Typography variant="headline" align="center" className={classes.title}>
        Exchange Rates
      </Typography>
      <FetchButtonConnect className={classes.fetch}/>
    </Paper>;
  }
}

export const Header = connect()(withStyles(styles)(HeaderView));
