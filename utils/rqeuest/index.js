var e = require("../../config.js"), r = require("./returnCodeHandle.js"), t = require("../plateform/index.js"), a = require("../../utils/plugins/michat/md5.min.js"), o = function() {
    for (var e = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G" ], r = "", t = 0; t < 8; t++) r += e[Math.ceil(16 * Math.random())];
    return r.toLowerCase();
}, n = function(e) {
    var r = "?";
    for (var t in e) {
        var a = e[t];
        "string" == typeof a && (a.indexOf(",") > -1 && (a = a.replace(/,/g, "%2C")), a.indexOf("'") > -1 && (a = a.replace(/'/g, "%27"))), 
        /.*[\u4e00-\u9fa5]+.*$/.test(a) && (a = encodeURI(a)), r += t + "=" + a + "&";
    }
    return r = r.slice(0, r.length - 1);
}, l = function(e) {
    i({
        url: "/track/v3.3/error",
        data: {
            ErrorCode: e.code,
            Url: e.url
        },
        method: "POST"
    });
}, i = function(i) {
    if (!i.url) return Promise.reject();
    if (i.url.includes("http")) return Promise.reject();
    i.loading && wx.showLoading({
        mask: !0,
        title: i.loading.title || "加载中..."
    });
    var u = getApp(), s = u.globalData.token, d = o(), c = i.url;
    i.method && "get" != i.method.trim().toLowerCase() || !i.data || (c += n(i.data));
    var f = a(a((c + "+" + e.rsKey).toLowerCase()).toLowerCase() + "+" + d);
    return new Promise(function(o, n) {
        var c = {
            "rs-key": e.rsKey,
            "rs-random": d,
            "rs-sign": f,
            sourceport: "miniprogram"
        };
        try {
            var g = u.globalData.userInfo || null;
            g || (g = wx.getStorageSync("userInfo") || null) && (u.globalData.userInfo = g);
            var m = g && g.OpenId;
            m && (c["rl-key"] = a(m));
        } catch (e) {}
        u.globalData.cityInfo && (c.cityId = u.globalData.cityInfo.CityId), i.headerParam && i.headerParam.cityId && (c.cityId = i.headerParam.cityId), 
        s && (c.Authorization = s), wx.request({
            url: i.fullUrl ? i.fullUrl : "" + e.root + i.url,
            header: c,
            method: i.method || "GET",
            data: i.data || {},
            complete: function() {
                i.complete && i.complete(), i.loading && wx.hideLoading();
            },
            success: function(e) {
                var t = e.data;
                200 == t.ReturnCode ? o(t.Data) : r.returnCodeHandle({
                    data: t,
                    res: e,
                    opts: i,
                    reject: n,
                    method: i.method || "GET",
                    catchErrRequest: l
                });
            },
            fail: function(e) {
                t.stopRepeatedlyExecute(function() {
                    wx.showModal({
                        title: "提示",
                        content: "小必提醒：您的网络走丢了哦~",
                        showCancel: !1
                    });
                }), wx.hideLoading(), n(e);
            }
        });
    });
};

module.exports = {
    request: i,
    uploadRequest: function(t) {
        var n = getApp(), l = n.globalData.userInfo || null;
        l || (l = wx.getStorageSync("userInfo") || null) && (n.globalData.userInfo = l);
        var i = n.globalData.token || "Bearer " + l.Token.access_token, u = e.root, s = t.fullUrl ? t.fullUrl : "" + u + t.url, d = "/" + s.split("/").slice(3).join("/").split("?")[0];
        return t.loading && wx.showLoading({
            mask: !0,
            title: t.loading.title || "上传中..."
        }), new Promise(function(n, u) {
            var c = o(), f = a(a((d + "+" + e.rsKey).toLowerCase()).toLowerCase() + "+" + c), g = {
                "rs-key": e.rsKey,
                "rs-random": c,
                "rs-sign": f,
                Authorization: i,
                sourceport: "miniprogram"
            }, m = l && l.OpenId;
            m && (g["rl-key"] = a(m)), wx.uploadFile({
                url: s,
                filePath: t.path,
                name: "file",
                header: g,
                formData: t.formData || {},
                success: function(e) {
                    var a = JSON.parse(e.data);
                    200 == a.ReturnCode ? n(a.Data) : r.returnCodeHandle({
                        data: a,
                        opts: t,
                        reject: u
                    });
                },
                fail: function(e) {
                    u(e);
                },
                complete: function() {
                    t.loading && wx.hideLoading();
                }
            });
        });
    },
    getRsRandom: o
};