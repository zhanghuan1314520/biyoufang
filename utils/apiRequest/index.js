var e = require("../rqeuest/index.js").request, a = require("../../config.js");

module.exports = {
    showTabBarRedDot: function() {
        var e = getApp().globalData, a = e.subscribeMessageUnRead, s = e.systemMessageUnRead, t = e.hasChatNoReader, o = e.followCount;
        a || t || s ? wx.showTabBarRedDot({
            index: 2
        }) : wx.hideTabBarRedDot({
            index: 2
        }), o ? wx.showTabBarRedDot({
            index: 4
        }) : wx.hideTabBarRedDot({
            index: 4
        });
    },
    getNoreadnumber: function() {
        var s = this, t = getApp();
        if (t.globalData.userInfo.OpenId) return e({
            url: a.service.getNewMsgNum,
            data: {
                openId: t.globalData.userInfo.OpenId,
                userSystem: 0
            }
        }).then(function(e) {
            var a = e.SubscribeMessage, o = e.SystemMessage;
            t.globalData.subscribeMessageUnRead = a && a.IsUnread, t.globalData.systemMessageUnRead = o && o.IsUnread, 
            s.showTabBarRedDot();
        });
    },
    getNoreadFollow: function() {
        var s = this, t = getApp();
        if (t.globalData.userInfo.RealtyConsultantInfo) return e({
            url: a.service.getMyNewFansInFlw
        }).then(function(e) {
            t.globalData.followCount = e, s.showTabBarRedDot();
        });
    }
};