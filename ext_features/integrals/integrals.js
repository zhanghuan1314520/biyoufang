function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp(), a = require("../../utils/index.js"), n = require("../../config.js");

Page({
    data: {
        navH: t.globalData.navH,
        conditionList: [],
        allScore: "",
        toDayScore: "",
        userInfo: {},
        code: ""
    },
    onLoad: function(e) {
        var n = this;
        t.checkSession(function() {
            n.setData({
                allScore: e.all,
                toDayScore: e.toDay,
                code: e.code
            }), n.setStructure();
        }, a.getShareParams(e));
    },
    onShow: function() {
        var e = this;
        t.checkSession(function() {
            e.setData({
                userInfo: t.globalData.userInfo
            }), e.getIntegrals();
        });
    },
    onShareAppMessage: function(e) {
        return a.extractShareFn({
            util: a,
            app: t,
            e: e
        });
    },
    getIntegrals: function() {
        var e = this;
        a.request({
            url: n.service.getIntegralsInConf
        }).then(function(t) {
            console.log(t), e.formatIntegrals(t);
        });
    },
    formatIntegrals: function(t) {
        var a;
        t || retrn;
        var n = (a = {}, e(a, "conditionList[0].case[0].grades", t.SigninIntegral), e(a, "conditionList[1].case[0].grades", t.VisitorIntegral), 
        e(a, "conditionList[1].case[1].grades", t.NewVisitorIntegral), e(a, "conditionList[1].text", "老用户点击分享的小程序，每日上限" + t.VisitorToplimit + "次；新用户" + (t.NewVisitorToplimit ? "每日上限" + t.NewVisitorToplimit + "次" : "不限")), 
        e(a, "conditionList[2].case[0].grades", t.InvitedInIntegral), e(a, "conditionList[3].case[0].grades", t.NewsIntegral), 
        e(a, "conditionList[4].case[0].grades", t.PhotoIntegral), e(a, "conditionList[5].case[0].grades", t.HouseTypeIntegral), 
        e(a, "conditionList[6].case[0].grades", t.DynamicIntegral), e(a, "conditionList[6].text", "展示楼盘最新信息，同时给自己更多曝光机会。每日上限" + t.DynamicToplimit + "次"), 
        e(a, "conditionList[7].case[0].grades", t.ReplyCommentIntegral), e(a, "conditionList[7].text", "帮助用户更全面了解楼盘信息。每日上限" + t.ReplyCommentToplimit + "次"), 
        e(a, "conditionList[8].case[0].grades", t.AnswersSelectedIntegral), e(a, "conditionList[9].case[0].grades", t.AnswersLikeIntegral), 
        e(a, "conditionList[9].text", "他人点赞你的回答，每" + t.AnswersLikeBase + "个点赞" + t.AnswersLikeIntegral + "分"), 
        e(a, "conditionList[10].case[0].grades", t.AnswersAdoptIntegral), a);
        this.setData(n);
    },
    formSubmit: function(e) {
        var t = e.detail.target.dataset, a = t.url, n = t.nav;
        console.log(n), a && wx[n]({
            url: a,
            fail: function(e) {
                console.log("跳转页面时失败: ", e);
            }
        });
    },
    setStructure: function() {
        var e = [ {
            title: "每日使用",
            btn: !1,
            pageUrl: "",
            case: [ {
                grades: "3",
                explain: "分/次"
            } ],
            text: "每天打开小程序，即可获得积分",
            type: "",
            nav: ""
        }, {
            title: "分享",
            btn: !1,
            pageUrl: "",
            case: [ {
                grades: "1",
                explain: "分/老用户，"
            }, {
                grades: "5",
                explain: "分/新用户"
            } ],
            text: "老用户点击分享的小程序，每日上限20分；新用户不限",
            type: "",
            nav: ""
        }, {
            title: "邀请入驻",
            btn: !0,
            pageUrl: "",
            case: [ {
                grades: "20",
                explain: "分/置业顾问"
            } ],
            text: "邀请同时入驻必有房，审核通过即可获得积分",
            type: "share",
            nav: ""
        }, {
            title: "上传楼盘快讯",
            btn: !0,
            pageUrl: "/pck_broker/update_news/update_news",
            case: [ {
                grades: "3",
                explain: "分/条"
            } ],
            text: "丰富入驻楼盘信息，帮助用户更了解楼盘，审核通过，即可获得",
            type: "",
            nav: "navigateTo"
        }, {
            title: "上传楼盘相册图",
            btn: !0,
            pageUrl: "/pck_broker/upload_building_imgs/upload_building_imgs",
            case: [ {
                grades: "3",
                explain: "分/张"
            } ],
            text: "丰富入驻楼盘信息，帮助用户更了解楼盘，审核通过，即可获得",
            type: "",
            nav: "navigateTo"
        }, {
            title: "上传楼盘户型图",
            btn: !0,
            pageUrl: "/pck_broker/upload_hosetype_imgs/upload_hosetype_imgs",
            case: [ {
                grades: "3",
                explain: "分/张"
            } ],
            text: "丰富入驻楼盘信息，帮助用户更了解楼盘，审核通过，即可获得",
            type: "",
            nav: "navigateTo"
        }, {
            title: "发布楼盘动态",
            btn: !0,
            pageUrl: "/pck_broker/post_moment/post_moment",
            case: [ {
                grades: "20",
                explain: "分/条"
            } ],
            text: "展示楼盘最新信息，同时给自己更多曝光机会。每日上限40分",
            type: "",
            nav: "navigateTo"
        }, {
            title: "回复楼盘评论",
            btn: !0,
            pageUrl: "/pck_building/detail_commentList/detail_commentList?buildingId=" + t.globalData.userInfo.RealtyConsultantInfo.Buildings[0].BuildingId + "&buildingName=" + t.globalData.userInfo.RealtyConsultantInfo.Buildings[0].BuildingName,
            case: [ {
                grades: "5",
                explain: "分/条"
            } ],
            text: "帮助用户更全面了解楼盘信息。每日上限25分",
            type: "",
            nav: "navigateTo"
        }, {
            title: "精选问答",
            btn: !0,
            pageUrl: "/pages/market/market?navType=qa",
            case: [ {
                grades: "50",
                explain: "分/条"
            } ],
            text: "你的回答被平台设置为精选，获得积分",
            type: "",
            nav: "reLaunch"
        }, {
            title: "回答点赞",
            btn: !0,
            pageUrl: "/pages/market/market?navType=qa",
            case: [ {
                grades: "30",
                explain: "分/条"
            } ],
            text: "点赞他人回答，每30个点赞30分",
            type: "",
            nav: "reLaunch"
        }, {
            title: "回答被采纳",
            btn: !0,
            pageUrl: "/pages/market/market?navType=qa",
            case: [ {
                grades: "20",
                explain: "分/条"
            } ],
            text: "你的被提问人采纳，获得积分",
            type: "",
            nav: "reLaunch"
        }, {
            title: "分享资料",
            btn: !0,
            pageUrl: "/pck_my/duplicate_code/duplicate_code?enter=service",
            case: [ {
                grades: "5~10",
                explain: "分/次"
            } ],
            text: "分享一房一价、土拍海报、摇号海报等到群，需截图给客服，可获得加分",
            type: "",
            nav: "navigateTo"
        } ];
        this.setData({
            conditionList: e
        });
    }
});