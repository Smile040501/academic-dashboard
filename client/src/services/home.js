const fetchHomeCarousel = () => {
    const home = [];
    const images = [1, 2, 3, 4, 6, 7, 3].map((value) => {
        return require(`assets/img/gallery/${value}.jpeg`);
    });
    let i = 0;
    for (const image of images) {
        home.push({
            id: i,
            image: image,
        });
        i++;
    }
    return new Promise((resolve) => resolve(home));
};

export { fetchHomeCarousel };
