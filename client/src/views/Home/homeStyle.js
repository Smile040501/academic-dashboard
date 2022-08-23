import {
    center,
    grayColor,
    hexToRgb,
    successColor,
    whiteColor,
} from "assets/styles/academic-dashboard";

const homeStyle = (theme) => ({
    successText: {
        color: successColor[0],
    },
    upArrowCardCategory: {
        width: "16px",
        height: "16px",
    },
    stats: {
        color: grayColor[0],
        display: "inline-flex",
        fontSize: "12px",
        lineHeight: "22px",
        "& svg": {
            top: "4px",
            width: "16px",
            height: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px",
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            top: "4px",
            fontSize: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px",
        },
    },
    cardCategory: {
        color: grayColor[0],
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        paddingTop: "10px",
        marginBottom: "0",
    },
    cardCategoryWhite: {
        color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitle: {
        color: whiteColor,
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "normal",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: whiteColor,
            fontWeight: "400",
            lineHeight: "1",
        },
    },
    carousel: {
        height: 500,
        width: "70%",
        [theme.breakpoints.down("md")]: {
            height: 400,
            width: "80%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            height: 300,
        },
    },
    center: {
        ...center,
    },
});

export default homeStyle;
