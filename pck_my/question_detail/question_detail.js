var e = require("../../config.js"), t = require("../../utils/index.js"), n = getApp();

Page({
    data: {
        navH: n.globalData.navH,
        question: "",
        userInfo: null
    },
    onLoad: function(e) {
        var t = this;
        n.checkSession(function() {
            t.setData({
                id: e.id || "",
                userInfo: n.globalData.userInfo
            }, function() {
                t.getQuestionDetail();
            });
        }, e);
    },
    getQuestionDetail: function() {
        var n = this;
        return t.request({
            url: e.service.getCommonProblemDetailInAd.replace("{id}", this.data.id)
        }).then(function(e) {
            e.Content = e.Content.replace(/\<img/gi, '<img style="max-width: 100%;" '), n.setData({
                question: e
            });
        });
    },
    getUserInfo: function(e) {
        var t = this;
        n.authorizeUserInfo(e, function() {
            t.setData({
                userInfo: n.globalData.userInfo
            }, function() {
                t.toFeedback();
            });
        });
    },
    toFeedback: function() {
        wx.navigateTo({
            url: "/h5_webview/feedback/feedback"
        });
    }
});