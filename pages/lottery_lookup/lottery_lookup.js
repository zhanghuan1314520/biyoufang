var t = require("../../config.js"), e = require("../../utils/index.js"), o = getApp();

Page({
    data: {
        navH: o.globalData.navH,
        title: "查摇号",
        userInfo: null,
        checkMyLottery: 0,
        table: null,
        pageStatus: -1,
        maskVisibility: !1,
        isIpx: o.globalData.isIpx
    },
    onLoad: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中..."
        }), o.checkSession(function() {
            e.setData({
                userInfo: o.globalData.userInfo,
                projectId: t.projectId,
                checkMyLottery: t.checkMyLottery || 0,
                title: "查摇号",
                projectName: t.projectName ? decodeURIComponent(t.projectName) : "",
                coverFileUrl: t.coverFileUrl ? decodeURIComponent(t.coverFileUrl) : "",
                status: t.lotteried ? "true" == t.lotteried ? 4 : 3 : "",
                lotteryTime: t.lotteryTime && t.lotteryTime.replace(/-/g, ".") || "",
                isShare: t.isShare ? parseInt(t.isShare) : 0,
                cityInfo: o.globalData.cityInfo
            }), e.searchLotteryResult();
        }, t);
    },
    searchLotteryResult: function() {
        var o = this;
        return e.request({
            url: t.service.getRegistrationsInTool.replace("{projectId}", this.data.projectId),
            data: {}
        }).then(function(t) {
            wx.setStorage({
                key: "lotteryStatistics",
                data: t
            }), t.CoverImageUrl = e.formatUrl(t.CoverImageUrl), t.LotteryTime = t.LotteryTime && t.LotteryTime.replace(/-/g, ".").slice(0, -3) || "", 
            Object.assign(t, t.RegistrationStatistic), delete t.RegistrationStatistic, o.setData({
                table: t,
                pageStatus: 1
            }), wx.hideLoading();
        }).catch(function() {
            wx.hideLoading();
        });
    },
    gotoHelp: function() {
        wx.navigateTo({
            url: "/ext_features/lottery_help/lottery_help"
        });
    },
    toggleToast: function() {
        this.setData({
            maskVisibility: !this.data.maskVisibility
        });
    },
    operateSubscribe: function(t) {
        var e = t.detail, o = (e = void 0 === e ? {} : e).eventType, i = e.lotteryRegisterDialog;
        "confirm" === o ? this.confirmSubscription(i) : this.toggleToast();
    },
    confirmSubscription: function(o) {
        var i = this, a = {
            RegistrationNo: o.registerNo,
            PhoneNumber: 1 === o.usingPhoneType ? o.otherPhone : o.wxPhone,
            Name: o.registerName
        };
        e.request({
            url: t.service.subscriptLotteryInFollow,
            method: "POST",
            data: a,
            toastCallBack: function(t, i) {
                if ("0003" == i) {
                    var a = "未查询到" + o.registerNo + ",请核实后再订阅";
                    e.wxToast(a, 3e3);
                } else wx.showModal({
                    title: "错误",
                    content: t,
                    showCancel: !1
                });
            }
        }).then(function(t) {
            e.wxToast("你已订阅。可在“我的-我的订阅”查看，或取消订阅"), i.toggleToast();
        }).catch(function(t) {
            console.error("订阅时失败: ", t);
        });
    },
    navigationPoster: function() {
        e.navigatePage({
            url: "/pck_poster/lottery_poster/index?projectId=" + this.data.projectId
        });
    }
});