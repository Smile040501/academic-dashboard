import axios from "axios";
import { dataURItoFile } from "services/file";

const fetchEvents = async () => {
    let { data } = await axios.get("events/");
    data = data.map((event, value) => {
        event.images = event.images.map((image) => image.image);
        return event;
    });
    return data;
};

const fetchEvent = async (id) => {
    let { data } = await axios.get(`events/${id}`);
    data.images = data.images.map((image) => image.image);
    return data;
};

const addEvent = async (event) => {
    let formData = new FormData();
    for (const image of event.images) {
        formData.append("images", dataURItoFile(image));
    }
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("tagline", event.tagline);
    return await axios.post("events/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const editEvent = async (event) => {
    let formData = new FormData();
    for (const image of event.images) {
        formData.append("images", dataURItoFile(image));
    }
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("tagline", event.tagline);
    return await axios.put(`events/${event.id}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const deleteEvent = async (id) => {
    try {
        await axios.delete(`events/${id}`);
        return true;
    } catch (e) {
        return false;
    }
};

export { fetchEvents, addEvent, deleteEvent, editEvent, fetchEvent };
