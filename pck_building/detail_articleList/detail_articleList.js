var e = require("../../utils/index.js"), t = require("../../config.js"), i = getApp();

Page({
    data: {
        title: "楼盘文章",
        navH: 0,
        userInfo: null,
        buildingId: "",
        pageStatus: -1,
        requestStatus: -1,
        articleList: [],
        pageInfo: {
            pageNo: 1,
            pageSize: 10
        },
        canLoadMore: !0
    },
    onLoad: function(e) {
        var t = i.globalData, a = t.navH, r = t.userInfo, n = t.imgsPathInfo;
        this.setData({
            navH: a,
            userInfo: r,
            imgsPathInfo: n,
            buildingId: e.buildingId,
            canLoadMore: !0
        }), this.getArticleList();
    },
    onReachBottom: function() {
        if (this.data.canLoadMore) {
            var e = this.data.pageInfo.pageNo + 1;
            e = e || 1, this.setData({
                "pageInfo.pageSize": e
            }), this.getArticleList();
        }
    },
    getArticleList: function() {
        var i = this;
        if (this.data.canLoadMore) {
            var a = t.service.getBuildingArticlesInbld.replace("{buildingId}", this.data.buildingId);
            a = a.replace("{userSystem}", "weixin"), e.request({
                url: a,
                data: this.data.pageInfo
            }).then(function(e) {
                if (e && e.length) {
                    var t = i.formatArticleList(e), a = e.length === i.data.pageInfo.pageSize;
                    i.setData({
                        articleList: t,
                        canLoadMore: a
                    });
                }
            });
        }
    },
    operateArticleCardInfo: function(t) {
        var i = t.detail, a = this.data.articleList[i.articleInfo.idx];
        if ("goDetailPage" === i.eventType) {
            var r = this.data.userInfo;
            r && r.OpenId && e.recordArticleClick({
                articleId: a.Id,
                SourceKey: "BuildingRecommend",
                SourceId: this.data.buildingId
            }), a.LinkUrl || (a.LinkUrl = this.data.imgsPathInfo.rootPath + "/#/pages/article_webview/article_webview?id=" + a.Id);
            var n = "/h5_webview/article_webview/article_webview";
            n += "?url=" + encodeURIComponent(a.LinkUrl) + "&title=" + encodeURIComponent(i.articleInfo.title) + "&id=" + i.articleInfo.id, 
            e.navigatePage({
                url: n
            });
        }
    },
    formatArticleList: function(t) {
        var i = this.data.articleList.length || 0;
        return t.map(function(t, a) {
            return t.articleInfo = {
                coverStyle: 1,
                idx: i + a,
                id: t.ArticleId,
                coverFileUrl: e.formatUrl(t.CoverFileUrl),
                title: t.Title,
                covers: [],
                logoUrl: e.formatUrl(t.MediumLogoUrl),
                mediumName: t.MediumName,
                publishTime: e.formatTimeToTill(t.PublishTime)
            }, t;
        });
    }
});