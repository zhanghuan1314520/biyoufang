Component({
    properties: {
        imgIcon: {
            type: String,
            value: "/resource/null.png"
        },
        tipsText: {
            type: String,
            value: "没有数据"
        },
        isReveal: {
            type: Boolean,
            value: !1
        },
        slotFooter: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    externalClasses: [ "custom-icon-class", "custom-text-class", "root-class" ],
    methods: {}
});