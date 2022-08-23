import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";

import { TextareaAutosize } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    ArrowBack,
    Edit,
    Visibility,
    ThumbDownAltOutlined,
    ThumbUpAltOutlined,
} from "@material-ui/icons";

import { defaultFont } from "assets/styles/academic-dashboard";
import RegularButton from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import CourseList from "./CourseList";

import { setHeading } from "redux/actions/heading";
import { setLoading } from "redux/actions/loading";
import { emailSelector, isAdminSelector } from "redux/selector";
import { openSnackbar } from "redux/actions/snackbar";
import { getAllCourses, getAllStudentCourses } from "services/course";

const useStyles = makeStyles((theme) => ({
    textInput: {
        minWidth: "100%",
        maxWidth: "100%",
        height: "100%",
        ...defaultFont,
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardHeaderText: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        cursor: "pointer",
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        display: "none",
    },
}));

function CoursesHead() {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>All Courses</h4>
        </div>
    );
}

function Courses(props) {
    const classes = useStyles();
    const history = useHistory();
    const [courses, setCourses] = useState([]);
    const email = useSelector(emailSelector);
    const isAdmin = useSelector(isAdminSelector);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setHeading(<CoursesHead />));

        let getCourses;
        if (isAdmin) {
            getCourses = async () => {
                dispatch(setLoading(true));
                try {
                    const courses = await getAllCourses();
                    setCourses(courses);
                } catch (e) {
                    throw e;
                } finally {
                    dispatch(setLoading(false));
                }
            };
        } else {
            getCourses = async () => {
                dispatch(setLoading(true));
                try {
                    const courses = await getAllStudentCourses(email);
                    setCourses(courses);
                } catch (e) {
                    throw e;
                } finally {
                    dispatch(setLoading(false));
                }
            };
        }

        getCourses();
    }, [dispatch, email, isAdmin]);

    return (
        <React.Fragment>
            <GridContainer>
                <CourseList courses={courses} />
            </GridContainer>
        </React.Fragment>
    );
}

export default Courses;
