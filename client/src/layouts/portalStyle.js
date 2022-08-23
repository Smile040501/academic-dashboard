import {
    container,
    drawerWidth,
    transition,
} from "assets/styles/academic-dashboard";

const appStyle = (theme) => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh",
    },
    mainPanel: {
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        overflow: "auto",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch",
    },
    content: {
        marginTop: "70px",
        padding: "30px 15px 15px",
        minHeight: "calc(100vh - 123px)",
    },
    container,
    map: {
        marginTop: "70px",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
});

export default appStyle;
