var e = getApp(), r = require("../../../utils/index").throttle;

Component({
    properties: {
        authUserInfo: {
            type: Boolean,
            value: !1
        },
        authPhoneNumber: {
            type: Boolean,
            value: !1
        },
        userInfo: {
            type: Object,
            value: null
        },
        recordParams: {
            type: null,
            value: null
        }
    },
    externalClasses: [ "root-class" ],
    data: {
        canIUseGetUserProfile: !1
    },
    lifetimes: {
        created: function() {
            this.getUserProfile = r.call(this, this.getUserProfile, 1500), this.getUserInfo = r.call(this, this.getUserInfo, 1500), 
            this.getPhoneNumber = r.call(this, this.getPhoneNumber, 1500);
        },
        attached: function() {
            wx.canIUse("getUserProfile") && this.setData({
                canIUseGetUserProfile: !0
            });
        }
    },
    methods: {
        formatRecordParams: function() {
            var e = this.data.recordParams;
            return e instanceof Array ? e[0] : e instanceof String ? JSON.parse(e) : e;
        },
        getUserProfile: function() {
            var r = this;
            wx.getUserProfile({
                desc: "用于完善会员资料",
                success: function(t) {
                    e.authorizeUserInfo(t, function(e) {
                        r.triggerEvent("getUserInfoSuccess", {
                            eventType: "getUserInfoSuccess",
                            userInfo: e,
                            recordParams: r.formatRecordParams()
                        });
                    });
                }
            });
        },
        getUserInfo: function(r) {
            var t = this;
            e.authorizeUserInfo(r, function(e) {
                t.triggerEvent("getUserInfoSuccess", {
                    eventType: "getUserInfoSuccess",
                    userInfo: e,
                    recordParams: t.formatRecordParams()
                });
            });
        },
        getPhoneNumber: function(r) {
            var t = this;
            e.authorizePhoneNumber(r, {
                success: function(r) {
                    t.triggerEvent("authPhoneNumber", {
                        eventType: "authPhoneNumber",
                        phoneNumber: r,
                        userInfo: e.globalData.userInfo,
                        recordParams: t.formatRecordParams()
                    });
                }
            });
        },
        proxySuccess: function() {
            this.triggerEvent("proxySuccess", {
                eventType: "proxySuccess",
                userInfo: e.globalData.userInfo,
                recordParams: this.formatRecordParams()
            });
        }
    }
});