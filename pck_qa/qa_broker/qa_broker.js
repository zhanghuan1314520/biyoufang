var e = require("../../config.js"), t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        nullImg: a.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/myqa_img_null@3x.png",
        title: "我的问答",
        navH: 0,
        userInfo: null,
        requestStatus: 0,
        pageStatus: -1,
        questionList: [],
        fadeInUpOrDown: null,
        selectedAnswerItemInfo: null,
        SelectedIntergral: 50,
        pageNo: 1,
        limit: 10,
        canLoadMore: !0,
        isIpx: !1
    },
    onLoad: function() {
        var e = a.globalData, t = e.navH, n = e.userInfo;
        this.setData({
            navH: t,
            userInfo: n,
            isIpx: a.globalData.isIpx
        });
    },
    onShow: function() {
        this.initQuestionList();
    },
    onReachBottom: function() {
        this.data.canLoadMore && (this.setData({
            pageNo: ++this.data.pageNo
        }), this.initQuestionList());
    },
    handleClickBtn: function(e) {
        var a = e.currentTarget.dataset || null;
        if (a) {
            var n = "";
            "goAnswer" === a.type && (wx._routeParams = {
                marketStatus: "qa"
            }, n = "/pages/market/market?page=qa", t.navigatePage({
                url: n,
                goType: "switchTab"
            })), "subscribeAnswer" === a.type && t.getTemplateMessageId(4, "CustomerConsultationNoticeId").then().then(function(e) {});
        }
    },
    deleteAnswerItem: function(a) {
        var n = this, i = this.data.selectedAnswerItemInfo;
        t.request({
            url: e.service.removeAnswerQa.replace("{questionId}", i.QuestionId).replace("{answerId}", i.Id),
            method: "DELETE"
        }).then(function() {
            n.setData({
                pageNo: 1
            }), n.initQuestionList();
        }), this.setData({
            selectedAnswerItemInfo: null
        });
    },
    operateAnswerItem: function(e) {
        var a = this;
        console.log(e);
        var n = e.detail;
        if ("delete" === n.eventType && this.setData({
            selectedAnswerItemInfo: n.answerItemInfo
        }, function() {
            a.deleteAnswerItem();
        }), "goDetail" === n.eventType) {
            var i = "/pck_qa/qa_detail/qa_detail?page=qaBroker&id=" + n.answerItemInfo.QuestionId;
            t.navigatePage({
                url: i
            });
        }
    },
    getFollowFormid: function(e) {},
    formatList: function(e, n) {
        if (e) {
            this.data.userInfo;
            e.map(function(e) {
                e.avatar = a.globalData.consultantInfo.AvatarUrl, e.userName = a.globalData.consultantInfo.Name, 
                e.createTime = t.formatQuestionCreateTime(e.CreateTime.replace(/[\.\-]/g, "/"));
                var n = [], i = 1 === e.Images.length ? "medium" : "mini";
                e.Images.forEach(function(e, a) {
                    n.push({
                        id: Date.now() + 100 * a,
                        imgSrc: t.formatUrl(e),
                        imgSize: i
                    });
                }), e.covers = n;
            });
        }
        return e;
    },
    initQuestionList: function() {
        var a = this;
        t.request({
            url: e.service.myAnswerQa,
            data: {
                pageNo: this.data.pageNo,
                limit: this.data.limit
            }
        }).then(function(e) {
            console.log(e, "回答");
            var t = e.SelectedIntergral || a.data.SelectedIntergral;
            e = a.formatList(e.List), a.setData({
                SelectedIntergral: t,
                pageStatus: e.length || a.data.pageNo > 1 ? 1 : 0,
                canLoadMore: e.length === a.data.limit,
                questionList: 1 === a.data.pageNo ? e : a.data.questionList.concat(e)
            });
        });
    },
    getUserInfo: function(e) {
        console.log(111, e);
    }
});