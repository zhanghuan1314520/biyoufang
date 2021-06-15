Component({
    properties: {
        buildiingItemInfo: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: {}
        }
    },
    externalClasses: [ "custom-status-class" ],
    data: {},
    lifetimes: {
        attached: function() {}
    },
    methods: {
        goDetailPage: function(e) {
            var t = e.currentTarget.dataset || null, i = this.properties.buildiingItemInfo;
            this.triggerEvent("operatebuildiingItemInfo", {
                eventType: t && t.type || "goDetailPage",
                buildiingItemInfo: i
            }, {});
        },
        getUserInfo: function(e) {
            var t = e.currentTarget.dataset || null;
            if (t && t.type) {
                var i = this.properties.buildiingItemInfo;
                this.triggerEvent("operatebuildiingItemInfo", {
                    eventType: t.type,
                    eventDetail: e,
                    buildiingItemInfo: i
                }, {});
            }
        },
        noop: function() {}
    }
});