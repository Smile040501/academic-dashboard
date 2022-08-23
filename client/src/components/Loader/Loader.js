import React from "react";
import { Ellipsis } from "react-css-spinners";
import { makeStyles } from "@material-ui/core/styles";

import { dangerColor, drawerWidth } from "assets/styles/academic-dashboard";

const styles = (theme) => ({
    circularProgress: {
        [theme.breakpoints.up("md")]: {
            marginLeft: `${drawerWidth}px`,
        },
    },
});

const useStyles = makeStyles(styles);

const Loader = () => {
    const classes = useStyles();

    return (
        <Ellipsis
            className={classes.circularProgress}
            color={dangerColor[0]}
            size={100}
        />
    );
};

export default Loader;
