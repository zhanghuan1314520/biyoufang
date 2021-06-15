var e = Object.assign || function(e) {
    for (var i = 1; i < arguments.length; i++) {
        var t = arguments[i];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, i = require("../../../utils/index.js"), t = require("../../../utils/mixins/projectProgressBarList.js"), n = getApp();

Component({
    behaviors: [ t ],
    properties: {
        building: {
            type: Object,
            value: {},
            observer: function(e) {
                e && e.VersionType && this.setData({
                    versionType: e.VersionType
                });
            }
        },
        activeBuilding: {
            type: Object,
            value: {},
            observer: function(e) {
                var i = this;
                e && 0 !== e.ProjectStatus && wx.nextTick(function() {
                    e.progressBarList = i.formatProgressBarList(e), i.initBtnGroupList(e), i.setData({
                        _activeBuilding: e
                    });
                });
            }
        }
    },
    data: {
        _activeBuilding: {},
        imgsPathInfo: "",
        versionType: null
    },
    attached: function() {
        this.setData({
            imgsPathInfo: n.globalData.imgsPathInfo
        });
    },
    methods: {
        formatTimeDuration: function(e) {
            var t = new Date(e.RegisterStartTime.replace(/[\.\-]/g, "/")), n = new Date(e.RegisterEndTime.replace(/[\.\-]/g, "/"));
            return "(" + i.fixPrefixion(t.getMonth() + 1) + "." + i.fixPrefixion(t.getDate()) + "~" + i.fixPrefixion(n.getMonth() + 1) + "." + i.fixPrefixion(n.getDate()) + ")";
        },
        initBtnGroupList: function(e) {
            var t = getCurrentPages(), n = t[t.length - 1].data.project.VersionType, r = [ {
                id: 0,
                type: "plan",
                name: "公示方案",
                isActived: e.HadSalesPlan,
                includesType: "0"
            }, {
                id: 0,
                type: "plan",
                name: "销售方案",
                isActived: e.HadSalesPlan,
                includesType: "12"
            }, {
                id: 1,
                type: "price",
                name: "一房一价",
                isActived: e.BuildingForSale,
                includesType: "012"
            }, {
                id: 2,
                type: "register",
                name: "意向登记",
                isActived: function() {
                    var t = e.FillRegisterEndTime || e.RegisterEndTime;
                    return t ? (t = new Date(i.compatibleIOSDate(t)).getTime(), e.RegisterAddress && e.ProjectStatus < 4 && t > Date.now()) : e.RegisterAddress && e.ProjectStatus < 4;
                }(),
                includesType: "0"
            } ];
            e.btnGroupList = r.filter(function(e) {
                return e.includesType.includes(n);
            });
        },
        toggleProjectTab: function(i) {
            var t = e({}, i.currentTarget.dataset);
            this.triggerEvent("toggleBuildTab", t, {});
        },
        operateBtnGroupList: function(e) {
            var t = this, n = e.detail, r = this.data._activeBuilding || null, a = this.properties.building, o = n.btnInfo;
            if (r || "operateBtn" !== n.eventType) {
                var s = {
                    plan: function() {
                        if (r.HadSalesPlan) {
                            i.recordUserDetailScanInfo({
                                eventKey: "Salesplan",
                                buildingId: a.BuildingId,
                                ProjectId: r.ProjectId
                            });
                            var e = "/h5_webview/webview/webview", n = t.data.imgsPathInfo.rootPath + "/#/pages/salesplan/salesplan?projectId=" + r.ProjectId;
                            e += "?url=" + encodeURIComponent(n) + "&status=1&buildingName=" + a.BuildingName + "&buildingNo=" + r.BuildingNo, 
                            i.navigatePage({
                                url: e
                            });
                        }
                    },
                    price: function() {
                        if (r.BuildingForSale) {
                            i.recordByAld("【一房一价】点击量", {
                                "楼盘ID": r.ProjectId
                            });
                            var e = "/pck_building/detail_pricePerRoom/detail_pricePerRoom";
                            e += "?projectId=" + r.ProjectId + "&buildingName=" + a.BuildingName, i.navigatePage({
                                url: e
                            });
                        }
                    },
                    register: function() {
                        i.recordUserDetailScanInfo({
                            eventKey: "Registration",
                            buildingId: a.BuildingId,
                            ProjectId: r.ProjectId
                        });
                        var e = t.formatTimeDuration(r), n = "/h5_webview/register_webview/register_webview";
                        n += "?url=" + encodeURIComponent(r.RegisterAddress), n += "&buildingName=" + t.data.building.BuildingName + "&durationTime=" + e, 
                        i.navigatePage({
                            url: n
                        });
                    }
                };
                s[o.type] && s[o.type]();
            }
        }
    }
});