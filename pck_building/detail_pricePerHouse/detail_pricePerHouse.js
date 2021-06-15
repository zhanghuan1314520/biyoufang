var e = require("../../config.js"), t = require("../../utils/index.js"), r = getApp(), a = require("../../utils/plugins/michat.js");

Page({
    data: {
        navH: r.globalData.navH,
        roomId: "",
        info: null,
        lendingRate: 0,
        userInfo: null,
        recommendBrokerList: null,
        isShare: 0
    },
    onLoad: function(e) {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), r.checkSession(function() {
            if (a.setData({
                userInfo: r.globalData.userInfo,
                roomId: e.roomId || "",
                isShare: e.isShare ? parseInt(e.isShare) : 0
            }, function() {
                a.getLoanFormula().then(function() {
                    a.getPerHouseInfo().then(function() {
                        a.getRecommendBrokers(), wx.hideLoading();
                    });
                });
            }), e.brokerCode) {
                var n = getCurrentPages();
                t.recordShareVisit(e.brokerCode, n[n.length - 1].route + t.serializationUrlParams(e));
            }
        }, t.getShareParams(e));
    },
    getLoanFormula: function() {
        var r = this;
        return t.request({
            url: e.service.getLoanFormula
        }).then(function(e) {
            r.setData({
                lendingRate: e.LendingRate
            });
        });
    },
    getPerHouseInfo: function() {
        var r = this;
        return t.request({
            url: e.service.getRoomInfoDetailInBld.replace("{roomId}", this.data.roomId)
        }).then(function(e) {
            e.Acreage = e.Acreage ? e.Acreage.toFixed(2) : 0, e.perLoan = e.TotalPrice ? r.calcLoan(e) : null, 
            e.TotalPrice = e.TotalPrice ? parseInt(e.TotalPrice / 1e4) : 0, e.BuildingQrcodeUrl = t.formatUrl(e.BuildingQrcodeUrl), 
            r.setData({
                info: e
            });
        });
    },
    calcLoan: function(e) {
        var t = e.TotalPrice;
        return {
            thirty: {
                downPayment: Math.round(.3 * t / 1e4),
                installment: this.calcInstallment(.7 * t)
            },
            sixty: {
                downPayment: Math.round(.6 * t / 1e4),
                installment: this.calcInstallment(.4 * t)
            }
        };
    },
    calcInstallment: function(e) {
        var t = this.data.lendingRate / 12;
        return Math.round(e * t * Math.pow(1 + t, 360) / (Math.pow(1 + t, 360) - 1));
    },
    getRecommendBrokers: function() {
        var r = this;
        return t.request({
            url: e.service.getDetailBrokerListInMem.replace("{buildingId}", this.data.info.BuildingId)
        }).then(function(e) {
            e.ConsultantList = r.formatBrokerList(e.ConsultantList), r.setData({
                recommendBrokerList: e
            });
        });
    },
    formatBrokerList: function(e) {
        return e ? e.map(function(e) {
            return e.PersonalImageUrl = t.formatUrl(e.PersonalImageUrl), e.personalImageUrl = e.PersonalImageUrl, 
            e;
        }) : null;
    },
    operateBrokerCardInfo: function(e) {
        var a = e.detail, n = a.brokerCardInfo;
        if ("goBrokerPage" === a.eventType) {
            var o = "/pages/broker_card/broker_card?brokerId=" + n.Id;
            t.navigatePage({
                url: o
            });
        }
        if ("goChatPage" === a.eventType) {
            if (n.UnionId === r.globalData.userInfo.UnionId) return void t.wxToast("不能给自己发消息");
            var i = "/pck_chat/chat/chat?unionId=" + n.UnionId;
            t.navigatePage({
                url: i
            });
        }
    },
    checkBrokers: function() {
        wx.navigateTo({
            url: "/pck_broker/broker_list/broker_list?buildingId=" + this.data.info.BuildingId
        });
    },
    checkBroker: function(e) {
        e.target.id.indexOf("chat__btn") > -1 || wx.navigateTo({
            url: "/pages/broker_card/broker_card?brokerId=" + e.currentTarget.dataset.brokerid
        });
    },
    goChat: function(e) {
        var a = e.currentTarget.dataset.id;
        a !== r.globalData.userInfo.UnionId ? wx.navigateTo({
            url: "/pck_chat/chat/chat?unionId=" + a
        }) : t.wxToast("不能给自己发消息");
    },
    getUserInfo: function(e) {
        var n = this;
        r.authorizeUserInfo(e, function() {
            n.setData({
                userInfo: r.globalData.userInfo
            }, function() {
                var n = e.currentTarget.dataset.id;
                n !== r.globalData.userInfo.UnionId ? (r.globalData.authToChat = !0, r.globalData.authToChatUnionId = n, 
                a.init(r)) : t.wxToast("不能给自己发消息");
            });
        });
    },
    onShareAppMessage: function() {
        return t.extractShareFn({
            util: t,
            app: r
        });
    }
});