Component({
    properties: {
        answerInfo: {
            type: Object,
            value: {}
        },
        typeIndex: {
            type: Number,
            value: 0
        }
    },
    data: {
        showPop: !1
    },
    lifetimes: {
        attached: function() {}
    },
    methods: {
        showPops: function() {
            this.data.showPop ? this.setData({
                showPop: !1
            }) : this.setData({
                showPop: !0
            });
        },
        operateAnswerItem: function(e) {
            var t = e.currentTarget.dataset;
            t && t.type && this.triggerEvent("operateAnswerItem", {
                eventType: t.type,
                answerItemInfo: this.properties.answerInfo
            });
        },
        previewImage: function(e) {
            var t = e.currentTarget.dataset || null;
            if (t) {
                var r = this.properties.answerInfo.covers, n = -1;
                if (r.forEach(function(e, r) {
                    e.id == t.id && -1 === n && (n = r);
                }), -1 !== n) {
                    var s = r.map(function(e) {
                        return e.imgSrc;
                    }), a = r[n].imgSrc;
                    wx.previewImage({
                        urls: s,
                        current: a,
                        fail: function(e) {
                            console.log("图片预览时失败: ", e);
                        }
                    });
                }
            }
        },
        deleteAnswerItem: function(e) {
            if (1 == e.currentTarget.dataset.status) {
                this.properties.typeIndex;
                this.triggerEvent("operateAnswerItem", {
                    eventType: "delete",
                    answerItemInfo: this.properties.answerInfo
                });
            }
            this.setData({
                showPop: !1
            });
        }
    }
});