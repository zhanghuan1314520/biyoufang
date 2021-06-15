var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }
    return t;
};

Component({
    properties: {
        buildings: {
            type: Object,
            value: null,
            observer: function(t) {
                t && 0 === this.data.activeIndex && (this.data.selectBuilding = t[0]);
            }
        }
    },
    data: {
        activeIndex: 0,
        selectBuilding: null
    },
    methods: {
        handleBuildingTap: function(e) {
            var i = e.currentTarget.dataset.index;
            this.data.selectBuilding = this.properties.buildings[i], this.setData({
                activeIndex: i
            }), this.triggerEvent("select", t({
                eventType: "selectBuilding"
            }, this.data.selectBuilding));
        }
    }
});