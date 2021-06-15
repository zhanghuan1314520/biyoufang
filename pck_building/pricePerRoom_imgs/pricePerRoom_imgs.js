require("../../config.js");

var a = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        navH: e.globalData.navH,
        swiperH: e.globalData.screenHeight - e.globalData.navH,
        swiperIndex: 0,
        list: null
    },
    onLoad: function(a) {
        wx.hideShareMenu(), this.setData({
            list: e.globalData.pricePerRoomFiles
        }, function() {
            e.globalData.pricePerRoomFiles = null;
        });
    },
    swiperChange: function(a) {
        var e = a.detail.current;
        this.setData({
            swiperIndex: e
        });
    },
    saveImage: function(e) {
        var t = e.currentTarget.dataset.url;
        console.log(t), a.promisify(wx.getImageInfo)({
            src: t
        }).then(function(e) {
            console.log(e), a.promisify(wx.saveImageToPhotosAlbum)({
                filePath: e.path
            }).then(function() {
                wx.showToast({
                    title: "保存成功"
                });
            }).catch(function() {
                a.wxToast("保存失败");
            });
        }).catch(function() {
            a.wxToast("本地图片加载失败");
        });
    }
});