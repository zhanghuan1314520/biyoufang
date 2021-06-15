function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e, o = getApp(), a = require("../../config.js"), n = require("../../utils/index.js");

Page({
    data: (e = {
        showDialog: !1,
        navH: o.globalData.navH,
        nullImg: o.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/null@3x.png",
        pageNo: 1,
        limit: 10,
        moments: null,
        canLoadMore: !0
    }, t(e, "showDialog", !1), t(e, "userInfo", o.globalData.userInfo), t(e, "options", null), 
    t(e, "dialogContent", ""), t(e, "requestData", !1), e),
    onLoad: function(t) {
        var e = this;
        o.checkSession(function() {
            e.setData({
                userInfo: o.globalData.userInfo
            }), e.getBrokerMoments(), e.getBrokerMomentLimit();
        }, t);
    },
    onShow: function() {
        this.data.requestData && (this.setData({
            requestData: !1
        }), this.getBrokerMoments());
    },
    onReachBottom: function() {
        this.data.canLoadMore && this.getBrokerMoments();
    },
    getBrokerMoments: function() {
        var t = this, e = this.data, i = (e.userInfo, e.pageNo), r = e.limit, s = e.moments, l = o.globalData.consultantInfo, u = (s = s || []).length;
        n.request({
            url: a.service.counselorInNews.replace("{consultantId}", o.globalData.realtyConsultantId),
            data: {
                pageNo: i,
                limit: r
            }
        }).then(function(e) {
            var o = {
                pageNo: i++,
                canLoadMore: e.length === r
            };
            e && e.length || u ? e.map(function(t) {
                t.personalImageUrl = l.AvatarUrl, t.RealtyConsultantName = l.Name, t.Covers && (t.covers = t.Covers.map(function(t) {
                    return n.formatUrl(t);
                })), o["moments[" + u++ + "]"] = t;
            }) : o.moments = [], t.setData(o);
        });
    },
    getBrokerMomentLimit: function() {
        var t = this;
        n.request({
            url: a.service.getMomentsLimitInNews
        }).then(function(e) {
            e && t.setData({
                dialogContent: "删除动态扣" + e.Integral + "积分，请确认是否删除"
            });
        }).catch(function(t) {
            console.log("获取动态上限时失败: ", t);
        });
    },
    userOperate: function(t) {
        var e = t.detail;
        console.log(e);
        var o = e.momentInfo;
        switch (e.eventType) {
          case "del":
            this.setData({
                showDialog: !0,
                options: e.momentInfo
            });
            break;

          case "detail":
            var a = {
                buildingId: o.BuildingId,
                SourceKey: "Consultant"
            };
            o.projectId && (a.ProjectId = o.projectId), n.recordBuildingClick(a);
            var i = "/pages/detail/detail?buildingId=" + o.BuildingId;
            wx.navigateTo({
                url: i
            });
        }
    },
    dialogOperate: function(t) {
        console.log(t), "sure" === t.detail && this.handleDel(this.data.options), this.setData({
            showDialog: !1
        });
    },
    goCommit: function() {
        wx.navigateTo({
            url: "/pck_broker/post_moment/post_moment"
        });
    },
    handleDel: function(t) {
        var e = this;
        wx.showLoading(), n.request({
            url: a.service.removeMomentInNews.replace("{articleId}", t.Id),
            method: "DELETE",
            complete: function() {
                wx.hideLoading();
            }
        }).then(function(o) {
            n.wxToast("删除成功"), e.setData({
                moments: e.data.moments.filter(function(e) {
                    return e.Id !== t.Id;
                })
            });
        });
    }
});