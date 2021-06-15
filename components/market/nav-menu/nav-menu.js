var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
};

Component({
    properties: {
        navMenuList: {
            type: Array,
            value: []
        },
        showBtmLine: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    lifetimes: {},
    methods: {
        toggleNavMenu: function(t) {
            var n = t.currentTarget.dataset || null;
            if (n) {
                var r = null;
                this.properties.navMenuList.forEach(function(t, a) {
                    t.id === n.id && (r = e({}, t));
                }), r && !r.isActived && this.triggerEvent("toggleNavMenu", {
                    eventType: "toggleNavMenu",
                    navMenuInfo: r
                }, {});
            }
        }
    }
});