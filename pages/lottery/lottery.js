var t = require("../../utils/mixins/lotterySubscription.js"), e = require("../../config.js"), a = require("../../utils/index.js"), o = getApp();

Component({
    behaviors: [ t ],
    data: {
        backTop: o.globalData.navH - 32,
        userInfo: null,
        btnClearVisible: !1,
        inputValue: "",
        focus: !1,
        key: "",
        isShare: 0,
        pageNo: 1,
        limit: 20,
        result: null,
        canLoadMore: !1,
        maskVisibility: !1,
        maskInformation: null,
        useOtherPhone: !1,
        screenHeight: o.globalData.screenHeight,
        lotteryingMask: !1,
        projectId: "",
        statusBarHeight: 0,
        headPosterScale: 1,
        myLotteryPageNo: 1,
        myLotteryLimit: 99,
        nomore: !1,
        init: !1,
        hasLotteried: !1,
        template: "",
        imageRoot: o.globalData.imgsPathInfo.rootPath,
        projectList: "",
        title: "查摇号",
        lotteryTime: ""
    },
    methods: {
        onLoad: function(t) {
            var e = this;
            o.checkSession(function() {
                if (t.scene) {
                    var r = decodeURIComponent(t.scene);
                    e.bulidmassge(!0, r);
                } else e.setData({
                    userInfo: o.globalData.userInfo,
                    checkMyLottery: t.checkMyLottery || 0,
                    title: t.checkMyLottery ? "我的摇号" : (t.projectId, "已摇号"),
                    navH: o.globalData.navH,
                    template: t.template || "",
                    projectId: t.projectId || "",
                    lotteryTime: t.lotteryTime || "",
                    isShare: t.template ? 1 : t.isShare ? parseInt(t.isShare) : 0
                }), e.bulidmassge(), t.template ? a.recordTemplateVisit(o.globalData.userInfo.OpenId, t.template) : t.projectId && e.searchLottery(), 
                e.setData({
                    init: !0
                });
            }, a.getShareParams(t));
        },
        onReachBottom: function() {
            this.data.canLoadMore && (this.setData({
                pageNo: this.data.pageNo + 1
            }), this.searchLottery());
        },
        lottery: function(t) {
            var e = a.trim(t.detail.value);
            "" !== e || this.data.projectId ? (wx.showLoading({
                title: "加载中.."
            }), this.setData({
                key: e,
                pageNo: 1
            }), this.searchLottery()) : wx.showToast({
                title: "请输入登记编号或登记证件号码",
                icon: "none"
            });
        },
        changeKey: function(t) {
            var e = t.detail.value;
            this.setData({
                key: e
            });
        },
        bulidmassge: function() {
            var t = this, r = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = arguments[1], s = "";
            s = r ? e.service.lotteryBuildByCodeInBld.replace("{shortCode}", i) : e.service.getRegistrationsInTool.replace("{projectId}", this.data.projectId), 
            a.request({
                url: s
            }).then(function(e) {
                var i = e.CoverImageUrl, s = e.HadLottery, n = e.ProjectName, l = e.ProjectId, c = e.LotteryTime;
                wx.setStorage({
                    key: "lotteryStatistics",
                    data: e
                }), r ? s ? t.setData({
                    userInfo: o.globalData.userInfo,
                    checkMyLottery: 1,
                    title: "已摇号",
                    navH: o.globalData.navH,
                    projectId: l,
                    lotteryTime: c,
                    isShare: 1,
                    projectName: n,
                    coverFileUrl: a.formatUrl(i),
                    init: !0
                }, function() {
                    t.searchLottery();
                }) : (wx.showToast({
                    title: "摇号结果未出，前往即将摇号页面...",
                    icon: "none",
                    mask: !0
                }), setTimeout(function() {
                    a.navigatePage({
                        url: "/pages/lottery_lookup/lottery_lookup?projectId=" + l,
                        goType: "redirectTo"
                    });
                }, 1500)) : t.setData({
                    projectName: e.ProjectName,
                    coverFileUrl: a.formatUrl(e.CoverImageUrl),
                    lotteryTime: c
                });
            });
        },
        searchLottery: function() {
            var t = this;
            return a.request({
                url: e.service.getLotteryRejestInTool.replace("{projectId}", this.data.projectId),
                data: {
                    key: this.data.key,
                    pageNo: this.data.pageNo,
                    expired: a.isExpiredTime(this.data.lotteryTime)
                }
            }).then(function(e) {
                e.length < 1 && a.wxToast("抱歉，未查询到摇号信息");
                var o = 1 === t.data.pageNo ? 0 : t.data.result ? t.data.result.length : 0;
                t.setData({
                    result: 1 === t.data.pageNo ? t.formatResult(e, o) : t.data.result.concat(t.formatResult(e, o)),
                    canLoadMore: e.length === t.data.limit,
                    nomore: e.length < t.data.limit,
                    inputValue: t.data.key
                }, function() {
                    !t.data.hasLotteried && t.data.result.length > 0 && t.setData({
                        hasLotteried: !0
                    });
                });
            });
        },
        getUserInfo: function(t) {
            var e = this;
            o.authorizeUserInfo(t, function() {
                e.setData({
                    userInfo: o.globalData.userInfo
                }, function() {
                    e.toggleLotteryRegister();
                });
            });
        },
        toggleLotteryRegister: function() {
            this.setData({
                maskVisibility: !this.data.maskVisibility
            });
        },
        getPhoneNumber: function(t) {
            var e = this;
            o.authorizePhoneNumber(t, {
                success: function() {
                    e.setData({
                        phone: o.globalData.userInfo.PhoneNumber,
                        userInfo: o.globalData.userInfo
                    });
                }
            });
        },
        lotteryCardOperate: function(t) {
            var e = t.detail, a = e.eventType, o = (e.lotteryStatusInfo, e.lotteryStatusInfo), r = (o = void 0 === o ? {} : o).id, i = o.projectId, s = o.projectName, n = o.lotteryTime;
            if ("lookDetail" === a) wx.navigateTo({
                url: "/pages/lottery_detail/lottery_detail?registrationId=" + r + "&projectId=" + i + "&lotteryTime=" + this.data.lotteryTime
            }); else if ("lookRegisterInfo" === a) {
                var l = "/pages/lottery_lookup/lottery_lookup?";
                l += "projectId=" + i + "&projectName=" + s + "&lotteryTime=" + n, wx.navigateTo({
                    url: l
                });
            } else "lookRank" === a && wx.navigateTo({
                url: "/pages/lottery_detail/lottery_detail?registrationId=" + r + "&projectId=" + i + "&lotteryTime=" + this.data.lotteryTime
            });
        },
        onShareAppMessage: function() {
            return a.extractShareFn({
                util: a,
                app: o
            });
        },
        back: function() {
            this.data.isShare ? wx.switchTab({
                url: "/pages/index/index"
            }) : wx.navigateBack();
        },
        clearInput: function() {
            this.setData({
                inputValue: "",
                key: ""
            });
        },
        otherPhoneInputing: function(t) {
            this.setData({
                phone: a.trim(t.detail.value)
            });
        },
        getFollowFormid: function(t) {},
        operateSubscribe: function(t) {
            var e = t.detail, a = (e = void 0 === e ? {} : e).eventType, o = e.lotteryRegisterDialog;
            "confirm" === a ? this.confirmSubscription(o) : this.toggleLotteryRegister();
        },
        navigationPoster: function() {
            a.navigatePage({
                url: "/pck_poster/lottery_poster/index?projectId=" + this.data.projectId
            });
        }
    }
});