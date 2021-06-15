function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
};

Component({
    properties: {
        userInfo: {
            type: Object,
            value: null
        }
    },
    data: {
        formData: {
            registerNo: "",
            registerName: "",
            wxPhone: "",
            usingPhoneType: 2,
            otherPhone: ""
        }
    },
    lifetimes: {
        attached: function() {
            var e = this.properties.userInfo;
            e && e.PhoneNumber && this.setData({
                "formData.wxPhone": e.PhoneNumber
            });
        }
    },
    pageLifetimes: {},
    methods: {
        getInputValue: function(t) {
            var r = t.currentTarget.dataset || null;
            if (r && r.type) {
                var a = t.detail.value, n = "formData." + r.type;
                this.setData(e({}, n, a));
            }
        },
        validateInput: function(e) {
            var t = "", r = this.data.formData, a = r.wxPhone, n = r.otherPhone, o = r.usingPhoneType, i = (r.registerName, 
            r.registerNo, /^[1][3,4,5,7,8][0-9]{9}$/);
            if (e) {
                var s = e.currentTarget.dataset || null;
                if (s && s.type) {
                    var u = e.detail.value || "";
                    (u = u.trim()) ? "wxPhone" !== s.type && "otherPhone" !== s.type || i.test(u) || (t = "请输入正确的手机号码") : "wxPhone" !== s.type && "otherPhone" !== s.type || (t = "请输入接受手机号");
                }
            } else a.trim() || n.trim() ? (1 === o && !i.test(n.trim()) || 2 === o && !i.test(a.trim())) && (t = "请输入正确的手机号码") : t = "请输入接收手机号";
            return t && wx.showToast({
                title: t,
                icon: "none"
            }), t;
        },
        toggleBindPhoneType: function() {
            var e = 3 - this.properties.formData.usingPhoneType;
            e && this.setData({
                "formData.usingPhoneType": e
            });
        },
        resetFormData: function() {
            this.setData({});
        },
        operateBtn: function(e) {
            var r = e.currentTarget.dataset || null;
            if (r && r.type) {
                var a = r.type;
                "confirm" === a && (this.validateInput() || this.triggerEvent("operate", {
                    eventType: a,
                    lotteryRegisterDialog: t({}, this.data.formData)
                }, {})), "cancel" === a && this.triggerEvent("operate", {
                    eventType: a,
                    lotteryRegisterDialog: null
                }, {});
            }
        }
    }
});