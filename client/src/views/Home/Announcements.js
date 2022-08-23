import {makeStyles} from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardList from "components/CardList/CardList";
import React from "react";
import {bugs} from "variables/general.js";
import styles from "./homeStyle";

const useStyles = makeStyles(styles);

function Announcements(props) {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitle}>Announcements</h4>
            </CardHeader>
            <CardBody>
                <CardList items={bugs} />
            </CardBody>
        </Card>
    );
}

export default Announcements;
