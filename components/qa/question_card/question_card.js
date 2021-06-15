var t = require("../../../utils/index.js"), e = getApp();

Component({
    properties: {
        questionCardInfo: {
            type: Object,
            value: {},
            observer: function(e) {
                var o = this;
                this.setData({
                    cardInfo: e
                }, function() {
                    t.computedTextLineNumber({
                        select: "#content",
                        callback: function(t) {
                            o.setData({
                                "textInfo.lineNumber": t
                            });
                        },
                        stack: o,
                        lineHeight: o.data.textInfo.lineHeight,
                        ratio: o.data.textInfo.rpxToPxRatio
                    });
                });
            }
        },
        userInfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        userInfo: e.globalData.userInfo,
        showPop: !1,
        cardInfo: null,
        textInfo: {
            lineHeight: 42,
            rpxToPxRatio: 1,
            lineNumber: 1,
            maxShowLineNum: 4
        },
        introducState: !1
    },
    lifetimes: {
        attached: function() {
            this.data.textInfo.rpxToPxRatio = e.globalData.rpxToPxRatio;
        }
    },
    methods: {
        showPops: function() {
            this.data.showPop ? this.setData({
                showPop: !1
            }) : this.setData({
                showPop: !0
            });
        },
        previewImage: function(t) {
            var e = t.currentTarget.dataset || null;
            if (e) {
                var o = this.properties.questionCardInfo.covers, n = -1;
                if (o.forEach(function(t, o) {
                    t.id == e.id && -1 === n && (n = o);
                }), -1 !== n) {
                    var a = o.map(function(t) {
                        return t.imgSrc;
                    }), i = o[n].imgSrc;
                    wx.previewImage({
                        urls: a,
                        current: i,
                        fail: function(t) {
                            console.log("图片预览时失败: ", t);
                        }
                    });
                }
            }
        },
        goDetailPage: function() {
            this.triggerEvent("operateQuestionCardInfo", {
                eventType: "goDetail",
                questionCardInfo: this.properties.questionCardInfo
            });
        },
        goQuestionPage: function(t) {
            var e = t.detail.recordParams || t.currentTarget.dataset;
            this.triggerEvent("operateQuestionCardInfo", {
                eventType: e.type,
                questionCardInfo: this.properties.questionCardInfo
            });
        },
        getUserInfo: function(t) {
            "getUserInfo:ok" === t.detail.errMsg && this.triggerEvent("operateQuestionCardInfo", {
                eventType: "authInfo",
                questionCardInfo: t
            });
        },
        operateAnswerItem: function(t) {
            1 == t.currentTarget.dataset.status && this.triggerEvent("operateQuestionCardInfo", {
                eventType: "delItem",
                questionCardInfo: this.properties.questionCardInfo
            }), this.setData({
                showPop: !1
            });
        },
        getFollowFormid: function(t) {
            console.log(222, t);
        },
        noop: function(t) {
            return !1;
        },
        expansionIntroduc: function() {
            this.setData({
                introducState: !this.data.introducState
            });
        }
    }
});