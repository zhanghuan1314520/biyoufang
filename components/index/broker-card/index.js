var e = require("../../../utils/index.js");

require("../../../config.js"), require("../../../utils/plugins/michat.js"), getApp();

Component({
    properties: {
        brokerCardInfo: {
            type: Object,
            value: {}
        },
        chatSourceType: {
            type: Number,
            value: 0
        },
        userInfo: {
            type: Object,
            value: null
        }
    },
    methods: {
        noop: function() {},
        goChatPage: function() {
            var r = this.data.userInfo, o = this.properties.brokerCardInfo;
            r && r.UnionId === o.UnionId ? e.wxToast("不能给自己发消息") : this.triggerEvent("operateBrokerCardInfo", {
                eventType: "goChatPage",
                brokerCardInfo: o
            }, {});
        },
        goBrokerPage: function() {
            var e = this.properties.brokerCardInfo;
            this.triggerEvent("operateBrokerCardInfo", {
                eventType: "goBrokerPage",
                brokerCardInfo: e
            }, {});
        }
    }
});