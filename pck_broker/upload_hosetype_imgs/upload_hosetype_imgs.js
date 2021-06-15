function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = t(require("../../utils/plugins/wxImageCompress.js")), i = t(require("../../utils/index.js")), n = getApp(), o = require("../../config.js"), r = (require("../../utils/plugins/michat/md5.min.js"), 
null);

Page({
    data: {
        navH: 0,
        title: "上传户型图",
        orientationInfo: {
            orientationList: [],
            index: -1
        },
        uploadImgs: [],
        canvasCtx: null,
        houseTypeInfo: {
            name: "",
            area: "",
            house: "",
            hall: "",
            toilet: "",
            desc: ""
        },
        animation: null,
        userInfo: null,
        showLoading: !1,
        buildingId: null
    },
    onLoad: function(t) {
        var e = n.globalData.navH, i = n.globalData.userInfo || null;
        this.setData({
            navH: e,
            userInfo: i,
            buildingId: t.buildingId || null
        }), this.initImageTypeList();
        var o = new a.default("canvas");
        this.setData({
            canvasCtx: o
        });
    },
    onReady: function() {
        r = this.selectComponent("#buildingTab");
    },
    onUnload: function() {
        this.setData({
            canvasCtx: null
        });
    },
    getInputValue: function(t) {
        var a = "houseTypeInfo." + (t.currentTarget.dataset && t.currentTarget.dataset.type || ""), i = t.detail.value || "";
        this.setData(e({}, a, i));
    },
    validateInputeValue: function(t) {
        var e = this.canSubmitHouseType(t);
        e && i.default.wxToast(e);
    },
    selectDirection: function(t) {
        var e = t.detail.value;
        this.setData({
            "orientationInfo.index": e
        });
    },
    cancelSelectDirection: function() {
        this.setData({
            "orientationInfo.index": -1
        });
    },
    chooseImage: function() {
        var t = this, e = this.data.uploadImgs;
        if (e.length > 5) i.default.wxToast("最多可上传5张哦"); else if (this.data.canvasCtx) {
            var a = 5 - e.length;
            this.data.canvasCtx.chooseImage({
                count: a,
                sourceType: [ "album", "camera" ]
            }).then(function(a) {
                a && a.length && a.forEach(function(a, n) {
                    i.default.uploadRequest({
                        path: a.path,
                        loading: !0,
                        url: o.service.uploadFileInFile.replace("{sourcetype}", 9)
                    }).then(function(a) {
                        a && a.FilePath && (e.push({
                            id: a.Id,
                            imgUrl: i.default.formatUrl(a.FilePath),
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
        } else i.default.wxToast("系统出错,请稍后再试");
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset || null, a = this.data.uploadImgs, i = a.filter(function(t) {
            return t.id == e.id;
        })[0] || null;
        if (i) {
            var n = a.map(function(t) {
                return t.imgUrl;
            });
            wx.previewImage({
                urls: n,
                current: i.imgUrl,
                fail: function(t) {
                    console.error("预览图片时失败: ", t);
                }
            });
        }
    },
    deleteImage: function(t) {
        var e = t.currentTarget.dataset || null, a = this.data.uploadImgs, i = -1;
        (a.filter(function(t, a) {
            return t.id === e.id && -1 === i && (i = a), t.id === e.id;
        })[0] || null) && (a.splice(i, 1), this.setData({
            uploadImgs: a
        }));
    },
    submitNewsInfo: function() {
        var t = this;
        if (!t.data.showLoading) {
            var e = t.canSubmitHouseType();
            if (e) i.default.wxToast(e); else {
                var a = t.data.uploadImgs;
                if (a.length <= 0) return e = "请" + t.data.title, void i.default.wxToast(e);
                t.setData({
                    showLoading: !0
                });
                var n = [];
                a.map(function(t) {
                    var e = {
                        FileId: t.fileId,
                        FilePath: t.filePath
                    };
                    n.push(e);
                });
                var l = t.data.orientationInfo.orientationList[t.data.orientationInfo.index], s = t.data.houseTypeInfo, u = {
                    HouseTypeName: s.name.trim() + "户型",
                    HouseArea: parseInt(s.area.trim()),
                    SeveralRooms: s.house + "室" + s.hall + "厅" + s.toilet + "卫",
                    HabitableRoom: parseInt(s.house),
                    Orientation: l,
                    Description: s.desc.trim(),
                    Images: n
                }, d = this.data.buildingId || r.data.selectBuilding.BuildingId;
                i.default.request({
                    url: o.service.addBuildingTypeInBld.replace("{buildingId}", d),
                    method: "Post",
                    data: u
                }).then(function(t) {
                    wx.showToast({
                        title: "上传成功",
                        icon: "none",
                        mask: !0
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 1500);
                }).catch(function(e) {
                    t.setData({
                        showLoading: !1
                    }), console.error("上传户型时失败: ", e);
                });
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
    initImageTypeList: function() {
        var t = [ "东", "南", "西", "北", "东南", "东北", "西南", "西北" ];
        this.setData({
            "orientationInfo.orientationList": t
        });
    },
    canSubmitHouseType: function(t) {
        var e = this.data.houseTypeInfo, a = this.data.orientationInfo, i = /^[1-9]\d*(?:(\.\d{0,2}))?$/g, n = "";
        if (t) switch (t.currentTarget.dataset && t.currentTarget.dataset.type || "") {
          case "name":
            e.name.trim() || (n = "请先输入所有内容");
            break;

          case "area":
            e.area.trim() || (n = "请先输入所有内容"), e.area.trim() && !i.test(e.area) && (n = "户型面积请输入正确的格式");
            break;

          case "house":
            e.house.trim() || (n = "请先输入所有内容");
            break;

          case "hall":
            e.hall.trim() || (n = "请先输入所有内容");
            break;

          case "toilet":
            e.toilet.trim() || (n = "请先输入所有内容");
        } else e.name.trim() && e.area.trim() && e.house.trim() && e.hall.trim() && e.toilet.trim() && !(a.index < 0) || (n = "请先输入所有内容"), 
        e.area.trim() && !i.test(e.area) && (n = "户型面积请输入正确的格式"), this.data.buildingId || r.data.selectBuilding.BuildingId || (n = "确少参数buildingId");
        return n;
    }
});