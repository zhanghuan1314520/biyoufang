function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = require("../../config.js"), r = require("../../utils/index.js"), n = (require("../../utils/plugins/michat/md5.min.js"), 
getApp());

Page({
    data: (t = {
        navH: n.globalData.navH,
        navBarTitle: "",
        userInfo: null,
        checkState: null,
        consultantInfo: "",
        phoneAuthorized: !1,
        realNameError: !1,
        wechatError: !1,
        introError: !1,
        isChangeMainOption: !1,
        onShowOfChooseImage: !1,
        hasOnceValidate: !1,
        inviteCode: "",
        showPop: !1,
        pagesMy: !1,
        popData: {
            imgUrl: "/resource/home_school@2x.png",
            text: "提交成功",
            btnTitleYes: "订阅审核结果",
            btntitleNo: "暂不订阅"
        },
        examplesImgs: [ a.imgRootUrl + "/images_wx/broker_registrion/gwrz_img_promotional.jpg", a.imgRootUrl + "/images_wx/broker_registrion/gwrz_img_Idcard.jpg" ]
    }, e(t, "navBarTitle", "顾问入驻"), e(t, "currentInfoDetail", {
        Name: "",
        BuildingId: "",
        BuildingName: "",
        PhoneNumber: "",
        WechatNumber: "",
        Introduction: "",
        WorkPermitUrl: "",
        PersonalImageUrl: "",
        ConsultantStatus: "",
        Longitude: "",
        AuditRemark: "",
        NameAllowedToBeChange: !0,
        IsRegister: "",
        IsMain: !1
    }), e(t, "passBuildings", []), t),
    onLoad: function(e) {
        var t = this;
        n.checkSession(function() {
            var a = n.globalData.userInfo, o = e.InviteCode || "", i = Number(e.checkState);
            t.getConsultantBuildings(n.globalData.realtyConsultantId), 4 === i && t.initNoPassData(), 
            1 === a.UserType && o ? (r.wxToast("您已入驻必有房"), wx.redirectTo({
                url: "/pages/broker_card/broker_card?brokerId=" + n.globalData.realtyConsultantId + "&consultantStatus=2&page=my"
            })) : t.getMyCenter().then(function(e) {
                t.setData({
                    navBarTitle: 2 === i ? "修改我的名片" : "顾问入驻",
                    checkState: i,
                    consultantInfo: e,
                    inviteCode: o,
                    userInfo: a,
                    phone: a.PhoneNumber,
                    phoneAuthorized: !!a.PhoneNumber
                });
            });
        }, e);
    },
    onShow: function() {
        var e = this;
        n.globalData.curPersonalImageUrl && (r.uploadRequest({
            path: n.globalData.curPersonalImageUrl,
            loading: !0,
            url: a.service.uploadFileInFile.replace("{sourcetype}", 2)
        }).then(function(t) {
            t && t.FilePath && e.setData({
                "currentInfoDetail.PersonalImageUrl": r.formatUrl(t.FilePath),
                "currentInfoDetail.personalImageFileId": t.Id
            });
        }), n.globalData.curPersonalImageUrl = ""), this.setData({
            onShowOfChooseImage: !1
        });
    },
    onUnload: function() {
        wx.removeStorage({
            key: "alterPropertyConsultant"
        });
    },
    getPhoneNumber: function(e) {
        var t = this;
        n.authorizePhoneNumber(e, {
            success: function(e) {
                t.setData({
                    "currentInfoDetail.PhoneNumber": e,
                    phoneAuthorized: !0
                });
            }
        });
    },
    checkBuilding: function() {
        3 === this.data.checkState ? r.navigatePage({
            url: "/pages/city/city?selectCity=2"
        }) : r.navigatePage({
            url: "/pck_broker/broker_belong/broker_belong"
        });
    },
    uploadImg: function(e) {
        var t = this, n = e.currentTarget.dataset.type;
        this.setData({
            onShowOfChooseImage: !0
        }), r.promisify(wx.chooseImage)({
            count: 1
        }).then(function(e) {
            2 != n ? r.uploadRequest({
                path: e.tempFilePaths[0],
                loading: !0,
                url: a.service.uploadFileInFile.replace("{sourcetype}", n)
            }).then(function(e) {
                e && e.FilePath && (1 == n ? t.setData({
                    isChangeMainOption: !0,
                    "currentInfoDetail.WorkPermitUrl": r.formatUrl(e.FilePath),
                    "currentInfoDetail.workPermitFileId": e.Id
                }) : t.setData({
                    "currentInfoDetail.PersonalImageUrl": r.formatUrl(e.FilePath),
                    "currentInfoDetail.personalImageFileId": e.Id
                }));
            }) : wx.navigateTo({
                url: "/pck_broker/Cropper/Cropper?tempPath=" + encodeURIComponent(e.tempFilePaths[0])
            });
        });
    },
    validate: function(e) {
        this.setData({
            hasOnceValidate: !0
        });
        var t = !0;
        return "" === e.RealName ? (this.setData({
            realNameError: !0
        }), t = !1) : this.setData({
            realNameError: !1
        }), "" === e.WechatNumber ? (this.setData({
            wechatError: !0
        }), t = !1) : this.setData({
            wechatError: !1
        }), "" === e.Introduction ? (this.setData({
            introError: !0
        }), t = !1) : this.setData({
            introError: !1
        }), e.phone && 11 === e.phone.length && 1 == e.phone[0] ? "" === this.data.currentInfoDetail.BuildingId ? (r.wxToast("请选择归属楼盘哦～"), 
        !1) : 0 !== this.data.checkState || this.data.currentInfoDetail.workPermitFileId && this.data.currentInfoDetail.personalImageFileId ? (t || r.wxToast("请完整填写所有必填信息哦～"), 
        t) : (r.wxToast("请上传所有图片哦～"), !1) : (r.wxToast("请填写正确的手机号哦～"), !1);
    },
    submit: function(e) {
        var t = e.detail.value;
        this.validate(t) && (0 === this.data.checkState || 3 === this.data.checkState ? this.register(t) : 4 !== this.data.checkState || this.data.userInfo.RealtyConsultantInfo ? 2 !== this.data.checkState && 4 !== this.data.checkState || this.edit(t) : this.register(t));
    },
    register: function(e) {
        var t = this, o = this.data, i = o.checkState, l = (o.userInfo, o.consultantInfo), s = o.currentInfoDetail, u = s.BuildingId, c = s.workPermitFileId, d = void 0 === c ? "" : c, h = s.personalImageFileId, g = void 0 === h ? "" : h, I = {
            RealName: e.RealName || l.Name,
            BuildingId: u,
            PhoneNumber: e.phone,
            WechatNumber: e.WechatNumber,
            Introduction: e.Introduction
        };
        d && (I.WorkPermitFileId = d), g && (I.PersonalImageFileId = g), e.InviteCode && (I.InviteCode = e.InviteCode);
        var m = a.service.registrationInMem;
        return 3 === i && n.globalData.realtyConsultantId && (m = a.service.registrationAdditionInMem.replace("{realtyConsultantId}", n.globalData.realtyConsultantId), 
        I.IsMain = e.IsMain), r.request({
            url: m,
            method: "POST",
            data: I,
            loading: {
                title: "提交中..."
            }
        }).then(function(e) {
            t.setData({
                showPop: !0
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    goEdit: function() {
        this.setData({
            navBarTitle: "修改我的名片",
            checkState: 2
        });
    },
    edit: function(e) {
        var t = this.data, o = t.checkState, i = t.consultantInfo, l = t.currentInfoDetail, s = (t.userInfo, 
        l.BuildingId), u = l.workPermitFileId, c = void 0 === u ? "" : u, d = l.personalImageFileId, h = void 0 === d ? "" : d, g = {
            RealName: e.RealName || i.Name,
            BuildingId: s,
            PhoneNumber: e.phone,
            WechatNumber: e.WechatNumber,
            Introduction: e.Introduction,
            IsMain: e.IsMain
        };
        c && (g.WorkPermitFileId = c), h && (g.PersonalImageFileId = h), e.InviteCode && (g.InviteCode = e.InviteCode);
        var I = a.service.changeRegistrationInMem, m = "POST";
        return 4 !== o && 2 !== o || !n.globalData.realtyConsultantId || (I = a.service.realtyconsultantAlterInfo.replace("{consultantId}", n.globalData.realtyConsultantId).replace("{id}", l.Id), 
        m = "PUT"), r.request({
            url: I,
            method: m,
            data: g,
            loading: {
                title: "提交中..."
            }
        }).then(function(e) {
            r.wxToast("提交成功"), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            });
        });
    },
    editImg: function(e) {
        return r.request({
            url: a.service.brokerEditImg,
            method: "POST",
            data: {
                FileId: 1 == e ? this.data.workPermitFileId : this.data.personalImageFileId,
                SourceType: e
            }
        });
    },
    getMyCenter: function() {
        return n.globalData.userInfo.Authorized ? r.request({
            url: a.service.getMemberInfoInMem
        }).then(function(e) {
            return 3 === e.ConsultantStatus ? (r.wxToast("您的账号已禁用"), wx.switchTab({
                url: "/pages/index/index"
            }), Promise.reject()) : Promise.resolve(e);
        }) : Promise.resolve({});
    },
    popClick: function(e) {
        if ("yes" === e.detail.type) {
            var t = n.globalData.realtyConsultantId;
            r.getTemplateMessageId(3, "AuditNoticeId", t).then().then(function() {
                setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/my/my"
                    }, 1e3);
                });
            });
        } else this.setData({
            showPop: !1
        }), wx.reLaunch({
            url: "/pages/my/my"
        });
    },
    previewExamples: function(e) {
        wx.previewImage({
            urls: [ e.currentTarget.dataset.url ]
        });
    },
    changeSelectBuilding: function(e) {
        console.log(e), e.detail.PersonalImageUrl = r.formatUrl(e.detail.PersonalImageUrl), 
        e.detail.WorkPermitUrl = r.formatUrl(e.detail.WorkPermitUrl), this.setData({
            currentInfoDetail: e.detail
        });
    },
    initNoPassData: function() {
        var e = this;
        wx.getStorage({
            key: "alterPropertyConsultant",
            success: function(t) {
                e.setData({
                    currentInfoDetail: t.data
                });
            }
        });
    },
    getConsultantBuildings: function(e) {
        var t = this;
        if (e) return r.request({
            url: a.service.realtyconsultantBuildings.replace("{consultantId}", e)
        }).then(function(e) {
            var a = e.Buildings;
            t.setData({
                passBuildings: a.filter(function(e) {
                    return 2 === e.ConsultantStatus;
                })
            });
        });
    }
});