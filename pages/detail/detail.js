function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
        return i;
    }
    return Array.from(t);
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
}, a = require("../../config.js"), r = require("../../utils/index.js"), n = require("../../options/page.js").pageList, o = require("../../utils/getter/index.js"), s = require("../../utils/plugins/michat.js"), l = getApp(), c = null;

Component({
    data: {
        isShare: 0,
        cityInfo: null,
        itsMe: !1,
        fromBroker: 1,
        isFromShareBroker: 0,
        userInfo: null,
        scene: null,
        brokerCode: null,
        project: {},
        navH: 0,
        isRecommend: 0,
        sourceType: 0,
        bannerId: "",
        imgsPathInfo: null,
        recommendBrokerList: null,
        buildingsAroundNavList: [],
        buildingsAroundList: [],
        buildingsAround: [],
        building: null,
        buildingsAsPrice: [],
        otherBuildingTabIndex: 1,
        curSubscribeType: null,
        maskVisibility: !1,
        lat: null,
        lng: null,
        refresh: !1,
        authorizing: !1,
        sourceText: "",
        scanDepth: "未深入浏览",
        intersectionList: [ {
            node: ".detail__news",
            name: "楼盘快讯"
        }, {
            node: ".detail__apartment",
            name: "户型"
        }, {
            node: ".detail__surroundings",
            name: "周边配套"
        }, {
            node: ".detail__consulatant",
            name: "置业顾问"
        }, {
            node: ".detail__comments",
            name: "用户评论"
        }, {
            node: ".detail__winning",
            name: "中签趋势"
        }, {
            node: ".other-buildings-surroundings",
            name: "推荐楼盘"
        } ],
        buildingArticleInfo: null,
        recentlyProjectInfo: null,
        buildingCommentInfo: null,
        registerLinkList: [],
        registerMaskVisible: !1,
        brokerMaskVisibility: !1,
        brokerConcat: null,
        shareCardVisible: !1,
        extensionNumber: "",
        template: "",
        showLotteryTip: !0,
        uploadBuildingInfoDialog: {
            showUploadBuildingInfoDialog: !1,
            uploadTabList: []
        },
        slideInOrOut: null,
        bottomBtnInfo: null,
        activedProjectInfo: "",
        moduleNavList: null,
        isClickTopTabBar: !1,
        topTabBarOpacity: 0,
        topTabBarList: [],
        showSubscribeDialog: !1,
        subscribeDialog: {
            phone: "",
            usingOtherPhone: !1
        },
        useOtherPhone: !1,
        showLotteryDialog: !1,
        showCountDownInfo: !1,
        countDownList: [],
        buildingNoList: [],
        isCounting: !0,
        countDownTimerIdList: [],
        scrollTop: 0,
        currentSlideNumber: 1,
        currentTop: 0,
        scrollIntoView: "",
        computedNavScrollTopFlag: !1,
        backTopFlag: !1,
        lotteryMaskVisible: !1,
        playIconShow: !0,
        replayCommentParams: {
            placeholder: "",
            commentId: "",
            parentId: "",
            unionId: "",
            commentType: "reply"
        },
        subscribeRemind: !1
    },
    methods: {
        onLoad: function(t) {
            var e = this, i = this.data, a = t.scene ? 1 : parseInt(t.isShare) || 0, n = t.sourceOpenid ? t.sourceOpenid : "", s = t.buildingCode ? t.buildingCode : "";
            this.initNodeAnchorType(), this.setData({
                isShare: a,
                fromBroker: t.fromBroker ? parseInt(t.fromBroker) : 0,
                sourceOpenid: n,
                buildingCode: s,
                isRecommend: t.isRecommend ? parseInt(t.isRecommend) : 0,
                sourceType: t.sourceType ? parseInt(t.sourceType) : 0,
                brokerCode: t.brokerCode || null,
                scene: t.scene ? decodeURIComponent(t.scene) : null,
                refresh: !!t.refresh,
                buildingId: t.buildingId || null,
                projectId: t.projectId || null,
                template: t.template || ""
            }), l.checkSession(function() {
                var a = l.globalData, n = a.userInfo, s = a.isIpx, c = a.navH, u = a.cityInfo, d = a.imgsPathInfo;
                e.setData({
                    userInfo: n,
                    isIpx: s,
                    navH: c,
                    cityInfo: u,
                    imgsPathInfo: d
                }), wx.nextTick(function() {
                    r.observe(l.globalData, "userInfo", function() {
                        e.setData({
                            userInfo: l.globalData.userInfo
                        });
                    });
                }), e.getProjectDetail().then(function(t) {
                    var a = i.scene && i.scene.split("$");
                    if (a && "register" === a[1]) {
                        var n = i.project.BuildingProjectList[0];
                        wx.navigateTo({
                            url: "/h5_webview/register_webview/register_webview?url=" + encodeURIComponent(n.RegisterAddress)
                        });
                    } else a && 2 === a.length && e.setData({
                        brokerCode: a[1]
                    });
                    i.scene && e.scancodeTrack("pages/detail/detail?scene=" + i.scene);
                    var s = !1;
                    i.userInfo.RealtyConsultantInfo && (s = o.judgeBuildingBelongConsultant(i.project.BuildingId)), 
                    s && e.initUploadTabList(), e.setData({
                        itsMe: s
                    }), Promise.all([ e.getRecommendBrokers(), e.getCommentsListTop(), e.getBuildingHouseType(), e.getFacilityCount(), e.getBuildingArticles(), 0 === t.VersionType && e.getRecentlyProject() ]).then(function() {
                        var i = e.getBottomBtnType();
                        e.setData({
                            bottomBtnInfo: i
                        }), setTimeout(function() {
                            var i = e.initTopTabBarList(t);
                            e.setData({
                                moduleNavList: i
                            }, function() {
                                setTimeout(function() {
                                    e.computedNavScrollTop(i);
                                }, 300);
                            });
                        }, 300);
                    }), e.scanRecordInit(), e.hasCountDown(), i.isShare && i.sourceOpenid && r.recordByAld("楼盘分享到达数", {
                        "楼盘ID": e.data.project.BuildingId,
                        "分享人ID": e.data.sourceOpenid
                    }), !e.data.project.AddressImageUrl && e.getStaticMapImage(), e.obserLoadRe();
                });
                var g = getCurrentPages(), p = g[g.length - 2];
                p && ("pages/detail/detail" === p.route ? (p.scanRecord(), p.setData({
                    initRecord: !0
                })) : "pages/broker/broker" === p.route && e.setData({
                    isFromShareBroker: 1,
                    isShare: 1
                })), t.brokerShortCode && r.recordShareVisit(t.brokerShortCode, g[g.length - 1].route + r.serializationUrlParams(t)), 
                e.data.template && r.recordTemplateVisit(l.globalData.userInfo.OpenId, e.data.template);
            }, r.getShareParams(t));
        },
        onShow: function() {
            var t = this.data;
            t.refresh && this.getCommentsListTop(), t.initRecord && this.scanRecordInit();
        },
        onHide: function() {
            this.scanRecord(), this.triggerScanEventTrack();
        },
        onShareAppMessage: function() {
            return r.extractShareFn({
                util: r,
                app: l
            });
        },
        onUnload: function() {
            this.data.countDownTimerIdList.forEach(function(t) {
                clearInterval(t);
            }), this.setData({
                isCounting: !1
            });
        },
        initNodeAnchorType: function() {
            this.setData({
                nodeAnchorType: {
                    houseTypeList: !1,
                    facilityCount: !1,
                    buildingCommentInfo: !1,
                    buildingArticleInfo: !1,
                    recentlyProjectInfo: !1,
                    buildingsAround: !1
                }
            });
        },
        obserLoadRe: function() {
            var t = this;
            wx.createIntersectionObserver(this, {
                observeAll: !0
            }).relativeToViewport({
                bottom: 200
            }).observe(".node-anchor", function(i) {
                var a = i.dataset.type;
                if (!t.data.nodeAnchorType[a]) {
                    t.setData(e({}, "nodeAnchorType." + a, !0));
                    var r = {
                        buildingsAround: function() {
                            t.getBuildingsAround();
                            var e = t.data.project, i = e.AveragePrice, a = e.HistoricalAveragePrice;
                            (i > 0 || a > 0) && t.getBuildingsAsPrice();
                        }
                    };
                    r[a] && r[a]();
                }
            });
        },
        goTop: function(t) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            });
        },
        openListeningArticleList: function() {
            var t = this, e = this.data.project && this.data.project.BuildingId, i = this.data.userInfo;
            i && i.OpenId && e && wx.createIntersectionObserver(this, {
                observeAll: !0,
                thresholds: [ 1 ],
                initialRatio: 1
            }).relativeToViewport({
                top: 0,
                left: 0
            }).observe("#item_article_record", function(e) {
                if (1 === e.intersectionRatio) {
                    var i = e.dataset, a = (t.data.buildingArticleInfo.buildingArticles || [])[i.idx];
                    a && 0 === a.eventTrackStatus && (a.eventTrackStatus = 1);
                }
            });
        },
        scanRecordInit: function() {
            var t = getCurrentPages(), e = t.length > 1 ? t[t.length - 2] : t[t.length - 1], i = "";
            if (this.data.isShare) i = "楼盘分享链接"; else if (e.data.status > -1) i = 6 == e.data.status ? "近期开盘列表" : "状态分类列表"; else {
                var a = n.find(function(t) {
                    return t.pathName == e.route;
                });
                i = a ? a.name : "其他";
            }
            this.setData({
                sourceText: i
            });
        },
        scanRecord: function() {
            r.recordByAld("详情页浏览量", {
                "楼盘ID": this.data.project.BuildingId,
                "访问来源": this.data.sourceText,
                "浏览深度": this.data.scanDepth
            });
        },
        getProjectDetail: function() {
            var t = this, e = "", n = this.data.scene;
            if (n) switch ((n = n.split("$")).length) {
              case 1:
              case 2:
                e = a.service.getProjectDetailByBuildingCodeInBld.replace("{buildingCode}", n[0]);
                break;

              case 3:
                "Project" === n[2] ? e = a.service.getProjectDetailByProjectCodeInBld.replace("{buildingCode}", n[0]).replace("{projectCode}", n[1]) : n[2].includes("AD") && (e = a.service.getProjectDetailByBuildingCodeInBld.replace("{buildingCode}", n[0]));
                break;

              case 4:
                n[2].includes("AD") && (e = a.service.getProjectDetailByBuildingCodeInBld.replace("{buildingCode}", n[0]));
            } else e = this.data.buildingCode ? a.service.getProjectDetailByBuildingCodeInBld.replace("{buildingCode}", this.data.buildingCode) : a.service.getBuildingDetailInBld.replace("{buildingId}", this.data.buildingId);
            var o = null;
            return this.data.projectId && (o = {
                projectId: this.data.projectId
            }), r.request({
                url: e,
                data: i({}, o),
                loading: !0
            }).then(function(e) {
                if (e) {
                    var i = t.formatProject(e);
                    t.setData({
                        project: i,
                        buildingId: e.BuildingId
                    }, function() {
                        setTimeout(function() {
                            t.getVideo();
                        }, 200);
                    });
                }
                return e;
            }).catch(function(t) {
                console.error("获取项目详情时失败: ", t);
            });
        },
        getRecommendBrokers: function() {
            var t = this, e = {}, i = this.data.scene, n = this.data.buildingId;
            if (this.data.isShare && this.data.brokerCode ? e.consultantCode = this.data.brokerCode : i && 2 === (i = i.split(",")).length && "register" !== i[1] && (e.consultantCode = i[1]), 
            n) return r.request({
                url: a.service.getDetailBrokerListInMem.replace("{buildingId}", n),
                data: e
            }).then(function(e) {
                if (e && e.ConsultantList && e.ConsultantList.length) {
                    e.ConsultantList = t.formatBrokerList(e.ConsultantList);
                    var i = t.formatBrokerList(e.ConsultantList);
                    t.setData({
                        brokerList: i
                    });
                }
                if (e.ConsultantList.length > 0) if (e.IsBoundConsultant) {
                    var a = {
                        Name: e.ConsultantList[0].Name,
                        PersonalImageUrl: e.ConsultantList[0].PersonalImageUrl,
                        PhoneNumber: e.PhoneNumber,
                        ExtensionNumber: e.PhoneNumber.indexOf(",") > -1 ? e.PhoneNumber.split(",")[1] : ""
                    };
                    t.setData({
                        brokerConcat: a
                    });
                } else t.setData({
                    brokerConcat: null
                });
                t.setData({
                    recommendBrokerList: e
                });
            });
        },
        getBuildingsAround: function() {
            var e = this, i = this.data.project, n = i.BuildingId, o = i.CityId;
            if (o && n) return r.request({
                url: a.service.getBuildingsAroundInBld.replace("{buildingId}", n),
                data: {
                    pageNo: 1,
                    limit: 20
                },
                headerParam: {
                    cityId: o
                }
            }).then(function(i) {
                if (i && i.length) {
                    var a = e.formatBuildingList(i), r = e.initBuildingsAroundNavList(), n = [].concat(t(a));
                    e.setData({
                        buildingsAround: a,
                        buildingsAroundNavList: r,
                        buildingsAroundList: n
                    });
                }
            });
        },
        getBuildingHouseType: function() {
            var t = this, e = this.data, i = (e.showAsProject, e.projectId), n = this.data.project.BuildingId;
            if (n) return r.request({
                url: a.service.getHouseTypesInBld.replace("{buildingId}", n),
                data: {
                    projectId: i || ""
                }
            }).then(function(e) {
                t.setData({
                    houseTypeList: t.formatHouseTypeList(e),
                    "project.houseAreaDuration": t.formatHouseAreaDuration(e.HouseTypes)
                });
            });
        },
        getRecentlyProject: function() {
            var t = this, e = this.data.project.BuildingId;
            e && r.request({
                url: a.service.getRecentlyProjectInBld.replace("{buildingId}", e)
            }).then(function(e) {
                var a = null;
                e ? (e.HouseArea = e.HouseArea ? e.HouseArea.replace(/,/g, "，") : "--", (a = {
                    totalCount: e.ProjectCount ? e.ProjectCount : 0,
                    recentlyProjectList: [ i({}, e) ]
                }).recentlyProjectList.forEach(function(t) {
                    var e = [];
                    t.HouseNumber && e.push("房源套数: " + t.HouseNumber), t.HouseNumber && e.push("登记: " + t.RegistrationNumber + "人"), 
                    t.HouseNumber && e.push("综合中签率: " + t.SuccessRate + "%"), t.tableData = e;
                })) : a = {
                    totalCount: 0,
                    recentlyProjectList: []
                }, t.setData({
                    recentlyProjectInfo: a
                });
            }).catch(function(t) {});
        },
        getCommentsListTop: function() {
            var t = this, e = this.data.project.BuildingId;
            if (e) return r.request({
                url: a.service.getCommentsListTopInCmt.replace("{buildingId}", e)
            }).then(function(e) {
                var i = e.Comments, a = e.TotalCount, r = e.LimitCount, n = e.TodayCount, o = e.TodayReplyCount, s = e.ReplyLimitCount;
                l.globalData.commentRestriction = {
                    LimitCount: r,
                    TodayCount: n,
                    TodayReplyCount: o,
                    ReplyLimitCount: s
                };
                var c = null;
                if (a) {
                    (c = {
                        totalCount: i && i.length > 3 ? a - 3 : a - i.length,
                        allTotalCount: a
                    }).buildingCommentList = t.formatCommentList(i);
                } else c = {
                    totalCount: 0,
                    buildingCommentList: []
                };
                t.setData({
                    buildingCommentInfo: c
                });
            });
        },
        getBuildingsAsPrice: function() {
            var t = this, e = this.data.project.BuildingProjectList && this.data.project.BuildingProjectList.length > 0 && this.data.project.BuildingProjectList[0].ProjectId, i = this.data.project.CityId;
            if (e && i) return r.request({
                url: a.service.getBuildingsAsPriceInBld.replace("{projectId}", e),
                data: {
                    pageNo: 1,
                    limit: 20
                },
                headerParam: {
                    cityId: i
                }
            }).then(function(e) {
                if (e && e.length) {
                    var i = t.formatBuildingList(e), a = t.initBuildingsAroundNavList();
                    t.setData({
                        buildingsAroundNavList: a,
                        buildingsAsPrice: i
                    });
                }
            });
        },
        getBuildingArticles: function() {
            var t = this, e = this.data.project.BuildingId;
            if (e) return r.request({
                url: a.service.getBuildingArticlesInBld.replace("{buildingId}", e).replace("{userSystem}", "weixin")
            }).then(function(e) {
                if (e && e.NewestArticle) {
                    var i = {
                        totalCount: e.TotalCount ? e.TotalCount : 0,
                        buildingArticles: [ e.NewestArticle ]
                    };
                    i.buildingArticles.forEach(function(t, e) {
                        t.eventTrackStatus = 0, t.articleInfo = {
                            coverStyle: 1,
                            idx: e,
                            id: t.Id,
                            coverFileUrl: r.formatOSSLink(t.CoverFileUrl, "image/format,webp/resize,w_375"),
                            title: t.Title,
                            covers: [],
                            logoUrl: r.formatUrl(t.MediumLogoUrl),
                            mediumName: t.MediumName,
                            publishTime: r.formatTimeToTill(t.PublishTime),
                            canTriggerEventTrack: 0
                        };
                    }), t.setData({
                        buildingArticleInfo: i
                    }, function() {
                        t.openListeningArticleList();
                    });
                }
            });
        },
        getFacilityCount: function() {
            var t = this, e = this.data.project.BuildingId;
            if (e) return r.request({
                url: a.service.getFacilityCountInBld.replace("{buildingId}", e)
            }).then(function(e) {
                e.forEach(function(e) {
                    e.icon = t.formatFacilityIcon(e.FacilityType), e.name = t.formatFacilityName(e.FacilityType);
                }), t.setData({
                    facilityCount: e
                });
            });
        },
        goDetailImgsPage: function() {
            this.recordUserDetailScanInfo({
                eventKey: "PhotoAlbum"
            }), r.recordByAld("更多相册浏览量", {
                "楼盘ID": this.data.project.BuildingId
            });
            var t = "/pck_building/detail_imgs/index";
            t += "?buildingId=" + this.data.project.BuildingId + "&buildingName=" + this.data.project.BuildingName, 
            r.navigatePage({
                url: t
            });
        },
        goDetailInfoPage: function() {
            var t = this.data.project;
            this.recordUserDetailScanInfo({
                eventKey: "BasicDetail"
            }), r.recordByAld("更多详情浏览量", {
                "楼盘ID": t.BuildingId
            });
            var e = "/pck_building/detail_info/detail_info?buildingId=" + t.BuildingId;
            r.navigatePage({
                url: e
            });
        },
        toggleProjectTab: function(t) {
            var a = this.data.project.BuildingProjectList, r = t.detail || null;
            if (r) {
                var n, o = null, s = r.index, l = "";
                if ((o = a.filter(function(t, e) {
                    return t.isActived && (l = e), t.tabId === r.id;
                })[0] || null) && o.isActived) return;
                var c = this.formatSubscribeBtnInfo(this.data.project, s);
                this.setData((n = {}, e(n, "project.BuildingProjectList[" + s + "].isActived", !0), 
                e(n, "project.BuildingProjectList[" + l + "].isActived", !1), e(n, "activedProjectInfo", i({}, o)), 
                e(n, "project.subscribtBtnInfo", c), n)), this.hasCountDown();
            }
        },
        goDetailNewsListPage: function() {
            r.recordByAld("更多快讯点击量", {
                "楼盘ID": this.data.project.BuildingId
            });
            var t = "/pck_building/detail_newsList/detail_newsList";
            t += "?buildingId=" + this.data.project.BuildingId + "&buildingName=" + this.data.project.BuildingName, 
            r.navigatePage({
                url: t
            });
        },
        goBrokerListPage: function(t) {
            var e = "/pck_broker/broker_list/broker_list";
            e += "?buildingId=" + this.data.project.BuildingId, r.navigatePage({
                url: e
            });
        },
        goBrokerCardPage: function(t) {
            this.recordUserDetailScanInfo({
                eventKey: "BrokerCard"
            });
            var e = "/pages/broker_card/broker_card";
            e += "?brokerId=" + t.currentTarget.dataset.brokerid, r.navigatePage({
                url: e
            });
        },
        goDetailHouseTypePage: function() {
            var t = this.data.project, e = "";
            t.BuildingProjectList && t.BuildingProjectList.length && (e = t.BuildingProjectList[0].projectId);
            var i = "/pck_building/detail_houseType/detail_houseType";
            i += "?buildingId=" + t.BuildingId + "&buildingName=" + t.BuildingName, e && (i += "&projectId=" + e), 
            r.recordByAld("户型图点击量", {
                "楼盘ID": this.data.project.BuildingId
            }), r.navigatePage({
                url: i
            });
        },
        goHouseDetailPage: function(t) {
            var e = t.currentTarget.dataset, i = e.index, a = e.id, n = this.data.project.BuildingProjectList[0] ? this.data.project.BuildingProjectList[0].ProjectId : "";
            r.recordHosueTypeClick({
                houseTypeId: a
            });
            var o = "/pck_building/house_detail/house_detail";
            o += "?buildingId=" + this.data.buildingId + "&index=" + i + "&showAsProject=" + this.data.showAsProject + "&projectId=" + n, 
            r.navigatePage({
                url: o
            });
        },
        goDetailArticleListPage: function() {
            var t = "/pck_building/detail_articleList/detail_articleList?buildingId=" + this.data.project.BuildingId;
            r.navigatePage({
                url: t
            });
        },
        goCommentListPage: function() {
            r.recordByAld("更多评论点击量", {
                "楼盘ID": this.data.project.BuildingId
            });
            var t = "/pck_building/detail_commentList/detail_commentList";
            t += "?buildingId=" + this.data.project.BuildingId + "&buildingName=" + this.data.project.BuildingName, 
            r.navigatePage({
                url: t
            });
        },
        goCommentPage: function() {
            r.recordByAld("发布评论点击量", {
                "楼盘ID": this.data.project.BuildingId
            });
            var t = "/pck_building/detail_comment/detail_comment";
            t += "?buildingId=" + this.data.buildingId + "&buildingName=" + this.data.project.BuildingName, 
            r.navigatePage({
                url: t
            });
        },
        goDetailHistoryPage: function() {
            var t = this.data.project, e = "/pck_building/detail_history/detail_history";
            e += "?buildingId=" + t.BuildingId + "&buildingName=" + t.BuildingName + "&districtName=" + t.DistrictName, 
            r.navigatePage({
                url: e
            });
        },
        goDetailSurroundingPage: function() {
            var t = this.data.project;
            r.recordByAld("周边配套浏览量", {
                "楼盘ID": t.BuildingId
            });
            var e = "/pck_building/detail_surrounding/detail_surrounding";
            e += "?buildingId=" + t.BuildingId + "&lat=" + t.Latitude + "&lng=" + t.Longitude + "&name=" + t.BuildingName, 
            r.navigatePage({
                url: e
            });
        },
        goChat: function(t) {
            var e = t.currentTarget.dataset, i = e.id;
            e.brokerId;
            if (i !== l.globalData.userInfo.UnionId) {
                r.recordUserDetailScanInfo({
                    buildingId: this.data.project.BuildingId,
                    EventKey: "Chat"
                });
                var a = "/pck_chat/chat/chat?unionId=" + i + "&chatSourceType=2";
                r.navigatePage({
                    url: a
                });
            } else r.wxToast("不能给自己发消息");
        },
        checkSurrounding: function(t) {
            var e = this.data.project, i = t.currentTarget.dataset.index || "", a = "/pck_building/detail_surrounding/detail_surrounding";
            a += "?buildingId=" + e.BuildingId + "&lat=" + e.Latitude + "&lng=" + e.Longitude + "&name=" + e.BuildingName + "&index=" + i, 
            r.recordByAld("周边配套浏览量", {
                "楼盘ID": e.BuildingId
            }), r.navigatePage({
                url: a
            });
        },
        copyServiceWx: function() {
            r.promisify(wx.setClipboardData)({
                data: this.data.cityInfo.OfficialWechat
            }).then(function() {
                wx.showModal({
                    title: "提示",
                    content: "已复制客服微信\r\n快去添加好友 进群讨论吧",
                    showCancel: !1,
                    success: function(t) {}
                });
            });
        },
        addressImageUrlError: function() {
            this.setData(e({}, "project.AddressImageUrl", null));
        },
        toggleBuildingAroundsNav: function(t) {
            var e = this, i = t.currentTarget.dataset || null;
            if (i) {
                var a = this.data.buildingsAroundNavList;
                if (a[i.id].isActived) return;
                var r = [];
                a.forEach(function(t) {
                    t.isActived = t.id === i.id, t.isActived && (r = e.data[t.type]);
                }), this.setData({
                    buildingsAroundNavList: a,
                    buildingsAroundList: r
                });
            }
        },
        clickCenterBtn: function() {
            var t = this.data.bottomBtnInfo.center || null;
            if (t) {
                if ("onlineChat" === t.type) {
                    if (this.data.itsMe) return void r.wxToast("不能给自己发消息");
                    r.recordUserDetailScanInfo({
                        buildingId: this.data.project.BuildingId,
                        EventKey: "Chat"
                    });
                    this.getRandomBrokerConcat("goChatPage");
                }
                "callSalesOffice" === t.type && this.callSalesHotline();
            }
        },
        clickRightBtn: function(t) {
            var e = this.data.bottomBtnInfo.right || null;
            if (e) {
                if ("queryLotteryResult" === e.type && (this.data.lotteryResultList.length > 1 ? this.triggerLotteryMaskVisible() : this.checkLotteryResult(0)), 
                "telephoneConsultation" === e.type) {
                    this.getRandomBrokerConcat("goCall");
                }
                if ("register" === e.type) {
                    var i = this.data.registerLinkList.filter(function(t) {
                        return t.url;
                    }) || [];
                    if (i.length) if (1 === i.length) {
                        var a = "即将去" + this.data.project.BuildingName + i[0].BuildingNo + "登记";
                        r.wxToast(a), this.recordUserDetailScanInfo({
                            eventKey: "Registration"
                        }), r.recordByAld("【意向登记】点击量", {
                            "楼盘ID": this.data.project.BuildingId
                        });
                        var n = this.formatTimeDuration(this.data.activedProjectInfo), o = "/h5_webview/register_webview/register_webview?url=" + encodeURIComponent(i[0].url) + "&buildingName=" + this.data.project.BuildingName + "&durationTime=" + n;
                        setTimeout(function() {
                            wx.navigateTo({
                                url: o
                            });
                        }, 1500);
                    } else i.length > 1 && this.showRegisterList();
                }
                "lotteryTip" === e.type && this.setData({
                    showLotteryDialog: !0
                }), "subscription" === e.type && this.openLotterySubscribe();
            }
        },
        getRandomBrokerConcat: function(t) {
            var e = this, n = this.data, o = n.brokerCode, s = n.recommendBrokerList, l = n.userInfo;
            if (("goChatPage" === t || "goCall" === t) && o && s && s.IsBoundConsultant) {
                var c = s.ConsultantList[0] || null;
                if (l && l.UnionId && c && c.UnionId == l.UnionId) return void ("goChatPage" === t ? r.wxToast("不能给自己发消息") : r.wxToast("不能给自己打电话"));
                if (c) {
                    if ("goChatPage" === t) wx.navigateTo({
                        url: "/pck_chat/chat/chat?unionId=" + c.UnionId + "&chatSourceType=3"
                    }); else {
                        var u = i({}, c);
                        u.PersonalImageUrl = r.formatUrl(u.PersonalImageUrl || ""), u.PhoneNumber = s.PhoneNumber, 
                        this.aloneConsultantCall(u);
                    }
                    return;
                }
            }
            r.request({
                url: a.service.getRandomBrokerConcatInMem.replace("{buildingId}", this.data.project.BuildingId),
                data: {
                    buildingId: this.data.project.BuildingId
                },
                loading: !0
            }).then(function(a) {
                if (a && a.UnionId) {
                    if ("goChatPage" === t) {
                        var n = "/pck_chat/chat/chat?unionId=" + a.UnionId + "&chatSourceType=3";
                        r.navigatePage({
                            url: n
                        });
                    }
                    "goCall" === t && (a.PersonalImageUrl = r.formatUrl(a.PersonalImageUrl || ""), e.setData({
                        brokerMaskVisibility: !0,
                        brokerConcat: i({}, a)
                    }));
                }
            });
        },
        aloneConsultantCall: function(t) {
            this.data.brokerCode ? this.callForBroker() : this.setData({
                brokerMaskVisibility: !0,
                brokerConcat: t
            });
        },
        checkLotteryResult: function(t) {
            var e = this.data.project.BuildingProjectList[t], i = e.ProjectId, a = (e.ProjectName, 
            "/pages/lottery/lottery?projectId=" + i + "&coverFileUrl=" + this.data.project.CoverImageUrl + "&projectName=" + this.data.project.BuildingName + "&lotteried=1");
            wx.navigateTo({
                url: a
            }), this.setData({
                showLotteryTip: !1,
                lotteryMaskVisible: !1
            });
        },
        closeLotteryTip: function() {
            this.setData({
                showLotteryTip: !1
            });
        },
        showUploadBuildingInfoDialog: function() {
            var t = this.data.uploadBuildingInfoDialog.showUploadBuildingInfoDialog;
            this.setData({
                "uploadBuildingInfoDialog.showUploadBuildingInfoDialog": !t
            });
        },
        goUploadInfoPage: function(t) {
            var e = this, i = t.currentTarget.dataset || null;
            if (i && i.id) {
                var a = this.data.uploadBuildingInfoDialog.uploadTabList.filter(function(t) {
                    return t.id === i.id;
                })[0] || null;
                if (a) {
                    var r = a.pageUrl;
                    wx.navigateTo({
                        url: r,
                        success: function() {
                            e.showUploadBuildingInfoDialog();
                        },
                        fail: function(t) {
                            console.error("跳转到到上传楼盘资料页面时失败: ", t);
                        }
                    });
                }
            }
        },
        getSubscribePhone: function(t) {
            var e = t.detail.value;
            (e += "").trim() && this.setData({
                "subscribeDialog.phone": e
            });
        },
        toggleSubscribePhoneType: function() {
            this.setData({
                "subscribeDialog.phone": "",
                "subscribeDialog.usingOtherPhone": !0
            });
        },
        operateSubscribeDialog: function(t) {
            var e = t.currentTarget.dataset || null;
            e && ("cancel" === e.type && this.setData({
                showSubscribeDialog: !1
            }), "confirm" === e.type && this.confirmSubscription());
        },
        confirmSubscription: function(t) {
            var e = this.data.userInfo.PhoneNumber || "";
            this.data.subscribeDialog.usingOtherPhone && (e = this.data.subscribeDialog.phone), 
            /^1\d{10}$/.test(e) ? this.buildingSubscription("confirmSubscription", {
                PhoneNumber: e
            }) : r.wxToast("请输入正确的手机号");
        },
        showRegisterList: function() {
            this.setData({
                registerMaskVisible: !0
            });
        },
        closeRegisterList: function() {
            this.setData({
                registerMaskVisible: !1
            });
        },
        goRegister: function(t) {
            if ((t.currentTarget.dataset || {}).url) {
                var e = t.currentTarget.dataset, i = e.url, a = (e.status, e.idx);
                this.recordUserDetailScanInfo({
                    eventKey: "Registration"
                }), r.recordByAld("【意向登记】点击量", {
                    "楼盘ID": this.data.project.BuildingId
                });
                var n = this.data.project.BuildingProjectList[a], o = this.formatTimeDuration(n);
                wx.navigateTo({
                    url: "/h5_webview/register_webview/register_webview?url=" + encodeURIComponent(i) + "&buildingName=" + this.data.project.BuildingName + "&durationTime=" + o
                });
            }
        },
        closeBrokerMask: function() {
            this.setData({
                brokerMaskVisibility: !1
            });
        },
        callForBroker: function() {
            r.callPhone(this.data.brokerConcat.PhoneNumber);
        },
        callSalesHotline: function() {
            this.recordUserDetailScanInfo({
                eventKey: "CallPhone"
            }), r.recordByAld("楼盘详情页拨打电话点击量", {
                "楼盘ID": this.data.project.BuildingId
            });
            var t = this.data.project.SalesHotline;
            this.setData({
                phoneNumber: t.replace(/#/g, "")
            }), this.callForBuilding();
        },
        callForBuilding: function() {
            wx.makePhoneCall({
                phoneNumber: this.data.phoneNumber
            });
        },
        openLotterySubscribe: function(t) {
            this.setData({
                lotteryMaskVisibility: !0
            });
        },
        subscribeLottery: function(t) {
            var e = this, n = {
                BuildingId: this.data.project.BuildingId,
                PhoneNumber: t.PhoneNumber,
                SubscriptionType: 5
            };
            this.data.activedProjectInfo && this.data.activedProjectInfo.ProjectId && (n.ProjectId = this.data.activedProjectInfo.ProjectId), 
            r.request({
                url: a.service.subscribeProjectInFlw,
                data: i({}, n),
                method: "POST",
                loading: !0
            }).then(function(t) {
                t && (e.setData({
                    "project.subscribtBtnInfo.isSubscribed": !0,
                    "project.subscribtBtnInfo.subscribedRecordId": t,
                    "project.subscribtBtnInfo.subscribtStatusText": "已订" + e.data.project.subscribtBtnInfo.subscribtStatusText,
                    showLotteryDialog: !1
                }), wx.showToast({
                    title: "订阅成功"
                }));
            }).catch(function(t) {});
        },
        cancelShare: function() {
            this.setData({
                shareCardVisible: !1
            });
        },
        makePoster: function() {
            l.globalData.buildingToPoster = this.data.project, l.globalData.projectToPoster = this.data.activedProjectInfo, 
            wx.nextTick(function() {
                wx.navigateTo({
                    url: "/pck_poster/building_poster/index"
                });
            }), this.setData({
                shareCardVisible: !1
            });
        },
        operateArticleCardInfo: function(t) {
            var e = t.detail, i = (this.data.buildingArticleInfo && this.data.buildingArticleInfo.buildingArticles || [])[e.articleInfo.idx];
            if ("goDetailPage" === e.eventType) {
                var a = this.data.userInfo;
                a && a.OpenId && r.recordArticleClick({
                    articleId: i.Id,
                    SourceKey: "BuildingRecommend",
                    SourceId: this.data.project.BuildingId
                }), i.LinkUrl || (i.LinkUrl = this.data.imgsPathInfo.rootPath + "/#/pages/article_webview/article_webview?id=" + i.Id);
                var n = "/h5_webview/article_webview/article_webview";
                n += "?url=" + encodeURIComponent(i.LinkUrl) + "&title=" + i.Title + "&id=" + i.Id, 
                r.navigatePage({
                    url: n
                });
            }
        },
        operateBuildingCardInfo: function(t) {
            var e = t.detail;
            if ("goDetailPage" === e.eventType) {
                var a = {
                    buildingsAround: "PeripheryBuildings",
                    buildingsAsPrice: "SamePriceBuildings"
                }[this.data.buildingsAroundNavList.filter(function(t) {
                    return t.isActived;
                })[0].type] || "PeripheryBuildings";
                r.recordBuildingClick(i({
                    buildingId: e.buildingCardInfo.buildingId,
                    SourceKey: a
                }, e.buildingCardInfo.projectId ? {
                    ProjectId: e.buildingCardInfo.projectId
                } : {}));
                var n = this.data.buildingsAroundList;
                if (n && n.length) {
                    var o = n[e.buildingCardInfo.idx] || null;
                    if (o) {
                        var s = this.data.fromBroker, l = this.data.showAsProject, c = "/pages/detail/detail";
                        c += "?buildingId=" + o.BuildingId + "&fromBroker=" + s + "&showAsProject=" + l, 
                        o.projectId && (c += "&projectId=" + o.projectId), o.IsRecommend && (c += "&isRecommend=1"), 
                        getCurrentPages().length >= 5 ? r.navigatePage({
                            url: c,
                            goType: "redirectTo"
                        }) : r.navigatePage({
                            url: c
                        });
                    }
                }
            }
        },
        operateTopTabBarInfo: function(t) {
            var i = this, a = t.detail;
            if (a.topTabBarInfo.eventKey && r.recordUserDetailScanInfo({
                buildingId: this.data.project.BuildingId,
                EventKey: a.topTabBarInfo.eventKey
            }), a && a.topTabBarInfo) {
                var n = -1, o = -1;
                if (this.data.topTabBarList.forEach(function(t, e) {
                    t.id === a.topTabBarInfo.id && (n = e), t.isActived && (o = e);
                }), -1 !== o && -1 !== n) {
                    var s, l = "topTabBarList[" + n + "].isActived", c = "topTabBarList[" + o + "].isActived";
                    this.setData((s = {
                        isClickTopTabBar: !0
                    }, e(s, l, !0), e(s, c, !1), s));
                } else this.setData({
                    isClickTopTabBar: !1
                });
                a.topTabBarInfo.top ? wx.pageScrollTo({
                    scrollTop: a.topTabBarInfo.top,
                    fail: function(t) {},
                    success: function(t) {
                        i.setData({
                            isClickTopTabBar: !1
                        });
                    }
                }) : wx.pageScrollTo({
                    selector: a.topTabBarInfo.selector,
                    fail: function(t) {},
                    success: function(t) {
                        i.setData({
                            isClickTopTabBar: !1
                        });
                    }
                });
            }
        },
        operateSubscribe: function(t) {
            var e = t.detail || null;
            if (e && ("cancel" === e.eventType && this.setData({
                showLotteryDialog: !1
            }), "confirm" === e.eventType)) {
                var i = e.lotteryRegisterDialog, a = {};
                2 === i.usingPhoneType ? a.PhoneNumber = i.wxPhone : a.PhoneNumber = i.otherPhone, 
                this.subscribeLottery(a);
            }
        },
        showMultiShare: function() {
            this.setData({
                shareCardVisible: !0
            });
        },
        initUploadTabList: function() {
            var t = this.data.imgsPathInfo.rootPath, e = [ {
                id: 1,
                title: "发布快讯",
                iconUrl: t + "/images_wx/detail/uploaddata_icon_kx.png",
                pageType: "update_news",
                pageUrl: "/pck_broker/update_news/update_news?buildingId=" + this.data.buildingId
            }, {
                id: 2,
                title: "上传户型图",
                iconUrl: t + "/images_wx/detail/uploaddata_icon_hx.png",
                pageType: "upload_hosetype_imgs",
                pageUrl: "/pck_broker/upload_hosetype_imgs/upload_hosetype_imgs?buildingId=" + this.data.buildingId
            }, {
                id: 3,
                title: "上传楼盘图",
                iconUrl: t + "/images_wx/detail/uploaddata_icon_lptp.png",
                pageType: "upload_building_imgs",
                pageUrl: "/pck_broker/upload_building_imgs/upload_building_imgs?buildingId=" + this.data.buildingId
            } ];
            this.setData({
                "uploadBuildingInfoDialog.uploadTabList": e
            });
        },
        formatProject: function(t) {
            var e = l.globalData.cityInfo;
            t.buildingName = t.BuildingProjectList && t.BuildingProjectList.length && t.BuildingProjectList[0].ProjectName || t.BuildingName, 
            t.AddressImageUrl = r.formatOSSLink(t.AddressImageUrl, "image/format,webp/resize,w_750"), 
            t.CoverImageUrl = r.formatOSSLink(t.CoverImageUrl, "image/format,webp/resize,w_750"), 
            t.buildingStatusText = r.formatBuildingStatusShortText(t.BuildingStatus), t.propertyType = t.PropertyType + "", 
            t.propertyTypeText = r.formatBuildingTypeText(t.propertyType), t.subscribtBtnInfo = this.formatSubscribeBtnInfo(t, 0), 
            t.RegisterStartTime = t.BuildingProjectList.length > 0 ? t.BuildingProjectList[0].RegisterStartTime : "";
            var a = i({}, t);
            if (t.BuildingProjectList && t.BuildingProjectList.length && (a.ProjectStatus = t.BuildingProjectList[0].ProjectStatus || 0), 
            t.buildingStatusText = r.formatBuildingStatusText(a), t.BuildingProjectList && t.BuildingProjectList.length && (t.BuildingProjectList.forEach(function(i) {
                i.VersionType = t.VersionType, i.buildingStatusText = r.formatBuildingStatusText(i, e);
            }), a.ProjectStatus = t.BuildingProjectList[0].ProjectStatus || 0), t.News) {
                var n = t.News;
                n.time = n.CreateTime.slice(0, 10), this.setData({
                    buildingNews: n
                });
            }
            t.BuildingProjectList && t.BuildingProjectList.length && t.BuildingProjectList.forEach(function(e) {
                var i = [];
                3 !== e.ProjectStatus && 4 !== e.ProjectStatus || !e.RegistrationStatistic || i.push(function() {
                    var i = [ "房源套数", e.RegistrationStatistic.HouseNumber ? e.RegistrationStatistic.HouseNumber + "套" : "--", e.RegistrationStatistic.NoHouseNumber ? e.RegistrationStatistic.NoHouseNumber + "套" : "--", e.RegistrationStatistic.HasHouseNumber ? e.RegistrationStatistic.HasHouseNumber + "套" : "--" ];
                    if (0 === t.VersionType) {
                        var a = e.RegistrationStatistic.TalentHouseNumber ? e.RegistrationStatistic.TalentHouseNumber + "套" : "--";
                        i.splice(2, 0, a);
                    }
                    return i;
                }(), function() {
                    var i = [ "报名人数", e.RegistrationStatistic.RegistrationNumber ? e.RegistrationStatistic.RegistrationNumber : "--", e.RegistrationStatistic.RegistrationNoHouseNumber ? e.RegistrationStatistic.RegistrationNoHouseNumber : "--", e.RegistrationStatistic.RegistrationHasHouseNumber ? e.RegistrationStatistic.RegistrationHasHouseNumber : "--" ];
                    if (0 === t.VersionType) {
                        var a = e.RegistrationStatistic.RegistrationTalentNumber ? e.RegistrationStatistic.RegistrationTalentNumber : "--";
                        i.splice(2, 0, a);
                    }
                    return i;
                }(), function() {
                    var i = [ "摇中概率", e.RegistrationStatistic.AllProbability ? e.RegistrationStatistic.AllProbability + "%" : "--", e.RegistrationStatistic.NoHousePercent ? e.RegistrationStatistic.NoHousePercent + "%" : "--", e.RegistrationStatistic.HasHousePercent ? e.RegistrationStatistic.HasHousePercent + "%" : "--" ];
                    if (0 === t.VersionType) {
                        var a = e.RegistrationStatistic.TalentHousePercent ? e.RegistrationStatistic.TalentHousePercent + "%" : "--";
                        i.splice(2, 0, a);
                    }
                    return i;
                }()), e.tableData = i;
            }), t.PurchaseGroupQrcodeUrl = r.formatUrl("3616dc08-e500-4c5b-91fc-984efc4ad9ba.png"), 
            t.PurchaseGroupQrcodeUrl = t.PurchaseGroupQrcodeUrl ? r.formatUrl(t.PurchaseGroupQrcodeUrl) : "", 
            !t.BannerUrlList || t.BannerUrlList.length < 1 ? t.BannerUrlList = [ t.CoverImageUrl ] : t.BannerUrlList = this.formatPrototypeRoomUrlList(t.BannerUrlList), 
            t.initialLng = t.Longitude, t.initialLat = t.Latitude, t.BuildingTags = t.BuildingTags ? t.BuildingTags.split(",") : [], 
            t.SubwayDistance && t.BuildingTags.push(t.SubwayDistance > 1e3 ? "地铁" + (t.SubwayDistance / 1e3).toFixed(1) + "km" : "地铁" + t.SubwayDistance + "m"), 
            t.totalViewNumber = r.formatViewsNumber(t.TotalViewNumber), t.SubwayDistanceText = "", 
            t.SubwayDistance < 1e3 ? t.SubwayDistanceText = t.SubwayDistance + "m" : t.SubwayDistanceText = (t.SubwayDistance / 1e3).toFixed(1) + "km", 
            t.HistoryProject && (t.HistoryProject.PreSaleTime = t.HistoryProject.PreSaleTime ? t.HistoryProject.PreSaleTime.substr(0, 10) : "", 
            t.HistoryProject.SuccessRate = r.fixedNumber(t.HistoryProject.SuccessRate)), t.BuildingProjectList && t.BuildingProjectList.length && (t.BuildingProjectList = this.handleProjectList(t));
            var o = [];
            t.BuildingProjectList && t.BuildingProjectList.forEach(function(t, e) {
                t.ProjectStatus <= 3 && t.ProjectStatus > 0 && t.RegisterAddress && o.push({
                    idx: e,
                    url: r.formatUrl(t.RegisterAddress),
                    BuildingNo: t.BuildingNo,
                    averagePrice: t.AveragePrice,
                    status: t.ProjectStatus,
                    isGetLotteryData: !!t.HasLotteryResult
                });
            });
            var s = [];
            return t.BuildingProjectList && t.BuildingProjectList.forEach(function(t, e) {
                4 === t.ProjectStatus && t.NeedYaohao && t.HasLotteryResult && s.push({
                    idx: e,
                    projectId: t.ProjectId,
                    BuildingNo: t.BuildingNo,
                    averagePrice: t.AveragePrice,
                    status: t.ProjectStatus
                });
            }), this.setPriceText(t), this.setData({
                lat: t.Latitude,
                lng: t.Longitude,
                registerLinkList: o,
                lotteryResultList: s,
                activedProjectInfo: t.BuildingProjectList && t.BuildingProjectList[0] || null
            }), t.Video && (t.Video.VideoUrl = r.formatUrl(t.Video.VideoUrl), t.Video.PhotoUrl = r.formatUrl(t.Video.PhotoUrl)), 
            t;
        },
        setPriceText: function(t) {
            var e = "", i = "";
            this.data.cityInfo;
            if (0 === t.BuildingStatus) e = "价格待定"; else if (1 === t.BuildingStatus) {
                if (e = "价格待定", t.HistoricalAveragePrice && (e = t.HistoricalAveragePrice + "元/㎡（参考价格）"), 
                t.BuildingProjectList && t.BuildingProjectList.length > 0) {
                    var a = t.BuildingProjectList[0].ProjectStatus;
                    if (a) {
                        var r = t.MinTotalPrice && Math.floor(t.MinTotalPrice / 1e4);
                        t.AveragePrice && (e = t.AveragePrice + "元/㎡"), r && t.AveragePrice && (e = r + "万起", 
                        i = t.AveragePrice + "元/㎡"), r && t.BuildingProjectList[0].BuildingForSale && (e = r + "万起");
                    }
                    a > 0 && 0 === t.AveragePrice && (e = "价格待定");
                }
            } else e = "价格待定", t.HistoricalAveragePrice && (e = t.HistoricalAveragePrice + "元/㎡（参考价格）");
            t.showPastText = e.includes("（参考价格）"), t.totalPriceText = e, t.averagePriceText = i;
        },
        formatPrototypeRoomUrlList: function(t) {
            return t.map(function(t) {
                return r.formatOSSLink(t, "image/format,webp/resize,w_750");
            });
        },
        handleProjectList: function(t) {
            var e = this, i = t.BuildingProjectList.map(function(t, i) {
                return t.StatusText = r.formatProjectStatus(t.Status), t.PreSaleTime = r.formatPreSaleTime(t.PreSaleTime), 
                t.PublicityStartTime = r.formatPublicityTimeInDetail(t.PublicityStartTime), t.PublicityEndTime = r.formatPublicityTimeInDetail(t.PublicityEndTime), 
                t.RegisterStartTime = r.formatRegisterTimeInDetail(t.RegisterStartTime), t.RegisterEndTime = r.formatRegisterTimeInDetail(t.RegisterEndTime), 
                t.OpeningTime = t.OpeningTime ? t.OpeningTime.substr(0, 10) : null, t.lotteryTime = t.LotteryTime ? t.LotteryTime.substr(5, 6) : "未知", 
                t.buyTime = t.BuyStartTime ? t.BuyStartTime.substr(5, 6) : "未知", t.totalPrice = e.formatTotalPrice(t), 
                t.preferentialInfo = t.PreferentialInfo ? t.PreferentialInfo : "", t.tabId = "tab-" + i, 
                t.isActived = 0 === i, t;
            });
            return t.preferentialInfo = t.BuildingProjectList.map(function(t) {
                return t.preferentialInfo;
            }).join(""), i;
        },
        formatTotalPrice: function(t) {
            return t.MinTotalPrice ? parseInt(t.MinTotalPrice / 1e4) : "";
        },
        formatHouseTypeList: function(t) {
            return this.setData({
                houseTypeLen: t.HouseTypes.length
            }), t.HouseTypes.map(function(t, e) {
                var i = r.formatOSSLink(t.Images[0] || "", "image/format,webp/resize,w_375");
                return t.ImageUrl = i, t.totalPrice = t.TotalPrice, t;
            });
        },
        formatHouseAreaDuration: function(t) {
            if (0 === t.length) return "";
            var e = t, i = [], a = this.data.project.BuildingStatus, r = this.data.project.Status, n = "";
            if ((1 !== a || 1 !== r && 2 !== r ? e : e.filter(function(t) {
                return t.IsOnSale;
            })).forEach(function(t) {
                i.push(t.HouseArea);
            }), i.length > 0) if (1 === i.length) n = i[0] + "m²"; else {
                var o = Math.max.apply(Math, i);
                n = Math.min.apply(Math, i) + "-" + o + "m²";
            }
            return n;
        },
        formatCommentsListTop: function(t) {
            return {
                CommentsList: t.CommentsList.map(function(t) {
                    return t.UserAvatarUrl = r.formatOSSLink(t.UserAvatarUrl, "image/format,webp/resize,w_100"), 
                    t.CreateTime = r.formatTimeToTill(t.CreateTime), t;
                }),
                AvatarsList: t.AvatarsList.map(function(t) {
                    return t = r.formatOSSLink(t, "image/format,webp/resize,w_100");
                }),
                TotalCount: t.TotalCount
            };
        },
        formatBrokerList: function(t) {
            return t.map(function(t) {
                return t.PersonalImageUrl = r.formatOSSLink(t.PersonalImageUrl, "image/format,webp/resize,w_100"), 
                t;
            });
        },
        formatFacilityIcon: function(t) {
            switch (1 * t) {
              case 1:
                return "match_icon_traffic@3x";

              case 2:
                return "match_icon_shopping@3x";

              case 3:
                return "match_icon_school@3x";

              case 4:
                return "match_icon_life@3x";

              case 5:
                return "match_icon_hospital@3x";
            }
        },
        formatFacilityName: function(t) {
            switch (1 * t) {
              case 1:
                return "交通";

              case 2:
                return "商业";

              case 3:
                return "学校";

              case 4:
                return "休闲";

              case 5:
                return "医疗";
            }
        },
        formatAppShareText: function() {
            var t = this.data.project, e = t.BuildingProjectList && t.BuildingProjectList.length > 0 ? t.BuildingProjectList[0] : null, i = this.data.showAsProject ? e.ProjectName : t.BuildingName, a = t.BuildingStatus;
            if (0 == a) return "全新待售楼盘-【" + i + "】";
            if (1 != a) return 2 == a ? "【" + i + "】已售罄" : "【" + i + "】待加推，敬请期待";
            var r = e && e.ProjectStatus;
            if (2 === t.VersionType) {
                var n = {
                    1: "信息尽在必有房，点击了就是你的了",
                    2: "【" + i + "】即将选房，提前看看一房一价吧",
                    3: "【" + i + "】已选房"
                };
                if (n[r]) return n[r];
            }
            switch (r) {
              case 0:
                return "【" + i + "】预计" + e.PreSaleTime + "预售，快来预习下楼盘信息";

              case 1:
                return e.RegisterStartTime ? "【" + i + "】" + this.formatAppShareTime(e.RegisterStartTime) + "开始登记，资料可以准备起来啦" : "【" + i + "】即将登记，资料可以准备起来啦";

              case 2:
                return e.RegisterEndTime ? "【" + i + "】" + this.formatAppShareTime(e.RegisterEndTime) + "登记截止，可别错过啦" : "【" + i + "】正在登记，可别错过啦";

              case 3:
              case 4:
                if (e.RegistrationNumber && e.HouseNumber) {
                    var o = (e.HouseNumber / e.RegistrationNumber * 100).toFixed(2);
                    return o = o >= 100 ? 100 : o, "【" + i + "】共" + e.RegistrationNumber + "人登记，中签率" + o + "%";
                }
                return "【" + i + "】" + (3 == r ? "即将摇号，订阅通知第一时间知晓结果" : "即将选房，提前看看一房一价吧");

              case 5:
                return "【" + i + "】已选房";

              default:
                return "信息尽在必有房，点击了就是你的！";
            }
        },
        formatAppShareTime: function(t) {
            var e = new Date(t.replace(/[\.\-]/g, "/"));
            return e.getMonth() + 1 + "月" + e.getDate() + "日";
        },
        getBottomBtnType: function() {
            var t = null, e = [], i = this.data.project, a = this.data.brokerList || [];
            if (this.data.brokerCode) {
                var r = this.data.recommendBrokerList;
                r && r.IsBoundConsultant && r.ConsultantList && r.ConsultantList.length && (t = r.ConsultantList[0]);
            }
            return e = a, this.formatBottomBtnType(t, i, e);
        },
        formatBottomBtnType: function(t, e, a) {
            t = t || null, a = a || [];
            l.globalData.cityInfo;
            var n = this.data.userInfo, s = {
                left: null,
                center: null,
                right: null
            };
            if (t && t.UnionId) s.left = i({
                type: "broker"
            }, t), s.center = {
                type: "onlineChat",
                title: "在线咨询",
                subTitle: "与置业顾问一对一沟通"
            }, s.right = {
                type: "telephoneConsultation",
                title: "电话咨询",
                subTitle: "沟通隐藏真实号码"
            }; else if (s.left = {
                type: "follow",
                isFollow: !!e.SubscribedRecordId
            }, a && a.length ? s.center = {
                type: "onlineChat",
                title: "在线咨询",
                subTitle: "与置业顾问一对一沟通"
            } : e.SalesHotline && (s.center = {
                type: "callSalesOffice",
                title: "致电售楼处",
                subTitle: "隐藏真实号码"
            }), e && a && a.length && (s.right = {
                type: "telephoneConsultation",
                title: "电话咨询",
                subTitle: "沟通隐藏真实号码"
            }), e) {
                var c = [];
                e && e.BuildingProjectList && e.BuildingProjectList.length && e.BuildingProjectList.forEach(function(t) {
                    c.push({
                        status: t.ProjectStatus,
                        url: r.formatUrl(t.RegisterAddress),
                        isGetLotteryData: !!t.HasLotteryResult,
                        hasRegistrationResult: !!t.HasRegistrationResult
                    });
                }), c && c.length ? (4 === c[0].status && c[0].isGetLotteryData && (s.right = {
                    type: "queryLotteryResult",
                    title: "查询摇号结果",
                    subTitle: ""
                }), 1 !== c[0].status && 2 !== c[0].status || (c[0].url || c[1] && c[1].url) && (s.right = {
                    type: "register",
                    title: "去登记购房意向",
                    subTitle: "官方登记"
                }), a && a.length && !s.right && (n.RealtyConsultantInfo && o.judgeBuildingBelongConsultant(e.BuildingId) || (s.right = {
                    type: "telephoneConsultation",
                    title: "电话咨询",
                    subTitle: "沟通隐藏真实号码"
                }))) : a && a.length && (n.RealtyConsultantInfo && o.judgeBuildingBelongConsultant(e.BuildingId) || (s.right = {
                    type: "telephoneConsultation",
                    title: "电话咨询",
                    subTitle: "沟通隐藏真实号码"
                }));
            }
            return s;
        },
        formatBuildingList: function(t) {
            var e = {
                CityId: this.data.project.CityId,
                VersionType: this.data.project.VersionType
            };
            return t.map(function(t, i) {
                return t.idx = i, t.propertyType = "" + t.PropertyType, t.buildingInfo = r.formatBuildingInfo(t, e), 
                t.eventTrackStatus = 0, t;
            });
        },
        initBuildingsAroundNavList: function() {
            return [ {
                id: 0,
                name: "周边楼盘",
                type: "buildingsAround",
                isActived: !0
            }, {
                id: 1,
                name: "同价位楼盘",
                type: "buildingsAsPrice",
                isActived: !1
            } ];
        },
        setTopTabBarTop: function(t) {
            var e = this, i = this.data.navH, a = wx.createSelectorQuery();
            t.forEach(function(t) {
                a.select(t.selector).boundingClientRect();
            }), a.exec(function(a) {
                a && a.length && (t.forEach(function(t) {
                    a.forEach(function(a) {
                        a && t.selector.includes(a.id) && (t.top = a.top + e.data.scrollTop - i - 45, t.bottom = a.bottom + e.data.scrollTop - i - 45, 
                        t.width = a.width);
                    });
                }), e.setData({
                    topTabBarList: t
                }));
            });
        },
        getSourceActive: function(t) {
            return t.filter(function(t) {
                return t.isActived;
            });
        },
        formatCommentList: function(t) {
            return t.map(function(t, e) {
                return t.UserAvatarUrl = r.formatOSSLink(t.UserAvatarUrl, "image/format,webp/resize,w_100"), 
                t.CreateTime = r.formatTimeToTill(t.CreateTime), t.Replies && t.Replies.length > 3 ? t.replies = t.Replies.slice(0, 3) : t.replies = [], 
                t;
            });
        },
        formatSubscribeBtnInfo: function(t) {
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1], t.VersionType, 
            t.BuildingStatus;
            var e = t.SubscribedRecordId;
            t.BuildingProjectList;
            return {
                type: "openBuilding",
                subscribedRecordId: e,
                isSubscribed: !!e,
                subscribtStatusText: e ? "已订阅" : "订阅提醒"
            };
        },
        hasCountDown: function() {
            var t = this, e = this.data.project, i = this.data.project.BuildingProjectList || [], a = Date.now(), r = [];
            i.forEach(function(t) {
                var i = t.RegisterStartTime, n = t.RegisterEndTime, o = t.FillRegisterEndTime;
                i = i && new Date(i.replace(/[\.\-]/g, "/")).getTime(), n = n && new Date(n.replace(/[\.\-]/g, "/")).getTime(), 
                o = o && new Date(o.replace(/[\.\-]/g, "/")).getTime();
                var s = null;
                1 !== e.VersionType && 0 !== e.VersionType || (s = function(e) {
                    var r = 0 === e ? 1 : 3, s = 0 === e ? 2 : 4;
                    if (t.ProjectStatus === r && i && i > a) return {
                        timestamp: i,
                        description: "距离" + (0 === e ? "登记" : "认筹") + "开始还有：",
                        buildingNo: t.BuildingNo
                    };
                    if (t.ProjectStatus === s) {
                        if (n && n > a) return {
                            timestamp: n,
                            description: "距离" + (0 === e ? "登记" : "认筹") + "结束还有：",
                            buildingNo: t.BuildingNo
                        };
                        if (o && o > a) return {
                            timestamp: o,
                            description: "距离登记补资料截止还有：",
                            buildingNo: t.BuildingNo
                        };
                    }
                }(e.VersionType)), s && s.timestamp && r.push(s);
            }), r.forEach(function(e, i) {
                t.startCountDown(e, i);
            });
        },
        startCountDown: function(t, i) {
            var a = this, n = t.timestamp, o = t.description, s = t.buildingNo, l = "countDownList[" + i + "]", c = setInterval(function() {
                var t = r.getRelativeCurrentTime(n);
                t ? (t.description = o, t.buildingNo = s, a.setData(e({}, l, t))) : clearInterval(c);
            }, 1e3), u = this.data.countDownTimerIdList || [];
            this.setData({
                countDownTimerIdList: u.concat(c)
            });
        },
        recordUserDetailScanInfo: function(t) {
            var e = {
                buildingId: this.data.project.BuildingId,
                EventKey: t.eventKey
            };
            if (this.data.project && this.data.project.BuildingProjectList && this.data.project.BuildingProjectList.length) {
                var i = this.data.project.BuildingProjectList[0].ProjectId || "";
                i && (e.ProjectId = i);
            }
            r.recordUserDetailScanInfo(e);
        },
        triggerScanEventTrack: function() {
            var t = [];
            (this.data.buildingArticleInfo && this.data.buildingArticleInfo.buildingArticles || []).forEach(function(e) {
                1 === e.eventTrackStatus && (t.push(e.Id), e.eventTrackStatus = 2);
            }), t && t.length && r.recordArticleScan({
                ArticleIds: t,
                SourceKey: "BuildingRecommend",
                SourceId: this.data.project.BuildingId
            });
        },
        operateCommentCardInfo: function(t) {
            var e = t.detail, i = t.detail.targetComment, a = i.commentId, n = i.parentId, o = i.userName, s = i.unionId;
            switch (e.eventType) {
              case "goChatPage":
                r.navigatePage({
                    url: "/pck_chat/chat/chat?unionId=" + s
                });
                break;

              case "replyComment":
                this.setData({
                    "replayCommentParams.placeholder": "回复 " + (o || "游客"),
                    "replayCommentParams.commentId": a,
                    "replayCommentParams.parentId": n,
                    "replayCommentParams.unionId": s,
                    "replayCommentParams.commentType": "reply"
                }), this.selectComponent("#ReplyComment").triggerReply();
            }
        },
        getInfo: function(t) {
            var e = null;
            return t.isActived ? (e = i({}, t)).Replies && delete e.Replies : e = t.Replies.filter(function(t) {
                return t.isActived;
            })[0] || null, e;
        },
        projectInteractive: function(t) {
            var e = {
                BuildingId: this.data.project.BuildingId,
                InteractiveType: t,
                SourcePort: 0
            };
            return e.OpenId = l.globalData.userInfo.OpenId, r.request({
                url: a.service.projectInteractive,
                method: "POST",
                data: e
            });
        },
        formatTimeDuration: function(t) {
            var e = new Date(t.RegisterStartTime.replace(/[\.\-]/g, "/")), i = new Date(t.RegisterEndTime.replace(/[\.\-]/g, "/"));
            return "(" + r.fixPrefixion(e.getMonth() + 1) + "." + r.fixPrefixion(e.getDate()) + "~" + r.fixPrefixion(i.getMonth() + 1) + "." + r.fixPrefixion(i.getDate()) + ")";
        },
        getFollowFormid: function(t) {
            var e = this.data.project.SalesHotline;
            this.setData({
                extensionNumber: e.includes("#") ? e.split(",")[1] : e.split(",")
            });
        },
        getStaticMapImage: function() {
            var t = this.data.project, i = t.Latitude, a = t.Longitude, r = "https://apis.map.qq.com/ws/staticmap/v2/?center=" + i + "," + a + "&zoom=15&size=690*320&maptype=roadmap&markers=size:large|color:orange|" + i + "," + a + "&key=VIUBZ-UNARW-QFFRL-RRUUO-AT2E3-ZOFOK";
            this.setData(e({}, "project.AddressImageUrl", r));
        },
        initTopTabBarList: function(t) {
            var e = this.data, i = e.buildingNews, a = e.houseTypeList, r = e.buildingArticleInfo, n = e.recentlyProjectInfo, o = e.facilityCount, s = e.recommendBrokerList, l = [ {
                name: "基础信息",
                isActived: !0,
                selector: "#building-intro",
                eventKey: "BasicDetail",
                iconKey: "lpxq_icon_lpxc",
                scrollTop: 0
            } ];
            return i && l.push({
                name: "楼盘快讯",
                isActived: !1,
                selector: "#building-news",
                eventKey: "BuildingNews",
                iconKey: "lpxq_icon_lpkx",
                scrollTop: 0
            }), a && a.length && l.push({
                name: "楼盘户型",
                isActived: !1,
                selector: "#building-house-type",
                eventKey: "HouseType",
                iconKey: "lpxq_icon_hx",
                scrollTop: 0
            }), l.push({
                name: "楼盘点评",
                isActived: !1,
                selector: "#building-comment",
                eventKey: "",
                iconKey: "lpxq_icon_lpdp",
                scrollTop: 0
            }), n && n.totalCount && 0 === t.VersionType && l.push({
                name: "最近开盘",
                isActived: !1,
                selector: "#recentlyOpened",
                eventKey: "",
                iconKey: "lpxq_icon_zjkp",
                scrollTop: 0
            }), r && l.push({
                name: "楼盘文章",
                isActived: !1,
                selector: "#buildingActicle",
                eventKey: "",
                iconKey: "lpxq_icon_lpwz",
                scrollTop: 0
            }), !s.IsBoundConsultant && l.push({
                name: "置业顾问",
                isActived: !1,
                selector: "#building-broker",
                eventKey: "",
                iconKey: "lpxq_icon_zygw",
                scrollTop: 0
            }), o && o.length && l.push({
                name: "周边配套",
                isActived: !1,
                selector: "#building-surround",
                eventKey: "",
                iconKey: "lpxq_icon_zbpt",
                scrollTop: 0
            }), l;
        },
        operateModuleNav: function(t) {
            var e = this, i = t.detail, a = i.selector, n = i.index, o = this.data, s = o.moduleNavSizeInfo.height, l = void 0 === s ? 0 : s, c = o.navH;
            this.changeModuleNacActive(n), this.data.operateModuleNavFlag = !0, r.getElementSize({
                select: a,
                callback: function(t) {
                    wx.pageScrollTo({
                        scrollTop: t[0].top + e.data.scrollTop - l - c,
                        duration: 300,
                        complete: function() {
                            setTimeout(function() {
                                e.data.operateModuleNavFlag = !1;
                            }, 500);
                        }
                    });
                }
            });
        },
        computedNavScrollTop: function(t) {
            var e = this, i = t.map(function(t) {
                return t.selector;
            }).join(",");
            r.getElementSize({
                selectType: "selectAll",
                select: i + ", #moduleNav",
                callback: function(i) {
                    i[0].forEach(function(i) {
                        "moduleNav" === i.id && e.setData({
                            moduleNavSizeInfo: i
                        }), t.forEach(function(a, r) {
                            a.selector === "#" + i.id && (t[r].scrollTop = i.top + e.data.scrollTop, t[r].height = i.height);
                        });
                    }), e.data.computedNavScrollTopFlag = !0;
                }
            });
        },
        changeModuleNacActive: function(t) {
            var i, a = this.data.moduleNavList.findIndex(function(t) {
                return t.isActived;
            });
            t !== a && this.setData((i = {}, e(i, "moduleNavList[" + a + "].isActived", !1), 
            e(i, "moduleNavList[" + t + "].isActived", !0), i));
        },
        computedNavAndContent: function(t, e) {
            var i = this.data.moduleNavList.findIndex(function(i, a) {
                return i.scrollTop >= t + e;
            });
            i >= 0 && this.changeModuleNacActive(i);
        },
        onPageScroll: function(t) {
            var e = this.data, i = e.moduleNavList, a = e.moduleNavSizeInfo, r = e.computedNavScrollTopFlag, n = e.backTopFlag, o = e.operateModuleNavFlag, s = void 0 !== o && o, l = e.scrollTop, u = t.scrollTop;
            !this.data.playIconShow && c && u > 100 && c.pause(), Math.abs(u - l) > 20 && (this.data.scrollTop = u, 
            r && a && !s && i && this.computedNavAndContent(l, a.height), l > 200 && !n ? this.setData({
                backTopFlag: !0
            }) : l <= 200 && n && this.setData({
                backTopFlag: !1
            }));
        },
        triggerLotteryMaskVisible: function(t) {
            var e = this.data.lotteryMaskVisible;
            this.setData({
                lotteryMaskVisible: !e
            });
        },
        goSearchLotteryResult: function(t) {
            var e = t.currentTarget.dataset.idx;
            this.checkLotteryResult(e);
        },
        swiperSlideChange: function(t) {
            var e = t.detail.current || 0, i = this.data.project, a = i.BuildingId, n = i.BuildingName, o = i.BannerUrlList;
            this.setData({
                currentSlideNumber: e + 1
            });
            var s = o.length - 1;
            c && (++s, !this.data.playIconShow && c.pause()), e === s && r.navigatePage({
                url: "/pck_building/detail_imgs/index?buildingId=" + a + "&buildingName=" + n
            });
        },
        swiperSlideTap: function() {
            var t = this.data.project, e = "/pck_building/detail_imgs/index?buildingId=" + t.BuildingId + "&buildingName=" + t.BuildingName;
            r.navigatePage({
                url: e
            });
        },
        getVideo: function() {
            c = wx.createVideoContext("buildingVideo");
        },
        handleVideoPause: function() {
            this.setData({
                playIconShow: !0
            });
        },
        handleVideoPlay: function() {
            this.setData({
                playIconShow: !1
            });
        },
        handleClickPlay: function() {
            c && c.play();
        },
        scancodeTrack: function(t) {
            r.handleScanqrcodeTrack({
                PageUrl: t
            });
        },
        handleReplySuccess: function(t) {
            var i;
            try {
                var a = t.detail, r = a.eventType, n = a.comment;
                switch (r) {
                  case "reply":
                    var o = this.data.buildingCommentInfo.buildingCommentList, s = this.data.replayCommentParams.commentId, l = o.findIndex(function(t) {
                        return t.Id === s;
                    });
                    l >= 0 && this.setData((i = {}, e(i, "buildingCommentInfo.buildingCommentList[" + l + "].Replies", o[l].Replies.concat(n)), 
                    e(i, "buildingCommentInfo.buildingCommentList[" + l + "].ReplyNumber", o[l].ReplyNumber + 1), 
                    i));
                    break;

                  case "add":
                    this.getCommentsListTop();
                }
            } catch (t) {
                this.getCommentsListTop();
            }
        },
        addComment: function() {
            this.setData({
                "replayCommentParams.placeholder": "我也来说两句…",
                "replayCommentParams.commentId": "",
                "replayCommentParams.parentId": "",
                "replayCommentParams.unionId": "",
                "replayCommentParams.commentType": "add"
            }), this.selectComponent("#ReplyComment").triggerReply();
        },
        handleSubscribeRemind: function() {
            this.operateBuildingIntro("subscribe");
        },
        cancelSubscription: function() {
            var t = this, e = this.data.project.SubscribedRecordId;
            e && r.request({
                url: a.service.cancelBuildingSubscriptionApi.replace("{subscriptionId}", e),
                method: "DELETE",
                loading: !0
            }).then(function(e) {
                r.wxToast("关闭成功哦~"), t.setData({
                    "project.subscribtBtnInfo.subscribedRecordId": "",
                    "project.SubscribedRecordId": "",
                    "project.subscribtBtnInfo.isSubscribed": !1,
                    "project.subscribtBtnInfo.subscribtStatusText": "订阅提醒",
                    "project.IsFollow": !1,
                    "bottomBtnInfo.left.isFollow": !1
                });
            });
        },
        handelSubscribeRemind: function(t) {
            switch (t.type) {
              case "cancel":
                this.setData({
                    subscribeRemind: !1
                });
                break;

              case "success":
                wx.showModal({
                    title: "订阅成功",
                    content: "后续该楼盘相关信息，将发送短信至您授权的手机号~",
                    showCancel: !1,
                    confirmColor: "#FE6010",
                    confirmText: "确认"
                }), this.setData({
                    "project.subscribtBtnInfo.subscribedRecordId": t.detail.id,
                    "project.SubscribedRecordId": t.detail.id,
                    "project.subscribtBtnInfo.isSubscribed": !0,
                    "project.subscribtBtnInfo.subscribtStatusText": "已订阅",
                    "project.IsFollow": !0,
                    "bottomBtnInfo.left.isFollow": !0,
                    subscribeRemind: !1
                });
            }
        },
        triggerFollow: function() {
            this.data.project.SubscribedRecordId ? this.cancelSubscription() : this.setData({
                subscribeRemind: !0
            });
        },
        operateBuildingIntro: function(t) {
            var e = "string" == typeof t ? t : t.detail.eventType, i = this.data.project;
            switch (e) {
              case "goMapPage":
                wx.openLocation({
                    latitude: 1 * i.Latitude,
                    longitude: 1 * i.Longitude,
                    name: i.BuildingName,
                    address: i.Address,
                    scale: 12
                });
                break;

              case "subscribe":
                i.SubscribedRecordId ? this.cancelSubscription() : this.setData({
                    subscribeRemind: !0
                });
                break;

              case "getUserInfo":
                l.authorizeUserInfo(t.detail.eventDetail);
            }
        },
        getPhoneNumber: function(t) {
            var e = this;
            l.authorizePhoneNumber(t, {
                success: function(t) {
                    e.setData({
                        userInfo: l.globalData.userInfo
                    });
                }
            });
        },
        getUserInfo: function(t) {
            var e = this, i = t.currentTarget.dataset && t.currentTarget.dataset.wxtype;
            l.authorizeUserInfo(t, function(a) {
                switch (i) {
                  case "comment":
                    e.toComment();
                    break;

                  case "contactMe":
                    e.goChatPage(t);
                    break;

                  case "focus":
                    e.triggerFollow();
                    break;

                  case "onlineChat":
                    e.getRandomBrokerConcat();
                    break;

                  case "chat":
                    var n = t.currentTarget.dataset.id;
                    if (n === l.globalData.userInfo.UnionId) return void r.wxToast("不能给自己发消息");
                    l.globalData.authToChat = !0, l.globalData.authToChatUnionId = n, s.init(l);
                    break;

                  case "lottery":
                    e.openLotterySubscribe();
                    break;

                  default:
                    var o = t.currentTarget.dataset, c = o.index, u = o.type, d = e.data.project.BuildingProjectList[c];
                    e.setData({
                        curSubscribeType: u,
                        maskVisibility: !0,
                        currentProject: d
                    });
                }
            });
        },
        emptyFn: function() {}
    }
});