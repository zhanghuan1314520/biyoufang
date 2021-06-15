var t = require("../formatTime/index.js"), e = require("../plateform/index.js"), a = function() {
    getApp().login(function() {
        var t = getCurrentPages(), e = t[t.length - 1];
        e.onLoad && e.onLoad(e.options), e.onShow && e.onShow();
    });
}, o = function(e) {
    var a = getCurrentPages(), o = a[a.length - 1].route, r = e.opts, n = e.data, s = JSON.stringify({
        page: o,
        url: r.url,
        params: r.data || "",
        msg: n.Msg,
        code: n.ReturnCode,
        time: t.formateDate(Date.now())
    });
    throw new Error("接口异常捕获：" + s);
};

module.exports = {
    returnCodeHandle: function(t) {
        var r = getApp(), n = t.data, s = n.Msg, i = void 0 === s ? "" : s, l = n.ReturnCode, u = void 0 === l ? "" : l, c = (t.method, 
        t.reject), d = t.opts, g = t.res, h = t.catchErrRequest, m = !1;
        switch (String(u)) {
          case "401":
          case "400.1":
          case "400.2":
            a();
            break;

          default:
            402 != u || r.globalData.isMaintain ? d.toastCallBack ? d.toastCallBack(i, u) : g && 500 === g.statusCode || "500" === String(u) ? e.stopRepeatedlyExecute(function() {
                wx.showModal({
                    title: "提示",
                    content: "小必开小差了，加急修复中，小主消消气~",
                    showCancel: !1
                });
            }) : (m = !0, i && wx.showModal({
                title: "错误提示",
                content: i,
                showCancel: !1
            })) : (r.globalData.isMaintain = !0, wx.reLaunch({
                url: "/ext_features/maintain/maintain?msg=" + i
            }));
        }
        c({
            code: u,
            msg: i
        }), m && "/track/v3.3/error" !== d.url && h && h({
            code: u,
            url: d.url
        }), m && o(t);
    }
};