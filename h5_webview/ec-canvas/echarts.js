var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, n) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define([ "exports" ], n) : n(e.echarts = {});
}(void 0, function(e) {
    function n(t, e) {
        "createCanvas" === t && (Nu = null), Ru[t] = e;
    }
    function i(e) {
        if (null == e || "object" != (void 0 === e ? "undefined" : t(e))) return e;
        var n = e, r = Du.call(e);
        if ("[object Array]" === r) {
            if (!B(e)) {
                n = [];
                for (var a = 0, o = e.length; o > a; a++) n[a] = i(e[a]);
            }
        } else if (ku[r]) {
            if (!B(e)) {
                var s = e.constructor;
                if (e.constructor.from) n = s.from(e); else {
                    n = new s(e.length);
                    for (var a = 0, o = e.length; o > a; a++) n[a] = i(e[a]);
                }
            }
        } else if (!Iu[r] && !B(e) && !T(e)) {
            n = {};
            for (var l in e) e.hasOwnProperty(l) && (n[l] = i(e[l]));
        }
        return n;
    }
    function r(t, e, n) {
        if (!b(e) || !b(t)) return n ? i(e) : t;
        for (var a in e) if (e.hasOwnProperty(a)) {
            var o = t[a], s = e[a];
            !b(s) || !b(o) || _(s) || _(o) || T(s) || T(o) || M(s) || M(o) || B(s) || B(o) ? !n && a in t || (t[a] = i(e[a], !0)) : r(o, s, n);
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
        return Nu || (Nu = zu().getContext("2d")), Nu;
    }
    function u(t, e) {
        if (t) {
            if (t.indexOf) return t.indexOf(e);
            for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n;
        }
        return -1;
    }
    function h(t, e) {
        function n() {}
        var i = t.prototype;
        n.prototype = e.prototype, t.prototype = new n();
        for (var r in i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);
        t.prototype.constructor = t, t.superClass = e;
    }
    function c(t, e, n) {
        s(t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, n);
    }
    function f(t) {
        return t ? "string" != typeof t && "number" == typeof t.length : void 0;
    }
    function d(t, e, n) {
        if (t && e) if (t.forEach && t.forEach === Lu) t.forEach(e, n); else if (t.length === +t.length) for (var i = 0, r = t.length; r > i; i++) e.call(n, t[i], i, t); else for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t);
    }
    function p(t, e, n) {
        if (t && e) {
            if (t.map && t.map === Eu) return t.map(e, n);
            for (var i = [], r = 0, a = t.length; a > r; r++) i.push(e.call(n, t[r], r, t));
            return i;
        }
    }
    function g(t, e, n, i) {
        if (t && e) {
            if (t.reduce && t.reduce === Bu) return t.reduce(e, n, i);
            for (var r = 0, a = t.length; a > r; r++) n = e.call(i, n, t[r], r, t);
            return n;
        }
    }
    function v(t, e, n) {
        if (t && e) {
            if (t.filter && t.filter === Pu) return t.filter(e, n);
            for (var i = [], r = 0, a = t.length; a > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);
            return i;
        }
    }
    function m(t, e) {
        var n = Ou.call(arguments, 2);
        return function() {
            return t.apply(e, n.concat(Ou.call(arguments)));
        };
    }
    function y(t) {
        var e = Ou.call(arguments, 1);
        return function() {
            return t.apply(this, e.concat(Ou.call(arguments)));
        };
    }
    function _(t) {
        return "[object Array]" === Du.call(t);
    }
    function x(t) {
        return "function" == typeof t;
    }
    function w(t) {
        return "[object String]" === Du.call(t);
    }
    function b(e) {
        var n = void 0 === e ? "undefined" : t(e);
        return "function" === n || !!e && "object" === n;
    }
    function M(t) {
        return !!Iu[Du.call(t)];
    }
    function S(t) {
        return !!ku[Du.call(t)];
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
    function k(t, e) {
        return null != t ? t : e;
    }
    function D(t, e, n) {
        return null != t ? t : null != e ? e : n;
    }
    function A() {
        return Function.call.apply(Ou, arguments);
    }
    function L(t) {
        if ("number" == typeof t) return [ t, t, t, t ];
        var e = t.length;
        return 2 === e ? [ t[0], t[1], t[0], t[1] ] : 3 === e ? [ t[0], t[1], t[2], t[1] ] : t;
    }
    function P(t, e) {
        if (!t) throw new Error(e);
    }
    function O(t) {
        return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    function E(t) {
        t[Fu] = !0;
    }
    function B(t) {
        return t[Fu];
    }
    function R(t) {
        function e(t, e) {
            n ? i.set(t, e) : i.set(e, t);
        }
        var n = _(t);
        this.data = {};
        var i = this;
        t instanceof R ? t.each(e) : t && d(t, e);
    }
    function z(t) {
        return new R(t);
    }
    function N() {}
    function F(t, e) {
        var n = new Wu(2);
        return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n;
    }
    function V(t) {
        var e = new Wu(2);
        return e[0] = t[0], e[1] = t[1], e;
    }
    function W(t, e, n) {
        return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;
    }
    function H(t, e, n) {
        return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;
    }
    function G(t) {
        return Math.sqrt(q(t));
    }
    function q(t) {
        return t[0] * t[0] + t[1] * t[1];
    }
    function X(t, e, n) {
        return t[0] = e[0] * n, t[1] = e[1] * n, t;
    }
    function U(t, e) {
        var n = G(e);
        return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t;
    }
    function j(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
    }
    function Y(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
    }
    function Z(t, e, n) {
        var i = e[0], r = e[1];
        return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;
    }
    function $(t, e, n) {
        return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;
    }
    function Q(t, e, n) {
        return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;
    }
    function K() {
        this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), 
        this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this);
    }
    function J(t, e) {
        return {
            target: t,
            topTarget: e && e.topTarget
        };
    }
    function tt(t, e) {
        var n = t._$eventProcessor;
        return null != e && n && n.normalizeQuery && (e = n.normalizeQuery(e)), e;
    }
    function et(t, e, n, i, r, a) {
        var o = t._$handlers;
        if ("function" == typeof n && (r = i, i = n, n = null), !i || !e) return t;
        n = tt(t, n), o[e] || (o[e] = []);
        for (var s = 0; s < o[e].length; s++) if (o[e][s].h === i) return t;
        var l = {
            h: i,
            one: a,
            query: n,
            ctx: r || t,
            callAtLast: i.zrEventfulCallAtLast
        }, u = o[e].length - 1, h = o[e][u];
        return h && h.callAtLast ? o[e].splice(u, 0, l) : o[e].push(l), t;
    }
    function nt(t, e, n, i, r, a) {
        var o = i + "-" + r, s = t.length;
        if (a.hasOwnProperty(o)) return a[o];
        if (1 === e) {
            var l = Math.round(Math.log((1 << s) - 1 & ~r) / Zu);
            return t[n][l];
        }
        for (var u = i | 1 << n, h = n + 1; i & 1 << h; ) h++;
        for (var c = 0, f = 0, d = 0; s > f; f++) {
            var p = 1 << f;
            p & r || (c += (d % 2 ? -1 : 1) * t[n][f] * nt(t, e - 1, h, u, r | p, a), d++);
        }
        return a[o] = c, c;
    }
    function it(t, e) {
        var n = [ [ t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1] ], [ 0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1] ], [ t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3] ], [ 0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3] ], [ t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5] ], [ 0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5] ], [ t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7] ], [ 0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7] ] ], i = {}, r = nt(n, 8, 0, 0, 0, i);
        if (0 !== r) {
            for (var a = [], o = 0; 8 > o; o++) for (var s = 0; 8 > s; s++) null == a[s] && (a[s] = 0), 
            a[s] += ((o + s) % 2 ? -1 : 1) * nt(n, 7, 0 === o ? 1 : 0, 1 << o, 1 << s, i) / r * e[o];
            return function(t, e, n) {
                var i = e * a[6] + n * a[7] + 1;
                t[0] = (e * a[0] + n * a[1] + a[2]) / i, t[1] = (e * a[3] + n * a[4] + a[5]) / i;
            };
        }
    }
    function rt(t, e, n, i) {
        return n = n || {}, i || !Cu.canvasSupported ? at(t, e, n) : Cu.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, 
        n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : at(t, e, n), 
        n;
    }
    function at(t, e, n) {
        if (t.getBoundingClientRect && Cu.domSupported) {
            var i = e.clientX, r = e.clientY;
            if ("CANVAS" === t.nodeName.toUpperCase()) {
                var a = t.getBoundingClientRect();
                return n.zrX = i - a.left, void (n.zrY = r - a.top);
            }
            var o = t[Ku] || (t[Ku] = {}), s = st(ot(t, o), o);
            if (s) return s(Ju, i, r), n.zrX = Ju[0], void (n.zrY = Ju[1]);
        }
        n.zrX = n.zrY = 0;
    }
    function ot(t, e) {
        var n = e.markers;
        if (n) return n;
        n = e.markers = [];
        for (var i = [ "left", "right" ], r = [ "top", "bottom" ], a = 0; 4 > a; a++) {
            var o = document.createElement("div"), s = a % 2, l = (a >> 1) % 2;
            o.style.cssText = [ "position:absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "width:0", "height:0", i[s] + ":0", r[l] + ":0", i[1 - s] + ":auto", r[1 - l] + ":auto", "" ].join("!important;"), 
            t.appendChild(o), n.push(o);
        }
        return n;
    }
    function st(t, e) {
        for (var n = e.transformer, i = e.srcCoords, r = !0, a = [], o = [], s = 0; 4 > s; s++) {
            var l = t[s].getBoundingClientRect(), u = 2 * s, h = l.left, c = l.top;
            a.push(h, c), r &= i && h === i[u] && c === i[u + 1], o.push(t[s].offsetLeft, t[s].offsetTop);
        }
        return r ? n : (e.srcCoords = a, e.transformer = it(a, o));
    }
    function lt(t, e, n) {
        if (null != (e = e || window.event).zrX) return e;
        var i = e.type;
        if (i && i.indexOf("touch") >= 0) {
            var r = "touchend" !== i ? e.targetTouches[0] : e.changedTouches[0];
            r && rt(t, r, e, n);
        } else rt(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
        var a = e.button;
        return null == e.which && void 0 !== a && Qu.test(e.type) && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), 
        e;
    }
    function ut(t, e, n) {
        $u ? t.addEventListener(e, n) : t.attachEvent("on" + e, n);
    }
    function ht(t, e, n) {
        $u ? t.removeEventListener(e, n) : t.detachEvent("on" + e, n);
    }
    function ct(t) {
        var e = t[1][0] - t[0][0], n = t[1][1] - t[0][1];
        return Math.sqrt(e * e + n * n);
    }
    function ft(t) {
        return [ (t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2 ];
    }
    function dt(t, e, n) {
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
        th(this.event);
    }
    function gt() {}
    function vt(t, e, n) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
            for (var i, r = t; r; ) {
                if (r.clipPath && !r.clipPath.contain(e, n)) return !1;
                r.silent && (i = !0), r = r.parent;
            }
            return !i || ih;
        }
        return !1;
    }
    function mt() {
        var t = new oh(6);
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
        var i = e[0], r = e[2], a = e[4], o = e[1], s = e[3], l = e[5], u = Math.sin(n), h = Math.cos(n);
        return t[0] = i * h + o * u, t[1] = -i * u + o * h, t[2] = r * h + s * u, t[3] = -r * u + h * s, 
        t[4] = h * a + u * l, t[5] = h * l - u * a, t;
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
        return t > uh || -uh > t;
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
    function kt(t) {
        return 0 > (t = Math.round(t)) ? 0 : t > 360 ? 360 : t;
    }
    function Dt(t) {
        return 0 > t ? 0 : t > 1 ? 1 : t;
    }
    function At(t) {
        return It(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));
    }
    function Lt(t) {
        return Dt(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t));
    }
    function Pt(t, e, n) {
        return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t;
    }
    function Ot(t, e, n) {
        return t + (e - t) * n;
    }
    function Et(t, e, n, i, r) {
        return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t;
    }
    function Bt(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
    }
    function Rt(t, e) {
        Mh && Bt(Mh, e), Mh = bh.put(t, Mh || e.slice());
    }
    function zt(t, e) {
        if (t) {
            e = e || [];
            var n = bh.get(t);
            if (n) return Bt(e, n);
            var i = (t += "").replace(/ /g, "").toLowerCase();
            if (i in wh) return Bt(e, wh[i]), Rt(t, e), e;
            if ("#" !== i.charAt(0)) {
                var r = i.indexOf("("), a = i.indexOf(")");
                if (-1 !== r && a + 1 === i.length) {
                    var o = i.substr(0, r), s = i.substr(r + 1, a - (r + 1)).split(","), l = 1;
                    switch (o) {
                      case "rgba":
                        if (4 !== s.length) return void Et(e, 0, 0, 0, 1);
                        l = Lt(s.pop());

                      case "rgb":
                        return 3 !== s.length ? void Et(e, 0, 0, 0, 1) : (Et(e, At(s[0]), At(s[1]), At(s[2]), l), 
                        Rt(t, e), e);

                      case "hsla":
                        return 4 !== s.length ? void Et(e, 0, 0, 0, 1) : (s[3] = Lt(s[3]), Nt(s, e), Rt(t, e), 
                        e);

                      case "hsl":
                        return 3 !== s.length ? void Et(e, 0, 0, 0, 1) : (Nt(s, e), Rt(t, e), e);

                      default:
                        return;
                    }
                }
                Et(e, 0, 0, 0, 1);
            } else {
                if (4 === i.length) return (u = parseInt(i.substr(1), 16)) >= 0 && 4095 >= u ? (Et(e, (3840 & u) >> 4 | (3840 & u) >> 8, 240 & u | (240 & u) >> 4, 15 & u | (15 & u) << 4, 1), 
                Rt(t, e), e) : void Et(e, 0, 0, 0, 1);
                if (7 === i.length) {
                    var u = parseInt(i.substr(1), 16);
                    return u >= 0 && 16777215 >= u ? (Et(e, (16711680 & u) >> 16, (65280 & u) >> 8, 255 & u, 1), 
                    Rt(t, e), e) : void Et(e, 0, 0, 0, 1);
                }
            }
        }
    }
    function Nt(t, e) {
        var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360, i = Lt(t[1]), r = Lt(t[2]), a = .5 >= r ? r * (i + 1) : r + i - r * i, o = 2 * r - a;
        return e = e || [], Et(e, It(255 * Pt(o, a, n + 1 / 3)), It(255 * Pt(o, a, n)), It(255 * Pt(o, a, n - 1 / 3)), 1), 
        4 === t.length && (e[3] = t[3]), e;
    }
    function Ft(t) {
        if (t) {
            var e, n, i = t[0] / 255, r = t[1] / 255, a = t[2] / 255, o = Math.min(i, r, a), s = Math.max(i, r, a), l = s - o, u = (s + o) / 2;
            if (0 === l) e = 0, n = 0; else {
                n = .5 > u ? l / (s + o) : l / (2 - s - o);
                var h = ((s - i) / 6 + l / 2) / l, c = ((s - r) / 6 + l / 2) / l, f = ((s - a) / 6 + l / 2) / l;
                i === s ? e = f - c : r === s ? e = 1 / 3 + h - f : a === s && (e = 2 / 3 + c - h), 
                0 > e && (e += 1), e > 1 && (e -= 1);
            }
            var d = [ 360 * e, n, u ];
            return null != t[3] && d.push(t[3]), d;
        }
    }
    function Vt(t, e) {
        var n = zt(t);
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
            n[3] = Dt(Ot(o[3], s[3], l)), n;
        }
    }
    function Ht(t, e, n) {
        if (e && e.length && t >= 0 && 1 >= t) {
            var i = t * (e.length - 1), r = Math.floor(i), a = Math.ceil(i), o = zt(e[r]), s = zt(e[a]), l = i - r, u = Gt([ It(Ot(o[0], s[0], l)), It(Ot(o[1], s[1], l)), It(Ot(o[2], s[2], l)), Dt(Ot(o[3], s[3], l)) ], "rgba");
            return n ? {
                color: u,
                leftIndex: r,
                rightIndex: a,
                value: i
            } : u;
        }
    }
    function Gt(t, e) {
        if (t && t.length) {
            var n = t[0] + "," + t[1] + "," + t[2];
            return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")";
        }
    }
    function qt(t, e) {
        return t[e];
    }
    function Xt(t, e, n) {
        t[e] = n;
    }
    function Ut(t, e, n) {
        return (e - t) * n + t;
    }
    function jt(t, e, n) {
        return n > .5 ? e : t;
    }
    function Yt(t, e, n, i, r) {
        var a = t.length;
        if (1 === r) for (s = 0; a > s; s++) i[s] = Ut(t[s], e[s], n); else for (var o = a && t[0].length, s = 0; a > s; s++) for (var l = 0; o > l; l++) i[s][l] = Ut(t[s][l], e[s][l], n);
    }
    function Zt(t, e, n) {
        var i = t.length, r = e.length;
        if (i !== r) if (i > r) t.length = r; else for (o = i; r > o; o++) t.push(1 === n ? e[o] : Ih.call(e[o]));
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
    function Qt(t, e, n, i, r, a, o, s, l) {
        var u = t.length;
        if (1 === l) for (c = 0; u > c; c++) s[c] = Kt(t[c], e[c], n[c], i[c], r, a, o); else for (var h = t[0].length, c = 0; u > c; c++) for (var f = 0; h > f; f++) s[c][f] = Kt(t[c][f], e[c][f], n[c][f], i[c][f], r, a, o);
    }
    function Kt(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }
    function Jt(t) {
        if (f(t)) {
            var e = t.length;
            if (f(t[0])) {
                for (var n = [], i = 0; e > i; i++) n.push(Ih.call(t[i]));
                return n;
            }
            return Ih.call(t);
        }
        return t;
    }
    function te(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), 
        "rgba(" + t.join(",") + ")";
    }
    function ee(t) {
        var e = t[t.length - 1].value;
        return f(e && e[0]) ? 2 : 1;
    }
    function ne(t, e, n, i, r, a) {
        var o = t._getter, s = t._setter, l = "spline" === e, u = i.length;
        if (u) {
            var h, c = f(i[0].value), d = !1, p = !1, g = c ? ee(i) : 0;
            i.sort(function(t, e) {
                return t.time - e.time;
            }), h = i[u - 1].time;
            for (var v = [], m = [], y = i[0].value, _ = !0, x = 0; u > x; x++) {
                v.push(i[x].time / h);
                var w = i[x].value;
                if (c && $t(w, y, g) || !c && w === y || (_ = !1), y = w, "string" == typeof w) {
                    var b = zt(w);
                    b ? (w = b, d = !0) : p = !0;
                }
                m.push(w);
            }
            if (a || !_) {
                for (var M = m[u - 1], x = 0; u - 1 > x; x++) c ? Zt(m[x], M, g) : !isNaN(m[x]) || isNaN(M) || p || d || (m[x] = M);
                c && Zt(o(t._target, r), M, g);
                var S, T, C, I, k, D, A = 0, L = 0;
                if (d) var P = [ 0, 0, 0, 0 ];
                var O = new Ct({
                    target: t._target,
                    life: h,
                    loop: t._loop,
                    delay: t._delay,
                    onframe: function(t, e) {
                        var n;
                        if (0 > e) n = 0; else if (L > e) {
                            for (n = S = Math.min(A + 1, u - 1); n >= 0 && !(v[n] <= e); n--) ;
                            n = Math.min(n, u - 2);
                        } else {
                            for (n = A; u > n && !(v[n] > e); n++) ;
                            n = Math.min(n - 1, u - 2);
                        }
                        A = n, L = e;
                        var i = v[n + 1] - v[n];
                        if (0 !== i) if (T = (e - v[n]) / i, l) if (I = m[n], C = m[0 === n ? n : n - 1], 
                        k = m[n > u - 2 ? u - 1 : n + 1], D = m[n > u - 3 ? u - 1 : n + 2], c) Qt(C, I, k, D, T, T * T, T * T * T, o(t, r), g); else {
                            if (d) a = Qt(C, I, k, D, T, T * T, T * T * T, P, 1), a = te(P); else {
                                if (p) return jt(I, k, T);
                                a = Kt(C, I, k, D, T, T * T, T * T * T);
                            }
                            s(t, r, a);
                        } else if (c) Yt(m[n], m[n + 1], T, o(t, r), g); else {
                            var a;
                            if (d) Yt(m[n], m[n + 1], T, P, 1), a = te(P); else {
                                if (p) return jt(m[n], m[n + 1], T);
                                a = Ut(m[n], m[n + 1], T);
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
        var l = t.animators.slice(), u = l.length;
        u || a && a();
        for (var h = 0; h < l.length; h++) l[h].done(function() {
            --u || a && a();
        }).start(r, o);
    }
    function re(t, e, n, i, r, a, o) {
        var s = {}, l = 0;
        for (var u in i) i.hasOwnProperty(u) && (null != n[u] ? b(i[u]) && !f(i[u]) ? re(t, e ? e + "." + u : u, n[u], i[u], r, a, o) : (o ? (s[u] = n[u], 
        ae(t, e, u, i[u])) : s[u] = i[u], l++) : null == i[u] || o || ae(t, e, u, i[u]));
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
        for (var e = 0; t >= Fh; ) e |= 1 & t, t >>= 1;
        return t + e;
    }
    function le(t, e, n, i) {
        var r = e + 1;
        if (r === n) return 1;
        if (i(t[r++], t[e]) < 0) {
            for (;n > r && i(t[r], t[r - 1]) < 0; ) r++;
            ue(t, e, r);
        } else for (;n > r && i(t[r], t[r - 1]) >= 0; ) r++;
        return r - e;
    }
    function ue(t, e, n) {
        for (n--; n > e; ) {
            var i = t[e];
            t[e++] = t[n], t[n--] = i;
        }
    }
    function he(t, e, n, i, r) {
        for (i === e && i++; n > i; i++) {
            for (var a, o = t[i], s = e, l = i; l > s; ) r(o, t[a = s + l >>> 1]) < 0 ? l = a : s = a + 1;
            var u = i - s;
            switch (u) {
              case 3:
                t[s + 3] = t[s + 2];

              case 2:
                t[s + 2] = t[s + 1];

              case 1:
                t[s + 1] = t[s];
                break;

              default:
                for (;u > 0; ) t[s + u] = t[s + u - 1], u--;
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
            var u = o;
            o = r - l, l = r - u;
        }
        for (o++; l > o; ) {
            var h = o + (l - o >>> 1);
            a(t, e[n + h]) > 0 ? o = h + 1 : l = h;
        }
        return l;
    }
    function fe(t, e, n, i, r, a) {
        var o = 0, s = 0, l = 1;
        if (a(t, e[n + r]) < 0) {
            for (s = r + 1; s > l && a(t, e[n + r - l]) < 0; ) o = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s);
            var u = o;
            o = r - l, l = r - u;
        } else {
            for (s = i - r; s > l && a(t, e[n + r + l]) >= 0; ) o = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s), o += r, l += r;
        }
        for (o++; l > o; ) {
            var h = o + (l - o >>> 1);
            a(t, e[n + h]) < 0 ? l = h : o = h + 1;
        }
        return l;
    }
    function de(t, e) {
        function n(n) {
            var s = a[n], u = o[n], h = a[n + 1], c = o[n + 1];
            o[n] = u + c, n === l - 3 && (a[n + 1] = a[n + 2], o[n + 1] = o[n + 2]), l--;
            var f = fe(t[h], t, s, u, 0, e);
            s += f, 0 != (u -= f) && 0 !== (c = ce(t[s + u - 1], t, h, c, c - 1, e)) && (c >= u ? i(s, u, h, c) : r(s, u, h, c));
        }
        function i(n, i, r, a) {
            var o = 0;
            for (o = 0; i > o; o++) u[o] = t[n + o];
            var l = 0, h = r, c = n;
            if (t[c++] = t[h++], 0 != --a) {
                if (1 === i) {
                    for (o = 0; a > o; o++) t[c + o] = t[h + o];
                    return void (t[c + a] = u[l]);
                }
                for (var f, d, p, g = s; ;) {
                    f = 0, d = 0, p = !1;
                    do {
                        if (e(t[h], u[l]) < 0) {
                            if (t[c++] = t[h++], d++, f = 0, 0 == --a) {
                                p = !0;
                                break;
                            }
                        } else if (t[c++] = u[l++], f++, d = 0, 1 == --i) {
                            p = !0;
                            break;
                        }
                    } while (g > (f | d));
                    if (p) break;
                    do {
                        if (0 !== (f = fe(t[h], u, l, i, 0, e))) {
                            for (o = 0; f > o; o++) t[c + o] = u[l + o];
                            if (c += f, l += f, 1 >= (i -= f)) {
                                p = !0;
                                break;
                            }
                        }
                        if (t[c++] = t[h++], 0 == --a) {
                            p = !0;
                            break;
                        }
                        if (0 !== (d = ce(u[l], t, h, a, 0, e))) {
                            for (o = 0; d > o; o++) t[c + o] = t[h + o];
                            if (c += d, h += d, 0 === (a -= d)) {
                                p = !0;
                                break;
                            }
                        }
                        if (t[c++] = u[l++], 1 == --i) {
                            p = !0;
                            break;
                        }
                        g--;
                    } while (f >= Vh || d >= Vh);
                    if (p) break;
                    0 > g && (g = 0), g += 2;
                }
                if (1 > (s = g) && (s = 1), 1 === i) {
                    for (o = 0; a > o; o++) t[c + o] = t[h + o];
                    t[c + a] = u[l];
                } else {
                    if (0 === i) throw new Error();
                    for (o = 0; i > o; o++) t[c + o] = u[l + o];
                }
            } else for (o = 0; i > o; o++) t[c + o] = u[l + o];
        }
        function r(n, i, r, a) {
            var o = 0;
            for (o = 0; a > o; o++) u[o] = t[r + o];
            var l = n + i - 1, h = a - 1, c = r + a - 1, f = 0, d = 0;
            if (t[c--] = t[l--], 0 != --i) {
                if (1 === a) {
                    for (d = (c -= i) + 1, f = (l -= i) + 1, o = i - 1; o >= 0; o--) t[d + o] = t[f + o];
                    return void (t[c] = u[h]);
                }
                for (var p = s; ;) {
                    var g = 0, v = 0, m = !1;
                    do {
                        if (e(u[h], t[l]) < 0) {
                            if (t[c--] = t[l--], g++, v = 0, 0 == --i) {
                                m = !0;
                                break;
                            }
                        } else if (t[c--] = u[h--], v++, g = 0, 1 == --a) {
                            m = !0;
                            break;
                        }
                    } while (p > (g | v));
                    if (m) break;
                    do {
                        if (0 != (g = i - fe(u[h], t, n, i, i - 1, e))) {
                            for (i -= g, d = (c -= g) + 1, f = (l -= g) + 1, o = g - 1; o >= 0; o--) t[d + o] = t[f + o];
                            if (0 === i) {
                                m = !0;
                                break;
                            }
                        }
                        if (t[c--] = u[h--], 1 == --a) {
                            m = !0;
                            break;
                        }
                        if (0 != (v = a - ce(t[l], u, 0, a, a - 1, e))) {
                            for (a -= v, d = (c -= v) + 1, f = (h -= v) + 1, o = 0; v > o; o++) t[d + o] = u[f + o];
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
                    } while (g >= Vh || v >= Vh);
                    if (m) break;
                    0 > p && (p = 0), p += 2;
                }
                if (1 > (s = p) && (s = 1), 1 === a) {
                    for (d = (c -= i) + 1, f = (l -= i) + 1, o = i - 1; o >= 0; o--) t[d + o] = t[f + o];
                    t[c] = u[h];
                } else {
                    if (0 === a) throw new Error();
                    for (f = c - (a - 1), o = 0; a > o; o++) t[f + o] = u[o];
                }
            } else for (f = c - (a - 1), o = 0; a > o; o++) t[f + o] = u[o];
        }
        var a, o, s = Vh, l = 0, u = [];
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
            if (Fh > r) return a = le(t, n, i, e), void he(t, n, i, n + a, e);
            var o = new de(t, e), s = se(r);
            do {
                if (a = le(t, n, i, e), s > a) {
                    var l = r;
                    l > s && (l = s), he(t, n, n + l, n + a, e), a = l;
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
        var i = zu(), r = e.getWidth(), a = e.getHeight(), o = i.style;
        return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", 
        o.height = a + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = a * n, 
        i;
    }
    function xe(t) {
        if ("string" == typeof t) {
            var e = tc.get(t);
            return e && e.image;
        }
        return t;
    }
    function we(t, e, n, i, r) {
        if (t) {
            if ("string" == typeof t) {
                if (e && e.__zrImageSrc === t || !n) return e;
                var a = tc.get(t), o = {
                    hostEl: n,
                    cb: i,
                    cbPayload: r
                };
                return a ? (e = a.image, !Me(e) && a.pending.push(o)) : (e = new Image(), e.onload = e.onerror = be, 
                tc.put(t, e.__cachedImgObj = {
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
        var n = t + ":" + (e = e || ac);
        if (ec[n]) return ec[n];
        for (var i = (t + "").split("\n"), r = 0, a = 0, o = i.length; o > a; a++) r = Math.max(Re(i[a], e).width, r);
        return nc > ic && (nc = 0, ec = {}), nc++, ec[n] = r, r;
    }
    function Te(t, e, n, i, r, a, o, s) {
        return o ? Ie(t, e, n, i, r, a, o, s) : Ce(t, e, n, i, r, a, s);
    }
    function Ce(t, e, n, i, r, a, o) {
        var s = ze(t, e, r, a, o), l = Se(t, e);
        r && (l += r[1] + r[3]);
        var u = s.outerHeight, h = new oe(ke(0, l, n), De(0, u, i), l, u);
        return h.lineHeight = s.lineHeight, h;
    }
    function Ie(t, e, n, i, r, a, o, s) {
        var l = Ne(t, {
            rich: o,
            truncate: s,
            font: e,
            textAlign: n,
            textPadding: r,
            textLineHeight: a
        }), u = l.outerWidth, h = l.outerHeight;
        return new oe(ke(0, u, n), De(0, h, i), u, h);
    }
    function ke(t, e, n) {
        return "right" === n ? t -= e : "center" === n && (t -= e / 2), t;
    }
    function De(t, e, n) {
        return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t;
    }
    function Ae(t, e, n) {
        var i = e.textPosition, r = e.textDistance, a = n.x, o = n.y;
        r = r || 0;
        var s = n.height, l = n.width, u = s / 2, h = "left", c = "top";
        switch (i) {
          case "left":
            a -= r, o += u, h = "right", c = "middle";
            break;

          case "right":
            a += r + l, o += u, c = "middle";
            break;

          case "top":
            a += l / 2, o -= r, h = "center", c = "bottom";
            break;

          case "bottom":
            a += l / 2, o += s + r, h = "center";
            break;

          case "inside":
            a += l / 2, o += u, h = "center", c = "middle";
            break;

          case "insideLeft":
            a += r, o += u, c = "middle";
            break;

          case "insideRight":
            a += l - r, o += u, h = "right", c = "middle";
            break;

          case "insideTop":
            a += l / 2, o += r, h = "center";
            break;

          case "insideBottom":
            a += l / 2, o += s - r, h = "center", c = "bottom";
            break;

          case "insideTopLeft":
            a += r, o += r;
            break;

          case "insideTopRight":
            a += l - r, o += r, h = "right";
            break;

          case "insideBottomLeft":
            a += r, o += s - r, c = "bottom";
            break;

          case "insideBottomRight":
            a += l - r, o += s - r, h = "right", c = "bottom";
        }
        return t = t || {}, t.x = a, t.y = o, t.textAlign = h, t.textVerticalAlign = c, 
        t;
    }
    function Le(t, e, n, i, r) {
        if (!e) return "";
        var a = (t + "").split("\n");
        r = Pe(e, n, i, r);
        for (var o = 0, s = a.length; s > o; o++) a[o] = Oe(a[o], r);
        return a.join("\n");
    }
    function Pe(t, e, n, i) {
        (i = o({}, i)).font = e;
        var n = k(n, "...");
        i.maxIterations = k(i.maxIterations, 2);
        var r = i.minChar = k(i.minChar, 0);
        i.cnCharWidth = Se("国", e);
        var a = i.ascCharWidth = Se("a", e);
        i.placeholder = k(i.placeholder, "");
        for (var s = t = Math.max(0, t - 1), l = 0; r > l && s >= a; l++) s -= a;
        var u = Se(n, e);
        return u > s && (n = "", u = 0), s = t - u, i.ellipsis = n, i.ellipsisWidth = u, 
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
    function Be(t) {
        return Se("国", t);
    }
    function Re(t, e) {
        return oc.measureText(t, e);
    }
    function ze(t, e, n, i, r) {
        null != t && (t += "");
        var a = k(i, Be(e)), o = t ? t.split("\n") : [], s = o.length * a, l = s, u = !0;
        if (n && (l += n[0] + n[2]), t && r) {
            u = !1;
            var h = r.outerHeight, c = r.outerWidth;
            if (null != h && l > h) t = "", o = []; else if (null != c) for (var f = Pe(c - (n ? n[1] + n[3] : 0), e, r.ellipsis, {
                minChar: r.minChar,
                placeholder: r.placeholder
            }), d = 0, p = o.length; p > d; d++) o[d] = Oe(o[d], f);
        }
        return {
            lines: o,
            height: s,
            outerHeight: l,
            lineHeight: a,
            canCacheByTextString: u
        };
    }
    function Ne(t, e) {
        var n = {
            lines: [],
            width: 0,
            height: 0
        };
        if (null != t && (t += ""), !t) return n;
        for (var i, r = rc.lastIndex = 0; null != (i = rc.exec(t)); ) {
            var a = i.index;
            a > r && Fe(n, t.substring(r, a)), Fe(n, i[2], i[1]), r = rc.lastIndex;
        }
        r < t.length && Fe(n, t.substring(r, t.length));
        var o = n.lines, s = 0, l = 0, u = [], h = e.textPadding, c = e.truncate, f = c && c.outerWidth, d = c && c.outerHeight;
        h && (null != f && (f -= h[1] + h[3]), null != d && (d -= h[0] + h[2]));
        for (A = 0; A < o.length; A++) {
            for (var p = o[A], g = 0, v = 0, m = 0; m < p.tokens.length; m++) {
                var y = (L = p.tokens[m]).styleName && e.rich[L.styleName] || {}, _ = L.textPadding = y.textPadding, x = L.font = y.font || e.font, w = L.textHeight = k(y.textHeight, Be(x));
                if (_ && (w += _[0] + _[2]), L.height = w, L.lineHeight = D(y.textLineHeight, e.textLineHeight, w), 
                L.textAlign = y && y.textAlign || e.textAlign, L.textVerticalAlign = y && y.textVerticalAlign || "middle", 
                null != d && s + L.lineHeight > d) return {
                    lines: [],
                    width: 0,
                    height: 0
                };
                L.textWidth = Se(L.text, x);
                var b = y.textWidth, M = null == b || "auto" === b;
                if ("string" == typeof b && "%" === b.charAt(b.length - 1)) L.percentWidth = b, 
                u.push(L), b = 0; else {
                    if (M) {
                        b = L.textWidth;
                        var S = y.textBackgroundColor, T = S && S.image;
                        T && (T = xe(T), Me(T) && (b = Math.max(b, T.width * w / T.height)));
                    }
                    var C = _ ? _[1] + _[3] : 0;
                    b += C;
                    var I = null != f ? f - v : null;
                    null != I && b > I && (!M || C > I ? (L.text = "", L.textWidth = b = 0) : (L.text = Le(L.text, I - C, x, c.ellipsis, {
                        minChar: c.minChar
                    }), L.textWidth = Se(L.text, x), b = L.textWidth + C));
                }
                v += L.width = b, y && (g = Math.max(g, L.lineHeight));
            }
            p.width = v, p.lineHeight = g, s += g, l = Math.max(l, v);
        }
        n.outerWidth = n.width = k(e.textWidth, l), n.outerHeight = n.height = k(e.textHeight, s), 
        h && (n.outerWidth += h[1] + h[3], n.outerHeight += h[0] + h[2]);
        for (var A = 0; A < u.length; A++) {
            var L = u[A], P = L.percentWidth;
            L.width = parseInt(P, 10) / 100 * l;
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
                var u = (a[a.length - 1] || (a[0] = {
                    tokens: []
                })).tokens, h = u.length;
                1 === h && u[0].isLineHolder ? u[0] = l : (s || !h || i) && u.push(l);
            }
        }
    }
    function Ve(t) {
        var e = (t.fontSize || t.fontFamily) && [ t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif" ].join(" ");
        return e && O(e) || t.textFont || t.font;
    }
    function We(t, e) {
        var n, i, r, a, o = e.x, s = e.y, l = e.width, u = e.height, h = e.r;
        0 > l && (o += l, l = -l), 0 > u && (s += u, u = -u), "number" == typeof h ? n = i = r = a = h : h instanceof Array ? 1 === h.length ? n = i = r = a = h[0] : 2 === h.length ? (n = r = h[0], 
        i = a = h[1]) : 3 === h.length ? (n = h[0], i = a = h[1], r = h[2]) : (n = h[0], 
        i = h[1], r = h[2], a = h[3]) : n = i = r = a = 0;
        var c;
        n + i > l && (c = n + i, n *= l / c, i *= l / c), r + a > l && (c = r + a, r *= l / c, 
        a *= l / c), i + r > u && (c = i + r, i *= u / c, r *= u / c), n + a > u && (c = n + a, 
        n *= u / c, a *= u / c), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.arc(o + l - i, s + i, i, -Math.PI / 2, 0), 
        t.lineTo(o + l, s + u - r), 0 !== r && t.arc(o + l - r, s + u - r, r, 0, Math.PI / 2), 
        t.lineTo(o + a, s + u), 0 !== a && t.arc(o + a, s + u - a, a, Math.PI / 2, Math.PI), 
        t.lineTo(o, s + n), 0 !== n && t.arc(o + n, s + n, n, Math.PI, 1.5 * Math.PI);
    }
    function He(t) {
        return Ge(t), d(t.rich, Ge), t;
    }
    function Ge(t) {
        if (t) {
            t.font = Ve(t);
            var e = t.textAlign;
            "middle" === e && (e = "center"), t.textAlign = null == e || lc[e] ? e : "left";
            var n = t.textVerticalAlign || t.textBaseline;
            "center" === n && (n = "middle"), t.textVerticalAlign = null == n || uc[n] ? n : "top", 
            t.textPadding && (t.textPadding = L(t.textPadding));
        }
    }
    function qe(t, e, n, i, r, a) {
        i.rich ? Ue(t, e, n, i, r, a) : Xe(t, e, n, i, r, a);
    }
    function Xe(t, e, n, i, r, a) {
        var o, s = $e(i), l = !1, u = e.__attrCachedBy === qh.PLAIN_TEXT;
        a !== Xh ? (a && (o = a.style, l = !s && u && o), e.__attrCachedBy = s ? qh.NONE : qh.PLAIN_TEXT) : u && (e.__attrCachedBy = qh.NONE);
        var h = i.font || sc;
        l && h === (o.font || sc) || (e.font = h);
        var c = t.__computedFont;
        t.__styleFont !== h && (t.__styleFont = h, c = t.__computedFont = e.font);
        var f = i.textPadding, d = i.textLineHeight, p = t.__textCotentBlock;
        (!p || t.__dirtyText) && (p = t.__textCotentBlock = ze(n, c, f, d, i.truncate));
        var g = p.outerHeight, v = p.lines, m = p.lineHeight, y = Je(fc, t, i, r), _ = y.baseX, x = y.baseY, w = y.textAlign || "left", b = y.textVerticalAlign;
        Ye(e, i, r, _, x);
        var M = De(x, g, b), S = _, T = M;
        if (s || f) {
            var C = Se(n, c);
            f && (C += f[1] + f[3]);
            var I = ke(_, C, w);
            s && Qe(t, e, i, I, M, C, g), f && (S = an(_, w, f), T += f[0]);
        }
        e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = i.opacity || 1;
        for (N = 0; N < hc.length; N++) {
            var k = hc[N], D = k[0], A = k[1], L = i[D];
            l && L === o[D] || (e[A] = Gh(e, A, L || k[2]));
        }
        T += m / 2;
        var P = i.textStrokeWidth, O = l ? o.textStrokeWidth : null, E = !l || P !== O, B = !l || E || i.textStroke !== o.textStroke, R = en(i.textStroke, P), z = nn(i.textFill);
        if (R && (E && (e.lineWidth = P), B && (e.strokeStyle = R)), z && (l && i.textFill === o.textFill || (e.fillStyle = z)), 
        1 === v.length) R && e.strokeText(v[0], S, T), z && e.fillText(v[0], S, T); else for (var N = 0; N < v.length; N++) R && e.strokeText(v[N], S, T), 
        z && e.fillText(v[N], S, T), T += m;
    }
    function Ue(t, e, n, i, r, a) {
        a !== Xh && (e.__attrCachedBy = qh.NONE);
        var o = t.__textCotentBlock;
        (!o || t.__dirtyText) && (o = t.__textCotentBlock = Ne(n, i)), je(t, e, o, i, r);
    }
    function je(t, e, n, i, r) {
        var a = n.width, o = n.outerWidth, s = n.outerHeight, l = i.textPadding, u = Je(fc, t, i, r), h = u.baseX, c = u.baseY, f = u.textAlign, d = u.textVerticalAlign;
        Ye(e, i, r, h, c);
        var p = ke(h, o, f), g = De(c, s, d), v = p, m = g;
        l && (v += l[3], m += l[0]);
        var y = v + a;
        $e(i) && Qe(t, e, i, p, g, o, s);
        for (var _ = 0; _ < n.lines.length; _++) {
            for (var x, w = n.lines[_], b = w.tokens, M = b.length, S = w.lineHeight, T = w.width, C = 0, I = v, k = y, D = M - 1; M > C && (!(x = b[C]).textAlign || "left" === x.textAlign); ) Ze(t, e, x, i, S, m, I, "left"), 
            T -= x.width, I += x.width, C++;
            for (;D >= 0 && "right" === (x = b[D]).textAlign; ) Ze(t, e, x, i, S, m, k, "right"), 
            T -= x.width, k -= x.width, D--;
            for (I += (a - (I - v) - (y - k) - T) / 2; D >= C; ) Ze(t, e, x = b[C], i, S, m, I + x.width / 2, "center"), 
            I += x.width, C++;
            m += S;
        }
    }
    function Ye(t, e, n, i, r) {
        if (n && e.textRotation) {
            var a = e.textOrigin;
            "center" === a ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : a && (i = a[0] + n.x, 
            r = a[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r);
        }
    }
    function Ze(t, e, n, i, r, a, o, s) {
        var l = i.rich[n.styleName] || {};
        l.text = n.text;
        var u = n.textVerticalAlign, h = a + r / 2;
        "top" === u ? h = a + n.height / 2 : "bottom" === u && (h = a + r - n.height / 2), 
        !n.isLineHolder && $e(l) && Qe(t, e, l, "right" === s ? o - n.width : "center" === s ? o - n.width / 2 : o, h - n.height / 2, n.width, n.height);
        var c = n.textPadding;
        c && (o = an(o, s, c), h -= n.height / 2 - c[2] - n.textHeight / 2), tn(e, "shadowBlur", D(l.textShadowBlur, i.textShadowBlur, 0)), 
        tn(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), tn(e, "shadowOffsetX", D(l.textShadowOffsetX, i.textShadowOffsetX, 0)), 
        tn(e, "shadowOffsetY", D(l.textShadowOffsetY, i.textShadowOffsetY, 0)), tn(e, "textAlign", s), 
        tn(e, "textBaseline", "middle"), tn(e, "font", n.font || sc);
        var f = en(l.textStroke || i.textStroke, p), d = nn(l.textFill || i.textFill), p = k(l.textStrokeWidth, i.textStrokeWidth);
        f && (tn(e, "lineWidth", p), tn(e, "strokeStyle", f), e.strokeText(n.text, o, h)), 
        d && (tn(e, "fillStyle", d), e.fillText(n.text, o, h));
    }
    function $e(t) {
        return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor);
    }
    function Qe(t, e, n, i, r, a, o) {
        var s = n.textBackgroundColor, l = n.textBorderWidth, u = n.textBorderColor, h = w(s);
        if (tn(e, "shadowBlur", n.textBoxShadowBlur || 0), tn(e, "shadowColor", n.textBoxShadowColor || "transparent"), 
        tn(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), tn(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), 
        h || l && u) {
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
        if (h) if (tn(e, "fillStyle", s), null != n.fillOpacity) {
            d = e.globalAlpha;
            e.globalAlpha = n.fillOpacity * n.opacity, e.fill(), e.globalAlpha = d;
        } else e.fill(); else if (b(s)) {
            var f = s.image;
            (f = we(f, null, t, Ke, s)) && Me(f) && e.drawImage(f, i, r, a, o);
        }
        if (l && u) if (tn(e, "lineWidth", l), tn(e, "strokeStyle", u), null != n.strokeOpacity) {
            var d = e.globalAlpha;
            e.globalAlpha = n.strokeOpacity * n.opacity, e.stroke(), e.globalAlpha = d;
        } else e.stroke();
    }
    function Ke(t, e) {
        e.image = t;
    }
    function Je(t, e, n, i) {
        var r = n.x || 0, a = n.y || 0, o = n.textAlign, s = n.textVerticalAlign;
        if (i) {
            var l = n.textPosition;
            if (l instanceof Array) r = i.x + rn(l[0], i.width), a = i.y + rn(l[1], i.height); else {
                var u = e && e.calculateTextPosition ? e.calculateTextPosition(cc, n, i) : Ae(cc, n, i);
                r = u.x, a = u.y, o = o || u.textAlign, s = s || u.textVerticalAlign;
            }
            var h = n.textOffset;
            h && (r += h[0], a += h[1]);
        }
        return t = t || {}, t.baseX = r, t.baseY = a, t.textAlign = o, t.textVerticalAlign = s, 
        t;
    }
    function tn(t, e, n) {
        return t[e] = Gh(t, e, n), t[e];
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
        t = t || {}, Eh.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
        this.style = new jh(t.style, this), this._rect = null, this.__clipPaths = null;
    }
    function ln(t) {
        sn.call(this, t);
    }
    function un(t) {
        return parseInt(t, 10);
    }
    function hn(t) {
        return !!t && (!!t.__builtin__ || "function" == typeof t.resize && "function" == typeof t.refresh);
    }
    function cn(t, e, n) {
        return vc.copy(t.getBoundingRect()), t.transform && vc.applyTransform(t.transform), 
        mc.width = e, mc.height = n, !vc.intersect(mc);
    }
    function fn(t, e) {
        if (t === e) return !1;
        if (!t || !e || t.length !== e.length) return !0;
        for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !0;
        return !1;
    }
    function dn(t, e) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e);
        }
    }
    function pn(t, e) {
        var n = document.createElement("div");
        return n.style.cssText = [ "position:relative", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0" ].join(";") + ";", 
        n;
    }
    function gn(t) {
        return "mousewheel" === t && Cu.browser.firefox ? "DOMMouseScroll" : t;
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
        d(wc, function(e) {
            t._handlers[e] = m(Sc[e], t);
        }), d(Mc, function(e) {
            t._handlers[e] = m(Sc[e], t);
        }), d(xc, function(n) {
            t._handlers[n] = e(Sc[n], t);
        });
    }
    function _n(t) {
        function e(e, n) {
            d(e, function(e) {
                ut(t, gn(e), n._handlers[e]);
            }, n);
        }
        Yu.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._handlers = {}, 
        yn(this), Cu.pointerEventsSupported ? e(Mc, this) : (Cu.touchEventsSupported && e(wc, this), 
        e(xc, this));
    }
    function xn(t, e) {
        var n = new Dc(Su(), t, e);
        return kc[n.id] = n, n;
    }
    function wn(t) {
        delete kc[t];
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
        return !Pc(t) || Oc(t) || t instanceof Date ? t : t.value;
    }
    function Tn(t) {
        return Pc(t) && !(t instanceof Array);
    }
    function Cn(t, e) {
        e = (e || []).slice();
        var n = p(t || [], function(t) {
            return {
                exist: t
            };
        });
        return Lc(e, function(t, i) {
            if (Pc(t)) {
                for (r = 0; r < n.length; r++) if (!n[r].option && null != t.id && n[r].exist.id === t.id + "") return n[r].option = t, 
                void (e[i] = null);
                for (var r = 0; r < n.length; r++) {
                    var a = n[r].exist;
                    if (!(n[r].option || null != a.id && null != t.id || null == t.name || Dn(t) || Dn(a) || a.name !== t.name + "")) return n[r].option = t, 
                    void (e[i] = null);
                }
            }
        }), Lc(e, function(t) {
            if (Pc(t)) {
                for (var e = 0; e < n.length; e++) {
                    var i = n[e].exist;
                    if (!n[e].option && !Dn(i) && null == t.id) {
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
        var e = z();
        Lc(t, function(t) {
            var n = t.exist;
            n && e.set(n.id, t);
        }), Lc(t, function(t) {
            var n = t.option;
            P(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), 
            n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {});
        }), Lc(t, function(t, n) {
            var i = t.exist, r = t.option, a = t.keyInfo;
            if (Pc(r)) {
                if (a.name = null != r.name ? r.name + "" : i ? i.name : Ec + n, i) a.id = i.id; else if (null != r.id) a.id = r.id + ""; else {
                    var o = 0;
                    do {
                        a.id = "\0" + a.name + "\0" + o++;
                    } while (e.get(a.id));
                }
                e.set(a.id, t);
            }
        });
    }
    function kn(t) {
        var e = t.name;
        return !(!e || !e.indexOf(Ec));
    }
    function Dn(t) {
        return Pc(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0");
    }
    function An(t, e) {
        return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? _(e.dataIndex) ? p(e.dataIndex, function(e) {
            return t.indexOfRawIndex(e);
        }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? _(e.name) ? p(e.name, function(e) {
            return t.indexOfName(e);
        }) : t.indexOfName(e.name) : void 0;
    }
    function Ln() {
        var t = "__\0ec_inner_" + Rc++ + "_" + Math.random().toFixed(5);
        return function(e) {
            return e[t] || (e[t] = {});
        };
    }
    function Pn(t, e, n) {
        if (w(e)) {
            var i = {};
            i[e + "Index"] = 0, e = i;
        }
        var r = n && n.defaultMainType;
        !r || On(e, r + "Index") || On(e, r + "Id") || On(e, r + "Name") || (e[r + "Index"] = 0);
        var a = {};
        return Lc(e, function(i, r) {
            var i = e[r];
            if ("dataIndex" !== r && "dataIndexInside" !== r) {
                var o = r.match(/^(\w+)(Index|Id|Name)$/) || [], s = o[1], l = (o[2] || "").toLowerCase();
                if (!(!s || !l || null == i || "index" === l && "none" === i || n && n.includeMainTypes && u(n.includeMainTypes, s) < 0)) {
                    var h = {
                        mainType: s
                    };
                    ("index" !== l || "all" !== i) && (h[l] = i);
                    var c = t.queryComponents(h);
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
    function Bn(t, e) {
        return t.getAttribute ? t.getAttribute(e) : t[e];
    }
    function Rn(t) {
        return "auto" === t ? Cu.domSupported ? "html" : "richText" : t || "html";
    }
    function zn(t) {
        var e = {
            main: "",
            sub: ""
        };
        return t && (t = t.split(zc), e.main = t[0] || "", e.sub = t[1] || ""), e;
    }
    function Nn(t) {
        P(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');
    }
    function Fn(t) {
        t.$constructor = t, t.extend = function(t) {
            var e = this, n = function() {
                t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments);
            };
            return o(n.prototype, t), n.extend = this.extend, n.superCall = Wn, n.superApply = Hn, 
            h(n, this), n.superClass = e, n;
        };
    }
    function Vn(t) {
        var e = [ "__\0is_clz", Fc++, Math.random().toFixed(3) ].join("_");
        t.prototype[e] = !0, t.isInstance = function(t) {
            return !(!t || !t[e]);
        };
    }
    function Wn(t, e) {
        var n = A(arguments, 2);
        return this.superClass.prototype[e].apply(t, n);
    }
    function Hn(t, e, n) {
        return this.superClass.prototype[e].apply(t, n);
    }
    function Gn(t, e) {
        function n(t) {
            var e = i[t.main];
            return e && e[Nc] || (e = i[t.main] = {}, e[Nc] = !0), e;
        }
        e = e || {};
        var i = {};
        if (t.registerClass = function(t, e) {
            return e && (Nn(e), (e = zn(e)).sub ? e.sub !== Nc && (n(e)[e.sub] = t) : i[e.main] = t), 
            t;
        }, t.getClass = function(t, e, n) {
            var r = i[t];
            if (r && r[Nc] && (r = e ? r[e] : null), n && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
            return r;
        }, t.getClassesByMainType = function(t) {
            t = zn(t);
            var e = [], n = i[t.main];
            return n && n[Nc] ? d(n, function(t, n) {
                n !== Nc && e.push(t);
            }) : e.push(n), e;
        }, t.hasClass = function(t) {
            return t = zn(t), !!i[t.main];
        }, t.getAllClassMainTypes = function() {
            var t = [];
            return d(i, function(e, n) {
                t.push(n);
            }), t;
        }, t.hasSubTypes = function(t) {
            t = zn(t);
            var e = i[t.main];
            return e && e[Nc];
        }, t.parseClassType = zn, e.registerWhenExtend) {
            var r = t.extend;
            r && (t.extend = function(e) {
                var n = r.call(this, e);
                return t.registerClass(n, e.type);
            });
        }
        return t;
    }
    function qn(t) {
        return t > -jc && jc > t;
    }
    function Xn(t) {
        return t > jc || -jc > t;
    }
    function Un(t, e, n, i, r) {
        var a = 1 - r;
        return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n);
    }
    function jn(t, e, n, i, r) {
        var a = 1 - r;
        return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r);
    }
    function Yn(t, e, n, i, r, a) {
        var o = i + 3 * (e - n) - t, s = 3 * (n - 2 * e + t), l = 3 * (e - t), u = t - r, h = s * s - 3 * o * l, c = s * l - 9 * o * u, f = l * l - 3 * s * u, d = 0;
        if (qn(h) && qn(c)) qn(s) ? a[0] = 0 : (S = -l / s) >= 0 && 1 >= S && (a[d++] = S); else {
            var p = c * c - 4 * h * f;
            if (qn(p)) {
                var g = c / h, v = -g / 2;
                (S = -s / o + g) >= 0 && 1 >= S && (a[d++] = S), v >= 0 && 1 >= v && (a[d++] = v);
            } else if (p > 0) {
                var m = Uc(p), y = h * s + 1.5 * o * (-c + m), _ = h * s + 1.5 * o * (-c - m);
                (S = (-s - ((y = 0 > y ? -Xc(-y, $c) : Xc(y, $c)) + (_ = 0 > _ ? -Xc(-_, $c) : Xc(_, $c)))) / (3 * o)) >= 0 && 1 >= S && (a[d++] = S);
            } else {
                var x = (2 * h * s - 3 * o * c) / (2 * Uc(h * h * h)), w = Math.acos(x) / 3, b = Uc(h), M = Math.cos(w), S = (-s - 2 * b * M) / (3 * o), v = (-s + b * (M + Zc * Math.sin(w))) / (3 * o), T = (-s + b * (M - Zc * Math.sin(w))) / (3 * o);
                S >= 0 && 1 >= S && (a[d++] = S), v >= 0 && 1 >= v && (a[d++] = v), T >= 0 && 1 >= T && (a[d++] = T);
            }
        }
        return d;
    }
    function Zn(t, e, n, i, r) {
        var a = 6 * n - 12 * e + 6 * t, o = 9 * e + 3 * i - 3 * t - 9 * n, s = 3 * e - 3 * t, l = 0;
        if (qn(o)) Xn(a) && (c = -s / a) >= 0 && 1 >= c && (r[l++] = c); else {
            var u = a * a - 4 * o * s;
            if (qn(u)) r[0] = -a / (2 * o); else if (u > 0) {
                var h = Uc(u), c = (-a + h) / (2 * o), f = (-a - h) / (2 * o);
                c >= 0 && 1 >= c && (r[l++] = c), f >= 0 && 1 >= f && (r[l++] = f);
            }
        }
        return l;
    }
    function $n(t, e, n, i, r, a) {
        var o = (e - t) * r + t, s = (n - e) * r + e, l = (i - n) * r + n, u = (s - o) * r + o, h = (l - s) * r + s, c = (h - u) * r + u;
        a[0] = t, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = i;
    }
    function Qn(t, e, n, i, r, a, o, s, l, u, h) {
        var c, f, d, p, g, v = .005, m = 1 / 0;
        Qc[0] = l, Qc[1] = u;
        for (var y = 0; 1 > y; y += .05) Kc[0] = Un(t, n, r, o, y), Kc[1] = Un(e, i, a, s, y), 
        m > (p = Xu(Qc, Kc)) && (c = y, m = p);
        m = 1 / 0;
        for (var _ = 0; 32 > _ && !(Yc > v); _++) f = c - v, d = c + v, Kc[0] = Un(t, n, r, o, f), 
        Kc[1] = Un(e, i, a, s, f), p = Xu(Kc, Qc), f >= 0 && m > p ? (c = f, m = p) : (Jc[0] = Un(t, n, r, o, d), 
        Jc[1] = Un(e, i, a, s, d), g = Xu(Jc, Qc), 1 >= d && m > g ? (c = d, m = g) : v *= .5);
        return h && (h[0] = Un(t, n, r, o, c), h[1] = Un(e, i, a, s, c)), Uc(m);
    }
    function Kn(t, e, n, i) {
        var r = 1 - i;
        return r * (r * t + 2 * i * e) + i * i * n;
    }
    function Jn(t, e, n, i) {
        return 2 * ((1 - i) * (e - t) + i * (n - e));
    }
    function ti(t, e, n, i, r) {
        var a = t - 2 * e + n, o = 2 * (e - t), s = t - i, l = 0;
        if (qn(a)) Xn(o) && (c = -s / o) >= 0 && 1 >= c && (r[l++] = c); else {
            var u = o * o - 4 * a * s;
            if (qn(u)) (c = -o / (2 * a)) >= 0 && 1 >= c && (r[l++] = c); else if (u > 0) {
                var h = Uc(u), c = (-o + h) / (2 * a), f = (-o - h) / (2 * a);
                c >= 0 && 1 >= c && (r[l++] = c), f >= 0 && 1 >= f && (r[l++] = f);
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
        var u, h = .005, c = 1 / 0;
        Qc[0] = o, Qc[1] = s;
        for (var f = 0; 1 > f; f += .05) Kc[0] = Kn(t, n, r, f), Kc[1] = Kn(e, i, a, f), 
        c > (v = Xu(Qc, Kc)) && (u = f, c = v);
        c = 1 / 0;
        for (var d = 0; 32 > d && !(Yc > h); d++) {
            var p = u - h, g = u + h;
            Kc[0] = Kn(t, n, r, p), Kc[1] = Kn(e, i, a, p);
            var v = Xu(Kc, Qc);
            if (p >= 0 && c > v) u = p, c = v; else {
                Jc[0] = Kn(t, n, r, g), Jc[1] = Kn(e, i, a, g);
                var m = Xu(Jc, Qc);
                1 >= g && c > m ? (u = g, c = m) : h *= .5;
            }
        }
        return l && (l[0] = Kn(t, n, r, u), l[1] = Kn(e, i, a, u)), Uc(c);
    }
    function ri(t, e, n) {
        if (0 !== t.length) {
            var i, r = t[0], a = r[0], o = r[0], s = r[1], l = r[1];
            for (i = 1; i < t.length; i++) r = t[i], a = tf(a, r[0]), o = ef(o, r[0]), s = tf(s, r[1]), 
            l = ef(l, r[1]);
            e[0] = a, e[1] = s, n[0] = o, n[1] = l;
        }
    }
    function ai(t, e, n, i, r, a) {
        r[0] = tf(t, n), r[1] = tf(e, i), a[0] = ef(t, n), a[1] = ef(e, i);
    }
    function oi(t, e, n, i, r, a, o, s, l, u) {
        var h, c = Zn, f = Un, d = c(t, n, r, o, uf);
        for (l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0, h = 0; d > h; h++) {
            var p = f(t, n, r, o, uf[h]);
            l[0] = tf(p, l[0]), u[0] = ef(p, u[0]);
        }
        for (d = c(e, i, a, s, hf), h = 0; d > h; h++) {
            var g = f(e, i, a, s, hf[h]);
            l[1] = tf(g, l[1]), u[1] = ef(g, u[1]);
        }
        l[0] = tf(t, l[0]), u[0] = ef(t, u[0]), l[0] = tf(o, l[0]), u[0] = ef(o, u[0]), 
        l[1] = tf(e, l[1]), u[1] = ef(e, u[1]), l[1] = tf(s, l[1]), u[1] = ef(s, u[1]);
    }
    function si(t, e, n, i, r, a, o, s) {
        var l = ei, u = Kn, h = ef(tf(l(t, n, r), 1), 0), c = ef(tf(l(e, i, a), 1), 0), f = u(t, n, r, h), d = u(e, i, a, c);
        o[0] = tf(t, r, f), o[1] = tf(e, a, d), s[0] = ef(t, r, f), s[1] = ef(e, a, d);
    }
    function li(t, e, n, i, r, a, o, s, l) {
        var u = $, h = Q, c = Math.abs(r - a);
        if (1e-4 > c % af && c > 1e-4) return s[0] = t - n, s[1] = e - i, l[0] = t + n, 
        void (l[1] = e + i);
        if (of[0] = rf(r) * n + t, of[1] = nf(r) * i + e, sf[0] = rf(a) * n + t, sf[1] = nf(a) * i + e, 
        u(s, of, sf), h(l, of, sf), 0 > (r %= af) && (r += af), 0 > (a %= af) && (a += af), 
        r > a && !o ? a += af : a > r && o && (r += af), o) {
            var f = a;
            a = r, r = f;
        }
        for (var d = 0; a > d; d += Math.PI / 2) d > r && (lf[0] = rf(d) * n + t, lf[1] = nf(d) * i + e, 
        u(s, lf, s), h(l, lf, l));
    }
    function ui(t, e, n, i, r, a, o) {
        if (0 === r) return !1;
        var s = r, l = 0, u = t;
        if (o > e + s && o > i + s || e - s > o && i - s > o || a > t + s && a > n + s || t - s > a && n - s > a) return !1;
        if (t === n) return Math.abs(a - t) <= s / 2;
        var h = (l = (e - i) / (t - n)) * a - o + (u = (t * i - n * e) / (t - n));
        return s / 2 * s / 2 >= h * h / (l * l + 1);
    }
    function hi(t, e, n, i, r, a, o, s, l, u, h) {
        if (0 === l) return !1;
        var c = l;
        return !(h > e + c && h > i + c && h > a + c && h > s + c || e - c > h && i - c > h && a - c > h && s - c > h || u > t + c && u > n + c && u > r + c && u > o + c || t - c > u && n - c > u && r - c > u && o - c > u) && c / 2 >= Qn(t, e, n, i, r, a, o, s, u, h, null);
    }
    function ci(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var u = o;
        return !(l > e + u && l > i + u && l > a + u || e - u > l && i - u > l && a - u > l || s > t + u && s > n + u && s > r + u || t - u > s && n - u > s && r - u > s) && u / 2 >= ii(t, e, n, i, r, a, s, l, null);
    }
    function fi(t) {
        return 0 > (t %= Sf) && (t += Sf), t;
    }
    function di(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var u = o;
        s -= t, l -= e;
        var h = Math.sqrt(s * s + l * l);
        if (h - u > n || n > h + u) return !1;
        if (Math.abs(i - r) % Tf < 1e-4) return !0;
        if (a) {
            var c = i;
            i = fi(r), r = fi(c);
        } else i = fi(i), r = fi(r);
        i > r && (r += Tf);
        var f = Math.atan2(l, s);
        return 0 > f && (f += Tf), f >= i && r >= f || f + Tf >= i && r >= f + Tf;
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
        var t = Af[0];
        Af[0] = Af[1], Af[1] = t;
    }
    function mi(t, e, n, i, r, a, o, s, l, u) {
        if (u > e && u > i && u > a && u > s || e > u && i > u && a > u && s > u) return 0;
        var h = Yn(e, i, a, s, u, Df);
        if (0 === h) return 0;
        for (var c, f, d = 0, p = -1, g = 0; h > g; g++) {
            var v = Df[g], m = 0 === v || 1 === v ? .5 : 1;
            l > Un(t, n, r, o, v) || (0 > p && (p = Zn(e, i, a, s, Af), Af[1] < Af[0] && p > 1 && vi(), 
            c = Un(e, i, a, s, Af[0]), p > 1 && (f = Un(e, i, a, s, Af[1]))), d += 2 === p ? v < Af[0] ? e > c ? m : -m : v < Af[1] ? c > f ? m : -m : f > s ? m : -m : v < Af[0] ? e > c ? m : -m : c > s ? m : -m);
        }
        return d;
    }
    function yi(t, e, n, i, r, a, o, s) {
        if (s > e && s > i && s > a || e > s && i > s && a > s) return 0;
        var l = ti(e, i, a, s, Df);
        if (0 === l) return 0;
        var u = ei(e, i, a);
        if (u >= 0 && 1 >= u) {
            for (var h = 0, c = Kn(e, i, a, u), f = 0; l > f; f++) {
                d = 0 === Df[f] || 1 === Df[f] ? .5 : 1;
                o > (p = Kn(t, n, r, Df[f])) || (h += Df[f] < u ? e > c ? d : -d : c > a ? d : -d);
            }
            return h;
        }
        var d = 0 === Df[0] || 1 === Df[0] ? .5 : 1, p = Kn(t, n, r, Df[0]);
        return o > p ? 0 : e > a ? d : -d;
    }
    function _i(t, e, n, i, r, a, o, s) {
        if ((s -= e) > n || -n > s) return 0;
        u = Math.sqrt(n * n - s * s);
        Df[0] = -u, Df[1] = u;
        var l = Math.abs(i - r);
        if (1e-4 > l) return 0;
        if (1e-4 > l % If) {
            i = 0, r = If;
            p = a ? 1 : -1;
            return o >= Df[0] + t && o <= Df[1] + t ? p : 0;
        }
        if (a) {
            var u = i;
            i = fi(r), r = fi(u);
        } else i = fi(i), r = fi(r);
        i > r && (r += If);
        for (var h = 0, c = 0; 2 > c; c++) {
            var f = Df[c];
            if (f + t > o) {
                var d = Math.atan2(s, f), p = a ? 1 : -1;
                0 > d && (d = If + d), (d >= i && r >= d || d + If >= i && r >= d + If) && (d > Math.PI / 2 && d < 1.5 * Math.PI && (p = -p), 
                h += p);
            }
        }
        return h;
    }
    function xi(t, e, n, i, r) {
        for (var a = 0, o = 0, s = 0, l = 0, u = 0, h = 0; h < t.length; ) {
            var c = t[h++];
            switch (c === Cf.M && h > 1 && (n || (a += pi(o, s, l, u, i, r))), 1 === h && (o = t[h], 
            s = t[h + 1], l = o, u = s), c) {
              case Cf.M:
                o = l = t[h++], s = u = t[h++];
                break;

              case Cf.L:
                if (n) {
                    if (ui(o, s, t[h], t[h + 1], e, i, r)) return !0;
                } else a += pi(o, s, t[h], t[h + 1], i, r) || 0;
                o = t[h++], s = t[h++];
                break;

              case Cf.C:
                if (n) {
                    if (hi(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0;
                } else a += mi(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
                o = t[h++], s = t[h++];
                break;

              case Cf.Q:
                if (n) {
                    if (ci(o, s, t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0;
                } else a += yi(o, s, t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
                o = t[h++], s = t[h++];
                break;

              case Cf.A:
                var f = t[h++], d = t[h++], p = t[h++], g = t[h++], v = t[h++], m = t[h++];
                h += 1;
                var y = 1 - t[h++], _ = Math.cos(v) * p + f, x = Math.sin(v) * g + d;
                h > 1 ? a += pi(o, s, _, x, i, r) : (l = _, u = x);
                var w = (i - f) * g / p + f;
                if (n) {
                    if (di(f, d, g, v, v + m, y, e, w, r)) return !0;
                } else a += _i(f, d, g, v, v + m, y, w, r);
                o = Math.cos(v + m) * p + f, s = Math.sin(v + m) * g + d;
                break;

              case Cf.R:
                l = o = t[h++], u = s = t[h++];
                var _ = l + t[h++], x = u + t[h++];
                if (n) {
                    if (ui(l, u, _, u, e, i, r) || ui(_, u, _, x, e, i, r) || ui(_, x, l, x, e, i, r) || ui(l, x, l, u, e, i, r)) return !0;
                } else a += pi(_, u, _, x, i, r), a += pi(l, x, l, u, i, r);
                break;

              case Cf.Z:
                if (n) {
                    if (ui(o, s, l, u, e, i, r)) return !0;
                } else a += pi(o, s, l, u, i, r);
                o = l, s = u;
            }
        }
        return n || gi(s, u) || (a += pi(o, s, l, u, i, r) || 0), 0 !== a;
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
    function Si(t, e, n, i, r, a, o, s, l, u, h) {
        var c = l * (Hf / 180), f = Wf(c) * (t - n) / 2 + Vf(c) * (e - i) / 2, d = -1 * Vf(c) * (t - n) / 2 + Wf(c) * (e - i) / 2, p = f * f / (o * o) + d * d / (s * s);
        p > 1 && (o *= Ff(p), s *= Ff(p));
        var g = (r === a ? -1 : 1) * Ff((o * o * s * s - o * o * d * d - s * s * f * f) / (o * o * d * d + s * s * f * f)) || 0, v = g * o * d / s, m = g * -s * f / o, y = (t + n) / 2 + Wf(c) * v - Vf(c) * m, _ = (e + i) / 2 + Vf(c) * v + Wf(c) * m, x = Xf([ 1, 0 ], [ (f - v) / o, (d - m) / s ]), w = [ (f - v) / o, (d - m) / s ], b = [ (-1 * f - v) / o, (-1 * d - m) / s ], M = Xf(w, b);
        qf(w, b) <= -1 && (M = Hf), qf(w, b) >= 1 && (M = 0), 0 === a && M > 0 && (M -= 2 * Hf), 
        1 === a && 0 > M && (M += 2 * Hf), h.addData(u, y, _, o, s, x, M, c, a);
    }
    function Ti(t) {
        if (!t) return new Mf();
        for (var e, n = 0, i = 0, r = n, a = i, o = new Mf(), s = Mf.CMD, l = t.match(Uf), u = 0; u < l.length; u++) {
            for (var h, c = l[u], f = c.charAt(0), d = c.match(jf) || [], p = d.length, g = 0; p > g; g++) d[g] = parseFloat(d[g]);
            for (var v = 0; p > v; ) {
                var m, y, _, x, w, b, M, S = n, T = i;
                switch (f) {
                  case "l":
                    n += d[v++], i += d[v++], h = s.L, o.addData(h, n, i);
                    break;

                  case "L":
                    n = d[v++], i = d[v++], h = s.L, o.addData(h, n, i);
                    break;

                  case "m":
                    n += d[v++], i += d[v++], h = s.M, o.addData(h, n, i), r = n, a = i, f = "l";
                    break;

                  case "M":
                    n = d[v++], i = d[v++], h = s.M, o.addData(h, n, i), r = n, a = i, f = "L";
                    break;

                  case "h":
                    n += d[v++], h = s.L, o.addData(h, n, i);
                    break;

                  case "H":
                    n = d[v++], h = s.L, o.addData(h, n, i);
                    break;

                  case "v":
                    i += d[v++], h = s.L, o.addData(h, n, i);
                    break;

                  case "V":
                    i = d[v++], h = s.L, o.addData(h, n, i);
                    break;

                  case "C":
                    h = s.C, o.addData(h, d[v++], d[v++], d[v++], d[v++], d[v++], d[v++]), n = d[v - 2], 
                    i = d[v - 1];
                    break;

                  case "c":
                    h = s.C, o.addData(h, d[v++] + n, d[v++] + i, d[v++] + n, d[v++] + i, d[v++] + n, d[v++] + i), 
                    n += d[v - 2], i += d[v - 1];
                    break;

                  case "S":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.C && (m += n - I[C - 4], y += i - I[C - 3]), h = s.C, S = d[v++], T = d[v++], 
                    n = d[v++], i = d[v++], o.addData(h, m, y, S, T, n, i);
                    break;

                  case "s":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.C && (m += n - I[C - 4], y += i - I[C - 3]), h = s.C, S = n + d[v++], T = i + d[v++], 
                    n += d[v++], i += d[v++], o.addData(h, m, y, S, T, n, i);
                    break;

                  case "Q":
                    S = d[v++], T = d[v++], n = d[v++], i = d[v++], h = s.Q, o.addData(h, S, T, n, i);
                    break;

                  case "q":
                    S = d[v++] + n, T = d[v++] + i, n += d[v++], i += d[v++], h = s.Q, o.addData(h, S, T, n, i);
                    break;

                  case "T":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.Q && (m += n - I[C - 4], y += i - I[C - 3]), n = d[v++], i = d[v++], h = s.Q, 
                    o.addData(h, m, y, n, i);
                    break;

                  case "t":
                    m = n, y = i;
                    var C = o.len(), I = o.data;
                    e === s.Q && (m += n - I[C - 4], y += i - I[C - 3]), n += d[v++], i += d[v++], h = s.Q, 
                    o.addData(h, m, y, n, i);
                    break;

                  case "A":
                    _ = d[v++], x = d[v++], w = d[v++], b = d[v++], M = d[v++], Si(S = n, T = i, n = d[v++], i = d[v++], b, M, _, x, w, h = s.A, o);
                    break;

                  case "a":
                    _ = d[v++], x = d[v++], w = d[v++], b = d[v++], M = d[v++], Si(S = n, T = i, n += d[v++], i += d[v++], b, M, _, x, w, h = s.A, o);
                }
            }
            ("z" === f || "Z" === f) && (h = s.Z, o.addData(h), n = r, i = a), e = h;
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
            Nf(n, t), this.dirty(!0);
        }, e;
    }
    function Ii(t, e) {
        return new Mi(Ci(t, e));
    }
    function ki(t, e) {
        return Mi.extend(Ci(t, e));
    }
    function Di(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }
    function Ai(t, e, n) {
        var i = e.points, r = e.smooth;
        if (i && i.length >= 2) {
            if (r && "spline" !== r) {
                var a = td(i, r, n, e.smoothConstraint);
                t.moveTo(i[0][0], i[0][1]);
                for (var o = i.length, s = 0; (n ? o : o - 1) > s; s++) {
                    var l = a[2 * s], u = a[2 * s + 1], h = i[(s + 1) % o];
                    t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
                }
            } else {
                "spline" === r && (i = Jf(i, n)), t.moveTo(i[0][0], i[0][1]);
                for (var s = 1, c = i.length; c > s; s++) t.lineTo(i[s][0], i[s][1]);
            }
            n && t.closePath();
        }
    }
    function Li(t, e, n) {
        var i = n && n.lineWidth;
        if (e && i) {
            var r = e.x1, a = e.x2, o = e.y1, s = e.y2;
            id(2 * r) === id(2 * a) ? t.x1 = t.x2 = Oi(r, i, !0) : (t.x1 = r, t.x2 = a), id(2 * o) === id(2 * s) ? t.y1 = t.y2 = Oi(o, i, !0) : (t.y1 = o, 
            t.y2 = s);
        }
    }
    function Pi(t, e, n) {
        var i = n && n.lineWidth;
        if (e && i) {
            var r = e.x, a = e.y, o = e.width, s = e.height;
            t.x = Oi(r, i, !0), t.y = Oi(a, i, !0), t.width = Math.max(Oi(r + o, i, !1) - t.x, 0 === o ? 0 : 1), 
            t.height = Math.max(Oi(a + s, i, !1) - t.y, 0 === s ? 0 : 1);
        }
    }
    function Oi(t, e, n) {
        var i = id(2 * t);
        return (i + id(e)) % 2 == 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
    }
    function Ei(t, e, n) {
        var i = t.cpx2, r = t.cpy2;
        return null === i || null === r ? [ (n ? jn : Un)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? jn : Un)(t.y1, t.cpy1, t.cpy2, t.y2, e) ] : [ (n ? Jn : Kn)(t.x1, t.cpx1, t.x2, e), (n ? Jn : Kn)(t.y1, t.cpy1, t.y2, e) ];
    }
    function Bi(t) {
        sn.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, 
        this.notClear = !0;
    }
    function Ri(t) {
        return Mi.extend(t);
    }
    function zi(t, e) {
        Td[t] = e;
    }
    function Ni(t, e, n, i) {
        var r = Ii(t, e);
        return n && ("center" === i && (n = Vi(n, r.getBoundingRect())), Wi(r, n)), r;
    }
    function Fi(t, e, n) {
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
                    i.setStyle(Vi(e, r));
                }
            }
        });
        return i;
    }
    function Vi(t, e) {
        var n, i = e.width / e.height, r = t.height * i;
        return r <= t.width ? n = t.height : (r = t.width, n = r / i), {
            x: t.x + t.width / 2 - r / 2,
            y: t.y + t.height / 2 - n / 2,
            width: r,
            height: n
        };
    }
    function Wi(t, e) {
        if (t.applyTransform) {
            var n = t.getBoundingRect().calculateTransform(e);
            t.applyTransform(n);
        }
    }
    function Hi(t) {
        return null != t && "none" !== t;
    }
    function Gi(t) {
        if ("string" != typeof t) return t;
        var e = Id.get(t);
        return e || (e = Vt(t, -.1), 1e4 > kd && (Id.set(t, e), kd++)), e;
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
    function Xi(t) {
        var e = t.__hoverStl;
        if (e && !t.__highlighted) {
            var n = t.__zr, i = t.useHoverLayer && n && "canvas" === n.painter.type;
            if (t.__highlighted = i ? "layer" : "plain", !(t.isGroup || !n && t.useHoverLayer)) {
                var r = t, a = t.style;
                i && (r = n.addHover(t), a = r.style), fr(a), i || qi(r), a.extendFrom(e), Ui(a, e, "fill"), 
                Ui(a, e, "stroke"), cr(a), i || (t.dirty(!1), t.z2 += _d);
            }
        }
    }
    function Ui(t, e, n) {
        !Hi(e[n]) && Hi(t[n]) && (t[n] = Gi(t[n]));
    }
    function ji(t) {
        var e = t.__highlighted;
        if (e && (t.__highlighted = !1, !t.isGroup)) if ("layer" === e) t.__zr && t.__zr.removeHover(t); else {
            var n = t.style, i = t.__cachedNormalStl;
            i && (fr(n), t.setStyle(i), cr(n));
            var r = t.__cachedNormalZ2;
            null != r && t.z2 - r === _d && (t.z2 = r);
        }
    }
    function Yi(t, e, n) {
        var i, r = bd, a = bd;
        t.__highlighted && (r = wd, i = !0), e(t, n), t.__highlighted && (a = wd, i = !0), 
        t.isGroup && t.traverse(function(t) {
            !t.isGroup && e(t, n);
        }), i && t.__highDownOnUpdate && t.__highDownOnUpdate(r, a);
    }
    function Zi(t, e) {
        e = t.__hoverStl = !1 !== e && (t.hoverStyle || e || {}), t.__hoverStlDirty = !0, 
        t.__highlighted && (t.__cachedNormalStl = null, ji(t), Xi(t));
    }
    function $i(t) {
        !tr(this, t) && !this.__highByOuter && Yi(this, Xi);
    }
    function Qi(t) {
        !tr(this, t) && !this.__highByOuter && Yi(this, ji);
    }
    function Ki(t) {
        this.__highByOuter |= 1 << (t || 0), Yi(this, Xi);
    }
    function Ji(t) {
        !(this.__highByOuter &= ~(1 << (t || 0))) && Yi(this, ji);
    }
    function tr(t, e) {
        return t.__highDownSilentOnTouch && e.zrByTouch;
    }
    function er(t, e) {
        nr(t, !0), Yi(t, Zi, e);
    }
    function nr(t, e) {
        var n = !1 === e;
        if (t.__highDownSilentOnTouch = t.highDownSilentOnTouch, t.__highDownOnUpdate = t.highDownOnUpdate, 
        !n || t.__highDownDispatcher) {
            var i = n ? "off" : "on";
            t[i]("mouseover", $i)[i]("mouseout", Qi), t[i]("emphasis", Ki)[i]("normal", Ji), 
            t.__highByOuter = t.__highByOuter || 0, t.__highDownDispatcher = !n;
        }
    }
    function ir(t) {
        return !(!t || !t.__highDownDispatcher);
    }
    function rr(t) {
        var e = Sd[t];
        return null == e && 32 >= Md && (e = Sd[t] = Md++), e;
    }
    function ar(t, e, n, i, r, a, o) {
        var s, l = (r = r || yd).labelFetcher, u = r.labelDataIndex, h = r.labelDimIndex, c = n.getShallow("show"), f = i.getShallow("show");
        (c || f) && (l && (s = l.getFormattedLabel(u, "normal", null, h)), null == s && (s = x(r.defaultText) ? r.defaultText(u, r) : r.defaultText));
        var d = c ? s : null, p = f ? k(l ? l.getFormattedLabel(u, "emphasis", null, h) : null, s) : null;
        (null != d || null != p) && (or(t, n, a, r), or(e, i, o, r, !0)), t.text = d, e.text = p;
    }
    function or(t, e, n, i, r) {
        return sr(t, e, i, r), n && o(t, n), t;
    }
    function sr(t, e, n, i) {
        if ((n = n || yd).isRectText) {
            var r;
            n.getTextPosition ? r = n.getTextPosition(e, i) : "outside" === (r = e.getShallow("position") || (i ? null : "inside")) && (r = "top"), 
            t.textPosition = r, t.textOffset = e.getShallow("offset");
            var a = e.getShallow("rotate");
            null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = k(e.getShallow("distance"), i ? null : 5);
        }
        var o, s = e.ecModel, l = s && s.option.textStyle, u = lr(e);
        if (u) {
            o = {};
            for (var h in u) if (u.hasOwnProperty(h)) {
                var c = e.getModel([ "rich", h ]);
                ur(o[h] = {}, c, l, n, i);
            }
        }
        return t.rich = o, ur(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), 
        t;
    }
    function lr(t) {
        for (var e; t && t !== t.ecModel; ) {
            var n = (t.option || yd).rich;
            if (n) {
                e = e || {};
                for (var i in n) n.hasOwnProperty(i) && (e[i] = 1);
            }
            t = t.parentModel;
        }
        return e;
    }
    function ur(t, e, n, i, r, a) {
        n = !r && n || yd, t.textFill = hr(e.getShallow("color"), i) || n.color, t.textStroke = hr(e.getShallow("textBorderColor"), i) || n.textBorderColor, 
        t.textStrokeWidth = k(e.getShallow("textBorderWidth"), n.textBorderWidth), r || (a && (t.insideRollbackOpt = i, 
        cr(t)), null == t.textFill && (t.textFill = i.autoColor)), t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, 
        t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, t.fontSize = e.getShallow("fontSize") || n.fontSize, 
        t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, t.textAlign = e.getShallow("align"), 
        t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), 
        t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), 
        t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && i.disableBox || (t.textBackgroundColor = hr(e.getShallow("backgroundColor"), i), 
        t.textPadding = e.getShallow("padding"), t.textBorderColor = hr(e.getShallow("borderColor"), i), 
        t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), 
        t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), 
        t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), 
        t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, 
        t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, 
        t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY;
    }
    function hr(t, e) {
        return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null;
    }
    function cr(t) {
        var e, n = t.textPosition, i = t.insideRollbackOpt;
        if (i && null == t.textFill) {
            var r = i.autoColor, a = i.isRectText, o = i.useInsideStyle, s = !1 !== o && (!0 === o || a && n && "string" == typeof n && n.indexOf("inside") >= 0), l = !s && null != r;
            (s || l) && (e = {
                textFill: t.textFill,
                textStroke: t.textStroke,
                textStrokeWidth: t.textStrokeWidth
            }), s && (t.textFill = "#fff", null == t.textStroke && (t.textStroke = r, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), 
            l && (t.textFill = r);
        }
        t.insideRollback = e;
    }
    function fr(t) {
        var e = t.insideRollback;
        e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, 
        t.insideRollback = null);
    }
    function dr(t, e) {
        var n = e || e.getModel("textStyle");
        return O([ t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif" ].join(" "));
    }
    function pr(t, e, n, i, r, a) {
        if ("function" == typeof r && (a = r, r = null), i && i.isAnimationEnabled()) {
            var o = t ? "Update" : "", s = i.getShallow("animationDuration" + o), l = i.getShallow("animationEasing" + o), u = i.getShallow("animationDelay" + o);
            "function" == typeof u && (u = u(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), 
            "function" == typeof s && (s = s(r)), s > 0 ? e.animateTo(n, s, u || 0, l, a, !!a) : (e.stopAnimation(), 
            e.attr(n), a && a());
        } else e.stopAnimation(), e.attr(n), a && a();
    }
    function gr(t, e, n, i, r) {
        pr(!0, t, e, n, i, r);
    }
    function vr(t, e, n, i, r) {
        pr(!1, t, e, n, i, r);
    }
    function mr(t, e, n) {
        return e && !f(e) && (e = hh.getLocalTransform(e)), n && (e = St([], e)), Z([], t, e);
    }
    function yr(t, e, n) {
        function i(t) {
            var e = {
                position: V(t.position),
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
    function _r(t, e, n, i, r, a, o, s) {
        var l = n - t, u = i - e, h = o - r, c = s - a, f = xr(h, c, l, u);
        if (wr(f)) return !1;
        var d = t - r, p = e - a, g = xr(d, p, l, u) / f;
        if (0 > g || g > 1) return !1;
        var v = xr(d, p, h, c) / f;
        return !(0 > v || v > 1);
    }
    function xr(t, e, n, i) {
        return t * i - n * e;
    }
    function wr(t) {
        return 1e-6 >= t && t >= -1e-6;
    }
    function br(t, e, n) {
        this.parentModel = e, this.ecModel = n, this.option = t;
    }
    function Mr(e, n, i) {
        for (var r = 0; r < n.length && (!n[r] || null != (e = e && "object" == (void 0 === e ? "undefined" : t(e)) ? e[n[r]] : null)); r++) ;
        return null == e && i && (e = i.get(n)), e;
    }
    function Sr(t, e) {
        var n = Bd(t).getParent;
        return n ? n.call(t, e) : t.parentModel;
    }
    function Tr(t) {
        return [ t || "", Rd++, Math.random().toFixed(5) ].join("_");
    }
    function Cr(t) {
        return t.replace(/^\s+|\s+$/g, "");
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
    function kr(t, e) {
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
    function Dr(t, e, n) {
        return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), 
        n ? t : +t;
    }
    function Ar(t) {
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
    function Pr(t, e, n) {
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
        }, 0), u = p(a, function(t, e) {
            return t - s[e];
        }); o > l; ) {
            for (var h = Number.NEGATIVE_INFINITY, c = null, f = 0, d = u.length; d > f; ++f) u[f] > h && (h = u[f], 
            c = f);
            ++s[c], u[c] = 0, ++l;
        }
        return s[e] / r;
    }
    function Or(t) {
        var e = 2 * Math.PI;
        return (t % e + e) % e;
    }
    function Er(t) {
        return t > -zd && zd > t;
    }
    function Br(t) {
        if (t instanceof Date) return t;
        if ("string" == typeof t) {
            var e = Nd.exec(t);
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
        return Math.pow(10, zr(t));
    }
    function zr(t) {
        if (0 === t) return 0;
        var e = Math.floor(Math.log(t) / Math.LN10);
        return t / Math.pow(10, e) >= 10 && e++, e;
    }
    function Nr(t, e) {
        var n, i = zr(t), r = Math.pow(10, i), a = t / r;
        return n = e ? 1.5 > a ? 1 : 2.5 > a ? 2 : 4 > a ? 3 : 7 > a ? 5 : 10 : 1 > a ? 1 : 2 > a ? 2 : 3 > a ? 3 : 5 > a ? 5 : 10, 
        t = n * r, i >= -20 ? +t.toFixed(0 > i ? -i : 0) : t;
    }
    function Fr(t) {
        return isNaN(t) ? "-" : (t = (t + "").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
    }
    function Vr(t) {
        return null == t ? "" : (t + "").replace(Wd, function(t, e) {
            return Hd[e];
        });
    }
    function Wr(t, e, n) {
        _(e) || (e = [ e ]);
        var i = e.length;
        if (!i) return "";
        for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
            var o = Gd[a];
            t = t.replace(qd(o), qd(o, 0));
        }
        for (var s = 0; i > s; s++) for (var l = 0; l < r.length; l++) {
            var u = e[s][r[l]];
            t = t.replace(qd(Gd[l], s), n ? Vr(u) : u);
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
    function qr(t, e, n) {
        ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");
        var i = Br(e), r = n ? "UTC" : "", a = i["get" + r + "FullYear"](), o = i["get" + r + "Month"]() + 1, s = i["get" + r + "Date"](), l = i["get" + r + "Hours"](), u = i["get" + r + "Minutes"](), h = i["get" + r + "Seconds"](), c = i["get" + r + "Milliseconds"]();
        return t = t.replace("MM", Gr(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", Gr(s, 2)).replace("d", s).replace("hh", Gr(l, 2)).replace("h", l).replace("mm", Gr(u, 2)).replace("m", u).replace("ss", Gr(h, 2)).replace("s", h).replace("SSS", Gr(c, 3));
    }
    function Xr(t, e, n, i, r) {
        var a = 0, o = 0;
        null == i && (i = 1 / 0), null == r && (r = 1 / 0);
        var s = 0;
        e.eachChild(function(l, u) {
            var h, c, f = l.position, d = l.getBoundingRect(), p = e.childAt(u + 1), g = p && p.getBoundingRect();
            if ("horizontal" === t) {
                var v = d.width + (g ? -g.x + d.x : 0);
                (h = a + v) > i || l.newline ? (a = 0, h = v, o += s + n, s = d.height) : s = Math.max(s, d.height);
            } else {
                var m = d.height + (g ? -g.y + d.y : 0);
                (c = o + m) > r || l.newline ? (a += s + n, o = 0, c = m, s = d.width) : s = Math.max(s, d.width);
            }
            l.newline || (f[0] = a, f[1] = o, "horizontal" === t ? a = h + n : o = c + n);
        });
    }
    function Ur(t, e, n) {
        n = Vd(n || 0);
        var i = e.width, r = e.height, a = kr(t.left, i), o = kr(t.top, r), s = kr(t.right, i), l = kr(t.bottom, r), u = kr(t.width, i), h = kr(t.height, r), c = n[2] + n[0], f = n[1] + n[3], d = t.aspect;
        switch (isNaN(u) && (u = i - s - f - a), isNaN(h) && (h = r - l - c - o), null != d && (isNaN(u) && isNaN(h) && (d > i / r ? u = .8 * i : h = .8 * r), 
        isNaN(u) && (u = d * h), isNaN(h) && (h = u / d)), isNaN(a) && (a = i - s - u - f), 
        isNaN(o) && (o = r - l - h - c), t.left || t.right) {
          case "center":
            a = i / 2 - u / 2 - n[3];
            break;

          case "right":
            a = i - u - f;
        }
        switch (t.top || t.bottom) {
          case "middle":
          case "center":
            o = r / 2 - h / 2 - n[0];
            break;

          case "bottom":
            o = r - h - c;
        }
        a = a || 0, o = o || 0, isNaN(u) && (u = i - f - a - (s || 0)), isNaN(h) && (h = r - c - o - (l || 0));
        var p = new oe(a + n[3], o + n[0], u, h);
        return p.margin = n, p;
    }
    function jr(t, e, n) {
        function i(n, i) {
            var o = {}, l = 0, u = {}, h = 0;
            if (jd(n, function(e) {
                u[e] = t[e];
            }), jd(n, function(t) {
                r(e, t) && (o[t] = u[t] = e[t]), a(o, t) && l++, a(u, t) && h++;
            }), s[i]) return a(e, n[1]) ? u[n[2]] = null : a(e, n[2]) && (u[n[1]] = null), u;
            if (2 !== h && l) {
                if (l >= 2) return o;
                for (var c = 0; c < n.length; c++) {
                    var f = n[c];
                    if (!r(o, f) && r(t, f)) {
                        o[f] = t[f];
                        break;
                    }
                }
                return o;
            }
            return u;
        }
        function r(t, e) {
            return t.hasOwnProperty(e);
        }
        function a(t, e) {
            return null != t[e] && "auto" !== t[e];
        }
        function o(t, e, n) {
            jd(t, function(t) {
                e[t] = n[t];
            });
        }
        !b(n) && (n = {});
        var s = n.ignoreSize;
        !_(s) && (s = [ s, s ]);
        var l = i(Zd[0], 0), u = i(Zd[1], 1);
        o(Zd[0], t, l), o(Zd[1], t, u);
    }
    function Yr(t) {
        return Zr({}, t);
    }
    function Zr(t, e) {
        return e && t && jd(Yd, function(n) {
            e.hasOwnProperty(n) && (t[n] = e[n]);
        }), t;
    }
    function $r(t, e) {
        for (var n = t.length, i = 0; n > i; i++) if (t[i].length > e) return t[i];
        return t[n - 1];
    }
    function Qr(t) {
        var e = t.get("coordinateSystem"), n = {
            coordSysName: e,
            coordSysDims: [],
            axisMap: z(),
            categoryAxisMap: z()
        }, i = ip[e];
        return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0;
    }
    function Kr(t) {
        return "category" === t.get("type");
    }
    function Jr(t) {
        this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === sp ? {} : []), 
        this.sourceFormat = t.sourceFormat || lp, this.seriesLayoutBy = t.seriesLayoutBy || hp, 
        this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && z(t.encodeDefine), 
        this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount;
    }
    function ta(t) {
        var e = t.option.source, n = lp;
        if (S(e)) n = up; else if (_(e)) {
            0 === e.length && (n = ap);
            for (var i = 0, r = e.length; r > i; i++) {
                var a = e[i];
                if (null != a) {
                    if (_(a)) {
                        n = ap;
                        break;
                    }
                    if (b(a)) {
                        n = op;
                        break;
                    }
                }
            }
        } else if (b(e)) {
            for (var o in e) if (e.hasOwnProperty(o) && f(e[o])) {
                n = sp;
                break;
            }
        } else if (null != e) throw new Error("Invalid data");
        fp(t).sourceFormat = n;
    }
    function ea(t) {
        return fp(t).source;
    }
    function na(t) {
        fp(t).datasetMap = z();
    }
    function ia(t) {
        var e = t.option, n = e.data, i = S(n) ? up : rp, r = !1, a = e.seriesLayoutBy, o = e.sourceHeader, s = e.dimensions, l = ua(t);
        if (l) {
            var u = l.option;
            n = u.source, i = fp(l).sourceFormat, r = !0, a = a || u.seriesLayoutBy, null == o && (o = u.sourceHeader), 
            s = s || u.dimensions;
        }
        var h = ra(n, i, a, o, s), c = e.encode;
        !c && l && (c = la(t, l, n, i, a, h)), fp(t).source = new Jr({
            data: n,
            fromDataset: r,
            seriesLayoutBy: a,
            sourceFormat: i,
            dimensionsDefine: h.dimensionsDefine,
            startIndex: h.startIndex,
            dimensionsDetectCount: h.dimensionsDetectCount,
            encodeDefine: c
        });
    }
    function ra(t, e, n, i, r) {
        if (!t) return {
            dimensionsDefine: aa(r)
        };
        var a, o, s;
        if (e === ap) "auto" === i || null == i ? oa(function(t) {
            null != t && "-" !== t && (w(t) ? null == o && (o = 1) : o = 0);
        }, n, t, 10) : o = i ? 1 : 0, r || 1 !== o || (r = [], oa(function(t, e) {
            r[e] = null != t ? t : "";
        }, n, t)), a = r ? r.length : n === cp ? t.length : t[0] ? t[0].length : null; else if (e === op) r || (r = sa(t), 
        s = !0); else if (e === sp) r || (r = [], s = !0, d(t, function(t, e) {
            r.push(e);
        })); else if (e === rp) {
            var l = Sn(t[0]);
            a = _(l) && l.length || 1;
        }
        var u;
        return s && d(r, function(t, e) {
            "name" === (b(t) ? t.name : t) && (u = e);
        }), {
            startIndex: o,
            dimensionsDefine: aa(r),
            dimensionsDetectCount: a,
            potentialNameDimIndex: u
        };
    }
    function aa(t) {
        if (t) {
            var e = z();
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
    function oa(t, e, n, i) {
        if (null == i && (i = 1 / 0), e === cp) for (a = 0; a < n.length && i > a; a++) t(n[a] ? n[a][0] : null, a); else for (var r = n[0] || [], a = 0; a < r.length && i > a; a++) t(r[a], a);
    }
    function sa(t) {
        for (var e, n = 0; n < t.length && !(e = t[n++]); ) ;
        if (e) {
            var i = [];
            return d(e, function(t, e) {
                i.push(e);
            }), i;
        }
    }
    function la(t, e, n, i, r, a) {
        var o = Qr(t), s = {}, l = [], u = [], h = t.subType, c = z([ "pie", "map", "funnel" ]), f = z([ "line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot" ]);
        if (o && null != f.get(h)) {
            var p = t.ecModel, g = fp(p).datasetMap, v = e.uid + "_" + r, m = g.get(v) || g.set(v, {
                categoryWayDim: 1,
                valueWayDim: 0
            });
            d(o.coordSysDims, function(t) {
                if (null == o.firstCategoryDimIndex) {
                    e = m.valueWayDim++;
                    s[t] = e, u.push(e);
                } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0); else {
                    var e = m.categoryWayDim++;
                    s[t] = e, u.push(e);
                }
            });
        } else if (null != c.get(h)) {
            for (var y, _ = 0; 5 > _ && null == y; _++) ca(n, i, r, a.dimensionsDefine, a.startIndex, _) || (y = _);
            if (null != y) {
                s.value = y;
                var x = a.potentialNameDimIndex || Math.max(y - 1, 0);
                u.push(x), l.push(x);
            }
        }
        return l.length && (s.itemName = l), u.length && (s.seriesName = u), s;
    }
    function ua(t) {
        var e = t.option;
        return e.data ? void 0 : t.ecModel.getComponent("dataset", e.datasetIndex || 0);
    }
    function ha(t, e) {
        return ca(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);
    }
    function ca(t, e, n, i, r, a) {
        function o(t) {
            return (null == t || !isFinite(t) || "" === t) && (!(!w(t) || "-" === t) || void 0);
        }
        var s;
        if (S(t)) return !1;
        var l;
        if (i && (l = i[a], l = b(l) ? l.name : l), e === ap) if (n === cp) {
            for (var u = t[a], h = 0; h < (u || []).length && 5 > h; h++) if (null != (s = o(u[r + h]))) return s;
        } else for (h = 0; h < t.length && 5 > h; h++) {
            var c = t[r + h];
            if (c && null != (s = o(c[a]))) return s;
        } else if (e === op) {
            if (!l) return;
            for (h = 0; h < t.length && 5 > h; h++) if ((f = t[h]) && null != (s = o(f[l]))) return s;
        } else if (e === sp) {
            if (!l) return;
            if (!(u = t[l]) || S(u)) return !1;
            for (h = 0; h < u.length && 5 > h; h++) if (null != (s = o(u[h]))) return s;
        } else if (e === rp) for (h = 0; h < t.length && 5 > h; h++) {
            var f = t[h], d = Sn(f);
            if (!_(d)) return !1;
            if (null != (s = o(d[a]))) return s;
        }
        return !1;
    }
    function fa(t, e) {
        if (e) {
            var n = e.seiresIndex, i = e.seriesId, r = e.seriesName;
            return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r;
        }
    }
    function da(e, n) {
        var a = e.color && !e.colorLayer;
        d(n, function(n, o) {
            "colorLayer" === o && a || Kd.hasClass(o) || ("object" == (void 0 === n ? "undefined" : t(n)) ? e[o] = e[o] ? r(e[o], n, !1) : i(n) : null == e[o] && (e[o] = n));
        });
    }
    function pa(t) {
        t = t, this.option = {}, this.option[dp] = 1, this._componentsMap = z({
            series: []
        }), this._seriesIndices, this._seriesIndicesMap, da(t, this._theme.option), r(t, tp, !1), 
        this.mergeOption(t);
    }
    function ga(t, e) {
        _(e) || (e = e ? [ e ] : []);
        var n = {};
        return d(e, function(e) {
            n[e] = (t.get(e) || []).slice();
        }), n;
    }
    function va(t, e, n) {
        return e.type ? e.type : n ? n.subType : Kd.determineSubType(t, e);
    }
    function ma(t, e) {
        t._seriesIndicesMap = z(t._seriesIndices = p(e, function(t) {
            return t.componentIndex;
        }) || []);
    }
    function ya(t, e) {
        return e.hasOwnProperty("subType") ? v(t, function(t) {
            return t.subType === e.subType;
        }) : t;
    }
    function _a(t) {
        d(gp, function(e) {
            this[e] = m(t[e], t);
        }, this);
    }
    function xa() {
        this._coordinateSystems = [];
    }
    function wa(t) {
        this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, 
        this._currentMediaIndices = [], this._optionBackup, this._newBaseOption;
    }
    function ba(t, e, n) {
        var i, r, a = [], o = [], s = t.timeline;
        if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), 
        t.media) {
            r = r || {};
            var l = t.media;
            mp(l, function(t) {
                t && t.option && (t.query ? o.push(t) : i || (i = t));
            });
        }
        return r || (r = t), r.timeline || (r.timeline = s), mp([ r ].concat(a).concat(p(o, function(t) {
            return t.option;
        })), function(t) {
            mp(e, function(e) {
                e(t, n);
            });
        }), {
            baseOption: r,
            timelineOptions: a,
            mediaDefault: i,
            mediaList: o
        };
    }
    function Ma(t, e, n) {
        var i = {
            width: e,
            height: n,
            aspectratio: e / n
        }, r = !0;
        return d(t, function(t, e) {
            var n = e.match(wp);
            if (n && n[1] && n[2]) {
                var a = n[1], o = n[2].toLowerCase();
                Sa(i[o], t, a) || (r = !1);
            }
        }), r;
    }
    function Sa(t, e, n) {
        return "min" === n ? t >= e : "max" === n ? e >= t : t === e;
    }
    function Ta(t, e) {
        return t.join(",") === e.join(",");
    }
    function Ca(t, e) {
        mp(e = e || {}, function(e, n) {
            if (null != e) {
                var i = t[n];
                if (Kd.hasClass(n)) {
                    e = bn(e);
                    var r = Cn(i = bn(i), e);
                    t[n] = _p(r, function(t) {
                        return t.option && t.exist ? xp(t.exist, t.option, !0) : t.exist || t.option;
                    });
                } else t[n] = xp(i, e, !0);
            }
        });
    }
    function Ia(t) {
        var e = t && t.itemStyle;
        if (e) for (var n = 0, i = Sp.length; i > n; n++) {
            var a = Sp[n], o = e.normal, s = e.emphasis;
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
    function Aa(t, e) {
        var n = Mp(t) && t[e], i = Mp(n) && n.textStyle;
        if (i) for (var r = 0, a = Bc.length; a > r; r++) {
            var e = Bc[r];
            i.hasOwnProperty(e) && (n[e] = i[e]);
        }
    }
    function La(t) {
        t && (Da(t), Aa(t, "label"), t.emphasis && Aa(t.emphasis, "label"));
    }
    function Pa(t) {
        if (Mp(t)) {
            Ia(t), Da(t), Aa(t, "label"), Aa(t, "upperLabel"), Aa(t, "edgeLabel"), t.emphasis && (Aa(t.emphasis, "label"), 
            Aa(t.emphasis, "upperLabel"), Aa(t.emphasis, "edgeLabel"));
            var e = t.markPoint;
            e && (Ia(e), La(e));
            var n = t.markLine;
            n && (Ia(n), La(n));
            var i = t.markArea;
            i && La(i);
            var r = t.data;
            if ("graph" === t.type) {
                r = r || t.nodes;
                var a = t.links || t.edges;
                if (a && !S(a)) for (s = 0; s < a.length; s++) La(a[s]);
                d(t.categories, function(t) {
                    Da(t);
                });
            }
            if (r && !S(r)) for (s = 0; s < r.length; s++) La(r[s]);
            if ((e = t.markPoint) && e.data) for (var o = e.data, s = 0; s < o.length; s++) La(o[s]);
            if ((n = t.markLine) && n.data) for (var l = n.data, s = 0; s < l.length; s++) _(l[s]) ? (La(l[s][0]), 
            La(l[s][1])) : La(l[s]);
            "gauge" === t.type ? (Aa(t, "axisLabel"), Aa(t, "title"), Aa(t, "detail")) : "treemap" === t.type ? (ka(t.breadcrumb, "itemStyle"), 
            d(t.levels, function(t) {
                Da(t);
            })) : "tree" === t.type && Da(t.leaves);
        }
    }
    function Oa(t) {
        return _(t) ? t : t ? [ t ] : [];
    }
    function Ea(t) {
        return (_(t) ? t[0] : t) || {};
    }
    function Ba(t, e) {
        e = e.split(",");
        for (var n = t, i = 0; i < e.length && null != (n = n && n[e[i]]); i++) ;
        return n;
    }
    function Ra(t, e, n, i) {
        e = e.split(",");
        for (var r, a = t, o = 0; o < e.length - 1; o++) null == a[r = e[o]] && (a[r] = {}), 
        a = a[r];
        (i || null == a[e[o]]) && (a[e[o]] = n);
    }
    function za(t) {
        d(Cp, function(e) {
            e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);
        });
    }
    function Na(t) {
        d(t, function(e, n) {
            var i = [], r = [ NaN, NaN ], a = [ e.stackResultDimension, e.stackedOverDimension ], o = e.data, s = e.isStackedByIndex, l = o.map(a, function(a, l, u) {
                var h = o.get(e.stackedDimension, u);
                if (isNaN(h)) return r;
                var c, f;
                s ? f = o.getRawIndex(u) : c = o.get(e.stackedByDimension, u);
                for (var d = NaN, p = n - 1; p >= 0; p--) {
                    var g = t[p];
                    if (s || (f = g.data.rawIndexOf(g.stackedByDimension, c)), f >= 0) {
                        var v = g.data.getByRawIndex(g.stackResultDimension, f);
                        if (h >= 0 && v > 0 || 0 >= h && 0 > v) {
                            h += v, d = v;
                            break;
                        }
                    }
                }
                return i[0] = h, i[1] = d, i;
            });
            o.hostModel.setData(l), e.data = l;
        });
    }
    function Fa(t, e) {
        Jr.isInstance(t) || (t = Jr.seriesDataToSource(t)), this._source = t;
        var n = this._data = t.data, i = t.sourceFormat;
        i === up && (this._offset = 0, this._dimSize = e, this._data = n), o(this, Ap[i === ap ? i + "_" + t.seriesLayoutBy : i]);
    }
    function Va() {
        return this._data.length;
    }
    function Wa(t) {
        return this._data[t];
    }
    function Ha(t) {
        for (var e = 0; e < t.length; e++) this._data.push(t[e]);
    }
    function Ga(t, e, n) {
        return null != n ? t[n] : t;
    }
    function qa(t, e, n, i) {
        return Xa(t[i], this._dimensionInfos[e]);
    }
    function Xa(t, e) {
        var n = e && e.type;
        if ("ordinal" === n) {
            var i = e && e.ordinalMeta;
            return i ? i.parseAndCollect(t) : t;
        }
        return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +Br(t)), 
        null == t || "" === t ? NaN : +t;
    }
    function Ua(t, e, n) {
        if (t) {
            var i = t.getRawDataItem(e);
            if (null != i) {
                var r, a, o = t.getProvider().getSource().sourceFormat, s = t.getDimensionInfo(n);
                return s && (r = s.name, a = s.index), Lp[o](i, e, a, r);
            }
        }
    }
    function ja(t, e, n) {
        if (t) {
            var i = t.getProvider().getSource().sourceFormat;
            if (i === rp || i === op) {
                var r = t.getRawDataItem(e);
                return i !== rp || b(r) || (r = null), r ? r[n] : void 0;
            }
        }
    }
    function Ya(t) {
        return new Za(t);
    }
    function Za(t) {
        t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, 
        this._onDirty = t.onDirty, this._dirty = !0, this.context;
    }
    function $a(t, e, n, i, r, a) {
        Rp.reset(n, i, r, a), t._callingProgress = e, t._callingProgress({
            start: n,
            end: i,
            count: i - n,
            next: Rp.next
        }, t.context);
    }
    function Qa(t, e) {
        t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;
        var n, i;
        !e && t._reset && ((n = t._reset(t.context)) && n.progress && (i = n.forceFirstProgress, 
        n = n.progress), _(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;
        var r = t._downstream;
        return r && r.dirty(), i;
    }
    function Ka(t) {
        var e = t.name;
        kn(t) || (t.name = Ja(t) || e);
    }
    function Ja(t) {
        var e = t.getRawData(), n = [];
        return d(e.mapDimension("seriesName", !0), function(t) {
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
        d(t.CHANGABLE_METHODS, function(n) {
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
        this.group = new Nh(), this.uid = Tr("viewChart"), this.renderTask = Ya({
            plan: uo,
            reset: ho
        }), this.renderTask.context = {
            view: this
        };
    }
    function so(t, e, n) {
        if (t && (t.trigger(e, n), t.isGroup && !ir(t))) for (var i = 0, r = t.childCount(); r > i; i++) so(t.childAt(i), e, n);
    }
    function lo(t, e, n) {
        var i = An(t, e), r = e && null != e.highlightKey ? rr(e.highlightKey) : null;
        null != i ? d(bn(i), function(e) {
            so(t.getItemGraphicEl(e), n, r);
        }) : t.eachItemGraphicEl(function(t) {
            so(t, n, r);
        });
    }
    function uo(t) {
        return Gp(t.model);
    }
    function ho(t) {
        var e = t.model, n = t.ecModel, i = t.api, r = t.payload, a = e.pipelineContext.progressiveRender, o = t.view, s = r && Hp(r).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
        return "render" !== l && o[l](e, n, i, r), Xp[l];
    }
    function co(t, e, n) {
        function i() {
            h = new Date().getTime(), c = null, t.apply(o, s || []);
        }
        var r, a, o, s, l, u = 0, h = 0, c = null;
        e = e || 0;
        var f = function() {
            r = new Date().getTime(), o = this, s = arguments;
            var t = l || e, f = l || n;
            l = null, a = r - (f ? u : h) - t, clearTimeout(c), f ? c = setTimeout(i, t) : a >= 0 ? i() : c = setTimeout(i, -a), 
            u = r;
        };
        return f.clear = function() {
            c && (clearTimeout(c), c = null);
        }, f.debounceNextCall = function(t) {
            l = t;
        }, f;
    }
    function fo(t, e, n, i) {
        this.ecInstance = t, this.api = e, this.unfinished;
        var n = this._dataProcessorHandlers = n.slice(), i = this._visualHandlers = i.slice();
        this._allHandlers = n.concat(i), this._stageTaskMap = z();
    }
    function po(t, e, n, i, r) {
        function a(t, e) {
            return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));
        }
        r = r || {};
        var o;
        d(e, function(e) {
            if (!r.visualType || r.visualType === e.visualType) {
                var s = t._stageTaskMap.get(e.uid), l = s.seriesTaskMap, u = s.overallTask;
                if (u) {
                    var h, c = u.agentStubMap;
                    c.each(function(t) {
                        a(r, t) && (t.dirty(), h = !0);
                    }), h && u.dirty(), Qp(u, i);
                    var f = t.getPerformArgs(u, r.block);
                    c.each(function(t) {
                        t.perform(f);
                    }), o |= u.perform(f);
                } else l && l.each(function(s) {
                    a(r, s) && s.dirty();
                    var l = t.getPerformArgs(s, r.block);
                    l.skip = !e.performRawSeries && n.isSeriesFiltered(s.context.model), Qp(s, i), o |= s.perform(l);
                });
            }
        }), t.unfinished |= o;
    }
    function go(t, e, n, i, r) {
        function a(n) {
            var a = n.uid, s = o.get(a) || o.set(a, Ya({
                plan: wo,
                reset: bo,
                count: So
            }));
            s.context = {
                model: n,
                ecModel: i,
                api: r,
                useClearVisual: e.isVisual && !e.isLayout,
                plan: e.plan,
                reset: e.reset,
                scheduler: t
            }, To(t, n, s);
        }
        var o = n.seriesTaskMap || (n.seriesTaskMap = z()), s = e.seriesType, l = e.getTargetSeries;
        e.createOnAllSeries ? i.eachRawSeries(a) : s ? i.eachRawSeriesByType(s, a) : l && l(i, r).each(a);
        var u = t._pipelineMap;
        o.each(function(t, e) {
            u.get(e) || (t.dispose(), o.removeKey(e));
        });
    }
    function vo(t, e, n, i, r) {
        function a(e) {
            var n = e.uid, i = s.get(n);
            i || (i = s.set(n, Ya({
                reset: yo,
                onDirty: xo
            })), o.dirty()), i.context = {
                model: e,
                overallProgress: h,
                modifyOutputEnd: c
            }, i.agent = o, i.__block = h, To(t, e, i);
        }
        var o = n.overallTask = n.overallTask || Ya({
            reset: mo
        });
        o.context = {
            ecModel: i,
            api: r,
            overallReset: e.overallReset,
            scheduler: t
        };
        var s = o.agentStubMap = o.agentStubMap || z(), l = e.seriesType, u = e.getTargetSeries, h = !0, c = e.modifyOutputEnd;
        l ? i.eachRawSeriesByType(l, a) : u ? u(i, r).each(a) : (h = !1, d(i.getSeries(), a));
        var f = t._pipelineMap;
        s.each(function(t, e) {
            f.get(e) || (t.dispose(), o.dirty(), s.removeKey(e));
        });
    }
    function mo(t) {
        t.overallReset(t.ecModel, t.api, t.payload);
    }
    function yo(t) {
        return t.overallProgress && _o;
    }
    function _o() {
        this.agent.dirty(), this.getDownstream().dirty();
    }
    function xo() {
        this.agent && this.agent.dirty();
    }
    function wo(t) {
        return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload);
    }
    function bo(t) {
        t.useClearVisual && t.data.clearAllVisual();
        var e = t.resetDefines = bn(t.reset(t.model, t.ecModel, t.api, t.payload));
        return e.length > 1 ? p(e, function(t, e) {
            return Mo(e);
        }) : Kp;
    }
    function Mo(t) {
        return function(e, n) {
            var i = n.data, r = n.resetDefines[t];
            if (r && r.dataEach) for (var a = e.start; a < e.end; a++) r.dataEach(i, a); else r && r.progress && r.progress(e, i);
        };
    }
    function So(t) {
        return t.data.count();
    }
    function To(t, e, n) {
        var i = e.uid, r = t._pipelineMap.get(i);
        !r.head && (r.head = n), r.tail && r.tail.pipe(n), r.tail = n, n.__idxInPipeline = r.count++, 
        n.__pipeline = r;
    }
    function Co(t) {
        Jp = null;
        try {
            t(tg, eg);
        } catch (t) {}
        return Jp;
    }
    function Io(t, e) {
        for (var n in e.prototype) t[n] = N;
    }
    function ko(t) {
        for (w(t) && (t = new DOMParser().parseFromString(t, "text/xml")), 9 === t.nodeType && (t = t.firstChild); "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType; ) t = t.nextSibling;
        return t;
    }
    function Do() {
        this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1;
    }
    function Ao(t, e) {
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
    function Lo(t, e) {
        t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), s(e.__inheritedStyle, t.__inheritedStyle));
    }
    function Po(t) {
        for (var e = O(t).split(ug), n = [], i = 0; i < e.length; i += 2) {
            var r = parseFloat(e[i]), a = parseFloat(e[i + 1]);
            n.push([ r, a ]);
        }
        return n;
    }
    function Oo(t, e, n, i) {
        var r = e.__inheritedStyle || {}, a = "text" === e.type;
        if (1 === t.nodeType && (Bo(t, e), o(r, Ro(t)), !i)) for (var s in fg) if (fg.hasOwnProperty(s)) {
            var l = t.getAttribute(s);
            null != l && (r[fg[s]] = l);
        }
        var u = a ? "textFill" : "fill", h = a ? "textStroke" : "stroke";
        e.style = e.style || new jh();
        var c = e.style;
        null != r.fill && c.set(u, Eo(r.fill, n)), null != r.stroke && c.set(h, Eo(r.stroke, n)), 
        d([ "lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize" ], function(t) {
            var e = "lineWidth" === t && a ? "textStrokeWidth" : t;
            null != r[t] && c.set(e, parseFloat(r[t]));
        }), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), 
        "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), 
        "end" === r.textAlign && (r.textAlign = "right"), d([ "lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline" ], function(t) {
            null != r[t] && c.set(t, r[t]);
        }), r.lineDash && (e.style.lineDash = O(r.lineDash).split(ug)), c[h] && "none" !== c[h] && (e[h] = !0), 
        e.__inheritedStyle = r;
    }
    function Eo(t, e) {
        var n = e && t && t.match(dg);
        return n ? e[O(n[1])] : t;
    }
    function Bo(t, e) {
        var n = t.getAttribute("transform");
        if (n) {
            var i = null, r = [];
            (n = n.replace(/,/g, " ")).replace(pg, function(t, e, n) {
                r.push(e, n);
            });
            for (var a = r.length - 1; a > 0; a -= 2) {
                var o = r[a], s = r[a - 1];
                switch (i = i || mt(), s) {
                  case "translate":
                    o = O(o).split(ug), wt(i, i, [ parseFloat(o[0]), parseFloat(o[1] || 0) ]);
                    break;

                  case "scale":
                    o = O(o).split(ug), Mt(i, i, [ parseFloat(o[0]), parseFloat(o[1] || o[0]) ]);
                    break;

                  case "rotate":
                    o = O(o).split(ug), bt(i, i, parseFloat(o[0]));
                    break;

                  case "skew":
                    o = O(o).split(ug), console.warn("Skew transform is not supported yet");
                    break;

                  case "matrix":
                    o = O(o).split(ug);
                    i[0] = parseFloat(o[0]), i[1] = parseFloat(o[1]), i[2] = parseFloat(o[2]), i[3] = parseFloat(o[3]), 
                    i[4] = parseFloat(o[4]), i[5] = parseFloat(o[5]);
                }
            }
            e.setLocalTransform(i);
        }
    }
    function Ro(t) {
        var e = t.getAttribute("style"), n = {};
        if (!e) return n;
        var i = {};
        gg.lastIndex = 0;
        for (var r; null != (r = gg.exec(e)); ) i[r[1]] = r[2];
        for (var a in fg) fg.hasOwnProperty(a) && null != i[a] && (n[fg[a]] = i[a]);
        return n;
    }
    function zo(t, e, n) {
        var i = e / t.width, r = n / t.height, a = Math.min(i, r);
        return {
            scale: [ a, a ],
            position: [ -(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + n / 2 ]
        };
    }
    function No(t, e) {
        return function(n, i, r) {
            (e || !this._disposed) && (n = n && n.toLowerCase(), Yu.prototype[t].call(this, n, i, r));
        };
    }
    function Fo() {
        Yu.call(this);
    }
    function Vo(t, e, n) {
        function r(t, e) {
            return t.__prio - e.__prio;
        }
        n = n || {}, "string" == typeof e && (e = Wg[e]), this.id, this.group, this._dom = t;
        var a = this._zr = xn(t, {
            renderer: n.renderer || "canvas",
            devicePixelRatio: n.devicePixelRatio,
            width: n.width,
            height: n.height
        });
        this._throttledZrFlush = co(m(a.flush, a), 17), (e = i(e)) && kp(e, !0), this._theme = e, 
        this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, 
        this._coordSysMgr = new xa();
        var o = this._api = rs(this);
        pe(Vg, r), pe(zg, r), this._scheduler = new fo(this, o, zg, Vg), Yu.call(this, this._ecEventProcessor = new as()), 
        this._messageCenter = new Fo(), this._initEvents(), this.resize = m(this.resize, this), 
        this._pendingActions = [], a.animation.on("frame", this._onframe, this), Yo(a, this), 
        E(this);
    }
    function Wo(t, e, n) {
        if (!this._disposed) {
            var i, r = this._model, a = this._coordSysMgr.getCoordinateSystems();
            e = Pn(r, e);
            for (var o = 0; o < a.length; o++) {
                var s = a[o];
                if (s[t] && null != (i = s[t](r, e, n))) return i;
            }
        }
    }
    function Ho(t) {
        var e = t._model, n = t._scheduler;
        n.restorePipelines(e), n.prepareStageTasks(), Zo(t, "component", e, n), Zo(t, "chart", e, n), 
        n.plan();
    }
    function Go(t, e, n, i, r) {
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
            var u = n.excludeSeriesId;
            null != u && (u = z(bn(u))), o && o.eachComponent(l, function(e) {
                u && null != u.get(e.id) || a(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId]);
            }, t);
        } else xg(t._componentsViews.concat(t._chartsViews), a);
    }
    function qo(t, e) {
        var n = t._chartsMap, i = t._scheduler;
        e.eachSeries(function(t) {
            i.updateStreamModes(t, n[t.__viewId]);
        });
    }
    function Xo(t, e) {
        var n = t.type, i = t.escapeConnect, r = Bg[n], a = r.actionInfo, l = (a.update || "update").split(":"), u = l.pop();
        l = null != l[0] && Mg(l[0]), this[Dg] = !0;
        var h = [ t ], c = !1;
        t.batch && (c = !0, h = p(t.batch, function(e) {
            return e = s(o({}, e), t), e.batch = null, e;
        }));
        var f, d = [], g = "highlight" === n || "downplay" === n;
        xg(h, function(t) {
            f = r.action(t, this._model, this._api), (f = f || o({}, t)).type = a.event || f.type, 
            d.push(f), g ? Go(this, u, t, "series") : l && Go(this, u, t, l.main, l.sub);
        }, this), "none" === u || g || l || (this[Ag] ? (Ho(this), Og.update.call(this, t), 
        this[Ag] = !1) : Og[u].call(this, t)), f = c ? {
            type: a.event || n,
            escapeConnect: i,
            batch: d
        } : d[0], this[Dg] = !1, !e && this._messageCenter.trigger(f.type, f);
    }
    function Uo(t) {
        for (var e = this._pendingActions; e.length; ) {
            var n = e.shift();
            Xo.call(this, n, t);
        }
    }
    function jo(t) {
        !t && this.trigger("updated");
    }
    function Yo(t, e) {
        t.on("rendered", function() {
            e.trigger("rendered"), !t.animation.isFinished() || e[Ag] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished");
        });
    }
    function Zo(t, e, n, i) {
        function r(t) {
            var e = "_ec_" + t.id + "_" + t.type, r = s[e];
            if (!r) {
                var h = Mg(t.type);
                (r = new (a ? Fp.getClass(h.main, h.sub) : oo.getClass(h.sub))()).init(n, u), s[e] = r, 
                o.push(r), l.add(r.group);
            }
            t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = {
                mainType: t.mainType,
                index: t.componentIndex
            }, !a && i.prepareView(r, t, n, u);
        }
        for (var a = "component" === e, o = a ? t._componentsViews : t._chartsViews, s = a ? t._componentsMap : t._chartsMap, l = t._zr, u = t._api, h = 0; h < o.length; h++) o[h].__alive = !1;
        a ? n.eachComponent(function(t, e) {
            "series" !== t && r(e);
        }) : n.eachSeries(r);
        for (h = 0; h < o.length; ) {
            var c = o[h];
            c.__alive ? h++ : (!a && c.renderTask.dispose(), l.remove(c.group), c.dispose(n, u), 
            o.splice(h, 1), delete s[c.__id], c.__id = c.group.__ecComponentInfo = null);
        }
    }
    function $o(t) {
        t.clearColorPalette(), t.eachSeries(function(t) {
            t.clearColorPalette();
        });
    }
    function Qo(t, e, n, i) {
        Ko(t, e, n, i), xg(t._chartsViews, function(t) {
            t.__alive = !1;
        }), Jo(t, e, n, i), xg(t._chartsViews, function(t) {
            t.__alive || t.remove(e, n);
        });
    }
    function Ko(t, e, n, i, r) {
        xg(r || t._componentsViews, function(t) {
            var r = t.__model;
            t.render(r, e, n, i), is(r, t);
        });
    }
    function Jo(t, e, n, i, r) {
        var a, o = t._scheduler;
        e.eachSeries(function(e) {
            var n = t._chartsMap[e.__viewId];
            n.__alive = !0;
            var s = n.renderTask;
            o.updatePayload(s, i), r && r.get(e.uid) && s.dirty(), a |= s.perform(o.getPerformArgs(s)), 
            n.group.silent = !!e.get("silent"), is(e, n), ns(e, n);
        }), o.unfinished |= a, es(t, e), Yp(t._zr.dom, e);
    }
    function ts(t, e) {
        xg(Fg, function(n) {
            n(t, e);
        });
    }
    function es(t, e) {
        var n = 0;
        t._zr.storage.traverse(function() {
            n++;
        }), n > e.get("hoverLayerThreshold") && !Cu.node && e.eachSeries(function(e) {
            if (!e.preventUsingHoverLayer) {
                var n = t._chartsMap[e.__viewId];
                n.__alive && n.group.traverse(function(t) {
                    t.useHoverLayer = !0;
                });
            }
        });
    }
    function ns(t, e) {
        var n = t.get("blendMode") || null;
        e.group.traverse(function(t) {
            t.isGroup || t.style.blend !== n && t.setStyle("blend", n), t.eachPendingDisplayable && t.eachPendingDisplayable(function(t) {
                t.setStyle("blend", n);
            });
        });
    }
    function is(t, e) {
        var n = t.get("z"), i = t.get("zlevel");
        e.group.traverse(function(t) {
            "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i));
        });
    }
    function rs(t) {
        var e = t._coordSysMgr;
        return o(new _a(t), {
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
    function as() {
        this.eventInfo;
    }
    function os(t) {
        function e(t, e) {
            for (var i = 0; i < t.length; i++) t[i][n] = e;
        }
        var n = "__connectUpdateStatus";
        xg(Rg, function(i, r) {
            t._messageCenter.on(r, function(i) {
                if (qg[t.group] && 0 !== t[n]) {
                    if (i && i.escapeConnect) return;
                    var r = t.makeActionFromEvent(i), a = [];
                    xg(Gg, function(e) {
                        e !== t && e.group === t.group && a.push(e);
                    }), e(a, 0), xg(a, function(t) {
                        1 !== t[n] && t.dispatchAction(r);
                    }), e(a, 2);
                }
            });
        });
    }
    function ss(t) {
        qg[t] = !1;
    }
    function ls(t) {
        return Gg[Bn(t, jg)];
    }
    function us(t, e) {
        Wg[t] = e;
    }
    function hs(t) {
        Ng.push(t);
    }
    function cs(t, e) {
        gs(zg, t, e, Tg);
    }
    function fs(t, e, n) {
        "function" == typeof e && (n = e, e = "");
        var i = bg(t) ? t.type : [ t, t = {
            event: e
        } ][0];
        t.event = (t.event || i).toLowerCase(), e = t.event, _g(Lg.test(i) && Lg.test(e)), 
        Bg[i] || (Bg[i] = {
            action: n,
            actionInfo: t
        }), Rg[e] = i;
    }
    function ds(t, e) {
        gs(Vg, t, e, Cg, "layout");
    }
    function ps(t, e) {
        gs(Vg, t, e, Ig, "visual");
    }
    function gs(t, e, n, i, r) {
        (wg(e) || bg(e)) && (n = e, e = i);
        var a = fo.wrapStageHandler(n, r);
        return a.__prio = e, a.__raw = n, t.push(a), a;
    }
    function vs(t, e) {
        Hg[t] = e;
    }
    function ms(t) {
        return Fp.extend(t);
    }
    function ys(t) {
        return Np.extend(t);
    }
    function _s(t) {
        return t;
    }
    function xs(t, e, n, i, r) {
        this._old = t, this._new = e, this._oldKeyGetter = n || _s, this._newKeyGetter = i || _s, 
        this.context = r;
    }
    function ws(t, e, n, i, r) {
        for (var a = 0; a < t.length; a++) {
            var o = "_ec_" + r[i](t[a], a), s = e[o];
            null == s ? (n.push(o), e[o] = a) : (s.length || (e[o] = s = [ s ]), s.push(a));
        }
    }
    function bs(t) {
        var e = {}, n = e.encode = {}, i = z(), r = [], a = [], o = e.userOutput = {
            dimensionNames: t.dimensions.slice(),
            encode: {}
        };
        d(t.dimensions, function(e) {
            var s = t.getDimensionInfo(e), l = s.coordDim;
            if (l) {
                var u = s.coordDimIndex;
                Ms(n, l)[u] = e, s.isExtraCoord || (i.set(l, 1), Ts(s.type) && (r[0] = e), Ms(o.encode, l)[u] = s.index), 
                s.defaultTooltip && a.push(e);
            }
            $g.each(function(t, e) {
                var i = Ms(n, e), r = s.otherDims[e];
                null != r && !1 !== r && (i[r] = s.name);
            });
        });
        var s = [], l = {};
        i.each(function(t, e) {
            var i = n[e];
            l[e] = i[0], s = s.concat(i);
        }), e.dataDimsOnCoord = s, e.encodeFirstDimNotExtra = l;
        var u = n.label;
        u && u.length && (r = u.slice());
        var h = n.tooltip;
        return h && h.length ? a = h.slice() : a.length || (a = r.slice()), n.defaultedLabel = r, 
        n.defaultedTooltip = a, e;
    }
    function Ms(t, e) {
        return t.hasOwnProperty(e) || (t[e] = []), t[e];
    }
    function Ss(t) {
        return "category" === t ? "ordinal" : "time" === t ? "time" : "float";
    }
    function Ts(t) {
        return !("ordinal" === t || "time" === t);
    }
    function Cs(t) {
        return t._rawCount > 65535 ? nv : rv;
    }
    function Is(t) {
        var e = t.constructor;
        return e === Array ? t.slice() : new e(t);
    }
    function ks(t, e) {
        d(av.concat(e.__wrappedMethods || []), function(n) {
            e.hasOwnProperty(n) && (t[n] = e[n]);
        }), t.__wrappedMethods = e.__wrappedMethods, d(ov, function(n) {
            t[n] = i(e[n]);
        }), t._calculationInfo = o(e._calculationInfo);
    }
    function Ds(t, e, n, i, r) {
        var a = ev[e.type], o = i - 1, s = e.name, l = t[s][o];
        if (l && l.length < n) {
            for (var u = new a(Math.min(r - o * n, n)), h = 0; h < l.length; h++) u[h] = l[h];
            t[s][o] = u;
        }
        for (var c = i * n; r > c; c += n) t[s].push(new a(Math.min(r - c, n)));
    }
    function As(t) {
        var e = t._invertedIndicesMap;
        d(e, function(n, i) {
            var r = t._dimensionInfos[i].ordinalMeta;
            if (r) {
                n = e[i] = new iv(r.categories.length);
                for (a = 0; a < n.length; a++) n[a] = Jg;
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
                var u = t._dimensionInfos[s].ordinalMeta;
                u && u.categories.length && (i = u.categories[i]);
            }
        }
        return i;
    }
    function Ps(t) {
        return t;
    }
    function Os(t) {
        return t < this._count && t >= 0 ? this._indices[t] : -1;
    }
    function Es(t, e) {
        var n = t._idList[e];
        return null == n && (n = Ls(t, t._idDimIdx, e)), null == n && (n = tv + e), n;
    }
    function Bs(t) {
        return _(t) || (t = [ t ]), t;
    }
    function Rs(t, e) {
        var n = t.dimensions, i = new sv(p(n, t.getDimensionInfo, t), t.hostModel);
        ks(i, t);
        for (var r = i._storage = {}, a = t._storage, o = 0; o < n.length; o++) {
            var s = n[o];
            a[s] && (u(e, s) >= 0 ? (r[s] = zs(a[s]), i._rawExtent[s] = [ 1 / 0, -1 / 0 ], i._extent[s] = null) : r[s] = a[s]);
        }
        return i;
    }
    function zs(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = Is(t[n]);
        return e;
    }
    function Ns(t, e, n) {
        function r(t, e, n) {
            null != $g.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, h.set(e, !0));
        }
        Jr.isInstance(e) || (e = Jr.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();
        for (var a = (n.dimsDef || []).slice(), l = z(n.encodeDef), u = z(), h = z(), c = [], f = Fs(e, t, a, n.dimCount), p = 0; f > p; p++) {
            var g = a[p] = o({}, b(a[p]) ? a[p] : {
                name: a[p]
            }), v = g.name, m = c[p] = {
                otherDims: {}
            };
            null != v && null == u.get(v) && (m.name = m.displayName = v, u.set(v, p)), null != g.type && (m.type = g.type), 
            null != g.displayName && (m.displayName = g.displayName);
        }
        l.each(function(t, e) {
            if (1 === (t = bn(t).slice()).length && !w(t[0]) && t[0] < 0) l.set(e, !1); else {
                var n = l.set(e, []);
                d(t, function(t, i) {
                    w(t) && (t = u.get(t)), null != t && f > t && (n[i] = t, r(c[t], e, i));
                });
            }
        });
        var y = 0;
        d(t, function(t) {
            var e, t, n, a;
            if (w(t)) e = t, t = {}; else {
                e = t.name;
                var o = t.ordinalMeta;
                t.ordinalMeta = null, (t = i(t)).ordinalMeta = o, n = t.dimsDef, a = t.otherDims, 
                t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null;
            }
            var u = l.get(e);
            if (!1 !== u) {
                if (!(u = bn(u)).length) for (var h = 0; h < (n && n.length || 1); h++) {
                    for (;y < c.length && null != c[y].coordDim; ) y++;
                    y < c.length && u.push(y++);
                }
                d(u, function(i, o) {
                    var l = c[i];
                    if (r(s(l, t), e, o), null == l.name && n) {
                        var u = n[o];
                        !b(u) && (u = {
                            name: u
                        }), l.name = l.displayName = u.name, l.defaultTooltip = u.defaultTooltip;
                    }
                    a && s(l.otherDims, a);
                });
            }
        });
        var _ = n.generateCoord, x = n.generateCoordCount, M = null != x;
        x = _ ? x || 1 : 0;
        for (var S = _ || "value", T = 0; f > T; T++) null == (m = c[T] = c[T] || {}).coordDim && (m.coordDim = Vs(S, h, M), 
        m.coordDimIndex = 0, (!_ || 0 >= x) && (m.isExtraCoord = !0), x--), null == m.name && (m.name = Vs(m.coordDim, u)), 
        null == m.type && ha(e, T, m.name) && (m.type = "ordinal");
        return c;
    }
    function Fs(t, e, n, i) {
        var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);
        return d(e, function(t) {
            var e = t.dimsDef;
            e && (r = Math.max(r, e.length));
        }), r;
    }
    function Vs(t, e, n) {
        if (n || null != e.get(t)) {
            for (var i = 0; null != e.get(t + i); ) i++;
            t += i;
        }
        return e.set(t, !0), t;
    }
    function Ws(t, e, n) {
        var i, r, a, o, s = (n = n || {}).byIndex, l = n.stackedCoordDimension, u = !(!t || !t.get("stack"));
        if (d(e, function(t, n) {
            w(t) && (e[n] = t = {
                name: t
            }), u && !t.isExtraCoord && (s || i || !t.ordinalMeta || (i = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t));
        }), !r || s || i || (s = !0), r) {
            a = "__\0ecstackresult", o = "__\0ecstackedover", i && (i.createInvertedIndices = !0);
            var h = r.coordDim, c = r.type, f = 0;
            d(e, function(t) {
                t.coordDim === h && f++;
            }), e.push({
                name: a,
                coordDim: h,
                coordDimIndex: f,
                type: c,
                isExtraCoord: !0,
                isCalculationCoord: !0
            }), f++, e.push({
                name: o,
                coordDim: o,
                coordDimIndex: f,
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
    function Hs(t, e) {
        return !!e && e === t.getCalculationInfo("stackedDimension");
    }
    function Gs(t, e) {
        return Hs(t, e) ? t.getCalculationInfo("stackResultDimension") : e;
    }
    function qs(t, e, n) {
        n = n || {}, Jr.isInstance(t) || (t = Jr.seriesDataToSource(t));
        var i, r = e.get("coordinateSystem"), a = xa.get(r), o = Qr(e);
        o && (i = p(o.coordSysDims, function(t) {
            var e = {
                name: t
            }, n = o.axisMap.get(t);
            if (n) {
                var i = n.get("type");
                e.type = Ss(i);
            }
            return e;
        })), i || (i = a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || [ "x", "y" ]);
        var s, l, u = hv(t, {
            coordDimensions: i,
            generateCoord: n.generateCoord
        });
        o && d(u, function(t, e) {
            var n = t.coordDim, i = o.categoryAxisMap.get(n);
            i && (null == s && (s = e), t.ordinalMeta = i.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0);
        }), l || null == s || (u[s].otherDims.itemName = 0);
        var h = Ws(e, u), c = new sv(u, e);
        c.setCalculationInfo(h);
        var f = null != s && Xs(t) ? function(t, e, n, i) {
            return i === s ? n : this.defaultDimValueGetter(t, e, n, i);
        } : null;
        return c.hasItemOption = !1, c.initData(t, null, f), c;
    }
    function Xs(t) {
        if (t.sourceFormat === rp) {
            var e = Us(t.data || []);
            return null != e && !_(Sn(e));
        }
    }
    function Us(t) {
        for (var e = 0; e < t.length && null == t[e]; ) e++;
        return t[e];
    }
    function js(t) {
        this._setting = t || {}, this._extent = [ 1 / 0, -1 / 0 ], this._interval = 0, this.init && this.init.apply(this, arguments);
    }
    function Ys(t) {
        this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, 
        this._map;
    }
    function Zs(t) {
        return t._map || (t._map = z(t.categories));
    }
    function $s(t) {
        return b(t) && null != t.value ? t.value : t + "";
    }
    function Qs(t, e, n, i) {
        var r = {}, a = t[1] - t[0], o = r.interval = Nr(a / e, !0);
        null != n && n > o && (o = r.interval = n), null != i && o > i && (o = r.interval = i);
        var s = r.intervalPrecision = Ks(o);
        return tl(r.niceTickExtent = [ pv(Math.ceil(t[0] / o) * o, s), pv(Math.floor(t[1] / o) * o, s) ], t), 
        r;
    }
    function Ks(t) {
        return Ar(t) + 2;
    }
    function Js(t, e, n) {
        t[e] = Math.max(Math.min(t[e], n[1]), n[0]);
    }
    function tl(t, e) {
        !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), Js(t, 0, e), 
        Js(t, 1, e), t[0] > t[1] && (t[0] = t[1]);
    }
    function el(t, e, n, i) {
        var r = [];
        if (!t) return r;
        e[0] < n[0] && r.push(e[0]);
        for (var a = n[0]; a <= n[1] && (r.push(a), (a = pv(a + t, i)) !== r[r.length - 1]); ) if (r.length > 1e4) return [];
        return e[1] > (r.length ? r[r.length - 1] : n[1]) && r.push(e[1]), r;
    }
    function nl(t) {
        return t.get("stack") || mv + t.seriesIndex;
    }
    function il(t) {
        return t.dim + t.index;
    }
    function rl(t, e) {
        var n = [];
        return e.eachSeriesByType(t, function(t) {
            ul(t) && !hl(t) && n.push(t);
        }), n;
    }
    function al(t) {
        var e = {};
        d(t, function(t) {
            var n = t.coordinateSystem.getBaseAxis();
            if ("time" === n.type || "value" === n.type) for (var i = t.getData(), r = n.dim + "_" + n.index, a = i.mapDimension(n.dim), o = 0, s = i.count(); s > o; ++o) {
                var l = i.get(a, o);
                e[r] ? e[r].push(l) : e[r] = [ l ];
            }
        });
        var n = [];
        for (var i in e) if (e.hasOwnProperty(i)) {
            var r = e[i];
            if (r) {
                r.sort(function(t, e) {
                    return t - e;
                });
                for (var a = null, o = 1; o < r.length; ++o) {
                    var s = r[o] - r[o - 1];
                    s > 0 && (a = null === a ? s : Math.min(a, s));
                }
                n[i] = a;
            }
        }
        return n;
    }
    function ol(t) {
        var e = al(t), n = [];
        return d(t, function(t) {
            var i, r = t.coordinateSystem.getBaseAxis(), a = r.getExtent();
            if ("category" === r.type) i = r.getBandWidth(); else if ("value" === r.type || "time" === r.type) {
                var o = r.dim + "_" + r.index, s = e[o], l = Math.abs(a[1] - a[0]), u = r.scale.getExtent(), h = Math.abs(u[1] - u[0]);
                i = s ? l / h * s : l;
            } else {
                var c = t.getData();
                i = Math.abs(a[1] - a[0]) / c.count();
            }
            var f = kr(t.get("barWidth"), i), d = kr(t.get("barMaxWidth"), i), p = kr(t.get("barMinWidth") || 1, i), g = t.get("barGap"), v = t.get("barCategoryGap");
            n.push({
                bandWidth: i,
                barWidth: f,
                barMaxWidth: d,
                barMinWidth: p,
                barGap: g,
                barCategoryGap: v,
                axisKey: il(r),
                stackId: nl(t)
            });
        }), sl(n);
    }
    function sl(t) {
        var e = {};
        d(t, function(t) {
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
            var u = t.barMinWidth;
            u && (a[o].minWidth = u);
            var h = t.barGap;
            null != h && (r.gap = h);
            var c = t.barCategoryGap;
            null != c && (r.categoryGap = c);
        });
        var n = {};
        return d(e, function(t, e) {
            n[e] = {};
            var i = t.stacks, r = t.bandWidth, a = kr(t.categoryGap, r), o = kr(t.gap, 1), s = t.remainedWidth, l = t.autoWidthCount, u = (s - a) / (l + (l - 1) * o);
            u = Math.max(u, 0), d(i, function(t) {
                var e = t.maxWidth, n = t.minWidth;
                if (t.width) {
                    i = t.width;
                    e && (i = Math.min(i, e)), n && (i = Math.max(i, n)), t.width = i, s -= i, l--;
                } else {
                    var i = u;
                    e && i > e && (i = Math.min(e, s)), n && n > i && (i = n), i !== u && (t.width = i, 
                    s -= i, l--);
                }
            }), u = (s - a) / (l + (l - 1) * o), u = Math.max(u, 0);
            var h, c = 0;
            d(i, function(t) {
                t.width || (t.width = u), h = t, c += t.width * (1 + o);
            }), h && (c -= h.width * o);
            var f = -c / 2;
            d(i, function(t, i) {
                n[e][i] = n[e][i] || {
                    bandWidth: r,
                    offset: f,
                    width: t.width
                }, f += t.width * (1 + o);
            });
        }), n;
    }
    function ll(t, e, n) {
        if (t && e) {
            var i = t[il(e)];
            return null != i && null != n && (i = i[nl(n)]), i;
        }
    }
    function ul(t) {
        return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type;
    }
    function hl(t) {
        return t.pipelineContext && t.pipelineContext.large;
    }
    function cl(t, e) {
        return Dv(t, kv(e));
    }
    function fl(t, e) {
        var n, i, r, a = t.type, o = e.getMin(), s = e.getMax(), l = null != o, u = null != s, h = t.getExtent();
        "ordinal" === a ? n = e.getCategories().length : (i = e.get("boundaryGap"), _(i) || (i = [ i || 0, i || 0 ]), 
        "boolean" == typeof i[0] && (i = [ 0, 0 ]), i[0] = kr(i[0], 1), i[1] = kr(i[1], 1), 
        r = h[1] - h[0] || Math.abs(h[0])), null == o && (o = "ordinal" === a ? n ? 0 : NaN : h[0] - i[0] * r), 
        null == s && (s = "ordinal" === a ? n ? n - 1 : NaN : h[1] + i[1] * r), "dataMin" === o ? o = h[0] : "function" == typeof o && (o = o({
            min: h[0],
            max: h[1]
        })), "dataMax" === s ? s = h[1] : "function" == typeof s && (s = s({
            min: h[0],
            max: h[1]
        })), (null == o || !isFinite(o)) && (o = NaN), (null == s || !isFinite(s)) && (s = NaN), 
        t.setBlank(C(o) || C(s) || "ordinal" === a && !t.getOrdinalMeta().categories.length), 
        e.getNeedCrossZero() && (o > 0 && s > 0 && !l && (o = 0), 0 > o && 0 > s && !u && (s = 0));
        var c = e.ecModel;
        if (c && "time" === a) {
            var f, p = rl("bar", c);
            if (d(p, function(t) {
                f |= t.getBaseAxis() === e.axis;
            }), f) {
                var g = ol(p), v = dl(o, s, e, g);
                o = v.min, s = v.max;
            }
        }
        return [ o, s ];
    }
    function dl(t, e, n, i) {
        var r = n.axis.getExtent(), a = r[1] - r[0], o = ll(i, n.axis);
        if (void 0 === o) return {
            min: t,
            max: e
        };
        var s = 1 / 0;
        d(o, function(t) {
            s = Math.min(t.offset, s);
        });
        var l = -1 / 0;
        d(o, function(t) {
            l = Math.max(t.offset + t.width, l);
        }), s = Math.abs(s), l = Math.abs(l);
        var u = s + l, h = e - t, c = h / (1 - (s + l) / a) - h;
        return e += c * (l / u), t -= c * (s / u), {
            min: t,
            max: e
        };
    }
    function pl(t, e) {
        var n = fl(t, e), i = null != e.getMin(), r = null != e.getMax(), a = e.get("splitNumber");
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
            return new dv(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [ 1 / 0, -1 / 0 ]);

          case "value":
            return new vv();

          default:
            return (js.getClass(e) || vv).create(t);
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
            var s, l = t.getLabelModel(), u = ml(t), h = 1;
            r > 40 && (h = Math.ceil(r / 40));
            for (var c = 0; r > c; c += h) {
                var f = u(i ? i[c] : o[0] + c), d = xl(l.getTextRect(f), l.get("rotate") || 0);
                s ? s.union(d) : s = d;
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
        return l = 0 === t.indexOf("image://") ? Fi(t.slice(8), new oe(e, n, i, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? Ni(t.slice(7), {}, new oe(e, n, i, r), o ? "center" : "cover") : new Hv({
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
        return Math.abs(t - e) < Xv;
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
    function kl(t) {
        if (!t.UTF8Encoding) return t;
        var e = t.UTF8Scale;
        null == e && (e = 1024);
        for (var n = t.features, i = 0; i < n.length; i++) for (var r = n[i].geometry, a = r.coordinates, o = r.encodeOffsets, s = 0; s < a.length; s++) {
            var l = a[s];
            if ("Polygon" === r.type) a[s] = Dl(l, o[s], e); else if ("MultiPolygon" === r.type) for (var u = 0; u < l.length; u++) {
                var h = l[u];
                l[u] = Dl(h, o[s][u], e);
            }
        }
        return t.UTF8Encoding = !1, t;
    }
    function Dl(t, e, n) {
        for (var i = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {
            var s = t.charCodeAt(o) - 64, l = t.charCodeAt(o + 1) - 64;
            s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), r = s += r, a = l += a, i.push([ s / n, l / n ]);
        }
        return i;
    }
    function Al(t) {
        return "category" === t.type ? Pl(t) : Bl(t);
    }
    function Ll(t, e) {
        return "category" === t.type ? El(t, e) : {
            ticks: t.scale.getTicks()
        };
    }
    function Pl(t) {
        var e = t.getLabelModel(), n = Ol(t, e);
        return !e.get("show") || t.scale.isBlank() ? {
            labels: [],
            labelCategoryInterval: n.labelCategoryInterval
        } : n;
    }
    function Ol(t, e) {
        var n = Rl(t, "labels"), i = wl(e), r = zl(n, i);
        if (r) return r;
        var a, o;
        return x(i) ? a = Gl(t, i) : (o = "auto" === i ? Fl(t) : i, a = Hl(t, o)), Nl(n, i, {
            labels: a,
            labelCategoryInterval: o
        });
    }
    function El(t, e) {
        var n = Rl(t, "ticks"), i = wl(e), r = zl(n, i);
        if (r) return r;
        var a, o;
        if ((!e.get("show") || t.scale.isBlank()) && (a = []), x(i)) a = Gl(t, i, !0); else if ("auto" === i) {
            var s = Ol(t, t.getLabelModel());
            o = s.labelCategoryInterval, a = p(s.labels, function(t) {
                return t.tickValue;
            });
        } else o = i, a = Hl(t, o, !0);
        return Nl(n, i, {
            ticks: a,
            tickCategoryInterval: o
        });
    }
    function Bl(t) {
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
        return jv(t)[e] || (jv(t)[e] = []);
    }
    function zl(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n].key === e) return t[n].value;
    }
    function Nl(t, e, n) {
        return t.push({
            key: e,
            value: n
        }), n;
    }
    function Fl(t) {
        var e = jv(t).autoInterval;
        return null != e ? e : jv(t).autoInterval = t.calculateCategoryInterval();
    }
    function Vl(t) {
        var e = Wl(t), n = ml(t), i = (e.axisRotate - e.labelRotate) / 180 * Math.PI, r = t.scale, a = r.getExtent(), o = r.count();
        if (a[1] - a[0] < 1) return 0;
        var s = 1;
        o > 40 && (s = Math.max(1, Math.floor(o / 40)));
        for (var l = a[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), h = Math.abs(u * Math.cos(i)), c = Math.abs(u * Math.sin(i)), f = 0, d = 0; l <= a[1]; l += s) {
            var p = 0, g = 0, v = Te(n(l), e.font, "center", "top");
            p = 1.3 * v.width, g = 1.3 * v.height, f = Math.max(f, p, 7), d = Math.max(d, g, 7);
        }
        var m = f / h, y = d / c;
        isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);
        var _ = Math.max(0, Math.floor(Math.min(m, y))), x = jv(t.model), w = t.getExtent(), b = x.lastAutoInterval, M = x.lastTickCount;
        return null != b && null != M && Math.abs(b - _) <= 1 && Math.abs(M - o) <= 1 && b > _ && x.axisExtend0 === w[0] && x.axisExtend1 === w[1] ? _ = b : (x.lastTickCount = o, 
        x.lastAutoInterval = _, x.axisExtend0 = w[0], x.axisExtend1 = w[1]), _;
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
        var r = ml(t), a = t.scale, o = a.getExtent(), s = t.getLabelModel(), l = [], u = Math.max((e || 0) + 1, 1), h = o[0], c = a.count();
        0 !== h && u > 1 && c / u > 2 && (h = Math.round(Math.ceil(h / u) * u));
        var f = bl(t), d = s.get("showMinLabel") || f, p = s.get("showMaxLabel") || f;
        d && h !== o[0] && i(o[0]);
        for (var g = h; g <= o[1]; g += u) i(g);
        return p && g - u !== o[1] && i(o[1]), l;
    }
    function Gl(t, e, n) {
        var i = t.scale, r = ml(t), a = [];
        return d(i.getTicks(), function(t) {
            var o = i.getLabel(t);
            e(t, o) && a.push(n ? t : {
                formattedLabel: r(t),
                rawLabel: o,
                tickValue: t
            });
        }), a;
    }
    function ql(t, e) {
        var n = (t[1] - t[0]) / e / 2;
        t[0] += n, t[1] -= n;
    }
    function Xl(t, e, n, i) {
        function r(t, e) {
            return t = Dr(t), e = Dr(e), c ? t > e : e > t;
        }
        var a = e.length;
        if (t.onBand && !n && a) {
            var o, s, l = t.getExtent();
            if (1 === a) e[0].coord = l[0], o = e[1] = {
                coord: l[0]
            }; else {
                var u = e[a - 1].tickValue - e[0].tickValue, h = (e[a - 1].coord - e[0].coord) / u;
                d(e, function(t) {
                    t.coord -= h / 2;
                }), s = 1 + t.scale.getExtent()[1] - e[a - 1].tickValue, o = {
                    coord: e[a - 1].coord + h * s
                }, e.push(o);
            }
            var c = l[0] > l[1];
            r(e[0].coord, l[0]) && (i ? e[0].coord = l[0] : e.shift()), i && r(l[0], e[0].coord) && e.unshift({
                coord: l[0]
            }), r(l[1], o.coord) && (i ? o.coord = l[1] : e.pop()), i && r(o.coord, l[1]) && e.push({
                coord: l[1]
            });
        }
    }
    function Ul(t, e, n, i) {
        var r = e.getData(), a = this.dataIndex, o = r.getName(a), s = e.get("selectedOffset");
        i.dispatchAction({
            type: "pieToggleSelect",
            from: t,
            name: o,
            seriesId: e.id
        }), r.each(function(t) {
            jl(r.getItemGraphicEl(t), r.getItemLayout(t), e.isSelected(r.getName(t)), s, n);
        });
    }
    function jl(t, e, n, i, r) {
        var a = (e.startAngle + e.endAngle) / 2, o = Math.cos(a), s = Math.sin(a), l = n ? i : 0, u = [ o * l, s * l ];
        r ? t.animate().when(200, {
            position: u
        }).start("bounceOut") : t.attr("position", u);
    }
    function Yl(t, e) {
        Nh.call(this);
        var n = new Qf({
            z2: 2
        }), i = new nd(), r = new Yf();
        this.add(n), this.add(i), this.add(r), this.updateData(t, e, !0);
    }
    function Zl(t, e, n, i, r, a, o) {
        function s(e, n) {
            for (var i = e; i >= 0 && (t[i].y -= n, !(i > 0 && t[i].y > t[i - 1].y + t[i - 1].height)); i--) ;
        }
        function l(t, e, n, i, r, a) {
            for (var o = e ? Number.MAX_VALUE : 0, s = 0, l = t.length; l > s; s++) {
                var u = Math.abs(t[s].y - i), h = t[s].len, c = t[s].len2, f = r + h > u ? Math.sqrt((r + h + c) * (r + h + c) - u * u) : Math.abs(t[s].x - n);
                e && f >= o && (f = o - 10), !e && o >= f && (f = o + 10), t[s].x = n + f * a, o = f;
            }
        }
        t.sort(function(t, e) {
            return t.y - e.y;
        });
        for (var u, h = 0, c = t.length, f = [], d = [], p = 0; c > p; p++) 0 > (u = t[p].y - h) && function(e, n, i) {
            for (var r = e; n > r; r++) if (t[r].y += i, r > e && n > r + 1 && t[r + 1].y > t[r].y + t[r].height) return void s(r, i / 2);
            s(n - 1, i / 2);
        }(p, c, -u), h = t[p].y + t[p].height;
        0 > o - h && s(c - 1, h - o);
        for (p = 0; c > p; p++) t[p].y >= n ? d.push(t[p]) : f.push(t[p]);
        l(f, !1, e, n, i, r), l(d, !0, e, n, i, r);
    }
    function $l(t, e, n, i, r, a) {
        for (var o = [], s = [], l = 0; l < t.length; l++) Ql(t[l]) || (t[l].x < e ? o.push(t[l]) : s.push(t[l]));
        Zl(s, e, n, i, 1, r, a), Zl(o, e, n, i, -1, r, a);
        for (l = 0; l < t.length; l++) if (!Ql(t[l])) {
            var u = t[l].linePoints;
            if (u) {
                var h = u[1][0] - u[2][0];
                u[2][0] = t[l].x < e ? t[l].x + 3 : t[l].x - 3, u[1][1] = u[2][1] = t[l].y, u[1][0] = u[2][0] + h;
            }
        }
    }
    function Ql(t) {
        return "center" === t.position;
    }
    function Kl(t) {
        return this._axes[t];
    }
    function Jl(t) {
        lm.call(this, t);
    }
    function tu(t, e) {
        return e.type || (e.data ? "category" : "value");
    }
    function eu(t, e) {
        return t.getCoordSysModel() === e;
    }
    function nu(t, e, n) {
        this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], 
        this._initCartesian(t, e, n), this.model = t;
    }
    function iu(t, e, n, i) {
        function r(t) {
            return t.dim + "_" + t.index;
        }
        n.getAxesOnZeroOf = function() {
            return a ? [ a ] : [];
        };
        var a, o = t[e], s = n.model, l = s.get("axisLine.onZero"), u = s.get("axisLine.onZeroAxisIndex");
        if (l) {
            if (null != u) ru(o[u]) && (a = o[u]); else for (var h in o) if (o.hasOwnProperty(h) && ru(o[h]) && !i[r(o[h])]) {
                a = o[h];
                break;
            }
            a && (i[r(a)] = !0);
        }
    }
    function ru(t) {
        return t && "category" !== t.type && "time" !== t.type && vl(t);
    }
    function au(t, e) {
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
    function ou(t) {
        return p(mm, function(e) {
            return t.getReferringComponents(e)[0];
        });
    }
    function su(t) {
        return "cartesian2d" === t.get("coordinateSystem");
    }
    function lu(t, e, n, i) {
        var r, a, o = Or(n - t.rotation), s = i[0] > i[1], l = "start" === e && !s || "start" !== e && s;
        return Er(o - ym / 2) ? (a = l ? "bottom" : "top", r = "center") : Er(o - 1.5 * ym) ? (a = l ? "top" : "bottom", 
        r = "center") : (a = "middle", r = 1.5 * ym > o && o > ym / 2 ? l ? "left" : "right" : l ? "right" : "left"), 
        {
            rotation: o,
            textAlign: r,
            textVerticalAlign: a
        };
    }
    function uu(t, e, n) {
        if (!bl(t.axis)) {
            var i = t.get("axisLabel.showMinLabel"), r = t.get("axisLabel.showMaxLabel");
            e = e || [], n = n || [];
            var a = e[0], o = e[1], s = e[e.length - 1], l = e[e.length - 2], u = n[0], h = n[1], c = n[n.length - 1], f = n[n.length - 2];
            !1 === i ? (hu(a), hu(u)) : cu(a, o) && (i ? (hu(o), hu(h)) : (hu(a), hu(u))), !1 === r ? (hu(s), 
            hu(c)) : cu(l, s) && (r ? (hu(l), hu(f)) : (hu(s), hu(c)));
        }
    }
    function hu(t) {
        t && (t.ignore = !0);
    }
    function cu(t, e) {
        var n = t && t.getBoundingRect().clone(), i = e && e.getBoundingRect().clone();
        if (n && i) {
            var r = yt([]);
            return bt(r, r, -t.rotation), n.applyTransform(xt([], r, t.getLocalTransform())), 
            i.applyTransform(xt([], r, e.getLocalTransform())), n.intersect(i);
        }
    }
    function fu(t) {
        return "middle" === t || "center" === t;
    }
    function du(t, e, n) {
        var i = e.axis;
        if (e.get("axisTick.show") && !i.scale.isBlank()) {
            for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), l = i.getTicksCoords(), u = [], h = [], c = t._transform, f = [], d = 0; d < l.length; d++) {
                var p = l[d].coord;
                u[0] = p, u[1] = 0, h[0] = p, h[1] = n.tickDirection * o, c && (Z(u, u, c), Z(h, h, c));
                var g = new sd({
                    anid: "tick_" + l[d].tickValue,
                    subPixelOptimize: !0,
                    shape: {
                        x1: u[0],
                        y1: u[1],
                        x2: h[0],
                        y2: h[1]
                    },
                    style: s(a.getLineStyle(), {
                        stroke: e.get("axisLine.lineStyle.color")
                    }),
                    z2: 2,
                    silent: !0
                });
                t.group.add(g), f.push(g);
            }
            return f;
        }
    }
    function pu(t, e, n) {
        var i = e.axis;
        if (I(n.axisLabelShow, e.get("axisLabel.show")) && !i.scale.isBlank()) {
            var r = e.getModel("axisLabel"), a = r.get("margin"), o = i.getViewLabels(), s = (I(n.labelRotate, r.get("rotate")) || 0) * ym / 180, l = bm(n.rotation, s, n.labelDirection), u = e.getCategories && e.getCategories(!0), h = [], c = Mm(e), f = e.get("triggerEvent");
            return d(o, function(o, s) {
                var d = o.tickValue, p = o.formattedLabel, g = o.rawLabel, v = r;
                u && u[d] && u[d].textStyle && (v = new br(u[d].textStyle, r, e.ecModel));
                var m = v.getTextColor() || e.get("axisLine.lineStyle.color"), y = [ i.dataToCoord(d), n.labelOffset + n.labelDirection * a ], _ = new Yf({
                    anid: "label_" + d,
                    position: y,
                    rotation: l.rotation,
                    silent: c,
                    z2: 10
                });
                or(_.style, v, {
                    text: p,
                    textAlign: v.getShallow("align", !0) || l.textAlign,
                    textVerticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || l.textVerticalAlign,
                    textFill: "function" == typeof m ? m("category" === i.type ? g : "value" === i.type ? d + "" : d, s) : m
                }), f && (_.eventData = wm(e), _.eventData.targetType = "axisLabel", _.eventData.value = g), 
                t._dumbGroup.add(_), _.updateTransform(), h.push(_), t.group.add(_), _.decomposeTransform();
            }), h;
        }
    }
    function gu(t) {
        var e = vu(t);
        if (e) {
            var n = e.axisPointerModel, i = e.axis.scale, r = n.option, a = n.get("status"), o = n.get("value");
            null != o && (o = i.parse(o));
            var s = yu(n);
            null == a && (r.status = s ? "show" : "hide");
            var l = i.getExtent().slice();
            l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), 
            r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show");
        }
    }
    function vu(t) {
        var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
        return e && e.axesInfo[_u(t)];
    }
    function mu(t) {
        var e = vu(t);
        return e && e.axisPointerModel;
    }
    function yu(t) {
        return !!t.get("handle.show");
    }
    function _u(t) {
        return t.type + "||" + t.id;
    }
    function xu(t, e, n, i, r, a) {
        var o = Sm.getAxisPointerClass(t.axisPointerClass);
        if (o) {
            var s = mu(e);
            s ? (t._axisPointer || (t._axisPointer = new o())).render(e, s, i, a) : wu(t, i);
        }
    }
    function wu(t, e, n) {
        var i = t._axisPointer;
        i && i.dispose(e, n), t._axisPointer = null;
    }
    function bu(t, e, n) {
        n = n || {};
        var i = t.coordinateSystem, r = e.axis, a = {}, o = r.getAxesOnZeroOf()[0], s = r.position, l = o ? "onZero" : s, u = r.dim, h = i.getRect(), c = [ h.x, h.x + h.width, h.y, h.y + h.height ], f = {
            left: 0,
            right: 1,
            top: 0,
            bottom: 1,
            onZero: 2
        }, d = e.get("offset") || 0, p = "x" === u ? [ c[2] - d, c[3] + d ] : [ c[0] - d, c[1] + d ];
        if (o) {
            var g = o.toGlobalCoord(o.dataToCoord(0));
            p[f.onZero] = Math.max(Math.min(g, p[1]), p[0]);
        }
        a.position = [ "y" === u ? p[f[l]] : c[0], "x" === u ? p[f[l]] : c[3] ], a.rotation = Math.PI / 2 * ("x" === u ? 0 : 1);
        var v = {
            top: -1,
            bottom: 1,
            left: -1,
            right: 1
        };
        a.labelDirection = a.tickDirection = a.nameDirection = v[s], a.labelOffset = o ? p[f[s]] - p[f.onZero] : 0, 
        e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection), I(n.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);
        var m = e.get("axisLabel.rotate");
        return a.labelRotate = "top" === l ? -m : m, a.z2 = 1, a;
    }
    var Mu = 2311, Su = function() {
        return Mu++;
    }, Tu = {}, Cu = Tu = "object" == ("undefined" == typeof wx ? "undefined" : t(wx)) && "function" == typeof wx.getSystemInfoSync ? {
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
    }(navigator.userAgent), Iu = {
        "[object Function]": 1,
        "[object RegExp]": 1,
        "[object Date]": 1,
        "[object Error]": 1,
        "[object CanvasGradient]": 1,
        "[object CanvasPattern]": 1,
        "[object Image]": 1,
        "[object Canvas]": 1
    }, ku = {
        "[object Int8Array]": 1,
        "[object Uint8Array]": 1,
        "[object Uint8ClampedArray]": 1,
        "[object Int16Array]": 1,
        "[object Uint16Array]": 1,
        "[object Int32Array]": 1,
        "[object Uint32Array]": 1,
        "[object Float32Array]": 1,
        "[object Float64Array]": 1
    }, Du = Object.prototype.toString, Au = Array.prototype, Lu = Au.forEach, Pu = Au.filter, Ou = Au.slice, Eu = Au.map, Bu = Au.reduce, Ru = {}, zu = function() {
        return Ru.createCanvas();
    };
    Ru.createCanvas = function() {
        return document.createElement("canvas");
    };
    var Nu, Fu = "__ec_primitive__";
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
    var Vu = (Object.freeze || Object)({
        $override: n,
        clone: i,
        merge: r,
        mergeAll: a,
        extend: o,
        defaults: s,
        createCanvas: zu,
        getContext: l,
        indexOf: u,
        inherits: h,
        mixin: c,
        isArrayLike: f,
        each: d,
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
        retrieve2: k,
        retrieve3: D,
        slice: A,
        normalizeCssArray: L,
        assert: P,
        trim: O,
        setAsPrimitive: E,
        isPrimitive: B,
        createHashMap: z,
        concatArray: function(t, e) {
            for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
            var r = t.length;
            for (i = 0; i < e.length; i++) n[i + r] = e[i];
            return n;
        },
        noop: N
    }), Wu = "undefined" == typeof Float32Array ? Array : Float32Array, Hu = G, Gu = q, qu = j, Xu = Y, Uu = (Object.freeze || Object)({
        create: F,
        copy: function(t, e) {
            return t[0] = e[0], t[1] = e[1], t;
        },
        clone: V,
        set: function(t, e, n) {
            return t[0] = e, t[1] = n, t;
        },
        add: W,
        scaleAndAdd: function(t, e, n, i) {
            return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t;
        },
        sub: H,
        len: G,
        length: Hu,
        lenSquare: q,
        lengthSquare: Gu,
        mul: function(t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t;
        },
        div: function(t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t;
        },
        dot: function(t, e) {
            return t[0] * e[0] + t[1] * e[1];
        },
        scale: X,
        normalize: U,
        distance: j,
        dist: qu,
        distanceSquare: Y,
        distSquare: Xu,
        negate: function(t, e) {
            return t[0] = -e[0], t[1] = -e[1], t;
        },
        lerp: function(t, e, n, i) {
            return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t;
        },
        applyTransform: Z,
        min: $,
        max: Q
    });
    K.prototype = {
        constructor: K,
        _dragStart: function(t) {
            var e = t.target;
            e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, 
            this._y = t.offsetY, this.dispatchToElement(J(e, t), "dragstart", t.event));
        },
        _drag: function(t) {
            var e = this._draggingTarget;
            if (e) {
                var n = t.offsetX, i = t.offsetY, r = n - this._x, a = i - this._y;
                this._x = n, this._y = i, e.drift(r, a, t), this.dispatchToElement(J(e, t), "drag", t.event);
                var o = this.findHover(n, i, e).target, s = this._dropTarget;
                this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(J(s, t), "dragleave", t.event), 
                o && o !== s && this.dispatchToElement(J(o, t), "dragenter", t.event));
            }
        },
        _dragEnd: function(t) {
            var e = this._draggingTarget;
            e && (e.dragging = !1), this.dispatchToElement(J(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(J(this._dropTarget, t), "drop", t.event), 
            this._draggingTarget = null, this._dropTarget = null;
        }
    };
    var ju = Array.prototype.slice, Yu = function(t) {
        this._$handlers = {}, this._$eventProcessor = t;
    };
    Yu.prototype = {
        constructor: Yu,
        one: function(t, e, n, i) {
            return et(this, t, e, n, i, !0);
        },
        on: function(t, e, n, i) {
            return et(this, t, e, n, i, !1);
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
                r > 3 && (i = ju.call(i, 1));
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
                r > 4 && (i = ju.call(i, 1, i.length - 1));
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
    var Zu = Math.log(2), $u = "undefined" != typeof window && !!window.addEventListener, Qu = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ku = "___zrEVENTSAVED", Ju = [], th = $u ? function(t) {
        t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;
    } : function(t) {
        t.returnValue = !1, t.cancelBubble = !0;
    }, eh = function() {
        this._track = [];
    };
    eh.prototype = {
        constructor: eh,
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
                    var s = i[a], l = rt(n, s, {});
                    r.points.push([ l.zrX, l.zrY ]), r.touches.push(s);
                }
                this._track.push(r);
            }
        },
        _recognize: function(t) {
            for (var e in nh) if (nh.hasOwnProperty(e)) {
                var n = nh[e](this._track, t);
                if (n) return n;
            }
        }
    };
    var nh = {
        pinch: function(t, e) {
            var n = t.length;
            if (n) {
                var i = (t[n - 1] || {}).points, r = (t[n - 2] || {}).points || i;
                if (r && r.length > 1 && i && i.length > 1) {
                    var a = ct(i) / ct(r);
                    !isFinite(a) && (a = 1), e.pinchScale = a;
                    var o = ft(i);
                    return e.pinchX = o[0], e.pinchY = o[1], {
                        type: "pinch",
                        target: t[0].target,
                        event: e
                    };
                }
            }
        }
    }, ih = "silent";
    gt.prototype.dispose = function() {};
    var rh = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], ah = function(t, e, n, i) {
        Yu.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new gt(), 
        this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, 
        this._gestureMgr, K.call(this), this.setHandlerProxy(n);
    };
    ah.prototype = {
        constructor: ah,
        setHandlerProxy: function(t) {
            this.proxy && this.proxy.dispose(), t && (d(rh, function(e) {
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
                for (var r = "on" + e, a = dt(e, t, n); i && (i[r] && (a.cancelBubble = i[r].call(i, a)), 
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
                o !== ih)) {
                    r.target = i[a];
                    break;
                }
            }
            return r;
        },
        processGesture: function(t, e) {
            this._gestureMgr || (this._gestureMgr = new eh());
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
    }, d([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(t) {
        ah.prototype[t] = function(e) {
            var n = this.findHover(e.zrX, e.zrY), i = n.target;
            if ("mousedown" === t) this._downEl = i, this._downPoint = [ e.zrX, e.zrY ], this._upEl = i; else if ("mouseup" === t) this._upEl = i; else if ("click" === t) {
                if (this._downEl !== this._upEl || !this._downPoint || qu(this._downPoint, [ e.zrX, e.zrY ]) > 4) return;
                this._downPoint = null;
            }
            this.dispatchToElement(n, t, e);
        };
    }), c(ah, Yu), c(ah, K);
    var oh = "undefined" == typeof Float32Array ? Array : Float32Array, sh = (Object.freeze || Object)({
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
    }), lh = yt, uh = 5e-5, hh = function(t) {
        (t = t || {}).position || (this.position = [ 0, 0 ]), null == t.rotation && (this.rotation = 0), 
        t.scale || (this.scale = [ 1, 1 ]), this.origin = this.origin || null;
    }, ch = hh.prototype;
    ch.transform = null, ch.needLocalTransform = function() {
        return Tt(this.rotation) || Tt(this.position[0]) || Tt(this.position[1]) || Tt(this.scale[0] - 1) || Tt(this.scale[1] - 1);
    };
    var fh = [];
    ch.updateTransform = function() {
        var t = this.parent, e = t && t.transform, n = this.needLocalTransform(), i = this.transform;
        if (n || e) {
            i = i || mt(), n ? this.getLocalTransform(i) : lh(i), e && (n ? xt(i, t.transform, i) : _t(i, t.transform)), 
            this.transform = i;
            var r = this.globalScaleRatio;
            if (null != r && 1 !== r) {
                this.getGlobalScale(fh);
                var a = fh[0] < 0 ? -1 : 1, o = fh[1] < 0 ? -1 : 1, s = ((fh[0] - a) * r + a) / fh[0] || 0, l = ((fh[1] - o) * r + o) / fh[1] || 0;
                i[0] *= s, i[1] *= s, i[2] *= l, i[3] *= l;
            }
            this.invTransform = this.invTransform || mt(), St(this.invTransform, i);
        } else i && lh(i);
    }, ch.getLocalTransform = function(t) {
        return hh.getLocalTransform(this, t);
    }, ch.setTransform = function(t) {
        var e = this.transform, n = t.dpr || 1;
        e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0);
    }, ch.restoreTransform = function(t) {
        var e = t.dpr || 1;
        t.setTransform(e, 0, 0, e, 0, 0);
    };
    var dh = [], ph = mt();
    ch.setLocalTransform = function(t) {
        if (t) {
            var e = t[0] * t[0] + t[1] * t[1], n = t[2] * t[2] + t[3] * t[3], i = this.position, r = this.scale;
            Tt(e - 1) && (e = Math.sqrt(e)), Tt(n - 1) && (n = Math.sqrt(n)), t[0] < 0 && (e = -e), 
            t[3] < 0 && (n = -n), i[0] = t[4], i[1] = t[5], r[0] = e, r[1] = n, this.rotation = Math.atan2(-t[1] / n, t[0] / e);
        }
    }, ch.decomposeTransform = function() {
        if (this.transform) {
            var t = this.parent, e = this.transform;
            t && t.transform && (xt(dh, t.invTransform, e), e = dh);
            var n = this.origin;
            n && (n[0] || n[1]) && (ph[4] = n[0], ph[5] = n[1], xt(dh, e, ph), dh[4] -= n[0], 
            dh[5] -= n[1], e = dh), this.setLocalTransform(e);
        }
    }, ch.getGlobalScale = function(t) {
        var e = this.transform;
        return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), 
        e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, 
        t);
    }, ch.transformCoordToLocal = function(t, e) {
        var n = [ t, e ], i = this.invTransform;
        return i && Z(n, n, i), n;
    }, ch.transformCoordToGlobal = function(t, e) {
        var n = [ t, e ], i = this.transform;
        return i && Z(n, n, i), n;
    }, hh.getLocalTransform = function(t, e) {
        lh(e = e || []);
        var n = t.origin, i = t.scale || [ 1, 1 ], r = t.rotation || 0, a = t.position || [ 0, 0 ];
        return n && (e[4] -= n[0], e[5] -= n[1]), Mt(e, e, i), r && bt(e, e, r), n && (e[4] += n[0], 
        e[5] += n[1]), e[4] += a[0], e[5] += a[1], e;
    };
    var gh = {
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
            return 1 - gh.bounceOut(1 - t);
        },
        bounceOut: function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
        bounceInOut: function(t) {
            return .5 > t ? .5 * gh.bounceIn(2 * t) : .5 * gh.bounceOut(2 * t - 1) + .5;
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
                    var i = this.easing, r = "string" == typeof i ? gh[i] : i, a = "function" == typeof r ? r(n) : n;
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
    var vh = function() {
        this.head = null, this.tail = null, this._len = 0;
    }, mh = vh.prototype;
    mh.insert = function(t) {
        var e = new yh(t);
        return this.insertEntry(e), e;
    }, mh.insertEntry = function(t) {
        this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, 
        this._len++;
    }, mh.remove = function(t) {
        var e = t.prev, n = t.next;
        e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, 
        this._len--;
    }, mh.len = function() {
        return this._len;
    }, mh.clear = function() {
        this.head = this.tail = null, this._len = 0;
    };
    var yh = function(t) {
        this.value = t, this.next, this.prev;
    }, _h = function(t) {
        this._list = new vh(), this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null;
    }, xh = _h.prototype;
    xh.put = function(t, e) {
        var n = this._list, i = this._map, r = null;
        if (null == i[t]) {
            var a = n.len(), o = this._lastRemovedEntry;
            if (a >= this._maxSize && a > 0) {
                var s = n.head;
                n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s;
            }
            o ? o.value = e : o = new yh(e), o.key = t, n.insertEntry(o), i[t] = o;
        }
        return r;
    }, xh.get = function(t) {
        var e = this._map[t], n = this._list;
        return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0;
    }, xh.clear = function() {
        this._list.clear(), this._map = {};
    };
    var wh = {
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
    }, bh = new _h(20), Mh = null, Sh = Wt, Th = Ht, Ch = (Object.freeze || Object)({
        parse: zt,
        lift: Vt,
        toHex: function(t) {
            var e = zt(t);
            return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;
        },
        fastLerp: Wt,
        fastMapToColor: Sh,
        lerp: Ht,
        mapToColor: Th,
        modifyHSL: function(t, e, n, i) {
            return (t = zt(t)) ? (t = Ft(t), null != e && (t[0] = kt(e)), null != n && (t[1] = Lt(n)), 
            null != i && (t[2] = Lt(i)), Gt(Nt(t), "rgba")) : void 0;
        },
        modifyAlpha: function(t, e) {
            return (t = zt(t)) && null != e ? (t[3] = Dt(e), Gt(t, "rgba")) : void 0;
        },
        stringify: Gt
    }), Ih = Array.prototype.slice, kh = function(t, e, n, i) {
        this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || qt, 
        this._setter = i || Xt, this._clipCount = 0, this._delay = 0, this._doneList = [], 
        this._onframeList = [], this._clipList = [];
    };
    kh.prototype = {
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
    var Dh = 1;
    "undefined" != typeof window && (Dh = Math.max(window.devicePixelRatio || 1, 1));
    var Ah = Dh, Lh = function() {}, Ph = Lh, Oh = function() {
        this.animators = [];
    };
    Oh.prototype = {
        constructor: Oh,
        animate: function(t, e) {
            var n, i = !1, r = this, a = this.__zr;
            if (t) {
                var o = t.split("."), s = r;
                i = "shape" === o[0];
                for (var l = 0, h = o.length; h > l; l++) s && (s = s[o[l]]);
                s && (n = s);
            } else n = r;
            {
                if (n) {
                    var c = r.animators, f = new kh(n, e);
                    return f.during(function() {
                        r.dirty(i);
                    }).done(function() {
                        c.splice(u(c, f), 1);
                    }), c.push(f), a && a.animation.addAnimator(f), f;
                }
                Ph('Property "' + t + '" is not existed in element ' + r.id);
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
    var Eh = function(t) {
        hh.call(this, t), Yu.call(this, t), Oh.call(this, t), this.id = t.id || Su();
    };
    Eh.prototype = {
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
    }, c(Eh, Oh), c(Eh, hh), c(Eh, Yu);
    var Bh = Z, Rh = Math.min, zh = Math.max;
    oe.prototype = {
        constructor: oe,
        union: function(t) {
            var e = Rh(t.x, this.x), n = Rh(t.y, this.y);
            this.width = zh(t.x + t.width, this.x + this.width) - e, this.height = zh(t.y + t.height, this.y + this.height) - n, 
            this.x = e, this.y = n;
        },
        applyTransform: function() {
            var t = [], e = [], n = [], i = [];
            return function(r) {
                if (r) {
                    t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, 
                    Bh(t, t, r), Bh(e, e, r), Bh(n, n, r), Bh(i, i, r), this.x = Rh(t[0], e[0], n[0], i[0]), 
                    this.y = Rh(t[1], e[1], n[1], i[1]);
                    var a = zh(t[0], e[0], n[0], i[0]), o = zh(t[1], e[1], n[1], i[1]);
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
            var e = this, n = e.x, i = e.x + e.width, r = e.y, a = e.y + e.height, o = t.x, s = t.x + t.width, l = t.y, u = t.y + t.height;
            return !(o > i || n > s || l > a || r > u);
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
    var Nh = function(t) {
        t = t || {}, Eh.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
        this._children = [], this.__storage = null, this.__dirty = !0;
    };
    Nh.prototype = {
        constructor: Nh,
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
            e && e !== t.__storage && (e.addToStorage(t), t instanceof Nh && t.addChildrenToStorage(e)), 
            n && n.refresh();
        },
        remove: function(t) {
            var e = this.__zr, n = this.__storage, i = this._children, r = u(i, t);
            return 0 > r ? this : (i.splice(r, 1), t.parent = null, n && (n.delFromStorage(t), 
            t instanceof Nh && t.delChildrenFromStorage(n)), e && e.refresh(), this);
        },
        removeAll: function() {
            var t, e, n = this._children, i = this.__storage;
            for (e = 0; e < n.length; e++) t = n[e], i && (i.delFromStorage(t), t instanceof Nh && t.delChildrenFromStorage(i)), 
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
                t.addToStorage(n), n instanceof Nh && n.addChildrenToStorage(t);
            }
        },
        delChildrenFromStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                t.delFromStorage(n), n instanceof Nh && n.delChildrenFromStorage(t);
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
    }, h(Nh, Eh);
    var Fh = 32, Vh = 7, Wh = function() {
        this._roots = [], this._displayList = [], this._displayListLen = 0;
    };
    Wh.prototype = {
        constructor: Wh,
        traverse: function(t, e) {
            for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e);
        },
        getDisplayList: function(t, e) {
            return e = e || !1, t && this.updateDisplayList(e), this._displayList;
        },
        updateDisplayList: function(t) {
            this._displayListLen = 0;
            for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++) this._updateAndAddDisplayable(e[i], null, t);
            n.length = this._displayListLen, Cu.canvasSupported && pe(n, ge);
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
            t.__storage !== this && (t instanceof Nh && t.addChildrenToStorage(this), this.addToStorage(t), 
            this._roots.push(t));
        },
        delRoot: function(t) {
            if (null == t) {
                for (n = 0; n < this._roots.length; n++) {
                    var e = this._roots[n];
                    e instanceof Nh && e.delChildrenFromStorage(this);
                }
                return this._roots = [], this._displayList = [], void (this._displayListLen = 0);
            }
            if (t instanceof Array) for (var n = 0, i = t.length; i > n; n++) this.delRoot(t[n]); else {
                var r = u(this._roots, t);
                r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof Nh && t.delChildrenFromStorage(this));
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
    var Hh = {
        shadowBlur: 1,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        textShadowBlur: 1,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
        textBoxShadowBlur: 1,
        textBoxShadowOffsetX: 1,
        textBoxShadowOffsetY: 1
    }, Gh = function(t, e, n) {
        return Hh.hasOwnProperty(e) ? n *= t.dpr : n;
    }, qh = {
        NONE: 0,
        STYLE_BIND: 1,
        PLAIN_TEXT: 2
    }, Xh = 9, Uh = [ [ "shadowBlur", 0 ], [ "shadowOffsetX", 0 ], [ "shadowOffsetY", 0 ], [ "shadowColor", "#000" ], [ "lineCap", "butt" ], [ "lineJoin", "miter" ], [ "miterLimit", 10 ] ], jh = function(t) {
        this.extendFrom(t, !1);
    };
    jh.prototype = {
        constructor: jh,
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
            var i = this, r = n && n.style, a = !r || t.__attrCachedBy !== qh.STYLE_BIND;
            t.__attrCachedBy = qh.STYLE_BIND;
            for (var o = 0; o < Uh.length; o++) {
                var s = Uh[o], l = s[0];
                (a || i[l] !== r[l]) && (t[l] = Gh(t, l, i[l] || s[1]));
            }
            if ((a || i.fill !== r.fill) && (t.fillStyle = i.fill), (a || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), 
            (a || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), 
            (a || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), 
            this.hasStroke()) {
                var u = i.lineWidth;
                t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);
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
    for (var Yh = jh.prototype, Zh = 0; Zh < Uh.length; Zh++) {
        var $h = Uh[Zh];
        $h[0] in Yh || (Yh[$h[0]] = $h[1]);
    }
    jh.getGradient = Yh.getGradient;
    var Qh = function(t, e) {
        this.image = t, this.repeat = e, this.type = "pattern";
    };
    Qh.prototype.getCanvasPattern = function(t) {
        return t.createPattern(this.image, this.repeat || "repeat");
    };
    var Kh = function(t, e, n) {
        var i;
        n = n || Ah, "string" == typeof t ? i = _e(t, e, n) : b(t) && (i = t, t = i.id), 
        this.id = t, this.dom = i;
        var r = i.style;
        r && (i.onselectstart = ye, r["-webkit-user-select"] = "none", r["user-select"] = "none", 
        r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", 
        r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, 
        this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, 
        this.lastFrameAlpha = .7, this.dpr = n;
    };
    Kh.prototype = {
        constructor: Kh,
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
                var u;
                e.colorStops ? (u = e.__canvasGradient || jh.getGradient(i, e, {
                    x: 0,
                    y: 0,
                    width: r,
                    height: a
                }), e.__canvasGradient = u) : e.image && (u = Qh.prototype.getCanvasPattern.call(e, i)), 
                i.save(), i.fillStyle = u || e, i.fillRect(0, 0, r, a), i.restore();
            }
            if (o) {
                var h = this.domBack;
                i.save(), i.globalAlpha = s, i.drawImage(h, 0, 0, r, a), i.restore();
            }
        }
    };
    var Jh = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t) {
        setTimeout(t, 16);
    }, tc = new _h(50), ec = {}, nc = 0, ic = 5e3, rc = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g, ac = "12px sans-serif", oc = {};
    oc.measureText = function(t, e) {
        var n = l();
        return n.font = e || ac, n.measureText(t);
    };
    var sc = ac, lc = {
        left: 1,
        right: 1,
        center: 1
    }, uc = {
        top: 1,
        bottom: 1,
        middle: 1
    }, hc = [ [ "textShadowBlur", "shadowBlur", 0 ], [ "textShadowOffsetX", "shadowOffsetX", 0 ], [ "textShadowOffsetY", "shadowOffsetY", 0 ], [ "textShadowColor", "shadowColor", "transparent" ] ], cc = {}, fc = {}, dc = new oe(), pc = function() {};
    pc.prototype = {
        constructor: pc,
        drawRectText: function(t, e) {
            var n = this.style;
            e = n.textRect || e, this.__dirty && He(n);
            var i = n.text;
            if (null != i && (i += ""), on(i, n)) {
                t.save();
                var r = this.transform;
                n.transformText ? this.setTransform(t) : r && (dc.copy(e), dc.applyTransform(r), 
                e = dc), qe(this, t, i, n, e, Xh), t.restore();
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
            "style" !== t ? Eh.prototype.attrKV.call(this, t, e) : this.style.set(e);
        },
        setStyle: function(t, e) {
            return this.style.set(t, e), this.dirty(!1), this;
        },
        useStyle: function(t) {
            return this.style = new jh(t, this), this.dirty(!1), this;
        },
        calculateTextPosition: null
    }, h(sn, Eh), c(sn, pc), ln.prototype = {
        constructor: ln,
        type: "image",
        brush: function(t, e) {
            var n = this.style, i = n.image;
            n.bind(t, this, e);
            var r = this._image = we(i, this._image, this, this.onload);
            if (r && Me(r)) {
                var a = n.x || 0, o = n.y || 0, s = n.width, l = n.height, u = r.width / r.height;
                if (null == s && null != l ? s = l * u : null == l && null != s ? l = s / u : null == s && null == l && (s = r.width, 
                l = r.height), this.setTransform(t), n.sWidth && n.sHeight) {
                    var h = n.sx || 0, c = n.sy || 0;
                    t.drawImage(r, h, c, n.sWidth, n.sHeight, a, o, s, l);
                } else if (n.sx && n.sy) {
                    var f = s - (h = n.sx), d = l - (c = n.sy);
                    t.drawImage(r, h, c, f, d, a, o, s, l);
                } else t.drawImage(r, a, o, s, l);
                null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
            }
        },
        getBoundingRect: function() {
            var t = this.style;
            return this._rect || (this._rect = new oe(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), 
            this._rect;
        }
    }, h(ln, sn);
    var gc = 314159, vc = new oe(0, 0, 0, 0), mc = new oe(0, 0, 0, 0), yc = function(t, e, n) {
        this.type = "canvas";
        var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
        this._opts = n = o({}, n || {}), this.dpr = n.devicePixelRatio || Ah, this._singleCanvas = i, 
        this.root = t;
        var r = t.style;
        r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", 
        t.innerHTML = ""), this.storage = e;
        var a = this._zlevelList = [], s = this._layers = {};
        if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {
            var l = t.width, u = t.height;
            null != n.width && (l = n.width), null != n.height && (u = n.height), this.dpr = n.devicePixelRatio || 1, 
            t.width = l * this.dpr, t.height = u * this.dpr, this._width = l, this._height = u;
            var h = new Kh(t, this, this.dpr);
            h.__builtin__ = !0, h.initContext(), s[gc] = h, h.zlevel = gc, a.push(gc), this._domRoot = t;
        } else {
            this._width = this._getSize(0), this._height = this._getSize(1);
            var c = this._domRoot = pn(this._width, this._height);
            t.appendChild(c);
        }
        this._hoverlayer = null, this._hoverElements = [];
    };
    yc.prototype = {
        constructor: yc,
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
            var e = t.__hoverMir, n = this._hoverElements, i = u(n, e);
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
                    Jh(function() {
                        r._paintList(t, e, n);
                    });
                }
            }
        },
        _compositeManually: function() {
            var t = this.getLayer(gc).ctx, e = this._domRoot.width, n = this._domRoot.height;
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
                var s = n[o], l = s.ctx, u = {};
                l.save();
                var h = e ? s.__startIndex : s.__drawIndex, c = !e && s.incremental && Date.now, f = c && Date.now(), p = s.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
                if (s.__startIndex === s.__endIndex) s.clear(!1, p); else if (h === s.__startIndex) {
                    var g = t[h];
                    g.incremental && g.notClear && !e || s.clear(!1, p);
                }
                -1 === h && (console.error("For some unknown reason. drawIndex is -1"), h = s.__startIndex);
                for (var v = h; v < s.__endIndex; v++) {
                    var m = t[v];
                    if (this._doPaintEl(m, s, e, u), m.__dirty = m.__dirtyText = !1, c && Date.now() - f > 15) break;
                }
                s.__drawIndex = v, s.__drawIndex < s.__endIndex && (a = !1), u.prevElClipPaths && l.restore(), 
                l.restore();
            }
            return Cu.wxa && d(this._layers, function(t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw();
            }), a;
        },
        _doPaintEl: function(t, e, n, i) {
            var r = e.ctx, a = t.transform;
            if (!(!e.__dirty && !n || t.invisible || 0 === t.style.opacity || a && !a[0] && !a[3] || t.culling && cn(t, this._width, this._height))) {
                var o = t.__clipPaths, s = i.prevElClipPaths;
                (!s || fn(o, s)) && (s && (r.restore(), i.prevElClipPaths = null, i.prevEl = null), 
                o && (r.save(), dn(o, r), i.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), 
                t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r);
            }
        },
        getLayer: function(t, e) {
            this._singleCanvas && !this._needsManuallyCompositing && (t = gc);
            var n = this._layers[t];
            return n || (n = new Kh("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, 
            this._layerConfig[t] && r(n, this._layerConfig[t], !0), e && (n.virtual = e), this.insertLayer(t, n), 
            n.initContext()), n;
        },
        insertLayer: function(t, e) {
            var n = this._layers, i = this._zlevelList, r = i.length, a = null, o = -1, s = this._domRoot;
            if (n[t]) Ph("ZLevel " + t + " has been used already"); else if (hn(e)) {
                if (r > 0 && t > i[0]) {
                    for (o = 0; r - 1 > o && !(i[o] < t && i[o + 1] > t); o++) ;
                    a = n[i[o]];
                }
                if (i.splice(o + 1, 0, t), n[t] = e, !e.virtual) if (a) {
                    var l = a.dom;
                    l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom);
                } else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);
            } else Ph("Layer of zlevel " + t + " is not valid");
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
                a.__builtin__ || Ph("ZLevel " + s + " has been used by unkown layer " + a.id), a !== n && (a.__used = !0, 
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
            i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(u(n, t), 1));
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
                    d(this._progressiveLayers, function(n) {
                        n.resize(t, e);
                    }), this.refresh(!0);
                }
                this._width = t, this._height = e;
            } else {
                if (null == t || null == e) return;
                this._width = t, this._height = e, this.getLayer(gc).resize(t, e);
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
            if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[gc].dom;
            var e = new Kh("image", this, t.pixelRatio || this.dpr);
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
            return (o[i] || un(s[n]) || un(o.style[n])) - (un(s[r]) || 0) - (un(s[a]) || 0) | 0;
        },
        pathToImage: function(t, e) {
            e = e || this.dpr;
            var n = document.createElement("canvas"), i = n.getContext("2d"), r = t.getBoundingRect(), a = t.style, o = a.shadowBlur * e, s = a.shadowOffsetX * e, l = a.shadowOffsetY * e, u = a.hasStroke() ? a.lineWidth : 0, h = Math.max(u / 2, -s + o), c = Math.max(u / 2, s + o), f = Math.max(u / 2, -l + o), d = Math.max(u / 2, l + o), p = r.width + h + c, g = r.height + f + d;
            n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;
            var v = {
                position: t.position,
                rotation: t.rotation,
                scale: t.scale
            };
            t.position = [ h - r.x, f - r.y ], t.rotation = 0, t.scale = [ 1, 1 ], t.updateTransform(), 
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
    var _c = function(t) {
        t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function() {}, 
        this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, 
        this._paused = !1, Yu.call(this);
    };
    _c.prototype = {
        constructor: _c,
        addClip: function(t) {
            this._clips.push(t);
        },
        addAnimator: function(t) {
            t.animation = this;
            for (var e = t.getClips(), n = 0; n < e.length; n++) this.addClip(e[n]);
        },
        removeClip: function(t) {
            var e = u(this._clips, t);
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
                e._running && (Jh(t), !e._paused && e._update());
            }
            var e = this;
            this._running = !0, Jh(t);
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
            var n = new kh(t, (e = e || {}).loop, e.getter, e.setter);
            return this.addAnimator(n), n;
        }
    }, c(_c, Yu);
    var xc = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], wc = [ "touchstart", "touchend", "touchmove" ], bc = {
        pointerdown: 1,
        pointerup: 1,
        pointermove: 1,
        pointerout: 1
    }, Mc = p(xc, function(t) {
        var e = t.replace("mouse", "pointer");
        return bc[e] ? e : t;
    }), Sc = {
        mousemove: function(t) {
            t = lt(this.dom, t), this.trigger("mousemove", t);
        },
        mouseout: function(t) {
            var e = (t = lt(this.dom, t)).toElement || t.relatedTarget;
            if (e !== this.dom) for (;e && 9 !== e.nodeType; ) {
                if (e === this.dom) return;
                e = e.parentNode;
            }
            this.trigger("mouseout", t);
        },
        touchstart: function(t) {
            (t = lt(this.dom, t)).zrByTouch = !0, this._lastTouchMoment = new Date(), this.handler.processGesture(t, "start"), 
            Sc.mousemove.call(this, t), Sc.mousedown.call(this, t), vn(this);
        },
        touchmove: function(t) {
            (t = lt(this.dom, t)).zrByTouch = !0, this.handler.processGesture(t, "change"), 
            Sc.mousemove.call(this, t), vn(this);
        },
        touchend: function(t) {
            (t = lt(this.dom, t)).zrByTouch = !0, this.handler.processGesture(t, "end"), Sc.mouseup.call(this, t), 
            +new Date() - this._lastTouchMoment < 300 && Sc.click.call(this, t), vn(this);
        },
        pointerdown: function(t) {
            Sc.mousedown.call(this, t);
        },
        pointermove: function(t) {
            mn(t) || Sc.mousemove.call(this, t);
        },
        pointerup: function(t) {
            Sc.mouseup.call(this, t);
        },
        pointerout: function(t) {
            mn(t) || Sc.mouseout.call(this, t);
        }
    };
    d([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(t) {
        Sc[t] = function(e) {
            e = lt(this.dom, e), this.trigger(t, e);
        };
    });
    var Tc = _n.prototype;
    Tc.dispose = function() {
        for (var t = xc.concat(wc), e = 0; e < t.length; e++) {
            var n = t[e];
            ht(this.dom, gn(n), this._handlers[n]);
        }
    }, Tc.setCursor = function(t) {
        this.dom.style && (this.dom.style.cursor = t || "default");
    }, c(_n, Yu);
    var Cc = !Cu.canvasSupported, Ic = {
        canvas: yc
    }, kc = {}, Dc = function(t, e, n) {
        n = n || {}, this.dom = e, this.id = t;
        var i = this, r = new Wh(), a = n.renderer;
        if (Cc) {
            if (!Ic.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
            a = "vml";
        } else a && Ic[a] || (a = "canvas");
        var o = new Ic[a](e, r, n, t);
        this.storage = r, this.painter = o;
        var s = Cu.node || Cu.worker ? null : new _n(o.getViewportRoot());
        this.handler = new ah(r, o, s, o.root), this.animation = new _c({
            stage: {
                update: m(this.flush, this)
            }
        }), this.animation.start(), this._needsRefresh;
        var l = r.delFromStorage, u = r.addToStorage;
        r.delFromStorage = function(t) {
            l.call(r, t), t && t.removeSelfFromZr(i);
        }, r.addToStorage = function(t) {
            u.call(r, t), t.addSelfToZr(i);
        };
    };
    Dc.prototype = {
        constructor: Dc,
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
            this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh(), this._needsRefresh = this._needsRefreshHover = !1;
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
    var Ac = (Object.freeze || Object)({
        version: "4.1.2",
        init: xn,
        dispose: function(t) {
            if (t) t.dispose(); else {
                for (var e in kc) kc.hasOwnProperty(e) && kc[e].dispose();
                kc = {};
            }
            return this;
        },
        getInstance: function(t) {
            return kc[t];
        },
        registerPainter: function(t, e) {
            Ic[t] = e;
        }
    }), Lc = d, Pc = b, Oc = _, Ec = "series\0", Bc = [ "fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding" ], Rc = 0, zc = ".", Nc = "___EC__COMPONENT__CONTAINER___", Fc = 0, Vc = function(t) {
        for (var e = 0; e < t.length; e++) t[e][1] || (t[e][1] = t[e][0]);
        return function(e, n, i) {
            for (var r = {}, a = 0; a < t.length; a++) {
                var o = t[a][1];
                if (!(n && u(n, o) >= 0 || i && u(i, o) < 0)) {
                    var s = e.getShallow(o);
                    null != s && (r[t[a][0]] = s);
                }
            }
            return r;
        };
    }, Wc = Vc([ [ "lineWidth", "width" ], [ "stroke", "color" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ] ]), Hc = {
        getLineStyle: function(t) {
            var e = Wc(this, t);
            return e.lineDash = this.getLineDash(e.lineWidth), e;
        },
        getLineDash: function(t) {
            null == t && (t = 1);
            var e = this.get("type"), n = Math.max(t, 2), i = 4 * t;
            return "solid" !== e && null != e && ("dashed" === e ? [ i, i ] : [ n, n ]);
        }
    }, Gc = Vc([ [ "fill", "color" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "opacity" ], [ "shadowColor" ] ]), qc = {
        getAreaStyle: function(t, e) {
            return Gc(this, t, e);
        }
    }, Xc = Math.pow, Uc = Math.sqrt, jc = 1e-8, Yc = 1e-4, Zc = Uc(3), $c = 1 / 3, Qc = F(), Kc = F(), Jc = F(), tf = Math.min, ef = Math.max, nf = Math.sin, rf = Math.cos, af = 2 * Math.PI, of = F(), sf = F(), lf = F(), uf = [], hf = [], cf = {
        M: 1,
        L: 2,
        C: 3,
        Q: 4,
        A: 5,
        Z: 6,
        R: 7
    }, ff = [], df = [], pf = [], gf = [], vf = Math.min, mf = Math.max, yf = Math.cos, _f = Math.sin, xf = Math.sqrt, wf = Math.abs, bf = "undefined" != typeof Float32Array, Mf = function(t) {
        this._saveData = !t, this._saveData && (this.data = []), this._ctx = null;
    };
    Mf.prototype = {
        constructor: Mf,
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
        setScale: function(t, e, n) {
            n = n || 0, this._ux = wf(n / Ah / t) || 0, this._uy = wf(n / Ah / e) || 0;
        },
        getContext: function() {
            return this._ctx;
        },
        beginPath: function(t) {
            return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), 
            this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;
        },
        moveTo: function(t, e) {
            return this.addData(cf.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, 
            this._y0 = e, this._xi = t, this._yi = e, this;
        },
        lineTo: function(t, e) {
            var n = wf(t - this._xi) > this._ux || wf(e - this._yi) > this._uy || this._len < 5;
            return this.addData(cf.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), 
            n && (this._xi = t, this._yi = e), this;
        },
        bezierCurveTo: function(t, e, n, i, r, a) {
            return this.addData(cf.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), 
            this._xi = r, this._yi = a, this;
        },
        quadraticCurveTo: function(t, e, n, i) {
            return this.addData(cf.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), 
            this._xi = n, this._yi = i, this;
        },
        arc: function(t, e, n, i, r, a) {
            return this.addData(cf.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), 
            this._xi = yf(r) * n + t, this._yi = _f(r) * n + e, this;
        },
        arcTo: function(t, e, n, i, r) {
            return this._ctx && this._ctx.arcTo(t, e, n, i, r), this;
        },
        rect: function(t, e, n, i) {
            return this._ctx && this._ctx.rect(t, e, n, i), this.addData(cf.R, t, e, n, i), 
            this;
        },
        closePath: function() {
            this.addData(cf.Z);
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
            this.data && this.data.length === e || !bf || (this.data = new Float32Array(e));
            for (var n = 0; e > n; n++) this.data[n] = t[n];
            this._len = e;
        },
        appendPath: function(t) {
            t instanceof Array || (t = [ t ]);
            for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();
            bf && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
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
            var n, i, r = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, l = this._xi, u = this._yi, h = t - l, c = e - u, f = xf(h * h + c * c), d = l, p = u, g = o.length;
            for (h /= f, c /= f, 0 > a && (a = r + a), d -= (a %= r) * h, p -= a * c; h > 0 && t >= d || 0 > h && d >= t || 0 === h && (c > 0 && e >= p || 0 > c && p >= e); ) d += h * (n = o[i = this._dashIdx]), 
            p += c * n, this._dashIdx = (i + 1) % g, h > 0 && l > d || 0 > h && d > l || c > 0 && u > p || 0 > c && p > u || s[i % 2 ? "moveTo" : "lineTo"](h >= 0 ? vf(d, t) : mf(d, t), c >= 0 ? vf(p, e) : mf(p, e));
            h = d - t, c = p - e, this._dashOffset = -xf(h * h + c * c);
        },
        _dashedBezierTo: function(t, e, n, i, r, a) {
            var o, s, l, u, h, c = this._dashSum, f = this._dashOffset, d = this._lineDash, p = this._ctx, g = this._xi, v = this._yi, m = Un, y = 0, _ = this._dashIdx, x = d.length, w = 0;
            for (0 > f && (f = c + f), f %= c, o = 0; 1 > o; o += .1) s = m(g, t, n, r, o + .1) - m(g, t, n, r, o), 
            l = m(v, e, i, a, o + .1) - m(v, e, i, a, o), y += xf(s * s + l * l);
            for (;x > _ && !((w += d[_]) > f); _++) ;
            for (o = (w - f) / y; 1 >= o; ) u = m(g, t, n, r, o), h = m(v, e, i, a, o), _ % 2 ? p.moveTo(u, h) : p.lineTo(u, h), 
            o += d[_] / y, _ = (_ + 1) % x;
            _ % 2 != 0 && p.lineTo(r, a), s = r - u, l = a - h, this._dashOffset = -xf(s * s + l * l);
        },
        _dashedQuadraticTo: function(t, e, n, i) {
            var r = n, a = i;
            n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, 
            this._dashedBezierTo(t, e, n, i, r, a);
        },
        toStatic: function() {
            var t = this.data;
            t instanceof Array && (t.length = this._len, bf && (this.data = new Float32Array(t)));
        },
        getBoundingRect: function() {
            ff[0] = ff[1] = pf[0] = pf[1] = Number.MAX_VALUE, df[0] = df[1] = gf[0] = gf[1] = -Number.MAX_VALUE;
            for (var t = this.data, e = 0, n = 0, i = 0, r = 0, a = 0; a < t.length; ) {
                var o = t[a++];
                switch (1 === a && (e = t[a], n = t[a + 1], i = e, r = n), o) {
                  case cf.M:
                    e = i = t[a++], n = r = t[a++], pf[0] = i, pf[1] = r, gf[0] = i, gf[1] = r;
                    break;

                  case cf.L:
                    ai(e, n, t[a], t[a + 1], pf, gf), e = t[a++], n = t[a++];
                    break;

                  case cf.C:
                    oi(e, n, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], pf, gf), e = t[a++], n = t[a++];
                    break;

                  case cf.Q:
                    si(e, n, t[a++], t[a++], t[a], t[a + 1], pf, gf), e = t[a++], n = t[a++];
                    break;

                  case cf.A:
                    var s = t[a++], l = t[a++], u = t[a++], h = t[a++], c = t[a++], f = t[a++] + c;
                    a += 1;
                    var d = 1 - t[a++];
                    1 === a && (i = yf(c) * u + s, r = _f(c) * h + l), li(s, l, u, h, c, f, d, pf, gf), 
                    e = yf(f) * u + s, n = _f(f) * h + l;
                    break;

                  case cf.R:
                    ai(i = e = t[a++], r = n = t[a++], i + t[a++], r + t[a++], pf, gf);
                    break;

                  case cf.Z:
                    e = i, n = r;
                }
                $(ff, ff, pf), Q(df, df, gf);
            }
            return 0 === a && (ff[0] = ff[1] = df[0] = df[1] = 0), new oe(ff[0], ff[1], df[0] - ff[0], df[1] - ff[1]);
        },
        rebuildPath: function(t) {
            for (var e, n, i, r, a, o, s = this.data, l = this._ux, u = this._uy, h = this._len, c = 0; h > c; ) {
                var f = s[c++];
                switch (1 === c && (i = s[c], r = s[c + 1], e = i, n = r), f) {
                  case cf.M:
                    e = i = s[c++], n = r = s[c++], t.moveTo(i, r);
                    break;

                  case cf.L:
                    a = s[c++], o = s[c++], (wf(a - i) > l || wf(o - r) > u || c === h - 1) && (t.lineTo(a, o), 
                    i = a, r = o);
                    break;

                  case cf.C:
                    t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                    break;

                  case cf.Q:
                    t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                    break;

                  case cf.A:
                    var d = s[c++], p = s[c++], g = s[c++], v = s[c++], m = s[c++], y = s[c++], _ = s[c++], x = s[c++], w = g > v ? g : v, b = g > v ? 1 : g / v, M = g > v ? v / g : 1, S = m + y;
                    Math.abs(g - v) > .001 ? (t.translate(d, p), t.rotate(_), t.scale(b, M), t.arc(0, 0, w, m, S, 1 - x), 
                    t.scale(1 / b, 1 / M), t.rotate(-_), t.translate(-d, -p)) : t.arc(d, p, w, m, S, 1 - x), 
                    1 === c && (e = yf(m) * g + d, n = _f(m) * v + p), i = yf(S) * g + d, r = _f(S) * v + p;
                    break;

                  case cf.R:
                    e = i = s[c], n = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
                    break;

                  case cf.Z:
                    t.closePath(), i = e, r = n;
                }
            }
        }
    }, Mf.CMD = cf;
    var Sf = 2 * Math.PI, Tf = 2 * Math.PI, Cf = Mf.CMD, If = 2 * Math.PI, kf = 1e-4, Df = [ -1, -1, -1 ], Af = [ -1, -1 ], Lf = Qh.prototype.getCanvasPattern, Pf = Math.abs, Of = new Mf(!0);
    Mi.prototype = {
        constructor: Mi,
        type: "path",
        __dirtyPath: !0,
        strokeContainThreshold: 5,
        segmentIgnoreThreshold: 0,
        subPixelOptimize: !1,
        brush: function(t, e) {
            var n = this.style, i = this.path || Of, r = n.hasStroke(), a = n.hasFill(), o = n.fill, s = n.stroke, l = a && !!o.colorStops, u = r && !!s.colorStops, h = a && !!o.image, c = r && !!s.image;
            if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {
                var f;
                l && (f = f || this.getBoundingRect(), this._fillGradient = n.getGradient(t, o, f)), 
                u && (f = f || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, s, f));
            }
            l ? t.fillStyle = this._fillGradient : h && (t.fillStyle = Lf.call(o, t)), u ? t.strokeStyle = this._strokeGradient : c && (t.strokeStyle = Lf.call(s, t));
            var d = n.lineDash, p = n.lineDashOffset, g = !!t.setLineDash, v = this.getGlobalScale();
            if (i.setScale(v[0], v[1], this.segmentIgnoreThreshold), this.__dirtyPath || d && !g && r ? (i.beginPath(t), 
            d && !g && (i.setLineDash(d), i.setLineDashOffset(p)), this.buildPath(i, this.shape, !1), 
            this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), 
            a) if (null != n.fillOpacity) {
                m = t.globalAlpha;
                t.globalAlpha = n.fillOpacity * n.opacity, i.fill(t), t.globalAlpha = m;
            } else i.fill(t);
            if (d && g && (t.setLineDash(d), t.lineDashOffset = p), r) if (null != n.strokeOpacity) {
                var m = t.globalAlpha;
                t.globalAlpha = n.strokeOpacity * n.opacity, i.stroke(t), t.globalAlpha = m;
            } else i.stroke(t);
            d && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
        },
        buildPath: function() {},
        createPathProxy: function() {
            this.path = new Mf();
        },
        getBoundingRect: function() {
            var t = this._rect, e = this.style, n = !t;
            if (n) {
                var i = this.path;
                i || (i = this.path = new Mf()), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), 
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
            return t && Pf(t[0] - 1) > 1e-10 && Pf(t[3] - 1) > 1e-10 ? Math.sqrt(Pf(t[0] * t[3] - t[2] * t[1])) : 1;
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
        h(e, Mi);
        for (var n in t) "style" !== n && "shape" !== n && (e.prototype[n] = t[n]);
        return e;
    }, h(Mi, sn);
    var Ef = Mf.CMD, Bf = [ [], [], [] ], Rf = Math.sqrt, zf = Math.atan2, Nf = function(t, e) {
        var n, i, r, a, o, s, l = t.data, u = Ef.M, h = Ef.C, c = Ef.L, f = Ef.R, d = Ef.A, p = Ef.Q;
        for (r = 0, a = 0; r < l.length; ) {
            switch (n = l[r++], a = r, i = 0, n) {
              case u:
              case c:
                i = 1;
                break;

              case h:
                i = 3;
                break;

              case p:
                i = 2;
                break;

              case d:
                var g = e[4], v = e[5], m = Rf(e[0] * e[0] + e[1] * e[1]), y = Rf(e[2] * e[2] + e[3] * e[3]), _ = zf(-e[1] / y, e[0] / m);
                l[r] *= m, l[r++] += g, l[r] *= y, l[r++] += v, l[r++] *= m, l[r++] *= y, l[r++] += _, 
                l[r++] += _, a = r += 2;
                break;

              case f:
                s[0] = l[r++], s[1] = l[r++], Z(s, s, e), l[a++] = s[0], l[a++] = s[1], s[0] += l[r++], 
                s[1] += l[r++], Z(s, s, e), l[a++] = s[0], l[a++] = s[1];
            }
            for (o = 0; i > o; o++) (s = Bf[o])[0] = l[r++], s[1] = l[r++], Z(s, s, e), l[a++] = s[0], 
            l[a++] = s[1];
        }
    }, Ff = Math.sqrt, Vf = Math.sin, Wf = Math.cos, Hf = Math.PI, Gf = function(t) {
        return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    }, qf = function(t, e) {
        return (t[0] * e[0] + t[1] * e[1]) / (Gf(t) * Gf(e));
    }, Xf = function(t, e) {
        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(qf(t, e));
    }, Uf = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi, jf = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g, Yf = function(t) {
        sn.call(this, t);
    };
    Yf.prototype = {
        constructor: Yf,
        type: "text",
        brush: function(t, e) {
            var n = this.style;
            this.__dirty && He(n), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;
            var i = n.text;
            return null != i && (i += ""), on(i, n) ? (this.setTransform(t), qe(this, t, i, n, null, e), 
            void this.restoreTransform(t)) : void (t.__attrCachedBy = qh.NONE);
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
    }, h(Yf, sn);
    var Zf = Mi.extend({
        type: "circle",
        shape: {
            cx: 0,
            cy: 0,
            r: 0
        },
        buildPath: function(t, e, n) {
            n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
        }
    }), $f = [ [ "shadowBlur", 0 ], [ "shadowColor", "#000" ], [ "shadowOffsetX", 0 ], [ "shadowOffsetY", 0 ] ], Qf = Mi.extend({
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
        brush: function(t) {
            return Cu.browser.ie && Cu.browser.version >= 11 ? function() {
                var e, n = this.__clipPaths, i = this.style;
                if (n) for (var r = 0; r < n.length; r++) {
                    var a = n[r], o = a && a.shape, s = a && a.type;
                    if (o && ("sector" === s && o.startAngle === o.endAngle || "rect" === s && (!o.width || !o.height))) {
                        for (l = 0; l < $f.length; l++) $f[l][2] = i[$f[l][0]], i[$f[l][0]] = $f[l][1];
                        e = !0;
                        break;
                    }
                }
                if (t.apply(this, arguments), e) for (var l = 0; l < $f.length; l++) i[$f[l][0]] = $f[l][2];
            } : t;
        }(Mi.prototype.brush),
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle, s = e.endAngle, l = e.clockwise, u = Math.cos(o), h = Math.sin(o);
            t.moveTo(u * r + n, h * r + i), t.lineTo(u * a + n, h * a + i), t.arc(n, i, a, o, s, !l), 
            t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), 
            t.closePath();
        }
    }), Kf = Mi.extend({
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
    }), Jf = function(t, e) {
        for (var n = t.length, i = [], r = 0, a = 1; n > a; a++) r += j(t[a - 1], t[a]);
        var o = r / 2;
        o = n > o ? n : o;
        for (a = 0; o > a; a++) {
            var s, l, u, h = a / (o - 1) * (e ? n : n - 1), c = Math.floor(h), f = h - c, d = t[c % n];
            e ? (s = t[(c - 1 + n) % n], l = t[(c + 1) % n], u = t[(c + 2) % n]) : (s = t[0 === c ? c : c - 1], 
            l = t[c > n - 2 ? n - 1 : c + 1], u = t[c > n - 3 ? n - 1 : c + 2]);
            var p = f * f, g = f * p;
            i.push([ Di(s[0], d[0], l[0], u[0], f, p, g), Di(s[1], d[1], l[1], u[1], f, p, g) ]);
        }
        return i;
    }, td = function(t, e, n, i) {
        var r, a, o, s, l = [], u = [], h = [], c = [];
        if (i) {
            o = [ 1 / 0, 1 / 0 ], s = [ -1 / 0, -1 / 0 ];
            for (var f = 0, d = t.length; d > f; f++) $(o, o, t[f]), Q(s, s, t[f]);
            $(o, o, i[0]), Q(s, s, i[1]);
        }
        for (var f = 0, d = t.length; d > f; f++) {
            var p = t[f];
            if (n) r = t[f ? f - 1 : d - 1], a = t[(f + 1) % d]; else {
                if (0 === f || f === d - 1) {
                    l.push(V(t[f]));
                    continue;
                }
                r = t[f - 1], a = t[f + 1];
            }
            H(u, a, r), X(u, u, e);
            var g = j(p, r), v = j(p, a), m = g + v;
            0 !== m && (g /= m, v /= m), X(h, u, -g), X(c, u, v);
            var y = W([], p, h), _ = W([], p, c);
            i && (Q(y, y, o), $(y, y, s), Q(_, _, o), $(_, _, s)), l.push(y), l.push(_);
        }
        return n && l.push(l.shift()), l;
    }, ed = Mi.extend({
        type: "polygon",
        shape: {
            points: null,
            smooth: !1,
            smoothConstraint: null
        },
        buildPath: function(t, e) {
            Ai(t, e, !0);
        }
    }), nd = Mi.extend({
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
            Ai(t, e, !1);
        }
    }), id = Math.round, rd = {}, ad = Mi.extend({
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
            this.subPixelOptimize ? (Pi(rd, e, this.style), n = rd.x, i = rd.y, r = rd.width, 
            a = rd.height, rd.r = e.r, e = rd) : (n = e.x, i = e.y, r = e.width, a = e.height), 
            e.r ? We(t, e) : t.rect(n, i, r, a), t.closePath();
        }
    }), od = {}, sd = Mi.extend({
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
            this.subPixelOptimize ? (Li(od, e, this.style), n = od.x1, i = od.y1, r = od.x2, 
            a = od.y2) : (n = e.x1, i = e.y1, r = e.x2, a = e.y2);
            var o = e.percent;
            0 !== o && (t.moveTo(n, i), 1 > o && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), 
            t.lineTo(r, a));
        },
        pointAt: function(t) {
            var e = this.shape;
            return [ e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t ];
        }
    }), ld = [], ud = Mi.extend({
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
            var n = e.x1, i = e.y1, r = e.x2, a = e.y2, o = e.cpx1, s = e.cpy1, l = e.cpx2, u = e.cpy2, h = e.percent;
            0 !== h && (t.moveTo(n, i), null == l || null == u ? (1 > h && (ni(n, o, r, h, ld), 
            o = ld[1], r = ld[2], ni(i, s, a, h, ld), s = ld[1], a = ld[2]), t.quadraticCurveTo(o, s, r, a)) : (1 > h && ($n(n, o, l, r, h, ld), 
            o = ld[1], l = ld[2], r = ld[3], $n(i, s, u, a, h, ld), s = ld[1], u = ld[2], a = ld[3]), 
            t.bezierCurveTo(o, s, l, u, r, a)));
        },
        pointAt: function(t) {
            return Ei(this.shape, t, !1);
        },
        tangentAt: function(t) {
            var e = Ei(this.shape, t, !0);
            return U(e, e);
        }
    }), hd = Mi.extend({
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
            var n = e.cx, i = e.cy, r = Math.max(e.r, 0), a = e.startAngle, o = e.endAngle, s = e.clockwise, l = Math.cos(a), u = Math.sin(a);
            t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, a, o, !s);
        }
    }), cd = Mi.extend({
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
            t[n].path.setScale(e[0], e[1], t[n].segmentIgnoreThreshold);
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
    }), fd = function(t) {
        this.colorStops = t || [];
    };
    fd.prototype = {
        constructor: fd,
        addColorStop: function(t, e) {
            this.colorStops.push({
                offset: t,
                color: e
            });
        }
    };
    var dd = function(t, e, n, i, r, a) {
        this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, 
        this.y2 = null == i ? 0 : i, this.type = "linear", this.global = a || !1, fd.call(this, r);
    };
    dd.prototype = {
        constructor: dd
    }, h(dd, fd);
    var pd = function(t, e, n, i, r) {
        this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, 
        this.type = "radial", this.global = r || !1, fd.call(this, i);
    };
    pd.prototype = {
        constructor: pd
    }, h(pd, fd), Bi.prototype.incremental = !0, Bi.prototype.clearDisplaybles = function() {
        this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), 
        this.notClear = !1;
    }, Bi.prototype.addDisplayable = function(t, e) {
        e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty();
    }, Bi.prototype.addDisplayables = function(t, e) {
        e = e || !1;
        for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e);
    }, Bi.prototype.eachPendingDisplayable = function(t) {
        for (e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
        for (var e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e]);
    }, Bi.prototype.update = function() {
        this.updateTransform();
        for (t = this._cursor; t < this._displayables.length; t++) (e = this._displayables[t]).parent = this, 
        e.update(), e.parent = null;
        for (var t = 0; t < this._temporaryDisplayables.length; t++) {
            var e = this._temporaryDisplayables[t];
            e.parent = this, e.update(), e.parent = null;
        }
    }, Bi.prototype.brush = function(t) {
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
    var gd = [];
    Bi.prototype.getBoundingRect = function() {
        if (!this._rect) {
            for (var t = new oe(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
                var n = this._displayables[e], i = n.getBoundingRect().clone();
                n.needLocalTransform() && i.applyTransform(n.getLocalTransform(gd)), t.union(i);
            }
            this._rect = t;
        }
        return this._rect;
    }, Bi.prototype.contain = function(t, e) {
        var n = this.transformCoordToLocal(t, e);
        if (this.getBoundingRect().contain(n[0], n[1])) for (var i = 0; i < this._displayables.length; i++) if (this._displayables[i].contain(t, e)) return !0;
        return !1;
    }, h(Bi, sn);
    var vd = Math.max, md = Math.min, yd = {}, _d = 1, xd = {
        color: "textFill",
        textBorderColor: "textStroke",
        textBorderWidth: "textStrokeWidth"
    }, wd = "emphasis", bd = "normal", Md = 1, Sd = {}, Td = {}, Cd = Oi, Id = z(), kd = 0;
    zi("circle", Zf), zi("sector", Qf), zi("ring", Kf), zi("polygon", ed), zi("polyline", nd), 
    zi("rect", ad), zi("line", sd), zi("bezierCurve", ud), zi("arc", hd);
    var Dd = (Object.freeze || Object)({
        Z2_EMPHASIS_LIFT: _d,
        CACHED_LABEL_STYLE_PROPERTIES: xd,
        extendShape: Ri,
        extendPath: function(t, e) {
            return ki(t, e);
        },
        registerShape: zi,
        getShapeClass: function(t) {
            return Td.hasOwnProperty(t) ? Td[t] : void 0;
        },
        makePath: Ni,
        makeImage: Fi,
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
        resizePath: Wi,
        subPixelOptimizeLine: function(t) {
            return Li(t.shape, t.shape, t.style), t;
        },
        subPixelOptimizeRect: function(t) {
            return Pi(t.shape, t.shape, t.style), t;
        },
        subPixelOptimize: Cd,
        setElementHoverStyle: Zi,
        setHoverStyle: er,
        setAsHighDownDispatcher: nr,
        isHighDownDispatcher: ir,
        getHighlightDigit: rr,
        setLabelStyle: ar,
        modifyLabelStyle: function(t, e, n) {
            var i = t.style;
            e && (fr(i), t.setStyle(e), cr(i)), i = t.__hoverStl, n && i && (fr(i), o(i, n), 
            cr(i));
        },
        setTextStyle: or,
        setText: function(t, e, n) {
            var i, r = {
                isRectText: !0
            };
            !1 === n ? i = !0 : r.autoColor = n, sr(t, e, r, i);
        },
        getFont: dr,
        updateProps: gr,
        initProps: vr,
        getTransform: function(t, e) {
            for (var n = yt([]); t && t !== e; ) xt(n, t.getLocalTransform(), n), t = t.parent;
            return n;
        },
        applyTransform: mr,
        transformDirection: function(t, e, n) {
            var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]), r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]), a = [ "left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0 ];
            return a = mr(a, e, n), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
        },
        groupTransition: yr,
        clipPointsByRect: function(t, e) {
            return p(t, function(t) {
                var n = t[0];
                n = vd(n, e.x), n = md(n, e.x + e.width);
                var i = t[1];
                return i = vd(i, e.y), i = md(i, e.y + e.height), [ n, i ];
            });
        },
        clipRectByRect: function(t, e) {
            var n = vd(t.x, e.x), i = md(t.x + t.width, e.x + e.width), r = vd(t.y, e.y), a = md(t.y + t.height, e.y + e.height);
            return i >= n && a >= r ? {
                x: n,
                y: r,
                width: i - n,
                height: a - r
            } : void 0;
        },
        createIcon: function(t, e, n) {
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
        },
        linePolygonIntersect: function(t, e, n, i, r) {
            for (var a = 0, o = r[r.length - 1]; a < r.length; a++) {
                var s = r[a];
                if (_r(t, e, n, i, s[0], s[1], o[0], o[1])) return !0;
                o = s;
            }
        },
        lineLineIntersect: _r,
        Group: Nh,
        Image: ln,
        Text: Yf,
        Circle: Zf,
        Sector: Qf,
        Ring: Kf,
        Polygon: ed,
        Polyline: nd,
        Rect: ad,
        Line: sd,
        BezierCurve: ud,
        Arc: hd,
        IncrementalDisplayable: Bi,
        CompoundPath: cd,
        LinearGradient: dd,
        RadialGradient: pd,
        BoundingRect: oe
    }), Ad = [ "textStyle", "color" ], Ld = {
        getTextColor: function(t) {
            var e = this.ecModel;
            return this.getShallow("color") || (!t && e ? e.get(Ad) : null);
        },
        getFont: function() {
            return dr({
                fontStyle: this.getShallow("fontStyle"),
                fontWeight: this.getShallow("fontWeight"),
                fontSize: this.getShallow("fontSize"),
                fontFamily: this.getShallow("fontFamily")
            }, this.ecModel);
        },
        getTextRect: function(t) {
            return Te(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"));
        }
    }, Pd = Vc([ [ "fill", "color" ], [ "stroke", "borderColor" ], [ "lineWidth", "borderWidth" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ], [ "textPosition" ], [ "textAlign" ] ]), Od = {
        getItemStyle: function(t, e) {
            var n = Pd(this, t, e), i = this.getBorderLineDash();
            return i && (n.lineDash = i), n;
        },
        getBorderLineDash: function() {
            var t = this.get("borderType");
            return "solid" === t || null == t ? null : "dashed" === t ? [ 5, 5 ] : [ 1, 1 ];
        }
    }, Ed = c, Bd = Ln();
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
            Bd(this).getParent = t;
        },
        isAnimationEnabled: function() {
            if (!Cu.node) {
                if (null != this.option.animation) return !!this.option.animation;
                if (this.parentModel) return this.parentModel.isAnimationEnabled();
            }
        }
    }, Fn(br), Vn(br), Ed(br, Hc), Ed(br, qc), Ed(br, Ld), Ed(br, Od);
    var Rd = 0, zd = 1e-4, Nd = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/, Fd = (Object.freeze || Object)({
        linearMap: Ir,
        parsePercent: kr,
        round: Dr,
        asc: function(t) {
            return t.sort(function(t, e) {
                return t - e;
            }), t;
        },
        getPrecision: function(t) {
            if (t = +t, isNaN(t)) return 0;
            for (var e = 1, n = 0; Math.round(t * e) / e !== t; ) e *= 10, n++;
            return n;
        },
        getPrecisionSafe: Ar,
        getPixelPrecision: Lr,
        getPercentWithPrecision: Pr,
        MAX_SAFE_INTEGER: 9007199254740991,
        remRadian: Or,
        isRadianAroundZero: Er,
        parseDate: Br,
        quantity: Rr,
        quantityExponent: zr,
        nice: Nr,
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
    }), Vd = L, Wd = /([&<>"'])/g, Hd = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, Gd = [ "a", "b", "c", "d", "e", "f", "g" ], qd = function(t, e) {
        return "{" + t + (null == e ? "" : e) + "}";
    }, Xd = Le, Ud = (Object.freeze || Object)({
        addCommas: Fr,
        toCamelCase: function(t, e) {
            return t = (t || "").toLowerCase().replace(/-(.)/g, function(t, e) {
                return e.toUpperCase();
            }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;
        },
        normalizeCssArray: Vd,
        encodeHTML: Vr,
        formatTpl: Wr,
        formatTplSimple: function(t, e, n) {
            return d(e, function(e, i) {
                t = t.replace("{" + i + "}", n ? Vr(e) : e);
            }), t;
        },
        getTooltipMarker: Hr,
        formatTime: qr,
        capitalFirst: function(t) {
            return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;
        },
        truncateText: Xd,
        getTextBoundingRect: function(t) {
            return Te(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate);
        },
        getTextRect: function(t, e, n, i, r, a, o, s) {
            return Te(t, e, n, i, r, s, a, o);
        }
    }), jd = d, Yd = [ "left", "right", "top", "bottom", "width", "height" ], Zd = [ [ "width", "left", "right" ], [ "height", "top", "bottom" ] ], $d = (y(Xr, "vertical"), 
    y(Xr, "horizontal"), {
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
    }), Qd = Ln(), Kd = br.extend({
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
            var n = this.layoutMode, i = n ? Yr(t) : {};
            r(t, e.getTheme().get(this.mainType)), r(t, this.getDefaultOption()), n && jr(t, i, n);
        },
        mergeOption: function(t) {
            r(this.option, t, !0);
            var e = this.layoutMode;
            e && jr(this.option, t, e);
        },
        optionUpdated: function() {},
        getDefaultOption: function() {
            var t = Qd(this);
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
    Gn(Kd, {
        registerWhenExtend: !0
    }), function(t) {
        var e = {};
        t.registerSubTypeDefaulter = function(t, n) {
            t = zn(t), e[t.main] = n;
        }, t.determineSubType = function(n, i) {
            var r = i.type;
            if (!r) {
                var a = zn(n).main;
                t.hasSubTypes(n) && e[a] && (r = e[a](i));
            }
            return r;
        };
    }(Kd), function(t, e) {
        function n(t) {
            var n = {}, a = [];
            return d(t, function(o) {
                var s = i(n, o), l = r(s.originalDeps = e(o), t);
                s.entryCount = l.length, 0 === s.entryCount && a.push(o), d(l, function(t) {
                    u(s.predecessor, t) < 0 && s.predecessor.push(t);
                    var e = i(n, t);
                    u(e.successor, t) < 0 && e.successor.push(o);
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
            return d(t, function(t) {
                u(e, t) >= 0 && n.push(t);
            }), n;
        }
        t.topologicalTravel = function(t, e, i, r) {
            function a(t) {
                s[t].entryCount--, 0 === s[t].entryCount && l.push(t);
            }
            if (t.length) {
                var o = n(e), s = o.graph, l = o.noEntryList, u = {};
                for (d(t, function(t) {
                    u[t] = !0;
                }); l.length; ) {
                    var h = l.pop(), c = s[h], f = !!u[h];
                    f && (i.call(r, h, c.originalDeps.slice()), delete u[h]), d(c.successor, f ? function(t) {
                        u[t] = !0, a(t);
                    } : a);
                }
                d(u, function() {
                    throw new Error("Circle dependency may exists");
                });
            }
        };
    }(Kd, function(t) {
        var e = [];
        return d(Kd.getClassesByMainType(t), function(t) {
            e = e.concat(t.prototype.dependencies || []);
        }), e = p(e, function(t) {
            return zn(t).main;
        }), "dataset" !== t && u(e, "dataset") <= 0 && e.unshift("dataset"), e;
    }), c(Kd, $d);
    var Jd = "";
    "undefined" != typeof navigator && (Jd = navigator.platform || "");
    var tp = {
        color: [ "#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3" ],
        gradientColor: [ "#f6efa6", "#d88273", "#bf444c" ],
        textStyle: {
            fontFamily: Jd.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
    }, ep = Ln(), np = {
        clearColorPalette: function() {
            ep(this).colorIdx = 0, ep(this).colorNameMap = {};
        },
        getColorFromPalette: function(t, e, n) {
            var i = ep(e = e || this), r = i.colorIdx || 0, a = i.colorNameMap = i.colorNameMap || {};
            if (a.hasOwnProperty(t)) return a[t];
            var o = bn(this.get("color", !0)), s = this.get("colorLayer", !0), l = null != n && s ? $r(s, n) : o;
            if ((l = l || o) && l.length) {
                var u = l[r];
                return t && (a[t] = u), i.colorIdx = (r + 1) % l.length, u;
            }
        }
    }, ip = {
        cartesian2d: function(t, e, n, i) {
            var r = t.getReferringComponents("xAxis")[0], a = t.getReferringComponents("yAxis")[0];
            e.coordSysDims = [ "x", "y" ], n.set("x", r), n.set("y", a), Kr(r) && (i.set("x", r), 
            e.firstCategoryDimIndex = 0), Kr(a) && (i.set("y", a), e.firstCategoryDimIndex = 1);
        },
        singleAxis: function(t, e, n, i) {
            var r = t.getReferringComponents("singleAxis")[0];
            e.coordSysDims = [ "single" ], n.set("single", r), Kr(r) && (i.set("single", r), 
            e.firstCategoryDimIndex = 0);
        },
        polar: function(t, e, n, i) {
            var r = t.getReferringComponents("polar")[0], a = r.findAxisModel("radiusAxis"), o = r.findAxisModel("angleAxis");
            e.coordSysDims = [ "radius", "angle" ], n.set("radius", a), n.set("angle", o), Kr(a) && (i.set("radius", a), 
            e.firstCategoryDimIndex = 0), Kr(o) && (i.set("angle", o), e.firstCategoryDimIndex = 1);
        },
        geo: function(t, e) {
            e.coordSysDims = [ "lng", "lat" ];
        },
        parallel: function(t, e, n, i) {
            var r = t.ecModel, a = r.getComponent("parallel", t.get("parallelIndex")), o = e.coordSysDims = a.dimensions.slice();
            d(a.parallelAxisIndex, function(t, a) {
                var s = r.getComponent("parallelAxis", t), l = o[a];
                n.set(l, s), Kr(s) && null == e.firstCategoryDimIndex && (i.set(l, s), e.firstCategoryDimIndex = a);
            });
        }
    }, rp = "original", ap = "arrayRows", op = "objectRows", sp = "keyedColumns", lp = "unknown", up = "typedArray", hp = "column", cp = "row";
    Jr.seriesDataToSource = function(t) {
        return new Jr({
            data: t,
            sourceFormat: S(t) ? up : rp,
            fromDataset: !1
        });
    }, Vn(Jr);
    var fp = Ln(), dp = "\0_ec_inner", pp = br.extend({
        init: function(t, e, n, i) {
            n = n || {}, this.option = null, this._theme = new br(n), this._optionManager = i;
        },
        setOption: function(t, e) {
            P(!(dp in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), 
            this.resetOption(null);
        },
        resetOption: function(t) {
            var e = !1, n = this._optionManager;
            if (!t || "recreate" === t) {
                var i = n.mountOption("recreate" === t);
                this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : pa.call(this, i), 
                e = !0;
            }
            if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                var r = n.getTimelineOption(this);
                r && (this.mergeOption(r), e = !0);
            }
            if (!t || "recreate" === t || "media" === t) {
                var a = n.getMediaOption(this, this._api);
                a.length && d(a, function(t) {
                    this.mergeOption(t, e = !0);
                }, this);
            }
            return e;
        },
        mergeOption: function(t) {
            var e = this.option, n = this._componentsMap, a = [];
            na(this), d(t, function(t, n) {
                null != t && (Kd.hasClass(n) ? n && a.push(n) : e[n] = null == e[n] ? i(t) : r(e[n], t, !0));
            }), Kd.topologicalTravel(a, Kd.getAllClassMainTypes(), function(i, r) {
                var a = bn(t[i]), s = Cn(n.get(i), a);
                In(s), d(s, function(t) {
                    var e = t.option;
                    b(e) && (t.keyInfo.mainType = i, t.keyInfo.subType = va(i, e, t.exist));
                });
                var l = ga(n, r);
                e[i] = [], n.set(i, []), d(s, function(t, r) {
                    var a = t.exist, s = t.option;
                    if (P(b(s) || a, "Empty component definition"), s) {
                        var u = Kd.getClass(i, t.keyInfo.subType, !0);
                        if (a && a.constructor === u) a.name = t.keyInfo.name, a.mergeOption(s, this), a.optionUpdated(s, !1); else {
                            var h = o({
                                dependentModels: l,
                                componentIndex: r
                            }, t.keyInfo);
                            o(a = new u(s, this, this, h), h), a.init(s, this, this, h), a.optionUpdated(null, !0);
                        }
                    } else a.mergeOption({}, this), a.optionUpdated({}, !1);
                    n.get(i)[r] = a, e[i][r] = a.option;
                }, this), "series" === i && ma(this, n.get("series"));
            }, this), this._seriesIndicesMap = z(this._seriesIndices = this._seriesIndices || []);
        },
        getOption: function() {
            var t = i(this.option);
            return d(t, function(e, n) {
                if (Kd.hasClass(n)) {
                    for (var i = (e = bn(e)).length - 1; i >= 0; i--) Dn(e[i]) && e.splice(i, 1);
                    t[n] = e;
                }
            }), delete t[dp], t;
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
                    return s && u(i, t.id) >= 0 || !s && t.id === i;
                });
            } else if (null != r) {
                var l = _(r);
                o = v(a, function(t) {
                    return l && u(r, t.name) >= 0 || !l && t.name === r;
                });
            } else o = a.slice();
            return ya(o, t);
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
            }(ya(i ? this.queryComponents(i) : this._componentsMap.get(n), t));
        },
        eachComponent: function(t, e, n) {
            var i = this._componentsMap;
            "function" == typeof t ? (n = e, e = t, i.each(function(t, i) {
                d(t, function(t, r) {
                    e.call(n, i, t, r);
                });
            })) : w(t) ? d(i.get(t), e, n) : b(t) && d(this.findComponents(t), e, n);
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
            d(this._seriesIndices, function(n) {
                var i = this._componentsMap.get("series")[n];
                t.call(e, i, n);
            }, this);
        },
        eachRawSeries: function(t, e) {
            d(this._componentsMap.get("series"), t, e);
        },
        eachSeriesByType: function(t, e, n) {
            d(this._seriesIndices, function(i) {
                var r = this._componentsMap.get("series")[i];
                r.subType === t && e.call(n, r, i);
            }, this);
        },
        eachRawSeriesByType: function(t, e, n) {
            return d(this.getSeriesByType(t), e, n);
        },
        isSeriesFiltered: function(t) {
            return null == this._seriesIndicesMap.get(t.componentIndex);
        },
        getCurrentSeriesIndices: function() {
            return (this._seriesIndices || []).slice();
        },
        filterSeries: function(t, e) {
            ma(this, v(this._componentsMap.get("series"), t, e));
        },
        restoreData: function(t) {
            var e = this._componentsMap;
            ma(this, e.get("series"));
            var n = [];
            e.each(function(t, e) {
                n.push(e);
            }), Kd.topologicalTravel(n, Kd.getAllClassMainTypes(), function(n) {
                d(e.get(n), function(e) {
                    ("series" !== n || !fa(e, t)) && e.restoreData();
                });
            });
        }
    });
    c(pp, np);
    var gp = [ "getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel" ], vp = {};
    xa.prototype = {
        constructor: xa,
        create: function(t, e) {
            var n = [];
            d(vp, function(i) {
                var r = i.create(t, e);
                n = n.concat(r || []);
            }), this._coordinateSystems = n;
        },
        update: function(t, e) {
            d(this._coordinateSystems, function(n) {
                n.update && n.update(t, e);
            });
        },
        getCoordinateSystems: function() {
            return this._coordinateSystems.slice();
        }
    }, xa.register = function(t, e) {
        vp[t] = e;
    }, xa.get = function(t) {
        return vp[t];
    };
    var mp = d, yp = i, _p = p, xp = r, wp = /^(min|max)?(.+)$/;
    wa.prototype = {
        constructor: wa,
        setOption: function(t, e) {
            t && d(bn(t.series), function(t) {
                t && t.data && S(t.data) && E(t.data);
            }), t = yp(t);
            var n = this._optionBackup, i = ba.call(this, t, e, !n);
            this._newBaseOption = i.baseOption, n ? (Ca(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), 
            i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i;
        },
        mountOption: function(t) {
            var e = this._optionBackup;
            return this._timelineOptions = _p(e.timelineOptions, yp), this._mediaList = _p(e.mediaList, yp), 
            this._mediaDefault = yp(e.mediaDefault), this._currentMediaIndices = [], yp(t ? e.baseOption : this._newBaseOption);
        },
        getTimelineOption: function(t) {
            var e, n = this._timelineOptions;
            if (n.length) {
                var i = t.getComponent("timeline");
                i && (e = yp(n[i.getCurrentIndex()], !0));
            }
            return e;
        },
        getMediaOption: function() {
            var t = this._api.getWidth(), e = this._api.getHeight(), n = this._mediaList, i = this._mediaDefault, r = [], a = [];
            if (!n.length && !i) return a;
            for (var o = 0, s = n.length; s > o; o++) Ma(n[o].query, t, e) && r.push(o);
            return !r.length && i && (r = [ -1 ]), r.length && !Ta(r, this._currentMediaIndices) && (a = _p(r, function(t) {
                return yp(-1 === t ? i.option : n[t].option);
            })), this._currentMediaIndices = r, a;
        }
    };
    var bp = d, Mp = b, Sp = [ "areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine" ], Tp = function(t, e) {
        bp(Oa(t.series), function(t) {
            Mp(t) && Pa(t);
        });
        var n = [ "xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar" ];
        e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), bp(n, function(e) {
            bp(Oa(t[e]), function(t) {
                t && (Aa(t, "axisLabel"), Aa(t.axisPointer, "label"));
            });
        }), bp(Oa(t.parallel), function(t) {
            var e = t && t.parallelAxisDefault;
            Aa(e, "axisLabel"), Aa(e && e.axisPointer, "label");
        }), bp(Oa(t.calendar), function(t) {
            ka(t, "itemStyle"), Aa(t, "dayLabel"), Aa(t, "monthLabel"), Aa(t, "yearLabel");
        }), bp(Oa(t.radar), function(t) {
            Aa(t, "name");
        }), bp(Oa(t.geo), function(t) {
            Mp(t) && (La(t), bp(Oa(t.regions), function(t) {
                La(t);
            }));
        }), bp(Oa(t.timeline), function(t) {
            La(t), ka(t, "label"), ka(t, "itemStyle"), ka(t, "controlStyle", !0);
            var e = t.data;
            _(e) && d(e, function(t) {
                b(t) && (ka(t, "label"), ka(t, "itemStyle"));
            });
        }), bp(Oa(t.toolbox), function(t) {
            ka(t, "iconStyle"), bp(t.feature, function(t) {
                ka(t, "iconStyle");
            });
        }), Aa(Ea(t.axisPointer), "label"), Aa(Ea(t.tooltip).axisPointer, "label");
    }, Cp = [ [ "x", "left" ], [ "y", "top" ], [ "x2", "right" ], [ "y2", "bottom" ] ], Ip = [ "grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline" ], kp = function(t, e) {
        Tp(t, e), t.series = bn(t.series), d(t.series, function(t) {
            if (b(t)) {
                var e = t.type;
                if ("line" === e) null != t.clipOverflow && (t.clip = t.clipOverflow); else if ("pie" === e || "gauge" === e) null != t.clockWise && (t.clockwise = t.clockWise); else if ("gauge" === e) {
                    var n = Ba(t, "pointer.color");
                    null != n && Ra(t, "itemStyle.color", n);
                }
                za(t);
            }
        }), t.dataRange && (t.visualMap = t.dataRange), d(Ip, function(e) {
            var n = t[e];
            n && (_(n) || (n = [ n ]), d(n, function(t) {
                za(t);
            }));
        });
    }, Dp = Fa.prototype;
    Dp.pure = !1, Dp.persistent = !0, Dp.getSource = function() {
        return this._source;
    };
    var Ap = {
        arrayRows_column: {
            pure: !0,
            count: function() {
                return Math.max(0, this._data.length - this._source.startIndex);
            },
            getItem: function(t) {
                return this._data[t + this._source.startIndex];
            },
            appendData: Ha
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
            count: Va,
            getItem: Wa,
            appendData: Ha
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
                d(t, function(t, n) {
                    for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r]);
                });
            }
        },
        original: {
            count: Va,
            getItem: Wa,
            appendData: Ha
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
    }, Lp = {
        arrayRows: Ga,
        objectRows: function(t, e, n, i) {
            return null != n ? t[i] : t;
        },
        keyedColumns: Ga,
        original: function(t, e, n) {
            var i = Sn(t);
            return null != n && i instanceof Array ? i[n] : i;
        },
        typedArray: Ga
    }, Pp = {
        arrayRows: qa,
        objectRows: function(t, e) {
            return Xa(t[e], this._dimensionInfos[e]);
        },
        keyedColumns: qa,
        original: function(t, e, n, i) {
            var r = t && (null == t.value ? t : t.value);
            return !this._rawData.pure && Tn(t) && (this.hasItemOption = !0), Xa(r instanceof Array ? r[i] : r, this._dimensionInfos[e]);
        },
        typedArray: function(t, e, n, i) {
            return t[i];
        }
    }, Op = /\{@(.+?)\}/g, Ep = {
        getDataParams: function(t, e) {
            var n = this.getData(e), i = this.getRawValue(t, e), r = n.getRawIndex(t), a = n.getName(t), o = n.getRawDataItem(t), s = n.getItemVisual(t, "color"), l = n.getItemVisual(t, "borderColor"), u = this.ecModel.getComponent("tooltip"), h = Rn(u && u.get("renderMode")), c = this.mainType, f = "series" === c, d = n.userOutput;
            return {
                componentType: c,
                componentSubType: this.subType,
                componentIndex: this.componentIndex,
                seriesType: f ? this.subType : null,
                seriesIndex: this.seriesIndex,
                seriesId: f ? this.id : null,
                seriesName: f ? this.name : null,
                name: a,
                dataIndex: r,
                data: o,
                dataType: e,
                value: i,
                color: s,
                borderColor: l,
                dimensionNames: d ? d.dimensionNames : null,
                encode: d ? d.encode : null,
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
            return "function" == typeof l ? (s.status = e, s.dimensionIndex = i, l(s)) : "string" == typeof l ? Wr(l, s).replace(Op, function(e, n) {
                var i = n.length;
                return "[" === n.charAt(0) && "]" === n.charAt(i - 1) && (n = +n.slice(1, i - 1)), 
                Ua(a, t, n);
            }) : void 0;
        },
        getRawValue: function(t, e) {
            return Ua(this.getData(e), t);
        },
        formatTooltip: function() {}
    }, Bp = Za.prototype;
    Bp.perform = function(t) {
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
        var o = e(this._modBy), s = this._modDataCount || 0, l = e(t && t.modBy), u = t && t.modDataCount || 0;
        (o !== l || s !== u) && (a = "reset");
        var h;
        (this._dirty || "reset" === a) && (this._dirty = !1, h = Qa(this, i)), this._modBy = l, 
        this._modDataCount = u;
        var c = t && t.step;
        if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, 
        this._progress) {
            var f = this._dueIndex, d = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
            if (!i && (h || d > f)) {
                var p = this._progress;
                if (_(p)) for (var g = 0; g < p.length; g++) $a(this, p[g], f, d, l, u); else $a(this, p, f, d, l, u);
            }
            this._dueIndex = d;
            var v = null != this._settedOutputEnd ? this._settedOutputEnd : d;
            this._outputDueEnd = v;
        } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
        return this.unfinished();
    };
    var Rp = function() {
        function t() {
            return n > i ? i++ : null;
        }
        function e() {
            var t = i % o * r + Math.ceil(i / o), e = i >= n ? null : a > t ? t : i;
            return i++, e;
        }
        var n, i, r, a, o, s = {
            reset: function(l, u, h, c) {
                i = l, n = u, r = h, a = c, o = Math.ceil(a / r), s.next = r > 1 && a > 0 ? e : t;
            }
        };
        return s;
    }();
    Bp.dirty = function() {
        this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, Bp.unfinished = function() {
        return this._progress && this._dueIndex < this._dueEnd;
    }, Bp.pipe = function(t) {
        (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, 
        t.dirty());
    }, Bp.dispose = function() {
        this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), 
        this._dirty = !1, this._disposed = !0);
    }, Bp.getUpstream = function() {
        return this._upstream;
    }, Bp.getDownstream = function() {
        return this._downstream;
    }, Bp.setOutputEnd = function(t) {
        this._outputDueEnd = this._settedOutputEnd = t;
    };
    var zp = Ln(), Np = Kd.extend({
        type: "series.__base__",
        seriesIndex: 0,
        coordinateSystem: null,
        defaultOption: null,
        legendDataProvider: null,
        visualColorAccessPath: "itemStyle.color",
        visualBorderColorAccessPath: "itemStyle.borderColor",
        layoutMode: null,
        init: function(t, e, n) {
            this.seriesIndex = this.componentIndex, this.dataTask = Ya({
                count: to,
                reset: eo
            }), this.dataTask.context = {
                model: this
            }, this.mergeDefaultAndTheme(t, n), ia(this);
            var i = this.getInitialData(t, n);
            io(i, this), this.dataTask.context.data = i, zp(this).dataBeforeProcessed = i, Ka(this);
        },
        mergeDefaultAndTheme: function(t, e) {
            var n = this.layoutMode, i = n ? Yr(t) : {}, a = this.subType;
            Kd.hasClass(a) && (a += "Series"), r(t, e.getTheme().get(this.subType)), r(t, this.getDefaultOption()), 
            Mn(t, "label", [ "show" ]), this.fillDataTextStyle(t.data), n && jr(t, i, n);
        },
        mergeOption: function(t, e) {
            t = r(this.option, t, !0), this.fillDataTextStyle(t.data);
            var n = this.layoutMode;
            n && jr(this.option, t, n), ia(this);
            var i = this.getInitialData(t, e);
            io(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, zp(this).dataBeforeProcessed = i, 
            Ka(this);
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
            return zp(this).data;
        },
        setData: function(t) {
            var e = ao(this);
            if (e) {
                var n = e.context;
                n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, 
                e !== this.dataTask && (n.data = t);
            }
            zp(this).data = t;
        },
        getSource: function() {
            return ea(this);
        },
        getRawData: function() {
            return zp(this).dataBeforeProcessed;
        },
        getBaseAxis: function() {
            var t = this.coordinateSystem;
            return t && t.getBaseAxis && t.getBaseAxis();
        },
        formatTooltip: function(t, e, n, i) {
            var r = this, a = "html" === (i = i || "html") ? "<br/>" : "\n", o = "richText" === i, s = {}, l = 0, u = this.getData(), h = u.mapDimension("defaultedTooltip", !0), c = h.length, f = this.getRawValue(t), p = _(f), v = u.getItemVisual(t, "color");
            b(v) && v.colorStops && (v = (v.colorStops[0] || {}).color), v = v || "transparent";
            var m = (c > 1 || p && !c ? function(n) {
                function a(t, n) {
                    var a = u.getDimensionInfo(n);
                    if (a && !1 !== a.otherDims.tooltip) {
                        var h = a.type, d = "sub" + r.seriesIndex + "at" + l, p = Hr({
                            color: v,
                            type: "subItem",
                            renderMode: i,
                            markerId: d
                        }), g = "string" == typeof p ? p : p.content, m = (c ? g + Vr(a.displayName || "-") + ": " : "") + Vr("ordinal" === h ? t + "" : "time" === h ? e ? "" : qr("yyyy/MM/dd hh:mm:ss", t) : Fr(t));
                        m && f.push(m), o && (s[d] = v, ++l);
                    }
                }
                var c = g(n, function(t, e, n) {
                    var i = u.getDimensionInfo(n);
                    return t |= i && !1 !== i.tooltip && null != i.displayName;
                }, 0), f = [];
                h.length ? d(h, function(e) {
                    a(Ua(u, t, e), e);
                }) : d(n, a);
                var p = c ? o ? "\n" : "<br/>" : "", m = p + f.join(p || ", ");
                return {
                    renderMode: i,
                    content: m,
                    style: s
                };
            }(f) : function(t) {
                return {
                    renderMode: i,
                    content: Vr(Fr(t)),
                    style: s
                };
            }(c ? Ua(u, t, h[0]) : p ? f[0] : f)).content, y = r.seriesIndex + "at" + l, x = Hr({
                color: v,
                type: "item",
                renderMode: i,
                markerId: y
            });
            s[y] = v, ++l;
            var w = u.getName(t), M = this.name;
            kn(this) || (M = ""), M = M ? Vr(M) + (e ? ": " : a) : "";
            var S = "string" == typeof x ? x : x.content;
            return {
                html: e ? S + M + m : M + S + (w ? Vr(w) + ": " + m : m),
                markers: s
            };
        },
        isAnimationEnabled: function() {
            if (Cu.node) return !1;
            var t = this.getShallow("animation");
            return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), 
            t;
        },
        restoreData: function() {
            this.dataTask.dirty();
        },
        getColorFromPalette: function(t, e, n) {
            var i = this.ecModel, r = np.getColorFromPalette.call(this, t, e, n);
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
    c(Np, Ep), c(Np, np);
    var Fp = function() {
        this.group = new Nh(), this.uid = Tr("viewComponent");
    };
    Fp.prototype = {
        constructor: Fp,
        init: function() {},
        render: function() {},
        dispose: function() {},
        filterForExposedEvent: null
    };
    var Vp = Fp.prototype;
    Vp.updateView = Vp.updateLayout = Vp.updateVisual = function() {}, Fn(Fp), Gn(Fp, {
        registerWhenExtend: !0
    });
    var Wp = function() {
        var t = Ln();
        return function(e) {
            var n = t(e), i = e.pipelineContext, r = n.large, a = n.progressiveRender, o = n.large = i.large, s = n.progressiveRender = i.progressiveRender;
            return !!(r ^ o || a ^ s) && "reset";
        };
    }, Hp = Ln(), Gp = Wp();
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
    var qp = oo.prototype;
    qp.updateView = qp.updateLayout = qp.updateVisual = function(t, e, n, i) {
        this.render(t, e, n, i);
    }, Fn(oo), Gn(oo, {
        registerWhenExtend: !0
    }), oo.markUpdateMethod = function(t, e) {
        Hp(t).updateMethod = e;
    };
    var Xp = {
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
    }, Up = {
        createOnAllSeries: !0,
        performRawSeries: !0,
        reset: function(t, e) {
            var n = t.getData(), i = (t.visualColorAccessPath || "itemStyle.color").split("."), r = t.get(i) || t.getColorFromPalette(t.name, null, e.getSeriesCount());
            n.setVisual("color", r);
            var a = (t.visualBorderColorAccessPath || "itemStyle.borderColor").split("."), o = t.get(a);
            if (n.setVisual("borderColor", o), !e.isSeriesFiltered(t)) {
                "function" != typeof r || r instanceof fd || n.each(function(e) {
                    n.setItemVisual(e, "color", r(t.getDataParams(e)));
                });
                return {
                    dataEach: n.hasItemOption ? function(t, e) {
                        var n = t.getItemModel(e), r = n.get(i, !0), o = n.get(a, !0);
                        null != r && t.setItemVisual(e, "color", r), null != o && t.setItemVisual(e, "borderColor", o);
                    } : null
                };
            }
        }
    }, jp = {
        legend: {
            selector: {
                all: "全选",
                inverse: "反选"
            }
        },
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
    }, Yp = function(t, e) {
        function n(t, e) {
            if ("string" != typeof t) return t;
            var n = t;
            return d(e, function(t, e) {
                n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t);
            }), n;
        }
        function i(t) {
            var e = a.get(t);
            if (null == e) {
                for (var n = t.split("."), i = jp.aria, r = 0; r < n.length; ++r) i = i[n[r]];
                return i;
            }
            return e;
        }
        function r(t) {
            return jp.series.typeNames[t] || "自定义图";
        }
        var a = e.getModel("aria");
        if (a.get("show")) {
            if (a.get("description")) return void t.setAttribute("aria-label", a.get("description"));
            var o = 0;
            e.eachSeries(function() {
                ++o;
            }, this);
            var s, l = a.get("data.maxCount") || 10, u = a.get("series.maxCount") || 10, h = Math.min(o, u);
            if (!(1 > o)) {
                var c = function() {
                    var t = e.getModel("title").option;
                    return t && t.length && (t = t[0]), t && t.text;
                }();
                s = c ? n(i("general.withTitle"), {
                    title: c
                }) : i("general.withoutTitle");
                var f = [];
                s += n(i(o > 1 ? "series.multiple.prefix" : "series.single.prefix"), {
                    seriesCount: o
                }), e.eachSeries(function(t, e) {
                    if (h > e) {
                        var a, s = t.get("name"), u = "series." + (o > 1 ? "multiple" : "single") + ".";
                        a = n(a = i(s ? u + "withName" : u + "withoutName"), {
                            seriesId: t.seriesIndex,
                            seriesName: t.get("name"),
                            seriesType: r(t.subType)
                        });
                        var c = t.getData();
                        window.data = c, a += c.count() > l ? n(i("data.partialData"), {
                            displayCnt: l
                        }) : i("data.allData");
                        for (var d = [], p = 0; p < c.count(); p++) if (l > p) {
                            var g = c.getName(p), v = Ua(c, p);
                            d.push(n(i(g ? "data.withName" : "data.withoutName"), {
                                name: g,
                                value: v
                            }));
                        }
                        a += d.join(i("data.separator.middle")) + i("data.separator.end"), f.push(a);
                    }
                }), s += f.join(i("series.multiple.separator.middle")) + i("series.multiple.separator.end"), 
                t.setAttribute("aria-label", s);
            }
        }
    }, Zp = Math.PI, $p = fo.prototype;
    $p.restoreData = function(t, e) {
        t.restoreData(e), this._stageTaskMap.each(function(t) {
            var e = t.overallTask;
            e && e.dirty();
        });
    }, $p.getPerformArgs = function(t, e) {
        if (t.__pipeline) {
            var n = this._pipelineMap.get(t.__pipeline.id), i = n.context, r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex ? n.step : null, a = i && i.modDataCount;
            return {
                step: r,
                modBy: null != a ? Math.ceil(a / r) : null,
                modDataCount: a
            };
        }
    }, $p.getPipeline = function(t) {
        return this._pipelineMap.get(t);
    }, $p.updateStreamModes = function(t, e) {
        var n = this._pipelineMap.get(t.uid), i = t.getData().count(), r = n.progressiveEnabled && e.incrementalPrepareRender && i >= n.threshold, a = t.get("large") && i >= t.get("largeThreshold"), o = "mod" === t.get("progressiveChunkMode") ? i : null;
        t.pipelineContext = n.context = {
            progressiveRender: r,
            modDataCount: o,
            large: a
        };
    }, $p.restorePipelines = function(t) {
        var e = this, n = e._pipelineMap = z();
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
            }), To(e, t, t.dataTask);
        });
    }, $p.prepareStageTasks = function() {
        var t = this._stageTaskMap, e = this.ecInstance.getModel(), n = this.api;
        d(this._allHandlers, function(i) {
            var r = t.get(i.uid) || t.set(i.uid, []);
            i.reset && go(this, i, r, e, n), i.overallReset && vo(this, i, r, e, n);
        }, this);
    }, $p.prepareView = function(t, e, n, i) {
        var r = t.renderTask, a = r.context;
        a.model = e, a.ecModel = n, a.api = i, r.__block = !t.incrementalPrepareRender, 
        To(this, e, r);
    }, $p.performDataProcessorTasks = function(t, e) {
        po(this, this._dataProcessorHandlers, t, e, {
            block: !0
        });
    }, $p.performVisualTasks = function(t, e, n) {
        po(this, this._visualHandlers, t, e, n);
    }, $p.performSeriesTasks = function(t) {
        var e;
        t.eachSeries(function(t) {
            e |= t.dataTask.perform();
        }), this.unfinished |= e;
    }, $p.plan = function() {
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
    var Qp = $p.updatePayload = function(t, e) {
        "remain" !== e && (t.context.payload = e);
    }, Kp = Mo(0);
    fo.wrapStageHandler = function(t, e) {
        return x(t) && (t = {
            overallReset: t,
            seriesType: Co(t)
        }), t.uid = Tr("stageHandler"), e && (t.visualType = e), t;
    };
    var Jp, tg = {}, eg = {};
    Io(tg, pp), Io(eg, _a), tg.eachSeriesByType = tg.eachRawSeriesByType = function(t) {
        Jp = t;
    }, tg.eachComponent = function(t) {
        "series" === t.mainType && t.subType && (Jp = t.subType);
    };
    var ng = [ "#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF" ], ig = {
        color: ng,
        colorLayer: [ [ "#37A2DA", "#ffd85c", "#fd7b5f" ], [ "#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5" ], [ "#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF" ], ng ]
    }, rg = "#eee", ag = function() {
        return {
            axisLine: {
                lineStyle: {
                    color: rg
                }
            },
            axisTick: {
                lineStyle: {
                    color: rg
                }
            },
            axisLabel: {
                textStyle: {
                    color: rg
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
                    color: rg
                }
            }
        };
    }, og = [ "#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42" ], sg = {
        color: og,
        backgroundColor: "#333",
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: rg
                },
                crossStyle: {
                    color: rg
                }
            }
        },
        legend: {
            textStyle: {
                color: rg
            }
        },
        textStyle: {
            color: rg
        },
        title: {
            textStyle: {
                color: rg
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: rg
                }
            }
        },
        dataZoom: {
            textStyle: {
                color: rg
            }
        },
        visualMap: {
            textStyle: {
                color: rg
            }
        },
        timeline: {
            lineStyle: {
                color: rg
            },
            itemStyle: {
                normal: {
                    color: og[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: rg
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: rg,
                    borderColor: rg
                }
            }
        },
        timeAxis: ag(),
        logAxis: ag(),
        valueAxis: ag(),
        categoryAxis: ag(),
        line: {
            symbol: "circle"
        },
        graph: {
            color: og
        },
        gauge: {
            title: {
                textStyle: {
                    color: rg
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
    sg.categoryAxis.splitLine.show = !1, Kd.extend({
        type: "dataset",
        defaultOption: {
            seriesLayoutBy: hp,
            sourceHeader: null,
            dimensions: null,
            source: null
        },
        optionUpdated: function() {
            ta(this);
        }
    }), Fp.extend({
        type: "dataset"
    });
    var lg = Mi.extend({
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
    }), ug = /[\s,]+/;
    Do.prototype.parse = function(t, e) {
        e = e || {};
        var n = ko(t);
        if (!n) throw new Error("Illegal svg");
        var i = new Nh();
        this._root = i;
        var r = n.getAttribute("viewBox") || "", a = parseFloat(n.getAttribute("width") || e.width), o = parseFloat(n.getAttribute("height") || e.height);
        isNaN(a) && (a = null), isNaN(o) && (o = null), Oo(n, i, null, !0);
        for (var s = n.firstChild; s; ) this._parseNode(s, i), s = s.nextSibling;
        var l, u;
        if (r) {
            var h = O(r).split(ug);
            h.length >= 4 && (l = {
                x: parseFloat(h[0] || 0),
                y: parseFloat(h[1] || 0),
                width: parseFloat(h[2]),
                height: parseFloat(h[3])
            });
        }
        if (l && null != a && null != o && (u = zo(l, a, o), !e.ignoreViewBox)) {
            var c = i;
            (i = new Nh()).add(c), c.scale = u.scale.slice(), c.position = u.position.slice();
        }
        return e.ignoreRootClip || null == a || null == o || i.setClipPath(new ad({
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
            viewBoxTransform: u
        };
    }, Do.prototype._parseNode = function(t, e) {
        var n = t.nodeName.toLowerCase();
        "defs" === n ? this._isDefine = !0 : "text" === n && (this._isText = !0);
        var i;
        if (this._isDefine) {
            if (o = cg[n]) {
                var r = o.call(this, t), a = t.getAttribute("id");
                a && (this._defs[a] = r);
            }
        } else {
            var o = hg[n];
            o && (i = o.call(this, t, e), e.add(i));
        }
        for (var s = t.firstChild; s; ) 1 === s.nodeType && this._parseNode(s, i), 3 === s.nodeType && this._isText && this._parseText(s, i), 
        s = s.nextSibling;
        "defs" === n ? this._isDefine = !1 : "text" === n && (this._isText = !1);
    }, Do.prototype._parseText = function(t, e) {
        if (1 === t.nodeType) {
            var n = t.getAttribute("dx") || 0, i = t.getAttribute("dy") || 0;
            this._textX += parseFloat(n), this._textY += parseFloat(i);
        }
        var r = new Yf({
            style: {
                text: t.textContent,
                transformText: !0
            },
            position: [ this._textX || 0, this._textY || 0 ]
        });
        Lo(e, r), Oo(t, r, this._defs);
        var a = r.style.fontSize;
        a && 9 > a && (r.style.fontSize = 9, r.scale = r.scale || [ 1, 1 ], r.scale[0] *= a / 9, 
        r.scale[1] *= a / 9);
        var o = r.getBoundingRect();
        return this._textX += o.width, e.add(r), r;
    };
    var hg = {
        g: function(t, e) {
            var n = new Nh();
            return Lo(e, n), Oo(t, n, this._defs), n;
        },
        rect: function(t, e) {
            var n = new ad();
            return Lo(e, n), Oo(t, n, this._defs), n.setShape({
                x: parseFloat(t.getAttribute("x") || 0),
                y: parseFloat(t.getAttribute("y") || 0),
                width: parseFloat(t.getAttribute("width") || 0),
                height: parseFloat(t.getAttribute("height") || 0)
            }), n;
        },
        circle: function(t, e) {
            var n = new Zf();
            return Lo(e, n), Oo(t, n, this._defs), n.setShape({
                cx: parseFloat(t.getAttribute("cx") || 0),
                cy: parseFloat(t.getAttribute("cy") || 0),
                r: parseFloat(t.getAttribute("r") || 0)
            }), n;
        },
        line: function(t, e) {
            var n = new sd();
            return Lo(e, n), Oo(t, n, this._defs), n.setShape({
                x1: parseFloat(t.getAttribute("x1") || 0),
                y1: parseFloat(t.getAttribute("y1") || 0),
                x2: parseFloat(t.getAttribute("x2") || 0),
                y2: parseFloat(t.getAttribute("y2") || 0)
            }), n;
        },
        ellipse: function(t, e) {
            var n = new lg();
            return Lo(e, n), Oo(t, n, this._defs), n.setShape({
                cx: parseFloat(t.getAttribute("cx") || 0),
                cy: parseFloat(t.getAttribute("cy") || 0),
                rx: parseFloat(t.getAttribute("rx") || 0),
                ry: parseFloat(t.getAttribute("ry") || 0)
            }), n;
        },
        polygon: function(t, e) {
            var n = t.getAttribute("points");
            n && (n = Po(n));
            var i = new ed({
                shape: {
                    points: n || []
                }
            });
            return Lo(e, i), Oo(t, i, this._defs), i;
        },
        polyline: function(t, e) {
            var n = new Mi();
            Lo(e, n), Oo(t, n, this._defs);
            var i = t.getAttribute("points");
            return i && (i = Po(i)), new nd({
                shape: {
                    points: i || []
                }
            });
        },
        image: function(t, e) {
            var n = new ln();
            return Lo(e, n), Oo(t, n, this._defs), n.setStyle({
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
            var o = new Nh();
            return Lo(e, o), Oo(t, o, this._defs), o;
        },
        tspan: function(t, e) {
            var n = t.getAttribute("x"), i = t.getAttribute("y");
            null != n && (this._textX = parseFloat(n)), null != i && (this._textY = parseFloat(i));
            var r = t.getAttribute("dx") || 0, a = t.getAttribute("dy") || 0, o = new Nh();
            return Lo(e, o), Oo(t, o, this._defs), this._textX += r, this._textY += a, o;
        },
        path: function(t, e) {
            var n = Ii(t.getAttribute("d") || "");
            return Lo(e, n), Oo(t, n, this._defs), n;
        }
    }, cg = {
        lineargradient: function(t) {
            var e = parseInt(t.getAttribute("x1") || 0, 10), n = parseInt(t.getAttribute("y1") || 0, 10), i = parseInt(t.getAttribute("x2") || 10, 10), r = parseInt(t.getAttribute("y2") || 0, 10), a = new dd(e, n, i, r);
            return Ao(t, a), a;
        },
        radialgradient: function() {}
    }, fg = {
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
    }, dg = /url\(\s*#(.*?)\)/, pg = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g, gg = /([^\s:;]+)\s*:\s*([^:;]+)/g, vg = z(), mg = {
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
            } ]), d(i, function(t) {
                var e = t.type;
                "geoJson" === e && (e = t.type = "geoJSON"), (0, yg[e])(t);
            }), vg.set(t, i);
        },
        retrieveMap: function(t) {
            return vg.get(t);
        }
    }, yg = {
        geoJSON: function(t) {
            var e = t.source;
            t.geoJSON = w(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e;
        },
        svg: function(t) {
            t.svgXML = ko(t.source);
        }
    }, _g = P, xg = d, wg = x, bg = b, Mg = Kd.parseClassType, Sg = {
        zrender: "4.1.2"
    }, Tg = 1e3, Cg = 1e3, Ig = 3e3, kg = {
        PROCESSOR: {
            FILTER: Tg,
            SERIES_FILTER: 800,
            STATISTIC: 5e3
        },
        VISUAL: {
            LAYOUT: Cg,
            PROGRESSIVE_LAYOUT: 1100,
            GLOBAL: 2e3,
            CHART: Ig,
            POST_CHART_LAYOUT: 3500,
            COMPONENT: 4e3,
            BRUSH: 5e3
        }
    }, Dg = "__flagInMainProcess", Ag = "__optionUpdated", Lg = /^[a-zA-Z0-9_]+$/;
    Fo.prototype.on = No("on", !0), Fo.prototype.off = No("off", !0), Fo.prototype.one = No("one", !0), 
    c(Fo, Yu);
    var Pg = Vo.prototype;
    Pg._onframe = function() {
        if (!this._disposed) {
            var t = this._scheduler;
            if (this[Ag]) {
                var e = this[Ag].silent;
                this[Dg] = !0, Ho(this), Og.update.call(this), this[Dg] = !1, this[Ag] = !1, Uo.call(this, e), 
                jo.call(this, e);
            } else if (t.unfinished) {
                var n = 1, i = this._model;
                this._api;
                t.unfinished = !1;
                do {
                    var r = +new Date();
                    t.performSeriesTasks(i), t.performDataProcessorTasks(i), qo(this, i), t.performVisualTasks(i), 
                    Jo(this, this._model, 0, "remain"), n -= +new Date() - r;
                } while (n > 0 && t.unfinished);
                t.unfinished || this._zr.flush();
            }
        }
    }, Pg.getDom = function() {
        return this._dom;
    }, Pg.getZr = function() {
        return this._zr;
    }, Pg.setOption = function(t, e, n) {
        if (!this._disposed) {
            var i;
            if (bg(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[Dg] = !0, !this._model || e) {
                var r = new wa(this._api), a = this._theme, o = this._model = new pp();
                o.scheduler = this._scheduler, o.init(null, null, a, r);
            }
            this._model.setOption(t, Ng), n ? (this[Ag] = {
                silent: i
            }, this[Dg] = !1) : (Ho(this), Og.update.call(this), this._zr.flush(), this[Ag] = !1, 
            this[Dg] = !1, Uo.call(this, i), jo.call(this, i));
        }
    }, Pg.setTheme = function() {
        console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    }, Pg.getModel = function() {
        return this._model;
    }, Pg.getOption = function() {
        return this._model && this._model.getOption();
    }, Pg.getWidth = function() {
        return this._zr.getWidth();
    }, Pg.getHeight = function() {
        return this._zr.getHeight();
    }, Pg.getDevicePixelRatio = function() {
        return this._zr.painter.dpr || window.devicePixelRatio || 1;
    }, Pg.getRenderedCanvas = function(t) {
        if (Cu.canvasSupported) return (t = t || {}).pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor"), 
        this._zr.painter.getRenderedCanvas(t);
    }, Pg.getSvgDataUrl = function() {
        if (Cu.svgSupported) {
            var t = this._zr;
            return d(t.storage.getDisplayList(), function(t) {
                t.stopAnimation(!0);
            }), t.painter.pathToDataUrl();
        }
    }, Pg.getDataURL = function(t) {
        if (!this._disposed) {
            var e = (t = t || {}).excludeComponents, n = this._model, i = [], r = this;
            xg(e, function(t) {
                n.eachComponent({
                    mainType: t
                }, function(t) {
                    var e = r._componentsMap[t.__viewId];
                    e.group.ignore || (i.push(e), e.group.ignore = !0);
                });
            });
            var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
            return xg(i, function(t) {
                t.group.ignore = !1;
            }), a;
        }
    }, Pg.getConnectedDataURL = function(t) {
        if (!this._disposed && Cu.canvasSupported) {
            var e = this.group, n = Math.min, r = Math.max, a = 1 / 0;
            if (qg[e]) {
                var o = a, s = a, l = -a, u = -a, h = [], c = t && t.pixelRatio || 1;
                d(Gg, function(a) {
                    if (a.group === e) {
                        var c = a.getRenderedCanvas(i(t)), f = a.getDom().getBoundingClientRect();
                        o = n(f.left, o), s = n(f.top, s), l = r(f.right, l), u = r(f.bottom, u), h.push({
                            dom: c,
                            left: f.left,
                            top: f.top
                        });
                    }
                });
                var f = (l *= c) - (o *= c), p = (u *= c) - (s *= c), g = zu();
                g.width = f, g.height = p;
                var v = xn(g);
                return t.connectedBackgroundColor && v.add(new ad({
                    shape: {
                        x: 0,
                        y: 0,
                        width: f,
                        height: p
                    },
                    style: {
                        fill: t.connectedBackgroundColor
                    }
                })), xg(h, function(t) {
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
    }, Pg.convertToPixel = y(Wo, "convertToPixel"), Pg.convertFromPixel = y(Wo, "convertFromPixel"), 
    Pg.containPixel = function(t, e) {
        if (!this._disposed) {
            var n;
            return t = Pn(this._model, t), d(t, function(t, i) {
                i.indexOf("Models") >= 0 && d(t, function(t) {
                    var r = t.coordinateSystem;
                    if (r && r.containPoint) n |= !!r.containPoint(e); else if ("seriesModels" === i) {
                        var a = this._chartsMap[t.__viewId];
                        a && a.containPoint && (n |= a.containPoint(e, t));
                    }
                }, this);
            }, this), !!n;
        }
    }, Pg.getVisual = function(t, e) {
        var n = (t = Pn(this._model, t, {
            defaultMainType: "series"
        })).seriesModel.getData(), i = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? n.indexOfRawIndex(t.dataIndex) : null;
        return null != i ? n.getItemVisual(i, e) : n.getVisual(e);
    }, Pg.getViewOfComponentModel = function(t) {
        return this._componentsMap[t.__viewId];
    }, Pg.getViewOfSeriesModel = function(t) {
        return this._chartsMap[t.__viewId];
    };
    var Og = {
        prepareAndUpdate: function(t) {
            Ho(this), Og.update.call(this, t);
        },
        update: function(t) {
            var e = this._model, n = this._api, i = this._zr, r = this._coordSysMgr, a = this._scheduler;
            if (e) {
                a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, n), a.performDataProcessorTasks(e, t), 
                qo(this, e), r.update(e, n), $o(e), a.performVisualTasks(e, t), Qo(this, e, n, t);
                var o = e.get("backgroundColor") || "transparent";
                if (Cu.canvasSupported) i.setBackgroundColor(o); else {
                    var s = zt(o);
                    o = Gt(s, "rgb"), 0 === s[3] && (o = "transparent");
                }
                ts(e, n);
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
                var a = z();
                e.eachSeries(function(r) {
                    var o = n._chartsMap[r.__viewId];
                    if (o.updateTransform) {
                        var s = o.updateTransform(r, e, i, t);
                        s && s.update && a.set(r.uid, 1);
                    } else a.set(r.uid, 1);
                }), $o(e), this._scheduler.performVisualTasks(e, t, {
                    setDirty: !0,
                    dirtyMap: a
                }), Jo(n, e, 0, t, a), ts(e, this._api);
            }
        },
        updateView: function(t) {
            var e = this._model;
            e && (oo.markUpdateMethod(t, "updateView"), $o(e), this._scheduler.performVisualTasks(e, t, {
                setDirty: !0
            }), Qo(this, this._model, this._api, t), ts(e, this._api));
        },
        updateVisual: function(t) {
            Og.update.call(this, t);
        },
        updateLayout: function(t) {
            Og.update.call(this, t);
        }
    };
    Pg.resize = function(t) {
        if (!this._disposed) {
            this._zr.resize(t);
            var e = this._model;
            if (this._loadingFX && this._loadingFX.resize(), e) {
                var n = e.resetOption("media"), i = t && t.silent;
                this[Dg] = !0, n && Ho(this), Og.update.call(this), this[Dg] = !1, Uo.call(this, i), 
                jo.call(this, i);
            }
        }
    }, Pg.showLoading = function(t, e) {
        if (!this._disposed && (bg(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), 
        Hg[t])) {
            var n = Hg[t](this._api, e), i = this._zr;
            this._loadingFX = n, i.add(n);
        }
    }, Pg.hideLoading = function() {
        this._disposed || (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);
    }, Pg.makeActionFromEvent = function(t) {
        var e = o({}, t);
        return e.type = Rg[t.type], e;
    }, Pg.dispatchAction = function(t, e) {
        if (!this._disposed && (bg(e) || (e = {
            silent: !!e
        }), Bg[t.type] && this._model)) {
            if (this[Dg]) return void this._pendingActions.push(t);
            Xo.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : !1 !== e.flush && Cu.browser.weChat && this._throttledZrFlush(), 
            Uo.call(this, e.silent), jo.call(this, e.silent);
        }
    }, Pg.appendData = function(t) {
        if (!this._disposed) {
            var e = t.seriesIndex;
            this.getModel().getSeriesByIndex(e).appendData(t), this._scheduler.unfinished = !0;
        }
    }, Pg.on = No("on", !1), Pg.off = No("off", !1), Pg.one = No("one", !1);
    var Eg = [ "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu" ];
    Pg._initEvents = function() {
        xg(Eg, function(t) {
            var e = function(e) {
                var n, i = this.getModel(), r = e.target;
                if ("globalout" === t) n = {}; else if (r && null != r.dataIndex) {
                    var a = r.dataModel || i.getSeriesByIndex(r.seriesIndex);
                    n = a && a.getDataParams(r.dataIndex, r.dataType, r) || {};
                } else r && r.eventData && (n = o({}, r.eventData));
                if (n) {
                    var s = n.componentType, l = n.componentIndex;
                    ("markLine" === s || "markPoint" === s || "markArea" === s) && (s = "series", l = n.seriesIndex);
                    var u = s && null != l && i.getComponent(s, l), h = u && this["series" === u.mainType ? "_chartsMap" : "_componentsMap"][u.__viewId];
                    n.event = e, n.type = t, this._ecEventProcessor.eventInfo = {
                        targetEl: r,
                        packedEvent: n,
                        model: u,
                        view: h
                    }, this.trigger(t, n);
                }
            };
            e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this);
        }, this), xg(Rg, function(t, e) {
            this._messageCenter.on(e, function(t) {
                this.trigger(e, t);
            }, this);
        }, this);
    }, Pg.isDisposed = function() {
        return this._disposed;
    }, Pg.clear = function() {
        this._disposed || this.setOption({
            series: []
        }, !0);
    }, Pg.dispose = function() {
        if (!this._disposed) {
            this._disposed = !0, En(this.getDom(), jg, "");
            var t = this._api, e = this._model;
            xg(this._componentsViews, function(n) {
                n.dispose(e, t);
            }), xg(this._chartsViews, function(n) {
                n.dispose(e, t);
            }), this._zr.dispose(), delete Gg[this.id];
        }
    }, c(Vo, Yu), as.prototype = {
        constructor: as,
        normalizeQuery: function(t) {
            var e = {}, n = {}, i = {};
            if (w(t)) {
                var r = Mg(t);
                e.mainType = r.main || null, e.subType = r.sub || null;
            } else {
                var a = [ "Index", "Name", "Id" ], o = {
                    name: 1,
                    dataIndex: 1,
                    dataType: 1
                };
                d(t, function(t, r) {
                    for (var s = !1, l = 0; l < a.length; l++) {
                        var u = a[l], h = r.lastIndexOf(u);
                        if (h > 0 && h === r.length - u.length) {
                            var c = r.slice(0, h);
                            "data" !== c && (e.mainType = c, e[u.toLowerCase()] = t, s = !0);
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
            var l = e.cptQuery, u = e.dataQuery;
            return n(l, o, "mainType") && n(l, o, "subType") && n(l, o, "index", "componentIndex") && n(l, o, "name") && n(l, o, "id") && n(u, a, "name") && n(u, a, "dataIndex") && n(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, a));
        },
        afterTrigger: function() {
            this.eventInfo = null;
        }
    };
    var Bg = {}, Rg = {}, zg = [], Ng = [], Fg = [], Vg = [], Wg = {}, Hg = {}, Gg = {}, qg = {}, Xg = new Date() - 0, Ug = new Date() - 0, jg = "_echarts_instance_", Yg = ss;
    ps(2e3, Up), hs(kp), cs(900, function(t) {
        var e = z();
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
        }), e.each(Na);
    }), vs("default", function(t, e) {
        s(e = e || {}, {
            text: "loading",
            color: "#c23531",
            textColor: "#000",
            maskColor: "rgba(255, 255, 255, 0.8)",
            zlevel: 0
        });
        var n = new ad({
            style: {
                fill: e.maskColor
            },
            zlevel: e.zlevel,
            z: 1e4
        }), i = new hd({
            shape: {
                startAngle: -Zp / 2,
                endAngle: -Zp / 2 + .1,
                r: 10
            },
            style: {
                stroke: e.color,
                lineCap: "round",
                lineWidth: 5
            },
            zlevel: e.zlevel,
            z: 10001
        }), r = new ad({
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
            endAngle: 3 * Zp / 2
        }).start("circularInOut"), i.animateShape(!0).when(1e3, {
            startAngle: 3 * Zp / 2
        }).delay(300).start("circularInOut");
        var a = new Nh();
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
    }), fs({
        type: "highlight",
        event: "highlight",
        update: "highlight"
    }, N), fs({
        type: "downplay",
        event: "downplay",
        update: "downplay"
    }, N), us("light", ig), us("dark", sg);
    var Zg = {};
    xs.prototype = {
        constructor: xs,
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
            for (ws(t, {}, i, "_oldKeyGetter", this), ws(e, n, r, "_newKeyGetter", this), a = 0; a < t.length; a++) null != (s = n[o = i[a]]) ? ((u = s.length) ? (1 === u && (n[o] = null), 
            s = s.shift()) : n[o] = null, this._update && this._update(s, a)) : this._remove && this._remove(a);
            for (var a = 0; a < r.length; a++) {
                var o = r[a];
                if (n.hasOwnProperty(o)) {
                    var s = n[o];
                    if (null == s) continue;
                    if (s.length) for (var l = 0, u = s.length; u > l; l++) this._add && this._add(s[l]); else this._add && this._add(s);
                }
            }
        }
    };
    var $g = z([ "tooltip", "label", "itemName", "itemId", "seriesName" ]), Qg = b, Kg = "undefined", Jg = -1, tv = "e\0\0", ev = {
        float: ("undefined" == typeof Float64Array ? "undefined" : t(Float64Array)) === Kg ? Array : Float64Array,
        int: ("undefined" == typeof Int32Array ? "undefined" : t(Int32Array)) === Kg ? Array : Int32Array,
        ordinal: Array,
        number: Array,
        time: Array
    }, nv = ("undefined" == typeof Uint32Array ? "undefined" : t(Uint32Array)) === Kg ? Array : Uint32Array, iv = ("undefined" == typeof Int32Array ? "undefined" : t(Int32Array)) === Kg ? Array : Int32Array, rv = ("undefined" == typeof Uint16Array ? "undefined" : t(Uint16Array)) === Kg ? Array : Uint16Array, av = [ "hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx" ], ov = [ "_extent", "_approximateExtent", "_rawExtent" ], sv = function(t, e) {
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
        this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = bs(this), 
        this._invertedIndicesMap = r, this._calculationInfo = {}, this.userOutput = this._dimensionsSummary.userOutput;
    }, lv = sv.prototype;
    lv.type = "list", lv.hasItemOption = !0, lv.getDimension = function(t) {
        return ("number" == typeof t || !isNaN(t) && !this._dimensionInfos.hasOwnProperty(t)) && (t = this.dimensions[t]), 
        t;
    }, lv.getDimensionInfo = function(t) {
        return this._dimensionInfos[this.getDimension(t)];
    }, lv.getDimensionsOnCoord = function() {
        return this._dimensionsSummary.dataDimsOnCoord.slice();
    }, lv.mapDimension = function(t, e) {
        var n = this._dimensionsSummary;
        if (null == e) return n.encodeFirstDimNotExtra[t];
        var i = n.encode[t];
        return !0 === e ? (i || []).slice() : i && i[e];
    }, lv.initData = function(t, e, n) {
        (Jr.isInstance(t) || f(t)) && (t = new Fa(t, this.dimensions.length)), this._rawData = t, 
        this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], 
        this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = Pp[this._rawData.getSource().sourceFormat], 
        this._dimValueGetter = n = n || this.defaultDimValueGetter, this._dimValueGetterArrayRows = Pp.arrayRows, 
        this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1);
    }, lv.getProvider = function() {
        return this._rawData;
    }, lv.appendData = function(t) {
        var e = this._rawData, n = this.count();
        e.appendData(t);
        var i = e.count();
        e.persistent || (i += n), this._initDataFromProvider(n, i);
    }, lv.appendValues = function(t, e) {
        for (var n = this._chunkSize, i = this._storage, r = this.dimensions, a = r.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e ? e.length : 0), u = this._chunkCount, h = 0; a > h; h++) o[m = r[h]] || (o[m] = [ 1 / 0, -1 / 0 ]), 
        i[m] || (i[m] = []), Ds(i, this._dimensionInfos[m], n, u, l), this._chunkCount = i[m].length;
        for (var c = new Array(a), f = s; l > f; f++) {
            for (var d = f - s, p = Math.floor(f / n), g = f % n, v = 0; a > v; v++) {
                var m = r[v], y = this._dimValueGetterArrayRows(t[d] || c, m, d, v);
                i[m][p][g] = y;
                var _ = o[m];
                y < _[0] && (_[0] = y), y > _[1] && (_[1] = y);
            }
            e && (this._nameList[f] = e[d]);
        }
        this._rawCount = this._count = l, this._extent = {}, As(this);
    }, lv._initDataFromProvider = function(t, e) {
        if (!(t >= e)) {
            for (var n, i = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, u = this._nameList, h = this._idList, c = this._rawExtent, f = this._nameRepeatCount = {}, d = this._chunkCount, p = 0; s > p; p++) {
                c[w = o[p]] || (c[w] = [ 1 / 0, -1 / 0 ]);
                var g = l[w];
                0 === g.otherDims.itemName && (n = this._nameDimIdx = p), 0 === g.otherDims.itemId && (this._idDimIdx = p), 
                a[w] || (a[w] = []), Ds(a, g, i, d, e), this._chunkCount = a[w].length;
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
                    var T = u[m];
                    if (v && null == T) if (null != v.name) u[m] = T = v.name; else if (null != n) {
                        var C = o[n], I = a[C][y];
                        if (I) {
                            T = I[_];
                            var k = l[C].ordinalMeta;
                            k && k.categories.length && (T = k.categories[T]);
                        }
                    }
                    var D = null == v ? null : v.id;
                    null == D && null != T && (f[T] = f[T] || 0, D = T, f[T] > 0 && (D += "__ec__" + f[T]), 
                    f[T]++), null != D && (h[m] = D);
                }
            }
            !r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, 
            As(this);
        }
    }, lv.count = function() {
        return this._count;
    }, lv.getIndices = function() {
        var t = this._indices;
        if (t) {
            var e = t.constructor, n = this._count;
            if (e === Array) {
                i = new e(n);
                for (r = 0; n > r; r++) i[r] = t[r];
            } else i = new e(t.buffer, 0, n);
        } else for (var e = Cs(this), i = new e(this.count()), r = 0; r < i.length; r++) i[r] = r;
        return i;
    }, lv.get = function(t, e) {
        if (!(e >= 0 && e < this._count)) return NaN;
        var n = this._storage;
        if (!n[t]) return NaN;
        e = this.getRawIndex(e);
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize;
        return n[t][i][r];
    }, lv.getByRawIndex = function(t, e) {
        if (!(e >= 0 && e < this._rawCount)) return NaN;
        var n = this._storage[t];
        if (!n) return NaN;
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize;
        return n[i][r];
    }, lv._getFast = function(t, e) {
        var n = Math.floor(e / this._chunkSize), i = e % this._chunkSize;
        return this._storage[t][n][i];
    }, lv.getValues = function(t, e) {
        var n = [];
        _(t) || (e = t, t = this.dimensions);
        for (var i = 0, r = t.length; r > i; i++) n.push(this.get(t[i], e));
        return n;
    }, lv.hasValue = function(t) {
        for (var e = this._dimensionsSummary.dataDimsOnCoord, n = 0, i = e.length; i > n; n++) if (isNaN(this.get(e[n], t))) return !1;
        return !0;
    }, lv.getDataExtent = function(t) {
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
    }, lv.getApproximateExtent = function(t) {
        return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t);
    }, lv.setApproximateExtent = function(t, e) {
        e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, lv.getCalculationInfo = function(t) {
        return this._calculationInfo[t];
    }, lv.setCalculationInfo = function(t, e) {
        Qg(t) ? o(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, lv.getSum = function(t) {
        var e = 0;
        if (this._storage[t]) for (var n = 0, i = this.count(); i > n; n++) {
            var r = this.get(t, n);
            isNaN(r) || (e += r);
        }
        return e;
    }, lv.getMedian = function(t) {
        var e = [];
        this.each(t, function(t) {
            isNaN(t) || e.push(t);
        });
        var n = [].concat(e).sort(function(t, e) {
            return t - e;
        }), i = this.count();
        return 0 === i ? 0 : i % 2 == 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;
    }, lv.rawIndexOf = function(t, e) {
        var n = (t && this._invertedIndicesMap[t])[e];
        return null == n || isNaN(n) ? Jg : n;
    }, lv.indexOfName = function(t) {
        for (var e = 0, n = this.count(); n > e; e++) if (this.getName(e) === t) return e;
        return -1;
    }, lv.indexOfRawIndex = function(t) {
        if (t >= this._rawCount || 0 > t) return -1;
        if (!this._indices) return t;
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
    }, lv.indicesOfNearest = function(t, e, n) {
        var i = [];
        if (!this._storage[t]) return i;
        null == n && (n = 1 / 0);
        for (var r = Number.MAX_VALUE, a = -1, o = 0, s = this.count(); s > o; o++) {
            var l = e - this.get(t, o), u = Math.abs(l);
            n >= l && r >= u && ((r > u || l >= 0 && 0 > a) && (r = u, a = l, i.length = 0), 
            i.push(o));
        }
        return i;
    }, lv.getRawIndex = Ps, lv.getRawDataItem = function(t) {
        if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
        for (var e = [], n = 0; n < this.dimensions.length; n++) {
            var i = this.dimensions[n];
            e.push(this.get(i, t));
        }
        return e;
    }, lv.getName = function(t) {
        var e = this.getRawIndex(t);
        return this._nameList[e] || Ls(this, this._nameDimIdx, e) || "";
    }, lv.getId = function(t) {
        return Es(this, this.getRawIndex(t));
    }, lv.each = function(t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
            for (var r = (t = p(Bs(t), this.getDimension, this)).length, a = 0; a < this.count(); a++) switch (r) {
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
    }, lv.filterSelf = function(t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Bs(t), this.getDimension, this);
            for (var r = this.count(), a = new (Cs(this))(r), o = [], s = t.length, l = 0, u = t[0], h = 0; r > h; h++) {
                var c, f = this.getRawIndex(h);
                if (0 === s) c = e.call(n, h); else if (1 === s) {
                    var d = this._getFast(u, f);
                    c = e.call(n, d, h);
                } else {
                    for (var g = 0; s > g; g++) o[g] = this._getFast(u, f);
                    o[g] = h, c = e.apply(n, o);
                }
                c && (a[l++] = f);
            }
            return r > l && (this._indices = a), this._count = l, this._extent = {}, this.getRawIndex = this._indices ? Os : Ps, 
            this;
        }
    }, lv.selectRange = function(t) {
        if (this._count) {
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            var i = e.length;
            if (i) {
                var r = this.count(), a = new (Cs(this))(r), o = 0, s = e[0], l = t[s][0], u = t[s][1], h = !1;
                if (!this._indices) {
                    var c = 0;
                    if (1 === i) {
                        for (var f = this._storage[e[0]], d = 0; d < this._chunkCount; d++) for (var p = f[d], g = Math.min(this._count - d * this._chunkSize, this._chunkSize), v = 0; g > v; v++) ((w = p[v]) >= l && u >= w || isNaN(w)) && (a[o++] = c), 
                        c++;
                        h = !0;
                    } else if (2 === i) {
                        for (var f = this._storage[s], m = this._storage[e[1]], y = t[e[1]][0], _ = t[e[1]][1], d = 0; d < this._chunkCount; d++) for (var p = f[d], x = m[d], g = Math.min(this._count - d * this._chunkSize, this._chunkSize), v = 0; g > v; v++) {
                            var w = p[v], b = x[v];
                            (w >= l && u >= w || isNaN(w)) && (b >= y && _ >= b || isNaN(b)) && (a[o++] = c), 
                            c++;
                        }
                        h = !0;
                    }
                }
                if (!h) if (1 === i) for (v = 0; r > v; v++) {
                    S = this.getRawIndex(v);
                    ((w = this._getFast(s, S)) >= l && u >= w || isNaN(w)) && (a[o++] = S);
                } else for (v = 0; r > v; v++) {
                    for (var M = !0, S = this.getRawIndex(v), d = 0; i > d; d++) {
                        var T = e[d];
                        ((w = this._getFast(n, S)) < t[T][0] || w > t[T][1]) && (M = !1);
                    }
                    M && (a[o++] = this.getRawIndex(v));
                }
                return r > o && (this._indices = a), this._count = o, this._extent = {}, this.getRawIndex = this._indices ? Os : Ps, 
                this;
            }
        }
    }, lv.mapArray = function(t, e, n, i) {
        "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
        var r = [];
        return this.each(t, function() {
            r.push(e && e.apply(this, arguments));
        }, n), r;
    }, lv.map = function(e, n, i, r) {
        i = i || r || this;
        var a = Rs(this, e = p(Bs(e), this.getDimension, this));
        a._indices = this._indices, a.getRawIndex = a._indices ? Os : Ps;
        for (var o = a._storage, s = [], l = this._chunkSize, u = e.length, h = this.count(), c = [], f = a._rawExtent, d = 0; h > d; d++) {
            for (var g = 0; u > g; g++) c[g] = this.get(e[g], d);
            c[u] = d;
            var v = n && n.apply(i, c);
            if (null != v) {
                "object" != (void 0 === v ? "undefined" : t(v)) && (s[0] = v, v = s);
                for (var m = this.getRawIndex(d), y = Math.floor(m / l), _ = m % l, x = 0; x < v.length; x++) {
                    var w = e[x], b = v[x], M = f[w], S = o[w];
                    S && (S[y][_] = b), b < M[0] && (M[0] = b), b > M[1] && (M[1] = b);
                }
            }
        }
        return a;
    }, lv.downSample = function(t, e, n, i) {
        for (var r = Rs(this, [ t ]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], u = this.count(), h = this._chunkSize, c = r._rawExtent[t], f = new (Cs(this))(u), d = 0, p = 0; u > p; p += s) {
            s > u - p && (s = u - p, o.length = s);
            for (var g = 0; s > g; g++) {
                var v = this.getRawIndex(p + g), m = Math.floor(v / h), y = v % h;
                o[g] = l[m][y];
            }
            var _ = n(o), x = this.getRawIndex(Math.min(p + i(o, _) || 0, u - 1)), w = x % h;
            l[Math.floor(x / h)][w] = _, _ < c[0] && (c[0] = _), _ > c[1] && (c[1] = _), f[d++] = x;
        }
        return r._count = d, r._indices = f, r.getRawIndex = Os, r;
    }, lv.getItemModel = function(t) {
        var e = this.hostModel;
        return new br(this.getRawDataItem(t), e, e && e.ecModel);
    }, lv.diff = function(t) {
        var e = this;
        return new xs(t ? t.getIndices() : [], this.getIndices(), function(e) {
            return Es(t, e);
        }, function(t) {
            return Es(e, t);
        });
    }, lv.getVisual = function(t) {
        var e = this._visual;
        return e && e[t];
    }, lv.setVisual = function(t, e) {
        if (Qg(t)) for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]); else this._visual = this._visual || {}, 
        this._visual[t] = e;
    }, lv.setLayout = function(t, e) {
        if (Qg(t)) for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]); else this._layout[t] = e;
    }, lv.getLayout = function(t) {
        return this._layout[t];
    }, lv.getItemLayout = function(t) {
        return this._itemLayouts[t];
    }, lv.setItemLayout = function(t, e, n) {
        this._itemLayouts[t] = n ? o(this._itemLayouts[t] || {}, e) : e;
    }, lv.clearItemLayouts = function() {
        this._itemLayouts.length = 0;
    }, lv.getItemVisual = function(t, e, n) {
        var i = this._itemVisuals[t], r = i && i[e];
        return null != r || n ? r : this.getVisual(e);
    }, lv.setItemVisual = function(t, e, n) {
        var i = this._itemVisuals[t] || {}, r = this.hasItemVisual;
        if (this._itemVisuals[t] = i, Qg(e)) for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a], 
        r[a] = !0); else i[e] = n, r[e] = !0;
    }, lv.clearAllVisual = function() {
        this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {};
    };
    var uv = function(t) {
        t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType;
    };
    lv.setItemGraphicEl = function(t, e) {
        var n = this.hostModel;
        e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, 
        "group" === e.type && e.traverse(uv, e)), this._graphicEls[t] = e;
    }, lv.getItemGraphicEl = function(t) {
        return this._graphicEls[t];
    }, lv.eachItemGraphicEl = function(t, e) {
        d(this._graphicEls, function(n, i) {
            n && t && t.call(e, n, i);
        });
    }, lv.cloneShallow = function(t) {
        if (!t) {
            var e = p(this.dimensions, this.getDimensionInfo, this);
            t = new sv(e, this.hostModel);
        }
        if (t._storage = this._storage, ks(t, this), this._indices) {
            var n = this._indices.constructor;
            t._indices = new n(this._indices);
        } else t._indices = null;
        return t.getRawIndex = t._indices ? Os : Ps, t;
    }, lv.wrapMethod = function(t, e) {
        var n = this[t];
        "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], 
        this.__wrappedMethods.push(t), this[t] = function() {
            var t = n.apply(this, arguments);
            return e.apply(this, [ t ].concat(A(arguments)));
        });
    }, lv.TRANSFERABLE_METHODS = [ "cloneShallow", "downSample", "map" ], lv.CHANGABLE_METHODS = [ "filterSelf", "selectRange" ];
    var hv = function(t, e) {
        return e = e || {}, Ns(e.coordDimensions || [], t, {
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
    }), Ys.createByAxisModel = function(t) {
        var e = t.option, n = e.data, i = n && p(n, $s);
        return new Ys({
            categories: i,
            needCollect: !i,
            deduplication: !1 !== e.dedplication
        });
    };
    var cv = Ys.prototype;
    cv.getOrdinal = function(t) {
        return Zs(this).get(t);
    }, cv.parseAndCollect = function(t) {
        var e, n = this._needCollect;
        if ("string" != typeof t && !n) return t;
        if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, 
        e;
        var i = Zs(this);
        return null == (e = i.get(t)) && (n ? (e = this.categories.length, this.categories[e] = t, 
        i.set(t, e)) : e = NaN), e;
    };
    var fv = js.prototype, dv = js.extend({
        type: "ordinal",
        init: function(t, e) {
            (!t || _(t)) && (t = new Ys({
                categories: t
            })), this._ordinalMeta = t, this._extent = e || [ 0, t.categories.length - 1 ];
        },
        parse: function(t) {
            return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t);
        },
        contain: function(t) {
            return t = this.parse(t), fv.contain.call(this, t) && null != this._ordinalMeta.categories[t];
        },
        normalize: function(t) {
            return fv.normalize.call(this, this.parse(t));
        },
        scale: function(t) {
            return Math.round(fv.scale.call(this, t));
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
        niceTicks: N,
        niceExtent: N
    });
    dv.create = function() {
        return new dv();
    };
    var pv = Dr, gv = Dr, vv = js.extend({
        type: "interval",
        _interval: 0,
        _intervalPrecision: 2,
        setExtent: function(t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));
        },
        unionExtent: function(t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), vv.prototype.setExtent.call(this, e[0], e[1]);
        },
        getInterval: function() {
            return this._interval;
        },
        setInterval: function(t) {
            this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Ks(t);
        },
        getTicks: function() {
            return el(this._interval, this._extent, this._niceExtent, this._intervalPrecision);
        },
        getLabel: function(t, e) {
            if (null == t) return "";
            var n = e && e.precision;
            return null == n ? n = Ar(t) || 0 : "auto" === n && (n = this._intervalPrecision), 
            t = gv(t, n, !0), Fr(t);
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
            t.fixMin || (e[0] = gv(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = gv(Math.ceil(e[1] / r) * r));
        }
    });
    vv.create = function() {
        return new vv();
    };
    var mv = "__ec_stack_", yv = ("undefined" != typeof Float32Array ? Float32Array : Array, 
    Wp(), vv.prototype), _v = Math.ceil, xv = Math.floor, wv = 36e5, bv = 864e5, Mv = function(t, e, n, i) {
        for (;i > n; ) {
            var r = n + i >>> 1;
            t[r][1] < e ? n = r + 1 : i = r;
        }
        return n;
    }, Sv = vv.extend({
        type: "time",
        getLabel: function(t) {
            var e = this._stepLvl, n = new Date(t);
            return qr(e[0], n, this.getSetting("useUTC"));
        },
        niceExtent: function(t) {
            var e = this._extent;
            if (e[0] === e[1] && (e[0] -= bv, e[1] += bv), e[1] === -1 / 0 && 1 / 0 === e[0]) {
                var n = new Date();
                e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - bv;
            }
            this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
            var i = this._interval;
            t.fixMin || (e[0] = Dr(xv(e[0] / i) * i)), t.fixMax || (e[1] = Dr(_v(e[1] / i) * i));
        },
        niceTicks: function(t, e, n) {
            t = t || 10;
            var i = this._extent, r = i[1] - i[0], a = r / t;
            null != e && e > a && (a = e), null != n && a > n && (a = n);
            var o = Tv.length, s = Mv(Tv, a, 0, o), l = Tv[Math.min(s, o - 1)], u = l[1];
            "year" === l[0] && (u *= Nr(r / u / t, !0));
            var h = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3, c = [ Math.round(_v((i[0] - h) / u) * u + h), Math.round(xv((i[1] - h) / u) * u + h) ];
            tl(c, i), this._stepLvl = l, this._interval = u, this._niceExtent = c;
        },
        parse: function(t) {
            return +Br(t);
        }
    });
    d([ "contain", "normalize" ], function(t) {
        Sv.prototype[t] = function(e) {
            return yv[t].call(this, this.parse(e));
        };
    });
    var Tv = [ [ "hh:mm:ss", 1e3 ], [ "hh:mm:ss", 5e3 ], [ "hh:mm:ss", 1e4 ], [ "hh:mm:ss", 15e3 ], [ "hh:mm:ss", 3e4 ], [ "hh:mm\nMM-dd", 6e4 ], [ "hh:mm\nMM-dd", 3e5 ], [ "hh:mm\nMM-dd", 6e5 ], [ "hh:mm\nMM-dd", 9e5 ], [ "hh:mm\nMM-dd", 18e5 ], [ "hh:mm\nMM-dd", wv ], [ "hh:mm\nMM-dd", 72e5 ], [ "hh:mm\nMM-dd", 6 * wv ], [ "hh:mm\nMM-dd", 432e5 ], [ "MM-dd\nyyyy", bv ], [ "MM-dd\nyyyy", 2 * bv ], [ "MM-dd\nyyyy", 3 * bv ], [ "MM-dd\nyyyy", 4 * bv ], [ "MM-dd\nyyyy", 5 * bv ], [ "MM-dd\nyyyy", 6 * bv ], [ "week", 7 * bv ], [ "MM-dd\nyyyy", 864e6 ], [ "week", 14 * bv ], [ "week", 21 * bv ], [ "month", 31 * bv ], [ "week", 42 * bv ], [ "month", 62 * bv ], [ "week", 70 * bv ], [ "quarter", 95 * bv ], [ "month", 31 * bv * 4 ], [ "month", 13392e6 ], [ "half-year", 16416e6 ], [ "month", 31 * bv * 8 ], [ "month", 26784e6 ], [ "year", 380 * bv ] ];
    Sv.create = function(t) {
        return new Sv({
            useUTC: t.ecModel.get("useUTC")
        });
    };
    var Cv = js.prototype, Iv = vv.prototype, kv = Ar, Dv = Dr, Av = Math.floor, Lv = Math.ceil, Pv = Math.pow, Ov = Math.log, Ev = js.extend({
        type: "log",
        base: 10,
        $constructor: function() {
            js.apply(this, arguments), this._originalScale = new vv();
        },
        getTicks: function() {
            var t = this._originalScale, e = this._extent, n = t.getExtent();
            return p(Iv.getTicks.call(this), function(i) {
                var r = Dr(Pv(this.base, i));
                return r = i === e[0] && t.__fixMin ? cl(r, n[0]) : r, r = i === e[1] && t.__fixMax ? cl(r, n[1]) : r;
            }, this);
        },
        getLabel: Iv.getLabel,
        scale: function(t) {
            return t = Cv.scale.call(this, t), Pv(this.base, t);
        },
        setExtent: function(t, e) {
            var n = this.base;
            t = Ov(t) / Ov(n), e = Ov(e) / Ov(n), Iv.setExtent.call(this, t, e);
        },
        getExtent: function() {
            var t = this.base, e = Cv.getExtent.call(this);
            e[0] = Pv(t, e[0]), e[1] = Pv(t, e[1]);
            var n = this._originalScale, i = n.getExtent();
            return n.__fixMin && (e[0] = cl(e[0], i[0])), n.__fixMax && (e[1] = cl(e[1], i[1])), 
            e;
        },
        unionExtent: function(t) {
            this._originalScale.unionExtent(t);
            var e = this.base;
            t[0] = Ov(t[0]) / Ov(e), t[1] = Ov(t[1]) / Ov(e), Cv.unionExtent.call(this, t);
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
                var r = [ Dr(Lv(e[0] / i) * i), Dr(Av(e[1] / i) * i) ];
                this._interval = i, this._niceExtent = r;
            }
        },
        niceExtent: function(t) {
            Iv.niceExtent.call(this, t);
            var e = this._originalScale;
            e.__fixMin = t.fixMin, e.__fixMax = t.fixMax;
        }
    });
    d([ "contain", "normalize" ], function(t) {
        Ev.prototype[t] = function(e) {
            return e = Ov(e) / Ov(this.base), Cv[t].call(this, e);
        };
    }), Ev.create = function() {
        return new Ev();
    };
    var Bv = {
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
        getCoordSysModel: N,
        setRange: function(t, e) {
            this.option.rangeStart = t, this.option.rangeEnd = e;
        },
        resetRange: function() {
            this.option.rangeStart = this.option.rangeEnd = null;
        }
    }, Rv = Ri({
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
    }), zv = Ri({
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
    }), Nv = Ri({
        type: "pin",
        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.x, i = e.y, r = e.width / 5 * 3, a = Math.max(r, e.height), o = r / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, c = Math.sin(u), f = Math.cos(u), d = .6 * o, p = .7 * o;
            t.moveTo(n - h, l + s), t.arc(n, l, o, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(n + h - c * d, l + s + f * d, n, i - p, n, i), 
            t.bezierCurveTo(n, i - p, n - h + c * d, l + s + f * d, n - h, l + s), t.closePath();
        }
    }), Fv = Ri({
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
    }), Vv = {
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
    }, Wv = {};
    d({
        line: sd,
        rect: ad,
        roundRect: ad,
        square: ad,
        circle: Zf,
        diamond: zv,
        pin: Nv,
        arrow: Fv,
        triangle: Rv
    }, function(t, e) {
        Wv[e] = new t();
    });
    var Hv = Ri({
        type: "symbol",
        shape: {
            symbolType: "",
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        calculateTextPosition: function(t, e, n) {
            var i = Ae(t, e, n), r = this.shape;
            return r && "pin" === r.symbolType && "inside" === e.textPosition && (i.y = n.y + .4 * n.height), 
            i;
        },
        buildPath: function(t, e, n) {
            var i = e.symbolType;
            if ("none" !== i) {
                var r = Wv[i];
                r || (i = "rect", r = Wv[i]), Vv[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n);
            }
        }
    }), Gv = {
        isDimensionStacked: Hs,
        enableDataStack: Ws,
        getStackedDimension: Gs
    }, qv = (Object.freeze || Object)({
        createList: function(t) {
            return qs(t.getSource(), t);
        },
        getLayoutRect: Ur,
        dataStack: Gv,
        createScale: function(t, e) {
            var n = e;
            br.isInstance(e) || (n = new br(e), c(n, Bv));
            var i = gl(n);
            return i.setExtent(t[0], t[1]), pl(i, n), i;
        },
        mixinAxisModelCommonMethods: function(t) {
            c(t, Bv);
        },
        completeDimensions: Ns,
        createDimensions: hv,
        createSymbol: Sl
    }), Xv = 1e-8;
    Il.prototype = {
        constructor: Il,
        properties: null,
        getBoundingRect: function() {
            var t = this._rect;
            if (t) return t;
            for (var e = Number.MAX_VALUE, n = [ e, e ], i = [ -e, -e ], r = [], a = [], o = this.geometries, s = 0; s < o.length; s++) "polygon" === o[s].type && (ri(o[s].exterior, r, a), 
            $(n, n, r), Q(i, i, a));
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
            for (var o = new oe(t, e, n, i), s = r.calculateTransform(o), l = this.geometries, u = 0; u < l.length; u++) if ("polygon" === l[u].type) {
                for (var h = l[u].exterior, c = l[u].interiors, f = 0; f < h.length; f++) Z(h[f], h[f], s);
                for (var d = 0; d < (c ? c.length : 0); d++) for (f = 0; f < c[d].length; f++) Z(c[d][f], c[d][f], s);
            }
            (r = this._rect).copy(o), this.center = [ r.x + r.width / 2, r.y + r.height / 2 ];
        },
        cloneShallow: function(t) {
            null == t && (t = this.name);
            var e = new Il(t, this.geometries, this.center);
            return e._rect = this._rect, e.transformTo = null, e;
        }
    };
    var Uv = function(t) {
        return kl(t), p(v(t.features, function(t) {
            return t.geometry && t.properties && t.geometry.coordinates.length > 0;
        }), function(t) {
            var e = t.properties, n = t.geometry, i = n.coordinates, r = [];
            "Polygon" === n.type && r.push({
                type: "polygon",
                exterior: i[0],
                interiors: i.slice(1)
            }), "MultiPolygon" === n.type && d(i, function(t) {
                t[0] && r.push({
                    type: "polygon",
                    exterior: t[0],
                    interiors: t.slice(1)
                });
            });
            var a = new Il(e.name, r, e.cp);
            return a.properties = e, a;
        });
    }, jv = Ln(), Yv = [ 0, 1 ], Zv = function(t, e, n) {
        this.dim = t, this.scale = e, this._extent = n || [ 0, 0 ], this.inverse = !1, this.onBand = !1;
    };
    Zv.prototype = {
        constructor: Zv,
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
            ql(n, i.count())), Ir(t, Yv, n, e);
        },
        coordToData: function(t, e) {
            var n = this._extent, i = this.scale;
            this.onBand && "ordinal" === i.type && (n = n.slice(), ql(n, i.count()));
            var r = Ir(t, n, Yv, e);
            return this.scale.scale(r);
        },
        pointToData: function() {},
        getTicksCoords: function(t) {
            var e = (t = t || {}).tickModel || this.getTickModel(), n = p(Ll(this, e).ticks, function(t) {
                return {
                    coord: this.dataToCoord(t),
                    tickValue: t
                };
            }, this);
            return Xl(this, n, e.get("alignWithLabel"), t.clamp), n;
        },
        getViewLabels: function() {
            return Al(this).labels;
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
    var $v = Uv, Qv = {};
    d([ "map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge" ], function(t) {
        Qv[t] = Vu[t];
    });
    var Kv = {};
    d([ "extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "registerShape", "getShapeClass", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect" ], function(t) {
        Kv[t] = Dd[t];
    });
    var Jv = function(t, e, n) {
        e = _(e) && {
            coordDimensions: e
        } || o({}, e);
        var i = t.getSource(), r = hv(i, e), a = new sv(r, t);
        return a.initData(i, n), a;
    }, tm = {
        updateSelectedMap: function(t) {
            this._targetList = _(t) ? t.slice() : [], this._selectTargetMap = g(t || [], function(t, e) {
                return t.set(e.name, e), t;
            }, z());
        },
        select: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            "single" === this.get("selectedMode") && this._selectTargetMap.each(function(t) {
                t.selected = !1;
            }), n && (n.selected = !0);
        },
        unSelect: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            n && (n.selected = !1);
        },
        toggleSelected: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            return null != n ? (this[n.selected ? "unSelect" : "select"](t, e), n.selected) : void 0;
        },
        isSelected: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            return n && n.selected;
        }
    }, em = ys({
        type: "series.pie",
        init: function(t) {
            em.superApply(this, "init", arguments), this.legendDataProvider = function() {
                return this.getRawData();
            }, this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t);
        },
        mergeOption: function(t) {
            em.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList());
        },
        getInitialData: function() {
            return Jv(this, [ "value" ]);
        },
        _createSelectableList: function() {
            for (var t = this.getRawData(), e = t.mapDimension("value"), n = [], i = 0, r = t.count(); r > i; i++) n.push({
                name: t.getName(i),
                value: t.get(e, i),
                selected: ja(t, i, "selected")
            });
            return n;
        },
        getDataParams: function(t) {
            var e = this.getData(), n = em.superCall(this, "getDataParams", t), i = [];
            return e.each(e.mapDimension("value"), function(t) {
                i.push(t);
            }), n.percent = Pr(i, t, e.hostModel.get("percentPrecision")), n.$vars.push("percent"), 
            n;
        },
        _defaultLabelLine: function(t) {
            Mn(t, "labelLine", [ "show" ]);
            var e = t.labelLine, n = t.emphasis.labelLine;
            e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show;
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            legendHoverLink: !0,
            hoverAnimation: !0,
            center: [ "50%", "50%" ],
            radius: [ 0, "75%" ],
            clockwise: !0,
            startAngle: 90,
            minAngle: 0,
            minShowLabelAngle: 0,
            selectedOffset: 10,
            hoverOffset: 10,
            avoidLabelOverlap: !0,
            percentPrecision: 2,
            stillShowZeroSum: !0,
            label: {
                rotate: !1,
                show: !0,
                position: "outer"
            },
            labelLine: {
                show: !0,
                length: 15,
                length2: 15,
                smooth: !1,
                lineStyle: {
                    width: 1,
                    type: "solid"
                }
            },
            itemStyle: {
                borderWidth: 1
            },
            animationType: "expansion",
            animationTypeUpdate: "transition",
            animationEasing: "cubicOut"
        }
    });
    c(em, tm);
    var nm = Yl.prototype;
    nm.updateData = function(t, e, n) {
        var i = this.childAt(0), r = this.childAt(1), a = this.childAt(2), l = t.hostModel, u = t.getItemModel(e), h = t.getItemLayout(e), c = o({}, h);
        c.label = null;
        var f = l.getShallow("animationTypeUpdate");
        n ? (i.setShape(c), "scale" === l.getShallow("animationType") ? (i.shape.r = h.r0, 
        vr(i, {
            shape: {
                r: h.r
            }
        }, l, e)) : (i.shape.endAngle = h.startAngle, gr(i, {
            shape: {
                endAngle: h.endAngle
            }
        }, l, e))) : "expansion" === f ? i.setShape(c) : gr(i, {
            shape: c
        }, l, e);
        var d = t.getItemVisual(e, "color");
        i.useStyle(s({
            lineJoin: "bevel",
            fill: d
        }, u.getModel("itemStyle").getItemStyle())), i.hoverStyle = u.getModel("emphasis.itemStyle").getItemStyle();
        var p = u.getShallow("cursor");
        p && i.attr("cursor", p), jl(this, t.getItemLayout(e), l.isSelected(null, e), l.get("selectedOffset"), l.get("animation"));
        var g = !n && "transition" === f;
        this._updateLabel(t, e, g), this.highDownOnUpdate = u.get("hoverAnimation") && l.isAnimationEnabled() ? function(t, e) {
            "emphasis" === e ? (r.ignore = r.hoverIgnore, a.ignore = a.hoverIgnore, i.stopAnimation(!0), 
            i.animateTo({
                shape: {
                    r: h.r + l.get("hoverOffset")
                }
            }, 300, "elasticOut")) : (r.ignore = r.normalIgnore, a.ignore = a.normalIgnore, 
            i.stopAnimation(!0), i.animateTo({
                shape: {
                    r: h.r
                }
            }, 300, "elasticOut"));
        } : null, er(this);
    }, nm._updateLabel = function(t, e, n) {
        var i = this.childAt(1), r = this.childAt(2), a = t.hostModel, o = t.getItemModel(e), s = t.getItemLayout(e).label, l = t.getItemVisual(e, "color");
        if (!s || isNaN(s.x) || isNaN(s.y)) r.ignore = r.normalIgnore = r.hoverIgnore = i.ignore = i.normalIgnore = i.hoverIgnore = !0; else {
            var u = {
                points: s.linePoints || [ [ s.x, s.y ], [ s.x, s.y ], [ s.x, s.y ] ]
            }, h = {
                x: s.x,
                y: s.y
            };
            n ? (gr(i, {
                shape: u
            }, a, e), gr(r, {
                style: h
            }, a, e)) : (i.attr({
                shape: u
            }), r.attr({
                style: h
            })), r.attr({
                rotation: s.rotation,
                origin: [ s.x, s.y ],
                z2: 10
            });
            var c = o.getModel("label"), f = o.getModel("emphasis.label"), d = o.getModel("labelLine"), p = o.getModel("emphasis.labelLine"), l = t.getItemVisual(e, "color");
            ar(r.style, r.hoverStyle = {}, c, f, {
                labelFetcher: t.hostModel,
                labelDataIndex: e,
                defaultText: t.getName(e),
                autoColor: l,
                useInsideStyle: !!s.inside
            }, {
                textAlign: s.textAlign,
                textVerticalAlign: s.verticalAlign,
                opacity: t.getItemVisual(e, "opacity")
            }), r.ignore = r.normalIgnore = !c.get("show"), r.hoverIgnore = !f.get("show"), 
            i.ignore = i.normalIgnore = !d.get("show"), i.hoverIgnore = !p.get("show"), i.setStyle({
                stroke: l,
                opacity: t.getItemVisual(e, "opacity")
            }), i.setStyle(d.getModel("lineStyle").getLineStyle()), i.hoverStyle = p.getModel("lineStyle").getLineStyle();
            var g = d.get("smooth");
            g && !0 === g && (g = .4), i.setShape({
                smooth: g
            });
        }
    }, h(Yl, Nh);
    var im = (oo.extend({
        type: "pie",
        init: function() {
            var t = new Nh();
            this._sectorGroup = t;
        },
        render: function(t, e, n, i) {
            if (!i || i.from !== this.uid) {
                var r = t.getData(), a = this._data, o = this.group, s = e.get("animation"), l = !a, u = t.get("animationType"), h = t.get("animationTypeUpdate"), c = y(Ul, this.uid, t, s, n), f = t.get("selectedMode");
                if (r.diff(a).add(function(t) {
                    var e = new Yl(r, t);
                    l && "scale" !== u && e.eachChild(function(t) {
                        t.stopAnimation(!0);
                    }), f && e.on("click", c), r.setItemGraphicEl(t, e), o.add(e);
                }).update(function(t, e) {
                    var n = a.getItemGraphicEl(e);
                    l || "transition" === h || n.eachChild(function(t) {
                        t.stopAnimation(!0);
                    }), n.updateData(r, t), n.off("click"), f && n.on("click", c), o.add(n), r.setItemGraphicEl(t, n);
                }).remove(function(t) {
                    var e = a.getItemGraphicEl(t);
                    o.remove(e);
                }).execute(), s && r.count() > 0 && (l ? "scale" !== u : "transition" !== h)) {
                    for (var d = r.getItemLayout(0), p = 1; isNaN(d.startAngle) && p < r.count(); ++p) d = r.getItemLayout(p);
                    var g = Math.max(n.getWidth(), n.getHeight()) / 2, v = m(o.removeClipPath, o);
                    o.setClipPath(this._createClipPath(d.cx, d.cy, g, d.startAngle, d.clockwise, v, t, l));
                } else o.removeClipPath();
                this._data = r;
            }
        },
        dispose: function() {},
        _createClipPath: function(t, e, n, i, r, a, o, s) {
            var l = new Qf({
                shape: {
                    cx: t,
                    cy: e,
                    r0: 0,
                    r: n,
                    startAngle: i,
                    endAngle: i,
                    clockwise: r
                }
            });
            return (s ? vr : gr)(l, {
                shape: {
                    endAngle: i + (r ? 1 : -1) * Math.PI * 2
                }
            }, o, a), l;
        },
        containPoint: function(t, e) {
            var n = e.getData().getItemLayout(0);
            if (n) {
                var i = t[0] - n.cx, r = t[1] - n.cy, a = Math.sqrt(i * i + r * r);
                return a <= n.r && a >= n.r0;
            }
        }
    }), function(t, e) {
        d(e, function(e) {
            e.update = "updateView", fs(e, function(n, i) {
                var r = {};
                return i.eachComponent({
                    mainType: "series",
                    subType: t,
                    query: n
                }, function(t) {
                    t[e.method] && t[e.method](n.name, n.dataIndex);
                    var i = t.getData();
                    i.each(function(e) {
                        var n = i.getName(e);
                        r[n] = t.isSelected(n) || !1;
                    });
                }), {
                    name: n.name,
                    selected: r,
                    seriesId: n.seriesId
                };
            });
        });
    }), rm = Math.PI / 180, am = function(t, e, n, i) {
        var r, a, o = t.getData(), s = [], l = !1, u = (t.get("minShowLabelAngle") || 0) * rm;
        o.each(function(n) {
            var i = o.getItemLayout(n), h = o.getItemModel(n), c = h.getModel("label"), f = c.get("position") || h.get("emphasis.label.position"), d = h.getModel("labelLine"), p = d.get("length"), g = d.get("length2");
            if (!(i.angle < u)) {
                var v, m, y, _, x = (i.startAngle + i.endAngle) / 2, w = Math.cos(x), b = Math.sin(x);
                r = i.cx, a = i.cy;
                var M = "inside" === f || "inner" === f;
                if ("center" === f) v = i.cx, m = i.cy, _ = "center"; else {
                    var S = (M ? (i.r + i.r0) / 2 * w : i.r * w) + r, T = (M ? (i.r + i.r0) / 2 * b : i.r * b) + a;
                    if (v = S + 3 * w, m = T + 3 * b, !M) {
                        var C = S + w * (p + e - i.r), I = T + b * (p + e - i.r), k = C + (0 > w ? -1 : 1) * g, D = I;
                        v = k + (0 > w ? -5 : 5), m = D, y = [ [ S, T ], [ C, I ], [ k, D ] ];
                    }
                    _ = M ? "center" : w > 0 ? "left" : "right";
                }
                var A, L = c.getFont(), P = c.get("rotate");
                A = "number" == typeof P ? P * (Math.PI / 180) : P ? 0 > w ? -x + Math.PI : -x : 0;
                var O = Te(t.getFormattedLabel(n, "normal") || o.getName(n), L, _, "top");
                l = !!A, i.label = {
                    x: v,
                    y: m,
                    position: f,
                    height: O.height,
                    len: p,
                    len2: g,
                    linePoints: y,
                    textAlign: _,
                    verticalAlign: "middle",
                    rotation: A,
                    inside: M
                }, M || s.push(i.label);
            }
        }), !l && t.get("avoidLabelOverlap") && $l(s, r, a, e, n, i);
    }, om = 2 * Math.PI, sm = Math.PI / 180;
    im("pie", [ {
        type: "pieToggleSelect",
        event: "pieselectchanged",
        method: "toggleSelected"
    }, {
        type: "pieSelect",
        event: "pieselected",
        method: "select"
    }, {
        type: "pieUnSelect",
        event: "pieunselected",
        method: "unSelect"
    } ]), ps(function(t) {
        return {
            getTargetSeries: function(e) {
                var n = {}, i = z();
                return e.eachSeriesByType(t, function(t) {
                    t.__paletteScope = n, i.set(t.uid, t);
                }), i;
            },
            reset: function(t) {
                var e = t.getRawData(), n = {}, i = t.getData();
                i.each(function(t) {
                    var e = i.getRawIndex(t);
                    n[e] = t;
                }), e.each(function(r) {
                    var a, o = n[r], s = null != o && i.getItemVisual(o, "color", !0), l = null != o && i.getItemVisual(o, "borderColor", !0);
                    if (s && l || (a = e.getItemModel(r)), s) e.setItemVisual(r, "color", s); else {
                        var u = a.get("itemStyle.color") || t.getColorFromPalette(e.getName(r) || r + "", t.__paletteScope, e.count());
                        e.setItemVisual(r, "color", u), null != o && i.setItemVisual(o, "color", u);
                    }
                    if (l) e.setItemVisual(r, "borderColor", l); else {
                        var h = a.get("itemStyle.borderColor");
                        e.setItemVisual(r, "borderColor", h), null != o && i.setItemVisual(o, "borderColor", h);
                    }
                });
            }
        };
    }("pie")), ds(y(function(t, e, n) {
        e.eachSeriesByType(t, function(t) {
            var e = t.getData(), i = e.mapDimension("value"), r = t.get("center"), a = t.get("radius");
            _(a) || (a = [ 0, a ]), _(r) || (r = [ r, r ]);
            var o = n.getWidth(), s = n.getHeight(), l = Math.min(o, s), u = kr(r[0], o), h = kr(r[1], s), c = kr(a[0], l / 2), f = kr(a[1], l / 2), d = -t.get("startAngle") * sm, p = t.get("minAngle") * sm, g = 0;
            e.each(i, function(t) {
                !isNaN(t) && g++;
            });
            var v = e.getSum(i), m = Math.PI / (v || g) * 2, y = t.get("clockwise"), x = t.get("roseType"), w = t.get("stillShowZeroSum"), b = e.getDataExtent(i);
            b[0] = 0;
            var M = om, S = 0, T = d, C = y ? 1 : -1;
            if (e.each(i, function(t, n) {
                var i;
                if (isNaN(t)) e.setItemLayout(n, {
                    angle: NaN,
                    startAngle: NaN,
                    endAngle: NaN,
                    clockwise: y,
                    cx: u,
                    cy: h,
                    r0: c,
                    r: x ? NaN : f
                }); else {
                    p > (i = "area" !== x ? 0 === v && w ? m : t * m : om / g) ? (i = p, M -= p) : S += t;
                    var r = T + C * i;
                    e.setItemLayout(n, {
                        angle: i,
                        startAngle: T,
                        endAngle: r,
                        clockwise: y,
                        cx: u,
                        cy: h,
                        r0: c,
                        r: x ? Ir(t, b, [ c, f ]) : f
                    }), T = r;
                }
            }), om > M && g) if (.001 >= M) {
                var I = om / g;
                e.each(i, function(t, n) {
                    if (!isNaN(t)) {
                        var i = e.getItemLayout(n);
                        i.angle = I, i.startAngle = d + C * n * I, i.endAngle = d + C * (n + 1) * I;
                    }
                });
            } else m = M / S, T = d, e.each(i, function(t, n) {
                if (!isNaN(t)) {
                    var i = e.getItemLayout(n), r = i.angle === p ? p : t * m;
                    i.startAngle = T, i.endAngle = T + C * r, T += C * r;
                }
            });
            am(t, f, o, s);
        });
    }, "pie")), cs(function(t) {
        return {
            seriesType: t,
            reset: function(t, e) {
                var n = e.findComponents({
                    mainType: "legend"
                });
                if (n && n.length) {
                    var i = t.getData();
                    i.filterSelf(function(t) {
                        for (var e = i.getName(t), r = 0; r < n.length; r++) if (!n[r].isSelected(e)) return !1;
                        return !0;
                    });
                }
            }
        };
    }("pie"));
    var lm = function(t) {
        this._axes = {}, this._dimList = [], this.name = t || "";
    };
    lm.prototype = {
        constructor: lm,
        type: "cartesian",
        getAxis: function(t) {
            return this._axes[t];
        },
        getAxes: function() {
            return p(this._dimList, Kl, this);
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
    }, Jl.prototype = {
        constructor: Jl,
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
        },
        getArea: function() {
            var t = this.getAxis("x").getGlobalExtent(), e = this.getAxis("y").getGlobalExtent(), n = Math.min(t[0], t[1]), i = Math.min(e[0], e[1]);
            return new oe(n, i, Math.max(t[0], t[1]) - n, Math.max(e[0], e[1]) - i);
        }
    }, h(Jl, lm);
    var um = function(t, e, n, i, r) {
        Zv.call(this, t, e, n), this.type = i || "value", this.position = r || "bottom";
    };
    um.prototype = {
        constructor: um,
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
    }, h(um, Zv);
    var hm = {
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
    }, cm = {};
    cm.categoryAxis = r({
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
    }, hm), cm.valueAxis = r({
        boundaryGap: [ 0, 0 ],
        splitNumber: 5
    }, hm), cm.timeAxis = s({
        scale: !0,
        min: "dataMin",
        max: "dataMax"
    }, cm.valueAxis), cm.logAxis = s({
        scale: !0,
        logBase: 10
    }, cm.valueAxis);
    var fm = [ "value", "category", "time", "log" ], dm = function(t, e, n, i) {
        d(fm, function(o) {
            e.extend({
                type: t + "Axis." + o,
                mergeDefaultAndTheme: function(e, i) {
                    var a = this.layoutMode, s = a ? Yr(e) : {};
                    r(e, i.getTheme().get(o + "Axis")), r(e, this.getDefaultOption()), e.type = n(t, e), 
                    a && jr(e, s, a);
                },
                optionUpdated: function() {
                    "category" === this.option.type && (this.__ordinalMeta = Ys.createByAxisModel(this));
                },
                getCategories: function(t) {
                    var e = this.option;
                    return "category" === e.type ? t ? e.data : this.__ordinalMeta.categories : void 0;
                },
                getOrdinalMeta: function() {
                    return this.__ordinalMeta;
                },
                defaultOption: a([ {}, cm[o + "Axis"], i ], !0)
            });
        }), Kd.registerSubTypeDefaulter(t + "Axis", y(n, t));
    }, pm = Kd.extend({
        type: "cartesian2dAxis",
        axis: null,
        init: function() {
            pm.superApply(this, "init", arguments), this.resetRange();
        },
        mergeOption: function() {
            pm.superApply(this, "mergeOption", arguments), this.resetRange();
        },
        restoreData: function() {
            pm.superApply(this, "restoreData", arguments), this.resetRange();
        },
        getCoordSysModel: function() {
            return this.ecModel.queryComponents({
                mainType: "grid",
                index: this.option.gridIndex,
                id: this.option.gridId
            })[0];
        }
    });
    r(pm.prototype, Bv);
    var gm = {
        offset: 0
    };
    dm("x", pm, tu, gm), dm("y", pm, tu, gm), Kd.extend({
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
    var vm = nu.prototype;
    vm.type = "grid", vm.axisPointerEnabled = !0, vm.getRect = function() {
        return this._rect;
    }, vm.update = function(t, e) {
        var n = this._axesMap;
        this._updateScale(t, this.model), d(n.x, function(t) {
            pl(t.scale, t.model);
        }), d(n.y, function(t) {
            pl(t.scale, t.model);
        });
        var i = {};
        d(n.x, function(t) {
            iu(n, "y", t, i);
        }), d(n.y, function(t) {
            iu(n, "x", t, i);
        }), this.resize(this.model, e);
    }, vm.resize = function(t, e, n) {
        function i() {
            d(a, function(t) {
                var e = t.isHorizontal(), n = e ? [ 0, r.width ] : [ 0, r.height ], i = t.inverse ? 1 : 0;
                t.setExtent(n[i], n[1 - i]), au(t, e ? r.x : r.y);
            });
        }
        var r = Ur(t.getBoxLayoutParams(), {
            width: e.getWidth(),
            height: e.getHeight()
        });
        this._rect = r;
        var a = this._axesList;
        i(), !n && t.get("containLabel") && (d(a, function(t) {
            if (!t.model.get("axisLabel.inside")) {
                var e = _l(t);
                if (e) {
                    var n = t.isHorizontal() ? "height" : "width", i = t.model.get("axisLabel.margin");
                    r[n] -= e[n] + i, "top" === t.position ? r.y += e.height + i : "left" === t.position && (r.x += e.width + i);
                }
            }
        }), i());
    }, vm.getAxis = function(t, e) {
        var n = this._axesMap[t];
        if (null != n) {
            if (null == e) for (var i in n) if (n.hasOwnProperty(i)) return n[i];
            return n[e];
        }
    }, vm.getAxes = function() {
        return this._axesList.slice();
    }, vm.getCartesian = function(t, e) {
        if (null != t && null != e) {
            var n = "x" + t + "y" + e;
            return this._coordsMap[n];
        }
        b(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
        for (var i = 0, r = this._coordsList; i < r.length; i++) if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i];
    }, vm.getCartesians = function() {
        return this._coordsList.slice();
    }, vm.convertToPixel = function(t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null;
    }, vm.convertFromPixel = function(t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;
    }, vm._findConvertTarget = function(t, e) {
        var n, i, r = e.seriesModel, a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0], o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0], s = e.gridModel, l = this._coordsList;
        return r ? (n = r.coordinateSystem, u(l, n) < 0 && (n = null)) : a && o ? n = this.getCartesian(a.componentIndex, o.componentIndex) : a ? i = this.getAxis("x", a.componentIndex) : o ? i = this.getAxis("y", o.componentIndex) : s && s.coordinateSystem === this && (n = this._coordsList[0]), 
        {
            cartesian: n,
            axis: i
        };
    }, vm.containPoint = function(t) {
        var e = this._coordsList[0];
        return e ? e.containPoint(t) : void 0;
    }, vm._initCartesian = function(t, e) {
        function n(n) {
            return function(o, s) {
                if (eu(o, t, e)) {
                    var l = o.get("position");
                    "x" === n ? "top" !== l && "bottom" !== l && (l = i.bottom ? "top" : "bottom") : "left" !== l && "right" !== l && (l = i.left ? "right" : "left"), 
                    i[l] = !0;
                    var u = new um(n, gl(o), [ 0, 0 ], o.get("type"), l), h = "category" === u.type;
                    u.onBand = h && o.get("boundaryGap"), u.inverse = o.get("inverse"), o.axis = u, 
                    u.model = o, u.grid = this, u.index = s, this._axesList.push(u), r[n][s] = u, a[n]++;
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
        a.x && a.y ? (this._axesMap = r, void d(r.x, function(e, n) {
            d(r.y, function(i, r) {
                var a = "x" + n + "y" + r, o = new Jl(a);
                o.grid = this, o.model = t, this._coordsMap[a] = o, this._coordsList.push(o), o.addAxis(e), 
                o.addAxis(i);
            }, this);
        }, this)) : (this._axesMap = {}, void (this._axesList = []));
    }, vm._updateScale = function(t, e) {
        function n(t, e) {
            d(t.mapDimension(e.dim, !0), function(n) {
                e.scale.unionExtentFromData(t, Gs(t, n));
            });
        }
        d(this._axesList, function(t) {
            t.scale.setExtent(1 / 0, -1 / 0);
        }), t.eachSeries(function(i) {
            if (su(i)) {
                var r = ou(i), a = r[0], o = r[1];
                if (!eu(a, e, t) || !eu(o, e, t)) return;
                var s = this.getCartesian(a.componentIndex, o.componentIndex), l = i.getData(), u = s.getAxis("x"), h = s.getAxis("y");
                "list" === l.type && (n(l, u), n(l, h));
            }
        }, this);
    }, vm.getTooltipAxes = function(t) {
        var e = [], n = [];
        return d(this.getCartesians(), function(i) {
            var r = null != t && "auto" !== t ? i.getAxis(t) : i.getBaseAxis(), a = i.getOtherAxis(r);
            u(e, r) < 0 && e.push(r), u(n, a) < 0 && n.push(a);
        }), {
            baseAxes: e,
            otherAxes: n
        };
    };
    var mm = [ "xAxis", "yAxis" ];
    nu.create = function(t, e) {
        var n = [];
        return t.eachComponent("grid", function(i, r) {
            var a = new nu(i, t, e);
            a.name = "grid_" + r, a.resize(i, e, !0), i.coordinateSystem = a, n.push(a);
        }), t.eachSeries(function(t) {
            if (su(t)) {
                var e = ou(t), n = e[0], i = e[1], r = n.getCoordSysModel().coordinateSystem;
                t.coordinateSystem = r.getCartesian(n.componentIndex, i.componentIndex);
            }
        }), n;
    }, nu.dimensions = nu.prototype.dimensions = Jl.prototype.dimensions, xa.register("cartesian2d", nu);
    var ym = Math.PI, _m = function(t, e) {
        this.opt = e, this.axisModel = t, s(e, {
            labelOffset: 0,
            nameDirection: 1,
            tickDirection: 1,
            labelDirection: 1,
            silent: !0
        }), this.group = new Nh();
        var n = new Nh({
            position: e.position.slice(),
            rotation: e.rotation
        });
        n.updateTransform(), this._transform = n.transform, this._dumbGroup = n;
    };
    _m.prototype = {
        constructor: _m,
        hasBuilder: function(t) {
            return !!xm[t];
        },
        add: function(t) {
            xm[t].call(this);
        },
        getGroup: function() {
            return this.group;
        }
    };
    var xm = {
        axisLine: function() {
            var t = this.opt, e = this.axisModel;
            if (e.get("axisLine.show")) {
                var n = this.axisModel.axis.getExtent(), i = this._transform, r = [ n[0], 0 ], a = [ n[1], 0 ];
                i && (Z(r, r, i), Z(a, a, i));
                var s = o({
                    lineCap: "round"
                }, e.getModel("axisLine.lineStyle").getLineStyle());
                this.group.add(new sd({
                    anid: "line",
                    subPixelOptimize: !0,
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
                }));
                var l = e.get("axisLine.symbol"), u = e.get("axisLine.symbolSize"), h = e.get("axisLine.symbolOffset") || 0;
                if ("number" == typeof h && (h = [ h, h ]), null != l) {
                    "string" == typeof l && (l = [ l, l ]), ("string" == typeof u || "number" == typeof u) && (u = [ u, u ]);
                    var c = u[0], f = u[1];
                    d([ {
                        rotate: t.rotation + Math.PI / 2,
                        offset: h[0],
                        r: 0
                    }, {
                        rotate: t.rotation - Math.PI / 2,
                        offset: h[1],
                        r: Math.sqrt((r[0] - a[0]) * (r[0] - a[0]) + (r[1] - a[1]) * (r[1] - a[1]))
                    } ], function(e, n) {
                        if ("none" !== l[n] && null != l[n]) {
                            var i = Sl(l[n], -c / 2, -f / 2, c, f, s.stroke, !0), a = e.r + e.offset, o = [ r[0] + a * Math.cos(t.rotation), r[1] - a * Math.sin(t.rotation) ];
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
            var t = this.axisModel, e = this.opt, n = du(this, t, e);
            uu(t, pu(this, t, e), n);
        },
        axisName: function() {
            var t = this.opt, e = this.axisModel, n = I(t.axisName, e.get("name"));
            if (n) {
                var i, r = e.get("nameLocation"), a = t.nameDirection, s = e.getModel("nameTextStyle"), l = e.get("nameGap") || 0, u = this.axisModel.axis.getExtent(), h = u[0] > u[1] ? -1 : 1, c = [ "start" === r ? u[0] - h * l : "end" === r ? u[1] + h * l : (u[0] + u[1]) / 2, fu(r) ? t.labelOffset + a * l : 0 ], f = e.get("nameRotate");
                null != f && (f = f * ym / 180);
                var d;
                fu(r) ? i = bm(t.rotation, null != f ? f : t.rotation, a) : (i = lu(t, r, f || 0, u), 
                null != (d = t.axisNameAvailableWidth) && (d = Math.abs(d / Math.sin(i.rotation)), 
                !isFinite(d) && (d = null)));
                var p = s.getFont(), g = e.get("nameTruncate", !0) || {}, v = g.ellipsis, m = I(t.nameTruncateMaxWidth, g.maxWidth, d), y = null != v && null != m ? Xd(n, m, p, v, {
                    minChar: 2,
                    placeholder: g.placeholder
                }) : n, _ = e.get("tooltip", !0), x = e.mainType, w = {
                    componentType: x,
                    name: n,
                    $vars: [ "name" ]
                };
                w[x + "Index"] = e.componentIndex;
                var b = new Yf({
                    anid: "name",
                    __fullText: n,
                    __truncatedText: y,
                    position: c,
                    rotation: i.rotation,
                    silent: Mm(e),
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
                    textAlign: s.get("align") || i.textAlign,
                    textVerticalAlign: s.get("verticalAlign") || i.textVerticalAlign
                }), e.get("triggerEvent") && (b.eventData = wm(e), b.eventData.targetType = "axisName", 
                b.eventData.name = n), this._dumbGroup.add(b), b.updateTransform(), this.group.add(b), 
                b.decomposeTransform();
            }
        }
    }, wm = _m.makeAxisEventDataBase = function(t) {
        var e = {
            componentType: t.mainType,
            componentIndex: t.componentIndex
        };
        return e[t.mainType + "Index"] = t.componentIndex, e;
    }, bm = _m.innerTextLayout = function(t, e, n) {
        var i, r, a = Or(e - t);
        return Er(a) ? (r = n > 0 ? "top" : "bottom", i = "center") : Er(a - ym) ? (r = n > 0 ? "bottom" : "top", 
        i = "center") : (r = "middle", i = a > 0 && ym > a ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), 
        {
            rotation: a,
            textAlign: i,
            textVerticalAlign: r
        };
    }, Mm = _m.isLabelSilent = function(t) {
        var e = t.get("tooltip");
        return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
    }, Sm = ms({
        type: "axis",
        _axisPointer: null,
        axisPointerClass: null,
        render: function(t, e, n, i) {
            this.axisPointerClass && gu(t), Sm.superApply(this, "render", arguments), xu(this, t, 0, n, 0, !0);
        },
        updateAxisPointer: function(t, e, n, i) {
            xu(this, t, 0, n, 0, !1);
        },
        remove: function(t, e) {
            var n = this._axisPointer;
            n && n.remove(e), Sm.superApply(this, "remove", arguments);
        },
        dispose: function(t, e) {
            wu(this, e), Sm.superApply(this, "dispose", arguments);
        }
    }), Tm = [];
    Sm.registerAxisPointerClass = function(t, e) {
        Tm[t] = e;
    }, Sm.getAxisPointerClass = function(t) {
        return t && Tm[t];
    };
    var Cm = [ "axisLine", "axisTickLabel", "axisName" ], Im = [ "splitArea", "splitLine" ], km = Sm.extend({
        type: "cartesianAxis",
        axisPointerClass: "CartesianAxisPointer",
        render: function(t, e, n, i) {
            this.group.removeAll();
            var r = this._axisGroup;
            if (this._axisGroup = new Nh(), this.group.add(this._axisGroup), t.get("show")) {
                var a = t.getCoordSysModel(), o = bu(a, t), s = new _m(t, o);
                d(Cm, s.add, s), this._axisGroup.add(s.getGroup()), d(Im, function(e) {
                    t.get(e + ".show") && this["_" + e](t, a);
                }, this), yr(r, this._axisGroup, t), km.superCall(this, "render", t, e, n, i);
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
                for (var o = e.coordinateSystem.getRect(), l = n.isHorizontal(), u = 0, h = n.getTicksCoords({
                    tickModel: i
                }), c = [], f = [], d = r.getLineStyle(), p = 0; p < h.length; p++) {
                    var g = n.toGlobalCoord(h[p].coord);
                    l ? (c[0] = g, c[1] = o.y, f[0] = g, f[1] = o.y + o.height) : (c[0] = o.x, c[1] = g, 
                    f[0] = o.x + o.width, f[1] = g);
                    var v = u++ % a.length, m = h[p].tickValue;
                    this._axisGroup.add(new sd({
                        anid: null != m ? "line_" + h[p].tickValue : null,
                        subPixelOptimize: !0,
                        shape: {
                            x1: c[0],
                            y1: c[1],
                            x2: f[0],
                            y2: f[1]
                        },
                        style: s({
                            stroke: a[v]
                        }, d),
                        silent: !0
                    }));
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
                    var u = a.length, h = this._splitAreaColors, c = z(), f = 0;
                    if (h) for (v = 0; v < l.length; v++) {
                        var d = h.get(l[v].tickValue);
                        if (null != d) {
                            f = (d + (u - 1) * v) % u;
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
                        null != M && c.set(M, f), this._axisGroup.add(new ad({
                            anid: null != M ? "area_" + M : null,
                            shape: {
                                x: m,
                                y: y,
                                width: x,
                                height: w
                            },
                            style: s({
                                fill: a[f]
                            }, g),
                            silent: !0
                        })), f = (f + 1) % u;
                    }
                    this._splitAreaColors = c;
                }
            }
        }
    });
    km.extend({
        type: "xAxis"
    }), km.extend({
        type: "yAxis"
    }), ms({
        type: "grid",
        render: function(t) {
            this.group.removeAll(), t.get("show") && this.group.add(new ad({
                shape: t.coordinateSystem.getRect(),
                style: s({
                    fill: t.get("backgroundColor")
                }, t.getItemStyle()),
                silent: !0,
                z2: -1
            }));
        }
    }), hs(function(t) {
        t.xAxis && t.yAxis && !t.grid && (t.grid = {});
    }), e.version = "4.5.0", e.dependencies = Sg, e.PRIORITY = kg, e.init = function(t, e, n) {
        var i = ls(t);
        if (i) return i;
        var r = new Vo(t, e, n);
        return r.id = "ec_" + Xg++, Gg[r.id] = r, En(t, jg, r.id), os(r), r;
    }, e.connect = function(t) {
        if (_(t)) {
            var e = t;
            t = null, xg(e, function(e) {
                null != e.group && (t = e.group);
            }), t = t || "g_" + Ug++, xg(e, function(e) {
                e.group = t;
            });
        }
        return qg[t] = !0, t;
    }, e.disConnect = ss, e.disconnect = Yg, e.dispose = function(t) {
        "string" == typeof t ? t = Gg[t] : t instanceof Vo || (t = ls(t)), t instanceof Vo && !t.isDisposed() && t.dispose();
    }, e.getInstanceByDom = ls, e.getInstanceById = function(t) {
        return Gg[t];
    }, e.registerTheme = us, e.registerPreprocessor = hs, e.registerProcessor = cs, 
    e.registerPostUpdate = function(t) {
        Fg.push(t);
    }, e.registerAction = fs, e.registerCoordinateSystem = function(t, e) {
        xa.register(t, e);
    }, e.getCoordinateSystemDimensions = function(t) {
        var e = xa.get(t);
        return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0;
    }, e.registerLayout = ds, e.registerVisual = ps, e.registerLoading = vs, e.extendComponentModel = function(t) {
        return Kd.extend(t);
    }, e.extendComponentView = ms, e.extendSeriesModel = ys, e.extendChartView = function(t) {
        return oo.extend(t);
    }, e.setCanvasCreator = function(t) {
        n("createCanvas", t);
    }, e.registerMap = function(t, e, n) {
        mg.registerMap(t, e, n);
    }, e.getMap = function(t) {
        var e = mg.retrieveMap(t);
        return e && e[0] && {
            geoJson: e[0].geoJSON,
            specialAreas: e[0].specialAreas
        };
    }, e.dataTool = Zg, e.zrender = Ac, e.number = Fd, e.format = Ud, e.throttle = co, 
    e.helper = qv, e.matrix = sh, e.vector = Uu, e.color = Ch, e.parseGeoJSON = Uv, 
    e.parseGeoJson = $v, e.util = Qv, e.graphic = Kv, e.List = sv, e.Model = br, e.Axis = Zv, 
    e.env = Cu;
});