var t = require("../../config.js"), n = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        navH: i.globalData.navH,
        isShare: 0,
        buildingId: null,
        building: null,
        show: !1,
        section1: null,
        section2: null,
        section3: null,
        section4: null,
        section5: null,
        maxLength: 90,
        unfoldFlag: !1,
        splitFlag: !0
    },
    onLoad: function(t) {
        var l = this;
        i.checkSession(function() {
            l.setData({
                buildingId: t.buildingId,
                isShare: t.isShare || 0
            }), l.getBuildingInfo();
        }, n.getShareParams(t));
    },
    handleUnfold: function() {
        this.setData({
            splitFlag: !this.data.splitFlag,
            unfoldFlag: !this.data.unfoldFlag
        }), setTimeout(function() {
            wx.pageScrollTo({
                scrollTop: 3e3,
                duration: 800
            });
        }, 400);
    },
    handleUnfoldBtn: function() {
        var t = this;
        this.setData({
            unfoldFlag: !this.data.unfoldFlag
        }), setTimeout(function() {
            t.setData({
                splitFlag: !t.data.splitFlag
            });
        }, 400);
    },
    getBuildingInfo: function() {
        var i = this;
        return wx.showLoading({
            title: "加载中"
        }), n.request({
            url: t.service.getBuildingMoreDetailInBld.replace("{buildingId}", this.data.buildingId)
        }).then(function(t) {
            i.setData({
                building: t,
                section1: t[0] || null,
                section2: t[1] || null,
                section3: t[2] || null,
                section4: t[3] || null,
                section5: t[4] || null,
                show: !0
            }), wx.hideLoading();
        });
    },
    formatPropertyTypeText: function(t) {
        return 0 == t ? "住宅" : 1 == t ? "商住" : "商铺";
    },
    formatWaterAndElectricTypeText: function(t) {
        return 0 == t ? "民用" : 1 == t ? "商用" : "暂无信息";
    },
    onShareAppMessage: function() {
        return n.extractShareFn({
            util: n,
            app: i
        });
    }
});