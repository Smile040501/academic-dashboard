import {makeStyles} from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex"
    }
}));

export default function AboutUs() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus
                pulvinar elementum integer. Vitae nunc sed velit dignissim sodales ut eu sem.
                Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras.
                Lorem sed risus ultricies tristique nulla. Venenatis cras sed felis eget velit.
                Nam libero justo laoreet sit. Faucibus a pellentesque sit amet. Turpis cursus in
                hac habitasse platea dictumst quisque. Rutrum quisque non tellus orci ac auctor
                augue mauris. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
                fermentum odio. Sagittis nisl rhoncus mattis rhoncus. Convallis posuere morbi
                leo urna molestie at elementum eu facilisis. Sollicitudin tempor id eu nisl nunc
                mi ipsum faucibus. Est ullamcorper eget nulla facilisi. Elementum curabitur
                vitae nunc sed velit dignissim.
            </div>
        </div>
    );
}
