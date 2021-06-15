var e = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var i = arguments[r];
        for (var t in i) Object.prototype.hasOwnProperty.call(i, t) && (e[t] = i[t]);
    }
    return e;
}, r = require("../../../../utils/index.js");

getApp();

Component({
    properties: {
        building: {
            type: Object,
            value: {}
        },
        sourceKey: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        goDetailPage: function(i) {
            var t = this.properties.building, d = t.Id, o = void 0 === d ? "" : d, a = t.BuildingId, n = t.ProjectId;
            o && r.recordAdvertClick({
                advertId: o
            }), r.recordBuildingClick(e({
                buildingId: a,
                SourceKey: this.properties.sourceKey
            }, n ? {
                ProjectId: n
            } : {}));
            var u = "/pages/detail/detail?buildingId=" + a + "&sourceType=5";
            r.navigatePage({
                url: u
            });
        }
    }
});