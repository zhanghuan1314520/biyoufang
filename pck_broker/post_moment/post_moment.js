var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/plugins/wxImageCompress.js")), e = getApp(), a = require("../../utils/index.js"), n = require("../../config.js"), i = (require("../../utils/plugins/michat/md5.min.js"), 
null);

Page({
    data: {
        navH: 0,
        title: "发布动态",
        uploadImgs: [],
        moment: {
            content: ""
        },
        canvasCtx: null,
        momentLimit: {
            publishLimit: 0,
            integral: 0
        },
        timeText: "",
        showLoading: !1,
        navRouter: ""
    },
    onLoad: function() {
        var a = e.globalData.navH, n = e.globalData.userInfo || null, i = new t.default("canvas");
        this.setData({
            navH: a,
            canvasCtx: i,
            userInfo: n
        }), this.getBrokerMomentLimit(), this.getRouter();
    },
    onReady: function() {
        i = this.selectComponent("#buildingTab");
    },
    getRouter: function() {
        var t = getCurrentPages(), e = null;
        t.length && (e = t[t.length - 2]);
        var a = e.route;
        a && this.setData({
            navRouter: a
        });
    },
    getBrokerMomentLimit: function() {
        var t = this;
        a.request({
            url: n.service.getMomentsLimitInNews
        }).then(function(e) {
            console.log(e, "动态限制"), e && (t.judgeStatus(e), t.setData({
                "momentLimit.publishLimit": e.PublishLimit,
                "momentLimit.integral": e.Integral,
                "momentLimit.todayNumber": e.TodayNumber
            }));
        }).catch(function(t) {
            console.log("获取动态上限时失败: ", t);
        });
    },
    judgeStatus: function(t) {
        if (t && t.LatestPublishTime) {
            var e = this.data.timeText, a = t.LatestPublishTime && parseInt(new Date(t.LatestPublishTime.replace(/[\.\-]/g, "/")) / 1e3), n = t.NowTime && parseInt(new Date(t.NowTime.replace(/[\.\-]/g, "/")) / 1e3), i = a + 60 * t.PublishInterval - n;
            if (t.TodayNumber > t.PublishLimit) return e = "请明天再来", this.setData({
                timeText: e
            });
            if (i > 0) {
                var s = parseInt(i / 3600), o = parseInt(i % 3600 / 60), r = parseInt(i % 3600 % 60);
                s && (e += s + "小时"), o && (e += o + "分钟"), s || o || !r || (e += r + "秒"), e = "请" + e + "后再发布", 
                this.setData({
                    timeText: e
                });
            }
        }
    },
    getMomentContent: function(t) {
        var e = t.detail.value || "";
        this.setData({
            "moment.content": e
        });
    },
    validateInput: function(t) {
        var e = this.canSubmitMoment(t);
        e && a.wxToast(e);
    },
    chooseImage: function() {
        var t = this, e = this.data.uploadImgs;
        if (e.length > 9) a.wxToast("最多可上传9张哦"); else if (this.data.canvasCtx) {
            var i = 9 - e.length;
            this.data.canvasCtx.chooseImage({
                count: i,
                sourceType: [ "album", "camera" ]
            }).then(function(i) {
                i && i.length && i.forEach(function(i, s) {
                    a.uploadRequest({
                        path: i.path,
                        loading: !0,
                        url: n.service.uploadFileInFile.replace("{sourcetype}", 32)
                    }).then(function(n) {
                        n && n.FilePath && (e.push({
                            id: n.Id,
                            imgUrl: a.formatUrl(n.FilePath),
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
        } else a.wxToast("系统出错,请稍后再试");
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset || null, a = this.data.uploadImgs, n = a.filter(function(t) {
            return t.id == e.id;
        })[0] || null;
        if (n) {
            var i = a.map(function(t) {
                return t.imgUrl;
            });
            wx.previewImage({
                urls: i,
                current: n.imgUrl,
                fail: function(t) {
                    console.error("预览图片时失败: ", t);
                }
            });
        }
    },
    deleteImage: function(t) {
        var e = t.currentTarget.dataset || null, a = this.data.uploadImgs, n = -1, i = a.filter(function(t, a) {
            return t.id === e.id && -1 === n && (n = a), t.id === e.id;
        })[0] || null;
        i && i.canDelete && (a.splice(n, 1), this.setData({
            uploadImgs: a
        }));
    },
    submitNewsInfo: function() {
        var t = this, s = this;
        if (!s.data.showLoading) {
            var o = this.canSubmitMoment();
            if (o) a.wxToast(o); else {
                var r = this.data.moment, l = [];
                this.data.uploadImgs.forEach(function(t) {
                    l.push({
                        fileId: t.fileId,
                        filePath: t.filePath
                    });
                });
                var u = {
                    content: r.content,
                    images: l,
                    BuildingId: i.data.selectBuilding.BuildingId
                };
                a.validateContentReg(r.content, "不可以输入微信号手机号QQ号哦~") && (s.setData({
                    showLoading: !0
                }), a.request({
                    url: n.service.addMomentInNews,
                    method: "POST",
                    data: u
                }).then(function(a) {
                    wx.showToast({
                        title: "发布成功",
                        icon: "none",
                        mask: !0
                    }), e.globalData.Notify.emit("addMoments"), setTimeout(function() {
                        if (t.data.navRouter && "ext_features/my_states/my_states" === t.data.navRouter) {
                            var e = getCurrentPages();
                            e[e.length - 2].setData({
                                requestData: !0
                            }), wx.navigateBack({
                                delta: 1
                            });
                        } else wx.switchTab({
                            url: "/pages/market/market",
                            fail: function(t) {
                                console.log("跳转到楼市tab页时失败: ", t);
                            }
                        });
                    }, 1500);
                }).catch(function(t) {
                    s.setData({
                        showLoading: !1
                    }), console.log("新增户型时失败: ", t);
                }));
            }
        }
    },
    initUploadImgs: function() {
        var t = [ {
            id: 0,
            type: "btn",
            imgUrl: "/resource/register_add.png",
            imgBigUrl: "",
            canDelete: !1
        } ];
        this.setData({
            uploadImgs: t
        });
    },
    canSubmitMoment: function(t) {
        var e = "", a = this.data.moment.content || "";
        if (a = a.trim(), t) {
            var n = t.currentTarget.dataset || null;
            n && n.type && "content" === n.type && (a || (e = "请输入内容"));
        } else this.data.uploadImgs.length <= 0 && (e = "请上传图片"), a || (e = "请输入内容");
        return e;
    }
});