var e = getApp(), t = require("../../config.js"), r = require("../../utils/index.js");

Page({
    data: {
        navH: e.globalData.navH,
        userInfo: null,
        houseTypeList: null,
        houseTypeImgList: null,
        Discount: 0,
        LendingRate: 0,
        curTab: -1,
        imageRoot: e.globalData.imgsPathInfo.rootPath
    },
    onLoad: function(t) {
        var a = this;
        e.checkSession(function() {
            var o = e.globalData.userInfo, i = t.buildingId;
            if (a.setData({
                userInfo: o,
                buildingId: i,
                buildingName: t.buildingName || "",
                showAsProject: parseInt(t.showAsProject),
                projectId: t.projectId || ""
            }), a.getBuildingHouseType(), t.brokerCode) {
                var n = getCurrentPages();
                r.recordShareVisit(t.brokerCode, n[n.length - 1].route + r.serializationUrlParams(t));
            }
        }, r.getShareParams(t));
    },
    getBuildingHouseType: function() {
        var e = this;
        return r.request({
            url: t.service.getHouseTypesInBld.replace("{buildingId}", this.data.buildingId),
            data: {
                projectId: this.data.projectId || ""
            }
        }).then(function(t) {
            e.setData({
                houseTypeListInit: e.formatHouseTypeListInit(t)
            }, function() {
                e.formatHouseTypeList();
            });
        });
    },
    formatHouseTypeListInit: function(e) {
        return e.HouseTypes.map(function(e, t) {
            var a = parseInt(e.SeveralRooms.substring(0, 1));
            return e.roomCount = a, e.houseIndex = t, e.ImageUrl = r.formatUrl(e.Images && e.Images[0] || ""), 
            e.totalPrice = e.TotalPrice, e.thirtyPercentPrice = parseInt(.3 * e.totalPrice), 
            e.sixthPercentPrice = parseInt(.6 * e.totalPrice), e;
        });
    },
    formatHouseTypeList: function() {
        var e = r.deepCopy(this.data.houseTypeListInit);
        this.setData({
            houseTypeList: e
        });
        var t = e.filter(function(e) {
            return null != e.roomCount;
        }), a = 0, o = [], i = r.deepCopy(t.sort(this.compare("roomCount")));
        return i.map(function(e, t) {
            t > 0 && e.roomCount != i[t - 1].roomCount && (a += 1), !o[a] && (o[a] = []), o[a].push(e);
        }), this.setData({
            houseTypeArr: o
        }), t;
    },
    changeTab: function(e) {
        var t = e.currentTarget.dataset.index;
        t !== this.data.curTab && this.setData({
            curTab: t,
            houseTypeList: -1 === t ? this.data.houseTypeListInit : this.data.houseTypeArr[t]
        });
    },
    getLoanFormula: function() {
        var e = this;
        return r.request({
            url: t.service.getLoanFormula
        }).then(function(t) {
            e.setData({
                LendingRate: t.LendingRate
            });
        });
    },
    checkImage: function(e) {
        var t = this.data.houseTypeList.map(function(e) {
            return e.ImageUrl;
        });
        wx.previewImage({
            urls: t,
            current: e.currentTarget.dataset.url
        });
    },
    checkHouseDetail: function(e) {
        var t = e.currentTarget.dataset, a = t.index, o = t.id;
        r.recordHosueTypeClick({
            houseTypeId: o
        }), wx.navigateTo({
            url: "/pck_building/house_detail/house_detail?buildingId=" + this.data.buildingId + "&index=" + a + "&showAsProject=" + this.data.showAsProject + "&projectId=" + this.data.projectId
        });
    },
    compare: function(e) {
        return function(t, r) {
            var a = t[e], o = r[e];
            return a < o ? -1 : a > o ? 1 : 0;
        };
    },
    onShareAppMessage: function() {
        return r.extractShareFn({
            util: r,
            app: e
        });
    }
});