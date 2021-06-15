var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
        var e = arguments[n];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, e = require("./config"), o = require("./utils/index.js"), i = require("./utils/plugins/globalNotify.js").default, a = require("./utils/plugins/qq_map/qqmap-wx-jssdk.min.js");

App(n({
    onLaunch: function(t) {
        var n = this, e = wx.getSystemInfoSync();
        this.globalData.navH = e.statusBarHeight + 45, this.globalData.deviceWidth = e.windowWidth, 
        this.globalData.deviceHeight = e.windowHeight, this.globalData.screenHeight = e.screenHeight, 
        this.globalData.statusBarHeight = e.statusBarHeight, this.globalData.SDKVersion = e.SDKVersion, 
        this.globalData.isIpx = e.model.indexOf("iPhone X") > -1, this.globalData.Notify = i, 
        o.computedRpxToPxRatio(function(t) {
            n.globalData.rpxToPxRatio = t;
        });
        var a = wx.getUpdateManager();
        a.onCheckForUpdate(function(t) {
            t.hasUpdate && a.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否立即更新？",
                    confirmText: "更新",
                    confirmColor: "#FE5E10",
                    success: function(t) {
                        t.confirm && a.applyUpdate();
                    }
                });
            });
        });
    },
    onShow: function(t) {
        t.scene && (this.globalData.appSceneCode = t.scene);
    },
    checkSession: function(t) {
        var n = this, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (e.isShare && e.cityId && this.globalData.operatingCityList.length && this.checkCityInfo(this.globalData.operatingCityList, e), 
        this.globalData.currentLoginState) return t();
        wx.showLoading({
            title: "加载中..."
        }), o.promisify(wx.checkSession)().then(function(t) {
            return n.getUserInfo();
        }).then(function(o) {
            return n.checkToken(o).then(function() {
                n.cityMain(e).then(function() {
                    wx.hideLoading(), t && t();
                });
            });
        }).catch(function(o) {
            Promise.all([ n.login(), n.cityMain(e) ]).then(function(n) {
                t && t();
            });
        });
    },
    authorizeUserInfo: function(t, n) {
        var i = this;
        if (!this.globalData.isAuthorizing) {
            var a = t.detail || t, l = a.encryptedData, r = a.iv, s = a.errMsg;
            if ("getUserInfo:ok" === s || "getUserProfile:ok" === s) {
                wx.showLoading({
                    title: "授权中"
                }), this.globalData.isAuthorizing = !0;
                var u = this.globalData.userInfo, c = u.SessionId, g = u.UnionId, f = u.OpenId;
                return o.request({
                    url: e.service.weixinInMem,
                    method: "POST",
                    data: {
                        SessionId: c,
                        UnionId: g,
                        OpenId: f,
                        iv: r,
                        encryptedData: l
                    }
                }).then(function(t) {
                    i.login(function(t) {
                        o.wxToast("授权成功"), i.updatePageStackUserInfo(), n && n(t), i.globalData.isAuthorizing = !1;
                    });
                }).catch(function(t) {
                    o.wxToast("授权失败"), wx.hideLoading(), i.globalData.isAuthorizing = !1;
                });
            }
        }
    },
    authorizePhoneNumber: function(t, n) {
        var i = this, a = t.detail, l = a.encryptedData, r = a.iv;
        if ("getPhoneNumber:ok" === a.errMsg) return o.request({
            url: e.service.weixinPhone,
            method: "POST",
            data: {
                SessionId: this.globalData.userInfo.SessionId,
                EncryptedData: l,
                iv: r
            },
            loading: {
                title: "授权中..."
            }
        }).then(function(t) {
            i.globalData.userInfo.PhoneNumber = t, wx.setStorage({
                key: "userInfo",
                data: i.globalData.userInfo
            }), o.updateProerty("userInfo", i.globalData.userInfo), i.updatePageStackUserInfo(), 
            o.wxToast("授权成功"), n && n.success && n.success(t);
        }).catch(function(t) {
            o.wxToast("授权失败"), n && n.fail && n.fail();
        });
        n.fail && n.fail();
    },
    updatePageStackUserInfo: function() {
        var t = this;
        getCurrentPages().forEach(function(n) {
            n.data.userInfo && n.setData({
                userInfo: t.globalData.userInfo
            });
        });
    }
}, {
    cityMain: function(t) {
        var n = this;
        return this.getOperatingCityList().then(function(e) {
            return n.checkCityInfo(e, t);
        });
    },
    checkCityInfo: function(t, n) {
        var e = this, o = n.isShare, i = void 0 === o ? 0 : o, a = n.cityId, l = void 0 === a ? null : a;
        return new Promise(function(n, o) {
            var a = e.globalData.cityInfo, r = function(o) {
                o = o || t.filter(function(t) {
                    return t.IsMain;
                })[0], e.globalData.cityInfo = o, e.setCityInfo(o), n(o || null);
            };
            i && l ? (a = t.filter(function(t) {
                return t.CityId === l;
            })[0], r(a)) : e.updateCityInfo().then(function(t) {
                var n = e.getCityInfo();
                n && n.CityName !== t.CityName ? (wx.hideLoading(), wx.showModal({
                    title: "当前城市: " + n.CityName,
                    content: "是否切换到定位城市: " + t.CityName,
                    showCancel: !0,
                    confirmText: "切换城市",
                    confirmColor: "#FE5E10",
                    success: function(e) {
                        e.cancel && (t = n), r(t);
                    }
                })) : r(t);
            }).catch(function(t) {
                r(e.getCityInfo());
            });
        });
    },
    getOperatingCityList: function() {
        var t = this;
        return new Promise(function(n, i) {
            var a = t.globalData.operatingCityList || [];
            a && a.length ? n(a) : o.request({
                url: e.service.getOperatingCityListAPI
            }).then(function(e) {
                var i = e.list, a = e.groupList;
                i && i.length && (t.globalData.operatingCityList = i.map(function(t) {
                    return t.cityName = t.CityName.slice(0, -1), t.officialWechatQrcodeUrl = o.formatUrl(t.OfficialWechatQrcodeUrl), 
                    t;
                }), t.globalData.operatingCityGroupList = a, n(i));
            }).catch(function(e) {
                console.log("获取已开通城市列表时失败:", e), n([ t.globalData.curCity ]);
            });
        });
    },
    queryCityInfoByName: function(t) {
        var e = null;
        return (this.globalData.operatingCityList || []).forEach(function(o, i) {
            o.CityName.includes(t) && (e = n({}, o));
        }), e || null;
    },
    updateCityInfo: function() {
        var t = this;
        return new Promise(function(n, e) {
            wx.getLocation({
                success: function(o) {
                    new a({
                        key: "6E4BZ-S5SRU-KIUVB-2AQSY-OKBE7-4TBT6"
                    }).reverseGeocoder({
                        location: {
                            latitude: o.latitude,
                            longitude: o.longitude
                        },
                        success: function(o) {
                            if (0 === o.status) {
                                var i = o.result, a = i.ad_info.city || i.address_component.city;
                                i.cityName = a.slice(0, -1);
                                var l = t.queryCityInfoByName(i.cityName);
                                n(l);
                            } else console.log("逆地址解析时非正常状态码: ", o && o.status), e(o);
                        },
                        fail: function(t) {
                            console.log("逆地址解析时失败: ", t), e(t);
                        }
                    });
                },
                fail: function(t) {
                    console.log("获取地理位置时失败: ", t), e(t);
                }
            });
        });
    },
    getCityInfo: function() {
        var t = null;
        try {
            t = wx.getStorageSync("cityInfo");
        } catch (t) {
            console.log("从本地存储中获取城市信息时失败: ", t);
        }
        return t;
    },
    setCityInfo: function(t) {
        try {
            wx.setStorage({
                key: "cityInfo",
                data: t
            });
        } catch (t) {
            console.log("存储城市信息时失败: ", t);
        }
    }
}, {
    checkToken: function(t, n) {
        var i = this;
        return new Promise(function(a, l) {
            t.Token ? o.request({
                url: e.service.tokenInMem,
                method: "POST",
                data: {
                    Token: t.Token.access_token
                }
            }).then(function(e) {
                e.IsOk ? (i.loginInitSuccess(t), n && n(), a()) : (console.log("失效的token,重新登录中..."), 
                l("失效的token,重新登录中..."));
            }).catch(function(t) {
                console.log("checkToken 时失败: ", t), l("checkToken 时失败");
            }) : (i.globalData.currentLoginState = 1, i.globalData.userInfo = t, i.globalData.token = t.Token ? t.Token.token_type + " " + t.Token.access_token : null, 
            i.globalData.brokerCode = t.RealtyConsultantInfo ? t.RealtyConsultantInfo.Buildings[0].ShortCode : null, 
            n && n(), a());
        });
    },
    login: function(t) {
        var n = this;
        if (!this.globalData.loginRequstLimiting) return this.globalData.loginRequstLimiting = 1, 
        o.promisify(wx.login)().then(function(i) {
            var a = i.code;
            return o.request({
                url: e.service.loginInLogin.replace("{code}", a),
                method: "POST",
                complete: function() {
                    wx.hideLoading();
                },
                data: {
                    EntranceType: o.getEntranceType()
                }
            }).then(function(e) {
                return setTimeout(function() {
                    n.globalData.loginRequstLimiting = 0;
                }, 2e3), e.WeixinAuthorized = e.WeixinAuthorized || e.Authorized || !1, wx.setStorageSync("userInfo", e), 
                n.loginInitSuccess(e), t && t(e), Promise.resolve();
            }).catch(function(t) {
                return n.globalData.isAuthorizing = !1, n.globalData.loginRequstLimiting = 0, Promise.reject();
            });
        });
    },
    loginInitSuccess: function(t) {
        this.globalData.userInfo = t, this.globalData.token = t.Token ? t.Token.token_type + " " + t.Token.access_token : null, 
        this.globalData.brokerCode = t.RealtyConsultantInfo ? t.RealtyConsultantInfo.Buildings[0].ShortCode : null, 
        t.UserType && !this.globalData.consultantInfo && t.WeixinAuthorized && this.getMyCenterInfo(), 
        this.getRealtyConsultantInfo(t), this.getTemplateIds(), o.updateProerty("userInfo", t), 
        !this.globalData.currentLoginState && o.handleEnterMetRecond(), this.globalData.currentLoginState = 1, 
        this.globalData.userInfo && this.globalData.userInfo.Blacklist ? this.redirectToLoginPage() : (this.globalData.mimcUser || !t.UnionId || t.Blacklist || wx.getLaunchOptionsSync().path.includes("pck_chat/chat/chat") || require("./utils/plugins/michat.js").init(this), 
        this.globalData.isMaintain && (this.globalData.isMaintain = !1, wx.reLaunch({
            url: "/pages/index/index"
        })));
    },
    getMyCenterInfo: function(t) {
        var n = this;
        return o.request({
            url: e.service.getMemberInfoInMem
        }).then(function(e) {
            var i = e.AvatarUrl, a = e.RealtyConsultantId;
            e.AvatarUrl = o.formatUrl(i), n.globalData.consultantInfo = e, a && (n.globalData.realtyConsultantId = a), 
            t && t(e);
        });
    },
    getRealtyConsultantInfo: function(t) {
        var n = t.RealtyConsultantInfo;
        n && (this.globalData.realtyConsultantId = n.RealtyConsultantId);
    },
    getUserInfo: function(n) {
        return new Promise(function(n, e) {
            var o = wx.getStorageSync("userInfo");
            o && "object" === (void 0 === o ? "undefined" : t(o)) ? o.Token && "00000000-0000-0000-0000-000000000000" !== o.SessionId ? n(o) : (console.log("本地存储的userInfo 缺少token"), 
            e("本地存储的userInfo 缺少token")) : (console.log("本地未缓存用户信息"), e("本地未缓存用户信息"));
        });
    },
    getTemplateIds: function() {
        var t = this;
        return this.globalData.templateIds ? Promise.resolve(this.globalData.templateIds) : o.request({
            url: e.service.getTemplateMessageIdInMsg,
            method: "GET"
        }).then(function(e) {
            e && (t.globalData.templateIds = n({}, e));
        }).catch(function(t) {
            console.log("获取订阅消息模板id时失败: ", t);
        });
    },
    redirectToLoginPage: function() {
        wx.reLaunch({
            url: "../login/index",
            fail: function(t) {
                console.error("跳转到登录页面时失败: ", t);
            }
        });
    }
}, {
    globalData: {
        version: e.currentVersion,
        userInfo: null,
        cityInfo: e.defaultCity,
        concatList: null,
        operatingCityList: [],
        operatingCityGroupList: [],
        consultantInfo: null,
        realtyConsultantId: null,
        realtyConsultantShotCode: null,
        isAuditing: !1,
        token: null,
        navH: 0,
        deviceWidth: 0,
        curCity: e.defaultCity,
        curSchool: null,
        marketTab: null,
        isAuthorizing: !1,
        isMaintain: !1,
        defaultShareText: "买新房，上必有房",
        mimcUser: null,
        authToChat: !0,
        authToChatUnionId: "",
        hasChangeBuildingStatus: !1,
        hasChangeBrokerFollow: !1,
        projectToPoster: null,
        buildingToPoster: null,
        brokerCode: "",
        hasChatLogin: !1,
        pricePerRoomFiles: null,
        Notify: null,
        templateIds: null,
        imgsPathInfo: {
            rootPath: "" + e.imgRootUrl
        },
        currentLoginState: 0,
        loginRequstLimiting: 0,
        rpxToPxRatio: 1,
        commentRestriction: {
            LimitCount: 0,
            TodayCount: 0,
            TodayReplyCount: 0,
            ReplyLimitCount: 0
        },
        followCount: 0,
        subscribeMessageUnRead: !1,
        systemMessageUnRead: !1,
        hasChatNoReader: !1
    }
}));