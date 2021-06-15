var a = require("../../config.js"), t = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        navH: e.globalData.navH,
        nullImg: e.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/null.png",
        buildingList: null,
        key: "",
        shakeTimerId: ""
    },
    onLoad: function(a) {},
    onHide: function() {
        console.log("2"), e.globalData.sourceCityInfo && (e.globalData.cityInfo = e.globalData.sourceCityInfo);
    },
    onUnload: function() {
        console.log("1"), e.globalData.sourceCityInfo && (e.globalData.cityInfo = e.globalData.sourceCityInfo);
    },
    inputing: function(a) {
        var t = this, e = this.data.shakeTimerId;
        clearTimeout(e), this.data.shakeTimerId = setTimeout(function() {
            t.search(a);
        }, 1e3);
    },
    search: function(e) {
        var n = this, i = t.trim(e.detail.value);
        if (i) return t.request({
            url: a.service.searchBuildingUseConsultant,
            data: {
                name: i
            }
        }).then(function(a) {
            n.setData({
                buildingList: a
            });
        });
    },
    checkBuilding: function(a) {
        var t = a.currentTarget.dataset, e = getCurrentPages(), n = e[e.length - 2];
        wx.navigateBack({
            delta: 1,
            success: function() {
                n.setData({
                    "currentInfoDetail.BuildingId": t.id,
                    "currentInfoDetail.BuildingName": t.name
                });
            }
        });
    }
});