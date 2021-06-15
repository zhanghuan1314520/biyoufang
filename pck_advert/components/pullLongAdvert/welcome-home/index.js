var e = require("../../../minxins/authorize-mixin.js"), t = require("../../../../utils/index").throttle;

Component({
    behaviors: [ e ],
    properties: {
        visibility: {
            type: Boolean,
            value: !0
        },
        btnText: {
            type: String,
            value: "欢迎回家"
        }
    },
    data: {
        defaultPaperWork: "在这座城市，为自己找一个心仪的家。"
    },
    lifetimes: {
        created: function() {
            this.authorizePhoneNumber = t.call(this, this.authorizePhoneNumber, 2e3);
        }
    },
    methods: {
        noTouch: function() {},
        closeModel: function() {
            var e = this.properties, t = e.needPhoneAuthorize;
            !e.userInfo.PhoneNumber && t || this.triggerEvent("toggleStatus", {
                type: "closeModel",
                property: "welcomeShow"
            });
        }
    }
});