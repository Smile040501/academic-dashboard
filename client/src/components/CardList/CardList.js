import { TableContainer } from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
// @material-ui/icons
// core components
import styles from "components/Tasks/tasksStyle";
import React from "react";

export default function CardList(props) {
    const classes = useStyles();
    const { items } = props;
    const tableCellClasses = classes.tableCell;

    return (
        <TableContainer style={{ maxHeight: 300 }}>
            <Table className={classes.table}>
                <TableBody>
                    {items.map((value) => (
                        <TableRow key={value} className={classes.tableRow}>
                            <TableCell className={tableCellClasses}>{value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles(styles);
