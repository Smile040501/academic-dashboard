import Grid from "@material-ui/core/Grid";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

const styles = {
    grid: {
        padding: "0 15px !important",
    },
};

const useStyles = makeStyles(styles);

export default function GridItem(props) {
    const classes = useStyles();
    const { children, className: additionalClasses, ...rest } = props;
    return (
        <Grid item {...rest} className={classNames(classes.grid, additionalClasses)}>
            {children}
        </Grid>
    );
}

GridItem.propTypes = {
    children: PropTypes.node,
};
