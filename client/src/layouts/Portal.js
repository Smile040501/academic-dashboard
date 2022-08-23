import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "logo.svg";

import Loader from "components/Loader/Loader";
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Snackbar from "components/Snackbar/Snackbar";

import { setLoggedInUser, setLogin, authCheckState } from "redux/actions/auth";
import { isLoggedIn } from "services/auth";
import { baseDomainURL } from "services/config";
import { getLoggedInUser } from "services/profile";
import {
    loadingSelector,
    loginSelector,
    snackbarSelector,
} from "redux/selector";

import NotFound from "views/Errors/NotFound";
import Unauthorized from "views/Errors/Unauthorized";

import routes from "routes.js";
import styles from "./portalStyle.js";

const ProtectedRoute = ({
    component: Component,
    protected: isProtected,
    ...rest
}) => {
    const loggedIn = useSelector(loginSelector);
    return (
        <Route
            {...rest}
            render={(props) => {
                return loggedIn || !isProtected ? (
                    <Component {...props} />
                ) : (
                    <Unauthorized />
                );
            }}
        />
    );
};

const getRoutes = () => {
    let key = 0;
    let allRoutes = [];
    for (let route of routes) {
        allRoutes.push(
            <ProtectedRoute
                exact
                protected={route.protected}
                path={route.path}
                component={route.component}
                key={key++}
            />
        );
        if (route.expandable) {
            for (let additionalRoute of route.expandableRoutes) {
                allRoutes.push(
                    <ProtectedRoute
                        exact
                        protected={additionalRoute.protected}
                        path={route.path + additionalRoute.path}
                        component={additionalRoute.component}
                        key={key++}
                    />
                );
            }
        }
        if (route.withParams) {
            for (let routeWithParam of route.routeWithParams) {
                allRoutes.push(
                    <ProtectedRoute
                        exact
                        protected={routeWithParam.protected}
                        path={route.path + routeWithParam.path}
                        component={routeWithParam.component}
                        key={key++}
                    />
                );
            }
        }
    }
    return allRoutes;
};

// const switchRoutes = () => {

//     console.log(loggedIn);
//     return (
//         <Switch>
//             {!loggedIn && <Redirect from="/" to="/login" />}
//             {getRoutes()}
//             <Route component={NotFound} />
//         </Switch>
//     );
// };

const useStyles = makeStyles(styles);

function Portal({ ...rest }) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const image = bgImage;
    const { snackbarProps, snackbarOpen } = useSelector(snackbarSelector);
    const loggedIn = useSelector(loginSelector);
    const loading = useSelector(loadingSelector);
    const dispatch = useDispatch();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    React.useEffect(() => {
        dispatch(authCheckState());
        // async function getUser() {
        //     let data = await getLoggedInUser();
        //     data.user.profile_pic = `${baseDomainURL}${data.user.profile_pic}`;
        //     dispatch(setLoggedInUser(data));
        // }

        // if (isLoggedIn()) {
        //     dispatch(setLogin(isLoggedIn()));
        //     getUser();
        // }
        window.addEventListener("resize", resizeFunction);
        return function cleanup() {
            window.removeEventListener("resize", resizeFunction);
        };
    }, [dispatch]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />
                <div className={classes.content}>
                    <div className={classes.container}>
                        {/* {switchRoutes} */}
                        <Switch>{!loggedIn && <Redirect to="/login" />}</Switch>
                        <Switch>
                            {getRoutes()}
                            <Route component={NotFound} />
                        </Switch>
                        <Backdrop className={classes.backdrop} open={loading}>
                            <Loader />
                        </Backdrop>
                    </div>
                </div>
                {snackbarOpen ? <Snackbar {...snackbarProps} /> : null}
            </div>
            <Sidebar
                routes={routes}
                logoText={"Academic Dashboard"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                {...rest}
            />
        </div>
    );
}

export default Portal;
