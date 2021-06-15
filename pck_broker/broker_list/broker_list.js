function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = require("../../config.js"), a = require("../../utils/index.js"), o = getApp(), n = require("../../utils/plugins/michat.js");

Page({
    data: {
        navH: o.globalData.navH,
        userInfo: null,
        buildingId: "",
        pageNo: 1,
        limit: 10,
        canLoadMore: !1,
        brokerList: []
    },
    onLoad: function(e) {
        var t = this;
        o.checkSession(function() {
            var a = o.globalData.userInfo;
            t.setData({
                buildingId: e.buildingId,
                userInfo: a
            }), t.getBrokers();
        }, e);
    },
    onShow: function() {
        var e = this;
        o.globalData.hasChangeBrokerFollow && this.setData({
            pageNo: 1,
            canLoadMore: !0,
            brokerList: []
        }, function() {
            e.getBrokers(), o.globalData.hasChangeBrokerFollow = !1;
        });
    },
    onReachBottom: function() {
        this.data.canLoadMore && (this.setData({
            pageNo: this.data.pageNo + 1
        }), this.getBrokers());
    },
    getBrokers: function() {
        var e = this;
        return a.request({
            url: t.service.getRecommendBrokersInMem.replace("{buildingId}", this.data.buildingId),
            data: {
                pageNo: this.data.pageNo,
                limit: this.data.limit
            }
        }).then(function(t) {
            e.setData({
                brokerList: 1 === e.data.pageNo ? e.formatBrokers(t) : e.data.brokerList.concat(e.formatBrokers(t)),
                canLoadMore: t.length === e.data.limit
            });
        });
    },
    toggleFocus: function(t) {
        var o = this, n = this.data.userInfo;
        t.IsUnbound || !n || n && !n.WeixinAuthorized || a.toggleFollowBroker(t).then(function() {
            t.IsFollow || wx.showToast({
                title: "关注成功"
            });
            var a = "brokerList[" + t.idx + "].IsFollow";
            o.setData(e({}, a, !t.IsFollow));
        });
    },
    getUserInfo: function(e) {
        var i = this, r = e.detail.eventDetail;
        if (!o.globalData.isAuthorizing && "getUserInfo:ok" === r.detail.errMsg) {
            o.globalData.isAuthorizing = !0, wx.showLoading({
                title: "授权中"
            });
            var s = r.detail;
            return a.request({
                url: t.service.weixin,
                method: "POST",
                data: {
                    SessionId: o.globalData.userInfo.SessionId,
                    EncryptedData: s.encryptedData,
                    iv: s.iv
                }
            }).then(function(t) {
                o.login(function() {
                    i.setData({
                        userInfo: o.globalData.userInfo
                    }, function() {
                        wx.hideLoading(), o.globalData.isAuthorizing = !1;
                        var t = e.detail.brokerItemInfo;
                        "goChatPage" === e.detail.eventType && (o.globalData.mimcUser || n.init(), i.goChatPage(t)), 
                        "followMe" === e.detail.eventType && i.toggleFocus(t);
                    });
                });
            }).catch(function(e) {
                wx.hideLoading(), o.globalData.isAuthorizing = !1;
            });
        }
    },
    getUserInfo2: function(t) {
        var i = this;
        o.authorizeUserInfo(t.detail, function() {
            i.setData({
                userInfo: o.globalData.userInfo
            }, function() {
                switch (t.detail.type) {
                  case "chat":
                    o.globalData.authToChat = !0, o.globalData.authToChatUnionId = t.detail.unionId, 
                    n.init(o);
                    break;

                  case "follow":
                    var r = t.detail.index, s = i.data.brokerList[r];
                    a.toggleFollowBroker(s).then(function() {
                        s.IsFollow || wx.showToast({
                            title: "关注成功"
                        }), i.setData(e({}, "brokerList[" + r + "].IsFollow", !s.IsFollow));
                    });
                }
            });
        });
    },
    makePhone: function(e) {
        e.IsUnbound || (a.recordInteractTarck(e.Id, this.data.buildingId).then(function(e) {}), 
        a.callPhone(e.PhoneNumber));
    },
    copyWeChatNo: function(e) {
        e.IsUnbound || a.promisify(wx.setClipboardData)({
            data: e.WechatNumber
        }).then(function() {
            wx.showToast({
                title: "微信号已复制"
            });
        });
    },
    goChatPage: function(e) {
        var t = this.data.userInfo;
        if (!e.IsUnbound && t && (!t || t.WeixinAuthorized)) if (t.UnionId !== e.UnionId) {
            var o = "/pck_chat/chat/chat?unionId=" + e.UnionId + "&chatSourceType=5";
            a.navigatePage({
                url: o
            });
        } else a.wxToast("不能给自己发消息");
    },
    toBrokerRegistion: function() {
        var e = this.data.userInfo.RealtyConsultantInfo;
        wx.navigateTo({
            url: "/ext_features/broker_registion/broker_registrion?checkState=" + (e ? 3 : 0)
        });
    },
    operateBrokerItemInfo: function(e) {
        var t = e.detail, o = t.brokerItemInfo, n = getCurrentPages(), i = "";
        if ("goDetailPage" === t.eventType && (i = "/pages/detail/detail?buildingId=" + this.data.buildingId), 
        "followMe" !== t.eventType && "goChatPage" !== t.eventType || this.getUserInfo(e), 
        "follow" === t.eventType && this.toggleFocus(o), "phone" === t.eventType && this.makePhone(o), 
        "consult" === t.eventType && this.goChatPage(o), "weChat" === t.eventType && this.copyWeChatNo(o), 
        "goBrokerCardPage" === t.eventType) {
            if (o.IsUnbound) return;
            if (n[n.length - 1].route && "pages/broker/broker" === n[n.length - 1].route) return;
            i = "/pages/broker_card/broker_card?brokerId=" + o.Id;
        }
        i && a.navigatePage({
            url: i
        });
    },
    formatBrokers: function(e) {
        var t = this;
        return e.map(function(e, o) {
            return e.idx = o, e.PersonalImageUrl = a.formatUrl(e.PersonalImageUrl), e.WorkPermitUrl = a.formatUrl(e.WorkPermitUrl), 
            e.btnList = t.initBtnList(), e;
        });
    },
    initBtnList: function() {
        return [ {
            id: 0,
            name: "咨询",
            type: "consult",
            iconSrc: "/resource/base/base_icon_consult@3x.png",
            mode: "vertical",
            needAuthorization: !0
        }, {
            id: 1,
            name: "电话",
            type: "phone",
            iconSrc: "/resource/base/base_icon_phone@3x.png",
            mode: "vertical"
        }, {
            id: 2,
            name: "微信",
            type: "weChat",
            iconSrc: "/resource/base/base_icon_wechat@3x.png",
            mode: "vertical"
        } ];
    }
});