var e = require("../../utils/index.js"), t = require("../../config.js"), r = getApp();

Component({
    properties: {
        isReady: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                e && this.getAllAdvert();
            }
        },
        status: {
            type: String,
            value: null
        },
        _bannerList: {
            type: Array,
            value: null,
            observer: function(e) {
                e && this.setData({
                    bannerList: e
                });
            }
        },
        browserPoint: {
            type: Boolean,
            value: !1
        }
    },
    externalClasses: [ "swiper-class", "image-class" ],
    data: {
        bannerOptions: {
            interval: 3e3,
            indicatorColor: "rgba(255,255,255,0.42)",
            indicatorActiveColor: "#FE5E10",
            circular: !0,
            indicatorDots: !1
        },
        bannerList: [],
        currentSwiper: 0
    },
    pageLifetimes: {
        hide: function() {
            if (!this.properties.browserPoint) {
                var t = [];
                this.data.bannerList.forEach(function(e) {
                    1 === e.eventTrackStatus && (t.push(e.Id), e.eventTrackStatus = 2);
                }), t.length && e.recordAdvertScan({
                    AdvertIds: t
                });
            }
        }
    },
    methods: {
        swiperChange: function(e) {
            var t = e.detail.current, r = this.data.bannerList;
            2 !== r[t].eventTrackStatus && (r[t].eventTrackStatus = 1), this.setData({
                currentSwiper: t
            });
        },
        getBannerSourceType: function() {
            var e = getCurrentPages();
            switch (e[e.length - 1].route) {
              case "pages/index/index":
                return 3;

              case "pages/building/building":
                return 2;

              default:
                return null;
            }
        },
        goBannerBuildingPage: function(t) {
            var a = t.currentTarget.dataset, n = a.id, i = a.targeturl, s = "navigateTo", l = "";
            if (i) {
                if (e.recordAdvertClick({
                    advertId: n
                }), i.includes("pageType=tabBar")) {
                    if (s = "switchTab", i.indexOf("navType")) {
                        var u = i.split("&navType=")[1];
                        u && (wx._routeParams = {
                            marketStatus: u
                        });
                    }
                    l = i.split("?")[0];
                } else i.includes("pages/market/market") ? (r.globalData.marketTab = 0, l = "/pages/market/market", 
                s = "switchTab") : l = i.includes("pages/detail/detail") ? i + "&sourceType=" + this.getBannerSourceType() : i;
                l && e.navigatePage({
                    url: l,
                    goType: s
                });
            }
        },
        handleBannerList: function(t) {
            return t ? t.map(function(t, r) {
                return t.eventTrackStatus = 0 === r ? 1 : 0, t.ImageUrl = e.formatOSSLink(t.ImageUrl, "image/format,webp"), 
                t.LinkUrl = e.formatFloatLinkUrl(t), t.LinkType = e.formatFloatLinkType(t), t.ShotUrl && (t.buildingId = t.ShotUrl.split("|")[1] || ""), 
                t;
            }) : [];
        },
        getAllAdvert: function() {
            var r = this;
            return e.request({
                url: t.service.getBannerListInAd.replace("{positionKey}", this.properties.status)
            }).then(function(e) {
                e.length && r.setData({
                    bannerList: r.handleBannerList(e)
                });
            });
        }
    }
});