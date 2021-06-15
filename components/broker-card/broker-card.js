var e = require("../../utils/index.js"), t = require("../../config.js"), o = require("../../utils/plugins/michat.js"), r = getApp();

Component({
    properties: {
        brokerCardInfo: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: null
        }
    },
    data: {},
    methods: {
        noop: function() {},
        getUserInfo: function(a) {
            var i = this;
            if (!r.globalData.isAuthorizing && "getUserInfo:ok" === a.detail.errMsg) {
                r.globalData.isAuthorizing = !0, wx.showLoading({
                    title: "授权中"
                });
                var n = a.detail;
                e.request({
                    url: t.service.weixin,
                    method: "POST",
                    data: {
                        SessionId: r.globalData.userInfo.SessionId,
                        EncryptedData: n.encryptedData,
                        iv: n.iv
                    }
                }).then(function(e) {
                    r.login(function() {
                        i.setData({
                            userInfo: r.globalData.userInfo
                        }, function() {
                            wx.hideLoading(), r.globalData.isAuthorizing = !1, r.globalData.mimcUser || !e.UnionId || e.Blacklist || o.init(i), 
                            i.goChatPage();
                        });
                    });
                }).catch(function(e) {
                    wx.hideLoading(), r.globalData.isAuthorizing = !1;
                });
            }
        },
        goChatPage: function() {
            var t = this.data.userInfo, o = this.properties.brokerCardInfo;
            t && t.UnionId === o.UnionId ? e.wxToast("不能给自己发消息") : this.triggerEvent("operateBrokerCardInfo", {
                eventType: "goChatPage",
                brokerCardInfo: o
            }, {});
        },
        goBrokerPage: function() {
            var e = this.properties.brokerCardInfo;
            this.triggerEvent("operateBrokerCardInfo", {
                eventType: "goBrokerPage",
                brokerCardInfo: e
            }, {});
        }
    }
});