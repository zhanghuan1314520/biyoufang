var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = getApp(), a = require("../../config.js"), o = require("../../utils/index.js");

require("../../utils/plugins/michat.js");

Page({
    data: {
        navH: e.globalData.navH,
        cardImg: e.globalData.imgsPathInfo.rootPath + "/images_wx/broker/gwcard_bj@3x.png",
        userInfo: null,
        broker: null,
        ConsultantInfo: null,
        comingStatus: -1,
        momentList: [],
        pageInfo: {
            pageNo: 1,
            pageSize: 10
        },
        showAllBrokerIntro: !1,
        brokerIntroHeight: 48,
        brokerInfoHeight: 377,
        brokerInfoFullHeight: 48,
        brokerIntroFullHeight: 377,
        canLoadMore: !1,
        hasCopy: !1,
        imageRoot: e.globalData.imgsPathInfo.rootPath,
        currentInfoDetail: null
    },
    onLoad: function(t) {
        var a = this;
        e.globalData.Notify.on("changeImage2", this.onLoad), e.checkSession(function() {
            var o = e.globalData.userInfo.RealtyConsultantInfo || null;
            a.setData({
                brokerId: t.brokerId,
                isShare: t.isShare || 0,
                userInfo: e.globalData.userInfo,
                isIpx: e.globalData.isIpx,
                comingStatus: t.page && "my" === t.page ? 1 : 0,
                consultantStatus: t.consultantStatus || null,
                title: o && o.RealtyConsultantId === t.brokerId ? "我的名片" : "置业顾问名片"
            }), a.getConsultantInfo().then(function() {
                1 !== a.data.comingStatus && a.getBrokerMomentList();
            });
        }, o.getShareParams(t));
    },
    onUnload: function() {
        e.globalData.Notify.remove("changeImage2", this.onload);
    },
    onReachBottom: function() {
        0 === this.data.comingStatus && this.data.canLoadMore && this.getBrokerMomentList();
    },
    onShareAppMessage: function() {
        return o.extractShareFn({
            util: o,
            app: e
        });
    },
    getConsultantInfo: function() {
        var t = this, e = this;
        return o.request({
            url: a.service.getCallingCardInMem.replace("{brokerId}", this.data.brokerId)
        }).then(function(a) {
            var o = t.formatBrokerData(a);
            t.setData({
                ConsultantInfo: o
            }, function() {
                wx.hideLoading(), e.calcBrokerInfoIntroHeight();
            });
        });
    },
    getBrokerMomentList: function() {
        var t = this;
        if (this.data.brokerId) {
            var e = this.data.pageInfo, n = {
                pageNo: e.pageNo,
                limit: e.pageSize,
                consultantId: this.data.brokerId
            };
            o.request({
                url: a.service.counselorInNews.replace("{consultantId}", n.consultantId),
                method: "GET",
                data: n
            }).then(function(e) {
                console.log(e);
                var a = t.data.momentList || [];
                if (e && e.length) {
                    a = a.concat(t.formatMomentList(e));
                    var o = t.data.pageInfo.pageNo + 1;
                    t.setData({
                        momentList: a,
                        "pageInfo.pageNo": o,
                        canLoadMore: n.limit === e.length
                    });
                } else t.setData({
                    canLoadMore: !1
                });
            }).catch(function(t) {
                console.error("获取置业顾问动态时失败: ", t);
            });
        }
    },
    getBrokerDetailById: function() {
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), o.request({
            url: a.service.getShearInMem.replace("{shortCodeId}", this.data.brokerId)
        }).then(function(e) {
            t.setData({
                broker: t.formatBrokerInfo(e)
            });
        }).catch(function(t) {
            console.error("获取置业顾问详情时失败: ", t);
        });
    },
    goChatPage: function() {
        this.data.userInfo.WeixinAuthorized || this.setData({
            userInfo: e.globalData.userInfo
        });
        var t = this.data.ConsultantInfo, a = e.globalData.userInfo || null;
        if (a) {
            if (a.UnionId === t.UnionId) return void o.wxToast("不能给自己发消息");
            var n = "/pck_chat/chat/chat?unionId=" + t.UnionId;
            wx.navigateTo({
                url: n
            });
        }
    },
    copyWeChatNumber: function() {
        var t = this, e = this.data.ConsultantInfo.Buildings.filter(function(t) {
            return t.IsMain;
        })[0].WechatNumber;
        wx.setClipboardData({
            data: e,
            success: function(e) {
                t.setData({
                    hasCopy: !0
                });
            },
            fail: function(t) {
                console.error("复制置业顾问微信号时失败: ", t);
            }
        });
    },
    followBroker: function() {
        var t = this, e = this.data.userInfo || null;
        if (e && (!e || e.WeixinAuthorized)) {
            var a = this.data.ConsultantInfo;
            a.UnionId !== e.UnionId ? o.toggleFollowBroker(a).then(function() {
                a.IsFollow || wx.showToast({
                    title: "关注成功"
                }), t.setData({
                    "ConsultantInfo.IsFollow": !a.IsFollow
                });
            }) : o.wxToast("自己不能关注自己");
        }
    },
    lookMoreBrokerIntro: function() {
        var t = !this.data.showAllBrokerIntro;
        this.setData({
            showAllBrokerIntro: t
        });
    },
    callBroker: function() {
        if (this.data.ConsultantInfo.PhoneNumber) {
            var t = this.data.ConsultantInfo;
            o.recordInteractTarck(t.Id, t.BuildingId ? t.BuildingId : null).then(function(t) {}), 
            o.callPhone(t.PhoneNumber);
        }
    },
    checkWorkPermit: function(t) {
        wx.previewImage({
            urls: [ t.currentTarget.dataset.url ]
        });
    },
    checkAddress: function(t) {
        var e = t.currentTarget.dataset, a = e.name, o = e.address, n = e.lat, r = e.lng;
        n && r && wx.openLocation({
            latitude: 1 * n,
            longitude: 1 * r,
            name: a,
            address: o,
            scale: 12
        });
    },
    goEditPage: function() {
        wx.navigateTo({
            url: "/ext_features/broker_registion/broker_registrion?checkState=2"
        });
    },
    goCodePage: function() {
        3 != this.data.consultantStatus && wx.navigateTo({
            url: "/pck_broker/prolongation_img/prolongation_img"
        });
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset || null;
        if (e && "avator" === e.type) {
            var a = this.data.ConsultantInfo;
            wx.previewImage({
                urls: [ a.PersonalImageUrl ],
                current: a.PersonalImageUrl,
                fail: function(t) {
                    console.log("预览图片时失败: ", t);
                }
            });
        }
    },
    goBuildingPage: function(t) {
        var e = t.detail.momentInfo && t.detail.momentInfo.BuildingId || t.currentTarget.dataset.buildingId;
        o.navigatePage({
            url: "/pages/detail/detail?buildingId=" + e
        });
    },
    clickMomentItem: function(t) {
        var e = t.detail;
        if ("detail" === e.eventType && this.goBuildingPage(t), "lookAvatar" === e.eventType) {
            var a = e.momentInfo.personalImageUrl;
            a && wx.previewImage({
                urls: [ a ],
                current: a,
                fail: function(t) {
                    console.log("预览大头像时失败: ", t);
                }
            });
        }
        "chat" === e.eventType && this.goChatPage(), "phone" === e.eventType && this.callBroker();
    },
    goPage: function(t) {
        var e = t.currentTarget.dataset || null, a = "";
        if (e) {
            if ("goMoment" === e.type && (a = "/pck_broker/post_moment/post_moment"), "goNews" === e.type) {
                var n = this.data.ConsultantInfo.Buildings, r = n.filter(function(t) {
                    return t.IsMain;
                })[0] || n[0];
                a = "/pck_building/detail_newsList/detail_newsList?buildingId=" + r.BuildingId + "&buildingName=" + r.BuildingName;
            }
            a && o.navigatePage({
                url: a
            });
        }
    },
    formatMomentList: function(t) {
        var e = this;
        return t.map(function(t) {
            var a = [];
            return t.Covers && t.Covers.length && (a = t.Covers.map(function(t) {
                return o.formatUrl(t);
            })), t.covers = a, t.personalImageUrl = o.formatUrl(t.PersonalImageUrl), t.personalImageUrl = o.formatUrl(e.data.ConsultantInfo.PersonalImageUrl), 
            t.RealtyConsultantName = e.data.ConsultantInfo.Name, t;
        });
    },
    formatBrokerData: function(t) {
        return t.PersonalImageUrl = o.formatUrl(t.PersonalImageUrl), t.WorkPermitUrl = o.formatUrl(t.WorkPermitUrl), 
        t.PhoneNumber && (t.PhoneNumberText = t.PhoneNumber.indexOf(",") > -1 ? "400 转 " + t.PhoneNumber.split(",")[1] : t.PhoneNumber), 
        t;
    },
    getFollowFormid: function(t) {},
    getUserInfo: function(t) {
        var a = this, o = t.currentTarget.dataset.type;
        e.authorizeUserInfo(t, function() {
            a.setData({
                userInfo: e.globalData.userInfo
            }, function() {
                switch (o) {
                  case "focus":
                    a.followBroker();
                    break;

                  case "miChat":
                    a.goChatPage();
                }
            });
        });
    },
    calcBrokerInfoIntroHeight: function() {
        var t = this;
        wx.createSelectorQuery().select("#broker-intro_text_hidden").fields({
            size: !0,
            rect: !0,
            node: !0
        }, function(e) {
            e && e.height && e.height > 45 && t.setData({
                brokerInfoFullHeight: e.height
            });
        }).exec();
    },
    formatBrokerInfo: function(e) {
        var a = e.ProjectInfo, n = e.ProjectIntroductionInfo;
        if (a = "Object" === Object.prototype.toString.apply(a).slice(8, -1) ? a : {}, n && Object.assign(a, n), 
        e.PersonalImageUrl = o.formatUrl(e.PersonalImageUrl), e.WorkPermitUrl = o.formatUrl(e.WorkPermitUrl), 
        a.BuildingName = e.BuildingName, a.RestDay = o.formatRestDay(a), a.OpeningTime = this.formatPreSaleTime(a.PreSaleTime), 
        a.CurrentStatusTime = o.formatCurrentStatusTime(a), a.PublicityStartTime = o.formatPublicityTimeInDetail(a.PublicityStartTime), 
        a.PublicityEndTime = o.formatPublicityTimeInDetail(a.PublicityEndTime), a.RegisterStartTime = o.formatRegisterTimeInDetail(a.RegisterStartTime), 
        a.RegisterEndTime = o.formatRegisterTimeInDetail(a.RegisterEndTime), a.CoverImageUrl = o.formatUrl(a.CoverImageUrl), 
        a.StatusText = o.formatProjectStatus(a.Status), a.totalPrice = a.MinTotalPrice ? parseInt(a.MinTotalPrice / 1e4) : 0, 
        a.buildingTags = a.BuildingTags ? a.BuildingTags.split(",") : "", a.StatusShortText = 1 === a.BuildingStatus ? o.formatStatusShortText(a.Status) : o.formatBuildingStatusShortText(a.BuildingStatus), 
        e.ProjectInfo && e.ProjectInfo.BuildingSubway) {
            var r = [];
            "object" === t(e.ProjectInfo.BuildingSubway) && r.push(e.ProjectInfo.BuildingSubway), 
            Array.isArray(e.ProjectInfo.BuildingSubway) && (r = e.ProjectInfo.BuildingSubway), 
            e.ProjectInfo.buildingSubway = r;
        }
        return a.BuildingSubway && a.BuildingSubway.length && a.BuildingSubway.forEach(function(t) {
            t.distance = o.formatDistance(t.Distance);
        }), e;
    },
    formatPreSaleTime: function(t) {
        return t ? new Date(t.replace(/[\.\-]/g, "/")).getMonth() + 1 + "月" : "";
    },
    changeSelectBuilding: function(t) {
        t.detail.WorkPermitUrl = o.formatUrl(t.detail.WorkPermitUrl), this.setData({
            currentInfoDetail: t.detail
        });
    }
});