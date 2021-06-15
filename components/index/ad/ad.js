require("../../../config.js"), require("../../../utils/index.js"), getApp();

Component({
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        ad: {
            type: Object,
            value: null
        }
    },
    data: {},
    methods: {
        checkAd: function() {
            var e = this.properties.ad;
            e && this.triggerEvent("checkAd", {
                eventType: "goPage",
                ad: e
            }, {});
        },
        closeAd: function() {
            this.triggerEvent("closead");
        }
    }
});