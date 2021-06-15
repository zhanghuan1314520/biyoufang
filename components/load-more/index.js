Component({
    properties: {
        noMore: {
            type: String,
            value: "我也是有底线的~"
        },
        loadFlag: {
            type: Boolean,
            value: !0
        },
        noMoreFlag: {
            type: Boolean,
            value: !1
        },
        loadImage: {
            type: "String",
            value: "data:image/png;base64,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"
        },
        loadText: {
            type: "String",
            value: ""
        },
        screenShow: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        windowHeight: wx.getSystemInfoSync().windowHeight,
        loadFail: !1
    },
    ready: function() {},
    methods: {
        observerComArea: function() {
            var e = this;
            wx.createIntersectionObserver(this).relativeToViewport().observe("#loadMore", function(i) {
                var g = i.boundingClientRect.top / e.data.windowHeight;
                e.properties._screenShow || e.setData({
                    screenShow: g > .9
                });
            });
        },
        reload: function() {
            this.reset(), this.triggerEvent("reload");
        },
        reset: function() {
            this.setData({
                loadFail: !1
            });
        }
    }
});