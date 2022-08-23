import { makeStyles } from "@material-ui/core/styles";
import { hexToRgb, whiteColor } from "assets/styles/academic-dashboard";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
    faItemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "23px",
        lineHeight: "20px",
        float: "left",
        marginRight: "18px",
        marginLeft: "2px",
        marginTop: "-2.5px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)",
    },
}));

export default function AddEventsIcon(props) {
    const classes = useStyles();
    return (
        <FontAwesomeIcon className={classes.faItemIcon} icon={faCalendarPlus} />
    );
}
