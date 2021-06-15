var t = getApp();

require("../../config.js"), require("../../utils/index.js");

Page({
    data: {
        src: null,
        width: 200,
        height: 200
    },
    onLoad: function(t) {
        var e = this;
        this.cropper = this.selectComponent("#image-cropper"), this.setData({
            src: decodeURIComponent(t.tempPath)
        }, function() {
            setTimeout(function() {
                e.loadimage();
            }, 1e3);
        }), wx.showLoading({
            title: "加载中"
        });
    },
    cropperload: function() {},
    loadimage: function(t) {
        wx.hideLoading(), this.cropper.imgReset();
    },
    clickcut: function(t) {},
    cancel: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    confirm: function() {
        var e = this;
        this.cropper.getImg(function(i) {
            var n = i.url;
            i.width, i.height;
            t.globalData.curPersonalImageUrl = n, e.cancel();
        });
    }
});