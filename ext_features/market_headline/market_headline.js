var e = require("../../config.js"), t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        navH: a.globalData.navH,
        pageNo: 0,
        limit: 10,
        allow: !0,
        list: null,
        isShare: 0
    },
    onLoad: function(e) {
        var i = this;
        a.checkSession(function() {
            t.checkAudit().then(function() {
                i.getHeadlineArticlesList();
            }), i.setData({
                isShare: e.isShare ? parseInt(e.isShare) : 0
            });
        }, t.getShareParams(e));
    },
    onReady: function() {},
    onPullDownRefresh: function() {
        var e = this;
        this.setData({
            pageNo: 0,
            list: null,
            allow: !0
        }, function() {
            e.getHeadlineArticlesList().then(function() {
                wx.stopPullDownRefresh();
            });
        });
    },
    onReachBottom: function() {
        this.getHeadlineArticlesList();
    },
    onShareAppMessage: function() {
        return t.extractShareFn({
            util: t,
            app: a
        });
    },
    openListeningArticleList: function() {
        var e = this, i = a.globalData.userInfo;
        i && i.OpenId && wx.createIntersectionObserver(this, {
            observeAll: !0
        }).relativeToViewport({
            bottome: 0,
            top: 0,
            left: 0,
            right: 0
        }).observe(".headline__content", function(a) {
            var r = a.dataset, n = e.data.list.filter(function(e) {
                return e.Id === r.id;
            })[0] || null;
            if (n && n.canTriggerEventTrack) {
                var o = {
                    type: 0,
                    id: r.id,
                    sourceType: 0,
                    sourcePort: 0,
                    openId: i.OpenId,
                    isRecommend: !0,
                    userSystem: 0
                };
                t.addViewRecord(o), n.canTriggerEventTrack = !1;
            }
        });
    },
    getHeadlineArticlesList: function() {
        var i = this;
        if (this.data.allow) {
            this.setData({
                allow: !0,
                pageNo: this.data.pageNo + 1
            });
            var r = {
                limit: this.data.limit,
                pageNo: this.data.pageNo
            };
            return a.globalData.isAuditing && (r.auditing = 1), t.request({
                url: e.service.getHeadlineArticleInAd,
                data: r
            }).then(function(e) {
                var t = i.formatHeadlineArticles(e);
                t.forEach(function(e, a) {
                    e.showDay = !(a > 0) || t[a - 1].day != e.day;
                }), i.setData({
                    list: i.data.list ? i.data.list.concat(t) : t,
                    allow: e.length === i.data.limit
                });
            });
        }
    },
    checkArticle: function(e) {
        var a = e.currentTarget.dataset, i = a.id, r = void 0 === i ? "" : i, n = a.articleId, o = void 0 === n ? "" : n;
        o && t.recordArticleClick({
            articleId: o,
            SourceKey: "ArticleList"
        }), o && t.recordAdvertClick({
            advertId: r
        }), t.checkArticle(e);
    },
    formatHeadlineArticles: function(e) {
        var a = this;
        return e.map(function(e, i) {
            return e.CoverFileUrl = t.formatUrl(e.ImageUrl), e.LogoUrl = t.formatUrl(e.MediumLogoUrl), 
            e.time = a.formatTime(e.PublishTime), e.day = a.formatWeekday(e.PublishTime), e.canTriggerEventTrack = !0, 
            e;
        });
    },
    formatTime: function(e) {
        var a = t.formatQuestionCreateTime(e.replace(/[\.\-]/g, "/"));
        return /[\u4e00-\u9fa5]/.test(a) ? a : a.slice(-8, -3);
    },
    formatWeekday: function(e) {
        var t = new Date(e.replace(/[\.\-]/g, "/")), a = t.getDay(), i = "", r = t.getMonth() + 1, n = t.getDate();
        switch (a) {
          case 0:
            i = "星期日";
            break;

          case 1:
            i = "星期一";
            break;

          case 2:
            i = "星期二";
            break;

          case 3:
            i = "星期三";
            break;

          case 4:
            i = "星期四";
            break;

          case 5:
            i = "星期五";
            break;

          case 6:
            i = "星期六";
        }
        return [ r + "." + n, "" + i ];
    }
});