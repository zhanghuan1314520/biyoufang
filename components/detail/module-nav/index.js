var e = require("../../../resource/base64/detail-nav.js");

Component({
    properties: {
        moduleNavList: {
            type: Array,
            value: [],
            observer: function(e) {
                this.setScrollToView(e);
            }
        }
    },
    data: {
        iconMap: e,
        scrollIntoView: ""
    },
    lifetimes: {
        attached: function() {}
    },
    methods: {
        setScrollToView: function(e) {
            if (e) {
                var t = e.filter(function(e) {
                    return e.isActived;
                })[0].selector.replace("#", "");
                this.setData({
                    scrollIntoView: t
                });
            }
        },
        handleNavClick: function(e) {
            var t = e.currentTarget.dataset, r = t.selector, i = t.index;
            this.triggerEvent("operateModuleNav", {
                selector: r,
                index: i
            });
        }
    }
});