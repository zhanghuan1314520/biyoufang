var a = require("../../config.js"), t = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        avatarList: [],
        followNumber: 0,
        isTheFirstAvatar: !0,
        pagination: {
            pageNo: 1,
            limit: 27,
            canLoadMore: !0
        }
    },
    getUserAvatarList: function(r) {
        var o = this, i = this.data.pagination, n = i.pageNo, s = i.limit;
        return t.request({
            url: a.service.getLongPullAvatar.replace("{advertId}", r),
            data: {
                pageNo: n,
                openId: e.globalData.userInfo.OpenId
            }
        }).then(function(a) {
            a = a.map(function(a) {
                return t.formatUrl(a);
            }), o.setData({
                avatarList: o.data.avatarList.concat(a),
                "pagination.canLoadMore": a.length === s
            });
        });
    },
    loadMore: function() {
        var a = this.data.pagination, t = a.pageNo;
        a.canLoadMore && (this.data.pagination.pageNo = ++t, this.getUserAvatarList(this.data.advertId));
    },
    onLoad: function(a) {
        var r = this;
        e.checkSession(function() {
            r.getUserAvatarList(a.advertId), r.setData({
                userInfo: e.globalData.userInfo,
                advertId: a.advertId,
                followNumber: a.followNumber,
                fllowImg: decodeURIComponent(a.fllowImg),
                isTheFirstAvatar: "true" === a.isTheFirstAvatar
            });
        }, t.getShareParams(a));
    },
    onShow: function() {}
});