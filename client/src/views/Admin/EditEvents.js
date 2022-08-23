import { Divider, ListItem, Tooltip } from "@material-ui/core";
import List from "@material-ui/core/List";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    DeleteOutline,
    EditOutlined,
    InfoOutlined,
    ArrowBack,
} from "@material-ui/icons";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeading } from "redux/actions/heading";
import { deleteEvent, fetchEvents } from "services/events";

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up("md")]: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
        },
        width: "100%",
    },
    icon: {
        cursor: "pointer",
        marginRight: 15,
        [theme.breakpoints.down("sm")]: {
            marginRight: 5,
        },
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            margin: "15px 0 15px 0",
            justifyContent: "center",
        },
    },
    title: {
        paddingRight: 30,
        [theme.breakpoints.down("sm")]: {
            paddingRight: 0,
        },
    },
}));

function EditEventsHead() {
    const history = useHistory();
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/events")}
            />
            &emsp;
            <h4>Edit Events</h4>
        </div>
    );
}

function EditEvents() {
    const [events, setEvents] = useState([]);
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setHeading(<EditEventsHead />));

        async function getAllEvents() {
            let data = await fetchEvents();
            setEvents(data);
        }

        getAllEvents();
    }, [dispatch]);

    async function removeEvent(event) {
        await deleteEvent(event.id);
        const tempEvents = events.filter((value) => value.id !== event.id);
        setEvents(tempEvents);
    }

    return (
        <Card>
            <CardHeader color={"primary"}>Events</CardHeader>
            <CardBody>
                <List>
                    {events.map((event, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <div className={classes.container}>
                                        <div className={classes.title}>
                                            {event.title}
                                        </div>
                                        <div className={classes.iconContainer}>
                                            <Tooltip
                                                title={"About Event"}
                                                placement={"top"}
                                                arrow
                                            >
                                                <InfoOutlined
                                                    className={classes.icon}
                                                    onClick={() =>
                                                        history.push(
                                                            `/events/${event.id}`
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={"Edit Event"}
                                                placement={"top"}
                                                arrow
                                            >
                                                <EditOutlined
                                                    className={classes.icon}
                                                    onClick={() =>
                                                        history.push(
                                                            `/admin/edit-events/${event.id}`
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                title={"Delete Event"}
                                                placement={"top"}
                                                arrow
                                            >
                                                <DeleteOutline
                                                    className={classes.icon}
                                                    onClick={() =>
                                                        removeEvent(event)
                                                    }
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        );
                    })}
                </List>
            </CardBody>
        </Card>
    );
}

export default EditEvents;
