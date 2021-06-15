Component({
    properties: {
        btnGroupList: {
            type: Array,
            value: []
        }
    },
    data: {},
    lifetimes: {
        attached: function() {}
    },
    methods: {
        operateBtn: function(t) {
            var e = t.currentTarget.dataset || null;
            if (e && e.type) {
                var r = this.properties.btnGroupList.filter(function(t) {
                    return t.type === e.type;
                })[0] || null;
                r && r.isActived && this.triggerEvent("operateBtnGroupList", {
                    eventType: "operateBtn",
                    btnInfo: r
                }, {});
            }
        }
    }
});