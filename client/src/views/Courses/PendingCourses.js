import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TextareaAutosize } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    ArrowBack,
    Edit,
    Visibility,
    ThumbDownAltOutlined,
    ThumbUpAltOutlined,
} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

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
import { getAllStudentEligibleCourses } from "services/course";

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

function PendingCoursesHead() {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>Pending Courses</h4>
        </div>
    );
}

function PendingCourses(props) {
    const classes = useStyles();
    const history = useHistory();
    const [studData, setStudData] = useState(null);
    const email = useSelector(emailSelector);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setHeading(<PendingCoursesHead />));

        const getCourses = async () => {
            dispatch(setLoading(true));
            try {
                const data = await getAllStudentEligibleCourses(email);
                console.log(data);
                setStudData(data);
            } catch (e) {
                throw e;
            } finally {
                dispatch(setLoading(false));
            }
        };

        getCourses();
    }, [dispatch, email]);

    return (
        <React.Fragment>
            {studData ? (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Typography gutterBottom variant="h4" component="h2">
                            {`PM Courses`}
                        </Typography>
                        <CourseList courses={studData.pm.pendingCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem xs={12} sm={12} md={12}>
                        <Typography gutterBottom variant="h4" component="h2">
                            {`PME Courses`}
                        </Typography>
                        <CourseList courses={studData.pme.pendingCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem xs={12} sm={12} md={12}>
                        <Typography gutterBottom variant="h4" component="h2">
                            {`HSE Courses`}
                        </Typography>
                        <CourseList courses={studData.hse.pendingCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem xs={12} sm={12} md={12}>
                        <Typography gutterBottom variant="h4" component="h2">
                            {`SME Courses`}
                        </Typography>
                        <CourseList courses={studData.sme.pendingCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem xs={12} sm={12} md={12}>
                        <Typography gutterBottom variant="h4" component="h2">
                            {`PMT Courses`}
                        </Typography>
                        <CourseList courses={studData.pmt.pendingCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem container xs={12} sm={12} md={12}>
                        <Typography gutterBottom variant="h4" component="h2">
                            {`OE Courses`}
                        </Typography>
                        <CourseList courses={studData.oe.pendingCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                </GridContainer>
            ) : null}
        </React.Fragment>
    );
}

export default PendingCourses;
