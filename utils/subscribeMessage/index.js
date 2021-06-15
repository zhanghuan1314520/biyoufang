var e = require("../../config.js"), t = require("../rqeuest/index.js"), n = function(n, r, i) {
    return new Promise(function(o, u) {
        wx.requestSubscribeMessage ? wx.requestSubscribeMessage({
            tmplIds: [ n ],
            success: function(n) {
                if (Object.keys(n).filter(function(e) {
                    return "accept" === n[e];
                }).length) return i instanceof Array ? t.request({
                    url: e.service.bulkSubscriptionImMsg,
                    method: "POST",
                    data: i
                }).then(function() {
                    o(), s("订阅成功");
                }) : t.request({
                    url: e.service.templateMessageInMsg,
                    method: "POST",
                    data: {
                        MessageType: r,
                        SourceId: i
                    }
                }).then(function() {
                    o(), s("订阅成功");
                });
                u();
            },
            fail: function(e) {
                setTimeout(function() {
                    wx.showModal({
                        title: "提示",
                        content: "订阅消息，及时获得回复通知。请先点击订阅消息，然后勾选提示。",
                        confirmText: "去订阅",
                        success: function(e) {
                            e.confirm && wx.openSetting();
                        }
                    });
                }, 300), u();
            }
        }) : (s("微信暂不支持此版本订阅，或请升级微信版本试试！"), u());
    });
}, s = function(e) {
    return wx.showToast({
        icon: "none",
        title: e,
        duration: 2e3
    });
};

module.exports = {
    getTemplateMessageId: function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, i = getApp();
        return new Promise(function(o, u) {
            var a = i.globalData.templateIds && i.globalData.templateIds[t];
            if (!a) return i.getTemplateIds().then(function() {
                var u = i.globalData.templateIds && i.globalData.templateIds[t];
                u || s("系统出错,请稍后再试"), o(n(u, e, r));
            });
            o(n(a, e, r));
        });
    }
};