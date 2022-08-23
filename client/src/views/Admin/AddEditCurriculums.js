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
import DOMPurify from "dompurify";
import React, { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setHeading } from "redux/actions/heading";
import { openSnackbar } from "redux/actions/snackbar";
import Papa from "papaparse";

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

function AddCurriculumsHead() {
    const history = useHistory();
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/curriculums")}
            />
            &emsp;
            <h4>Update Curriculums</h4>
        </div>
    );
}

function AddEditCurriculums(props) {
    const classes = useStyles();
    const history = useHistory();
    const [csvFile, setCSVFile] = useState(null);

    const dispatch = useDispatch();

    // const onSubmit = useCallback(async () => {
    //     let event = {
    //         description: description,
    //         tagline,
    //         images,
    //         title,
    //         id,
    //     };
    //     try {
    //         if (!isFormValid()) throw new Error("Form is Invalid!");
    //         isEditing ? await editEvent(event) : await addEvent(event);
    //         dispatch(
    //             openSnackbar({
    //                 message: `Successfully ${
    //                     isEditing ? "edited" : "added"
    //                 } event!`,
    //                 icon: ThumbUpAltOutlined,
    //                 color: "success",
    //             })
    //         );
    //         history.push(`/events/${isEditing ? id : ""}`);
    //     } catch (err) {
    //         dispatch(
    //             openSnackbar({
    //                 message: `Failed to ${
    //                     isEditing ? "edit" : "add"
    //                 } event! Make sure all the fields are filled and correct.`,
    //                 icon: ThumbDownAltOutlined,
    //                 color: "danger",
    //             })
    //         );
    //     }
    // }, [
    //     description,
    //     images,
    //     tagline,
    //     title,
    //     isEditing,
    //     id,
    //     dispatch,
    //     history,
    //     isFormValid,
    // ]);

    const handleChange = (e) => {
        setCSVFile(e.target.files[0]);
    };

    const updateData = (result) => {
        const { data } = result;
        console.log(data);
    };

    const importCSV = () => {
        Papa.parse(csvFile, {
            complete: updateData,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });
    };

    React.useEffect(() => {
        dispatch(setHeading(<AddCurriculumsHead />));
    }, [dispatch]);

    return (
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <input
                        accept=".csv"
                        // className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={handleChange}
                    />
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

export default AddEditCurriculums;
