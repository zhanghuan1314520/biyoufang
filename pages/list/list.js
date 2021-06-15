function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = require("../../config.js"), i = require("../../utils/index.js"), n = getApp();

Page({
    data: (e = {
        navH: n.globalData.navH,
        navBarTitle: "",
        isShare: 0,
        status: null,
        pageNo: 1,
        limit: 20,
        pageState: -1,
        list: [],
        canLoadMore: !1,
        recentImage: null,
        freeCount: 0,
        today: "",
        noNeedImage: null,
        cityInfo: null,
        imageRoot: n.globalData.imgsPathInfo.rootPath,
        showShare: !0
    }, t(e, "imageRoot", n.globalData.imgsPathInfo.rootPath), t(e, "versionType", 0), 
    t(e, "canLoadBanner", !1), t(e, "positionKey", ""), e),
    onLoad: function(t) {
        var e = this;
        n.checkSession(function() {
            if (e.setData({
                status: t.status,
                isShare: t.isShare || 0,
                yearMonth: e.getPreSaleTime(),
                cityInfo: n.globalData.cityInfo,
                canLoadBanner: !0,
                districtId: t.districtId || "",
                districtName: t.districtName || "",
                versionType: n.globalData.cityInfo.VersionType,
                positionKey: e.formatPageTitleByStatus(t.status, 1)
            }, function() {
                e.setTitle(), e.getListByStatus(t.status, !0);
            }), "8" === t.status) {
                var a = new Date(), i = a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日";
                e.setData({
                    today: i
                });
            }
        }, i.getShareParams(t));
    },
    onReachBottom: function() {
        this.data.canLoadMore && (this.setData({
            pageNo: this.data.pageNo + 1
        }), this.getListByStatus(this.data.status));
    },
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            pageNo: 1,
            list: []
        }, function() {
            t.getListByStatus(t.data.status, !0), wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage: function() {
        return i.extractShareFn({
            util: i,
            app: n
        });
    },
    getListByStatus: function(t, e) {
        var a = this;
        switch (t) {
          case "8":
            this.getNoLotteryList();
            break;

          case "6":
            this.getImmedLotteryList();
            break;

          case "7":
            this.getListByDistrict(this.data.districtId);
            break;

          case "9":
          case "10":
            e ? this.getAdvertList({
                9: "JustneedBuilding",
                10: "ImproveBuilding"
            }[t]).then(function() {
                a.getListByTags();
            }).catch(function() {
                a.getListByTags();
            }) : this.getListByTags();
            break;

          default:
            this.getProjectByStatus();
        }
    },
    initBuildingList: function(t, e) {
        t = this.handleHomeInfoLists(t);
        var a = this.data.list || [];
        this.setData({
            list: a.concat(t),
            canLoadMore: t.length === this.data.limit,
            pageState: 1
        }, function() {
            e && e();
        });
    },
    getNoLotteryList: function() {
        var t = this;
        i.request({
            url: a.service.getNoLotteryListInBuilding,
            data: {
                pageNo: this.data.pageNo
            },
            loading: 1 === this.data.pageNo
        }).then(function(e) {
            var a = (0 === t.data.versionType ? e.ListData : e) || [];
            a = t.handleHomeInfoLists(a);
            var i = t.data.list || [];
            t.setData({
                list: i.concat(a),
                pageState: 1,
                freeCount: e.TotalCount || a.length,
                canLoadMore: a.length === t.data.limit
            });
        }).catch(function(e) {
            t.setData({
                pageState: 1
            });
        });
    },
    getAdvertList: function(t) {
        var e = this;
        return i.request({
            url: a.service.getBuildingListInAd.replace("{positionKey}", t)
        }).then(function(t) {
            e.initBuildingList(t, function() {
                e.browseBuildings();
            });
        });
    },
    getListByTags: function() {
        var t = this;
        return i.request({
            url: a.service.buildingsTag.replace("{tag}", {
                9: 1,
                10: 2
            }[this.data.status]),
            data: {
                pageNo: this.data.pageNo
            },
            loading: 1 === this.data.pageNo
        }).then(function(e) {
            t.initBuildingList(e);
        }).catch(function(e) {
            t.setData({
                pageState: 1
            });
        });
    },
    getImmedLotteryList: function() {
        var t = this;
        i.request({
            url: a.service.getBUildingImmedInBld,
            data: {
                pageNo: this.data.pageNo
            },
            loading: 1 === this.data.pageNo
        }).then(function(e) {
            t.initBuildingList(e);
        }).catch(function(e) {
            t.setData({
                pageState: 1
            });
        });
    },
    getListByDistrict: function(t) {
        var e = this;
        i.request({
            url: a.service.getListByDistrictId.replace("{districtId}", t),
            data: {
                pageNo: this.data.pageNo
            },
            loading: 1 === this.data.pageNo
        }).then(function(t) {
            e.initBuildingList(t);
        }).catch(function(t) {
            e.setData({
                pageState: 1
            });
        });
    },
    getFreeCount: function(t) {
        this.setData({
            freeCount: t
        });
    },
    getProjectByStatus: function() {
        var t = this;
        i.request({
            url: a.service.getBuildingByStatusInbuilding.replace("{projectStatus}", this.data.status),
            data: {
                pageNo: this.data.pageNo
            },
            loading: 1 === this.data.pageNo
        }).then(function(e) {
            t.initBuildingList(e);
        }).catch(function(e) {
            t.setData({
                pageState: 1
            });
        });
    },
    setTitle: function() {
        var t = this.data.status, e = this.formatPageTitleByStatus(t);
        this.setData({
            navBarTitle: e
        });
    },
    getPreSaleTime: function() {
        var t = new Date(), e = t.getMonth() + 2 == 13;
        return (e ? t.getFullYear() + 1 : t.getFullYear()) + "年" + (e ? 1 : t.getMonth() + 2) + "月";
    },
    formatPageTitleByStatus: function(t, e) {
        var a = "", i = n.globalData.cityInfo.VersionType, s = "";
        switch (1 * t) {
          case 0:
            a = "即将预售", s = "PreSaleBanner";
            break;

          case 1:
            a = "即将登记", s = "WaitingRegisterBanner";
            break;

          case 2:
            a = 1 === i ? "即将认筹" : "正在登记", s = 1 === i ? "" : "RegisterBanner";
            break;

          case 3:
            a = 1 === i ? "正在认筹" : "即将摇号", s = 1 === i ? "" : "WaitingLotteryBanner";
            break;

          case 5:
            a = "即将摇号", s = "WaitingLotteryBanner";
            break;

          case 4:
            a = "不限购";
            break;

          case 6:
            a = "直接登记", s = "BocailotteryBanner";
            break;

          case 7:
            a = this.data.districtName;
            break;

          case 8:
            a = "无需摇号", s = "WithoutlotteryBanner";
            break;

          case 9:
            a = "刚需房";
            break;

          case 10:
            a = "改善房";
        }
        return e ? s : a;
    },
    handleHomeInfoLists: function(t) {
        var e = this, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return t.map(function(t, n) {
            return t.idx = n + a, t.subscribeStatus = 0, t.followStatus = 0, t.SubwayDistance && t.SubwayDistance <= 1500 && (t.SubwayDistance < 1e3 ? t.BuildingTags = "距地铁" + t.SubwayDistance + "m" + (t.BuildingTags ? "," + t.BuildingTags : "") : t.BuildingTags = "距地铁" + (t.SubwayDistance / 1e3).toFixed(1) + "km" + (t.BuildingTags ? "," + t.BuildingTags : "")), 
            t.propertyType = String(t.PropertyType), "8" === e.data.status && (t.RegistrationNumber ? t.registerInfo = [ t.HouseNumber ? "房源套数" + t.HouseNumber + "," : "", t.RegistrationNumber ? "登记人数" + t.RegistrationNumber + "," : "", "无需摇号" ].join("") : t.registerInfo = "登记人数不足,无需摇号"), 
            t.info = i.formatBuildingInfo(t, e.data.cityInfo), t.Id && (t.info.id = t.Id), t.eventTrackStatus = 0, 
            t;
        });
    },
    formatTotalPrice: function(t) {
        return t.MinTotalPrice ? parseInt(t.MinTotalPrice / 1e4) : "";
    },
    formatShareText: function() {
        var t = parseInt(this.data.status), e = this.data.cityInfo.VersionType;
        switch (t) {
          case 0:
            return "这些盘即将预售，有没有你中意的？";

          case 1:
            return "即将登记楼盘汇总";

          case 2:
            return 1 === e ? "即将认筹楼盘汇总" : "今日正在登记楼盘汇总";

          case 3:
            return 1 === e ? "今日正在认筹楼盘汇总" : "这些盘即将摇号";

          case 5:
            return 1 === e ? "这些盘即将摇号" : n.globalData.defaultShareText;

          case 8:
            return "这些楼盘不用摇号，可直接购买哦";

          case 6:
            return "在这儿，看中了房源直接登记购房意向";

          default:
            return n.globalData.defaultShareText;
        }
    },
    buildCardOperate: function(t) {
        var e = t.detail.buildingCardInfo, a = {
            buildingId: e.buildingId,
            SourceKey: "BuildingList"
        };
        e.projectId && (a.ProjectId = e.projectId), e.id && i.recordAdvertClick({
            advertId: e.id
        }), i.recordBuildingClick(a), i.buildingJump(t);
    },
    closeShare: function() {
        this.setData({
            showShare: !1
        });
    },
    observerViewPort: function(t, e) {
        wx.createIntersectionObserver(this, {
            observeAll: !0
        }).relativeToViewport().observe(t, function(t) {
            e(t);
        });
    },
    browseBuildings: function() {
        var t = this;
        this.observerViewPort(".advert-build", function(e) {
            var a = e.dataset.index, i = t.data.list[a];
            0 === i.eventTrackStatus && (i.eventTrackStatus = 1);
        });
    },
    onHide: function() {
        var t = [];
        this.data.list.forEach(function(e) {
            e.Id && 1 === e.eventTrackStatus && (t.push(e.Id), e.eventTrackStatus = 2);
        }), t.length && i.recordAdvertScan({
            AdvertIds: t
        });
    }
});