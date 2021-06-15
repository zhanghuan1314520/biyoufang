function e(e, i, n) {
    return i in e ? Object.defineProperty(e, i, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[i] = n, e;
}

var i = require("../../config.js"), n = require("../../utils/index.js"), t = getApp();

Page({
    data: {
        psonge: 1,
        navH: t.globalData.navH,
        centerH: t.globalData.deviceWidth / 750 * 178,
        contentH: 0,
        role: "",
        userInfo: null,
        memberInfo: null,
        tips: {
            chat: null,
            lottery: !1,
            subscribe: !1,
            activity: !1,
            reward: !1
        },
        cancelMaskVisible: !1,
        newFollowCount: 0,
        psHeadList: [],
        psMyServe: [],
        psRestServe: [],
        csMyserve: [],
        csMarketingTool: [],
        csMoreServe: [],
        pageStaticStatus: -1,
        bottomModalVisibility: !1,
        buildingConsultantStatus: {
            pendingReview: !1,
            noPase: !1
        },
        urlParams: {}
    },
    onLoad: function(e) {
        this.data.urlParams = e, this.resetData();
    },
    onShow: function() {
        var e = this;
        t.checkSession(function() {
            var i = t.globalData.userInfo;
            i.AvatarUrl = n.formatUrl(i.AvatarUrl), e.setData({
                userInfo: t.globalData.userInfo
            }, function() {
                e.getNoreadFollow(), n.showTabBarRedDot(), i.WeixinAuthorized ? e.getMyCenter() : e.setData({
                    psonge: 2
                });
            }), -1 === e.data.pageStaticStatus && e.getStaticpages();
        }, n.getShareParams(this.data.urlParams));
    },
    onShareAppMessage: function(e) {
        return n.extractShareFn({
            util: n,
            app: t,
            config: i,
            e: e
        });
    },
    checkLottery: function() {
        this.data.userInfo.WeixinAuthorized && wx.navigateTo({
            url: "/pages/lottery/lottery?checkMyLottery=1"
        });
    },
    checkSubscription: function() {
        this.data.userInfo.WeixinAuthorized && wx.navigateTo({
            url: "/pck_my/subscription_list/subscription_list"
        });
    },
    goRegisterBroker: function() {
        this.data.userInfo.WeixinAuthorized && wx.navigateTo({
            url: "/ext_features/broker_registion/broker_registrion"
        });
    },
    getNoreadFollow: function() {
        var o = this;
        if (t.globalData.userInfo.RealtyConsultantInfo) return n.request({
            url: i.service.getMyNewFansInFlw
        }).then(function(i) {
            t.globalData.followCount = i;
            o.setData(e({}, "csMyserve[4].navTip", i ? "+" + i + "人" : ""));
        });
    },
    getStaticpages: function() {
        var t = this;
        return n.request({
            url: i.service.getUrlConfig
        }).then(function(i) {
            var n, o = encodeURIComponent(i.AboutByf), a = encodeURIComponent(i.IntegralExplain);
            t.setData((n = {}, e(n, "psRestServe[1].pageUrl", "/h5_webview/webview/webview?url=" + o), 
            e(n, "csMoreServe[9].pageUrl", "/h5_webview/webview/webview?url=" + o), e(n, "csMyserve[6].pageUrl", "/h5_webview/webview/webview?url=" + a + "&buildingName=积分规则"), 
            e(n, "pageStaticStatus", 1), n));
        });
    },
    getMyCenter: function() {
        var i = this;
        t.getMyCenterInfo(function(n) {
            var t = n = i.changeMemberInfo(n), o = t.InviteCode, a = void 0 === o ? "" : o, r = t.Inregral, c = t.TodayIntegral;
            i.setData(e({
                memberInfo: n
            }, "csMyserve[6].pageUrl", "/ext_features/integrals/integrals?all=" + r + "&toDay=" + c + "&code=" + a), function() {
                i.setBrokerRegistrion(n.ExistUnreadMessage), i.judgeUserType(n);
            });
        });
    },
    changeMemberInfo: function(e) {
        return e.name = t.globalData.userInfo.NickName, e.integralTitle = this.integralTitle(e), 
        (e = this.formatConsultantInfo(e)).Clue && (e.visitor = this.formatThread(e.Clue.BuildingVisitorNumber), 
        e.shear = this.formatThread(e.Clue.VisitorNumber), e.chat = this.formatThread(e.Clue.ChatNumber), 
        e.byPhone = this.formatThread(e.Clue.CallPhoneNumber)), e;
    },
    judgeUserType: function(e) {
        switch (this.data.userInfo.UserType) {
          case 1:
            2 === e.ConsultantStatus || e.Buildings.length ? this.changeRoute() : this.setData({
                psonge: 2,
                "psMyServe[4].navTip": e.ConsultantStatusText
            });
            break;

          case 0:
          default:
            this.setData({
                psonge: 2
            });
        }
    },
    changeRoute: function() {
        var i;
        this.setData((i = {}, e(i, "csMarketingTool[0]pageUrl", "/pages/broker_card/broker_card?brokerId=" + t.globalData.realtyConsultantId + "&consultantStatus=2&page=my"), 
        e(i, "psonge", 3), i));
    },
    integralTitle: function(e) {
        if (!e) return e;
        var i = "";
        return i = 1 === e.IntegralRanking ? "你很棒，请继续保持" : e.IntegralRanking === e.TotalIntegralRanking ? "你居然是副班长" : "还有" + e.IntegralDiffer + "分就赶上前一名", 
        i;
    },
    formatConsultantInfo: function(e) {
        return e.ConsultantStatusText = n.formatBrokerStatus(e.ConsultantStatus), e.PersonalImageUrl = n.formatUrl(e.PersonalImageUrl), 
        e.WorkPermitUrl = n.formatUrl(e.WorkPermitUrl), e;
    },
    formatThread: function(e) {
        return e < 1e4 ? [ e ] : [ "" + (e / 1e4).toFixed(1), "万" ];
    },
    getUserInfothree: function(e) {
        var o = this;
        if (!t.globalData.isAuthorizing && "getUserInfo:ok" === e.detail.eventDetail.detail.errMsg) {
            wx.showLoading({
                title: "授权中"
            }), t.globalData.isAuthorizing = !0;
            e.currentTarget.dataset.type;
            var a = e.detail.eventDetail.detail;
            n.request({
                url: i.service.weixinInMem,
                method: "POST",
                data: {
                    SessionId: t.globalData.userInfo.SessionId,
                    EncryptedData: a.encryptedData,
                    iv: a.iv
                }
            }).then(function(i) {
                t.login(function() {
                    o.setData({
                        userInfo: t.globalData.userInfo
                    }, function() {
                        t.globalData.isAuthorizing = !1, wx.hideLoading();
                    }), wx.navigateTo({
                        url: e.detail.menuNavInfo.pageUrl
                    });
                });
            }).catch(function(e) {
                t.globalData.isAuthorizing = !1;
            });
        }
    },
    copyWechat: function() {
        this.data.memberInfo && n.promisify(wx.setClipboardData)({
            data: this.data.memberInfo.InviteCode
        }).then(function() {
            wx.showToast({
                title: "邀请码已复制"
            });
        });
    },
    checkIntegral: function() {
        var e = this.data.memberInfo, i = e.InviteCode, n = e.Inregral, t = e.TodayIntegral;
        wx.navigateTo({
            url: "/ext_features/integrals/integrals?all=" + n + "&toDay=" + t + "&code=" + i
        });
    },
    checkService: function() {
        wx.navigateTo({
            url: "/pck_my/duplicate_code/duplicate_code?enter=service"
        });
    },
    operateMenuNavInfo: function(e) {
        if ("goPage" === e.detail.eventType) {
            var i = e.detail.menuNavInfo;
            wx.navigateTo({
                url: i.pageUrl
            });
        } else "getUserInfo" === e.detail.eventType && this.getUserInfothree(e);
    },
    goEditPage: function() {
        wx.navigateTo({
            url: "/ext_features/broker_registion/broker_registrion?checkState=2"
        });
    },
    resetData: function() {
        var e = [ {
            id: 0,
            type: "icon",
            navType: "",
            name: "我的摇号",
            iconSrc: "/resource/my/profile_icon_mysubscribe@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/subscription_list/subscription_list",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 1,
            type: "icon",
            navType: "",
            name: "我的关注",
            iconSrc: "/resource/my/profile_icon_mylike@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_advert/my_interest/index",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 2,
            type: "icon",
            navType: "",
            name: "我的问答",
            iconSrc: "/resource/my/profile_icon_myqas@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_qa/qa_user/qa_user",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 3,
            type: "icon",
            navType: "",
            name: "浏览历史",
            iconSrc: "/resource/my/profile_icon_historicalrecord@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/history/history",
            needAuthorization: !0,
            navTip: ""
        } ], i = [ {
            id: 0,
            type: "icon",
            navType: "",
            name: "加入购房群",
            iconSrc: "/resource/my/profile_icon_gfq_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/duplicate_code/duplicate_code?enter=flock",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 1,
            type: "icon",
            navType: "",
            name: "官方公众号",
            iconSrc: "/resource/my/profile_icon_gzh_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/duplicate_code/duplicate_code?enter=public",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 2,
            type: "icon",
            navType: "",
            name: "新手买房",
            iconSrc: "/resource/my/profile_icon_xsmf_line@3x.png",
            icomSize: "mini",
            pageUrl: "/h5_webview/knowledge/knowledge",
            needAuthorization: !1,
            needAuthorizationPhoneNumber: !0,
            navTip: ""
        }, {
            id: 3,
            type: "icon",
            navType: "",
            name: "快捷反馈",
            iconSrc: "/resource/my/profile_icon_kjfk_line@3x.png",
            icomSize: "mini",
            pageUrl: "/h5_webview/feedback/feedback",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 4,
            type: "icon",
            navType: "",
            name: "顾问入驻",
            iconSrc: "/resource/my/profile_icon_gwrz_line@3x.png",
            icomSize: "mini",
            pageUrl: "/ext_features/broker_registion/broker_registrion?checkState=0",
            needAuthorization: !0,
            navTip: "",
            redDot: !1
        }, {
            id: 5,
            type: "icon",
            navType: "",
            name: "常见问题",
            iconSrc: "/resource/my/profile_icon_cjwt_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/question/question",
            needAuthorization: !1,
            navTip: ""
        } ], n = [ {
            id: 0,
            type: "icon",
            navType: "",
            name: "商务合作",
            iconSrc: "/resource/my/profile_icon_swhz_line@3x.png",
            icomSize: "mini",
            pageUrl: "/h5_webview/cooperation/cooperation",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 1,
            type: "icon",
            navType: "",
            name: "关于必有房",
            iconSrc: "/resource/my/profile_icon_aboutbyf_line@3x.png",
            icomSize: "mini",
            pageUrl: "",
            needAuthorization: !1,
            navTip: ""
        } ], t = [ {
            id: 0,
            type: "icon",
            navType: "",
            name: "我的楼盘",
            iconSrc: "/resource/my/profile_icon_wdlp_brown@3x.png",
            icomSize: "mini",
            pageUrl: "",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 1,
            type: "icon",
            navType: "",
            name: "我的动态",
            iconSrc: "/resource/my/profile_icon_wddt_brown@3x.png",
            icomSize: "mini",
            pageUrl: "/ext_features/my_states/my_states",
            needAuthorization: !0,
            navTip: "加积分"
        }, {
            id: 2,
            type: "icon",
            navType: "",
            name: "我的快讯",
            iconSrc: "/resource/my/profile_icon_kx_brown@3x.png",
            icomSize: "mini",
            pageUrl: "/ext_features/my_news/my_news",
            needAuthorization: !0,
            navTip: "加积分"
        }, {
            id: 3,
            type: "icon",
            navType: "",
            name: "邀请入驻",
            iconSrc: "/resource/my/profile_icon_yqrz_brown@3x.png",
            icomSize: "mini",
            pageUrl: "",
            needAuthorization: !0,
            navTip: "加积分",
            needShare: !0
        }, {
            id: 4,
            type: "icon",
            navType: "",
            name: "关注我的",
            iconSrc: "/resource/my/profile_icon_gzwd_brown@3x.png",
            icomSize: "mini",
            pageUrl: "/ext_features/my_fans/my_fans",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 5,
            type: "icon",
            navType: "",
            name: "联系客服",
            iconSrc: "/resource/my/profile_icon_lxkf_brown@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/duplicate_code/duplicate_code?enter=service",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 6,
            type: "icon",
            navType: "",
            name: "积分规则",
            iconSrc: "/resource/my/profile_icon_jfgz_brown@3x.png",
            icomSize: "mini",
            pageUrl: "",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 7,
            type: "icon",
            navType: "",
            name: "商务合作",
            iconSrc: "/resource/my/profile_icon_swhz_brown@3x.png",
            icomSize: "mini",
            pageUrl: "/h5_webview/cooperation/cooperation",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 8,
            type: "icon",
            navType: "",
            name: "追加入驻",
            iconSrc: "/resource/my/profile_icon_zjrz_brown@3x.png",
            icomSize: "mini",
            pageUrl: "/ext_features/broker_registion/broker_registrion?checkState=3",
            needAuthorization: !0,
            navTip: "",
            redDot: !1
        } ], o = [ {
            id: 0,
            type: "icon",
            navType: "",
            name: "我的名片",
            iconSrc: "/resource/my/profile_icon_card_line@3x.png",
            icomSize: "mini",
            pageUrl: "",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 1,
            type: "icon",
            navType: "",
            name: "拓客图",
            iconSrc: "/resource/my/profile_icon_tkt_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_broker/prolongation_img/prolongation_img",
            needAuthorization: !0,
            navTip: "加积分"
        } ], a = [ {
            id: 0,
            type: "icon",
            navType: "",
            name: "我的摇号",
            iconSrc: "/resource/my/profile_icon_yaohao_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/subscription_list/subscription_list",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 1,
            type: "icon",
            navType: "",
            name: "我的关注",
            iconSrc: "/resource/my/profile_icon_mylike_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_advert/my_interest/index",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 2,
            type: "icon",
            navType: "",
            name: "我的问答",
            iconSrc: "/resource/my/profile_icon_myqa_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_qa/qa_user/qa_user",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 3,
            type: "icon",
            navType: "",
            name: "浏览历史",
            iconSrc: "/resource/my/profile_icon_historicalrecord_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/history/history",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 4,
            type: "icon",
            navType: "",
            name: "加入购房群",
            iconSrc: "/resource/my/profile_icon_gfq_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/duplicate_code/duplicate_code?enter=flock",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 5,
            type: "icon",
            navType: "",
            name: "官方公众号",
            iconSrc: "/resource/my/profile_icon_gzh_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/duplicate_code/duplicate_code?enter=public",
            needAuthorization: !0,
            navTip: ""
        }, {
            id: 6,
            type: "icon",
            navType: "",
            name: "新手买房",
            iconSrc: "/resource/my/profile_icon_xsmf_line@3x.png",
            icomSize: "mini",
            pageUrl: "/h5_webview/knowledge/knowledge",
            needAuthorization: !1,
            needAuthorizationPhoneNumber: !0,
            navTip: ""
        }, {
            id: 7,
            type: "icon",
            navType: "",
            name: "快捷反馈",
            iconSrc: "/resource/my/profile_icon_kjfk_line@3x.png",
            icomSize: "mini",
            pageUrl: "/h5_webview/feedback/feedback",
            needAuthorization: !0,
            navTip: "加积分"
        }, {
            id: 8,
            type: "icon",
            navType: "",
            name: "常见问题",
            iconSrc: "/resource/my/profile_icon_cjwt_line@3x.png",
            icomSize: "mini",
            pageUrl: "/pck_my/question/question",
            needAuthorization: !1,
            navTip: ""
        }, {
            id: 9,
            type: "icon",
            navType: "",
            name: "关于必有房",
            iconSrc: "/resource/my/profile_icon_aboutbyf_line@3x.png",
            icomSize: "mini",
            pageUrl: "",
            needAuthorization: !1,
            navTip: ""
        } ];
        this.setData({
            psHeadList: e,
            psMyServe: i,
            psRestServe: n,
            csMyserve: t,
            csMarketingTool: o,
            csMoreServe: a
        });
    },
    showIntegralDetail: function(e) {
        n.navigatePage({
            url: "/ext_features/my_integral/index"
        });
    },
    closeBottomModal: function(e) {
        var i = this;
        this.data.bottomModalVisibility ? this.setData({
            bottomModalVisibility: !1
        }, function() {
            setTimeout(function() {
                wx.showTabBar({
                    animation: !0,
                    success: function() {
                        e && e instanceof Function && e && e();
                    }
                });
            }, 400);
        }) : wx.hideTabBar({
            animation: !0,
            success: function() {
                setTimeout(function() {
                    i.setData({
                        bottomModalVisibility: !0
                    });
                }, 400);
            }
        });
    },
    handleChildEvent: function(e) {
        switch (e.detail.eventType) {
          case "myBuilding":
            this.closeBottomModal();
            break;

          case "selectBuilding":
            var i = e.detail.BuildingId;
            this.closeBottomModal(function() {
                n.navigatePage({
                    url: "/pages/detail/detail?buildingId=" + i
                });
            });
        }
    },
    setBrokerRegistrion: function(e) {
        var i = this.data.memberInfo, n = i.RealtyConsultantId, t = i.Buildings, o = "/ext_features/broker_registion/broker_registrion?checkState=3", a = e;
        switch (t && t.length ? "noFirstJoin" : "isFirstJoin") {
          case "isFirstJoin":
            o = n ? "/ext_features/registion_detail/index?realtyConsultantId=" + n : o, this.setData({
                "psMyServe[4].pageUrl": o,
                "psMyServe[4].redDot": a
            });
            break;

          case "noFirstJoin":
            o = "/ext_features/registion_detail/index?realtyConsultantId=" + n, this.setData({
                "csMyserve[8].pageUrl": o,
                "csMyserve[8].redDot": a
            });
        }
    }
});