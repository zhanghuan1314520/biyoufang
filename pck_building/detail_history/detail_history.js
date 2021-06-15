function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../components/ec-canvas/echarts")), r = require("../../config.js"), i = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        navH: a.globalData.navH,
        winning: null,
        price: null
    },
    onLoad: function(e) {
        var t = this;
        a.checkSession(function() {
            t.getHistoryProject(e.buildingId), t.setData({
                buildingName: e.buildingName,
                districtName: e.districtName,
                buildingId: e.buildingId
            });
        }, i.getShareParams(e));
    },
    getHistoryProject: function(e) {
        var t = this;
        return i.request({
            url: r.service.getHistoryProjectInBld.replace("{buildingId}", e)
        }).then(function(e) {
            e.HistoryProject.forEach(function(e) {
                var t = new Date(e.RegisterStartTime.replace(/[\.\-]/g, "/"));
                e.year = t.getFullYear(), e.month = t.getMonth() + 1, e.date = i.fixPrefixion(t.getDate()), 
                e.SuccessRate = e.SuccessRate ? e.SuccessRate % 1 == 0 ? e.SuccessRate : e.SuccessRate.toFixed(1) : 0, 
                e.AveragePriceFloat = i.fixedNumber(e.AveragePriceFloat), e.SuccessRateFloat = i.fixedNumber(e.SuccessRateFloat);
            }), t.setData({
                historyProject: e.HistoryProject,
                rateData: t.handleHistoryProjectTrend(e.RateTrend),
                priceData: t.handleHistoryProjectTrend(e.PriceTrend, 1)
            }, function() {
                var e = t.data, r = e.rateData, i = e.priceData;
                t.setData({
                    winning: {
                        onInit: t.initChart(r)
                    },
                    price: {
                        onInit: t.initChart(i, 1)
                    }
                });
            });
        });
    },
    handleHistoryProjectTrend: function(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, a = {
            xaxis: [],
            series: []
        };
        return a.start = t.length > 5 ? parseInt((t.length - 5) / t.length * 100) : 0, a.end = 100, 
        t.forEach(function(e, n) {
            var o = new Date(e.Time.replace(/[\.\-]/g, "/")), l = o.getMonth() + 1, s = o.getDate(), c = o.getFullYear(), u = r ? e.Val : i.fixedNumber(e.Val);
            e.year = c, n > 0 && t[n - 1].year, a.xaxis.push(c + "\n" + l + "-" + s), a.series.push(u);
        }), r && (a.min = Math.min.apply(Math, e(a.series)), a.max = 1e4 * Math.ceil(Math.max.apply(Math, e(a.series)) / 1e4), 
        a.splitNumber = this.formatSplitNumber(a.max)), a;
    },
    formatSplitNumber: function(e) {
        var t = e / 1e4 * 1;
        return t = t > 5 ? 3 : t;
    },
    initChart: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return function(i, a, n) {
            var o = t.init(i, null, {
                width: a,
                height: n
            });
            i.setChart(o);
            var l = {
                xAxis: {
                    type: "category",
                    boundaryGap: !1,
                    inverse: !0,
                    data: e.xaxis,
                    splitLine: {
                        show: !0,
                        lineStyle: {
                            color: [ "#DDDDDD" ],
                            width: 1,
                            type: "solid",
                            opacity: .3
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "#DDDDDD",
                            width: "1",
                            opacity: .3
                        }
                    },
                    axisTick: {
                        length: 2,
                        inside: !0
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: "#8A8A8A",
                            right: "right",
                            fontSize: 11
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    max: e.max ? e.max : 100,
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "#DDDDDD",
                            width: "1",
                            opacity: .3
                        }
                    },
                    axisTick: {
                        length: 0
                    },
                    splitLine: {
                        show: !0,
                        lineStyle: {
                            color: [ "#DDDDDD" ],
                            width: 1,
                            type: "solid",
                            opacity: .3
                        }
                    },
                    splitNumber: e.splitNumber,
                    axisLabel: {
                        textStyle: {
                            right: "right",
                            fontSize: 10
                        },
                        formatter: r ? function(e) {
                            return 0 === e ? 0 : parseInt(e / 1e4) + "万";
                        } : "{value}"
                    }
                },
                grid: {
                    right: "18",
                    top: "24",
                    bottom: "31",
                    borderColor: "#DDDDDD",
                    borderWidth: 4
                },
                dataZoom: [ {
                    type: "inside",
                    start: e.start,
                    end: e.end
                } ],
                series: [ {
                    symbol: "circle",
                    symbolSize: 6,
                    label: {
                        normal: {
                            show: !0,
                            color: "#fff",
                            backgroundColor: r ? "#FF0000" : "#F4B834",
                            fontSize: 11,
                            padding: [ 2, 4 ],
                            formatter: r ? "{c}" : "{c}%"
                        }
                    },
                    data: e.series,
                    type: "line",
                    itemStyle: {
                        normal: {
                            color: r ? "#FF0000" : "#F4B834",
                            lineStyle: {
                                color: r ? "#FF0000" : "#F4B834"
                            }
                        }
                    },
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [ {
                                offset: 0,
                                color: "#fff"
                            }, {
                                offset: 1,
                                color: "#fff"
                            } ],
                            global: !1
                        },
                        origin: "start",
                        opacity: .3
                    }
                } ]
            };
            return o.setOption(l), o;
        };
    },
    onShareAppMessage: function() {
        return i.extractShareFn({
            util: i,
            app: a
        });
    }
});