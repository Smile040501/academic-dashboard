import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, ThumbUpAltOutlined } from "@material-ui/icons";

import Button from "components/CustomButtons/Button.js";
import styles from "components/Navbars/headerLinksStyle.js";

import { authLogout, setLogin } from "redux/actions/auth";
import { openSnackbar } from "redux/actions/snackbar";
import { loginSelector } from "redux/selector";
import { baseDomainURL } from "services/config";
import { getBase64 } from "services/file";
import { getLoggedInUser, updateProfile } from "services/profile";

const useStyles = makeStyles(styles);
const API = {
    updateProfile,
    getLoggedInUser,
};

function AdminNavbarLinks() {
    const classes = useStyles();
    const history = useHistory();
    const loggedIn = useSelector(loginSelector);
    const dispatch = useDispatch();

    function logout() {
        history.push("/logout");
        dispatch(setLogin(false));
        dispatch(authLogout());
    }

    function handleLogout() {
        dispatch(
            openSnackbar({
                message: "Successfully Logged Out!",
                icon: ThumbUpAltOutlined,
                color: "success",
            })
        );
        logout();
    }

    return (
        <div>
            <div className={classes.manager}>
                {loggedIn && (
                    <div className={classes.item}>
                        <Button
                            color="white"
                            onClick={handleLogout}
                            simple
                            className={classes.buttonLink}
                            disableRipple
                        >
                            <ExitToApp />
                            <p className={classes.linkText}>Logout</p>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminNavbarLinks;
