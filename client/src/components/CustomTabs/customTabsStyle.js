import { hexToRgb, whiteColor } from "assets/styles/academic-dashboard";

const customTabsStyle = (theme) => ({
    cardTitle: {
        float: "left",
        padding: "10px 10px 10px 0px",
        lineHeight: "24px",
    },
    displayNone: {
        display: "none !important",
    },
    tabsRoot: {
        minHeight: "unset !important",
        overflowX: "visible",
        "& $tabRootButton": {
            fontSize: "0.875rem",
        },
    },
    tabRootButton: {
        minHeight: "unset !important",
        minWidth: "unset !important",
        width: "unset !important",
        height: "40px !important",
        maxWidth: "unset !important",
        maxHeight: "unset !important",
        padding: "10px 15px",
        borderRadius: "8px",
        lineHeight: "24px",
        border: "0 !important",
        color: whiteColor + " !important",
        marginLeft: "4px",
        "&:last-child": {
            marginLeft: "0px",
        },
        [theme.breakpoints.down("sm")]: {
            height: "30px !important",
        },
    },
    tabSelected: {
        backgroundColor: "rgba(" + hexToRgb(whiteColor) + ", 0.2)",
        transition: "0.2s background-color 0.1s",
    },
    tabWrapper: {
        display: "inline-block",
        minHeight: "unset !important",
        minWidth: "unset !important",
        width: "unset !important",
        height: "unset !important",
        maxWidth: "unset !important",
        maxHeight: "unset !important",
        fontWeight: "400",
        fontSize: "12px",
        marginTop: "1px",
        "& > svg,& > .material-icons": {
            verticalAlign: "middle",
            margin: "-1px 5px 0 0 !important",
        },
    },
});

export default customTabsStyle;
