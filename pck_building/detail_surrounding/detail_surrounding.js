var t = getApp(), a = require("../../config.js"), r = require("../../utils/index.js"), e = [];

Page({
    data: {
        navH: t.globalData.navH,
        userInfo: null,
        buildingSurroundings: null,
        curTab: 1,
        curSubTab: 0,
        lat: null,
        lng: null,
        initialLat: null,
        initialLng: null,
        name: "",
        markers: [],
        includePoints: [],
        facilityCount: null,
        mapH: 0
    },
    onLoad: function(a) {
        var e = this;
        t.checkSession(function() {
            var n = t.globalData.userInfo, i = a.lat, c = a.lng, u = a.name, s = a.buildingId;
            if (console.log(i, c), e.setData({
                userInfo: n,
                lat: 1 * i,
                lng: 1 * c,
                initialLat: 1 * i,
                initialLng: 1 * c,
                name: u,
                buildingId: s,
                curTab: a.index ? parseInt(a.index) : 1
            }), wx.getSystemInfo({
                success: function(t) {
                    e.setData({
                        mapH: t.windowHeight - e.data.navH - 215
                    });
                }
            }), e.getBuildingSurroundings(), a.brokerCode) {
                var o = getCurrentPages();
                r.recordShareVisit(a.brokerCode, o[o.length - 1].route + r.serializationUrlParams(a));
            }
        }, r.getShareParams(a));
    },
    getBuildingSurroundings: function() {
        var t = this;
        return wx.showLoading({
            title: "加载中"
        }), r.request({
            url: a.service.getSurroundingFacilityInBld.replace("{buildingId}", this.data.buildingId),
            complete: function() {
                wx.hideLoading();
            }
        }).then(function(a) {
            t.setData({
                buildingSurroundings: t.formatSurroundings(t.resolveSurroundings(a))
            });
        });
    },
    formatKeyByType: function(t) {
        var a = "";
        switch (1 * t) {
          case 1:
            a = "Traffics";
            break;

          case 2:
            a = "Business";
            break;

          case 3:
            a = "Schools";
            break;

          case 4:
            a = "Recreations";
            break;

          case 5:
            a = "Hospitals";
        }
        return a;
    },
    resolveSurroundings: function(t) {
        var a = this, r = {};
        return t.forEach(function(t) {
            var n = a.formatKeyByType(t.FacilityType);
            n && (r[n] = t.FacilityList, e.push(t.FacilityTypeName));
        }), r;
    },
    formatSurroundings: function(t) {
        var a = this, e = [], n = [], i = [];
        for (var c in t) !function(c) {
            var u = [], s = {
                Count: 0
            }, o = a.formatFacilityType(c), l = [];
            s.FacilityType = o, s.name = a.formatFacilityName(o), s.icon = a.formatFacilityIcon(o), 
            t[c].forEach(function(t, e) {
                t.name = t.BuildingSupportingTypeName, t.icon = a.formatFacilityClassIcon(t.BuildingSupportingType), 
                t.emptyText = a.formatEmptyText(t.BuildingSupportingType), t.Items.length > 0 ? (s.Count += t.Items.length, 
                t.Items.forEach(function(e, n) {
                    e.Distance = r.formatDistance(e.Distance), e.WalkingTime = e.WalkingTime ? parseInt(e.WalkingTime / 60) : "", 
                    e.markerIcon = a.formatFacilityClassIcon(t.BuildingSupportingType), e.marker = a.getClassMarker(e, e.markerIcon), 
                    e.markerId = c + "-" + t.BuildingSupportingType + "-" + n, u.push(e.marker);
                })) : !t.emptyText && l.push(e);
            }), n.push(u), t[c] = t[c].filter(function(t, a) {
                return l.indexOf(a) < 0;
            }), e.push(t[c]), i.push(s);
        }(c);
        i.sort(r.compare("FacilityType"));
        var u = [ {
            iconPath: "/resource/detail/match_icon_loupan_yell@3x.png",
            id: 0,
            latitude: 1 * this.data.lat,
            longitude: 1 * this.data.lng,
            width: 22,
            height: 22,
            callout: {
                content: this.data.name,
                color: "#333333",
                fontSize: 11,
                padding: 5,
                bgColor: "#ffffff",
                borderRadius: 17,
                display: "ALWAYS",
                borderWidth: 1,
                borderColor: "#dddddd"
            }
        } ], s = u.concat(n[this.data.curTab - 1]);
        return this.setData({
            markers: s,
            initMarker: u,
            markerArr: n,
            includePoints: s,
            facilityCount: i
        }), e;
    },
    getClassMarker: function(t, a) {
        return {
            iconPath: "/pck_building/images/arround/" + a + "_yell@2x.png",
            id: t.Title,
            latitude: 1 * t.Latitude,
            longitude: 1 * t.Longitude,
            width: 20,
            height: 25,
            callout: {
                content: t.Title,
                color: "#FFFFFF",
                fontSize: 10,
                padding: 5,
                bgColor: "#434343",
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#434343"
            }
        };
    },
    initLocation: function() {
        var t = this.data, a = t.initialLat, r = t.initialLng;
        this.setData({
            lat: a,
            lng: r
        });
    },
    formatFacilityIcon: function(t) {
        switch (1 * t) {
          case 1:
            return "match_icon_traffic@3x";

          case 2:
            return "match_icon_shopping@3x";

          case 3:
            return "match_icon_school@3x";

          case 4:
            return "match_icon_life@3x";

          case 5:
            return "match_icon_hospital@3x";
        }
    },
    formatFacilityType: function(t) {
        switch (t) {
          case "Business":
            return 2;

          case "Hospitals":
            return 5;

          case "Recreations":
            return 4;

          case "Schools":
            return 3;

          case "Traffics":
            return 1;
        }
    },
    formatFacilityName: function(t) {
        switch (1 * t) {
          case 1:
            return e[0];

          case 2:
            return e[1];

          case 3:
            return e[2];

          case 4:
            return e[3];

          case 5:
            return e[4];
        }
    },
    formatFacilityClassName: function(t) {
        switch (1 * t) {
          case 1:
            return "地铁站";

          case 2:
            return "公交站";

          case 3:
            return "汽车站";

          case 4:
            return "火车站";

          case 5:
            return "机场";

          case 6:
            return "购物";

          case 7:
            return "美食";

          case 8:
            return "小学";

          case 9:
            return "中学";

          case 10:
            return "幼儿园";

          case 11:
            return "大学";

          case 12:
            return "其他学校";

          case 13:
            return "休闲";

          case 14:
            return "医疗";
        }
    },
    formatEmptyText: function(t) {
        switch (1 * t) {
          case 1:
            return "附近1公里范围，暂无地铁";

          case 2:
            return "附近1公里范围，暂无公交站";

          case 6:
            return "附近2公里范围内，暂无大型商超";

          case 7:
            return "附近1公里范围内，暂无美食地点";

          case 8:
            return "附近1公里范围内，暂无小学";

          case 9:
            return "附近1公里范围内，暂无中学";

          case 10:
            return "附近1公里范围内，暂无幼儿园";

          case 13:
            return "附近1.5公里范围暂无电影院、博物馆等休闲文化场所";

          case 14:
            return "附近1公里范围内，无大型医院";

          default:
            return "";
        }
    },
    formatFacilityClassIcon: function(t) {
        switch (1 * t) {
          case 1:
            return "match_icon_metro";

          case 2:
            return "match_icon_bus";

          case 3:
            return "match_icon_motor";

          case 4:
            return "match_icon_railway";

          case 5:
            return "match_icon_airport";

          case 6:
            return "match_icon_shopping";

          case 7:
            return "match_icon_cate";

          case 8:
            return "match_icon_primary";

          case 9:
            return "match_icon_middlescl";

          case 10:
            return "match_icon_kindergarten";

          case 11:
            return "match_icon_university";

          case 12:
            return "match_icon_primary";

          case 13:
            return "match_icon_life";

          case 14:
            return "match_icon_medical";
        }
    },
    changeTab: function(t) {
        var a = t.currentTarget.dataset.index;
        if (a !== this.data.curTab || this.data.curMarker) {
            var r = this.data.initMarker.concat(this.data.markerArr[a - 1]);
            this.setData({
                markers: r,
                includePoints: r,
                curTab: a,
                curSubTab: 0,
                curMarker: ""
            });
        }
    },
    changeSubTab: function(t) {
        var a = t.currentTarget.dataset.index;
        a !== this.data.curSubTab && this.setData({
            curSubTab: a
        });
    },
    changeMarker: function(t) {
        var a = t.currentTarget.dataset, r = a.curmarker, e = a.marker;
        if (e.callout.display = "ALWAYS", r !== this.data.curMarker) {
            var n = this.data.initMarker.concat(e);
            this.setData({
                markers: n,
                curMarker: r
            });
        }
    },
    onShareAppMessage: function() {
        return r.extractShareFn({
            util: r,
            app: t
        });
    }
});