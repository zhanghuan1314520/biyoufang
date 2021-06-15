var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
    return e;
};

require("../../../utils/index"), require("../../../config"), getApp();

Component({
    properties: {
        lineShow: {
            type: Boolean,
            value: !0
        },
        sourceBuildings: {
            type: Array,
            value: null,
            observer: function(e) {
                var t = this;
                e && this.setData({
                    buildings: e
                }, function() {
                    t.handleBuildingTap();
                });
            }
        }
    },
    data: {
        activeIndex: 0,
        allBuildings: [],
        buildings: []
    },
    methods: {
        handleBuildingTap: function(t) {
            var i = this.data.buildings, n = t ? t.currentTarget.dataset.index : 0;
            this.setData({
                activeIndex: n
            }), this.triggerEvent("change", e({}, i[n]));
        }
    }
});