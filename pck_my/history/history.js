var t = getApp(), a = require("../../config.js"), e = require("../../utils/index.js");

Page({
    data: {
        pageStatus: 0,
        navH: t.globalData.navH,
        nullImg: t.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/youliao_img_history.png",
        recentViewList: [],
        canLoadData: !0,
        pageInfo: {
            pageNo: 1,
            pageNum: 15
        }
    },
    onLoad: function(t) {
        this.getRecentViewList();
    },
    getRecentViewList: function() {
        var i = this;
        if (this.data.canLoadData && !(this.data.recentViewList && this.data.recentViewList.length >= 15)) {
            this.data.pageInfo;
            var n = t.globalData.userInfo.OpenId;
            e.request({
                url: a.service.listInTarck.replace("{openId}", n)
            }).then(function(t) {
                var a = [], e = i.data.recentViewList || [];
                t && t.length && ((a = i.formatBuildingList(t, i.data.recentViewList.length) || []).forEach(function(t) {
                    t.eventTrackStatus = 0;
                }), e = e.concat(a)), e.length ? i.setData({
                    recentViewList: e,
                    pageStatus: 1
                }, function() {
                    i.setData({
                        canLoadData: !1
                    });
                }) : i.setData({
                    pageStatus: 2
                });
            }).catch(function(t) {
                console.error("获取近期浏览列表时失败: ", t);
            });
        }
    },
    formatBuildingList: function(a, i) {
        return a.map(function(a, n) {
            a.idx = n + i, a.buildingInfo = {}, a.subscribePhone = a.PhoneNumber, a.propertyType = a.PropertyType, 
            a.SubwayDistance && a.SubwayDistance <= 1500 && (a.SubwayDistance < 1e3 ? a.BuildingTags = "地铁" + a.SubwayDistance + "m" + (a.BuildingTags ? "," + a.BuildingTags : "") : a.BuildingTags = "地铁" + (a.SubwayDistance / 1e3).toFixed(1) + "km" + (a.BuildingTags ? "," + a.BuildingTags : "")), 
            a.BuyStartTime && (a.newDays = (new Date().getTime() - new Date(a.BuyStartTime.replace(/[\.\-]/g, "/")).getTime()) / 1e3 / 60 / 60 / 24), 
            a.buildingInfo = e.formatBuildingInfo(a, t.globalData.cityInfo), a.buildingInfo.codeId = a.Id, 
            5 === a.ProjectStatus && a.newDays >= 3 && (a.buildingInfo.buildingStatusText = e.formatBuildingStatusShortText(a.BuildingStatus));
        }), a;
    },
    operateBuildingCardInfo: function(t) {
        var a = t.detail, i = a.eventType, n = a.buildingCardInfo;
        if ("goDetailPage" === i) {
            var u = {
                buildingId: n.buildingId,
                SourceKey: "BrowserHistory"
            };
            n.projectId && (u.ProjectId = n.projectId), e.recordBuildingClick(u), wx.navigateTo({
                url: "/pages/detail/detail?buildingId=" + n.buildingId
            });
        }
    },
    checkBuilding: function() {
        wx.reLaunch({
            url: "/pages/building/building"
        });
    }
});