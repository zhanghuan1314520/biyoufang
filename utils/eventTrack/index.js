var e = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
}, r = require("../rqeuest/index.js").request, t = require("../../config.js"), a = {
    recordAdvertScan: function(a) {
        var o = getApp();
        return a && (a.AdvertIds || a.advertIds) ? r({
            url: t.service.recordAdvertScanInRec,
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    recordAdvertClick: function(a) {
        var o = getApp();
        return a && (a.advertId || a.AdvertId) ? r({
            url: t.service.recordAdvertClickInRec.replace("{advertId}", a.advertId || a.AdvertId),
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    recordArticleScan: function(a) {
        var o = getApp();
        return a && (a.ArticleIds || a.articleIds) ? r({
            url: t.service.recordArticleScanInRec,
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    recordArticleClick: function(a) {
        var o = getApp();
        if (a && (a.ArticleId || a.articleId)) {
            var c = a.ArticleId || a.articleId;
            return delete a.ArticleId, delete a.articleId, r({
                url: t.service.recordArticleClickInRec.replace("{articleId}", c),
                method: "POST",
                data: e({}, a, {
                    UserSystem: 0,
                    CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                    SourcePort: "MiniProgram",
                    Openid: o.globalData.userInfo.OpenId
                })
            });
        }
        return Promise.reject();
    },
    recordArticleShare: function(e) {
        var a = getApp();
        return e && (e.articleId || e.ArticleId) ? r({
            url: t.service.recordArticleShareInRec.replace("{articleId}", e.articleId || e.ArticleId),
            method: "POST",
            data: {
                IsPoster: e.isPoster,
                UserSystem: 0,
                OpenId: a.globalData.userInfo.OpenId
            }
        }) : Promise.reject();
    },
    recordHosueTypeScan: function(a) {
        var o = getApp();
        return a && (a.houseTypeIds || a.HouseTypeIds) ? r({
            url: t.service.recordHosueTypeScanInRec,
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    recordHosueTypeClick: function(a) {
        var o = getApp();
        return a && (a.houseTypeId || a.HouseTypeId) ? r({
            url: t.service.recordHosueTypeClickInRec.replace("{houseTypeId}", a.houseTypeId || a.HouseTypeId),
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    recordBuildingClick: function(a) {
        var o = getApp();
        return a && (a.buildingId || a.BuildingId) ? r({
            url: t.service.recordBuildingClickInRec.replace("{buildingId}", a.buildingId || a.BuildingId),
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    recordUserDetailScanInfo: function(a) {
        var o = getApp();
        return a && (a.buildingId || a.BuildingId) ? r({
            url: t.service.recordUserDetailScanInfoInRec.replace("{buildingId}", a.buildingId || a.BuildingId),
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    recordLongpageClick: function(a) {
        var o = getApp();
        return a && (a.advertId || a.AdvertId) ? r({
            url: t.service.recordLongpageClick.replace("{advertId}", a.advertId || a.AdvertId),
            method: "POST",
            data: e({}, a, {
                UserSystem: 0,
                CityId: o.globalData.cityInfo && o.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        }) : Promise.reject();
    },
    addViewRecord: function(a) {
        r({
            url: t.service.addViewRecord,
            data: e({}, a),
            method: "POST"
        });
    },
    addProjectRecord: function(a) {
        r({
            url: t.service.addProjectRecord,
            data: e({}, a),
            method: "POST"
        });
    },
    recordShareOperateByBroker: function(e) {
        1 === getApp().globalData.userInfo.UserType && r({
            url: t.service.operateInMem,
            method: "POST",
            data: {
                SourceType: 2,
                Remark: e || ""
            }
        });
    },
    handleScanqrcodeTrack: function(a) {
        var o = getApp();
        if (a.PageUrl) return r({
            url: t.service.recordScanQrCodeTrackInRec,
            method: "POST",
            data: e({}, a, {
                SourcePort: "MiniProgram",
                Openid: o.globalData.userInfo.OpenId
            })
        });
    },
    handleEnterMetRecond: function() {
        var e = getApp();
        return r({
            url: t.service.userAccessRecordAPI,
            method: "POST",
            data: {
                Openid: e.globalData.userInfo.OpenId,
                UnionId: e.globalData.userInfo.UnionId || "",
                CityId: e.globalData.cityInfo && e.globalData.cityInfo.CityId || "",
                UserSystem: 0,
                SourcePort: "MiniProgram",
                EntranceType: this.getEntranceType()
            }
        });
    },
    getEntranceType: function() {
        var e = wx.canIUse("getEnterOptionsSync") ? wx.getEnterOptionsSync() : wx.getLaunchOptionsSync(), r = e.path, t = e.query, a = void 0 === t ? {} : t, o = e.scene, c = "1" === a.isShare, d = a.shareType || "", i = null;
        try {
            if ("advert" === d || "pck_advert/pullLongAdvert/index" === r && c && "user" !== d) i = 1; else if (c && "user" === d) i = 2; else switch (o) {
              case 1020:
              case 1035:
              case 1043:
              case 1058:
              case 1067:
              case 1074:
              case 1082:
              case 1091:
              case 1102:
                i = 3;
                break;

              case 1005:
              case 1006:
              case 1042:
              case 1106:
                i = 4;
                break;

              case 1011:
              case 1012:
              case 1013:
                i = 5;
                break;

              case 1014:
              case 1107:
                i = 6;
                break;

              case 1001:
              case 1103:
              case 1104:
              case 1089:
                i = 7;
                break;

              default:
                i = 0;
            }
        } catch (e) {
            i = 0;
        }
        return i;
    },
    recordExtensionAdvertClick: function(a) {
        var o = a.advertId, c = a.sourceType, d = void 0 === c ? 0 : c, i = a.phoneNumber, n = void 0 === i ? "" : i, l = getApp(), I = {
            SourceType: d
        };
        return n && (I.PhoneNumber = n), o && r({
            url: t.service.recordExtensionAdvertClickAPI.replace("{AdvertId}", o),
            method: "POST",
            data: e({
                Openid: l.globalData.userInfo.OpenId,
                CityId: l.globalData.cityInfo && l.globalData.cityInfo.CityId || "",
                UserSystem: 0,
                SourcePort: "MiniProgram"
            }, I)
        });
    },
    recordLongAdvertExitPaht: function(a, o) {
        var c = getApp();
        return r({
            url: t.service.recordLongAdvertOutPathAPI.replace("{advertId}", a),
            method: "POST",
            data: e({
                Openid: c.globalData.userInfo.OpenId,
                CityId: c.globalData.cityInfo && c.globalData.cityInfo.CityId || "",
                UserSystem: 0,
                SourcePort: "MiniProgram"
            }, o)
        });
    }
};

module.exports = e({}, a);