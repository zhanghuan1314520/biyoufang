require("../../config.js"), require("../../utils/index.js");

var e = getApp();

Page({
    data: {
        navH: e.globalData.navH
    },
    onLoad: function(e) {},
    feedback: function() {
        wx.navigateTo({
            url: "/h5_webview/feedback/feedback"
        });
    }
});