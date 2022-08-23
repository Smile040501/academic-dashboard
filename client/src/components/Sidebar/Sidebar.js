import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Divider } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import SidebarExpanded from "components/Sidebar/SidebarExpanded";
import styles from "components/Sidebar/sidebarStyle.js";

import { isAdminSelector } from "redux/selector";
import { isLoggedIn } from "services/auth";

const useStyles = makeStyles(styles);
const API = {
    isLoggedIn,
};

export default function Sidebar(props) {
    const classes = useStyles();
    const history = useHistory();
    const loggedIn = API.isLoggedIn();
    const [popperOpen, setPopperOpen] = useState(null);
    const [expandedContent, setExpandedContent] = useState(null);
    const isAdmin = useSelector(isAdminSelector);
    const { logo, image, logoText, routes } = props;
    const color = "purple";

    function openPopper(event, data) {
        if (popperOpen && popperOpen.contains(event.target)) {
            setPopperOpen(null);
        } else if (data.expandable) {
            setPopperOpen(event.currentTarget);
            setExpandedContent(data.expandableRoutes);
        }
    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function activeRoute(route) {
        const url = window.location.pathname.toString();
        return url.match(`^${route.path}(/(\\d|)*|)$`);
    }

    const links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                const activePro = " ";
                let listItemClasses;
                listItemClasses = classNames({
                    [" " + classes[color]]: activeRoute(prop),
                });
                const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: activeRoute(prop),
                });
                if (prop.divider) {
                    return <Divider key={key} className={classes.divider} />;
                }
                if ((prop.protected && !loggedIn) || prop.hidden) return null;
                if (!prop.isBoth && prop.isAdmin && !isAdmin) return null;
                if (!prop.isBoth && !prop.isAdmin && isAdmin) return null;

                return (
                    <React.Fragment key={key}>
                        <NavLink
                            to={
                                prop.expandable
                                    ? history.location.pathname
                                    : prop.path
                            }
                            className={activePro + classes.item}
                            activeClassName="active"
                            onClick={(e) => openPopper(e, prop)}
                        >
                            <ListItem
                                button
                                disableRipple={prop.expandable}
                                className={classes.itemLink + listItemClasses}
                            >
                                {typeof prop.icon === "string" ? (
                                    <i
                                        className={classNames(
                                            `fa fa-${prop.icon}`,
                                            classes.faItemIcon,
                                            whiteFontClasses
                                        )}
                                    ></i>
                                ) : (
                                    <prop.icon
                                        className={classNames(
                                            classes.itemIcon,
                                            whiteFontClasses
                                        )}
                                    />
                                )}
                                <ListItemText
                                    primary={prop.name}
                                    className={classNames(
                                        classes.itemText,
                                        whiteFontClasses
                                    )}
                                    disableTypography={true}
                                />
                                {prop.expandable ? (
                                    <ListItemSecondaryAction
                                        onClick={(e) => openPopper(e, prop)}
                                        className={classNames(
                                            classes.itemSecondaryAction,
                                            whiteFontClasses
                                        )}
                                    >
                                        {popperOpen &&
                                        arraysEqual(
                                            expandedContent,
                                            prop.expandableRoutes
                                        ) ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </ListItemSecondaryAction>
                                ) : (
                                    <React.Fragment />
                                )}
                            </ListItem>
                        </NavLink>
                        {popperOpen &&
                        expandedContent &&
                        arraysEqual(expandedContent, prop.expandableRoutes) ? (
                            <SidebarExpanded
                                color={color}
                                root={prop.path}
                                routes={expandedContent}
                                popperOpen={popperOpen}
                            />
                        ) : (
                            <React.Fragment />
                        )}
                    </React.Fragment>
                );
            })}
        </List>
    );
    const brand = (
        <div className={classes.logo}>
            <NavLink
                to="/home"
                className={classNames(classes.logoLink)}
                activeStyle={{
                    color: "white",
                }}
            >
                {/* <div className={classes.logoImage}> */}
                {/* <img src={logo} alt="logo" className={classes.img} /> */}
                {/* </div> */}
                {logoText}
            </NavLink>
        </div>
    );
    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={props.open}
                    classes={{
                        paper: classNames(classes.drawerPaper),
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {links}
                        <AdminNavbarLinks />
                    </div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: "url(" + image + ")" }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    anchor="left"
                    open
                    classes={{
                        paper: classNames(classes.drawerPaper),
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {links}
                        <AdminNavbarLinks />
                    </div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: "url(" + image + ")" }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
        </div>
    );
}

Sidebar.propTypes = {
    handleDrawerToggle: PropTypes.func,
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool,
};
