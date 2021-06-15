var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

!function(t, e) {
    "object" == ("undefined" == typeof exports ? "undefined" : n(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Ald = e();
}(void 0, function() {
    function t(n) {
        this.app = n;
    }
    function e(n) {
        C = w(), N = n, this.aldstat = new t(this);
    }
    function o(n) {
        var t;
        t = n.scene != an, an = n.scene, j = 0, N = n, G = n.query.ald_share_src, K = n.query.aldsrc || "", 
        V = n.query.ald_share_src, on || (J = !1), on = !1, rn || (0 !== O && Date.now() - O > 3e4 ? (H = w(), 
        U = Date.now()) : t && (U = Date.now(), H = w())), 0 !== O && Date.now() - O < 3e4 && (Y = !0), 
        n.query.ald_share_src && "1044" == n.scene && n.shareTicket ? wx.getShareInfo({
            shareTicket: n.shareTicket,
            success: function(n) {
                $ = n, A("event", "ald_share_click", JSON.stringify(n));
            }
        }) : n.query.ald_share_src && A("event", "ald_share_click", 1), "" === z && wx.getSetting({
            withCredentials: !0,
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(n) {
                        var t = v();
                        z = n, t.ufo = y(n), T = g(n.userInfo.avatarUrl.split("/")), p(t);
                    }
                });
            }
        }), _("app", "show");
    }
    function r() {
        O = Date.now(), "" === z && wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(n) {
                        z = n, T = g(n.userInfo.avatarUrl.split("/"));
                        var t = v();
                        t.ufo = y(n), p(t);
                    }
                });
            }
        }), _("app", "hide");
    }
    function i(n) {
        W++, A("event", "ald_error_message", n);
    }
    function a(n) {
        tn = n;
    }
    function s() {
        Z = k ? this.$mp.page.route : this.route, x("page", "show"), Y = !1;
    }
    function c() {
        nn = Z;
    }
    function u() {
        nn = Z;
    }
    function f() {
        A("event", "ald_pulldownrefresh", 1);
    }
    function l() {
        A("event", "ald_reachbottom", 1);
    }
    function h(n) {
        rn = !0;
        var t = S(n.path), e = {};
        for (var o in N.query) "ald_share_src" === o && (e[o] = N.query[o]);
        var r = "";
        if (r = -1 == n.path.indexOf("?") ? n.path + "?" : n.path.substr(0, n.path.indexOf("?")) + "?", 
        "" !== t) for (var o in t) e[o] = t[o];
        e.ald_share_src ? -1 == e.ald_share_src.indexOf(Q) && e.ald_share_src.length < 200 && (e.ald_share_src = e.ald_share_src + "," + Q) : e.ald_share_src = Q;
        for (var i in e) -1 == i.indexOf("ald") && (r += i + "=" + e[i] + "&");
        return n.path = r + "ald_share_src=" + e.ald_share_src, A("event", "ald_share_status", n), 
        n;
    }
    function d() {
        function n() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        return n() + n() + n() + n() + n() + n() + n() + n();
    }
    function p(n) {
        j++, n.at = H, n.et = Date.now(), n.uu = Q, n.v = P, n.ak = q.app_key.replace(/(\t)|(\s)/g, ""), 
        n.wsr = N, n.ifo = J, n.rq_c = j, n.ls = C, n.st = Date.now(), n.te = L;
        var t = {
            AldStat: "MiniApp-Stat",
            se: E || "",
            op: B || "",
            img: T
        };
        "" === R || (t.ai = R), wx.Queue.push(function() {
            return new Promise(function(e, o) {
                wx.request({
                    url: "https://" + I + ".aldwx.com/d.html",
                    data: n,
                    header: t,
                    method: "GET",
                    success: function(n) {
                        e(200 == n.statusCode ? "" : "status error");
                    },
                    fail: function() {
                        e("fail");
                    }
                });
            });
        });
    }
    function v() {
        var n = {};
        for (var t in F) n[t] = F[t];
        return n;
    }
    function g(n) {
        for (var t = "", e = 0; e < n.length; e++) n[e].length > t.length && (t = n[e]);
        return t;
    }
    function w() {
        return "" + Date.now() + Math.floor(1e7 * Math.random());
    }
    function y(n) {
        var t = {};
        for (var e in n) "rawData" != e && "errMsg" != e && (t[e] = n[e]);
        return t;
    }
    function S(n) {
        if (-1 == n.indexOf("?")) return "";
        var t = {};
        return n.split("?")[1].split("&").forEach(function(n) {
            var e = n.split("=")[1];
            t[n.split("=")[0]] = e;
        }), t;
    }
    function m(t) {
        for (var e in t) if ("object" == n(t[e]) && null !== t[e]) return !0;
        return !1;
    }
    function _(n, t) {
        var e = v();
        e.ev = n, e.life = t, e.ec = W, e.dr = Date.now() - U, K && (e.qr = K, e.sr = K), 
        G && (e.usr = G), p(e);
    }
    function x(n, t) {
        var e = v();
        e.ev = n, e.life = t, e.pp = Z, e.pc = nn, e.dr = Date.now() - U, rn && (e.so = 1), 
        rn = !1, tn && "{}" != JSON.stringify(tn) && (e.ag = tn), K && (e.qr = K, e.sr = K), 
        G && (e.usr = G), Y && (e.ps = 1), X || (en = Z, X = !0, e.ifp = X, e.fp = Z), p(e);
    }
    function A(n, t, e) {
        var o = v();
        o.ev = n, o.tp = t, o.dr = Date.now() - U, e && (o.ct = e), p(o);
    }
    function D(n, t, e) {
        if (n[t]) {
            var o = n[t];
            n[t] = function(n) {
                e.call(this, n, t), o.call(this, n);
            };
        } else n[t] = function(n) {
            e.call(this, n, t);
        };
    }
    function M(n) {
        var t = {};
        for (var a in n) "onLaunch" !== a && "onShow" !== a && "onHide" !== a && "onError" !== a && (t[a] = n[a]);
        return t.onLaunch = function(t) {
            e.call(this, t), "function" == typeof n.onLaunch && n.onLaunch.call(this, t);
        }, t.onShow = function(t) {
            o.call(this, t), n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t);
        }, t.onHide = function() {
            r.call(this), n.onHide && "function" == typeof n.onHide && n.onHide.call(this);
        }, t.onError = function(t) {
            i.call(this, t), n.onError && "function" == typeof n.onError && n.onError.call(this, t);
        }, t;
    }
    function b(n) {
        var t = {};
        for (var e in n) "onLoad" !== e && "onShow" !== e && "onHide" !== e && "onUnload" !== e && "onPullDownRefresh" !== e && "onReachBottom" !== e && "onShareAppMessage" !== e && (t[e] = n[e]);
        return t.onLoad = function(t) {
            a.call(this, t), "function" == typeof n.onLoad && n.onLoad.call(this, t);
        }, t.onShow = function(t) {
            s.call(this), "function" == typeof n.onShow && n.onShow.call(this, t);
        }, t.onHide = function(t) {
            c.call(this), "function" == typeof n.onHide && n.onHide.call(this, t);
        }, t.onUnload = function(t) {
            u.call(this), "function" == typeof n.onUnload && n.onUnload.call(this, t);
        }, t.onReachBottom = function(t) {
            l(), n.onReachBottom && "function" == typeof n.onReachBottom && n.onReachBottom.call(this, t);
        }, t.onPullDownRefresh = function(t) {
            f(), n.onPullDownRefresh && "function" == typeof n.onPullDownRefresh && n.onPullDownRefresh.call(this, t);
        }, n.onShareAppMessage && "function" == typeof n.onShareAppMessage && (t.onShareAppMessage = function(t) {
            var e = n.onShareAppMessage.call(this, t);
            return void 0 === e ? (e = {}, e.path = this.route) : void 0 === e.path && (e.path = this.route), 
            h.call(this, e);
        }), t;
    }
    void 0 === wx.Queue && (wx.Queue = new function() {
        this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;
        var n = this;
        this.push = function(t) {
            this.tasks.push(new Promise(function(e, o) {
                var r = function() {
                    n.activeCount++, t().then(function(n) {
                        e(n);
                    }).then(function() {
                        n.next();
                    });
                };
                n.activeCount < n.concurrency ? r() : n.queue.push(r);
            }));
        }, this.all = function() {
            return Promise.all(this.tasks);
        }, this.next = function() {
            n.activeCount--, n.queue.length > 0 && n.queue.shift()();
        };
    }(), wx.Queue.all());
    var q = require("./ald-stat-conf"), P = "7.2.8", I = "log", L = "wx", R = void 0 === wx.getAccountInfoSync ? "" : wx.getAccountInfoSync().miniProgram.appId.split("").map(function(n) {
        return n.charCodeAt(0) + 9;
    }).join("-"), k = !1, H = "", C = "", U = 0, O = 0, E = "", B = "", T = "", j = 0, N = "", J = "", Q = function() {
        var n = "";
        try {
            n = wx.getStorageSync("aldstat_uuid");
        } catch (t) {
            n = "uuid_getstoragesync";
        }
        if (n) J = !1; else {
            n = d();
            try {
                wx.setStorageSync("aldstat_uuid", n), J = !0;
            } catch (n) {
                wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");
            }
        }
        return n;
    }(), G = "", K = "", V = "", W = 0, $ = "", z = "", F = {}, X = !1, Y = !1, Z = "", nn = "", tn = "", en = "", on = !0, rn = !1, an = "";
    wx.request({
        url: "https://" + I + ".aldwx.com/config/app.json",
        header: {
            AldStat: "MiniApp-Stat"
        },
        method: "GET",
        success: function(n) {
            200 === n.statusCode && (P < n.data.version && console.warn("您的SDK不是最新版本，请尽快升级！"), 
            n.data.warn && console.warn(n.data.warn), n.data.error && console.error(n.data.error));
        }
    });
    try {
        var sn = wx.getSystemInfoSync();
        F.br = sn.brand, F.pm = sn.model, F.pr = sn.pixelRatio, F.ww = sn.windowWidth, F.wh = sn.windowHeight, 
        F.lang = sn.language, F.wv = sn.version, F.wvv = sn.platform, F.wsdk = sn.SDKVersion, 
        F.sv = sn.system;
    } catch (n) {}
    return wx.getNetworkType({
        success: function(n) {
            F.nt = n.networkType;
        }
    }), wx.getSetting({
        success: function(n) {
            n.authSetting["scope.userLocation"] ? wx.getLocation({
                type: "wgs84",
                success: function(n) {
                    F.lat = n.latitude, F.lng = n.longitude, F.spd = n.speed;
                }
            }) : q.getLocation && wx.getLocation({
                type: "wgs84",
                success: function(n) {
                    F.lat = n.latitude, F.lng = n.longitude, F.spd = n.speed;
                }
            });
        }
    }), t.prototype.sendEvent = function(t, e) {
        if ("" !== t && "string" == typeof t && t.length <= 255) if ("string" == typeof e && e.length <= 255) A("event", t, e); else if ("object" == (void 0 === e ? "undefined" : n(e))) {
            if (JSON.stringify(e).length >= 255) return void console.error("自定义事件参数不能超过255个字符");
            if (m(e)) return void console.error("事件参数，参数内部只支持Number,String等类型，请参考接入文档");
            A("event", t, JSON.stringify(e));
        } else void 0 === e ? A("event", t, !1) : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符"); else console.error("事件名称必须为String类型且不能超过255个字符");
    }, t.prototype.sendSession = function(n) {
        if ("" !== n && n) {
            E = n;
            var t = v();
            t.tp = "session", t.ct = "session", t.ev = "event", "" === z ? wx.getSetting({
                success: function(n) {
                    n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(n) {
                            t.ufo = y(n), T = g(n.userInfo.avatarUrl.split("/")), "" !== $ && (t.gid = $), p(t);
                        }
                    }) : "" !== $ && (t.gid = $, p(t));
                }
            }) : (t.ufo = z, "" !== $ && (t.gid = $), p(t));
        } else console.error("请传入从后台获取的session_key");
    }, t.prototype.sendOpenid = function(n) {
        if ("" !== n && n) {
            B = n;
            var t = v();
            t.tp = "openid", t.ev = "event", t.ct = "openid", p(t);
        } else console.error("openID不能为空");
    }, q.plugin ? {
        App: function(n) {
            return App(M(n));
        },
        Page: function(n) {
            return Page(b(n));
        },
        MpvueApp: function(n) {
            return k = !0, M(n);
        },
        MpvuePage: function(n) {
            return b(n);
        }
    } : void function() {
        var n = App, t = Page, d = Component;
        App = function(t) {
            D(t, "onLaunch", e), D(t, "onShow", o), D(t, "onHide", r), D(t, "onError", i), n(t);
        }, Page = function(n) {
            var e = n.onShareAppMessage;
            D(n, "onLoad", a), D(n, "onUnload", u), D(n, "onShow", s), D(n, "onHide", c), D(n, "onReachBottom", l), 
            D(n, "onPullDownRefresh", f), void 0 !== e && null !== e && (n.onShareAppMessage = function(n) {
                if (void 0 !== e) {
                    var t = e.call(this, n);
                    return void 0 === t ? (t = {}, t.path = Z) : void 0 === t.path && (t.path = Z), 
                    h(t);
                }
            }), t(n);
        }, Component = function(n) {
            try {
                var t = n.methods.onShareAppMessage;
                D(n.methods, "onLoad", a), D(n.methods, "onUnload", u), D(n.methods, "onShow", s), 
                D(n.methods, "onHide", c), D(n.methods, "onReachBottom", l), D(n.methods, "onPullDownRefresh", f), 
                void 0 !== t && null !== t && (n.methods.onShareAppMessage = function(n) {
                    if (void 0 !== t) {
                        var e = t.call(this, n);
                        return void 0 === e ? (e = {}, e.path = Z) : void 0 === e.path && (e.path = Z), 
                        h(e);
                    }
                }), d(n);
            } catch (t) {
                d(n);
            }
        };
    }();
});