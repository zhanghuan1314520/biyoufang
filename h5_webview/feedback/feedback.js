var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/plugins/wxImageCompress.js")), e = require("../../config.js"), a = require("../../utils/index.js"), i = getApp();

require("../../utils/plugins/michat/md5.min.js");

Page({
    data: {
        navH: i.globalData.navH,
        typeList: [ "信息缺失/错误", "程序错误", "优化建议", "其他" ],
        type: "",
        description: "",
        maxDescription: 300,
        phone: "",
        maxImgCount: 3,
        imgList: [],
        allow: !0,
        showPop: !1,
        popData: {
            imgUrl: e.imgRootUrl + "/images_wx/weixin_common/feedback_success.png",
            text: "反馈成功",
            btnTitleYes: "订阅反馈结果",
            btntitleNo: "暂不订阅"
        }
    },
    onLoad: function(e) {
        i.checkSession(function() {}, e);
        var a = new t.default("canvas");
        this.setData({
            canvasCtx: a
        });
    },
    changeType: function(t) {
        var e = t.currentTarget.dataset.type;
        e !== this.data.type && this.setData({
            type: e
        });
    },
    typing: function(t) {
        this.setData({
            description: t.detail.value
        });
    },
    inputPhone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    clearPhone: function() {
        this.setData({
            phone: ""
        });
    },
    uploadImg: function() {
        var t = this, i = this.data.maxImgCount - this.data.imgList.length;
        this.data.canvasCtx ? this.data.canvasCtx.chooseImage({
            count: i
        }).then(function(i) {
            i && i.length && i.forEach(function(i, n) {
                a.uploadRequest({
                    path: i.path,
                    loading: !0,
                    url: e.service.uploadFileInFile.replace("{sourcetype}", 3)
                }).then(function(e) {
                    if (e && e.FilePath) {
                        var a = [ {
                            imageUrl: i.path,
                            id: e.Id
                        } ];
                        t.setData({
                            imgList: t.data.imgList.concat(a)
                        });
                    }
                });
            });
        }).catch(function(t) {
            console.error("相册选择错误: ", t);
        }) : a.wxToast("系统出错,请稍后再试");
    },
    deleteImg: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.imgList;
        a.splice(e, 1), this.setData({
            imgList: a
        });
    },
    submit: function(t) {
        var i = this;
        if (this.data.type) if (this.data.description) {
            if (this.data.allow) {
                this.setData({
                    allow: !1
                });
                var n = t.detail.value;
                wx.showLoading({
                    title: "提交中"
                });
                var s = [];
                this.data.imgList.forEach(function(t) {
                    s.push(t.id);
                }), console.log(s);
                var o = {
                    FeedbackType: this.data.type,
                    Content: n.description,
                    ContactInfo: n.phone,
                    FileIdList: s
                };
                return a.request({
                    url: e.service.subFeedback,
                    method: "POST",
                    data: o,
                    complete: function() {
                        wx.hideLoading();
                    }
                }).then(function(t) {
                    i.setData({
                        phone: "",
                        description: "",
                        type: "",
                        imgList: [],
                        showPop: !0
                    });
                });
            }
        } else a.wxToast("请描述您所遇到的问题"); else a.wxToast("请选择反馈类型");
    },
    popClick: function(t) {
        var e = this;
        "yes" === t.detail.type ? a.getTemplateMessageId(5, "FeedbackNoticeId").then().then(function() {
            e.setData({
                showPop: !1
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1e3);
        }).catch(function() {
            wx.navigateBack({
                delta: 1
            });
        }) : (this.setData({
            showPop: !1
        }), wx.navigateBack({
            delta: 1
        }));
    }
});