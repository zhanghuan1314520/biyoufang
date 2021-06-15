Component({
    properties: {
        visibility: {
            type: Boolean,
            value: !1
        },
        userInfo: {
            type: Object,
            value: null
        }
    },
    data: {},
    methods: {
        noTouch: function() {},
        authorizeSuccess: function() {
            this.triggerEvent("authorize");
        }
    }
});