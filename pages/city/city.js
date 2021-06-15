var t = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        navH: 0,
        title: "选择城市",
        cityInfo: null,
        cityList: [],
        selectType: 1,
        locationLoading: !1,
        historyList: [],
        groupCityList: [],
        intoCityId: null
    },
    onLoad: function(t) {
        var n = this;
        i.checkSession(function() {
            var o = i.globalData, a = o.navH, e = o.operatingCityList, c = o.operatingCityGroupList, s = "选择城市", r = null;
            1 == t.selectCity ? r = i.globalData.cityInfo || null : 2 == t.selectCity ? (s = "追加入驻-选择城市", 
            r = i.globalData.cityInfo || null) : (r = e.filter(function(t) {
                return t.IsMain;
            })[0] || null, i.globalData.cityInfo = r, i.setCityInfo(r)), n.setData({
                cityInfo: r,
                navH: a,
                title: s,
                cityList: e,
                groupCityList: c.map(function(t) {
                    return t._show = t.CityList.some(function(t) {
                        return t.IsShow;
                    }), t;
                }),
                selectType: t.selectCity,
                intoCityId: r.CityId
            });
        }, t);
    },
    onShow: function() {
        this.getClickHistory();
    },
    selectCity: function(n) {
        var o = n.currentTarget.dataset.cityId, a = this.data.selectType, e = this.data.intoCityId, c = this.data.cityList.filter(function(t) {
            return t.CityId === o;
        })[0];
        switch (Number(a)) {
          case 2:
            e !== o && this.setData({
                cityInfo: c,
                intoCityId: o
            });
            break;

          default:
            i.globalData.cityInfo = c, i.setCityInfo(c), t.navigatePage({
                url: "/pages/index/index",
                goType: "reLaunch"
            }), this.recondClickHistory(c);
        }
    },
    additionClick: function() {
        var n = this.data.cityInfo;
        i.globalData.sourceCityInfo = i.globalData.cityInfo, i.globalData.cityInfo = n, 
        t.navigatePage({
            url: "/pck_broker/broker_belong/broker_belong",
            goType: "redirectTo"
        });
    },
    reloadLocation: function() {
        var n = this;
        this.data.locationLoading || (this.setData({
            locationLoading: !0
        }), i.updateCityInfo().then(function(o) {
            var a = n.data.cityInfo;
            o && o.CityId !== a.CityId ? wx.showModal({
                title: "当前城市: " + a.CityName,
                content: "是否切换到定位城市: " + o.CityName,
                showCancel: !0,
                confirmText: "切换城市",
                confirmColor: "#FE5E10",
                success: function(t) {
                    t.confirm && (i.globalData.cityInfo = o, i.setCityInfo(o), n.recondClickHistory(o), 
                    wx.reLaunch({
                        url: "/pages/index/index"
                    }));
                }
            }) : t.wxToast("已切换到所在城市或所在城市未开通");
        }).catch(function(t) {
            t && "getLocation:fail auth deny" === t.errMsg && wx.showModal({
                title: "警告",
                content: "获取位置信息失败，请进行功能授权",
                success: function(t) {
                    var i = this;
                    t.confirm && wx.openSetting({
                        success: function() {
                            i.reloadLocation();
                        }
                    });
                }
            });
        }).finally(function() {
            n.setData({
                locationLoading: !1
            });
        }));
    },
    recondClickHistory: function(t) {
        var i = (this.data.historyList || []).filter(function(i) {
            return i.CityId !== t.CityId;
        });
        i.unshift(t), wx.setStorage({
            key: "historyCityInfo",
            data: i.slice(0, 4)
        });
    },
    getClickHistory: function() {
        var t = this;
        wx.getStorage({
            key: "historyCityInfo",
            success: function(i) {
                t.setData({
                    historyList: i.data || []
                });
            }
        });
    }
});