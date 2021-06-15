require("../../../config.js");

var e = require("../../../utils/index.js"), r = getApp();

Component({
    properties: {
        brokerItemInfo: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: null
        },
        quoteType: {
            type: Number,
            value: 1
        },
        chatSourceType: {
            type: Number,
            value: 0
        }
    },
    data: {
        bgImageSrc: "",
        btnList: []
    },
    lifetimes: {
        attached: function() {
            var e = r.globalData.imgsPathInfo.rootPath + "/images_wx/broker/gwcard_bj@3x.png";
            this.setData({
                bgImageSrc: e
            });
        }
    },
    methods: {
        toCarteDetail: function() {
            var e = this.properties.brokerItemInfo.ConsultantId || this.properties.brokerItemInfo.Id;
            wx.navigateTo({
                url: "/pages/broker_card/broker_card?brokerId=" + e
            });
        },
        previewImage: function() {
            var e = this.properties.brokerItemInfo.PersonalImageUrl;
            if (e) {
                var r = [ e ];
                wx.previewImage({
                    urls: r,
                    current: e,
                    fail: function(e) {
                        console.log("预览图片时失败: ", e);
                    }
                });
            }
        },
        operateBrokerItem: function(e) {
            var r = null;
            try {
                var t = e.detail.recordParams || {};
                r = (e.currentTarget.dataset || {}).type || t.type;
            } catch (e) {}
            if (r) {
                var a = this.properties.brokerItemInfo;
                this.triggerEvent("operateBrokerItemInfo", {
                    eventType: r,
                    brokerItemInfo: a
                }, {});
            }
        },
        operateBtn: function(e) {
            var r = e.detail.recordParams, t = this.properties.brokerItemInfo, a = t.btnList[r.id] || null;
            a && this.triggerEvent("operateBrokerItemInfo", {
                eventType: a.type,
                brokerItemInfo: t
            }, {});
        },
        noop: function() {},
        showBuildingDetail: function(r) {
            var t = r.currentTarget.dataset.buildingId;
            e.navigatePage({
                url: "/pages/detail/detail?buildingId=" + t
            });
        }
    }
});