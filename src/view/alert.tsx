import { createStyles, Theme, Typography, withStyles, WithStyles } from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";
import React from "react";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    opacity: 0.95,
    padding: theme.spacing.unit * .5,
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.dark,
    borderRadius: 4,
  },
  heading: {},
  message: {
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

export interface AlertProps extends WithStyles<typeof styles> {
  heading: string,
  message: string,
}

export function AlertView(props: AlertProps) {
  const {classes, heading, message} = props;
  return <div className={classes.root}>
    <ErrorIcon className={classes.icon} fontSize="small"/>
    <Typography className={classes.heading} component="span" color="inherit">
      {heading}
    </Typography>
    <Typography className={classes.message} color="inherit">
      {message}
    </Typography>
  </div>;
}

export const Alert = withStyles(styles)(AlertView);
