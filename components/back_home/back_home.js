Component({
    properties: {
        ifAbsolute: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        backHome: function() {
            wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});