var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
    }
    return e;
}, t = {
    getBannerListInAd: "/advert/v3.0/advert/banner/{positionKey}",
    getBuildingListInAd: "/advert/v3.0/advert/building/{positionKey}",
    getHeadlineArticlesInAd: "/advert/v3.0/advert/article/HeadlineArticle",
    getBrokerListInAd: "/advert/v3.0/advert/consultant/{positionKey}",
    getBuildingAllInAd: "/advert/v3.0/advert/building",
    getMarketCategoryInAd: "/advert/v3.0/advert/article/CategoryArticle",
    getBuyHouseInAd: "/article/v3.0/{articleType}/novice",
    getBuyHouseDetailInAd: "/article/v3.0/novice/{id}",
    getCommonProblemInAd: "/article/v3.0/{userSystem}/helpdoc",
    getCommonProblemDetailInAd: "/article/v3.0/helpdoc/{id}"
};

module.exports = e({}, t);