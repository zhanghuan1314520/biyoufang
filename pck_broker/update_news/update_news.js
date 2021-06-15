var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/plugins/wxImageCompress.js")), e = getApp(), i = require("../../utils/index.js"), n = require("../../config.js"), a = (require("../../utils/plugins/michat/md5.min.js"), 
null);

Page({
    data: {
        navH: 0,
        uploadImgs: [],
        newsInfo: {
            id: "",
            title: "",
            content: ""
        },
        isTitFocus: !1,
        isCotentFocus: !1,
        canvasCtx: null,
        showLoading: !1,
        buildingId: "",
        buildingName: "",
        navBarTitle: "发布快讯",
        bgColor: ""
    },
    onLoad: function(i) {
        var n = this, a = e.globalData.navH, s = new t.default("canvas");
        i && i.id && this.setData({
            navBarTitle: "修改提交",
            bgColor: "linear-gradient(270deg,rgba(254,94,16,1) 0%,rgba(255,118,3,1) 100%);"
        }), e.checkSession(function() {
            if (n.setData({
                navH: a,
                canvasCtx: s,
                userInfo: e.globalData.userInfo,
                buildingId: i.buildingId || "",
                buildingName: i.buildingName || ""
            }), i && i.id) {
                var t = {
                    id: i.id
                };
                n.getBrokerNewsById(t);
            }
        }, i);
    },
    onReady: function() {
        a = this.selectComponent("#buildingTab");
    },
    getBrokerNewsById: function(t) {
        var e = this;
        !t || t && !t.id || i.request({
            url: n.service.getDetailInBld.replace("{快讯id}", t.id)
        }).then(function(t) {
            if (console.log(t, "快讯详情"), t) {
                e.data.newsInfo;
                var n = [];
                t.Images && t.Images.length && t.Images.forEach(function(t) {
                    n.push({
                        id: t.FileId,
                        imgUrl: i.formatUrl(t.FilePath),
                        filePath: t.FilePath,
                        fileId: t.FileId,
                        canDelete: !0
                    });
                }), e.setData({
                    "newsInfo.id": t.Id,
                    "newsInfo.title": t.Title ? t.Title : "",
                    "newsInfo.content": t.Content ? t.Content : "",
                    uploadImgs: n
                });
            }
        }).catch(function(t) {
            console.error("获取快讯详情时失败: ", t);
        });
    },
    bindTitle: function(t) {
        this.setData({
            isTitFocus: !0,
            isCotentFocus: !1
        });
    },
    getNewsTitle: function(t) {
        var e = t.detail.value || "";
        this.setData({
            "newsInfo.title": e
        });
    },
    bindContent: function(t) {
        this.setData({
            isTitFocus: !1,
            isCotentFocus: !0
        });
    },
    getNewsContent: function(t) {
        console.log(t);
        var e = t.detail.value || "";
        this.setData({
            "newsInfo.content": e
        });
    },
    validateInput: function(t) {
        var e = this.canSubmitNews(t);
        e && i.wxToast(e);
    },
    chooseImage: function() {
        var t = this, e = this.data.uploadImgs;
        if (e.length > 6) i.wxToast("最多可上传6张哦"); else if (this.data.canvasCtx) {
            var a = 6 - e.length;
            this.data.canvasCtx.chooseImage({
                count: a,
                sourceType: [ "album", "camera" ]
            }).then(function(a) {
                a && a.length && a.forEach(function(a, s) {
                    i.uploadRequest({
                        path: a.path,
                        loading: !0,
                        url: n.service.uploadFileInFile.replace("{sourcetype}", 17)
                    }).then(function(n) {
                        n && n.FilePath && (e.push({
                            id: n.Id,
                            imgUrl: i.formatUrl(n.FilePath),
                            filePath: n.FilePath,
                            fileId: n.Id,
                            canDelete: !0
                        }), t.setData({
                            uploadImgs: e
                        }));
                    });
                });
            }).catch(function(t) {
                console.error("相册选择错误: ", t);
            });
        } else i.wxToast("系统出错,请稍后再试");
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset || null, i = this.data.uploadImgs, n = i.filter(function(t) {
            return t.id == e.id;
        })[0] || null;
        if (n) {
            var a = i.map(function(t) {
                return t.imgUrl;
            });
            wx.previewImage({
                urls: a,
                current: n.imgUrl,
                fail: function(t) {
                    console.error("预览图片时失败: ", t);
                }
            });
        }
    },
    deleteImage: function(t) {
        var e = t.currentTarget.dataset || null, i = this.data.uploadImgs, n = -1, a = i.filter(function(t, i) {
            return t.id === e.id && -1 === n && (n = i), t.id === e.id;
        })[0] || null;
        a && a.canDelete && (i.splice(n, 1), this.setData({
            uploadImgs: i
        }));
    },
    submitNewsInfo: function() {
        var t = this, e = this.data, s = e.newsInfo, o = e.showLoading, l = e.uploadImgs;
        if (!o) {
            var r = this.canSubmitNews();
            if (r) i.wxToast(r); else {
                this.setData({
                    showLoading: !0
                });
                var u = {
                    title: s.title.trim(),
                    content: s.content.trim()
                };
                if (l.length) {
                    var d = [];
                    l.forEach(function(t) {
                        d.push({
                            fileId: t.fileId,
                            filePath: t.filePath
                        });
                    }), d.length && (u.images = d);
                }
                var c = "", f = "POST";
                if (s.id) c = n.service.modifyNews, f = "PUT", u.Id = s.id; else {
                    var g = this.data.buildingId || a.data.selectBuilding.BuildingId;
                    c = n.service.getCounselorInBld.replace("{buildingId}", g);
                }
                i.request({
                    url: c,
                    method: f,
                    data: u
                }).then(function(t) {
                    wx.showToast({
                        title: "审核通过即会展示，并加积分",
                        icon: "none",
                        mask: !0
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 1500);
                }).catch(function(e) {
                    t.setData({
                        showLoading: !1
                    }), console.error("新增快讯时失败: ", e);
                });
            }
        }
    },
    canSubmitNews: function(t) {
        var e = "", i = this.data.newsInfo.title || "", n = this.data.newsInfo.content || "";
        if (i = i.trim(), n = n.trim(), t) {
            var a = t.currentTarget.dataset || null;
            a && a.type && ("title" === a.type && (i || (e = "请输入标题")), "content" === a.type && (n || (e = "请输入内容")));
        } else n || (e = "请输入内容"), i || (e = "请输入标题");
        return e;
    }
});