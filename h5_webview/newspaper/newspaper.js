var e = require("../../config.js"), t = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        navH: i.globalData.navH,
        canvasW: i.globalData.deviceWidth,
        canvasMinH: i.globalData.screenHeight - i.globalData.navH - 115,
        paperFileUrl: "",
        time: "",
        paperObj: null
    },
    onLoad: function(e) {
        var a = this;
        i.checkSession(function() {
            a.getTimeToday();
        }, t.getShareParams(e));
    },
    makePoster: function() {
        wx.showLoading({
            title: "加载中"
        });
        var e = this.data, t = e.canvasH, i = e.canvasW, a = e.time, n = e.paperObj, l = wx.createCanvasContext("canvas"), r = l.createLinearGradient(0, 0, 0, t);
        r.addColorStop(0, "#EB6F00"), r.addColorStop(1, "#F3882C"), l.setFillStyle(r), l.fillRect(0, 0, i, t), 
        l.fill(), l.setFontSize(30), l.setFillStyle("white"), l.fillText("必有房楼市早报", 15, 42);
        var o = l.createLinearGradient(0, 0, 111, 0);
        o.addColorStop(0, "#FFEB5E"), o.addColorStop(1, "#FFD230"), this.roundRect(l, 15, 65, 111, 35, 2, o), 
        l.setFontSize(20), l.setFillStyle("#656565"), l.fillText(a, 20, 90), l.drawImage("/h5_webview/images/newspaper/lszb_img@3x.png", 0, 0, 345, 285, i - 125, 12, 115, 95);
        var s = 151;
        l.setTextBaseline("top");
        var c = n.RegisterList.length;
        if (c > 0) {
            var f = 52 + 34 * c;
            this.roundRect(l, 15, s, i - 30, f, 4, "white"), this.drawModuleTitle(l, s);
            var g = "正在登记(" + c + ")";
            l.setFontSize(16), l.setTextAlign("center"), l.setFillStyle("#4FA4F5"), l.fillText(g, i / 2, s + 8), 
            s += 52, l.setFontSize(13), l.setTextAlign("left"), n.RegisterList.forEach(function(e) {
                var t = e.DistrictName + " : ", a = 29 + Math.ceil(l.measureText(t).width);
                l.setFillStyle("#777777"), l.fillText(e.DistrictName + " : ", 29, s), l.setFillStyle("#333333"), 
                l.fillText(e.BuildingName, a, s), l.save(), l.setTextAlign("right"), l.fillText(e.time, i - 30, s), 
                l.restore(), s += 34;
            }), s += 17;
        }
        var h = n.PublicityList.length;
        if (h > 0) {
            var T = 52 + 34 * h;
            this.roundRect(l, 15, s, i - 30, T, 4, "white"), this.drawModuleTitle(l, s);
            var u = "即将登记(" + h + ")";
            l.setFontSize(16), l.setTextAlign("center"), l.setFillStyle("#4FA4F5"), l.fillText(u, i / 2, s + 8), 
            s += 52, l.setFontSize(13), l.setTextAlign("left"), n.PublicityList.forEach(function(e) {
                var t = e.DistrictName + " : ", a = 29 + Math.ceil(l.measureText(t).width);
                l.setFillStyle("#777777"), l.fillText(e.DistrictName + " : ", 29, s), l.setFillStyle("#333333"), 
                l.fillText(e.BuildingName, a, s), l.save(), l.setTextAlign("right"), l.fillText(e.time, i - 30, s), 
                l.restore(), s += 34;
            }), s += 17;
        }
        var v = n.RecentlyLottery.length;
        if (v > 0) {
            var x = 52 + 34 * v;
            this.roundRect(l, 15, s, i - 30, x, 4, "white"), this.drawModuleTitle(l, s);
            var d = "近期摇号(" + v + ")";
            l.setFontSize(16), l.setTextAlign("center"), l.setFillStyle("#4FA4F5"), l.fillText(d, i / 2, s + 8), 
            s += 52, l.setFontSize(13), l.setTextAlign("left"), n.RecentlyLottery.forEach(function(e) {
                var t = e.DistrictName + " : ", a = 29 + Math.ceil(l.measureText(t).width);
                l.setFillStyle("#777777"), l.fillText(e.DistrictName + " : ", 29, s), l.setFillStyle("#333333"), 
                l.fillText(e.BuildingName, a, s), l.save(), l.setTextAlign("right"), l.fillText(e.time, i - 30, s), 
                l.restore(), s += 34;
            });
        }
        s += 64;
        l.beginPath(), l.arc(i / 2, s, 42, 0, 2 * Math.PI), l.setFillStyle("white"), l.fill();
        l.drawImage("/h5_webview/images/newspaper/byf.png", 0, 0, 430, 430, i / 2 - 36, s - 36, 72, 72), 
        s += 54, l.setTextAlign("center"), l.fillText("买新房 上必有房", i / 2, s), l.drawImage("/h5_webview/images/newspaper/lszbz_img_01@3x.png", 0, 0, 227, 227, 0, t - 70, 73, 73), 
        l.drawImage("/h5_webview/images/newspaper/lszbz_img_02@3x.png", 0, 0, 390, 390, i - 128, t - 128, 128, 128);
        var m = this;
        l.draw(!1, function() {
            setTimeout(function() {
                m.getPoster();
            }, 600);
        });
    },
    getMorningPaper: function() {
        return t.request({
            url: e.service.getMorningPaper
        });
    },
    getPoster: function() {
        var e = this.data, t = e.canvasH, i = e.canvasW, a = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: i,
            height: t,
            canvasId: "canvas",
            success: function(e) {
                a.setData({
                    paperFileUrl: e.tempFilePath
                });
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    savePoster: function() {
        var e = this;
        wx.showLoading({
            title: "保存中"
        }), wx.saveImageToPhotosAlbum({
            filePath: e.data.paperFileUrl,
            success: function(e) {
                t.wxToast("保存成功，快去朋友圈分享吧");
            },
            fail: function() {
                t.wxToast("保存失败，请重新尝试");
            }
        });
    },
    getTimeToday: function() {
        var e = this, i = new Date(), a = i.getFullYear(), n = t.fixPrefixion(i.getMonth() + 1), l = t.fixPrefixion(i.getDate());
        this.setData({
            time: a + "." + n + "." + l
        }, function() {
            e.getMorningPaper().then(function(t) {
                var i = 302;
                Object.keys(t).forEach(function(a) {
                    t[a].length > 0 && (i += 69, t[a].forEach(function(t) {
                        i += 34, t.time = e.formatTimeDuration(t);
                    }));
                }), e.setData({
                    paperObj: t,
                    canvasH: i > e.data.canvasMinH ? i : e.data.canvasMinH
                }), wx.nextTick(function() {
                    e.makePoster();
                });
            });
        });
    },
    formatTimeDuration: function(e) {
        if (1 === e.Status && !e.RegisterStartTime) return "(已拿预售证)";
        if (3 === e.Status || 4 === e.Status) {
            if (!e.LotteryTime) return "(待定)";
            var i = new Date(e.LotteryTime.replace(/[\.\-]/g, "/"));
            return "(" + t.fixPrefixion(i.getMonth() + 1) + "." + t.fixPrefixion(i.getDate()) + ")";
        }
        if (!e.RegisterStartTime) return "(待定)";
        var a = new Date(e.RegisterStartTime.replace(/[\.\-]/g, "/")), n = new Date(e.RegisterEndTime.replace(/[\.\-]/g, "/"));
        return "(" + t.fixPrefixion(a.getMonth() + 1) + "." + t.fixPrefixion(a.getDate()) + "~" + t.fixPrefixion(n.getMonth() + 1) + "." + t.fixPrefixion(n.getDate()) + ")";
    },
    roundRect: function(e, t, i, a, n, l) {
        var r = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : "#fff";
        a < 2 * l && (l = a / 2), n < 2 * l && (l = n / 2), e.save(), e.beginPath(), e.fillStyle = r, 
        e.arc(t + l, i + l, l, Math.PI, 1.5 * Math.PI), e.moveTo(t + l, i), e.lineTo(t + a - l, i), 
        e.lineTo(t + a, i + l), e.arc(t + a - l, i + l, l, 1.5 * Math.PI, 2 * Math.PI), 
        e.lineTo(t + a, i + n - l), e.lineTo(t + a - l, i + n), e.arc(t + a - l, i + n - l, l, 0, .5 * Math.PI), 
        e.lineTo(t + l, i + n), e.lineTo(t, i + n - l), e.arc(t + l, i + n - l, l, .5 * Math.PI, Math.PI), 
        e.lineTo(t, i + l), e.lineTo(t + l, i), e.closePath(), e.fill(), e.restore();
    },
    drawModuleTitle: function(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 154, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 34, n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 15, l = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "#E6F1FB";
        e.save();
        var r = this.data.canvasW / 2 - i / 2;
        i < 2 * n && (n = i / 2), a < 2 * n && (n = a / 2), e.beginPath(), e.fillStyle = l, 
        e.moveTo(r, t), e.lineTo(r + i, t), e.lineTo(r + i, t + a - n), e.lineTo(r + i - n, t + a), 
        e.arc(r + i - n, t + a - n, n, 0, .5 * Math.PI), e.lineTo(r + n, t + a), e.lineTo(r, t + a - n), 
        e.arc(r + n, t + a - n, n, .5 * Math.PI, Math.PI), e.lineTo(r, t + n), e.lineTo(r, t), 
        e.closePath(), e.fill(), e.restore();
    },
    onShareAppMessage: function() {
        return t.extractShareFn({
            util: t,
            app: i
        });
    }
});