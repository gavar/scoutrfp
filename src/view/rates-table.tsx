import { setDefaultProps } from "$/core";
import { Rate } from "$/state";
import {
  createStyles,
  Paper,
  StyledComponentProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  withStyles,
} from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) => createStyles({});

export interface RatesTableProps extends StyledComponentProps<keyof typeof styles> {
  rates: Rate[];
}

setDefaultProps(RatesTable, {
  rates: [],
});

function RatesTable(props: RatesTableProps) {
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

export default withStyles(styles)(RatesTable);
