import { faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import { hexToRgb, whiteColor } from "assets/styles/academic-dashboard";
import React from "react";

const useStyles = makeStyles((theme) => ({
    faItemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "23px",
        lineHeight: "20px",
        float: "left",
        marginRight: "13px",
        marginLeft: "2px",
        textAlign: "left",
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)",
        marginTop: 3,
    },
}));

export default function EditEventsIcon(props) {
    const classes = useStyles();
    return (
        <span
            className={classes.faItemIcon}
            style={{ display: "inline-block", position: "relative" }}
        >
            <FontAwesomeIcon
                icon={faCalendar}
                textAnchor="middle"
                alignmentBaseline="middle"
            />
            <FontAwesomeIcon
                icon={faPen}
                textAnchor="middle"
                alignmentBaseline="middle"
                color={"rgba(0, 0, 0)"}
                style={{
                    fontSize: ".4em",
                    position: "absolute",
                    left: ".70em",
                    bottom: "1.05em",
                }}
            />
        </span>
    );
}
