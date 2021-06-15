var i = require("../../../../utils/index.js"), t = require("../../../images/pullLong/moreButtonBase64.js");

Component({
    properties: {
        visibility: {
            type: Boolean,
            value: !1,
            observer: function(i) {
                this.transferAnimatin(i);
            }
        },
        buildInfo: {
            type: Object,
            value: {}
        },
        enterPageTime: {
            type: Number,
            value: null
        }
    },
    data: {
        _visibility: !1,
        slideInOrOut: null,
        icons: t
    },
    created: function() {
        this.animation = wx.createAnimation({
            timingFunction: "ease",
            duration: 400
        });
    },
    methods: {
        handleTap: function(t) {
            var e = this, n = t.currentTarget.dataset.type, a = this.properties.buildInfo, s = a.BuildingId, o = a.BuildingName, r = a.Latitude, u = a.Longitude, l = a.BuildingAddress, d = (a.Title, 
            a.Id), c = "";
            switch (n) {
              case "consultant":
                i.recordLongpageClick({
                    advertId: d,
                    SourceType: 4
                }), c = "/pck_advert/consultantList/index?buildingId=" + s + "&title=" + (o || "");
                break;

              case "navigation":
                this.visibilitySuccess(function() {
                    wx.openLocation({
                        latitude: 1 * r,
                        longitude: 1 * u,
                        name: o,
                        address: l,
                        scale: 12
                    }), i.recordLongAdvertExitPaht(d, {
                        BrowseTime: Math.round((Date.now() - e.properties.enterPageTime) / 1e3),
                        JumpPath: 2
                    });
                });
                break;

              case "building":
                i.recordLongpageClick({
                    advertId: d,
                    SourceType: 7
                }), i.recordLongAdvertExitPaht(d, {
                    BrowseTime: Math.round((Date.now() - this.properties.enterPageTime) / 1e3),
                    JumpPath: 1
                }), c = "/pages/detail/detail?buildingId=" + s + "&isShare=1";
            }
            c && this.visibilitySuccess(function() {
                i.navigatePage({
                    url: c
                });
            });
        },
        visibilitySuccess: function(i) {
            this.toggleVisibility(), i && setTimeout(function() {
                i();
            }, 400);
        },
        transferAnimatin: function(i) {
            var t = this;
            i ? this.setData({
                _visibility: i,
                slideInOrOut: null
            }, function() {
                t.slideAnimation();
            }) : this.slideAnimation(function() {
                setTimeout(function() {
                    t.setData({
                        _visibility: i,
                        slideInOrOut: null
                    });
                }, 300);
            });
        },
        slideAnimation: function(i) {
            var t = this;
            i ? (this.animation.bottom("-480rpx").step(), i()) : this.animation.bottom(0).step(), 
            setTimeout(function() {
                t.setData({
                    slideInOrOut: t.animation.export()
                });
            }, 100);
        },
        toggleVisibility: function() {
            this.triggerEvent("toggleStatus");
        },
        noTouch: function() {}
    }
});