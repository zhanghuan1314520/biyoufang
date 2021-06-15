var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("../../config.js"), r = (require("../plugins/ald/ald-stat.js"), require("../rqeuest/index.js").request), a = require("../formatTime/index.js").formatQuestionCreateTime, i = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, n = function(e) {
    var t = e.getFullYear(), r = e.getMonth() + 1, a = e.getDate(), n = e.getHours(), o = e.getMinutes(), u = e.getSeconds();
    return [ t, r, a ].map(i).join("/") + " " + [ n, o, u ].map(i).join(":");
}, o = function(e) {
    return e ? e.startsWith("data:image") || e.startsWith("http") || e.startsWith("https") ? e : "" + t.ossRootUrl + e : null;
}, u = function(e, r) {
    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "prefix";
    if (!e) return "";
    if (e.startsWith("data:image")) return e;
    var i = t.ossRootUrl;
    if (/(.jpeg|.jpg|.png|.svg|.webp|.gif)$/i.test(e)) switch (a) {
      case "process":
        return e + "?x-oss-process=" + r;

      case "prefix":
        return (e.startsWith("http") || e.startsWith("https") ? e : i + e) + (r ? "?x-oss-process=" + r : "");
    } else switch (a) {
      case "prefix":
        return e.startsWith("http") || e.startsWith("https") ? e : i + e;

      default:
        return e;
    }
}, s = function(e) {
    switch (1 * e) {
      case 0:
        return "即将预售";

      case 1:
        return "即将登记";

      case 2:
        return "正在登记";

      case 3:
        return "即将摇号";

      case 4:
        return "即将选房";

      case 5:
        return "已选房";

      case 6:
        return "近期开盘";

      case 7:
        return "不限购";
    }
}, c = function(e) {
    switch (1 * e) {
      case 0:
        return "即将预售";

      case 1:
        return "即将登记";

      case 2:
        return "正在登记";

      case 3:
        return "即将摇号";

      case 4:
        return "即将选房";

      case 5:
        return "已选房";

      default:
        return "";
    }
}, l = function(e) {
    switch (1 * e.Status) {
      case 0:
        return e.PreSaleTime ? "预计" + e.PreSaleTime.substr(5, 2) + "月" : "待定";

      case 1:
      case 2:
        return g(e);

      case 3:
        return e.LotteryTime ? "" + e.LotteryTime.substr(0, 10).replace(/-/g, ".") : "未知";

      case 4:
        return e.BuyStartTime ? "" + e.BuyStartTime.substr(0, 10).replace(/-/g, ".") : "未知";

      case 5:
        return e.BuyStartTime ? "" + e.BuyStartTime.substr(0, 10).replace(/-/g, ".") : "";

      default:
        return "";
    }
}, g = function(e) {
    return e.RegisterStartTime ? f(e.RegisterStartTime) + "-" + f(e.RegisterEndTime) : "待定";
}, f = function(e) {
    return "string" != typeof e ? "" : e.substr(0, 10).replace(/-/g, ".");
}, d = function(e) {
    return 2 === e.Status ? m(e.RegisterEndTime) : 1 === e.Status ? m(e.RegisterStartTime) : -1;
}, m = function(e) {
    if (!e) return "";
    var t = new Date(e.replace(/[\.\-]/g, "/")), r = new Date(), a = t.getFullYear(), i = t.getMonth() + 1, n = t.getDate(), o = r.getFullYear(), u = r.getMonth() + 1, s = r.getDate();
    if (a === o && i === u) return n - s;
    if (a === o && i > u) return p(u, o) - s + n;
    if (a > o) {
        for (var c = p(u, o) - s, l = n, g = u + 1; g < 12; g++) c += p(g, o);
        for (var f = 1; f < i; f++) l += p(f, a);
        return c + l;
    }
    return -1;
}, p = function(e, t) {
    switch (e) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;

      case 2:
        return T(t) ? 29 : 28;

      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
    }
}, T = function(e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}, S = function(e) {
    return e.MinTotalPrice ? parseInt(e.MinTotalPrice / 1e4) : 0;
}, h = function(e) {
    switch (e) {
      case 0:
        return "待售";

      case 1:
        return "在售";

      case 2:
        return "售罄";

      case 3:
        return "待加推";

      default:
        return "";
    }
}, v = function() {
    var e = [ "即将预售", "已拿预售证", "即将选房", "已选房" ], t = [ "即将预售", "已拿预售证", "即将认筹", "正在认筹", "认筹结束", "即将摇号", "即将选房", "已选房" ], r = {};
    return [ "即将预售", "即将登记", "正在登记", "即将摇号", "即将选房", "已选房", "登记结束" ].forEach(function(e, t) {
        r["0-" + t] = e;
    }), t.forEach(function(e, t) {
        r["1-" + t] = e;
    }), e.forEach(function(e, t) {
        r["2-" + t] = e;
    }), r;
}, b = function(e) {
    return v()[e] || "";
}, y = function(e) {
    var t = "";
    if (!e.ProjectStatus && 0 !== e.ProjectStatus || 1 !== e.BuildingStatus) switch (e.BuildingStatus) {
      case 0:
        t = "待售";
        break;

      case 1:
        t = "在售";
        break;

      case 2:
        t = "售罄";
    } else {
        var r = e.VersionType + "-" + e.ProjectStatus;
        "即将登记" !== (t = b(r)) || e.RegisterStartTime ? -1 === e.ProjectStatus && (t = "在售") : t = "已拿预售证";
    }
    return t;
}, I = function(e) {
    if (e) {
        var t = function(e) {
            e = "number" == typeof e ? e : e.replace(/[\.\-]/g, "/");
            var t = new Date(e), r = t.getMonth() + 1, a = t.getDate(), i = {
                year: t.getFullYear(),
                month: r > 9 ? r : "0" + r,
                date: a > 9 ? a : "0" + a
            };
            return i.year + "-" + i.month + "-" + i.date;
        }, r = new Date(t(Date.now())).getTime();
        return (new Date(t(e)).getTime() - r) / 864e5;
    }
}, w = function(e, t) {
    var r = "", a = e.RegisterStartTime || "", i = e.RegisterEndTime || "", n = e.FillRegisterEndTime || "", o = new Date().getTime();
    a = new Date(a.replace(/[\.\-]/g, "/")).getTime(), i = new Date(i.replace(/[\.\-]/g, "/")).getTime(), 
    n = n ? new Date(n.replace(/[\.\-]/g, "/")).getTime() : 0;
    if (0 === e.VersionType) {
        if (1 === e.ProjectStatus && a > o) {
            var u = I(e.RegisterStartTime);
            r = u >= 2 ? u + "天后登记" : "明天登记", 0 === u && a > o && (r = e.RegisterStartTime && e.RegisterStartTime.slice(10, -3) + "开始登记");
        }
        if (2 === e.ProjectStatus) if (n && i < o) r = "补交资料中"; else if (i > o) {
            var s = I(e.RegisterEndTime);
            r = s >= 2 ? s + "天后截止" : "明天截止登记", 0 === s && i > o && (r = e.RegisterEndTime && e.RegisterEndTime.slice(10, -3) + "截止登记");
        }
    }
    if (1 === e.VersionType) {
        if (2 === e.ProjectStatus && a > o) {
            var c = I(e.RegisterStartTime);
            r = c >= 2 ? c + "天后认筹" : "明天认筹", 0 === c && a > o && (r = e.RegisterStartTime && e.RegisterStartTime.slice(10, -3) + "开始认筹");
        }
        if (3 === e.ProjectStatus && i > o) {
            var l = I(e.RegisterEndTime);
            r = l >= 2 ? l + "天后截止" : "明天截止认筹", 0 === l && i > o && (r = e.RegisterEndTime && e.RegisterEndTime.slice(10, -3) + "截止认筹");
        }
    }
    if (2 === e.VersionType && 2 === e.ProjectStatus && a > o) {
        var g = I(e.RegisterStartTime);
        r = g >= 2 ? g + "天后选房" : "明天选房", 0 === g && a > o && (r = e.RegisterStartTime && e.RegisterStartTime.slice(10, -3) + "开始选房");
    }
    return r;
}, P = function(e, t) {
    var r = e.ProjectStatus, a = e.HistoricalAveragePrice, i = e.AveragePrice, n = e.MinTotalPrice, o = e.BuildingStatus, u = e.BuildingForSale, s = void 0 !== u && u, c = "价格待定", l = "";
    switch (o) {
      case 0:
        break;

      case 2:
        a && (c = a + "元/㎡（参考价格）");
        break;

      case 1:
        if (a && (c = a + "元/㎡（参考价格）"), r && r >= 0) {
            if (r) {
                var g = n && Math.floor(n / 1e4);
                i && (c = i + "元/㎡"), g && i && (c = g + "万起", l = i + "元/㎡"), g && s && (c = g + "万起");
            }
            r > 0 && !i && (c = "价格待定");
        }
    }
    t.showPastText = c.includes("（参考价格）"), t.buildingTotalPrice = c, t.buildingAveragePrice = l;
}, D = function(e) {
    return e >= 1e4 ? (e / 1e4).toFixed(1) + "w" : e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e || "";
}, R = function(e) {
    return e ? e >= 1e4 ? (e / 1e4).toFixed(1) + "w" : e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e : 0;
}, x = function(e) {
    var t = "";
    switch (1 * e) {
      case 0:
        t = "住宅";
        break;

      case 1:
        t = "商住";
    }
    return t;
};

module.exports = {
    promisify: function(e) {
        return function(t) {
            return new Promise(function(r, a) {
                t = Object.assign({
                    success: r,
                    fail: a
                }, t), e(t);
            });
        };
    },
    formatUrl: o,
    formatProjectStatus: s,
    formatStatusShortText: c,
    formatRegisterTime: f,
    formatCurrentStatusTime: l,
    formatPublicityTimeInDetail: function(e) {
        return "string" != typeof e ? "" : e.substr(0, 10).replace(/-/g, ".");
    },
    trim: function(e) {
        return "string" != typeof e ? "" : e.replace(/^\s+|\s+$/gm, "");
    },
    formatRestDay: d,
    formatPhoneNumber: function(e) {
        if (!e) return "";
        var t = /^(\d{3})\d{4}(\d{4})$/;
        return e.replace(t, "$1****$2");
    },
    formatBrokerStatus: function(e) {
        switch (1 * e) {
          case 0:
            return "待审核";

          case 1:
            return "审核不通过";

          case 2:
            return "启用中";

          case 3:
            return "已禁用";
        }
    },
    formatRankDescType: function(e) {
        return 1 === e.IntegralRanking && 0 === e.IntegralDiffer ? 0 : 1 === e.IntegralRanking && 0 !== e.IntegralDiffer ? 1 : 1 !== e.IntegralRanking && e.IntegralRanking !== e.TotalIntegralRanking ? 2 : 1 !== e.IntegralRanking && e.TotalIntegralRanking === e.IntegralRanking ? 3 : void 0;
    },
    formatDistance: function(e) {
        return e ? e < 1e3 ? parseInt(e) + "m" : (e / 1e3).toFixed(1) + "km" : "";
    },
    sectionToChinese: function(e) {
        for (var t = [ "零", "一", "二", "三", "四", "五", "六", "七", "八", "九" ], r = [ "", "十", "百", "千", "万", "亿", "万亿", "亿亿" ], a = "", i = "", n = e, o = 0, u = !0; e > 0; ) {
            var s = e % 10;
            0 === s ? u || (u = !0, i = t[s] + i) : (u = !1, a = t[s], i = (a += r[o]) + i), 
            o++, e = Math.floor(e / 10);
        }
        return n > 10 && n < 20 && (i = i.slice(1)), i;
    },
    formatTotalPrice: S,
    formatAldSource: function(e) {
        switch (1 * e) {
          case -1:
            return "未知来源";

          case 0:
            return "首页";

          case 1:
            return "楼盘汇总列表";

          case 2:
            return "推荐楼盘";

          case 3:
            return "近期开盘";

          case 4:
            return "状态分类列表";

          default:
            return "未知来源";
        }
    },
    formatFloatLinkUrl: function(e) {
        return e.ShotUrl && e.ShotUrl.indexOf("project") > -1 ? e.ShotUrl.substring(8) : "";
    },
    formatFloatLinkType: function(e) {
        return e.ShotUrl ? e.ShotUrl.indexOf("project") > -1 ? 1 : 2 : "";
    },
    formatViewsNumber: R,
    recordPurchaseArticleView: function(e) {
        return r({
            url: t.service.getBuyHouseDetailInAd.replace("{id}", e)
        });
    },
    handleHomeInfoLists: function(e) {
        return e.map(function(e) {
            var t = e.CoverImageUrl || e.CoverFileUrl;
            return e.CoverImageUrl = o(t), e.StatusText = s(e.Status), e.StatusShortText = 1 === e.BuildingStatus ? c(e.Status) : h(e.BuildingStatus), 
            e.CurrentStatusTime = l(e), e.AveragePrice = parseInt(e.AveragePrice), e.RestDay = d(e), 
            e.buildingTags = e.BuildingTags ? e.BuildingTags.split(",") : "", e.totalPrice = S(e), 
            e.totalViewNumber = R(e.TotalViewNumber), e.SubwayDistanceText = "", e.SubwayDistance && e.SubwayDistance <= 1500 && (e.SubwayDistance < 1e3 ? e.SubwayDistanceText = e.SubwayDistance + "m" : e.SubwayDistanceText = (e.SubwayDistance / 1e3).toFixed(1) + "km"), 
            e;
        });
    },
    fixedNumber: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return e ? e % 1 == 0 ? e : Math.round(e * Math.pow(10, t)) / Math.pow(10, t) : 0;
    },
    deepCopy: function(e) {
        return JSON.parse(JSON.stringify(e));
    },
    isPhone: function(e) {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(e);
    },
    compare: function(e) {
        return function(t, r) {
            var a = t[e], i = r[e];
            return a < i ? -1 : a > i ? 1 : 0;
        };
    },
    deepCopyHard: function t(r) {
        var a = Array.isArray(r) ? [] : {};
        for (var i in r) r.hasOwnProperty(i) && ("object" === e(r[i]) && null !== r[i] ? a[i] = t(r[i]) : a[i] = r[i]);
        return a;
    },
    checkArticle: function(e) {
        var t = e.currentTarget.dataset, r = t.url, a = t.title, i = t.id, n = void 0 === i ? "" : i, o = t.articleId, u = void 0 === o ? "" : o;
        r && (r = encodeURIComponent(r), wx.navigateTo({
            url: "/h5_webview/article_webview/article_webview?url=" + r + "&title=" + encodeURIComponent(a) + "&id=" + (u || n)
        }));
    },
    goChat: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pck_chat/chat/chat?unionId=" + t
        });
    },
    scrollPageToBottom: function() {
        wx.pageScrollTo({
            scrollTop: 1e5,
            duration: 0
        });
    },
    observe: function(e, t, r) {
        var a = e[t];
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !0,
            set: function(e) {
                a = e, r && r(e, a);
            },
            get: function() {
                return a;
            }
        });
    },
    toggleFollowBroker: function(e) {
        var a = e.Id ? e.Id : e.ConsultantId;
        return r({
            url: t.service.followConsultantInFlw.replace("{consultantid}", a),
            method: e.IsFollow ? "DELETE" : "POST",
            loading: !0
        });
    },
    formatBuildingStatusShortText: h,
    recordTemplateVisit: function(e, a) {
        if (e && a) return r({
            url: t.service.recordTemplateVisit,
            data: {
                openId: e,
                templateId: a
            }
        });
    },
    recordShareVisit: function(e, a) {
        var i = getApp();
        if (e && a && i.globalData.brokerCode != e) {
            var n = i.globalData.userInfo.OpenId;
            return r({
                url: t.service.recordShareVisitInMem.replace("{openId}", n),
                method: "POST",
                data: {
                    ConsultantCode: e,
                    OpenId: n,
                    PageUrl: a
                }
            });
        }
    },
    checkAudit: function() {
        var e = getApp();
        return r({
            url: t.service.checkAudit,
            method: "POST",
            data: {
                Version: e.globalData.version
            }
        }).then(function(t) {
            e.globalData.isAuditing = t.IsAuditing;
        });
    },
    addBrokerClickRecord: function(e) {
        r({
            url: t.service.addBrokerClickRecord,
            data: e,
            method: "POST"
        });
    },
    formatQaList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return e.map(function(e) {
            e.avatarUrl = o(e.AvatarUrl);
            var r = [], i = new Date().getTime();
            if (e.Images && e.Images.length) {
                var n = 1 === e.Images.length ? "medium" : "mini";
                e.Images.forEach(function(e, t) {
                    r.push({
                        id: i + 100 * t,
                        imgSrc: o(e),
                        imgSize: n
                    });
                });
            }
            e.covers = r;
            var u = [];
            return e.TypeTags && e.TypeTags.length && e.TypeTags.split(",").forEach(function(e, t) {
                u.push({
                    id: i + 100 * t,
                    name: e
                });
            }), e.typeTags = u, e.IsResolved ? (e.statusText = "已解决", e.questionStatusType = "solution") : (e.statusText = "问", 
            e.questionStatusType = "question"), e.questionStatus = "qaUserQuestion", e.answerNumPos = "bottom", 
            e.CreateTime ? e.createTime = a(e.CreateTime.replace(/[\.\-]/g, "/")) : e.createTime = "", 
            e.createTime = e.createTime.replace(/\//g, ".").split(" ")[0], e.NickName = e.NickName || t.NickName, 
            e.avatarUrl = o(e.AvatarUrl || t.AvatarUrl), e;
        }), e;
    },
    formatBuildingInfo: function(e, t) {
        var r = {
            idx: e.idx,
            buildingName: e.BuildingName ? e.BuildingName : "",
            buildingId: e.BuildingId ? e.BuildingId : "",
            buildingStatus: e.BuildingStatus,
            projectId: e.ProjectId ? e.ProjectId : "",
            projectStatus: e.ProjectStatus,
            coverImageUrl: u(e.CoverImageUrl || e.ImageUrl, "image/format,webp/resize,w_350"),
            totalViewText: D(e.TotalViewNumber),
            _districtName: (e.DistrictName ? e.DistrictName : "") + (e.PlateName ? "-" + e.PlateName : ""),
            districtName: e.DistrictName ? e.DistrictName : "",
            buildingAreaText: e.BuildingArea ? "建面" + e.BuildingArea + "㎡" : "",
            buildingType: e.PropertyType || 0 === e.PropertyType ? e.PropertyType : "",
            buildingTotalPrice: "",
            buildingAveragePrice: "",
            showPastText: !1,
            registerInfo: e.registerInfo ? e.registerInfo : "",
            capitalVerification: e.CapitalVerification ? e.CapitalVerification : "",
            preferentialInfo: e.PreferentialInfo ? e.PreferentialInfo : "",
            subscribeStatus: e.subscribeStatus ? e.subscribeStatus : 0,
            subscribePhone: e.subscribePhone ? e.subscribePhone : "",
            followStatus: e.followStatus ? e.followStatus : 0,
            otherName: e.OtherName || "",
            subwayDistance: e.SubwayDistance || "",
            subwayDistanceText: ""
        }, a = r.subwayDistance;
        return a && (r.subwayDistanceText = a > 1e3 ? "地铁" + (a / 1e3).toFixed(1) + "km" : "地铁" + a + "m"), 
        r.buildingStatusText = y(e), r.hasSoldOut = !e.ProjectStatus && 0 !== e.ProjectStatus && 2 === e.BuildingStatus, 
        r.buildingStatusTip = w(e), P(e, r), r.buildingType || 0 === r.buildingType ? r.buildingTypeText = x(r.buildingType) : r.buildingAreaText = "", 
        e.BuildingTags && e.BuildingTags.length ? r.buildingTag = e.BuildingTags.split(",") : r.buildingTag = [], 
        r;
    },
    formatBuildingTypeText: x,
    formatBuildingStatusText: y,
    buildingJump: function(e) {
        var t = e.detail, r = (t = void 0 === t ? {} : t).eventType, a = t.buildingCardInfo;
        if ("goDetailPage" === r) {
            var i = "/pages/detail/detail?buildingId=" + a.buildingId + "&isShare=0&projectId=" + a.projectId;
            wx.navigateTo({
                url: i
            });
        }
    },
    recordInteractTarck: function(e) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        if (e) {
            var n = getApp(), o = {
                url: t.service.interactTarck.replace("{consultantId}", e),
                method: "post",
                data: {
                    OpenId: n.globalData.userInfo.OpenId,
                    UserSystem: 0,
                    CityId: n.globalData.cityInfo.CityId,
                    SourcePort: "Android",
                    EventKey: "CallPhone",
                    UnionId: n.globalData.userInfo.UnionId,
                    BuildingId: a,
                    Remark: i
                }
            };
            return r(o);
        }
    },
    daysApart: I,
    getRelativeCurrentTime: function(e) {
        var t = (e - Date.now()) / 1e3;
        return t <= 0 ? 0 : {
            days: Math.floor(t / 86400),
            hours: Math.floor(t % 86400 / 3600),
            minutes: Math.floor(t / 60 % 60),
            seconds: Math.floor(t % 60)
        };
    },
    serializationUrlParams: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (e && "{}" != typeof e) {
            var t = "?";
            return Object.keys(e).forEach(function(r) {
                t += r + "=" + e[r] + "&";
            }), t.slice(0, -1);
        }
    },
    validateContentReg: function(e, t) {
        var r = /[1-9][0-9]{4,10}/g, a = /[1][3,4,5,6,7,8,9][0-9]{9}/g;
        return !(e.search(r) > -1 || e.search(a) > -1) || (t && wx.showToast({
            icon: "none",
            title: t,
            duration: 2e3
        }), !1);
    },
    formatNumber: i,
    recordByAld: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "未知操作", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = getApp();
        t["用户ID"] = r.globalData.userInfo && r.globalData.userInfo.OpenId ? r.globalData.userInfo.OpenId : "未知用户", 
        t["触发时间"] = n(new Date()), r.aldstat.sendEvent(e, t);
    },
    formatOSSLink: u
};