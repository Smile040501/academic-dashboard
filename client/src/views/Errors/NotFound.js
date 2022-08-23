import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import RegularButton from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import VerticalSpacing from "components/Spacing/VerticalSpacing";

import notfound from "assets/svg/404.svg";

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

export default function NotFound() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <GridContainer style={{ width: "100%", height: "100%" }}>
            <VerticalSpacing spacing={100} />
            <GridItem xs={12} className={classes.center}>
                <img
                    alt={"Page Not Found!"}
                    className={classes.image}
                    src={notfound}
                />
            </GridItem>
            <VerticalSpacing spacing={50} />
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
            </GridItem>
        </GridContainer>
    );
}
