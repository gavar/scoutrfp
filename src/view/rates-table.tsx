import { setDefaultProps } from "$/core";
import { Rate } from "$/state";
import { createStyles, Paper, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { Alert } from "./alert";

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
  error?: Error;
  rates: Rate[];
  fetching: boolean;
}

setDefaultProps(RatesTableView, {
  rates: [],
});

function RatesTableView(props: RatesTableProps) {
  const {classes} = props;
  const content = RatesTableContent(props);
  return <Paper className={classes.root}>
    {content}
  </Paper>;
}

function RatesTableContent(props: RatesTableProps) {
  const {error, rates, fetching} = props;
  if (error)
    return <Alert error={error}/>;

  if (fetching) return <Typography>
    Loading exchange rates...
  </Typography>;

  if (rates && rates.length > 0)
    return rates.map(RatesTableRow, props);

  return <Typography>
    No exchange rates to show.
  </Typography>;
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
