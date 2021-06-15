Component({
    properties: {
        title: {
            type: String,
            value: "提示"
        },
        content: {
            type: String,
            value: "删除动态扣20积分，请确认是否删除"
        },
        type: {
            type: String,
            value: "2"
        }
    },
    methods: {
        touchmove: function() {},
        userOperate: function(t) {
            var e = t.currentTarget.dataset.o;
            this.triggerEvent("dialogOperate", e);
        }
    }
});