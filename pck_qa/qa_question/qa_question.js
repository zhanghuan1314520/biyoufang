function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/plugins/wxImageCompress.js")), a = require("../../config.js"), n = require("../../utils/index.js"), i = require("../../options/dropdown-menu.js"), s = (require("../../utils/plugins/michat/md5.min.js"), 
getApp());

Page({
    data: {
        title: "提问",
        navH: 0,
        requestStatus: 0,
        pageStatus: -1,
        userInfo: null,
        uploadImgs: [],
        questionInfo: {
            content: "",
            typeList: []
        },
        canvasCtx: null,
        questionTypeList: [],
        showLoading: !1,
        questionId: "",
        isIpx: s.globalData.isIpx
    },
    onLoad: function() {
        var t = s.globalData, a = t.navH, o = t.userInfo, u = new e.default("canvas"), r = n.deepCopyHard(i.questionTypeList);
        this.setData({
            navH: a,
            userInfo: o,
            questionTypeList: r,
            canvasCtx: u,
            pageStatus: 0
        });
    },
    getInputValue: function(t) {
        var e = t.detail.value || "";
        this.setData({
            "questionInfo.content": e
        });
    },
    validateInput: function(t) {
        var e = this.canSubmitQuestionInfo(t);
        e && n.wxToast(e);
    },
    chooseImage: function() {
        var t = this, e = this.data.uploadImgs;
        if (e.length >= 6) n.wxToast("最多可上传6张哦"); else if (this.data.canvasCtx) {
            var i = 6 - e.length;
            this.data.canvasCtx.chooseImage({
                count: i,
                sourceType: [ "album", "camera" ]
            }).then(function(i) {
                i && i.length && i.forEach(function(i, s) {
                    n.uploadRequest({
                        path: i.path,
                        loading: !0,
                        url: a.service.uploadFileInFile.replace("{sourcetype}", 33)
                    }).then(function(a) {
                        a && a.FilePath && (e.push({
                            imgUrl: n.formatUrl(a.FilePath),
                            filePath: a.FilePath,
                            fileId: a.Id,
                            canDelete: !0
                        }), t.setData({
                            uploadImgs: e
                        }));
                    });
                });
            }).catch(function(t) {
                console.error("相册选择错误: ", t);
            });
        } else n.wxToast("系统出错,请稍后再试");
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
    selectQuestionType: function(e) {
        var a = this, n = e.currentTarget.dataset || null;
        if (n) {
            var i = this.data.questionTypeList, s = null, o = -1;
            if (i.forEach(function(t, e) {
                t.id === n.id && -1 === o && (s = t, t.isActived = !t.isActived, o = e);
            }), i.filter(function(t) {
                return t.isActived;
            }).length > 3) return wx.showToast({
                title: "最多选3个哦",
                icon: "none",
                mask: !0
            }), void (s.isActived = !s.isActived);
            if (-1 !== o) {
                var u = "questionTypeList[" + o + "].isActived";
                this.setData(t({}, u, s.isActived), function() {
                    var t = [];
                    i.forEach(function(e) {
                        e.isActived && t.push(e.name);
                    }), a.data.questionInfo.typeList = t;
                });
            }
        }
    },
    submitQuestionInfo: function() {
        var t = this;
        if (1 !== t.data.requestStatus) {
            var e = this.canSubmitQuestionInfo();
            if (e) n.wxToast(e); else {
                t.setData({
                    requestStatus: 1
                });
                var i = this.data.questionInfo, o = [];
                this.data.uploadImgs.forEach(function(t) {
                    o.push({
                        fileId: t.fileId,
                        filePath: t.filePath
                    });
                });
                var u = {
                    content: i.content,
                    typeTags: i.typeList.join(","),
                    images: o
                };
                wx.showLoading(), t.toggleLoadingStatus(!0), n.request({
                    url: a.service.createQuestion,
                    method: "POST",
                    data: u
                }).then(function(e) {
                    wx.hideLoading(), s.globalData.Notify.emit("initQa"), e && (t.toggleLoadingStatus(!1), 
                    t.setData({
                        requestStatus: 2,
                        pageStatus: 1,
                        questionId: e
                    }));
                }).catch(function(e) {
                    wx.hideLoading(), t.toggleLoadingStatus(!1), t.setData({
                        requestStatus: 3
                    }), console.log("提交问题时失败: ", e);
                });
            }
        }
    },
    subscribeAnswer: function(t) {
        var e = this, a = s.globalData.templateIds && s.globalData.templateIds.QuestionReplyNoticeId;
        if (!a) return s.getTemplateIds().then(function() {
            var a = s.globalData.templateIds && s.globalData.templateIds.CustomerConsultationNoticeId;
            if (!a) return n.wxToast("系统出错,请稍后再试");
            e.postMessage(t, a);
        });
        this.postMessage(t, a);
    },
    postMessage: function(t, e) {
        var i = this;
        console.log(i.data.questionId), wx.requestSubscribeMessage ? (i.toggleLoadingStatus(!0), 
        wx.requestSubscribeMessage({
            tmplIds: [ e ],
            success: function(t) {
                console.log("success: ", t), Object.keys(t).filter(function(e) {
                    return "accept" === t[e];
                }).length ? n.request({
                    url: a.service.templateMessageInMsg,
                    method: "POST",
                    data: {
                        MessageType: 2,
                        SourceId: i.data.questionId
                    }
                }).then(function() {
                    i.toggleLoadingStatus(!1), wx.navigateBack();
                }, function() {
                    i.toggleLoadingStatus(!1);
                }) : (setTimeout(function() {
                    wx.showModal({
                        title: "提示",
                        content: "订阅消息，及时获得回复通知。请先点击订阅消息，然后勾选问答回复通知。",
                        confirmText: "去订阅",
                        success: function(t) {
                            t.confirm && wx.openSetting();
                        }
                    });
                }, 300), i.toggleLoadingStatus(!1));
            },
            fail: function(t) {
                console.log("err1: ", t), n.wxToast("微信暂不支持此版本订阅，或请升级微信版本试试！");
            }
        })) : (console.log("err2: "), n.wxToast("微信暂不支持此版本订阅，或请升级微信版本试试！"));
    },
    toggleLoadingStatus: function(t) {
        this.setData({
            showLoading: t
        });
    },
    canSubmitQuestionInfo: function(t) {
        var e = "", a = this.data.questionInfo, n = a.content || "", i = a.typeList || [];
        if (n = n.trim(), t) {
            var s = t.currentTarget.dataset || null;
            s && s.type && "content" === s.type && (n || (e = "请描述问题"));
        } else i.length <= 0 && (e = "请选择问题类型"), n ? n.length < 5 && (e = "详细点，回复率高，至少5个字哦") : e = "请描述问题";
        return e;
    },
    getUserInfo: function(t) {
        var e = this;
        if (!s.globalData.isAuthorizing && "getUserInfo:ok" === t.detail.errMsg) {
            s.globalData.isAuthorizing = !0, console.log("授权中"), wx.showLoading({
                title: "授权中"
            });
            var i = t.detail;
            return n.request({
                url: a.service.weixin,
                method: "POST",
                data: {
                    SessionId: s.globalData.userInfo.SessionId,
                    EncryptedData: i.encryptedData,
                    iv: i.iv
                }
            }).then(function(a) {
                s.login(function() {
                    switch (e.setData({
                        userInfo: s.globalData.userInfo
                    }, function() {
                        wx.hideLoading(), s.globalData.isAuthorizing = !1;
                    }), (t.currentTarget.dataset || {}).type) {
                      case "submitQuestionInfo":
                        e.submitQuestionInfo();
                        break;

                      case "subscribeAnswer":
                        e.subscribeAnswer();
                    }
                });
            }).catch(function(t) {
                wx.hideLoading(), s.globalData.isAuthorizing = !1;
            });
        }
    }
});