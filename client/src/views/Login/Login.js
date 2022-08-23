import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import GoogleSignIn from "components/Login/GoogleSignIn";

import {
    authSuccess,
    authLogout,
    checkAuthTimeout,
    setLogin,
} from "redux/actions/auth";
import { openSnackbar } from "redux/actions/snackbar";
import { setHeading } from "redux/actions/heading";
import { loginSelector } from "redux/selector";

const useStyles = makeStyles((theme) => ({
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "30px",
    },
    image: {
        height: "auto",
        width: "50%",
        [theme.breakpoints.down("md")]: {
            width: "60%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "70%",
        },
    },
}));

function LoginHead() {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>Login</h4>
        </div>
    );
}

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedIn = useSelector(loginSelector);

    function logout() {
        history.push("/login");
        dispatch(setLogin(false));
        dispatch(authLogout());
    }

    async function handleLoginSuccess({ profile, token, tokenExpiration }) {
        dispatch(setLogin(true));
        dispatch(
            openSnackbar({
                message: "Successfully Logged In!",
                icon: ThumbUpAltOutlined,
                color: "success",
            })
        );
        dispatch(authSuccess(token, profile.email));
        dispatch(checkAuthTimeout(tokenExpiration));
    }

    async function handleLoginFailure(error) {
        if (
            error !== "script_load_error" &&
            error?.error !== "popup_closed_by_user"
        ) {
            dispatch(
                openSnackbar({
                    message: "Login Failed! Please try again.",
                    icon: ThumbDownAltOutlined,
                    color: "danger",
                })
            );
        }
        console.log(error);
        logout();
    }

    React.useEffect(() => {
        dispatch(setHeading(<LoginHead />));
    }, [dispatch]);

    return loggedIn ? (
        <Redirect to="/courses" />
    ) : (
        <GridContainer style={{ width: "100%", height: "100%" }}>
            <VerticalSpacing spacing={100} />
            <GridItem xs={12} className={classes.center}>
                <GoogleSignIn
                    loginSuccess={handleLoginSuccess}
                    loginFailed={handleLoginFailure}
                />
            </GridItem>
            {/* <VerticalSpacing spacing={50} />
            <GridItem xs={12} className={classes.center}>
                The page you were looking for was not found.
            </GridItem>
            <VerticalSpacing spacing={50} />
            <GridItem xs={12} className={classes.center}>
                <RegularButton
                    color={"primary"}
                    round
                    onClick={() => history.push("/")}
                >
                    Home
                </RegularButton>
            </GridItem> */}
        </GridContainer>
    );
}
