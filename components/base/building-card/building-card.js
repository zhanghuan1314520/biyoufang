Component({
    properties: {
        buildingCardInfo: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        goDetailPage: function(e) {
            var t = e.currentTarget.dataset || null, a = this.properties.buildingCardInfo;
            this.triggerEvent("operateBuildingCardInfo", {
                eventType: t && t.type || "goDetailPage",
                buildingCardInfo: a
            }, {});
        }
    }
});