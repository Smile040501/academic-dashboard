import { makeStyles } from "@material-ui/core/styles";
import Carousel from "components/Carousel/Carousel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import React, { useState } from "react";
import { fetchHomeCarousel } from "services/home";
import Announcements from "./Announcements";
import styles from "./homeStyle";
import NewsLetter from "./Newsletters";

const useStyles = makeStyles(styles);

function Home() {
    const classes = useStyles();
    const [images, setImages] = useState([]);

    React.useEffect(() => {
        async function fetchData() {
            // let images = await fetchHomeCarousel();
            // setImages(images);
        }

        fetchData();
    }, []);

    return (
        <div>
            <GridContainer>
                <GridItem className={classes.center} xs={12} sm={12} md={12}>
                    <div className={classes.carousel}>
                        {/* <Carousel images={images.map(val => val.image)} /> */}
                    </div>
                </GridItem>
                <VerticalSpacing spacing={80} />
                <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <NewsLetter />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Announcements />
                        </GridItem>
                    </GridContainer>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Home;
