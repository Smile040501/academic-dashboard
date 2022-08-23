import {Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowBack, Delete, Edit} from "@material-ui/icons";
import Carousel from "components/Carousel/Carousel";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import React, {useCallback, useState} from "react";
import ReactMarkdown from 'react-markdown';
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {setHeading} from "redux/actions/heading";
import {deleteEvent, fetchEvent} from "services/events";

const styles = theme => ({
    container: {
        marginTop: "40px"
    },
    carousel: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        width: "70%",
        height: 500,
        [theme.breakpoints.down("md")]: {
            width: "80%",
            height: 400
        },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            height: 300
        }
    },
    textContainer: {
        width: "100%",
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    },
    image: {
        width: "55%",
        [theme.breakpoints.up("lg")]: {
            width: "40%"
        },
        [theme.breakpoints.down("md")]: {
            width: "60%"
        },
        [theme.breakpoints.down("sm")]: {
            width: "80%"
        }
    }
});

const useStyles = makeStyles(styles);

function DetailedEventsHead(props) {
    const {isAdmin, removeEvent, id} = props;
    const history = useHistory();

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <ArrowBack style={{cursor: "pointer"}} onClick={() => history.goBack()} />
            &emsp;
            {isAdmin ? <React.Fragment>
                <Tooltip placement={"right"} title="Remove Event" arrow aria-label="add">
                    <Delete onClick={removeEvent} style={{cursor: "pointer"}} />
                </Tooltip>
                &emsp;
                <Tooltip placement={"right"} title="Edit Event" arrow aria-label="add">
                    <Edit onClick={() => history.push(`/admin/edit-events/${id}`)} style={{cursor: "pointer"}} />
                </Tooltip>
            </React.Fragment> : null}
        </div>
    );
}

function DetailedEvent(props) {
    const classes = useStyles();
    const isAdmin = true;
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const removeEvent = useCallback(async () => {
        await deleteEvent(id);
        history.goBack();
    }, [history, id]);

    React.useEffect(() => {
        async function getEvent(id) {
            let data = await fetchEvent(id);
            setEvent(data);
        }

        dispatch(setHeading(<DetailedEventsHead removeEvent={removeEvent} id={id} isAdmin={isAdmin} />));
        getEvent(id);
    }, [dispatch, isAdmin, removeEvent, id]);

    return (
        <React.Fragment>
            {event ? (
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem className={classes.carousel} xs={12} sm={12} md={12}>
                            <div className={classes.imageContainer}>
                                <Carousel images={event.images} />
                            </div>
                        </GridItem>
                        <VerticalSpacing spacing={70} />
                        <GridItem xs={12} sm={12} md={12}>
                            <div className={classes.textContainer}>
                            <span>
                                <p>{event.title}</p>
                                <p>{event.tagline}</p>
                            </span>
                            </div>
                            <ReactMarkdown allowDangerousHtml={true}>
                                {event.description}
                            </ReactMarkdown>
                        </GridItem>
                    </GridContainer>
                </div>
            ) : <React.Fragment />}
        </React.Fragment>
    );
}

export default DetailedEvent;
