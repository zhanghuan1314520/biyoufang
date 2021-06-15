var t = require("../../config.js"), a = require("../../utils/index.js"), n = getApp();

Page({
    data: {
        userInfo: "",
        navH: n.globalData.navH,
        buildingName: "",
        maxTextCount: 100,
        currentTextCount: 0,
        content: "",
        uploading: !1,
        LimitCount: 0,
        TodayCount: 0
    },
    onLoad: function(t) {
        this.setData({
            userInfo: n.globalData.userInfo,
            buildingName: t.buildingName,
            buildingId: t.buildingId,
            LimitCount: n.globalData.LimitCount || 0,
            TodayCount: n.globalData.TodayCount || 0
        }), wx.hideShareMenu();
    },
    typing: function(t) {
        var a = t.detail;
        this.setData({
            currentTextCount: a.value.length,
            content: a.value
        });
    },
    formSubmit: function(t) {
        var n = t.detail.value.comment, e = this.data, i = e.LimitCount, o = e.TodayCount, u = e.userInfo;
        n.length < 1 ? a.wxToast("写点什么再发布吧") : n.length < 5 || n.length > 100 ? a.wxToast("字符长度限制为5-100个字符") : o >= i && 0 !== i && 1 !== u.UserType ? a.wxToast("今日评论已达最大次数") : a.validateContentReg(n, "联系方式不可以出现喔~") && this.comment();
    },
    comment: function() {
        var e = this;
        return this.setData({
            uploading: !0
        }), a.request({
            url: t.service.commentForBuildingInCmt.replace("{buildingId}", this.data.buildingId),
            method: "POST",
            data: {
                BuildingId: this.data.buildingId,
                Content: this.data.content
            },
            loading: {
                title: "点评上传中..."
            }
        }).then(function(t) {
            wx.showToast({
                title: "点评成功"
            }), n.globalData.TodayCount = e.data.TodayCount + 1, e.setData({
                content: "",
                uploading: !1,
                TodayCount: e.data.TodayCount + 1
            }, function() {
                var t = getCurrentPages(), a = t[t.length - 2], n = t[t.length - 3];
                a.setData({
                    refresh: !0
                }), n && "pages/detail/detail" === n.route ? (n.setData({
                    refresh: !0
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 1200)) : setTimeout(function() {
                    var t = "/pck_building/detail_commentList/detail_commentList?buildingId=" + e.data.buildingId + "&buildingName=" + e.data.buildingName;
                    wx.redirectTo({
                        url: t
                    });
                }, 1200);
            });
        }).catch(function(t) {
            e.setData({
                uploading: !1
            }), console.error("上传点评时失败: ", t);
        });
    }
});