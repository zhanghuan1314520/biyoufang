function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var t;

module.exports = (t = {
    realtyconsultantNewList: "/building/v3.4/realtyconsultant/building/{auditStatus}/news",
    getCommentsListInCmt: "/comment/v3.4/building/{buildingId}/comment",
    getCommontDetail: "/comment/v3.5/building/comment/{commentId}",
    getPhotoAlbumInBld: "/building/v3.4/building/{buildingId}/photoAlbum",
    deleteBrokerNew: "/building/v3.4/realtyconsultant/building/news/{id}",
    getAccountInMsgByQrCode: "/member/v3.4/realtyconsultant/{consultantCode}/chat",
    getAccountInMsg: "/member/v3.3/chat/{userKey}/accountInfo"
}, e(t, "deleteBrokerNew", "/building/v3.4/realtyconsultant/building/news/{id}"), 
e(t, "getHomeAllInAd", "/advert/v3.4/advert/homes"), e(t, "chatTrack", "/member/v3.4/chat/track"), 
e(t, "getArticleListInAd", "/advert/v3.4/advert/article/{positionKey}/0"), e(t, "getSecondArticleListInAd", "/advert/v3.4/advert/article/{positionKey}"), 
e(t, "getHeadlineArticleInAd", "/advert/v3.4/advert/article/HeadlineArticle/0"), 
t);