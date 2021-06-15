var t = require("../../config.js"), e = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        brandList: [],
        userInfo: {},
        form: {
            brandName: ""
        },
        opacity: 1
    },
    getBrandList: function() {
        var a = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
        return e.request({
            url: t.service.brandsList,
            data: r,
            loading: !0
        }).then(function(t) {
            t = t.map(function(t) {
                return t.ImageUrl = e.formatOSSLink(t.ImageUrl, "image/format,jpg/interlace,1/resize,w_690"), 
                t.eventTrackStatus = 0, t;
            }), n && n(), a.setData({
                brandList: t
            }, function() {
                a.browseToBrand();
            });
        }).catch(function() {
            n && n();
        });
    },
    inputName: function(t) {
        this.data.form.brandName = t.detail.value;
    },
    searchBrand: function() {
        var t = this.data.form.brandName;
        t.trim() && this.getBrandList({
            brandName: t
        });
    },
    observerViewPort: function(t) {
        var e = t.selector, a = t.callback, r = t.options, n = void 0 === r ? {
            observeAll: !0
        } : r, i = t.margins, s = void 0 === i ? {} : i;
        wx.createIntersectionObserver(this, n).relativeToViewport(s).observe(e, function(t) {
            a(t);
        });
    },
    browseToBrand: function() {
        var t = this;
        this.observerViewPort({
            selector: ".brandCard",
            callback: function(e) {
                var a = e.dataset.index, r = t.data.brandList[a];
                0 === r.eventTrackStatus && (r.eventTrackStatus = 1);
            }
        });
    },
    onHide: function() {
        var t = [];
        this.data.brandList.forEach(function(e) {
            e.Id && 1 === e.eventTrackStatus && (t.push(e.Id), e.eventTrackStatus = 2);
        }), t.length && e.recordAdvertScan({
            AdvertIds: t
        });
    },
    onLoad: function(t) {
        var r = this;
        a.checkSession(function() {
            r.setData({
                userInfo: a.globalData.userInfo
            }), r.getBrandList();
        }, e.getShareParams(t));
    },
    onShareAppMessage: function() {
        return e.extractShareFn();
    },
    onPullDownRefresh: function() {
        this.getBrandList({}, wx.stopPullDownRefresh);
    }
});