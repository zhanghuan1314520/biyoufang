function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, a = require("../../config.js"), n = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        navH: i.globalData.navH,
        inputValue: "",
        pageNo: 1,
        limit: 10,
        canLoadMore: !0,
        isReplyFocus: !1,
        inputFocus: !1,
        replyTargetNickname: "",
        content: "",
        list: [],
        loading: !0,
        inputBottom: 0,
        refresh: !1,
        pageStatus: -1,
        requestStatus: 0,
        showCommentDialog: !1,
        info: null,
        replayCommentParams: {
            placeholder: "",
            commentId: "",
            parentId: "",
            unionId: ""
        },
        userInfo: null
    },
    onLoad: function(t) {
        var e = this;
        i.checkSession(function() {
            e.setData({
                userInfo: i.globalData.userInfo,
                buildingId: t.buildingId,
                buildingName: t.buildingName
            }, function() {
                e.getCommentsList().then(function() {
                    wx.hideLoading(), e.setData({
                        loading: !1
                    });
                });
            });
        }, n.getShareParams(t));
    },
    onShow: function() {
        var t = this;
        this.data.refresh && this.setData({
            pageNo: 1,
            loading: !0,
            list: []
        }, function() {
            t.getCommentsList().then(function() {
                t.setData({
                    loading: !1
                });
            });
        });
    },
    onReachBottom: function() {
        var t = this;
        this.data.canLoadMore && this.setData({
            pageNo: this.data.pageNo + 1
        }, function() {
            t.getCommentsList();
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            pageNo: 1,
            loading: !0,
            list: []
        }, function() {
            t.getCommentsList().then(function() {
                wx.stopPullDownRefresh(), t.setData({
                    loading: !1
                });
            });
        });
    },
    onShareAppMessage: function() {
        return n.extractShareFn({
            util: n,
            app: i
        });
    },
    getCommentsList: function() {
        var t = this, e = this.data, o = e.buildingId, r = e.pageNo, l = e.limit;
        return n.request({
            url: a.service.getCommentsListInCmt.replace("{buildingId}", o),
            data: {
                pageNo: r,
                limit: l
            }
        }).then(function(e) {
            var a = e.Comments, n = e.LimitCount, o = e.TodayCount, r = e.TodayReplyCount, s = e.ReplyLimitCount;
            i.globalData.commentRestriction = {
                LimitCount: n,
                TodayCount: o,
                TodayReplyCount: r,
                ReplyLimitCount: s
            }, t.setData({
                list: t.data.list.concat(t.formatCommentList(a)),
                canLoadMore: !(a.length < l)
            });
        });
    },
    goCommentPage: function() {
        var t = "/pck_building/detail_comment/detail_comment";
        t += "?buildingId=" + this.data.buildingId + "&buildingName=" + this.data.buildingName, 
        n.navigatePage({
            url: t
        });
    },
    operateCommentCardInfo: function(t) {
        var e = t.detail.targetComment, a = e.commentId, i = e.parentId, o = e.userName, r = e.unionId;
        switch (t.detail.eventType) {
          case "goChatPage":
            n.navigatePage({
                url: "/pck_chat/chat/chat?unionId=" + r
            });
            break;

          case "replyComment":
            this.setData({
                "replayCommentParams.placeholder": "回复 " + (o || "游客"),
                "replayCommentParams.commentId": a,
                "replayCommentParams.parentId": i,
                "replayCommentParams.unionId": r
            }), this.selectComponent("#ReplyComment").triggerReply();
        }
    },
    formatCommentList: function(t) {
        return t.map(function(t) {
            return t.UserAvatarUrl = n.formatUrl(t.UserAvatarUrl), t.tillTime = n.formatTimeToTill(t.CreateTime), 
            t.Replies && t.Replies.length > 3 ? t.replies = t.Replies.slice(0, 3) : t.replies = [], 
            t;
        });
    },
    getInfo: function(t) {
        var a = null;
        return t.isActived ? (a = e({}, t)).Replies && delete a.Replies : a = t.Replies.filter(function(t) {
            return t.isActived;
        })[0] || null, a;
    },
    goChatPage: function(t) {
        var e = t.currentTarget.dataset || {};
        if (e.id) {
            var a = i.globalData.userInfo;
            if (a && a.UnionId && a.UnionId === e.id) return void n.wxToast("不能给自己发消息");
            michat.init(i), wx.navigateTo({
                url: "/pck_chat/chat/chat?unionId=" + e.id
            });
        }
    },
    getUserInfo: function(t) {
        var e = this;
        if (!i.globalData.isAuthorizing && "getUserInfo:ok" === t.detail.errMsg) {
            i.globalData.isAuthorizing = !0, wx.showLoading({
                title: "授权中"
            });
            var o = t.detail;
            return n.request({
                url: a.service.weixin,
                method: "POST",
                data: {
                    SessionId: i.globalData.userInfo.SessionId,
                    EncryptedData: o.encryptedData,
                    iv: o.iv
                }
            }).then(function(t) {
                i.login(function() {
                    e.setData({
                        userInfo: i.globalData.userInfo
                    }, function() {
                        i.globalData.isAuthorizing = !1, wx.showToast({
                            title: "授权成功"
                        });
                    });
                });
            }).catch(function(t) {
                wx.hideLoading(), i.globalData.isAuthorizing = !1;
            });
        }
    },
    toComment: function() {
        wx.navigateTo({
            url: "/pck_building/detail_comment/detail_comment?buildingId=" + this.data.buildingId + "&buildingName=" + this.data.buildingName
        });
    },
    handleReplySuccess: function(e) {
        try {
            var a, n = e.detail.comment, i = this.data.replayCommentParams.commentId, o = this.data.list.findIndex(function(t) {
                return t.Id === i;
            });
            o >= 0 && this.setData((a = {}, t(a, "list[" + o + "].Replies", this.data.list[o].Replies.concat(n)), 
            t(a, "list[" + o + "].ReplyNumber", this.data.list[o].ReplyNumber + 1), a));
        } catch (e) {
            console.log(e);
        }
    }
});