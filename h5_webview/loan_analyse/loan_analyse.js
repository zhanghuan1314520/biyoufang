var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("../../h5_webview/ec-canvas/echarts")), t = getApp(), a = require("../../utils/index.js");

Page({
    data: {
        ecCircle: null,
        navH: t.globalData.navH,
        tabIndex: "1",
        pageInfo: null,
        serviceLoanInfo: null,
        analyse: null
    },
    onLoad: function(e) {
        var n = this, i = JSON.parse(e.pageInfo), r = i.pageInfo, o = i.serviceLoanInfo;
        t.checkSession(function() {
            n.setData({
                pageInfo: r,
                serviceLoanInfo: o
            }, function() {
                n.analyse(n.data.tabIndex), n.initCharts();
            });
        }, a.getShareParams(e));
    },
    analyse: function(e) {
        var t = this.data.pageInfo, a = void 0;
        if ("1" === e) {
            if (a = this.calcInstallmentType1(1e4 * t.money1, t.rate1 / 100, 12 * t.time1), 
            t.money2) {
                var n = this.calcInstallmentType1(1e4 * t.money2, t.rate2 / 100, 12 * t.time2);
                a = this.formatResult(a, n);
            }
        } else if (a = this.calcInstallmentType2(1e4 * t.money1, t.rate1 / 100, 12 * t.time1), 
        t.money2) {
            var i = this.calcInstallmentType2(1e4 * t.money2, t.rate2 / 100, 12 * t.time2);
            a = this.formatResult(a, i);
        }
        this.setData({
            analyse: a
        });
    },
    formatResult: function(e, t) {
        return console.log(e, t), "1" === this.data.tabIndex ? {
            per: (1 * e.per + 1 * t.per).toFixed(2),
            total: (1 * e.total + 1 * t.total).toFixed(2),
            price: (1 * e.price + 1 * t.price).toFixed(2),
            rateMoney: (1 * e.rateMoney + 1 * t.rateMoney).toFixed(2),
            year: e.year > t.year ? e.year : t.year
        } : {
            per: (1 * e.per + 1 * t.per).toFixed(2),
            total: (1 * e.total + 1 * t.total).toFixed(2),
            price: (1 * e.price + 1 * t.price).toFixed(2),
            rateMoney: (1 * e.rateMoney + 1 * t.rateMoney).toFixed(2),
            perReally: (1 * e.perReally + 1 * t.perReally).toFixed(2),
            year: e.year > t.year ? e.year : t.year
        };
    },
    prevent: function() {},
    initCharts: function() {
        this.setData({
            ecCircle: {
                onInit: this.initChart()
            }
        });
    },
    calcInstallmentType1: function(e, t, a) {
        var n = (e * ((t /= 12) * Math.pow(1 + t, a)) / (Math.pow(1 + t, a) - 1)).toFixed(3);
        n = (Math.round(100 * n) / 100).toFixed(2);
        var i = Math.round(100 * (n * a).toFixed(3)) / 100, r = Math.round(100 * (i - e).toFixed(3)) / 100, o = a / 12;
        return {
            per: n,
            total: this.toFixed2(i),
            price: e / 1e4,
            rateMoney: this.toFixed2(r),
            year: o
        };
    },
    toFixed2: function(e) {
        return (e / 1e4).toFixed(2);
    },
    calcInstallmentType2: function(e, t, a) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        t /= 12;
        var i = Math.round(100 * (e / a + (e - n) * t).toFixed(3)) / 100, r = (Math.round(100 * (i * t).toFixed(3)), 
        Math.round(100 * ((a + 1) * e * t / 2).toFixed(3)) / 100), o = r + e, l = Math.round(100 * (e / a * t).toFixed(3)) / 100, s = a / 12;
        return {
            per: i.toFixed(2),
            total: this.toFixed2(o),
            price: e / 1e4,
            rateMoney: this.toFixed2(r),
            perReally: l,
            year: s
        };
    },
    tabBarClick: function(e) {
        var t = e.target.dataset.i;
        t && this.data.tabIndex !== t && (this.setData({
            tabIndex: t
        }), this.analyse(t), this.selectComponent("#winning__column").init(this.initChart()));
    },
    initChart: function() {
        var t = this.data;
        return function(a, n, i) {
            var r = e.init(a, null, {
                width: n,
                height: i
            });
            a.setChart(r);
            var o = {
                backgroundColor: "#ffffff",
                color: [ "#FF9C20", "#FFD560" ],
                series: [ {
                    type: "pie",
                    selectedMode: !1,
                    silent: !0,
                    center: [ "50%", "50%" ],
                    radius: [ "63%", "90%" ],
                    avoidLabelOverlap: !1,
                    hoverAnimation: !1,
                    labelLine: {
                        normal: {
                            show: !1
                        }
                    },
                    label: {
                        normal: {
                            show: !1,
                            position: "center",
                            fontSize: 14
                        }
                    },
                    data: [ {
                        value: t.analyse.price,
                        name: "????????????"
                    }, {
                        value: t.analyse.rateMoney,
                        name: "????????????"
                    } ]
                } ]
            };
            return r.setOption(o, !0), r;
        };
    },
    toHelp: function() {
        var e = JSON.stringify(this.data.serviceLoanInfo);
        wx.navigateTo({
            url: "/h5_webview/loan-help/loan-help?serviceLoanInfo=" + e
        });
    },
    onShareAppMessage: function() {
        return a.extractShareFn({
            app: t
        });
    }
});