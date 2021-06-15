Component({
    properties: {
        info: {
            type: Object,
            value: {}
        },
        maxLength: {
            type: Number,
            value: 90
        }
    },
    data: {
        splitFlag: !0,
        unfoldFlag: !1
    },
    methods: {
        handleUnfold: function() {
            this.setData({
                splitFlag: !this.data.splitFlag,
                unfoldFlag: !this.data.unfoldFlag
            });
        },
        handleUnfoldBtn: function() {
            var t = this;
            this.setData({
                unfoldFlag: !this.data.unfoldFlag
            }), setTimeout(function() {
                t.setData({
                    splitFlag: !t.data.splitFlag
                });
            }, 300);
        },
        previewImages: function(t) {
            var a = t.currentTarget.dataset.index, e = this.data.info.Images;
            wx.previewImage({
                urls: e,
                current: e[a]
            });
        }
    }
});