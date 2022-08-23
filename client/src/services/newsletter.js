const fetchNews = () => {
    const newslist = [];
    let i = 1;
    const news = [1, 2, 3, 4, 5, 6, 7];
    for (const nex of news) {
        newslist.push({
            id: i,
            title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
        });
        i++;
    }
    return new Promise((resolve) => resolve(newslist));
};

const fetchNews1 = async (id) => {
    const news1 = await fetchNews();
    return news1[id];
};

export { fetchNews, fetchNews1 };
