var i = require("../../../utils/index.js");

Component({
    properties: {
        buildingInfo: {
            type: Object,
            value: {}
        }
    },
    data: {},
    lifetimes: {
        attached: function() {}
    },
    methods: {
        navPage: function(t) {
            var e = this.properties.buildingInfo, a = e.DistrictId, s = e.DistrictName, n = "更多" === s ? "/pages/building/building" : "/pages/list/list?status=7&districtId=" + a + "&districtName=" + s, r = "更多" === s ? "switchTab" : "navigateTo";
            i.navigatePage({
                url: n,
                goType: r
            });
        }
    }
});