var e = require("../../config.js"), t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        navH: a.globalData.navH,
        curHouse: null,
        houseTypeList: null,
        showPriceModule: !1,
        posterIndex: 0
    },
    onLoad: function(e) {
        var t = this;
        a.checkSession(function() {
            var r = a.globalData.userInfo, s = e.buildingId, i = e.projectId, n = e.index, o = e.showAsProject;
            t.setData({
                userInfo: r,
                buildingId: s,
                showAsProject: parseInt(o),
                projectId: i,
                curIndex: n ? parseInt(n) : 0
            }), t.getLoanFormula(), t.getBuildingHouseType();
        }, e);
    },
    getBuildingHouseType: function() {
        var a = this;
        return t.request({
            url: e.service.getHouseTypesInBld.replace("{buildingId}", this.data.buildingId),
            data: {
                projectId: this.data.showAsProject ? this.data.projectId : ""
            }
        }).then(function(e) {
            var t = a.formatHouseTypeList(e);
            a.setData({
                houseTypeList: t,
                curHouse: t[a.data.curIndex],
                showPriceModule: 0 !== e.ProjectStatus && 5 !== e.ProjectStatus
            });
        });
    },
    formatHouseTypeList: function(e) {
        return e.HouseTypes.map(function(e, a) {
            return e.iamges = e.Images || [], e.ImageUrlList = e.iamges.map(function(e) {
                return t.formatUrl(e);
            }), e.totalPrice = e.TotalPrice, e.houseIndex = a, e.thirtyPercentPrice = parseInt(.3 * e.totalPrice), 
            e.sixthPercentPrice = parseInt(.6 * e.totalPrice), e;
        });
    },
    changeHouse: function(e) {
        var t = e.currentTarget.dataset.index;
        if (t !== this.data.curIndex) {
            wx.showLoading({
                title: "加载中"
            }), this.setData({
                posterIndex: 0
            });
            var a = this;
            setTimeout(function() {
                a.setData({
                    curIndex: t,
                    curHouse: a.data.houseTypeList[t]
                }), wx.hideLoading();
            }, 200);
        }
    },
    swiperChange: function(e) {
        var t = e.detail.current;
        this.setData({
            posterIndex: t
        });
    },
    getLoanFormula: function() {
        var a = this;
        return t.request({
            url: e.service.getLoanFormula
        }).then(function(e) {
            a.setData({
                LendingRate: e.LendingRate
            });
        });
    },
    previewImage: function() {
        wx.previewImage({
            current: this.data.curHouse.ImageUrlList[this.data.posterIndex],
            urls: this.data.curHouse.ImageUrlList
        });
    }
});