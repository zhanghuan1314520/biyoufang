function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var t = require("../../utils/index.js"), r = getApp();

Component({
    properties: {
        project: {
            type: Object,
            value: {}
        },
        projectSource: {
            type: Number,
            value: -1
        },
        projectIndex: {
            type: Number,
            value: 0
        },
        projectLength: {
            type: Number,
            value: 0
        },
        fromBroker: {
            type: Number,
            value: 0
        }
    },
    data: {
        observer: null,
        projectList: []
    },
    lifetimes: {
        attached: function() {
            var e = this.properties.projectSource, r = e > -1;
            this.setData({
                sourceText: t.formatAldSource(e),
                ifAldRecord: r
            });
            var o = getCurrentPages(), i = null;
            o && o.length && (i = o[o.length - 1]), i && ("pages/index/index" === i.route && this.setData({
                projectList: i.data.recentViewList || []
            }), "pages/building/building" === i.route && this.setData({
                projectList: i.data.projectList || []
            }), "pages/list/list" === i.route && this.setData({
                projectList: i.data.list || []
            }));
        },
        detached: function() {
            this.data._observer && this._observer.disconnect();
        }
    },
    ready: function() {},
    methods: {
        openListeningBuilding: function() {
            var t = this, o = r.globalData.userInfo, i = this.data.projectList;
            if (o && o.OpenId && i.length) {
                var a;
                this._observer = wx.createIntersectionObserver(this), this._observer.relativeToViewport((a = {
                    top: 0,
                    left: 0
                }, e(a, "top", 0), e(a, "bottom", 0), a)).observe("#item_comp_record", function(r) {
                    var o = t.data.project || {};
                    if (o && 0 == o.eventTrackStatus) {
                        var a = -1;
                        if (i.forEach(function(e, t) {
                            e.BuildingId === o.BuildingId && (a = t);
                        }), -1 !== a) {
                            var s = "projectList[" + a + "].eventTrackStatus";
                            t.setData(e({}, s, 1));
                        }
                    }
                });
            }
        },
        addProjectClickRecord: function() {
            var e = r.globalData.userInfo;
            if (e && e.OpenId && id) {
                var o = !(!this.properties.project || !this.properties.project.IsRecommend) && this.properties.project.IsRecommend, i = {
                    type: 1,
                    buildingId: id,
                    sourceType: 0,
                    sourcePort: 0,
                    openId: e.OpenId,
                    isRecommend: o,
                    userSystem: 0
                };
                t.addProjectRecord(i);
            }
        },
        checkProject: function(e) {
            var r = getCurrentPages(), o = e.currentTarget.dataset, i = o.id, a = o.showasproject, s = o.pid, c = "/pages/detail/detail?buildingId=" + i + "&fromBroker=" + this.properties.fromBroker + "&showAsProject=" + a + "&projectId=" + s;
            if (this.properties.project.IsRecommend && (c += "&isRecommend=1"), "pages/broker/broker" === r[r.length - 1].route) {
                var n = r[r.length - 1].data;
                n && n.brokerCode && (c += "&brokerCode=" + n.brokerCode);
            }
            if (r.length >= 5 ? wx.redirectTo({
                url: c
            }) : wx.navigateTo({
                url: c
            }), "pages/search/search" === r[r.length - 1].route) {
                var d = require("../../config.js");
                t.request({
                    url: d.service.recordHotSearch,
                    method: "POST",
                    data: {
                        BuildingId: this.properties.project.BuildingId
                    }
                });
            }
            this.data.ifAldRecord && t.recordByAld("单个楼盘点击量", {
                "楼盘ID": i,
                "触发页面": this.data.sourceText
            });
        },
        cancelSubscribe: function(e) {
            this.triggerEvent("cancelsubscribe", e.currentTarget.dataset, {
                bubbles: !0
            });
        },
        getFollowFormid: function(e) {
            t.getFollowFormid(e.detail.formId);
        }
    }
});