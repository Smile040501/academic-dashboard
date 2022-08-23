import React, { useEffect, useState } from "react";

import { IconButton, Tooltip } from "@material-ui/core";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { setHeading } from "redux/actions/heading";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import { fetchGallery } from "services/gallery";

const useStyles = makeStyles((theme) => ({
    gallery: {
        textAlign: "center",
        right: "10px",
        position: "absolute",
        paddingTop: "12%",
        height: "100%",
        width: "100%",
    },
    galleryImages: {
        paddingBottom: "150px",
    },
    galleryTop: {
        width: "15%",
        position: "absolute",
        left: "40%",
        transform: "translateX(0) scale(3)",
        zIndex: "3",
        transition: "all 0.5s",

        "&::before": {
            content: "",
            display: "block",
        },
    },
    galleryLeft1: {
        width: "15%",
        position: "absolute",
        left: "40%",
        transform: "translateX(-45%) scale(2.5)",
        zIndex: "2",
        transition: "all 0.5s",

        "&::before": {
            content: "",
            display: "block",
        },
    },
    galleryLeft2: {
        width: "15%",
        position: "absolute",
        left: "40%",
        transform: "translateX(-90%) scale(2)",
        zIndex: "1",
        transition: "all 0.5s",

        "&::before": {
            content: "",
            display: "block",
        },
    },
    galleryRight1: {
        width: "15%",
        position: "absolute",
        left: "40%",
        transform: "translateX(45%) scale(2.5)",
        zIndex: "2",
        transition: "all 0.5s",

        "&::before": {
            content: "",
            display: "block",
        },
    },
    galleryRight2: {
        width: "15%",
        position: "absolute",
        left: "40%",
        transform: "translateX(90%) scale(2)",
        zIndex: "1",
        transition: "all 0.5s",
        "&::before": {
            content: "",
            display: "block",
        },
    },
    galleryBack: {
        width: "15%",
        position: "absolute",
        left: "40%",
        transform: "translateX(0)",
        zIndex: "0",
        transition: "all 0.5s",
        "&::before": {
            content: "",
            display: "block",
        },
    },
    sliders: {
        position: "relative",
    },
    prevArrow: {
        position: "relative",
        top: "6vw",
        left: "-33%",
    },
    nextArrow: {
        position: "relative",
        top: "6vw",
        left: "28%",
    },
    "@media (max-width: 600px)": {
        gallery: {
            paddingTop: "15%",
        },
        galleryTop: {
            width: "25%",
        },
        prevArrow: {
            top: "60px",
            left: "-36%",
        },
        nextArrow: {
            top: "60px",
            left: "42%",
        },
    },
}));

const GalleryHead = (props) => {
    const { isAdmin } = props;
    const history = useHistory();

    const handleEditClick = () => {
        history.push("/admin/edit-gallery");
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4> Gallery</h4>
            &emsp;
            {isAdmin ? (
                <Tooltip
                    placement={"right"}
                    title="Edit Gallery"
                    arrow
                    aria-label="edit"
                >
                    <Edit
                        onClick={handleEditClick}
                        style={{ marginRight: 13, cursor: "pointer" }}
                    />
                </Tooltip>
            ) : null}
        </div>
    );
};

const Gallery = () => {
    // Array where all the source for the images will be kept
    const classes = useStyles();
    const [gallery, setGallery] = useState([]);
    const [names, setNames] = useState([]);
    const dispatch = useDispatch();
    const isAdmin = true;

    useEffect(() => {
        dispatch(setHeading(<GalleryHead isAdmin={isAdmin} />));
    }, [dispatch, isAdmin]);

    useEffect(() => {
        const getNames = (imagesCount) => {
            let namesArr = [
                classes.galleryLeft2,
                classes.galleryLeft1,
                classes.galleryTop,
                classes.galleryRight1,
                classes.galleryRight2,
            ];
            return imagesCount <= 5
                ? namesArr
                : [
                      ...namesArr,
                      ...Array.from(
                          { length: imagesCount - 5 },
                          () => classes.galleryBack
                      ),
                  ];
        };

        async function fetchData() {
            const fetchedGallery = await fetchGallery();
            setGallery(fetchedGallery);
            setNames(getNames(fetchedGallery.length));
        }

        fetchData();
    }, [
        classes.galleryLeft2,
        classes.galleryLeft1,
        classes.galleryTop,
        classes.galleryRight1,
        classes.galleryRight2,
        classes.galleryBack,
    ]);

    // Class Names Array 1 step anti-clockwise rotation
    const antiSingleRotation = () => {
        setNames((prevNames) => {
            return [...prevNames.slice(1), prevNames[0]];
        });
    };

    // Class Names Array 2 step anti-clockwise rotation
    const antiDoubleRotation = () => {
        setNames((prevNames) => {
            return [...prevNames.slice(2), prevNames[0], prevNames[1]];
        });
    };

    // Class Names Array 1 step clockwise rotation
    const clockwiseSingleRotation = () => {
        setNames((prevNames) => {
            return [...prevNames.slice(-1), ...prevNames.slice(0, -1)];
        });
    };

    // Class Names Array 2 step clockwise rotation
    const clockwiseDoubleRotation = () => {
        setNames((prevNames) => {
            return [
                ...prevNames.slice(-2, -1),
                ...prevNames.slice(-1),
                ...prevNames.slice(0, -2),
            ];
        });
    };

    // Function handling the change in position of the images when clicked
    const handleClick = (e) => {
        const { className } = e.target;
        if (className === classes.galleryLeft1) {
            antiSingleRotation();
        } else if (className === classes.galleryLeft2) {
            antiDoubleRotation();
        } else if (className === classes.galleryRight1) {
            clockwiseSingleRotation();
        } else if (className === classes.galleryRight2) {
            clockwiseDoubleRotation();
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: clockwiseSingleRotation,
        onSwipedRight: antiSingleRotation,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <React.Fragment>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur.
            </div>
            <div className={classes.sliders}>
                {gallery.length > 0 ? (
                    <div className={classes.gallery}>
                        <IconButton
                            aria-label="back ios icon"
                            onClick={antiSingleRotation}
                            className={classes.prevArrow}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton
                            aria-label="back ios icon"
                            onClick={clockwiseSingleRotation}
                            className={classes.nextArrow}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                        <div className={classes.galleryImages} {...handlers}>
                            {/* Spread handlers onto the element you wish to track swipes inside of */}
                            {gallery.map((source, index) => {
                                return (
                                    <div key={(-1 * index).toString()}>
                                        <img
                                            role="button"
                                            onClick={handleClick}
                                            key={index.toString()}
                                            className={names[index]}
                                            src={source.image}
                                            alt="galleryImage"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <h4>No Images found!</h4>
                )}
            </div>
        </React.Fragment>
    );
};

export default Gallery;
