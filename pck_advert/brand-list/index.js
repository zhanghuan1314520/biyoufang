function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../config.js"), a = require("../../utils/index.js"), n = getApp();

Page({
    data: {
        brand: null,
        buildingList: [],
        brandId: "",
        topHeight: 0,
        nullImg: n.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/null.png",
        introducState: !1,
        introduHeight: 0,
        remainderHeight: 0,
        rpxScale: 1,
        introduLineNum: 3,
        pageData: {
            pageNo: 1,
            canLoadMore: !1,
            limit: 20
        },
        isScene: !1
    },
    initBrandInfo: function() {
        var t = this;
        this.getBrandDetail().then(function() {
            t.getBuildingList();
        });
    },
    getBrandDetail: function() {
        var t = this, n = this.data.rpxScale, i = this.data.isScene ? e.service.getBrandDetailBySceneCodeAPI : e.service.brandBuild;
        return a.request({
            url: i.replace("{extSourceId}", this.data.brandId)
        }).then(function(e) {
            var i = e.Brand, r = e.Buildings;
            i.ImageUrl = a.formatOSSLink(i.ImageUrl, "image/format,jpg/interlace,1/resize,w_750"), 
            t.setData({
                brand: i,
                buildingList: t.formBuildingList(r)
            }, function() {
                t.getElementSize("#introduc, #introducWrap", function(e) {
                    var a = void 0, i = void 0;
                    (e = e[0]).forEach(function(t) {
                        switch (t.id) {
                          case "introducWrap":
                            i = t.height;
                            break;

                          case "introduc":
                            a = t.height;
                        }
                    }), t.setData({
                        introduHeight: a,
                        remainderHeight: a - i > 0 ? a - i : 0,
                        introduLineNum: Math.ceil(a / (50 / n))
                    }, function() {
                        t.getElementSize(".preview-view", function(e) {
                            t.setData({
                                topHeight: e[0][0].height
                            });
                        });
                    });
                }), t.browseToBrand();
            });
        });
    },
    getBuildingList: function() {
        var t = this, n = this.data.pageData, i = n.pageNo, r = n.limit;
        return a.request({
            url: e.service.buildingsBrandAPI.replace("{brandId}", this.data.brand.BrandId),
            data: {
                pageNo: i
            },
            headerParam: {
                cityId: this.data.brand.CityId
            }
        }).then(function(e) {
            var a = t.data.buildingList || [];
            t.setData({
                buildingList: a.concat(t.formBuildingList(e)),
                "pageData.canLoadMore": e.length === r
            });
        });
    },
    formBuildingList: function(t) {
        var e = this;
        return t.map(function(t, n) {
            return t.idx = n, t.SubwayDistance = 600, t.buildingInfo = a.formatBuildingInfo(t, e.data.cityInfo), 
            t.eventTrackStatus = 0, t;
        });
    },
    followBrand: function(n) {
        var i = this, r = this.data.brand, o = r.Id, d = r.IsFollow;
        return a.request({
            url: e.service.followBrand.replace("{brandAdvertId}", o),
            method: d ? "delete" : "post",
            loading: !0
        }).then(function(e) {
            d || a.wxToast("已关注，可在“我的关注”中查看"), i.setData(t({}, "brand.IsFollow", !d));
        });
    },
    getUserInfo: function(t) {
        var e = this;
        n.authorizeUserInfo(t, function() {
            e.setData({
                userInfo: n.globalData.userInfo
            }, function() {
                e.followBrand(t);
            });
        });
    },
    getElementSize: function(t, e) {
        var a = wx.createSelectorQuery();
        a.selectAll(t).boundingClientRect(), a.selectViewport(), a.exec(function(t) {
            e(t);
        });
    },
    expansionIntroduc: function() {
        this.setData({
            introducState: !this.data.introducState
        });
    },
    observerViewPort: function(t) {
        var e = t.selector, a = t.callback, n = t.options, i = void 0 === n ? {
            observeAll: !0
        } : n, r = t.margins, o = void 0 === r ? {} : r;
        wx.createIntersectionObserver(this, i).relativeToViewport(o).observe(e, function(t) {
            a(t);
        });
    },
    browseToBrand: function() {
        var t = this;
        this.observerViewPort({
            selector: ".advertCard",
            callback: function(e) {
                var a = e.dataset.index, n = t.data.buildingList[a];
                0 === n.eventTrackStatus && (n.eventTrackStatus = 1);
            }
        });
    },
    onHide: function() {
        var t = [];
        this.data.buildingList.forEach(function(e) {
            e.Id && 1 === e.eventTrackStatus && (t.push(e.Id), e.eventTrackStatus = 2);
        }), t.length && a.recordAdvertScan({
            AdvertIds: t
        });
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    rpxScale: 750 / t.windowWidth
                });
            }
        }), t.scene ? (this.data.isScene = !0, this.data.brandId = t.scene) : "1" === t.isScene ? (this.data.brandId = t.brandId, 
        this.data.isScene = !0) : this.data.brandId = t.brandId, n.checkSession(function() {
            e.setData({
                userInfo: n.globalData.userInfo
            }, function() {
                e.initBrandInfo();
            });
        }, a.getShareParams(t));
    },
    onReachBottom: function() {
        var t = this.data.pageData, e = t.pageNo;
        t.canLoadMore && (this.data.pageData.pageNo = ++e, this.getBuildingList());
    },
    onShareAppMessage: function() {
        return a.extractShareFn();
    }
});