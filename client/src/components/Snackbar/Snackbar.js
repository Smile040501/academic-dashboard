import React, { useCallback, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Snack from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";

import styles from "components/Snackbar/snackbarContentStyle.js";

import { closeSnackbar } from "redux/actions/snackbar";
import { snackbarSelector } from "redux/selector";

const useStyles = makeStyles(styles);

function Snackbar(props) {
    const classes = useStyles();
    const { snackbarProps, snackbarOpen: open } = useSelector(snackbarSelector);
    const dispatch = useDispatch();
    const { message, color, close, icon, place, timeout, closeNotification } = {
        ...snackbarProps,
        ...props,
    };
    const [leftSnack, setLeftSnack] = useState(window.innerWidth < 960);
    let action = [];

    const handleCloseNotification = useCallback(
        (e) => {
            dispatch(closeSnackbar());
            closeNotification(e);
        },
        [closeNotification, dispatch]
    );

    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setLeftSnack(false);
        }
    };

    React.useEffect(() => {
        let timeoutInterval = setTimeout(() => {
            handleCloseNotification("auto_close");
        }, timeout);
        window.addEventListener("resize", resizeFunction);
        return function cleanup() {
            window.removeEventListener("resize", resizeFunction);
            clearTimeout(timeoutInterval);
        };
    }, [handleCloseNotification, timeout]);

    if (close !== undefined) {
        action = [
            <IconButton
                className={classNames(classes.iconButton)}
                key="close"
                aria-label="Close"
                color="inherit"
                disableRipple
                onClick={() => handleCloseNotification("user_close")}
            >
                <Close className={classes.close} />
            </IconButton>,
        ];
    }

    function getVertical() {
        if (!place) return "bottom";
        return place.indexOf("b") === -1 ? "top" : "bottom";
    }

    function getHorizontal() {
        if (!place) {
            if (leftSnack) return "left";
            return "right";
        }
        return place.indexOf("l") === -1
            ? place.indexOf("r") === -1
                ? "center"
                : "right"
            : "left";
    }

    return (
        <Snack
            anchorOrigin={{
                vertical: getVertical(),
                horizontal: getHorizontal(),
            }}
            open={open}
            message={
                <span
                    className={classNames({
                        [classes.message]: true,
                        [classes.messageMargin]: icon === undefined,
                    })}
                >
                    {icon !== undefined ? (
                        <props.icon className={classNames(classes.icon)} />
                    ) : null}
                    {message}
                </span>
            }
            action={action}
            ContentProps={{
                classes: {
                    root: classes.root + " " + classes[color || "success"],
                    message: classes.message,
                },
            }}
        />
    );
}

Snackbar.propTypes = {
    message: PropTypes.node,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    icon: PropTypes.object,
    place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
    open: PropTypes.bool,
    closeNotification: PropTypes.func,
    timeout: PropTypes.number,
};

Snackbar.defaultProps = {
    message: "",
    closeNotification: () => {},
    timeout: 5000,
    close: true,
};

export default Snackbar;
