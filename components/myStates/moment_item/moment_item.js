require("../../../utils/index.js");

Component({
    options: {
        styleIsolation: "apply-shared"
    },
    properties: {
        moments: {
            type: Object,
            value: {}
        },
        comptype: {
            type: String,
            value: "0"
        },
        borderFlag: {
            type: Boolean,
            value: !0
        },
        userInfo: {
            type: Object,
            value: null
        }
    },
    data: {
        showDialog: !1
    },
    methods: {
        previewImage: function(e) {
            var t = e.target.dataset.i || 0;
            wx.previewImage({
                current: this.data.moments.covers[t],
                urls: this.data.moments.covers
            });
        },
        momOperate: function(e) {
            var t = e.detail.recordParams || e.target.dataset, a = t.o;
            t.id;
            a || (a = e.currentTarget.dataset.o, e.currentTarget.dataset.id);
            var r = {
                eventType: a,
                momentInfo: this.data.moments
            };
            a && this.triggerEvent("userOperate", r);
        },
        clickAvatar: function() {
            this.triggerEvent("userOperate", {
                eventType: "lookAvatar",
                momentInfo: this.data.moments
            });
        },
        dialogOperate: function(e) {
            "sure" === e.detail && this.triggerEvent("userOperate", {
                eventType: "del",
                momentInfo: this.data.moments
            }), this.setData({
                "moments.showDialog": !1
            });
        },
        toFeedback: function() {
            this.triggerEvent("userOperate", {
                eventType: "chat",
                momentInfo: this.data.moments
            });
        },
        noop: function() {}
    }
});