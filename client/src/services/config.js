function getHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-type": "application/json",
        },
    };
}

const baseDomainURL = process.env.REACT_APP_DOMAIN;
export { getHeaders, baseDomainURL };
