var t = require("../../utils/mixins/lotterySubscription.js"), e = require("../../config.js"), o = require("../../utils/index.js"), a = getApp();

Component({
    behaviors: [ t ],
    data: {
        navH: a.globalData.navH,
        pageNo: 1,
        limit: 20,
        canLoadData: !0,
        isShare: 0,
        list: [],
        result: [],
        listFinished: [],
        init: !1,
        maskVisibility: !1,
        useOtherPhone: !1,
        phone: "",
        projectId: "",
        template: "",
        cityInfo: null,
        myLotteryPageNo: 1,
        myLotteryLimit: 99,
        pageStatus: -1,
        imageRoot: a.globalData.imgsPathInfo.rootPath,
        canLoadBanner: !1,
        bgIcons: [ e.imgRootUrl + "/images_wx/weixin_common/cyh_img_bj.png" ]
    },
    methods: {
        onLoad: function(t) {
            var e = this;
            a.checkSession(function() {
                !t && (t = {}), e.setData({
                    userInfo: a.globalData.userInfo,
                    phone: a.globalData.userInfo.PhoneNumber,
                    list: [],
                    listFinished: [],
                    pageNo: 1,
                    canLoadData: !0,
                    template: t.template || "",
                    isShare: 1 * t.isShare || 0,
                    cityInfo: a.globalData.cityInfo,
                    canLoadBanner: !0
                }, function() {
                    e.checkMyLottery().then(function(t) {
                        e.getLotteryLatest();
                    }), t.template && o.recordTemplateVisit(a.globalData.userInfo.OpenId, t.template);
                });
            }, o.getShareParams(t));
        },
        onReachBottom: function() {},
        onShareAppMessage: function() {
            return o.extractShareFn({
                util: o,
                app: a
            });
        },
        onPullDownRefresh: function() {
            var t = this;
            this.setData({
                pageNo: 1,
                list: [],
                init: !1,
                listFinished: [],
                canLoadData: !0
            }, function() {
                t.checkMyLottery().then(function() {
                    t.getLotteryLatest();
                }), wx.stopPullDownRefresh();
            });
        },
        getLotteryLatest: function() {
            var t = this;
            this.data.canLoadData && (this.setData({
                canLoadData: !1
            }), o.request({
                url: e.service.getLotteryLatestInTool,
                data: {}
            }).then(function(e) {
                var a = t.data.list.length, i = t.data.listFinished.length, n = [], r = [];
                e.forEach(function(t, e) {
                    t.info = {
                        buildingId: t.Id,
                        projectId: t.ProjectId,
                        buildingName: t.ProjectName,
                        buildingStatus: ~~t.IsGetLotteryData,
                        buildingStatusText: t.IsGetLotteryData ? "已摇号" : "即将摇号",
                        coverImageUrl: o.formatUrl(t.CoverFileUrl),
                        lotteryTime: t.LotteryTime && t.LotteryTime.replace(/-/g, ".").slice(0, -3),
                        registerNum: t.RegistrationNumber,
                        lotteryPercent: parseFloat(t.SuccessRate.toFixed(2))
                    }, t.IsGetLotteryData ? (t.info.idx = r.length + i, r.push(t)) : (t.info.idx = n.length + a, 
                    n.push(t));
                }), t.setData({
                    list: t.data.list.concat(n),
                    listFinished: t.data.listFinished.concat(r),
                    pageNo: t.data.pageNo + 1,
                    canLoadData: !(e.length < t.data.limit)
                }, function() {
                    2 == t.data.pageNo && t.setData({
                        init: !0
                    });
                });
            }).catch(function(t) {
                console.error(" 获取最新摇号时失败: ", t);
            }));
        },
        checkMyLottery: function() {
            var t = this;
            return this.data.userInfo.WeixinAuthorized ? o.request({
                url: e.service.myLotteryInFollow.replace("{dataNumber}", 7),
                data: {
                    pageNo: this.data.myLotteryPageNo,
                    limit: this.data.myLotteryLimit
                }
            }).then(function(e) {
                t.setData({
                    result: t.formatMyResult(e),
                    pageStatus: 1
                });
            }) : (this.setData({
                pageStatus: 1
            }), Promise.resolve());
        },
        getFollowFormid: function(t) {},
        toLottery: function() {
            wx.navigateTo({
                url: "/pages/lottery/lottery"
            });
        },
        getUserInfo: function(t) {
            var e = this;
            a.authorizeUserInfo(t, function() {
                e.setData({
                    userInfo: a.globalData.userInfo
                }, function() {
                    e.openSubscribe(t);
                });
            });
        },
        getPhoneNumber: function(t, e) {
            var o = this;
            return a.authorizePhoneNumber(t, {
                success: function() {
                    o.setData({
                        userInfo: a.globalData.userInfo
                    }, function() {
                        e && e();
                    });
                }
            });
        },
        openSubscribe: function(t) {
            this.data.userInfo.WeixinAuthorized && this.setData({
                maskVisibility: !0
            });
        },
        operateSubscribe: function(t) {
            var e = t.detail, o = (e = void 0 === e ? {} : e).eventType, i = e.lotteryRegisterDialog;
            console.log(o), "confirm" === o ? this.confirmSubscription(i) : "phoneAuth" === o ? this.setData({
                userInfo: a.globalData.userInfo
            }) : this.closeMask();
        },
        otherPhoneInputing: function(t) {
            this.setData({
                phone: o.trim(t.detail.value)
            });
        },
        confirmSubscription: function(t) {
            var a = this, i = {
                RegistrationNo: t.registerNo,
                PhoneNumber: 1 === t.usingPhoneType ? t.otherPhone : t.wxPhone,
                Name: t.registerName
            };
            o.request({
                url: e.service.subscriptLotteryInFollow,
                method: "POST",
                data: i,
                toastCallBack: function(e, a) {
                    if ("0003" == a) {
                        var i = "未查询到" + t.registerNo + ",请核实后再订阅";
                        o.wxToast(i, 3e3);
                    } else wx.showModal({
                        title: "错误",
                        content: e,
                        showCancel: !1
                    });
                }
            }).then(function(t) {
                o.wxToast("你已订阅。可在“我的-我的订阅”查看"), a.checkMyLottery(), a.closeMask();
            }).catch(function(t) {
                console.error("订阅时失败: ", t);
            });
        },
        closeMask: function() {
            this.setData({
                maskVisibility: !1
            });
        },
        operate: function(t) {
            var e = t.detail.buildiingItemInfo, o = e.projectId, a = e.coverImageUrl, i = e.buildingName, n = e.lotteryTime, r = e.buildingStatus, s = void 0;
            if (!r) return s = "/pages/lottery_lookup/lottery_lookup?projectId=" + o, wx.navigateTo({
                url: s
            });
            s = "/pages/lottery/lottery?", s += "projectId=" + o + "&coverFileUrl=" + a + "&projectName=" + i + "&lotteryTime=" + n + "&lotteried=" + r, 
            wx.navigateTo({
                url: s
            });
        },
        lotteryCardOperate: function(t) {
            var e = t.detail, o = e.eventType, a = e.lotteryStatusInfo, i = e.lotteryStatusInfo, n = (i = void 0 === i ? {} : i).id, r = i.projectId, s = i.projectName, l = i.lotteryTime;
            if (console.log(o, a), "lookDetail" === o) wx.navigateTo({
                url: "/pages/lottery_detail/lottery_detail?registrationId=" + n + "&projectId=" + r
            }); else if ("lookRegisterInfo" === o) {
                var u = "/pages/lottery_lookup/lottery_lookup?";
                u += "projectId=" + r + "&projectName=" + s + "&lotteryTime=" + l, wx.navigateTo({
                    url: u
                });
            } else "lookRank" === o && wx.navigateTo({
                url: "/pages/lottery_detail/lottery_detail?registrationId=" + n + "&projectId=" + r
            });
        }
    }
});