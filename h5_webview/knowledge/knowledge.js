var e = require("../../config.js"), t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        navH: a.globalData.navH,
        nullImg: a.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/null.png",
        curTab: 0,
        pageNo: 1,
        limit: 20,
        canLoad: !0,
        list: []
    },
    onLoad: function(e) {
        var n = this;
        a.checkSession(function() {
            n.getKnowledges();
        }, t.getShareParams(e));
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNo: 1
        }), this.getKnowledges().then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        this.data.canLoad && (this.setData({
            pageNo: this.data.pageNo + 1
        }), this.getKnowledges());
    },
    changeTab: function(e) {
        var t = e.currentTarget.dataset.tab;
        t !== this.data.curTab && (this.setData({
            curTab: t,
            pageNo: 1
        }), this.getKnowledges());
    },
    getKnowledges: function() {
        var a = this, n = this.data, i = n.pageNo, o = n.limit, r = n.curTab, s = n.list;
        return t.request({
            url: e.service.getBuyHouseInAd.replace("{articleType}", r),
            data: {
                pageNo: i,
                pageSize: o
            }
        }).then(function(e) {
            a.setData({
                list: 1 === i ? e : s.concat(e),
                canLoad: o === e.length
            });
        });
    },
    readKnowledge: function(e) {
        var t = e.currentTarget.dataset.index;
        t *= 1;
        var a = this.data.list[t], n = a.Id, i = a.Title, o = a.LinkUrl;
        wx.navigateTo({
            url: "/h5_webview/article_webview/article_webview?url=" + encodeURIComponent(o) + "&title=" + encodeURIComponent(i) + "&id=" + n + "&type=purchasearticle"
        });
    },
    onShareAppMessage: function() {
        return t.extractShareFn({
            util: t,
            app: a
        });
    }
});