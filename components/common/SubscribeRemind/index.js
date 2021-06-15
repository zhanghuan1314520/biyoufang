var e = getApp(), t = require("../../../utils/index"), i = require("../../../config");

Component({
    properties: {
        userInfo: {
            type: Object,
            value: null,
            observer: "modifyType"
        },
        dialogShow: {
            type: Boolean,
            value: !1
        },
        buildingId: {
            type: String,
            value: ""
        }
    },
    data: {
        useingDefaultPhone: !1,
        phone: ""
    },
    methods: {
        toggleSubscribePhoneType: function(e) {
            switch (e.currentTarget.dataset.type) {
              case "default":
                this.setData({
                    useingDefaultPhone: !0
                });
                break;

              case "other":
                this.setData({
                    useingDefaultPhone: !1
                });
            }
        },
        getPhoneNumber: function(t) {
            var i = this;
            e.authorizePhoneNumber(t, {
                success: function() {
                    i.setData({
                        useingDefaultPhone: !0
                    });
                }
            });
        },
        modifyType: function(e) {
            e && e.PhoneNumber && this.setData({
                useingDefaultPhone: !0
            });
        },
        operateSubscribeDialog: function(e) {
            switch (e.currentTarget.dataset.type) {
              case "cancel":
                this.triggerEvent("cancel");
                break;

              case "confirm":
                this.handleSubmit();
            }
        },
        handleSubmit: function() {
            var e = this.data.useingDefaultPhone ? this.properties.userInfo.PhoneNumber : this.data.phone;
            e ? t.isPhone(e) ? this.buildingSubscription(e) : t.wxToast("手机号码不合法") : t.wxToast("请输入手机号码");
        },
        buildingSubscription: function(e) {
            var n = this, u = this.properties.buildingId;
            u && t.request({
                url: i.service.buildingSubscriptionApi.replace("{buildingId}", u),
                method: "POST",
                data: {
                    PhoneNumber: e
                },
                loading: !0
            }).then(function(e) {
                n.triggerEvent("success", {
                    id: e
                });
            });
        },
        noHandle: function() {}
    }
});