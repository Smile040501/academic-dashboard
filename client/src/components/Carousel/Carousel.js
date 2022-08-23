import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { center, primaryColor } from "assets/styles/academic-dashboard";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const useStyles = makeStyles((theme) => ({
    image: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
    },
    slick: {
        width: "calc(100% - 40px)",
        height: "100%",
        marginLeft: "20px",
        marginRight: "20px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginLeft: 0,
            marginRight: 0,
        },
        "& div": {
            height: "100%",
            "&:hover": {
                color: "black",
            },
        },
    },
    icon: {
        "& div": {
            color: "black",
        },
    },
    slickArrowRight: {
        position: "absolute",
        top: 0,
        right: -30,
        height: "100%",
        zIndex: 10,
        cursor: "pointer",
        ...center,
        [theme.breakpoints.down("sm")]: {
            right: 0,
        },
    },
    slickArrowLeft: {
        position: "absolute",
        top: -2,
        left: -30,
        height: "100%",
        zIndex: 10,
        cursor: "pointer",
        ...center,
        [theme.breakpoints.down("sm")]: {
            left: 0,
        },
    },
    arrowContainerRight: {
        ...center,
        [theme.breakpoints.down("sm")]: {
            border: "1px solid",
            borderRight: 0,
            backgroundColor: primaryColor[0],
        },
    },
    arrowContainerLeft: {
        ...center,
        [theme.breakpoints.down("sm")]: {
            border: "1px solid",
            borderLeft: 0,
            backgroundColor: primaryColor[0],
        },
    },
    topLeft: {
        position: "absolute",
        top: 8,
        left: 16,
        color: primaryColor[0],
        fontWeight: 900,
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    const classes = useStyles();
    return (
        <div
            {...props}
            className={classes.slickArrowLeft}
            aria-hidden="true"
            aria-disabled={currentSlide === 0}
        >
            <span className={classes.arrowContainerLeft}>
                <ArrowBack />
            </span>
        </div>
    );
};
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    const classes = useStyles();
    return (
        <div
            {...props}
            className={classes.slickArrowRight}
            aria-hidden="true"
            aria-disabled={currentSlide === 0}
        >
            <span className={classes.arrowContainerRight}>
                <ArrowForward />
            </span>
        </div>
    );
};

export default function Carousel(props) {
    const { settings: inSettings, images } = props;
    const classes = useStyles();
    const arrows = {
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        dots: true,
        autoplay: true,
        fade: true,
        infinite: true,
        cssEase: "cubic-bezier(0.42,0,0.58,1)",
    };

    const settings = { ...inSettings, ...arrows };
    return (
        <Slider className={classes.slick} {...settings}>
            {images.map((source, index) => {
                return (
                    <div
                        className={classes.imageContainer}
                        key={index.toString()}
                    >
                        <img
                            className={classes.image}
                            key={index.toString()}
                            src={source}
                            alt=""
                        />
                        {images.length > 1 ? (
                            <div className={classes.topLeft}>
                                {index + 1} / {images.length}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </Slider>
    );
}
