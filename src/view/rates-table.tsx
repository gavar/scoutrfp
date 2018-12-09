import { setDefaultProps } from "$/core";
import { Rate } from "$/state";
import { createStyles, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[50],
  },
  item: {
    margin: theme.spacing.unit * .5,
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
    display: "flex",
  },
  currency: {
    width: 120,
  },
  rate: {
    width: "100%",
    textAlign: "right",
  },
});

export interface RatesTableProps extends WithStyles<typeof styles> {
  rates: Rate[];
}

setDefaultProps(RatesTableView, {
  rates: [],
});

function RatesTableView(props: RatesTableProps) {
  const {classes, rates} = props;
  const rows = rates.map(RatesTableRow, props);

  return <div className={classes.root}>
    {rows}
  </div>;

}

function RatesTableRow(this: RatesTableProps, props: Rate) {
  const {classes} = this;
  const {quote, rate} = props;
  const className = classNames(classes.item);

  return <div key={quote} className={className}>
    <Typography component="span" className={classes.currency}>
      {quote}
    </Typography>
    <Typography component="span" className={classes.rate}>
      {rate.toFixed(5)}
    </Typography>
  </div>;
}

export const RatesTable = withStyles(styles)(RatesTableView);
