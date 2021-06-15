Component({
    properties: {},
    data: {
        show: !0
    },
    methods: {
        handleSubscribe: function() {
            this.closeModal(), this.triggerEvent("subscribe");
        },
        closeModal: function() {
            this.setData({
                show: !1
            });
        },
        noHandle: function() {}
    }
});