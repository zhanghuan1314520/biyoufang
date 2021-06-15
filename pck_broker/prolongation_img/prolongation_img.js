var t = require("../../config.js"), a = require("../../utils/index.js"), e = getApp(), i = null;

Page({
    data: {
        navH: e.globalData.navH,
        userInfo: {},
        showAuth: !1,
        isLoaded: !1,
        readyToPaint: !1,
        canvasHeight: !1,
        paintType: 1,
        imgWidth: null,
        imgHeight: null,
        downloadVisible: !1,
        consultantInfo: null
    },
    onLoad: function(t) {
        var a = this;
        e.checkSession(function() {
            a.setData({
                userInfo: e.globalData.userInfo,
                consultantInfo: e.globalData.consultantInfo
            });
        });
    },
    onReady: function() {
        i = this.selectComponent("#buildingTab");
    },
    onHide: function() {
        this.setData({
            showAuth: !1
        });
    },
    changePaintType: function() {
        this.setData({
            paintType: 3 - this.data.paintType
        });
    },
    loadImage: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            success: function(a) {
                wx.showLoading({
                    title: "加载中.."
                });
                var e = a.tempFilePaths;
                wx.getImageInfo({
                    src: e[0],
                    success: function(a) {
                        wx.hideLoading();
                        var i = a.width, n = a.height;
                        t.setData({
                            paintSrc: e[0],
                            imgWidth: i,
                            imgHeight: n,
                            isLoaded: !0
                        });
                    }
                });
            }
        });
    },
    createImg: function() {
        this.data.isLoaded ? this.paint() : wx.showToast({
            icon: "none",
            title: "请加载图片"
        });
    },
    paint: function(t, e, n) {
        var s = this;
        wx.showLoading({
            title: "制作中..."
        });
        var o = this;
        t = t || this.data.paintSrc;
        var l = 335 / (e = e || this.data.imgWidth) * (n = n || this.data.imgHeight), d = l + (1 == this.data.paintType ? 100 : 0);
        this.setData({
            canvasHeight: d
        }, function() {
            s.setData({
                readyToPaint: !0
            });
            var e = wx.createCanvasContext("canvas", s);
            e.setFillStyle("#fff"), e.fillRect(0, 0, 335, d), e.drawImage(t, 0, 0, 335, l), 
            wx.downloadFile({
                url: a.formatUrl(i.data.selectBuilding.QrcodeUrl),
                success: function(t) {
                    200 === t.statusCode && (e.setFillStyle("#fff"), e.fillRect(0, d - 100, 335, 100), 
                    e.setFontSize(14), e.setFillStyle("#999999"), e.fillText("请长按识别小程序码了解更多", 30, l + 50 - (1 == o.data.paintType ? 0 : 100)), 
                    e.setFontSize(10), e.setFillStyle("#b6b6b6"), e.fillText("Please scan the QR code to view", 30, l + 68 - (1 == o.data.paintType ? 0 : 100)), 
                    e.drawImage(t.tempFilePath, 252, l + 20 - (1 == o.data.paintType ? 0 : 100), 65, 65), 
                    e.draw(!1, function() {
                        var t = setTimeout(function() {
                            o.setData({
                                downloadVisible: !0
                            }), clearTimeout(t);
                        }, 500);
                    }));
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    saveSuncode: function() {
        var t = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 335,
            height: this.data.canvasHeight,
            destWidth: this.data.imgWidth,
            destHeight: this.data.imgWidth / 335 * this.data.canvasHeight,
            canvasId: "canvas",
            success: function(a) {
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        wx.showToast({
                            title: "保存成功"
                        }), t.recordSaveImg();
                    },
                    fail: function(a) {
                        t.setData({
                            showAuth: !0
                        });
                    }
                });
            }
        });
    },
    recordSaveImg: function() {
        return a.request({
            url: t.service.operateInMem,
            method: "POST",
            data: {
                SourceType: 1,
                Remark: "保存拓客图",
                BuildingId: i.data.selectBuilding.BuildingId,
                BuildingName: i.data.selectBuilding.BuildingName
            }
        });
    },
    cancelAuth: function() {
        this.setData({
            showAuth: !1
        });
    }
});