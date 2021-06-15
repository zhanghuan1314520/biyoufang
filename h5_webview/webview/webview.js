require("../../config.js");

var e = require("../../utils/index.js"), t = getApp();

Page({
    data: {
        url: "",
        showGoHome: !1,
        isShare: 0,
        status: -1,
        template: ""
    },
    onLoad: function(a) {
        var i = this;
        t.checkSession(function() {
            i.setData({
                url: decodeURIComponent(a.url),
                isShare: a.isShare ? parseInt(a.isShare) : 0,
                buildingName: a.template ? decodeURIComponent(a.buildingName) : a.buildingName,
                buildingNo: a.template ? decodeURIComponent(a.buildingNo) : a.buildingNo,
                status: a.template ? 1 : a.status ? parseInt(a.status) : -1,
                template: a.template || ""
            }, function() {
                setTimeout(function() {
                    i.setData({
                        showGoHome: !0
                    }, 1e3);
                });
            }), a.template && e.recordTemplateVisit(t.globalData.userInfo.OpenId, a.template);
        }, e.getShareParams(a));
    },
    onShow: function() {},
    goHome: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        return e.extractShareFn({
            util: e,
            app: t
        });
    },
    formatShareText: function() {
        switch (this.data.status) {
          case 0:
            return "查查你在杭州还有没有买房资格";

          case 1:
            return "【" + this.data.buildingName + this.data.buildingNo + "】销售公示方案";

          default:
            return t.globalData.defaultShareText;
        }
    }
});