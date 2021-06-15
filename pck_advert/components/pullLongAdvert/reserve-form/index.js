function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

require("../../../../config.js");

var t = require("../../../../utils/index.js"), r = getApp(), s = require("../../../minxins/authorize-mixin.js"), a = require("../../../../utils/index").throttle;

Component({
    behaviors: [ s ],
    externalClasses: [ "root-class" ],
    properties: {
        btnText: {
            type: Object,
            value: {
                MakeAnAppointment: "",
                ReservedFirstCopywriting: "",
                ReservedSecondCopywriting: ""
            }
        }
    },
    data: {
        name: "",
        phoneNumber: "",
        nameFocus: !1,
        phoneFocus: !1
    },
    lifetimes: {
        created: function() {
            this.submitForm = a.call(this, this.submitForm, 1500);
        },
        attached: function() {
            this.setData({
                userInfo: r.globalData.userInfo
            });
        }
    },
    methods: {
        submitForm: function(e) {
            var r = this.data, s = r.phoneNumber, a = r.name, n = void 0 === a ? "" : a, i = e.currentTarget.dataset.source, o = this.properties.userInfo.PhoneNumber;
            if (n = n.trim(), s || o || this.properties.needPhoneAuthorize) if (n) {
                if (o) this.triggerEvent("toggleStatus", {
                    type: "authorizePhoneNumber",
                    status: !0,
                    source: i,
                    phoneNumber: o,
                    name: n
                }); else if (s) {
                    var u = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    s.search(u) > -1 ? this.triggerEvent("toggleStatus", {
                        type: "authorizePhoneNumber",
                        status: !0,
                        source: i,
                        phoneNumber: s,
                        name: n
                    }) : t.wxToast("手机号输入格式不正确");
                }
            } else t.wxToast("请输入姓名"); else t.wxToast("请输入手机号");
        },
        handleFocus: function(t) {
            var r = "";
            switch (t.currentTarget.dataset.type) {
              case "name":
                r = "nameFocus";
                break;

              case "phone":
                r = "phoneFocus";
            }
            this.setData(e({}, r, !0));
        },
        handerBlur: function(t) {
            var r = "";
            switch (t.currentTarget.dataset.type) {
              case "name":
                r = "nameFocus";
                break;

              case "phone":
                r = "phoneFocus";
            }
            this.setData(e({}, r, !1));
        },
        noHandle: function() {}
    }
});