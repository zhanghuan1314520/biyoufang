function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

function a(e) {
    if (Array.isArray(e)) {
        for (var a = 0, t = Array(e.length); a < e.length; a++) t[a] = e[a];
        return t;
    }
    return Array.from(e);
}

var t = require("../../config.js"), n = require("../../utils/index.js"), r = getApp();

Page({
    data: {
        navH: r.globalData.navH,
        screenHeight: r.globalData.screenHeight,
        mapScale: 13,
        scale: 13,
        mapPolyline: [],
        mapMarkers: [],
        allMarkers: [],
        subwayLines: [],
        lat: "",
        lng: "",
        anchor: {
            x: .5,
            y: .5
        },
        pakeUpFlag: !0,
        legendHeight: 0
    },
    onLoad: function(e) {
        var a = this;
        r.checkSession(function() {
            r.globalData.cityInfo ? a.setData({
                lat: r.globalData.cityInfo.Latitude,
                lng: r.globalData.cityInfo.Longitude
            }) : wx.getLocation({
                type: "gcj02",
                success: function(e) {
                    a.setData({
                        lat: e.latitude,
                        lng: e.longitude
                    });
                },
                fail: function(e) {
                    a.setData({
                        lat: "30.263779",
                        lng: "120.162887"
                    });
                }
            }), a.setData({
                mapCxt: wx.createMapContext("map", a)
            }), a.getSubwayBuildings();
        }, n.getShareParams(e));
    },
    getSubwayLines: function() {
        var e = this;
        return n.request({
            url: t.service.getSubwayInGlobal
        }).then(function(a) {
            a.map(function(e) {
                return e.noClose = !0, e;
            }), e.setData({
                subwayLines: e.drawSubwayLines(a)
            });
        });
    },
    getSubwayBuildings: function() {
        var e = this;
        return n.request({
            url: t.service.getBuildingSubwayInbuilding
        }).then(function(a) {
            var t = e.data.allMarkers.concat(e.formatBuildingMarkers(a));
            e.setData({
                allMarkers: t
            }, function() {
                e.getSubwayLines();
            });
        });
    },
    drawSubwayLines: function(e) {
        var t = this, n = [], r = [], i = e.map(function(e) {
            var a = t.getSubwayColor(e.Name);
            if (e.color = a, e.noClose) {
                var i = {
                    points: [],
                    color: a,
                    width: 3,
                    dottedLine: !e.HadOpened
                };
                e.StationList.forEach(function(e) {
                    i.points.push({
                        longitude: e.Longitude,
                        latitude: e.Latitude
                    }), r.push({
                        longitude: e.Longitude,
                        latitude: e.Latitude,
                        iconPath: "/resource/dtzf_icon_site@3x.png",
                        width: 10,
                        height: 10,
                        zIndex: 2,
                        label: {
                            content: e.Name,
                            color: "#FFFFFF",
                            fontSize: 9,
                            anchorX: -16,
                            anchorY: 6,
                            textAlign: "center"
                        }
                    });
                }), n.push(i);
            }
            return e;
        });
        return this.setData({
            mapMarkers: [].concat(r, a(this.data.allMarkers)),
            mapPolyline: n
        }), i;
    },
    formatBuildingMarkers: function(e) {
        var a = this;
        return e.map(function(e) {
            return a.getBuildingMarker(e);
        });
    },
    getBuildingMarker: function(e) {
        var a = e.BuildingName + (e.AveragePrice ? "(¥" + e.AveragePrice + ")" : "");
        return {
            id: e.BuildingId,
            iconPath: "/resource/tm.png",
            width: 0,
            height: 0,
            latitude: e.Latitude,
            longitude: e.Longitude,
            zIndex: 3,
            callout: {
                content: a,
                color: "#ffffff",
                fontSize: 10,
                bgColor: this.formatMarkerBgColor(e.Status),
                borderRadius: 4,
                padding: 6,
                display: "ALWAYS"
            }
        };
    },
    checkProjectDetail: function(e) {
        wx.navigateTo({
            url: "/pages/detail/detail?buildingId=" + e.markerId
        });
    },
    getSubwayColor: function(e) {
        switch (e) {
          case "1号线":
          case "1号支线":
            return "#E0211A";

          case "2号线":
            return "#EE782E";

          case "3号线":
          case "3号支线":
            return "#FFF100";

          case "4号线":
            return "#00AB4F";

          case "5号线":
            return "#018FA5";

          case "6号线":
            return "#0067B3";

          case "7号线":
            return "#514FA1";

          case "8号线":
            return "#940B24";

          case "9号线":
            return "#9A6531";

          case "富阳线":
            return "#9A9736";

          default:
            return "#000";
        }
    },
    formatMarkerBgColor: function(e) {
        return "#FF9102";
    },
    pakeUpLegend: function() {
        var e = this, a = this.data.pakeUpFlag;
        n.getElementSize({
            select: ".subway-legend-warp",
            callback: function(t) {
                e.setData({
                    pakeUpFlag: !a,
                    legendHeight: t[0].height
                });
            }
        });
    },
    closeOrShowLines: function(a) {
        var t = this, n = a.currentTarget.dataset.index, r = this.data.subwayLines[n].noClose;
        this.setData(e({}, "subwayLines[" + n + "].noClose", !r), function() {
            t.drawSubwayLines(t.data.subwayLines);
        });
    },
    regionchange: function(e) {
        var a = this;
        "end" == e.type ? this.data.mapCxt.getScale({
            success: function(e) {
                e.scale <= 10.7 && a.data.scale > 10.7 ? a.setData({
                    mapMarkers: a.data.allMarkers,
                    mapPolyline: a.data.allPolyline
                }) : e.scale > 10.7 && a.data.scale <= 10.7 && a.setData({
                    mapMarkers: a.data.markers,
                    mapPolyline: a.data.polyline
                });
            }
        }) : "begin" == e.type && this.data.mapCxt.getScale({
            success: function(e) {
                a.setData({
                    scale: e.scale
                });
            }
        });
    },
    onShareAppMessage: function() {
        return n.extractShareFn({
            util: n,
            app: r
        });
    }
});