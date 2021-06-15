function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, a = require("../../config.js"), o = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        slideIn: null,
        moreBtnShow: !1,
        navBtnShow: !0,
        backTopIconShow: !1,
        topBarShow: !0,
        welcomeShow: !0,
        adverForm: null,
        advertId: "",
        fromBuilding: !1,
        animationTimerId: "",
        sizeInfo: {
            clientHeight: 0,
            pageHeight: 0,
            isReachBottom: !1
        },
        slideInOrOut: null,
        navH: 0,
        buttonTextList: {
            WelcomeHome: "",
            MakeAnAppointment: "",
            ReservedFirstCopywriting: "",
            ReservedSecondCopywriting: ""
        },
        wxLiveConfiguration: {
            Show: !1
        },
        enterPageTime: Date.now()
    },
    getAdvertDetail: function() {
        var e = this;
        return o.request({
            url: a.service.getLongPullAdvert.replace("{advertId}", this.data.advertId),
            data: {
                userSystem: 0,
                openId: this.data.userInfo.OpenId,
                fromBuilding: this.data.fromBuilding
            }
        }).then(function(t) {
            var a = t.Content, i = t.WelcomeImageUrl, n = t.FollowImageUrl, r = t.AvatarUrls, s = t.NickNames, d = t.ButtonTextList, c = t.WxLiveConfiguration, l = t.Title;
            t.Content = a.replace(/\<img/gi, '<img style="width: 100%; vertical-align: top; background-color: #D8D8D8" '), 
            t.Content = e.matchFormContent(t), t.WelcomeImageUrl = o.formatOSSLink(i, "image/format,webp"), 
            t.FollowImageUrl = o.formatUrl(n), t.AvatarUrls = r.map(function(e) {
                return o.formatOSSLink(e, "image/format,webp/resize,w_100");
            }), t.NickNames = s.filter(function(e) {
                return e;
            }), e.setData({
                adverForm: t,
                buttonTextList: d,
                wxLiveConfiguration: c || null
            }, function() {
                setTimeout(function() {
                    e.getPageSize();
                }, 800);
            }), l && wx.setNavigationBarTitle({
                title: l
            });
        });
    },
    matchFormContent: function(e) {
        var t = this, a = e.Content, i = e.VideoUrl, n = /<img.*?\/?.*?>|<video.*?\/?.*?>.*?<\/video>/gi, r = [], s = a.match(n), d = !1;
        return s && s.forEach(function(e, a) {
            switch (t.matchTagField(e, "type")) {
              case "appointmentForm":
                d = !0, r.push({
                    type: "appointment-form"
                });
                break;

              case "video":
                var o = t.matchTagField(e, "data-video-url"), i = t.autoMatchVideoSize(t.matchTagField(e, "data-video-width") || 750, t.matchTagField(e, "data-video-height") || 420), n = i.width, s = i.height;
                r.push({
                    poster: o + "?x-oss-process=video/snapshot,t_1000,f_jpg,w_" + n + ",h_" + s + ",m_fast",
                    type: "video",
                    id: "pullLongVideo" + a,
                    url: o,
                    width: n,
                    height: s
                });
                break;

              case "imageTheme":
                r.push({
                    type: "imageTheme",
                    buildingId: t.matchTagField(e, "data-building-id"),
                    element: e
                });
                break;

              default:
                r.push(e);
            }
        }), !d && r.push({
            type: "appointment-form"
        }), i && r.unshift({
            type: "video",
            url: o.formatUrl(i),
            selectorId: "pullLongVideo",
            poster: o.formatUrl(i) + "?x-oss-process=video/snapshot,t_1000,f_jpg,w_750,h_420,m_fast",
            width: 750,
            height: 420
        }), r.length ? r : [ a ];
    },
    autoMatchVideoSize: function(e, t) {
        var a = i.globalData.rpxToPxRatio;
        t /= a;
        var o = 750 / (e /= a);
        return {
            width: Math.ceil(e * o),
            height: Math.ceil(t * o)
        };
    },
    matchTagField: function(e, t) {
        var a = new RegExp(t + '="(.*?)"', "i");
        try {
            return e.match(a)[1] || "";
        } catch (e) {
            return "";
        }
    },
    recordLongpageAppointment: function(e) {
        return e && (e.advertId || e.AdvertId) ? o.request({
            url: a.service.recordLongpageAppointment.replace("{advertId}", e.advertId || e.AdvertId),
            method: "POST",
            data: t({}, e, {
                UserSystem: 0,
                CityId: i.globalData.cityInfo && i.globalData.cityInfo.CityId || "",
                SourcePort: "MiniProgram",
                Openid: i.globalData.userInfo.OpenId,
                BrowseTime: Math.round((Date.now() - this.data.enterPageTime) / 1e3)
            }),
            loading: {
                title: "预约中..."
            }
        }) : Promise.reject();
    },
    toggleSlideAnimation: function() {
        this.setData({
            moreBtnShow: !this.data.moreBtnShow
        });
    },
    handleNavBtn: function(t) {
        switch (t.detail.type) {
          case "more":
            this.toggleSlideAnimation();
            break;

          case "focus":
            this.setData({
                "adverForm.IsFollow": !this.data.adverForm.IsFollow
            });
            break;

          case "closeModel":
            var a = t.detail.property;
            if (this.setData(e({}, a, !1)), "welcomeShow" === a) {
                var n = this.data.userInfo.PhoneNumber, r = void 0 === n ? "" : n;
                r && o.recordLongpageClick({
                    advertId: this.data.advertId,
                    SourceType: 8,
                    PhoneNumber: r,
                    BrowseTime: Math.round((Date.now() - this.data.enterPageTime) / 1e3)
                }), o.recordLongpageClick({
                    advertId: this.data.advertId,
                    SourceType: 9
                });
            }
            break;

          case "authorizeUserInfo":
            this.setData({
                userInfo: i.globalData.userInfo
            });
            break;

          case "authorizePhoneNumber":
            this.setData({
                userInfo: i.globalData.userInfo
            }), this.handlePhoneNumberAut(t);
        }
    },
    handlePhoneNumberAut: function(e) {
        var t = this, a = e.detail, n = a.source, r = a.status, s = a.name, d = a.phoneNumber;
        switch (n) {
          case "welcomeHome":
            this.setData({
                welcomeShow: !1
            });
            break;

          case "navButton":
            try {
                o.wxToast("请通过表单进行提交"), wx.createSelectorQuery().selectAll(".reserve-form-ele").boundingClientRect().selectViewport().scrollOffset().exec(function(e) {
                    var t = e[0][e[0].length - 1];
                    wx.pageScrollTo({
                        scrollTop: t.top + e[1].scrollTop - i.globalData.navH - 84 / i.globalData.rpxToPxRatio
                    });
                });
            } catch (e) {
                o.wxToast("请通过表单进行提交");
            }
            break;

          default:
            r && this.recordLongpageAppointment({
                PhoneNumber: d,
                Name: s,
                advertId: this.data.advertId,
                IsFromForm: "reserveForm" === n
            }).then(function(e) {
                wx.pageScrollTo({
                    scrollTop: 0
                }), wx.showModal({
                    title: "预约成功",
                    content: "感谢您的信任，我们将尽快为您服务。",
                    confirmColor: "#FE6010",
                    showCancel: !1,
                    confirmText: "确认"
                }), t.setData({
                    "adverForm.HaveBooked": !0,
                    "adverForm.AppointmentNumber": ++t.data.adverForm.AppointmentNumber
                }, function() {
                    setTimeout(function() {
                        t.getPageSize();
                    }, 300);
                });
            });
        }
    },
    touchMove: function(e) {
        var t = this.data, a = t.navBtnShow, o = t.topBarShow, i = t.backTopIconShow;
        (a || o) && (this.setData({
            navBtnShow: !1,
            topBarShow: !1
        }), i && this.backTopAnimation(!1));
    },
    touchEnd: function(e) {
        var t = this, a = this.data.animationTimerId;
        a && clearTimeout(a), this.data.animationTimerId = setTimeout(function() {
            var e = t.data, a = e.navBtnShow, o = e.topBarShow, i = e.backTopIconShow, n = t.data.sizeInfo.isReachBottom;
            a || n || t.setData({
                navBtnShow: !0
            }), o || t.setData({
                topBarShow: !0
            }), i && t.backTopAnimation(!0);
        }, 800);
    },
    getPageSize: function() {
        var e = this, t = wx.createSelectorQuery();
        t.select(".container").boundingClientRect(), t.exec(function(t) {
            e.data.sizeInfo.pageHeight = t[0].height;
        });
    },
    backToTop: function() {
        var e = this;
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300,
            success: function() {
                e.touchEnd();
            }
        });
    },
    backTopAnimation: function(e) {
        var t = e ? "30rpx" : "-90rpx";
        this.slideAnimation.right(t).step(), this.setData({
            slideInOrOut: this.slideAnimation.export()
        });
    },
    createAnimation: function(e) {
        this.slideAnimation = wx.createAnimation(e);
    },
    onPageScroll: function(e) {
        var t = this.data.sizeInfo, a = (t.clientHeight, t.pageHeight, t.isReachBottom, 
        this.data), o = a.backTopIconShow, i = a.topBarShow;
        e.scrollTop > 200 ? o || (this.data.backTopIconShow = !0, i && this.backTopAnimation(!0)) : o && (this.data.backTopIconShow = !1, 
        this.backTopAnimation(!1));
    },
    onLoad: function(e) {
        var t = this;
        this.createAnimation({
            timingFunction: "ease",
            duration: 300
        }), i.checkSession(function() {
            var a = i.globalData.userInfo;
            t.setData({
                userInfo: a,
                advertId: e.advertId,
                fromBuilding: e.fromBuilding || !1,
                "sizeInfo.clientHeight": wx.getSystemInfoSync().windowHeight,
                navH: i.globalData.navH
            }, function() {
                t.getAdvertDetail();
            });
        }, o.getShareParams(e));
    },
    onShow: function() {
        this.data.enterPageTime = Date.now();
    },
    onShareAppMessage: function() {
        return o.extractShareFn({
            util: o,
            app: i
        });
    },
    themeNavigateBuildingPage: function(e) {
        var t = e.currentTarget.dataset.info;
        o.navigatePage({
            url: "/pages/detail/detail?buildingId=" + t.buildingId
        }), o.recordLongpageClick({
            advertId: this.data.advertId,
            SourceType: 7
        });
    },
    onNavigator: function(e) {
        var t = e.detail.page;
        o.recordLongAdvertExitPaht(this.data.advertId, {
            BrowseTime: Math.round((Date.now() - this.data.enterPageTime) / 1e3),
            JumpPath: "pages/index/index" === t ? 0 : 1
        });
    }
});