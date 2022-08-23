import { Hidden, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, Edit } from "@material-ui/icons";
import { center } from "assets/styles/academic-dashboard";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Tilt from "react-tilt";
import { setHeading } from "redux/actions/heading";
import { fetchEvents } from "services/events";

const styles = (theme) => ({
    image: {
        height: "auto",
        margin: "60px 0 60px",
        [theme.breakpoints.up("lg")]: {
            width: "60%",
        },
        [theme.breakpoints.between("md", "lg")]: {
            width: "80%",
        },
        [theme.breakpoints.down("md")]: {
            width: "80%",
            margin: "30px 0px 30px 0px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            margin: "30px 0px 0px 0px",
        },
    },
    eventRight: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            ...center,
        },
    },
    eventLeft: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            ...center,
        },
    },
    container: {
        textAlign: "center",
        padding: "20px",
    },
    rightText: {
        width: "50%",
        textAlign: "left",
        [theme.breakpoints.down("md")]: {
            width: "90%",
            marginLeft: "10%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginLeft: "0%",
        },
    },
    leftText: {
        width: "50%",
        textAlign: "left",
        [theme.breakpoints.down("md")]: {
            width: "90%",
            marginLeft: "10%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginLeft: "0%",
        },
    },
});

const useStyles = makeStyles(styles);

function EventsHead(props) {
    const { isAdmin } = props;
    const history = useHistory();

    const handleAddClick = () => {
        history.push("/admin/add-events");
    };

    const handleEditClick = () => {
        history.push("/admin/edit-events");
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4> Events</h4>
            &emsp;
            {isAdmin ? (
                <>
                    <Tooltip
                        placement={"right"}
                        title="Add Event"
                        arrow
                        aria-label="add"
                    >
                        <Add
                            onClick={handleAddClick}
                            style={{ marginRight: 13, cursor: "pointer" }}
                        />
                    </Tooltip>
                    <Tooltip
                        placement={"right"}
                        title="Edit Events"
                        arrow
                        aria-label="edit"
                    >
                        <Edit
                            onClick={handleEditClick}
                            style={{ marginRight: 50, cursor: "pointer" }}
                        />
                    </Tooltip>
                </>
            ) : null}
        </div>
    );
}

function Events(props) {
    const classes = useStyles();
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const isAdmin = true;
    const tiltOptions = {
        max: 15,
        scale: 1,
        reset: true,
    };

    React.useEffect(() => {
        async function fetchData() {
            let fetchedEvents = await fetchEvents();
            setEvents(fetchedEvents);
        }

        dispatch(setHeading(<EventsHead isAdmin={isAdmin} />));
        fetchData();
    }, [dispatch, isAdmin]);

    return (
        <React.Fragment>
            <div className={classes.container}>
                {events?.map((event, index) => {
                    return (
                        <GridContainer key={index}>
                            {index % 2 === 0 ? (
                                <React.Fragment>
                                    <GridItem
                                        className={classes.imgContainer}
                                        xs={12}
                                        sm={12}
                                        md={8}
                                    >
                                        <Tilt
                                            className="Tilt"
                                            options={tiltOptions}
                                        >
                                            <NavLink to={`/events/${event.id}`}>
                                                <img
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    alt={event.title}
                                                    className={classes.image}
                                                    src={event.images[0]}
                                                />
                                            </NavLink>
                                        </Tilt>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <div className={classes.eventRight}>
                                            <span className={classes.rightText}>
                                                <NavLink
                                                    to={`/events/${event.id}`}
                                                >
                                                    <b>{event.title}</b>
                                                </NavLink>
                                                <p>{event.tagline}</p>
                                            </span>
                                        </div>
                                    </GridItem>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Hidden smDown implementation="js">
                                        <GridItem xs={12} sm={12} md={4}>
                                            <div className={classes.eventLeft}>
                                                <span
                                                    className={classes.leftText}
                                                >
                                                    <NavLink
                                                        to={`/events/${event.id}`}
                                                    >
                                                        <b>{event.title}</b>
                                                    </NavLink>
                                                    <p>{event.tagline}</p>
                                                </span>
                                            </div>
                                        </GridItem>
                                    </Hidden>
                                    <GridItem
                                        className={classes.imgContainer}
                                        xs={12}
                                        sm={12}
                                        md={8}
                                    >
                                        <Tilt
                                            className="Tilt"
                                            options={tiltOptions}
                                        >
                                            <NavLink to={`/events/${event.id}`}>
                                                <img
                                                    alt={event.title}
                                                    className={classes.image}
                                                    src={event.images[0]}
                                                />
                                            </NavLink>
                                        </Tilt>
                                    </GridItem>
                                    <Hidden mdUp implementation="js">
                                        <GridItem xs={12} sm={12} md={4}>
                                            <div className={classes.eventLeft}>
                                                <span
                                                    className={classes.leftText}
                                                >
                                                    <NavLink
                                                        to={`/events/${event.id}`}
                                                    >
                                                        <b>{event.title}</b>
                                                    </NavLink>
                                                    <p>{event.tagline}</p>
                                                </span>
                                            </div>
                                        </GridItem>
                                    </Hidden>
                                </React.Fragment>
                            )}
                        </GridContainer>
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default Events;
