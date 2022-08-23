function getBase64(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((r) => r.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(blob);
            });
    });
}

function dataURItoBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
}

async function getBlobObject(blobURL) {
    let blob = fetch(blobURL);
    return (await blob).blob();
}

async function blobToBase64(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
}

function dataURItoFile(dataURI) {
    const BASE64_MARKER = ";base64,";

    function isDataURI(url) {
        return url.split(BASE64_MARKER).length === 2;
    }

    if (!isDataURI(dataURI)) {
        return false;
    }

    const mime = dataURI.split(BASE64_MARKER)[0].split(":")[1];
    const filename = new Date().getTime() + "." + mime.split("/")[1];
    const bytes = atob(dataURI.split(BASE64_MARKER)[1]);
    const writer = new Uint8Array(new ArrayBuffer(bytes.length));

    for (let i = 0; i < bytes.length; i++) {
        writer[i] = bytes.charCodeAt(i);
    }

    return new File([writer.buffer], filename, { type: mime });
}

export { getBase64, getBlobObject, blobToBase64, dataURItoBlob, dataURItoFile };
