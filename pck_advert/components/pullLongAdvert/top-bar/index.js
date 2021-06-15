require("../../../../config.js");

var t = require("../../../../utils/index.js"), a = getApp();

Component({
    properties: {
        animationStatus: {
            type: Boolean,
            value: !0,
            observer: function(t) {
                this.transferAnimatin(t);
            }
        },
        buildInfo: {
            type: Object,
            value: {}
        },
        userInfo: {
            type: Object,
            value: {},
            observer: function(a) {
                a.AvatarUrl = t.formatUrl(a.AvatarUrl), this.setData({
                    userInfo: a
                });
            }
        }
    },
    data: {
        slideInOrOut: null,
        animationOptions: {
            timingFunction: "ease",
            duration: 300
        },
        bannerOptions: {
            interval: 2e3,
            circular: !0
        },
        avatarList: [],
        navH: 0
    },
    created: function() {
        this.animationTop = wx.createAnimation(this.data.animationOptions);
    },
    attached: function() {
        this.setData({
            navH: a.globalData.navH
        });
    },
    methods: {
        goFollowPage: function(a) {
            var i = this.properties.buildInfo, n = "/pck_advert/follow-list/index";
            n += "?advertId=" + i.Id + "&followNumber=" + i.FollowNumber + "&fllowImg=" + i.FollowImageUrl + "&isTheFirstAvatar=" + i.IsTheFirstAvatar, 
            t.navigatePage({
                url: n
            });
        },
        transferAnimatin: function(t) {
            var a = t ? this.data.navH : "-86rpx";
            this.animationTop.top(a).step(), this.setData({
                slideInOrOut: this.animationTop.export()
            });
        }
    }
});