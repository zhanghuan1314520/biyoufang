Component({
    properties: {
        lotteryStatusInfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        isFold: !0
    },
    lifetimes: {
        attached: function() {}
    },
    methods: {
        toggleFold: function() {
            this.setData({
                isFold: !1
            });
        },
        operateLotteryStatus: function() {
            var t = this.properties.lotteryStatusInfo, e = "";
            1 === t.lotteryStatus && (e = "lookRegisterInfo"), 2 === t.lotteryStatus && (e = "lookRank"), 
            3 === t.lotteryStatus && (e = "lookDetail"), e && this.triggerEvent("operateLotteryStatus", {
                eventType: e,
                lotteryStatusInfo: t
            }, {});
        }
    }
});