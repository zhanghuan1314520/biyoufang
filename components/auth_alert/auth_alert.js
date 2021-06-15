Component({
    properties: {
        visible: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        cancelAuth: function() {
            this.triggerEvent("cancel");
        }
    }
});