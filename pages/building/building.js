function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = require("../../config.js"), a = require("../../utils/index.js"), n = 0, i = getApp(), r = null, o = null;

Page({
    data: {
        navH: i.globalData.navH,
        pageNo: 1,
        limit: 10,
        projectList: null,
        canLoadMore: !1,
        bannerList: [],
        ifCurrentPage: !0,
        cityInfo: {
            areaOptions: null,
            subWayOptions: null
        },
        pagePreScroll: -1,
        selectFormData: {},
        hotBuilding: [],
        imageRoot: i.globalData.imgsPathInfo.rootPath
    },
    onLoad: function(t) {
        var e = this;
        i.checkSession(function() {
            e.getBuildings(), e.getCityplatelist().then(function(t) {
                e.getSubwayLines(t);
            }), a.getNoreadnumber(), a.getNoreadFollow(), t.advertId && a.recordExtensionAdvertClick({
                advertId: t.advertId,
                sourceType: 0
            });
        }, a.getShareParams(t)), a.recordByAld("楼盘列表页浏览量");
    },
    onUnload: function() {
        this.setData({
            autoDestroy: !0
        });
    },
    onShow: function() {
        this.setData({
            ifCurrentPage: !0
        }), a.showTabBarRedDot();
    },
    onHide: function() {
        this.setData({
            ifCurrentPage: !1
        }), this.handleBannerAdvertTrace();
    },
    onReady: function() {
        o = this.selectComponent("#loadMore");
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNo: 1
        }), Promise.all([ this.getBuildings() ]).then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        this.data.canLoadMore && (this.setData({
            pageNo: this.data.pageNo + 1
        }), this.data.pageNo > 1 && o.data.loadFail && o.reset(), this.getBuildingList());
    },
    onShareAppMessage: function() {
        return a.extractShareFn({
            util: a,
            app: i
        });
    },
    onPageScroll: function(t) {
        n = t.scrollTop;
    },
    getCityplatelist: function() {
        return a.request({
            url: e.service.getAreaInfoInGlobal
        }).then(function(t) {
            return t;
        });
    },
    getSubwayLines: function(t) {
        var n = this;
        return a.request({
            url: e.service.getSubwayInGlobal
        }).then(function(e) {
            n.selectComponent("#select").initSubWayData({
                areaOptions: t,
                subWayOptions: e
            });
        });
    },
    handleBannerList: function(t) {
        return t ? t.map(function(t) {
            return t.ImageUrl = a.formatOSSLink(t.ImageUrl, "image/format,webp"), t.LinkUrl = a.formatFloatLinkUrl(t), 
            t.LinkType = a.formatFloatLinkType(t), t.ShotUrl && (t.buildingId = t.ShotUrl.split("|")[1] || ""), 
            t;
        }) : null;
    },
    getBuildings: function() {
        var t = this;
        return this.getAllAdvert().then(function() {
            t.getBuildingList();
        }).catch(function() {
            t.getBuildingList();
        });
    },
    getAllAdvert: function() {
        var t = this;
        return a.request({
            url: e.service.getBuildingAllInAd
        }).then(function(e) {
            var a = e.BuildingBannerList, n = void 0 === a ? [] : a, i = e.RecommendBuildingList, r = void 0 === i ? [] : i;
            r.length && t.setData({
                hotBuilding: t.handleHomeInfoLists(r, 0, !0) || []
            }), n.length && t.setData({
                bannerList: t.handleBannerList(n) || []
            }, function() {
                t.data.bannerList[0] && (t.data.bannerList[0].eventTrackStatus = 1, t.openBannerIntersection());
            });
        });
    },
    getBuildingList: function() {
        var n = this, i = a.deepCopyHard(this.data.selectFormData), r = !!Object.keys(i).length;
        return 1 === this.data.pageNo && wx.showLoading({
            title: "加载中"
        }), i.PageNo = this.data.pageNo, a.request({
            url: e.service.getBuildingListInBuilding,
            data: i
        }).then(function(e) {
            1 === n.data.pageNo && (n.data.projectList = [], n.setData({
                projectList: r ? [] : [].concat(t(n.data.hotBuilding))
            }));
            var a = n.data.projectList.length, i = n.handleHomeInfoLists(e, a) || [];
            i.forEach(function(t) {
                t.eventTrackStatus = 0;
            });
            var o = {};
            i.map(function(t) {
                o["projectList[" + a++ + "]"] = t;
            }), o.canLoadMore = 20 === e.length, n.setData(o, function() {
                1 === n.data.pageNo && n.openListeningbuildingList();
            }), wx.hideLoading();
        }).catch(function() {
            o.setData({
                loadFail: !0
            });
        });
    },
    handleHomeInfoLists: function(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return t.map(function(t, r) {
            return t.idx = r + e, t.subscribeStatus = 0, t.followStatus = 0, t.SubwayDistance && t.SubwayDistance <= 1500 && (t.SubwayDistance < 1e3 ? t.BuildingTags = "距地铁" + t.SubwayDistance + "m" + (t.BuildingTags ? "," + t.BuildingTags : "") : t.BuildingTags = "距地铁" + (t.SubwayDistance / 1e3).toFixed(1) + "km" + (t.BuildingTags ? "," + t.BuildingTags : "")), 
            t.propertyType = String(t.PropertyType), t.info = a.formatBuildingInfo(t, i.globalData.cityInfo), 
            t.IsRecommend = n, t.eventTrackStatus = 0, t;
        });
    },
    goSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search"
        });
    },
    selectItemClick: function(t) {
        var e = t.detail;
        switch (e.eventType) {
          case "clickOuter":
            this.handleSelectOutClick();
            break;

          case "closeMask":
            this.handleCloseMask();
            break;

          case "submitForm":
            this.handleCloseMask(), this.handleSUbmitForm(e.formData);
            break;

          case "cancleFixedPage":
            this.handleCancleFixedPage();
            break;

          case "fixedPage":
            this.handleFixedPage();
        }
    },
    handleSelectOutClick: function() {
        n < 200 && (this.setData({
            pagePreScroll: n
        }), wx.pageScrollTo({
            scrollTop: 200
        }));
    },
    handleCloseMask: function() {
        var t = this.data.pagePreScroll;
        t >= 0 && (wx.pageScrollTo({
            scrollTop: t
        }), this.setData({
            pagePreScroll: -1
        }));
    },
    handleSUbmitForm: function(t) {
        this.setData({
            pageNo: 1,
            selectFormData: t
        }), this.getBuildingList(t);
    },
    selectOperate: function(t) {
        var e = t.detail, a = void 0;
        "search" === e ? a = "/pages/search/search" : "map" === e && (a = "/ext_features/map/map"), 
        a && wx.navigateTo({
            url: a
        });
    },
    buildCardOperate: function(t) {
        a.buildingJump(t), this.handleBuildingClickAdvertTrace(t.detail.buildingCardInfo);
    },
    openBannerIntersection: function() {
        var t = this;
        wx.createIntersectionObserver(this, {
            thresholds: [ 0, 1 ]
        }).relativeToViewport().observe(".swiper", function(e) {
            t.setData({
                isBannerView: !!e.intersectionRatio
            });
        });
    },
    openListeningbuildingList: function() {
        var t = this, e = i.globalData.userInfo;
        e && e.OpenId && (r && (r.disconnect(), r = null), (r = wx.createIntersectionObserver(this, {
            observeAll: !0
        }).relativeToViewport({
            bottom: 0
        })).observe(".building-card", function(e) {
            var a = e.dataset || {}, n = (t.data.projectList || [])[a.i] || null;
            n && !n.eventTrackStatus && (n.eventTrackStatus = 1);
        }));
    },
    handleBannerAdvertTrace: function() {
        var t = this.selectComponent("#swiperBanner"), e = [];
        (t && t.data.bannerList || []).forEach(function(t) {
            1 === t.eventTrackStatus && (e.push(t.Id), t.eventTrackStatus = 2);
        });
        var n = this.data.hotBuilding || [], i = e.concat(n.map(function(t) {
            if (t.IsRecommend && 1 === t.eventTrackStatus) return t.eventTrackStatus = 2, t.Id;
        }).filter(function(t) {
            return t;
        }));
        i.length && a.recordAdvertScan({
            AdvertIds: i
        });
    },
    handleBuildingAdvertTrace: function(t) {
        var e = this.data.projectList || [], n = i.globalData.userInfo || null;
        if (e.length && n && n.OpenId) {
            for (var r = e.length - 1, o = r - 25 > 0 ? r - 25 : 0, s = [], l = [], c = r; c >= o; c--) {
                var u = e[c];
                u.eventTrackStatus || (u.eventTrackStatus = 2, u.IsRecommend ? s.push(u.Id) : l.push(u.BuildingId));
            }
            s.length && a.recordAdvertScan({
                AdvertIds: s
            });
        }
    },
    handleBuildingHideTrace: function() {
        var t = this.data.projectList || [];
        t.slice(0, 25);
        var e = t.map(function(t) {
            if (1 === t.eventTrackStatus) return t.eventTrackStatus = 2, t.BuildingId;
        }).filter(function(t) {
            return t;
        });
        e.length && a.recordAdvertScan({
            AdvertIds: e
        });
    },
    handleBuildingClickAdvertTrace: function(t) {
        var e = (this.data.projectList || [])[t.idx];
        a.recordBuildingClick({
            buildingId: e.BuildingId,
            ProjectId: e.ProjectId,
            SourceKey: "BuildingList"
        }), e.IsRecommend && a.recordAdvertClick({
            advertId: e.Id,
            SourceKey: "Advert"
        });
    }
});