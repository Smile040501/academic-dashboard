import axios from "axios";
import { dataURItoFile } from "services/file";

const fetchGallery = async () => {
    const gallery = [];
    const images = [1, 2, 3, 4, 6, 7, 3].map((value) => {
        return require(`assets/img/gallery/${value}.jpeg`);
    });
    let i = 0;
    for (const image of images) {
        gallery.push({
            id: i,
            image: image,
        });
        i++;
    }

    const { data } = await axios.get("gallery/");
    console.log("Gallery", data);

    return gallery;
};

const fetchEditGallery = async () => {
    const gallery = [];
    const images = [1, 2, 3, 4, 6, 7, 3].map((value) => {
        return require(`assets/img/gallery/${value}.jpeg`);
    });
    let i = 0;
    for (const image of images) {
        gallery.push({
            id: i,
            image: image,
        });
        i++;
    }

    // const {data} = await axios.get("gallery/edit");
    // console.log("Gallery", data);

    return gallery;
};

const editGallery = async (images) => {
    console.log(images);
    // let formData = new FormData();
    // for (const image of images) {
    //     formData.append("images", dataURItoFile(image));
    // }
    // return await axios.put(`gallery/edit/`, formData, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // });
};

export { fetchGallery, editGallery, fetchEditGallery };
