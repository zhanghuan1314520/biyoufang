var e = require("../../utils/index.js"), a = getApp();

Component({
    properties: {
        navBarTitle: {
            type: String,
            value: ""
        },
        isTransparent: {
            type: Boolean,
            value: !1
        },
        type: {
            type: String,
            value: "normal"
        },
        bgColor: {
            type: String,
            value: ""
        },
        role: {
            type: String,
            value: "",
            observer: function(e) {
                var t = a.globalData.deviceWidth / 750;
                this.setData({
                    bgH: t * ("customer" === this.data.role ? 288 : 278) + a.globalData.navH - 45,
                    centerH: t * ("customer" === e ? 178 : 388),
                    centerT: "customer" === e ? a.globalData.navH : a.globalData.navH + 65 * t
                });
            }
        },
        needLocation: {
            type: Boolean,
            value: !0
        },
        needNewspaper: {
            type: Boolean,
            value: !0
        },
        showShare: {
            type: Boolean,
            value: !0
        },
        multiShare: {
            type: Boolean,
            value: !1
        },
        needBackBtn: {
            type: Boolean,
            value: !0
        },
        member: {
            type: Object,
            value: null,
            observer: "formatMember"
        },
        brokerRuleLink: {
            type: String,
            value: ""
        },
        backHomeFlag: {
            type: Boolean,
            value: !1
        },
        showBackHome: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        navH: a.globalData.navH,
        bgH: 0,
        centerH: 0,
        _member: null,
        navLight: !1,
        ifAlbum: !1
    },
    lifetimes: {
        attached: function() {
            if ("center" === this.data.type) {
                var e = a.globalData.deviceWidth / 750;
                this.setData({
                    bgH: e * ("customer" === this.data.role ? 314 : 348) + a.globalData.navH - 45,
                    centerH: e * ("customer" === this.data.role ? 238 : 388)
                });
            }
            var t = getCurrentPages()[0].route.indexOf("my");
            this.setData({
                navLight: t
            }), getCurrentPages().length > 2 && this.setData({
                showBackHome: !0
            });
        }
    },
    pageLifetimes: {
        show: function() {
            var e = getCurrentPages();
            if (e.length && !this.data.showBackHome) {
                var a = e[e.length - 1];
                if ("pages/detail/detail" === a.route) {
                    var t = a.options;
                    t && t.isShare && parseFloat(t.isShare) && this.setData({
                        showBackHome: !0
                    });
                }
            }
        }
    },
    methods: {
        formatMember: function(a, t) {
            if (!a) return null;
            a.PhoneNumber = e.formatPhoneNumber(a.PhoneNumber), a.AvatarUrl = e.formatUrl(a.AvatarUrl), 
            a.QrcodeUrl = e.formatUrl(a.QrcodeUrl), a.rankDescType = e.formatRankDescType(a), 
            a.rank = e.sectionToChinese(a.IntegralRanking), this.setData({
                _member: a
            });
        },
        share: function() {
            this.triggerEvent("showMultiShare");
        },
        backPreventPage: function(e) {
            var a = getCurrentPages();
            1 === a.length ? (wx.switchTab({
                url: "/pages/index/index"
            }), this.triggerEvent("navigator", {
                page: "pages/index/index"
            })) : this.triggerEvent("navigator", {
                page: a[a.length - 2].route
            });
        },
        onNavigator: function() {
            this.triggerEvent("navigator", {
                page: "pages/index/index"
            });
        }
    }
});