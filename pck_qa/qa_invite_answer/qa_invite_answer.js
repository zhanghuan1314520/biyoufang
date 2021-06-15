var t = require("../../config.js"), a = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        title: "有料",
        navH: 0,
        queryHistoryList: [],
        pageStatus: -1,
        requestStatus: 0,
        questionList: [],
        key: "",
        pageNo: 1,
        limit: 10,
        canLoadmore: !0,
        status: 0,
        userInfo: null
    },
    onLoad: function(t) {
        wx._routeParams = {
            type: "switchTab",
            marketStatus: "qa",
            route: "/pages/market/market"
        };
        var a = e.globalData, i = a.navH, s = a.userInfo;
        this.loadQuestionList({
            key: this.data.key,
            pageNo: this.data.pageNo,
            limit: this.data.limit
        }), this.setData({
            navH: i,
            userInfo: s
        });
    },
    onReachBottom: function() {
        this.data.canLoadmore && (this.setData({
            pageNo: ++this.data.pageNo
        }), this.loadQuestionList({
            key: this.data.key,
            pageNo: this.data.pageNo,
            limit: this.data.limit
        }));
    },
    getInputeValue: function(t) {
        var a = t.detail.value;
        this.setData({
            key: a
        });
    },
    goQaQueryPage: function() {
        a.navigatePage({
            url: "/pck_qa/qa_query/qa_query"
        });
    },
    clearInputValue: function() {
        this.setData({
            key: ""
        });
    },
    queryQuestionList: function() {
        var t = this.data.key;
        if (console.log(t), !t.trim()) return a.wxToast("请先输入要搜索的问题或标签");
        this.setData({
            pageNo: 1
        }), this.loadQuestionList({
            key: this.data.key,
            pageNo: this.data.pageNo,
            limit: this.data.limit
        });
    },
    clearQueryHistoryList: function() {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "确定要清空历史搜索吗",
            success: function(a) {
                console.log(a), a && a.confirm && t.setData({
                    queryHistoryList: []
                });
            }
        });
    },
    operateQuestionCardInfo: function(t) {
        var e = this, i = t.detail;
        if ("goDetail" === i.eventType || "answerQa" === i.eventType) {
            var s = "/pck_qa/qa_detail/qa_detail?id=" + i.questionCardInfo.Id;
            a.navigatePage({
                url: s
            });
        } else "authInfo" === i.eventType && app.authorizeUserInfo(i.questionCardInfo, function() {
            e.setData({
                userInfo: app.globalData.userInfo
            });
        });
    },
    initQueryHistoryList: function() {
        return [ {
            id: 1,
            name: "落户政策是什么样的"
        }, {
            id: 2,
            name: "落户政策是什么样的"
        } ];
    },
    loadQuestionList: function(e) {
        var i = this;
        0 === this.data.status && (e.status = 0), a.request({
            url: t.service.queryQuestionList,
            method: "GET",
            data: e
        }).then(function(t) {
            if (t && t.length) {
                var e = a.formatQaList(t, i.data.userInfo);
                i.formatList(e), i.setData({
                    questionList: 1 === i.data.pageNo ? e : i.data.questionList.concat(e),
                    canLoadmore: t.length === i.data.limit
                });
            }
        }).catch(function(t) {});
    },
    formatList: function(t) {
        t.map(function(t) {
            t.questionStatus = "qaQuestion", t.answerNumPos = "top";
        });
    }
});