var e = require("../../../utils/index.js"), t = require("../../../config"), n = getApp();

Component({
    properties: {
        placeholder: {
            type: String,
            value: "我也来说两句…"
        },
        commentId: {
            type: String,
            value: ""
        },
        parentId: {
            type: String,
            value: ""
        },
        unionId: {
            type: String,
            value: ""
        },
        commentType: {
            type: String,
            value: "reply"
        },
        buildingId: {
            type: String,
            value: ""
        },
        userInfo: {
            type: Object,
            value: null
        }
    },
    data: {
        content: "",
        sendIcon: {
            activeSend: "data:image/png;base64,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",
            normalSend: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAMAAAAOARRQAAAAWlBMVEUAAADQ0NDNzc3Nzc3Nzc3Nzc3MzMzNzc3Nzc3Nzc3Nzc3Nzc3Ozs7Ozs7MzMzMzMzMzMzNzc3Ozs7j4+PMzMz////a2trT09P09PTv7+/5+fnl5eXp6eng4OCFlhBbAAAAFHRSTlMAId9kOu3Wx7ivlIx7SuemgzMVCZ9lrAYAAAM6SURBVGjetNbdcoMgEAXgDeK/+T+KmuT9X7OpTbuTVgQW+l3peMEs5wxC3i46a+uyUDmQq6Ks20xfKK1ddjxgxeGY7SgR3ShsUI1OMEdXwKno4mY61/BUn+W7VSFApWXbVSFQFb511xMETlcKslcQUXsK0EKs9U+lRITSM6F9jii518ZliJaRU4cEOnJokEQjWCX5Oh2S6QTpJ+3BHklZer3LkVS+ozUlEisF55hEKwsmPp6rwj9QV3p3QgxjsO70q2WIMIx9P2Dde9sqiJmxf5qxriJiWr7IvV/MsNAphrn1LyPc45ylocz9tzts+J5YS5NnN9jUUTUzU/9lXh4GMEvZuphQ7ubRPxkwy5+nQKjHdyiTAZauwa7gNstCGQc8jVy0rU430lAeWMyfU4FZ7gUqaJHb724ZfrFQ3DNBKC8DF22ra5kslB+bRePbxzE8lAGMi2Z3JKJDyBm5ksPERbM5EF3EocBVNHYhLQuF8YB22qcBZuRQ/jBctK0OtNJQ3H1mLdX+Z6T9Oxxqx11zsCT/XrQZDiUVguTNNE94GT2KhoKU9xnJRg4K/IfeoCgPD2WZcQIX7QGHnMJD+Rpy8Cga+6jWXHYQhIEoGpSoqPEVUyiV//9NIwuPREzvCKm1SxccSy9zpzPzAeM4lHFKeN1zHcW8vTTC7vjZ3siXEFr8pS2U3YxTcOi4BFamswlsUhEagl5HlRb4rYMiCY3PsxJtDEqjRzSCzU6JAo5nQhGERuhcKm4WXii1waExglKJ0O5JaaEIQsPWLnG/8a4/bCisVhLa9SKnHH5AUVJB1kFPoBqkYBbaUU0Hh76ip4Kkg4UJ092cXWgFqbqGCUOX81pE4+KhYRx2KqaCXDxKGfN4KiBZaKXhUsi1GZAmtBVXXB3TekCa0PaWCztRtI/cLEln/ap0TDewCEVolamY0uDOgBShnU2loYa/DkgQ2sZW6PJETkCC0Eq1bEcO4kY8QtuMLrba1Vf7KoSS6vR1SlQgTlPuTlO8T9OKSNRYSdMmStP0StPC+31DcjbONo9m8Tyt73wa+dPHEvIaspg0MpLjAMyX4zz5DidZR63yHxwTx+D+aahvjhHFOwTVgqrU1q21AAAAAElFTkSuQmCC"
        },
        boardHeight: {
            height: 0,
            duration: 0
        },
        replyShow: !1,
        animationData: null
    },
    pageLifetimes: {
        show: function() {
            var e = this;
            wx.canIUse("onKeyboardHeightChange") && wx.onKeyboardHeightChange(function(t) {
                t && (t.height || 0 === t.height) && e.setData({
                    "boardHeight.height": t.height
                });
            });
        },
        hide: function() {
            wx.canIUse("offKeyboardHeightChange") && wx.offKeyboardHeightChange();
        }
    },
    methods: {
        borderHeightChange: function(e) {
            this.setData({
                boardHeight: e.detail
            });
        },
        triggerReply: function() {
            var e = this.data.replyShow;
            this.setData({
                replyShow: !e
            });
        },
        submitComment: function(t) {
            var a = n.globalData.commentRestriction, o = a.TodayReplyCount, i = a.ReplyLimitCount, r = a.LimitCount, g = a.TodayCount, c = this.properties.commentType, h = this.data.content.trim();
            if (this.verificationContent(h)) switch (c) {
              case "reply":
                o >= i && 0 !== i ? e.wxToast("今日回复数已达上限") : this.replyComment(h);
                break;

              case "add":
                g >= r && 0 !== r ? e.wxToast("今日评论数已达上限") : this.addComment(h);
            }
        },
        replyComment: function(a) {
            var o = this, i = this.properties, r = i.commentId, g = i.parentId;
            r && e.request({
                url: t.service.replyCommentInCmt.replace("{commentId}", r),
                method: "POST",
                data: {
                    ParentId: g,
                    Content: a
                },
                loading: {
                    title: "回复中..."
                }
            }).then(function(t) {
                ++n.globalData.commentRestriction.TodayReplyCount, e.wxToast("回复成功"), o.triggerReply(), 
                o.setData({
                    content: ""
                }), o.triggerEvent("replySuccess", {
                    eventType: "reply",
                    comment: t
                });
            });
        },
        addComment: function(a) {
            var o = this, i = this.properties.buildingId;
            i && e.request({
                url: t.service.commentForBuildingInCmt.replace("{buildingId}", i),
                method: "POST",
                data: {
                    Content: a
                },
                loading: {
                    title: "发布中..."
                }
            }).then(function(t) {
                ++n.globalData.commentRestriction.TodayCount, e.wxToast("评论发布成功"), o.triggerReply(), 
                o.setData({
                    content: ""
                }), o.triggerEvent("replySuccess", {
                    eventType: "add",
                    comment: t
                });
            });
        },
        verificationContent: function(t) {
            return this.properties.unionId === n.globalData.userInfo.UnionId ? (e.wxToast("自己不能回复自己"), 
            !1) : t ? t.length < 5 || t.length > 100 ? (e.wxToast("字符长度限制为5-100个字符"), !1) : !!e.validateContentReg(t, "联系方式不可以出现喔~") : (e.wxToast("输入点什么再回复吧"), 
            !1);
        },
        noHandle: function() {}
    }
});