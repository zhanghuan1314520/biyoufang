Component({
    properties: {
        list: {
            type: Array,
            value: []
        },
        projectSource: {
            type: Number,
            value: -1
        },
        needSite: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        cancelSubscribe: function(e) {
            this.triggerEvent("cancelsubscribe", e.detail, {
                bubbles: !0
            });
        }
    }
});