import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    ArrowBack,
    ThumbDownAltOutlined,
    ThumbUpAltOutlined,
} from "@material-ui/icons";

import RegularButton from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import { ImageUpload } from "views/Admin/AddEditEvents/ImageUpload";
import { setHeading } from "redux/actions/heading";
import { fetchEditGallery, editGallery } from "services/gallery";
import { openSnackbar } from "redux/actions/snackbar";

const EditGalleryHead = () => {
    const history = useHistory();
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/gallery")}
            />
            &emsp;
            <h4> Edit Gallery</h4>
        </div>
    );
};

const EditGallery = (props) => {
    const [images, setImages] = useState(props.images || []);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = useCallback(async () => {
        try {
            await editGallery(images);
            dispatch(
                openSnackbar({
                    message: "Successfully updated gallery!",
                    icon: ThumbUpAltOutlined,
                    color: "success",
                })
            );
            history.push("/gallery");
        } catch (err) {
            dispatch(
                openSnackbar({
                    message: "Failed to update gallery!",
                    icon: ThumbDownAltOutlined,
                    color: "danger",
                })
            );
        }
    }, [images, dispatch, history]);

    useEffect(() => {
        const getGallery = async () => {
            let fetchedImages = await fetchEditGallery();
            fetchedImages = fetchedImages.map((image) => image.image);
            setImages(fetchedImages);
        };
        getGallery();
        dispatch(setHeading(<EditGalleryHead />));
    }, [dispatch]);

    return (
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <ImageUpload images={images} setImages={setImages} />
                </GridItem>
                <VerticalSpacing spacing={40} />
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
                    <RegularButton color="primary" onClick={onSubmit}>
                        {"Submit Changes"}
                    </RegularButton>
                </GridItem>
            </GridContainer>
        </React.Fragment>
    );
};

export default EditGallery;
