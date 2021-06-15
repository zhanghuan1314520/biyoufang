require("../../../config.js");

var e = require("../../../utils/index.js"), t = (require("../../../utils/plugins/michat.js"), 
getApp());

Component({
    properties: {
        commentCardInfo: {
            type: Object,
            value: {}
        },
        showBottom: {
            type: Boolean,
            value: !0
        },
        userInfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        isFold: !1
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
            var n = o.detail.recordParams || o.currentTarget.dataset, a = n.idx, r = void 0 === a ? "" : a, i = n.type, s = this.properties.commentCardInfo, d = r || 0 === r ? s.Replies[r] : s, u = d.Id, m = void 0 === u ? "" : u, l = d.UserName, f = void 0 === l ? "游客" : l, p = d.UnionId, I = void 0 === p ? null : p;
            switch (i) {
              case "goChatPage":
                if (I === t.globalData.userInfo.UnionId) return void e.wxToast("不能给自己发消息");
                break;

              case "replyComment":
                if (I === t.globalData.userInfo.UnionId) return void e.wxToast("自己不能回复自己");
            }
            this.triggerEvent("operateCommentCardInfo", {
                eventType: i,
                targetComment: {
                    commentId: s.Id,
                    parentId: m,
                    userName: f || "游客",
                    unionId: I
                }
            });
        },
        noop: function() {}
    }
});