function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var t = require("../../../../utils/index.js"), r = require("../../../../config.js"), n = getApp();

Component({
    properties: {
        brandInfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        userInfo: {}
    },
    attached: function() {
        this.setData({
            userInfo: n.globalData.userInfo
        });
    },
    methods: {
        goBrandDetail: function(e) {
            var r = e.currentTarget.dataset, n = r.brandId, a = r.advertId;
            a && t.recordAdvertClick({
                advertId: a
            }), t.navigatePage({
                url: "/pck_advert/brand-list/index?brandId=" + n
            });
        },
        followBrand: function(n) {
            var a = this, o = this.properties.brandInfo, d = o.Id, i = o.IsFollow;
            return t.request({
                url: r.service.followBrand.replace("{brandAdvertId}", d),
                method: i ? "delete" : "post",
                loading: !0
            }).then(function(r) {
                i || t.wxToast("已关注，可在“我的关注”中查看"), a.setData(e({}, "brandInfo.IsFollow", !i));
            });
        },
        getUserInfo: function(e) {
            var t = this;
            n.authorizeUserInfo(e, function() {
                t.setData({
                    userInfo: n.globalData.userInfo
                }, function() {
                    t.followBrand(e);
                });
            });
        }
    }
});