var t = require("../../config.js"), a = require("../../utils/index.js"), r = getApp(), o = require("../../utils/plugins/michat.js");

Page({
    data: {
        navH: r.globalData.navH,
        userInfo: null,
        buildingId: "",
        pageNo: 1,
        limit: 10,
        canLoadMore: !1,
        brokerList: null
    },
    onLoad: function(t) {
        var a = this;
        wx.hideShareMenu(), r.checkSession(function() {
            a.getBrokers(), a.setData({
                userInfo: r.globalData.userInfo
            });
        });
    },
    onReachBottom: function() {
        this.data.canLoadMore && (this.setData({
            pageNo: this.data.pageNo + 1
        }), this.getBrokers());
    },
    getBrokers: function() {
        var r = this;
        return a.request({
            url: t.service.getMyRealtyConsultant,
            data: {
                pageNo: this.data.pageNo,
                limit: this.data.limit
            }
        }).then(function(t) {
            r.setData({
                brokerList: 1 === r.data.pageNo ? r.formatBrokers(t) : r.data.brokerList.concat(r.formatBrokers(t)),
                canLoadMore: t.length === r.data.limit
            });
        });
    },
    formatBrokers: function(t) {
        var a = this;
        return t.map(function(t) {
            return a.formatBrokerInfo(t);
        });
    },
    formatBrokerInfo: function(t) {
        return t.PersonalImageUrl = a.formatUrl(t.PersonalImageUrl), t.WorkPermitUrl = a.formatUrl(t.WorkPermitUrl), 
        t;
    },
    getUserInfo: function(t) {
        var a = this;
        r.authorizeUserInfo(t.detail, function() {
            a.setData({
                userInfo: r.globalData.userInfo
            }, function() {
                r.globalData.authToChat = !0, r.globalData.authToChatUnionId = t.detail.unionId, 
                o.init(r);
            });
        });
    }
});