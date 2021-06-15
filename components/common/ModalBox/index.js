Component({
    properties: {
        visibility: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.transferAnimatin(t);
            }
        }
    },
    externalClasses: [ "modal-root" ],
    data: {
        _visibility: !1,
        slideInOrOut: null
    },
    created: function() {},
    methods: {
        handleTouchMove: function() {
            this.triggerEvent("touchmove");
        }
    }
});