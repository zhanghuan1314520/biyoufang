var e = require("../../config.js"), t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        navH: a.globalData.navH,
        deviceWidth: a.globalData.deviceWidth,
        focus: !0,
        isShare: 0,
        keyWords: "",
        likely: !0,
        pageNo: 1,
        limit: 20,
        searchList: null,
        canLoadMore: !1,
        hotSearchList: [],
        historySearchList: [],
        imageRoot: a.globalData.imgsPathInfo.rootPath,
        shakeTimerId: "",
        canLoadBanner: !1
    },
    onLoad: function(e) {
        var t = this;
        wx.hideShareMenu();
        var r = a.globalData.SDKVersion.replace(/\./g, "");
        a.checkSession(function() {
            t.setData({
                userInfo: a.globalData.userInfo,
                isShare: e.isShare || 0,
                version: r,
                canLoadBanner: !0
            }, function() {
                t.getHotSearchList(), t.getHistorySearch();
            });
        }, e);
    },
    onHide: function() {
        var e = [];
        this.data.hotSearchList.forEach(function(t) {
            2 !== t.eventTrackStatus && (e.push(t.AdvertId), t.eventTrackStatus = 2);
        });
        var a = this.selectComponent("#swiperBanner"), r = [];
        (a && a.data.bannerList || []).forEach(function(e) {
            1 === e.eventTrackStatus && (r.push(e.Id), e.eventTrackStatus = 2);
        });
        var i = [].concat(e, r);
        i.length && t.recordAdvertScan({
            AdvertIds: i
        });
    },
    onReachBottom: function() {
        this.data.canLoadMore && this.data.keyWords && (this.setData({
            pageNo: this.data.pageNo + 1
        }), this._search());
    },
    formReset: function() {
        this.setData({
            keyWords: ""
        });
    },
    inputing: function(e) {
        var a = this, r = t.trim(e.detail.value);
        this.setData({
            keyWords: r,
            pageNo: 1
        }, function() {
            var e = a.data.shakeTimerId;
            clearTimeout(e), a.data.shakeTimerId = setTimeout(function() {
                a.search();
            }, 800);
        });
    },
    search: function() {
        this.data.keyWords ? this._search() : this.setData({
            searchList: null
        });
    },
    _search: function() {
        var a = this;
        return t.request({
            url: e.service.searchBuildingInBuilding,
            data: {
                name: this.data.keyWords.replace(/\·/g, ""),
                pageNo: this.data.pageNo
            }
        }).then(function(e) {
            var t = a.data.searchList ? a.data.searchList.length : 0;
            1 === a.data.pageNo ? a.setData({
                searchList: a.formatBuildingData(e, t) || []
            }) : a.setData({
                searchList: a.data.searchList.concat(a.formatBuildingData(e, t))
            }), a.setData({
                canLoadMore: e.length === a.data.limit
            });
        });
    },
    formatBuildingData: function(e, a) {
        var r = this;
        return e.map(function(e, i) {
            return e.idx = i + a, e.subscribeStatus = 0, e.followStatus = 0, e.SubwayDistance && e.SubwayDistance <= 1500 && (e.SubwayDistance < 1e3 ? e.BuildingTags = "距地铁" + e.SubwayDistance + "m" + (e.BuildingTags ? "," + e.BuildingTags : "") : e.BuildingTags = "距地铁" + (e.SubwayDistance / 1e3).toFixed(1) + "km" + (e.BuildingTags ? "," + e.BuildingTags : "")), 
            e.propertyType = String(e.PropertyType), e.info = t.formatBuildingInfo(e, r.data.cityInfo), 
            e.eventTrackStatus = 0, e;
        });
    },
    getHotSearchList: function() {
        var a = this;
        return t.request({
            url: e.service.getLastHotBuildingInBld
        }).then(function(e) {
            a.setData({
                hotSearchList: e
            });
        });
    },
    getHistorySearch: function() {
        var r = this;
        if (a.globalData.userInfo.OpenId) return t.request({
            url: e.service.getHistorySearchInBld.replace("{openId}", a.globalData.userInfo.OpenId)
        }).then(function(e) {
            r.setData({
                historySearchList: e
            });
        });
    },
    searchFromRecord: function(e) {
        var t = this, a = e.currentTarget.dataset, r = a.keywords, i = a.type, n = a.index;
        this.setData({
            searchList: [],
            keyWords: r,
            likely: !1,
            pageNo: 1
        }, function() {
            t.search(), t.recordUserSearch(r), 1 === i && t.recordHotKeyworld(t.data.hotSearchList[n]);
        });
    },
    recordHotKeyworld: function(a) {
        t.request({
            url: e.service.getLastHotBuildingInBld,
            method: "POST",
            data: {
                AdvertId: a.AdvertId || "",
                BuildingId: a.BuildingId,
                BuildingName: a.BuildingName,
                OpenId: this.data.userInfo.OpenId,
                UserSystem: 0,
                SourcePort: "MiniProgram"
            }
        });
    },
    deleteHistorySearch: function() {
        var r = this;
        if (a.globalData.userInfo.OpenId) return t.request({
            url: e.service.getHistorySearchInBld.replace("{openId}", this.data.userInfo.OpenId),
            data: {
                openId: this.data.userInfo.OpenId
            },
            method: "DELETE"
        }).then(function() {
            r.getHistorySearch();
        });
    },
    ensureToSearch: function() {
        this.setData({
            likely: !1,
            pageNo: 1
        }), this.recordUserSearch(this.data.keyWords);
    },
    recordUserSearch: function(a) {
        var r = this;
        return t.request({
            url: e.service.recordUserSearchInBld,
            method: "POST",
            data: {
                OpenId: this.data.userInfo.OpenId,
                Content: a
            }
        }).then(function() {
            r.getHistorySearch();
        });
    },
    inputFocus: function() {
        this.setData({
            likely: !0
        });
    },
    checkDetail: function(e) {
        var a = e.currentTarget.dataset, r = a.id, i = a.name;
        this.recordUserSearch(i), t.recordBuildingClick({
            buildingId: r,
            SourceKey: "Search"
        }), wx.navigateTo({
            url: "/pages/detail/detail?buildingId=" + r
        });
    },
    buildCardOperate: function(e) {
        var a = e.detail.buildingCardInfo;
        t.recordBuildingClick({
            buildingId: a.buildingId,
            SourceKey: "Search"
        }), t.buildingJump(e);
    }
});