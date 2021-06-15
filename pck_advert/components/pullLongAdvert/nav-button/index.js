require("../../../../config.js");

var e = require("../../../../utils/index.js"), t = require("../../../minxins/authorize-mixin.js"), i = require("../../../images/pullLong/navButtonBase64.js");

Component({
    behaviors: [ t ],
    properties: {
        animationStatus: {
            type: Boolean,
            value: !0,
            observer: function(e) {
                this.transferAnimatin(e);
            }
        },
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
        icons: i,
        slideInOrOut: null,
        animationOptions: {
            timingFunction: "ease",
            duration: 300
        },
        subscribeRemind: !1
    },
    created: function() {
        this.animationNav = wx.createAnimation(this.data.animationOptions);
    },
    methods: {
        handleTap: function(t) {
            var i = t.currentTarget.dataset.type, n = this.properties.buildInfo, a = n.BuildingId, s = n.Title, r = n.SalesHotline, o = n.IsFollow, u = n.Id;
            switch (i) {
              case "phone":
                e.recordLongpageClick({
                    advertId: u,
                    SourceType: 2
                }), this.makePhone(r);
                break;

              case "focus":
                this.subscription(o, a);
                break;

              case "more":
                this.triggerEvent("toggleStatus", {
                    type: "more"
                });
                break;

              case "consultant":
                e.recordLongpageClick({
                    advertId: u,
                    SourceType: 4
                });
                var c = "/pck_advert/consultantList/index?buildingId=" + a + "&title=" + s;
                this.navigaionPage(c);
                break;

              case "sales":
                e.recordLongpageClick({
                    advertId: u,
                    SourceType: 3
                }), this.makePhone(r);
            }
        },
        makePhone: function(t) {
            t ? e.callPhone(t) : e.wxToast("暂无拨号热线");
        },
        submitForm: function(e) {
            var t = this.properties.userInfo.PhoneNumber;
            !t && this.properties.needPhoneAuthorize || this.triggerEvent("toggleStatus", {
                type: "authorizePhoneNumber",
                status: !0,
                source: e.currentTarget.dataset.source,
                phoneNumber: t,
                name: ""
            });
        },
        subscription: function(t, i) {
            t ? e.wxToast("请前往楼盘详情页取消订阅") : this.setData({
                subscribeRemind: !0
            });
        },
        handelSubscribeRemind: function(t) {
            switch (t.type) {
              case "cancel":
                this.setData({
                    subscribeRemind: !1
                });
                break;

              case "success":
                this.setData({
                    subscribeRemind: !1
                }), e.recordLongpageClick({
                    advertId: this.properties.buildInfo.Id,
                    SourceType: 6
                }), e.wxToast("订阅成功，将及时为您推送相关快讯"), this.triggerEvent("toggleStatus", {
                    type: "focus"
                });
            }
        },
        navigaionPage: function(t) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "navigateTo";
            t && e.navigatePage({
                url: t,
                goType: i
            });
        },
        transferAnimatin: function(e) {
            var t = e ? 0 : "-130rpx";
            this.animationNav.bottom(t).step(), this.setData({
                slideInOrOut: this.animationNav.export()
            });
        }
    }
});