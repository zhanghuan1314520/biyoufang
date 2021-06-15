function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, n = require("../../config.js"), a = require("../../utils/index.js"), i = require("../../options/dropdown-menu.js"), o = require("../../utils/getter/index.js"), s = getApp();

Page({
    data: {
        navH: s.globalData.navH,
        tabH: 0,
        bannerList: [],
        hasCheckedAudit: !1,
        navMenuList: [],
        userInfo: null,
        cityInfo: {},
        brokerMomentLimit: null,
        dropdownMenuInfo: {},
        dropdownMenuAnimation: null,
        showAddMomentBtn: !0,
        showGoDetailBtn: !1,
        showMask: !1,
        questionList: [],
        consultantStatus: !1,
        qaInfo: {
            pageNo: 1,
            limit: 10,
            canLoadMore: !0
        },
        showQaListNormal: !0,
        hotCardinfo: [],
        imageRoot: s.globalData.imgsPathInfo.rootPath,
        filterStatusFlag: !1,
        consultantBelongCurrentCity: !1
    },
    onLoad: function(t) {
        var e = this, n = wx._routeParams, r = n && n.status || "", u = this.chooseNavType(t);
        s.checkSession(function() {
            s.globalData.Notify.on("addMoments", e.addMoments), s.globalData.Notify.on("initQa", e.initQa);
            var t = e.initNavMenuList(u), n = s.globalData, d = n.userInfo, c = n.cityInfo;
            e.setData({
                navMenuList: t,
                consultantBelongCurrentCity: o.judgeConsultantIntoCurrentCity(c.CityId)
            }), a.checkAudit().then(function() {
                e.setData({
                    userInfo: d,
                    dropdownMenuInfo: a.deepCopyHard(i),
                    hasCheckedAudit: !0
                }), r && (e.setData({
                    "dropdownMenuInfo.questionStatusList[0].isActived": !0,
                    "dropdownMenuInfo.questionStatusList[0].isConfirm": !0
                }), e.closeMask()), wx.nextTick(function() {
                    e.init();
                });
            }), a.getNoreadnumber(), a.getNoreadFollow();
        }, a.getShareParams(t));
    },
    onShow: function() {
        var t = this;
        s.globalData.userInfo && this.setData({
            userInfo: s.globalData.userInfo
        }), a.showTabBarRedDot(), this.data.userInfo && this.setData({
            "userInfo.WeixinAuthorized": s.globalData.userInfo.WeixinAuthorized
        }), wx.nextTick(function() {
            var e = wx._routeParams;
            if ((e && e.status || "") && (t.setData({
                "dropdownMenuInfo.questionStatusList[0].isActived": !0,
                "dropdownMenuInfo.questionStatusList[0].isConfirm": !0
            }), t.closeMask()), wx._routeParams && wx._routeParams.marketStatus) {
                var n = wx._routeParams.marketStatus;
                wx._routeParams = null;
                var a = t.initNavMenuList(n);
                t.setData({
                    navMenuList: a
                });
            }
        });
    },
    onHide: function() {
        Promise.all([ this.getComponentData("#bannerList"), this.getComponentData("#card1"), this.getComponentData("#card2"), this.getComponentData("#card3"), this.getComponentData("#articleList") ]).then(function(t) {
            var e = [];
            t.map(function(t) {
                e = e.concat(t);
            }), e.length && a.recordAdvertScan({
                AdvertIds: e
            });
        });
        var t = this.selectComponent("#articleList"), e = t && t.handleArticleTrace();
        e && e.length && a.recordArticleScan({
            ArticleIds: e,
            SourceKey: "ArticleList"
        });
    },
    onUnload: function() {
        s.globalData.Notify.remove("addMoments", this.addMoments), s.globalData.Notify.remove("initQa", this.onPullDownRefresh);
    },
    onReachBottom: function() {
        if (this.data.navMenuList[0].isActived) this.selectComponent("#articleList").getArticles(); else if (this.data.navMenuList[2].isActived) this.selectComponent("#momentsNode").getMoments(); else if (this.data.navMenuList[1].isActived && this.data.qaInfo.canLoadMore) {
            var t = ++this.data.qaInfo.pageNo;
            this.setData({
                "qaInfo.pageNo": t
            }), this.queryQuestionList();
        }
    },
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            "qaInfo.pageNo": 1,
            "qaInfo.canLoadMore": !0
        }, function() {
            t.data.navMenuList[0].isActived ? (Promise.all([ t.getMarketBanners(), t.getMarketCategory() ]).then(function() {}), 
            t.selectComponent("#articleList").init()) : t.data.navMenuList[2].isActived ? t.selectComponent("#momentsNode").init() : t.queryQuestionList(), 
            wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage: function() {
        return a.extractShareFn({
            util: a,
            app: s
        });
    },
    init: function() {
        this.getMarketBanners(), this.getMarketCategory(), this.data.navMenuList[1].isActived && this.queryQuestionList();
    },
    initQa: function() {
        var t = this;
        this.setData({
            "qaInfo.pageNo": 1,
            "qaInfo.canLoadMore": !0
        }, function() {
            t.queryQuestionList();
        });
    },
    chooseNavType: function(t) {
        var e = "";
        return t && t.navType && (e = t.navType), wx._routeParams && wx._routeParams.marketStatus && (e = wx._routeParams.marketStatus, 
        wx._routeParams = null), e;
    },
    closeMask: function() {
        var t = this.data.dropdownMenuInfo, e = wx.createAnimation({
            duration: 600,
            timingFunction: "ease"
        });
        e.top("-1000rpx").step();
        t.dropdownMenuList.forEach(function(e, n) {
            t[e.type].forEach(function(t) {
                t.isActived = !!t.isConfirm;
            });
        }), this.setData({
            "dropdownMenuInfo.questionTypeList": t.questionTypeList,
            "dropdownMenuInfo.questionStatusList": t.questionStatusList,
            dropdownMenuAnimation: e,
            showMask: !1
        }), this.operateBtn({
            currentTarget: {
                dataset: {}
            }
        });
    },
    getSelData: function() {
        var t = this.data.dropdownMenuInfo, e = void 0, n = [];
        t.dropdownMenuList.map(function(a) {
            var i = a.type;
            "questionStatusList" === i && !0 === a.isActived && t[i].map(function(t) {
                t.isActived && (e = t.status);
            }), "questionTypeList" === i && !0 === a.isActived && t[i].map(function(t) {
                t.isActived && n.push(t.name);
            });
        });
        var a = {};
        return (e || 0 === e) && (a.status = e), n.length && (a.types = n.join(",")), a;
    },
    operateBtn: function(e) {
        var n, a = e.currentTarget.dataset || null;
        if (a) {
            var i = this.data.dropdownMenuInfo;
            if ("cancel" === a.type && i.dropdownMenuList.forEach(function(t, e) {
                !0 === t.isSelected && i[t.type].forEach(function(t) {
                    t.isActived = !1;
                });
            }), this.setData((n = {}, t(n, "dropdownMenuInfo.dropdownMenuList[0].isActived", i[i.dropdownMenuList[0].type].filter(function(t) {
                return t.isActived;
            }).length > 0), t(n, "dropdownMenuInfo.dropdownMenuList[1].isActived", i[i.dropdownMenuList[1].type].filter(function(t) {
                return t.isActived;
            }).length > 0), n)), "confirm" === a.type) {
                var o = wx.createAnimation({
                    duration: 600,
                    timingFunction: "ease"
                });
                o.top("-1000rpx").step(), this.setData({
                    dropdownMenuAnimation: o,
                    showMask: !1
                }), i.dropdownMenuList.forEach(function(t, e) {
                    i[t.type].forEach(function(t) {
                        t.isConfirm = !!t.isActived;
                    });
                }), this.setData({
                    qaInfo: {
                        pageNo: 1,
                        limit: 10,
                        canLoadMore: !0
                    },
                    showQaListNormal: !1
                }), wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                }), this.queryQuestionList();
            }
            this.changeSingleSel(i, "questionStatusList"), this.changeSingleSel(i, "questionTypeList"), 
            this.setData({
                "dropdownMenuInfo.questionTypeList": i.questionTypeList,
                "dropdownMenuInfo.questionStatusList": i.questionStatusList
            });
        }
    },
    changeSingleSel: function(n, a) {
        var i, o = [], s = -1, r = 0;
        n.dropdownMenuList.forEach(function(t, i) {
            t.type === a && (s = i), n[t.type].forEach(function(n) {
                t.type === a && n.isActived && o.push(e({}, n));
            });
        }), r = o.length, o = o[0] || null;
        var u = "dropdownMenuInfo.dropdownMenuList[" + s + "].status", d = "dropdownMenuInfo.dropdownMenuList[" + s + "].statusName";
        this.setData((i = {}, t(i, u, o && o.id || ""), t(i, d, o && o.name + (r > 1 ? "..." : "") || ""), 
        i));
    },
    changeDropdownMenuItemStatus: function(n) {
        var a = this, i = n.currentTarget.dataset || null;
        if (i) {
            var o = i.id, s = i.category, r = this.data.dropdownMenuInfo, u = r.dropdownMenuList[s], d = u.type;
            if (u.canMultiple) r[d].forEach(function(e, n) {
                if (e.id === o) {
                    var i = "dropdownMenuInfo." + d + "[" + n + "].isActived";
                    a.setData(t({}, i, !e.isActived));
                }
            }); else {
                var c, f = null;
                r[d].forEach(function(t, n) {
                    t.isActived = t.id === o && !t.isActived, !f && t.isActived && (f = e({}, t));
                });
                var l = "dropdownMenuInfo." + d, p = "dropdownMenuInfo.dropdownMenuList[" + s + "].status", h = "dropdownMenuInfo.dropdownMenuList[" + s + "].statusName";
                this.setData((c = {}, t(c, l, r[d]), t(c, p, f && f.id || ""), t(c, h, f && f.name || ""), 
                c));
            }
            var v = "dropdownMenuInfo.dropdownMenuList[" + s + "].isActived";
            r[d].filter(function(t) {
                return t.isActived;
            }).length > 0 ? this.setData(t({}, v, !0)) : this.setData(t({}, v, !1));
        }
    },
    goQaQueryPage: function() {
        a.navigatePage({
            url: "/pck_qa/qa_query/qa_query"
        });
    },
    goQuestionPage: function() {
        this.data.userInfo.WeixinAuthorized && a.navigatePage({
            url: "/pck_qa/qa_question/qa_question"
        });
    },
    goQuestionPageAuth: function(t) {
        var e = this, n = "/pck_qa/qa_question/qa_question";
        this.data.userInfo.WeixinAuthorized ? a.navigatePage({
            url: n
        }) : s.authorizeUserInfo(t, function() {
            e.setData({
                userInfo: s.globalData.userInfo
            }, function() {
                a.navigatePage({
                    url: n
                });
            });
        });
    },
    operateQuestionCardInfo: function(t) {
        var e = this, n = t.detail;
        if ("goDetail" === n.eventType) {
            var i = "/pck_qa/qa_detail/qa_detail?page=qaUser&id=" + n.questionCardInfo.Id;
            a.navigatePage({
                url: i
            });
        } else if ("authInfo" === n.eventType) s.authorizeUserInfo(n.questionCardInfo, function() {
            e.setData({
                userInfo: s.globalData.userInfo
            });
        }); else if ("answerQa" === n.eventType) {
            n.questionCardInfo;
            var o = "/pck_qa/qa_detail/qa_detail?id=" + n.questionCardInfo.Id;
            a.navigatePage({
                url: o
            });
        }
    },
    toggleNavMenu: function(e) {
        var n = e.detail.navMenuInfo, a = -1, i = -1;
        if (this.data.navMenuList.forEach(function(t, e) {
            t.isActived && -1 === a && (a = e), t.id === n.id && -1 === i && (i = e);
        }), -1 !== i && -1 !== a) {
            var o, s = "navMenuList[" + a + "].isActived", r = "navMenuList[" + i + "].isActived";
            1 === i && this.queryQuestionList(), this.setData((o = {}, t(o, s, !1), t(o, r, !0), 
            o));
        }
    },
    toggelDropdownMenu: function(t) {
        var e = this.data.dropdownMenuInfo.dropdownMenuList, n = t.currentTarget.dataset || null;
        if (n) {
            var a = wx.createAnimation({
                duration: 600,
                timingFunction: "ease"
            });
            a.top(this.data.navH + "px").step(), e.forEach(function(t) {
                t.id === n.id ? (t.isActived = !0, t.isSelected = !0) : t.isSelected = !1;
            }), this.setData({
                "dropdownMenuInfo.dropdownMenuList": e,
                showMask: !0,
                dropdownMenuAnimation: a.export()
            });
        }
    },
    initNavMenuList: function(t) {
        var e = [ {
            id: 0,
            type: "article",
            title: "楼市文章",
            isActived: !0
        }, {
            id: 100,
            type: "qa",
            title: "买房问答",
            isActived: !1
        }, {
            id: 1,
            title: "一手动态",
            type: "moment",
            isActived: !1
        } ];
        return t && e.forEach(function(e) {
            return e.isActived = e.type === t;
        }), e;
    },
    childNomoment: function() {
        this.setData({
            showAddMomentBtn: !1
        });
    },
    addNews: function() {
        wx.navigateTo({
            url: "/pck_broker/post_moment/post_moment"
        });
    },
    addMoments: function() {
        var t = this.selectComponent("#momentsNode");
        t && t.init();
    },
    cardOperate: function(t) {
        var e = t.detail, n = e.ArticleUrl, a = e.Title, i = (e.Id, e.ArticleId);
        if (n) {
            var o = "/h5_webview/article_webview/article_webview?url=" + (n = encodeURIComponent(n)) + "&title=" + encodeURIComponent(a) + "&id=" + i;
            wx.navigateTo({
                url: o
            });
        }
    },
    getComponentData: function(t) {
        var e = this.selectComponent(t), n = e && e.handleBannerTrace() || [];
        return Promise.resolve(n);
    },
    getMarketBanners: function() {
        var t = this, e = n.service.getBannerListInAd.replace("{positionKey}", "ArticleBanner");
        return a.request({
            url: e
        }).then(function(e) {
            e.forEach(function(t) {
                t.CoverFileUrl = a.formatUrl(t.ImageUrl), t.ArticleId = t.Id;
            }), t.setData({
                bannerList: e
            });
        });
    },
    getMarketCategory: function() {
        var t = this;
        return a.request({
            url: n.service.getMarketCategoryInAd
        }).then(function(e) {
            t.formatCategoryData(e);
        });
    },
    formatCategoryData: function(t) {
        var e = [];
        t && (e = t.map(function(t) {
            return t.AdvertList.map(function(t) {
                t.MediumLogoUrl = a.formatUrl(t.MediumLogoUrl), t.ImageUrl = a.formatUrl(t.ImageUrl), 
                t.PublishTime = a.formatArticleTime(t.PublishTime);
            }), t;
        })), this.setData({
            hotCardinfo: e
        });
    },
    queryQuestionList: function() {
        var t = this;
        if (this.data.qaInfo.canLoadMore) {
            var i = this.getSelData();
            return a.request({
                url: n.service.queryQuestionList,
                method: "GET",
                data: e({
                    pageNo: this.data.qaInfo.pageNo,
                    limit: this.data.qaInfo.limit
                }, i)
            }).then(function(e) {
                var n = [];
                e && (n = t.formatQuestionList(e), t.setData({
                    questionList: 1 === t.data.qaInfo.pageNo ? n : t.data.questionList.concat(n),
                    "qaInfo.canLoadMore": n.length === t.data.qaInfo.limit
                }));
            }).catch(function(t) {});
        }
    },
    formatQuestionList: function(t) {
        return t.map(function(t) {
            t.avatarUrl = a.formatUrl(t.AvatarUrl);
            var e = [], n = new Date().getTime();
            if (t.Images && t.Images.length) {
                var i = 1 === t.Images.length ? "medium" : "mini";
                t.Images.forEach(function(t, o) {
                    e.push({
                        id: n + 100 * o,
                        imgSrc: a.formatUrl(t),
                        imgSize: i
                    });
                });
            }
            t.covers = e;
            var o = [];
            return t.TypeTags && t.TypeTags.length && t.TypeTags.split(",").forEach(function(t, e) {
                o.push({
                    id: n + 100 * e,
                    name: t
                });
            }), t.typeTags = o, t.IsResolved ? (t.statusText = "已解决", t.questionStatusType = "solution") : (t.statusText = "问", 
            t.questionStatusType = "question"), t.questionStatus = "qaQuestion", t.answerNumPos = "bottom", 
            t.CreateTime ? t.createTime = a.formatQuestionCreateTime(t.CreateTime.replace(/[\.\-]/g, "/")) : t.createTime = "", 
            t.createTime = t.createTime.replace(/\//g, ".").split(" ")[0], t;
        });
    },
    canPublish: function() {
        this.setData({
            consultantStatus: !0
        });
    }
});