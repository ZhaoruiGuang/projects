var api = require('api');

function getNotify(cid, page) {
    var params = {
        cid: cid,
        page: page
    };
    return api.post('/web/notify/lists', params);

}

function getNews(cid, page) {
    var params = {
        cid: cid,
        page: page
    };
    return api.post('/web/news/lists', params);

}

function getReports(page, title) {
    var params = {
        page: page,
        title: title
    };
    return api.post('/web/reports/lists', params);
}

function getArticleInfo(url) {
    return api.post(url);
}

function getTipMessage() {
    return api.post('/index/findnotify');
}

module.exports = {
    getNotify: getNotify,
    getNews: getNews,
    getArticleInfo: getArticleInfo,
    getReports: getReports,
    getTipMessage: getTipMessage
};
