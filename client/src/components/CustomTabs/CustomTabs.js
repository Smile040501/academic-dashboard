// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "components/CustomTabs/customTabsStyle.js";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, value) => {
        setValue(value);
    };
    const classes = useStyles();
    const { headerColor, plainTabs, tabs, title } = props;
    const cardTitle = classNames({ [classes.cardTitle]: true });
    return (
        <Card plain={plainTabs}>
            <CardHeader color={headerColor} plain={plainTabs}>
                {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    classes={{
                        root: classes.tabsRoot,
                        indicator: classes.displayNone,
                    }}
                    variant="scrollable"
                    scrollButtons="on"
                >
                    {tabs.map((prop, key) => {
                        let icon = {};
                        if (prop.tabIcon) {
                            icon = {
                                icon: <prop.tabIcon />,
                            };
                        }
                        return (
                            <Tab
                                classes={{
                                    root: classes.tabRootButton,
                                    selected: classes.tabSelected,
                                    wrapper: classes.tabWrapper,
                                }}
                                key={key}
                                label={prop.tabName}
                                {...icon}
                            />
                        );
                    })}
                </Tabs>
            </CardHeader>
            <CardBody>
                {tabs.map((prop, key) => {
                    if (key === value) {
                        return <div key={key}>{prop.tabContent}</div>;
                    }
                    return null;
                })}
            </CardBody>
        </Card>
    );
}

CustomTabs.propTypes = {
    headerColor: PropTypes.oneOf(["warning", "success", "danger", "info", "primary", "rose"]),
    title: PropTypes.string,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabName: PropTypes.string.isRequired,
            tabIcon: PropTypes.object,
            tabContent: PropTypes.node.isRequired,
        })
    ),
    plainTabs: PropTypes.bool,
};
