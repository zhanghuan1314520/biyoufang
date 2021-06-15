var t = require("../../../config.js"), e = require("../../../utils/index.js"), a = getApp(), i = null;

Component({
    properties: {
        categoryId: {
            type: String,
            value: ""
        },
        home: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        hasInit: !1,
        pageNo: 1,
        limit: 10,
        ifLoad: !1,
        list: [],
        HeadlineArticle: [],
        allow: !0,
        pageRoute: "pages/market/market",
        loadAll: !0,
        auditing: a.globalData.isAuditing,
        imageRoot: a.globalData.imgsPathInfo.rootPath,
        newArticleLength: 0
    },
    attached: function() {
        var t = this;
        this.properties.home && this.getMarketBanner().then(function() {
            t.getArticles();
        });
    },
    methods: {
        openListeningArticleList: function() {
            var t = this, e = a.globalData.userInfo;
            e && e.OpenId && (i && (i.disconnect(), i = null), (i = wx.createIntersectionObserver(this, {
                observeAll: !0
            }).relativeToViewport({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            })).observe(".observe-item", function(e) {
                var a = t.data.list[(e.dataset || {}).idx];
                a && !a.eventTrackFLag && 2 !== !a.eventTrackStatus && (a.eventTrackStatus = 1, 
                a.eventTrackFLag = !0);
            }));
        },
        handleBannerTrace: function() {
            return this.data.list.slice(0, 3).map(function(t) {
                if (1 === t.eventTrackStatus && t.IsRecommend) return t.eventTrackStatus = 2, t.Id;
            }).filter(function(t) {
                return t;
            });
        },
        handleArticleTrace: function() {
            return this.data.list.filter(function(t) {
                return 1 === t.eventTrackStatus && !t.IsRecommend;
            }).map(function(t) {
                return t.eventTrackStatus = 2, t.Id;
            }) || [];
        },
        init: function() {
            var t = this;
            this.setData({
                allow: !0,
                list: [],
                pageNo: 1
            }, function() {
                t.getMarketBanner().then(function() {
                    t.getArticles();
                });
            });
        },
        getMarketBanner: function() {
            var a = this;
            return e.request({
                url: t.service.getArticleListInAd.replace("{positionKey}", "LatestArticle")
            }).then(function(t) {
                a.formatLastArticle(t, 0, !0), a.setData({
                    list: t,
                    newArticleLength: t.length
                });
            });
        },
        getArticles: function() {
            var i = this;
            if (this.data.allow) {
                this.setData({
                    allow: !1
                });
                var r = {
                    pageSize: this.data.limit,
                    pageNo: this.data.pageNo,
                    auditing: a.globalData.isAuditing
                };
                return e.request({
                    url: t.service.getHomeArticlesInArticle,
                    data: r
                }).then(function(t) {
                    var e = i.data.list.length;
                    i.formatArticle(t, e, !1);
                    var a = {
                        allow: t.length === i.data.limit,
                        loadAll: t.length < i.data.limit
                    };
                    t.map(function(t) {
                        a["list[" + e + "]"] = t, e++;
                    }), i.setData(a, function() {
                        "pages/market/market" === (i.data.pageRoute || "") && i.openListeningArticleList(), 
                        wx.hideLoading(), 1 === i.data.pageNo && i.setData({
                            hasInit: !0
                        }), i.setData({
                            pageNo: i.data.pageNo + 1
                        });
                    });
                });
            }
        },
        formatLastArticle: function(t, a) {
            var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            t.map(function(t, a) {
                return t.CoverFileUrl = e.formatUrl(t.ImageUrl), t.LogoUrl = e.formatUrl(t.MediumLogoUrl), 
                t.PublishTime = e.formatArticleTime(t.PublishTime), t.CoverStyle = 1, t.LinkUrl = t.ArticleUrl, 
                t.IsRecommend = i, t.idx = a, t.eventTrackFLag = !1, t;
            });
        },
        formatArticle: function(a, i) {
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            a.map(function(a, r) {
                var n = JSON.parse(a.CoverImagesJson);
                return a.LogoUrl = e.formatUrl(a.MediumLogoUrl), a.PublishTime = e.formatArticleTime(a.PublishTime), 
                a.LinkUrl = a.LinkUrl || t.imgRootUrl + "/#/pages/article_webview/article_webview?id=" + a.Id, 
                a.eventTrackStatus = 0, a.eventTrackFLag = !1, a.idx = i + r, n && n.length && (a.Covers = n.map(function(t) {
                    var i = e.formatOSSLink(t.FilePath, "image/format,webp/resize,w_375");
                    return a.CoverFileUrl = i, i;
                })), a;
            });
        },
        checkArticle: function(t) {
            var i = t.currentTarget.dataset.idx, r = this.data.list[i], n = r.LinkUrl, l = r.Title, o = r.Id, c = r.ArticleId, s = void 0 === c ? "" : c;
            n = encodeURIComponent(n);
            a.globalData.userInfo;
            if ("null" === String(n)) return e.wxToast("当前文章没有跳转地址");
            wx.navigateTo({
                url: "/h5_webview/article_webview/article_webview?url=" + n + "&title=" + encodeURIComponent(l) + "&id=" + (s || o)
            }), s ? (e.recordAdvertClick({
                advertId: o
            }), e.recordArticleClick({
                articleId: s,
                SourceKey: "Advert"
            })) : e.recordArticleClick({
                articleId: o,
                SourceKey: "ArticleList"
            });
        }
    }
});