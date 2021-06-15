var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, e = require("../../config.js"), a = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        title: "搜索问题",
        navH: 0,
        queryHistoryList: [],
        pageStatus: -1,
        requestStatus: 0,
        questionList: [],
        inputValue: "",
        canLoadMore: !0,
        userInfo: i.globalData.userInfo,
        pageInfo: {
            pageNo: 1,
            limit: 10
        },
        firstTimes: !0,
        imageRoot: i.globalData.imgsPathInfo.rootPath
    },
    onLoad: function() {
        var t = i.globalData.navH, e = this.getStoragedHistoryList();
        this.setData({
            navH: t,
            queryHistoryList: e
        });
    },
    onReachBottom: function() {
        if (this.data.canLoadMore) {
            var t = this.data.pageInfo;
            t.key = this.data.inputValue, this.queryQuestionList(t);
        }
    },
    queryQuestionList: function(t) {
        var i = this;
        a.request({
            url: e.service.queryQuestionList,
            data: t
        }).then(function(t) {
            var e = i.data.pageInfo.pageNo;
            e++, t = a.formatQaList(t, i.data.userInfo), i.formatList(t), i.setData({
                queryHistoryList: [],
                questionList: 1 === i.data.pageInfo.pageNo ? t : i.data.questionList.concat(t),
                "pageInfo.pageNo": e,
                canLoadMore: t.length === i.data.pageInfo.limit
            });
        }).catch(function(t) {
            console.log("获取搜索的提问列表时失败：", t);
        });
    },
    formatList: function(t) {
        t.map(function(t) {
            t.questionStatus = "qaQuestion", t.answerNumPos = "top";
        });
    },
    getInputeValue: function(t) {
        var e = t.detail.value;
        this.setData({
            inputValue: e
        });
    },
    clearInputValue: function() {
        this.setData({
            inputValue: ""
        });
    },
    clickSearchBtn: function(e) {
        var i = this.data, s = i.inputValue, o = i.queryHistoryList, n = e.currentTarget.dataset || null;
        if (n && n.type) {
            var r = null, u = null;
            if ("userInput" === n.type && (s.trim() ? (u = {
                key: s.trim()
            }, r = {
                id: new Date().getTime(),
                msg: u.key
            }) : a.wxToast("请先输入要搜索的问题或标签")), "historyList" === n.type) {
                var l = o.filter(function(t) {
                    return t.id === n.id;
                })[0] || null;
                l && (u = {
                    key: l.msg
                }, r = t({}, l)), this.setData({
                    inputValue: l.msg
                });
            }
            u && (this.storageHistoryList(r), this.setData({
                "pageInfo.pageNo": 1,
                firstTimes: !1
            }), u.pageNo = 1, u.limit = this.data.pageInfo.limit, u.key = this.data.inputValue, 
            this.queryQuestionList(u));
        }
    },
    clearQueryHistoryList: function() {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "确定要清空历史搜索吗",
            success: function(e) {
                console.log(e), e && e.confirm && (t.setData({
                    queryHistoryList: []
                }), wx.removeStorage({
                    key: "questionHistoryList"
                }));
            }
        });
    },
    operateQuestionCardInfo: function(t) {
        var e = this, s = t.detail;
        if ("goDetail" === s.eventType || "answerQa" === s.eventType) {
            var o = "/pck_qa/qa_detail/qa_detail?id=" + s.questionCardInfo.Id;
            a.navigatePage({
                url: o
            });
        } else "authInfo" === s.eventType && i.authorizeUserInfo(s.questionCardInfo, function() {
            e.setData({
                userInfo: i.globalData.userInfo
            });
        });
    },
    storageHistoryList: function(t) {
        var e = wx.getStorageSync("questionHistoryList") || [];
        if (e && e.length) if (e.length >= 10) e.pop().unshift(t); else {
            var a = null, i = -1;
            e.forEach(function(e, s) {
                e.msg === t.msg && -1 === i && (i = s, a = e);
            }), a ? (e.splice(i, 1), e.unshift(t)) : e.unshift(t);
        } else e.push(t);
        wx.setStorageSync("questionHistoryList", e);
    },
    getStoragedHistoryList: function() {
        return wx.getStorageSync("questionHistoryList") || [];
    }
});