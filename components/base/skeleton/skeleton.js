Component({
    properties: {
        avatar: {
            type: Boolean,
            value: !1
        },
        avatarSize: {
            type: String,
            value: "60rpx"
        },
        avatarShape: {
            type: String,
            value: "round"
        },
        row: {
            type: Array,
            value: []
        },
        active: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    lifetimes: {
        attached: function() {}
    }
});