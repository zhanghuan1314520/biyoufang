Component({
    properties: {
        answerCardInfo: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: {}
        }
    },
    data: {},
    lifetimes: {
        attached: function() {}
    },
    methods: {
        previewImage: function(e) {
            var r = e.currentTarget.dataset || null;
            if (r) {
                var t = this.properties.answerCardInfo.covers, n = -1;
                if (t.forEach(function(e, t) {
                    e.id == r.id && -1 === n && (n = t);
                }), -1 !== n) {
                    var a = t.map(function(e) {
                        return e.imgSrc;
                    }), o = t[n].imgSrc;
                    wx.previewImage({
                        urls: a,
                        current: o,
                        fail: function(e) {
                            console.log("图片预览时失败: ", e);
                        }
                    });
                }
            }
        },
        operateAnswerCardInfo: function(e) {
            var r = e.currentTarget.dataset;
            r && this.triggerEvent("operateAnswerCardInfo", {
                eventType: r.type,
                answerCardInfo: this.properties.answerCardInfo
            });
        },
        operateAnswerCardInfoAuth: function(e) {
            var r = e.currentTarget.dataset;
            this.triggerEvent("operateAnswerCardInfo", {
                eventType: r.type,
                answerCardInfo: this.properties.answerCardInfo,
                authInfo: e
            });
        }
    }
});