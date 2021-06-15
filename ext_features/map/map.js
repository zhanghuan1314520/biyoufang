var t = require("../../config.js"), a = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        polymerization: !0,
        windowWidth: 0,
        windowHeight: 0,
        navH: i.globalData.navH,
        lat: null,
        lng: null,
        mapCxt: null,
        mapScale: 12,
        markers: [],
        totalcount: 0,
        cityList: null,
        curDistrictList: null,
        districtMap: {},
        regionArray: null,
        stateArray: [ {
            id: -1,
            name: "全部状态"
        }, {
            id: 6,
            name: "即将首开"
        }, {
            id: 0,
            name: "即将预售"
        }, {
            id: 1,
            name: "即将登记"
        }, {
            id: 2,
            name: "正在登记"
        }, {
            id: 7,
            name: "待加推"
        } ],
        list: null,
        curRange: null,
        curDistrictIndex: null,
        curState: null,
        curStateText: "",
        regionPolymerization: []
    },
    onLoad: function(t) {
        var e = this;
        i.checkSession(function() {
            var t = i.globalData.cityInfo || null;
            e.setData({
                polymerization: !0,
                mapCxt: wx.createMapContext("map", e)
            }), a.promisify(wx.getSystemInfo)().then(function(a) {
                e.setData({
                    windowWidth: a.windowWidth,
                    windowHeight: a.windowHeight
                }), e.getBusinesscities(function(a) {
                    e.getBuildings(function() {
                        t && t.Latitude ? e.setData({
                            lat: t.Latitude,
                            lng: t.Longitude
                        }) : e.setData({
                            lat: a.Latitude,
                            lng: a.Longitude
                        });
                    });
                });
            });
        }, a.getShareParams(t));
    },
    getBuildings: function(i) {
        var e = this;
        return a.request({
            url: t.service.getBuildingMapInbuilding
        }).then(function(t) {
            e.setData({
                totalcount: t.TotalCount,
                list: e.formatBuildList(t)
            }), i && i();
        });
    },
    formatBuildList: function(t) {
        var a = this, i = {}, e = t.map(function(t) {
            return t.marker = a.getMarker(t), void 0 === i[t.DistrictId] && (i[t.DistrictId] = {
                state_all: 0,
                state_0: 0,
                state_1: 0,
                state_2: 0,
                state_3: 0,
                state_4: 0,
                state_5: 0,
                state_6: 0,
                state_7: 0
            }), i[t.DistrictId].state_all++, i[t.DistrictId]["state_" + t.Status]++, t;
        });
        return this.setData({
            districtMap: i
        }), e;
    },
    getBusinesscities: function(i) {
        var e = this;
        return a.request({
            url: t.service.getAreaInfoInGlobal
        }).then(function(t) {
            e.setData({
                cityList: t,
                curDistrictList: t,
                regionArray: [ {
                    DistrictId: null,
                    DistrictName: "所有区域"
                } ].concat(t)
            }), i && i(t[0]);
        });
    },
    getMarker: function(t) {
        var a = t.BuildingName + (t.AveragePrice > 0 ? "(¥" + t.AveragePrice + ")" : "");
        return {
            id: t.BuildingId,
            iconPath: "/resource/tm.png",
            width: 0,
            height: 0,
            latitude: t.Latitude,
            longitude: t.Longitude,
            callout: {
                content: a,
                color: "#ffffff",
                fontSize: 10,
                bgColor: this.formatMarkerBgColor(t.Status),
                borderRadius: 4,
                padding: 6,
                display: "ALWAYS"
            }
        };
    },
    formatMarkerBgColor: function(t) {
        return "#FF9102";
    },
    regionchange: function(t) {
        var a = this;
        "end" === t.type && this.data.mapCxt.getRegion({
            success: function(t) {
                a.setData({
                    curRange: {
                        minLatitude: t.southwest.latitude,
                        maxLatitude: t.northeast.latitude,
                        minLongitude: t.southwest.longitude,
                        maxLongitude: t.northeast.longitude
                    }
                }), a.handleCurMarkers();
            }
        });
    },
    bindRegionChange: function(t) {
        var a = 1 * t.detail.value, i = this.data.curDistrictList[a - 1];
        this.setData({
            mapScale: 13,
            curDistrictIndex: 0 == a ? null : a,
            lat: i ? i.Latitude : this.data.cityList.Latitude,
            lng: i ? i.Longitude : this.data.cityList.Longitude
        }), this.handleCurMarkers();
    },
    bindStateChange: function(t) {
        var a = 1 * t.detail.value, i = this.data.stateArray[a].id;
        this.setData({
            curState: -1 === i ? null : i,
            curStateText: this.formatState(i)
        }), this.handleCurMarkers();
    },
    formatState: function(t) {
        switch (1 * t) {
          case -1:
            return "全部状态";

          case 0:
            return "即将预售";

          case 1:
            return "即将登记";

          case 2:
            return "正在登记";

          case 6:
            return "即将首开";

          case 7:
            return "待加推";
        }
    },
    handleCurMarkers: function(t) {
        var i = this;
        console.log("地图视图大小发生改变"), a.promisify(this.data.mapCxt.getScale)().then(function(a) {
            t = t || i.data.curRange;
            var e = [], n = a.scale;
            n >= 12 && i.data.list && i.data.list.forEach(function(a) {
                if (a.Latitude >= t.minLatitude && a.Latitude <= t.maxLatitude && a.Longitude >= t.minLongitude && a.Longitude <= t.maxLongitude) {
                    if (null !== i.data.curDistrictIndex && 0 != i.data.curDistrictIndex && a.DistrictId !== i.data.regionArray[1 * i.data.curDistrictIndex].Id) return;
                    if (null !== i.data.curState && a.Status != i.data.curState) return;
                    e.push(a.marker);
                }
            }), console.log(n, "当前的大小"), i.setData({
                markers: e.length > 70 || n < 12 ? [] : e,
                polymerization: e.length > 70 || n < 12
            }), (n < 12 || e.length > 70) && i.makeRegionPolymerization();
        });
    },
    makeRegionPolymerization: function() {
        var t = this, a = (this.data.curRange, this.data.curDistrictList.filter(function(a) {
            return a.count = t.data.districtMap[a.Id] ? t.data.districtMap[a.Id]["state_" + (-1 === t.data.curState || null === t.data.curState ? "all" : t.data.curState)] : 0, 
            !0;
        }));
        this.setData({
            markers: this.getRegionMarkers(a),
            polymerization: !0
        });
    },
    getRegionMarkers: function(t) {
        return console.log(t), t.map(function(t, a) {
            return {
                id: "region__" + a,
                iconPath: "/resource/tm.png",
                width: 0,
                height: 0,
                latitude: t.Latitude,
                longitude: t.Longitude,
                callout: {
                    content: t.Name + "\n" + t.count + "个",
                    color: "#ffffff",
                    fontSize: 11,
                    bgColor: "#FE5E10",
                    borderRadius: 100,
                    borderColor: "#FE5E10",
                    padding: 10,
                    display: "ALWAYS",
                    textAlign: "center"
                }
            };
        });
    },
    checkProjectDetail: function(t) {
        console.log(t);
        var i = t.markerId;
        if (i.indexOf("region__") > -1) {
            var e = 1 * i.split("__")[1];
            this.setData({
                mapScale: 13,
                curDistrictIndex: e + 1,
                lat: this.data.curDistrictList[e].Latitude,
                lng: this.data.curDistrictList[e].Longitude
            });
        } else a.recordByAld("单个楼盘点击量", {
            "楼盘ID": t.markerId,
            "触发页面": "地图找房"
        }), wx.navigateTo({
            url: "/pages/detail/detail?buildingId=" + t.markerId
        });
    },
    onShareAppMessage: function() {
        return a.extractShareFn({
            util: a,
            app: i
        });
    }
});