import { setDefaultProps } from "$/core";
import { Rate } from "$/state";
import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) => createStyles({});

export interface RatesTableProps extends WithStyles<typeof styles> {
  rates: Rate[];
}

setDefaultProps(RatesTableView, {
  rates: [],
});

function RatesTableView(props: RatesTableProps) {
  const {rates} = props;
  const rows = rates.map(RatesTableRow);

  return <Paper>
    <Table>
      <TableBody>
        {rows}
      </TableBody>
    </Table>
  </Paper>;
}

function RatesTableRow(props: Rate) {
  const {quote, rate} = props;
  return <TableRow key={quote}>
    <TableCell>{quote}</TableCell>
    <TableCell numeric>{rate.toFixed(5)}</TableCell>
  </TableRow>;
}

export const RatesTable = withStyles(styles)(RatesTableView);
