var a = require("../../config.js"), t = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        navH: e.globalData.navH,
        list: null,
        pageNo: 1,
        limit: 20,
        allow: !0,
        fansNumber: 0,
        imageRoot: e.globalData.imgsPathInfo.rootPath
    },
    onLoad: function(a) {
        wx.hideShareMenu(), this.getMyFans(), this.getMyFansNumber(), e.globalData.followCount = 0;
    },
    onPullDownRefresh: function() {
        var a = this;
        this.setData({
            pageNo: 1,
            list: [],
            allow: !0
        }, function() {
            a.getMyFans().then(function() {
                wx.stopPullDownRefresh();
            });
        });
    },
    onReachBottom: function() {
        var a = this;
        this.data.allow && this.setData({
            pageNo: this.data.pageNo + 1
        }, function() {
            a.getMyFans();
        });
    },
    getMyFans: function() {
        var e = this, i = this;
        if (this.data.allow) return t.request({
            url: a.service.fansInFollow,
            data: {
                pageNo: this.data.pageNo,
                limit: this.data.limit
            }
        }).then(function(a) {
            console.log(a, "粉丝列表"), a.forEach(function(a) {
                a.time = t.formatTimeToTill(a.CreateTime), a.AvatarUrl = t.formatUrl(a.AvatarUrl), 
                a.nickName = i.resovleNickName(a);
            }), e.setData({
                list: e.data.list ? e.data.list.concat(a) : a,
                allow: a.length === e.data.limit
            });
        });
    },
    getMyFansNumber: function() {
        var e = this;
        return t.request({
            url: a.service.fansNumberInFollow
        }).then(function(a) {
            e.setData({
                fansNumber: a
            });
        });
    },
    goChat: function(a) {
        var t = a.currentTarget.dataset.unionid;
        wx.navigateTo({
            url: "/pck_chat/chat/chat?unionId=" + t
        });
    },
    resovleNickName: function(a) {
        var t = "";
        switch (a.UserSystem) {
          case 1:
            t = "(头条用户)";
            break;

          case 0:
          default:
            t = "";
        }
        return t ? a.NickName ? "" + a.NickName + t : "" + t : a.NickName ? a.NickName : "";
    }
});