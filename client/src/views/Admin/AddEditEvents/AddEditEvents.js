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
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
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
import gfm from "remark-gfm";
import { addEvent, editEvent, fetchEvent } from "services/events";
import { ImageUpload } from "views/Admin/AddEditEvents/ImageUpload";

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
}));

function AddEventsHead() {
    const history = useHistory();
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/events")}
            />
            &emsp;
            <h4>Add Event</h4>
        </div>
    );
}

function EditEventsHead() {
    const history = useHistory();
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => history.goBack()}
            />
            &emsp;
            <h4>Edit Event</h4>
        </div>
    );
}

function AddEditEvents(props) {
    const classes = useStyles();
    const history = useHistory();
    const isEditing = history.location.pathname.includes("edit");
    const { id } = useParams();
    const [editing, setEditing] = useState(true);
    const [description, setDescription] = useState(props.description || "");
    const [tagline, setTagline] = useState(props.tagline || "");
    const [title, setTitle] = useState(props.title || "");
    const [images, setImages] = useState(props.images || []);
    const dispatch = useDispatch();

    const isFormValid = useCallback(
        () =>
            title.trim() !== "" &&
            tagline.trim() !== "" &&
            description.trim() !== "" &&
            images.length > 0,
        [title, tagline, description, images]
    );

    const onSubmit = useCallback(async () => {
        let event = {
            description: description,
            tagline,
            images,
            title,
            id,
        };
        try {
            if (!isFormValid()) throw new Error("Form is Invalid!");
            isEditing ? await editEvent(event) : await addEvent(event);
            dispatch(
                openSnackbar({
                    message: `Successfully ${
                        isEditing ? "edited" : "added"
                    } event!`,
                    icon: ThumbUpAltOutlined,
                    color: "success",
                })
            );
            history.push(`/events/${isEditing ? id : ""}`);
        } catch (err) {
            dispatch(
                openSnackbar({
                    message: `Failed to ${
                        isEditing ? "edit" : "add"
                    } event! Make sure all the fields are filled and correct.`,
                    icon: ThumbDownAltOutlined,
                    color: "danger",
                })
            );
        }
    }, [
        description,
        images,
        tagline,
        title,
        isEditing,
        id,
        dispatch,
        history,
        isFormValid,
    ]);

    React.useEffect(() => {
        async function getEvent(id) {
            let data = await fetchEvent(id);
            setTitle(data.title);
            setDescription(data.description);
            setImages(data.images);
            setTagline(data.tagline);
        }

        if (isEditing) {
            getEvent(id);
            dispatch(setHeading(<EditEventsHead />));
        } else {
            dispatch(setHeading(<AddEventsHead />));
        }
    }, [dispatch, isEditing, id]);

    return (
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <ImageUpload images={images} setImages={setImages} />
                </GridItem>
                <VerticalSpacing spacing={40} />
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.center}>
                        <CustomInput
                            labelText="Title"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                autoComplete: "off",
                                placeholder: "Enter a title for the event",
                                multiline: true,
                            }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            multiline
                        />
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.center}>
                        <CustomInput
                            labelText="Tagline"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                autoComplete: "off",
                                placeholder: "Enter a tagline for the event",
                                multiline: true,
                            }}
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            multiline
                        />
                    </div>
                </GridItem>
                <VerticalSpacing spacing={60} />
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <div className={classes.cardHeader}>
                                <span className={classes.cardHeaderText}>
                                    {editing ? "Edit description" : "Preview"}
                                </span>
                                <span className={classes.cardHeaderText}>
                                    {!editing ? (
                                        <Edit
                                            className={classes.icon}
                                            onClick={(e) => setEditing(true)}
                                        />
                                    ) : (
                                        <Visibility
                                            className={classes.icon}
                                            onClick={(e) => setEditing(false)}
                                        />
                                    )}
                                </span>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {editing ? (
                                <TextareaAutosize
                                    className={classes.textInput}
                                    placeholder="Start typing to edit description"
                                    rowsMin={5}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            ) : (
                                <ReactMarkdown
                                    plugins={[gfm]}
                                    allowDangerousHtml={true}
                                >
                                    {DOMPurify.sanitize(description)}
                                </ReactMarkdown>
                            )}
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                    xs={12}
                    sm={12}
                    md={12}
                >
                    <RegularButton
                        color="primary"
                        onClick={onSubmit}
                        disabled={!isFormValid()}
                    >
                        {isEditing ? "Submit Changes" : "Add Event"}
                    </RegularButton>
                </GridItem>
            </GridContainer>
        </React.Fragment>
    );
}

export default AddEditEvents;
