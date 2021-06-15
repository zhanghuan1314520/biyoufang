function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e = require("../../utils/mixins/lotterySubscription.js"), i = require("../../config.js"), a = require("../../utils/index.js"), o = getApp();

Component({
    behaviors: [ e ],
    data: {
        navH: o.globalData.navH,
        subscriptionList: null,
        curCancelName: "",
        curCancelId: "",
        curCancelType: "",
        cancelMaskVisible: !1,
        showPop: !1,
        lackImg: o.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/subscripyion_list__nohouse@3x.png",
        curTab: 1,
        tabList: [ {
            name: "开盘提醒"
        }, {
            name: "摇号提醒"
        }, {
            name: "加推提醒"
        } ],
        preSaleList: null,
        lotteryList: null,
        pushList: null,
        limit: 10,
        contentH: null,
        screenH: o.globalData.screenHeight,
        conf: [ {
            pageNo: 0,
            allow: !0
        }, {
            pageNo: 0,
            allow: !0
        }, {
            pageNo: 0,
            allow: !0
        } ],
        buildingList: [],
        lotteryCardList: [],
        selectIndex: "",
        selectId: "",
        selectNname: ""
    },
    methods: {
        onShow: function() {
            var e = this;
            o.checkSession(function() {
                var i, a = e.data.curTab, o = e.getArrTextToHandle(a);
                e.setData((i = {}, t(i, "" + o, null), t(i, "conf[" + a + "].pageNo", 0), t(i, "conf[" + a + "].allow", !0), 
                i), function() {
                    e.getMySubscriptions();
                });
            });
        },
        onReachBottom: function() {
            this.getMySubscriptions();
        },
        getMySubscriptions: function() {
            var e, o = this, n = this.data.curTab, r = this.data.conf[n];
            if (r.allow) {
                var l = r.pageNo + 1;
                this.setData((e = {}, t(e, "conf[" + n + "].allow", !1), t(e, "conf[" + n + "].pageNo", l), 
                e)), 1 !== n ? a.request({
                    url: i.service.myAddOpenInFollow,
                    data: {
                        pageNo: l,
                        limit: this.data.limit,
                        subscriptionType: n
                    }
                }).then(function(e) {
                    var i = a.handleHomeInfoLists(e);
                    if (e.forEach(function(t) {
                        t.PhoneNumber = a.formatPhoneNumber(t.PhoneNumber);
                    }), 0 === n) {
                        var r;
                        o.setData((r = {
                            preSaleList: i
                        }, t(r, "preSaleList", 1 === l ? e : o.data.preSaleList.concat(e)), t(r, "conf[" + n + "].allow", e.length === o.data.limit), 
                        t(r, "conf[" + n + "].nomore", e.length < o.data.limit), t(r, "buildingList", 1 === l ? o.formatBuildingList(e, 0) : o.data.preSaleList.concat(o.formatBuildingList(e), o.data.buildingList.length)), 
                        r));
                    } else {
                        var s;
                        o.setData((s = {
                            pushList: i
                        }, t(s, "pushList", 1 === l ? e : o.data.pushList.concat(e)), t(s, "conf[" + n + "].allow", e.length === o.data.limit), 
                        t(s, "conf[" + n + "].nomore", e.length < o.data.limit), t(s, "buildingList", 1 === l ? o.formatBuildingList(e, 0) : o.data.pushList.concat(o.formatBuildingList(e, o.data.buildingList.length))), 
                        s));
                    }
                }).catch(function(t) {
                    console.error("获取开盘提醒，加推提醒列表时失败: ", t);
                }) : a.request({
                    url: i.service.myLotteryInFollow.replace("{dataNumber}", 30),
                    data: {
                        pageNo: l,
                        limit: this.data.limit
                    }
                }).then(function(e) {
                    var i;
                    console.log(e, "摇号"), e.forEach(function(t) {
                        t.CoverFileUrl = a.formatUrl(t.CoverFileUrl), t.LotteryTime = a.formatRegisterTimeInDetail(t.LotteryTime), 
                        t.SuccessRate = a.fixedNumber(t.SuccessRate);
                    }), o.setData((i = {
                        lotteryList: 1 === l ? e : o.data.lotteryList.concat(e)
                    }, t(i, "conf[" + n + "].allow", e.length === o.data.limit), t(i, "conf[" + n + "].nomore", e.length < o.data.limit), 
                    t(i, "lotteryCardList", 1 === l ? o.formatMyResult(e, 0) : o.data.lotteryCardList.concat(o.formatMyResult(e, o.data.lotteryCardList.length - 1))), 
                    i));
                }).catch(function(t) {
                    console.error("获取摇号提醒列表时失败: ", t);
                });
            }
        },
        formatBuildingList: function(t, e) {
            return t.map(function(t, i) {
                t.idx = i + e, t.subscribeStatus = 1, t.buildingInfo = {}, t.subscribePhone = t.PhoneNumber, 
                t.propertyType = t.PropertyType, t.SubwayDistance && t.SubwayDistance <= 1500 && (t.SubwayDistance < 1e3 ? t.BuildingTags = "地铁" + t.SubwayDistance + "m" + (t.BuildingTags ? "," + t.BuildingTags : "") : t.BuildingTags = "地铁" + (t.SubwayDistance / 1e3).toFixed(1) + "km" + (t.BuildingTags ? "," + t.BuildingTags : "")), 
                t.buildingInfo = a.formatBuildingInfo(t, o.globalData.cityInfo), t.buildingInfo.codeId = t.Id;
            }), t;
        },
        changeTab: function(t) {
            var e = this, i = t.currentTarget.dataset.index;
            if (i !== this.data.curTab) {
                var a = [];
                0 === i && (a = this.data.preSaleList), 2 === i && (a = this.data.pushList), this.setData({
                    curTab: i,
                    buildingList: a
                }, function() {
                    0 === e.data.conf[e.data.curTab].pageNo && e.getMySubscriptions();
                });
            }
        },
        checkLotteryByProject: function(t) {
            var e = t.currentTarget.dataset.id || "", i = null, a = "";
            (i = this.data.lotteryList.filter(function(t) {
                return t.Id === e;
            })[0] || null) && i.Id && (a = i.IsGetLotteryData ? "/pages/lottery_detail/lottery_detail?registrationId=" + i.RegistrationId + "&projectId=" + i.ProjectId : "/pages/lottery/lottery?projectId=" + i.ProjectId + "&coverFileUrl=" + i.CoverFileUrl + "&projectName=" + i.ProjectName + "&lotteryTime=" + i.LotteryTime + "&lotteried=" + i.IsGetLotteryData) && wx.navigateTo({
                url: a,
                fail: function(t) {
                    console.error("跳转页面时失败: ", t);
                }
            });
        },
        getArrTextToHandle: function(t) {
            switch (t) {
              case 0:
                return "preSaleList";

              case 1:
                return "lotteryList";

              case 2:
                return "pushList";
            }
        },
        operateBuildingCardInfo: function(t) {
            var e = t.detail, i = e.eventType, o = e.buildingCardInfo, n = o.idx, r = o.codeId, l = o.buildingName, s = o.buildingId;
            if ("cancelSubscribe" === i) this.setData({
                selectIndex: n,
                selectId: r,
                selectNname: l,
                showPop: !0
            }); else if ("goDetailPage" === i) {
                var c = {
                    buildingId: o.buildingId,
                    SourceKey: "Subscription"
                };
                o.projectId && (c.ProjectId = o.projectId), a.recordBuildingClick(c), wx.navigateTo({
                    url: "/pages/detail/detail?buildingId=" + s
                });
            }
        },
        checkBuilding: function() {
            wx.reLaunch({
                url: "/pages/building/building"
            });
        },
        checkNone: function() {
            this.setData({
                showPop: !1
            });
        },
        checkYes: function() {
            var t = this, e = this.data, o = e.selectIndex, n = e.selectId;
            return a.request({
                url: i.service.removeSubscribeInFlw.replace("{id}", n),
                method: "DELETE"
            }).then(function() {
                t.checkNone(), a.wxToast("已取消订阅");
                var e = t.data.buildingList;
                e.splice(o, 1), t.setData({
                    buildingList: e
                });
            });
        },
        operateLotteryStatus: function(t) {
            var e = t.detail, i = e.eventType, a = (e.lotteryStatusInfo, e.lotteryStatusInfo), o = (a = void 0 === a ? {} : a).id, n = a.projectId, r = a.projectName, l = a.lotteryTime;
            if ("lookDetail" === i) wx.navigateTo({
                url: "/pages/lottery_detail/lottery_detail?registrationId=" + o + "&projectId=" + n
            }); else if ("lookRegisterInfo" === i) {
                var s = "/pages/lottery_lookup/lottery_lookup?";
                s += "projectId=" + n + "&projectName=" + r + "&lotteryTime=" + l, wx.navigateTo({
                    url: s
                });
            } else "lookRank" === i && wx.navigateTo({
                url: "/pages/lottery_detail/lottery_detail?registrationId=" + o + "&projectId=" + n
            });
        }
    }
});