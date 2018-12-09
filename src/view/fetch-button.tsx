import { Button, CircularProgress, createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import React, { MouseEventHandler } from "react";

const styles = (theme: Theme) => createStyles({
  root: {
    width: 100,
  },
  progress: {
    color: theme.palette.primary.contrastText,
  },
});

export interface FetchButtonProps extends WithStyles<typeof styles> {
  onClick?: MouseEventHandler<HTMLElement>
  className?: string;
  fetching?: boolean;
}

export function FetchButtonView(props: FetchButtonProps) {
  const {classes, fetching, onClick} = props;
  const className = classNames(classes.root, props.className);
  const content = fetching ? <CircularProgress
    className={classes.progress}
    variant="indeterminate"
    size={20}
  /> : "Refresh";

  return <Button
    mini={true}
    color="primary"
    variant="contained"
    className={className}
    onClick={onClick}>
    {content}
  </Button>;
}

export const FetchButton = withStyles(styles)(FetchButtonView);
