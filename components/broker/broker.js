function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

require("../../config.js");

var t = require("../../utils/index.js"), i = getApp();

Component({
    properties: {
        info: {
            type: Object,
            value: null
        },
        index: {
            type: Number,
            value: 0
        },
        isShare: {
            type: Boolean,
            value: !1
        },
        isBrokerList: {
            type: Boolean,
            value: !1
        },
        WeixinAuthorized: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        itsMe: !1
    },
    attached: function() {
        this.setData({
            itsMe: i.globalData.userInfo.UnionId === this.properties.info.UnionId
        });
    },
    methods: {
        checkProjectDetail: function() {
            var e = getCurrentPages();
            this.data.isBrokerList || "pck_broker/broker_mine/broker_mine" === e[e.length - 1].route || wx.navigateTo({
                url: "/pages/detail/detail?buildingId=" + this.data.info.ProjectInfo.BuildingId
            });
        },
        checkDetail: function() {
            if (!this.data.info.IsUnbound) {
                var e = getCurrentPages();
                "pages/broker/broker" !== e[e.length - 1].route && wx.navigateTo({
                    url: "/pages/broker_card/broker_card?brokerId=" + this.data.info.Id
                });
            }
        },
        checkWorkPermit: function() {
            this.data.info.IsUnbound || wx.previewImage({
                current: this.data.info.WorkPermitUrl,
                urls: [ this.data.info.WorkPermitUrl ]
            });
        },
        callBroker: function() {
            this.data.info.IsUnbound || t.callPhone(this.data.info.PhoneNumber);
        },
        copyWechat: function() {
            this.data.info.IsUnbound || t.promisify(wx.setClipboardData)({
                data: this.data.info.WechatNumber
            }).then(function() {
                wx.showToast({
                    title: "微信号已复制"
                });
            });
        },
        saveToAddressBook: function() {
            if (!this.data.info.IsUnbound) {
                var e = this.data.info;
                wx.addPhoneContact({
                    firstName: e.Name,
                    mobilePhoneNumber: e.PhoneNumber,
                    weChatNumber: e.WechatNumber,
                    remark: e.BuildingName + "置业顾问"
                });
            }
        },
        checkNewProject: function(e) {
            var t = e.currentTarget.dataset;
            wx.navigateTo({
                url: "/pages/detail/detail?scene=" + t.code
            });
        },
        getUserInfo: function(e) {
            var i = e.currentTarget.dataset, a = this.properties.info;
            switch (e.type = i.type, i.type) {
              case "chat":
                if (this.data.itsMe) return void t.wxToast("不能给自己发消息");
                e.unionId = a.UnionId, this.triggerEvent("getPageUserInfo", e);
                break;

              case "follow":
                e.index = this.properties.index, this.triggerEvent("getPageUserInfo", e);
            }
        },
        goChat: function(e) {
            !this.data.info.IsUnbound && this.properties.WeixinAuthorized && (this.data.itsMe ? t.wxToast("不能给自己发消息") : wx.navigateTo({
                url: "/pck_chat/chat/chat?unionId=" + this.data.info.UnionId
            }));
        },
        previewImage: function() {
            wx.previewImage({
                current: this.data.info.PersonalImageUrl,
                urls: [ this.data.info.PersonalImageUrl ]
            });
        },
        toggleFocus: function() {
            var i = this;
            if (!this.data.info.IsUnbound && this.properties.WeixinAuthorized) {
                var a = this.properties.info;
                t.toggleFollowBroker(a).then(function() {
                    a.IsFollow || wx.showToast({
                        title: "关注成功"
                    }), i.setData(e({}, "info.IsFollow", !a.IsFollow));
                });
            }
        }
    }
});