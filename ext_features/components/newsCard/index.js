var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
};

Component({
    properties: {
        newsInfo: {
            type: Object,
            value: []
        }
    },
    data: {},
    methods: {
        handlePreview: function(e) {
            var t = e.currentTarget.dataset.url;
            wx.previewImage({
                urls: this.properties.newsInfo.Images,
                current: t
            });
        },
        handleBtnClick: function(t) {
            var r = t.currentTarget.dataset.type;
            this.triggerEvent(r, e({}, this.properties.newsInfo));
        },
        showRemark: function(e) {
            var t = e.currentTarget.dataset.remark;
            wx.showModal({
                title: "驳回原因",
                content: t,
                showCancel: !1
            });
        }
    }
});