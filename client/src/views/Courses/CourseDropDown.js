import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore, MenuBookRounded } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

const styles = (theme) => ({
    container: {
        marginTop: "10px",
    },
    root: {
        minWidth: 275,
    },
    rootL: {
        width: "100%",
        backgroundColor: "#fafafa",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    description: {
        fontSize: 20,
    },
    credits: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

const useStyles = makeStyles(styles);

function CourseDropDown({ title, courses }) {
    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.rootL}
        >
            <ListItem button onClick={handleClick}>
                <ListItemText primary={title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {courses.map((c) => {
                        return (
                            <NavLink to={`/courses/${c.code}`}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <MenuBookRounded />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${c.code} - ${c.name}`}
                                    />
                                </ListItem>
                            </NavLink>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}

export default CourseDropDown;
