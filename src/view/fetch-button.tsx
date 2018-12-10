import { Button, CircularProgress, createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React, { MouseEventHandler } from "react";

const styles = (theme: Theme) => createStyles({
  root: {
    width: 150,
  },
  progress: {
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.primary.contrastText,
  },
});

export interface FetchButtonProps extends WithStyles<typeof styles> {
  onClick?: MouseEventHandler<HTMLElement>
  className?: string;
  fetching?: boolean;
}

export function FetchButton(props: FetchButtonProps) {
  const {classes, fetching, onClick} = props;
  const className = classNames(classes.root, props.className);
  const content = fetching ? [
    "Loading",
    <CircularProgress
      key="1"
      className={classes.progress}
      variant="indeterminate"
      size={20}
    />] : "Refresh";

  return <Button
    mini={true}
    color="primary"
    variant="contained"
    className={className}
    onClick={onClick}>
    {content}
  </Button>;
}

export const FetchButtonStyled = withStyles(styles)(FetchButton);
