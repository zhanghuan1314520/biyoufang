var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
};

Component({
    properties: {
        top: {
            type: Number,
            value: 0
        },
        tabsList: {
            type: Array,
            value: []
        }
    },
    data: {
        activeIndex: 0
    },
    methods: {
        handleSelect: function(e) {
            var r = e.currentTarget.dataset.index;
            this.setData({
                activeIndex: r
            }), this.triggerEvent("change", t({}, this.properties.tabsList[r]));
        }
    }
});