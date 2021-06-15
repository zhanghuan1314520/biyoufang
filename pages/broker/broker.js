function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
}, t = require("../../config.js"), i = require("../../utils/index.js"), r = getApp(), n = require("../../utils/plugins/michat.js");

Page({
    data: {
        userInfo: {},
        navH: r.globalData.navH,
        isShare: 0,
        itsMe: 0,
        brokerId: "",
        broker: null,
        building: {},
        loading: !0,
        noBackBtn: 0,
        page: "",
        buildingData: {}
    },
    onLoad: function(e) {
        var a = this;
        this.setData({
            brokerId: e.brokerId,
            isShare: e.isShare ? parseInt(e.isShare) : 0,
            page: e.page || "",
            noBackBtn: e.fromBroker ? parseInt(e.fromBroker) : 0,
            brokerCode: e.brokerCode || ""
        }), r.checkSession(function() {
            var t = r.globalData.userInfo;
            if (a.getBrokerDetailById(), a.setData({
                userInfo: t,
                itsMe: r.globalData.realtyConsultantId === e.brokerId ? 1 : 0
            }), e.brokerCode) {
                var n = getCurrentPages();
                i.recordShareVisit(e.brokerCode, n[n.length - 1].route + i.serializationUrlParams(e));
            }
        }, i.getShareParams(e));
    },
    onShareAppMessage: function() {
        return i.extractShareFn({
            util: i,
            app: r
        });
    },
    getBrokerDetailById: function() {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), i.request({
            url: t.service.getCallingCardInMem.replace("{brokerId}", this.data.brokerId)
        }).then(function(a) {
            a = e.initBtnList(a), e.setData({
                broker: a,
                loading: !1
            }, function() {
                e.getBuildingData(), wx.hideLoading();
            });
        }).catch(function(e) {});
    },
    getBuildingData: function() {
        var e = this, a = this.data.broker.Buildings[0].BuildingId;
        i.request({
            url: t.service.getShearBuildingInMem.replace("{buildingId}", a)
        }).then(function(a) {
            a = e.formatBuildingList(a), e.setData({
                buildingData: a
            });
        });
    },
    formatBuildingList: function(e) {
        e.idx = 0, e.buildingInfo = {}, e.subscribePhone = e.PhoneNumber, e.propertyType = e.PropertyType, 
        e.SubwayDistance && e.SubwayDistance <= 1500 && (e.SubwayDistance < 1e3 ? e.BuildingTags = "地铁" + e.SubwayDistance + "m" + (e.BuildingTags ? "," + e.BuildingTags : "") : e.BuildingTags = "地铁" + (e.SubwayDistance / 1e3).toFixed(1) + "km" + (e.BuildingTags ? "," + e.BuildingTags : "")), 
        e.buildingInfo = i.formatBuildingInfo(e, r.globalData.cityInfo);
        var a = {
            codeId: e.Id,
            totalHouseholds: e.TotalHouseholds ? e.TotalHouseholds + "户" : "",
            buildingTypeArea: e.BuildingArea ? e.BuildingArea + "㎡" : "",
            buildingTypes: e.ArchitecturalType ? e.ArchitecturalType.replace(/,/g, "、") : "",
            parkingSpaceRatio: e.ParkingSpaceRatio ? e.ParkingSpaceRatio : "",
            greeningRate: e.GreeningRate ? e.GreeningRate + "%" : "",
            coveredArea: e.CoveredArea ? e.CoveredArea + "㎡" : "",
            buildingInstruction: e.BuildingInstruction ? e.BuildingInstruction : "",
            propertyCompanyName: e.PropertyCompanyName ? e.PropertyCompanyName : "",
            developerName: e.DeveloperName ? e.DeveloperName : "",
            subways: e.Subways ? this.formatSubway(e.Subways) : ""
        };
        return e.buildingInfo = Object.assign(e.buildingInfo, a), e;
    },
    formatSubway: function(e) {
        var a = [];
        return e.map(function(e) {
            a.push({
                title: e.Title ? e.Title : "",
                distance: e.Distance ? e.Distance + "米" : "",
                walkingTime: e.WalkingTime ? parseInt(e.WalkingTime / 60) : ""
            });
        }), a;
    },
    initBtnList: function(e) {
        return e.permission = !0, 1 === r.globalData.userInfo.UserType && r.globalData.realtyConsultantId === e.Id && (e.permission = !1), 
        e.idx = 0, e.PersonalImageUrl = i.formatUrl(e.PersonalImageUrl), e.WorkPermitUrl = i.formatUrl(e.WorkPermitUrl), 
        e.btnList = [ {
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
        } ], e;
    },
    operateBrokerItemInfo: function(e) {
        var a = e.detail, t = a.eventType, i = a.brokerItemInfo;
        switch (t) {
          case "follow":
            this.toggleFocus(i);
            break;

          case "phone":
            this.makePhone(i);
            break;

          case "goBrokerCardPage":
            this.checkDetail(i);
            break;

          case "weChat":
            this.copyWechat(i);
            break;

          case "consult":
            this.goChat(i);
            break;

          case "followMe":
          case "goChatPage":
            this.getUserInfothree(e);
        }
    },
    getUserInfothree: function(e) {
        var a = this, o = e.detail, l = o.eventType, s = o.brokerItemInfo;
        if (!r.globalData.isAuthorizing && "getUserInfo:ok" === e.detail.eventDetail.detail.errMsg) {
            wx.showLoading({
                title: "授权中"
            }), r.globalData.isAuthorizing = !0;
            e.currentTarget.dataset.type;
            var u = e.detail.eventDetail.detail;
            i.request({
                url: t.service.weixinInMem,
                method: "POST",
                data: {
                    SessionId: r.globalData.userInfo.SessionId,
                    EncryptedData: u.encryptedData,
                    iv: u.iv
                }
            }).then(function(t) {
                r.login(function() {
                    a.setData({
                        userInfo: r.globalData.userInfo
                    }, function() {
                        r.globalData.isAuthorizing = !1, r.globalData.mimcUser || !t.UnionId || t.Blacklist || n.init(a), 
                        "goChatPage" === l && a.goChat(s);
                    }), wx.navigateTo({
                        url: e.detail.menuNavInfo.pageUrl
                    });
                });
            }).catch(function(e) {
                r.globalData.isAuthorizing = !1;
            });
        }
    },
    toggleFocus: function(a) {
        var t = this;
        if (!a.permission) return i.wxToast("不能自己关注自己");
        i.toggleFollowBroker(a).then(function(i) {
            a.IsFollow ? wx.showToast({
                title: "取消关注成功"
            }) : wx.showToast({
                title: "关注成功"
            });
            t.setData(e({}, "broker.IsFollow", !a.IsFollow));
        });
    },
    makePhone: function(e) {
        i.callPhone(e.PhoneNumber), i.recordInteractTarck(e.Id, e.Buildings[0].BuildingId);
    },
    checkDetail: function(e) {
        var a = getCurrentPages();
        if ("pages/broker/broker" !== a[a.length - 1].route) {
            var t = "";
            t = e.permission ? "/pages/broker_card/broker_card?brokerId=" + e.ConsultantId : "/pages/broker_card/broker_card?brokerId=" + e.ConsultantId + "&consultantStatus=2&page=my", 
            wx.navigateTo({
                url: t
            });
        }
    },
    copyWechat: function(e) {
        var a = e.Buildings.filter(function(e) {
            return e.IsMain;
        })[0];
        if (!a && !a.WechatNumber) return i.wxToast("还未绑定微信");
        i.promisify(wx.setClipboardData)({
            data: a.WechatNumber
        }).then(function() {
            wx.showToast({
                title: "微信号已复制"
            });
        });
    },
    goChat: function(e) {
        if (!e.permission) return i.wxToast("不能给自己发消息");
        wx.navigateTo({
            url: "/pck_chat/chat/chat?unionId=" + e.UnionId
        });
    },
    formatPreSaleTime: function(e) {
        return e ? new Date(e.replace(/[\.\-]/g, "/")).getMonth() + 1 + "月" : "";
    },
    checkProjectDetail: function() {
        var e = this.data, t = e.buildingData, r = (e.isShare, e.noBackBtn);
        i.recordBuildingClick(a({
            buildingId: t.BuildingId,
            SourceKey: "Consultant"
        }, t.ProjectId ? {
            ProjectId: t.ProjectId
        } : {}));
        var n = "/pages/detail/detail?buildingId=" + t.buildingInfo.buildingId + "&fromBroker=" + r;
        wx.navigateTo({
            url: n
        });
    },
    getUserInfo: function(a) {
        var t = this;
        r.authorizeUserInfo(a.detail, function() {
            t.setData({
                userInfo: r.globalData.userInfo
            }, function() {
                switch (a.detail.type) {
                  case "chat":
                    r.globalData.authToChat = !0, r.globalData.authToChatUnionId = a.detail.unionId, 
                    n.init(r);
                    break;

                  case "follow":
                    var o = t.data.broker;
                    i.toggleFollowBroker(o).then(function() {
                        o.IsFollow || wx.showToast({
                            title: "关注成功"
                        }), t.setData(e({}, "broker.IsFollow", !o.IsFollow));
                    });
                }
            });
        });
    },
    backIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});