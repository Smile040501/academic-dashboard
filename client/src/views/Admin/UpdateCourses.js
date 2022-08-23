import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { defaultFont } from "assets/styles/academic-dashboard";
import RegularButton from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import VerticalSpacing from "components/Spacing/VerticalSpacing";

import { updateCourses } from "services/course";

import { setLoading } from "redux/actions/loading";
import { setHeading } from "redux/actions/heading";
import { openSnackbar } from "redux/actions/snackbar";

const useStyles = makeStyles((theme) => ({
    textInput: {
        minWidth: "100%",
        maxWidth: "100%",
        height: "100%",
        ...defaultFont,
    },
    root: {
        minWidth: 275,
        minHeight: 75,
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

function UpdateCoursesHead() {
    const history = useHistory();
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/courses")}
            />
            &emsp;
            <h4>Update Courses</h4>
        </div>
    );
}

function UpdateCourses(props) {
    const classes = useStyles();
    const history = useHistory();
    const [csvFile, setCSVFile] = useState(null);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCSVFile(e.target.files[0]);
    };

    const updateData = async (result) => {
        try {
            dispatch(setLoading(true));
            const { data } = result;
            const courses = [];
            for (const d of data) {
                const course = {};
                course.name = d[0].trim();
                course.code = d[1].trim();
                course.credits = d[2]
                    .split("-")
                    .map((x) => Number.parseInt(x.trim()));
                course.description = d[3].trim();
                course.prerequisites = [];
                for (let i = 4; i < 9; i++) {
                    if (d[i].trim() !== "-") {
                        course.prerequisites.push(d[i].trim());
                    }
                }
                course.corequisites = [];
                for (let i = 9; i < 14; i++) {
                    if (d[i].trim() !== "-") {
                        course.corequisites.push(d[i].trim());
                    }
                }
                course.ctype = d[14].trim();
                course.syllabus = d[15].trim();

                courses.push(course);
            }

            await updateCourses(courses);
            history.push("/courses");
            dispatch(
                openSnackbar({
                    message: "Successfully Updated Courses!",
                    icon: ThumbUpAltOutlined,
                    color: "success",
                })
            );
        } catch (error) {
            console.log(error);
            history.push("/courses");
            dispatch(
                openSnackbar({
                    message: "Failed to Update the Courses!",
                    icon: ThumbDownAltOutlined,
                    color: "danger",
                })
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    const importCSV = () => {
        Papa.parse(csvFile, {
            complete: updateData,
            dynamicTyping: true,
            skipEmptyLines: true,
        });
    };

    React.useEffect(() => {
        dispatch(setHeading(<UpdateCoursesHead />));
    }, [dispatch]);

    return (
        <React.Fragment>
            <GridContainer>
                <GridItem
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                    xs={12}
                    sm={12}
                    md={12}
                >
                    <Card className={classes.root}>
                        <CardContent>
                            <input
                                accept=".csv"
                                // className={classes.input}
                                id="contained-button-file"
                                type="file"
                                onChange={handleChange}
                            />
                        </CardContent>
                    </Card>
                </GridItem>
                <VerticalSpacing spacing={40} />
                <GridItem
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                    xs={12}
                    sm={12}
                    md={12}
                >
                    <RegularButton
                        color="primary"
                        disabled={csvFile === null}
                        onClick={importCSV}
                    >
                        Upload CSV
                    </RegularButton>
                </GridItem>
            </GridContainer>
        </React.Fragment>
    );
}

export default UpdateCourses;
