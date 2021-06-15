function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = require("../../config.js"), a = require("../../utils/index.js"), n = getApp();

Page({
    data: {
        navH: n.globalData.navH,
        nullImg: n.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/null.png",
        pageNo: 0,
        limit: 20,
        allow: !0,
        curTab: 0,
        tabList: [ {
            name: "楼盘"
        }, {
            name: "品牌"
        }, {
            name: "顾问"
        } ],
        interests: [],
        brokers: [],
        brandList: []
    },
    onLoad: function(e) {
        var t = this;
        wx.hideShareMenu(), n.checkSession(function() {
            t.getMyFollow();
        }, e);
    },
    onShow: function() {
        var e = this;
        (n.globalData.hasChangeBuildingStatus || n.globalData.hasChangeBrokerFollow) && this.setData({
            pageNo: 0,
            interests: null,
            brokers: null,
            allow: !0
        }, function() {
            e.getMyFollow(), n.globalData.hasChangeBuildingStatus = !1, n.globalData.hasChangeBrokerFollow = !1;
        });
    },
    getBrandList: function() {
        var e = this;
        return a.request({
            url: t.service.myFollowBrand,
            data: {
                pageNo: this.data.pageNo
            }
        }).then(function(t) {
            t = t.map(function(e) {
                return e.ImageUrl = a.formatUrl(e.ImageUrl), e.IsFollow = !0, e.Id = e.BrandAdvertId, 
                e;
            }), e.setData({
                brandList: t
            });
        });
    },
    getMyFollow: function() {
        var e = this;
        if (this.data.allow) {
            this.setData({
                allow: !1,
                pageNo: this.data.pageNo + 1
            });
            var n = this.data.curTab;
            if (1 === n) return this.getBrandList();
            var o = 0 === n ? t.service.myAttentionBuildinginFlw : t.service.myAttentionCounselorinFlw;
            return a.request({
                url: o,
                data: {
                    pageNo: this.data.pageNo,
                    limit: this.data.limit
                }
            }).then(function(t) {
                if (0 === n) {
                    var o = e.formatBuildingList(t, e.data.interests.length ? e.data.interests.length : 0);
                    e.setData({
                        interests: e.data.interests ? e.data.interests.concat(o) : o,
                        allow: t.length === e.data.limit
                    });
                } else t.forEach(function(t, n) {
                    t.idx = n, t.PersonalImageUrl = a.formatUrl(t.PersonalImageUrl) || "", t.WorkPermitUrl = a.formatUrl(t.WorkPermitUrl), 
                    t.btnList = e.initBtnList();
                }), e.setData({
                    brokers: e.data.brokers ? e.data.brokers.concat(t) : t,
                    allow: t.length === e.data.limit
                });
            });
        }
    },
    formatBuildingList: function(e, t) {
        return e.map(function(e, o) {
            e.idx = o + t, e.followStatus = 1, e.buildingInfo = {}, e.subscribePhone = e.PhoneNumber, 
            e.propertyType = e.PropertyType, e.SubwayDistance && e.SubwayDistance <= 1500 && (e.SubwayDistance < 1e3 ? e.BuildingTags = "地铁" + e.SubwayDistance + "m" + (e.BuildingTags ? "," + e.BuildingTags : "") : e.BuildingTags = "地铁" + (e.SubwayDistance / 1e3).toFixed(1) + "km" + (e.BuildingTags ? "," + e.BuildingTags : "")), 
            e.buildingInfo = a.formatBuildingInfo(e, n.globalData.cityInfo), e.buildingInfo.codeId = e.Id;
        }), e;
    },
    initBtnList: function() {
        return [ {
            id: 0,
            name: "咨询",
            type: "consult",
            iconSrc: "/resource/base/base_icon_consult@3x.png",
            mode: "vertical"
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
    },
    onReachBottom: function() {
        this.getMyFollow();
    },
    changeTab: function(e) {
        var t = this, a = e.currentTarget.dataset.index;
        a !== this.data.curTab && this.setData({
            curTab: a,
            pageNo: 0,
            interests: [],
            brokers: [],
            allow: !0
        }, function() {
            t.getMyFollow();
        });
    },
    operateBrokerItemInfo: function(e) {
        var t = e.detail, a = t.eventType, n = t.brokerItemInfo;
        switch (a) {
          case "follow":
            this.toggleFocus(n);
            break;

          case "phone":
            this.makePhone(n);
            break;

          case "goBrokerCardPage":
            this.checkDetail(n);
            break;

          case "weChat":
            this.copyWechat(n);
            break;

          case "goDetailPage":
            this.checkProjectDetail(n);
            break;

          case "consult":
            this.goChat(n);
        }
    },
    toggleFocus: function(t) {
        var n = this;
        t.Id && (t.Id = ""), a.toggleFollowBroker(t).then(function(a) {
            t.IsFollow ? wx.showToast({
                title: "取消关注成功"
            }) : wx.showToast({
                title: "关注成功"
            });
            var o = "brokers[" + t.idx + "].IsFollow";
            n.setData(e({}, o, !t.IsFollow));
        });
    },
    makePhone: function(e) {
        e.IsUnbound || (a.recordInteractTarck(e.ConsultantId, e.BuildingId ? e.BuildingId : null), 
        a.callPhone(e.PhoneNumber));
    },
    checkDetail: function(e) {
        var t = getCurrentPages();
        "pages/broker/broker" !== t[t.length - 1].route && wx.navigateTo({
            url: "/pages/broker_card/broker_card?brokerId=" + e.ConsultantId
        });
    },
    copyWechat: function(e) {
        if (!e.WechatNumber) return a.wxToast("还未绑定微信");
        a.promisify(wx.setClipboardData)({
            data: e.WechatNumber
        }).then(function() {
            wx.showToast({
                title: "微信号已复制"
            });
        });
    },
    checkProjectDetail: function(e) {
        var t = getCurrentPages();
        "pck_broker/broker_mine/broker_mine" !== t[t.length - 1].route && e.ProjectInfo && e.ProjectInfo.BuildingId && wx.navigateTo({
            url: "/pages/detail/detail?buildingId=" + e.ProjectInfo.BuildingId
        });
    },
    goChat: function(e) {
        console.log(e), e.IsUnbound || (n.globalData.userInfo.UnionId !== e.UnionId ? wx.navigateTo({
            url: "/pck_chat/chat/chat?unionId=" + e.UnionId + "&chatSourceType=6"
        }) : a.wxToast("不能给自己发消息"));
    },
    operateBuildingCardInfo: function(e) {
        var t = e.detail, n = t.eventType, o = t.buildingCardInfo, i = o.idx, r = o.buildingId, l = o.codeId, s = void 0 === l ? "" : l;
        if ("followMe" === n) this.cancelFollow(s, i); else if ("goDetailPage" === n) {
            var c = {
                buildingId: r,
                SourceKey: "Follow"
            };
            o.projectId && (c.ProjectId = o.projectId), a.recordBuildingClick(c), wx.navigateTo({
                url: "/pages/detail/detail?buildingId=" + r
            });
        }
    },
    cancelFollow: function(e) {
        var n = this;
        e && a.request({
            url: t.service.cancelBuildingSubscriptionApi.replace("{subscriptionId}", e),
            method: "DELETE",
            loading: !0
        }).then(function(t) {
            a.wxToast("取消成功");
            var o = n.data.interests, i = o.findIndex(function(t) {
                return t.Id === e;
            });
            i >= 0 && o.splice(i, 1), n.setData({
                interests: o
            });
        });
    }
});