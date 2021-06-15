function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i;
    }
    return Array.from(e);
}

function t(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
    return e;
}, n = require("../../config.js"), a = require("../../utils/index.js"), r = require("../../resource/base64/moduleNavListBase64.js"), o = require("../../utils/getter/index.js"), s = getApp(), c = null;

Page({
    data: {
        title: "必有房",
        navH: s.globalData.navH,
        userInfo: null,
        adVisible: !1,
        bannerList: [],
        topActivity: null,
        headlineArticles: [],
        isBannerView: !1,
        scanList: [],
        canLoadData: !0,
        pageStatus: -1,
        skeletonInfo: {
            swiperSkeleton: [ {
                width: "100%",
                height: "300rpx"
            } ],
            moduleList: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
            moduleListSkeleton: [ {
                width: "100rpx",
                height: "30rpx",
                margin: "10rpx 0 0 0"
            } ]
        },
        isAnnouncement: !1,
        announcement: "",
        textX: 0,
        textDuration: 0,
        isAddtomymp: !1,
        loginStatus: 0,
        maskHeight: 0,
        collectBtnLeft: 0,
        isIOS: 0,
        showFnGuide: !1,
        showCollectGuide: !1,
        brokerList: [],
        brokerCardWidth: 0,
        ansVisible: !1,
        ansCount: 0,
        statsNavList: [],
        moduleNavList: [],
        articleList: [],
        cityInfo: null,
        cityInfoInStorage: null,
        showLocationDialog: !1,
        hotBuildingList: [],
        rigidDemandBuildingList: [],
        lowPriceBuildingList: [],
        bannerTypeList: [],
        articleTypeList: [],
        buildingStatsList: [],
        _buildingStatsList: [],
        buildingCategoryTab: null,
        categoryBrand: [],
        acticleCategory: [],
        newGuideFlag: !1,
        moduleNavListIcons: r,
        advertId: ""
    },
    onLoad: function(e) {
        var t = this;
        s.checkSession(function() {
            var i = s.globalData.cityInfo, n = s.globalData.userInfo, r = [], o = [], c = t.initModuleNavList(i);
            if (i && 2 === i.VersionType ? r = t.initBuildingStatsList() : o = t.initStatsNavList(i), 
            t.setData({
                cityInfo: i,
                userInfo: n,
                buildingStatsList: r,
                statsNavList: o,
                moduleNavList: c,
                cityInfoInStorage: s.getCityInfo(),
                isAddtomymp: s.globalData.userInfo.FirstLogin,
                pageStatus: 1,
                advertId: e.advertId || ""
            }, function() {
                t.handleAdvertRecord({
                    sourceType: 0
                });
            }), e.url ? wx.navigateTo({
                url: "/h5_webview/article_webview/article_webview?url=" + e.url + "&title=" + encodeURIComponent(e.title) + "&id=" + e.id + "&type=" + e.type + "&isShare=1&brokerId=" + e.brokerId + "&isShare=1"
            }) : t.showNewGuide(), t.getHomeAllAdvert(), t.getBanners("FloatingBanner"), t.getAnnouncement(), 
            t.getHomeInfo(), t.getNoanswerCount(), a.getNoreadnumber(), a.getNoreadFollow(), 
            e.brokerCode) {
                var l = getCurrentPages();
                a.recordShareVisit(e.brokerCode, l[l.length - 1].route + a.serializationUrlParams(e));
            }
        }, a.getShareParams(e));
    },
    onShow: function() {
        s.globalData.userInfo && this.setData({
            userInfo: s.globalData.userInfo
        });
    },
    onHide: function() {
        this.setData({
            adVisible: !1,
            newGuideFlag: !1,
            scanList: []
        }), wx.showTabBar(), this.triggerScanEventTrack();
    },
    onUnload: function() {
        this.data.interval && clearInterval(this.data.interval);
    },
    onPullDownRefresh: function() {
        this.triggerScanEventTrack(), this.setData({
            canLoadData: !0
        });
        var e = [];
        e.push(this.getHomeAllAdvert()), e.push(this.getBanners("FloatingBanner")), e.push(this.getAnnouncement()), 
        e.push(this.getHomeInfo()), Promise.all(e).then(function() {
            wx.stopPullDownRefresh(), a.wxToast("刷新成功");
        });
    },
    onShareAppMessage: function() {
        return a.extractShareFn({
            util: a,
            app: s
        });
    },
    handleAdvertRecord: function(e) {
        this.data.advertId && a.recordExtensionAdvertClick(i({
            advertId: this.data.advertId
        }, e));
    },
    authPhoneNumberSuccess: function(e) {
        this.handleAdvertRecord({
            sourceType: 8,
            phoneNumber: e.detail.phoneNumber
        });
    },
    openListeningArticleList: function() {
        var e = this, i = this.data.userInfo;
        if (i && i.OpenId) {
            var n;
            wx.createIntersectionObserver(this, {
                observeAll: !0
            }).relativeToViewport((n = {
                top: 0,
                left: 0
            }, t(n, "top", 0), t(n, "bottom", 0), n)).observe("#item_article_record", function(t) {
                var i = t.dataset || {}, n = (e.data.articleList || [])[i.idx] || null;
                n && 2 !== n.eventTrackStatus && (n.eventTrackStatus = 1);
            });
        }
    },
    openListeningBrokerList: function() {
        var e = this, t = this.data.userInfo;
        t && t.OpenId && wx.createIntersectionObserver(this, {
            observeAll: !0,
            thresholds: [ 1 ]
        }).relativeToViewport().observe("#item_broker_record", function(t) {
            if (1 === t.intersectionRatio) {
                var i = t.dataset || {}, n = (e.data.brokerList || [])[i.idx];
                n && 2 !== n.eventTrackStatus && (n.eventTrackStatus = 1);
            }
        });
    },
    getHomeInfo: function() {
        var e = this, t = this.data.cityInfo.VersionType, i = void 0 === t ? "" : t;
        return a.request({
            url: 2 === i ? n.service.getHomeStatisticsDistrict : n.service.getHomeStatisticsStatus
        }).then(function(t) {
            if (t) if (2 !== i) {
                var n = e.data.statsNavList;
                n.forEach(function(e, i) {
                    e.iconText = t.Numbers[i];
                }), e.setData({
                    statsNavList: n
                });
            } else if (t && t.length) {
                var a = e.data.buildingStatsList, r = [];
                a.forEach(function(e, i) {
                    e.isExpired = !0, e.isExpired && i < 5 && (e = Object.assign({}, e, t[i]), r.push(e)), 
                    5 === i && (e = Object.assign({}, e, {
                        DistrictId: "",
                        DistrictName: "更多",
                        Number: 0
                    }), r.push(e));
                }), e.setData({
                    buildingStatsList: a,
                    _buildingStatsList: r
                });
            }
        });
    },
    getHomeAllAdvert: function() {
        var e = this;
        a.request({
            url: n.service.getHomeAllInAd
        }).then(function(t) {
            var i = [], n = [], r = [], o = [], s = [], l = [], u = [], d = [], g = [], f = [];
            t.forEach(function(t) {
                var c = t.Title, p = t.List;
                switch (c) {
                  case "首页Banner":
                    i = e.formatBannerList(p);
                    break;

                  case "人气榜":
                    n = e.formBuildingList(p);
                    break;

                  case "刚需楼盘":
                    r = e.formBuildingList(p);
                    break;

                  case "低总价":
                    o = e.formBuildingList(p);
                    break;

                  case "热门文章":
                    s = e.formatArticleList(p);
                    break;

                  case "楼市头条":
                    l = p.map(function(e, t) {
                        return e.eventTrackStatus = 0 === t ? 1 : 0, e;
                    });
                    break;

                  case "优秀顾问":
                    u = p.map(function(e) {
                        return e.personalImageUrl = a.formatOSSLink(e.PersonalImageUrl, "image/format,webp/resize,w_100"), 
                        e.eventTrackStatus = 0, e;
                    });
                    break;

                  case "分类Tab":
                    var h = {
                        WeekRecommendBuilding: 3,
                        BestBuysBuilding: 4,
                        SellingPriceBuilding: 5,
                        ExistingBuilding: 6,
                        DeliveryBuilding: 7,
                        ThefirstBuilding: 8
                    };
                    d = p.map(function(e) {
                        return e.tagType = h[e.PositionKey], e;
                    }).filter(function(e) {
                        return e.Show;
                    });
                    break;

                  case "分类场馆":
                    g = p;
                    break;

                  case "两级标题推荐":
                    f = p;
                }
            }), e.setData({
                bannerList: i,
                hotBuildingList: n,
                rigidDemandBuildingList: r,
                lowPriceBuildingList: o,
                headlineArticles: l,
                articleList: s,
                brokerList: u,
                buildingCategoryTab: d,
                categoryBrand: g,
                acticleCategory: f
            }, function() {
                s.length && e.openListeningArticleList(), u.length && e.openListeningBrokerList(), 
                c = e.selectComponent("#buildingTab");
            });
        });
    },
    getBanners: function(e) {
        var t = this;
        a.request({
            url: n.service.getBannerListInAd.replace("{positionKey}", e)
        }).then(function(i) {
            i && i.length && "FloatingBanner" === e && t.resolveAdInfo(i);
        });
    },
    getAnnouncement: function() {
        var e = this;
        return a.request({
            url: n.service.getNoticeInConf
        }).then(function(t) {
            e.setData({
                announcement: t.Content,
                isAnnouncement: !!t.Content
            }), t.Content && e.scrollAnnouncement();
        });
    },
    countBrokerRecommendClick: function(e) {
        a.request({
            url: n.service.countBrokerRecommendClick,
            method: "POST",
            data: {
                id: e,
                OpenId: s.globalData.userInfo && s.globalData.userInfo.OpenId
            }
        }).then(function(e) {}).catch(function(e) {
            console.error("首页推荐顾问点击计数时失败: ", e);
        });
    },
    getNoanswerCount: function() {
        var e = this, t = (this.data.userInfo, this.data.cityInfoInStorage);
        o.judgeConsultantIntoCurrentCity(t.CityId) && a.request({
            url: n.service.getNoanswerCountInQa
        }).then(function(t) {
            t && t.Status && t.NoAnswerCount && e.setData({
                ansVisible: !0,
                ansCount: t.NoAnswerCount
            });
        }).catch(function(e) {
            console.error("获取提问未回答数出错: ", e);
        });
    },
    getFollowFormid: function(e) {
        a.getFollowFormid(e.detail.formId);
    },
    headSwiperChange: function(e) {
        var t = e.detail, i = this.data.headlineArticles || [], n = t.current;
        2 !== i[n].eventTrackStatus && (i[n].eventTrackStatus = 1);
    },
    goSearch: function() {
        a.navigatePage({
            url: "/pages/search/search"
        });
    },
    toHouseMarket: function() {
        wx.navigateTo({
            url: "/ext_features/market_headline/market_headline"
        });
    },
    goBrokerCardPage: function(e) {
        var t = this.data.brokerList.filter(function(t) {
            return t.Id === e.currentTarget.dataset.id;
        })[0] || null;
        if (t) {
            this.countBrokerRecommendClick(t.Id);
            var i = "/pages/broker/broker?brokerId=" + t.RealtyConsultantId + "&isShare=0";
            wx.navigateTo({
                url: i,
                fail: function(e) {
                    console.error("跳转到置业顾问卡片页时失败:", e);
                }
            });
        }
    },
    goCitySelectPage: function() {
        a.navigatePage({
            url: "/pages/city/city?selectCity=1"
        });
    },
    goArticleDetailPage: function(e) {
        var t = e.currentTarget.dataset && e.currentTarget.dataset.idx;
        if (-1 !== t) {
            var i = this.data.articleList[t], n = i.ArticleId, r = i.ArticleUrl, o = i.Title, s = i.Id;
            if (a.recordArticleClick({
                articleId: n,
                SourceKey: "Advert"
            }), a.recordAdvertClick({
                advertId: s,
                SourceKey: "Advert"
            }), r) {
                var c = "/h5_webview/article_webview/article_webview?url=" + (r = encodeURIComponent(r)) + "&title=" + encodeURIComponent(o) + "&id=" + n;
                wx.navigateTo({
                    url: c
                });
            }
        }
    },
    goSearchPage: function() {
        a.recordByAld("搜索框点击量", {
            "触发页面": "首页"
        });
        a.navigatePage({
            url: "/pages/search/search"
        });
    },
    goMarketArticlePage: function() {
        wx._routeParams = {
            marketStatus: "article"
        };
        a.navigatePage({
            url: "/pages/market/market",
            goType: "switchTab"
        });
    },
    goModulePage: function(e) {
        var t = e.detail.recordParams || e.currentTarget.dataset;
        if (t) {
            var i = t.id, n = this.data.moduleNavList.filter(function(e) {
                return e.id === i;
            })[0];
            if (n) {
                var r = n.pageUrl, o = "navigateTo";
                switch (n.type) {
                  case "subway":
                    a.recordByAld("地铁楼盘点击量");
                    break;

                  case "queryLottery":
                    a.recordByAld("最新摇号点击量");
                    break;

                  case "register":
                    r = "/pages/list/list?status=6";
                    break;

                  case "queryQualification":
                    a.recordByAld("资格查询点击量"), r += "?url=" + encodeURIComponent(this.data.cityInfo.QualificationEnquiryUrl) + "&status=0";
                    break;

                  case "map":
                    a.recordByAld("地图找房点击量");
                    break;

                  case "load":
                    break;

                  case "qa":
                    wx._routeParams = {
                        marketStatus: "qa"
                    }, o = "reLaunch";
                    break;

                  case "joinFamily":
                    r = "/pck_my/duplicate_code/duplicate_code?enter=flock";
                    break;

                  case "marketArticle":
                    wx._routeParams = {
                        marketStatus: "article"
                    }, o = "switchTab";
                    break;

                  case "firstBuyBuilding":
                    a.recordByAld("买房知识点击量"), r = "/h5_webview/knowledge/knowledge";
                }
                r && a.navigatePage({
                    url: r,
                    goType: o
                });
            }
        }
    },
    closeQaToast: function() {
        this.setData({
            ansVisible: !1
        });
    },
    closeAd: function() {
        this.setData({
            adVisible: !1
        });
    },
    closeAnnouncement: function() {
        var e = this;
        this.setData({
            isAnnouncement: !1
        }, function() {
            e.data.interval && clearInterval(e.data.interval);
        });
    },
    scrollAnnouncement: function() {
        var e = this, t = this, i = wx.createSelectorQuery();
        i.select(".announcement").boundingClientRect(), i.select(".announcement__text").boundingClientRect(), 
        i.exec(function(i) {
            if (i[0]) {
                var n = i[1].width - i[0].width, a = Math.ceil(n / 40);
                if (n > 0) {
                    var r = setInterval(function() {
                        t.setData({
                            textX: n,
                            textDuration: a
                        }, function() {
                            setTimeout(function() {
                                t.setData({
                                    textX: 0,
                                    textDuration: 0
                                });
                            }, 1e3 * a + 1e3);
                        });
                    }, 1e3 * a + 2600);
                    e.setData({
                        interval: r
                    });
                }
            }
        });
    },
    catchTouchMove: function() {
        return !1;
    },
    closeAddtomymp: function() {
        this.setData({
            isAddtomymp: !1
        });
    },
    clickLocationDialogBtn: function(e) {
        var t = this, n = e.currentTarget.dataset || null;
        if (n && n.type) {
            var a = this.data.cityInfoInStorage, r = s.globalData.cityInfo;
            "confirm" === n.type && (s.globalData.cityInfo = i({}, a), this.setData({
                cityInfo: a,
                showLocationDialog: !1
            }, function() {
                t.onLoad();
            })), "cancel" === n.type && (s.setCityInfo(r), this.setData({
                showLocationDialog: !1
            }, function() {
                t.onLoad();
            }));
        }
    },
    operateBrokerCardInfo: function(e) {
        var t = e.detail, i = e.detail.brokerCardInfo;
        if ("goChatPage" === t.eventType && i && i.UnionId) {
            var n = "/pck_chat/chat/chat?unionId=" + i.UnionId + "&chatSourceType=1";
            a.navigatePage({
                url: n
            });
        }
        if ("goBrokerPage" === t.eventType) {
            a.recordAdvertClick({
                advertId: i.Id
            });
            var r = "/pages/broker/broker?brokerId=" + i.ConsultantId + "&isShare=0";
            a.navigatePage({
                url: r
            });
        }
    },
    checkAd: function(e) {
        var t = e.detail, i = t.ad;
        if (a.recordAdvertClick({
            advertId: i.Id
        }), "goPage" === t.eventType && i.TargetUrl) {
            var n = "navigateTo", r = "", o = i.TargetUrl;
            if (o.includes("pageType=tabBar")) {
                if (n = "switchTab", o.includes("navType")) {
                    var s = o.split("&navType=")[1];
                    s && (wx._routeParams = {
                        marketStatus: s
                    });
                }
                r = o.split("?")[0];
            } else o.includes("pages/detail/detail") && (o += "&sourceType=2"), r = o;
            a.navigatePage({
                url: r,
                goType: n
            });
        }
    },
    formatAdList: function(e) {
        return e.map(function(e) {
            return e.PosterImage = a.formatOSSLink(e.ImageUrl, "image/format,webp/resize,w_750"), 
            e.LinkUrl = a.formatFloatLinkUrl(e), e.LinkType = a.formatFloatLinkType(e), e.isActived = !1, 
            e.isExpired = !1, e;
        });
    },
    diffAdList: function(e, t) {
        var i = t.map(function(e) {
            return e.Id;
        }), n = e.map(function(e) {
            return e.Id;
        }), a = [];
        return e.forEach(function(e) {
            i.includes(e.Id) || (e.isExpired = !0);
        }), t.forEach(function(e) {
            n.includes(e.Id) || a.push(e);
        }), a;
    },
    randomSortAdList: function(e) {
        for (var t = [], n = [], a = 0, r = (a = (n = e.map(function(e) {
            return i({}, e);
        })).length) - 1; r >= 0; r--) {
            for (var o = -1; o < 0 || o >= a; ) o = Math.round(Math.random() * a);
            e[o] && (t.push(n[o]), n.splice(o, 1), a--);
        }
        return t;
    },
    initStatsNavList: function(e) {
        if (e) {
            var t = e.VersionType, i = [ {
                id: 0,
                status: 1,
                name: "即将登记",
                iconType: "text",
                iconSrc: "",
                type: "PublicityNumber",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(180deg,rgba(251,127,128,1) 0%,rgba(241,91,96,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 0
            }, {
                id: 1,
                status: 2,
                name: "正在登记",
                iconType: "text",
                type: "RegisterNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(360deg,rgba(252,174,81,1) 0%,rgba(254,186,65,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 0
            }, {
                id: 2,
                status: 3,
                name: "即将摇号",
                iconType: "text",
                type: "WaitingLotteryNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(360deg,rgba(254,96,15,1) 0%,rgba(254,132,69,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 0
            }, {
                id: 3,
                status: 0,
                name: "即将预售",
                iconType: "text",
                type: "PreSaleNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(360deg,rgba(19,181,184,1) 0%,rgba(48,221,199,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 0
            }, {
                id: 4,
                status: 8,
                name: "无需摇号",
                iconType: "text",
                type: "NoNeedYaoHaoNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(180deg,rgba(2,170,237,1) 0%,rgba(0,155,237,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 0
            }, {
                id: 5,
                status: 2,
                name: "即将认筹",
                iconType: "text",
                iconSrc: "",
                type: "PublicityNumber",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(180deg,rgba(251,127,128,1) 0%,rgba(241,91,96,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 1
            }, {
                id: 6,
                status: 3,
                name: "正在认筹",
                iconType: "text",
                type: "RegisterNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(360deg,rgba(252,174,81,1) 0%,rgba(254,186,65,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 1
            }, {
                id: 7,
                status: 5,
                name: "即将摇号",
                iconType: "text",
                type: "WaitingLotteryNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(360deg,rgba(254,96,15,1) 0%,rgba(254,132,69,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 1
            }, {
                id: 8,
                status: 0,
                name: "即将预售",
                iconType: "text",
                type: "PreSaleNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(360deg,rgba(19,181,184,1) 0%,rgba(48,221,199,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 1
            }, {
                id: 10,
                status: 8,
                name: "无需摇号",
                iconType: "text",
                type: "NoNeedYaoHaoNumber",
                iconSrc: "",
                iconText: "0",
                iconTextColor: "#fff",
                iconBg: "linear-gradient(180deg,rgba(2,170,237,1) 0%,rgba(0,155,237,1) 100%)",
                pageUrl: "/pages/list/list",
                needAuthorization: !0,
                versionType: 1
            } ];
            return i = i.filter(function(e) {
                return e.versionType === t;
            });
        }
    },
    initModuleNavList: function(e) {
        var t = [ {
            id: 0,
            name: "地铁找房",
            type: "subway",
            iconSrc: "home_icon_metro",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/ext_features/map_subway/map_subway",
            versionType: "01"
        }, {
            id: 1,
            name: "摇号查询",
            type: "queryLottery",
            iconSrc: "home_icon_query",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/ext_features/lottery_latest/lottery_latest",
            versionType: "0"
        }, {
            id: 2,
            name: "直接登记",
            type: "register",
            iconSrc: "home_icon_djb",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/pages/list/list",
            versionType: "0"
        }, {
            id: 3,
            name: "资格查询",
            type: "queryQualification",
            iconSrc: "home_icon_qualifications",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/h5_webview/webview/webview",
            versionType: "0"
        }, {
            id: 4,
            name: "地图找房",
            type: "map",
            iconSrc: "home_icon_mapsearch",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/ext_features/map/map",
            versionType: "012"
        }, {
            id: 5,
            name: "贷款计算",
            type: "load",
            iconSrc: "home_icon_calculator",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/h5_webview/loan_select/loan_select",
            versionType: "012"
        }, {
            id: 6,
            name: "买房问答",
            type: "qa",
            iconSrc: "home_icon_qa",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/pages/market/market",
            versionType: "012"
        }, {
            id: 7,
            name: "团购入群",
            type: "joinFamily",
            iconSrc: "home_icon_group",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/pck_my/duplicate_code/duplicate_code",
            versionType: "02"
        }, {
            id: 8,
            name: "楼市文章",
            type: "marketArticle",
            iconSrc: "home_icon_article",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/pages/market/market",
            versionType: "0"
        }, {
            id: 9,
            name: "新手买房",
            type: "firstBuyBuilding",
            iconSrc: "home_icon_guide",
            iconSize: "mini",
            needAuthorization: !1,
            pageUrl: "/h5_webview/knowledge/knowledge",
            versionType: "012"
        } ];
        if (e && 0 !== e.VersionType && (t = t.filter(function(t) {
            return t.versionType.includes("" + e.VersionType);
        })), t && t.map(function(e, t) {
            e.id = t;
        }), e && (2 === e.VersionType || 1 === e.VersionType)) {
            var i = [];
            switch (e.VersionType) {
              case 1:
                i = [ "subway", "map", "qa", "firstBuyBuilding", "load" ];
                break;

              case 2:
                i = [ "map", "qa", "firstBuyBuilding", "joinFamily", "load" ];
            }
            t.forEach(function(e, t) {
                i[i.findIndex(function(t) {
                    return t === e.type;
                })] = e;
            }), t = i;
        }
        return t;
    },
    initBuildingStatsList: function() {
        return [ {
            id: 0,
            iconTextColor: "#FD9B2A",
            iconBg: "linear-gradient(360deg,rgba(253,154,41,1) 0%,rgba(255,197,92,1) 100%)",
            versionType: 2,
            isExpired: !1
        }, {
            id: 1,
            iconTextColor: "#009CED",
            iconBg: "linear-gradient(180deg,rgba(2,170,237,1) 0%,rgba(0,155,237,1) 100%)",
            versionType: 2,
            isExpired: !1
        }, {
            id: 2,
            iconTextColor: "#14B5B8",
            iconBg: "linear-gradient(360deg,rgba(19,181,184,1) 0%,rgba(48,221,199,1) 100%)",
            versionType: 2,
            isExpired: !1
        }, {
            id: 3,
            iconTextColor: "#D8B1A3",
            iconBg: "linear-gradient(180deg,rgba(240,188,175,1) 0%,rgba(216,177,163,1) 100%)",
            versionType: 2,
            isExpired: !1
        }, {
            id: 4,
            iconTextColor: "#FF8277",
            iconBg: "linear-gradient(360deg,rgba(255,130,119,1) 0%,rgba(255,165,142,1) 100%)",
            versionType: 2,
            isExpired: !1
        }, {
            id: 5,
            iconTextColor: "#8B96FB",
            iconBg: "linear-gradient(360deg,rgba(154,72,109,1) 0%,rgba(198,116,157,1) 100%)",
            versionType: 2,
            isExpired: !1
        } ];
    },
    formBuildingList: function(e) {
        var t = this;
        return e.map(function(e, i) {
            return e.idx = i, e.buildingInfo = a.formatBuildingInfo(e, t.data.cityInfo), e.eventTrackStatus = 0, 
            e;
        });
    },
    formatBannerList: function(e) {
        return e.map(function(e, t) {
            return e.eventTrackStatus = 0 === t ? 1 : 0, e.idx = t, e.ImageUrl = a.formatOSSLink(e.ImageUrl, "image/format,webp"), 
            e;
        });
    },
    formatArticleList: function(e) {
        return e.map(function(e, t) {
            return e.eventTrackStatus = 0, e.articleInfo = {
                coverStyle: 1,
                idx: t,
                id: e.ArticleId,
                coverFileUrl: a.formatOSSLink(e.ImageUrl, "image/format,webp/resize,w_375"),
                title: e.Title,
                covers: [],
                logoUrl: a.formatUrl(e.MediumLogoUrl),
                mediumName: e.MediumName,
                publishTime: a.formatArticleTime(e.PublishTime)
            }, e;
        });
    },
    resolveAdInfo: function(t) {
        var i = [], n = wx.getStorageSync("adInfo") || null;
        if (t && t.length) {
            var r = this.formatAdList(t), o = new Date().setHours(0, 0, 0, 0);
            if (n) if (n && !n.lastTime) i = this.randomSortAdList(r); else if (n && n.lastTime && n.lastTime < o) i = this.randomSortAdList(r); else {
                var s = this.diffAdList(n.adList, r) || [];
                i = s && s.length ? [].concat(e(i), e(s)) : n.adList || [];
            } else i = this.randomSortAdList(r);
        } else if (n) try {
            wx.removeStorageSync("adInfo");
        } catch (e) {
            console.error("暂无广告数据,清空本地缓存时失败: ", e);
        }
        var c = -1, l = i.filter(function(e, t) {
            return !e.isActived && !e.isExpired && c < 0 && (c = t), !e.isActived && !e.isExpired;
        })[0] || null;
        l && (this.setData({
            adVisible: !0,
            topActivity: l
        }), i[c].isActived = !0, a.recordAdvertScan({
            AdvertIds: [ l.Id ]
        }), wx.setStorageSync("adInfo", {
            lastTime: new Date().getTime(),
            adList: i
        }));
    },
    triggerScanEventTrack: function() {
        var e = this, t = this.selectComponent("#swiperBanner"), i = [];
        (t && t.data.bannerList || []).forEach(function(e) {
            1 === e.eventTrackStatus && (i.push(e.Id), e.eventTrackStatus = 2);
        });
        var n = [];
        (this.data.articleList || []).forEach(function(e) {
            1 === e.eventTrackStatus && (n.push(e.Id), e.eventTrackStatus = 2);
        });
        var r = [];
        [ "hotBuildingList", "rigidDemandBuildingList", "lowPriceBuildingList" ].forEach(function(t) {
            var i = e.selectComponent("#" + t);
            (i && i.data._buildingList || []).forEach(function(e, t) {
                1 === e.eventTrackStatus && (r.push(e.Id), e.eventTrackStatus = 2);
            });
        });
        var o = [];
        (this.data.brokerList || []).forEach(function(e) {
            1 === e.eventTrackStatus && (o.push(e.Id), e.eventTrackStatus = 2);
        });
        var s = [];
        (this.data.headlineArticles || []).forEach(function(e) {
            1 === e.eventTrackStatus && (s.push(e.Id), e.eventTrackStatus = 2);
        });
        var c = this.selectComponent("#buildingTab"), l = [];
        (c && c.data.buildingList || []).forEach(function(e) {
            e.forEach(function(e) {
                e.id && 1 === e.eventTrackStatus && (e.eventTrackStatus = 2, l.push(e.id));
            });
        });
        var u = [].concat(i, n, r, o, s, l);
        u.length && a.recordAdvertScan({
            AdvertIds: u
        });
    },
    closeNewGuide: function() {
        this.setNewGuideFlag(), this.setData({
            newGuideFlag: !1
        }), wx.showTabBar();
    },
    showNewGuide: function() {
        0 === this.data.cityInfo.VersionType && (wx.getStorageSync("newGuideFlag") || "" || (wx.hideTabBar(), 
        this.setData({
            newGuideFlag: !0
        })));
    },
    setNewGuideFlag: function(e) {
        wx.setStorage({
            key: "newGuideFlag",
            data: {
                closeTime: Date.now(),
                flag: !1
            }
        });
    },
    noTouch: function() {},
    onReachBottom: function() {
        c && c.toLowerLoadMore();
    }
});