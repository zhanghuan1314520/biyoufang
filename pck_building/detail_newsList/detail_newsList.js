var e = require("../../config.js"), t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        userInfo: a.globalData.userInfo,
        navH: a.globalData.navH,
        pageNo: 1,
        limit: 20,
        canLoadMore: !1,
        list: [],
        loading: !0
    },
    onLoad: function(e) {
        var i = this;
        a.checkSession(function() {
            i.setData({
                buildingId: e.buildingId,
                buildingName: e.buildingName
            }, function() {
                i.getNewsList();
            });
        }, t.getShareParams(e));
    },
    onReachBottom: function() {
        var e = this;
        this.data.canLoadMore && this.setData({
            pageNo: this.data.pageNo + 1
        }, function() {
            e.getNewsList();
        });
    },
    getNewsList: function() {
        var a = this, i = this.data;
        return 1 === i.pageNo && (wx.showLoading({
            title: "加载中"
        }), this.setData({
            loading: !1
        })), t.request({
            url: e.service.getNewsListInBld.replace("{buildingId}", i.buildingId),
            data: {
                pageNo: i.pageNo,
                limit: i.limit
            }
        }).then(function(e) {
            a.setData({
                list: a.data.list.concat(a.handlerNewsList(e)),
                canLoadMore: !(e.length < a.data.limit)
            }, function() {
                wx.hideLoading();
            });
        });
    },
    handlerNewsList: function(e) {
        var a = this;
        return e.map(function(e, i) {
            return e.Images && e.Images.length && (e.Images = e.Images.map(function(e) {
                return e = t.formatUrl(e);
            })), e.time = a.handlerNewsTime(e.CreateTime), e;
        });
    },
    handlerNewsTime: function(e) {
        var a = e.replace(/[\.\-]/g, "/"), i = new Date(), n = i.getFullYear(), o = i.getMonth() + 1, r = i.getDate(), s = new Date(a), g = s.getFullYear(), l = s.getMonth() + 1, u = s.getDate(), d = (i - s) / 864e5, c = void 0, h = void 0;
        return n == g ? r == u && o == l ? (h = "今天", c = "") : d < 1 && r != u ? (h = "昨天", 
        c = "") : (h = t.fixPrefixion(u), c = g + "." + t.fixPrefixion(l)) : (h = t.fixPrefixion(u), 
        c = g + "." + t.fixPrefixion(l)), {
            yearMonth: c,
            day: h
        };
    },
    onShareAppMessage: function() {
        return t.extractShareFn({
            util: t,
            app: a
        });
    }
});