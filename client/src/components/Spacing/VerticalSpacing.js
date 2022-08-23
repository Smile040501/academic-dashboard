import GridItem from "components/Grid/GridItem";
import PropTypes from "prop-types";
import React from "react";

export default function VerticalSpacing(props) {
    return <GridItem xs={12} style={{ height: props.spacing }} />;
}

VerticalSpacing.propTypes = {
    spacing: PropTypes.number,
};
