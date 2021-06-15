function e(e, t) {
    t = t || "YYYY/MM/DD HH:mm:ss";
    var n = "string" == typeof e ? new Date(e.replace(/[\.\-]/g, "/")) : new Date(e), r = /y+/g.exec(t), a = {
        "Y+": r && 2 === r[0].length ? n.getFullYear().toString().substring(2, 5) : n.getFullYear(),
        "M+": n.getMonth() + 1 > 9 ? n.getMonth() + 1 : "0" + (n.getMonth() + 1),
        "D+": n.getDate() > 9 ? n.getDate() : "0" + n.getDate(),
        "H+": n.getHours() > 9 ? n.getHours() : "0" + n.getHours(),
        "m+": n.getMinutes() > 9 ? n.getMinutes() : "0" + n.getMinutes(),
        "s+": n.getSeconds() > 9 ? n.getSeconds() : "0" + n.getSeconds(),
        "q+": Math.floor((n.getMonth() + 3) / 3),
        S: n.getMilliseconds(),
        "W+": o[n.getDay()]
    };
    for (var g in a) new RegExp(g, "g").test(t) && (t = t.replace(new RegExp(g, "g"), a[g]));
    return t;
}

function t(e) {
    return e.replace(/[\.\-]/g, "/");
}

var n = function(e) {
    var t = e, n = new Date().getTime();
    return (e = new Date(e.replace(/[\.\-]/g, "/")).getTime()) >= n - 36e5 && (t = (t = Math.floor((n - e) / 6e4)) <= 0 ? 1 : t, 
    t += "分钟前"), e < n - 36e5 && e >= n - 864e5 && (t = Math.floor((n - e) / 36e5) + "小时前"), 
    e < n - 864e5 && e >= n - 2592e5 && (t = Math.floor((n - e) / 864e5) + "天前"), t;
}, r = function(e) {
    return e < 10 ? "0" + e : e;
}, a = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3, n = new Date(), r = e.getMonth() + 1, a = e.getDate();
    return n.getMonth() - e.getMonth() > 0 ? g(r) - a + n.getDate() > t : n.getDate() - a > t;
}, g = function(e) {
    switch (e = e || new Date().getMonth + 1) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;

      case 4:
      case 5:
      case 6:
      case 9:
      case 11:
        return 30;

      case 2:
        return i() ? 29 : 28;
    }
}, i = function(e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}, o = [ "日", "一", "二", "三", "四", "五", "六" ];

module.exports = {
    formatQuestionCreateTime: n,
    formatRegisterTimeInDetail: function(e) {
        return "string" != typeof e ? "" : e.substr(0, 16).replace(/-/g, ".");
    },
    formatPreSaleTime: function(e) {
        return e ? e.substr(5, 2) + "月" : "";
    },
    formatTimeToTill: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? new Date(e) : new Date(e.replace(/[\.\-]/g, "/")), n = new Date(), i = t.getFullYear(), o = t.getMonth() + 1, u = t.getDate(), s = (n - t) / 1e3;
        if (s < 60) return "刚刚";
        if (n.getFullYear() !== i) return i + "." + r(o) + "." + r(u);
        if (a(t)) return r(o) + "." + r(u);
        if (s / 60 / 60 / 24 >= 1) return (n.getMonth() + 1 == o ? n.getDate() - u : g(o) - u + n.getDate()) + "天前";
        return s / 60 < 60 ? parseInt(s / 60) + "分钟前" : parseInt(s / 3600) + "小时前";
    },
    fixPrefixion: r,
    getMaxDate: g,
    formatMessageTime: function(e) {
        if (!e) return "";
        var t = e.replace(/[\.\-]/g, "/"), n = new Date(), r = n.getFullYear(), a = n.getMonth() + 1, i = n.getDate(), o = new Date(t), u = o.getFullYear(), s = o.getMonth() + 1, c = o.getDate(), l = i - c;
        return r == u ? i == c && a == s ? e.slice(11, 16) : i != c ? a == s ? 1 == l ? "昨天" + e.slice(11, 16) : e.slice(5, 16) : g(s) + i - c < 2 ? "昨天" + e.slice(11, 16) : e.slice(5, 16) : e.slice(5, 16) : e.slice(0, -3);
    },
    formatArticleTime: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return e = e.replace(/[\.\-]/g, "/"), e = n(e), (e = e.replace(/\//g, ".")).split(" ")[0] || "";
    },
    formateDate: e,
    compatibleIOSDate: t,
    intervalDays: function(t) {
        if (t) {
            var n = new Date(e(Date.now(), "YYYY/MM/DD")).getTime();
            return (new Date(e(t, "YYYY/MM/DD")).getTime() - n) / 864e5;
        }
    },
    isCurrentYear: function(e) {
        return e ? (e = t(e), new Date(e).getFullYear() === new Date().getFullYear()) : "";
    },
    isExpiredTime: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 30;
        if (!e) return !1;
        var r = new Date(t(e)).getTime();
        return Date.now() - r > 24 * n * 60 * 60 * 1e3;
    }
};