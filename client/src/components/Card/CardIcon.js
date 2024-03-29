// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/icons
// core components
import styles from "components/Card/card/cardIconStyle.js";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(styles);

export default function CardIcon(props) {
    const classes = useStyles();
    const { className, children, color, ...rest } = props;
    const cardIconClasses = classNames({
        [classes.cardIcon]: true,
        [classes[color + "CardHeader"]]: color,
        [className]: className !== undefined,
    });
    return (
        <div className={cardIconClasses} {...rest}>
            {children}
        </div>
    );
}

CardIcon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(["warning", "success", "danger", "info", "primary", "rose"]),
    children: PropTypes.node,
};
