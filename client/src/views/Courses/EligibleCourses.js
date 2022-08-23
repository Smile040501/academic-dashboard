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

function EligibleCoursesHead() {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>Eligible Courses</h4>
        </div>
    );
}

function EligibleCourses(props) {
    const classes = useStyles();
    const history = useHistory();
    const [studData, setStudData] = useState(null);
    const email = useSelector(emailSelector);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setHeading(<EligibleCoursesHead />));

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
                            {`Total Completed Credits: ${studData.completedCredits}/${studData.totalCredits}`}
                        </Typography>
                    </GridItem>
                    <GridItem container xs={12} sm={12} md={12}>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`PM Courses`}
                            </Typography>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`Completed Credits: ${studData.pm.completedCredits}/${studData.pm.requiredCredits}`}
                            </Typography>
                        </GridItem>
                        <CourseList courses={studData.pm.eligibleCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem container xs={12} sm={12} md={12}>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`PME Courses`}
                            </Typography>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`Completed Credits: ${studData.pme.completedCredits}/${studData.pme.requiredCredits}`}
                            </Typography>
                        </GridItem>
                        <CourseList courses={studData.pme.eligibleCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem container xs={12} sm={12} md={12}>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`HSE Courses`}
                            </Typography>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`Completed Credits: ${studData.hse.completedCredits}/${studData.hse.requiredCredits}`}
                            </Typography>
                        </GridItem>
                        <CourseList courses={studData.hse.eligibleCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem container xs={12} sm={12} md={12}>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`SME Courses`}
                            </Typography>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`Completed Credits: ${studData.sme.completedCredits}/${studData.sme.requiredCredits}`}
                            </Typography>
                        </GridItem>
                        <CourseList courses={studData.sme.eligibleCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem container xs={12} sm={12} md={12}>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`PMT Courses`}
                            </Typography>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`Completed Credits: ${studData.pmt.completedCredits}/${studData.pmt.requiredCredits}`}
                            </Typography>
                        </GridItem>
                        <CourseList courses={studData.pmt.eligibleCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                    <GridItem container xs={12} sm={12} md={12}>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`OE Courses`}
                            </Typography>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                            >
                                {`Completed Credits: ${studData.oe.completedCredits}/${studData.oe.requiredCredits}`}
                            </Typography>
                        </GridItem>
                        <CourseList courses={studData.oe.eligibleCourses} />
                    </GridItem>
                    <VerticalSpacing spacing={20} />
                </GridContainer>
            ) : null}
        </React.Fragment>
    );
}

export default EligibleCourses;
