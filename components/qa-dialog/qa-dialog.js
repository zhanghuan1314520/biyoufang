Component({
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        count: {
            type: String,
            value: "0"
        }
    },
    data: {},
    methods: {
        jump: function() {
            wx._routeParams = {
                marketStatus: "qa",
                status: "0"
            }, wx.switchTab({
                url: "/pages/market/market"
            }), this.triggerEvent("close");
        },
        close: function() {
            this.triggerEvent("close");
        }
    }
});