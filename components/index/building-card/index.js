var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
    }
    return e;
}, t = require("../../../utils/index.js"), i = getApp();

Component({
    properties: {
        buildingList: {
            type: Array,
            value: [],
            observer: function(e) {
                var t = this;
                e.length && this.setData({
                    _buildingList: e
                }, function() {
                    t.openListeningHotBuildingList(".building-card-item");
                });
            }
        }
    },
    data: {
        _buildingList: []
    },
    methods: {
        getFollowFormid: function(e) {
            t.getFollowFormid(e.detail.formId);
        },
        goDetailPage: function(i) {
            var r = i.currentTarget.dataset || null;
            if (r && r.id) {
                t.recordAdvertClick({
                    advertId: r.advertId
                }), t.recordBuildingClick(e({
                    buildingId: r.id,
                    SourceKey: "Advert"
                }, r.projectId ? {
                    ProjectId: r.projectId
                } : {}));
                var n = "", a = "";
                getCurrentPages().length >= 5 ? (n = "/pages/detail/detail?buildingId=" + r.id, 
                a = "redirectTo") : (n = "/pages/detail/detail?buildingId=" + r.id + "&sourceType=5", 
                a = "navigateTo"), t.navigatePage({
                    url: n,
                    goType: a
                });
            }
        },
        openListeningHotBuildingList: function(e) {
            var t = this, r = i.globalData.userInfo;
            r && r.OpenId && wx.createIntersectionObserver(this, {
                observeAll: !0,
                thresholds: [ 1 ]
            }).relativeToViewport().observe(e, function(e) {
                var i = e.dataset || {}, r = t.data._buildingList.filter(function(e) {
                    return e.BuildingId == i.id;
                })[0] || null;
                r && 2 !== r.eventTrackStatus && (r.eventTrackStatus = 1);
            });
        }
    }
});