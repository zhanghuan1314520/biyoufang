Component({
    properties: {
        uploadTypeList: {
            type: Array,
            value: [ {
                id: 1,
                type: "camera",
                name: "拍照"
            }, {
                id: 2,
                type: "upload",
                name: "从手机相册选择"
            } ]
        },
        showUploadTypeDialog: {
            type: Boolean,
            value: !1
        },
        showMask: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        hiddenModal: !0,
        slideInOrOut: null,
        fadeInOrOut: null
    },
    observers: {
        showUploadTypeDialog: function(e) {
            var t = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            }), o = wx.createAnimation({
                duration: 3e3,
                timingFunction: "ease"
            });
            e ? (t.bottom(0).step(), o.opacity(.83).step()) : (t.bottom(-310).step(), o.opacity(0).step()), 
            this.setData({
                fadeInOrOut: o.export(),
                slideInOrOut: t.export()
            });
        }
    },
    lifetimes: {
        created: function() {},
        attached: function() {},
        detached: function() {
            this.setData({
                slideInOrOut: null
            });
        }
    },
    methods: {
        chooseUploadType: function(e) {
            var t = e.currentTarget.dataset || null, o = this.properties.uploadTypeList || [];
            if (t && t.id) {
                var a = o.filter(function(e) {
                    return e.id === t.id;
                })[0] || null;
                a && this.triggerEvent("chooseUploadImageType", {
                    eventType: a.type,
                    uploadTypeInfo: a
                }, {});
            }
        },
        closeDialog: function() {
            this.triggerEvent("closeDialog", {}, {});
        }
    }
});