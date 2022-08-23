import { makeStyles } from "@material-ui/core/styles";
import { Backup, Close } from "@material-ui/icons";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React from "react";
import ImageUploading from "react-images-uploading";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 300,
        cursor: "pointer",
    },
    cardBody: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
    },
    cardFooter: {
        width: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    imgWrap: {
        display: "inline-block",
        position: "relative",
        margin: 20,
        padding: 5,
    },
    close: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "red",
        width: 20,
        height: 20,
        borderRadius: "50%",
        cursor: "pointer",
    },
    image: {
        width: 400,
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export function ImageUpload(props) {
    const { images, setImages } = props;
    const classes = useStyles();

    async function onChange(imageList) {
        imageList = imageList.map((value) => {
            if (typeof value === "object") {
                return value["data_url"];
            }
            return value;
        });
        console.log(imageList);
        setImages(imageList);
    }

    return (
        <React.Fragment>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={100}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <React.Fragment>
                        <GridContainer>
                            <GridItem
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                xs={12}
                                sm={12}
                                md={12}
                            >
                                <Card
                                    onClick={onImageUpload}
                                    className={classes.card}
                                >
                                    <CardBody
                                        {...dragProps}
                                        className={classes.cardBody}
                                    >
                                        <span>
                                            <p style={{ textAlign: "center" }}>
                                                <Backup />
                                            </p>
                                            <p>
                                                Click / Drop here to upload
                                                images.
                                            </p>
                                        </span>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem
                                style={{ textAlign: "center" }}
                                xs={12}
                                sm={12}
                                md={12}
                            >
                                {images.map((image, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={classes.imgWrap}
                                        >
                                            <img
                                                style={{ width: 100 }}
                                                src={image}
                                                alt={""}
                                                key={index}
                                            />
                                            <Close
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onImageRemove(index);
                                                }}
                                                className={classes.close}
                                            />
                                        </div>
                                    );
                                })}
                            </GridItem>
                        </GridContainer>
                    </React.Fragment>
                )}
            </ImageUploading>
        </React.Fragment>
    );
}
