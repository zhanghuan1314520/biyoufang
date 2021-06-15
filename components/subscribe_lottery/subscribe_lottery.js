var e = require("../../config.js"), t = require("../../utils/index.js"), o = getApp();

Component({
    properties: {
        userInfo: {
            type: Object,
            value: null
        },
        curProject: {
            type: Object,
            value: null
        }
    },
    data: {
        useOtherPhone: !1,
        phone: ""
    },
    attached: function() {
        this.setData({
            userInfo: this.properties.userInfo,
            phone: this.properties.userInfo.PhoneNumber
        });
    },
    methods: {
        closeMask: function() {
            this.triggerEvent("closeLotteryMask");
        },
        getPhoneNumber: function(e) {
            var t = this;
            o.authorizePhoneNumber(e, {
                success: function() {
                    t.setData({
                        userInfo: o.globalData.userInfo,
                        phone: o.globalData.userInfo.PhoneNumber
                    });
                }
            });
        },
        useOtherPhoneToRecive: function() {
            this.setData({
                useOtherPhone: !0,
                phone: ""
            });
        },
        otherPhoneInputing: function(e) {
            this.setData({
                phone: t.trim(e.detail.value)
            });
        },
        confirmSubscription: function(o) {
            var s = this, n = {
                ProjectId: this.data.curProject.ProjectId
            }, r = o.detail.value;
            if (this.data.phone) if (t.isPhone(this.data.phone)) {
                if (r.registerNo) return n.RegistrationNo = r.registerNo, n.PhoneNumber = this.data.phone, 
                t.request({
                    url: e.service.subscribeLottery,
                    method: "POST",
                    data: n,
                    toastCallBack: function(e, o) {
                        if ("0003" == o) {
                            var s = "本次推盘无" + r.registerNo + "登记编号，请核实后再订阅";
                            t.wxToast(s, 3e3);
                        } else wx.showModal({
                            title: "错误",
                            content: e,
                            showCancel: !1,
                            success: function() {},
                            fail: function() {}
                        });
                    }
                }).then(function(e) {
                    wx.showToast({
                        title: "订阅成功"
                    }), s.triggerEvent("subscribeLotterySuccess", {
                        subscriptionId: e.SubscriptionId
                    });
                });
                t.wxToast("请输入登记编号");
            } else t.wxToast("请输入正确的手机号"); else t.wxToast("请输入接收手机号");
        }
    }
});