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
}, r = (require("../../../utils/index.js"), getApp());

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
            e && e.PhoneNumber ? this.setData({
                "formData.wxPhone": e.PhoneNumber
            }) : this.setData({
                "formData.usingPhoneType": 1
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
            var t = "", r = this.data.formData, a = r.wxPhone, n = r.otherPhone, o = r.usingPhoneType, i = r.registerName, s = r.registerNo, u = /^[1][3,4,5,7,8][0-9]{9}$/, h = /^[a-zA-Z0-9]*$/;
            if (e) {
                var p = e.currentTarget.dataset || null;
                if (p && p.type) {
                    var l = e.detail.value || "";
                    (l = l.trim()) ? ("wxPhone" !== p.type && "otherPhone" !== p.type || u.test(l) || (t = "请输入正确的手机号码"), 
                    "registerNo" === p.type && (!h.test(l) || l.length > 15) && (t = "请输入正确的登记编号")) : ("wxPhone" !== p.type && "otherPhone" !== p.type || (t = "请输入接受手机号"), 
                    "registerName" === p.type && (t = "请输入登记人姓名"), "registerNo" === p.type && (t = "请输入登记编号"));
                }
            } else a.trim() || n.trim() ? (1 === o && !u.test(n.trim()) || 2 === o && !u.test(a.trim())) && (t = "请输入正确的手机号码") : t = "请输入接受手机号", 
            i.trim() || (t = "请输入登记人姓名"), s.trim() ? (!h.test(s.trim()) || s.length > 15) && (t = "请输入正确的登记编号") : t = "请输入登记编号";
            return t && wx.showToast({
                title: t,
                icon: "none"
            }), t;
        },
        toggleBindPhoneType: function() {
            var e = 3 - this.properties.formData.usingPhoneType, t = this.data.userInfo;
            e && (t && t.PhoneNumber && this.setData({
                "formData.wxPhone": t.PhoneNumber
            }), (2 !== e || this.data.userInfo.PhoneNumber) && this.setData({
                "formData.usingPhoneType": e
            }));
        },
        getPhoneNumber: function(e) {
            var t = this;
            r.authorizePhoneNumber(e, {
                success: function() {
                    t.setData({
                        userInfo: r.globalData.userInfo
                    }, function() {
                        t.triggerEvent("operate", {
                            eventType: "phoneAuth",
                            lotteryRegisterDialog: e
                        }), wx.nextTick(function() {
                            t.toggleBindPhoneType();
                        });
                    });
                }
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