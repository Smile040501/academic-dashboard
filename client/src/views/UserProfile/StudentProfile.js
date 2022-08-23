import React, { useCallback, useState } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

import { makeStyles } from "@material-ui/core/styles";
import {
    ArrowBack,
    ExpandLess,
    ExpandMore,
    MenuBookRounded,
} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import CourseDropDown from "views/Courses/CourseDropDown";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import { fetchStudent } from "services/student";

import { emailSelector } from "redux/selector";
import { setLoading } from "redux/actions/loading";
import { setHeading } from "redux/actions/heading";

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

function StudentProfileHead() {
    const history = useHistory();

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>My Profile</h4>
        </div>
    );
}

function StudentProfile() {
    const classes = useStyles();
    const [student, setStudent] = useState(null);
    const email = useSelector(emailSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        async function getStudent(email) {
            dispatch(setLoading(true));
            try {
                let data = await fetchStudent(email);
                setStudent(data);
                console.log(data);
            } catch (error) {
                throw error;
            } finally {
                dispatch(setLoading(false));
            }
        }

        dispatch(setHeading(<StudentProfileHead />));
        getStudent(email);
    }, [dispatch, email]);

    return (
        <React.Fragment>
            {student ? (
                <div className={classes.container}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h2" component="h2">
                                {`${student.name}`}
                            </Typography>
                            <Typography
                                className={classes.description}
                                gutterBottom
                                variant="h1"
                                component="h1"
                            >
                                <b>Joining Year:</b>
                                &nbsp;&nbsp;&nbsp;
                                {`${student.joiningYear}`}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                <b>Department:</b>
                                &nbsp;&nbsp;&nbsp;
                                {`${student.department}`}
                            </Typography>

                            <Typography
                                gutterBottom
                                color="textSecondary"
                                variant="h6"
                                component="h4"
                            >
                                <b>Curriculum:</b>
                                &nbsp;&nbsp;&nbsp;
                                {student.curriculum.ctype}
                            </Typography>

                            <CourseDropDown
                                title="Completed Courses"
                                courses={student.courses.map((c) => c.course)}
                            />

                            <VerticalSpacing spacing={20} />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
}

export default StudentProfile;
