function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../config.js"), a = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        isShare: 0,
        navH: i.globalData.navH,
        photos: [],
        buildingId: null,
        imgs: [],
        imageRoot: i.globalData.imgsPathInfo.rootPath,
        scrollIntoView: "",
        scrollIntoViewTab: "",
        pageState: 0,
        isReact: !1,
        scrollIntoViewTabTimerId: null,
        showControls: !1
    },
    onLoad: function(t) {
        var e = this;
        i.checkSession(function() {
            if (e.setData({
                buildingId: t.buildingId,
                buildingName: t.buildingName,
                isShare: t.isShare || 0,
                deviceHeight: i.globalData.deviceHeight
            }), e.getPhotoAlbum(), t.brokerCode) {
                var o = getCurrentPages();
                a.recordShareVisit(t.brokerCode, o[o.length - 1].route + a.serializationUrlParams(t));
            }
        }, a.getShareParams(t));
    },
    onShareAppMessage: function() {
        return a.extractShareFn({
            util: a,
            app: i
        });
    },
    getPhotoAlbum: function() {
        var t = this;
        a.request({
            url: e.service.getPhotoAlbumInBld.replace("{buildingId}", this.data.buildingId)
        }).then(function(e) {
            e && e.length && t.setData({
                imgs: t.formatPhotoList(e)
            }, function() {
                setTimeout(function() {
                    t.getElemetInfo();
                }, 500);
            }), t.setData({
                pageState: 1
            });
        }).catch(function(t) {});
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset, a = e.index, i = e.url;
        wx.previewImage({
            current: i,
            urls: this.data.imgs[a].PhotoUrlList
        });
    },
    formatPhotoList: function(t) {
        var e = this, i = (t = t.filter(function(t) {
            return t.PhotoUrlList && t.PhotoUrlList.length > 0 || t.Videos && t.Videos.length > 0;
        })).map(function(i, o) {
            return i.isActived = 0 === o, i.PhotoTypeName = e.formatPhotoTypeName(i.PhotoType), 
            i.photoType = e.formatPhoneType(i.PhotoType), i.id = i.photoType + "-" + o, i.PhotoIcon = e.formatPhoneType(i.PhotoType), 
            i.prevImgListLength = e.getPrevImgListLength(t, o), i.PhotoUrlList = i.PhotoUrlList && i.PhotoUrlList.map(function(t) {
                return a.formatUrl(t);
            }), i.Videos instanceof Array && (i.Videos = i.Videos.map(function(t) {
                return {
                    PhotoUrl: a.formatUrl(t.PhotoUrl),
                    VideoUrl: a.formatUrl(t.VideoUrl)
                };
            })), i;
        }), o = this.getPhotoList(t);
        return this.setData({
            photos: o
        }), i;
    },
    getPrevImgListLength: function(t, e) {
        var a = 0;
        return t.forEach(function(t, i) {
            t.PhotoUrlList && t.PhotoUrlList.length && i < e && (a += t.PhotoUrlList.length), 
            t.Videos && t.Videos.length && i < e && (a += t.Videos.length);
        }), a;
    },
    formatPhotoTypeName: function(t) {
        var e = "";
        switch (1 * t) {
          case -1:
            e = "视频";
            break;

          case 0:
            e = "鸟瞰图";
            break;

          case 1:
            e = "户型图";
            break;

          case 2:
            e = "样板间";
            break;

          case 3:
            e = "配套图";
            break;

          case 4:
            e = "效果图";
            break;

          case 5:
            e = "实景图";
            break;

          case 6:
            e = "广告图";
            break;

          case 7:
            e = "不利因素";
            break;

          case 8:
            e = "区位图";
            break;

          default:
            e = "其他";
        }
        return e;
    },
    formatPhoneType: function(t) {
        var e = "";
        switch (1 * t) {
          case -1:
            e = "sp";
            break;

          case 0:
            e = "nk";
            break;

          case 1:
            e = "hx";
            break;

          case 2:
            e = "yb";
            break;

          case 3:
            e = "pt";
            break;

          case 4:
            e = "xg";
            break;

          case 5:
            e = "sj";
            break;

          case 6:
            e = "gg";
            break;

          case 7:
            e = "bl";
            break;

          case 8:
            e = "qw";
            break;

          default:
            e = "other";
        }
        return e;
    },
    getPhotoList: function(t) {
        var e = [];
        return t && t.length && t.forEach(function(t, a) {
            t.PhotoUrlList && t.PhotoUrlList.length && t.PhotoUrlList.forEach(function(i, o) {
                var r = {
                    url: i,
                    iconAgency: t.PhotoIcon,
                    curTabAgency: a,
                    id: a + "-" + o
                };
                e.push(r);
            });
        }), e;
    },
    formatPhotos: function(t) {
        var e = [];
        t.map(function(t, a) {
            t.PhotoUrlList.map(function(i, o) {
                var r = {
                    url: i,
                    iconAgency: t.PhotoIcon,
                    curTabAgency: a,
                    id: a + "-" + o
                };
                e.push(r);
            });
        }), this.setData({
            photos: e
        });
    },
    toggleTab: function(t) {
        var e = this, a = t.currentTarget.dataset, i = a.id, o = a.index;
        this.setData({
            scrollIntoView: i
        }), this.data.isTabClick = !0, clearTimeout(this.data.timerId), this.data.timerId = setTimeout(function() {
            e.data.isTabClick = !1;
        }, 500), this.toggleActiveTab(o);
    },
    toggleActiveTab: function(e) {
        var a, i = this, o = this.data.imgs, r = o.findIndex(function(t) {
            return t.isActived;
        });
        r !== e && this.setData((a = {}, t(a, "imgs[" + r + "].isActived", !1), t(a, "imgs[" + e + "].isActived", !0), 
        a)), this.data.scrollIntoViewTab = "tab-" + o[e].id, this.data.scrollIntoViewTabTimerId || (this.data.scrollIntoViewTabTimerId = setTimeout(function() {
            i.setData({
                scrollIntoViewTab: i.data.scrollIntoViewTab,
                scrollIntoViewTabTimerId: null
            });
        }, 500));
    },
    getElemetInfo: function() {
        var t = this, e = this.data.imgs, i = e.map(function(t) {
            return "#" + t.id;
        }).join(",") + ", #imgs";
        a.getElementSize({
            select: i,
            selectType: "selectAll",
            callback: function(a) {
                a[0].forEach(function(a) {
                    "imgs" === a.id || e.forEach(function(i, o) {
                        a.id === i.id && (e[o].scrollTop = a.top + (t.data.scrollTop || 0));
                    });
                });
            }
        });
    },
    computedNavAndContent: function(t) {
        var e = this.data, a = e.imgs, i = e.deviceHeight, o = a.findIndex(function(e, a) {
            return e.scrollTop >= t + i / 3;
        });
        o >= 0 && this.toggleActiveTab(o);
    },
    scrolltoupper: function() {
        var t = this;
        this.data.isTabClick || (clearTimeout(this.data.timerId), this.data.timerId = setTimeout(function() {
            t.toggleActiveTab(0);
        }, 200));
    },
    scrolltolower: function() {
        var t = this;
        this.data.isTabClick || (clearTimeout(this.data.timerId), this.data.timerId = setTimeout(function() {
            t.toggleActiveTab(t.data.imgs.length - 1);
        }, 200));
    },
    handleScroll: function(t) {
        var e = t.detail.scrollTop;
        this.data.scrollTop = e, !this.data.isTabClick && e > 0 && this.computedNavAndContent(e);
    },
    previewVideo: function(t) {
        var e = t.currentTarget.dataset.selector;
        this.data.videoTrack || (this.data.videoTrack = {}), this.data.videoTrack[e] || (this.data.videoTrack[e] = wx.createVideoContext(e));
        var a = this.data.videoTrack[e];
        a.requestFullScreen(), a.play();
    },
    fullScreenChange: function(t) {
        var e = t.detail.fullScreen, a = t.currentTarget.id;
        e || this.data.videoTrack[a].pause(), this.setData({
            showControls: e
        });
    }
});