var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, n) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define([ "exports" ], n) : n(e.echarts = {});
}(void 0, function(e) {
    function n(t, e) {
        "createCanvas" === t && (Zu = null), Hu[t] = e;
    }
    function i(e) {
        if (null == e || "object" != (void 0 === e ? "undefined" : t(e))) return e;
        var n = e, r = zu.call(e);
        if ("[object Array]" === r) {
            if (!z(e)) {
                n = [];
                for (var a = 0, o = e.length; o > a; a++) n[a] = i(e[a]);
            }
        } else if (Eu[r]) {
            if (!z(e)) {
                var s = e.constructor;
                if (e.constructor.from) n = s.from(e); else {
                    n = new s(e.length);
                    for (var a = 0, o = e.length; o > a; a++) n[a] = i(e[a]);
                }
            }
        } else if (!Ou[r] && !z(e) && !T(e)) {
            n = {};
            for (var l in e) e.hasOwnProperty(l) && (n[l] = i(e[l]));
        }
        return n;
    }
    function r(t, e, n) {
        if (!b(e) || !b(t)) return n ? i(e) : t;
        for (var a in e) if (e.hasOwnProperty(a)) {
            var o = t[a], s = e[a];
            !b(s) || !b(o) || _(s) || _(o) || T(s) || T(o) || M(s) || M(o) || z(s) || z(o) ? !n && a in t || (t[a] = i(e[a], !0)) : r(o, s, n);
        }
        return t;
    }
    function a(t, e) {
        for (var n = t[0], i = 1, a = t.length; a > i; i++) n = r(n, t[i], e);
        return n;
    }
    function o(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }
    function s(t, e, n) {
        for (var i in e) e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);
        return t;
    }
    function l() {
        return Zu || (Zu = Gu().getContext("2d")), Zu;
    }
    function h(t, e) {
        if (t) {
            if (t.indexOf) return t.indexOf(e);
            for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n;
        }
        return -1;
    }
    function u(t, e) {
        function n() {}
        var i = t.prototype;
        n.prototype = e.prototype, t.prototype = new n();
        for (var r in i) t.prototype[r] = i[r];
        t.prototype.constructor = t, t.superClass = e;
    }
    function c(t, e, n) {
        s(t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, n);
    }
    function d(t) {
        return t ? "string" != typeof t && "number" == typeof t.length : void 0;
    }
    function f(t, e, n) {
        if (t && e) if (t.forEach && t.forEach === Nu) t.forEach(e, n); else if (t.length === +t.length) for (var i = 0, r = t.length; r > i; i++) e.call(n, t[i], i, t); else for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t);
    }
    function p(t, e, n) {
        if (t && e) {
            if (t.map && t.map === Vu) return t.map(e, n);
            for (var i = [], r = 0, a = t.length; a > r; r++) i.push(e.call(n, t[r], r, t));
            return i;
        }
    }
    function g(t, e, n, i) {
        if (t && e) {
            if (t.reduce && t.reduce === Wu) return t.reduce(e, n, i);
            for (var r = 0, a = t.length; a > r; r++) n = e.call(i, n, t[r], r, t);
            return n;
        }
    }
    function v(t, e, n) {
        if (t && e) {
            if (t.filter && t.filter === Bu) return t.filter(e, n);
            for (var i = [], r = 0, a = t.length; a > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);
            return i;
        }
    }
    function m(t, e) {
        var n = Fu.call(arguments, 2);
        return function() {
            return t.apply(e, n.concat(Fu.call(arguments)));
        };
    }
    function y(t) {
        var e = Fu.call(arguments, 1);
        return function() {
            return t.apply(this, e.concat(Fu.call(arguments)));
        };
    }
    function _(t) {
        return "[object Array]" === zu.call(t);
    }
    function x(t) {
        return "function" == typeof t;
    }
    function w(t) {
        return "[object String]" === zu.call(t);
    }
    function b(e) {
        var n = void 0 === e ? "undefined" : t(e);
        return "function" === n || !!e && "object" === n;
    }
    function M(t) {
        return !!Ou[zu.call(t)];
    }
    function S(t) {
        return !!Eu[zu.call(t)];
    }
    function T(e) {
        return "object" == (void 0 === e ? "undefined" : t(e)) && "number" == typeof e.nodeType && "object" == t(e.ownerDocument);
    }
    function C(t) {
        return t !== t;
    }
    function I() {
        for (var t = 0, e = arguments.length; e > t; t++) if (null != arguments[t]) return arguments[t];
    }
    function A(t, e) {
        return null != t ? t : e;
    }
    function k(t, e, n) {
        return null != t ? t : null != e ? e : n;
    }
    function D() {
        return Function.call.apply(Fu, arguments);
    }
    function P(t) {
        if ("number" == typeof t) return [ t, t, t, t ];
        var e = t.length;
        return 2 === e ? [ t[0], t[1], t[0], t[1] ] : 3 === e ? [ t[0], t[1], t[2], t[1] ] : t;
    }
    function L(t, e) {
        if (!t) throw new Error(e);
    }
    function O(t) {
        return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    function E(t) {
        t[Xu] = !0;
    }
    function z(t) {
        return t[Xu];
    }
    function R(t) {
        function e(t, e) {
            n ? i.set(t, e) : i.set(e, t);
        }
        var n = _(t);
        this.data = {};
        var i = this;
        t instanceof R ? t.each(e) : t && f(t, e);
    }
    function N(t) {
        return new R(t);
    }
    function B() {}
    function F(t, e) {
        var n = new Yu(2);
        return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n;
    }
    function V(t, e) {
        return t[0] = e[0], t[1] = e[1], t;
    }
    function W(t) {
        var e = new Yu(2);
        return e[0] = t[0], e[1] = t[1], e;
    }
    function H(t, e, n) {
        return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;
    }
    function G(t, e, n, i) {
        return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t;
    }
    function Z(t, e, n) {
        return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;
    }
    function X(t) {
        return Math.sqrt(q(t));
    }
    function q(t) {
        return t[0] * t[0] + t[1] * t[1];
    }
    function Y(t, e, n) {
        return t[0] = e[0] * n, t[1] = e[1] * n, t;
    }
    function j(t, e) {
        var n = X(e);
        return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t;
    }
    function U(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
    }
    function $(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
    }
    function K(t, e, n) {
        var i = e[0], r = e[1];
        return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;
    }
    function Q(t, e, n) {
        return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;
    }
    function J(t, e, n) {
        return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;
    }
    function tt() {
        this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), 
        this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this);
    }
    function et(t, e) {
        return {
            target: t,
            topTarget: e && e.topTarget
        };
    }
    function nt(t, e) {
        var n = t._$eventProcessor;
        return null != e && n && n.normalizeQuery && (e = n.normalizeQuery(e)), e;
    }
    function it(t, e, n, i, r, a) {
        var o = t._$handlers;
        if ("function" == typeof n && (r = i, i = n, n = null), !i || !e) return t;
        n = nt(t, n), o[e] || (o[e] = []);
        for (var s = 0; s < o[e].length; s++) if (o[e][s].h === i) return t;
        var l = {
            h: i,
            one: a,
            query: n,
            ctx: r || t,
            callAtLast: i.zrEventfulCallAtLast
        }, h = o[e].length - 1, u = o[e][h];
        return u && u.callAtLast ? o[e].splice(h, 0, l) : o[e].push(l), t;
    }
    function rt(t) {
        return t.getBoundingClientRect ? t.getBoundingClientRect() : {
            left: 0,
            top: 0
        };
    }
    function at(t, e, n, i) {
        return n = n || {}, i || !Lu.canvasSupported ? ot(t, e, n) : Lu.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, 
        n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : ot(t, e, n), 
        n;
    }
    function ot(t, e, n) {
        var i = rt(t);
        n.zrX = e.clientX - i.left, n.zrY = e.clientY - i.top;
    }
    function st(t, e, n) {
        if (null != (e = e || window.event).zrX) return e;
        var i = e.type;
        if (i && i.indexOf("touch") >= 0) {
            var r = "touchend" !== i ? e.targetTouches[0] : e.changedTouches[0];
            r && at(t, r, e, n);
        } else at(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
        var a = e.button;
        return null == e.which && void 0 !== a && nc.test(e.type) && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), 
        e;
    }
    function lt(t, e, n) {
        ec ? t.addEventListener(e, n) : t.attachEvent("on" + e, n);
    }
    function ht(t, e, n) {
        ec ? t.removeEventListener(e, n) : t.detachEvent("on" + e, n);
    }
    function ut(t) {
        return 2 === t.which || 3 === t.which;
    }
    function ct(t) {
        var e = t[1][0] - t[0][0], n = t[1][1] - t[0][1];
        return Math.sqrt(e * e + n * n);
    }
    function dt(t) {
        return [ (t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2 ];
    }
    function ft(t, e, n) {
        return {
            type: t,
            event: n,
            target: e.target,
            topTarget: e.topTarget,
            cancelBubble: !1,
            offsetX: n.zrX,
            offsetY: n.zrY,
            gestureEvent: n.gestureEvent,
            pinchX: n.pinchX,
            pinchY: n.pinchY,
            pinchScale: n.pinchScale,
            wheelDelta: n.zrDelta,
            zrByTouch: n.zrByTouch,
            which: n.which,
            stop: pt
        };
    }
    function pt() {
        ic(this.event);
    }
    function gt() {}
    function vt(t, e, n) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
            for (var i, r = t; r; ) {
                if (r.clipPath && !r.clipPath.contain(e, n)) return !1;
                r.silent && (i = !0), r = r.parent;
            }
            return !i || oc;
        }
        return !1;
    }
    function mt() {
        var t = new hc(6);
        return yt(t), t;
    }
    function yt(t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
    }
    function _t(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], 
        t;
    }
    function xt(t, e, n) {
        var i = e[0] * n[0] + e[2] * n[1], r = e[1] * n[0] + e[3] * n[1], a = e[0] * n[2] + e[2] * n[3], o = e[1] * n[2] + e[3] * n[3], s = e[0] * n[4] + e[2] * n[5] + e[4], l = e[1] * n[4] + e[3] * n[5] + e[5];
        return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t;
    }
    function wt(t, e, n) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], 
        t;
    }
    function bt(t, e, n) {
        var i = e[0], r = e[2], a = e[4], o = e[1], s = e[3], l = e[5], h = Math.sin(n), u = Math.cos(n);
        return t[0] = i * u + o * h, t[1] = -i * h + o * u, t[2] = r * u + s * h, t[3] = -r * h + u * s, 
        t[4] = u * a + h * l, t[5] = u * l - h * a, t;
    }
    function Mt(t, e, n) {
        var i = n[0], r = n[1];
        return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, 
        t[5] = e[5] * r, t;
    }
    function St(t, e) {
        var n = e[0], i = e[2], r = e[4], a = e[1], o = e[3], s = e[5], l = n * o - a * i;
        return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, 
        t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null;
    }
    function Tt(t) {
        return t > dc || -dc > t;
    }
    function Ct(t) {
        this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, 
        this._initialized = !1, this.loop = null != t.loop && t.loop, this.gap = t.gap || 0, 
        this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, 
        this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1;
    }
    function It(t) {
        return 0 > (t = Math.round(t)) ? 0 : t > 255 ? 255 : t;
    }
    function At(t) {
        return 0 > (t = Math.round(t)) ? 0 : t > 360 ? 360 : t;
    }
    function kt(t) {
        return 0 > t ? 0 : t > 1 ? 1 : t;
    }
    function Dt(t) {
        return It(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));
    }
    function Pt(t) {
        return kt(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t));
    }
    function Lt(t, e, n) {
        return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t;
    }
    function Ot(t, e, n) {
        return t + (e - t) * n;
    }
    function Et(t, e, n, i, r) {
        return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t;
    }
    function zt(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
    }
    function Rt(t, e) {
        Cc && zt(Cc, e), Cc = Tc.put(t, Cc || e.slice());
    }
    function Nt(t, e) {
        if (t) {
            e = e || [];
            var n = Tc.get(t);
            if (n) return zt(e, n);
            var i = (t += "").replace(/ /g, "").toLowerCase();
            if (i in Sc) return zt(e, Sc[i]), Rt(t, e), e;
            if ("#" !== i.charAt(0)) {
                var r = i.indexOf("("), a = i.indexOf(")");
                if (-1 !== r && a + 1 === i.length) {
                    var o = i.substr(0, r), s = i.substr(r + 1, a - (r + 1)).split(","), l = 1;
                    switch (o) {
                      case "rgba":
                        if (4 !== s.length) return void Et(e, 0, 0, 0, 1);
                        l = Pt(s.pop());

                      case "rgb":
                        return 3 !== s.length ? void Et(e, 0, 0, 0, 1) : (Et(e, Dt(s[0]), Dt(s[1]), Dt(s[2]), l), 
                        Rt(t, e), e);

                      case "hsla":
                        return 4 !== s.length ? void Et(e, 0, 0, 0, 1) : (s[3] = Pt(s[3]), Bt(s, e), Rt(t, e), 
                        e);

                      case "hsl":
                        return 3 !== s.length ? void Et(e, 0, 0, 0, 1) : (Bt(s, e), Rt(t, e), e);

                      default:
                        return;
                    }
                }
                Et(e, 0, 0, 0, 1);
            } else {
                if (4 === i.length) return (h = parseInt(i.substr(1), 16)) >= 0 && 4095 >= h ? (Et(e, (3840 & h) >> 4 | (3840 & h) >> 8, 240 & h | (240 & h) >> 4, 15 & h | (15 & h) << 4, 1), 
                Rt(t, e), e) : void Et(e, 0, 0, 0, 1);
                if (7 === i.length) {
                    var h = parseInt(i.substr(1), 16);
                    return h >= 0 && 16777215 >= h ? (Et(e, (16711680 & h) >> 16, (65280 & h) >> 8, 255 & h, 1), 
                    Rt(t, e), e) : void Et(e, 0, 0, 0, 1);
                }
            }
        }
    }
    function Bt(t, e) {
        var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360, i = Pt(t[1]), r = Pt(t[2]), a = .5 >= r ? r * (i + 1) : r + i - r * i, o = 2 * r - a;
        return e = e || [], Et(e, It(255 * Lt(o, a, n + 1 / 3)), It(255 * Lt(o, a, n)), It(255 * Lt(o, a, n - 1 / 3)), 1), 
        4 === t.length && (e[3] = t[3]), e;
    }
    function Ft(t) {
        if (t) {
            var e, n, i = t[0] / 255, r = t[1] / 255, a = t[2] / 255, o = Math.min(i, r, a), s = Math.max(i, r, a), l = s - o, h = (s + o) / 2;
            if (0 === l) e = 0, n = 0; else {
                n = .5 > h ? l / (s + o) : l / (2 - s - o);
                var u = ((s - i) / 6 + l / 2) / l, c = ((s - r) / 6 + l / 2) / l, d = ((s - a) / 6 + l / 2) / l;
                i === s ? e = d - c : r === s ? e = 1 / 3 + u - d : a === s && (e = 2 / 3 + c - u), 
                0 > e && (e += 1), e > 1 && (e -= 1);
            }
            var f = [ 360 * e, n, h ];
            return null != t[3] && f.push(t[3]), f;
        }
    }
    function Vt(t, e) {
        var n = Nt(t);
        if (n) {
            for (var i = 0; 3 > i; i++) n[i] = 0 > e ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, 
            n[i] > 255 ? n[i] = 255 : t[i] < 0 && (n[i] = 0);
            return Gt(n, 4 === n.length ? "rgba" : "rgb");
        }
    }
    function Wt(t, e, n) {
        if (e && e.length && t >= 0 && 1 >= t) {
            n = n || [];
            var i = t * (e.length - 1), r = Math.floor(i), a = Math.ceil(i), o = e[r], s = e[a], l = i - r;
            return n[0] = It(Ot(o[0], s[0], l)), n[1] = It(Ot(o[1], s[1], l)), n[2] = It(Ot(o[2], s[2], l)), 
            n[3] = kt(Ot(o[3], s[3], l)), n;
        }
    }
    function Ht(t, e, n) {
        if (e && e.length && t >= 0 && 1 >= t) {
            var i = t * (e.length - 1), r = Math.floor(i), a = Math.ceil(i), o = Nt(e[r]), s = Nt(e[a]), l = i - r, h = Gt([ It(Ot(o[0], s[0], l)), It(Ot(o[1], s[1], l)), It(Ot(o[2], s[2], l)), kt(Ot(o[3], s[3], l)) ], "rgba");
            return n ? {
                color: h,
                leftIndex: r,
                rightIndex: a,
                value: i
            } : h;
        }
    }
    function Gt(t, e) {
        if (t && t.length) {
            var n = t[0] + "," + t[1] + "," + t[2];
            return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")";
        }
    }
    function Zt(t, e) {
        return t[e];
    }
    function Xt(t, e, n) {
        t[e] = n;
    }
    function qt(t, e, n) {
        return (e - t) * n + t;
    }
    function Yt(t, e, n) {
        return n > .5 ? e : t;
    }
    function jt(t, e, n, i, r) {
        var a = t.length;
        if (1 === r) for (s = 0; a > s; s++) i[s] = qt(t[s], e[s], n); else for (var o = a && t[0].length, s = 0; a > s; s++) for (var l = 0; o > l; l++) i[s][l] = qt(t[s][l], e[s][l], n);
    }
    function Ut(t, e, n) {
        var i = t.length, r = e.length;
        if (i !== r) if (i > r) t.length = r; else for (o = i; r > o; o++) t.push(1 === n ? e[o] : Dc.call(e[o]));
        for (var a = t[0] && t[0].length, o = 0; o < t.length; o++) if (1 === n) isNaN(t[o]) && (t[o] = e[o]); else for (var s = 0; a > s; s++) isNaN(t[o][s]) && (t[o][s] = e[o][s]);
    }
    function $t(t, e, n) {
        if (t === e) return !0;
        var i = t.length;
        if (i !== e.length) return !1;
        if (1 === n) {
            for (a = 0; i > a; a++) if (t[a] !== e[a]) return !1;
        } else for (var r = t[0].length, a = 0; i > a; a++) for (var o = 0; r > o; o++) if (t[a][o] !== e[a][o]) return !1;
        return !0;
    }
    function Kt(t, e, n, i, r, a, o, s, l) {
        var h = t.length;
        if (1 === l) for (c = 0; h > c; c++) s[c] = Qt(t[c], e[c], n[c], i[c], r, a, o); else for (var u = t[0].length, c = 0; h > c; c++) for (var d = 0; u > d; d++) s[c][d] = Qt(t[c][d], e[c][d], n[c][d], i[c][d], r, a, o);
    }
    function Qt(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }
    function Jt(t) {
        if (d(t)) {
            var e = t.length;
            if (d(t[0])) {
                for (var n = [], i = 0; e > i; i++) n.push(Dc.call(t[i]));
                return n;
            }
            return Dc.call(t);
        }
        return t;
    }
    function te(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), 
        "rgba(" + t.join(",") + ")";
    }
    function ee(t) {
        var e = t[t.length - 1].value;
        return d(e && e[0]) ? 2 : 1;
    }
    function ne(t, e, n, i, r, a) {
        var o = t._getter, s = t._setter, l = "spline" === e, h = i.length;
        if (h) {
            var u, c = d(i[0].value), f = !1, p = !1, g = c ? ee(i) : 0;
            i.sort(function(t, e) {
                return t.time - e.time;
            }), u = i[h - 1].time;
            for (var v = [], m = [], y = i[0].value, _ = !0, x = 0; h > x; x++) {
                v.push(i[x].time / u);
                var w = i[x].value;
                if (c && $t(w, y, g) || !c && w === y || (_ = !1), y = w, "string" == typeof w) {
                    var b = Nt(w);
                    b ? (w = b, f = !0) : p = !0;
                }
                m.push(w);
            }
            if (a || !_) {
                for (var M = m[h - 1], x = 0; h - 1 > x; x++) c ? Ut(m[x], M, g) : !isNaN(m[x]) || isNaN(M) || p || f || (m[x] = M);
                c && Ut(o(t._target, r), M, g);
                var S, T, C, I, A, k, D = 0, P = 0;
                if (f) var L = [ 0, 0, 0, 0 ];
                var O = new Ct({
                    target: t._target,
                    life: u,
                    loop: t._loop,
                    delay: t._delay,
                    onframe: function(t, e) {
                        var n;
                        if (0 > e) n = 0; else if (P > e) {
                            for (n = S = Math.min(D + 1, h - 1); n >= 0 && !(v[n] <= e); n--) ;
                            n = Math.min(n, h - 2);
                        } else {
                            for (n = D; h > n && !(v[n] > e); n++) ;
                            n = Math.min(n - 1, h - 2);
                        }
                        D = n, P = e;
                        var i = v[n + 1] - v[n];
                        if (0 !== i) if (T = (e - v[n]) / i, l) if (I = m[n], C = m[0 === n ? n : n - 1], 
                        A = m[n > h - 2 ? h - 1 : n + 1], k = m[n > h - 3 ? h - 1 : n + 2], c) Kt(C, I, A, k, T, T * T, T * T * T, o(t, r), g); else {
                            if (f) a = Kt(C, I, A, k, T, T * T, T * T * T, L, 1), a = te(L); else {
                                if (p) return Yt(I, A, T);
                                a = Qt(C, I, A, k, T, T * T, T * T * T);
                            }
                            s(t, r, a);
                        } else if (c) jt(m[n], m[n + 1], T, o(t, r), g); else {
                            var a;
                            if (f) jt(m[n], m[n + 1], T, L, 1), a = te(L); else {
                                if (p) return Yt(m[n], m[n + 1], T);
                                a = qt(m[n], m[n + 1], T);
                            }
                            s(t, r, a);
                        }
                    },
                    ondestroy: n
                });
                return e && "spline" !== e && (O.easing = e), O;
            }
        }
    }
    function ie(t, e, n, i, r, a, o, s) {
        w(i) ? (a = r, r = i, i = 0) : x(r) ? (a = r, r = "linear", i = 0) : x(i) ? (a = i, 
        i = 0) : x(n) ? (a = n, n = 500) : n || (n = 500), t.stopAnimation(), re(t, "", t, e, n, i, s);
        var l = t.animators.slice(), h = l.length;
        h || a && a();
        for (var u = 0; u < l.length; u++) l[u].done(function() {
            --h || a && a();
        }).start(r, o);
    }
    function re(t, e, n, i, r, a, o) {
        var s = {}, l = 0;
        for (var h in i) i.hasOwnProperty(h) && (null != n[h] ? b(i[h]) && !d(i[h]) ? re(t, e ? e + "." + h : h, n[h], i[h], r, a, o) : (o ? (s[h] = n[h], 
        ae(t, e, h, i[h])) : s[h] = i[h], l++) : null == i[h] || o || ae(t, e, h, i[h]));
        l > 0 && t.animate(e, !1).when(null == r ? 500 : r, s).delay(a || 0);
    }
    function ae(t, e, n, i) {
        if (e) {
            var r = {};
            r[e] = {}, r[e][n] = i, t.attr(r);
        } else t.attr(n, i);
    }
    function oe(t, e, n, i) {
        0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = n, 
        this.height = i;
    }
    function se(t) {
        for (var e = 0; t >= Hc; ) e |= 1 & t, t >>= 1;
        return t + e;
    }
    function le(t, e, n, i) {
        var r = e + 1;
        if (r === n) return 1;
        if (i(t[r++], t[e]) < 0) {
            for (;n > r && i(t[r], t[r - 1]) < 0; ) r++;
            he(t, e, r);
        } else for (;n > r && i(t[r], t[r - 1]) >= 0; ) r++;
        return r - e;
    }
    function he(t, e, n) {
        for (n--; n > e; ) {
            var i = t[e];
            t[e++] = t[n], t[n--] = i;
        }
    }
    function ue(t, e, n, i, r) {
        for (i === e && i++; n > i; i++) {
            for (var a, o = t[i], s = e, l = i; l > s; ) r(o, t[a = s + l >>> 1]) < 0 ? l = a : s = a + 1;
            var h = i - s;
            switch (h) {
              case 3:
                t[s + 3] = t[s + 2];

              case 2:
                t[s + 2] = t[s + 1];

              case 1:
                t[s + 1] = t[s];
                break;

              default:
                for (;h > 0; ) t[s + h] = t[s + h - 1], h--;
            }
            t[s] = o;
        }
    }
    function ce(t, e, n, i, r, a) {
        var o = 0, s = 0, l = 1;
        if (a(t, e[n + r]) > 0) {
            for (s = i - r; s > l && a(t, e[n + r + l]) > 0; ) o = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s), o += r, l += r;
        } else {
            for (s = r + 1; s > l && a(t, e[n + r - l]) <= 0; ) o = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s);
            var h = o;
            o = r - l, l = r - h;
        }
        for (o++; l > o; ) {
            var u = o + (l - o >>> 1);
            a(t, e[n + u]) > 0 ? o = u + 1 : l = u;
        }
        return l;
    }
    function de(t, e, n, i, r, a) {
        var o = 0, s = 0, l = 1;
        if (a(t, e[n + r]) < 0) {
            for (s = r + 1; s > l && a(t, e[n + r - l]) < 0; ) o = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s);
            var h = o;
            o = r - l, l = r - h;
        } else {
            for (s = i - r; s > l && a(t, e[n + r + l]) >= 0; ) o = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s), o += r, l += r;
        }
        for (o++; l > o; ) {
            var u = o + (l - o >>> 1);
            a(t, e[n + u]) < 0 ? l = u : o = u + 1;
        }
        return l;
    }
    function fe(t, e) {
        function n(n) {
            var s = a[n], h = o[n], u = a[n + 1], c = o[n + 1];
            o[n] = h + c, n === l - 3 && (a[n + 1] = a[n + 2], o[n + 1] = o[n + 2]), l--;
            var d = de(t[u], t, s, h, 0, e);
            s += d, 0 != (h -= d) && 0 !== (c = ce(t[s + h - 1], t, u, c, c - 1, e)) && (c >= h ? i(s, h, u, c) : r(s, h, u, c));
        }
        function i(n, i, r, a) {
            var o = 0;
            for (o = 0; i > o; o++) h[o] = t[n + o];
            var l = 0, u = r, c = n;
            if (t[c++] = t[u++], 0 != --a) {
                if (1 === i) {
                    for (o = 0; a > o; o++) t[c + o] = t[u + o];
                    return void (t[c + a] = h[l]);
                }
                for (var d, f, p, g = s; ;) {
                    d = 0, f = 0, p = !1;
                    do {
                        if (e(t[u], h[l]) < 0) {
                            if (t[c++] = t[u++], f++, d = 0, 0 == --a) {
                                p = !0;
                                break;
                            }
                        } else if (t[c++] = h[l++], d++, f = 0, 1 == --i) {
                            p = !0;
                            break;
                        }
                    } while (g > (d | f));
                    if (p) break;
                    do {
                        if (0 !== (d = de(t[u], h, l, i, 0, e))) {
                            for (o = 0; d > o; o++) t[c + o] = h[l + o];
                            if (c += d, l += d, 1 >= (i -= d)) {
                                p = !0;
                                break;
                            }
                        }
                        if (t[c++] = t[u++], 0 == --a) {
                            p = !0;
                            break;
                        }
                        if (0 !== (f = ce(h[l], t, u, a, 0, e))) {
                            for (o = 0; f > o; o++) t[c + o] = t[u + o];
                            if (c += f, u += f, 0 === (a -= f)) {
                                p = !0;
                                break;
                            }
                        }
                        if (t[c++] = h[l++], 1 == --i) {
                            p = !0;
                            break;
                        }
                        g--;
                    } while (d >= Gc || f >= Gc);
                    if (p) break;
                    0 > g && (g = 0), g += 2;
                }
                if (1 > (s = g) && (s = 1), 1 === i) {
                    for (o = 0; a > o; o++) t[c + o] = t[u + o];
                    t[c + a] = h[l];
                } else {
                    if (0 === i) throw new Error();
                    for (o = 0; i > o; o++) t[c + o] = h[l + o];
                }
            } else for (o = 0; i > o; o++) t[c + o] = h[l + o];
        }
        function r(n, i, r, a) {
            var o = 0;
            for (o = 0; a > o; o++) h[o] = t[r + o];
            var l = n + i - 1, u = a - 1, c = r + a - 1, d = 0, f = 0;
            if (t[c--] = t[l--], 0 != --i) {
                if (1 === a) {
                    for (f = (c -= i) + 1, d = (l -= i) + 1, o = i - 1; o >= 0; o--) t[f + o] = t[d + o];
                    return void (t[c] = h[u]);
                }
                for (var p = s; ;) {
                    var g = 0, v = 0, m = !1;
                    do {
                        if (e(h[u], t[l]) < 0) {
                            if (t[c--] = t[l--], g++, v = 0, 0 == --i) {
                                m = !0;
                                break;
                            }
                        } else if (t[c--] = h[u--], v++, g = 0, 1 == --a) {
                            m = !0;
                            break;
                        }
                    } while (p > (g | v));
                    if (m) break;
                    do {
                        if (0 != (g = i - de(h[u], t, n, i, i - 1, e))) {
                            for (i -= g, f = (c -= g) + 1, d = (l -= g) + 1, o = g - 1; o >= 0; o--) t[f + o] = t[d + o];
                            if (0 === i) {
                                m = !0;
                                break;
                            }
                        }
                        if (t[c--] = h[u--], 1 == --a) {
                            m = !0;
                            break;
                        }
                        if (0 != (v = a - ce(t[l], h, 0, a, a - 1, e))) {
                            for (a -= v, f = (c -= v) + 1, d = (u -= v) + 1, o = 0; v > o; o++) t[f + o] = h[d + o];
                            if (1 >= a) {
                                m = !0;
                                break;
                            }
                        }
                        if (t[c--] = t[l--], 0 == --i) {
                            m = !0;
                            break;
                        }
                        p--;
                    } while (g >= Gc || v >= Gc);
                    if (m) break;
                    0 > p && (p = 0), p += 2;
                }
                if (1 > (s = p) && (s = 1), 1 === a) {
                    for (f = (c -= i) + 1, d = (l -= i) + 1, o = i - 1; o >= 0; o--) t[f + o] = t[d + o];
                    t[c] = h[u];
                } else {
                    if (0 === a) throw new Error();
                    for (d = c - (a - 1), o = 0; a > o; o++) t[d + o] = h[o];
                }
            } else for (d = c - (a - 1), o = 0; a > o; o++) t[d + o] = h[o];
        }
        var a, o, s = Gc, l = 0, h = [];
        a = [], o = [], this.mergeRuns = function() {
            for (;l > 1; ) {
                var t = l - 2;
                if (t >= 1 && o[t - 1] <= o[t] + o[t + 1] || t >= 2 && o[t - 2] <= o[t] + o[t - 1]) o[t - 1] < o[t + 1] && t--; else if (o[t] > o[t + 1]) break;
                n(t);
            }
        }, this.forceMergeRuns = function() {
            for (;l > 1; ) {
                var t = l - 2;
                t > 0 && o[t - 1] < o[t + 1] && t--, n(t);
            }
        }, this.pushRun = function(t, e) {
            a[l] = t, o[l] = e, l += 1;
        };
    }
    function pe(t, e, n, i) {
        n || (n = 0), i || (i = t.length);
        var r = i - n;
        if (!(2 > r)) {
            var a = 0;
            if (Hc > r) return a = le(t, n, i, e), void ue(t, n, i, n + a, e);
            var o = new fe(t, e), s = se(r);
            do {
                if (a = le(t, n, i, e), s > a) {
                    var l = r;
                    l > s && (l = s), ue(t, n, n + l, n + a, e), a = l;
                }
                o.pushRun(n, a), o.mergeRuns(), r -= a, n += a;
            } while (0 !== r);
            o.forceMergeRuns();
        }
    }
    function ge(t, e) {
        return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;
    }
    function ve(t, e, n) {
        var i = null == e.x ? 0 : e.x, r = null == e.x2 ? 1 : e.x2, a = null == e.y ? 0 : e.y, o = null == e.y2 ? 0 : e.y2;
        return e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n.height + n.y, 
        o = o * n.height + n.y), i = isNaN(i) ? 0 : i, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, 
        o = isNaN(o) ? 0 : o, t.createLinearGradient(i, a, r, o);
    }
    function me(t, e, n) {
        var i = n.width, r = n.height, a = Math.min(i, r), o = null == e.x ? .5 : e.x, s = null == e.y ? .5 : e.y, l = null == e.r ? .5 : e.r;
        return e.global || (o = o * i + n.x, s = s * r + n.y, l *= a), t.createRadialGradient(o, s, 0, o, s, l);
    }
    function ye() {
        return !1;
    }
    function _e(t, e, n) {
        var i = Gu(), r = e.getWidth(), a = e.getHeight(), o = i.style;
        return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", 
        o.height = a + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = a * n, 
        i;
    }
    function xe(t) {
        if ("string" == typeof t) {
            var e = id.get(t);
            return e && e.image;
        }
        return t;
    }
    function we(t, e, n, i, r) {
        if (t) {
            if ("string" == typeof t) {
                if (e && e.__zrImageSrc === t || !n) return e;
                var a = id.get(t), o = {
                    hostEl: n,
                    cb: i,
                    cbPayload: r
                };
                return a ? (e = a.image, !Me(e) && a.pending.push(o)) : (e = new Image(), e.onload = e.onerror = be, 
                id.put(t, e.__cachedImgObj = {
                    image: e,
                    pending: [ o ]
                }), e.src = e.__zrImageSrc = t), e;
            }
            return t;
        }
        return e;
    }
    function be() {
        var t = this.__cachedImgObj;
        this.onload = this.onerror = this.__cachedImgObj = null;
        for (var e = 0; e < t.pending.length; e++) {
            var n = t.pending[e], i = n.cb;
            i && i(this, n.cbPayload), n.hostEl.dirty();
        }
        t.pending.length = 0;
    }
    function Me(t) {
        return t && t.width && t.height;
    }
    function Se(t, e) {
        var n = t + ":" + (e = e || ld);
        if (rd[n]) return rd[n];
        for (var i = (t + "").split("\n"), r = 0, a = 0, o = i.length; o > a; a++) r = Math.max(Re(i[a], e).width, r);
        return ad > od && (ad = 0, rd = {}), ad++, rd[n] = r, r;
    }
    function Te(t, e, n, i, r, a, o, s) {
        return o ? Ie(t, e, n, i, r, a, o, s) : Ce(t, e, n, i, r, a, s);
    }
    function Ce(t, e, n, i, r, a, o) {
        var s = Ne(t, e, r, a, o), l = Se(t, e);
        r && (l += r[1] + r[3]);
        var h = s.outerHeight, u = new oe(Ae(0, l, n), ke(0, h, i), l, h);
        return u.lineHeight = s.lineHeight, u;
    }
    function Ie(t, e, n, i, r, a, o, s) {
        var l = Be(t, {
            rich: o,
            truncate: s,
            font: e,
            textAlign: n,
            textPadding: r,
            textLineHeight: a
        }), h = l.outerWidth, u = l.outerHeight;
        return new oe(Ae(0, h, n), ke(0, u, i), h, u);
    }
    function Ae(t, e, n) {
        return "right" === n ? t -= e : "center" === n && (t -= e / 2), t;
    }
    function ke(t, e, n) {
        return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t;
    }
    function De(t, e, n) {
        var i = e.x, r = e.y, a = e.height, o = e.width, s = a / 2, l = "left", h = "top";
        switch (t) {
          case "left":
            i -= n, r += s, l = "right", h = "middle";
            break;

          case "right":
            i += n + o, r += s, h = "middle";
            break;

          case "top":
            i += o / 2, r -= n, l = "center", h = "bottom";
            break;

          case "bottom":
            i += o / 2, r += a + n, l = "center";
            break;

          case "inside":
            i += o / 2, r += s, l = "center", h = "middle";
            break;

          case "insideLeft":
            i += n, r += s, h = "middle";
            break;

          case "insideRight":
            i += o - n, r += s, l = "right", h = "middle";
            break;

          case "insideTop":
            i += o / 2, r += n, l = "center";
            break;

          case "insideBottom":
            i += o / 2, r += a - n, l = "center", h = "bottom";
            break;

          case "insideTopLeft":
            i += n, r += n;
            break;

          case "insideTopRight":
            i += o - n, r += n, l = "right";
            break;

          case "insideBottomLeft":
            i += n, r += a - n, h = "bottom";
            break;

          case "insideBottomRight":
            i += o - n, r += a - n, l = "right", h = "bottom";
        }
        return {
            x: i,
            y: r,
            textAlign: l,
            textVerticalAlign: h
        };
    }
    function Pe(t, e, n, i, r) {
        if (!e) return "";
        var a = (t + "").split("\n");
        r = Le(e, n, i, r);
        for (var o = 0, s = a.length; s > o; o++) a[o] = Oe(a[o], r);
        return a.join("\n");
    }
    function Le(t, e, n, i) {
        (i = o({}, i)).font = e;
        var n = A(n, "...");
        i.maxIterations = A(i.maxIterations, 2);
        var r = i.minChar = A(i.minChar, 0);
        i.cnCharWidth = Se("国", e);
        var a = i.ascCharWidth = Se("a", e);
        i.placeholder = A(i.placeholder, "");
        for (var s = t = Math.max(0, t - 1), l = 0; r > l && s >= a; l++) s -= a;
        var h = Se(n, e);
        return h > s && (n = "", h = 0), s = t - h, i.ellipsis = n, i.ellipsisWidth = h, 
        i.contentWidth = s, i.containerWidth = t, i;
    }
    function Oe(t, e) {
        var n = e.containerWidth, i = e.font, r = e.contentWidth;
        if (!n) return "";
        var a = Se(t, i);
        if (n >= a) return t;
        for (var o = 0; ;o++) {
            if (r >= a || o >= e.maxIterations) {
                t += e.ellipsis;
                break;
            }
            var s = 0 === o ? Ee(t, r, e.ascCharWidth, e.cnCharWidth) : a > 0 ? Math.floor(t.length * r / a) : 0;
            a = Se(t = t.substr(0, s), i);
        }
        return "" === t && (t = e.placeholder), t;
    }
    function Ee(t, e, n, i) {
        for (var r = 0, a = 0, o = t.length; o > a && e > r; a++) {
            var s = t.charCodeAt(a);
            r += s >= 0 && 127 >= s ? n : i;
        }
        return a;
    }
    function ze(t) {
        return Se("国", t);
    }
    function Re(t, e) {
        return hd.measureText(t, e);
    }
    function Ne(t, e, n, i, r) {
        null != t && (t += "");
        var a = A(i, ze(e)), o = t ? t.split("\n") : [], s = o.length * a, l = s;
        if (n && (l += n[0] + n[2]), t && r) {
            var h = r.outerHeight, u = r.outerWidth;
            if (null != h && l > h) t = "", o = []; else if (null != u) for (var c = Le(u - (n ? n[1] + n[3] : 0), e, r.ellipsis, {
                minChar: r.minChar,
                placeholder: r.placeholder
            }), d = 0, f = o.length; f > d; d++) o[d] = Oe(o[d], c);
        }
        return {
            lines: o,
            height: s,
            outerHeight: l,
            lineHeight: a
        };
    }
    function Be(t, e) {
        var n = {
            lines: [],
            width: 0,
            height: 0
        };
        if (null != t && (t += ""), !t) return n;
        for (var i, r = sd.lastIndex = 0; null != (i = sd.exec(t)); ) {
            var a = i.index;
            a > r && Fe(n, t.substring(r, a)), Fe(n, i[2], i[1]), r = sd.lastIndex;
        }
        r < t.length && Fe(n, t.substring(r, t.length));
        var o = n.lines, s = 0, l = 0, h = [], u = e.textPadding, c = e.truncate, d = c && c.outerWidth, f = c && c.outerHeight;
        u && (null != d && (d -= u[1] + u[3]), null != f && (f -= u[0] + u[2]));
        for (D = 0; D < o.length; D++) {
            for (var p = o[D], g = 0, v = 0, m = 0; m < p.tokens.length; m++) {
                var y = (P = p.tokens[m]).styleName && e.rich[P.styleName] || {}, _ = P.textPadding = y.textPadding, x = P.font = y.font || e.font, w = P.textHeight = A(y.textHeight, ze(x));
                if (_ && (w += _[0] + _[2]), P.height = w, P.lineHeight = k(y.textLineHeight, e.textLineHeight, w), 
                P.textAlign = y && y.textAlign || e.textAlign, P.textVerticalAlign = y && y.textVerticalAlign || "middle", 
                null != f && s + P.lineHeight > f) return {
                    lines: [],
                    width: 0,
                    height: 0
                };
                P.textWidth = Se(P.text, x);
                var b = y.textWidth, M = null == b || "auto" === b;
                if ("string" == typeof b && "%" === b.charAt(b.length - 1)) P.percentWidth = b, 
                h.push(P), b = 0; else {
                    if (M) {
                        b = P.textWidth;
                        var S = y.textBackgroundColor, T = S && S.image;
                        T && (T = xe(T), Me(T) && (b = Math.max(b, T.width * w / T.height)));
                    }
                    var C = _ ? _[1] + _[3] : 0;
                    b += C;
                    var I = null != d ? d - v : null;
                    null != I && b > I && (!M || C > I ? (P.text = "", P.textWidth = b = 0) : (P.text = Pe(P.text, I - C, x, c.ellipsis, {
                        minChar: c.minChar
                    }), P.textWidth = Se(P.text, x), b = P.textWidth + C));
                }
                v += P.width = b, y && (g = Math.max(g, P.lineHeight));
            }
            p.width = v, p.lineHeight = g, s += g, l = Math.max(l, v);
        }
        n.outerWidth = n.width = A(e.textWidth, l), n.outerHeight = n.height = A(e.textHeight, s), 
        u && (n.outerWidth += u[1] + u[3], n.outerHeight += u[0] + u[2]);
        for (var D = 0; D < h.length; D++) {
            var P = h[D], L = P.percentWidth;
            P.width = parseInt(L, 10) / 100 * l;
        }
        return n;
    }
    function Fe(t, e, n) {
        for (var i = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
            var s = r[o], l = {
                styleName: n,
                text: s,
                isLineHolder: !s && !i
            };
            if (o) a.push({
                tokens: [ l ]
            }); else {
                var h = (a[a.length - 1] || (a[0] = {
                    tokens: []
                })).tokens, u = h.length;
                1 === u && h[0].isLineHolder ? h[0] = l : (s || !u || i) && h.push(l);
            }
        }
    }
    function Ve(t) {
        var e = (t.fontSize || t.fontFamily) && [ t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif" ].join(" ");
        return e && O(e) || t.textFont || t.font;
    }
    function We(t, e) {
        var n, i, r, a, o = e.x, s = e.y, l = e.width, h = e.height, u = e.r;
        0 > l && (o += l, l = -l), 0 > h && (s += h, h = -h), "number" == typeof u ? n = i = r = a = u : u instanceof Array ? 1 === u.length ? n = i = r = a = u[0] : 2 === u.length ? (n = r = u[0], 
        i = a = u[1]) : 3 === u.length ? (n = u[0], i = a = u[1], r = u[2]) : (n = u[0], 
        i = u[1], r = u[2], a = u[3]) : n = i = r = a = 0;
        var c;
        n + i > l && (c = n + i, n *= l / c, i *= l / c), r + a > l && (c = r + a, r *= l / c, 
        a *= l / c), i + r > h && (c = i + r, i *= h / c, r *= h / c), n + a > h && (c = n + a, 
        n *= h / c, a *= h / c), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.arc(o + l - i, s + i, i, -Math.PI / 2, 0), 
        t.lineTo(o + l, s + h - r), 0 !== r && t.arc(o + l - r, s + h - r, r, 0, Math.PI / 2), 
        t.lineTo(o + a, s + h), 0 !== a && t.arc(o + a, s + h - a, a, Math.PI / 2, Math.PI), 
        t.lineTo(o, s + n), 0 !== n && t.arc(o + n, s + n, n, Math.PI, 1.5 * Math.PI);
    }
    function He(t) {
        return Ge(t), f(t.rich, Ge), t;
    }
    function Ge(t) {
        if (t) {
            t.font = Ve(t);
            var e = t.textAlign;
            "middle" === e && (e = "center"), t.textAlign = null == e || cd[e] ? e : "left";
            var n = t.textVerticalAlign || t.textBaseline;
            "center" === n && (n = "middle"), t.textVerticalAlign = null == n || dd[n] ? n : "top", 
            t.textPadding && (t.textPadding = P(t.textPadding));
        }
    }
    function Ze(t, e, n, i, r, a) {
        i.rich ? qe(t, e, n, i, r, a) : Xe(t, e, n, i, r, a);
    }
    function Xe(t, e, n, i, r, a) {
        var o, s = $e(i), l = !1, h = e.__attrCachedBy === Yc.PLAIN_TEXT;
        a !== jc ? (a && (o = a.style, l = !s && h && o), e.__attrCachedBy = s ? Yc.NONE : Yc.PLAIN_TEXT) : h && (e.__attrCachedBy = Yc.NONE);
        var u = i.font || ud;
        l && u === (o.font || ud) || (e.font = u);
        var c = t.__computedFont;
        t.__styleFont !== u && (t.__styleFont = u, c = t.__computedFont = e.font);
        var d = i.textPadding, f = i.textLineHeight, p = t.__textCotentBlock;
        (!p || t.__dirtyText) && (p = t.__textCotentBlock = Ne(n, c, d, f, i.truncate));
        var g = p.outerHeight, v = p.lines, m = p.lineHeight, y = Je(g, i, r), _ = y.baseX, x = y.baseY, w = y.textAlign || "left", b = y.textVerticalAlign;
        je(e, i, r, _, x);
        var M = ke(x, g, b), S = _, T = M;
        if (s || d) {
            var C = Se(n, c);
            d && (C += d[1] + d[3]);
            var I = Ae(_, C, w);
            s && Ke(t, e, i, I, M, C, g), d && (S = an(_, w, d), T += d[0]);
        }
        e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = i.opacity || 1;
        for (B = 0; B < fd.length; B++) {
            var A = fd[B], k = A[0], D = A[1], P = i[k];
            l && P === o[k] || (e[D] = qc(e, D, P || A[2]));
        }
        T += m / 2;
        var L = i.textStrokeWidth, O = l ? o.textStrokeWidth : null, E = !l || L !== O, z = !l || E || i.textStroke !== o.textStroke, R = en(i.textStroke, L), N = nn(i.textFill);
        if (R && (E && (e.lineWidth = L), z && (e.strokeStyle = R)), N && (l && i.textFill === o.textFill || (e.fillStyle = N)), 
        1 === v.length) R && e.strokeText(v[0], S, T), N && e.fillText(v[0], S, T); else for (var B = 0; B < v.length; B++) R && e.strokeText(v[B], S, T), 
        N && e.fillText(v[B], S, T), T += m;
    }
    function qe(t, e, n, i, r, a) {
        a !== jc && (e.__attrCachedBy = Yc.NONE);
        var o = t.__textCotentBlock;
        (!o || t.__dirtyText) && (o = t.__textCotentBlock = Be(n, i)), Ye(t, e, o, i, r);
    }
    function Ye(t, e, n, i, r) {
        var a = n.width, o = n.outerWidth, s = n.outerHeight, l = i.textPadding, h = Je(s, i, r), u = h.baseX, c = h.baseY, d = h.textAlign, f = h.textVerticalAlign;
        je(e, i, r, u, c);
        var p = Ae(u, o, d), g = ke(c, s, f), v = p, m = g;
        l && (v += l[3], m += l[0]);
        var y = v + a;
        $e(i) && Ke(t, e, i, p, g, o, s);
        for (var _ = 0; _ < n.lines.length; _++) {
            for (var x, w = n.lines[_], b = w.tokens, M = b.length, S = w.lineHeight, T = w.width, C = 0, I = v, A = y, k = M - 1; M > C && (!(x = b[C]).textAlign || "left" === x.textAlign); ) Ue(t, e, x, i, S, m, I, "left"), 
            T -= x.width, I += x.width, C++;
            for (;k >= 0 && "right" === (x = b[k]).textAlign; ) Ue(t, e, x, i, S, m, A, "right"), 
            T -= x.width, A -= x.width, k--;
            for (I += (a - (I - v) - (y - A) - T) / 2; k >= C; ) Ue(t, e, x = b[C], i, S, m, I + x.width / 2, "center"), 
            I += x.width, C++;
            m += S;
        }
    }
    function je(t, e, n, i, r) {
        if (n && e.textRotation) {
            var a = e.textOrigin;
            "center" === a ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : a && (i = a[0] + n.x, 
            r = a[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r);
        }
    }
    function Ue(t, e, n, i, r, a, o, s) {
        var l = i.rich[n.styleName] || {};
        l.text = n.text;
        var h = n.textVerticalAlign, u = a + r / 2;
        "top" === h ? u = a + n.height / 2 : "bottom" === h && (u = a + r - n.height / 2), 
        !n.isLineHolder && $e(l) && Ke(t, e, l, "right" === s ? o - n.width : "center" === s ? o - n.width / 2 : o, u - n.height / 2, n.width, n.height);
        var c = n.textPadding;
        c && (o = an(o, s, c), u -= n.height / 2 - c[2] - n.textHeight / 2), tn(e, "shadowBlur", k(l.textShadowBlur, i.textShadowBlur, 0)), 
        tn(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), tn(e, "shadowOffsetX", k(l.textShadowOffsetX, i.textShadowOffsetX, 0)), 
        tn(e, "shadowOffsetY", k(l.textShadowOffsetY, i.textShadowOffsetY, 0)), tn(e, "textAlign", s), 
        tn(e, "textBaseline", "middle"), tn(e, "font", n.font || ud);
        var d = en(l.textStroke || i.textStroke, p), f = nn(l.textFill || i.textFill), p = A(l.textStrokeWidth, i.textStrokeWidth);
        d && (tn(e, "lineWidth", p), tn(e, "strokeStyle", d), e.strokeText(n.text, o, u)), 
        f && (tn(e, "fillStyle", f), e.fillText(n.text, o, u));
    }
    function $e(t) {
        return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor);
    }
    function Ke(t, e, n, i, r, a, o) {
        var s = n.textBackgroundColor, l = n.textBorderWidth, h = n.textBorderColor, u = w(s);
        if (tn(e, "shadowBlur", n.textBoxShadowBlur || 0), tn(e, "shadowColor", n.textBoxShadowColor || "transparent"), 
        tn(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), tn(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), 
        u || l && h) {
            e.beginPath();
            var c = n.textBorderRadius;
            c ? We(e, {
                x: i,
                y: r,
                width: a,
                height: o,
                r: c
            }) : e.rect(i, r, a, o), e.closePath();
        }
        if (u) if (tn(e, "fillStyle", s), null != n.fillOpacity) {
            f = e.globalAlpha;
            e.globalAlpha = n.fillOpacity * n.opacity, e.fill(), e.globalAlpha = f;
        } else e.fill(); else if (b(s)) {
            var d = s.image;
            (d = we(d, null, t, Qe, s)) && Me(d) && e.drawImage(d, i, r, a, o);
        }
        if (l && h) if (tn(e, "lineWidth", l), tn(e, "strokeStyle", h), null != n.strokeOpacity) {
            var f = e.globalAlpha;
            e.globalAlpha = n.strokeOpacity * n.opacity, e.stroke(), e.globalAlpha = f;
        } else e.stroke();
    }
    function Qe(t, e) {
        e.image = t;
    }
    function Je(t, e, n) {
        var i = e.x || 0, r = e.y || 0, a = e.textAlign, o = e.textVerticalAlign;
        if (n) {
            var s = e.textPosition;
            if (s instanceof Array) i = n.x + rn(s[0], n.width), r = n.y + rn(s[1], n.height); else {
                var l = De(s, n, e.textDistance);
                i = l.x, r = l.y, a = a || l.textAlign, o = o || l.textVerticalAlign;
            }
            var h = e.textOffset;
            h && (i += h[0], r += h[1]);
        }
        return {
            baseX: i,
            baseY: r,
            textAlign: a,
            textVerticalAlign: o
        };
    }
    function tn(t, e, n) {
        return t[e] = qc(t, e, n), t[e];
    }
    function en(t, e) {
        return null == t || 0 >= e || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
    }
    function nn(t) {
        return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
    }
    function rn(t, e) {
        return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;
    }
    function an(t, e, n) {
        return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3];
    }
    function on(t, e) {
        return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding);
    }
    function sn(t) {
        t = t || {}, Nc.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
        this.style = new $c(t.style, this), this._rect = null, this.__clipPaths = [];
    }
    function ln(t) {
        sn.call(this, t);
    }
    function hn(t) {
        return parseInt(t, 10);
    }
    function un(t) {
        return !!t && (!!t.__builtin__ || "function" == typeof t.resize && "function" == typeof t.refresh);
    }
    function cn(t, e, n) {
        return md.copy(t.getBoundingRect()), t.transform && md.applyTransform(t.transform), 
        yd.width = e, yd.height = n, !md.intersect(yd);
    }
    function dn(t, e) {
        if (t === e) return !1;
        if (!t || !e || t.length !== e.length) return !0;
        for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !0;
    }
    function fn(t, e) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e);
        }
    }
    function pn(t, e) {
        var n = document.createElement("div");
        return n.style.cssText = [ "position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0" ].join(";") + ";", 
        n;
    }
    function gn(t) {
        return "mousewheel" === t && Lu.browser.firefox ? "DOMMouseScroll" : t;
    }
    function vn(t) {
        t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function() {
            t._touching = !1;
        }, 700);
    }
    function mn(t) {
        var e = t.pointerType;
        return "pen" === e || "touch" === e;
    }
    function yn(t) {
        function e(t, e) {
            return function() {
                return e._touching ? void 0 : t.apply(e, arguments);
            };
        }
        f(bd, function(e) {
            t._handlers[e] = m(Td[e], t);
        }), f(Sd, function(e) {
            t._handlers[e] = m(Td[e], t);
        }), f(wd, function(n) {
            t._handlers[n] = e(Td[n], t);
        });
    }
    function _n(t) {
        function e(e, n) {
            f(e, function(e) {
                lt(t, gn(e), n._handlers[e]);
            }, n);
        }
        tc.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._handlers = {}, 
        yn(this), Lu.pointerEventsSupported ? e(Sd, this) : (Lu.touchEventsSupported && e(bd, this), 
        e(wd, this));
    }
    function xn(t, e) {
        var n = new Dd(Du(), t, e);
        return kd[n.id] = n, n;
    }
    function wn(t) {
        delete kd[t];
    }
    function bn(t) {
        return t instanceof Array ? t : null == t ? [] : [ t ];
    }
    function Mn(t, e, n) {
        if (t) {
            t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
            for (var i = 0, r = n.length; r > i; i++) {
                var a = n[i];
                !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a]);
            }
        }
    }
    function Sn(t) {
        return !Od(t) || Ed(t) || t instanceof Date ? t : t.value;
    }
    function Tn(t) {
        return Od(t) && !(t instanceof Array);
    }
    function Cn(t, e) {
        e = (e || []).slice();
        var n = p(t || [], function(t) {
            return {
                exist: t
            };
        });
        return Ld(e, function(t, i) {
            if (Od(t)) {
                for (r = 0; r < n.length; r++) if (!n[r].option && null != t.id && n[r].exist.id === t.id + "") return n[r].option = t, 
                void (e[i] = null);
                for (var r = 0; r < n.length; r++) {
                    var a = n[r].exist;
                    if (!(n[r].option || null != a.id && null != t.id || null == t.name || kn(t) || kn(a) || a.name !== t.name + "")) return n[r].option = t, 
                    void (e[i] = null);
                }
            }
        }), Ld(e, function(t) {
            if (Od(t)) {
                for (var e = 0; e < n.length; e++) {
                    var i = n[e].exist;
                    if (!n[e].option && !kn(i) && null == t.id) {
                        n[e].option = t;
                        break;
                    }
                }
                e >= n.length && n.push({
                    option: t
                });
            }
        }), n;
    }
    function In(t) {
        var e = N();
        Ld(t, function(t) {
            var n = t.exist;
            n && e.set(n.id, t);
        }), Ld(t, function(t) {
            var n = t.option;
            L(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), 
            n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {});
        }), Ld(t, function(t, n) {
            var i = t.exist, r = t.option, a = t.keyInfo;
            if (Od(r)) {
                if (a.name = null != r.name ? r.name + "" : i ? i.name : zd + n, i) a.id = i.id; else if (null != r.id) a.id = r.id + ""; else {
                    var o = 0;
                    do {
                        a.id = "\0" + a.name + "\0" + o++;
                    } while (e.get(a.id));
                }
                e.set(a.id, t);
            }
        });
    }
    function An(t) {
        var e = t.name;
        return !(!e || !e.indexOf(zd));
    }
    function kn(t) {
        return Od(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0");
    }
    function Dn(t, e) {
        return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? _(e.dataIndex) ? p(e.dataIndex, function(e) {
            return t.indexOfRawIndex(e);
        }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? _(e.name) ? p(e.name, function(e) {
            return t.indexOfName(e);
        }) : t.indexOfName(e.name) : void 0;
    }
    function Pn() {
        var t = "__\0ec_inner_" + Nd++ + "_" + Math.random().toFixed(5);
        return function(e) {
            return e[t] || (e[t] = {});
        };
    }
    function Ln(t, e, n) {
        if (w(e)) {
            var i = {};
            i[e + "Index"] = 0, e = i;
        }
        var r = n && n.defaultMainType;
        !r || On(e, r + "Index") || On(e, r + "Id") || On(e, r + "Name") || (e[r + "Index"] = 0);
        var a = {};
        return Ld(e, function(i, r) {
            var i = e[r];
            if ("dataIndex" !== r && "dataIndexInside" !== r) {
                var o = r.match(/^(\w+)(Index|Id|Name)$/) || [], s = o[1], l = (o[2] || "").toLowerCase();
                if (!(!s || !l || null == i || "index" === l && "none" === i || n && n.includeMainTypes && h(n.includeMainTypes, s) < 0)) {
                    var u = {
                        mainType: s
                    };
                    ("index" !== l || "all" !== i) && (u[l] = i);
                    var c = t.queryComponents(u);
                    a[s + "Models"] = c, a[s + "Model"] = c[0];
                }
            } else a[r] = i;
        }), a;
    }
    function On(t, e) {
        return t && t.hasOwnProperty(e);
    }
    function En(t, e, n) {
        t.setAttribute ? t.setAttribute(e, n) : t[e] = n;
    }
    function zn(t, e) {
        return t.getAttribute ? t.getAttribute(e) : t[e];
    }
    function Rn(t) {
        return "auto" === t ? Lu.domSupported ? "html" : "richText" : t || "html";
    }
    function Nn(t) {
        var e = {
            main: "",
            sub: ""
        };
        return t && (t = t.split(Bd), e.main = t[0] || "", e.sub = t[1] || ""), e;
    }
    function Bn(t) {
        L(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');
    }
    function Fn(t) {
        t.$constructor = t, t.extend = function(t) {
            var e = this, n = function() {
                t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments);
            };
            return o(n.prototype, t), n.extend = this.extend, n.superCall = Wn, n.superApply = Hn, 
            u(n, this), n.superClass = e, n;
        };
    }
    function Vn(t) {
        var e = [ "__\0is_clz", Vd++, Math.random().toFixed(3) ].join("_");
        t.prototype[e] = !0, t.isInstance = function(t) {
            return !(!t || !t[e]);
        };
    }
    function Wn(t, e) {
        var n = D(arguments, 2);
        return this.superClass.prototype[e].apply(t, n);
    }
    function Hn(t, e, n) {
        return this.superClass.prototype[e].apply(t, n);
    }
    function Gn(t, e) {
        function n(t) {
            var e = i[t.main];
            return e && e[Fd] || (e = i[t.main] = {}, e[Fd] = !0), e;
        }
        e = e || {};
        var i = {};
        if (t.registerClass = function(t, e) {
            return e && (Bn(e), (e = Nn(e)).sub ? e.sub !== Fd && (n(e)[e.sub] = t) : i[e.main] = t), 
            t;
        }, t.getClass = function(t, e, n) {
            var r = i[t];
            if (r && r[Fd] && (r = e ? r[e] : null), n && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
            return r;
        }, t.getClassesByMainType = function(t) {
            t = Nn(t);
            var e = [], n = i[t.main];
            return n && n[Fd] ? f(n, function(t, n) {
                n !== Fd && e.push(t);
            }) : e.push(n), e;
        }, t.hasClass = function(t) {
            return t = Nn(t), !!i[t.main];
        }, t.getAllClassMainTypes = function() {
            var t = [];
            return f(i, function(e, n) {
                t.push(n);
            }), t;
        }, t.hasSubTypes = function(t) {
            t = Nn(t);
            var e = i[t.main];
            return e && e[Fd];
        }, t.parseClassType = Nn, e.registerWhenExtend) {
            var r = t.extend;
            r && (t.extend = function(e) {
                var n = r.call(this, e);
                return t.registerClass(n, e.type);
            });
        }
        return t;
    }
    function Zn(t) {
        return t > -jd && jd > t;
    }
    function Xn(t) {
        return t > jd || -jd > t;
    }
    function qn(t, e, n, i, r) {
        var a = 1 - r;
        return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n);
    }
    function Yn(t, e, n, i, r) {
        var a = 1 - r;
        return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r);
    }
    function jn(t, e, n, i, r, a) {
        var o = i + 3 * (e - n) - t, s = 3 * (n - 2 * e + t), l = 3 * (e - t), h = t - r, u = s * s - 3 * o * l, c = s * l - 9 * o * h, d = l * l - 3 * s * h, f = 0;
        if (Zn(u) && Zn(c)) Zn(s) ? a[0] = 0 : (S = -l / s) >= 0 && 1 >= S && (a[f++] = S); else {
            var p = c * c - 4 * u * d;
            if (Zn(p)) {
                var g = c / u, v = -g / 2;
                (S = -s / o + g) >= 0 && 1 >= S && (a[f++] = S), v >= 0 && 1 >= v && (a[f++] = v);
            } else if (p > 0) {
                var m = Yd(p), y = u * s + 1.5 * o * (-c + m), _ = u * s + 1.5 * o * (-c - m);
                (S = (-s - ((y = 0 > y ? -qd(-y, Kd) : qd(y, Kd)) + (_ = 0 > _ ? -qd(-_, Kd) : qd(_, Kd)))) / (3 * o)) >= 0 && 1 >= S && (a[f++] = S);
            } else {
                var x = (2 * u * s - 3 * o * c) / (2 * Yd(u * u * u)), w = Math.acos(x) / 3, b = Yd(u), M = Math.cos(w), S = (-s - 2 * b * M) / (3 * o), v = (-s + b * (M + $d * Math.sin(w))) / (3 * o), T = (-s + b * (M - $d * Math.sin(w))) / (3 * o);
                S >= 0 && 1 >= S && (a[f++] = S), v >= 0 && 1 >= v && (a[f++] = v), T >= 0 && 1 >= T && (a[f++] = T);
            }
        }
        return f;
    }
    function Un(t, e, n, i, r) {
        var a = 6 * n - 12 * e + 6 * t, o = 9 * e + 3 * i - 3 * t - 9 * n, s = 3 * e - 3 * t, l = 0;
        if (Zn(o)) Xn(a) && (c = -s / a) >= 0 && 1 >= c && (r[l++] = c); else {
            var h = a * a - 4 * o * s;
            if (Zn(h)) r[0] = -a / (2 * o); else if (h > 0) {
                var u = Yd(h), c = (-a + u) / (2 * o), d = (-a - u) / (2 * o);
                c >= 0 && 1 >= c && (r[l++] = c), d >= 0 && 1 >= d && (r[l++] = d);
            }
        }
        return l;
    }
    function $n(t, e, n, i, r, a) {
        var o = (e - t) * r + t, s = (n - e) * r + e, l = (i - n) * r + n, h = (s - o) * r + o, u = (l - s) * r + s, c = (u - h) * r + h;
        a[0] = t, a[1] = o, a[2] = h, a[3] = c, a[4] = c, a[5] = u, a[6] = l, a[7] = i;
    }
    function Kn(t, e, n, i, r, a, o, s, l, h, u) {
        var c, d, f, p, g, v = .005, m = 1 / 0;
        Qd[0] = l, Qd[1] = h;
        for (var y = 0; 1 > y; y += .05) Jd[0] = qn(t, n, r, o, y), Jd[1] = qn(e, i, a, s, y), 
        m > (p = Ku(Qd, Jd)) && (c = y, m = p);
        m = 1 / 0;
        for (var _ = 0; 32 > _ && !(Ud > v); _++) d = c - v, f = c + v, Jd[0] = qn(t, n, r, o, d), 
        Jd[1] = qn(e, i, a, s, d), p = Ku(Jd, Qd), d >= 0 && m > p ? (c = d, m = p) : (tf[0] = qn(t, n, r, o, f), 
        tf[1] = qn(e, i, a, s, f), g = Ku(tf, Qd), 1 >= f && m > g ? (c = f, m = g) : v *= .5);
        return u && (u[0] = qn(t, n, r, o, c), u[1] = qn(e, i, a, s, c)), Yd(m);
    }
    function Qn(t, e, n, i) {
        var r = 1 - i;
        return r * (r * t + 2 * i * e) + i * i * n;
    }
    function Jn(t, e, n, i) {
        return 2 * ((1 - i) * (e - t) + i * (n - e));
    }
    function ti(t, e, n, i, r) {
        var a = t - 2 * e + n, o = 2 * (e - t), s = t - i, l = 0;
        if (Zn(a)) Xn(o) && (c = -s / o) >= 0 && 1 >= c && (r[l++] = c); else {
            var h = o * o - 4 * a * s;
            if (Zn(h)) (c = -o / (2 * a)) >= 0 && 1 >= c && (r[l++] = c); else if (h > 0) {
                var u = Yd(h), c = (-o + u) / (2 * a), d = (-o - u) / (2 * a);
                c >= 0 && 1 >= c && (r[l++] = c), d >= 0 && 1 >= d && (r[l++] = d);
            }
        }
        return l;
    }
    function ei(t, e, n) {
        var i = t + n - 2 * e;
        return 0 === i ? .5 : (t - e) / i;
    }
    function ni(t, e, n, i, r) {
        var a = (e - t) * i + t, o = (n - e) * i + e, s = (o - a) * i + a;
        r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n;
    }
    function ii(t, e, n, i, r, a, o, s, l) {
        var h, u = .005, c = 1 / 0;
        Qd[0] = o, Qd[1] = s;
        for (var d = 0; 1 > d; d += .05) Jd[0] = Qn(t, n, r, d), Jd[1] = Qn(e, i, a, d), 
        c > (v = Ku(Qd, Jd)) && (h = d, c = v);
        c = 1 / 0;
        for (var f = 0; 32 > f && !(Ud > u); f++) {
            var p = h - u, g = h + u;
            Jd[0] = Qn(t, n, r, p), Jd[1] = Qn(e, i, a, p);
            var v = Ku(Jd, Qd);
            if (p >= 0 && c > v) h = p, c = v; else {
                tf[0] = Qn(t, n, r, g), tf[1] = Qn(e, i, a, g);
                var m = Ku(tf, Qd);
                1 >= g && c > m ? (h = g, c = m) : u *= .5;
            }
        }
        return l && (l[0] = Qn(t, n, r, h), l[1] = Qn(e, i, a, h)), Yd(c);
    }
    function ri(t, e, n) {
        if (0 !== t.length) {
            var i, r = t[0], a = r[0], o = r[0], s = r[1], l = r[1];
            for (i = 1; i < t.length; i++) r = t[i], a = ef(a, r[0]), o = nf(o, r[0]), s = ef(s, r[1]), 
            l = nf(l, r[1]);
            e[0] = a, e[1] = s, n[0] = o, n[1] = l;
        }
    }
    function ai(t, e, n, i, r, a) {
        r[0] = ef(t, n), r[1] = ef(e, i), a[0] = nf(t, n), a[1] = nf(e, i);
    }
    function oi(t, e, n, i, r, a, o, s, l, h) {
        var u, c = Un, d = qn, f = c(t, n, r, o, uf);
        for (l[0] = 1 / 0, l[1] = 1 / 0, h[0] = -1 / 0, h[1] = -1 / 0, u = 0; f > u; u++) {
            var p = d(t, n, r, o, uf[u]);
            l[0] = ef(p, l[0]), h[0] = nf(p, h[0]);
        }
        for (f = c(e, i, a, s, cf), u = 0; f > u; u++) {
            var g = d(e, i, a, s, cf[u]);
            l[1] = ef(g, l[1]), h[1] = nf(g, h[1]);
        }
        l[0] = ef(t, l[0]), h[0] = nf(t, h[0]), l[0] = ef(o, l[0]), h[0] = nf(o, h[0]), 
        l[1] = ef(e, l[1]), h[1] = nf(e, h[1]), l[1] = ef(s, l[1]), h[1] = nf(s, h[1]);
    }
    function si(t, e, n, i, r, a, o, s) {
        var l = ei, h = Qn, u = nf(ef(l(t, n, r), 1), 0), c = nf(ef(l(e, i, a), 1), 0), d = h(t, n, r, u), f = h(e, i, a, c);
        o[0] = ef(t, r, d), o[1] = ef(e, a, f), s[0] = nf(t, r, d), s[1] = nf(e, a, f);
    }
    function li(t, e, n, i, r, a, o, s, l) {
        var h = Q, u = J, c = Math.abs(r - a);
        if (1e-4 > c % of && c > 1e-4) return s[0] = t - n, s[1] = e - i, l[0] = t + n, 
        void (l[1] = e + i);
        if (sf[0] = af(r) * n + t, sf[1] = rf(r) * i + e, lf[0] = af(a) * n + t, lf[1] = rf(a) * i + e, 
        h(s, sf, lf), u(l, sf, lf), 0 > (r %= of) && (r += of), 0 > (a %= of) && (a += of), 
        r > a && !o ? a += of : a > r && o && (r += of), o) {
            var d = a;
            a = r, r = d;
        }
        for (var f = 0; a > f; f += Math.PI / 2) f > r && (hf[0] = af(f) * n + t, hf[1] = rf(f) * i + e, 
        h(s, hf, s), u(l, hf, l));
    }
    function hi(t, e, n, i, r, a, o) {
        if (0 === r) return !1;
        var s = r, l = 0, h = t;
        if (o > e + s && o > i + s || e - s > o && i - s > o || a > t + s && a > n + s || t - s > a && n - s > a) return !1;
        if (t === n) return Math.abs(a - t) <= s / 2;
        var u = (l = (e - i) / (t - n)) * a - o + (h = (t * i - n * e) / (t - n));
        return s / 2 * s / 2 >= u * u / (l * l + 1);
    }
    function ui(t, e, n, i, r, a, o, s, l, h, u) {
        if (0 === l) return !1;
        var c = l;
        return !(u > e + c && u > i + c && u > a + c && u > s + c || e - c > u && i - c > u && a - c > u && s - c > u || h > t + c && h > n + c && h > r + c && h > o + c || t - c > h && n - c > h && r - c > h && o - c > h) && c / 2 >= Kn(t, e, n, i, r, a, o, s, h, u, null);
    }
    function ci(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var h = o;
        return !(l > e + h && l > i + h && l > a + h || e - h > l && i - h > l && a - h > l || s > t + h && s > n + h && s > r + h || t - h > s && n - h > s && r - h > s) && h / 2 >= ii(t, e, n, i, r, a, s, l, null);
    }
    function di(t) {
        return 0 > (t %= Tf) && (t += Tf), t;
    }
    function fi(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var h = o;
        s -= t, l -= e;
        var u = Math.sqrt(s * s + l * l);
        if (u - h > n || n > u + h) return !1;
        if (Math.abs(i - r) % Cf < 1e-4) return !0;
        if (a) {
            var c = i;
            i = di(r), r = di(c);
        } else i = di(i), r = di(r);
        i > r && (r += Cf);
        var d = Math.atan2(l, s);
        return 0 > d && (d += Cf), d >= i && r >= d || d + Cf >= i && r >= d + Cf;
    }
    function pi(t, e, n, i, r, a) {
        if (a > e && a > i || e > a && i > a) return 0;
        if (i === e) return 0;
        var o = e > i ? 1 : -1, s = (a - e) / (i - e);
        (1 === s || 0 === s) && (o = e > i ? .5 : -.5);
        var l = s * (n - t) + t;
        return l === r ? 1 / 0 : l > r ? o : 0;
    }
    function gi(t, e) {
        return Math.abs(t - e) < kf;
    }
    function vi() {
        var t = Pf[0];
        Pf[0] = Pf[1], Pf[1] = t;
    }
    function mi(t, e, n, i, r, a, o, s, l, h) {
        if (h > e && h > i && h > a && h > s || e > h && i > h && a > h && s > h) return 0;
        var u = jn(e, i, a, s, h, Df);
        if (0 === u) return 0;
        for (var c, d, f = 0, p = -1, g = 0; u > g; g++) {
            var v = Df[g], m = 0 === v || 1 === v ? .5 : 1;
            l > qn(t, n, r, o, v) || (0 > p && (p = Un(e, i, a, s, Pf), Pf[1] < Pf[0] && p > 1 && vi(), 
            c = qn(e, i, a, s, Pf[0]), p > 1 && (d = qn(e, i, a, s, Pf[1]))), f += 2 === p ? v < Pf[0] ? e > c ? m : -m : v < Pf[1] ? c > d ? m : -m : d > s ? m : -m : v < Pf[0] ? e > c ? m : -m : c > s ? m : -m);
        }
        return f;
    }
    function yi(t, e, n, i, r, a, o, s) {
        if (s > e && s > i && s > a || e > s && i > s && a > s) return 0;
        var l = ti(e, i, a, s, Df);
        if (0 === l) return 0;
        var h = ei(e, i, a);
        if (h >= 0 && 1 >= h) {
            for (var u = 0, c = Qn(e, i, a, h), d = 0; l > d; d++) {
                f = 0 === Df[d] || 1 === Df[d] ? .5 : 1;
                o > (p = Qn(t, n, r, Df[d])) || (u += Df[d] < h ? e > c ? f : -f : c > a ? f : -f);
            }
            return u;
        }
        var f = 0 === Df[0] || 1 === Df[0] ? .5 : 1, p = Qn(t, n, r, Df[0]);
        return o > p ? 0 : e > a ? f : -f;
    }
    function _i(t, e, n, i, r, a, o, s) {
        if ((s -= e) > n || -n > s) return 0;
        h = Math.sqrt(n * n - s * s);
        Df[0] = -h, Df[1] = h;
        var l = Math.abs(i - r);
        if (1e-4 > l) return 0;
        if (1e-4 > l % Af) {
            i = 0, r = Af;
            p = a ? 1 : -1;
            return o >= Df[0] + t && o <= Df[1] + t ? p : 0;
        }
        if (a) {
            var h = i;
            i = di(r), r = di(h);
        } else i = di(i), r = di(r);
        i > r && (r += Af);
        for (var u = 0, c = 0; 2 > c; c++) {
            var d = Df[c];
            if (d + t > o) {
                var f = Math.atan2(s, d), p = a ? 1 : -1;
                0 > f && (f = Af + f), (f >= i && r >= f || f + Af >= i && r >= f + Af) && (f > Math.PI / 2 && f < 1.5 * Math.PI && (p = -p), 
                u += p);
            }
        }
        return u;
    }
    function xi(t, e, n, i, r) {
        for (var a = 0, o = 0, s = 0, l = 0, h = 0, u = 0; u < t.length; ) {
            var c = t[u++];
            switch (c === If.M && u > 1 && (n || (a += pi(o, s, l, h, i, r))), 1 === u && (o = t[u], 
            s = t[u + 1], l = o, h = s), c) {
              case If.M:
                o = l = t[u++], s = h = t[u++];
                break;

              case If.L:
                if (n) {
                    if (hi(o, s, t[u], t[u + 1], e, i, r)) return !0;
                } else a += pi(o, s, t[u], t[u + 1], i, r) || 0;
                o = t[u++], s = t[u++];
                break;

              case If.C:
                if (n) {
                    if (ui(o, s, t[u++], t[u++], t[u++], t[u++], t[u], t[u + 1], e, i, r)) return !0;
                } else a += mi(o, s, t[u++], t[u++], t[u++], t[u++], t[u], t[u + 1], i, r) || 0;
                o = t[u++], s = t[u++];
                break;

              case If.Q:
                if (n) {
                    if (ci(o, s, t[u++], t[u++], t[u], t[u + 1], e, i, r)) return !0;
                } else a += yi(o, s, t[u++], t[u++], t[u], t[u + 1], i, r) || 0;
                o = t[u++], s = t[u++];
                break;

              case If.A:
                var d = t[u++], f = t[u++], p = t[u++], g = t[u++], v = t[u++], m = t[u++];
                u += 1;
                var y = 1 - t[u++], _ = Math.cos(v) * p + d, x = Math.sin(v) * g + f;
                u > 1 ? a += pi(o, s, _, x, i, r) : (l = _, h = x);
                var w = (i - d) * g / p + d;
                if (n) {
                    if (fi(d, f, g, v, v + m, y, e, w, r)) return !0;
                } else a += _i(d, f, g, v, v + m, y, w, r);
                o = Math.cos(v + m) * p + d, s = Math.sin(v + m) * g + f;
                break;

              case If.R:
                l = o = t[u++], h = s = t[u++];
                var _ = l + t[u++], x = h + t[u++];
                if (n) {
                    if (hi(l, h, _, h, e, i, r) || hi(_, h, _, x, e, i, r) || hi(_, x, l, x, e, i, r) || hi(l, x, l, h, e, i, r)) return !0;
                } else a += pi(_, h, _, x, i, r), a += pi(l, x, l, h, i, r);
                break;

              case If.Z:
                if (n) {
                    if (hi(o, s, l, h, e, i, r)) return !0;
                } else a += pi(o, s, l, h, i, r);
                o = l, s = h;
            }
        }
        return n || gi(s, h) || (a += pi(o, s, l, h, i, r) || 0), 0 !== a;
    }
    function wi(t, e, n) {
        return xi(t, 0, !1, e, n);
    }
    function bi(t, e, n, i) {
        return xi(t, e, !0, n, i);
    }
    function Mi(t) {
        sn.call(this, t), this.path = null;
    }
    function Si(t, e, n, i, r, a, o, s, l, h, u) {
        var c = l * (Gf / 180), d = Hf(c) * (t - n) / 2 + Wf(c) * (e - i) / 2, f = -1 * Wf(c) * (t - n) / 2 + Hf(c) * (e - i) / 2, p = d * d / (o * o) + f * f / (s * s);
        p > 1 && (o *= Vf(p), s *= Vf(p));
        var g = (r === a ? -1 : 1) * Vf((o * o * s * s - o * o * f * f - s * s * d * d) / (o * o * f * f + s * s * d * d)) || 0, v = g * o * f / s, m = g * -s * d / o, y = (t + n) / 2 + Hf(c) * v - Wf(c) * m, _ = (e + i) / 2 + Wf(c) * v + Hf(c) * m, x = qf([ 1, 0 ], [ (d - v) / o, (f - m) / s ]), w = [ (d - v) / o, (f - m) / s ], b = [ (-1 * d - v) / o, (-1 * f - m) / s ], M = qf(w, b);
        Xf(w, b) <= -1 && (M = Gf), Xf(w, b) >= 1 && (M = 0), 0 === a && M > 0 && (M -= 2 * Gf), 
        1 === a && 0 > M && (M += 2 * Gf), u.addData(h, y, _, o, s, x, M, c, a);
    }
    function Ti(t) {
        if (!t) return new Sf();
        for (var e, n = 0, i = 0, r = n, a = i, o = new Sf(), s = Sf.CMD, l = t.match(Yf), h = 0; h < l.length; h++) {
            for (var u, c = l[h], d = c.charAt(0), f = c.match(jf) || [], p = f.length, g = 0; p > g; g++) f[g] = parseFloat(f[g]);
            for (var v = 0; p > v; ) {
                var m, y, _, x, w, b, M, S = n, T = i;
                switch (d) {
                  case "l":
                    n += f[v++], i += f[v++], u = s.L, o.addData(u, n, i);
                    break;

                  case "L":
                    n = f[v++], i = f[v++], u = s.L, o.addData(u, n, i);
                    break;

                  case "m":
                    n += f[v++], i += f[v++], u = s.M, o.addData(u, n, i), r = n, a = i, d = "l";
                    break;

                  case "M":
                    n = f[v++], i = f[v++], u = s.M, o.addData(u, n, i), r = n, a = i, d = "L";
                    break;

                  case "h":
                    n += f[v++], u = s.L, o.addData(u, n, i);
                    break;

                  case "H":
                    n = f[v++], u = s.L, o.addData(u, n, i);
                    break;

                  case "v":
                    i += f[v++], u = s.L, o.addData(u, n, i);
                    break;

                  case "V":
                    i = f[v++], u = s.L, o.addData(u, n, i);
                    break;

                  case "C":
                    u = s.C, o.addData(u, f[v++], f[v++], f[v++], f[v++], f[v++], f[v++]), n = f[v - 2], 
                    i = f[v - 1];
                    break;

                  case "c":
                    u = s.C, o.addData(u, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i), 
                    n += f[v - 2], i += f[v - 1];
                    break;

                  case "S":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.C && (m += n - I[C - 4], y += i - I[C - 3]), u = s.C, S = f[v++], T = f[v++], 
                    n = f[v++], i = f[v++], o.addData(u, m, y, S, T, n, i);
                    break;

                  case "s":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.C && (m += n - I[C - 4], y += i - I[C - 3]), u = s.C, S = n + f[v++], T = i + f[v++], 
                    n += f[v++], i += f[v++], o.addData(u, m, y, S, T, n, i);
                    break;

                  case "Q":
                    S = f[v++], T = f[v++], n = f[v++], i = f[v++], u = s.Q, o.addData(u, S, T, n, i);
                    break;

                  case "q":
                    S = f[v++] + n, T = f[v++] + i, n += f[v++], i += f[v++], u = s.Q, o.addData(u, S, T, n, i);
                    break;

                  case "T":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.Q && (m += n - I[C - 4], y += i - I[C - 3]), n = f[v++], i = f[v++], u = s.Q, 
                    o.addData(u, m, y, n, i);
                    break;

                  case "t":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.Q && (m += n - I[C - 4], y += i - I[C - 3]), n += f[v++], i += f[v++], u = s.Q, 
                    o.addData(u, m, y, n, i);
                    break;

                  case "A":
                    _ = f[v++], x = f[v++], w = f[v++], b = f[v++], M = f[v++], Si(S = n, T = i, n = f[v++], i = f[v++], b, M, _, x, w, u = s.A, o);
                    break;

                  case "a":
                    _ = f[v++], x = f[v++], w = f[v++], b = f[v++], M = f[v++], Si(S = n, T = i, n += f[v++], i += f[v++], b, M, _, x, w, u = s.A, o);
                }
            }
            ("z" === d || "Z" === d) && (u = s.Z, o.addData(u), n = r, i = a), e = u;
        }
        return o.toStatic(), o;
    }
    function Ci(t, e) {
        var n = Ti(t);
        return e = e || {}, e.buildPath = function(t) {
            if (t.setData) t.setData(n.data), (e = t.getContext()) && t.rebuildPath(e); else {
                var e = t;
                n.rebuildPath(e);
            }
        }, e.applyTransform = function(t) {
            Ff(n, t), this.dirty(!0);
        }, e;
    }
    function Ii(t, e) {
        return new Mi(Ci(t, e));
    }
    function Ai(t, e) {
        return Mi.extend(Ci(t, e));
    }
    function ki(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }
    function Di(t, e, n) {
        var i = e.points, r = e.smooth;
        if (i && i.length >= 2) {
            if (r && "spline" !== r) {
                var a = np(i, r, n, e.smoothConstraint);
                t.moveTo(i[0][0], i[0][1]);
                for (var o = i.length, s = 0; (n ? o : o - 1) > s; s++) {
                    var l = a[2 * s], h = a[2 * s + 1], u = i[(s + 1) % o];
                    t.bezierCurveTo(l[0], l[1], h[0], h[1], u[0], u[1]);
                }
            } else {
                "spline" === r && (i = ep(i, n)), t.moveTo(i[0][0], i[0][1]);
                for (var s = 1, c = i.length; c > s; s++) t.lineTo(i[s][0], i[s][1]);
            }
            n && t.closePath();
        }
    }
    function Pi(t, e, n) {
        var i = n && n.lineWidth;
        if (e && i) {
            var r = e.x1, a = e.x2, o = e.y1, s = e.y2;
            ap(2 * r) === ap(2 * a) ? t.x1 = t.x2 = Oi(r, i, !0) : (t.x1 = r, t.x2 = a), ap(2 * o) === ap(2 * s) ? t.y1 = t.y2 = Oi(o, i, !0) : (t.y1 = o, 
            t.y2 = s);
        }
    }
    function Li(t, e, n) {
        var i = n && n.lineWidth;
        if (e && i) {
            var r = e.x, a = e.y, o = e.width, s = e.height;
            t.x = Oi(r, i, !0), t.y = Oi(a, i, !0), t.width = Math.max(Oi(r + o, i, !1) - t.x, 0 === o ? 0 : 1), 
            t.height = Math.max(Oi(a + s, i, !1) - t.y, 0 === s ? 0 : 1);
        }
    }
    function Oi(t, e, n) {
        var i = ap(2 * t);
        return (i + ap(e)) % 2 == 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
    }
    function Ei(t, e, n) {
        var i = t.cpx2, r = t.cpy2;
        return null === i || null === r ? [ (n ? Yn : qn)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? Yn : qn)(t.y1, t.cpy1, t.cpy2, t.y2, e) ] : [ (n ? Jn : Qn)(t.x1, t.cpx1, t.x2, e), (n ? Jn : Qn)(t.y1, t.cpy1, t.y2, e) ];
    }
    function zi(t) {
        sn.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, 
        this.notClear = !0;
    }
    function Ri(t) {
        return Mi.extend(t);
    }
    function Ni(t, e, n, i) {
        var r = Ii(t, e);
        return n && ("center" === i && (n = Fi(n, r.getBoundingRect())), Vi(r, n)), r;
    }
    function Bi(t, e, n) {
        var i = new ln({
            style: {
                image: t,
                x: e.x,
                y: e.y,
                width: e.width,
                height: e.height
            },
            onload: function(t) {
                if ("center" === n) {
                    var r = {
                        width: t.width,
                        height: t.height
                    };
                    i.setStyle(Fi(e, r));
                }
            }
        });
        return i;
    }
    function Fi(t, e) {
        var n, i = e.width / e.height, r = t.height * i;
        return r <= t.width ? n = t.height : (r = t.width, n = r / i), {
            x: t.x + t.width / 2 - r / 2,
            y: t.y + t.height / 2 - n / 2,
            width: r,
            height: n
        };
    }
    function Vi(t, e) {
        if (t.applyTransform) {
            var n = t.getBoundingRect().calculateTransform(e);
            t.applyTransform(n);
        }
    }
    function Wi(t) {
        var e = t.shape, n = t.style.lineWidth;
        return yp(2 * e.x1) === yp(2 * e.x2) && (e.x1 = e.x2 = Gi(e.x1, n, !0)), yp(2 * e.y1) === yp(2 * e.y2) && (e.y1 = e.y2 = Gi(e.y1, n, !0)), 
        t;
    }
    function Hi(t) {
        var e = t.shape, n = t.style.lineWidth, i = e.x, r = e.y, a = e.width, o = e.height;
        return e.x = Gi(e.x, n, !0), e.y = Gi(e.y, n, !0), e.width = Math.max(Gi(i + a, n, !1) - e.x, 0 === a ? 0 : 1), 
        e.height = Math.max(Gi(r + o, n, !1) - e.y, 0 === o ? 0 : 1), t;
    }
    function Gi(t, e, n) {
        var i = yp(2 * t);
        return (i + yp(e)) % 2 == 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
    }
    function Zi(t) {
        return null != t && "none" !== t;
    }
    function Xi(t) {
        if ("string" != typeof t) return t;
        var e = Mp.get(t);
        return e || (e = Vt(t, -.1), 1e4 > Sp && (Mp.set(t, e), Sp++)), e;
    }
    function qi(t) {
        if (t.__hoverStlDirty) {
            t.__hoverStlDirty = !1;
            var e = t.__hoverStl;
            if (!e) return void (t.__cachedNormalStl = t.__cachedNormalZ2 = null);
            var n = t.__cachedNormalStl = {};
            t.__cachedNormalZ2 = t.z2;
            var i = t.style;
            for (var r in e) null != e[r] && (n[r] = i[r]);
            n.fill = i.fill, n.stroke = i.stroke;
        }
    }
    function Yi(t) {
        var e = t.__hoverStl;
        if (e && !t.__highlighted) {
            var n = t.useHoverLayer;
            t.__highlighted = n ? "layer" : "plain";
            var i = t.__zr;
            if (i || !n) {
                var r = t, a = t.style;
                n && (r = i.addHover(t), a = r.style), dr(a), n || qi(r), a.extendFrom(e), ji(a, e, "fill"), 
                ji(a, e, "stroke"), cr(a), n || (t.dirty(!1), t.z2 += bp);
            }
        }
    }
    function ji(t, e, n) {
        !Zi(e[n]) && Zi(t[n]) && (t[n] = Xi(t[n]));
    }
    function Ui(t) {
        var e = t.__highlighted;
        if (e) if (t.__highlighted = !1, "layer" === e) t.__zr && t.__zr.removeHover(t); else if (e) {
            var n = t.style, i = t.__cachedNormalStl;
            i && (dr(n), t.setStyle(i), cr(n));
            var r = t.__cachedNormalZ2;
            null != r && t.z2 - r === bp && (t.z2 = r);
        }
    }
    function $i(t, e) {
        t.isGroup ? t.traverse(function(t) {
            !t.isGroup && e(t);
        }) : e(t);
    }
    function Ki(t, e) {
        e = t.__hoverStl = !1 !== e && (e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl = null, 
        Ui(t), Yi(t));
    }
    function Qi(t) {
        return t && t.__isEmphasisEntered;
    }
    function Ji(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasisEntered && $i(this, Yi);
    }
    function tr(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasisEntered && $i(this, Ui);
    }
    function er() {
        this.__isEmphasisEntered = !0, $i(this, Yi);
    }
    function nr() {
        this.__isEmphasisEntered = !1, $i(this, Ui);
    }
    function ir(t, e, n) {
        t.isGroup ? t.traverse(function(t) {
            !t.isGroup && Ki(t, t.hoverStyle || e);
        }) : Ki(t, t.hoverStyle || e), rr(t, n);
    }
    function rr(t, e) {
        var n = !1 === e;
        if (t.__hoverSilentOnTouch = null != e && e.hoverSilentOnTouch, !n || t.__hoverStyleTrigger) {
            var i = n ? "off" : "on";
            t[i]("mouseover", Ji)[i]("mouseout", tr), t[i]("emphasis", er)[i]("normal", nr), 
            t.__hoverStyleTrigger = !n;
        }
    }
    function ar(t, e, n, i, r, a, o) {
        var s, l = (r = r || wp).labelFetcher, h = r.labelDataIndex, u = r.labelDimIndex, c = n.getShallow("show"), d = i.getShallow("show");
        (c || d) && (l && (s = l.getFormattedLabel(h, "normal", null, u)), null == s && (s = x(r.defaultText) ? r.defaultText(h, r) : r.defaultText));
        var f = c ? s : null, p = d ? A(l ? l.getFormattedLabel(h, "emphasis", null, u) : null, s) : null;
        (null != f || null != p) && (or(t, n, a, r), or(e, i, o, r, !0)), t.text = f, e.text = p;
    }
    function or(t, e, n, i, r) {
        return sr(t, e, i, r), n && o(t, n), t;
    }
    function sr(t, e, n, i) {
        if ((n = n || wp).isRectText) {
            var r = e.getShallow("position") || (i ? null : "inside");
            "outside" === r && (r = "top"), t.textPosition = r, t.textOffset = e.getShallow("offset");
            var a = e.getShallow("rotate");
            null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = A(e.getShallow("distance"), i ? null : 5);
        }
        var o, s = e.ecModel, l = s && s.option.textStyle, h = lr(e);
        if (h) {
            o = {};
            for (var u in h) if (h.hasOwnProperty(u)) {
                var c = e.getModel([ "rich", u ]);
                hr(o[u] = {}, c, l, n, i);
            }
        }
        return t.rich = o, hr(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), 
        t;
    }
    function lr(t) {
        for (var e; t && t !== t.ecModel; ) {
            var n = (t.option || wp).rich;
            if (n) {
                e = e || {};
                for (var i in n) n.hasOwnProperty(i) && (e[i] = 1);
            }
            t = t.parentModel;
        }
        return e;
    }
    function hr(t, e, n, i, r, a) {
        n = !r && n || wp, t.textFill = ur(e.getShallow("color"), i) || n.color, t.textStroke = ur(e.getShallow("textBorderColor"), i) || n.textBorderColor, 
        t.textStrokeWidth = A(e.getShallow("textBorderWidth"), n.textBorderWidth), t.insideRawTextPosition = t.textPosition, 
        r || (a && (t.insideRollbackOpt = i, cr(t)), null == t.textFill && (t.textFill = i.autoColor)), 
        t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, 
        t.fontSize = e.getShallow("fontSize") || n.fontSize, t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, 
        t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), 
        t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), 
        t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && i.disableBox || (t.textBackgroundColor = ur(e.getShallow("backgroundColor"), i), 
        t.textPadding = e.getShallow("padding"), t.textBorderColor = ur(e.getShallow("borderColor"), i), 
        t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), 
        t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), 
        t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), 
        t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, 
        t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, 
        t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY;
    }
    function ur(t, e) {
        return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null;
    }
    function cr(t) {
        var e = t.insideRollbackOpt;
        if (e && null == t.textFill) {
            var n, i = e.useInsideStyle, r = t.insideRawTextPosition, a = e.autoColor;
            !1 !== i && (!0 === i || e.isRectText && r && "string" == typeof r && r.indexOf("inside") >= 0) ? (n = {
                textFill: null,
                textStroke: t.textStroke,
                textStrokeWidth: t.textStrokeWidth
            }, t.textFill = "#fff", null == t.textStroke && (t.textStroke = a, null == t.textStrokeWidth && (t.textStrokeWidth = 2))) : null != a && (n = {
                textFill: null
            }, t.textFill = a), n && (t.insideRollback = n);
        }
    }
    function dr(t) {
        var e = t.insideRollback;
        e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, 
        t.insideRollback = null);
    }
    function fr(t, e) {
        var n = e || e.getModel("textStyle");
        return O([ t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif" ].join(" "));
    }
    function pr(t, e, n, i, r, a) {
        if ("function" == typeof r && (a = r, r = null), i && i.isAnimationEnabled()) {
            var o = t ? "Update" : "", s = i.getShallow("animationDuration" + o), l = i.getShallow("animationEasing" + o), h = i.getShallow("animationDelay" + o);
            "function" == typeof h && (h = h(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), 
            "function" == typeof s && (s = s(r)), s > 0 ? e.animateTo(n, s, h || 0, l, a, !!a) : (e.stopAnimation(), 
            e.attr(n), a && a());
        } else e.stopAnimation(), e.attr(n), a && a();
    }
    function gr(t, e, n, i, r) {
        pr(!0, t, e, n, i, r);
    }
    function vr(t, e, n, i, r) {
        pr(!1, t, e, n, i, r);
    }
    function mr(t, e) {
        for (var n = yt([]); t && t !== e; ) xt(n, t.getLocalTransform(), n), t = t.parent;
        return n;
    }
    function yr(t, e, n) {
        return e && !d(e) && (e = fc.getLocalTransform(e)), n && (e = St([], e)), K([], t, e);
    }
    function _r(t, e, n) {
        var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]), r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]), a = [ "left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0 ];
        return a = yr(a, e, n), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
    }
    function xr(t, e, n) {
        function i(t) {
            var e = {
                position: W(t.position),
                rotation: t.rotation
            };
            return t.shape && (e.shape = o({}, t.shape)), e;
        }
        if (t && e) {
            var r = function(t) {
                var e = {};
                return t.traverse(function(t) {
                    !t.isGroup && t.anid && (e[t.anid] = t);
                }), e;
            }(t);
            e.traverse(function(t) {
                if (!t.isGroup && t.anid) {
                    var e = r[t.anid];
                    if (e) {
                        var a = i(t);
                        t.attr(i(e)), gr(t, a, n, t.dataIndex);
                    }
                }
            });
        }
    }
    function wr(t, e, n) {
        var i = (e = o({
            rectHover: !0
        }, e)).style = {
            strokeNoScale: !0
        };
        return n = n || {
            x: -1,
            y: -1,
            width: 2,
            height: 2
        }, t ? 0 === t.indexOf("image://") ? (i.image = t.slice(8), s(i, n), new ln(e)) : Ni(t.replace("path://", ""), e, n, "center") : void 0;
    }
    function br(t, e, n) {
        this.parentModel = e, this.ecModel = n, this.option = t;
    }
    function Mr(e, n, i) {
        for (var r = 0; r < n.length && (!n[r] || null != (e = e && "object" == (void 0 === e ? "undefined" : t(e)) ? e[n[r]] : null)); r++) ;
        return null == e && i && (e = i.get(n)), e;
    }
    function Sr(t, e) {
        var n = Pp(t).getParent;
        return n ? n.call(t, e) : t.parentModel;
    }
    function Tr(t) {
        return [ t || "", Lp++, Math.random().toFixed(5) ].join("_");
    }
    function Cr(t) {
        return t.replace(/^\s+/, "").replace(/\s+$/, "");
    }
    function Ir(t, e, n, i) {
        var r = e[1] - e[0], a = n[1] - n[0];
        if (0 === r) return 0 === a ? n[0] : (n[0] + n[1]) / 2;
        if (i) if (r > 0) {
            if (t <= e[0]) return n[0];
            if (t >= e[1]) return n[1];
        } else {
            if (t >= e[0]) return n[0];
            if (t <= e[1]) return n[1];
        } else {
            if (t === e[0]) return n[0];
            if (t === e[1]) return n[1];
        }
        return (t - e[0]) / r * a + n[0];
    }
    function Ar(t, e) {
        switch (t) {
          case "center":
          case "middle":
            t = "50%";
            break;

          case "left":
          case "top":
            t = "0%";
            break;

          case "right":
          case "bottom":
            t = "100%";
        }
        return "string" == typeof t ? Cr(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? NaN : +t;
    }
    function kr(t, e, n) {
        return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), 
        n ? t : +t;
    }
    function Dr(t) {
        return t.sort(function(t, e) {
            return t - e;
        }), t;
    }
    function Pr(t) {
        var e = t.toString(), n = e.indexOf("e");
        if (n > 0) {
            var i = +e.slice(n + 1);
            return 0 > i ? -i : 0;
        }
        var r = e.indexOf(".");
        return 0 > r ? 0 : e.length - 1 - r;
    }
    function Lr(t, e) {
        var n = Math.log, i = Math.LN10, r = Math.floor(n(t[1] - t[0]) / i), a = Math.round(n(Math.abs(e[1] - e[0])) / i), o = Math.min(Math.max(-r + a, 0), 20);
        return isFinite(o) ? o : 20;
    }
    function Or(t) {
        var e = 2 * Math.PI;
        return (t % e + e) % e;
    }
    function Er(t) {
        return t > -Op && Op > t;
    }
    function zr(t) {
        if (t instanceof Date) return t;
        if ("string" == typeof t) {
            var e = Ep.exec(t);
            if (!e) return new Date(NaN);
            if (e[8]) {
                var n = +e[4] || 0;
                return "Z" !== e[8].toUpperCase() && (n -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, +e[7] || 0));
            }
            return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0);
        }
        return new Date(null == t ? NaN : Math.round(t));
    }
    function Rr(t) {
        return Math.pow(10, Nr(t));
    }
    function Nr(t) {
        return Math.floor(Math.log(t) / Math.LN10);
    }
    function Br(t, e) {
        var n, i = Nr(t), r = Math.pow(10, i), a = t / r;
        return n = e ? 1.5 > a ? 1 : 2.5 > a ? 2 : 4 > a ? 3 : 7 > a ? 5 : 10 : 1 > a ? 1 : 2 > a ? 2 : 3 > a ? 3 : 5 > a ? 5 : 10, 
        t = n * r, i >= -20 ? +t.toFixed(0 > i ? -i : 0) : t;
    }
    function Fr(t) {
        return isNaN(t) ? "-" : (t = (t + "").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
    }
    function Vr(t) {
        return null == t ? "" : (t + "").replace(Np, function(t, e) {
            return Bp[e];
        });
    }
    function Wr(t, e, n) {
        _(e) || (e = [ e ]);
        var i = e.length;
        if (!i) return "";
        for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
            var o = Fp[a];
            t = t.replace(Vp(o), Vp(o, 0));
        }
        for (var s = 0; i > s; s++) for (var l = 0; l < r.length; l++) {
            var h = e[s][r[l]];
            t = t.replace(Vp(Fp[l], s), n ? Vr(h) : h);
        }
        return t;
    }
    function Hr(t, e) {
        var n = (t = w(t) ? {
            color: t,
            extraCssText: e
        } : t || {}).color, i = t.type, e = t.extraCssText, r = t.renderMode || "html", a = t.markerId || "X";
        return n ? "html" === r ? "subItem" === i ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Vr(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + Vr(n) + ";" + (e || "") + '"></span>' : {
            renderMode: r,
            content: "{marker" + a + "|}  ",
            style: {
                color: n
            }
        } : "";
    }
    function Gr(t, e) {
        return t += "", "0000".substr(0, e - t.length) + t;
    }
    function Zr(t, e, n) {
        ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");
        var i = zr(e), r = n ? "UTC" : "", a = i["get" + r + "FullYear"](), o = i["get" + r + "Month"]() + 1, s = i["get" + r + "Date"](), l = i["get" + r + "Hours"](), h = i["get" + r + "Minutes"](), u = i["get" + r + "Seconds"](), c = i["get" + r + "Milliseconds"]();
        return t = t.replace("MM", Gr(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", Gr(s, 2)).replace("d", s).replace("hh", Gr(l, 2)).replace("h", l).replace("mm", Gr(h, 2)).replace("m", h).replace("ss", Gr(u, 2)).replace("s", u).replace("SSS", Gr(c, 3));
    }
    function Xr(t) {
        return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;
    }
    function qr(t, e, n, i, r) {
        var a = 0, o = 0;
        null == i && (i = 1 / 0), null == r && (r = 1 / 0);
        var s = 0;
        e.eachChild(function(l, h) {
            var u, c, d = l.position, f = l.getBoundingRect(), p = e.childAt(h + 1), g = p && p.getBoundingRect();
            if ("horizontal" === t) {
                var v = f.width + (g ? -g.x + f.x : 0);
                (u = a + v) > i || l.newline ? (a = 0, u = v, o += s + n, s = f.height) : s = Math.max(s, f.height);
            } else {
                var m = f.height + (g ? -g.y + f.y : 0);
                (c = o + m) > r || l.newline ? (a += s + n, o = 0, c = m, s = f.width) : s = Math.max(s, f.width);
            }
            l.newline || (d[0] = a, d[1] = o, "horizontal" === t ? a = u + n : o = c + n);
        });
    }
    function Yr(t, e, n) {
        n = Rp(n || 0);
        var i = e.width, r = e.height, a = Ar(t.left, i), o = Ar(t.top, r), s = Ar(t.right, i), l = Ar(t.bottom, r), h = Ar(t.width, i), u = Ar(t.height, r), c = n[2] + n[0], d = n[1] + n[3], f = t.aspect;
        switch (isNaN(h) && (h = i - s - d - a), isNaN(u) && (u = r - l - c - o), null != f && (isNaN(h) && isNaN(u) && (f > i / r ? h = .8 * i : u = .8 * r), 
        isNaN(h) && (h = f * u), isNaN(u) && (u = h / f)), isNaN(a) && (a = i - s - h - d), 
        isNaN(o) && (o = r - l - u - c), t.left || t.right) {
          case "center":
            a = i / 2 - h / 2 - n[3];
            break;

          case "right":
            a = i - h - d;
        }
        switch (t.top || t.bottom) {
          case "middle":
          case "center":
            o = r / 2 - u / 2 - n[0];
            break;

          case "bottom":
            o = r - u - c;
        }
        a = a || 0, o = o || 0, isNaN(h) && (h = i - d - a - (s || 0)), isNaN(u) && (u = r - c - o - (l || 0));
        var p = new oe(a + n[3], o + n[0], h, u);
        return p.margin = n, p;
    }
    function jr(t, e, n) {
        function i(n, i) {
            var o = {}, l = 0, h = {}, u = 0;
            if (Gp(n, function(e) {
                h[e] = t[e];
            }), Gp(n, function(t) {
                r(e, t) && (o[t] = h[t] = e[t]), a(o, t) && l++, a(h, t) && u++;
            }), s[i]) return a(e, n[1]) ? h[n[2]] = null : a(e, n[2]) && (h[n[1]] = null), h;
            if (2 !== u && l) {
                if (l >= 2) return o;
                for (var c = 0; c < n.length; c++) {
                    var d = n[c];
                    if (!r(o, d) && r(t, d)) {
                        o[d] = t[d];
                        break;
                    }
                }
                return o;
            }
            return h;
        }
        function r(t, e) {
            return t.hasOwnProperty(e);
        }
        function a(t, e) {
            return null != t[e] && "auto" !== t[e];
        }
        function o(t, e, n) {
            Gp(t, function(t) {
                e[t] = n[t];
            });
        }
        !b(n) && (n = {});
        var s = n.ignoreSize;
        !_(s) && (s = [ s, s ]);
        var l = i(Xp[0], 0), h = i(Xp[1], 1);
        o(Xp[0], t, l), o(Xp[1], t, h);
    }
    function Ur(t) {
        return $r({}, t);
    }
    function $r(t, e) {
        return e && t && Gp(Zp, function(n) {
            e.hasOwnProperty(n) && (t[n] = e[n]);
        }), t;
    }
    function Kr(t, e) {
        for (var n = t.length, i = 0; n > i; i++) if (t[i].length > e) return t[i];
        return t[n - 1];
    }
    function Qr(t) {
        var e = t.get("coordinateSystem"), n = {
            coordSysName: e,
            coordSysDims: [],
            axisMap: N(),
            categoryAxisMap: N()
        }, i = Jp[e];
        return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0;
    }
    function Jr(t) {
        return "category" === t.get("type");
    }
    function ta(t) {
        this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === ig ? {} : []), 
        this.sourceFormat = t.sourceFormat || rg, this.seriesLayoutBy = t.seriesLayoutBy || og, 
        this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && N(t.encodeDefine), 
        this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount;
    }
    function ea(t) {
        var e = t.option.source, n = rg;
        if (S(e)) n = ag; else if (_(e)) {
            0 === e.length && (n = eg);
            for (var i = 0, r = e.length; r > i; i++) {
                var a = e[i];
                if (null != a) {
                    if (_(a)) {
                        n = eg;
                        break;
                    }
                    if (b(a)) {
                        n = ng;
                        break;
                    }
                }
            }
        } else if (b(e)) {
            for (var o in e) if (e.hasOwnProperty(o) && d(e[o])) {
                n = ig;
                break;
            }
        } else if (null != e) throw new Error("Invalid data");
        lg(t).sourceFormat = n;
    }
    function na(t) {
        return lg(t).source;
    }
    function ia(t) {
        lg(t).datasetMap = N();
    }
    function ra(t) {
        var e = t.option, n = e.data, i = S(n) ? ag : tg, r = !1, a = e.seriesLayoutBy, o = e.sourceHeader, s = e.dimensions, l = ua(t);
        if (l) {
            var h = l.option;
            n = h.source, i = lg(l).sourceFormat, r = !0, a = a || h.seriesLayoutBy, null == o && (o = h.sourceHeader), 
            s = s || h.dimensions;
        }
        var u = aa(n, i, a, o, s), c = e.encode;
        !c && l && (c = ha(t, l, n, i, a, u)), lg(t).source = new ta({
            data: n,
            fromDataset: r,
            seriesLayoutBy: a,
            sourceFormat: i,
            dimensionsDefine: u.dimensionsDefine,
            startIndex: u.startIndex,
            dimensionsDetectCount: u.dimensionsDetectCount,
            encodeDefine: c
        });
    }
    function aa(t, e, n, i, r) {
        if (!t) return {
            dimensionsDefine: oa(r)
        };
        var a, o, s;
        if (e === eg) "auto" === i || null == i ? sa(function(t) {
            null != t && "-" !== t && (w(t) ? null == o && (o = 1) : o = 0);
        }, n, t, 10) : o = i ? 1 : 0, r || 1 !== o || (r = [], sa(function(t, e) {
            r[e] = null != t ? t : "";
        }, n, t)), a = r ? r.length : n === sg ? t.length : t[0] ? t[0].length : null; else if (e === ng) r || (r = la(t), 
        s = !0); else if (e === ig) r || (r = [], s = !0, f(t, function(t, e) {
            r.push(e);
        })); else if (e === tg) {
            var l = Sn(t[0]);
            a = _(l) && l.length || 1;
        }
        var h;
        return s && f(r, function(t, e) {
            "name" === (b(t) ? t.name : t) && (h = e);
        }), {
            startIndex: o,
            dimensionsDefine: oa(r),
            dimensionsDetectCount: a,
            potentialNameDimIndex: h
        };
    }
    function oa(t) {
        if (t) {
            var e = N();
            return p(t, function(t) {
                if (null == (t = o({}, b(t) ? t : {
                    name: t
                })).name) return t;
                t.name += "", null == t.displayName && (t.displayName = t.name);
                var n = e.get(t.name);
                return n ? t.name += "-" + n.count++ : e.set(t.name, {
                    count: 1
                }), t;
            });
        }
    }
    function sa(t, e, n, i) {
        if (null == i && (i = 1 / 0), e === sg) for (a = 0; a < n.length && i > a; a++) t(n[a] ? n[a][0] : null, a); else for (var r = n[0] || [], a = 0; a < r.length && i > a; a++) t(r[a], a);
    }
    function la(t) {
        for (var e, n = 0; n < t.length && !(e = t[n++]); ) ;
        if (e) {
            var i = [];
            return f(e, function(t, e) {
                i.push(e);
            }), i;
        }
    }
    function ha(t, e, n, i, r, a) {
        var o = Qr(t), s = {}, l = [], h = [], u = t.subType, c = N([ "pie", "map", "funnel" ]), d = N([ "line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot" ]);
        if (o && null != d.get(u)) {
            var p = t.ecModel, g = lg(p).datasetMap, v = e.uid + "_" + r, m = g.get(v) || g.set(v, {
                categoryWayDim: 1,
                valueWayDim: 0
            });
            f(o.coordSysDims, function(t) {
                if (null == o.firstCategoryDimIndex) {
                    e = m.valueWayDim++;
                    s[t] = e, h.push(e);
                } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0); else {
                    var e = m.categoryWayDim++;
                    s[t] = e, h.push(e);
                }
            });
        } else if (null != c.get(u)) {
            for (var y, _ = 0; 5 > _ && null == y; _++) da(n, i, r, a.dimensionsDefine, a.startIndex, _) || (y = _);
            if (null != y) {
                s.value = y;
                var x = a.potentialNameDimIndex || Math.max(y - 1, 0);
                h.push(x), l.push(x);
            }
        }
        return l.length && (s.itemName = l), h.length && (s.seriesName = h), s;
    }
    function ua(t) {
        var e = t.option;
        return e.data ? void 0 : t.ecModel.getComponent("dataset", e.datasetIndex || 0);
    }
    function ca(t, e) {
        return da(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);
    }
    function da(t, e, n, i, r, a) {
        function o(t) {
            return (null == t || !isFinite(t) || "" === t) && (!(!w(t) || "-" === t) || void 0);
        }
        var s;
        if (S(t)) return !1;
        var l;
        if (i && (l = i[a], l = b(l) ? l.name : l), e === eg) if (n === sg) {
            for (var h = t[a], u = 0; u < (h || []).length && 5 > u; u++) if (null != (s = o(h[r + u]))) return s;
        } else for (u = 0; u < t.length && 5 > u; u++) {
            var c = t[r + u];
            if (c && null != (s = o(c[a]))) return s;
        } else if (e === ng) {
            if (!l) return;
            for (u = 0; u < t.length && 5 > u; u++) if ((d = t[u]) && null != (s = o(d[l]))) return s;
        } else if (e === ig) {
            if (!l) return;
            if (!(h = t[l]) || S(h)) return !1;
            for (u = 0; u < h.length && 5 > u; u++) if (null != (s = o(h[u]))) return s;
        } else if (e === tg) for (u = 0; u < t.length && 5 > u; u++) {
            var d = t[u], f = Sn(d);
            if (!_(f)) return !1;
            if (null != (s = o(f[a]))) return s;
        }
        return !1;
    }
    function fa(t, e) {
        if (e) {
            var n = e.seiresIndex, i = e.seriesId, r = e.seriesName;
            return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r;
        }
    }
    function pa(e, n) {
        var a = e.color && !e.colorLayer;
        f(n, function(n, o) {
            "colorLayer" === o && a || jp.hasClass(o) || ("object" == (void 0 === n ? "undefined" : t(n)) ? e[o] = e[o] ? r(e[o], n, !1) : i(n) : null == e[o] && (e[o] = n));
        });
    }
    function ga(t) {
        t = t, this.option = {}, this.option[hg] = 1, this._componentsMap = N({
            series: []
        }), this._seriesIndices, this._seriesIndicesMap, pa(t, this._theme.option), r(t, $p, !1), 
        this.mergeOption(t);
    }
    function va(t, e) {
        _(e) || (e = e ? [ e ] : []);
        var n = {};
        return f(e, function(e) {
            n[e] = (t.get(e) || []).slice();
        }), n;
    }
    function ma(t, e, n) {
        return e.type ? e.type : n ? n.subType : jp.determineSubType(t, e);
    }
    function ya(t, e) {
        t._seriesIndicesMap = N(t._seriesIndices = p(e, function(t) {
            return t.componentIndex;
        }) || []);
    }
    function _a(t, e) {
        return e.hasOwnProperty("subType") ? v(t, function(t) {
            return t.subType === e.subType;
        }) : t;
    }
    function xa(t) {
        f(cg, function(e) {
            this[e] = m(t[e], t);
        }, this);
    }
    function wa() {
        this._coordinateSystems = [];
    }
    function ba(t) {
        this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, 
        this._currentMediaIndices = [], this._optionBackup, this._newBaseOption;
    }
    function Ma(t, e, n) {
        var i, r, a = [], o = [], s = t.timeline;
        if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), 
        t.media) {
            r = r || {};
            var l = t.media;
            fg(l, function(t) {
                t && t.option && (t.query ? o.push(t) : i || (i = t));
            });
        }
        return r || (r = t), r.timeline || (r.timeline = s), fg([ r ].concat(a).concat(p(o, function(t) {
            return t.option;
        })), function(t) {
            fg(e, function(e) {
                e(t, n);
            });
        }), {
            baseOption: r,
            timelineOptions: a,
            mediaDefault: i,
            mediaList: o
        };
    }
    function Sa(t, e, n) {
        var i = {
            width: e,
            height: n,
            aspectratio: e / n
        }, r = !0;
        return f(t, function(t, e) {
            var n = e.match(mg);
            if (n && n[1] && n[2]) {
                var a = n[1], o = n[2].toLowerCase();
                Ta(i[o], t, a) || (r = !1);
            }
        }), r;
    }
    function Ta(t, e, n) {
        return "min" === n ? t >= e : "max" === n ? e >= t : t === e;
    }
    function Ca(t, e) {
        return t.join(",") === e.join(",");
    }
    function Ia(t, e) {
        fg(e = e || {}, function(e, n) {
            if (null != e) {
                var i = t[n];
                if (jp.hasClass(n)) {
                    e = bn(e);
                    var r = Cn(i = bn(i), e);
                    t[n] = gg(r, function(t) {
                        return t.option && t.exist ? vg(t.exist, t.option, !0) : t.exist || t.option;
                    });
                } else t[n] = vg(i, e, !0);
            }
        });
    }
    function Aa(t) {
        var e = t && t.itemStyle;
        if (e) for (var n = 0, i = xg.length; i > n; n++) {
            var a = xg[n], o = e.normal, s = e.emphasis;
            o && o[a] && (t[a] = t[a] || {}, t[a].normal ? r(t[a].normal, o[a]) : t[a].normal = o[a], 
            o[a] = null), s && s[a] && (t[a] = t[a] || {}, t[a].emphasis ? r(t[a].emphasis, s[a]) : t[a].emphasis = s[a], 
            s[a] = null);
        }
    }
    function ka(t, e, n) {
        if (t && t[e] && (t[e].normal || t[e].emphasis)) {
            var i = t[e].normal, r = t[e].emphasis;
            i && (n ? (t[e].normal = t[e].emphasis = null, s(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, 
            t.emphasis[e] = r);
        }
    }
    function Da(t) {
        ka(t, "itemStyle"), ka(t, "lineStyle"), ka(t, "areaStyle"), ka(t, "label"), ka(t, "labelLine"), 
        ka(t, "upperLabel"), ka(t, "edgeLabel");
    }
    function Pa(t, e) {
        var n = _g(t) && t[e], i = _g(n) && n.textStyle;
        if (i) for (var r = 0, a = Rd.length; a > r; r++) {
            var e = Rd[r];
            i.hasOwnProperty(e) && (n[e] = i[e]);
        }
    }
    function La(t) {
        t && (Da(t), Pa(t, "label"), t.emphasis && Pa(t.emphasis, "label"));
    }
    function Oa(t) {
        if (_g(t)) {
            Aa(t), Da(t), Pa(t, "label"), Pa(t, "upperLabel"), Pa(t, "edgeLabel"), t.emphasis && (Pa(t.emphasis, "label"), 
            Pa(t.emphasis, "upperLabel"), Pa(t.emphasis, "edgeLabel"));
            var e = t.markPoint;
            e && (Aa(e), La(e));
            var n = t.markLine;
            n && (Aa(n), La(n));
            var i = t.markArea;
            i && La(i);
            var r = t.data;
            if ("graph" === t.type) {
                r = r || t.nodes;
                var a = t.links || t.edges;
                if (a && !S(a)) for (s = 0; s < a.length; s++) La(a[s]);
                f(t.categories, function(t) {
                    Da(t);
                });
            }
            if (r && !S(r)) for (s = 0; s < r.length; s++) La(r[s]);
            if ((e = t.markPoint) && e.data) for (var o = e.data, s = 0; s < o.length; s++) La(o[s]);
            if ((n = t.markLine) && n.data) for (var l = n.data, s = 0; s < l.length; s++) _(l[s]) ? (La(l[s][0]), 
            La(l[s][1])) : La(l[s]);
            "gauge" === t.type ? (Pa(t, "axisLabel"), Pa(t, "title"), Pa(t, "detail")) : "treemap" === t.type ? (ka(t.breadcrumb, "itemStyle"), 
            f(t.levels, function(t) {
                Da(t);
            })) : "tree" === t.type && Da(t.leaves);
        }
    }
    function Ea(t) {
        return _(t) ? t : t ? [ t ] : [];
    }
    function za(t) {
        return (_(t) ? t[0] : t) || {};
    }
    function Ra(t, e) {
        e = e.split(",");
        for (var n = t, i = 0; i < e.length && null != (n = n && n[e[i]]); i++) ;
        return n;
    }
    function Na(t, e, n, i) {
        e = e.split(",");
        for (var r, a = t, o = 0; o < e.length - 1; o++) null == a[r = e[o]] && (a[r] = {}), 
        a = a[r];
        (i || null == a[e[o]]) && (a[e[o]] = n);
    }
    function Ba(t) {
        f(bg, function(e) {
            e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);
        });
    }
    function Fa(t) {
        f(t, function(e, n) {
            var i = [], r = [ NaN, NaN ], a = [ e.stackResultDimension, e.stackedOverDimension ], o = e.data, s = e.isStackedByIndex, l = o.map(a, function(a, l, h) {
                var u = o.get(e.stackedDimension, h);
                if (isNaN(u)) return r;
                var c, d;
                s ? d = o.getRawIndex(h) : c = o.get(e.stackedByDimension, h);
                for (var f = NaN, p = n - 1; p >= 0; p--) {
                    var g = t[p];
                    if (s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0) {
                        var v = g.data.getByRawIndex(g.stackResultDimension, d);
                        if (u >= 0 && v > 0 || 0 >= u && 0 > v) {
                            u += v, f = v;
                            break;
                        }
                    }
                }
                return i[0] = u, i[1] = f, i;
            });
            o.hostModel.setData(l), e.data = l;
        });
    }
    function Va(t, e) {
        ta.isInstance(t) || (t = ta.seriesDataToSource(t)), this._source = t;
        var n = this._data = t.data, i = t.sourceFormat;
        i === ag && (this._offset = 0, this._dimSize = e, this._data = n), o(this, Cg[i === eg ? i + "_" + t.seriesLayoutBy : i]);
    }
    function Wa() {
        return this._data.length;
    }
    function Ha(t) {
        return this._data[t];
    }
    function Ga(t) {
        for (var e = 0; e < t.length; e++) this._data.push(t[e]);
    }
    function Za(t, e, n) {
        return null != n ? t[n] : t;
    }
    function Xa(t, e, n, i) {
        return qa(t[i], this._dimensionInfos[e]);
    }
    function qa(t, e) {
        var n = e && e.type;
        if ("ordinal" === n) {
            var i = e && e.ordinalMeta;
            return i ? i.parseAndCollect(t) : t;
        }
        return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +zr(t)), 
        null == t || "" === t ? NaN : +t;
    }
    function Ya(t, e, n) {
        if (t) {
            var i = t.getRawDataItem(e);
            if (null != i) {
                var r, a, o = t.getProvider().getSource().sourceFormat, s = t.getDimensionInfo(n);
                return s && (r = s.name, a = s.index), Ig[o](i, e, a, r);
            }
        }
    }
    function ja(t) {
        return new Ua(t);
    }
    function Ua(t) {
        t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, 
        this._onDirty = t.onDirty, this._dirty = !0, this.context;
    }
    function $a(t, e, n, i, r, a) {
        Lg.reset(n, i, r, a), t._callingProgress = e, t._callingProgress({
            start: n,
            end: i,
            count: i - n,
            next: Lg.next
        }, t.context);
    }
    function Ka(t, e) {
        t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;
        var n, i;
        !e && t._reset && ((n = t._reset(t.context)) && n.progress && (i = n.forceFirstProgress, 
        n = n.progress), _(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;
        var r = t._downstream;
        return r && r.dirty(), i;
    }
    function Qa(t) {
        var e = t.name;
        An(t) || (t.name = Ja(t) || e);
    }
    function Ja(t) {
        var e = t.getRawData(), n = [];
        return f(e.mapDimension("seriesName", !0), function(t) {
            var i = e.getDimensionInfo(t);
            i.displayName && n.push(i.displayName);
        }), n.join(" ");
    }
    function to(t) {
        return t.model.getRawData().count();
    }
    function eo(t) {
        var e = t.model;
        return e.setData(e.getRawData().cloneShallow()), no;
    }
    function no(t, e) {
        t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);
    }
    function io(t, e) {
        f(t.CHANGABLE_METHODS, function(n) {
            t.wrapMethod(n, y(ro, e));
        });
    }
    function ro(t) {
        var e = ao(t);
        e && e.setOutputEnd(this.count());
    }
    function ao(t) {
        var e = (t.ecModel || {}).scheduler, n = e && e.getPipeline(t.uid);
        if (n) {
            var i = n.currentTask;
            if (i) {
                var r = i.agentStubMap;
                r && (i = r.get(t.uid));
            }
            return i;
        }
    }
    function oo() {
        this.group = new Wc(), this.uid = Tr("viewChart"), this.renderTask = ja({
            plan: ho,
            reset: uo
        }), this.renderTask.context = {
            view: this
        };
    }
    function so(t, e) {
        if (t && (t.trigger(e), "group" === t.type)) for (var n = 0; n < t.childCount(); n++) so(t.childAt(n), e);
    }
    function lo(t, e, n) {
        var i = Dn(t, e);
        null != i ? f(bn(i), function(e) {
            so(t.getItemGraphicEl(e), n);
        }) : t.eachItemGraphicEl(function(t) {
            so(t, n);
        });
    }
    function ho(t) {
        return Fg(t.model);
    }
    function uo(t) {
        var e = t.model, n = t.ecModel, i = t.api, r = t.payload, a = e.pipelineContext.progressiveRender, o = t.view, s = r && Bg(r).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
        return "render" !== l && o[l](e, n, i, r), Wg[l];
    }
    function co(t, e, n) {
        function i() {
            u = new Date().getTime(), c = null, t.apply(o, s || []);
        }
        var r, a, o, s, l, h = 0, u = 0, c = null;
        e = e || 0;
        var d = function() {
            r = new Date().getTime(), o = this, s = arguments;
            var t = l || e, d = l || n;
            l = null, a = r - (d ? h : u) - t, clearTimeout(c), d ? c = setTimeout(i, t) : a >= 0 ? i() : c = setTimeout(i, -a), 
            h = r;
        };
        return d.clear = function() {
            c && (clearTimeout(c), c = null);
        }, d.debounceNextCall = function(t) {
            l = t;
        }, d;
    }
    function fo(t, e, n, i) {
        var r = t[e];
        if (r) {
            var a = r[Hg] || r, o = r[Zg];
            if (r[Gg] !== n || o !== i) {
                if (null == n || !i) return t[e] = a;
                (r = t[e] = co(a, n, "debounce" === i))[Hg] = a, r[Zg] = i, r[Gg] = n;
            }
            return r;
        }
    }
    function po(t, e) {
        var n = t[e];
        n && n[Hg] && (t[e] = n[Hg]);
    }
    function go(t, e, n, i) {
        this.ecInstance = t, this.api = e, this.unfinished;
        var n = this._dataProcessorHandlers = n.slice(), i = this._visualHandlers = i.slice();
        this._allHandlers = n.concat(i), this._stageTaskMap = N();
    }
    function vo(t, e, n, i, r) {
        function a(t, e) {
            return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));
        }
        r = r || {};
        var o;
        f(e, function(e) {
            if (!r.visualType || r.visualType === e.visualType) {
                var s = t._stageTaskMap.get(e.uid), l = s.seriesTaskMap, h = s.overallTask;
                if (h) {
                    var u, c = h.agentStubMap;
                    c.each(function(t) {
                        a(r, t) && (t.dirty(), u = !0);
                    }), u && h.dirty(), $g(h, i);
                    var d = t.getPerformArgs(h, r.block);
                    c.each(function(t) {
                        t.perform(d);
                    }), o |= h.perform(d);
                } else l && l.each(function(s) {
                    a(r, s) && s.dirty();
                    var l = t.getPerformArgs(s, r.block);
                    l.skip = !e.performRawSeries && n.isSeriesFiltered(s.context.model), $g(s, i), o |= s.perform(l);
                });
            }
        }), t.unfinished |= o;
    }
    function mo(t, e, n, i, r) {
        function a(n) {
            var a = n.uid, s = o.get(a) || o.set(a, ja({
                plan: Mo,
                reset: So,
                count: Co
            }));
            s.context = {
                model: n,
                ecModel: i,
                api: r,
                useClearVisual: e.isVisual && !e.isLayout,
                plan: e.plan,
                reset: e.reset,
                scheduler: t
            }, Io(t, n, s);
        }
        var o = n.seriesTaskMap || (n.seriesTaskMap = N()), s = e.seriesType, l = e.getTargetSeries;
        e.createOnAllSeries ? i.eachRawSeries(a) : s ? i.eachRawSeriesByType(s, a) : l && l(i, r).each(a);
        var h = t._pipelineMap;
        o.each(function(t, e) {
            h.get(e) || (t.dispose(), o.removeKey(e));
        });
    }
    function yo(t, e, n, i, r) {
        function a(e) {
            var n = e.uid, i = s.get(n);
            i || (i = s.set(n, ja({
                reset: xo,
                onDirty: bo
            })), o.dirty()), i.context = {
                model: e,
                overallProgress: u,
                modifyOutputEnd: c
            }, i.agent = o, i.__block = u, Io(t, e, i);
        }
        var o = n.overallTask = n.overallTask || ja({
            reset: _o
        });
        o.context = {
            ecModel: i,
            api: r,
            overallReset: e.overallReset,
            scheduler: t
        };
        var s = o.agentStubMap = o.agentStubMap || N(), l = e.seriesType, h = e.getTargetSeries, u = !0, c = e.modifyOutputEnd;
        l ? i.eachRawSeriesByType(l, a) : h ? h(i, r).each(a) : (u = !1, f(i.getSeries(), a));
        var d = t._pipelineMap;
        s.each(function(t, e) {
            d.get(e) || (t.dispose(), o.dirty(), s.removeKey(e));
        });
    }
    function _o(t) {
        t.overallReset(t.ecModel, t.api, t.payload);
    }
    function xo(t) {
        return t.overallProgress && wo;
    }
    function wo() {
        this.agent.dirty(), this.getDownstream().dirty();
    }
    function bo() {
        this.agent && this.agent.dirty();
    }
    function Mo(t) {
        return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload);
    }
    function So(t) {
        t.useClearVisual && t.data.clearAllVisual();
        var e = t.resetDefines = bn(t.reset(t.model, t.ecModel, t.api, t.payload));
        return e.length > 1 ? p(e, function(t, e) {
            return To(e);
        }) : Kg;
    }
    function To(t) {
        return function(e, n) {
            var i = n.data, r = n.resetDefines[t];
            if (r && r.dataEach) for (var a = e.start; a < e.end; a++) r.dataEach(i, a); else r && r.progress && r.progress(e, i);
        };
    }
    function Co(t) {
        return t.data.count();
    }
    function Io(t, e, n) {
        var i = e.uid, r = t._pipelineMap.get(i);
        !r.head && (r.head = n), r.tail && r.tail.pipe(n), r.tail = n, n.__idxInPipeline = r.count++, 
        n.__pipeline = r;
    }
    function Ao(t) {
        Qg = null;
        try {
            t(Jg, tv);
        } catch (t) {}
        return Qg;
    }
    function ko(t, e) {
        for (var n in e.prototype) t[n] = B;
    }
    function Do(t) {
        for (w(t) && (t = new DOMParser().parseFromString(t, "text/xml")), 9 === t.nodeType && (t = t.firstChild); "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType; ) t = t.nextSibling;
        return t;
    }
    function Po() {
        this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1;
    }
    function Lo(t, e) {
        for (var n = t.firstChild; n; ) {
            if (1 === n.nodeType) {
                var i = n.getAttribute("offset");
                i = i.indexOf("%") > 0 ? parseInt(i, 10) / 100 : i ? parseFloat(i) : 0;
                var r = n.getAttribute("stop-color") || "#000000";
                e.addColorStop(i, r);
            }
            n = n.nextSibling;
        }
    }
    function Oo(t, e) {
        t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), s(e.__inheritedStyle, t.__inheritedStyle));
    }
    function Eo(t) {
        for (var e = O(t).split(lv), n = [], i = 0; i < e.length; i += 2) {
            var r = parseFloat(e[i]), a = parseFloat(e[i + 1]);
            n.push([ r, a ]);
        }
        return n;
    }
    function zo(t, e, n, i) {
        var r = e.__inheritedStyle || {}, a = "text" === e.type;
        if (1 === t.nodeType && (No(t, e), o(r, Bo(t)), !i)) for (var s in cv) if (cv.hasOwnProperty(s)) {
            var l = t.getAttribute(s);
            null != l && (r[cv[s]] = l);
        }
        var h = a ? "textFill" : "fill", u = a ? "textStroke" : "stroke";
        e.style = e.style || new $c();
        var c = e.style;
        null != r.fill && c.set(h, Ro(r.fill, n)), null != r.stroke && c.set(u, Ro(r.stroke, n)), 
        f([ "lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize" ], function(t) {
            var e = "lineWidth" === t && a ? "textStrokeWidth" : t;
            null != r[t] && c.set(e, parseFloat(r[t]));
        }), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), 
        "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), 
        "end" === r.textAlign && (r.textAlign = "right"), f([ "lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline" ], function(t) {
            null != r[t] && c.set(t, r[t]);
        }), r.lineDash && (e.style.lineDash = O(r.lineDash).split(lv)), c[u] && "none" !== c[u] && (e[u] = !0), 
        e.__inheritedStyle = r;
    }
    function Ro(t, e) {
        var n = e && t && t.match(dv);
        return n ? e[O(n[1])] : t;
    }
    function No(t, e) {
        var n = t.getAttribute("transform");
        if (n) {
            var i = null, r = [];
            (n = n.replace(/,/g, " ")).replace(fv, function(t, e, n) {
                r.push(e, n);
            });
            for (var a = r.length - 1; a > 0; a -= 2) {
                var o = r[a], s = r[a - 1];
                switch (i = i || mt(), s) {
                  case "translate":
                    o = O(o).split(lv), wt(i, i, [ parseFloat(o[0]), parseFloat(o[1] || 0) ]);
                    break;

                  case "scale":
                    o = O(o).split(lv), Mt(i, i, [ parseFloat(o[0]), parseFloat(o[1] || o[0]) ]);
                    break;

                  case "rotate":
                    o = O(o).split(lv), bt(i, i, parseFloat(o[0]));
                    break;

                  case "skew":
                    o = O(o).split(lv), console.warn("Skew transform is not supported yet");
                    break;

                  case "matrix":
                    o = O(o).split(lv);
                    i[0] = parseFloat(o[0]), i[1] = parseFloat(o[1]), i[2] = parseFloat(o[2]), i[3] = parseFloat(o[3]), 
                    i[4] = parseFloat(o[4]), i[5] = parseFloat(o[5]);
                }
            }
            e.setLocalTransform(i);
        }
    }
    function Bo(t) {
        var e = t.getAttribute("style"), n = {};
        if (!e) return n;
        var i = {};
        pv.lastIndex = 0;
        for (var r; null != (r = pv.exec(e)); ) i[r[1]] = r[2];
        for (var a in cv) cv.hasOwnProperty(a) && null != i[a] && (n[cv[a]] = i[a]);
        return n;
    }
    function Fo(t, e, n) {
        var i = e / t.width, r = n / t.height, a = Math.min(i, r);
        return {
            scale: [ a, a ],
            position: [ -(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + n / 2 ]
        };
    }
    function Vo(t) {
        return function(e, n, i) {
            e = e && e.toLowerCase(), tc.prototype[t].call(this, e, n, i);
        };
    }
    function Wo() {
        tc.call(this);
    }
    function Ho(t, e, n) {
        function r(t, e) {
            return t.__prio - e.__prio;
        }
        n = n || {}, "string" == typeof e && (e = Vv[e]), this.id, this.group, this._dom = t;
        var a = this._zr = xn(t, {
            renderer: n.renderer || "canvas",
            devicePixelRatio: n.devicePixelRatio,
            width: n.width,
            height: n.height
        });
        this._throttledZrFlush = co(m(a.flush, a), 17), (e = i(e)) && Sg(e, !0), this._theme = e, 
        this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, 
        this._coordSysMgr = new wa();
        var o = this._api = os(this);
        pe(Fv, r), pe(Rv, r), this._scheduler = new go(this, o, Rv, Fv), tc.call(this, this._ecEventProcessor = new ss()), 
        this._messageCenter = new Wo(), this._initEvents(), this.resize = m(this.resize, this), 
        this._pendingActions = [], a.animation.on("frame", this._onframe, this), $o(a, this), 
        E(this);
    }
    function Go(t, e, n) {
        var i, r = this._model, a = this._coordSysMgr.getCoordinateSystems();
        e = Ln(r, e);
        for (var o = 0; o < a.length; o++) {
            var s = a[o];
            if (s[t] && null != (i = s[t](r, e, n))) return i;
        }
    }
    function Zo(t) {
        var e = t._model, n = t._scheduler;
        n.restorePipelines(e), n.prepareStageTasks(), Ko(t, "component", e, n), Ko(t, "chart", e, n), 
        n.plan();
    }
    function Xo(t, e, n, i, r) {
        function a(i) {
            i && i.__alive && i[e] && i[e](i.__model, o, t._api, n);
        }
        var o = t._model;
        if (i) {
            var s = {};
            s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];
            var l = {
                mainType: i,
                query: s
            };
            r && (l.subType = r);
            var h = n.excludeSeriesId;
            null != h && (h = N(bn(h))), o && o.eachComponent(l, function(e) {
                h && null != h.get(e.id) || a(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId]);
            }, t);
        } else _v(t._componentsViews.concat(t._chartsViews), a);
    }
    function qo(t, e) {
        var n = t._chartsMap, i = t._scheduler;
        e.eachSeries(function(t) {
            i.updateStreamModes(t, n[t.__viewId]);
        });
    }
    function Yo(t, e) {
        var n = t.type, i = t.escapeConnect, r = Ev[n], a = r.actionInfo, l = (a.update || "update").split(":"), h = l.pop();
        l = null != l[0] && bv(l[0]), this[Av] = !0;
        var u = [ t ], c = !1;
        t.batch && (c = !0, u = p(t.batch, function(e) {
            return e = s(o({}, e), t), e.batch = null, e;
        }));
        var d, f = [], g = "highlight" === n || "downplay" === n;
        _v(u, function(t) {
            d = r.action(t, this._model, this._api), (d = d || o({}, t)).type = a.event || d.type, 
            f.push(d), g ? Xo(this, h, t, "series") : l && Xo(this, h, t, l.main, l.sub);
        }, this), "none" === h || g || l || (this[kv] ? (Zo(this), Lv.update.call(this, t), 
        this[kv] = !1) : Lv[h].call(this, t)), d = c ? {
            type: a.event || n,
            escapeConnect: i,
            batch: f
        } : f[0], this[Av] = !1, !e && this._messageCenter.trigger(d.type, d);
    }
    function jo(t) {
        for (var e = this._pendingActions; e.length; ) {
            var n = e.shift();
            Yo.call(this, n, t);
        }
    }
    function Uo(t) {
        !t && this.trigger("updated");
    }
    function $o(t, e) {
        t.on("rendered", function() {
            e.trigger("rendered"), !t.animation.isFinished() || e[kv] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished");
        });
    }
    function Ko(t, e, n, i) {
        function r(t) {
            var e = "_ec_" + t.id + "_" + t.type, r = s[e];
            if (!r) {
                var u = bv(t.type);
                (r = new (a ? zg.getClass(u.main, u.sub) : oo.getClass(u.sub))()).init(n, h), s[e] = r, 
                o.push(r), l.add(r.group);
            }
            t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = {
                mainType: t.mainType,
                index: t.componentIndex
            }, !a && i.prepareView(r, t, n, h);
        }
        for (var a = "component" === e, o = a ? t._componentsViews : t._chartsViews, s = a ? t._componentsMap : t._chartsMap, l = t._zr, h = t._api, u = 0; u < o.length; u++) o[u].__alive = !1;
        a ? n.eachComponent(function(t, e) {
            "series" !== t && r(e);
        }) : n.eachSeries(r);
        for (u = 0; u < o.length; ) {
            var c = o[u];
            c.__alive ? u++ : (!a && c.renderTask.dispose(), l.remove(c.group), c.dispose(n, h), 
            o.splice(u, 1), delete s[c.__id], c.__id = c.group.__ecComponentInfo = null);
        }
    }
    function Qo(t) {
        t.clearColorPalette(), t.eachSeries(function(t) {
            t.clearColorPalette();
        });
    }
    function Jo(t, e, n, i) {
        ts(t, e, n, i), _v(t._chartsViews, function(t) {
            t.__alive = !1;
        }), es(t, e, n, i), _v(t._chartsViews, function(t) {
            t.__alive || t.remove(e, n);
        });
    }
    function ts(t, e, n, i, r) {
        _v(r || t._componentsViews, function(t) {
            var r = t.__model;
            t.render(r, e, n, i), as(r, t);
        });
    }
    function es(t, e, n, i, r) {
        var a, o = t._scheduler;
        e.eachSeries(function(e) {
            var n = t._chartsMap[e.__viewId];
            n.__alive = !0;
            var s = n.renderTask;
            o.updatePayload(s, i), r && r.get(e.uid) && s.dirty(), a |= s.perform(o.getPerformArgs(s)), 
            n.group.silent = !!e.get("silent"), as(e, n), rs(e, n);
        }), o.unfinished |= a, is(t._zr, e), Yg(t._zr.dom, e);
    }
    function ns(t, e) {
        _v(Bv, function(n) {
            n(t, e);
        });
    }
    function is(t, e) {
        var n = t.storage, i = 0;
        n.traverse(function(t) {
            t.isGroup || i++;
        }), i > e.get("hoverLayerThreshold") && !Lu.node && n.traverse(function(t) {
            t.isGroup || (t.useHoverLayer = !0);
        });
    }
    function rs(t, e) {
        var n = t.get("blendMode") || null;
        e.group.traverse(function(t) {
            t.isGroup || t.style.blend !== n && t.setStyle("blend", n), t.eachPendingDisplayable && t.eachPendingDisplayable(function(t) {
                t.setStyle("blend", n);
            });
        });
    }
    function as(t, e) {
        var n = t.get("z"), i = t.get("zlevel");
        e.group.traverse(function(t) {
            "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i));
        });
    }
    function os(t) {
        var e = t._coordSysMgr;
        return o(new xa(t), {
            getCoordinateSystems: m(e.getCoordinateSystems, e),
            getComponentByElement: function(e) {
                for (;e; ) {
                    var n = e.__ecComponentInfo;
                    if (null != n) return t._model.getComponent(n.mainType, n.index);
                    e = e.parent;
                }
            }
        });
    }
    function ss() {
        this.eventInfo;
    }
    function ls(t) {
        function e(t, e) {
            for (var i = 0; i < t.length; i++) t[i][n] = e;
        }
        var n = "__connectUpdateStatus";
        _v(zv, function(i, r) {
            t._messageCenter.on(r, function(i) {
                if (Gv[t.group] && 0 !== t[n]) {
                    if (i && i.escapeConnect) return;
                    var r = t.makeActionFromEvent(i), a = [];
                    _v(Hv, function(e) {
                        e !== t && e.group === t.group && a.push(e);
                    }), e(a, 0), _v(a, function(t) {
                        1 !== t[n] && t.dispatchAction(r);
                    }), e(a, 2);
                }
            });
        });
    }
    function hs(t) {
        Gv[t] = !1;
    }
    function us(t) {
        return Hv[zn(t, qv)];
    }
    function cs(t, e) {
        Vv[t] = e;
    }
    function ds(t) {
        Nv.push(t);
    }
    function fs(t, e) {
        ms(Rv, t, e, Sv);
    }
    function ps(t, e, n) {
        "function" == typeof e && (n = e, e = "");
        var i = wv(t) ? t.type : [ t, t = {
            event: e
        } ][0];
        t.event = (t.event || i).toLowerCase(), e = t.event, yv(Dv.test(i) && Dv.test(e)), 
        Ev[i] || (Ev[i] = {
            action: n,
            actionInfo: t
        }), zv[e] = i;
    }
    function gs(t, e) {
        ms(Fv, t, e, Tv, "layout");
    }
    function vs(t, e) {
        ms(Fv, t, e, Cv, "visual");
    }
    function ms(t, e, n, i, r) {
        (xv(e) || wv(e)) && (n = e, e = i);
        var a = go.wrapStageHandler(n, r);
        return a.__prio = e, a.__raw = n, t.push(a), a;
    }
    function ys(t, e) {
        Wv[t] = e;
    }
    function _s(t) {
        return jp.extend(t);
    }
    function xs(t) {
        return zg.extend(t);
    }
    function ws(t) {
        return t;
    }
    function bs(t, e, n, i, r) {
        this._old = t, this._new = e, this._oldKeyGetter = n || ws, this._newKeyGetter = i || ws, 
        this.context = r;
    }
    function Ms(t, e, n, i, r) {
        for (var a = 0; a < t.length; a++) {
            var o = "_ec_" + r[i](t[a], a), s = e[o];
            null == s ? (n.push(o), e[o] = a) : (s.length || (e[o] = s = [ s ]), s.push(a));
        }
    }
    function Ss(t) {
        var e = {}, n = e.encode = {}, i = N(), r = [], a = [];
        f(t.dimensions, function(e) {
            var o = t.getDimensionInfo(e), s = o.coordDim;
            if (s) {
                var l = n[s];
                n.hasOwnProperty(s) || (l = n[s] = []), l[o.coordDimIndex] = e, o.isExtraCoord || (i.set(s, 1), 
                Cs(o.type) && (r[0] = e)), o.defaultTooltip && a.push(e);
            }
            Uv.each(function(t, e) {
                var i = n[e];
                n.hasOwnProperty(e) || (i = n[e] = []);
                var r = o.otherDims[e];
                null != r && !1 !== r && (i[r] = o.name);
            });
        });
        var o = [], s = {};
        i.each(function(t, e) {
            var i = n[e];
            s[e] = i[0], o = o.concat(i);
        }), e.dataDimsOnCoord = o, e.encodeFirstDimNotExtra = s;
        var l = n.label;
        l && l.length && (r = l.slice());
        var h = n.tooltip;
        return h && h.length ? a = h.slice() : a.length || (a = r.slice()), n.defaultedLabel = r, 
        n.defaultedTooltip = a, e;
    }
    function Ts(t) {
        return "category" === t ? "ordinal" : "time" === t ? "time" : "float";
    }
    function Cs(t) {
        return !("ordinal" === t || "time" === t);
    }
    function Is(t) {
        return t._rawCount > 65535 ? em : im;
    }
    function As(t) {
        var e = t.constructor;
        return e === Array ? t.slice() : new e(t);
    }
    function ks(t, e) {
        f(rm.concat(e.__wrappedMethods || []), function(n) {
            e.hasOwnProperty(n) && (t[n] = e[n]);
        }), t.__wrappedMethods = e.__wrappedMethods, f(am, function(n) {
            t[n] = i(e[n]);
        }), t._calculationInfo = o(e._calculationInfo);
    }
    function Ds(t, e, n, i, r) {
        var a = tm[e.type], o = i - 1, s = e.name, l = t[s][o];
        if (l && l.length < n) {
            for (var h = new a(Math.min(r - o * n, n)), u = 0; u < l.length; u++) h[u] = l[u];
            t[s][o] = h;
        }
        for (var c = i * n; r > c; c += n) t[s].push(new a(Math.min(r - c, n)));
    }
    function Ps(t) {
        var e = t._invertedIndicesMap;
        f(e, function(n, i) {
            var r = t._dimensionInfos[i].ordinalMeta;
            if (r) {
                n = e[i] = new nm(r.categories.length);
                for (a = 0; a < n.length; a++) n[a] = Qv;
                for (var a = 0; a < t._count; a++) n[t.get(i, a)] = a;
            }
        });
    }
    function Ls(t, e, n) {
        var i;
        if (null != e) {
            var r = t._chunkSize, a = Math.floor(n / r), o = n % r, s = t.dimensions[e], l = t._storage[s][a];
            if (l) {
                i = l[o];
                var h = t._dimensionInfos[s].ordinalMeta;
                h && h.categories.length && (i = h.categories[i]);
            }
        }
        return i;
    }
    function Os(t) {
        return t;
    }
    function Es(t) {
        return t < this._count && t >= 0 ? this._indices[t] : -1;
    }
    function zs(t, e) {
        var n = t._idList[e];
        return null == n && (n = Ls(t, t._idDimIdx, e)), null == n && (n = Jv + e), n;
    }
    function Rs(t) {
        return _(t) || (t = [ t ]), t;
    }
    function Ns(t, e) {
        var n = t.dimensions, i = new om(p(n, t.getDimensionInfo, t), t.hostModel);
        ks(i, t);
        for (var r = i._storage = {}, a = t._storage, o = 0; o < n.length; o++) {
            var s = n[o];
            a[s] && (h(e, s) >= 0 ? (r[s] = Bs(a[s]), i._rawExtent[s] = [ 1 / 0, -1 / 0 ], i._extent[s] = null) : r[s] = a[s]);
        }
        return i;
    }
    function Bs(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = As(t[n]);
        return e;
    }
    function Fs(t, e, n) {
        function r(t, e, n) {
            null != Uv.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, u.set(e, !0));
        }
        ta.isInstance(e) || (e = ta.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();
        for (var a = (n.dimsDef || []).slice(), l = N(n.encodeDef), h = N(), u = N(), c = [], d = Vs(e, t, a, n.dimCount), p = 0; d > p; p++) {
            var g = a[p] = o({}, b(a[p]) ? a[p] : {
                name: a[p]
            }), v = g.name, m = c[p] = {
                otherDims: {}
            };
            null != v && null == h.get(v) && (m.name = m.displayName = v, h.set(v, p)), null != g.type && (m.type = g.type), 
            null != g.displayName && (m.displayName = g.displayName);
        }
        l.each(function(t, e) {
            if (1 === (t = bn(t).slice()).length && t[0] < 0) l.set(e, !1); else {
                var n = l.set(e, []);
                f(t, function(t, i) {
                    w(t) && (t = h.get(t)), null != t && d > t && (n[i] = t, r(c[t], e, i));
                });
            }
        });
        var y = 0;
        f(t, function(t) {
            var e, t, n, a;
            if (w(t)) e = t, t = {}; else {
                e = t.name;
                var o = t.ordinalMeta;
                t.ordinalMeta = null, (t = i(t)).ordinalMeta = o, n = t.dimsDef, a = t.otherDims, 
                t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null;
            }
            var h = l.get(e);
            if (!1 !== h) {
                if (!(h = bn(h)).length) for (var u = 0; u < (n && n.length || 1); u++) {
                    for (;y < c.length && null != c[y].coordDim; ) y++;
                    y < c.length && h.push(y++);
                }
                f(h, function(i, o) {
                    var l = c[i];
                    if (r(s(l, t), e, o), null == l.name && n) {
                        var h = n[o];
                        !b(h) && (h = {
                            name: h
                        }), l.name = l.displayName = h.name, l.defaultTooltip = h.defaultTooltip;
                    }
                    a && s(l.otherDims, a);
                });
            }
        });
        var _ = n.generateCoord, x = n.generateCoordCount, M = null != x;
        x = _ ? x || 1 : 0;
        for (var S = _ || "value", T = 0; d > T; T++) null == (m = c[T] = c[T] || {}).coordDim && (m.coordDim = Ws(S, u, M), 
        m.coordDimIndex = 0, (!_ || 0 >= x) && (m.isExtraCoord = !0), x--), null == m.name && (m.name = Ws(m.coordDim, h)), 
        null == m.type && ca(e, T, m.name) && (m.type = "ordinal");
        return c;
    }
    function Vs(t, e, n, i) {
        var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);
        return f(e, function(t) {
            var e = t.dimsDef;
            e && (r = Math.max(r, e.length));
        }), r;
    }
    function Ws(t, e, n) {
        if (n || null != e.get(t)) {
            for (var i = 0; null != e.get(t + i); ) i++;
            t += i;
        }
        return e.set(t, !0), t;
    }
    function Hs(t, e, n) {
        var i, r, a, o, s = (n = n || {}).byIndex, l = n.stackedCoordDimension, h = !(!t || !t.get("stack"));
        if (f(e, function(t, n) {
            w(t) && (e[n] = t = {
                name: t
            }), h && !t.isExtraCoord && (s || i || !t.ordinalMeta || (i = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t));
        }), !r || s || i || (s = !0), r) {
            a = "__\0ecstackresult", o = "__\0ecstackedover", i && (i.createInvertedIndices = !0);
            var u = r.coordDim, c = r.type, d = 0;
            f(e, function(t) {
                t.coordDim === u && d++;
            }), e.push({
                name: a,
                coordDim: u,
                coordDimIndex: d,
                type: c,
                isExtraCoord: !0,
                isCalculationCoord: !0
            }), d++, e.push({
                name: o,
                coordDim: o,
                coordDimIndex: d,
                type: c,
                isExtraCoord: !0,
                isCalculationCoord: !0
            });
        }
        return {
            stackedDimension: r && r.name,
            stackedByDimension: i && i.name,
            isStackedByIndex: s,
            stackedOverDimension: o,
            stackResultDimension: a
        };
    }
    function Gs(t, e) {
        return !!e && e === t.getCalculationInfo("stackedDimension");
    }
    function Zs(t, e) {
        return Gs(t, e) ? t.getCalculationInfo("stackResultDimension") : e;
    }
    function Xs(t, e, n) {
        n = n || {}, ta.isInstance(t) || (t = ta.seriesDataToSource(t));
        var i, r = e.get("coordinateSystem"), a = wa.get(r), o = Qr(e);
        o && (i = p(o.coordSysDims, function(t) {
            var e = {
                name: t
            }, n = o.axisMap.get(t);
            if (n) {
                var i = n.get("type");
                e.type = Ts(i);
            }
            return e;
        })), i || (i = a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || [ "x", "y" ]);
        var s, l, h = hm(t, {
            coordDimensions: i,
            generateCoord: n.generateCoord
        });
        o && f(h, function(t, e) {
            var n = t.coordDim, i = o.categoryAxisMap.get(n);
            i && (null == s && (s = e), t.ordinalMeta = i.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0);
        }), l || null == s || (h[s].otherDims.itemName = 0);
        var u = Hs(e, h), c = new om(h, e);
        c.setCalculationInfo(u);
        var d = null != s && qs(t) ? function(t, e, n, i) {
            return i === s ? n : this.defaultDimValueGetter(t, e, n, i);
        } : null;
        return c.hasItemOption = !1, c.initData(t, null, d), c;
    }
    function qs(t) {
        if (t.sourceFormat === tg) {
            var e = Ys(t.data || []);
            return null != e && !_(Sn(e));
        }
    }
    function Ys(t) {
        for (var e = 0; e < t.length && null == t[e]; ) e++;
        return t[e];
    }
    function js(t) {
        this._setting = t || {}, this._extent = [ 1 / 0, -1 / 0 ], this._interval = 0, this.init && this.init.apply(this, arguments);
    }
    function Us(t) {
        this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, 
        this._map;
    }
    function $s(t) {
        return t._map || (t._map = N(t.categories));
    }
    function Ks(t) {
        return b(t) && null != t.value ? t.value : t + "";
    }
    function Qs(t, e, n, i) {
        var r = {}, a = t[1] - t[0], o = r.interval = Br(a / e, !0);
        null != n && n > o && (o = r.interval = n), null != i && o > i && (o = r.interval = i);
        var s = r.intervalPrecision = Js(o);
        return el(r.niceTickExtent = [ fm(Math.ceil(t[0] / o) * o, s), fm(Math.floor(t[1] / o) * o, s) ], t), 
        r;
    }
    function Js(t) {
        return Pr(t) + 2;
    }
    function tl(t, e, n) {
        t[e] = Math.max(Math.min(t[e], n[1]), n[0]);
    }
    function el(t, e) {
        !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), tl(t, 0, e), 
        tl(t, 1, e), t[0] > t[1] && (t[0] = t[1]);
    }
    function nl(t, e, n, i) {
        var r = [];
        if (!t) return r;
        e[0] < n[0] && r.push(e[0]);
        for (var a = n[0]; a <= n[1] && (r.push(a), (a = fm(a + t, i)) !== r[r.length - 1]); ) if (r.length > 1e4) return [];
        return e[1] > (r.length ? r[r.length - 1] : n[1]) && r.push(e[1]), r;
    }
    function il(t) {
        return t.get("stack") || vm + t.seriesIndex;
    }
    function rl(t) {
        return t.dim + t.index;
    }
    function al(t, e) {
        var n = [];
        return e.eachSeriesByType(t, function(t) {
            hl(t) && !ul(t) && n.push(t);
        }), n;
    }
    function ol(t) {
        var e = [];
        return f(t, function(t) {
            var n = t.getData(), i = t.coordinateSystem.getBaseAxis(), r = i.getExtent(), a = "category" === i.type ? i.getBandWidth() : Math.abs(r[1] - r[0]) / n.count(), o = Ar(t.get("barWidth"), a), s = Ar(t.get("barMaxWidth"), a), l = t.get("barGap"), h = t.get("barCategoryGap");
            e.push({
                bandWidth: a,
                barWidth: o,
                barMaxWidth: s,
                barGap: l,
                barCategoryGap: h,
                axisKey: rl(i),
                stackId: il(t)
            });
        }), sl(e);
    }
    function sl(t) {
        var e = {};
        f(t, function(t) {
            var n = t.axisKey, i = t.bandWidth, r = e[n] || {
                bandWidth: i,
                remainedWidth: i,
                autoWidthCount: 0,
                categoryGap: "20%",
                gap: "30%",
                stacks: {}
            }, a = r.stacks;
            e[n] = r;
            var o = t.stackId;
            a[o] || r.autoWidthCount++, a[o] = a[o] || {
                width: 0,
                maxWidth: 0
            };
            var s = t.barWidth;
            s && !a[o].width && (a[o].width = s, s = Math.min(r.remainedWidth, s), r.remainedWidth -= s);
            var l = t.barMaxWidth;
            l && (a[o].maxWidth = l);
            var h = t.barGap;
            null != h && (r.gap = h);
            var u = t.barCategoryGap;
            null != u && (r.categoryGap = u);
        });
        var n = {};
        return f(e, function(t, e) {
            n[e] = {};
            var i = t.stacks, r = t.bandWidth, a = Ar(t.categoryGap, r), o = Ar(t.gap, 1), s = t.remainedWidth, l = t.autoWidthCount, h = (s - a) / (l + (l - 1) * o);
            h = Math.max(h, 0), f(i, function(t) {
                var e = t.maxWidth;
                e && h > e && (e = Math.min(e, s), t.width && (e = Math.min(e, t.width)), s -= e, 
                t.width = e, l--);
            }), h = (s - a) / (l + (l - 1) * o), h = Math.max(h, 0);
            var u, c = 0;
            f(i, function(t) {
                t.width || (t.width = h), u = t, c += t.width * (1 + o);
            }), u && (c -= u.width * o);
            var d = -c / 2;
            f(i, function(t, i) {
                n[e][i] = n[e][i] || {
                    offset: d,
                    width: t.width
                }, d += t.width * (1 + o);
            });
        }), n;
    }
    function ll(t, e, n) {
        if (t && e) {
            var i = t[rl(e)];
            return null != i && null != n && (i = i[il(n)]), i;
        }
    }
    function hl(t) {
        return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type;
    }
    function ul(t) {
        return t.pipelineContext && t.pipelineContext.large;
    }
    function cl(t, e) {
        return Am(t, Im(e));
    }
    function dl(t, e) {
        var n, i, r, a = t.type, o = e.getMin(), s = e.getMax(), l = null != o, h = null != s, u = t.getExtent();
        "ordinal" === a ? n = e.getCategories().length : (i = e.get("boundaryGap"), _(i) || (i = [ i || 0, i || 0 ]), 
        "boolean" == typeof i[0] && (i = [ 0, 0 ]), i[0] = Ar(i[0], 1), i[1] = Ar(i[1], 1), 
        r = u[1] - u[0] || Math.abs(u[0])), null == o && (o = "ordinal" === a ? n ? 0 : NaN : u[0] - i[0] * r), 
        null == s && (s = "ordinal" === a ? n ? n - 1 : NaN : u[1] + i[1] * r), "dataMin" === o ? o = u[0] : "function" == typeof o && (o = o({
            min: u[0],
            max: u[1]
        })), "dataMax" === s ? s = u[1] : "function" == typeof s && (s = s({
            min: u[0],
            max: u[1]
        })), (null == o || !isFinite(o)) && (o = NaN), (null == s || !isFinite(s)) && (s = NaN), 
        t.setBlank(C(o) || C(s) || "ordinal" === a && !t.getOrdinalMeta().categories.length), 
        e.getNeedCrossZero() && (o > 0 && s > 0 && !l && (o = 0), 0 > o && 0 > s && !h && (s = 0));
        var c = e.ecModel;
        if (c && "time" === a) {
            var d, p = al("bar", c);
            if (f(p, function(t) {
                d |= t.getBaseAxis() === e.axis;
            }), d) {
                var g = ol(p), v = fl(o, s, e, g);
                o = v.min, s = v.max;
            }
        }
        return [ o, s ];
    }
    function fl(t, e, n, i) {
        var r = n.axis.getExtent(), a = r[1] - r[0], o = ll(i, n.axis);
        if (void 0 === o) return {
            min: t,
            max: e
        };
        var s = 1 / 0;
        f(o, function(t) {
            s = Math.min(t.offset, s);
        });
        var l = -1 / 0;
        f(o, function(t) {
            l = Math.max(t.offset + t.width, l);
        }), s = Math.abs(s), l = Math.abs(l);
        var h = s + l, u = e - t, c = u / (1 - (s + l) / a) - u;
        return e += c * (l / h), t -= c * (s / h), {
            min: t,
            max: e
        };
    }
    function pl(t, e) {
        var n = dl(t, e), i = null != e.getMin(), r = null != e.getMax(), a = e.get("splitNumber");
        "log" === t.type && (t.base = e.get("logBase"));
        var o = t.type;
        t.setExtent(n[0], n[1]), t.niceExtent({
            splitNumber: a,
            fixMin: i,
            fixMax: r,
            minInterval: "interval" === o || "time" === o ? e.get("minInterval") : null,
            maxInterval: "interval" === o || "time" === o ? e.get("maxInterval") : null
        });
        var s = e.get("interval");
        null != s && t.setInterval && t.setInterval(s);
    }
    function gl(t, e) {
        if (e = e || t.get("type")) switch (e) {
          case "category":
            return new dm(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [ 1 / 0, -1 / 0 ]);

          case "value":
            return new gm();

          default:
            return (js.getClass(e) || gm).create(t);
        }
    }
    function vl(t) {
        var e = t.scale.getExtent(), n = e[0], i = e[1];
        return !(n > 0 && i > 0 || 0 > n && 0 > i);
    }
    function ml(t) {
        var e = t.getLabelModel().get("formatter"), n = "category" === t.type ? t.scale.getExtent()[0] : null;
        return "string" == typeof e ? e = function(e) {
            return function(n) {
                return n = t.scale.getLabel(n), e.replace("{value}", null != n ? n : "");
            };
        }(e) : "function" == typeof e ? function(i, r) {
            return null != n && (r = i - n), e(yl(t, i), r);
        } : function(e) {
            return t.scale.getLabel(e);
        };
    }
    function yl(t, e) {
        return "category" === t.type ? t.scale.getLabel(e) : e;
    }
    function _l(t) {
        var e = t.model, n = t.scale;
        if (e.get("axisLabel.show") && !n.isBlank()) {
            var i, r, a = "category" === t.type, o = n.getExtent();
            a ? r = n.count() : (i = n.getTicks(), r = i.length);
            var s, l = t.getLabelModel(), h = ml(t), u = 1;
            r > 40 && (u = Math.ceil(r / 40));
            for (var c = 0; r > c; c += u) {
                var d = h(i ? i[c] : o[0] + c), f = xl(l.getTextRect(d), l.get("rotate") || 0);
                s ? s.union(f) : s = f;
            }
            return s;
        }
    }
    function xl(t, e) {
        var n = e * Math.PI / 180, i = t.plain(), r = i.width, a = i.height, o = r * Math.cos(n) + a * Math.sin(n), s = r * Math.sin(n) + a * Math.cos(n);
        return new oe(i.x, i.y, o, s);
    }
    function wl(t) {
        var e = t.get("interval");
        return null == e ? "auto" : e;
    }
    function bl(t) {
        return "category" === t.type && 0 === wl(t.getLabelModel());
    }
    function Ml(t, e) {
        if ("image" !== this.type) {
            var n = this.style, i = this.shape;
            i && "line" === i.symbolType ? n.stroke = t : this.__isEmptyBrush ? (n.stroke = t, 
            n.fill = e || "#fff") : (n.fill && (n.fill = t), n.stroke && (n.stroke = t)), this.dirty(!1);
        }
    }
    function Sl(t, e, n, i, r, a, o) {
        var s = 0 === t.indexOf("empty");
        s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
        var l;
        return l = 0 === t.indexOf("image://") ? Bi(t.slice(8), new oe(e, n, i, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? Ni(t.slice(7), {}, new oe(e, n, i, r), o ? "center" : "cover") : new Wm({
            shape: {
                symbolType: t,
                x: e,
                y: n,
                width: i,
                height: r
            }
        }), l.__isEmptyBrush = s, l.setColor = Ml, l.setColor(a), l;
    }
    function Tl(t, e) {
        return Math.abs(t - e) < Zm;
    }
    function Cl(t, e, n) {
        var i = 0, r = t[0];
        if (!r) return !1;
        for (var a = 1; a < t.length; a++) {
            var o = t[a];
            i += pi(r[0], r[1], o[0], o[1], e, n), r = o;
        }
        var s = t[0];
        return Tl(r[0], s[0]) && Tl(r[1], s[1]) || (i += pi(r[0], r[1], s[0], s[1], e, n)), 
        0 !== i;
    }
    function Il(t, e, n) {
        if (this.name = t, this.geometries = e, n) n = [ n[0], n[1] ]; else {
            var i = this.getBoundingRect();
            n = [ i.x + i.width / 2, i.y + i.height / 2 ];
        }
        this.center = n;
    }
    function Al(t) {
        if (!t.UTF8Encoding) return t;
        var e = t.UTF8Scale;
        null == e && (e = 1024);
        for (var n = t.features, i = 0; i < n.length; i++) for (var r = n[i].geometry, a = r.coordinates, o = r.encodeOffsets, s = 0; s < a.length; s++) {
            var l = a[s];
            if ("Polygon" === r.type) a[s] = kl(l, o[s], e); else if ("MultiPolygon" === r.type) for (var h = 0; h < l.length; h++) {
                var u = l[h];
                l[h] = kl(u, o[s][h], e);
            }
        }
        return t.UTF8Encoding = !1, t;
    }
    function kl(t, e, n) {
        for (var i = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {
            var s = t.charCodeAt(o) - 64, l = t.charCodeAt(o + 1) - 64;
            s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), r = s += r, a = l += a, i.push([ s / n, l / n ]);
        }
        return i;
    }
    function Dl(t) {
        return "category" === t.type ? Ll(t) : zl(t);
    }
    function Pl(t, e) {
        return "category" === t.type ? El(t, e) : {
            ticks: t.scale.getTicks()
        };
    }
    function Ll(t) {
        var e = t.getLabelModel(), n = Ol(t, e);
        return !e.get("show") || t.scale.isBlank() ? {
            labels: [],
            labelCategoryInterval: n.labelCategoryInterval
        } : n;
    }
    function Ol(t, e) {
        var n = Rl(t, "labels"), i = wl(e), r = Nl(n, i);
        if (r) return r;
        var a, o;
        return x(i) ? a = Gl(t, i) : (o = "auto" === i ? Fl(t) : i, a = Hl(t, o)), Bl(n, i, {
            labels: a,
            labelCategoryInterval: o
        });
    }
    function El(t, e) {
        var n = Rl(t, "ticks"), i = wl(e), r = Nl(n, i);
        if (r) return r;
        var a, o;
        if ((!e.get("show") || t.scale.isBlank()) && (a = []), x(i)) a = Gl(t, i, !0); else if ("auto" === i) {
            var s = Ol(t, t.getLabelModel());
            o = s.labelCategoryInterval, a = p(s.labels, function(t) {
                return t.tickValue;
            });
        } else o = i, a = Hl(t, o, !0);
        return Bl(n, i, {
            ticks: a,
            tickCategoryInterval: o
        });
    }
    function zl(t) {
        var e = t.scale.getTicks(), n = ml(t);
        return {
            labels: p(e, function(e, i) {
                return {
                    formattedLabel: n(e, i),
                    rawLabel: t.scale.getLabel(e),
                    tickValue: e
                };
            })
        };
    }
    function Rl(t, e) {
        return qm(t)[e] || (qm(t)[e] = []);
    }
    function Nl(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n].key === e) return t[n].value;
    }
    function Bl(t, e, n) {
        return t.push({
            key: e,
            value: n
        }), n;
    }
    function Fl(t) {
        var e = qm(t).autoInterval;
        return null != e ? e : qm(t).autoInterval = t.calculateCategoryInterval();
    }
    function Vl(t) {
        var e = Wl(t), n = ml(t), i = (e.axisRotate - e.labelRotate) / 180 * Math.PI, r = t.scale, a = r.getExtent(), o = r.count();
        if (a[1] - a[0] < 1) return 0;
        var s = 1;
        o > 40 && (s = Math.max(1, Math.floor(o / 40)));
        for (var l = a[0], h = t.dataToCoord(l + 1) - t.dataToCoord(l), u = Math.abs(h * Math.cos(i)), c = Math.abs(h * Math.sin(i)), d = 0, f = 0; l <= a[1]; l += s) {
            var p = 0, g = 0, v = Te(n(l), e.font, "center", "top");
            p = 1.3 * v.width, g = 1.3 * v.height, d = Math.max(d, p, 7), f = Math.max(f, g, 7);
        }
        var m = d / u, y = f / c;
        isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);
        var _ = Math.max(0, Math.floor(Math.min(m, y))), x = qm(t.model), w = x.lastAutoInterval, b = x.lastTickCount;
        return null != w && null != b && Math.abs(w - _) <= 1 && Math.abs(b - o) <= 1 && w > _ ? _ = w : (x.lastTickCount = o, 
        x.lastAutoInterval = _), _;
    }
    function Wl(t) {
        var e = t.getLabelModel();
        return {
            axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
            labelRotate: e.get("rotate") || 0,
            font: e.getFont()
        };
    }
    function Hl(t, e, n) {
        function i(t) {
            l.push(n ? t : {
                formattedLabel: r(t),
                rawLabel: a.getLabel(t),
                tickValue: t
            });
        }
        var r = ml(t), a = t.scale, o = a.getExtent(), s = t.getLabelModel(), l = [], h = Math.max((e || 0) + 1, 1), u = o[0], c = a.count();
        0 !== u && h > 1 && c / h > 2 && (u = Math.round(Math.ceil(u / h) * h));
        var d = bl(t), f = s.get("showMinLabel") || d, p = s.get("showMaxLabel") || d;
        f && u !== o[0] && i(o[0]);
        for (var g = u; g <= o[1]; g += h) i(g);
        return p && g !== o[1] && i(o[1]), l;
    }
    function Gl(t, e, n) {
        var i = t.scale, r = ml(t), a = [];
        return f(i.getTicks(), function(t) {
            var o = i.getLabel(t);
            e(t, o) && a.push(n ? t : {
                formattedLabel: r(t),
                rawLabel: o,
                tickValue: t
            });
        }), a;
    }
    function Zl(t, e) {
        var n = (t[1] - t[0]) / e / 2;
        t[0] += n, t[1] -= n;
    }
    function Xl(t, e, n, i, r) {
        function a(t, e) {
            return u ? t > e : e > t;
        }
        var o = e.length;
        if (t.onBand && !i && o) {
            var s, l = t.getExtent();
            if (1 === o) e[0].coord = l[0], s = e[1] = {
                coord: l[0]
            }; else {
                var h = e[1].coord - e[0].coord;
                f(e, function(t) {
                    t.coord -= h / 2;
                    var e = e || 0;
                    e % 2 > 0 && (t.coord -= h / (2 * (e + 1)));
                }), s = {
                    coord: e[o - 1].coord + h
                }, e.push(s);
            }
            var u = l[0] > l[1];
            a(e[0].coord, l[0]) && (r ? e[0].coord = l[0] : e.shift()), r && a(l[0], e[0].coord) && e.unshift({
                coord: l[0]
            }), a(l[1], s.coord) && (r ? s.coord = l[1] : e.pop()), r && a(s.coord, l[1]) && e.push({
                coord: l[1]
            });
        }
    }
    function ql(t, e) {
        var n = t.mapDimension("defaultedLabel", !0), i = n.length;
        if (1 === i) return Ya(t, e, n[0]);
        if (i) {
            for (var r = [], a = 0; a < n.length; a++) {
                var o = Ya(t, e, n[a]);
                r.push(o);
            }
            return r.join(" ");
        }
    }
    function Yl(t, e, n) {
        Wc.call(this), this.updateData(t, e, n);
    }
    function jl(t) {
        return [ t[0] / 2, t[1] / 2 ];
    }
    function Ul(t, e) {
        this.parent.drift(t, e);
    }
    function $l() {
        !Qi(this) && Ql.call(this);
    }
    function Kl() {
        !Qi(this) && Jl.call(this);
    }
    function Ql() {
        if (!this.incremental && !this.useHoverLayer) {
            var t = this.__symbolOriginalScale, e = t[1] / t[0];
            this.animateTo({
                scale: [ Math.max(1.1 * t[0], t[0] + 3), Math.max(1.1 * t[1], t[1] + 3 * e) ]
            }, 400, "elasticOut");
        }
    }
    function Jl() {
        this.incremental || this.useHoverLayer || this.animateTo({
            scale: this.__symbolOriginalScale
        }, 400, "elasticOut");
    }
    function th(t) {
        this.group = new Wc(), this._symbolCtor = t || Yl;
    }
    function eh(t, e, n, i) {
        return !(!e || isNaN(e[0]) || isNaN(e[1]) || i.isIgnore && i.isIgnore(n) || i.clipShape && !i.clipShape.contain(e[0], e[1]) || "none" === t.getItemVisual(n, "symbol"));
    }
    function nh(t) {
        return null == t || b(t) || (t = {
            isIgnore: t
        }), t || {};
    }
    function ih(t) {
        var e = t.hostModel;
        return {
            itemStyle: e.getModel("itemStyle").getItemStyle([ "color" ]),
            hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(),
            symbolRotate: e.get("symbolRotate"),
            symbolOffset: e.get("symbolOffset"),
            hoverAnimation: e.get("hoverAnimation"),
            labelModel: e.getModel("label"),
            hoverLabelModel: e.getModel("emphasis.label"),
            cursorStyle: e.get("cursor")
        };
    }
    function rh(t, e, n) {
        var i, r = t.getBaseAxis(), a = t.getOtherAxis(r), o = ah(a, n), s = r.dim, l = a.dim, h = e.mapDimension(l), u = e.mapDimension(s), c = "x" === l || "radius" === l ? 1 : 0, d = p(t.dimensions, function(t) {
            return e.mapDimension(t);
        }), f = e.getCalculationInfo("stackResultDimension");
        return (i |= Gs(e, d[0])) && (d[0] = f), (i |= Gs(e, d[1])) && (d[1] = f), {
            dataDimsForPoint: d,
            valueStart: o,
            valueAxisDim: l,
            baseAxisDim: s,
            stacked: !!i,
            valueDim: h,
            baseDim: u,
            baseDataOffset: c,
            stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
        };
    }
    function ah(t, e) {
        var n = 0, i = t.scale.getExtent();
        return "start" === e ? n = i[0] : "end" === e ? n = i[1] : i[0] > 0 ? n = i[0] : i[1] < 0 && (n = i[1]), 
        n;
    }
    function oh(t, e, n, i) {
        var r = NaN;
        t.stacked && (r = n.get(n.getCalculationInfo("stackedOverDimension"), i)), isNaN(r) && (r = t.valueStart);
        var a = t.baseDataOffset, o = [];
        return o[a] = n.get(t.baseDim, i), o[1 - a] = r, e.dataToPoint(o);
    }
    function sh(t, e) {
        var n = [];
        return e.diff(t).add(function(t) {
            n.push({
                cmd: "+",
                idx: t
            });
        }).update(function(t, e) {
            n.push({
                cmd: "=",
                idx: e,
                idx1: t
            });
        }).remove(function(t) {
            n.push({
                cmd: "-",
                idx: t
            });
        }).execute(), n;
    }
    function lh(t) {
        return isNaN(t[0]) || isNaN(t[1]);
    }
    function hh(t, e, n, i, r, a, o, s, l, h) {
        return "none" !== h && h ? uh.apply(this, arguments) : ch.apply(this, arguments);
    }
    function uh(t, e, n, i, r, a, o, s, l, h, u) {
        for (var c = 0, d = n, f = 0; i > f; f++) {
            var p = e[d];
            if (d >= r || 0 > d) break;
            if (lh(p)) {
                if (u) {
                    d += a;
                    continue;
                }
                break;
            }
            if (d === n) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]); else if (l > 0) {
                var g = e[c], v = "y" === h ? 1 : 0, m = (p[v] - g[v]) * l;
                hy(cy, g), cy[v] = g[v] + m, hy(dy, p), dy[v] = p[v] - m, t.bezierCurveTo(cy[0], cy[1], dy[0], dy[1], p[0], p[1]);
            } else t.lineTo(p[0], p[1]);
            c = d, d += a;
        }
        return f;
    }
    function ch(t, e, n, i, r, a, o, s, l, h, u) {
        for (var c = 0, d = n, f = 0; i > f; f++) {
            var p = e[d];
            if (d >= r || 0 > d) break;
            if (lh(p)) {
                if (u) {
                    d += a;
                    continue;
                }
                break;
            }
            if (d === n) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]), hy(cy, p); else if (l > 0) {
                var g = d + a, v = e[g];
                if (u) for (;v && lh(e[g]); ) v = e[g += a];
                var m = .5, y = e[c];
                if (!(v = e[g]) || lh(v)) hy(dy, p); else {
                    lh(v) && !u && (v = p), Z(uy, v, y);
                    var _, x;
                    if ("x" === h || "y" === h) {
                        var w = "x" === h ? 0 : 1;
                        _ = Math.abs(p[w] - y[w]), x = Math.abs(p[w] - v[w]);
                    } else _ = $u(p, y), x = $u(p, v);
                    ly(dy, p, uy, -l * (1 - (m = x / (x + _))));
                }
                oy(cy, cy, s), sy(cy, cy, o), oy(dy, dy, s), sy(dy, dy, o), t.bezierCurveTo(cy[0], cy[1], dy[0], dy[1], p[0], p[1]), 
                ly(cy, p, uy, l * m);
            } else t.lineTo(p[0], p[1]);
            c = d, d += a;
        }
        return f;
    }
    function dh(t, e) {
        var n = [ 1 / 0, 1 / 0 ], i = [ -1 / 0, -1 / 0 ];
        if (e) for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a[0] < n[0] && (n[0] = a[0]), a[1] < n[1] && (n[1] = a[1]), a[0] > i[0] && (i[0] = a[0]), 
            a[1] > i[1] && (i[1] = a[1]);
        }
        return {
            min: e ? n : i,
            max: e ? i : n
        };
    }
    function fh(t, e) {
        if (t.length === e.length) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n], r = e[n];
                if (i[0] !== r[0] || i[1] !== r[1]) return;
            }
            return !0;
        }
    }
    function ph(t) {
        return "number" == typeof t ? t : t ? .5 : 0;
    }
    function gh(t) {
        var e = t.getGlobalExtent();
        if (t.onBand) {
            var n = t.getBandWidth() / 2 - 1, i = e[1] > e[0] ? 1 : -1;
            e[0] += i * n, e[1] -= i * n;
        }
        return e;
    }
    function vh(t, e, n) {
        if (!n.valueDim) return [];
        for (var i = [], r = 0, a = e.count(); a > r; r++) i.push(oh(n, t, e, r));
        return i;
    }
    function mh(t, e, n, i) {
        var r = gh(t.getAxis("x")), a = gh(t.getAxis("y")), o = t.getBaseAxis().isHorizontal(), s = Math.min(r[0], r[1]), l = Math.min(a[0], a[1]), h = Math.max(r[0], r[1]) - s, u = Math.max(a[0], a[1]) - l;
        if (n) s -= .5, h += .5, l -= .5, u += .5; else {
            var c = i.get("lineStyle.width") || 2, d = i.get("clipOverflow") ? c / 2 : Math.max(h, u);
            o ? (l -= d, u += 2 * d) : (s -= d, h += 2 * d);
        }
        var f = new sp({
            shape: {
                x: s,
                y: l,
                width: h,
                height: u
            }
        });
        return e && (f.shape[o ? "width" : "height"] = 0, vr(f, {
            shape: {
                width: h,
                height: u
            }
        }, i)), f;
    }
    function yh(t, e, n, i) {
        var r = t.getAngleAxis(), a = t.getRadiusAxis().getExtent().slice();
        a[0] > a[1] && a.reverse();
        var o = r.getExtent(), s = Math.PI / 180;
        n && (a[0] -= .5, a[1] += .5);
        var l = new Jf({
            shape: {
                cx: kr(t.cx, 1),
                cy: kr(t.cy, 1),
                r0: kr(a[0], 1),
                r: kr(a[1], 1),
                startAngle: -o[0] * s,
                endAngle: -o[1] * s,
                clockwise: r.inverse
            }
        });
        return e && (l.shape.endAngle = -o[0] * s, vr(l, {
            shape: {
                endAngle: -o[1] * s
            }
        }, i)), l;
    }
    function _h(t, e, n, i) {
        return "polar" === t.type ? yh(t, e, n, i) : mh(t, e, n, i);
    }
    function xh(t, e, n) {
        for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
            var s = t[o + 1], l = t[o];
            a.push(l);
            var h = [];
            switch (n) {
              case "end":
                h[r] = s[r], h[1 - r] = l[1 - r], a.push(h);
                break;

              case "middle":
                var u = (l[r] + s[r]) / 2, c = [];
                h[r] = c[r] = u, h[1 - r] = l[1 - r], c[1 - r] = s[1 - r], a.push(h), a.push(c);
                break;

              default:
                h[r] = l[r], h[1 - r] = s[1 - r], a.push(h);
            }
        }
        return t[o] && a.push(t[o]), a;
    }
    function wh(t, e) {
        var n = t.getVisual("visualMeta");
        if (n && n.length && t.count() && "cartesian2d" === e.type) {
            for (var i, r, a = n.length - 1; a >= 0; a--) {
                var o = n[a].dimension, s = t.dimensions[o], l = t.getDimensionInfo(s);
                if ("x" === (i = l && l.coordDim) || "y" === i) {
                    r = n[a];
                    break;
                }
            }
            if (r) {
                var h = e.getAxis(i), u = p(r.stops, function(t) {
                    return {
                        coord: h.toGlobalCoord(h.dataToCoord(t.value)),
                        color: t.color
                    };
                }), c = u.length, d = r.outerColors.slice();
                c && u[0].coord > u[c - 1].coord && (u.reverse(), d.reverse());
                var g = u[0].coord - 10, v = u[c - 1].coord + 10, m = v - g;
                if (.001 > m) return "transparent";
                f(u, function(t) {
                    t.offset = (t.coord - g) / m;
                }), u.push({
                    offset: c ? u[c - 1].offset : .5,
                    color: d[1] || "transparent"
                }), u.unshift({
                    offset: c ? u[0].offset : .5,
                    color: d[0] || "transparent"
                });
                var y = new gp(0, 0, 0, 0, u, !0);
                return y[i] = g, y[i + "2"] = v, y;
            }
        }
    }
    function bh(t, e, n) {
        var i = t.get("showAllSymbol"), r = "auto" === i;
        if (!i || r) {
            var a = n.getAxesByScale("ordinal")[0];
            if (a && (!r || !Mh(a, e))) {
                var o = e.mapDimension(a.dim), s = {};
                return f(a.getViewLabels(), function(t) {
                    s[t.tickValue] = 1;
                }), function(t) {
                    return !s.hasOwnProperty(e.get(o, t));
                };
            }
        }
    }
    function Mh(t, e) {
        var n = t.getExtent(), i = Math.abs(n[1] - n[0]) / t.scale.count();
        isNaN(i) && (i = 0);
        for (var r = e.count(), a = Math.max(1, Math.round(r / 5)), o = 0; r > o; o += a) if (1.5 * Yl.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] > i) return !1;
        return !0;
    }
    function Sh(t) {
        return this._axes[t];
    }
    function Th(t) {
        my.call(this, t);
    }
    function Ch(t, e) {
        return e.type || (e.data ? "category" : "value");
    }
    function Ih(t, e) {
        return t.getCoordSysModel() === e;
    }
    function Ah(t, e, n) {
        this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], 
        this._initCartesian(t, e, n), this.model = t;
    }
    function kh(t, e, n, i) {
        function r(t) {
            return t.dim + "_" + t.index;
        }
        n.getAxesOnZeroOf = function() {
            return a ? [ a ] : [];
        };
        var a, o = t[e], s = n.model, l = s.get("axisLine.onZero"), h = s.get("axisLine.onZeroAxisIndex");
        if (l) {
            if (null != h) Dh(o[h]) && (a = o[h]); else for (var u in o) if (o.hasOwnProperty(u) && Dh(o[u]) && !i[r(o[u])]) {
                a = o[u];
                break;
            }
            a && (i[r(a)] = !0);
        }
    }
    function Dh(t) {
        return t && "category" !== t.type && "time" !== t.type && vl(t);
    }
    function Ph(t, e) {
        var n = t.getExtent(), i = n[0] + n[1];
        t.toGlobalCoord = "x" === t.dim ? function(t) {
            return t + e;
        } : function(t) {
            return i - t + e;
        }, t.toLocalCoord = "x" === t.dim ? function(t) {
            return t - e;
        } : function(t) {
            return i - t + e;
        };
    }
    function Lh(t) {
        return p(Cy, function(e) {
            return t.getReferringComponents(e)[0];
        });
    }
    function Oh(t) {
        return "cartesian2d" === t.get("coordinateSystem");
    }
    function Eh(t) {
        var e = {
            componentType: t.mainType,
            componentIndex: t.componentIndex
        };
        return e[t.mainType + "Index"] = t.componentIndex, e;
    }
    function zh(t, e, n, i) {
        var r, a, o = Or(n - t.rotation), s = i[0] > i[1], l = "start" === e && !s || "start" !== e && s;
        return Er(o - Iy / 2) ? (a = l ? "bottom" : "top", r = "center") : Er(o - 1.5 * Iy) ? (a = l ? "top" : "bottom", 
        r = "center") : (a = "middle", r = 1.5 * Iy > o && o > Iy / 2 ? l ? "left" : "right" : l ? "right" : "left"), 
        {
            rotation: o,
            textAlign: r,
            textVerticalAlign: a
        };
    }
    function Rh(t) {
        var e = t.get("tooltip");
        return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
    }
    function Nh(t, e, n) {
        if (!bl(t.axis)) {
            var i = t.get("axisLabel.showMinLabel"), r = t.get("axisLabel.showMaxLabel");
            e = e || [], n = n || [];
            var a = e[0], o = e[1], s = e[e.length - 1], l = e[e.length - 2], h = n[0], u = n[1], c = n[n.length - 1], d = n[n.length - 2];
            !1 === i ? (Bh(a), Bh(h)) : Fh(a, o) && (i ? (Bh(o), Bh(u)) : (Bh(a), Bh(h))), !1 === r ? (Bh(s), 
            Bh(c)) : Fh(l, s) && (r ? (Bh(l), Bh(d)) : (Bh(s), Bh(c)));
        }
    }
    function Bh(t) {
        t && (t.ignore = !0);
    }
    function Fh(t, e) {
        var n = t && t.getBoundingRect().clone(), i = e && e.getBoundingRect().clone();
        if (n && i) {
            var r = yt([]);
            return bt(r, r, -t.rotation), n.applyTransform(xt([], r, t.getLocalTransform())), 
            i.applyTransform(xt([], r, e.getLocalTransform())), n.intersect(i);
        }
    }
    function Vh(t) {
        return "middle" === t || "center" === t;
    }
    function Wh(t, e, n) {
        var i = e.axis;
        if (e.get("axisTick.show") && !i.scale.isBlank()) {
            for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), l = i.getTicksCoords(), h = [], u = [], c = t._transform, d = [], f = 0; f < l.length; f++) {
                var p = l[f].coord;
                h[0] = p, h[1] = 0, u[0] = p, u[1] = n.tickDirection * o, c && (K(h, h, c), K(u, u, c));
                var g = new hp(Wi({
                    anid: "tick_" + l[f].tickValue,
                    shape: {
                        x1: h[0],
                        y1: h[1],
                        x2: u[0],
                        y2: u[1]
                    },
                    style: s(a.getLineStyle(), {
                        stroke: e.get("axisLine.lineStyle.color")
                    }),
                    z2: 2,
                    silent: !0
                }));
                t.group.add(g), d.push(g);
            }
            return d;
        }
    }
    function Hh(t, e, n) {
        var i = e.axis;
        if (I(n.axisLabelShow, e.get("axisLabel.show")) && !i.scale.isBlank()) {
            var r = e.getModel("axisLabel"), a = r.get("margin"), o = i.getViewLabels(), s = (I(n.labelRotate, r.get("rotate")) || 0) * Iy / 180, l = Dy(n.rotation, s, n.labelDirection), h = e.getCategories(!0), u = [], c = Rh(e), d = e.get("triggerEvent");
            return f(o, function(o, s) {
                var f = o.tickValue, p = o.formattedLabel, g = o.rawLabel, v = r;
                h && h[f] && h[f].textStyle && (v = new br(h[f].textStyle, r, e.ecModel));
                var m = v.getTextColor() || e.get("axisLine.lineStyle.color"), y = [ i.dataToCoord(f), n.labelOffset + n.labelDirection * a ], _ = new Uf({
                    anid: "label_" + f,
                    position: y,
                    rotation: l.rotation,
                    silent: c,
                    z2: 10
                });
                or(_.style, v, {
                    text: p,
                    textAlign: v.getShallow("align", !0) || l.textAlign,
                    textVerticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || l.textVerticalAlign,
                    textFill: "function" == typeof m ? m("category" === i.type ? g : "value" === i.type ? f + "" : f, s) : m
                }), d && (_.eventData = Eh(e), _.eventData.targetType = "axisLabel", _.eventData.value = g), 
                t._dumbGroup.add(_), _.updateTransform(), u.push(_), t.group.add(_), _.decomposeTransform();
            }), u;
        }
    }
    function Gh(t) {
        var e = Zh(t);
        if (e) {
            var n = e.axisPointerModel, i = e.axis.scale, r = n.option, a = n.get("status"), o = n.get("value");
            null != o && (o = i.parse(o));
            var s = qh(n);
            null == a && (r.status = s ? "show" : "hide");
            var l = i.getExtent().slice();
            l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), 
            r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show");
        }
    }
    function Zh(t) {
        var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
        return e && e.axesInfo[Yh(t)];
    }
    function Xh(t) {
        var e = Zh(t);
        return e && e.axisPointerModel;
    }
    function qh(t) {
        return !!t.get("handle.show");
    }
    function Yh(t) {
        return t.type + "||" + t.id;
    }
    function jh(t, e, n, i, r, a) {
        var o = Py.getAxisPointerClass(t.axisPointerClass);
        if (o) {
            var s = Xh(e);
            s ? (t._axisPointer || (t._axisPointer = new o())).render(e, s, i, a) : Uh(t, i);
        }
    }
    function Uh(t, e, n) {
        var i = t._axisPointer;
        i && i.dispose(e, n), t._axisPointer = null;
    }
    function $h(t, e, n) {
        n = n || {};
        var i = t.coordinateSystem, r = e.axis, a = {}, o = r.getAxesOnZeroOf()[0], s = r.position, l = o ? "onZero" : s, h = r.dim, u = i.getRect(), c = [ u.x, u.x + u.width, u.y, u.y + u.height ], d = {
            left: 0,
            right: 1,
            top: 0,
            bottom: 1,
            onZero: 2
        }, f = e.get("offset") || 0, p = "x" === h ? [ c[2] - f, c[3] + f ] : [ c[0] - f, c[1] + f ];
        if (o) {
            var g = o.toGlobalCoord(o.dataToCoord(0));
            p[d.onZero] = Math.max(Math.min(g, p[1]), p[0]);
        }
        a.position = [ "y" === h ? p[d[l]] : c[0], "x" === h ? p[d[l]] : c[3] ], a.rotation = Math.PI / 2 * ("x" === h ? 0 : 1);
        var v = {
            top: -1,
            bottom: 1,
            left: -1,
            right: 1
        };
        a.labelDirection = a.tickDirection = a.nameDirection = v[s], a.labelOffset = o ? p[d[s]] - p[d.onZero] : 0, 
        e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection), I(n.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);
        var m = e.get("axisLabel.rotate");
        return a.labelRotate = "top" === l ? -m : m, a.z2 = 1, a;
    }
    function Kh(t) {
        return h(Ry, t) >= 0;
    }
    function Qh(t, e, n) {
        function i(t, e) {
            return h(e.nodes, t) >= 0;
        }
        function r(t, i) {
            var r = !1;
            return e(function(e) {
                f(n(t, e) || [], function(t) {
                    i.records[e.name][t] && (r = !0);
                });
            }), r;
        }
        function a(t, i) {
            i.nodes.push(t), e(function(e) {
                f(n(t, e) || [], function(t) {
                    i.records[e.name][t] = !0;
                });
            });
        }
        return function(n) {
            var o = {
                nodes: [],
                records: {}
            };
            if (e(function(t) {
                o.records[t.name] = {};
            }), !n) return o;
            a(n, o);
            var s;
            do {
                s = !1, t(function(t) {
                    !i(t, o) && r(t, o) && (a(t, o), s = !0);
                });
            } while (s);
            return o;
        };
    }
    function Jh(t, e, n) {
        var i = [ 1 / 0, -1 / 0 ];
        return By(n, function(t) {
            var n = t.getData();
            n && By(n.mapDimension(e, !0), function(t) {
                var e = n.getApproximateExtent(t);
                e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1]);
            });
        }), i[1] < i[0] && (i = [ NaN, NaN ]), tu(t, i), i;
    }
    function tu(t, e) {
        var n = t.getAxisModel(), i = n.getMin(!0), r = "category" === n.get("type"), a = r && n.getCategories().length;
        null != i && "dataMin" !== i && "function" != typeof i ? e[0] = i : r && (e[0] = a > 0 ? 0 : NaN);
        var o = n.getMax(!0);
        return null != o && "dataMax" !== o && "function" != typeof o ? e[1] = o : r && (e[1] = a > 0 ? a - 1 : NaN), 
        n.get("scale", !0) || (e[0] > 0 && (e[0] = 0), e[1] < 0 && (e[1] = 0)), e;
    }
    function eu(t, e) {
        var n = t.getAxisModel(), i = t._percentWindow, r = t._valueWindow;
        if (i) {
            var a = Lr(r, [ 0, 500 ]);
            a = Math.min(a, 20);
            var o = e || 0 === i[0] && 100 === i[1];
            n.setRange(o ? null : +r[0].toFixed(a), o ? null : +r[1].toFixed(a));
        }
    }
    function nu(t) {
        var e = t._minMaxSpan = {}, n = t._dataZoomModel;
        By([ "min", "max" ], function(i) {
            e[i + "Span"] = n.get(i + "Span");
            var r = n.get(i + "ValueSpan");
            if (null != r && (e[i + "ValueSpan"] = r, null != (r = t.getAxisModel().axis.scale.parse(r)))) {
                var a = t._dataExtent;
                e[i + "Span"] = Ir(a[0] + r, a, [ 0, 100 ], !0);
            }
        });
    }
    function iu(t) {
        var e = {};
        return Wy([ "start", "end", "startValue", "endValue", "throttle" ], function(n) {
            t.hasOwnProperty(n) && (e[n] = t[n]);
        }), e;
    }
    function ru(t, e) {
        var n = t._rangePropMode, i = t.get("rangeMode");
        Wy([ [ "start", "startValue" ], [ "end", "endValue" ] ], function(t, r) {
            var a = null != e[t[0]], o = null != e[t[1]];
            a && !o ? n[r] = "percent" : !a && o ? n[r] = "value" : i ? n[r] = i[r] : a && (n[r] = "percent");
        });
    }
    function au(t, e) {
        var n = t[e] - t[1 - e];
        return {
            span: Math.abs(n),
            sign: n > 0 ? -1 : 0 > n ? 1 : e ? -1 : 1
        };
    }
    function ou(t, e) {
        return Math.min(e[1], Math.max(e[0], t));
    }
    function su(t) {
        return {
            x: "y",
            y: "x",
            radius: "angle",
            angle: "radius"
        }[t];
    }
    function lu(t) {
        return "vertical" === t ? "ns-resize" : "ew-resize";
    }
    function hu(t, e) {
        return !!uu(t)[e];
    }
    function uu(t) {
        return t[n_] || (t[n_] = {});
    }
    function cu(t) {
        this.pointerChecker, this._zr = t, this._opt = {};
        var e = m, n = e(du, this), r = e(fu, this), a = e(pu, this), o = e(gu, this), l = e(vu, this);
        tc.call(this), this.setPointerChecker = function(t) {
            this.pointerChecker = t;
        }, this.enable = function(e, h) {
            this.disable(), this._opt = s(i(h) || {}, {
                zoomOnMouseWheel: !0,
                moveOnMouseMove: !0,
                moveOnMouseWheel: !1,
                preventDefaultMouseMove: !0
            }), null == e && (e = !0), (!0 === e || "move" === e || "pan" === e) && (t.on("mousedown", n), 
            t.on("mousemove", r), t.on("mouseup", a)), (!0 === e || "scale" === e || "zoom" === e) && (t.on("mousewheel", o), 
            t.on("pinch", l));
        }, this.disable = function() {
            t.off("mousedown", n), t.off("mousemove", r), t.off("mouseup", a), t.off("mousewheel", o), 
            t.off("pinch", l);
        }, this.dispose = this.disable, this.isDragging = function() {
            return this._dragging;
        }, this.isPinching = function() {
            return this._pinching;
        };
    }
    function du(t) {
        if (!(ut(t) || t.target && t.target.draggable)) {
            var e = t.offsetX, n = t.offsetY;
            this.pointerChecker && this.pointerChecker(t, e, n) && (this._x = e, this._y = n, 
            this._dragging = !0);
        }
    }
    function fu(t) {
        if (this._dragging && _u("moveOnMouseMove", t, this._opt) && "pinch" !== t.gestureEvent && !hu(this._zr, "globalPan")) {
            var e = t.offsetX, n = t.offsetY, i = this._x, r = this._y, a = e - i, o = n - r;
            this._x = e, this._y = n, this._opt.preventDefaultMouseMove && ic(t.event), yu(this, "pan", "moveOnMouseMove", t, {
                dx: a,
                dy: o,
                oldX: i,
                oldY: r,
                newX: e,
                newY: n
            });
        }
    }
    function pu(t) {
        ut(t) || (this._dragging = !1);
    }
    function gu(t) {
        var e = _u("zoomOnMouseWheel", t, this._opt), n = _u("moveOnMouseWheel", t, this._opt), i = t.wheelDelta, r = Math.abs(i), a = t.offsetX, o = t.offsetY;
        if (0 !== i && (e || n)) {
            if (e) {
                var s = r > 3 ? 1.4 : r > 1 ? 1.2 : 1.1;
                mu(this, "zoom", "zoomOnMouseWheel", t, {
                    scale: i > 0 ? s : 1 / s,
                    originX: a,
                    originY: o
                });
            }
            if (n) {
                var l = Math.abs(i);
                mu(this, "scrollMove", "moveOnMouseWheel", t, {
                    scrollDelta: (i > 0 ? 1 : -1) * (l > 3 ? .4 : l > 1 ? .15 : .05),
                    originX: a,
                    originY: o
                });
            }
        }
    }
    function vu(t) {
        hu(this._zr, "globalPan") || mu(this, "zoom", null, t, {
            scale: t.pinchScale > 1 ? 1.1 : 1 / 1.1,
            originX: t.pinchX,
            originY: t.pinchY
        });
    }
    function mu(t, e, n, i, r) {
        t.pointerChecker && t.pointerChecker(i, r.originX, r.originY) && (ic(i.event), yu(t, e, n, i, r));
    }
    function yu(t, e, n, i, r) {
        r.isAvailableBehavior = m(_u, null, n, i), t.trigger(e, r);
    }
    function _u(t, e, n) {
        var i = n[t];
        return !t || i && (!w(i) || e.event[i + "Key"]);
    }
    function xu(t, e) {
        var n = Mu(t), i = e.dataZoomId, r = e.coordId;
        f(n, function(t) {
            var n = t.dataZoomInfos;
            n[i] && h(e.allCoordIds, r) < 0 && (delete n[i], t.count--);
        }), Tu(n);
        var a = n[r];
        a || (a = n[r] = {
            coordId: r,
            dataZoomInfos: {},
            count: 0
        }, a.controller = Su(t, a), a.dispatchAction = y(Cu, t)), !a.dataZoomInfos[i] && a.count++, 
        a.dataZoomInfos[i] = e;
        var o = Iu(a.dataZoomInfos);
        a.controller.enable(o.controlType, o.opt), a.controller.setPointerChecker(e.containsPoint), 
        fo(a, "dispatchAction", e.dataZoomModel.get("throttle", !0), "fixRate");
    }
    function wu(t, e) {
        var n = Mu(t);
        f(n, function(t) {
            t.controller.dispose();
            var n = t.dataZoomInfos;
            n[e] && (delete n[e], t.count--);
        }), Tu(n);
    }
    function bu(t) {
        return t.type + "\0_" + t.id;
    }
    function Mu(t) {
        var e = t.getZr();
        return e[i_] || (e[i_] = {});
    }
    function Su(t, e) {
        var n = new cu(t.getZr());
        return f([ "pan", "zoom", "scrollMove" ], function(t) {
            n.on(t, function(n) {
                var i = [];
                f(e.dataZoomInfos, function(r) {
                    if (n.isAvailableBehavior(r.dataZoomModel.option)) {
                        var a = (r.getRange || {})[t], o = a && a(e.controller, n);
                        !r.dataZoomModel.get("disabled", !0) && o && i.push({
                            dataZoomId: r.dataZoomId,
                            start: o[0],
                            end: o[1]
                        });
                    }
                }), i.length && e.dispatchAction(i);
            });
        }), n;
    }
    function Tu(t) {
        f(t, function(e, n) {
            e.count || (e.controller.dispose(), delete t[n]);
        });
    }
    function Cu(t, e) {
        t.dispatchAction({
            type: "dataZoom",
            batch: e
        });
    }
    function Iu(t) {
        var e, n = "type_", i = {
            type_true: 2,
            type_move: 1,
            type_false: 0,
            type_undefined: -1
        }, r = !0;
        return f(t, function(t) {
            var a = t.dataZoomModel, o = !a.get("disabled", !0) && (!a.get("zoomLock", !0) || "move");
            i[n + o] > i[n + e] && (e = o), r &= a.get("preventDefaultMouseMove", !0);
        }), {
            controlType: e,
            opt: {
                zoomOnMouseWheel: !0,
                moveOnMouseMove: !0,
                moveOnMouseWheel: !0,
                preventDefaultMouseMove: !!r
            }
        };
    }
    function Au(t) {
        return function(e, n, i, r) {
            var a = this._range, o = a.slice(), s = e.axisModels[0];
            if (s) {
                var l = t(o, s, e, n, i, r);
                return Xy(l, o, [ 0, 100 ], "all"), this._range = o, a[0] !== o[0] || a[1] !== o[1] ? o : void 0;
            }
        };
    }
    var ku = 2311, Du = function() {
        return ku++;
    }, Pu = {}, Lu = Pu = "object" == ("undefined" == typeof wx ? "undefined" : t(wx)) && "function" == typeof wx.getSystemInfoSync ? {
        browser: {},
        os: {},
        node: !1,
        wxa: !0,
        canvasSupported: !0,
        svgSupported: !1,
        touchEventsSupported: !0,
        domSupported: !1
    } : "undefined" == typeof document && "undefined" != typeof self ? {
        browser: {},
        os: {},
        node: !1,
        worker: !0,
        canvasSupported: !0,
        domSupported: !1
    } : "undefined" == typeof navigator ? {
        browser: {},
        os: {},
        node: !0,
        worker: !1,
        canvasSupported: !0,
        svgSupported: !0,
        domSupported: !1
    } : function(t) {
        var e = {}, n = {}, i = t.match(/Firefox\/([\d.]+)/), r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/), a = t.match(/Edge\/([\d.]+)/), o = /micromessenger/i.test(t);
        return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), 
        a && (n.edge = !0, n.version = a[1]), o && (n.weChat = !0), {
            browser: n,
            os: e,
            node: !1,
            canvasSupported: !!document.createElement("canvas").getContext,
            svgSupported: "undefined" != typeof SVGRect,
            touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge,
            pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 11),
            domSupported: "undefined" != typeof document
        };
    }(navigator.userAgent), Ou = {
        "[object Function]": 1,
        "[object RegExp]": 1,
        "[object Date]": 1,
        "[object Error]": 1,
        "[object CanvasGradient]": 1,
        "[object CanvasPattern]": 1,
        "[object Image]": 1,
        "[object Canvas]": 1
    }, Eu = {
        "[object Int8Array]": 1,
        "[object Uint8Array]": 1,
        "[object Uint8ClampedArray]": 1,
        "[object Int16Array]": 1,
        "[object Uint16Array]": 1,
        "[object Int32Array]": 1,
        "[object Uint32Array]": 1,
        "[object Float32Array]": 1,
        "[object Float64Array]": 1
    }, zu = Object.prototype.toString, Ru = Array.prototype, Nu = Ru.forEach, Bu = Ru.filter, Fu = Ru.slice, Vu = Ru.map, Wu = Ru.reduce, Hu = {}, Gu = function() {
        return Hu.createCanvas();
    };
    Hu.createCanvas = function() {
        return document.createElement("canvas");
    };
    var Zu, Xu = "__ec_primitive__";
    R.prototype = {
        constructor: R,
        get: function(t) {
            return this.data.hasOwnProperty(t) ? this.data[t] : null;
        },
        set: function(t, e) {
            return this.data[t] = e;
        },
        each: function(t, e) {
            void 0 !== e && (t = m(t, e));
            for (var n in this.data) this.data.hasOwnProperty(n) && t(this.data[n], n);
        },
        removeKey: function(t) {
            delete this.data[t];
        }
    };
    var qu = (Object.freeze || Object)({
        $override: n,
        clone: i,
        merge: r,
        mergeAll: a,
        extend: o,
        defaults: s,
        createCanvas: Gu,
        getContext: l,
        indexOf: h,
        inherits: u,
        mixin: c,
        isArrayLike: d,
        each: f,
        map: p,
        reduce: g,
        filter: v,
        find: function(t, e, n) {
            if (t && e) for (var i = 0, r = t.length; r > i; i++) if (e.call(n, t[i], i, t)) return t[i];
        },
        bind: m,
        curry: y,
        isArray: _,
        isFunction: x,
        isString: w,
        isObject: b,
        isBuiltInObject: M,
        isTypedArray: S,
        isDom: T,
        eqNaN: C,
        retrieve: I,
        retrieve2: A,
        retrieve3: k,
        slice: D,
        normalizeCssArray: P,
        assert: L,
        trim: O,
        setAsPrimitive: E,
        isPrimitive: z,
        createHashMap: N,
        concatArray: function(t, e) {
            for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
            var r = t.length;
            for (i = 0; i < e.length; i++) n[i + r] = e[i];
            return n;
        },
        noop: B
    }), Yu = "undefined" == typeof Float32Array ? Array : Float32Array, ju = X, Uu = q, $u = U, Ku = $, Qu = (Object.freeze || Object)({
        create: F,
        copy: V,
        clone: W,
        set: function(t, e, n) {
            return t[0] = e, t[1] = n, t;
        },
        add: H,
        scaleAndAdd: G,
        sub: Z,
        len: X,
        length: ju,
        lenSquare: q,
        lengthSquare: Uu,
        mul: function(t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t;
        },
        div: function(t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t;
        },
        dot: function(t, e) {
            return t[0] * e[0] + t[1] * e[1];
        },
        scale: Y,
        normalize: j,
        distance: U,
        dist: $u,
        distanceSquare: $,
        distSquare: Ku,
        negate: function(t, e) {
            return t[0] = -e[0], t[1] = -e[1], t;
        },
        lerp: function(t, e, n, i) {
            return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t;
        },
        applyTransform: K,
        min: Q,
        max: J
    });
    tt.prototype = {
        constructor: tt,
        _dragStart: function(t) {
            var e = t.target;
            e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, 
            this._y = t.offsetY, this.dispatchToElement(et(e, t), "dragstart", t.event));
        },
        _drag: function(t) {
            var e = this._draggingTarget;
            if (e) {
                var n = t.offsetX, i = t.offsetY, r = n - this._x, a = i - this._y;
                this._x = n, this._y = i, e.drift(r, a, t), this.dispatchToElement(et(e, t), "drag", t.event);
                var o = this.findHover(n, i, e).target, s = this._dropTarget;
                this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(et(s, t), "dragleave", t.event), 
                o && o !== s && this.dispatchToElement(et(o, t), "dragenter", t.event));
            }
        },
        _dragEnd: function(t) {
            var e = this._draggingTarget;
            e && (e.dragging = !1), this.dispatchToElement(et(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(et(this._dropTarget, t), "drop", t.event), 
            this._draggingTarget = null, this._dropTarget = null;
        }
    };
    var Ju = Array.prototype.slice, tc = function(t) {
        this._$handlers = {}, this._$eventProcessor = t;
    };
    tc.prototype = {
        constructor: tc,
        one: function(t, e, n, i) {
            return it(this, t, e, n, i, !0);
        },
        on: function(t, e, n, i) {
            return it(this, t, e, n, i, !1);
        },
        isSilent: function(t) {
            var e = this._$handlers;
            return !e[t] || !e[t].length;
        },
        off: function(t, e) {
            var n = this._$handlers;
            if (!t) return this._$handlers = {}, this;
            if (e) {
                if (n[t]) {
                    for (var i = [], r = 0, a = n[t].length; a > r; r++) n[t][r].h !== e && i.push(n[t][r]);
                    n[t] = i;
                }
                n[t] && 0 === n[t].length && delete n[t];
            } else delete n[t];
            return this;
        },
        trigger: function(t) {
            var e = this._$handlers[t], n = this._$eventProcessor;
            if (e) {
                var i = arguments, r = i.length;
                r > 3 && (i = Ju.call(i, 1));
                for (var a = e.length, o = 0; a > o; ) {
                    var s = e[o];
                    if (n && n.filter && null != s.query && !n.filter(t, s.query)) o++; else {
                        switch (r) {
                          case 1:
                            s.h.call(s.ctx);
                            break;

                          case 2:
                            s.h.call(s.ctx, i[1]);
                            break;

                          case 3:
                            s.h.call(s.ctx, i[1], i[2]);
                            break;

                          default:
                            s.h.apply(s.ctx, i);
                        }
                        s.one ? (e.splice(o, 1), a--) : o++;
                    }
                }
            }
            return n && n.afterTrigger && n.afterTrigger(t), this;
        },
        triggerWithContext: function(t) {
            var e = this._$handlers[t], n = this._$eventProcessor;
            if (e) {
                var i = arguments, r = i.length;
                r > 4 && (i = Ju.call(i, 1, i.length - 1));
                for (var a = i[i.length - 1], o = e.length, s = 0; o > s; ) {
                    var l = e[s];
                    if (n && n.filter && null != l.query && !n.filter(t, l.query)) s++; else {
                        switch (r) {
                          case 1:
                            l.h.call(a);
                            break;

                          case 2:
                            l.h.call(a, i[1]);
                            break;

                          case 3:
                            l.h.call(a, i[1], i[2]);
                            break;

                          default:
                            l.h.apply(a, i);
                        }
                        l.one ? (e.splice(s, 1), o--) : s++;
                    }
                }
            }
            return n && n.afterTrigger && n.afterTrigger(t), this;
        }
    };
    var ec = "undefined" != typeof window && !!window.addEventListener, nc = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, ic = ec ? function(t) {
        t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;
    } : function(t) {
        t.returnValue = !1, t.cancelBubble = !0;
    }, rc = function() {
        this._track = [];
    };
    rc.prototype = {
        constructor: rc,
        recognize: function(t, e, n) {
            return this._doTrack(t, e, n), this._recognize(t);
        },
        clear: function() {
            return this._track.length = 0, this;
        },
        _doTrack: function(t, e, n) {
            var i = t.touches;
            if (i) {
                for (var r = {
                    points: [],
                    touches: [],
                    target: e,
                    event: t
                }, a = 0, o = i.length; o > a; a++) {
                    var s = i[a], l = at(n, s, {});
                    r.points.push([ l.zrX, l.zrY ]), r.touches.push(s);
                }
                this._track.push(r);
            }
        },
        _recognize: function(t) {
            for (var e in ac) if (ac.hasOwnProperty(e)) {
                var n = ac[e](this._track, t);
                if (n) return n;
            }
        }
    };
    var ac = {
        pinch: function(t, e) {
            var n = t.length;
            if (n) {
                var i = (t[n - 1] || {}).points, r = (t[n - 2] || {}).points || i;
                if (r && r.length > 1 && i && i.length > 1) {
                    var a = ct(i) / ct(r);
                    !isFinite(a) && (a = 1), e.pinchScale = a;
                    var o = dt(i);
                    return e.pinchX = o[0], e.pinchY = o[1], {
                        type: "pinch",
                        target: t[0].target,
                        event: e
                    };
                }
            }
        }
    }, oc = "silent";
    gt.prototype.dispose = function() {};
    var sc = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], lc = function(t, e, n, i) {
        tc.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new gt(), 
        this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, 
        this._gestureMgr, tt.call(this), this.setHandlerProxy(n);
    };
    lc.prototype = {
        constructor: lc,
        setHandlerProxy: function(t) {
            this.proxy && this.proxy.dispose(), t && (f(sc, function(e) {
                t.on && t.on(e, this[e], this);
            }, this), t.handler = this), this.proxy = t;
        },
        mousemove: function(t) {
            var e = t.zrX, n = t.zrY, i = this._hovered, r = i.target;
            r && !r.__zr && (i = this.findHover(i.x, i.y), r = i.target);
            var a = this._hovered = this.findHover(e, n), o = a.target, s = this.proxy;
            s.setCursor && s.setCursor(o ? o.cursor : "default"), r && o !== r && this.dispatchToElement(i, "mouseout", t), 
            this.dispatchToElement(a, "mousemove", t), o && o !== r && this.dispatchToElement(a, "mouseover", t);
        },
        mouseout: function(t) {
            this.dispatchToElement(this._hovered, "mouseout", t);
            var e, n = t.toElement || t.relatedTarget;
            do {
                n = n && n.parentNode;
            } while (n && 9 !== n.nodeType && !(e = n === this.painterRoot));
            !e && this.trigger("globalout", {
                event: t
            });
        },
        resize: function() {
            this._hovered = {};
        },
        dispatch: function(t, e) {
            var n = this[t];
            n && n.call(this, e);
        },
        dispose: function() {
            this.proxy.dispose(), this.storage = this.proxy = this.painter = null;
        },
        setCursorStyle: function(t) {
            var e = this.proxy;
            e.setCursor && e.setCursor(t);
        },
        dispatchToElement: function(t, e, n) {
            var i = (t = t || {}).target;
            if (!i || !i.silent) {
                for (var r = "on" + e, a = ft(e, t, n); i && (i[r] && (a.cancelBubble = i[r].call(i, a)), 
                i.trigger(e, a), i = i.parent, !a.cancelBubble); ) ;
                a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function(t) {
                    "function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a);
                }));
            }
        },
        findHover: function(t, e, n) {
            for (var i = this.storage.getDisplayList(), r = {
                x: t,
                y: e
            }, a = i.length - 1; a >= 0; a--) {
                var o;
                if (i[a] !== n && !i[a].ignore && (o = vt(i[a], t, e)) && (!r.topTarget && (r.topTarget = i[a]), 
                o !== oc)) {
                    r.target = i[a];
                    break;
                }
            }
            return r;
        },
        processGesture: function(t, e) {
            this._gestureMgr || (this._gestureMgr = new rc());
            var n = this._gestureMgr;
            "start" === e && n.clear();
            var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
            if ("end" === e && n.clear(), i) {
                var r = i.type;
                t.gestureEvent = r, this.dispatchToElement({
                    target: i.target
                }, r, i.event);
            }
        }
    }, f([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(t) {
        lc.prototype[t] = function(e) {
            var n = this.findHover(e.zrX, e.zrY), i = n.target;
            if ("mousedown" === t) this._downEl = i, this._downPoint = [ e.zrX, e.zrY ], this._upEl = i; else if ("mouseup" === t) this._upEl = i; else if ("click" === t) {
                if (this._downEl !== this._upEl || !this._downPoint || $u(this._downPoint, [ e.zrX, e.zrY ]) > 4) return;
                this._downPoint = null;
            }
            this.dispatchToElement(n, t, e);
        };
    }), c(lc, tc), c(lc, tt);
    var hc = "undefined" == typeof Float32Array ? Array : Float32Array, uc = (Object.freeze || Object)({
        create: mt,
        identity: yt,
        copy: _t,
        mul: xt,
        translate: wt,
        rotate: bt,
        scale: Mt,
        invert: St,
        clone: function(t) {
            var e = mt();
            return _t(e, t), e;
        }
    }), cc = yt, dc = 5e-5, fc = function(t) {
        (t = t || {}).position || (this.position = [ 0, 0 ]), null == t.rotation && (this.rotation = 0), 
        t.scale || (this.scale = [ 1, 1 ]), this.origin = this.origin || null;
    }, pc = fc.prototype;
    pc.transform = null, pc.needLocalTransform = function() {
        return Tt(this.rotation) || Tt(this.position[0]) || Tt(this.position[1]) || Tt(this.scale[0] - 1) || Tt(this.scale[1] - 1);
    };
    var gc = [];
    pc.updateTransform = function() {
        var t = this.parent, e = t && t.transform, n = this.needLocalTransform(), i = this.transform;
        if (n || e) {
            i = i || mt(), n ? this.getLocalTransform(i) : cc(i), e && (n ? xt(i, t.transform, i) : _t(i, t.transform)), 
            this.transform = i;
            var r = this.globalScaleRatio;
            if (null != r && 1 !== r) {
                this.getGlobalScale(gc);
                var a = gc[0] < 0 ? -1 : 1, o = gc[1] < 0 ? -1 : 1, s = ((gc[0] - a) * r + a) / gc[0] || 0, l = ((gc[1] - o) * r + o) / gc[1] || 0;
                i[0] *= s, i[1] *= s, i[2] *= l, i[3] *= l;
            }
            this.invTransform = this.invTransform || mt(), St(this.invTransform, i);
        } else i && cc(i);
    }, pc.getLocalTransform = function(t) {
        return fc.getLocalTransform(this, t);
    }, pc.setTransform = function(t) {
        var e = this.transform, n = t.dpr || 1;
        e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0);
    }, pc.restoreTransform = function(t) {
        var e = t.dpr || 1;
        t.setTransform(e, 0, 0, e, 0, 0);
    };
    var vc = [], mc = mt();
    pc.setLocalTransform = function(t) {
        if (t) {
            var e = t[0] * t[0] + t[1] * t[1], n = t[2] * t[2] + t[3] * t[3], i = this.position, r = this.scale;
            Tt(e - 1) && (e = Math.sqrt(e)), Tt(n - 1) && (n = Math.sqrt(n)), t[0] < 0 && (e = -e), 
            t[3] < 0 && (n = -n), i[0] = t[4], i[1] = t[5], r[0] = e, r[1] = n, this.rotation = Math.atan2(-t[1] / n, t[0] / e);
        }
    }, pc.decomposeTransform = function() {
        if (this.transform) {
            var t = this.parent, e = this.transform;
            t && t.transform && (xt(vc, t.invTransform, e), e = vc);
            var n = this.origin;
            n && (n[0] || n[1]) && (mc[4] = n[0], mc[5] = n[1], xt(vc, e, mc), vc[4] -= n[0], 
            vc[5] -= n[1], e = vc), this.setLocalTransform(e);
        }
    }, pc.getGlobalScale = function(t) {
        var e = this.transform;
        return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), 
        e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, 
        t);
    }, pc.transformCoordToLocal = function(t, e) {
        var n = [ t, e ], i = this.invTransform;
        return i && K(n, n, i), n;
    }, pc.transformCoordToGlobal = function(t, e) {
        var n = [ t, e ], i = this.transform;
        return i && K(n, n, i), n;
    }, fc.getLocalTransform = function(t, e) {
        cc(e = e || []);
        var n = t.origin, i = t.scale || [ 1, 1 ], r = t.rotation || 0, a = t.position || [ 0, 0 ];
        return n && (e[4] -= n[0], e[5] -= n[1]), Mt(e, e, i), r && bt(e, e, r), n && (e[4] += n[0], 
        e[5] += n[1]), e[4] += a[0], e[5] += a[1], e;
    };
    var yc = {
        linear: function(t) {
            return t;
        },
        quadraticIn: function(t) {
            return t * t;
        },
        quadraticOut: function(t) {
            return t * (2 - t);
        },
        quadraticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
        },
        cubicIn: function(t) {
            return t * t * t;
        },
        cubicOut: function(t) {
            return --t * t * t + 1;
        },
        cubicInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
        },
        quarticIn: function(t) {
            return t * t * t * t;
        },
        quarticOut: function(t) {
            return 1 - --t * t * t * t;
        },
        quarticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
        },
        quinticIn: function(t) {
            return t * t * t * t * t;
        },
        quinticOut: function(t) {
            return --t * t * t * t * t + 1;
        },
        quinticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
        },
        sinusoidalIn: function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
        },
        sinusoidalOut: function(t) {
            return Math.sin(t * Math.PI / 2);
        },
        sinusoidalInOut: function(t) {
            return .5 * (1 - Math.cos(Math.PI * t));
        },
        exponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        exponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        exponentialInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
        },
        circularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t);
        },
        circularOut: function(t) {
            return Math.sqrt(1 - --t * t);
        },
        circularInOut: function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        elasticIn: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            -n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4));
        },
        elasticOut: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / .4) + 1);
        },
        elasticInOut: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4) * .5 + 1);
        },
        backIn: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e);
        },
        backOut: function(t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1;
        },
        backInOut: function(t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        },
        bounceIn: function(t) {
            return 1 - yc.bounceOut(1 - t);
        },
        bounceOut: function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
        bounceInOut: function(t) {
            return .5 > t ? .5 * yc.bounceIn(2 * t) : .5 * yc.bounceOut(2 * t - 1) + .5;
        }
    };
    Ct.prototype = {
        constructor: Ct,
        step: function(t, e) {
            if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), 
            this._paused) this._pausedTime += e; else {
                var n = (t - this._startTime - this._pausedTime) / this._life;
                if (!(0 > n)) {
                    n = Math.min(n, 1);
                    var i = this.easing, r = "string" == typeof i ? yc[i] : i, a = "function" == typeof r ? r(n) : n;
                    return this.fire("frame", a), 1 === n ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, 
                    "destroy") : null;
                }
            }
        },
        restart: function(t) {
            var e = (t - this._startTime - this._pausedTime) % this._life;
            this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1;
        },
        fire: function(t, e) {
            this[t = "on" + t] && this[t](this._target, e);
        },
        pause: function() {
            this._paused = !0;
        },
        resume: function() {
            this._paused = !1;
        }
    };
    var _c = function() {
        this.head = null, this.tail = null, this._len = 0;
    }, xc = _c.prototype;
    xc.insert = function(t) {
        var e = new wc(t);
        return this.insertEntry(e), e;
    }, xc.insertEntry = function(t) {
        this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, 
        this._len++;
    }, xc.remove = function(t) {
        var e = t.prev, n = t.next;
        e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, 
        this._len--;
    }, xc.len = function() {
        return this._len;
    }, xc.clear = function() {
        this.head = this.tail = null, this._len = 0;
    };
    var wc = function(t) {
        this.value = t, this.next, this.prev;
    }, bc = function(t) {
        this._list = new _c(), this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null;
    }, Mc = bc.prototype;
    Mc.put = function(t, e) {
        var n = this._list, i = this._map, r = null;
        if (null == i[t]) {
            var a = n.len(), o = this._lastRemovedEntry;
            if (a >= this._maxSize && a > 0) {
                var s = n.head;
                n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s;
            }
            o ? o.value = e : o = new wc(e), o.key = t, n.insertEntry(o), i[t] = o;
        }
        return r;
    }, Mc.get = function(t) {
        var e = this._map[t], n = this._list;
        return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0;
    }, Mc.clear = function() {
        this._list.clear(), this._map = {};
    };
    var Sc = {
        transparent: [ 0, 0, 0, 0 ],
        aliceblue: [ 240, 248, 255, 1 ],
        antiquewhite: [ 250, 235, 215, 1 ],
        aqua: [ 0, 255, 255, 1 ],
        aquamarine: [ 127, 255, 212, 1 ],
        azure: [ 240, 255, 255, 1 ],
        beige: [ 245, 245, 220, 1 ],
        bisque: [ 255, 228, 196, 1 ],
        black: [ 0, 0, 0, 1 ],
        blanchedalmond: [ 255, 235, 205, 1 ],
        blue: [ 0, 0, 255, 1 ],
        blueviolet: [ 138, 43, 226, 1 ],
        brown: [ 165, 42, 42, 1 ],
        burlywood: [ 222, 184, 135, 1 ],
        cadetblue: [ 95, 158, 160, 1 ],
        chartreuse: [ 127, 255, 0, 1 ],
        chocolate: [ 210, 105, 30, 1 ],
        coral: [ 255, 127, 80, 1 ],
        cornflowerblue: [ 100, 149, 237, 1 ],
        cornsilk: [ 255, 248, 220, 1 ],
        crimson: [ 220, 20, 60, 1 ],
        cyan: [ 0, 255, 255, 1 ],
        darkblue: [ 0, 0, 139, 1 ],
        darkcyan: [ 0, 139, 139, 1 ],
        darkgoldenrod: [ 184, 134, 11, 1 ],
        darkgray: [ 169, 169, 169, 1 ],
        darkgreen: [ 0, 100, 0, 1 ],
        darkgrey: [ 169, 169, 169, 1 ],
        darkkhaki: [ 189, 183, 107, 1 ],
        darkmagenta: [ 139, 0, 139, 1 ],
        darkolivegreen: [ 85, 107, 47, 1 ],
        darkorange: [ 255, 140, 0, 1 ],
        darkorchid: [ 153, 50, 204, 1 ],
        darkred: [ 139, 0, 0, 1 ],
        darksalmon: [ 233, 150, 122, 1 ],
        darkseagreen: [ 143, 188, 143, 1 ],
        darkslateblue: [ 72, 61, 139, 1 ],
        darkslategray: [ 47, 79, 79, 1 ],
        darkslategrey: [ 47, 79, 79, 1 ],
        darkturquoise: [ 0, 206, 209, 1 ],
        darkviolet: [ 148, 0, 211, 1 ],
        deeppink: [ 255, 20, 147, 1 ],
        deepskyblue: [ 0, 191, 255, 1 ],
        dimgray: [ 105, 105, 105, 1 ],
        dimgrey: [ 105, 105, 105, 1 ],
        dodgerblue: [ 30, 144, 255, 1 ],
        firebrick: [ 178, 34, 34, 1 ],
        floralwhite: [ 255, 250, 240, 1 ],
        forestgreen: [ 34, 139, 34, 1 ],
        fuchsia: [ 255, 0, 255, 1 ],
        gainsboro: [ 220, 220, 220, 1 ],
        ghostwhite: [ 248, 248, 255, 1 ],
        gold: [ 255, 215, 0, 1 ],
        goldenrod: [ 218, 165, 32, 1 ],
        gray: [ 128, 128, 128, 1 ],
        green: [ 0, 128, 0, 1 ],
        greenyellow: [ 173, 255, 47, 1 ],
        grey: [ 128, 128, 128, 1 ],
        honeydew: [ 240, 255, 240, 1 ],
        hotpink: [ 255, 105, 180, 1 ],
        indianred: [ 205, 92, 92, 1 ],
        indigo: [ 75, 0, 130, 1 ],
        ivory: [ 255, 255, 240, 1 ],
        khaki: [ 240, 230, 140, 1 ],
        lavender: [ 230, 230, 250, 1 ],
        lavenderblush: [ 255, 240, 245, 1 ],
        lawngreen: [ 124, 252, 0, 1 ],
        lemonchiffon: [ 255, 250, 205, 1 ],
        lightblue: [ 173, 216, 230, 1 ],
        lightcoral: [ 240, 128, 128, 1 ],
        lightcyan: [ 224, 255, 255, 1 ],
        lightgoldenrodyellow: [ 250, 250, 210, 1 ],
        lightgray: [ 211, 211, 211, 1 ],
        lightgreen: [ 144, 238, 144, 1 ],
        lightgrey: [ 211, 211, 211, 1 ],
        lightpink: [ 255, 182, 193, 1 ],
        lightsalmon: [ 255, 160, 122, 1 ],
        lightseagreen: [ 32, 178, 170, 1 ],
        lightskyblue: [ 135, 206, 250, 1 ],
        lightslategray: [ 119, 136, 153, 1 ],
        lightslategrey: [ 119, 136, 153, 1 ],
        lightsteelblue: [ 176, 196, 222, 1 ],
        lightyellow: [ 255, 255, 224, 1 ],
        lime: [ 0, 255, 0, 1 ],
        limegreen: [ 50, 205, 50, 1 ],
        linen: [ 250, 240, 230, 1 ],
        magenta: [ 255, 0, 255, 1 ],
        maroon: [ 128, 0, 0, 1 ],
        mediumaquamarine: [ 102, 205, 170, 1 ],
        mediumblue: [ 0, 0, 205, 1 ],
        mediumorchid: [ 186, 85, 211, 1 ],
        mediumpurple: [ 147, 112, 219, 1 ],
        mediumseagreen: [ 60, 179, 113, 1 ],
        mediumslateblue: [ 123, 104, 238, 1 ],
        mediumspringgreen: [ 0, 250, 154, 1 ],
        mediumturquoise: [ 72, 209, 204, 1 ],
        mediumvioletred: [ 199, 21, 133, 1 ],
        midnightblue: [ 25, 25, 112, 1 ],
        mintcream: [ 245, 255, 250, 1 ],
        mistyrose: [ 255, 228, 225, 1 ],
        moccasin: [ 255, 228, 181, 1 ],
        navajowhite: [ 255, 222, 173, 1 ],
        navy: [ 0, 0, 128, 1 ],
        oldlace: [ 253, 245, 230, 1 ],
        olive: [ 128, 128, 0, 1 ],
        olivedrab: [ 107, 142, 35, 1 ],
        orange: [ 255, 165, 0, 1 ],
        orangered: [ 255, 69, 0, 1 ],
        orchid: [ 218, 112, 214, 1 ],
        palegoldenrod: [ 238, 232, 170, 1 ],
        palegreen: [ 152, 251, 152, 1 ],
        paleturquoise: [ 175, 238, 238, 1 ],
        palevioletred: [ 219, 112, 147, 1 ],
        papayawhip: [ 255, 239, 213, 1 ],
        peachpuff: [ 255, 218, 185, 1 ],
        peru: [ 205, 133, 63, 1 ],
        pink: [ 255, 192, 203, 1 ],
        plum: [ 221, 160, 221, 1 ],
        powderblue: [ 176, 224, 230, 1 ],
        purple: [ 128, 0, 128, 1 ],
        red: [ 255, 0, 0, 1 ],
        rosybrown: [ 188, 143, 143, 1 ],
        royalblue: [ 65, 105, 225, 1 ],
        saddlebrown: [ 139, 69, 19, 1 ],
        salmon: [ 250, 128, 114, 1 ],
        sandybrown: [ 244, 164, 96, 1 ],
        seagreen: [ 46, 139, 87, 1 ],
        seashell: [ 255, 245, 238, 1 ],
        sienna: [ 160, 82, 45, 1 ],
        silver: [ 192, 192, 192, 1 ],
        skyblue: [ 135, 206, 235, 1 ],
        slateblue: [ 106, 90, 205, 1 ],
        slategray: [ 112, 128, 144, 1 ],
        slategrey: [ 112, 128, 144, 1 ],
        snow: [ 255, 250, 250, 1 ],
        springgreen: [ 0, 255, 127, 1 ],
        steelblue: [ 70, 130, 180, 1 ],
        tan: [ 210, 180, 140, 1 ],
        teal: [ 0, 128, 128, 1 ],
        thistle: [ 216, 191, 216, 1 ],
        tomato: [ 255, 99, 71, 1 ],
        turquoise: [ 64, 224, 208, 1 ],
        violet: [ 238, 130, 238, 1 ],
        wheat: [ 245, 222, 179, 1 ],
        white: [ 255, 255, 255, 1 ],
        whitesmoke: [ 245, 245, 245, 1 ],
        yellow: [ 255, 255, 0, 1 ],
        yellowgreen: [ 154, 205, 50, 1 ]
    }, Tc = new bc(20), Cc = null, Ic = Wt, Ac = Ht, kc = (Object.freeze || Object)({
        parse: Nt,
        lift: Vt,
        toHex: function(t) {
            var e = Nt(t);
            return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;
        },
        fastLerp: Wt,
        fastMapToColor: Ic,
        lerp: Ht,
        mapToColor: Ac,
        modifyHSL: function(t, e, n, i) {
            return (t = Nt(t)) ? (t = Ft(t), null != e && (t[0] = At(e)), null != n && (t[1] = Pt(n)), 
            null != i && (t[2] = Pt(i)), Gt(Bt(t), "rgba")) : void 0;
        },
        modifyAlpha: function(t, e) {
            return (t = Nt(t)) && null != e ? (t[3] = kt(e), Gt(t, "rgba")) : void 0;
        },
        stringify: Gt
    }), Dc = Array.prototype.slice, Pc = function(t, e, n, i) {
        this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || Zt, 
        this._setter = i || Xt, this._clipCount = 0, this._delay = 0, this._doneList = [], 
        this._onframeList = [], this._clipList = [];
    };
    Pc.prototype = {
        when: function(t, e) {
            var n = this._tracks;
            for (var i in e) if (e.hasOwnProperty(i)) {
                if (!n[i]) {
                    n[i] = [];
                    var r = this._getter(this._target, i);
                    if (null == r) continue;
                    0 !== t && n[i].push({
                        time: 0,
                        value: Jt(r)
                    });
                }
                n[i].push({
                    time: t,
                    value: e[i]
                });
            }
            return this;
        },
        during: function(t) {
            return this._onframeList.push(t), this;
        },
        pause: function() {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
            this._paused = !0;
        },
        resume: function() {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
            this._paused = !1;
        },
        isPaused: function() {
            return !!this._paused;
        },
        _doneCallback: function() {
            this._tracks = {}, this._clipList.length = 0;
            for (var t = this._doneList, e = t.length, n = 0; e > n; n++) t[n].call(this);
        },
        start: function(t, e) {
            var n, i = this, r = 0;
            for (var a in this._tracks) if (this._tracks.hasOwnProperty(a)) {
                var o = ne(this, t, function() {
                    --r || i._doneCallback();
                }, this._tracks[a], a, e);
                o && (this._clipList.push(o), r++, this.animation && this.animation.addClip(o), 
                n = o);
            }
            if (n) {
                var s = n.onframe;
                n.onframe = function(t, e) {
                    s(t, e);
                    for (var n = 0; n < i._onframeList.length; n++) i._onframeList[n](t, e);
                };
            }
            return r || this._doneCallback(), this;
        },
        stop: function(t) {
            for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {
                var r = e[i];
                t && r.onframe(this._target, 1), n && n.removeClip(r);
            }
            e.length = 0;
        },
        delay: function(t) {
            return this._delay = t, this;
        },
        done: function(t) {
            return t && this._doneList.push(t), this;
        },
        getClips: function() {
            return this._clipList;
        }
    };
    var Lc = 1;
    "undefined" != typeof window && (Lc = Math.max(window.devicePixelRatio || 1, 1));
    var Oc = Lc, Ec = function() {}, zc = Ec, Rc = function() {
        this.animators = [];
    };
    Rc.prototype = {
        constructor: Rc,
        animate: function(t, e) {
            var n, i = !1, r = this, a = this.__zr;
            if (t) {
                var o = t.split("."), s = r;
                i = "shape" === o[0];
                for (var l = 0, u = o.length; u > l; l++) s && (s = s[o[l]]);
                s && (n = s);
            } else n = r;
            {
                if (n) {
                    var c = r.animators, d = new Pc(n, e);
                    return d.during(function() {
                        r.dirty(i);
                    }).done(function() {
                        c.splice(h(c, d), 1);
                    }), c.push(d), a && a.animation.addAnimator(d), d;
                }
                zc('Property "' + t + '" is not existed in element ' + r.id);
            }
        },
        stopAnimation: function(t) {
            for (var e = this.animators, n = e.length, i = 0; n > i; i++) e[i].stop(t);
            return e.length = 0, this;
        },
        animateTo: function(t, e, n, i, r, a) {
            ie(this, t, e, n, i, r, a);
        },
        animateFrom: function(t, e, n, i, r, a) {
            ie(this, t, e, n, i, r, a, !0);
        }
    };
    var Nc = function(t) {
        fc.call(this, t), tc.call(this, t), Rc.call(this, t), this.id = t.id || Du();
    };
    Nc.prototype = {
        type: "element",
        name: "",
        __zr: null,
        ignore: !1,
        clipPath: null,
        isGroup: !1,
        drift: function(t, e) {
            switch (this.draggable) {
              case "horizontal":
                e = 0;
                break;

              case "vertical":
                t = 0;
            }
            var n = this.transform;
            n || (n = this.transform = [ 1, 0, 0, 1, 0, 0 ]), n[4] += t, n[5] += e, this.decomposeTransform(), 
            this.dirty(!1);
        },
        beforeUpdate: function() {},
        afterUpdate: function() {},
        update: function() {
            this.updateTransform();
        },
        traverse: function() {},
        attrKV: function(t, e) {
            if ("position" === t || "scale" === t || "origin" === t) {
                if (e) {
                    var n = this[t];
                    n || (n = this[t] = []), n[0] = e[0], n[1] = e[1];
                }
            } else this[t] = e;
        },
        hide: function() {
            this.ignore = !0, this.__zr && this.__zr.refresh();
        },
        show: function() {
            this.ignore = !1, this.__zr && this.__zr.refresh();
        },
        attr: function(t, e) {
            if ("string" == typeof t) this.attrKV(t, e); else if (b(t)) for (var n in t) t.hasOwnProperty(n) && this.attrKV(n, t[n]);
            return this.dirty(!1), this;
        },
        setClipPath: function(t) {
            var e = this.__zr;
            e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), 
            this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1);
        },
        removeClipPath: function() {
            var t = this.clipPath;
            t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, 
            this.clipPath = null, this.dirty(!1));
        },
        addSelfToZr: function(t) {
            this.__zr = t;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
            this.clipPath && this.clipPath.addSelfToZr(t);
        },
        removeSelfFromZr: function(t) {
            this.__zr = null;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
            this.clipPath && this.clipPath.removeSelfFromZr(t);
        }
    }, c(Nc, Rc), c(Nc, fc), c(Nc, tc);
    var Bc = K, Fc = Math.min, Vc = Math.max;
    oe.prototype = {
        constructor: oe,
        union: function(t) {
            var e = Fc(t.x, this.x), n = Fc(t.y, this.y);
            this.width = Vc(t.x + t.width, this.x + this.width) - e, this.height = Vc(t.y + t.height, this.y + this.height) - n, 
            this.x = e, this.y = n;
        },
        applyTransform: function() {
            var t = [], e = [], n = [], i = [];
            return function(r) {
                if (r) {
                    t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, 
                    Bc(t, t, r), Bc(e, e, r), Bc(n, n, r), Bc(i, i, r), this.x = Fc(t[0], e[0], n[0], i[0]), 
                    this.y = Fc(t[1], e[1], n[1], i[1]);
                    var a = Vc(t[0], e[0], n[0], i[0]), o = Vc(t[1], e[1], n[1], i[1]);
                    this.width = a - this.x, this.height = o - this.y;
                }
            };
        }(),
        calculateTransform: function(t) {
            var e = this, n = t.width / e.width, i = t.height / e.height, r = mt();
            return wt(r, r, [ -e.x, -e.y ]), Mt(r, r, [ n, i ]), wt(r, r, [ t.x, t.y ]), r;
        },
        intersect: function(t) {
            if (!t) return !1;
            t instanceof oe || (t = oe.create(t));
            var e = this, n = e.x, i = e.x + e.width, r = e.y, a = e.y + e.height, o = t.x, s = t.x + t.width, l = t.y, h = t.y + t.height;
            return !(o > i || n > s || l > a || r > h);
        },
        contain: function(t, e) {
            var n = this;
            return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height;
        },
        clone: function() {
            return new oe(this.x, this.y, this.width, this.height);
        },
        copy: function(t) {
            this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height;
        },
        plain: function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
        }
    }, oe.create = function(t) {
        return new oe(t.x, t.y, t.width, t.height);
    };
    var Wc = function(t) {
        t = t || {}, Nc.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
        this._children = [], this.__storage = null, this.__dirty = !0;
    };
    Wc.prototype = {
        constructor: Wc,
        isGroup: !0,
        type: "group",
        silent: !1,
        children: function() {
            return this._children.slice();
        },
        childAt: function(t) {
            return this._children[t];
        },
        childOfName: function(t) {
            for (var e = this._children, n = 0; n < e.length; n++) if (e[n].name === t) return e[n];
        },
        childCount: function() {
            return this._children.length;
        },
        add: function(t) {
            return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), 
            this;
        },
        addBefore: function(t, e) {
            if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var n = this._children, i = n.indexOf(e);
                i >= 0 && (n.splice(i, 0, t), this._doAdd(t));
            }
            return this;
        },
        _doAdd: function(t) {
            t.parent && t.parent.remove(t), t.parent = this;
            var e = this.__storage, n = this.__zr;
            e && e !== t.__storage && (e.addToStorage(t), t instanceof Wc && t.addChildrenToStorage(e)), 
            n && n.refresh();
        },
        remove: function(t) {
            var e = this.__zr, n = this.__storage, i = this._children, r = h(i, t);
            return 0 > r ? this : (i.splice(r, 1), t.parent = null, n && (n.delFromStorage(t), 
            t instanceof Wc && t.delChildrenFromStorage(n)), e && e.refresh(), this);
        },
        removeAll: function() {
            var t, e, n = this._children, i = this.__storage;
            for (e = 0; e < n.length; e++) t = n[e], i && (i.delFromStorage(t), t instanceof Wc && t.delChildrenFromStorage(i)), 
            t.parent = null;
            return n.length = 0, this;
        },
        eachChild: function(t, e) {
            for (var n = this._children, i = 0; i < n.length; i++) {
                var r = n[i];
                t.call(e, r, i);
            }
            return this;
        },
        traverse: function(t, e) {
            for (var n = 0; n < this._children.length; n++) {
                var i = this._children[n];
                t.call(e, i), "group" === i.type && i.traverse(t, e);
            }
            return this;
        },
        addChildrenToStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                t.addToStorage(n), n instanceof Wc && n.addChildrenToStorage(t);
            }
        },
        delChildrenFromStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                t.delFromStorage(n), n instanceof Wc && n.delChildrenFromStorage(t);
            }
        },
        dirty: function() {
            return this.__dirty = !0, this.__zr && this.__zr.refresh(), this;
        },
        getBoundingRect: function(t) {
            for (var e = null, n = new oe(0, 0, 0, 0), i = t || this._children, r = [], a = 0; a < i.length; a++) {
                var o = i[a];
                if (!o.ignore && !o.invisible) {
                    var s = o.getBoundingRect(), l = o.getLocalTransform(r);
                    l ? (n.copy(s), n.applyTransform(l), (e = e || n.clone()).union(n)) : (e = e || s.clone()).union(s);
                }
            }
            return e || n;
        }
    }, u(Wc, Nc);
    var Hc = 32, Gc = 7, Zc = function() {
        this._roots = [], this._displayList = [], this._displayListLen = 0;
    };
    Zc.prototype = {
        constructor: Zc,
        traverse: function(t, e) {
            for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e);
        },
        getDisplayList: function(t, e) {
            return e = e || !1, t && this.updateDisplayList(e), this._displayList;
        },
        updateDisplayList: function(t) {
            this._displayListLen = 0;
            for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++) this._updateAndAddDisplayable(e[i], null, t);
            n.length = this._displayListLen, Lu.canvasSupported && pe(n, ge);
        },
        _updateAndAddDisplayable: function(t, e, n) {
            if (!t.ignore || n) {
                t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                var i = t.clipPath;
                if (i) {
                    e = e ? e.slice() : [];
                    for (var r = i, a = t; r; ) r.parent = a, r.updateTransform(), e.push(r), a = r, 
                    r = r.clipPath;
                }
                if (t.isGroup) {
                    for (var o = t._children, s = 0; s < o.length; s++) {
                        var l = o[s];
                        t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, n);
                    }
                    t.__dirty = !1;
                } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t;
            }
        },
        addRoot: function(t) {
            t.__storage !== this && (t instanceof Wc && t.addChildrenToStorage(this), this.addToStorage(t), 
            this._roots.push(t));
        },
        delRoot: function(t) {
            if (null == t) {
                for (n = 0; n < this._roots.length; n++) {
                    var e = this._roots[n];
                    e instanceof Wc && e.delChildrenFromStorage(this);
                }
                return this._roots = [], this._displayList = [], void (this._displayListLen = 0);
            }
            if (t instanceof Array) for (var n = 0, i = t.length; i > n; n++) this.delRoot(t[n]); else {
                var r = h(this._roots, t);
                r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof Wc && t.delChildrenFromStorage(this));
            }
        },
        addToStorage: function(t) {
            return t && (t.__storage = this, t.dirty(!1)), this;
        },
        delFromStorage: function(t) {
            return t && (t.__storage = null), this;
        },
        dispose: function() {
            this._renderList = this._roots = null;
        },
        displayableSortFunc: ge
    };
    var Xc = {
        shadowBlur: 1,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        textShadowBlur: 1,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
        textBoxShadowBlur: 1,
        textBoxShadowOffsetX: 1,
        textBoxShadowOffsetY: 1
    }, qc = function(t, e, n) {
        return Xc.hasOwnProperty(e) ? n *= t.dpr : n;
    }, Yc = {
        NONE: 0,
        STYLE_BIND: 1,
        PLAIN_TEXT: 2
    }, jc = 9, Uc = [ [ "shadowBlur", 0 ], [ "shadowOffsetX", 0 ], [ "shadowOffsetY", 0 ], [ "shadowColor", "#000" ], [ "lineCap", "butt" ], [ "lineJoin", "miter" ], [ "miterLimit", 10 ] ], $c = function(t) {
        this.extendFrom(t, !1);
    };
    $c.prototype = {
        constructor: $c,
        fill: "#000",
        stroke: null,
        opacity: 1,
        fillOpacity: null,
        strokeOpacity: null,
        lineDash: null,
        lineDashOffset: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        lineWidth: 1,
        strokeNoScale: !1,
        text: null,
        font: null,
        textFont: null,
        fontStyle: null,
        fontWeight: null,
        fontSize: null,
        fontFamily: null,
        textTag: null,
        textFill: "#000",
        textStroke: null,
        textWidth: null,
        textHeight: null,
        textStrokeWidth: 0,
        textLineHeight: null,
        textPosition: "inside",
        textRect: null,
        textOffset: null,
        textAlign: null,
        textVerticalAlign: null,
        textDistance: 5,
        textShadowColor: "transparent",
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        textBoxShadowColor: "transparent",
        textBoxShadowBlur: 0,
        textBoxShadowOffsetX: 0,
        textBoxShadowOffsetY: 0,
        transformText: !1,
        textRotation: 0,
        textOrigin: null,
        textBackgroundColor: null,
        textBorderColor: null,
        textBorderWidth: 0,
        textBorderRadius: 0,
        textPadding: null,
        rich: null,
        truncate: null,
        blend: null,
        bind: function(t, e, n) {
            var i = this, r = n && n.style, a = !r || t.__attrCachedBy !== Yc.STYLE_BIND;
            t.__attrCachedBy = Yc.STYLE_BIND;
            for (var o = 0; o < Uc.length; o++) {
                var s = Uc[o], l = s[0];
                (a || i[l] !== r[l]) && (t[l] = qc(t, l, i[l] || s[1]));
            }
            if ((a || i.fill !== r.fill) && (t.fillStyle = i.fill), (a || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), 
            (a || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), 
            (a || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), 
            this.hasStroke()) {
                var h = i.lineWidth;
                t.lineWidth = h / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);
            }
        },
        hasFill: function() {
            var t = this.fill;
            return null != t && "none" !== t;
        },
        hasStroke: function() {
            var t = this.stroke;
            return null != t && "none" !== t && this.lineWidth > 0;
        },
        extendFrom: function(t, e) {
            if (t) for (var n in t) !t.hasOwnProperty(n) || !0 !== e && (!1 === e ? this.hasOwnProperty(n) : null == t[n]) || (this[n] = t[n]);
        },
        set: function(t, e) {
            "string" == typeof t ? this[t] = e : this.extendFrom(t, !0);
        },
        clone: function() {
            var t = new this.constructor();
            return t.extendFrom(this, !0), t;
        },
        getGradient: function(t, e, n) {
            for (var i = ("radial" === e.type ? me : ve)(t, e, n), r = e.colorStops, a = 0; a < r.length; a++) i.addColorStop(r[a].offset, r[a].color);
            return i;
        }
    };
    for (var Kc = $c.prototype, Qc = 0; Qc < Uc.length; Qc++) {
        var Jc = Uc[Qc];
        Jc[0] in Kc || (Kc[Jc[0]] = Jc[1]);
    }
    $c.getGradient = Kc.getGradient;
    var td = function(t, e) {
        this.image = t, this.repeat = e, this.type = "pattern";
    };
    td.prototype.getCanvasPattern = function(t) {
        return t.createPattern(this.image, this.repeat || "repeat");
    };
    var ed = function(t, e, n) {
        var i;
        n = n || Oc, "string" == typeof t ? i = _e(t, e, n) : b(t) && (i = t, t = i.id), 
        this.id = t, this.dom = i;
        var r = i.style;
        r && (i.onselectstart = ye, r["-webkit-user-select"] = "none", r["user-select"] = "none", 
        r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", 
        r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, 
        this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, 
        this.lastFrameAlpha = .7, this.dpr = n;
    };
    ed.prototype = {
        constructor: ed,
        __dirty: !0,
        __used: !1,
        __drawIndex: 0,
        __startIndex: 0,
        __endIndex: 0,
        incremental: !1,
        getElementCount: function() {
            return this.__endIndex - this.__startIndex;
        },
        initContext: function() {
            this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
        },
        createBackBuffer: function() {
            var t = this.dpr;
            this.domBack = _e("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 
            1 !== t && this.ctxBack.scale(t, t);
        },
        resize: function(t, e) {
            var n = this.dpr, i = this.dom, r = i.style, a = this.domBack;
            r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, 
            a && (a.width = t * n, a.height = e * n, 1 !== n && this.ctxBack.scale(n, n));
        },
        clear: function(t, e) {
            var n = this.dom, i = this.ctx, r = n.width, a = n.height, e = e || this.clearColor, o = this.motionBlur && !t, s = this.lastFrameAlpha, l = this.dpr;
            if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", 
            this.ctxBack.drawImage(n, 0, 0, r / l, a / l)), i.clearRect(0, 0, r, a), e && "transparent" !== e) {
                var h;
                e.colorStops ? (h = e.__canvasGradient || $c.getGradient(i, e, {
                    x: 0,
                    y: 0,
                    width: r,
                    height: a
                }), e.__canvasGradient = h) : e.image && (h = td.prototype.getCanvasPattern.call(e, i)), 
                i.save(), i.fillStyle = h || e, i.fillRect(0, 0, r, a), i.restore();
            }
            if (o) {
                var u = this.domBack;
                i.save(), i.globalAlpha = s, i.drawImage(u, 0, 0, r, a), i.restore();
            }
        }
    };
    var nd = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t) {
        setTimeout(t, 16);
    }, id = new bc(50), rd = {}, ad = 0, od = 5e3, sd = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g, ld = "12px sans-serif", hd = {};
    hd.measureText = function(t, e) {
        var n = l();
        return n.font = e || ld, n.measureText(t);
    };
    var ud = ld, cd = {
        left: 1,
        right: 1,
        center: 1
    }, dd = {
        top: 1,
        bottom: 1,
        middle: 1
    }, fd = [ [ "textShadowBlur", "shadowBlur", 0 ], [ "textShadowOffsetX", "shadowOffsetX", 0 ], [ "textShadowOffsetY", "shadowOffsetY", 0 ], [ "textShadowColor", "shadowColor", "transparent" ] ], pd = new oe(), gd = function() {};
    gd.prototype = {
        constructor: gd,
        drawRectText: function(t, e) {
            var n = this.style;
            e = n.textRect || e, this.__dirty && He(n);
            var i = n.text;
            if (null != i && (i += ""), on(i, n)) {
                t.save();
                var r = this.transform;
                n.transformText ? this.setTransform(t) : r && (pd.copy(e), pd.applyTransform(r), 
                e = pd), Ze(this, t, i, n, e, jc), t.restore();
            }
        }
    }, sn.prototype = {
        constructor: sn,
        type: "displayable",
        __dirty: !0,
        invisible: !1,
        z: 0,
        z2: 0,
        zlevel: 0,
        draggable: !1,
        dragging: !1,
        silent: !1,
        culling: !1,
        cursor: "pointer",
        rectHover: !1,
        progressive: !1,
        incremental: !1,
        globalScaleRatio: 1,
        beforeBrush: function() {},
        afterBrush: function() {},
        brush: function() {},
        getBoundingRect: function() {},
        contain: function(t, e) {
            return this.rectContain(t, e);
        },
        traverse: function(t, e) {
            t.call(e, this);
        },
        rectContain: function(t, e) {
            var n = this.transformCoordToLocal(t, e);
            return this.getBoundingRect().contain(n[0], n[1]);
        },
        dirty: function() {
            this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh();
        },
        animateStyle: function(t) {
            return this.animate("style", t);
        },
        attrKV: function(t, e) {
            "style" !== t ? Nc.prototype.attrKV.call(this, t, e) : this.style.set(e);
        },
        setStyle: function(t, e) {
            return this.style.set(t, e), this.dirty(!1), this;
        },
        useStyle: function(t) {
            return this.style = new $c(t, this), this.dirty(!1), this;
        }
    }, u(sn, Nc), c(sn, gd), ln.prototype = {
        constructor: ln,
        type: "image",
        brush: function(t, e) {
            var n = this.style, i = n.image;
            n.bind(t, this, e);
            var r = this._image = we(i, this._image, this, this.onload);
            if (r && Me(r)) {
                var a = n.x || 0, o = n.y || 0, s = n.width, l = n.height, h = r.width / r.height;
                if (null == s && null != l ? s = l * h : null == l && null != s ? l = s / h : null == s && null == l && (s = r.width, 
                l = r.height), this.setTransform(t), n.sWidth && n.sHeight) {
                    var u = n.sx || 0, c = n.sy || 0;
                    t.drawImage(r, u, c, n.sWidth, n.sHeight, a, o, s, l);
                } else if (n.sx && n.sy) {
                    var d = s - (u = n.sx), f = l - (c = n.sy);
                    t.drawImage(r, u, c, d, f, a, o, s, l);
                } else t.drawImage(r, a, o, s, l);
                null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
            }
        },
        getBoundingRect: function() {
            var t = this.style;
            return this._rect || (this._rect = new oe(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), 
            this._rect;
        }
    }, u(ln, sn);
    var vd = 314159, md = new oe(0, 0, 0, 0), yd = new oe(0, 0, 0, 0), _d = function(t, e, n) {
        this.type = "canvas";
        var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
        this._opts = n = o({}, n || {}), this.dpr = n.devicePixelRatio || Oc, this._singleCanvas = i, 
        this.root = t;
        var r = t.style;
        r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", 
        t.innerHTML = ""), this.storage = e;
        var a = this._zlevelList = [], s = this._layers = {};
        if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {
            var l = t.width, h = t.height;
            null != n.width && (l = n.width), null != n.height && (h = n.height), this.dpr = n.devicePixelRatio || 1, 
            t.width = l * this.dpr, t.height = h * this.dpr, this._width = l, this._height = h;
            var u = new ed(t, this, this.dpr);
            u.__builtin__ = !0, u.initContext(), s[vd] = u, u.zlevel = vd, a.push(vd), this._domRoot = t;
        } else {
            this._width = this._getSize(0), this._height = this._getSize(1);
            var c = this._domRoot = pn(this._width, this._height);
            t.appendChild(c);
        }
        this._hoverlayer = null, this._hoverElements = [];
    };
    _d.prototype = {
        constructor: _d,
        getType: function() {
            return "canvas";
        },
        isSingleCanvas: function() {
            return this._singleCanvas;
        },
        getViewportRoot: function() {
            return this._domRoot;
        },
        getViewportRootOffset: function() {
            var t = this.getViewportRoot();
            return t ? {
                offsetLeft: t.offsetLeft || 0,
                offsetTop: t.offsetTop || 0
            } : void 0;
        },
        refresh: function(t) {
            var e = this.storage.getDisplayList(!0), n = this._zlevelList;
            this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);
            for (var i = 0; i < n.length; i++) {
                var r = n[i], a = this._layers[r];
                if (!a.__builtin__ && a.refresh) {
                    var o = 0 === i ? this._backgroundColor : null;
                    a.refresh(o);
                }
            }
            return this.refreshHover(), this;
        },
        addHover: function(t, e) {
            if (!t.__hoverMir) {
                var n = new t.constructor({
                    style: t.style,
                    shape: t.shape,
                    z: t.z,
                    z2: t.z2,
                    silent: t.silent
                });
                return n.__from = t, t.__hoverMir = n, e && n.setStyle(e), this._hoverElements.push(n), 
                n;
            }
        },
        removeHover: function(t) {
            var e = t.__hoverMir, n = this._hoverElements, i = h(n, e);
            i >= 0 && n.splice(i, 1), t.__hoverMir = null;
        },
        clearHover: function() {
            for (var t = this._hoverElements, e = 0; e < t.length; e++) {
                var n = t[e].__from;
                n && (n.__hoverMir = null);
            }
            t.length = 0;
        },
        refreshHover: function() {
            var t = this._hoverElements, e = t.length, n = this._hoverlayer;
            if (n && n.clear(), e) {
                pe(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(1e5));
                var i = {};
                n.ctx.save();
                for (var r = 0; e > r; ) {
                    var a = t[r], o = a.__from;
                    o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, 
                    a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t.splice(r, 1), 
                    o.__hoverMir = null, e--);
                }
                n.ctx.restore();
            }
        },
        getHoverLayer: function() {
            return this.getLayer(1e5);
        },
        _paintList: function(t, e, n) {
            if (this._redrawId === n) {
                e = e || !1, this._updateLayerStatus(t);
                var i = this._doPaintList(t, e);
                if (this._needsManuallyCompositing && this._compositeManually(), !i) {
                    var r = this;
                    nd(function() {
                        r._paintList(t, e, n);
                    });
                }
            }
        },
        _compositeManually: function() {
            var t = this.getLayer(vd).ctx, e = this._domRoot.width, n = this._domRoot.height;
            t.clearRect(0, 0, e, n), this.eachBuiltinLayer(function(i) {
                i.virtual && t.drawImage(i.dom, 0, 0, e, n);
            });
        },
        _doPaintList: function(t, e) {
            for (var n = [], i = 0; i < this._zlevelList.length; i++) {
                var r = this._zlevelList[i];
                (s = this._layers[r]).__builtin__ && s !== this._hoverlayer && (s.__dirty || e) && n.push(s);
            }
            for (var a = !0, o = 0; o < n.length; o++) {
                var s = n[o], l = s.ctx, h = {};
                l.save();
                var u = e ? s.__startIndex : s.__drawIndex, c = !e && s.incremental && Date.now, d = c && Date.now(), p = s.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
                if (s.__startIndex === s.__endIndex) s.clear(!1, p); else if (u === s.__startIndex) {
                    var g = t[u];
                    g.incremental && g.notClear && !e || s.clear(!1, p);
                }
                -1 === u && (console.error("For some unknown reason. drawIndex is -1"), u = s.__startIndex);
                for (var v = u; v < s.__endIndex; v++) {
                    var m = t[v];
                    if (this._doPaintEl(m, s, e, h), m.__dirty = m.__dirtyText = !1, c && Date.now() - d > 15) break;
                }
                s.__drawIndex = v, s.__drawIndex < s.__endIndex && (a = !1), h.prevElClipPaths && l.restore(), 
                l.restore();
            }
            return Lu.wxa && f(this._layers, function(t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw();
            }), a;
        },
        _doPaintEl: function(t, e, n, i) {
            var r = e.ctx, a = t.transform;
            if (!(!e.__dirty && !n || t.invisible || 0 === t.style.opacity || a && !a[0] && !a[3] || t.culling && cn(t, this._width, this._height))) {
                var o = t.__clipPaths;
                (!i.prevElClipPaths || dn(o, i.prevElClipPaths)) && (i.prevElClipPaths && (e.ctx.restore(), 
                i.prevElClipPaths = null, i.prevEl = null), o && (r.save(), fn(o, r), i.prevElClipPaths = o)), 
                t.beforeBrush && t.beforeBrush(r), t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r);
            }
        },
        getLayer: function(t, e) {
            this._singleCanvas && !this._needsManuallyCompositing && (t = vd);
            var n = this._layers[t];
            return n || (n = new ed("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, 
            this._layerConfig[t] && r(n, this._layerConfig[t], !0), e && (n.virtual = e), this.insertLayer(t, n), 
            n.initContext()), n;
        },
        insertLayer: function(t, e) {
            var n = this._layers, i = this._zlevelList, r = i.length, a = null, o = -1, s = this._domRoot;
            if (n[t]) zc("ZLevel " + t + " has been used already"); else if (un(e)) {
                if (r > 0 && t > i[0]) {
                    for (o = 0; r - 1 > o && !(i[o] < t && i[o + 1] > t); o++) ;
                    a = n[i[o]];
                }
                if (i.splice(o + 1, 0, t), n[t] = e, !e.virtual) if (a) {
                    var l = a.dom;
                    l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom);
                } else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);
            } else zc("Layer of zlevel " + t + " is not valid");
        },
        eachLayer: function(t, e) {
            var n, i, r = this._zlevelList;
            for (i = 0; i < r.length; i++) n = r[i], t.call(e, this._layers[n], n);
        },
        eachBuiltinLayer: function(t, e) {
            var n, i, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) i = a[r], (n = this._layers[i]).__builtin__ && t.call(e, n, i);
        },
        eachOtherLayer: function(t, e) {
            var n, i, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) i = a[r], (n = this._layers[i]).__builtin__ || t.call(e, n, i);
        },
        getLayers: function() {
            return this._layers;
        },
        _updateLayerStatus: function(t) {
            function e(t) {
                n && (n.__endIndex !== t && (n.__dirty = !0), n.__endIndex = t);
            }
            if (this.eachBuiltinLayer(function(t) {
                t.__dirty = t.__used = !1;
            }), this._singleCanvas) for (r = 1; r < t.length; r++) if ((o = t[r]).zlevel !== t[r - 1].zlevel || o.incremental) {
                this._needsManuallyCompositing = !0;
                break;
            }
            for (var n = null, i = 0, r = 0; r < t.length; r++) {
                var a, o = t[r], s = o.zlevel;
                o.incremental ? (a = this.getLayer(s + .001, this._needsManuallyCompositing), a.incremental = !0, 
                i = 1) : a = this.getLayer(s + (i > 0 ? .01 : 0), this._needsManuallyCompositing), 
                a.__builtin__ || zc("ZLevel " + s + " has been used by unkown layer " + a.id), a !== n && (a.__used = !0, 
                a.__startIndex !== r && (a.__dirty = !0), a.__startIndex = r, a.__drawIndex = a.incremental ? -1 : r, 
                e(r), n = a), o.__dirty && (a.__dirty = !0, a.incremental && a.__drawIndex < 0 && (a.__drawIndex = r));
            }
            e(r), this.eachBuiltinLayer(function(t) {
                !t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), 
                t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);
            });
        },
        clear: function() {
            return this.eachBuiltinLayer(this._clearLayer), this;
        },
        _clearLayer: function(t) {
            t.clear();
        },
        setBackgroundColor: function(t) {
            this._backgroundColor = t;
        },
        configLayer: function(t, e) {
            if (e) {
                var n = this._layerConfig;
                n[t] ? r(n[t], e, !0) : n[t] = e;
                for (var i = 0; i < this._zlevelList.length; i++) {
                    var a = this._zlevelList[i];
                    a !== t && a !== t + .01 || r(this._layers[a], n[t], !0);
                }
            }
        },
        delLayer: function(t) {
            var e = this._layers, n = this._zlevelList, i = e[t];
            i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(h(n, t), 1));
        },
        resize: function(t, e) {
            if (this._domRoot.style) {
                var n = this._domRoot;
                n.style.display = "none";
                var i = this._opts;
                if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), 
                e = this._getSize(1), n.style.display = "", this._width !== t || e !== this._height) {
                    n.style.width = t + "px", n.style.height = e + "px";
                    for (var r in this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);
                    f(this._progressiveLayers, function(n) {
                        n.resize(t, e);
                    }), this.refresh(!0);
                }
                this._width = t, this._height = e;
            } else {
                if (null == t || null == e) return;
                this._width = t, this._height = e, this.getLayer(vd).resize(t, e);
            }
            return this;
        },
        clearLayer: function(t) {
            var e = this._layers[t];
            e && e.clear();
        },
        dispose: function() {
            this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
        },
        getRenderedCanvas: function(t) {
            if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[vd].dom;
            var e = new ed("image", this, t.pixelRatio || this.dpr);
            if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
                this.refresh();
                var n = e.dom.width, i = e.dom.height, r = e.ctx;
                this.eachLayer(function(t) {
                    t.__builtin__ ? r.drawImage(t.dom, 0, 0, n, i) : t.renderToCanvas && (e.ctx.save(), 
                    t.renderToCanvas(e.ctx), e.ctx.restore());
                });
            } else for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
                var l = o[s];
                this._doPaintEl(l, e, !0, a);
            }
            return e.dom;
        },
        getWidth: function() {
            return this._width;
        },
        getHeight: function() {
            return this._height;
        },
        _getSize: function(t) {
            var e = this._opts, n = [ "width", "height" ][t], i = [ "clientWidth", "clientHeight" ][t], r = [ "paddingLeft", "paddingTop" ][t], a = [ "paddingRight", "paddingBottom" ][t];
            if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);
            var o = this.root, s = document.defaultView.getComputedStyle(o);
            return (o[i] || hn(s[n]) || hn(o.style[n])) - (hn(s[r]) || 0) - (hn(s[a]) || 0) | 0;
        },
        pathToImage: function(t, e) {
            e = e || this.dpr;
            var n = document.createElement("canvas"), i = n.getContext("2d"), r = t.getBoundingRect(), a = t.style, o = a.shadowBlur * e, s = a.shadowOffsetX * e, l = a.shadowOffsetY * e, h = a.hasStroke() ? a.lineWidth : 0, u = Math.max(h / 2, -s + o), c = Math.max(h / 2, s + o), d = Math.max(h / 2, -l + o), f = Math.max(h / 2, l + o), p = r.width + u + c, g = r.height + d + f;
            n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;
            var v = {
                position: t.position,
                rotation: t.rotation,
                scale: t.scale
            };
            t.position = [ u - r.x, d - r.y ], t.rotation = 0, t.scale = [ 1, 1 ], t.updateTransform(), 
            t && t.brush(i);
            var m = new ln({
                style: {
                    x: 0,
                    y: 0,
                    image: n
                }
            });
            return null != v.position && (m.position = t.position = v.position), null != v.rotation && (m.rotation = t.rotation = v.rotation), 
            null != v.scale && (m.scale = t.scale = v.scale), m;
        }
    };
    var xd = function(t) {
        t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function() {}, 
        this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, 
        this._paused = !1, tc.call(this);
    };
    xd.prototype = {
        constructor: xd,
        addClip: function(t) {
            this._clips.push(t);
        },
        addAnimator: function(t) {
            t.animation = this;
            for (var e = t.getClips(), n = 0; n < e.length; n++) this.addClip(e[n]);
        },
        removeClip: function(t) {
            var e = h(this._clips, t);
            e >= 0 && this._clips.splice(e, 1);
        },
        removeAnimator: function(t) {
            for (var e = t.getClips(), n = 0; n < e.length; n++) this.removeClip(e[n]);
            t.animation = null;
        },
        _update: function() {
            for (var t = new Date().getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], a = [], o = 0; i > o; o++) {
                var s = n[o], l = s.step(t, e);
                l && (r.push(l), a.push(s));
            }
            for (o = 0; i > o; ) n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;
            i = r.length;
            for (o = 0; i > o; o++) a[o].fire(r[o]);
            this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update();
        },
        _startLoop: function() {
            function t() {
                e._running && (nd(t), !e._paused && e._update());
            }
            var e = this;
            this._running = !0, nd(t);
        },
        start: function() {
            this._time = new Date().getTime(), this._pausedTime = 0, this._startLoop();
        },
        stop: function() {
            this._running = !1;
        },
        pause: function() {
            this._paused || (this._pauseStart = new Date().getTime(), this._paused = !0);
        },
        resume: function() {
            this._paused && (this._pausedTime += new Date().getTime() - this._pauseStart, this._paused = !1);
        },
        clear: function() {
            this._clips = [];
        },
        isFinished: function() {
            return !this._clips.length;
        },
        animate: function(t, e) {
            var n = new Pc(t, (e = e || {}).loop, e.getter, e.setter);
            return this.addAnimator(n), n;
        }
    }, c(xd, tc);
    var wd = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], bd = [ "touchstart", "touchend", "touchmove" ], Md = {
        pointerdown: 1,
        pointerup: 1,
        pointermove: 1,
        pointerout: 1
    }, Sd = p(wd, function(t) {
        var e = t.replace("mouse", "pointer");
        return Md[e] ? e : t;
    }), Td = {
        mousemove: function(t) {
            t = st(this.dom, t), this.trigger("mousemove", t);
        },
        mouseout: function(t) {
            var e = (t = st(this.dom, t)).toElement || t.relatedTarget;
            if (e !== this.dom) for (;e && 9 !== e.nodeType; ) {
                if (e === this.dom) return;
                e = e.parentNode;
            }
            this.trigger("mouseout", t);
        },
        touchstart: function(t) {
            (t = st(this.dom, t)).zrByTouch = !0, this._lastTouchMoment = new Date(), this.handler.processGesture(this, t, "start"), 
            Td.mousemove.call(this, t), Td.mousedown.call(this, t), vn(this);
        },
        touchmove: function(t) {
            (t = st(this.dom, t)).zrByTouch = !0, this.handler.processGesture(this, t, "change"), 
            Td.mousemove.call(this, t), vn(this);
        },
        touchend: function(t) {
            (t = st(this.dom, t)).zrByTouch = !0, this.handler.processGesture(this, t, "end"), 
            Td.mouseup.call(this, t), +new Date() - this._lastTouchMoment < 300 && Td.click.call(this, t), 
            vn(this);
        },
        pointerdown: function(t) {
            Td.mousedown.call(this, t);
        },
        pointermove: function(t) {
            mn(t) || Td.mousemove.call(this, t);
        },
        pointerup: function(t) {
            Td.mouseup.call(this, t);
        },
        pointerout: function(t) {
            mn(t) || Td.mouseout.call(this, t);
        }
    };
    f([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(t) {
        Td[t] = function(e) {
            e = st(this.dom, e), this.trigger(t, e);
        };
    });
    var Cd = _n.prototype;
    Cd.dispose = function() {
        for (var t = wd.concat(bd), e = 0; e < t.length; e++) {
            var n = t[e];
            ht(this.dom, gn(n), this._handlers[n]);
        }
    }, Cd.setCursor = function(t) {
        this.dom.style && (this.dom.style.cursor = t || "default");
    }, c(_n, tc);
    var Id = !Lu.canvasSupported, Ad = {
        canvas: _d
    }, kd = {}, Dd = function(t, e, n) {
        n = n || {}, this.dom = e, this.id = t;
        var i = this, r = new Zc(), a = n.renderer;
        if (Id) {
            if (!Ad.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
            a = "vml";
        } else a && Ad[a] || (a = "canvas");
        var o = new Ad[a](e, r, n, t);
        this.storage = r, this.painter = o;
        var s = Lu.node || Lu.worker ? null : new _n(o.getViewportRoot());
        this.handler = new lc(r, o, s, o.root), this.animation = new xd({
            stage: {
                update: m(this.flush, this)
            }
        }), this.animation.start(), this._needsRefresh;
        var l = r.delFromStorage, h = r.addToStorage;
        r.delFromStorage = function(t) {
            l.call(r, t), t && t.removeSelfFromZr(i);
        }, r.addToStorage = function(t) {
            h.call(r, t), t.addSelfToZr(i);
        };
    };
    Dd.prototype = {
        constructor: Dd,
        getId: function() {
            return this.id;
        },
        add: function(t) {
            this.storage.addRoot(t), this._needsRefresh = !0;
        },
        remove: function(t) {
            this.storage.delRoot(t), this._needsRefresh = !0;
        },
        configLayer: function(t, e) {
            this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0;
        },
        setBackgroundColor: function(t) {
            this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0;
        },
        refreshImmediately: function() {
            this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1;
        },
        refresh: function() {
            this._needsRefresh = !0;
        },
        flush: function() {
            var t;
            this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, 
            this.refreshHoverImmediately()), t && this.trigger("rendered");
        },
        addHover: function(t, e) {
            if (this.painter.addHover) {
                var n = this.painter.addHover(t, e);
                return this.refreshHover(), n;
            }
        },
        removeHover: function(t) {
            this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover());
        },
        clearHover: function() {
            this.painter.clearHover && (this.painter.clearHover(), this.refreshHover());
        },
        refreshHover: function() {
            this._needsRefreshHover = !0;
        },
        refreshHoverImmediately: function() {
            this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover();
        },
        resize: function(t) {
            t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize();
        },
        clearAnimation: function() {
            this.animation.clear();
        },
        getWidth: function() {
            return this.painter.getWidth();
        },
        getHeight: function() {
            return this.painter.getHeight();
        },
        pathToImage: function(t, e) {
            return this.painter.pathToImage(t, e);
        },
        setCursorStyle: function(t) {
            this.handler.setCursorStyle(t);
        },
        findHover: function(t, e) {
            return this.handler.findHover(t, e);
        },
        on: function(t, e, n) {
            this.handler.on(t, e, n);
        },
        off: function(t, e) {
            this.handler.off(t, e);
        },
        trigger: function(t, e) {
            this.handler.trigger(t, e);
        },
        clear: function() {
            this.storage.delRoot(), this.painter.clear();
        },
        dispose: function() {
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), 
            this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, 
            wn(this.id);
        }
    };
    var Pd = (Object.freeze || Object)({
        version: "4.0.7",
        init: xn,
        dispose: function(t) {
            if (t) t.dispose(); else {
                for (var e in kd) kd.hasOwnProperty(e) && kd[e].dispose();
                kd = {};
            }
            return this;
        },
        getInstance: function(t) {
            return kd[t];
        },
        registerPainter: function(t, e) {
            Ad[t] = e;
        }
    }), Ld = f, Od = b, Ed = _, zd = "series\0", Rd = [ "fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding" ], Nd = 0, Bd = ".", Fd = "___EC__COMPONENT__CONTAINER___", Vd = 0, Wd = function(t) {
        for (var e = 0; e < t.length; e++) t[e][1] || (t[e][1] = t[e][0]);
        return function(e, n, i) {
            for (var r = {}, a = 0; a < t.length; a++) {
                var o = t[a][1];
                if (!(n && h(n, o) >= 0 || i && h(i, o) < 0)) {
                    var s = e.getShallow(o);
                    null != s && (r[t[a][0]] = s);
                }
            }
            return r;
        };
    }, Hd = Wd([ [ "lineWidth", "width" ], [ "stroke", "color" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ] ]), Gd = {
        getLineStyle: function(t) {
            var e = Hd(this, t), n = this.getLineDash(e.lineWidth);
            return n && (e.lineDash = n), e;
        },
        getLineDash: function(t) {
            null == t && (t = 1);
            var e = this.get("type"), n = Math.max(t, 2), i = 4 * t;
            return "solid" === e || null == e ? null : "dashed" === e ? [ i, i ] : [ n, n ];
        }
    }, Zd = Wd([ [ "fill", "color" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "opacity" ], [ "shadowColor" ] ]), Xd = {
        getAreaStyle: function(t, e) {
            return Zd(this, t, e);
        }
    }, qd = Math.pow, Yd = Math.sqrt, jd = 1e-8, Ud = 1e-4, $d = Yd(3), Kd = 1 / 3, Qd = F(), Jd = F(), tf = F(), ef = Math.min, nf = Math.max, rf = Math.sin, af = Math.cos, of = 2 * Math.PI, sf = F(), lf = F(), hf = F(), uf = [], cf = [], df = {
        M: 1,
        L: 2,
        C: 3,
        Q: 4,
        A: 5,
        Z: 6,
        R: 7
    }, ff = [], pf = [], gf = [], vf = [], mf = Math.min, yf = Math.max, _f = Math.cos, xf = Math.sin, wf = Math.sqrt, bf = Math.abs, Mf = "undefined" != typeof Float32Array, Sf = function(t) {
        this._saveData = !t, this._saveData && (this.data = []), this._ctx = null;
    };
    Sf.prototype = {
        constructor: Sf,
        _xi: 0,
        _yi: 0,
        _x0: 0,
        _y0: 0,
        _ux: 0,
        _uy: 0,
        _len: 0,
        _lineDash: null,
        _dashOffset: 0,
        _dashIdx: 0,
        _dashSum: 0,
        setScale: function(t, e) {
            this._ux = bf(1 / Oc / t) || 0, this._uy = bf(1 / Oc / e) || 0;
        },
        getContext: function() {
            return this._ctx;
        },
        beginPath: function(t) {
            return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), 
            this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;
        },
        moveTo: function(t, e) {
            return this.addData(df.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, 
            this._y0 = e, this._xi = t, this._yi = e, this;
        },
        lineTo: function(t, e) {
            var n = bf(t - this._xi) > this._ux || bf(e - this._yi) > this._uy || this._len < 5;
            return this.addData(df.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), 
            n && (this._xi = t, this._yi = e), this;
        },
        bezierCurveTo: function(t, e, n, i, r, a) {
            return this.addData(df.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), 
            this._xi = r, this._yi = a, this;
        },
        quadraticCurveTo: function(t, e, n, i) {
            return this.addData(df.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), 
            this._xi = n, this._yi = i, this;
        },
        arc: function(t, e, n, i, r, a) {
            return this.addData(df.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), 
            this._xi = _f(r) * n + t, this._yi = xf(r) * n + e, this;
        },
        arcTo: function(t, e, n, i, r) {
            return this._ctx && this._ctx.arcTo(t, e, n, i, r), this;
        },
        rect: function(t, e, n, i) {
            return this._ctx && this._ctx.rect(t, e, n, i), this.addData(df.R, t, e, n, i), 
            this;
        },
        closePath: function() {
            this.addData(df.Z);
            var t = this._ctx, e = this._x0, n = this._y0;
            return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, 
            this._yi = n, this;
        },
        fill: function(t) {
            t && t.fill(), this.toStatic();
        },
        stroke: function(t) {
            t && t.stroke(), this.toStatic();
        },
        setLineDash: function(t) {
            if (t instanceof Array) {
                this._lineDash = t, this._dashIdx = 0;
                for (var e = 0, n = 0; n < t.length; n++) e += t[n];
                this._dashSum = e;
            }
            return this;
        },
        setLineDashOffset: function(t) {
            return this._dashOffset = t, this;
        },
        len: function() {
            return this._len;
        },
        setData: function(t) {
            var e = t.length;
            this.data && this.data.length === e || !Mf || (this.data = new Float32Array(e));
            for (var n = 0; e > n; n++) this.data[n] = t[n];
            this._len = e;
        },
        appendPath: function(t) {
            t instanceof Array || (t = [ t ]);
            for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();
            Mf && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
            for (r = 0; e > r; r++) for (var a = t[r].data, o = 0; o < a.length; o++) this.data[i++] = a[o];
            this._len = i;
        },
        addData: function(t) {
            if (this._saveData) {
                var e = this.data;
                this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                for (var n = 0; n < arguments.length; n++) e[this._len++] = arguments[n];
                this._prevCmd = t;
            }
        },
        _expandData: function() {
            if (!(this.data instanceof Array)) {
                for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                this.data = t;
            }
        },
        _needsDash: function() {
            return this._lineDash;
        },
        _dashedLineTo: function(t, e) {
            var n, i, r = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, l = this._xi, h = this._yi, u = t - l, c = e - h, d = wf(u * u + c * c), f = l, p = h, g = o.length;
            for (u /= d, c /= d, 0 > a && (a = r + a), f -= (a %= r) * u, p -= a * c; u > 0 && t >= f || 0 > u && f >= t || 0 === u && (c > 0 && e >= p || 0 > c && p >= e); ) f += u * (n = o[i = this._dashIdx]), 
            p += c * n, this._dashIdx = (i + 1) % g, u > 0 && l > f || 0 > u && f > l || c > 0 && h > p || 0 > c && p > h || s[i % 2 ? "moveTo" : "lineTo"](u >= 0 ? mf(f, t) : yf(f, t), c >= 0 ? mf(p, e) : yf(p, e));
            u = f - t, c = p - e, this._dashOffset = -wf(u * u + c * c);
        },
        _dashedBezierTo: function(t, e, n, i, r, a) {
            var o, s, l, h, u, c = this._dashSum, d = this._dashOffset, f = this._lineDash, p = this._ctx, g = this._xi, v = this._yi, m = qn, y = 0, _ = this._dashIdx, x = f.length, w = 0;
            for (0 > d && (d = c + d), d %= c, o = 0; 1 > o; o += .1) s = m(g, t, n, r, o + .1) - m(g, t, n, r, o), 
            l = m(v, e, i, a, o + .1) - m(v, e, i, a, o), y += wf(s * s + l * l);
            for (;x > _ && !((w += f[_]) > d); _++) ;
            for (o = (w - d) / y; 1 >= o; ) h = m(g, t, n, r, o), u = m(v, e, i, a, o), _ % 2 ? p.moveTo(h, u) : p.lineTo(h, u), 
            o += f[_] / y, _ = (_ + 1) % x;
            _ % 2 != 0 && p.lineTo(r, a), s = r - h, l = a - u, this._dashOffset = -wf(s * s + l * l);
        },
        _dashedQuadraticTo: function(t, e, n, i) {
            var r = n, a = i;
            n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, 
            this._dashedBezierTo(t, e, n, i, r, a);
        },
        toStatic: function() {
            var t = this.data;
            t instanceof Array && (t.length = this._len, Mf && (this.data = new Float32Array(t)));
        },
        getBoundingRect: function() {
            ff[0] = ff[1] = gf[0] = gf[1] = Number.MAX_VALUE, pf[0] = pf[1] = vf[0] = vf[1] = -Number.MAX_VALUE;
            for (var t = this.data, e = 0, n = 0, i = 0, r = 0, a = 0; a < t.length; ) {
                var o = t[a++];
                switch (1 === a && (e = t[a], n = t[a + 1], i = e, r = n), o) {
                  case df.M:
                    e = i = t[a++], n = r = t[a++], gf[0] = i, gf[1] = r, vf[0] = i, vf[1] = r;
                    break;

                  case df.L:
                    ai(e, n, t[a], t[a + 1], gf, vf), e = t[a++], n = t[a++];
                    break;

                  case df.C:
                    oi(e, n, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], gf, vf), e = t[a++], n = t[a++];
                    break;

                  case df.Q:
                    si(e, n, t[a++], t[a++], t[a], t[a + 1], gf, vf), e = t[a++], n = t[a++];
                    break;

                  case df.A:
                    var s = t[a++], l = t[a++], h = t[a++], u = t[a++], c = t[a++], d = t[a++] + c;
                    a += 1;
                    var f = 1 - t[a++];
                    1 === a && (i = _f(c) * h + s, r = xf(c) * u + l), li(s, l, h, u, c, d, f, gf, vf), 
                    e = _f(d) * h + s, n = xf(d) * u + l;
                    break;

                  case df.R:
                    ai(i = e = t[a++], r = n = t[a++], i + t[a++], r + t[a++], gf, vf);
                    break;

                  case df.Z:
                    e = i, n = r;
                }
                Q(ff, ff, gf), J(pf, pf, vf);
            }
            return 0 === a && (ff[0] = ff[1] = pf[0] = pf[1] = 0), new oe(ff[0], ff[1], pf[0] - ff[0], pf[1] - ff[1]);
        },
        rebuildPath: function(t) {
            for (var e, n, i, r, a, o, s = this.data, l = this._ux, h = this._uy, u = this._len, c = 0; u > c; ) {
                var d = s[c++];
                switch (1 === c && (i = s[c], r = s[c + 1], e = i, n = r), d) {
                  case df.M:
                    e = i = s[c++], n = r = s[c++], t.moveTo(i, r);
                    break;

                  case df.L:
                    a = s[c++], o = s[c++], (bf(a - i) > l || bf(o - r) > h || c === u - 1) && (t.lineTo(a, o), 
                    i = a, r = o);
                    break;

                  case df.C:
                    t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                    break;

                  case df.Q:
                    t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                    break;

                  case df.A:
                    var f = s[c++], p = s[c++], g = s[c++], v = s[c++], m = s[c++], y = s[c++], _ = s[c++], x = s[c++], w = g > v ? g : v, b = g > v ? 1 : g / v, M = g > v ? v / g : 1, S = m + y;
                    Math.abs(g - v) > .001 ? (t.translate(f, p), t.rotate(_), t.scale(b, M), t.arc(0, 0, w, m, S, 1 - x), 
                    t.scale(1 / b, 1 / M), t.rotate(-_), t.translate(-f, -p)) : t.arc(f, p, w, m, S, 1 - x), 
                    1 === c && (e = _f(m) * g + f, n = xf(m) * v + p), i = _f(S) * g + f, r = xf(S) * v + p;
                    break;

                  case df.R:
                    e = i = s[c], n = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
                    break;

                  case df.Z:
                    t.closePath(), i = e, r = n;
                }
            }
        }
    }, Sf.CMD = df;
    var Tf = 2 * Math.PI, Cf = 2 * Math.PI, If = Sf.CMD, Af = 2 * Math.PI, kf = 1e-4, Df = [ -1, -1, -1 ], Pf = [ -1, -1 ], Lf = td.prototype.getCanvasPattern, Of = Math.abs, Ef = new Sf(!0);
    Mi.prototype = {
        constructor: Mi,
        type: "path",
        __dirtyPath: !0,
        strokeContainThreshold: 5,
        subPixelOptimize: !1,
        brush: function(t, e) {
            var n = this.style, i = this.path || Ef, r = n.hasStroke(), a = n.hasFill(), o = n.fill, s = n.stroke, l = a && !!o.colorStops, h = r && !!s.colorStops, u = a && !!o.image, c = r && !!s.image;
            if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {
                var d;
                l && (d = d || this.getBoundingRect(), this._fillGradient = n.getGradient(t, o, d)), 
                h && (d = d || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, s, d));
            }
            l ? t.fillStyle = this._fillGradient : u && (t.fillStyle = Lf.call(o, t)), h ? t.strokeStyle = this._strokeGradient : c && (t.strokeStyle = Lf.call(s, t));
            var f = n.lineDash, p = n.lineDashOffset, g = !!t.setLineDash, v = this.getGlobalScale();
            if (i.setScale(v[0], v[1]), this.__dirtyPath || f && !g && r ? (i.beginPath(t), 
            f && !g && (i.setLineDash(f), i.setLineDashOffset(p)), this.buildPath(i, this.shape, !1), 
            this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), 
            a) if (null != n.fillOpacity) {
                m = t.globalAlpha;
                t.globalAlpha = n.fillOpacity * n.opacity, i.fill(t), t.globalAlpha = m;
            } else i.fill(t);
            if (f && g && (t.setLineDash(f), t.lineDashOffset = p), r) if (null != n.strokeOpacity) {
                var m = t.globalAlpha;
                t.globalAlpha = n.strokeOpacity * n.opacity, i.stroke(t), t.globalAlpha = m;
            } else i.stroke(t);
            f && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
        },
        buildPath: function() {},
        createPathProxy: function() {
            this.path = new Sf();
        },
        getBoundingRect: function() {
            var t = this._rect, e = this.style, n = !t;
            if (n) {
                var i = this.path;
                i || (i = this.path = new Sf()), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), 
                t = i.getBoundingRect();
            }
            if (this._rect = t, e.hasStroke()) {
                var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
                if (this.__dirty || n) {
                    r.copy(t);
                    var a = e.lineWidth, o = e.strokeNoScale ? this.getLineScale() : 1;
                    e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (r.width += a / o, 
                    r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2);
                }
                return r;
            }
            return t;
        },
        contain: function(t, e) {
            var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect(), r = this.style;
            if (t = n[0], e = n[1], i.contain(t, e)) {
                var a = this.path.data;
                if (r.hasStroke()) {
                    var o = r.lineWidth, s = r.strokeNoScale ? this.getLineScale() : 1;
                    if (s > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), 
                    bi(a, o / s, t, e))) return !0;
                }
                if (r.hasFill()) return wi(a, t, e);
            }
            return !1;
        },
        dirty: function(t) {
            null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, 
            this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty();
        },
        animateShape: function(t) {
            return this.animate("shape", t);
        },
        attrKV: function(t, e) {
            "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : sn.prototype.attrKV.call(this, t, e);
        },
        setShape: function(t, e) {
            var n = this.shape;
            if (n) {
                if (b(t)) for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]); else n[t] = e;
                this.dirty(!0);
            }
            return this;
        },
        getLineScale: function() {
            var t = this.transform;
            return t && Of(t[0] - 1) > 1e-10 && Of(t[3] - 1) > 1e-10 ? Math.sqrt(Of(t[0] * t[3] - t[2] * t[1])) : 1;
        }
    }, Mi.extend = function(t) {
        var e = function(e) {
            Mi.call(this, e), t.style && this.style.extendFrom(t.style, !1);
            var n = t.shape;
            if (n) {
                this.shape = this.shape || {};
                var i = this.shape;
                for (var r in n) !i.hasOwnProperty(r) && n.hasOwnProperty(r) && (i[r] = n[r]);
            }
            t.init && t.init.call(this, e);
        };
        u(e, Mi);
        for (var n in t) "style" !== n && "shape" !== n && (e.prototype[n] = t[n]);
        return e;
    }, u(Mi, sn);
    var zf = Sf.CMD, Rf = [ [], [], [] ], Nf = Math.sqrt, Bf = Math.atan2, Ff = function(t, e) {
        var n, i, r, a, o, s, l = t.data, h = zf.M, u = zf.C, c = zf.L, d = zf.R, f = zf.A, p = zf.Q;
        for (r = 0, a = 0; r < l.length; ) {
            switch (n = l[r++], a = r, i = 0, n) {
              case h:
              case c:
                i = 1;
                break;

              case u:
                i = 3;
                break;

              case p:
                i = 2;
                break;

              case f:
                var g = e[4], v = e[5], m = Nf(e[0] * e[0] + e[1] * e[1]), y = Nf(e[2] * e[2] + e[3] * e[3]), _ = Bf(-e[1] / y, e[0] / m);
                l[r] *= m, l[r++] += g, l[r] *= y, l[r++] += v, l[r++] *= m, l[r++] *= y, l[r++] += _, 
                l[r++] += _, a = r += 2;
                break;

              case d:
                s[0] = l[r++], s[1] = l[r++], K(s, s, e), l[a++] = s[0], l[a++] = s[1], s[0] += l[r++], 
                s[1] += l[r++], K(s, s, e), l[a++] = s[0], l[a++] = s[1];
            }
            for (o = 0; i > o; o++) (s = Rf[o])[0] = l[r++], s[1] = l[r++], K(s, s, e), l[a++] = s[0], 
            l[a++] = s[1];
        }
    }, Vf = Math.sqrt, Wf = Math.sin, Hf = Math.cos, Gf = Math.PI, Zf = function(t) {
        return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    }, Xf = function(t, e) {
        return (t[0] * e[0] + t[1] * e[1]) / (Zf(t) * Zf(e));
    }, qf = function(t, e) {
        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(Xf(t, e));
    }, Yf = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi, jf = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g, Uf = function(t) {
        sn.call(this, t);
    };
    Uf.prototype = {
        constructor: Uf,
        type: "text",
        brush: function(t, e) {
            var n = this.style;
            this.__dirty && He(n), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;
            var i = n.text;
            return null != i && (i += ""), on(i, n) ? (this.setTransform(t), Ze(this, t, i, n, null, e), 
            void this.restoreTransform(t)) : void (t.__attrCachedBy = Yc.NONE);
        },
        getBoundingRect: function() {
            var t = this.style;
            if (this.__dirty && He(t), !this._rect) {
                var e = t.text;
                null != e ? e += "" : e = "";
                var n = Te(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);
                if (n.x += t.x || 0, n.y += t.y || 0, en(t.textStroke, t.textStrokeWidth)) {
                    var i = t.textStrokeWidth;
                    n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i;
                }
                this._rect = n;
            }
            return this._rect;
        }
    }, u(Uf, sn);
    var $f = Mi.extend({
        type: "circle",
        shape: {
            cx: 0,
            cy: 0,
            r: 0
        },
        buildPath: function(t, e, n) {
            n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
        }
    }), Kf = [ [ "shadowBlur", 0 ], [ "shadowColor", "#000" ], [ "shadowOffsetX", 0 ], [ "shadowOffsetY", 0 ] ], Qf = function(t) {
        return Lu.browser.ie && Lu.browser.version >= 11 ? function() {
            var e, n = this.__clipPaths, i = this.style;
            if (n) for (var r = 0; r < n.length; r++) {
                var a = n[r], o = a && a.shape, s = a && a.type;
                if (o && ("sector" === s && o.startAngle === o.endAngle || "rect" === s && (!o.width || !o.height))) {
                    for (l = 0; l < Kf.length; l++) Kf[l][2] = i[Kf[l][0]], i[Kf[l][0]] = Kf[l][1];
                    e = !0;
                    break;
                }
            }
            if (t.apply(this, arguments), e) for (var l = 0; l < Kf.length; l++) i[Kf[l][0]] = Kf[l][2];
        } : t;
    }, Jf = Mi.extend({
        type: "sector",
        shape: {
            cx: 0,
            cy: 0,
            r0: 0,
            r: 0,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockwise: !0
        },
        brush: Qf(Mi.prototype.brush),
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle, s = e.endAngle, l = e.clockwise, h = Math.cos(o), u = Math.sin(o);
            t.moveTo(h * r + n, u * r + i), t.lineTo(h * a + n, u * a + i), t.arc(n, i, a, o, s, !l), 
            t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), 
            t.closePath();
        }
    }), tp = Mi.extend({
        type: "ring",
        shape: {
            cx: 0,
            cy: 0,
            r: 0,
            r0: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = 2 * Math.PI;
            t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0);
        }
    }), ep = function(t, e) {
        for (var n = t.length, i = [], r = 0, a = 1; n > a; a++) r += U(t[a - 1], t[a]);
        var o = r / 2;
        o = n > o ? n : o;
        for (a = 0; o > a; a++) {
            var s, l, h, u = a / (o - 1) * (e ? n : n - 1), c = Math.floor(u), d = u - c, f = t[c % n];
            e ? (s = t[(c - 1 + n) % n], l = t[(c + 1) % n], h = t[(c + 2) % n]) : (s = t[0 === c ? c : c - 1], 
            l = t[c > n - 2 ? n - 1 : c + 1], h = t[c > n - 3 ? n - 1 : c + 2]);
            var p = d * d, g = d * p;
            i.push([ ki(s[0], f[0], l[0], h[0], d, p, g), ki(s[1], f[1], l[1], h[1], d, p, g) ]);
        }
        return i;
    }, np = function(t, e, n, i) {
        var r, a, o, s, l = [], h = [], u = [], c = [];
        if (i) {
            o = [ 1 / 0, 1 / 0 ], s = [ -1 / 0, -1 / 0 ];
            for (var d = 0, f = t.length; f > d; d++) Q(o, o, t[d]), J(s, s, t[d]);
            Q(o, o, i[0]), J(s, s, i[1]);
        }
        for (var d = 0, f = t.length; f > d; d++) {
            var p = t[d];
            if (n) r = t[d ? d - 1 : f - 1], a = t[(d + 1) % f]; else {
                if (0 === d || d === f - 1) {
                    l.push(W(t[d]));
                    continue;
                }
                r = t[d - 1], a = t[d + 1];
            }
            Z(h, a, r), Y(h, h, e);
            var g = U(p, r), v = U(p, a), m = g + v;
            0 !== m && (g /= m, v /= m), Y(u, h, -g), Y(c, h, v);
            var y = H([], p, u), _ = H([], p, c);
            i && (J(y, y, o), Q(y, y, s), J(_, _, o), Q(_, _, s)), l.push(y), l.push(_);
        }
        return n && l.push(l.shift()), l;
    }, ip = Mi.extend({
        type: "polygon",
        shape: {
            points: null,
            smooth: !1,
            smoothConstraint: null
        },
        buildPath: function(t, e) {
            Di(t, e, !0);
        }
    }), rp = Mi.extend({
        type: "polyline",
        shape: {
            points: null,
            smooth: !1,
            smoothConstraint: null
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            Di(t, e, !1);
        }
    }), ap = Math.round, op = {}, sp = Mi.extend({
        type: "rect",
        shape: {
            r: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n, i, r, a;
            this.subPixelOptimize ? (Li(op, e, this.style), n = op.x, i = op.y, r = op.width, 
            a = op.height, op.r = e.r, e = op) : (n = e.x, i = e.y, r = e.width, a = e.height), 
            e.r ? We(t, e) : t.rect(n, i, r, a), t.closePath();
        }
    }), lp = {}, hp = Mi.extend({
        type: "line",
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            percent: 1
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            var n, i, r, a;
            this.subPixelOptimize ? (Pi(lp, e, this.style), n = lp.x1, i = lp.y1, r = lp.x2, 
            a = lp.y2) : (n = e.x1, i = e.y1, r = e.x2, a = e.y2);
            var o = e.percent;
            0 !== o && (t.moveTo(n, i), 1 > o && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), 
            t.lineTo(r, a));
        },
        pointAt: function(t) {
            var e = this.shape;
            return [ e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t ];
        }
    }), up = [], cp = Mi.extend({
        type: "bezier-curve",
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            cpx1: 0,
            cpy1: 0,
            percent: 1
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            var n = e.x1, i = e.y1, r = e.x2, a = e.y2, o = e.cpx1, s = e.cpy1, l = e.cpx2, h = e.cpy2, u = e.percent;
            0 !== u && (t.moveTo(n, i), null == l || null == h ? (1 > u && (ni(n, o, r, u, up), 
            o = up[1], r = up[2], ni(i, s, a, u, up), s = up[1], a = up[2]), t.quadraticCurveTo(o, s, r, a)) : (1 > u && ($n(n, o, l, r, u, up), 
            o = up[1], l = up[2], r = up[3], $n(i, s, h, a, u, up), s = up[1], h = up[2], a = up[3]), 
            t.bezierCurveTo(o, s, l, h, r, a)));
        },
        pointAt: function(t) {
            return Ei(this.shape, t, !1);
        },
        tangentAt: function(t) {
            var e = Ei(this.shape, t, !0);
            return j(e, e);
        }
    }), dp = Mi.extend({
        type: "arc",
        shape: {
            cx: 0,
            cy: 0,
            r: 0,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockwise: !0
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = Math.max(e.r, 0), a = e.startAngle, o = e.endAngle, s = e.clockwise, l = Math.cos(a), h = Math.sin(a);
            t.moveTo(l * r + n, h * r + i), t.arc(n, i, r, a, o, !s);
        }
    }), fp = Mi.extend({
        type: "compound",
        shape: {
            paths: null
        },
        _updatePathDirty: function() {
            for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++) t = t || e[n].__dirtyPath;
            this.__dirtyPath = t, this.__dirty = this.__dirty || t;
        },
        beforeBrush: function() {
            this._updatePathDirty();
            for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) t[n].path || t[n].createPathProxy(), 
            t[n].path.setScale(e[0], e[1]);
        },
        buildPath: function(t, e) {
            for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0);
        },
        afterBrush: function() {
            for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1;
        },
        getBoundingRect: function() {
            return this._updatePathDirty(), Mi.prototype.getBoundingRect.call(this);
        }
    }), pp = function(t) {
        this.colorStops = t || [];
    };
    pp.prototype = {
        constructor: pp,
        addColorStop: function(t, e) {
            this.colorStops.push({
                offset: t,
                color: e
            });
        }
    };
    var gp = function(t, e, n, i, r, a) {
        this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, 
        this.y2 = null == i ? 0 : i, this.type = "linear", this.global = a || !1, pp.call(this, r);
    };
    gp.prototype = {
        constructor: gp
    }, u(gp, pp);
    var vp = function(t, e, n, i, r) {
        this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, 
        this.type = "radial", this.global = r || !1, pp.call(this, i);
    };
    vp.prototype = {
        constructor: vp
    }, u(vp, pp), zi.prototype.incremental = !0, zi.prototype.clearDisplaybles = function() {
        this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), 
        this.notClear = !1;
    }, zi.prototype.addDisplayable = function(t, e) {
        e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty();
    }, zi.prototype.addDisplayables = function(t, e) {
        e = e || !1;
        for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e);
    }, zi.prototype.eachPendingDisplayable = function(t) {
        for (e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
        for (var e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e]);
    }, zi.prototype.update = function() {
        this.updateTransform();
        for (t = this._cursor; t < this._displayables.length; t++) (e = this._displayables[t]).parent = this, 
        e.update(), e.parent = null;
        for (var t = 0; t < this._temporaryDisplayables.length; t++) {
            var e = this._temporaryDisplayables[t];
            e.parent = this, e.update(), e.parent = null;
        }
    }, zi.prototype.brush = function(t) {
        for (e = this._cursor; e < this._displayables.length; e++) (n = this._displayables[e]).beforeBrush && n.beforeBrush(t), 
        n.brush(t, e === this._cursor ? null : this._displayables[e - 1]), n.afterBrush && n.afterBrush(t);
        this._cursor = e;
        for (var e = 0; e < this._temporaryDisplayables.length; e++) {
            var n = this._temporaryDisplayables[e];
            n.beforeBrush && n.beforeBrush(t), n.brush(t, 0 === e ? null : this._temporaryDisplayables[e - 1]), 
            n.afterBrush && n.afterBrush(t);
        }
        this._temporaryDisplayables = [], this.notClear = !0;
    };
    var mp = [];
    zi.prototype.getBoundingRect = function() {
        if (!this._rect) {
            for (var t = new oe(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
                var n = this._displayables[e], i = n.getBoundingRect().clone();
                n.needLocalTransform() && i.applyTransform(n.getLocalTransform(mp)), t.union(i);
            }
            this._rect = t;
        }
        return this._rect;
    }, zi.prototype.contain = function(t, e) {
        var n = this.transformCoordToLocal(t, e);
        if (this.getBoundingRect().contain(n[0], n[1])) for (var i = 0; i < this._displayables.length; i++) if (this._displayables[i].contain(t, e)) return !0;
        return !1;
    }, u(zi, sn);
    var yp = Math.round, _p = Math.max, xp = Math.min, wp = {}, bp = 1, Mp = N(), Sp = 0, Tp = (Object.freeze || Object)({
        Z2_EMPHASIS_LIFT: bp,
        extendShape: Ri,
        extendPath: function(t, e) {
            return Ai(t, e);
        },
        makePath: Ni,
        makeImage: Bi,
        mergePath: function(t, e) {
            for (var n = [], i = t.length, r = 0; i > r; r++) {
                var a = t[r];
                a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), 
                n.push(a.path);
            }
            var o = new Mi(e);
            return o.createPathProxy(), o.buildPath = function(t) {
                t.appendPath(n);
                var e = t.getContext();
                e && t.rebuildPath(e);
            }, o;
        },
        resizePath: Vi,
        subPixelOptimizeLine: Wi,
        subPixelOptimizeRect: Hi,
        subPixelOptimize: Gi,
        setElementHoverStyle: Ki,
        isInEmphasis: Qi,
        setHoverStyle: ir,
        setAsHoverStyleTrigger: rr,
        setLabelStyle: ar,
        setTextStyle: or,
        setText: function(t, e, n) {
            var i, r = {
                isRectText: !0
            };
            !1 === n ? i = !0 : r.autoColor = n, sr(t, e, r, i);
        },
        getFont: fr,
        updateProps: gr,
        initProps: vr,
        getTransform: mr,
        applyTransform: yr,
        transformDirection: _r,
        groupTransition: xr,
        clipPointsByRect: function(t, e) {
            return p(t, function(t) {
                var n = t[0];
                n = _p(n, e.x), n = xp(n, e.x + e.width);
                var i = t[1];
                return i = _p(i, e.y), i = xp(i, e.y + e.height), [ n, i ];
            });
        },
        clipRectByRect: function(t, e) {
            var n = _p(t.x, e.x), i = xp(t.x + t.width, e.x + e.width), r = _p(t.y, e.y), a = xp(t.y + t.height, e.y + e.height);
            return i >= n && a >= r ? {
                x: n,
                y: r,
                width: i - n,
                height: a - r
            } : void 0;
        },
        createIcon: wr,
        Group: Wc,
        Image: ln,
        Text: Uf,
        Circle: $f,
        Sector: Jf,
        Ring: tp,
        Polygon: ip,
        Polyline: rp,
        Rect: sp,
        Line: hp,
        BezierCurve: cp,
        Arc: dp,
        IncrementalDisplayable: zi,
        CompoundPath: fp,
        LinearGradient: gp,
        RadialGradient: vp,
        BoundingRect: oe
    }), Cp = [ "textStyle", "color" ], Ip = {
        getTextColor: function(t) {
            var e = this.ecModel;
            return this.getShallow("color") || (!t && e ? e.get(Cp) : null);
        },
        getFont: function() {
            return fr({
                fontStyle: this.getShallow("fontStyle"),
                fontWeight: this.getShallow("fontWeight"),
                fontSize: this.getShallow("fontSize"),
                fontFamily: this.getShallow("fontFamily")
            }, this.ecModel);
        },
        getTextRect: function(t) {
            return Te(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"));
        }
    }, Ap = Wd([ [ "fill", "color" ], [ "stroke", "borderColor" ], [ "lineWidth", "borderWidth" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ], [ "textPosition" ], [ "textAlign" ] ]), kp = {
        getItemStyle: function(t, e) {
            var n = Ap(this, t, e), i = this.getBorderLineDash();
            return i && (n.lineDash = i), n;
        },
        getBorderLineDash: function() {
            var t = this.get("borderType");
            return "solid" === t || null == t ? null : "dashed" === t ? [ 5, 5 ] : [ 1, 1 ];
        }
    }, Dp = c, Pp = Pn();
    br.prototype = {
        constructor: br,
        init: null,
        mergeOption: function(t) {
            r(this.option, t, !0);
        },
        get: function(t, e) {
            return null == t ? this.option : Mr(this.option, this.parsePath(t), !e && Sr(this, t));
        },
        getShallow: function(t, e) {
            var n = this.option, i = null == n ? n : n[t], r = !e && Sr(this, t);
            return null == i && r && (i = r.getShallow(t)), i;
        },
        getModel: function(t, e) {
            var n, i = null == t ? this.option : Mr(this.option, t = this.parsePath(t));
            return e = e || (n = Sr(this, t)) && n.getModel(t), new br(i, e, this.ecModel);
        },
        isEmpty: function() {
            return null == this.option;
        },
        restoreData: function() {},
        clone: function() {
            return new (0, this.constructor)(i(this.option));
        },
        setReadOnly: function() {},
        parsePath: function(t) {
            return "string" == typeof t && (t = t.split(".")), t;
        },
        customizeGetParent: function(t) {
            Pp(this).getParent = t;
        },
        isAnimationEnabled: function() {
            if (!Lu.node) {
                if (null != this.option.animation) return !!this.option.animation;
                if (this.parentModel) return this.parentModel.isAnimationEnabled();
            }
        }
    }, Fn(br), Vn(br), Dp(br, Gd), Dp(br, Xd), Dp(br, Ip), Dp(br, kp);
    var Lp = 0, Op = 1e-4, Ep = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/, zp = (Object.freeze || Object)({
        linearMap: Ir,
        parsePercent: Ar,
        round: kr,
        asc: Dr,
        getPrecision: function(t) {
            if (t = +t, isNaN(t)) return 0;
            for (var e = 1, n = 0; Math.round(t * e) / e !== t; ) e *= 10, n++;
            return n;
        },
        getPrecisionSafe: Pr,
        getPixelPrecision: Lr,
        getPercentWithPrecision: function(t, e, n) {
            if (!t[e]) return 0;
            var i = g(t, function(t, e) {
                return t + (isNaN(e) ? 0 : e);
            }, 0);
            if (0 === i) return 0;
            for (var r = Math.pow(10, n), a = p(t, function(t) {
                return (isNaN(t) ? 0 : t) / i * r * 100;
            }), o = 100 * r, s = p(a, function(t) {
                return Math.floor(t);
            }), l = g(s, function(t, e) {
                return t + e;
            }, 0), h = p(a, function(t, e) {
                return t - s[e];
            }); o > l; ) {
                for (var u = Number.NEGATIVE_INFINITY, c = null, d = 0, f = h.length; f > d; ++d) h[d] > u && (u = h[d], 
                c = d);
                ++s[c], h[c] = 0, ++l;
            }
            return s[e] / r;
        },
        MAX_SAFE_INTEGER: 9007199254740991,
        remRadian: Or,
        isRadianAroundZero: Er,
        parseDate: zr,
        quantity: Rr,
        nice: Br,
        quantile: function(t, e) {
            var n = (t.length - 1) * e + 1, i = Math.floor(n), r = +t[i - 1], a = n - i;
            return a ? r + a * (t[i] - r) : r;
        },
        reformIntervals: function(t) {
            function e(t, n, i) {
                return t.interval[i] < n.interval[i] || t.interval[i] === n.interval[i] && (t.close[i] - n.close[i] == (i ? -1 : 1) || !i && e(t, n, 1));
            }
            t.sort(function(t, n) {
                return e(t, n, 0) ? -1 : 1;
            });
            for (var n = -1 / 0, i = 1, r = 0; r < t.length; ) {
                for (var a = t[r].interval, o = t[r].close, s = 0; 2 > s; s++) a[s] <= n && (a[s] = n, 
                o[s] = s ? 1 : 1 - i), n = a[s], i = o[s];
                a[0] === a[1] && o[0] * o[1] != 1 ? t.splice(r, 1) : r++;
            }
            return t;
        },
        isNumeric: function(t) {
            return t - parseFloat(t) >= 0;
        }
    }), Rp = P, Np = /([&<>"'])/g, Bp = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, Fp = [ "a", "b", "c", "d", "e", "f", "g" ], Vp = function(t, e) {
        return "{" + t + (null == e ? "" : e) + "}";
    }, Wp = Pe, Hp = (Object.freeze || Object)({
        addCommas: Fr,
        toCamelCase: function(t, e) {
            return t = (t || "").toLowerCase().replace(/-(.)/g, function(t, e) {
                return e.toUpperCase();
            }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;
        },
        normalizeCssArray: Rp,
        encodeHTML: Vr,
        formatTpl: Wr,
        formatTplSimple: function(t, e, n) {
            return f(e, function(e, i) {
                t = t.replace("{" + i + "}", n ? Vr(e) : e);
            }), t;
        },
        getTooltipMarker: Hr,
        formatTime: Zr,
        capitalFirst: Xr,
        truncateText: Wp,
        getTextBoundingRect: function(t) {
            return Te(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate);
        },
        getTextRect: function(t, e, n, i, r, a, o, s) {
            return Te(t, e, n, i, r, s, a, o);
        }
    }), Gp = f, Zp = [ "left", "right", "top", "bottom", "width", "height" ], Xp = [ [ "width", "left", "right" ], [ "height", "top", "bottom" ] ], qp = (y(qr, "vertical"), 
    y(qr, "horizontal"), {
        getBoxLayoutParams: function() {
            return {
                left: this.get("left"),
                top: this.get("top"),
                right: this.get("right"),
                bottom: this.get("bottom"),
                width: this.get("width"),
                height: this.get("height")
            };
        }
    }), Yp = Pn(), jp = br.extend({
        type: "component",
        id: "",
        name: "",
        mainType: "",
        subType: "",
        componentIndex: 0,
        defaultOption: null,
        ecModel: null,
        dependentModels: [],
        uid: null,
        layoutMode: null,
        $constructor: function(t, e, n, i) {
            br.call(this, t, e, n, i), this.uid = Tr("ec_cpt_model");
        },
        init: function(t, e, n) {
            this.mergeDefaultAndTheme(t, n);
        },
        mergeDefaultAndTheme: function(t, e) {
            var n = this.layoutMode, i = n ? Ur(t) : {};
            r(t, e.getTheme().get(this.mainType)), r(t, this.getDefaultOption()), n && jr(t, i, n);
        },
        mergeOption: function(t) {
            r(this.option, t, !0);
            var e = this.layoutMode;
            e && jr(this.option, t, e);
        },
        optionUpdated: function() {},
        getDefaultOption: function() {
            var t = Yp(this);
            if (!t.defaultOption) {
                for (var e = [], n = this.constructor; n; ) {
                    var i = n.prototype.defaultOption;
                    i && e.push(i), n = n.superClass;
                }
                for (var a = {}, o = e.length - 1; o >= 0; o--) a = r(a, e[o], !0);
                t.defaultOption = a;
            }
            return t.defaultOption;
        },
        getReferringComponents: function(t) {
            return this.ecModel.queryComponents({
                mainType: t,
                index: this.get(t + "Index", !0),
                id: this.get(t + "Id", !0)
            });
        }
    });
    Gn(jp, {
        registerWhenExtend: !0
    }), function(t) {
        var e = {};
        t.registerSubTypeDefaulter = function(t, n) {
            t = Nn(t), e[t.main] = n;
        }, t.determineSubType = function(n, i) {
            var r = i.type;
            if (!r) {
                var a = Nn(n).main;
                t.hasSubTypes(n) && e[a] && (r = e[a](i));
            }
            return r;
        };
    }(jp), function(t, e) {
        function n(t) {
            var n = {}, a = [];
            return f(t, function(o) {
                var s = i(n, o), l = r(s.originalDeps = e(o), t);
                s.entryCount = l.length, 0 === s.entryCount && a.push(o), f(l, function(t) {
                    h(s.predecessor, t) < 0 && s.predecessor.push(t);
                    var e = i(n, t);
                    h(e.successor, t) < 0 && e.successor.push(o);
                });
            }), {
                graph: n,
                noEntryList: a
            };
        }
        function i(t, e) {
            return t[e] || (t[e] = {
                predecessor: [],
                successor: []
            }), t[e];
        }
        function r(t, e) {
            var n = [];
            return f(t, function(t) {
                h(e, t) >= 0 && n.push(t);
            }), n;
        }
        t.topologicalTravel = function(t, e, i, r) {
            function a(t) {
                s[t].entryCount--, 0 === s[t].entryCount && l.push(t);
            }
            if (t.length) {
                var o = n(e), s = o.graph, l = o.noEntryList, h = {};
                for (f(t, function(t) {
                    h[t] = !0;
                }); l.length; ) {
                    var u = l.pop(), c = s[u], d = !!h[u];
                    d && (i.call(r, u, c.originalDeps.slice()), delete h[u]), f(c.successor, d ? function(t) {
                        h[t] = !0, a(t);
                    } : a);
                }
                f(h, function() {
                    throw new Error("Circle dependency may exists");
                });
            }
        };
    }(jp, function(t) {
        var e = [];
        return f(jp.getClassesByMainType(t), function(t) {
            e = e.concat(t.prototype.dependencies || []);
        }), e = p(e, function(t) {
            return Nn(t).main;
        }), "dataset" !== t && h(e, "dataset") <= 0 && e.unshift("dataset"), e;
    }), c(jp, qp);
    var Up = "";
    "undefined" != typeof navigator && (Up = navigator.platform || "");
    var $p = {
        color: [ "#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3" ],
        gradientColor: [ "#f6efa6", "#d88273", "#bf444c" ],
        textStyle: {
            fontFamily: Up.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal"
        },
        blendMode: null,
        animation: "auto",
        animationDuration: 1e3,
        animationDurationUpdate: 300,
        animationEasing: "exponentialOut",
        animationEasingUpdate: "cubicOut",
        animationThreshold: 2e3,
        progressiveThreshold: 3e3,
        progressive: 400,
        hoverLayerThreshold: 3e3,
        useUTC: !1
    }, Kp = Pn(), Qp = {
        clearColorPalette: function() {
            Kp(this).colorIdx = 0, Kp(this).colorNameMap = {};
        },
        getColorFromPalette: function(t, e, n) {
            var i = Kp(e = e || this), r = i.colorIdx || 0, a = i.colorNameMap = i.colorNameMap || {};
            if (a.hasOwnProperty(t)) return a[t];
            var o = bn(this.get("color", !0)), s = this.get("colorLayer", !0), l = null != n && s ? Kr(s, n) : o;
            if ((l = l || o) && l.length) {
                var h = l[r];
                return t && (a[t] = h), i.colorIdx = (r + 1) % l.length, h;
            }
        }
    }, Jp = {
        cartesian2d: function(t, e, n, i) {
            var r = t.getReferringComponents("xAxis")[0], a = t.getReferringComponents("yAxis")[0];
            e.coordSysDims = [ "x", "y" ], n.set("x", r), n.set("y", a), Jr(r) && (i.set("x", r), 
            e.firstCategoryDimIndex = 0), Jr(a) && (i.set("y", a), e.firstCategoryDimIndex = 1);
        },
        singleAxis: function(t, e, n, i) {
            var r = t.getReferringComponents("singleAxis")[0];
            e.coordSysDims = [ "single" ], n.set("single", r), Jr(r) && (i.set("single", r), 
            e.firstCategoryDimIndex = 0);
        },
        polar: function(t, e, n, i) {
            var r = t.getReferringComponents("polar")[0], a = r.findAxisModel("radiusAxis"), o = r.findAxisModel("angleAxis");
            e.coordSysDims = [ "radius", "angle" ], n.set("radius", a), n.set("angle", o), Jr(a) && (i.set("radius", a), 
            e.firstCategoryDimIndex = 0), Jr(o) && (i.set("angle", o), e.firstCategoryDimIndex = 1);
        },
        geo: function(t, e) {
            e.coordSysDims = [ "lng", "lat" ];
        },
        parallel: function(t, e, n, i) {
            var r = t.ecModel, a = r.getComponent("parallel", t.get("parallelIndex")), o = e.coordSysDims = a.dimensions.slice();
            f(a.parallelAxisIndex, function(t, a) {
                var s = r.getComponent("parallelAxis", t), l = o[a];
                n.set(l, s), Jr(s) && null == e.firstCategoryDimIndex && (i.set(l, s), e.firstCategoryDimIndex = a);
            });
        }
    }, tg = "original", eg = "arrayRows", ng = "objectRows", ig = "keyedColumns", rg = "unknown", ag = "typedArray", og = "column", sg = "row";
    ta.seriesDataToSource = function(t) {
        return new ta({
            data: t,
            sourceFormat: S(t) ? ag : tg,
            fromDataset: !1
        });
    }, Vn(ta);
    var lg = Pn(), hg = "\0_ec_inner", ug = br.extend({
        init: function(t, e, n, i) {
            n = n || {}, this.option = null, this._theme = new br(n), this._optionManager = i;
        },
        setOption: function(t, e) {
            L(!(hg in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), 
            this.resetOption(null);
        },
        resetOption: function(t) {
            var e = !1, n = this._optionManager;
            if (!t || "recreate" === t) {
                var i = n.mountOption("recreate" === t);
                this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : ga.call(this, i), 
                e = !0;
            }
            if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                var r = n.getTimelineOption(this);
                r && (this.mergeOption(r), e = !0);
            }
            if (!t || "recreate" === t || "media" === t) {
                var a = n.getMediaOption(this, this._api);
                a.length && f(a, function(t) {
                    this.mergeOption(t, e = !0);
                }, this);
            }
            return e;
        },
        mergeOption: function(t) {
            var e = this.option, n = this._componentsMap, a = [];
            ia(this), f(t, function(t, n) {
                null != t && (jp.hasClass(n) ? n && a.push(n) : e[n] = null == e[n] ? i(t) : r(e[n], t, !0));
            }), jp.topologicalTravel(a, jp.getAllClassMainTypes(), function(i, r) {
                var a = bn(t[i]), s = Cn(n.get(i), a);
                In(s), f(s, function(t) {
                    var e = t.option;
                    b(e) && (t.keyInfo.mainType = i, t.keyInfo.subType = ma(i, e, t.exist));
                });
                var l = va(n, r);
                e[i] = [], n.set(i, []), f(s, function(t, r) {
                    var a = t.exist, s = t.option;
                    if (L(b(s) || a, "Empty component definition"), s) {
                        var h = jp.getClass(i, t.keyInfo.subType, !0);
                        if (a && a instanceof h) a.name = t.keyInfo.name, a.mergeOption(s, this), a.optionUpdated(s, !1); else {
                            var u = o({
                                dependentModels: l,
                                componentIndex: r
                            }, t.keyInfo);
                            o(a = new h(s, this, this, u), u), a.init(s, this, this, u), a.optionUpdated(null, !0);
                        }
                    } else a.mergeOption({}, this), a.optionUpdated({}, !1);
                    n.get(i)[r] = a, e[i][r] = a.option;
                }, this), "series" === i && ya(this, n.get("series"));
            }, this), this._seriesIndicesMap = N(this._seriesIndices = this._seriesIndices || []);
        },
        getOption: function() {
            var t = i(this.option);
            return f(t, function(e, n) {
                if (jp.hasClass(n)) {
                    for (var i = (e = bn(e)).length - 1; i >= 0; i--) kn(e[i]) && e.splice(i, 1);
                    t[n] = e;
                }
            }), delete t[hg], t;
        },
        getTheme: function() {
            return this._theme;
        },
        getComponent: function(t, e) {
            var n = this._componentsMap.get(t);
            return n ? n[e || 0] : void 0;
        },
        queryComponents: function(t) {
            var e = t.mainType;
            if (!e) return [];
            var n = t.index, i = t.id, r = t.name, a = this._componentsMap.get(e);
            if (!a || !a.length) return [];
            var o;
            if (null != n) _(n) || (n = [ n ]), o = v(p(n, function(t) {
                return a[t];
            }), function(t) {
                return !!t;
            }); else if (null != i) {
                var s = _(i);
                o = v(a, function(t) {
                    return s && h(i, t.id) >= 0 || !s && t.id === i;
                });
            } else if (null != r) {
                var l = _(r);
                o = v(a, function(t) {
                    return l && h(r, t.name) >= 0 || !l && t.name === r;
                });
            } else o = a.slice();
            return _a(o, t);
        },
        findComponents: function(t) {
            var e = t.query, n = t.mainType, i = function(t) {
                var e = n + "Index", i = n + "Id", r = n + "Name";
                return !t || null == t[e] && null == t[i] && null == t[r] ? null : {
                    mainType: n,
                    index: t[e],
                    id: t[i],
                    name: t[r]
                };
            }(e);
            return function(e) {
                return t.filter ? v(e, t.filter) : e;
            }(_a(i ? this.queryComponents(i) : this._componentsMap.get(n), t));
        },
        eachComponent: function(t, e, n) {
            var i = this._componentsMap;
            "function" == typeof t ? (n = e, e = t, i.each(function(t, i) {
                f(t, function(t, r) {
                    e.call(n, i, t, r);
                });
            })) : w(t) ? f(i.get(t), e, n) : b(t) && f(this.findComponents(t), e, n);
        },
        getSeriesByName: function(t) {
            return v(this._componentsMap.get("series"), function(e) {
                return e.name === t;
            });
        },
        getSeriesByIndex: function(t) {
            return this._componentsMap.get("series")[t];
        },
        getSeriesByType: function(t) {
            return v(this._componentsMap.get("series"), function(e) {
                return e.subType === t;
            });
        },
        getSeries: function() {
            return this._componentsMap.get("series").slice();
        },
        getSeriesCount: function() {
            return this._componentsMap.get("series").length;
        },
        eachSeries: function(t, e) {
            f(this._seriesIndices, function(n) {
                var i = this._componentsMap.get("series")[n];
                t.call(e, i, n);
            }, this);
        },
        eachRawSeries: function(t, e) {
            f(this._componentsMap.get("series"), t, e);
        },
        eachSeriesByType: function(t, e, n) {
            f(this._seriesIndices, function(i) {
                var r = this._componentsMap.get("series")[i];
                r.subType === t && e.call(n, r, i);
            }, this);
        },
        eachRawSeriesByType: function(t, e, n) {
            return f(this.getSeriesByType(t), e, n);
        },
        isSeriesFiltered: function(t) {
            return null == this._seriesIndicesMap.get(t.componentIndex);
        },
        getCurrentSeriesIndices: function() {
            return (this._seriesIndices || []).slice();
        },
        filterSeries: function(t, e) {
            ya(this, v(this._componentsMap.get("series"), t, e));
        },
        restoreData: function(t) {
            var e = this._componentsMap;
            ya(this, e.get("series"));
            var n = [];
            e.each(function(t, e) {
                n.push(e);
            }), jp.topologicalTravel(n, jp.getAllClassMainTypes(), function(n) {
                f(e.get(n), function(e) {
                    ("series" !== n || !fa(e, t)) && e.restoreData();
                });
            });
        }
    });
    c(ug, Qp);
    var cg = [ "getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel" ], dg = {};
    wa.prototype = {
        constructor: wa,
        create: function(t, e) {
            var n = [];
            f(dg, function(i) {
                var r = i.create(t, e);
                n = n.concat(r || []);
            }), this._coordinateSystems = n;
        },
        update: function(t, e) {
            f(this._coordinateSystems, function(n) {
                n.update && n.update(t, e);
            });
        },
        getCoordinateSystems: function() {
            return this._coordinateSystems.slice();
        }
    }, wa.register = function(t, e) {
        dg[t] = e;
    }, wa.get = function(t) {
        return dg[t];
    };
    var fg = f, pg = i, gg = p, vg = r, mg = /^(min|max)?(.+)$/;
    ba.prototype = {
        constructor: ba,
        setOption: function(t, e) {
            t && f(bn(t.series), function(t) {
                t && t.data && S(t.data) && E(t.data);
            }), t = pg(t, !0);
            var n = this._optionBackup, i = Ma.call(this, t, e, !n);
            this._newBaseOption = i.baseOption, n ? (Ia(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), 
            i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i;
        },
        mountOption: function(t) {
            var e = this._optionBackup;
            return this._timelineOptions = gg(e.timelineOptions, pg), this._mediaList = gg(e.mediaList, pg), 
            this._mediaDefault = pg(e.mediaDefault), this._currentMediaIndices = [], pg(t ? e.baseOption : this._newBaseOption);
        },
        getTimelineOption: function(t) {
            var e, n = this._timelineOptions;
            if (n.length) {
                var i = t.getComponent("timeline");
                i && (e = pg(n[i.getCurrentIndex()], !0));
            }
            return e;
        },
        getMediaOption: function() {
            var t = this._api.getWidth(), e = this._api.getHeight(), n = this._mediaList, i = this._mediaDefault, r = [], a = [];
            if (!n.length && !i) return a;
            for (var o = 0, s = n.length; s > o; o++) Sa(n[o].query, t, e) && r.push(o);
            return !r.length && i && (r = [ -1 ]), r.length && !Ca(r, this._currentMediaIndices) && (a = gg(r, function(t) {
                return pg(-1 === t ? i.option : n[t].option);
            })), this._currentMediaIndices = r, a;
        }
    };
    var yg = f, _g = b, xg = [ "areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine" ], wg = function(t, e) {
        yg(Ea(t.series), function(t) {
            _g(t) && Oa(t);
        });
        var n = [ "xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar" ];
        e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), yg(n, function(e) {
            yg(Ea(t[e]), function(t) {
                t && (Pa(t, "axisLabel"), Pa(t.axisPointer, "label"));
            });
        }), yg(Ea(t.parallel), function(t) {
            var e = t && t.parallelAxisDefault;
            Pa(e, "axisLabel"), Pa(e && e.axisPointer, "label");
        }), yg(Ea(t.calendar), function(t) {
            ka(t, "itemStyle"), Pa(t, "dayLabel"), Pa(t, "monthLabel"), Pa(t, "yearLabel");
        }), yg(Ea(t.radar), function(t) {
            Pa(t, "name");
        }), yg(Ea(t.geo), function(t) {
            _g(t) && (La(t), yg(Ea(t.regions), function(t) {
                La(t);
            }));
        }), yg(Ea(t.timeline), function(t) {
            La(t), ka(t, "label"), ka(t, "itemStyle"), ka(t, "controlStyle", !0);
            var e = t.data;
            _(e) && f(e, function(t) {
                b(t) && (ka(t, "label"), ka(t, "itemStyle"));
            });
        }), yg(Ea(t.toolbox), function(t) {
            ka(t, "iconStyle"), yg(t.feature, function(t) {
                ka(t, "iconStyle");
            });
        }), Pa(za(t.axisPointer), "label"), Pa(za(t.tooltip).axisPointer, "label");
    }, bg = [ [ "x", "left" ], [ "y", "top" ], [ "x2", "right" ], [ "y2", "bottom" ] ], Mg = [ "grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline" ], Sg = function(t, e) {
        wg(t, e), t.series = bn(t.series), f(t.series, function(t) {
            if (b(t)) {
                var e = t.type;
                if (("pie" === e || "gauge" === e) && null != t.clockWise && (t.clockwise = t.clockWise), 
                "gauge" === e) {
                    var n = Ra(t, "pointer.color");
                    null != n && Na(t, "itemStyle.normal.color", n);
                }
                Ba(t);
            }
        }), t.dataRange && (t.visualMap = t.dataRange), f(Mg, function(e) {
            var n = t[e];
            n && (_(n) || (n = [ n ]), f(n, function(t) {
                Ba(t);
            }));
        });
    }, Tg = Va.prototype;
    Tg.pure = !1, Tg.persistent = !0, Tg.getSource = function() {
        return this._source;
    };
    var Cg = {
        arrayRows_column: {
            pure: !0,
            count: function() {
                return Math.max(0, this._data.length - this._source.startIndex);
            },
            getItem: function(t) {
                return this._data[t + this._source.startIndex];
            },
            appendData: Ga
        },
        arrayRows_row: {
            pure: !0,
            count: function() {
                var t = this._data[0];
                return t ? Math.max(0, t.length - this._source.startIndex) : 0;
            },
            getItem: function(t) {
                t += this._source.startIndex;
                for (var e = [], n = this._data, i = 0; i < n.length; i++) {
                    var r = n[i];
                    e.push(r ? r[t] : null);
                }
                return e;
            },
            appendData: function() {
                throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
            }
        },
        objectRows: {
            pure: !0,
            count: Wa,
            getItem: Ha,
            appendData: Ga
        },
        keyedColumns: {
            pure: !0,
            count: function() {
                var t = this._source.dimensionsDefine[0].name, e = this._data[t];
                return e ? e.length : 0;
            },
            getItem: function(t) {
                for (var e = [], n = this._source.dimensionsDefine, i = 0; i < n.length; i++) {
                    var r = this._data[n[i].name];
                    e.push(r ? r[t] : null);
                }
                return e;
            },
            appendData: function(t) {
                var e = this._data;
                f(t, function(t, n) {
                    for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r]);
                });
            }
        },
        original: {
            count: Wa,
            getItem: Ha,
            appendData: Ga
        },
        typedArray: {
            persistent: !1,
            pure: !0,
            count: function() {
                return this._data ? this._data.length / this._dimSize : 0;
            },
            getItem: function(t, e) {
                t -= this._offset, e = e || [];
                for (var n = this._dimSize * t, i = 0; i < this._dimSize; i++) e[i] = this._data[n + i];
                return e;
            },
            appendData: function(t) {
                this._data = t;
            },
            clean: function() {
                this._offset += this.count(), this._data = null;
            }
        }
    }, Ig = {
        arrayRows: Za,
        objectRows: function(t, e, n, i) {
            return null != n ? t[i] : t;
        },
        keyedColumns: Za,
        original: function(t, e, n) {
            var i = Sn(t);
            return null != n && i instanceof Array ? i[n] : i;
        },
        typedArray: Za
    }, Ag = {
        arrayRows: Xa,
        objectRows: function(t, e) {
            return qa(t[e], this._dimensionInfos[e]);
        },
        keyedColumns: Xa,
        original: function(t, e, n, i) {
            var r = t && (null == t.value ? t : t.value);
            return !this._rawData.pure && Tn(t) && (this.hasItemOption = !0), qa(r instanceof Array ? r[i] : r, this._dimensionInfos[e]);
        },
        typedArray: function(t, e, n, i) {
            return t[i];
        }
    }, kg = /\{@(.+?)\}/g, Dg = {
        getDataParams: function(t, e) {
            var n = this.getData(e), i = this.getRawValue(t, e), r = n.getRawIndex(t), a = n.getName(t), o = n.getRawDataItem(t), s = n.getItemVisual(t, "color"), l = this.ecModel.getComponent("tooltip"), h = Rn(l && l.get("renderMode")), u = this.mainType, c = "series" === u;
            return {
                componentType: u,
                componentSubType: this.subType,
                componentIndex: this.componentIndex,
                seriesType: c ? this.subType : null,
                seriesIndex: this.seriesIndex,
                seriesId: c ? this.id : null,
                seriesName: c ? this.name : null,
                name: a,
                dataIndex: r,
                data: o,
                dataType: e,
                value: i,
                color: s,
                marker: Hr({
                    color: s,
                    renderMode: h
                }),
                $vars: [ "seriesName", "name", "value" ]
            };
        },
        getFormattedLabel: function(t, e, n, i, r) {
            e = e || "normal";
            var a = this.getData(n), o = a.getItemModel(t), s = this.getDataParams(t, n);
            null != i && s.value instanceof Array && (s.value = s.value[i]);
            var l = o.get("normal" === e ? [ r || "label", "formatter" ] : [ e, r || "label", "formatter" ]);
            return "function" == typeof l ? (s.status = e, l(s)) : "string" == typeof l ? Wr(l, s).replace(kg, function(e, n) {
                var i = n.length;
                return "[" === n.charAt(0) && "]" === n.charAt(i - 1) && (n = +n.slice(1, i - 1)), 
                Ya(a, t, n);
            }) : void 0;
        },
        getRawValue: function(t, e) {
            return Ya(this.getData(e), t);
        },
        formatTooltip: function() {}
    }, Pg = Ua.prototype;
    Pg.perform = function(t) {
        function e(t) {
            return !(t >= 1) && (t = 1), t;
        }
        var n = this._upstream, i = t && t.skip;
        if (this._dirty && n) {
            var r = this.context;
            r.data = r.outputData = n.context.outputData;
        }
        this.__pipeline && (this.__pipeline.currentTask = this);
        var a;
        this._plan && !i && (a = this._plan(this.context));
        var o = e(this._modBy), s = this._modDataCount || 0, l = e(t && t.modBy), h = t && t.modDataCount || 0;
        (o !== l || s !== h) && (a = "reset");
        var u;
        (this._dirty || "reset" === a) && (this._dirty = !1, u = Ka(this, i)), this._modBy = l, 
        this._modDataCount = h;
        var c = t && t.step;
        if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, 
        this._progress) {
            var d = this._dueIndex, f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
            if (!i && (u || f > d)) {
                var p = this._progress;
                if (_(p)) for (var g = 0; g < p.length; g++) $a(this, p[g], d, f, l, h); else $a(this, p, d, f, l, h);
            }
            this._dueIndex = f;
            var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;
            this._outputDueEnd = v;
        } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
        return this.unfinished();
    };
    var Lg = function() {
        function t() {
            return n > i ? i++ : null;
        }
        function e() {
            var t = i % o * r + Math.ceil(i / o), e = i >= n ? null : a > t ? t : i;
            return i++, e;
        }
        var n, i, r, a, o, s = {
            reset: function(l, h, u, c) {
                i = l, n = h, r = u, a = c, o = Math.ceil(a / r), s.next = r > 1 && a > 0 ? e : t;
            }
        };
        return s;
    }();
    Pg.dirty = function() {
        this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, Pg.unfinished = function() {
        return this._progress && this._dueIndex < this._dueEnd;
    }, Pg.pipe = function(t) {
        (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, 
        t.dirty());
    }, Pg.dispose = function() {
        this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), 
        this._dirty = !1, this._disposed = !0);
    }, Pg.getUpstream = function() {
        return this._upstream;
    }, Pg.getDownstream = function() {
        return this._downstream;
    }, Pg.setOutputEnd = function(t) {
        this._outputDueEnd = this._settedOutputEnd = t;
    };
    var Og = Pn(), Eg = jp.extend({
        type: "series.__base__",
        seriesIndex: 0,
        coordinateSystem: null,
        defaultOption: null,
        legendDataProvider: null,
        visualColorAccessPath: "itemStyle.color",
        layoutMode: null,
        init: function(t, e, n) {
            this.seriesIndex = this.componentIndex, this.dataTask = ja({
                count: to,
                reset: eo
            }), this.dataTask.context = {
                model: this
            }, this.mergeDefaultAndTheme(t, n), ra(this);
            var i = this.getInitialData(t, n);
            io(i, this), this.dataTask.context.data = i, Og(this).dataBeforeProcessed = i, Qa(this);
        },
        mergeDefaultAndTheme: function(t, e) {
            var n = this.layoutMode, i = n ? Ur(t) : {}, a = this.subType;
            jp.hasClass(a) && (a += "Series"), r(t, e.getTheme().get(this.subType)), r(t, this.getDefaultOption()), 
            Mn(t, "label", [ "show" ]), this.fillDataTextStyle(t.data), n && jr(t, i, n);
        },
        mergeOption: function(t, e) {
            t = r(this.option, t, !0), this.fillDataTextStyle(t.data);
            var n = this.layoutMode;
            n && jr(this.option, t, n), ra(this);
            var i = this.getInitialData(t, e);
            io(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, Og(this).dataBeforeProcessed = i, 
            Qa(this);
        },
        fillDataTextStyle: function(t) {
            if (t && !S(t)) for (var e = [ "show" ], n = 0; n < t.length; n++) t[n] && t[n].label && Mn(t[n], "label", e);
        },
        getInitialData: function() {},
        appendData: function(t) {
            this.getRawData().appendData(t.data);
        },
        getData: function(t) {
            var e = ao(this);
            if (e) {
                var n = e.context.data;
                return null == t ? n : n.getLinkedData(t);
            }
            return Og(this).data;
        },
        setData: function(t) {
            var e = ao(this);
            if (e) {
                var n = e.context;
                n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, 
                e !== this.dataTask && (n.data = t);
            }
            Og(this).data = t;
        },
        getSource: function() {
            return na(this);
        },
        getRawData: function() {
            return Og(this).dataBeforeProcessed;
        },
        getBaseAxis: function() {
            var t = this.coordinateSystem;
            return t && t.getBaseAxis && t.getBaseAxis();
        },
        formatTooltip: function(t, e, n, i) {
            var r = this, a = "html" === (i = i || "html") ? "<br/>" : "\n", o = "richText" === i, s = {}, l = 0, h = this.getData(), u = h.mapDimension("defaultedTooltip", !0), c = u.length, d = this.getRawValue(t), p = _(d), v = h.getItemVisual(t, "color");
            b(v) && v.colorStops && (v = (v.colorStops[0] || {}).color), v = v || "transparent";
            var m = (c > 1 || p && !c ? function(n) {
                function a(t, n) {
                    var a = h.getDimensionInfo(n);
                    if (a && !1 !== a.otherDims.tooltip) {
                        var u = a.type, f = "sub" + r.seriesIndex + "at" + l, p = Hr({
                            color: v,
                            type: "subItem",
                            renderMode: i,
                            markerId: f
                        }), g = "string" == typeof p ? p : p.content, m = (c ? g + Vr(a.displayName || "-") + ": " : "") + Vr("ordinal" === u ? t + "" : "time" === u ? e ? "" : Zr("yyyy/MM/dd hh:mm:ss", t) : Fr(t));
                        m && d.push(m), o && (s[f] = v, ++l);
                    }
                }
                var c = g(n, function(t, e, n) {
                    var i = h.getDimensionInfo(n);
                    return t |= i && !1 !== i.tooltip && null != i.displayName;
                }, 0), d = [];
                u.length ? f(u, function(e) {
                    a(Ya(h, t, e), e);
                }) : f(n, a);
                var p = c ? o ? "\n" : "<br/>" : "", m = p + d.join(p || ", ");
                return {
                    renderMode: i,
                    content: m,
                    style: s
                };
            }(d) : function(t) {
                return {
                    renderMode: i,
                    content: Vr(Fr(t)),
                    style: s
                };
            }(c ? Ya(h, t, u[0]) : p ? d[0] : d)).content, y = r.seriesIndex + "at" + l, x = Hr({
                color: v,
                type: "item",
                renderMode: i,
                markerId: y
            });
            s[y] = v, ++l;
            var w = h.getName(t), M = this.name;
            An(this) || (M = ""), M = M ? Vr(M) + (e ? ": " : a) : "";
            var S = "string" == typeof x ? x : x.content;
            return {
                html: e ? S + M + m : M + S + (w ? Vr(w) + ": " + m : m),
                markers: s
            };
        },
        isAnimationEnabled: function() {
            if (Lu.node) return !1;
            var t = this.getShallow("animation");
            return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), 
            t;
        },
        restoreData: function() {
            this.dataTask.dirty();
        },
        getColorFromPalette: function(t, e, n) {
            var i = this.ecModel, r = Qp.getColorFromPalette.call(this, t, e, n);
            return r || (r = i.getColorFromPalette(t, e, n)), r;
        },
        coordDimToDataDim: function(t) {
            return this.getRawData().mapDimension(t, !0);
        },
        getProgressive: function() {
            return this.get("progressive");
        },
        getProgressiveThreshold: function() {
            return this.get("progressiveThreshold");
        },
        getAxisTooltipData: null,
        getTooltipPosition: null,
        pipeTask: null,
        preventIncremental: null,
        pipelineContext: null
    });
    c(Eg, Dg), c(Eg, Qp);
    var zg = function() {
        this.group = new Wc(), this.uid = Tr("viewComponent");
    };
    zg.prototype = {
        constructor: zg,
        init: function() {},
        render: function() {},
        dispose: function() {},
        filterForExposedEvent: null
    };
    var Rg = zg.prototype;
    Rg.updateView = Rg.updateLayout = Rg.updateVisual = function() {}, Fn(zg), Gn(zg, {
        registerWhenExtend: !0
    });
    var Ng = function() {
        var t = Pn();
        return function(e) {
            var n = t(e), i = e.pipelineContext, r = n.large, a = n.progressiveRender, o = n.large = i.large, s = n.progressiveRender = i.progressiveRender;
            return !!(r ^ o || a ^ s) && "reset";
        };
    }, Bg = Pn(), Fg = Ng();
    oo.prototype = {
        type: "chart",
        init: function() {},
        render: function() {},
        highlight: function(t, e, n, i) {
            lo(t.getData(), i, "emphasis");
        },
        downplay: function(t, e, n, i) {
            lo(t.getData(), i, "normal");
        },
        remove: function() {
            this.group.removeAll();
        },
        dispose: function() {},
        incrementalPrepareRender: null,
        incrementalRender: null,
        updateTransform: null,
        filterForExposedEvent: null
    };
    var Vg = oo.prototype;
    Vg.updateView = Vg.updateLayout = Vg.updateVisual = function(t, e, n, i) {
        this.render(t, e, n, i);
    }, Fn(oo), Gn(oo, {
        registerWhenExtend: !0
    }), oo.markUpdateMethod = function(t, e) {
        Bg(t).updateMethod = e;
    };
    var Wg = {
        incrementalPrepareRender: {
            progress: function(t, e) {
                e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);
            }
        },
        render: {
            forceFirstProgress: !0,
            progress: function(t, e) {
                e.view.render(e.model, e.ecModel, e.api, e.payload);
            }
        }
    }, Hg = "\0__throttleOriginMethod", Gg = "\0__throttleRate", Zg = "\0__throttleType", Xg = {
        createOnAllSeries: !0,
        performRawSeries: !0,
        reset: function(t, e) {
            var n = t.getData(), i = (t.visualColorAccessPath || "itemStyle.color").split("."), r = t.get(i) || t.getColorFromPalette(t.name, null, e.getSeriesCount());
            if (n.setVisual("color", r), !e.isSeriesFiltered(t)) {
                "function" != typeof r || r instanceof pp || n.each(function(e) {
                    n.setItemVisual(e, "color", r(t.getDataParams(e)));
                });
                return {
                    dataEach: n.hasItemOption ? function(t, e) {
                        var n = t.getItemModel(e).get(i, !0);
                        null != n && t.setItemVisual(e, "color", n);
                    } : null
                };
            }
        }
    }, qg = {
        toolbox: {
            brush: {
                title: {
                    rect: "矩形选择",
                    polygon: "圈选",
                    lineX: "横向选择",
                    lineY: "纵向选择",
                    keep: "保持选择",
                    clear: "清除选择"
                }
            },
            dataView: {
                title: "数据视图",
                lang: [ "数据视图", "关闭", "刷新" ]
            },
            dataZoom: {
                title: {
                    zoom: "区域缩放",
                    back: "区域缩放还原"
                }
            },
            magicType: {
                title: {
                    line: "切换为折线图",
                    bar: "切换为柱状图",
                    stack: "切换为堆叠",
                    tiled: "切换为平铺"
                }
            },
            restore: {
                title: "还原"
            },
            saveAsImage: {
                title: "保存为图片",
                lang: [ "右键另存为图片" ]
            }
        },
        series: {
            typeNames: {
                pie: "饼图",
                bar: "柱状图",
                line: "折线图",
                scatter: "散点图",
                effectScatter: "涟漪散点图",
                radar: "雷达图",
                tree: "树图",
                treemap: "矩形树图",
                boxplot: "箱型图",
                candlestick: "K线图",
                k: "K线图",
                heatmap: "热力图",
                map: "地图",
                parallel: "平行坐标图",
                lines: "线图",
                graph: "关系图",
                sankey: "桑基图",
                funnel: "漏斗图",
                gauge: "仪表盘图",
                pictorialBar: "象形柱图",
                themeRiver: "主题河流图",
                sunburst: "旭日图"
            }
        },
        aria: {
            general: {
                withTitle: "这是一个关于“{title}”的图表。",
                withoutTitle: "这是一个图表，"
            },
            series: {
                single: {
                    prefix: "",
                    withName: "图表类型是{seriesType}，表示{seriesName}。",
                    withoutName: "图表类型是{seriesType}。"
                },
                multiple: {
                    prefix: "它由{seriesCount}个图表系列组成。",
                    withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
                    withoutName: "第{seriesId}个系列是一个{seriesType}，",
                    separator: {
                        middle: "；",
                        end: "。"
                    }
                }
            },
            data: {
                allData: "其数据是——",
                partialData: "其中，前{displayCnt}项是——",
                withName: "{name}的数据是{value}",
                withoutName: "{value}",
                separator: {
                    middle: "，",
                    end: ""
                }
            }
        }
    }, Yg = function(t, e) {
        function n(t, e) {
            if ("string" != typeof t) return t;
            var n = t;
            return f(e, function(t, e) {
                n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t);
            }), n;
        }
        function i(t) {
            var e = a.get(t);
            if (null == e) {
                for (var n = t.split("."), i = qg.aria, r = 0; r < n.length; ++r) i = i[n[r]];
                return i;
            }
            return e;
        }
        function r(t) {
            return qg.series.typeNames[t] || "自定义图";
        }
        var a = e.getModel("aria");
        if (a.get("show")) {
            if (a.get("description")) return void t.setAttribute("aria-label", a.get("description"));
            var o = 0;
            e.eachSeries(function() {
                ++o;
            }, this);
            var s, l = a.get("data.maxCount") || 10, h = a.get("series.maxCount") || 10, u = Math.min(o, h);
            if (!(1 > o)) {
                var c = function() {
                    var t = e.getModel("title").option;
                    return t && t.length && (t = t[0]), t && t.text;
                }();
                s = c ? n(i("general.withTitle"), {
                    title: c
                }) : i("general.withoutTitle");
                var d = [];
                s += n(i(o > 1 ? "series.multiple.prefix" : "series.single.prefix"), {
                    seriesCount: o
                }), e.eachSeries(function(t, e) {
                    if (u > e) {
                        var a, s = t.get("name"), h = "series." + (o > 1 ? "multiple" : "single") + ".";
                        a = n(a = i(s ? h + "withName" : h + "withoutName"), {
                            seriesId: t.seriesIndex,
                            seriesName: t.get("name"),
                            seriesType: r(t.subType)
                        });
                        var c = t.getData();
                        window.data = c, a += c.count() > l ? n(i("data.partialData"), {
                            displayCnt: l
                        }) : i("data.allData");
                        for (var f = [], p = 0; p < c.count(); p++) if (l > p) {
                            var g = c.getName(p), v = Ya(c, p);
                            f.push(n(i(g ? "data.withName" : "data.withoutName"), {
                                name: g,
                                value: v
                            }));
                        }
                        a += f.join(i("data.separator.middle")) + i("data.separator.end"), d.push(a);
                    }
                }), s += d.join(i("series.multiple.separator.middle")) + i("series.multiple.separator.end"), 
                t.setAttribute("aria-label", s);
            }
        }
    }, jg = Math.PI, Ug = go.prototype;
    Ug.restoreData = function(t, e) {
        t.restoreData(e), this._stageTaskMap.each(function(t) {
            var e = t.overallTask;
            e && e.dirty();
        });
    }, Ug.getPerformArgs = function(t, e) {
        if (t.__pipeline) {
            var n = this._pipelineMap.get(t.__pipeline.id), i = n.context, r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex ? n.step : null, a = i && i.modDataCount;
            return {
                step: r,
                modBy: null != a ? Math.ceil(a / r) : null,
                modDataCount: a
            };
        }
    }, Ug.getPipeline = function(t) {
        return this._pipelineMap.get(t);
    }, Ug.updateStreamModes = function(t, e) {
        var n = this._pipelineMap.get(t.uid), i = t.getData().count(), r = n.progressiveEnabled && e.incrementalPrepareRender && i >= n.threshold, a = t.get("large") && i >= t.get("largeThreshold"), o = "mod" === t.get("progressiveChunkMode") ? i : null;
        t.pipelineContext = n.context = {
            progressiveRender: r,
            modDataCount: o,
            large: a
        };
    }, Ug.restorePipelines = function(t) {
        var e = this, n = e._pipelineMap = N();
        t.eachSeries(function(t) {
            var i = t.getProgressive(), r = t.uid;
            n.set(r, {
                id: r,
                head: null,
                tail: null,
                threshold: t.getProgressiveThreshold(),
                progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
                blockIndex: -1,
                step: Math.round(i || 700),
                count: 0
            }), Io(e, t, t.dataTask);
        });
    }, Ug.prepareStageTasks = function() {
        var t = this._stageTaskMap, e = this.ecInstance.getModel(), n = this.api;
        f(this._allHandlers, function(i) {
            var r = t.get(i.uid) || t.set(i.uid, []);
            i.reset && mo(this, i, r, e, n), i.overallReset && yo(this, i, r, e, n);
        }, this);
    }, Ug.prepareView = function(t, e, n, i) {
        var r = t.renderTask, a = r.context;
        a.model = e, a.ecModel = n, a.api = i, r.__block = !t.incrementalPrepareRender, 
        Io(this, e, r);
    }, Ug.performDataProcessorTasks = function(t, e) {
        vo(this, this._dataProcessorHandlers, t, e, {
            block: !0
        });
    }, Ug.performVisualTasks = function(t, e, n) {
        vo(this, this._visualHandlers, t, e, n);
    }, Ug.performSeriesTasks = function(t) {
        var e;
        t.eachSeries(function(t) {
            e |= t.dataTask.perform();
        }), this.unfinished |= e;
    }, Ug.plan = function() {
        this._pipelineMap.each(function(t) {
            var e = t.tail;
            do {
                if (e.__block) {
                    t.blockIndex = e.__idxInPipeline;
                    break;
                }
                e = e.getUpstream();
            } while (e);
        });
    };
    var $g = Ug.updatePayload = function(t, e) {
        "remain" !== e && (t.context.payload = e);
    }, Kg = To(0);
    go.wrapStageHandler = function(t, e) {
        return x(t) && (t = {
            overallReset: t,
            seriesType: Ao(t)
        }), t.uid = Tr("stageHandler"), e && (t.visualType = e), t;
    };
    var Qg, Jg = {}, tv = {};
    ko(Jg, ug), ko(tv, xa), Jg.eachSeriesByType = Jg.eachRawSeriesByType = function(t) {
        Qg = t;
    }, Jg.eachComponent = function(t) {
        "series" === t.mainType && t.subType && (Qg = t.subType);
    };
    var ev = [ "#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF" ], nv = {
        color: ev,
        colorLayer: [ [ "#37A2DA", "#ffd85c", "#fd7b5f" ], [ "#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5" ], [ "#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF" ], ev ]
    }, iv = "#eee", rv = function() {
        return {
            axisLine: {
                lineStyle: {
                    color: iv
                }
            },
            axisTick: {
                lineStyle: {
                    color: iv
                }
            },
            axisLabel: {
                textStyle: {
                    color: iv
                }
            },
            splitLine: {
                lineStyle: {
                    type: "dashed",
                    color: "#aaa"
                }
            },
            splitArea: {
                areaStyle: {
                    color: iv
                }
            }
        };
    }, av = [ "#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42" ], ov = {
        color: av,
        backgroundColor: "#333",
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: iv
                },
                crossStyle: {
                    color: iv
                }
            }
        },
        legend: {
            textStyle: {
                color: iv
            }
        },
        textStyle: {
            color: iv
        },
        title: {
            textStyle: {
                color: iv
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: iv
                }
            }
        },
        dataZoom: {
            textStyle: {
                color: iv
            }
        },
        visualMap: {
            textStyle: {
                color: iv
            }
        },
        timeline: {
            lineStyle: {
                color: iv
            },
            itemStyle: {
                normal: {
                    color: av[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: iv
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: iv,
                    borderColor: iv
                }
            }
        },
        timeAxis: rv(),
        logAxis: rv(),
        valueAxis: rv(),
        categoryAxis: rv(),
        line: {
            symbol: "circle"
        },
        graph: {
            color: av
        },
        gauge: {
            title: {
                textStyle: {
                    color: iv
                }
            }
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: "#FD1050",
                    color0: "#0CF49B",
                    borderColor: "#FD1050",
                    borderColor0: "#0CF49B"
                }
            }
        }
    };
    ov.categoryAxis.splitLine.show = !1, jp.extend({
        type: "dataset",
        defaultOption: {
            seriesLayoutBy: og,
            sourceHeader: null,
            dimensions: null,
            source: null
        },
        optionUpdated: function() {
            ea(this);
        }
    }), zg.extend({
        type: "dataset"
    });
    var sv = Mi.extend({
        type: "ellipse",
        shape: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0
        },
        buildPath: function(t, e) {
            var n = .5522848, i = e.cx, r = e.cy, a = e.rx, o = e.ry, s = a * n, l = o * n;
            t.moveTo(i - a, r), t.bezierCurveTo(i - a, r - l, i - s, r - o, i, r - o), t.bezierCurveTo(i + s, r - o, i + a, r - l, i + a, r), 
            t.bezierCurveTo(i + a, r + l, i + s, r + o, i, r + o), t.bezierCurveTo(i - s, r + o, i - a, r + l, i - a, r), 
            t.closePath();
        }
    }), lv = /[\s,]+/;
    Po.prototype.parse = function(t, e) {
        e = e || {};
        var n = Do(t);
        if (!n) throw new Error("Illegal svg");
        var i = new Wc();
        this._root = i;
        var r = n.getAttribute("viewBox") || "", a = parseFloat(n.getAttribute("width") || e.width), o = parseFloat(n.getAttribute("height") || e.height);
        isNaN(a) && (a = null), isNaN(o) && (o = null), zo(n, i, null, !0);
        for (var s = n.firstChild; s; ) this._parseNode(s, i), s = s.nextSibling;
        var l, h;
        if (r) {
            var u = O(r).split(lv);
            u.length >= 4 && (l = {
                x: parseFloat(u[0] || 0),
                y: parseFloat(u[1] || 0),
                width: parseFloat(u[2]),
                height: parseFloat(u[3])
            });
        }
        if (l && null != a && null != o && (h = Fo(l, a, o), !e.ignoreViewBox)) {
            var c = i;
            (i = new Wc()).add(c), c.scale = h.scale.slice(), c.position = h.position.slice();
        }
        return e.ignoreRootClip || null == a || null == o || i.setClipPath(new sp({
            shape: {
                x: 0,
                y: 0,
                width: a,
                height: o
            }
        })), {
            root: i,
            width: a,
            height: o,
            viewBoxRect: l,
            viewBoxTransform: h
        };
    }, Po.prototype._parseNode = function(t, e) {
        var n = t.nodeName.toLowerCase();
        "defs" === n ? this._isDefine = !0 : "text" === n && (this._isText = !0);
        var i;
        if (this._isDefine) {
            if (o = uv[n]) {
                var r = o.call(this, t), a = t.getAttribute("id");
                a && (this._defs[a] = r);
            }
        } else {
            var o = hv[n];
            o && (i = o.call(this, t, e), e.add(i));
        }
        for (var s = t.firstChild; s; ) 1 === s.nodeType && this._parseNode(s, i), 3 === s.nodeType && this._isText && this._parseText(s, i), 
        s = s.nextSibling;
        "defs" === n ? this._isDefine = !1 : "text" === n && (this._isText = !1);
    }, Po.prototype._parseText = function(t, e) {
        if (1 === t.nodeType) {
            var n = t.getAttribute("dx") || 0, i = t.getAttribute("dy") || 0;
            this._textX += parseFloat(n), this._textY += parseFloat(i);
        }
        var r = new Uf({
            style: {
                text: t.textContent,
                transformText: !0
            },
            position: [ this._textX || 0, this._textY || 0 ]
        });
        Oo(e, r), zo(t, r, this._defs);
        var a = r.style.fontSize;
        a && 9 > a && (r.style.fontSize = 9, r.scale = r.scale || [ 1, 1 ], r.scale[0] *= a / 9, 
        r.scale[1] *= a / 9);
        var o = r.getBoundingRect();
        return this._textX += o.width, e.add(r), r;
    };
    var hv = {
        g: function(t, e) {
            var n = new Wc();
            return Oo(e, n), zo(t, n, this._defs), n;
        },
        rect: function(t, e) {
            var n = new sp();
            return Oo(e, n), zo(t, n, this._defs), n.setShape({
                x: parseFloat(t.getAttribute("x") || 0),
                y: parseFloat(t.getAttribute("y") || 0),
                width: parseFloat(t.getAttribute("width") || 0),
                height: parseFloat(t.getAttribute("height") || 0)
            }), n;
        },
        circle: function(t, e) {
            var n = new $f();
            return Oo(e, n), zo(t, n, this._defs), n.setShape({
                cx: parseFloat(t.getAttribute("cx") || 0),
                cy: parseFloat(t.getAttribute("cy") || 0),
                r: parseFloat(t.getAttribute("r") || 0)
            }), n;
        },
        line: function(t, e) {
            var n = new hp();
            return Oo(e, n), zo(t, n, this._defs), n.setShape({
                x1: parseFloat(t.getAttribute("x1") || 0),
                y1: parseFloat(t.getAttribute("y1") || 0),
                x2: parseFloat(t.getAttribute("x2") || 0),
                y2: parseFloat(t.getAttribute("y2") || 0)
            }), n;
        },
        ellipse: function(t, e) {
            var n = new sv();
            return Oo(e, n), zo(t, n, this._defs), n.setShape({
                cx: parseFloat(t.getAttribute("cx") || 0),
                cy: parseFloat(t.getAttribute("cy") || 0),
                rx: parseFloat(t.getAttribute("rx") || 0),
                ry: parseFloat(t.getAttribute("ry") || 0)
            }), n;
        },
        polygon: function(t, e) {
            var n = t.getAttribute("points");
            n && (n = Eo(n));
            var i = new ip({
                shape: {
                    points: n || []
                }
            });
            return Oo(e, i), zo(t, i, this._defs), i;
        },
        polyline: function(t, e) {
            var n = new Mi();
            Oo(e, n), zo(t, n, this._defs);
            var i = t.getAttribute("points");
            return i && (i = Eo(i)), new rp({
                shape: {
                    points: i || []
                }
            });
        },
        image: function(t, e) {
            var n = new ln();
            return Oo(e, n), zo(t, n, this._defs), n.setStyle({
                image: t.getAttribute("xlink:href"),
                x: t.getAttribute("x"),
                y: t.getAttribute("y"),
                width: t.getAttribute("width"),
                height: t.getAttribute("height")
            }), n;
        },
        text: function(t, e) {
            var n = t.getAttribute("x") || 0, i = t.getAttribute("y") || 0, r = t.getAttribute("dx") || 0, a = t.getAttribute("dy") || 0;
            this._textX = parseFloat(n) + parseFloat(r), this._textY = parseFloat(i) + parseFloat(a);
            var o = new Wc();
            return Oo(e, o), zo(t, o, this._defs), o;
        },
        tspan: function(t, e) {
            var n = t.getAttribute("x"), i = t.getAttribute("y");
            null != n && (this._textX = parseFloat(n)), null != i && (this._textY = parseFloat(i));
            var r = t.getAttribute("dx") || 0, a = t.getAttribute("dy") || 0, o = new Wc();
            return Oo(e, o), zo(t, o, this._defs), this._textX += r, this._textY += a, o;
        },
        path: function(t, e) {
            var n = Ii(t.getAttribute("d") || "");
            return Oo(e, n), zo(t, n, this._defs), n;
        }
    }, uv = {
        lineargradient: function(t) {
            var e = parseInt(t.getAttribute("x1") || 0, 10), n = parseInt(t.getAttribute("y1") || 0, 10), i = parseInt(t.getAttribute("x2") || 10, 10), r = parseInt(t.getAttribute("y2") || 0, 10), a = new gp(e, n, i, r);
            return Lo(t, a), a;
        },
        radialgradient: function() {}
    }, cv = {
        fill: "fill",
        stroke: "stroke",
        "stroke-width": "lineWidth",
        opacity: "opacity",
        "fill-opacity": "fillOpacity",
        "stroke-opacity": "strokeOpacity",
        "stroke-dasharray": "lineDash",
        "stroke-dashoffset": "lineDashOffset",
        "stroke-linecap": "lineCap",
        "stroke-linejoin": "lineJoin",
        "stroke-miterlimit": "miterLimit",
        "font-family": "fontFamily",
        "font-size": "fontSize",
        "font-style": "fontStyle",
        "font-weight": "fontWeight",
        "text-align": "textAlign",
        "alignment-baseline": "textBaseline"
    }, dv = /url\(\s*#(.*?)\)/, fv = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g, pv = /([^\s:;]+)\s*:\s*([^:;]+)/g, gv = N(), vv = {
        registerMap: function(t, e, n) {
            var i;
            return _(e) ? i = e : e.svg ? i = [ {
                type: "svg",
                source: e.svg,
                specialAreas: e.specialAreas
            } ] : (e.geoJson && !e.features && (n = e.specialAreas, e = e.geoJson), i = [ {
                type: "geoJSON",
                source: e,
                specialAreas: n
            } ]), f(i, function(t) {
                var e = t.type;
                "geoJson" === e && (e = t.type = "geoJSON"), (0, mv[e])(t);
            }), gv.set(t, i);
        },
        retrieveMap: function(t) {
            return gv.get(t);
        }
    }, mv = {
        geoJSON: function(t) {
            var e = t.source;
            t.geoJSON = w(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e;
        },
        svg: function(t) {
            t.svgXML = Do(t.source);
        }
    }, yv = L, _v = f, xv = x, wv = b, bv = jp.parseClassType, Mv = {
        zrender: "4.0.6"
    }, Sv = 1e3, Tv = 1e3, Cv = 3e3, Iv = {
        PROCESSOR: {
            FILTER: Sv,
            STATISTIC: 5e3
        },
        VISUAL: {
            LAYOUT: Tv,
            GLOBAL: 2e3,
            CHART: Cv,
            COMPONENT: 4e3,
            BRUSH: 5e3
        }
    }, Av = "__flagInMainProcess", kv = "__optionUpdated", Dv = /^[a-zA-Z0-9_]+$/;
    Wo.prototype.on = Vo("on"), Wo.prototype.off = Vo("off"), Wo.prototype.one = Vo("one"), 
    c(Wo, tc);
    var Pv = Ho.prototype;
    Pv._onframe = function() {
        if (!this._disposed) {
            var t = this._scheduler;
            if (this[kv]) {
                var e = this[kv].silent;
                this[Av] = !0, Zo(this), Lv.update.call(this), this[Av] = !1, this[kv] = !1, jo.call(this, e), 
                Uo.call(this, e);
            } else if (t.unfinished) {
                var n = 1, i = this._model;
                this._api;
                t.unfinished = !1;
                do {
                    var r = +new Date();
                    t.performSeriesTasks(i), t.performDataProcessorTasks(i), qo(this, i), t.performVisualTasks(i), 
                    es(this, this._model, 0, "remain"), n -= +new Date() - r;
                } while (n > 0 && t.unfinished);
                t.unfinished || this._zr.flush();
            }
        }
    }, Pv.getDom = function() {
        return this._dom;
    }, Pv.getZr = function() {
        return this._zr;
    }, Pv.setOption = function(t, e, n) {
        var i;
        if (wv(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[Av] = !0, !this._model || e) {
            var r = new ba(this._api), a = this._theme, o = this._model = new ug(null, null, a, r);
            o.scheduler = this._scheduler, o.init(null, null, a, r);
        }
        this._model.setOption(t, Nv), n ? (this[kv] = {
            silent: i
        }, this[Av] = !1) : (Zo(this), Lv.update.call(this), this._zr.flush(), this[kv] = !1, 
        this[Av] = !1, jo.call(this, i), Uo.call(this, i));
    }, Pv.setTheme = function() {
        console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    }, Pv.getModel = function() {
        return this._model;
    }, Pv.getOption = function() {
        return this._model && this._model.getOption();
    }, Pv.getWidth = function() {
        return this._zr.getWidth();
    }, Pv.getHeight = function() {
        return this._zr.getHeight();
    }, Pv.getDevicePixelRatio = function() {
        return this._zr.painter.dpr || window.devicePixelRatio || 1;
    }, Pv.getRenderedCanvas = function(t) {
        if (Lu.canvasSupported) return (t = t || {}).pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor"), 
        this._zr.painter.getRenderedCanvas(t);
    }, Pv.getSvgDataUrl = function() {
        if (Lu.svgSupported) {
            var t = this._zr;
            return f(t.storage.getDisplayList(), function(t) {
                t.stopAnimation(!0);
            }), t.painter.pathToDataUrl();
        }
    }, Pv.getDataURL = function(t) {
        var e = (t = t || {}).excludeComponents, n = this._model, i = [], r = this;
        _v(e, function(t) {
            n.eachComponent({
                mainType: t
            }, function(t) {
                var e = r._componentsMap[t.__viewId];
                e.group.ignore || (i.push(e), e.group.ignore = !0);
            });
        });
        var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
        return _v(i, function(t) {
            t.group.ignore = !1;
        }), a;
    }, Pv.getConnectedDataURL = function(t) {
        if (Lu.canvasSupported) {
            var e = this.group, n = Math.min, r = Math.max, a = 1 / 0;
            if (Gv[e]) {
                var o = a, s = a, l = -a, h = -a, u = [], c = t && t.pixelRatio || 1;
                f(Hv, function(a) {
                    if (a.group === e) {
                        var c = a.getRenderedCanvas(i(t)), d = a.getDom().getBoundingClientRect();
                        o = n(d.left, o), s = n(d.top, s), l = r(d.right, l), h = r(d.bottom, h), u.push({
                            dom: c,
                            left: d.left,
                            top: d.top
                        });
                    }
                });
                var d = (l *= c) - (o *= c), p = (h *= c) - (s *= c), g = Gu();
                g.width = d, g.height = p;
                var v = xn(g);
                return _v(u, function(t) {
                    var e = new ln({
                        style: {
                            x: t.left * c - o,
                            y: t.top * c - s,
                            image: t.dom
                        }
                    });
                    v.add(e);
                }), v.refreshImmediately(), g.toDataURL("image/" + (t && t.type || "png"));
            }
            return this.getDataURL(t);
        }
    }, Pv.convertToPixel = y(Go, "convertToPixel"), Pv.convertFromPixel = y(Go, "convertFromPixel"), 
    Pv.containPixel = function(t, e) {
        var n;
        return t = Ln(this._model, t), f(t, function(t, i) {
            i.indexOf("Models") >= 0 && f(t, function(t) {
                var r = t.coordinateSystem;
                if (r && r.containPoint) n |= !!r.containPoint(e); else if ("seriesModels" === i) {
                    var a = this._chartsMap[t.__viewId];
                    a && a.containPoint && (n |= a.containPoint(e, t));
                }
            }, this);
        }, this), !!n;
    }, Pv.getVisual = function(t, e) {
        var n = (t = Ln(this._model, t, {
            defaultMainType: "series"
        })).seriesModel.getData(), i = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? n.indexOfRawIndex(t.dataIndex) : null;
        return null != i ? n.getItemVisual(i, e) : n.getVisual(e);
    }, Pv.getViewOfComponentModel = function(t) {
        return this._componentsMap[t.__viewId];
    }, Pv.getViewOfSeriesModel = function(t) {
        return this._chartsMap[t.__viewId];
    };
    var Lv = {
        prepareAndUpdate: function(t) {
            Zo(this), Lv.update.call(this, t);
        },
        update: function(t) {
            var e = this._model, n = this._api, i = this._zr, r = this._coordSysMgr, a = this._scheduler;
            if (e) {
                a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, n), a.performDataProcessorTasks(e, t), 
                qo(this, e), r.update(e, n), Qo(e), a.performVisualTasks(e, t), Jo(this, e, n, t);
                var o = e.get("backgroundColor") || "transparent";
                if (Lu.canvasSupported) i.setBackgroundColor(o); else {
                    var s = Nt(o);
                    o = Gt(s, "rgb"), 0 === s[3] && (o = "transparent");
                }
                ns(e, n);
            }
        },
        updateTransform: function(t) {
            var e = this._model, n = this, i = this._api;
            if (e) {
                var r = [];
                e.eachComponent(function(a, o) {
                    var s = n.getViewOfComponentModel(o);
                    if (s && s.__alive) if (s.updateTransform) {
                        var l = s.updateTransform(o, e, i, t);
                        l && l.update && r.push(s);
                    } else r.push(s);
                });
                var a = N();
                e.eachSeries(function(r) {
                    var o = n._chartsMap[r.__viewId];
                    if (o.updateTransform) {
                        var s = o.updateTransform(r, e, i, t);
                        s && s.update && a.set(r.uid, 1);
                    } else a.set(r.uid, 1);
                }), Qo(e), this._scheduler.performVisualTasks(e, t, {
                    setDirty: !0,
                    dirtyMap: a
                }), es(n, e, 0, t, a), ns(e, this._api);
            }
        },
        updateView: function(t) {
            var e = this._model;
            e && (oo.markUpdateMethod(t, "updateView"), Qo(e), this._scheduler.performVisualTasks(e, t, {
                setDirty: !0
            }), Jo(this, this._model, this._api, t), ns(e, this._api));
        },
        updateVisual: function(t) {
            Lv.update.call(this, t);
        },
        updateLayout: function(t) {
            Lv.update.call(this, t);
        }
    };
    Pv.resize = function(t) {
        this._zr.resize(t);
        var e = this._model;
        if (this._loadingFX && this._loadingFX.resize(), e) {
            var n = e.resetOption("media"), i = t && t.silent;
            this[Av] = !0, n && Zo(this), Lv.update.call(this), this[Av] = !1, jo.call(this, i), 
            Uo.call(this, i);
        }
    }, Pv.showLoading = function(t, e) {
        if (wv(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Wv[t]) {
            var n = Wv[t](this._api, e), i = this._zr;
            this._loadingFX = n, i.add(n);
        }
    }, Pv.hideLoading = function() {
        this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, Pv.makeActionFromEvent = function(t) {
        var e = o({}, t);
        return e.type = zv[t.type], e;
    }, Pv.dispatchAction = function(t, e) {
        if (wv(e) || (e = {
            silent: !!e
        }), Ev[t.type] && this._model) {
            if (this[Av]) return void this._pendingActions.push(t);
            Yo.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : !1 !== e.flush && Lu.browser.weChat && this._throttledZrFlush(), 
            jo.call(this, e.silent), Uo.call(this, e.silent);
        }
    }, Pv.appendData = function(t) {
        var e = t.seriesIndex;
        this.getModel().getSeriesByIndex(e).appendData(t), this._scheduler.unfinished = !0;
    }, Pv.on = Vo("on"), Pv.off = Vo("off"), Pv.one = Vo("one");
    var Ov = [ "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu" ];
    Pv._initEvents = function() {
        _v(Ov, function(t) {
            var e = function(e) {
                var n, i = this.getModel(), r = e.target;
                if ("globalout" === t) n = {}; else if (r && null != r.dataIndex) {
                    var a = r.dataModel || i.getSeriesByIndex(r.seriesIndex);
                    n = a && a.getDataParams(r.dataIndex, r.dataType, r) || {};
                } else r && r.eventData && (n = o({}, r.eventData));
                if (n) {
                    var s = n.componentType, l = n.componentIndex;
                    ("markLine" === s || "markPoint" === s || "markArea" === s) && (s = "series", l = n.seriesIndex);
                    var h = s && null != l && i.getComponent(s, l), u = h && this["series" === h.mainType ? "_chartsMap" : "_componentsMap"][h.__viewId];
                    n.event = e, n.type = t, this._ecEventProcessor.eventInfo = {
                        targetEl: r,
                        packedEvent: n,
                        model: h,
                        view: u
                    }, this.trigger(t, n);
                }
            };
            e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this);
        }, this), _v(zv, function(t, e) {
            this._messageCenter.on(e, function(t) {
                this.trigger(e, t);
            }, this);
        }, this);
    }, Pv.isDisposed = function() {
        return this._disposed;
    }, Pv.clear = function() {
        this.setOption({
            series: []
        }, !0);
    }, Pv.dispose = function() {
        if (!this._disposed) {
            this._disposed = !0, En(this.getDom(), qv, "");
            var t = this._api, e = this._model;
            _v(this._componentsViews, function(n) {
                n.dispose(e, t);
            }), _v(this._chartsViews, function(n) {
                n.dispose(e, t);
            }), this._zr.dispose(), delete Hv[this.id];
        }
    }, c(Ho, tc), ss.prototype = {
        constructor: ss,
        normalizeQuery: function(t) {
            var e = {}, n = {}, i = {};
            if (w(t)) {
                var r = bv(t);
                e.mainType = r.main || null, e.subType = r.sub || null;
            } else {
                var a = [ "Index", "Name", "Id" ], o = {
                    name: 1,
                    dataIndex: 1,
                    dataType: 1
                };
                f(t, function(t, r) {
                    for (var s = !1, l = 0; l < a.length; l++) {
                        var h = a[l], u = r.lastIndexOf(h);
                        if (u > 0 && u === r.length - h.length) {
                            var c = r.slice(0, u);
                            "data" !== c && (e.mainType = c, e[h.toLowerCase()] = t, s = !0);
                        }
                    }
                    o.hasOwnProperty(r) && (n[r] = t, s = !0), s || (i[r] = t);
                });
            }
            return {
                cptQuery: e,
                dataQuery: n,
                otherQuery: i
            };
        },
        filter: function(t, e) {
            function n(t, e, n, i) {
                return null == t[n] || e[i || n] === t[n];
            }
            var i = this.eventInfo;
            if (!i) return !0;
            var r = i.targetEl, a = i.packedEvent, o = i.model, s = i.view;
            if (!o || !s) return !0;
            var l = e.cptQuery, h = e.dataQuery;
            return n(l, o, "mainType") && n(l, o, "subType") && n(l, o, "index", "componentIndex") && n(l, o, "name") && n(l, o, "id") && n(h, a, "name") && n(h, a, "dataIndex") && n(h, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, a));
        },
        afterTrigger: function() {
            this.eventInfo = null;
        }
    };
    var Ev = {}, zv = {}, Rv = [], Nv = [], Bv = [], Fv = [], Vv = {}, Wv = {}, Hv = {}, Gv = {}, Zv = new Date() - 0, Xv = new Date() - 0, qv = "_echarts_instance_", Yv = hs;
    vs(2e3, Xg), ds(Sg), fs(5e3, function(t) {
        var e = N();
        t.eachSeries(function(t) {
            var n = t.get("stack");
            if (n) {
                var i = e.get(n) || e.set(n, []), r = t.getData(), a = {
                    stackResultDimension: r.getCalculationInfo("stackResultDimension"),
                    stackedOverDimension: r.getCalculationInfo("stackedOverDimension"),
                    stackedDimension: r.getCalculationInfo("stackedDimension"),
                    stackedByDimension: r.getCalculationInfo("stackedByDimension"),
                    isStackedByIndex: r.getCalculationInfo("isStackedByIndex"),
                    data: r,
                    seriesModel: t
                };
                if (!a.stackedDimension || !a.isStackedByIndex && !a.stackedByDimension) return;
                i.length && r.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), 
                i.push(a);
            }
        }), e.each(Fa);
    }), ys("default", function(t, e) {
        s(e = e || {}, {
            text: "loading",
            color: "#c23531",
            textColor: "#000",
            maskColor: "rgba(255, 255, 255, 0.8)",
            zlevel: 0
        });
        var n = new sp({
            style: {
                fill: e.maskColor
            },
            zlevel: e.zlevel,
            z: 1e4
        }), i = new dp({
            shape: {
                startAngle: -jg / 2,
                endAngle: -jg / 2 + .1,
                r: 10
            },
            style: {
                stroke: e.color,
                lineCap: "round",
                lineWidth: 5
            },
            zlevel: e.zlevel,
            z: 10001
        }), r = new sp({
            style: {
                fill: "none",
                text: e.text,
                textPosition: "right",
                textDistance: 10,
                textFill: e.textColor
            },
            zlevel: e.zlevel,
            z: 10001
        });
        i.animateShape(!0).when(1e3, {
            endAngle: 3 * jg / 2
        }).start("circularInOut"), i.animateShape(!0).when(1e3, {
            startAngle: 3 * jg / 2
        }).delay(300).start("circularInOut");
        var a = new Wc();
        return a.add(i), a.add(r), a.add(n), a.resize = function() {
            var e = t.getWidth() / 2, a = t.getHeight() / 2;
            i.setShape({
                cx: e,
                cy: a
            });
            var o = i.shape.r;
            r.setShape({
                x: e - o,
                y: a - o,
                width: 2 * o,
                height: 2 * o
            }), n.setShape({
                x: 0,
                y: 0,
                width: t.getWidth(),
                height: t.getHeight()
            });
        }, a.resize(), a;
    }), ps({
        type: "highlight",
        event: "highlight",
        update: "highlight"
    }, B), ps({
        type: "downplay",
        event: "downplay",
        update: "downplay"
    }, B), cs("light", nv), cs("dark", ov);
    var jv = {};
    bs.prototype = {
        constructor: bs,
        add: function(t) {
            return this._add = t, this;
        },
        update: function(t) {
            return this._update = t, this;
        },
        remove: function(t) {
            return this._remove = t, this;
        },
        execute: function() {
            var t = this._old, e = this._new, n = {}, i = [], r = [];
            for (Ms(t, {}, i, "_oldKeyGetter", this), Ms(e, n, r, "_newKeyGetter", this), a = 0; a < t.length; a++) null != (s = n[o = i[a]]) ? ((h = s.length) ? (1 === h && (n[o] = null), 
            s = s.unshift()) : n[o] = null, this._update && this._update(s, a)) : this._remove && this._remove(a);
            for (var a = 0; a < r.length; a++) {
                var o = r[a];
                if (n.hasOwnProperty(o)) {
                    var s = n[o];
                    if (null == s) continue;
                    if (s.length) for (var l = 0, h = s.length; h > l; l++) this._add && this._add(s[l]); else this._add && this._add(s);
                }
            }
        }
    };
    var Uv = N([ "tooltip", "label", "itemName", "itemId", "seriesName" ]), $v = b, Kv = "undefined", Qv = -1, Jv = "e\0\0", tm = {
        float: ("undefined" == typeof Float64Array ? "undefined" : t(Float64Array)) === Kv ? Array : Float64Array,
        int: ("undefined" == typeof Int32Array ? "undefined" : t(Int32Array)) === Kv ? Array : Int32Array,
        ordinal: Array,
        number: Array,
        time: Array
    }, em = ("undefined" == typeof Uint32Array ? "undefined" : t(Uint32Array)) === Kv ? Array : Uint32Array, nm = ("undefined" == typeof Int32Array ? "undefined" : t(Int32Array)) === Kv ? Array : Int32Array, im = ("undefined" == typeof Uint16Array ? "undefined" : t(Uint16Array)) === Kv ? Array : Uint16Array, rm = [ "hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx" ], am = [ "_extent", "_approximateExtent", "_rawExtent" ], om = function(t, e) {
        t = t || [ "x", "y" ];
        for (var n = {}, i = [], r = {}, a = 0; a < t.length; a++) {
            var o = t[a];
            w(o) && (o = {
                name: o
            });
            var s = o.name;
            o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), 
            o.otherDims = o.otherDims || {}, i.push(s), n[s] = o, o.index = a, o.createInvertedIndices && (r[s] = []);
        }
        this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, 
        this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], 
        this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, 
        this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], 
        this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, 
        this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = Ss(this), 
        this._invertedIndicesMap = r, this._calculationInfo = {};
    }, sm = om.prototype;
    sm.type = "list", sm.hasItemOption = !0, sm.getDimension = function(t) {
        return isNaN(t) || (t = this.dimensions[t] || t), t;
    }, sm.getDimensionInfo = function(t) {
        return this._dimensionInfos[this.getDimension(t)];
    }, sm.getDimensionsOnCoord = function() {
        return this._dimensionsSummary.dataDimsOnCoord.slice();
    }, sm.mapDimension = function(t, e) {
        var n = this._dimensionsSummary;
        if (null == e) return n.encodeFirstDimNotExtra[t];
        var i = n.encode[t];
        return !0 === e ? (i || []).slice() : i && i[e];
    }, sm.initData = function(t, e, n) {
        (ta.isInstance(t) || d(t)) && (t = new Va(t, this.dimensions.length)), this._rawData = t, 
        this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], 
        this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = Ag[this._rawData.getSource().sourceFormat], 
        this._dimValueGetter = n = n || this.defaultDimValueGetter, this._dimValueGetterArrayRows = Ag.arrayRows, 
        this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1);
    }, sm.getProvider = function() {
        return this._rawData;
    }, sm.appendData = function(t) {
        var e = this._rawData, n = this.count();
        e.appendData(t);
        var i = e.count();
        e.persistent || (i += n), this._initDataFromProvider(n, i);
    }, sm.appendValues = function(t, e) {
        for (var n = this._chunkSize, i = this._storage, r = this.dimensions, a = r.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e ? e.length : 0), h = this._chunkCount, u = 0; a > u; u++) o[m = r[u]] || (o[m] = [ 1 / 0, -1 / 0 ]), 
        i[m] || (i[m] = []), Ds(i, this._dimensionInfos[m], n, h, l), this._chunkCount = i[m].length;
        for (var c = new Array(a), d = s; l > d; d++) {
            for (var f = d - s, p = Math.floor(d / n), g = d % n, v = 0; a > v; v++) {
                var m = r[v], y = this._dimValueGetterArrayRows(t[f] || c, m, f, v);
                i[m][p][g] = y;
                var _ = o[m];
                y < _[0] && (_[0] = y), y > _[1] && (_[1] = y);
            }
            e && (this._nameList[d] = e[f]);
        }
        this._rawCount = this._count = l, this._extent = {}, Ps(this);
    }, sm._initDataFromProvider = function(t, e) {
        if (!(t >= e)) {
            for (var n, i = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, h = this._nameList, u = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f = this._chunkCount, p = 0; s > p; p++) {
                c[w = o[p]] || (c[w] = [ 1 / 0, -1 / 0 ]);
                var g = l[w];
                0 === g.otherDims.itemName && (n = this._nameDimIdx = p), 0 === g.otherDims.itemId && (this._idDimIdx = p), 
                a[w] || (a[w] = []), Ds(a, g, i, f, e), this._chunkCount = a[w].length;
            }
            for (var v = new Array(s), m = t; e > m; m++) {
                v = r.getItem(m, v);
                for (var y = Math.floor(m / i), _ = m % i, x = 0; s > x; x++) {
                    var w = o[x], b = a[w][y], M = this._dimValueGetter(v, w, m, x);
                    b[_] = M;
                    var S = c[w];
                    M < S[0] && (S[0] = M), M > S[1] && (S[1] = M);
                }
                if (!r.pure) {
                    var T = h[m];
                    if (v && null == T) if (null != v.name) h[m] = T = v.name; else if (null != n) {
                        var C = o[n], I = a[C][y];
                        if (I) {
                            T = I[_];
                            var A = l[C].ordinalMeta;
                            A && A.categories.length && (T = A.categories[T]);
                        }
                    }
                    var k = null == v ? null : v.id;
                    null == k && null != T && (d[T] = d[T] || 0, k = T, d[T] > 0 && (k += "__ec__" + d[T]), 
                    d[T]++), null != k && (u[m] = k);
                }
            }
            !r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, 
            Ps(this);
        }
    }, sm.count = function() {
        return this._count;
    }, sm.getIndices = function() {
        var t = this._indices;
        if (t) {
            var e = t.constructor, n = this._count;
            if (e === Array) {
                i = new e(n);
                for (r = 0; n > r; r++) i[r] = t[r];
            } else i = new e(t.buffer, 0, n);
        } else for (var e = Is(this), i = new e(this.count()), r = 0; r < i.length; r++) i[r] = r;
        return i;
    }, sm.get = function(t, e) {
        if (!(e >= 0 && e < this._count)) return NaN;
        var n = this._storage;
        if (!n[t]) return NaN;
        e = this.getRawIndex(e);
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize;
        return n[t][i][r];
    }, sm.getByRawIndex = function(t, e) {
        if (!(e >= 0 && e < this._rawCount)) return NaN;
        var n = this._storage[t];
        if (!n) return NaN;
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize;
        return n[i][r];
    }, sm._getFast = function(t, e) {
        var n = Math.floor(e / this._chunkSize), i = e % this._chunkSize;
        return this._storage[t][n][i];
    }, sm.getValues = function(t, e) {
        var n = [];
        _(t) || (e = t, t = this.dimensions);
        for (var i = 0, r = t.length; r > i; i++) n.push(this.get(t[i], e));
        return n;
    }, sm.hasValue = function(t) {
        for (var e = this._dimensionsSummary.dataDimsOnCoord, n = this._dimensionInfos, i = 0, r = e.length; r > i; i++) if ("ordinal" !== n[e[i]].type && isNaN(this.get(e[i], t))) return !1;
        return !0;
    }, sm.getDataExtent = function(t) {
        t = this.getDimension(t);
        var e = [ 1 / 0, -1 / 0 ];
        if (!this._storage[t]) return e;
        var n, i = this.count();
        if (!this._indices) return this._rawExtent[t].slice();
        if (n = this._extent[t]) return n.slice();
        for (var r = (n = e)[0], a = n[1], o = 0; i > o; o++) {
            var s = this._getFast(t, this.getRawIndex(o));
            r > s && (r = s), s > a && (a = s);
        }
        return n = [ r, a ], this._extent[t] = n, n;
    }, sm.getApproximateExtent = function(t) {
        return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t);
    }, sm.setApproximateExtent = function(t, e) {
        e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, sm.getCalculationInfo = function(t) {
        return this._calculationInfo[t];
    }, sm.setCalculationInfo = function(t, e) {
        $v(t) ? o(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, sm.getSum = function(t) {
        var e = 0;
        if (this._storage[t]) for (var n = 0, i = this.count(); i > n; n++) {
            var r = this.get(t, n);
            isNaN(r) || (e += r);
        }
        return e;
    }, sm.getMedian = function(t) {
        var e = [];
        this.each(t, function(t) {
            isNaN(t) || e.push(t);
        });
        var n = [].concat(e).sort(function(t, e) {
            return t - e;
        }), i = this.count();
        return 0 === i ? 0 : i % 2 == 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;
    }, sm.rawIndexOf = function(t, e) {
        var n = (t && this._invertedIndicesMap[t])[e];
        return null == n || isNaN(n) ? Qv : n;
    }, sm.indexOfName = function(t) {
        for (var e = 0, n = this.count(); n > e; e++) if (this.getName(e) === t) return e;
        return -1;
    }, sm.indexOfRawIndex = function(t) {
        if (!this._indices) return t;
        if (t >= this._rawCount || 0 > t) return -1;
        var e = this._indices, n = e[t];
        if (null != n && n < this._count && n === t) return t;
        for (var i = 0, r = this._count - 1; r >= i; ) {
            var a = (i + r) / 2 | 0;
            if (e[a] < t) i = a + 1; else {
                if (!(e[a] > t)) return a;
                r = a - 1;
            }
        }
        return -1;
    }, sm.indicesOfNearest = function(t, e, n) {
        var i = [];
        if (!this._storage[t]) return i;
        null == n && (n = 1 / 0);
        for (var r = Number.MAX_VALUE, a = -1, o = 0, s = this.count(); s > o; o++) {
            var l = e - this.get(t, o), h = Math.abs(l);
            n >= l && r >= h && ((r > h || l >= 0 && 0 > a) && (r = h, a = l, i.length = 0), 
            i.push(o));
        }
        return i;
    }, sm.getRawIndex = Os, sm.getRawDataItem = function(t) {
        if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
        for (var e = [], n = 0; n < this.dimensions.length; n++) {
            var i = this.dimensions[n];
            e.push(this.get(i, t));
        }
        return e;
    }, sm.getName = function(t) {
        var e = this.getRawIndex(t);
        return this._nameList[e] || Ls(this, this._nameDimIdx, e) || "";
    }, sm.getId = function(t) {
        return zs(this, this.getRawIndex(t));
    }, sm.each = function(t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
            for (var r = (t = p(Rs(t), this.getDimension, this)).length, a = 0; a < this.count(); a++) switch (r) {
              case 0:
                e.call(n, a);
                break;

              case 1:
                e.call(n, this.get(t[0], a), a);
                break;

              case 2:
                e.call(n, this.get(t[0], a), this.get(t[1], a), a);
                break;

              default:
                for (var o = 0, s = []; r > o; o++) s[o] = this.get(t[o], a);
                s[o] = a, e.apply(n, s);
            }
        }
    }, sm.filterSelf = function(t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Rs(t), this.getDimension, this);
            for (var r = this.count(), a = new (Is(this))(r), o = [], s = t.length, l = 0, h = t[0], u = 0; r > u; u++) {
                var c, d = this.getRawIndex(u);
                if (0 === s) c = e.call(n, u); else if (1 === s) {
                    var f = this._getFast(h, d);
                    c = e.call(n, f, u);
                } else {
                    for (var g = 0; s > g; g++) o[g] = this._getFast(h, d);
                    o[g] = u, c = e.apply(n, o);
                }
                c && (a[l++] = d);
            }
            return r > l && (this._indices = a), this._count = l, this._extent = {}, this.getRawIndex = this._indices ? Es : Os, 
            this;
        }
    }, sm.selectRange = function(t) {
        if (this._count) {
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            var i = e.length;
            if (i) {
                var r = this.count(), a = new (Is(this))(r), o = 0, s = e[0], l = t[s][0], h = t[s][1], u = !1;
                if (!this._indices) {
                    var c = 0;
                    if (1 === i) {
                        for (var d = this._storage[e[0]], f = 0; f < this._chunkCount; f++) for (var p = d[f], g = Math.min(this._count - f * this._chunkSize, this._chunkSize), v = 0; g > v; v++) ((w = p[v]) >= l && h >= w || isNaN(w)) && (a[o++] = c), 
                        c++;
                        u = !0;
                    } else if (2 === i) {
                        for (var d = this._storage[s], m = this._storage[e[1]], y = t[e[1]][0], _ = t[e[1]][1], f = 0; f < this._chunkCount; f++) for (var p = d[f], x = m[f], g = Math.min(this._count - f * this._chunkSize, this._chunkSize), v = 0; g > v; v++) {
                            var w = p[v], b = x[v];
                            (w >= l && h >= w || isNaN(w)) && (b >= y && _ >= b || isNaN(b)) && (a[o++] = c), 
                            c++;
                        }
                        u = !0;
                    }
                }
                if (!u) if (1 === i) for (v = 0; r > v; v++) {
                    S = this.getRawIndex(v);
                    ((w = this._getFast(s, S)) >= l && h >= w || isNaN(w)) && (a[o++] = S);
                } else for (v = 0; r > v; v++) {
                    for (var M = !0, S = this.getRawIndex(v), f = 0; i > f; f++) {
                        var T = e[f];
                        ((w = this._getFast(n, S)) < t[T][0] || w > t[T][1]) && (M = !1);
                    }
                    M && (a[o++] = this.getRawIndex(v));
                }
                return r > o && (this._indices = a), this._count = o, this._extent = {}, this.getRawIndex = this._indices ? Es : Os, 
                this;
            }
        }
    }, sm.mapArray = function(t, e, n, i) {
        "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
        var r = [];
        return this.each(t, function() {
            r.push(e && e.apply(this, arguments));
        }, n), r;
    }, sm.map = function(e, n, i, r) {
        i = i || r || this;
        var a = Ns(this, e = p(Rs(e), this.getDimension, this));
        a._indices = this._indices, a.getRawIndex = a._indices ? Es : Os;
        for (var o = a._storage, s = [], l = this._chunkSize, h = e.length, u = this.count(), c = [], d = a._rawExtent, f = 0; u > f; f++) {
            for (var g = 0; h > g; g++) c[g] = this.get(e[g], f);
            c[h] = f;
            var v = n && n.apply(i, c);
            if (null != v) {
                "object" != (void 0 === v ? "undefined" : t(v)) && (s[0] = v, v = s);
                for (var m = this.getRawIndex(f), y = Math.floor(m / l), _ = m % l, x = 0; x < v.length; x++) {
                    var w = e[x], b = v[x], M = d[w], S = o[w];
                    S && (S[y][_] = b), b < M[0] && (M[0] = b), b > M[1] && (M[1] = b);
                }
            }
        }
        return a;
    }, sm.downSample = function(t, e, n, i) {
        for (var r = Ns(this, [ t ]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], h = this.count(), u = this._chunkSize, c = r._rawExtent[t], d = new (Is(this))(h), f = 0, p = 0; h > p; p += s) {
            s > h - p && (s = h - p, o.length = s);
            for (var g = 0; s > g; g++) {
                var v = this.getRawIndex(p + g), m = Math.floor(v / u), y = v % u;
                o[g] = l[m][y];
            }
            var _ = n(o), x = this.getRawIndex(Math.min(p + i(o, _) || 0, h - 1)), w = x % u;
            l[Math.floor(x / u)][w] = _, _ < c[0] && (c[0] = _), _ > c[1] && (c[1] = _), d[f++] = x;
        }
        return r._count = f, r._indices = d, r.getRawIndex = Es, r;
    }, sm.getItemModel = function(t) {
        var e = this.hostModel;
        return new br(this.getRawDataItem(t), e, e && e.ecModel);
    }, sm.diff = function(t) {
        var e = this;
        return new bs(t ? t.getIndices() : [], this.getIndices(), function(e) {
            return zs(t, e);
        }, function(t) {
            return zs(e, t);
        });
    }, sm.getVisual = function(t) {
        var e = this._visual;
        return e && e[t];
    }, sm.setVisual = function(t, e) {
        if ($v(t)) for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]); else this._visual = this._visual || {}, 
        this._visual[t] = e;
    }, sm.setLayout = function(t, e) {
        if ($v(t)) for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]); else this._layout[t] = e;
    }, sm.getLayout = function(t) {
        return this._layout[t];
    }, sm.getItemLayout = function(t) {
        return this._itemLayouts[t];
    }, sm.setItemLayout = function(t, e, n) {
        this._itemLayouts[t] = n ? o(this._itemLayouts[t] || {}, e) : e;
    }, sm.clearItemLayouts = function() {
        this._itemLayouts.length = 0;
    }, sm.getItemVisual = function(t, e, n) {
        var i = this._itemVisuals[t], r = i && i[e];
        return null != r || n ? r : this.getVisual(e);
    }, sm.setItemVisual = function(t, e, n) {
        var i = this._itemVisuals[t] || {}, r = this.hasItemVisual;
        if (this._itemVisuals[t] = i, $v(e)) for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a], 
        r[a] = !0); else i[e] = n, r[e] = !0;
    }, sm.clearAllVisual = function() {
        this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {};
    };
    var lm = function(t) {
        t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType;
    };
    sm.setItemGraphicEl = function(t, e) {
        var n = this.hostModel;
        e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, 
        "group" === e.type && e.traverse(lm, e)), this._graphicEls[t] = e;
    }, sm.getItemGraphicEl = function(t) {
        return this._graphicEls[t];
    }, sm.eachItemGraphicEl = function(t, e) {
        f(this._graphicEls, function(n, i) {
            n && t && t.call(e, n, i);
        });
    }, sm.cloneShallow = function(t) {
        if (!t) {
            var e = p(this.dimensions, this.getDimensionInfo, this);
            t = new om(e, this.hostModel);
        }
        if (t._storage = this._storage, ks(t, this), this._indices) {
            var n = this._indices.constructor;
            t._indices = new n(this._indices);
        } else t._indices = null;
        return t.getRawIndex = t._indices ? Es : Os, t;
    }, sm.wrapMethod = function(t, e) {
        var n = this[t];
        "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], 
        this.__wrappedMethods.push(t), this[t] = function() {
            var t = n.apply(this, arguments);
            return e.apply(this, [ t ].concat(D(arguments)));
        });
    }, sm.TRANSFERABLE_METHODS = [ "cloneShallow", "downSample", "map" ], sm.CHANGABLE_METHODS = [ "filterSelf", "selectRange" ];
    var hm = function(t, e) {
        return e = e || {}, Fs(e.coordDimensions || [], t, {
            dimsDef: e.dimensionsDefine || t.dimensionsDefine,
            encodeDef: e.encodeDefine || t.encodeDefine,
            dimCount: e.dimensionsCount,
            generateCoord: e.generateCoord,
            generateCoordCount: e.generateCoordCount
        });
    };
    js.prototype.parse = function(t) {
        return t;
    }, js.prototype.getSetting = function(t) {
        return this._setting[t];
    }, js.prototype.contain = function(t) {
        var e = this._extent;
        return t >= e[0] && t <= e[1];
    }, js.prototype.normalize = function(t) {
        var e = this._extent;
        return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0]);
    }, js.prototype.scale = function(t) {
        var e = this._extent;
        return t * (e[1] - e[0]) + e[0];
    }, js.prototype.unionExtent = function(t) {
        var e = this._extent;
        t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
    }, js.prototype.unionExtentFromData = function(t, e) {
        this.unionExtent(t.getApproximateExtent(e));
    }, js.prototype.getExtent = function() {
        return this._extent.slice();
    }, js.prototype.setExtent = function(t, e) {
        var n = this._extent;
        isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e);
    }, js.prototype.isBlank = function() {
        return this._isBlank;
    }, js.prototype.setBlank = function(t) {
        this._isBlank = t;
    }, js.prototype.getLabel = null, Fn(js), Gn(js, {
        registerWhenExtend: !0
    }), Us.createByAxisModel = function(t) {
        var e = t.option, n = e.data, i = n && p(n, Ks);
        return new Us({
            categories: i,
            needCollect: !i,
            deduplication: !1 !== e.dedplication
        });
    };
    var um = Us.prototype;
    um.getOrdinal = function(t) {
        return $s(this).get(t);
    }, um.parseAndCollect = function(t) {
        var e, n = this._needCollect;
        if ("string" != typeof t && !n) return t;
        if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, 
        e;
        var i = $s(this);
        return null == (e = i.get(t)) && (n ? (e = this.categories.length, this.categories[e] = t, 
        i.set(t, e)) : e = NaN), e;
    };
    var cm = js.prototype, dm = js.extend({
        type: "ordinal",
        init: function(t, e) {
            (!t || _(t)) && (t = new Us({
                categories: t
            })), this._ordinalMeta = t, this._extent = e || [ 0, t.categories.length - 1 ];
        },
        parse: function(t) {
            return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t);
        },
        contain: function(t) {
            return t = this.parse(t), cm.contain.call(this, t) && null != this._ordinalMeta.categories[t];
        },
        normalize: function(t) {
            return cm.normalize.call(this, this.parse(t));
        },
        scale: function(t) {
            return Math.round(cm.scale.call(this, t));
        },
        getTicks: function() {
            for (var t = [], e = this._extent, n = e[0]; n <= e[1]; ) t.push(n), n++;
            return t;
        },
        getLabel: function(t) {
            return this.isBlank() ? void 0 : this._ordinalMeta.categories[t];
        },
        count: function() {
            return this._extent[1] - this._extent[0] + 1;
        },
        unionExtentFromData: function(t, e) {
            this.unionExtent(t.getApproximateExtent(e));
        },
        getOrdinalMeta: function() {
            return this._ordinalMeta;
        },
        niceTicks: B,
        niceExtent: B
    });
    dm.create = function() {
        return new dm();
    };
    var fm = kr, pm = kr, gm = js.extend({
        type: "interval",
        _interval: 0,
        _intervalPrecision: 2,
        setExtent: function(t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));
        },
        unionExtent: function(t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), gm.prototype.setExtent.call(this, e[0], e[1]);
        },
        getInterval: function() {
            return this._interval;
        },
        setInterval: function(t) {
            this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Js(t);
        },
        getTicks: function() {
            return nl(this._interval, this._extent, this._niceExtent, this._intervalPrecision);
        },
        getLabel: function(t, e) {
            if (null == t) return "";
            var n = e && e.precision;
            return null == n ? n = Pr(t) || 0 : "auto" === n && (n = this._intervalPrecision), 
            t = pm(t, n, !0), Fr(t);
        },
        niceTicks: function(t, e, n) {
            t = t || 5;
            var i = this._extent, r = i[1] - i[0];
            if (isFinite(r)) {
                0 > r && (r = -r, i.reverse());
                var a = Qs(i, t, e, n);
                this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent;
            }
        },
        niceExtent: function(t) {
            var e = this._extent;
            if (e[0] === e[1]) if (0 !== e[0]) {
                var n = e[0];
                t.fixMax ? e[0] -= n / 2 : (e[1] += n / 2, e[0] -= n / 2);
            } else e[1] = 1;
            var i = e[1] - e[0];
            isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
            var r = this._interval;
            t.fixMin || (e[0] = pm(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = pm(Math.ceil(e[1] / r) * r));
        }
    });
    gm.create = function() {
        return new gm();
    };
    var vm = "__ec_stack_", mm = ("undefined" != typeof Float32Array ? Float32Array : Array, 
    Ng(), gm.prototype), ym = Math.ceil, _m = Math.floor, xm = 36e5, wm = 864e5, bm = function(t, e, n, i) {
        for (;i > n; ) {
            var r = n + i >>> 1;
            t[r][1] < e ? n = r + 1 : i = r;
        }
        return n;
    }, Mm = gm.extend({
        type: "time",
        getLabel: function(t) {
            var e = this._stepLvl, n = new Date(t);
            return Zr(e[0], n, this.getSetting("useUTC"));
        },
        niceExtent: function(t) {
            var e = this._extent;
            if (e[0] === e[1] && (e[0] -= wm, e[1] += wm), e[1] === -1 / 0 && 1 / 0 === e[0]) {
                var n = new Date();
                e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - wm;
            }
            this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
            var i = this._interval;
            t.fixMin || (e[0] = kr(_m(e[0] / i) * i)), t.fixMax || (e[1] = kr(ym(e[1] / i) * i));
        },
        niceTicks: function(t, e, n) {
            t = t || 10;
            var i = this._extent, r = i[1] - i[0], a = r / t;
            null != e && e > a && (a = e), null != n && a > n && (a = n);
            var o = Sm.length, s = bm(Sm, a, 0, o), l = Sm[Math.min(s, o - 1)], h = l[1];
            "year" === l[0] && (h *= Br(r / h / t, !0));
            var u = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3, c = [ Math.round(ym((i[0] - u) / h) * h + u), Math.round(_m((i[1] - u) / h) * h + u) ];
            el(c, i), this._stepLvl = l, this._interval = h, this._niceExtent = c;
        },
        parse: function(t) {
            return +zr(t);
        }
    });
    f([ "contain", "normalize" ], function(t) {
        Mm.prototype[t] = function(e) {
            return mm[t].call(this, this.parse(e));
        };
    });
    var Sm = [ [ "hh:mm:ss", 1e3 ], [ "hh:mm:ss", 5e3 ], [ "hh:mm:ss", 1e4 ], [ "hh:mm:ss", 15e3 ], [ "hh:mm:ss", 3e4 ], [ "hh:mm\nMM-dd", 6e4 ], [ "hh:mm\nMM-dd", 3e5 ], [ "hh:mm\nMM-dd", 6e5 ], [ "hh:mm\nMM-dd", 9e5 ], [ "hh:mm\nMM-dd", 18e5 ], [ "hh:mm\nMM-dd", xm ], [ "hh:mm\nMM-dd", 72e5 ], [ "hh:mm\nMM-dd", 6 * xm ], [ "hh:mm\nMM-dd", 432e5 ], [ "MM-dd\nyyyy", wm ], [ "MM-dd\nyyyy", 2 * wm ], [ "MM-dd\nyyyy", 3 * wm ], [ "MM-dd\nyyyy", 4 * wm ], [ "MM-dd\nyyyy", 5 * wm ], [ "MM-dd\nyyyy", 6 * wm ], [ "week", 7 * wm ], [ "MM-dd\nyyyy", 864e6 ], [ "week", 14 * wm ], [ "week", 21 * wm ], [ "month", 31 * wm ], [ "week", 42 * wm ], [ "month", 62 * wm ], [ "week", 70 * wm ], [ "quarter", 95 * wm ], [ "month", 31 * wm * 4 ], [ "month", 13392e6 ], [ "half-year", 16416e6 ], [ "month", 31 * wm * 8 ], [ "month", 26784e6 ], [ "year", 380 * wm ] ];
    Mm.create = function(t) {
        return new Mm({
            useUTC: t.ecModel.get("useUTC")
        });
    };
    var Tm = js.prototype, Cm = gm.prototype, Im = Pr, Am = kr, km = Math.floor, Dm = Math.ceil, Pm = Math.pow, Lm = Math.log, Om = js.extend({
        type: "log",
        base: 10,
        $constructor: function() {
            js.apply(this, arguments), this._originalScale = new gm();
        },
        getTicks: function() {
            var t = this._originalScale, e = this._extent, n = t.getExtent();
            return p(Cm.getTicks.call(this), function(i) {
                var r = kr(Pm(this.base, i));
                return r = i === e[0] && t.__fixMin ? cl(r, n[0]) : r, r = i === e[1] && t.__fixMax ? cl(r, n[1]) : r;
            }, this);
        },
        getLabel: Cm.getLabel,
        scale: function(t) {
            return t = Tm.scale.call(this, t), Pm(this.base, t);
        },
        setExtent: function(t, e) {
            var n = this.base;
            t = Lm(t) / Lm(n), e = Lm(e) / Lm(n), Cm.setExtent.call(this, t, e);
        },
        getExtent: function() {
            var t = this.base, e = Tm.getExtent.call(this);
            e[0] = Pm(t, e[0]), e[1] = Pm(t, e[1]);
            var n = this._originalScale, i = n.getExtent();
            return n.__fixMin && (e[0] = cl(e[0], i[0])), n.__fixMax && (e[1] = cl(e[1], i[1])), 
            e;
        },
        unionExtent: function(t) {
            this._originalScale.unionExtent(t);
            var e = this.base;
            t[0] = Lm(t[0]) / Lm(e), t[1] = Lm(t[1]) / Lm(e), Tm.unionExtent.call(this, t);
        },
        unionExtentFromData: function(t, e) {
            this.unionExtent(t.getApproximateExtent(e));
        },
        niceTicks: function(t) {
            t = t || 10;
            var e = this._extent, n = e[1] - e[0];
            if (!(1 / 0 === n || 0 >= n)) {
                var i = Rr(n);
                for (.5 >= t / n * i && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0; ) i *= 10;
                var r = [ kr(Dm(e[0] / i) * i), kr(km(e[1] / i) * i) ];
                this._interval = i, this._niceExtent = r;
            }
        },
        niceExtent: function(t) {
            Cm.niceExtent.call(this, t);
            var e = this._originalScale;
            e.__fixMin = t.fixMin, e.__fixMax = t.fixMax;
        }
    });
    f([ "contain", "normalize" ], function(t) {
        Om.prototype[t] = function(e) {
            return e = Lm(e) / Lm(this.base), Tm[t].call(this, e);
        };
    }), Om.create = function() {
        return new Om();
    };
    var Em = {
        getMin: function(t) {
            var e = this.option, n = t || null == e.rangeStart ? e.min : e.rangeStart;
            return this.axis && null != n && "dataMin" !== n && "function" != typeof n && !C(n) && (n = this.axis.scale.parse(n)), 
            n;
        },
        getMax: function(t) {
            var e = this.option, n = t || null == e.rangeEnd ? e.max : e.rangeEnd;
            return this.axis && null != n && "dataMax" !== n && "function" != typeof n && !C(n) && (n = this.axis.scale.parse(n)), 
            n;
        },
        getNeedCrossZero: function() {
            var t = this.option;
            return null == t.rangeStart && null == t.rangeEnd && !t.scale;
        },
        getCoordSysModel: B,
        setRange: function(t, e) {
            this.option.rangeStart = t, this.option.rangeEnd = e;
        },
        resetRange: function() {
            this.option.rangeStart = this.option.rangeEnd = null;
        }
    }, zm = Ri({
        type: "triangle",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
            t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath();
        }
    }), Rm = Ri({
        type: "diamond",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
            t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), 
            t.closePath();
        }
    }), Nm = Ri({
        type: "pin",
        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.x, i = e.y, r = e.width / 5 * 3, a = Math.max(r, e.height), o = r / 2, s = o * o / (a - o), l = i - a + o + s, h = Math.asin(s / o), u = Math.cos(h) * o, c = Math.sin(h), d = Math.cos(h), f = .6 * o, p = .7 * o;
            t.moveTo(n - u, l + s), t.arc(n, l, o, Math.PI - h, 2 * Math.PI + h), t.bezierCurveTo(n + u - c * f, l + s + d * f, n, i - p, n, i), 
            t.bezierCurveTo(n, i - p, n - u + c * f, l + s + d * f, n - u, l + s), t.closePath();
        }
    }), Bm = Ri({
        type: "arrow",
        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.height, i = e.width, r = e.x, a = e.y, o = i / 3 * 2;
            t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), 
            t.lineTo(r, a), t.closePath();
        }
    }), Fm = {
        line: function(t, e, n, i, r) {
            r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2;
        },
        rect: function(t, e, n, i, r) {
            r.x = t, r.y = e, r.width = n, r.height = i;
        },
        roundRect: function(t, e, n, i, r) {
            r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4;
        },
        square: function(t, e, n, i, r) {
            var a = Math.min(n, i);
            r.x = t, r.y = e, r.width = a, r.height = a;
        },
        circle: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2;
        },
        diamond: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
        },
        pin: function(t, e, n, i, r) {
            r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
        },
        arrow: function(t, e, n, i, r) {
            r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
        },
        triangle: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
        }
    }, Vm = {};
    f({
        line: hp,
        rect: sp,
        roundRect: sp,
        square: sp,
        circle: $f,
        diamond: Rm,
        pin: Nm,
        arrow: Bm,
        triangle: zm
    }, function(t, e) {
        Vm[e] = new t();
    });
    var Wm = Ri({
        type: "symbol",
        shape: {
            symbolType: "",
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        beforeBrush: function() {
            var t = this.style;
            "pin" === this.shape.symbolType && "inside" === t.textPosition && (t.textPosition = [ "50%", "40%" ], 
            t.textAlign = "center", t.textVerticalAlign = "middle");
        },
        buildPath: function(t, e, n) {
            var i = e.symbolType, r = Vm[i];
            "none" !== e.symbolType && (r || (i = "rect", r = Vm[i]), Fm[i](e.x, e.y, e.width, e.height, r.shape), 
            r.buildPath(t, r.shape, n));
        }
    }), Hm = {
        isDimensionStacked: Gs,
        enableDataStack: Hs,
        getStackedDimension: Zs
    }, Gm = (Object.freeze || Object)({
        createList: function(t) {
            return Xs(t.getSource(), t);
        },
        getLayoutRect: Yr,
        dataStack: Hm,
        createScale: function(t, e) {
            var n = e;
            br.isInstance(e) || (n = new br(e), c(n, Em));
            var i = gl(n);
            return i.setExtent(t[0], t[1]), pl(i, n), i;
        },
        mixinAxisModelCommonMethods: function(t) {
            c(t, Em);
        },
        completeDimensions: Fs,
        createDimensions: hm,
        createSymbol: Sl
    }), Zm = 1e-8;
    Il.prototype = {
        constructor: Il,
        properties: null,
        getBoundingRect: function() {
            var t = this._rect;
            if (t) return t;
            for (var e = Number.MAX_VALUE, n = [ e, e ], i = [ -e, -e ], r = [], a = [], o = this.geometries, s = 0; s < o.length; s++) "polygon" === o[s].type && (ri(o[s].exterior, r, a), 
            Q(n, n, r), J(i, i, a));
            return 0 === s && (n[0] = n[1] = i[0] = i[1] = 0), this._rect = new oe(n[0], n[1], i[0] - n[0], i[1] - n[1]);
        },
        contain: function(t) {
            var e = this.getBoundingRect(), n = this.geometries;
            if (!e.contain(t[0], t[1])) return !1;
            t: for (var i = 0, r = n.length; r > i; i++) if ("polygon" === n[i].type) {
                var a = n[i].exterior, o = n[i].interiors;
                if (Cl(a, t[0], t[1])) {
                    for (var s = 0; s < (o ? o.length : 0); s++) if (Cl(o[s])) continue t;
                    return !0;
                }
            }
            return !1;
        },
        transformTo: function(t, e, n, i) {
            var r = this.getBoundingRect(), a = r.width / r.height;
            n ? i || (i = n / a) : n = a * i;
            for (var o = new oe(t, e, n, i), s = r.calculateTransform(o), l = this.geometries, h = 0; h < l.length; h++) if ("polygon" === l[h].type) {
                for (var u = l[h].exterior, c = l[h].interiors, d = 0; d < u.length; d++) K(u[d], u[d], s);
                for (var f = 0; f < (c ? c.length : 0); f++) for (d = 0; d < c[f].length; d++) K(c[f][d], c[f][d], s);
            }
            (r = this._rect).copy(o), this.center = [ r.x + r.width / 2, r.y + r.height / 2 ];
        },
        cloneShallow: function(t) {
            null == t && (t = this.name);
            var e = new Il(t, this.geometries, this.center);
            return e._rect = this._rect, e.transformTo = null, e;
        }
    };
    var Xm = function(t) {
        return Al(t), p(v(t.features, function(t) {
            return t.geometry && t.properties && t.geometry.coordinates.length > 0;
        }), function(t) {
            var e = t.properties, n = t.geometry, i = n.coordinates, r = [];
            "Polygon" === n.type && r.push({
                type: "polygon",
                exterior: i[0],
                interiors: i.slice(1)
            }), "MultiPolygon" === n.type && f(i, function(t) {
                t[0] && r.push({
                    type: "polygon",
                    exterior: t[0],
                    interiors: t.slice(1)
                });
            });
            var a = new Il(e.name, r, e.cp);
            return a.properties = e, a;
        });
    }, qm = Pn(), Ym = [ 0, 1 ], jm = function(t, e, n) {
        this.dim = t, this.scale = e, this._extent = n || [ 0, 0 ], this.inverse = !1, this.onBand = !1;
    };
    jm.prototype = {
        constructor: jm,
        contain: function(t) {
            var e = this._extent, n = Math.min(e[0], e[1]), i = Math.max(e[0], e[1]);
            return t >= n && i >= t;
        },
        containData: function(t) {
            return this.contain(this.dataToCoord(t));
        },
        getExtent: function() {
            return this._extent.slice();
        },
        getPixelPrecision: function(t) {
            return Lr(t || this.scale.getExtent(), this._extent);
        },
        setExtent: function(t, e) {
            var n = this._extent;
            n[0] = t, n[1] = e;
        },
        dataToCoord: function(t, e) {
            var n = this._extent, i = this.scale;
            return t = i.normalize(t), this.onBand && "ordinal" === i.type && (n = n.slice(), 
            Zl(n, i.count())), Ir(t, Ym, n, e);
        },
        coordToData: function(t, e) {
            var n = this._extent, i = this.scale;
            this.onBand && "ordinal" === i.type && (n = n.slice(), Zl(n, i.count()));
            var r = Ir(t, n, Ym, e);
            return this.scale.scale(r);
        },
        pointToData: function() {},
        getTicksCoords: function(t) {
            var e = (t = t || {}).tickModel || this.getTickModel(), n = Pl(this, e), i = p(n.ticks, function(t) {
                return {
                    coord: this.dataToCoord(t),
                    tickValue: t
                };
            }, this), r = e.get("alignWithLabel");
            return Xl(this, i, n.tickCategoryInterval, r, t.clamp), i;
        },
        getViewLabels: function() {
            return Dl(this).labels;
        },
        getLabelModel: function() {
            return this.model.getModel("axisLabel");
        },
        getTickModel: function() {
            return this.model.getModel("axisTick");
        },
        getBandWidth: function() {
            var t = this._extent, e = this.scale.getExtent(), n = e[1] - e[0] + (this.onBand ? 1 : 0);
            0 === n && (n = 1);
            var i = Math.abs(t[1] - t[0]);
            return Math.abs(i) / n;
        },
        isHorizontal: null,
        getRotate: null,
        calculateCategoryInterval: function() {
            return Vl(this);
        }
    };
    var Um = Xm, $m = {};
    f([ "map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge" ], function(t) {
        $m[t] = qu[t];
    });
    var Km = {};
    f([ "extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect" ], function(t) {
        Km[t] = Tp[t];
    }), Eg.extend({
        type: "series.line",
        dependencies: [ "grid", "polar" ],
        getInitialData: function() {
            return Xs(this.getSource(), this);
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            coordinateSystem: "cartesian2d",
            legendHoverLink: !0,
            hoverAnimation: !0,
            clipOverflow: !0,
            label: {
                position: "top"
            },
            lineStyle: {
                width: 2,
                type: "solid"
            },
            step: !1,
            smooth: !1,
            smoothMonotone: null,
            symbol: "emptyCircle",
            symbolSize: 4,
            symbolRotate: null,
            showSymbol: !0,
            showAllSymbol: "auto",
            connectNulls: !1,
            sampling: "none",
            animationEasing: "linear",
            progressive: 0,
            hoverLayerThreshold: 1 / 0
        }
    });
    var Qm = Yl.prototype, Jm = Yl.getSymbolSize = function(t, e) {
        var n = t.getItemVisual(e, "symbolSize");
        return n instanceof Array ? n.slice() : [ +n, +n ];
    };
    Qm._createSymbol = function(t, e, n, i, r) {
        this.removeAll();
        var a = Sl(t, -1, -1, 2, 2, e.getItemVisual(n, "color"), r);
        a.attr({
            z2: 100,
            culling: !0,
            scale: jl(i)
        }), a.drift = Ul, this._symbolType = t, this.add(a);
    }, Qm.stopSymbolAnimation = function(t) {
        this.childAt(0).stopAnimation(t);
    }, Qm.getSymbolPath = function() {
        return this.childAt(0);
    }, Qm.getScale = function() {
        return this.childAt(0).scale;
    }, Qm.highlight = function() {
        this.childAt(0).trigger("emphasis");
    }, Qm.downplay = function() {
        this.childAt(0).trigger("normal");
    }, Qm.setZ = function(t, e) {
        var n = this.childAt(0);
        n.zlevel = t, n.z = e;
    }, Qm.setDraggable = function(t) {
        var e = this.childAt(0);
        e.draggable = t, e.cursor = t ? "move" : "pointer";
    }, Qm.updateData = function(t, e, n) {
        this.silent = !1;
        var i = t.getItemVisual(e, "symbol") || "circle", r = t.hostModel, a = Jm(t, e), o = i !== this._symbolType;
        if (o) {
            var s = t.getItemVisual(e, "symbolKeepAspect");
            this._createSymbol(i, t, e, a, s);
        } else (l = this.childAt(0)).silent = !1, gr(l, {
            scale: jl(a)
        }, r, e);
        if (this._updateCommon(t, e, a, n), o) {
            var l = this.childAt(0), h = n && n.fadeIn, u = {
                scale: l.scale.slice()
            };
            h && (u.style = {
                opacity: l.style.opacity
            }), l.scale = [ 0, 0 ], h && (l.style.opacity = 0), vr(l, u, r, e);
        }
        this._seriesModel = r;
    };
    var ty = [ "itemStyle" ], ey = [ "emphasis", "itemStyle" ], ny = [ "label" ], iy = [ "emphasis", "label" ];
    Qm._updateCommon = function(t, e, n, i) {
        var r = this.childAt(0), a = t.hostModel, s = t.getItemVisual(e, "color");
        "image" !== r.type && r.useStyle({
            strokeNoScale: !0
        });
        var l = i && i.itemStyle, h = i && i.hoverItemStyle, u = i && i.symbolRotate, c = i && i.symbolOffset, d = i && i.labelModel, f = i && i.hoverLabelModel, p = i && i.hoverAnimation, g = i && i.cursorStyle;
        if (!i || t.hasItemOption) {
            var v = i && i.itemModel ? i.itemModel : t.getItemModel(e);
            l = v.getModel(ty).getItemStyle([ "color" ]), h = v.getModel(ey).getItemStyle(), 
            u = v.getShallow("symbolRotate"), c = v.getShallow("symbolOffset"), d = v.getModel(ny), 
            f = v.getModel(iy), p = v.getShallow("hoverAnimation"), g = v.getShallow("cursor");
        } else h = o({}, h);
        var m = r.style;
        r.attr("rotation", (u || 0) * Math.PI / 180 || 0), c && r.attr("position", [ Ar(c[0], n[0]), Ar(c[1], n[1]) ]), 
        g && r.attr("cursor", g), r.setColor(s, i && i.symbolInnerColor), r.setStyle(l);
        var y = t.getItemVisual(e, "opacity");
        null != y && (m.opacity = y);
        var _ = t.getItemVisual(e, "liftZ"), x = r.__z2Origin;
        null != _ ? null == x && (r.__z2Origin = r.z2, r.z2 += _) : null != x && (r.z2 = x, 
        r.__z2Origin = null);
        var w = i && i.useNameLabel;
        ar(m, h, d, f, {
            labelFetcher: a,
            labelDataIndex: e,
            defaultText: function(e) {
                return w ? t.getName(e) : ql(t, e);
            },
            isRectText: !0,
            autoColor: s
        }), r.off("mouseover").off("mouseout").off("emphasis").off("normal"), r.hoverStyle = h, 
        ir(r), r.__symbolOriginalScale = jl(n), p && a.isAnimationEnabled() && r.on("mouseover", $l).on("mouseout", Kl).on("emphasis", Ql).on("normal", Jl);
    }, Qm.fadeOut = function(t, e) {
        var n = this.childAt(0);
        this.silent = n.silent = !0, !(e && e.keepLabel) && (n.style.text = null), gr(n, {
            style: {
                opacity: 0
            },
            scale: [ 0, 0 ]
        }, this._seriesModel, this.dataIndex, t);
    }, u(Yl, Wc);
    var ry = th.prototype;
    ry.updateData = function(t, e) {
        e = nh(e);
        var n = this.group, i = t.hostModel, r = this._data, a = this._symbolCtor, o = ih(t);
        r || n.removeAll(), t.diff(r).add(function(i) {
            var r = t.getItemLayout(i);
            if (eh(t, r, i, e)) {
                var s = new a(t, i, o);
                s.attr("position", r), t.setItemGraphicEl(i, s), n.add(s);
            }
        }).update(function(s, l) {
            var h = r.getItemGraphicEl(l), u = t.getItemLayout(s);
            return eh(t, u, s, e) ? (h ? (h.updateData(t, s, o), gr(h, {
                position: u
            }, i)) : (h = new a(t, s)).attr("position", u), n.add(h), void t.setItemGraphicEl(s, h)) : void n.remove(h);
        }).remove(function(t) {
            var e = r.getItemGraphicEl(t);
            e && e.fadeOut(function() {
                n.remove(e);
            });
        }).execute(), this._data = t;
    }, ry.isPersistent = function() {
        return !0;
    }, ry.updateLayout = function() {
        var t = this._data;
        t && t.eachItemGraphicEl(function(e, n) {
            var i = t.getItemLayout(n);
            e.attr("position", i);
        });
    }, ry.incrementalPrepareUpdate = function(t) {
        this._seriesScope = ih(t), this._data = null, this.group.removeAll();
    }, ry.incrementalUpdate = function(t, e, n) {
        n = nh(n);
        for (var i = t.start; i < t.end; i++) {
            var r = e.getItemLayout(i);
            if (eh(e, r, i, n)) {
                var a = new this._symbolCtor(e, i, this._seriesScope);
                a.traverse(function(t) {
                    t.isGroup || (t.incremental = t.useHoverLayer = !0);
                }), a.attr("position", r), this.group.add(a), e.setItemGraphicEl(i, a);
            }
        }
    }, ry.remove = function(t) {
        var e = this.group, n = this._data;
        n && t ? n.eachItemGraphicEl(function(t) {
            t.fadeOut(function() {
                e.remove(t);
            });
        }) : e.removeAll();
    };
    var ay = function(t, e, n, i, r, a, o, s) {
        for (var l = sh(t, e), h = [], u = [], c = [], d = [], f = [], p = [], g = [], v = rh(r, e, o), m = rh(a, t, s), y = 0; y < l.length; y++) {
            var _ = l[y], x = !0;
            switch (_.cmd) {
              case "=":
                var w = t.getItemLayout(_.idx), b = e.getItemLayout(_.idx1);
                (isNaN(w[0]) || isNaN(w[1])) && (w = b.slice()), h.push(w), u.push(b), c.push(n[_.idx]), 
                d.push(i[_.idx1]), g.push(e.getRawIndex(_.idx1));
                break;

              case "+":
                M = _.idx;
                h.push(r.dataToPoint([ e.get(v.dataDimsForPoint[0], M), e.get(v.dataDimsForPoint[1], M) ])), 
                u.push(e.getItemLayout(M).slice()), c.push(oh(v, r, e, M)), d.push(i[M]), g.push(e.getRawIndex(M));
                break;

              case "-":
                var M = _.idx, S = t.getRawIndex(M);
                S !== M ? (h.push(t.getItemLayout(M)), u.push(a.dataToPoint([ t.get(m.dataDimsForPoint[0], M), t.get(m.dataDimsForPoint[1], M) ])), 
                c.push(n[M]), d.push(oh(m, a, t, M)), g.push(S)) : x = !1;
            }
            x && (f.push(_), p.push(p.length));
        }
        p.sort(function(t, e) {
            return g[t] - g[e];
        });
        for (var T = [], C = [], I = [], A = [], k = [], y = 0; y < p.length; y++) {
            M = p[y];
            T[y] = h[M], C[y] = u[M], I[y] = c[M], A[y] = d[M], k[y] = f[M];
        }
        return {
            current: T,
            next: C,
            stackedOnCurrent: I,
            stackedOnNext: A,
            status: k
        };
    }, oy = Q, sy = J, ly = G, hy = V, uy = [], cy = [], dy = [], fy = Mi.extend({
        type: "ec-polyline",
        shape: {
            points: [],
            smooth: 0,
            smoothConstraint: !0,
            smoothMonotone: null,
            connectNulls: !1
        },
        style: {
            fill: null,
            stroke: "#000"
        },
        brush: Qf(Mi.prototype.brush),
        buildPath: function(t, e) {
            var n = e.points, i = 0, r = n.length, a = dh(n, e.smoothConstraint);
            if (e.connectNulls) {
                for (;r > 0 && lh(n[r - 1]); r--) ;
                for (;r > i && lh(n[i]); i++) ;
            }
            for (;r > i; ) i += hh(t, n, i, r, r, 1, a.min, a.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1;
        }
    }), py = Mi.extend({
        type: "ec-polygon",
        shape: {
            points: [],
            stackedOnPoints: [],
            smooth: 0,
            stackedOnSmooth: 0,
            smoothConstraint: !0,
            smoothMonotone: null,
            connectNulls: !1
        },
        brush: Qf(Mi.prototype.brush),
        buildPath: function(t, e) {
            var n = e.points, i = e.stackedOnPoints, r = 0, a = n.length, o = e.smoothMonotone, s = dh(n, e.smoothConstraint), l = dh(i, e.smoothConstraint);
            if (e.connectNulls) {
                for (;a > 0 && lh(n[a - 1]); a--) ;
                for (;a > r && lh(n[r]); r++) ;
            }
            for (;a > r; ) {
                var h = hh(t, n, r, a, a, 1, s.min, s.max, e.smooth, o, e.connectNulls);
                hh(t, i, r + h - 1, h, a, -1, l.min, l.max, e.stackedOnSmooth, o, e.connectNulls), 
                r += h + 1, t.closePath();
            }
        }
    });
    oo.extend({
        type: "line",
        init: function() {
            var t = new Wc(), e = new th();
            this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t;
        },
        render: function(t, e, n) {
            var i = t.coordinateSystem, r = this.group, a = t.getData(), o = t.getModel("lineStyle"), l = t.getModel("areaStyle"), h = a.mapArray(a.getItemLayout), u = "polar" === i.type, c = this._coordSys, d = this._symbolDraw, f = this._polyline, p = this._polygon, g = this._lineGroup, v = t.get("animation"), m = !l.isEmpty(), y = l.get("origin"), _ = vh(i, a, rh(i, a, y)), x = t.get("showSymbol"), w = x && !u && bh(t, a, i), b = this._data;
            b && b.eachItemGraphicEl(function(t, e) {
                t.__temp && (r.remove(t), b.setItemGraphicEl(e, null));
            }), x || d.remove(), r.add(g);
            var M = !u && t.get("step");
            f && c.type === i.type && M === this._step ? (m && !p ? p = this._newPolygon(h, _, i, v) : p && !m && (g.remove(p), 
            p = this._polygon = null), g.setClipPath(_h(i, !1, !1, t)), x && d.updateData(a, {
                isIgnore: w,
                clipShape: _h(i, !1, !0, t)
            }), a.eachItemGraphicEl(function(t) {
                t.stopAnimation(!0);
            }), fh(this._stackedOnPoints, _) && fh(this._points, h) || (v ? this._updateAnimation(a, _, i, n, M, y) : (M && (h = xh(h, i, M), 
            _ = xh(_, i, M)), f.setShape({
                points: h
            }), p && p.setShape({
                points: h,
                stackedOnPoints: _
            })))) : (x && d.updateData(a, {
                isIgnore: w,
                clipShape: _h(i, !1, !0, t)
            }), M && (h = xh(h, i, M), _ = xh(_, i, M)), f = this._newPolyline(h, i, v), m && (p = this._newPolygon(h, _, i, v)), 
            g.setClipPath(_h(i, !0, !1, t)));
            var S = wh(a, i) || a.getVisual("color");
            f.useStyle(s(o.getLineStyle(), {
                fill: "none",
                stroke: S,
                lineJoin: "bevel"
            }));
            var T = t.get("smooth");
            if (T = ph(t.get("smooth")), f.setShape({
                smooth: T,
                smoothMonotone: t.get("smoothMonotone"),
                connectNulls: t.get("connectNulls")
            }), p) {
                var C = a.getCalculationInfo("stackedOnSeries"), I = 0;
                p.useStyle(s(l.getAreaStyle(), {
                    fill: S,
                    opacity: .7,
                    lineJoin: "bevel"
                })), C && (I = ph(C.get("smooth"))), p.setShape({
                    smooth: T,
                    stackedOnSmooth: I,
                    smoothMonotone: t.get("smoothMonotone"),
                    connectNulls: t.get("connectNulls")
                });
            }
            this._data = a, this._coordSys = i, this._stackedOnPoints = _, this._points = h, 
            this._step = M, this._valueOrigin = y;
        },
        dispose: function() {},
        highlight: function(t, e, n, i) {
            var r = t.getData(), a = Dn(r, i);
            if (!(a instanceof Array) && null != a && a >= 0) {
                var o = r.getItemGraphicEl(a);
                if (!o) {
                    var s = r.getItemLayout(a);
                    if (!s) return;
                    (o = new Yl(r, a)).position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), 
                    o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o);
                }
                o.highlight();
            } else oo.prototype.highlight.call(this, t, e, n, i);
        },
        downplay: function(t, e, n, i) {
            var r = t.getData(), a = Dn(r, i);
            if (null != a && a >= 0) {
                var o = r.getItemGraphicEl(a);
                o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay());
            } else oo.prototype.downplay.call(this, t, e, n, i);
        },
        _newPolyline: function(t) {
            var e = this._polyline;
            return e && this._lineGroup.remove(e), e = new fy({
                shape: {
                    points: t
                },
                silent: !0,
                z2: 10
            }), this._lineGroup.add(e), this._polyline = e, e;
        },
        _newPolygon: function(t, e) {
            var n = this._polygon;
            return n && this._lineGroup.remove(n), n = new py({
                shape: {
                    points: t,
                    stackedOnPoints: e
                },
                silent: !0
            }), this._lineGroup.add(n), this._polygon = n, n;
        },
        _updateAnimation: function(t, e, n, i, r, a) {
            var o = this._polyline, s = this._polygon, l = t.hostModel, h = ay(this._data, t, this._stackedOnPoints, e, this._coordSys, n, this._valueOrigin, a), u = h.current, c = h.stackedOnCurrent, d = h.next, f = h.stackedOnNext;
            r && (u = xh(h.current, n, r), c = xh(h.stackedOnCurrent, n, r), d = xh(h.next, n, r), 
            f = xh(h.stackedOnNext, n, r)), o.shape.__points = h.current, o.shape.points = u, 
            gr(o, {
                shape: {
                    points: d
                }
            }, l), s && (s.setShape({
                points: u,
                stackedOnPoints: c
            }), gr(s, {
                shape: {
                    points: d,
                    stackedOnPoints: f
                }
            }, l));
            for (var p = [], g = h.status, v = 0; v < g.length; v++) if ("=" === g[v].cmd) {
                var m = t.getItemGraphicEl(g[v].idx1);
                m && p.push({
                    el: m,
                    ptIdx: v
                });
            }
            o.animators && o.animators.length && o.animators[0].during(function() {
                for (var t = 0; t < p.length; t++) p[t].el.attr("position", o.shape.__points[p[t].ptIdx]);
            });
        },
        remove: function() {
            var t = this.group, e = this._data;
            this._lineGroup.removeAll(), this._symbolDraw.remove(!0), e && e.eachItemGraphicEl(function(n, i) {
                n.__temp && (t.remove(n), e.setItemGraphicEl(i, null));
            }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;
        }
    });
    var gy = {
        average: function(t) {
            for (var e = 0, n = 0, i = 0; i < t.length; i++) isNaN(t[i]) || (e += t[i], n++);
            return 0 === n ? NaN : e / n;
        },
        sum: function(t) {
            for (var e = 0, n = 0; n < t.length; n++) e += t[n] || 0;
            return e;
        },
        max: function(t) {
            for (var e = -1 / 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
            return isFinite(e) ? e : NaN;
        },
        min: function(t) {
            for (var e = 1 / 0, n = 0; n < t.length; n++) t[n] < e && (e = t[n]);
            return isFinite(e) ? e : NaN;
        },
        nearest: function(t) {
            return t[0];
        }
    }, vy = function(t) {
        return Math.round(t.length / 2);
    }, my = function(t) {
        this._axes = {}, this._dimList = [], this.name = t || "";
    };
    my.prototype = {
        constructor: my,
        type: "cartesian",
        getAxis: function(t) {
            return this._axes[t];
        },
        getAxes: function() {
            return p(this._dimList, Sh, this);
        },
        getAxesByScale: function(t) {
            return t = t.toLowerCase(), v(this.getAxes(), function(e) {
                return e.scale.type === t;
            });
        },
        addAxis: function(t) {
            var e = t.dim;
            this._axes[e] = t, this._dimList.push(e);
        },
        dataToCoord: function(t) {
            return this._dataCoordConvert(t, "dataToCoord");
        },
        coordToData: function(t) {
            return this._dataCoordConvert(t, "coordToData");
        },
        _dataCoordConvert: function(t, e) {
            for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n.length; r++) {
                var a = n[r], o = this._axes[a];
                i[a] = o[e](t[a]);
            }
            return i;
        }
    }, Th.prototype = {
        constructor: Th,
        type: "cartesian2d",
        dimensions: [ "x", "y" ],
        getBaseAxis: function() {
            return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
        },
        containPoint: function(t) {
            var e = this.getAxis("x"), n = this.getAxis("y");
            return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]));
        },
        containData: function(t) {
            return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1]);
        },
        dataToPoint: function(t, e, n) {
            var i = this.getAxis("x"), r = this.getAxis("y");
            return n = n || [], n[0] = i.toGlobalCoord(i.dataToCoord(t[0])), n[1] = r.toGlobalCoord(r.dataToCoord(t[1])), 
            n;
        },
        clampData: function(t, e) {
            var n = this.getAxis("x").scale, i = this.getAxis("y").scale, r = n.getExtent(), a = i.getExtent(), o = n.parse(t[0]), s = i.parse(t[1]);
            return e = e || [], e[0] = Math.min(Math.max(Math.min(r[0], r[1]), o), Math.max(r[0], r[1])), 
            e[1] = Math.min(Math.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), e;
        },
        pointToData: function(t, e) {
            var n = this.getAxis("x"), i = this.getAxis("y");
            return e = e || [], e[0] = n.coordToData(n.toLocalCoord(t[0])), e[1] = i.coordToData(i.toLocalCoord(t[1])), 
            e;
        },
        getOtherAxis: function(t) {
            return this.getAxis("x" === t.dim ? "y" : "x");
        }
    }, u(Th, my);
    var yy = function(t, e, n, i, r) {
        jm.call(this, t, e, n), this.type = i || "value", this.position = r || "bottom";
    };
    yy.prototype = {
        constructor: yy,
        index: 0,
        getAxesOnZeroOf: null,
        model: null,
        isHorizontal: function() {
            var t = this.position;
            return "top" === t || "bottom" === t;
        },
        getGlobalExtent: function(t) {
            var e = this.getExtent();
            return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), 
            e;
        },
        getOtherAxis: function() {
            this.grid.getOtherAxis();
        },
        pointToData: function(t, e) {
            return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e);
        },
        toLocalCoord: null,
        toGlobalCoord: null
    }, u(yy, jm);
    var _y = {
        show: !0,
        zlevel: 0,
        z: 0,
        inverse: !1,
        name: "",
        nameLocation: "end",
        nameRotate: null,
        nameTruncate: {
            maxWidth: null,
            ellipsis: "...",
            placeholder: "."
        },
        nameTextStyle: {},
        nameGap: 15,
        silent: !1,
        triggerEvent: !1,
        tooltip: {
            show: !1
        },
        axisPointer: {},
        axisLine: {
            show: !0,
            onZero: !0,
            onZeroAxisIndex: null,
            lineStyle: {
                color: "#333",
                width: 1,
                type: "solid"
            },
            symbol: [ "none", "none" ],
            symbolSize: [ 10, 15 ]
        },
        axisTick: {
            show: !0,
            inside: !1,
            length: 5,
            lineStyle: {
                width: 1
            }
        },
        axisLabel: {
            show: !0,
            inside: !1,
            rotate: 0,
            showMinLabel: null,
            showMaxLabel: null,
            margin: 8,
            fontSize: 12
        },
        splitLine: {
            show: !0,
            lineStyle: {
                color: [ "#ccc" ],
                width: 1,
                type: "solid"
            }
        },
        splitArea: {
            show: !1,
            areaStyle: {
                color: [ "rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)" ]
            }
        }
    }, xy = {};
    xy.categoryAxis = r({
        boundaryGap: !0,
        deduplication: null,
        splitLine: {
            show: !1
        },
        axisTick: {
            alignWithLabel: !1,
            interval: "auto"
        },
        axisLabel: {
            interval: "auto"
        }
    }, _y), xy.valueAxis = r({
        boundaryGap: [ 0, 0 ],
        splitNumber: 5
    }, _y), xy.timeAxis = s({
        scale: !0,
        min: "dataMin",
        max: "dataMax"
    }, xy.valueAxis), xy.logAxis = s({
        scale: !0,
        logBase: 10
    }, xy.valueAxis);
    var wy = [ "value", "category", "time", "log" ], by = function(t, e, n, i) {
        f(wy, function(o) {
            e.extend({
                type: t + "Axis." + o,
                mergeDefaultAndTheme: function(e, i) {
                    var a = this.layoutMode, s = a ? Ur(e) : {};
                    r(e, i.getTheme().get(o + "Axis")), r(e, this.getDefaultOption()), e.type = n(t, e), 
                    a && jr(e, s, a);
                },
                optionUpdated: function() {
                    "category" === this.option.type && (this.__ordinalMeta = Us.createByAxisModel(this));
                },
                getCategories: function(t) {
                    var e = this.option;
                    return "category" === e.type ? t ? e.data : this.__ordinalMeta.categories : void 0;
                },
                getOrdinalMeta: function() {
                    return this.__ordinalMeta;
                },
                defaultOption: a([ {}, xy[o + "Axis"], i ], !0)
            });
        }), jp.registerSubTypeDefaulter(t + "Axis", y(n, t));
    }, My = jp.extend({
        type: "cartesian2dAxis",
        axis: null,
        init: function() {
            My.superApply(this, "init", arguments), this.resetRange();
        },
        mergeOption: function() {
            My.superApply(this, "mergeOption", arguments), this.resetRange();
        },
        restoreData: function() {
            My.superApply(this, "restoreData", arguments), this.resetRange();
        },
        getCoordSysModel: function() {
            return this.ecModel.queryComponents({
                mainType: "grid",
                index: this.option.gridIndex,
                id: this.option.gridId
            })[0];
        }
    });
    r(My.prototype, Em);
    var Sy = {
        offset: 0
    };
    by("x", My, Ch, Sy), by("y", My, Ch, Sy), jp.extend({
        type: "grid",
        dependencies: [ "xAxis", "yAxis" ],
        layoutMode: "box",
        coordinateSystem: null,
        defaultOption: {
            show: !1,
            zlevel: 0,
            z: 0,
            left: "10%",
            top: 60,
            right: "10%",
            bottom: 60,
            containLabel: !1,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 1,
            borderColor: "#ccc"
        }
    });
    var Ty = Ah.prototype;
    Ty.type = "grid", Ty.axisPointerEnabled = !0, Ty.getRect = function() {
        return this._rect;
    }, Ty.update = function(t, e) {
        var n = this._axesMap;
        this._updateScale(t, this.model), f(n.x, function(t) {
            pl(t.scale, t.model);
        }), f(n.y, function(t) {
            pl(t.scale, t.model);
        });
        var i = {};
        f(n.x, function(t) {
            kh(n, "y", t, i);
        }), f(n.y, function(t) {
            kh(n, "x", t, i);
        }), this.resize(this.model, e);
    }, Ty.resize = function(t, e, n) {
        function i() {
            f(a, function(t) {
                var e = t.isHorizontal(), n = e ? [ 0, r.width ] : [ 0, r.height ], i = t.inverse ? 1 : 0;
                t.setExtent(n[i], n[1 - i]), Ph(t, e ? r.x : r.y);
            });
        }
        var r = Yr(t.getBoxLayoutParams(), {
            width: e.getWidth(),
            height: e.getHeight()
        });
        this._rect = r;
        var a = this._axesList;
        i(), !n && t.get("containLabel") && (f(a, function(t) {
            if (!t.model.get("axisLabel.inside")) {
                var e = _l(t);
                if (e) {
                    var n = t.isHorizontal() ? "height" : "width", i = t.model.get("axisLabel.margin");
                    r[n] -= e[n] + i, "top" === t.position ? r.y += e.height + i : "left" === t.position && (r.x += e.width + i);
                }
            }
        }), i());
    }, Ty.getAxis = function(t, e) {
        var n = this._axesMap[t];
        if (null != n) {
            if (null == e) for (var i in n) if (n.hasOwnProperty(i)) return n[i];
            return n[e];
        }
    }, Ty.getAxes = function() {
        return this._axesList.slice();
    }, Ty.getCartesian = function(t, e) {
        if (null != t && null != e) {
            var n = "x" + t + "y" + e;
            return this._coordsMap[n];
        }
        b(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
        for (var i = 0, r = this._coordsList; i < r.length; i++) if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i];
    }, Ty.getCartesians = function() {
        return this._coordsList.slice();
    }, Ty.convertToPixel = function(t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null;
    }, Ty.convertFromPixel = function(t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;
    }, Ty._findConvertTarget = function(t, e) {
        var n, i, r = e.seriesModel, a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0], o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0], s = e.gridModel, l = this._coordsList;
        return r ? (n = r.coordinateSystem, h(l, n) < 0 && (n = null)) : a && o ? n = this.getCartesian(a.componentIndex, o.componentIndex) : a ? i = this.getAxis("x", a.componentIndex) : o ? i = this.getAxis("y", o.componentIndex) : s && s.coordinateSystem === this && (n = this._coordsList[0]), 
        {
            cartesian: n,
            axis: i
        };
    }, Ty.containPoint = function(t) {
        var e = this._coordsList[0];
        return e ? e.containPoint(t) : void 0;
    }, Ty._initCartesian = function(t, e) {
        function n(n) {
            return function(o, s) {
                if (Ih(o, t, e)) {
                    var l = o.get("position");
                    "x" === n ? "top" !== l && "bottom" !== l && (l = "bottom", i[l] && (l = "top" === l ? "bottom" : "top")) : "left" !== l && "right" !== l && (l = "left", 
                    i[l] && (l = "left" === l ? "right" : "left")), i[l] = !0;
                    var h = new yy(n, gl(o), [ 0, 0 ], o.get("type"), l), u = "category" === h.type;
                    h.onBand = u && o.get("boundaryGap"), h.inverse = o.get("inverse"), o.axis = h, 
                    h.model = o, h.grid = this, h.index = s, this._axesList.push(h), r[n][s] = h, a[n]++;
                }
            };
        }
        var i = {
            left: !1,
            right: !1,
            top: !1,
            bottom: !1
        }, r = {
            x: {},
            y: {}
        }, a = {
            x: 0,
            y: 0
        };
        return e.eachComponent("xAxis", n("x"), this), e.eachComponent("yAxis", n("y"), this), 
        a.x && a.y ? (this._axesMap = r, void f(r.x, function(e, n) {
            f(r.y, function(i, r) {
                var a = "x" + n + "y" + r, o = new Th(a);
                o.grid = this, o.model = t, this._coordsMap[a] = o, this._coordsList.push(o), o.addAxis(e), 
                o.addAxis(i);
            }, this);
        }, this)) : (this._axesMap = {}, void (this._axesList = []));
    }, Ty._updateScale = function(t, e) {
        function n(t, e) {
            f(t.mapDimension(e.dim, !0), function(n) {
                e.scale.unionExtentFromData(t, Zs(t, n));
            });
        }
        f(this._axesList, function(t) {
            t.scale.setExtent(1 / 0, -1 / 0);
        }), t.eachSeries(function(i) {
            if (Oh(i)) {
                var r = Lh(i), a = r[0], o = r[1];
                if (!Ih(a, e, t) || !Ih(o, e, t)) return;
                var s = this.getCartesian(a.componentIndex, o.componentIndex), l = i.getData(), h = s.getAxis("x"), u = s.getAxis("y");
                "list" === l.type && (n(l, h), n(l, u));
            }
        }, this);
    }, Ty.getTooltipAxes = function(t) {
        var e = [], n = [];
        return f(this.getCartesians(), function(i) {
            var r = null != t && "auto" !== t ? i.getAxis(t) : i.getBaseAxis(), a = i.getOtherAxis(r);
            h(e, r) < 0 && e.push(r), h(n, a) < 0 && n.push(a);
        }), {
            baseAxes: e,
            otherAxes: n
        };
    };
    var Cy = [ "xAxis", "yAxis" ];
    Ah.create = function(t, e) {
        var n = [];
        return t.eachComponent("grid", function(i, r) {
            var a = new Ah(i, t, e);
            a.name = "grid_" + r, a.resize(i, e, !0), i.coordinateSystem = a, n.push(a);
        }), t.eachSeries(function(t) {
            if (Oh(t)) {
                var e = Lh(t), n = e[0], i = e[1], r = n.getCoordSysModel().coordinateSystem;
                t.coordinateSystem = r.getCartesian(n.componentIndex, i.componentIndex);
            }
        }), n;
    }, Ah.dimensions = Ah.prototype.dimensions = Th.prototype.dimensions, wa.register("cartesian2d", Ah);
    var Iy = Math.PI, Ay = function(t, e) {
        this.opt = e, this.axisModel = t, s(e, {
            labelOffset: 0,
            nameDirection: 1,
            tickDirection: 1,
            labelDirection: 1,
            silent: !0
        }), this.group = new Wc();
        var n = new Wc({
            position: e.position.slice(),
            rotation: e.rotation
        });
        n.updateTransform(), this._transform = n.transform, this._dumbGroup = n;
    };
    Ay.prototype = {
        constructor: Ay,
        hasBuilder: function(t) {
            return !!ky[t];
        },
        add: function(t) {
            ky[t].call(this);
        },
        getGroup: function() {
            return this.group;
        }
    };
    var ky = {
        axisLine: function() {
            var t = this.opt, e = this.axisModel;
            if (e.get("axisLine.show")) {
                var n = this.axisModel.axis.getExtent(), i = this._transform, r = [ n[0], 0 ], a = [ n[1], 0 ];
                i && (K(r, r, i), K(a, a, i));
                var s = o({
                    lineCap: "round"
                }, e.getModel("axisLine.lineStyle").getLineStyle());
                this.group.add(new hp(Wi({
                    anid: "line",
                    shape: {
                        x1: r[0],
                        y1: r[1],
                        x2: a[0],
                        y2: a[1]
                    },
                    style: s,
                    strokeContainThreshold: t.strokeContainThreshold || 5,
                    silent: !0,
                    z2: 1
                })));
                var l = e.get("axisLine.symbol"), h = e.get("axisLine.symbolSize"), u = e.get("axisLine.symbolOffset") || 0;
                if ("number" == typeof u && (u = [ u, u ]), null != l) {
                    "string" == typeof l && (l = [ l, l ]), ("string" == typeof h || "number" == typeof h) && (h = [ h, h ]);
                    var c = h[0], d = h[1];
                    f([ {
                        rotate: t.rotation + Math.PI / 2,
                        offset: u[0],
                        r: 0
                    }, {
                        rotate: t.rotation - Math.PI / 2,
                        offset: u[1],
                        r: Math.sqrt((r[0] - a[0]) * (r[0] - a[0]) + (r[1] - a[1]) * (r[1] - a[1]))
                    } ], function(e, n) {
                        if ("none" !== l[n] && null != l[n]) {
                            var i = Sl(l[n], -c / 2, -d / 2, c, d, s.stroke, !0), a = e.r + e.offset, o = [ r[0] + a * Math.cos(t.rotation), r[1] - a * Math.sin(t.rotation) ];
                            i.attr({
                                rotation: e.rotate,
                                position: o,
                                silent: !0,
                                z2: 11
                            }), this.group.add(i);
                        }
                    }, this);
                }
            }
        },
        axisTickLabel: function() {
            var t = this.axisModel, e = this.opt, n = Wh(this, t, e);
            Nh(t, Hh(this, t, e), n);
        },
        axisName: function() {
            var t = this.opt, e = this.axisModel, n = I(t.axisName, e.get("name"));
            if (n) {
                var i, r = e.get("nameLocation"), a = t.nameDirection, s = e.getModel("nameTextStyle"), l = e.get("nameGap") || 0, h = this.axisModel.axis.getExtent(), u = h[0] > h[1] ? -1 : 1, c = [ "start" === r ? h[0] - u * l : "end" === r ? h[1] + u * l : (h[0] + h[1]) / 2, Vh(r) ? t.labelOffset + a * l : 0 ], d = e.get("nameRotate");
                null != d && (d = d * Iy / 180);
                var f;
                Vh(r) ? i = Dy(t.rotation, null != d ? d : t.rotation, a) : (i = zh(t, r, d || 0, h), 
                null != (f = t.axisNameAvailableWidth) && (f = Math.abs(f / Math.sin(i.rotation)), 
                !isFinite(f) && (f = null)));
                var p = s.getFont(), g = e.get("nameTruncate", !0) || {}, v = g.ellipsis, m = I(t.nameTruncateMaxWidth, g.maxWidth, f), y = null != v && null != m ? Wp(n, m, p, v, {
                    minChar: 2,
                    placeholder: g.placeholder
                }) : n, _ = e.get("tooltip", !0), x = e.mainType, w = {
                    componentType: x,
                    name: n,
                    $vars: [ "name" ]
                };
                w[x + "Index"] = e.componentIndex;
                var b = new Uf({
                    anid: "name",
                    __fullText: n,
                    __truncatedText: y,
                    position: c,
                    rotation: i.rotation,
                    silent: Rh(e),
                    z2: 1,
                    tooltip: _ && _.show ? o({
                        content: n,
                        formatter: function() {
                            return n;
                        },
                        formatterParams: w
                    }, _) : null
                });
                or(b.style, s, {
                    text: y,
                    textFont: p,
                    textFill: s.getTextColor() || e.get("axisLine.lineStyle.color"),
                    textAlign: i.textAlign,
                    textVerticalAlign: i.textVerticalAlign
                }), e.get("triggerEvent") && (b.eventData = Eh(e), b.eventData.targetType = "axisName", 
                b.eventData.name = n), this._dumbGroup.add(b), b.updateTransform(), this.group.add(b), 
                b.decomposeTransform();
            }
        }
    }, Dy = Ay.innerTextLayout = function(t, e, n) {
        var i, r, a = Or(e - t);
        return Er(a) ? (r = n > 0 ? "top" : "bottom", i = "center") : Er(a - Iy) ? (r = n > 0 ? "bottom" : "top", 
        i = "center") : (r = "middle", i = a > 0 && Iy > a ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), 
        {
            rotation: a,
            textAlign: i,
            textVerticalAlign: r
        };
    }, Py = xs({
        type: "axis",
        _axisPointer: null,
        axisPointerClass: null,
        render: function(t, e, n, i) {
            this.axisPointerClass && Gh(t), Py.superApply(this, "render", arguments), jh(this, t, 0, n, 0, !0);
        },
        updateAxisPointer: function(t, e, n, i) {
            jh(this, t, 0, n, 0, !1);
        },
        remove: function(t, e) {
            var n = this._axisPointer;
            n && n.remove(e), Py.superApply(this, "remove", arguments);
        },
        dispose: function(t, e) {
            Uh(this, e), Py.superApply(this, "dispose", arguments);
        }
    }), Ly = [];
    Py.registerAxisPointerClass = function(t, e) {
        Ly[t] = e;
    }, Py.getAxisPointerClass = function(t) {
        return t && Ly[t];
    };
    var Oy = [ "axisLine", "axisTickLabel", "axisName" ], Ey = [ "splitArea", "splitLine" ], zy = Py.extend({
        type: "cartesianAxis",
        axisPointerClass: "CartesianAxisPointer",
        render: function(t, e, n, i) {
            this.group.removeAll();
            var r = this._axisGroup;
            if (this._axisGroup = new Wc(), this.group.add(this._axisGroup), t.get("show")) {
                var a = t.getCoordSysModel(), o = $h(a, t), s = new Ay(t, o);
                f(Oy, s.add, s), this._axisGroup.add(s.getGroup()), f(Ey, function(e) {
                    t.get(e + ".show") && this["_" + e](t, a);
                }, this), xr(r, this._axisGroup, t), zy.superCall(this, "render", t, e, n, i);
            }
        },
        remove: function() {
            this._splitAreaColors = null;
        },
        _splitLine: function(t, e) {
            var n = t.axis;
            if (!n.scale.isBlank()) {
                var i = t.getModel("splitLine"), r = i.getModel("lineStyle"), a = r.get("color");
                a = _(a) ? a : [ a ];
                for (var o = e.coordinateSystem.getRect(), l = n.isHorizontal(), h = 0, u = n.getTicksCoords({
                    tickModel: i
                }), c = [], d = [], f = r.getLineStyle(), p = 0; p < u.length; p++) {
                    var g = n.toGlobalCoord(u[p].coord);
                    l ? (c[0] = g, c[1] = o.y, d[0] = g, d[1] = o.y + o.height) : (c[0] = o.x, c[1] = g, 
                    d[0] = o.x + o.width, d[1] = g);
                    var v = h++ % a.length, m = u[p].tickValue;
                    this._axisGroup.add(new hp(Wi({
                        anid: null != m ? "line_" + u[p].tickValue : null,
                        shape: {
                            x1: c[0],
                            y1: c[1],
                            x2: d[0],
                            y2: d[1]
                        },
                        style: s({
                            stroke: a[v]
                        }, f),
                        silent: !0
                    })));
                }
            }
        },
        _splitArea: function(t, e) {
            var n = t.axis;
            if (!n.scale.isBlank()) {
                var i = t.getModel("splitArea"), r = i.getModel("areaStyle"), a = r.get("color"), o = e.coordinateSystem.getRect(), l = n.getTicksCoords({
                    tickModel: i,
                    clamp: !0
                });
                if (l.length) {
                    var h = a.length, u = this._splitAreaColors, c = N(), d = 0;
                    if (u) for (v = 0; v < l.length; v++) {
                        var f = u.get(l[v].tickValue);
                        if (null != f) {
                            d = (f + (h - 1) * v) % h;
                            break;
                        }
                    }
                    var p = n.toGlobalCoord(l[0].coord), g = r.getAreaStyle();
                    a = _(a) ? a : [ a ];
                    for (var v = 1; v < l.length; v++) {
                        var m, y, x, w, b = n.toGlobalCoord(l[v].coord);
                        n.isHorizontal() ? (m = p, y = o.y, x = b - m, w = o.height, p = m + x) : (m = o.x, 
                        y = p, x = o.width, w = b - y, p = y + w);
                        var M = l[v - 1].tickValue;
                        null != M && c.set(M, d), this._axisGroup.add(new sp({
                            anid: null != M ? "area_" + M : null,
                            shape: {
                                x: m,
                                y: y,
                                width: x,
                                height: w
                            },
                            style: s({
                                fill: a[d]
                            }, g),
                            silent: !0
                        })), d = (d + 1) % h;
                    }
                    this._splitAreaColors = c;
                }
            }
        }
    });
    zy.extend({
        type: "xAxis"
    }), zy.extend({
        type: "yAxis"
    }), xs({
        type: "grid",
        render: function(t) {
            this.group.removeAll(), t.get("show") && this.group.add(new sp({
                shape: t.coordinateSystem.getRect(),
                style: s({
                    fill: t.get("backgroundColor")
                }, t.getItemStyle()),
                silent: !0,
                z2: -1
            }));
        }
    }), ds(function(t) {
        t.xAxis && t.yAxis && !t.grid && (t.grid = {});
    }), vs(function(t, e, n) {
        return {
            seriesType: t,
            performRawSeries: !0,
            reset: function(t, i) {
                var r = t.getData(), a = t.get("symbol") || e, o = t.get("symbolSize"), s = t.get("symbolKeepAspect");
                if (r.setVisual({
                    legendSymbol: n || a,
                    symbol: a,
                    symbolSize: o,
                    symbolKeepAspect: s
                }), !i.isSeriesFiltered(t)) {
                    var l = "function" == typeof o;
                    return {
                        dataEach: r.hasItemOption || l ? function(e, n) {
                            if ("function" == typeof o) {
                                var i = t.getRawValue(n), r = t.getDataParams(n);
                                e.setItemVisual(n, "symbolSize", o(i, r));
                            }
                            if (e.hasItemOption) {
                                var a = e.getItemModel(n), s = a.getShallow("symbol", !0), l = a.getShallow("symbolSize", !0), h = a.getShallow("symbolKeepAspect", !0);
                                null != s && e.setItemVisual(n, "symbol", s), null != l && e.setItemVisual(n, "symbolSize", l), 
                                null != h && e.setItemVisual(n, "symbolKeepAspect", h);
                            }
                        } : null
                    };
                }
            }
        };
    }("line", "circle", "line")), gs(function(t) {
        return {
            seriesType: t,
            plan: Ng(),
            reset: function(t) {
                var e = t.getData(), n = t.coordinateSystem, i = t.pipelineContext.large;
                if (n) {
                    var r = p(n.dimensions, function(t) {
                        return e.mapDimension(t);
                    }).slice(0, 2), a = r.length, o = e.getCalculationInfo("stackResultDimension");
                    return Gs(e, r[0]) && (r[0] = o), Gs(e, r[1]) && (r[1] = o), a && {
                        progress: function(t, e) {
                            for (var o = t.end - t.start, s = i && new Float32Array(o * a), l = t.start, h = 0, u = [], c = []; l < t.end; l++) {
                                var d;
                                if (1 === a) f = e.get(r[0], l), d = !isNaN(f) && n.dataToPoint(f, null, c); else {
                                    var f = u[0] = e.get(r[0], l), p = u[1] = e.get(r[1], l);
                                    d = !isNaN(f) && !isNaN(p) && n.dataToPoint(u, null, c);
                                }
                                i ? (s[h++] = d ? d[0] : NaN, s[h++] = d ? d[1] : NaN) : e.setItemLayout(l, d && d.slice() || [ NaN, NaN ]);
                            }
                            i && e.setLayout("symbolPoints", s);
                        }
                    };
                }
            }
        };
    }("line")), fs(Iv.PROCESSOR.STATISTIC, function(t) {
        return {
            seriesType: t,
            modifyOutputEnd: !0,
            reset: function(t) {
                var e = t.getData(), n = t.get("sampling"), i = t.coordinateSystem;
                if ("cartesian2d" === i.type && n) {
                    var r = i.getBaseAxis(), a = i.getOtherAxis(r), o = r.getExtent(), s = o[1] - o[0], l = Math.round(e.count() / s);
                    if (l > 1) {
                        var h;
                        "string" == typeof n ? h = gy[n] : "function" == typeof n && (h = n), h && t.setData(e.downSample(e.mapDimension(a.dim), 1 / l, h, vy));
                    }
                }
            }
        };
    }("line")), jp.registerSubTypeDefaulter("dataZoom", function() {
        return "slider";
    });
    var Ry = [ "cartesian2d", "polar", "singleAxis" ], Ny = function(t, e) {
        var n = p(t = t.slice(), Xr), i = p(e = (e || []).slice(), Xr);
        return function(r, a) {
            f(t, function(t, o) {
                for (var s = {
                    name: t,
                    capital: n[o]
                }, l = 0; l < e.length; l++) s[e[l]] = t + i[l];
                r.call(a, s);
            });
        };
    }([ "x", "y", "z", "radius", "angle", "single" ], [ "axisIndex", "axis", "index", "id" ]), By = f, Fy = Dr, Vy = function(t, e, n, i) {
        this._dimName = t, this._axisIndex = e, this._valueWindow, this._percentWindow, 
        this._dataExtent, this._minMaxSpan, this.ecModel = i, this._dataZoomModel = n;
    };
    Vy.prototype = {
        constructor: Vy,
        hostedBy: function(t) {
            return this._dataZoomModel === t;
        },
        getDataValueWindow: function() {
            return this._valueWindow.slice();
        },
        getDataPercentWindow: function() {
            return this._percentWindow.slice();
        },
        getTargetSeriesModels: function() {
            var t = [], e = this.ecModel;
            return e.eachSeries(function(n) {
                if (Kh(n.get("coordinateSystem"))) {
                    var i = this._dimName, r = e.queryComponents({
                        mainType: i + "Axis",
                        index: n.get(i + "AxisIndex"),
                        id: n.get(i + "AxisId")
                    })[0];
                    this._axisIndex === (r && r.componentIndex) && t.push(n);
                }
            }, this), t;
        },
        getAxisModel: function() {
            return this.ecModel.getComponent(this._dimName + "Axis", this._axisIndex);
        },
        getOtherAxisModel: function() {
            var t, e, n = this._dimName, i = this.ecModel, r = this.getAxisModel();
            "x" === n || "y" === n ? (e = "gridIndex", t = "x" === n ? "y" : "x") : (e = "polarIndex", 
            t = "angle" === n ? "radius" : "angle");
            var a;
            return i.eachComponent(t + "Axis", function(t) {
                (t.get(e) || 0) === (r.get(e) || 0) && (a = t);
            }), a;
        },
        getMinMaxSpan: function() {
            return i(this._minMaxSpan);
        },
        calculateDataWindow: function(t) {
            var e = this._dataExtent, n = this.getAxisModel().axis.scale, i = this._dataZoomModel.getRangePropMode(), r = [ 0, 100 ], a = [ t.start, t.end ], o = [];
            return By([ "startValue", "endValue" ], function(e) {
                o.push(null != t[e] ? n.parse(t[e]) : null);
            }), By([ 0, 1 ], function(t) {
                var s = o[t], l = a[t];
                "percent" === i[t] ? (null == l && (l = r[t]), s = n.parse(Ir(l, r, e, !0))) : l = Ir(s, e, r, !0), 
                o[t] = s, a[t] = l;
            }), {
                valueWindow: Fy(o),
                percentWindow: Fy(a)
            };
        },
        reset: function(t) {
            if (t === this._dataZoomModel) {
                var e = this.getTargetSeriesModels();
                this._dataExtent = Jh(this, this._dimName, e);
                var n = this.calculateDataWindow(t.option);
                this._valueWindow = n.valueWindow, this._percentWindow = n.percentWindow, nu(this), 
                eu(this);
            }
        },
        restore: function(t) {
            t === this._dataZoomModel && (this._valueWindow = this._percentWindow = null, eu(this, !0));
        },
        filterData: function(t) {
            function e(t) {
                return t >= a[0] && t <= a[1];
            }
            if (t === this._dataZoomModel) {
                var n = this._dimName, i = this.getTargetSeriesModels(), r = t.get("filterMode"), a = this._valueWindow;
                "none" !== r && By(i, function(t) {
                    var i = t.getData(), o = i.mapDimension(n, !0);
                    o.length && ("weakFilter" === r ? i.filterSelf(function(t) {
                        for (var e, n, r, s = 0; s < o.length; s++) {
                            var l = i.get(o[s], t), h = !isNaN(l), u = l < a[0], c = l > a[1];
                            if (h && !u && !c) return !0;
                            h && (r = !0), u && (e = !0), c && (n = !0);
                        }
                        return r && e && n;
                    }) : By(o, function(n) {
                        if ("empty" === r) t.setData(i.map(n, function(t) {
                            return e(t) ? t : NaN;
                        })); else {
                            var o = {};
                            o[n] = a, i.selectRange(o);
                        }
                    }), By(o, function(t) {
                        i.setApproximateExtent(a, t);
                    }));
                });
            }
        }
    };
    var Wy = f, Hy = Ny, Gy = _s({
        type: "dataZoom",
        dependencies: [ "xAxis", "yAxis", "zAxis", "radiusAxis", "angleAxis", "singleAxis", "series" ],
        defaultOption: {
            zlevel: 0,
            z: 4,
            orient: null,
            xAxisIndex: null,
            yAxisIndex: null,
            filterMode: "filter",
            throttle: null,
            start: 0,
            end: 100,
            startValue: null,
            endValue: null,
            minSpan: null,
            maxSpan: null,
            minValueSpan: null,
            maxValueSpan: null,
            rangeMode: null
        },
        init: function(t, e, n) {
            this._dataIntervalByAxis = {}, this._dataInfo = {}, this._axisProxies = {}, this.textStyleModel, 
            this._autoThrottle = !0, this._rangePropMode = [ "percent", "percent" ];
            var i = iu(t);
            this.mergeDefaultAndTheme(t, n), this.doInit(i);
        },
        mergeOption: function(t) {
            var e = iu(t);
            r(this.option, t, !0), this.doInit(e);
        },
        doInit: function(t) {
            var e = this.option;
            Lu.canvasSupported || (e.realtime = !1), this._setDefaultThrottle(t), ru(this, t), 
            Wy([ [ "start", "startValue" ], [ "end", "endValue" ] ], function(t, n) {
                "value" === this._rangePropMode[n] && (e[t[0]] = null);
            }, this), this.textStyleModel = this.getModel("textStyle"), this._resetTarget(), 
            this._giveAxisProxies();
        },
        _giveAxisProxies: function() {
            var t = this._axisProxies;
            this.eachTargetAxis(function(e, n, i, r) {
                var a = this.dependentModels[e.axis][n], o = a.__dzAxisProxy || (a.__dzAxisProxy = new Vy(e.name, n, this, r));
                t[e.name + "_" + n] = o;
            }, this);
        },
        _resetTarget: function() {
            var t = this.option, e = this._judgeAutoMode();
            Hy(function(e) {
                var n = e.axisIndex;
                t[n] = bn(t[n]);
            }, this), "axisIndex" === e ? this._autoSetAxisIndex() : "orient" === e && this._autoSetOrient();
        },
        _judgeAutoMode: function() {
            var t = this.option, e = !1;
            Hy(function(n) {
                null != t[n.axisIndex] && (e = !0);
            }, this);
            var n = t.orient;
            return null == n && e ? "orient" : e ? void 0 : (null == n && (t.orient = "horizontal"), 
            "axisIndex");
        },
        _autoSetAxisIndex: function() {
            var t = !0, e = this.get("orient", !0), n = this.option, i = this.dependentModels;
            if (t) {
                var r = "vertical" === e ? "y" : "x";
                i[r + "Axis"].length ? (n[r + "AxisIndex"] = [ 0 ], t = !1) : Wy(i.singleAxis, function(i) {
                    t && i.get("orient", !0) === e && (n.singleAxisIndex = [ i.componentIndex ], t = !1);
                });
            }
            t && Hy(function(e) {
                if (t) {
                    var i = [], r = this.dependentModels[e.axis];
                    if (r.length && !i.length) for (var a = 0, o = r.length; o > a; a++) "category" === r[a].get("type") && i.push(a);
                    n[e.axisIndex] = i, i.length && (t = !1);
                }
            }, this), t && this.ecModel.eachSeries(function(t) {
                this._isSeriesHasAllAxesTypeOf(t, "value") && Hy(function(e) {
                    var i = n[e.axisIndex], r = t.get(e.axisIndex), a = t.get(e.axisId);
                    h(i, r = t.ecModel.queryComponents({
                        mainType: e.axis,
                        index: r,
                        id: a
                    })[0].componentIndex) < 0 && i.push(r);
                });
            }, this);
        },
        _autoSetOrient: function() {
            var t;
            this.eachTargetAxis(function(e) {
                !t && (t = e.name);
            }, this), this.option.orient = "y" === t ? "vertical" : "horizontal";
        },
        _isSeriesHasAllAxesTypeOf: function(t, e) {
            var n = !0;
            return Hy(function(i) {
                var r = t.get(i.axisIndex), a = this.dependentModels[i.axis][r];
                a && a.get("type") === e || (n = !1);
            }, this), n;
        },
        _setDefaultThrottle: function(t) {
            if (t.hasOwnProperty("throttle") && (this._autoThrottle = !1), this._autoThrottle) {
                var e = this.ecModel.option;
                this.option.throttle = e.animation && e.animationDurationUpdate > 0 ? 100 : 20;
            }
        },
        getFirstTargetAxisModel: function() {
            var t;
            return Hy(function(e) {
                if (null == t) {
                    var n = this.get(e.axisIndex);
                    n.length && (t = this.dependentModels[e.axis][n[0]]);
                }
            }, this), t;
        },
        eachTargetAxis: function(t, e) {
            var n = this.ecModel;
            Hy(function(i) {
                Wy(this.get(i.axisIndex), function(r) {
                    t.call(e, i, r, this, n);
                }, this);
            }, this);
        },
        getAxisProxy: function(t, e) {
            return this._axisProxies[t + "_" + e];
        },
        getAxisModel: function(t, e) {
            var n = this.getAxisProxy(t, e);
            return n && n.getAxisModel();
        },
        setRawRange: function(t, e) {
            var n = this.option;
            Wy([ [ "start", "startValue" ], [ "end", "endValue" ] ], function(e) {
                (null != t[e[0]] || null != t[e[1]]) && (n[e[0]] = t[e[0]], n[e[1]] = t[e[1]]);
            }, this), !e && ru(this, t);
        },
        getPercentRange: function() {
            var t = this.findRepresentativeAxisProxy();
            return t ? t.getDataPercentWindow() : void 0;
        },
        getValueRange: function(t, e) {
            if (null != t || null != e) return this.getAxisProxy(t, e).getDataValueWindow();
            var n = this.findRepresentativeAxisProxy();
            return n ? n.getDataValueWindow() : void 0;
        },
        findRepresentativeAxisProxy: function(t) {
            if (t) return t.__dzAxisProxy;
            var e = this._axisProxies;
            for (var n in e) if (e.hasOwnProperty(n) && e[n].hostedBy(this)) return e[n];
            for (var n in e) if (e.hasOwnProperty(n) && !e[n].hostedBy(this)) return e[n];
        },
        getRangePropMode: function() {
            return this._rangePropMode.slice();
        }
    }), Zy = zg.extend({
        type: "dataZoom",
        render: function(t, e, n) {
            this.dataZoomModel = t, this.ecModel = e, this.api = n;
        },
        getTargetCoordInfo: function() {
            function t(t, e, n, i) {
                for (var r, a = 0; a < n.length; a++) if (n[a].model === t) {
                    r = n[a];
                    break;
                }
                r || n.push(r = {
                    model: t,
                    axisModels: [],
                    coordIndex: i
                }), r.axisModels.push(e);
            }
            var e = this.dataZoomModel, n = this.ecModel, i = {};
            return e.eachTargetAxis(function(e, r) {
                var a = n.getComponent(e.axis, r);
                if (a) {
                    var o = a.getCoordSysModel();
                    o && t(o, a, i[o.mainType] || (i[o.mainType] = []), o.componentIndex);
                }
            }, this), i;
        }
    }), Xy = (Gy.extend({
        type: "dataZoom.slider",
        layoutMode: "box",
        defaultOption: {
            show: !0,
            right: "ph",
            top: "ph",
            width: "ph",
            height: "ph",
            left: null,
            bottom: null,
            backgroundColor: "rgba(47,69,84,0)",
            dataBackground: {
                lineStyle: {
                    color: "#2f4554",
                    width: .5,
                    opacity: .3
                },
                areaStyle: {
                    color: "rgba(47,69,84,0.3)",
                    opacity: .3
                }
            },
            borderColor: "#ddd",
            fillerColor: "rgba(167,183,204,0.4)",
            handleIcon: "M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z",
            handleSize: "100%",
            handleStyle: {
                color: "#a7b7cc"
            },
            labelPrecision: null,
            labelFormatter: null,
            showDetail: !0,
            showDataShadow: "auto",
            realtime: !0,
            zoomLock: !1,
            textStyle: {
                color: "#333"
            }
        }
    }), function(t, e, n, i, r, a) {
        e[0] = ou(e[0], n), e[1] = ou(e[1], n), t = t || 0;
        var o = n[1] - n[0];
        null != r && (r = ou(r, [ 0, o ])), null != a && (a = Math.max(a, null != r ? r : 0)), 
        "all" === i && (r = a = Math.abs(e[1] - e[0]), i = 0);
        var s = au(e, i);
        e[i] += t;
        var l = r || 0, h = n.slice();
        s.sign < 0 ? h[0] += l : h[1] -= l, e[i] = ou(e[i], h);
        u = au(e, i);
        null != r && (u.sign !== s.sign || u.span < r) && (e[1 - i] = e[i] + s.sign * r);
        var u = au(e, i);
        return null != a && u.span > a && (e[1 - i] = e[i] + u.sign * a), e;
    }), qy = sp, Yy = Ir, jy = Dr, Uy = m, $y = f, Ky = "horizontal", Qy = "vertical", Jy = 5, t_ = [ "line", "bar", "candlestick", "scatter" ], e_ = Zy.extend({
        type: "dataZoom.slider",
        init: function(t, e) {
            this._displayables = {}, this._orient, this._range, this._handleEnds, this._size, 
            this._handleWidth, this._handleHeight, this._location, this._dragging, this._dataShadowInfo, 
            this.api = e;
        },
        render: function(t, e, n, i) {
            return e_.superApply(this, "render", arguments), fo(this, "_dispatchZoomAction", this.dataZoomModel.get("throttle"), "fixRate"), 
            this._orient = t.get("orient"), !1 === this.dataZoomModel.get("show") ? void this.group.removeAll() : (i && "dataZoom" === i.type && i.from === this.uid || this._buildView(), 
            void this._updateView());
        },
        remove: function() {
            e_.superApply(this, "remove", arguments), po(this, "_dispatchZoomAction");
        },
        dispose: function() {
            e_.superApply(this, "dispose", arguments), po(this, "_dispatchZoomAction");
        },
        _buildView: function() {
            var t = this.group;
            t.removeAll(), this._resetLocation(), this._resetInterval();
            var e = this._displayables.barGroup = new Wc();
            this._renderBackground(), this._renderHandle(), this._renderDataShadow(), t.add(e), 
            this._positionGroup();
        },
        _resetLocation: function() {
            var t = this.dataZoomModel, e = this.api, n = this._findCoordRect(), i = {
                width: e.getWidth(),
                height: e.getHeight()
            }, r = this._orient === Ky ? {
                right: i.width - n.x - n.width,
                top: i.height - 30 - 7,
                width: n.width,
                height: 30
            } : {
                right: 7,
                top: n.y,
                width: 30,
                height: n.height
            }, a = Ur(t.option);
            f([ "right", "top", "width", "height" ], function(t) {
                "ph" === a[t] && (a[t] = r[t]);
            });
            var o = Yr(a, i, t.padding);
            this._location = {
                x: o.x,
                y: o.y
            }, this._size = [ o.width, o.height ], this._orient === Qy && this._size.reverse();
        },
        _positionGroup: function() {
            var t = this.group, e = this._location, n = this._orient, i = this.dataZoomModel.getFirstTargetAxisModel(), r = i && i.get("inverse"), a = this._displayables.barGroup, o = (this._dataShadowInfo || {}).otherAxisInverse;
            a.attr(n !== Ky || r ? n === Ky && r ? {
                scale: o ? [ -1, 1 ] : [ -1, -1 ]
            } : n !== Qy || r ? {
                scale: o ? [ -1, -1 ] : [ -1, 1 ],
                rotation: Math.PI / 2
            } : {
                scale: o ? [ 1, -1 ] : [ 1, 1 ],
                rotation: Math.PI / 2
            } : {
                scale: o ? [ 1, 1 ] : [ 1, -1 ]
            });
            var s = t.getBoundingRect([ a ]);
            t.attr("position", [ e.x - s.x, e.y - s.y ]);
        },
        _getViewExtent: function() {
            return [ 0, this._size[0] ];
        },
        _renderBackground: function() {
            var t = this.dataZoomModel, e = this._size, n = this._displayables.barGroup;
            n.add(new qy({
                silent: !0,
                shape: {
                    x: 0,
                    y: 0,
                    width: e[0],
                    height: e[1]
                },
                style: {
                    fill: t.get("backgroundColor")
                },
                z2: -40
            })), n.add(new qy({
                shape: {
                    x: 0,
                    y: 0,
                    width: e[0],
                    height: e[1]
                },
                style: {
                    fill: "transparent"
                },
                z2: 0,
                onclick: m(this._onClickPanelClick, this)
            }));
        },
        _renderDataShadow: function() {
            var t = this._dataShadowInfo = this._prepareDataShadowInfo();
            if (t) {
                var e = this._size, n = t.series, i = n.getRawData(), r = n.getShadowDim ? n.getShadowDim() : t.otherDim;
                if (null != r) {
                    var a = i.getDataExtent(r), o = .3 * (a[1] - a[0]);
                    a = [ a[0] - o, a[1] + o ];
                    var l, h = [ 0, e[1] ], u = [ 0, e[0] ], c = [ [ e[0], 0 ], [ 0, 0 ] ], d = [], f = u[1] / (i.count() - 1), p = 0, g = Math.round(i.count() / e[0]);
                    i.each([ r ], function(t, e) {
                        if (g > 0 && e % g) p += f; else {
                            var n = null == t || isNaN(t) || "" === t, i = n ? 0 : Yy(t, a, h, !0);
                            n && !l && e ? (c.push([ c[c.length - 1][0], 0 ]), d.push([ d[d.length - 1][0], 0 ])) : !n && l && (c.push([ p, 0 ]), 
                            d.push([ p, 0 ])), c.push([ p, i ]), d.push([ p, i ]), p += f, l = n;
                        }
                    });
                    var v = this.dataZoomModel;
                    this._displayables.barGroup.add(new ip({
                        shape: {
                            points: c
                        },
                        style: s({
                            fill: v.get("dataBackgroundColor")
                        }, v.getModel("dataBackground.areaStyle").getAreaStyle()),
                        silent: !0,
                        z2: -20
                    })), this._displayables.barGroup.add(new rp({
                        shape: {
                            points: d
                        },
                        style: v.getModel("dataBackground.lineStyle").getLineStyle(),
                        silent: !0,
                        z2: -19
                    }));
                }
            }
        },
        _prepareDataShadowInfo: function() {
            var t = this.dataZoomModel, e = t.get("showDataShadow");
            if (!1 !== e) {
                var n, i = this.ecModel;
                return t.eachTargetAxis(function(r, a) {
                    f(t.getAxisProxy(r.name, a).getTargetSeriesModels(), function(t) {
                        if (!(n || !0 !== e && h(t_, t.get("type")) < 0)) {
                            var o, s = i.getComponent(r.axis, a).axis, l = su(r.name), u = t.coordinateSystem;
                            null != l && u.getOtherAxis && (o = u.getOtherAxis(s).inverse), l = t.getData().mapDimension(l), 
                            n = {
                                thisAxis: s,
                                series: t,
                                thisDim: r.name,
                                otherDim: l,
                                otherAxisInverse: o
                            };
                        }
                    }, this);
                }, this), n;
            }
        },
        _renderHandle: function() {
            var t = this._displayables, e = t.handles = [], n = t.handleLabels = [], i = this._displayables.barGroup, r = this._size, a = this.dataZoomModel;
            i.add(t.filler = new qy({
                draggable: !0,
                cursor: lu(this._orient),
                drift: Uy(this._onDragMove, this, "all"),
                onmousemove: function(t) {
                    ic(t.event);
                },
                ondragstart: Uy(this._showDataInfo, this, !0),
                ondragend: Uy(this._onDragEnd, this),
                onmouseover: Uy(this._showDataInfo, this, !0),
                onmouseout: Uy(this._showDataInfo, this, !1),
                style: {
                    fill: a.get("fillerColor"),
                    textPosition: "inside"
                }
            })), i.add(new qy(Hi({
                silent: !0,
                shape: {
                    x: 0,
                    y: 0,
                    width: r[0],
                    height: r[1]
                },
                style: {
                    stroke: a.get("dataBackgroundColor") || a.get("borderColor"),
                    lineWidth: 1,
                    fill: "rgba(0,0,0,0)"
                }
            }))), $y([ 0, 1 ], function(t) {
                var r = wr(a.get("handleIcon"), {
                    cursor: lu(this._orient),
                    draggable: !0,
                    drift: Uy(this._onDragMove, this, t),
                    onmousemove: function(t) {
                        ic(t.event);
                    },
                    ondragend: Uy(this._onDragEnd, this),
                    onmouseover: Uy(this._showDataInfo, this, !0),
                    onmouseout: Uy(this._showDataInfo, this, !1)
                }, {
                    x: -1,
                    y: 0,
                    width: 2,
                    height: 2
                }), o = r.getBoundingRect();
                this._handleHeight = Ar(a.get("handleSize"), this._size[1]), this._handleWidth = o.width / o.height * this._handleHeight, 
                r.setStyle(a.getModel("handleStyle").getItemStyle());
                var s = a.get("handleColor");
                null != s && (r.style.fill = s), i.add(e[t] = r);
                var l = a.textStyleModel;
                this.group.add(n[t] = new Uf({
                    silent: !0,
                    invisible: !0,
                    style: {
                        x: 0,
                        y: 0,
                        text: "",
                        textVerticalAlign: "middle",
                        textAlign: "center",
                        textFill: l.getTextColor(),
                        textFont: l.getFont()
                    },
                    z2: 10
                }));
            }, this);
        },
        _resetInterval: function() {
            var t = this._range = this.dataZoomModel.getPercentRange(), e = this._getViewExtent();
            this._handleEnds = [ Yy(t[0], [ 0, 100 ], e, !0), Yy(t[1], [ 0, 100 ], e, !0) ];
        },
        _updateInterval: function(t, e) {
            var n = this.dataZoomModel, i = this._handleEnds, r = this._getViewExtent(), a = n.findRepresentativeAxisProxy().getMinMaxSpan(), o = [ 0, 100 ];
            Xy(e, i, r, n.get("zoomLock") ? "all" : t, null != a.minSpan ? Yy(a.minSpan, o, r, !0) : null, null != a.maxSpan ? Yy(a.maxSpan, o, r, !0) : null);
            var s = this._range, l = this._range = jy([ Yy(i[0], r, o, !0), Yy(i[1], r, o, !0) ]);
            return !s || s[0] !== l[0] || s[1] !== l[1];
        },
        _updateView: function(t) {
            var e = this._displayables, n = this._handleEnds, i = jy(n.slice()), r = this._size;
            $y([ 0, 1 ], function(t) {
                var i = e.handles[t], a = this._handleHeight;
                i.attr({
                    scale: [ a / 2, a / 2 ],
                    position: [ n[t], r[1] / 2 - a / 2 ]
                });
            }, this), e.filler.setShape({
                x: i[0],
                y: 0,
                width: i[1] - i[0],
                height: r[1]
            }), this._updateDataInfo(t);
        },
        _updateDataInfo: function(t) {
            function e(t) {
                var e = mr(i.handles[t].parent, this.group), n = _r(0 === t ? "right" : "left", e), s = this._handleWidth / 2 + Jy, l = yr([ c[t] + (0 === t ? -s : s), this._size[1] / 2 ], e);
                r[t].setStyle({
                    x: l[0],
                    y: l[1],
                    textVerticalAlign: a === Ky ? "middle" : n,
                    textAlign: a === Ky ? n : "center",
                    text: o[t]
                });
            }
            var n = this.dataZoomModel, i = this._displayables, r = i.handleLabels, a = this._orient, o = [ "", "" ];
            if (n.get("showDetail")) {
                var s = n.findRepresentativeAxisProxy();
                if (s) {
                    var l = s.getAxisModel().axis, h = this._range, u = t ? s.calculateDataWindow({
                        start: h[0],
                        end: h[1]
                    }).valueWindow : s.getDataValueWindow();
                    o = [ this._formatLabel(u[0], l), this._formatLabel(u[1], l) ];
                }
            }
            var c = jy(this._handleEnds.slice());
            e.call(this, 0), e.call(this, 1);
        },
        _formatLabel: function(t, e) {
            var n = this.dataZoomModel, i = n.get("labelFormatter"), r = n.get("labelPrecision");
            (null == r || "auto" === r) && (r = e.getPixelPrecision());
            var a = null == t || isNaN(t) ? "" : "category" === e.type || "time" === e.type ? e.scale.getLabel(Math.round(t)) : t.toFixed(Math.min(r, 20));
            return x(i) ? i(t, a) : w(i) ? i.replace("{value}", a) : a;
        },
        _showDataInfo: function(t) {
            t = this._dragging || t;
            var e = this._displayables.handleLabels;
            e[0].attr("invisible", !t), e[1].attr("invisible", !t);
        },
        _onDragMove: function(t, e, n) {
            this._dragging = !0;
            var i = yr([ e, n ], this._displayables.barGroup.getLocalTransform(), !0), r = this._updateInterval(t, i[0]), a = this.dataZoomModel.get("realtime");
            this._updateView(!a), r && a && this._dispatchZoomAction();
        },
        _onDragEnd: function() {
            this._dragging = !1, this._showDataInfo(!1), !this.dataZoomModel.get("realtime") && this._dispatchZoomAction();
        },
        _onClickPanelClick: function(t) {
            var e = this._size, n = this._displayables.barGroup.transformCoordToLocal(t.offsetX, t.offsetY);
            if (!(n[0] < 0 || n[0] > e[0] || n[1] < 0 || n[1] > e[1])) {
                var i = this._handleEnds, r = (i[0] + i[1]) / 2, a = this._updateInterval("all", n[0] - r);
                this._updateView(), a && this._dispatchZoomAction();
            }
        },
        _dispatchZoomAction: function() {
            var t = this._range;
            this.api.dispatchAction({
                type: "dataZoom",
                from: this.uid,
                dataZoomId: this.dataZoomModel.id,
                start: t[0],
                end: t[1]
            });
        },
        _findCoordRect: function() {
            var t;
            if ($y(this.getTargetCoordInfo(), function(e) {
                if (!t && e.length) {
                    var n = e[0].model.coordinateSystem;
                    t = n.getRect && n.getRect();
                }
            }), !t) {
                var e = this.api.getWidth(), n = this.api.getHeight();
                t = {
                    x: .2 * e,
                    y: .2 * n,
                    width: .6 * e,
                    height: .6 * n
                };
            }
            return t;
        }
    });
    Gy.extend({
        type: "dataZoom.inside",
        defaultOption: {
            disabled: !1,
            zoomLock: !1,
            zoomOnMouseWheel: !0,
            moveOnMouseMove: !0,
            moveOnMouseWheel: !1,
            preventDefaultMouseMove: !0
        }
    });
    var n_ = "\0_ec_interaction_mutex";
    ps({
        type: "takeGlobalCursor",
        event: "globalCursorTaken",
        update: "update"
    }, function() {}), c(cu, tc);
    var i_ = "\0_ec_dataZoom_roams", r_ = m, a_ = Zy.extend({
        type: "dataZoom.inside",
        init: function() {
            this._range;
        },
        render: function(t, e, n) {
            a_.superApply(this, "render", arguments), this._range = t.getPercentRange(), f(this.getTargetCoordInfo(), function(e, i) {
                var r = p(e, function(t) {
                    return bu(t.model);
                });
                f(e, function(e) {
                    var a = e.model, o = {};
                    f([ "pan", "zoom", "scrollMove" ], function(t) {
                        o[t] = r_(o_[t], this, e, i);
                    }, this), xu(n, {
                        coordId: bu(a),
                        allCoordIds: r,
                        containsPoint: function(t, e, n) {
                            return a.coordinateSystem.containPoint([ e, n ]);
                        },
                        dataZoomId: t.id,
                        dataZoomModel: t,
                        getRange: o
                    });
                }, this);
            }, this);
        },
        dispose: function() {
            wu(this.api, this.dataZoomModel.id), a_.superApply(this, "dispose", arguments), 
            this._range = null;
        }
    }), o_ = {
        zoom: function(t, e, n, i) {
            var r = this._range, a = r.slice(), o = t.axisModels[0];
            if (o) {
                var s = s_[e](null, [ i.originX, i.originY ], o, n, t), l = (s.signal > 0 ? s.pixelStart + s.pixelLength - s.pixel : s.pixel - s.pixelStart) / s.pixelLength * (a[1] - a[0]) + a[0], h = Math.max(1 / i.scale, 0);
                a[0] = (a[0] - l) * h + l, a[1] = (a[1] - l) * h + l;
                var u = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
                return Xy(0, a, [ 0, 100 ], 0, u.minSpan, u.maxSpan), this._range = a, r[0] !== a[0] || r[1] !== a[1] ? a : void 0;
            }
        },
        pan: Au(function(t, e, n, i, r, a) {
            var o = s_[i]([ a.oldX, a.oldY ], [ a.newX, a.newY ], e, r, n);
            return o.signal * (t[1] - t[0]) * o.pixel / o.pixelLength;
        }),
        scrollMove: Au(function(t, e, n, i, r, a) {
            return s_[i]([ 0, 0 ], [ a.scrollDelta, a.scrollDelta ], e, r, n).signal * (t[1] - t[0]) * a.scrollDelta;
        })
    }, s_ = {
        grid: function(t, e, n, i, r) {
            var a = n.axis, o = {}, s = r.model.coordinateSystem.getRect();
            return t = t || [ 0, 0 ], "x" === a.dim ? (o.pixel = e[0] - t[0], o.pixelLength = s.width, 
            o.pixelStart = s.x, o.signal = a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1], o.pixelLength = s.height, 
            o.pixelStart = s.y, o.signal = a.inverse ? -1 : 1), o;
        },
        polar: function(t, e, n, i, r) {
            var a = n.axis, o = {}, s = r.model.coordinateSystem, l = s.getRadiusAxis().getExtent(), h = s.getAngleAxis().getExtent();
            return t = t ? s.pointToCoord(t) : [ 0, 0 ], e = s.pointToCoord(e), "radiusAxis" === n.mainType ? (o.pixel = e[0] - t[0], 
            o.pixelLength = l[1] - l[0], o.pixelStart = l[0], o.signal = a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1], 
            o.pixelLength = h[1] - h[0], o.pixelStart = h[0], o.signal = a.inverse ? -1 : 1), 
            o;
        },
        singleAxis: function(t, e, n, i, r) {
            var a = n.axis, o = r.model.coordinateSystem.getRect(), s = {};
            return t = t || [ 0, 0 ], "horizontal" === a.orient ? (s.pixel = e[0] - t[0], s.pixelLength = o.width, 
            s.pixelStart = o.x, s.signal = a.inverse ? 1 : -1) : (s.pixel = e[1] - t[1], s.pixelLength = o.height, 
            s.pixelStart = o.y, s.signal = a.inverse ? -1 : 1), s;
        }
    };
    fs({
        getTargetSeries: function(t) {
            var e = N();
            return t.eachComponent("dataZoom", function(t) {
                t.eachTargetAxis(function(t, n, i) {
                    f(i.getAxisProxy(t.name, n).getTargetSeriesModels(), function(t) {
                        e.set(t.uid, t);
                    });
                });
            }), e;
        },
        modifyOutputEnd: !0,
        overallReset: function(t, e) {
            t.eachComponent("dataZoom", function(t) {
                t.eachTargetAxis(function(t, n, i) {
                    i.getAxisProxy(t.name, n).reset(i, e);
                }), t.eachTargetAxis(function(t, n, i) {
                    i.getAxisProxy(t.name, n).filterData(i, e);
                });
            }), t.eachComponent("dataZoom", function(t) {
                var e = t.findRepresentativeAxisProxy(), n = e.getDataPercentWindow(), i = e.getDataValueWindow();
                t.setRawRange({
                    start: n[0],
                    end: n[1],
                    startValue: i[0],
                    endValue: i[1]
                }, !0);
            });
        }
    }), ps("dataZoom", function(t, e) {
        var n = Qh(m(e.eachComponent, e, "dataZoom"), Ny, function(t, e) {
            return t.get(e.axisIndex);
        }), i = [];
        e.eachComponent({
            mainType: "dataZoom",
            query: t
        }, function(t) {
            i.push.apply(i, n(t).nodes);
        }), f(i, function(e) {
            e.setRawRange({
                start: t.start,
                end: t.end,
                startValue: t.startValue,
                endValue: t.endValue
            });
        });
    }), e.version = "4.2.1", e.dependencies = Mv, e.PRIORITY = Iv, e.init = function(t, e, n) {
        var i = us(t);
        if (i) return i;
        var r = new Ho(t, e, n);
        return r.id = "ec_" + Zv++, Hv[r.id] = r, En(t, qv, r.id), ls(r), r;
    }, e.connect = function(t) {
        if (_(t)) {
            var e = t;
            t = null, _v(e, function(e) {
                null != e.group && (t = e.group);
            }), t = t || "g_" + Xv++, _v(e, function(e) {
                e.group = t;
            });
        }
        return Gv[t] = !0, t;
    }, e.disConnect = hs, e.disconnect = Yv, e.dispose = function(t) {
        "string" == typeof t ? t = Hv[t] : t instanceof Ho || (t = us(t)), t instanceof Ho && !t.isDisposed() && t.dispose();
    }, e.getInstanceByDom = us, e.getInstanceById = function(t) {
        return Hv[t];
    }, e.registerTheme = cs, e.registerPreprocessor = ds, e.registerProcessor = fs, 
    e.registerPostUpdate = function(t) {
        Bv.push(t);
    }, e.registerAction = ps, e.registerCoordinateSystem = function(t, e) {
        wa.register(t, e);
    }, e.getCoordinateSystemDimensions = function(t) {
        var e = wa.get(t);
        return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0;
    }, e.registerLayout = gs, e.registerVisual = vs, e.registerLoading = ys, e.extendComponentModel = _s, 
    e.extendComponentView = xs, e.extendSeriesModel = function(t) {
        return Eg.extend(t);
    }, e.extendChartView = function(t) {
        return oo.extend(t);
    }, e.setCanvasCreator = function(t) {
        n("createCanvas", t);
    }, e.registerMap = function(t, e, n) {
        vv.registerMap(t, e, n);
    }, e.getMap = function(t) {
        var e = vv.retrieveMap(t);
        return e && e[0] && {
            geoJson: e[0].geoJSON,
            specialAreas: e[0].specialAreas
        };
    }, e.dataTool = jv, e.zrender = Pd, e.number = zp, e.format = Hp, e.throttle = co, 
    e.helper = Gm, e.matrix = uc, e.vector = Qu, e.color = kc, e.parseGeoJSON = Xm, 
    e.parseGeoJson = Um, e.util = $m, e.graphic = Km, e.List = om, e.Model = br, e.Axis = jm, 
    e.env = Lu;
});