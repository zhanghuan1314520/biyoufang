var t = getApp();

require("../../utils/index.js");

Page({
    data: {
        navH: t.globalData.navH,
        navM: t.globalData.screenHeight - t.globalData.navH,
        bottom: 0,
        qrCodeImg: "",
        weixin: "",
        showFlag: !1
    },
    onLoad: function(e) {
        var i = this, o = wx.getSystemInfoSync(), a = o.windowWidth, n = o.windowHeight, s = wx.getStorageSync("cityInfo"), c = s.officialWechatQrcodeUrl, l = s.OfficialWechat;
        this.setData({
            qrCodeImg: c,
            weixin: l,
            ctxHeight: n - t.globalData.navH,
            ctxWidth: a
        }), wx.nextTick(function() {
            i.makePoster();
        });
    },
    getFileByPromise: function(t) {
        return new Promise(function(e, i) {
            t.includes("http://") || t.includes("https://") ? wx.downloadFile({
                url: t,
                success: function(t) {
                    200 === t.statusCode && e(t.tempFilePath);
                },
                fail: function(t) {
                    console.log(t);
                }
            }) : e(t);
        });
    },
    savePlacard: function() {
        wx.showLoading({
            title: "正在保存中..."
        }), wx.canvasToTempFilePath({
            canvasId: "canvas",
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showToast({
                            title: "图片已保存到相册",
                            icon: "success",
                            duration: 1500
                        });
                    },
                    fail: function(t) {
                        "saveImageToPhotosAlbum:fail auth deny" === t.errMsg ? wx.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                wx.showToast({
                                    title: "获取权限成功，请重新点击按钮保存海报",
                                    icon: "success",
                                    duration: 1500
                                });
                            },
                            fail: function() {
                                wx.showModal({
                                    title: "警告",
                                    content: "相册授权失败，请进行相册功能授权",
                                    success: function(t) {
                                        t.confirm && wx.openSetting({
                                            success: function(t) {}
                                        });
                                    }
                                });
                            }
                        }) : wx.showToast({
                            title: "图片保存失败",
                            icon: "none",
                            duration: 1500
                        });
                    },
                    complete: function(t) {
                        wx.hideLoading();
                    }
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "图片保存失败",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    makePoster: function() {
        var t = this, e = this.data, i = e.ctxHeight, o = e.ctxWidth, a = e.qrCodeImg, n = e.weixin;
        wx.showLoading({
            title: "正在生成图片"
        });
        var s = [ this.getFileByPromise("/h5_webview/images/cooperation/business_bj.png"), this.getFileByPromise("/h5_webview/images/cooperation/business_text.png"), this.getFileByPromise(a) ];
        Promise.all(s).then(function(e) {
            var a = wx.createCanvasContext("canvas");
            a.setTextBaseline("top"), a.drawImage(e[0], 0, 0, o, i), a.drawImage(e[1], 0, 0, o, i), 
            a.drawImage(e[2], (o - .3 * o) / 2, .57 * i, .3 * o, .3 * o), a.setFontSize(12);
            var s = "官方微信：" + n, c = a.measureText(s).width;
            a.setFillStyle("#fff"), a.fillText(s, o / 2 - c / 2, .784 * i), a.draw(), wx.hideLoading(), 
            t.setData({
                showFlag: !0
            });
        });
    },
    copyText: function() {
        wx.setClipboardData({
            data: this.data.weixin,
            success: function(t) {
                wx.showToast({
                    title: "微信号复制成功"
                });
            }
        });
    }
});