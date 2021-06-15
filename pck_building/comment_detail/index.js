var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, t = require("../../config.js"), a = require("../../utils/index.js"), n = getApp();

Page({
    data: {
        navH: n.globalData.navH,
        commontId: null,
        showCommentDialog: !1,
        userInfo: null
    },
    onLoad: function(e) {
        var t = this;
        n.checkSession(function() {
            t.setData({
                commontId: e.id,
                userInfo: n.globalData.userInfo
            }, function() {
                t.getCommontDetail();
            });
        }, e);
    },
    operateCommentCardInfo: function(e) {
        var t = e.detail, n = e.detail.targetComment, o = (n.commentId, n.parentId), r = n.userName, i = n.unionId;
        switch (t.eventType) {
          case "goChatPage":
            a.navigatePage({
                url: "/pck_chat/chat/chat?unionId=" + i
            });
            break;

          case "replyComment":
            this.setData({
                "replayCommentParams.placeholder": "回复 " + (r || "游客"),
                "replayCommentParams.commentId": this.data.commontId,
                "replayCommentParams.parentId": o,
                "replayCommentParams.unionId": i,
                "replayCommentParams.commentType": "reply"
            }), this.selectComponent("#ReplyComment").triggerReply();
        }
    },
    handleReplySuccess: function() {
        this.getCommontDetail();
    },
    getCommontDetail: function(e) {
        var n = this;
        return a.request({
            url: t.service.getCommontDetail.replace("{commentId}", this.data.commontId)
        }).then(function(t) {
            t.isActived = !0, t.UserAvatarUrl = a.formatUrl(t.UserAvatarUrl), t.tillTime = a.formatTimeToTill(t.CreateTime), 
            t.Replies = n.formatCommentList(t.Replies), n.setData({
                commonDetail: t
            }), e && e();
        });
    },
    formatCommentList: function(e) {
        return e.map(function(e) {
            return e.UserAvatarUrl = a.formatUrl(e.UserAvatarUrl), e.CreateTime = a.formatTimeToTill(e.CreateTime), 
            e;
        });
    },
    getInfo: function(t) {
        var a = null;
        return t.isActived ? (a = e({}, t)).Replies && delete a.Replies : a = t.Replies.filter(function(e) {
            return e.isActived;
        })[0] || null, a;
    },
    getInputValue: function(e) {
        var t = e.detail.value;
        this.setData({
            content: t,
            isReplyFocus: !0
        });
    },
    onPullDownRefresh: function() {
        this.getCommontDetail(function() {
            wx.stopPullDownRefresh(), a.wxToast("刷新成功");
        });
    }
});