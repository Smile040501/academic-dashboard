import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { ArrowBack } from "@material-ui/icons";
import Menu from "@material-ui/icons/Menu";

import styles from "components/Navbars/headerStyle.js";
import NavHead from "./NavHead";

import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "redux/actions/heading";
import { headingSelector } from "redux/selector";

const useStyles = makeStyles(styles);

function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    const { routes } = props;
    const heading = useSelector(headingSelector);
    const dispatch = useDispatch();

    const isRouteWithParam = useCallback(() => {
        const url = history.location.pathname;
        for (const route of routes) {
            if (route.routeWithParams) {
                for (const routeWithParam of route.routeWithParams) {
                    const newUrl =
                        route.path +
                        routeWithParam.path.replace(/\/[^/]*$/, "/.+");
                    if (url.match(newUrl)) {
                        return {
                            match: true,
                            rootPath: route.path,
                        };
                    }
                }
            }
        }
        return {
            match: false,
        };
    }, [history, routes]);

    const makeBrand = useCallback(() => {
        let name = "";
        routes.map((prop) => {
            let url = history.location.pathname;
            let routeWithParam = isRouteWithParam();
            if (routeWithParam.match) {
                name = (
                    <ArrowBack
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push(routeWithParam.rootPath)}
                    />
                );
            } else if (url.indexOf(prop.path) !== -1) {
                name = (
                    <h4>
                        <b>{prop.name}</b>
                    </h4>
                );
            }
            return null;
        });
        dispatch(setHeading(name));
    }, [history, isRouteWithParam, routes, dispatch]);

    React.useEffect(() => {
        // makeBrand();
    }, [routes, history.location.pathname, makeBrand, dispatch]);

    const { color } = props;
    const appBarClasses = classNames({
        [" " + classes[color]]: color,
    });
    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <NavHead heading={heading} />
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    handleDrawerToggle: PropTypes.func,
    routes: PropTypes.arrayOf(PropTypes.object),
};

export default Header;
