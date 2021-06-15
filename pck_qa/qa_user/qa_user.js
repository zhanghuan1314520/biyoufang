function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../config.js"), a = require("../../utils/index.js"), n = require("../../utils/getter/index.js"), i = getApp();

Page({
    data: {
        title: "我的问答",
        navH: 0,
        userInfo: null,
        requestStatus: 0,
        pageStatus: -1,
        navMenuList: [],
        questionList: [],
        answerList: [],
        fadeInUpOrDown: null,
        pageNo: 1,
        limit: 10,
        canLoadMore: !0,
        selectedIdx: 0,
        selectedAnswerItemInfo: null,
        selectedQuestionItemInfo: null,
        showMask: !1,
        lackImg1: "",
        lackImg2: "",
        quiztn: !1,
        selectedIntergral: 0,
        nullImg: "/pck_qa/image/myqa_img_null.png"
    },
    onLoad: function() {
        var t = this;
        i.globalData.Notify.on("initQa", this.initQuestionList), i.checkSession(function() {
            var e = i.globalData, a = e.navH, s = e.userInfo, o = e.cityInfo;
            n.judgeConsultantIntoCurrentCity(o.CityId) || t.setData({
                quiztn: !0
            });
            var r = t.initNavMenuList(), u = (t.initQuestionList(), i.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/qa_user_null_quiz.png"), l = i.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/qa_user_null_answer.png";
            t.setData({
                navH: a,
                userInfo: s,
                navMenuList: r,
                lackImg1: u,
                lackImg2: l
            });
        }, options);
    },
    onReachBottom: function() {
        this.data.canLoadMore && (this.setData({
            pageNo: ++this.data.pageNo
        }), this.initQuestionList(this.data.selectedIdx));
    },
    onUnload: function() {
        i.globalData.Notify.remove("initQa", this.initQuestionList);
    },
    toggleDelAnswerDialog: function(t) {
        var e = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        }), a = t.currentTarget.dataset;
        a && (a.status, "1" === a.status && (0 === this.data.selectedIdx ? this.handleDelQuestion() : 1 === this.data.selectedIdx && this.handleDelAnswer())), 
        e.bottom("-200rpx").step(), this.setData({
            showMask: !1,
            fadeInUpOrDown: e,
            selectedAnswerItemInfo: null,
            selectedQuestionItemInfo: null
        });
    },
    handleClickBtn: function(t) {
        var e = t.currentTarget.dataset || null;
        if (e && e.type) {
            var i = void 0;
            if ("goAnswer" === e.type) return wx._routeParams = {
                marketStatus: "qa"
            }, i = "/pages/market/market", wx.switchTab({
                url: i
            }), !1;
            if ("goQuestion" === e.type) {
                if (1 == this.data.userInfo.UserType && n.judgeConsultantIntoCurrentCity(wx.getStorageSync("cityInfo").CityId)) return a.wxToast("置业顾问不可提问！");
                i = "/pck_qa/qa_question/qa_question", a.navigatePage({
                    url: i
                });
            }
            "subscribeAnswer" === e.type && a.getTemplateMessageId(4, "CustomerConsultationNoticeId").then().then(function(t) {});
        }
    },
    handleDelAnswer: function() {
        var t = this, n = this.data.selectedAnswerItemInfo;
        a.request({
            url: e.service.removeAnswerQa.replace("{questionId}", n.QuestionId).replace("{answerId}", n.Id),
            method: "DELETE"
        }).then(function() {
            a.wxToast("删除成功"), t.setData({
                pageNo: 1
            }), t.initQuestionList(t.data.selectedIdx);
        });
    },
    handleDelQuestion: function() {
        var t = this, n = this.data.selectedQuestionItemInfo;
        a.request({
            url: e.service.removeQuizQa.replace("{questionId}", n.Id),
            method: "DELETE"
        }).then(function() {
            a.wxToast("删除成功"), t.setData({
                pageNo: 1
            }), t.initQuestionList(t.data.selectedIdx);
        });
    },
    toggleNavMenu: function(e) {
        var a = e.currentTarget.dataset;
        if (a) {
            var n = -1, i = -1;
            if (this.data.navMenuList.forEach(function(t, e) {
                t.isActived && -1 === n && (n = e), t.id === a.id && -1 === i && (i = e);
            }), -1 !== i && -1 !== n) {
                var s, o = "navMenuList[" + n + "].isActived", r = "navMenuList[" + i + "].isActived";
                this.data.selectedIdx != i && (this.setData({
                    pageNo: 1,
                    canLoadMore: !0,
                    selectedIdx: i
                }), this.toggleDelAnswerDialog({
                    currentTarget: {
                        dataset: {
                            status: "0"
                        }
                    }
                }), this.initParamThenRequest(i)), this.setData((s = {}, t(s, o, !1), t(s, r, !0), 
                s));
            }
        }
    },
    operateQuestionCardInfo: function(t) {
        var e = this, n = t.detail;
        if ("goDetail" === n.eventType) {
            var i = "/pck_qa/qa_detail/qa_detail?page=qaUser&id=" + n.questionCardInfo.Id;
            a.navigatePage({
                url: i
            });
        } else "delItem" === n.eventType && this.setData({
            selectedQuestionItemInfo: n.questionCardInfo
        }, function() {
            e.handleDelQuestion();
        });
    },
    operateAnswerItem: function(t) {
        var e = this, n = t.detail, i = n && n.answerItemInfo || null;
        if ("delete" === n.eventType && this.setData({
            selectedAnswerItemInfo: i
        }, function() {
            e.handleDelAnswer();
        }), "goDetail" === n.eventType) {
            var s = "/pck_qa/qa_detail/qa_detail?id=" + i.QuestionId;
            a.navigatePage({
                url: s
            });
        }
    },
    initNavMenuList: function(t) {
        var e = [ {
            id: 0,
            type: "question",
            title: "提问",
            isActived: !0
        }, {
            id: 1,
            type: "answer",
            title: "回答",
            isActived: !1
        } ];
        return t && (this.getMoments(), e.forEach(function(e) {
            return e.isActived = e.type === t;
        })), e;
    },
    initQuestionList: function() {
        var n = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, s = 0 === i ? "questionList" : "answerList";
        a.request({
            url: 0 === i ? e.service.myQuizQa : e.service.myAnswerQa,
            data: {
                pageNo: this.data.pageNo,
                limit: this.data.limit
            }
        }).then(function(e) {
            e.SelectedIntergral && 1 === i && n.setData({
                selectedIntergral: e.SelectedIntergral
            }), (e = 0 === i ? n.formatList(e, i) : n.formatAnswer(e.List)).SelectedIntergral && n.setData({
                selectedIntergral: e.SelectedIntergral
            }), n.setData(t({
                canLoadMore: e.length === n.data.limit
            }, s, 1 === n.data.pageNo ? e : n.data[s].concat(e)), function() {
                n.setData({
                    pageStatus: n.data[s].length ? 1 : 0
                });
            });
        });
    },
    formatAnswer: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = (arguments[1], 
        i.globalData.consultantInfo);
        if (t) {
            var n = this.data.userInfo;
            t.map(function(t) {
                0 === n.UserType ? (t.avatar = a.formatUrl(n.AvatarUrl), t.userName = n.NickName) : (t.avatar = e.AvatarUrl, 
                t.userName = e.Name), t.createTime = a.formatQuestionCreateTime(t.CreateTime.replace(/[\.\-]/g, "/")), 
                t.userType = "";
                var i = [], s = 1 === t.Images.length ? "medium" : "mini";
                t.Images.forEach(function(t, e) {
                    i.push({
                        id: Date.now() + 100 * e,
                        imgSrc: a.formatUrl(t),
                        imgSize: s
                    });
                }), t.covers = i, t.userType = t.IsOfficial ? "official" : t.IsRealtyConsultant ? "broker" : "", 
                t.showAdopt = !1;
            });
        }
        return t;
    },
    formatList: function(t, e) {
        if (t) {
            var n = this.data.userInfo;
            (t = a.formatQaList(t, n)).map(function(t) {
                t.canDel = !t.IsResolved;
            });
        }
        return t;
    },
    initParamThenRequest: function(t) {
        this.setData({
            pageNo: 1,
            limit: 10
        }), this.initQuestionList(t);
    },
    getUserInfo: function(t) {},
    getFollowFormid: function(t) {}
});