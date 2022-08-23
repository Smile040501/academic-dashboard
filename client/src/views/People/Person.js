import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Email, Phone } from "@material-ui/icons";
import { grayColor } from "assets/styles/academic-dashboard";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React from "react";

const useStyles = makeStyles((theme) => ({
    cardCategory: {
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        paddingTop: "10px",
        marginBottom: "0",
        textAlign: "center",
    },
    cardTitle: {
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
    stats: {
        display: "flex",
        fontSize: "12px",
        lineHeight: "22px",
        borderRadius: "50%",
    },
    cardHeader: {
        backgroundColor: grayColor[0],
        padding: "0px",
        marginTop: "-40px",
        marginLeft: 10,
        float: "left",
        borderRadius: "50%",
    },
}));

export default function Person(props) {
    const classes = useStyles();
    const { person } = props;

    return (
        <Card>
            <CardHeader color="warning" stats icon>
                <CardIcon className={classes.cardHeader}>
                    <Avatar
                        style={{ height: 80, width: 80 }}
                        src={person.profile_pic}
                        alt={person.name || "None"}
                    />
                </CardIcon>
            </CardHeader>
            <CardBody>
                <span className={classes.cardCategory}>
                    <p>{person.name || "Unknown"}</p>
                    <p>{person.current_organisation}</p>
                </span>
            </CardBody>
            <CardFooter stats>
                <div className={classes.stats}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Phone />
                            &nbsp;
                            {person.phone}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <Email />
                            &nbsp;
                            {person.email}
                        </GridItem>
                    </GridContainer>
                </div>
            </CardFooter>
        </Card>
    );
}
