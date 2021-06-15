var e = getApp(), t = require("../../utils/index.js");

module.exports = Behavior({
    properties: {
        buildInfo: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: {}
        },
        needPhoneAuthorize: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        authorizedUserInfo: function(t) {
            var r = this;
            e.authorizeUserInfo(t, function() {
                r.triggerEvent("toggleStatus", {
                    type: "authorizeUserInfo"
                });
            });
        },
        authorizePhoneNumber: function(r) {
            var o = this, u = r.currentTarget.dataset.source, n = "";
            "reserveForm" === u && (n = this.data.name), e.authorizePhoneNumber(r, {
                success: function(e) {
                    var r = e, a = o.properties.buildInfo.Id;
                    a && r && t.recordLongpageClick({
                        advertId: a,
                        SourceType: 8,
                        PhoneNumber: e
                    }), o.triggerEvent("toggleStatus", {
                        type: "authorizePhoneNumber",
                        status: !0,
                        source: u,
                        phoneNumber: e,
                        name: n
                    });
                },
                fail: function() {
                    o.triggerEvent("toggleStatus", {
                        type: "authorizePhoneNumber",
                        status: !1,
                        source: u,
                        phoneNumber: e.globalData.userInfo.PhoneNumber,
                        name: n
                    });
                }
            });
        }
    }
});