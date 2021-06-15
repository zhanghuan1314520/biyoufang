function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

function t(e) {
    var t = e.select, o = e.callback, a = e.selectType, l = void 0 === a ? "select" : a, i = e.stack, n = (void 0 === i ? wx : i).createSelectorQuery();
    n[l](t).boundingClientRect(), n.selectViewport(), n.exec(function(e) {
        o(e);
    });
}

function o(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1500;
    wx.showToast({
        icon: "none",
        title: e,
        duration: t
    });
}

module.exports = {
    getElementSize: t,
    observerViewPort: function(e) {
        var t = e.selector, o = e.intersectSelector, a = void 0 === o ? "" : o, l = e.callback, i = e.options, n = void 0 === i ? {
            observeAll: !0
        } : i, c = e.margins, r = void 0 === c ? {} : c, u = e.selectType, s = void 0 === u ? "relativeToViewport" : u, v = e.stack, d = wx.createIntersectionObserver(v, n);
        "relativeTo" === s ? d[s](a, r).observe(t, function(e) {
            l(e);
        }) : d[s](r).observe(t, function(e) {
            l(e);
        });
    },
    computedRpxToPxRatio: function(e) {
        wx.getSystemInfo({
            success: function(t) {
                e && e(750 / t.windowWidth);
            }
        });
    },
    navigatePage: function(e) {
        var t = e.url, o = void 0 === t ? "" : t, a = e.goType, l = void 0 === a ? "navigateTo" : a, i = e.duration, n = void 0 === i ? 1500 : i, c = e.success, r = void 0 === c ? null : c, u = e.fail, s = void 0 === u ? null : u, v = getApp(), d = v.globalData.buttonIsClickFlag;
        o && !d && (v.globalData.buttonIsClickFlag = 1, v.globalData.buttonIsClickTimerid = setTimeout(function() {
            v.globalData.buttonIsClickFlag = 0;
        }, n), wx[l]({
            url: o,
            success: function() {
                r && r();
            },
            fail: function() {
                s && s();
            }
        }));
    },
    computedTextLineNumber: function(e) {
        var o = e.select, a = e.lineHeight, l = e.selectType, i = void 0 === l ? "select" : l, n = e.callback, c = void 0 === n ? null : n, r = e.stack, u = void 0 === r ? wx : r, s = e.ratio, v = void 0 === s ? 1 : s;
        t({
            select: o,
            callback: function(e) {
                var t = e[0] && e[0].height;
                c && c(Math.ceil(t / (a / v)));
            },
            stack: u,
            selectType: i
        });
    },
    wxToast: o,
    stopRepeatedlyExecute: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3, o = getApp();
        o.globalData.repeatedlyExecuteFlag || (o.globalData.repeatedlyExecuteFlag = !0, 
        e && e(), setTimeout(function() {
            o.globalData.repeatedlyExecuteFlag = !1;
        }, t));
    },
    callPhone: function(e) {
        e ? wx.makePhoneCall({
            phoneNumber: e.replace(/#/g, "")
        }) : o("暂无电话号码");
    },
    updateProerty: function(t, o) {
        getCurrentPages().forEach(function(a) {
            a.data[t] && a.setData(e({}, t, o));
        });
    }
};