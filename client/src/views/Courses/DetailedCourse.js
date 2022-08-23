import React, { useCallback, useState } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import CourseDropDown from "./CourseDropDown";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import { fetchCourse } from "services/course";

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

function DetailedCourseHead() {
    const history = useHistory();

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => history.goBack()}
            />
        </div>
    );
}

function DetailedCourse() {
    const classes = useStyles();
    const [course, setCourse] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        async function getCourse(id) {
            dispatch(setLoading(true));
            try {
                let data = await fetchCourse(id);
                setCourse(data);
                console.log(data);
            } catch (error) {
                throw error;
            } finally {
                dispatch(setLoading(false));
            }
        }

        dispatch(setHeading(<DetailedCourseHead />));
        getCourse(id);
    }, [dispatch, id]);

    return (
        <React.Fragment>
            {course ? (
                <div className={classes.container}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h2" component="h2">
                                {`${course.code} - ${course.name}`}
                            </Typography>
                            <Typography
                                className={classes.description}
                                gutterBottom
                                variant="h1"
                                component="h1"
                            >
                                {course.description}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                <b>Credits (L-T-P-C):</b>
                                &nbsp;&nbsp;&nbsp;
                                {course.credits.join(" - ")}
                            </Typography>

                            <Typography
                                gutterBottom
                                color="textSecondary"
                                variant="h6"
                                component="h4"
                            >
                                <b>Syllabus:</b>
                                &nbsp;&nbsp;&nbsp;
                                {course.syllabus}
                            </Typography>

                            {/* <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                <b>Pre-requisite Courses:</b>
                            </Typography> */}

                            <CourseDropDown
                                title="Pre-requisite Courses"
                                courses={course.prerequisites}
                            />

                            <VerticalSpacing spacing={20} />

                            <CourseDropDown
                                title="Co-requisite Courses"
                                courses={course.corequisites}
                            />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
}

export default DetailedCourse;
