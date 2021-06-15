var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/plugins/wxImageCompress.js")), e = require("../../config.js"), a = require("../../utils/index.js"), n = (require("../../options/dropdown-menu.js"), 
require("../../utils/plugins/michat/md5.min.js"), getApp());

Page({
    data: {
        title: "问答",
        navH: 0,
        userInfo: null,
        requestStatus: 0,
        pageStatus: -1,
        answerInfo: {
            content: ""
        },
        uploadImgs: [],
        question: null,
        isIpx: !1
    },
    onLoad: function(e) {
        var a = n.globalData, s = a.navH, i = a.userInfo, u = new t.default("canvas");
        this.setData({
            navH: s,
            userInfo: i,
            pageStatus: 0,
            question: wx.getStorageSync("questionInfo") || "",
            canvasCtx: u,
            isIpx: n.globalData.isIpx
        });
    },
    getMomentContent: function(t) {
        var e = t.detail.value || "";
        this.setData({
            "answerInfo.content": e
        });
    },
    chooseImage: function() {
        var t = this, n = this.data.uploadImgs;
        if (n.length >= 6) a.wxToast("最多可上传6张哦"); else if (this.data.canvasCtx) {
            var s = 6 - n.length;
            this.data.canvasCtx.chooseImage({
                count: s,
                sourceType: [ "album", "camera" ]
            }).then(function(s) {
                s && s.length && s.forEach(function(s, i) {
                    a.uploadRequest({
                        path: s.path,
                        loading: !0,
                        url: e.service.uploadFileInFile.replace("{sourcetype}", 34)
                    }).then(function(e) {
                        e && e.FilePath && (n.push({
                            id: e.Id,
                            imgUrl: a.formatUrl(e.FilePath),
                            filePath: e.FilePath,
                            fileId: e.Id,
                            canDelete: !0
                        }), t.setData({
                            uploadImgs: n
                        }));
                    });
                });
            }).catch(function(t) {
                console.error("相册选择错误: ", t);
            });
        } else a.wxToast("系统出错,请稍后再试");
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset || null, a = this.data.uploadImgs, n = a.filter(function(t) {
            return t.id == e.id;
        })[0] || null;
        if (n) {
            var s = a.map(function(t) {
                return t.imgUrl;
            });
            wx.previewImage({
                urls: s,
                current: n.imgUrl,
                fail: function(t) {
                    console.error("预览图片时失败: ", t);
                }
            });
        }
    },
    deleteImage: function(t) {
        var e = t.currentTarget.dataset || null, a = this.data.uploadImgs, n = -1, s = a.filter(function(t, a) {
            return t.id === e.id && -1 === n && (n = a), t.id === e.id;
        })[0] || null;
        s && s.canDelete && (a.splice(n, 1), this.setData({
            uploadImgs: a
        }));
    },
    createAnswer: function() {
        var t = this;
        if (console.error(this.data.requestStatus), 1 !== this.data.requestStatus) {
            var s = this.data.answerInfo.content;
            if (0 === s.length) return a.wxToast("内容不能为空");
            var i = {
                Content: s
            }, u = [];
            this.data.uploadImgs.forEach(function(t) {
                u.push({
                    fileId: t.fileId,
                    filePath: t.filePath
                });
            }), u.length && (i.Images = u), this.setData({
                requestStatus: 1
            }), this.data.requestStatus = 1, setTimeout(function() {
                t.setData({
                    requestStatus: 2
                });
            }, 2e3), a.request({
                url: e.service.createAnswer.replace("{questionId}", this.data.question.Id),
                method: "POST",
                data: i
            }).then(function() {
                t.setData({
                    requestStatus: 2
                }), n.globalData.Notify.emit("reInitQa"), n.globalData.Notify.emit("initQa"), wx.navigateBack();
            }).catch(function() {
                t.setData({
                    requestStatus: 3
                });
            });
        }
    },
    getFollowFormid: function(t) {
        return !1;
    }
});