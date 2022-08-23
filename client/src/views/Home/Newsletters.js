import {makeStyles} from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardList from "components/CardList/CardList";
import React from "react";
import {bugs} from "variables/general.js";
import styles from "./homeStyle";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(styles);

function NewsLetter(props) {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitle}><NavLink to={`/Newsletter`} style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'white', textDecoration: 'none'}}>News Letter</NavLink></h4>
            </CardHeader>
            <CardBody>
                <CardList items={bugs} />
            </CardBody>
        </Card>
    );
}

export default NewsLetter;
