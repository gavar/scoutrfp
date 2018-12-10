import { createStyles, Theme, Typography, withStyles, WithStyles } from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";
import React from "react";

const styles = (theme: Theme) => createStyles({
  root: {
    opacity: 0.95,
    padding: theme.spacing.unit * 2,
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.dark,
    borderRadius: 12,
  },
  heading: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

export interface AlertProps extends WithStyles<typeof styles> {
  error?: Error;
}

export function AlertView(props: AlertProps) {
  const {error, classes} = props;
  return <div className={classes.root}>
    <div className={classes.heading}>
      <ErrorIcon className={classes.icon}/>
      <Typography component="span" variant="subheading" color="inherit">
        Unable to fetch latest exchange rates!
      </Typography>
    </div>
    <hr/>
    <Typography color="inherit">
      Error: {error.message}
    </Typography>
  </div>;
}

export const Alert = withStyles(styles)(AlertView);
