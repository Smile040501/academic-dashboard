import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import RegularButton from "components/CustomButtons/Button";
import React, {PureComponent} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {blobToBase64, getBlobObject} from "services/file";

class EditImage extends PureComponent {
    state = {
        src: this.props.image,
        cropped: 0,
        crop: {
            unit: '%',
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = async (crop) => {
        await this.makeClientCrop(crop);
        this.setState({cropped: this.state.cropped + 1});
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({crop});
    };

    async makeClientCrop(crop) {
        if (this.imageRef) {
            if (crop.width && crop.height) {
                const croppedImageUrl = await this.getCroppedImg(
                    this.imageRef,
                    crop,
                    'newFile.jpeg'
                );
                this.setState({croppedImageUrl});
            } else {
                this.setState({croppedImageUrl: this.state.src});
            }
        }
    }

    onSubmit = async (croppedImage) => {
        let finalImage = await blobToBase64(await getBlobObject(croppedImage));
        this.setState({croppedImageUrl: null});
        this.props.onSubmit(finalImage);
    };

    onDialogClose = () => {
        this.setState({croppedImageUrl: null});
        this.props.onDialogClose();
    };

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({src: this.props.image});
    }

    render() {
        const {crop, croppedImageUrl, src} = this.state;

        return (
            <div>
                <Dialog disableBackdropClick disableEscapeKeyDown onClose={this.onDialogClose} open={this.props.open}>
                    <DialogTitle>Edit the image</DialogTitle>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                imageStyle={{
                                    height: "60vh",
                                    width: "auto"
                                }}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        )}
                    </div>
                    <DialogActions>
                        <RegularButton color={"danger"} onClick={this.props.onDiscard}>Discard</RegularButton>
                        <RegularButton
                            color={"primary"} onClick={() => this.onSubmit(croppedImageUrl)}>Submit</RegularButton>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

export default EditImage;
