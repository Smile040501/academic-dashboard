// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "components/Typography/typographyStyle.js";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(styles);

export default function Muted(props) {
    const classes = useStyles();
    const { children } = props;
    return <div className={classes.defaultFontStyle + " " + classes.mutedText}>{children}</div>;
}

Muted.propTypes = {
    children: PropTypes.node,
};
