function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../config.js"), o = require("../../utils/index.js"), n = (require("../../options/dropdown-menu.js"), 
getApp());

Page({
    data: (t = {
        title: "问答详情",
        navH: 0,
        isIpx: !1,
        userInfo: null,
        requestStatus: 0,
        pageStatus: -1,
        questionList: [],
        questionCardInfo: null,
        pageUrl: "",
        selectedAnswerCardInfo: null,
        qid: "",
        pageNo: 1,
        limit: 20,
        canLoadMore: !0,
        showAdopt: !1
    }, a(t, "isIpx", !1), a(t, "imageRoot", n.globalData.imgsPathInfo.rootPath), t),
    onLoad: function(t) {
        var e = this;
        n.checkSession(function() {
            var o;
            n.globalData.Notify.on("reInitQa", e.initLoadQaDetail);
            var i = n.globalData, s = i.isIpx, r = i.navH, d = i.userInfo;
            e.setData((o = {
                navH: r,
                isIpx: s,
                userInfo: d
            }, a(o, "isIpx", n.globalData.isIpx), a(o, "qid", t.id), o)), e.loadQaDetail();
        }, o.getShareParams(t));
    },
    onUnload: function() {
        n.globalData.Notify.remove("reInitQa", this.initLoadQaDetail);
    },
    onReachBottom: function() {
        this.data.canLoadMore && (this.setData({
            pageNo: ++this.data.pageNo
        }), this.loadQaDetail());
    },
    onShareAppMessage: function() {
        return o.extractShareFn({
            util: o
        });
    },
    initLoadQaDetail: function() {
        this.setData({
            pageNo: 1,
            canLoadMore: !0
        }), this.loadQaDetail();
    },
    loadQaDetail: function() {
        var a = this;
        o.request({
            url: e.service.qaDetail.replace("{questionId}", this.data.qid),
            data: {
                pageNo: this.data.pageNo,
                limit: this.data.limit
            },
            toastCallBack: function() {}
        }).then(function(t) {
            if (a.setData({
                pageStatus: 0
            }), t) {
                if (t.Question) {
                    var e = o.formatQaList([ t.Question ])[0];
                    e.answerNumPos = "top", e.IsMine = e.UnionId === a.data.userInfo.UnionId, e.questionStatus = e.UnionId === a.data.userInfo.UnionId ? "qaUserQuestionDetail" : "", 
                    a.setData({
                        questionCardInfo: e
                    });
                }
                t.List && a.setData({
                    canLoadMore: t.List.length === a.data.limit,
                    questionList: 1 === a.data.pageNo ? a.formatList(t.List, t.Question) : a.data.questionList.concat(a.formatList(t.List, a.data.questionCardInfo))
                });
            }
        }).catch(function(t) {
            console.error(t), "0001" === t.ReturnCode && a.setData({
                pageStatus: 2
            });
        });
    },
    toOtherQuestion: function() {
        wx.navigateTo({
            url: "/pck_qa/qa_invite_answer/qa_invite_answer"
        });
    },
    formatList: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
        if (a) {
            var e = this.data.userInfo;
            a.map(function(a) {
                a.IsOfficial ? a.avatar = "/resource/byf_icon.jpg" : a.avatar = o.formatUrl(a.AvatarUrl), 
                a.userName = a.NickName, a.createTime = o.formatQuestionCreateTime(a.CreateTime.replace(/[\.\-]/g, "/")), 
                a.userType = "";
                var n = [], i = 1 === a.Images.length ? "medium" : "mini";
                a.Images.forEach(function(a, t) {
                    n.push({
                        id: Date.now() + 100 * t,
                        imgSrc: o.formatUrl(a),
                        imgSize: i
                    });
                }), a.covers = n, a.userType = a.IsOfficial ? "official" : a.IsRealtyConsultant ? "broker" : "", 
                a.showAdopt = !t.IsAdopted && !a.IsAdopted && !a.IsOfficial && t.UnionId === e.UnionId;
            });
        }
        return a;
    },
    operateQuestionCardInfo: function(a) {
        console.log(a);
        a.detail;
    },
    operateAnswerCardInfo: function(a) {
        var t = this;
        console.log(a);
        var e = a.detail;
        switch (e.eventType) {
          case "like":
            e.authInfo ? n.authorizeUserInfo(e.authInfo, function() {
                t.setData({
                    userInfo: n.globalData.userInfo
                }, function() {
                    t.handleLike(e.answerCardInfo);
                });
            }) : this.handleLike(e.answerCardInfo);
            break;

          case "chatBroker":
            this.handleChat(e.answerCardInfo);
            break;

          case "adoptAnswer":
            this.handleAdopt(e.answerCardInfo);
        }
    },
    handleLike: function(a) {
        var t = this;
        if (this.data.userInfo.WeixinAuthorized) {
            var n = void 0;
            n = !1 === a.IsLiked ? "POST" : "DELETE", o.request({
                url: e.service.qaLike.replace("{questionId}", this.data.questionCardInfo.Id).replace("{answerId}", a.Id),
                method: n
            }).then(function(e) {
                var o = void 0;
                t.data.questionList.forEach(function(t, e) {
                    t.Id === a.Id && (o = e);
                });
                var n = {};
                n["questionList[" + o + "].IsLiked"] = !a.IsLiked, n["questionList[" + o + "].LikeNumber"] = a.LikeNumber + (a.IsLiked ? -1 : 1), 
                t.setData(n);
            });
        }
    },
    handleChat: function(a) {
        this.data.userInfo.UnionId !== a.UnionId ? wx.navigateTo({
            url: "/pck_chat/chat/chat?unionId=" + a.UnionId
        }) : o.wxToast("不能和自己聊天");
    },
    handleAdopt: function(a) {
        var t = this;
        !1 === a.IsAdopted && o.request({
            url: e.service.qaAdopt.replace("{questionId}", this.data.questionCardInfo.Id).replace("{answerId}", a.Id),
            method: "POST"
        }).then(function() {
            var e = void 0;
            t.data.questionList.forEach(function(t, o) {
                t.Id === a.Id && (e = o);
            });
            var o = {};
            o["questionList[" + e + "].IsAdopted"] = !a.IsAdopted, o["questionList[" + e + "].showAdopt"] = !a.showAdopt, 
            t.setData(o);
        });
    },
    getUserInfo: function(a) {
        var t = this;
        n.authorizeUserInfo(a, function() {
            t.setData({
                userInfo: n.globalData.userInfo
            });
        });
    },
    getFollowFormid: function(a) {
        console.log(222, a);
    },
    goQaQuestion: function() {
        wx.navigateTo({
            url: "/pck_qa/qa_question/qa_question"
        });
    },
    goQaAnswer: function() {
        var a = this.data.questionCardInfo;
        if (console.log(a.UnionId, this.data.userInfo.UnionId), a.UnionId !== this.data.userInfo.UnionId) {
            a.questionStatus = "", wx.setStorage({
                data: a,
                key: "questionInfo"
            });
            wx.navigateTo({
                url: "/pck_qa/qa_answer/qa_answer?page=qaUser"
            });
        } else o.wxToast("不能回答自己的问题");
    }
});