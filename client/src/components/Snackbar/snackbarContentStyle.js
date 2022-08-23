import {
    blackColor,
    dangerBoxShadow,
    dangerColor,
    defaultFont,
    grayColor,
    hexToRgb,
    infoBoxShadow,
    infoColor,
    primaryBoxShadow,
    primaryColor,
    roseBoxShadow,
    roseColor,
    successBoxShadow,
    successColor,
    warningBoxShadow,
    warningColor,
    whiteColor,
} from "assets/styles/academic-dashboard";

const snackbarContentStyle = (theme) => ({
    root: {
        ...defaultFont,
        flexWrap: "unset",
        position: "relative",
        padding: "10px 10px",
        lineHeight: "20px",
        marginBottom: "20px",
        fontSize: "14px",
        backgroundColor: whiteColor,
        color: grayColor[7],
        borderRadius: "3px",
        minWidth: "unset",
        maxWidth: "unset",
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(whiteColor) +
            ", 0.28), 0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 7px 8px -5px rgba(" +
            hexToRgb(whiteColor) +
            ", 0.2)",
    },
    top20: {
        top: "20px",
    },
    top40: {
        top: "40px",
    },
    info: {
        backgroundColor: infoColor[3],
        color: whiteColor,
        ...infoBoxShadow,
    },
    success: {
        backgroundColor: successColor[3],
        color: whiteColor,
        ...successBoxShadow,
    },
    warning: {
        backgroundColor: warningColor[3],
        color: whiteColor,
        ...warningBoxShadow,
    },
    danger: {
        backgroundColor: dangerColor[3],
        color: whiteColor,
        ...dangerBoxShadow,
    },
    primary: {
        backgroundColor: primaryColor[3],
        color: whiteColor,
        ...primaryBoxShadow,
    },
    rose: {
        backgroundColor: roseColor[3],
        color: whiteColor,
        ...roseBoxShadow,
    },
    close: {
        width: "15px",
        height: "15px",
    },
    iconButton: {
        marginRight: 10,
    },
    infoIcon: {
        color: infoColor[3],
    },
    successIcon: {
        color: successColor[3],
    },
    warningIcon: {
        color: warningColor[3],
    },
    dangerIcon: {
        color: dangerColor[3],
    },
    primaryIcon: {
        color: primaryColor[3],
    },
    roseIcon: {
        color: roseColor[3],
    },
    iconMessage: {
        display: "block",
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
    messageMargin: {
        marginLeft: 10,
    },
    icon: {
        fontSize: 14,
        marginRight: 10,
        width: 20,
        height: 20,
    },
});

export default snackbarContentStyle;
