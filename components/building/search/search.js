getApp();

Component({
    properties: {},
    methods: {
        operate: function(t) {
            var e = t.currentTarget.dataset.t;
            this.triggerEvent("selectOperate", e);
        }
    }
});