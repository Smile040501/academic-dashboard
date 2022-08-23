import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    flex: {
        flex: 1,
    },
    brandHead: {
        paddingLeft: 15,
    },
}));

export default function NavHead(props) {
    const classes = useStyles();
    const { heading } = props;

    return (
        <div className={classNames(classes.flex, classes.brandHead)}>
            {heading}
        </div>
    );
}
