import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { Grow, Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Poppers from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";

import {
    defaultFont,
    hexToRgb,
    primaryBoxShadow,
    primaryColor,
    whiteColor,
} from "assets/styles/academic-dashboard";
import dropdownStyle from "assets/styles/misc/dropdownStyle";

const styles = (theme) => ({
    ...dropdownStyle(theme),
    item: {
        textDecoration: "none",
        "&:hover,&:focus,&:visited,&": {
            color: whiteColor,
        },
    },
    itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)",
    },
    itemText: {
        ...defaultFont,
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: whiteColor,
    },
    popperNav: {
        position: "static !important",
        left: "unset !important",
        top: "unset !important",
        transform: "none !important",
        willChange: "unset !important",
        "& > div": {
            boxShadow: "none !important",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "0px !important",
            marginBottom: "0px !important",
            padding: "0px !important",
            backgroundColor: "transparent !important",
            "& ul li": {
                color: whiteColor + " !important",
                margin: "10px 15px 0!important",
                padding: "10px 15px !important",
                "&:hover": {
                    backgroundColor: "hsla(0,0%,78%,.2)",
                    boxShadow: "none",
                },
            },
        },
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        ...defaultFont,
    },
    purple: {
        backgroundColor: primaryColor[0],
        ...primaryBoxShadow,
        "&:hover,&:focus": {
            backgroundColor: primaryColor[0],
            ...primaryBoxShadow,
        },
    },
});

const useStyles = makeStyles(styles);

const SidebarExpanded = (props) => {
    const classes = useStyles();
    // const {routes, color, root} = props;

    const { routes, color, root } = props;

    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1;
    }

    return (
        <React.Fragment>
            <Poppers
                open={Boolean(props.popperOpen)}
                anchorEl={props.popperOpen}
                transition
                disablePortal
                className={
                    classNames({ [classes.popperClose]: !props.popperOpen }) +
                    " " +
                    classes.popperNav
                }
                keepMounted
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        timeout="auto"
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper>
                            <List role="menu">
                                {routes.map((value, key) => {
                                    let listItemClasses;
                                    listItemClasses = classNames({
                                        [" " + classes[color]]: activeRoute(
                                            root + value.path
                                        ),
                                    });
                                    const whiteFontClasses = classNames({
                                        [" " + classes.whiteFont]: activeRoute(
                                            root + value.path
                                        ),
                                    });
                                    if (value.hidden) return null;
                                    return (
                                        <NavLink
                                            to={root + value.path}
                                            key={key}
                                            className={classes.item}
                                            activeClassName="active"
                                        >
                                            <ListItem
                                                button
                                                className={classNames(
                                                    classes.itemLink,
                                                    listItemClasses
                                                )}
                                            >
                                                <value.icon
                                                    className={classNames(
                                                        classes.itemIcon,
                                                        whiteFontClasses
                                                    )}
                                                />
                                                <ListItemText
                                                    primary={value.name}
                                                    className={classNames(
                                                        classes.itemText,
                                                        whiteFontClasses
                                                    )}
                                                    disableTypography={true}
                                                />
                                            </ListItem>
                                        </NavLink>
                                    );
                                })}
                            </List>
                        </Paper>
                    </Grow>
                )}
            </Poppers>
        </React.Fragment>
    );
};

export default SidebarExpanded;
