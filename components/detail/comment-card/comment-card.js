require("../../../config.js");

var e = require("../../../utils/index.js"), t = (require("../../../utils/plugins/michat.js"), 
getApp());

Component({
    properties: {
        commentCardInfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        userInfo: null,
        isFold: !1
    },
    lifetimes: {
        attached: function() {
            var e = this.properties.commentCardInfo;
            e.replies && e.replies.length && this.setData({
                isFold: !0
            }), this.setData({
                userInfo: t.globalData.userInfo
            });
        }
    },
    methods: {
        getUserInfo: function(e) {
            var o = this;
            t.authorizeUserInfo(e, function() {
                o.setData({
                    userInfo: t.globalData.userInfo
                }, function() {
                    o.operateCommentCardInfo(e);
                });
            });
        },
        toggleFold: function() {
            this.setData({
                isFold: !1
            });
        },
        operateCommentCardInfo: function(o) {
            var n = o.detail.recordParams || o.currentTarget.dataset, a = n.idx, i = void 0 === a ? "" : a, r = n.type, s = this.properties.commentCardInfo, d = i || 0 === i ? s.Replies[i] : s, u = d.Id, l = void 0 === u ? "" : u, m = d.UserName, f = void 0 === m ? "游客" : m, c = d.UnionId, p = void 0 === c ? null : c;
            switch (r) {
              case "goChatPage":
                if (p === t.globalData.userInfo.UnionId) return void e.wxToast("不能给自己发消息");
                break;

              case "replyComment":
                if (p === t.globalData.userInfo.UnionId) return void e.wxToast("自己不能回复自己");
            }
            this.triggerEvent("operateCommentCardInfo", {
                eventType: r,
                targetComment: {
                    commentId: s.Id,
                    parentId: l,
                    userName: f,
                    unionId: p
                }
            });
        },
        navigatiorDetail: function() {
            e.navigatePage({
                url: "/pck_building/comment_detail/index?id=" + this.properties.commentCardInfo.Id
            });
        },
        noop: function() {}
    }
});