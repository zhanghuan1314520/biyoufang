function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
}, i = require("../../../config.js"), a = require("../../../utils/index.js"), n = getApp();

Component({
    properties: {
        tabList: {
            type: Array,
            value: [],
            observer: function(t) {
                t[0] && this.setData({
                    tagType: t[0].tagType
                });
            }
        }
    },
    data: {
        buildingList: [],
        activeIndex: 0,
        tagType: 3,
        pageData: [ {
            pageNo: 1,
            limit: 20,
            canLoadMore: !1
        } ],
        initLoad: !0,
        navH: 65,
        swiperHeight: []
    },
    lifetimes: {
        ready: function() {
            this.browseToTab();
        },
        attached: function() {
            this.setData({
                navH: n.globalData.navH
            });
        }
    },
    methods: {
        observerViewPort: function(t, e) {
            wx.createIntersectionObserver(this, {
                observeAll: !0
            }).relativeToViewport().observe(t, function(t) {
                e(t);
            });
        },
        browseToTab: function() {
            var t = this;
            this.observerViewPort(".container", function(e) {
                t.data.initLoad && t.getList(), t.data.initLoad = !1;
            });
        },
        browseBuildings: function() {
            var t = this;
            this.observerViewPort(".advert-build", function(e) {
                var i = e.dataset, a = i.positionOne, n = i.positionTwo, r = t.data.buildingList[a][n];
                0 === r.eventTrackStatus && (r.eventTrackStatus = 1);
            });
        },
        clickTag: function(t) {
            var e = this;
            this.scrollToAchor();
            var i = t.currentTarget.dataset, a = i.type, n = i.index;
            this.setData({
                activeIndex: n,
                tagType: a
            }, function() {
                e.initPageData();
            });
        },
        swiperChange: function(t) {
            var e = this;
            this.scrollToAchor();
            var i = t.detail.current;
            this.setData({
                activeIndex: i,
                tagType: this.properties.tabList[i].tagType
            }, function() {
                e.initPageData();
            });
        },
        initPageData: function() {
            var e = this, i = this.data.activeIndex;
            !this.data.pageData[i] && this.setData(t({}, "pageData[" + i + "]", {
                pageNo: 1,
                limit: 20,
                canLoadMore: !1
            }), function() {
                e.getList();
            });
        },
        getList: function() {
            var t = this, e = this.data.activeIndex;
            1 === this.data.pageData[e].pageNo ? this.getAdvertList().then(function() {
                t.getBuildingList();
            }).catch(function() {
                t.getBuildingList();
            }) : this.getBuildingList();
        },
        getAdvertList: function() {
            var e = this, r = this.data, o = r.activeIndex, s = r.buildingList, c = this.properties.tabList[o].PositionKey, d = s[o] || [];
            return a.request({
                url: i.service.getBuildingListInAd.replace("{positionKey}", c)
            }).then(function(i) {
                var r = n.globalData.cityInfo;
                i = i.map(function(t) {
                    var e = a.formatBuildingInfo(t, r);
                    return e.eventTrackStatus = 0, t.Id && (e.id = t.Id), e;
                }), e.setData(t({}, "buildingList[" + o + "]", d.concat(i)), function() {
                    e.browseBuildings();
                });
            });
        },
        getBuildingList: function() {
            var e = this, r = this.data, o = r.buildingList, s = r.tagType, c = r.activeIndex, d = this.data.pageData[c], u = d.pageNo, g = d.limit, l = o[c] || [];
            return a.request({
                url: i.service.buildingsTag.replace("{tag}", s),
                data: {
                    pageNo: u
                }
            }).then(function(i) {
                var r, o = n.globalData.cityInfo;
                i = i.map(function(t) {
                    var e = a.formatBuildingInfo(t, o);
                    return e.eventTrackStatus = 0, e;
                }), e.setData((r = {}, t(r, "pageData[" + c + "].canLoadMore", i.length === g), 
                t(r, "buildingList[" + c + "]", l.concat(i)), r), function() {
                    e.getCurrentContentHeight();
                });
            });
        },
        buildCardOperate: function(t) {
            var i = t.detail.buildingCardInfo, n = i.id, r = void 0 === n ? "" : n, o = i.buildingId, s = i.projectId;
            r && a.recordAdvertClick({
                advertId: r
            }), a.recordBuildingClick(e({
                buildingId: o,
                SourceKey: "Advert"
            }, s ? {
                ProjectId: s
            } : {})), a.buildingJump(t);
        },
        toLowerLoadMore: function(t) {
            var e = this.data.pageData[this.data.activeIndex], i = e.pageNo;
            e.canLoadMore && (this.data.pageData[this.data.activeIndex].pageNo = ++i, this.getList());
        },
        getCurrentContentHeight: function() {
            var e = this, i = this.data.activeIndex;
            a.getElementSize({
                select: "#tab" + i,
                stack: this,
                callback: function(a) {
                    e.setData(t({}, "swiperHeight[" + i + "]", a[0].height));
                }
            });
        },
        scrollToAchor: function() {
            try {
                var t = this.data.navH + 41, e = wx.createSelectorQuery(this);
                e.select("#buildingTab").boundingClientRect(), e.selectViewport().scrollOffset(), 
                e.exec(function(e) {
                    var i = e[0].top, a = e[1].scrollTop;
                    wx.pageScrollTo({
                        scrollTop: i + a - t,
                        duration: 0
                    });
                });
            } catch (t) {
                console.log(t);
            }
        }
    }
});