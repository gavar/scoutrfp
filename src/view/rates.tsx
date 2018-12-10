import { setDefaultProps } from "$/core";
import { Rate } from "$/state";
import { createStyles, Paper, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { AlertStyled } from "./alert";

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[50],
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  },
  status: {
    minHeight: 24,
    marginBottom: theme.spacing.unit,
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
  fetching: boolean;
  updatedAt: Date,
  rates: Rate[];
  error?: Error;
}

setDefaultProps(Rates, {
  rates: [],
});

function Rates(props: RatesTableProps) {
  const {classes} = props;
  const content = RatesContent(props);
  return <Paper className={classes.root}>
    {content}
  </Paper>;
}

function RatesContent(props: RatesTableProps) {
  const {classes} = props;

  const status = <div className={classes.status}>
    {RatesStatusContent(props)}
  </div>;

  return [
    status,
    ...RatesGrid(props),
  ];
}

function RatesStatusContent(props: RatesTableProps) {
  const {fetching, rates, error} = props;
  if (fetching)
    return <Typography>
      Loading exchange rates...
    </Typography>;

  if (error)
    return <AlertStyled
      heading="Error while fetching exchange rates!"
      message={error.message}/>;

  if (!rates || !rates.length)
    return <Typography>
      No exchange rates to show.
    </Typography>;

  return <Typography>
    Latest exchange rates have been successfully fetched.
  </Typography>;
}

function RatesGrid(props: RatesTableProps) {
  const {classes, rates, updatedAt} = props;
  const time = updatedAt &&
    <Typography key="time">
      {updatedAt.toLocaleString("UK")}
    </Typography>;

  const items = rates && rates.length &&
    <div key="items" className={classes.grid}>
      {rates.map(RateItem, props)}
    </div>;

  return [time, items];
}

function RateItem(this: RatesTableProps, props: Rate) {
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

export const RatesStyled = withStyles(styles)(Rates);
