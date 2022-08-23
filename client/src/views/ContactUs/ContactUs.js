import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Email, Phone } from "@material-ui/icons";
import { whiteColor } from "assets/styles/academic-dashboard";
import axios from "axios";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        height: "22em",
        width: "18em",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff",
        [theme.breakpoints.up("md")]: {
            "&:hover": {
                "& $socialIcon": {
                    height: "1.5em",
                    width: "1.5em",
                    opacity: 1,
                },
                "& $image": {
                    opacity: 0.6,
                },
            },
        },
    },
    title: {
        margin: 0,
        fontSize: "16px !important",
    },
    text: {
        color: "white",
        fontSize: "12px",
    },
    socialInfoContainer: {
        position: "absolute",
        top: "1em",
        left: "0.7em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    socialIcon: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        marginBottom: "1em",
        transition: "all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)",
        opacity: 0,
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        color: whiteColor,
        [theme.breakpoints.down("sm")]: {
            height: "1em",
            width: "1em",
            opacity: 1,
        },
    },
    description: {
        backgroundColor: "transparent",
        width: "18em",
        position: "absolute",
        bottom: 20,
        transition: "all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)",
        textAlign: "center",
    },
    image: {
        opacity: 1,
        transition: "all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)",
    },
    socialLink: {
        marginTop: 0,
        display: "flex",
        alignItems: "center",
        marginLeft: 10,
        opacity: 1,
        transition: "all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)",
        [theme.breakpoints.down("sm")]: {
            opacity: 1,
        },
    },
}));

function ContactUs() {
    const [contacts, setContacts] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const data = result.data;
            setContacts(data);
        };
        fetchData();
        return () => {};
    }, []);

    return (
        <GridContainer>
            {contacts?.map((value, index) => {
                return (
                    <GridItem
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 50,
                        }}
                        key={index}
                        xs={12}
                        sm={12}
                        md={6}
                    >
                        <Box className={classNames(classes.card)}>
                            <NavLink to="#">
                                <img
                                    className={classes.image}
                                    alt={"name"}
                                    src={require("assets/img/faces/marc.jpg")}
                                />
                            </NavLink>
                            <div className={classes.description}>
                                <h5
                                    className={classNames(
                                        classes.text,
                                        classes.title
                                    )}
                                >
                                    {" "}
                                    Card Title{" "}
                                </h5>
                                <p className={classes.text}>
                                    Lorem Ipsum Dipsum hortata.
                                </p>
                            </div>
                            <NavLink to="#">
                                <Box className={classes.socialInfoContainer}>
                                    <div className={classes.socialIcon}>
                                        <Phone />
                                        <span
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 14,
                                            }}
                                        >
                                            revolve
                                        </span>
                                    </div>
                                    <div className={classes.socialIcon}>
                                        <Email />
                                        <span
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 14,
                                            }}
                                        >
                                            revolve
                                        </span>
                                    </div>
                                </Box>
                            </NavLink>
                        </Box>
                    </GridItem>
                );
            })}
        </GridContainer>
    );
}

export default ContactUs;
