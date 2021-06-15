function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../utils/plugins/wxImageCompress.js")), a = e(require("../../utils/index.js")), i = require("../../config.js"), n = (require("../../utils/plugins/michat/md5.min.js"), 
getApp()), s = null;

Page({
    data: {
        navH: 0,
        typeList: [],
        imageTypeInfo: {
            imageTypeList: [],
            index: 0
        },
        uploadImgs: [],
        canvasCtx: null,
        showLoading: !1,
        buildingId: null
    },
    onLoad: function(e) {
        var a = n.globalData.navH;
        this.setData({
            navH: a
        }), this.initImageTypeList();
        var i = new t.default("canvas");
        this.setData({
            canvasCtx: i,
            buildingId: e.buildingId,
            userInfo: n.globalData.userInfo
        });
    },
    onReady: function() {
        s = this.selectComponent("#buildingTab");
    },
    selectImageType: function(e) {
        var t = e.detail.value;
        this.setData({
            "imageTypeInfo.index": t
        });
    },
    cancelImageType: function(e) {
        console.log(e);
    },
    chooseImage: function() {
        var e = this, t = this.data.uploadImgs;
        if (t.length > 9) a.default.wxToast("最多可上传9张哦"); else if (this.data.canvasCtx) {
            var n = 9 - t.length;
            this.data.canvasCtx.chooseImage({
                count: n,
                sourceType: [ "album", "camera" ]
            }).then(function(n) {
                n && n.length && n.forEach(function(n, s) {
                    a.default.uploadRequest({
                        path: n.path,
                        loading: !0,
                        url: i.service.uploadFileInFile.replace("{sourcetype}", 5)
                    }).then(function(i) {
                        i && i.FilePath && (t.push({
                            id: i.Id,
                            imgUrl: a.default.formatUrl(i.FilePath),
                            filePath: i.FilePath,
                            fileId: i.Id,
                            canDelete: !0
                        }), e.setData({
                            uploadImgs: t
                        }));
                    });
                });
            }).catch(function(e) {
                wx.hideLoading(), console.error("相册选择错误: ", e);
            });
        } else a.default.wxToast("系统出错,请稍后再试");
    },
    previewImage: function(e) {
        var t = e.currentTarget.dataset || null, a = this.data.uploadImgs, i = a.filter(function(e) {
            return e.id == t.id;
        })[0] || null;
        if (i) {
            var n = a.map(function(e) {
                return e.imgUrl;
            });
            wx.previewImage({
                urls: n,
                current: i.imgUrl,
                fail: function(e) {
                    console.error("预览图片时失败: ", e);
                }
            });
        }
    },
    deleteImage: function(e) {
        var t = e.currentTarget.dataset || null, a = this.data.uploadImgs, i = -1;
        (a.filter(function(e, a) {
            return e.id === t.id && -1 === i && (i = a), e.id === t.id;
        })[0] || null) && (a.splice(i, 1), this.setData({
            uploadImgs: a
        }));
    },
    submitNewsInfo: function() {
        var e = this;
        if (!e.data.showLoading) {
            var t = this.data.uploadImgs;
            if (!t || t && !t.length) a.default.wxToast("请先添加楼盘照片"); else {
                e.setData({
                    showLoading: !0
                });
                var n = t.map(function(e) {
                    return {
                        FileId: e.fileId,
                        FilePath: e.filePath
                    };
                }), l = {
                    PhotoType: parseInt(this.getPhotoType()),
                    Images: n
                }, o = this.data.buildingId || s.data.selectBuilding.BuildingId;
                a.default.request({
                    url: i.service.addImgInBld.replace("{buildingId}", o),
                    method: "POST",
                    data: l
                }).then(function(e) {
                    wx.showToast({
                        title: "上传成功",
                        icon: "none",
                        mask: !0
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 1500);
                }).catch(function(t) {
                    e.setData({
                        showLoading: !1
                    }), console.error("上传楼盘图片时失败");
                });
            }
        }
    },
    initImageTypeList: function() {
        var e = [ {
            9: "其他"
        }, {
            8: "区位图"
        }, {
            0: "鸟瞰图"
        }, {
            4: "效果图"
        }, {
            2: "样板间"
        }, {
            3: "配套图"
        }, {
            5: "实景图"
        } ], t = e.map(function(e) {
            return e[Object.keys(e)[0]];
        });
        this.setData({
            typeList: e,
            "imageTypeInfo.imageTypeList": t
        });
    },
    getPhotoType: function() {
        var e = this.data.typeList, t = this.data.imageTypeInfo.index;
        return Object.keys(e[t])[0];
    }
});