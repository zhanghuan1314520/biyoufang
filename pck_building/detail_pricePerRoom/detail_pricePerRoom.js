var e = getApp(), t = require("../../config.js"), o = require("../../utils/index.js");

Page({
    data: {
        navH: e.globalData.navH,
        buildingName: "",
        listH: 0,
        list: null,
        buildingNoText: "",
        unitTab: 0,
        isShare: 0
    },
    onLoad: function(t) {
        var i = this;
        e.checkSession(function() {
            var e = t.projectId, a = t.buildingName, r = wx.getSystemInfoSync().screenHeight;
            if (i.setData({
                buildingName: t.template ? decodeURIComponent(a) : a,
                projectId: e,
                roomListHeight: r - i.data.navH - i.data.filterHeight,
                template: t.template || "",
                isShare: t.isShare ? parseInt(t.isShare) : 0
            }), i.getRooms(e), t.brokerCode) {
                var n = getCurrentPages();
                o.recordShareVisit(t.brokerCode, n[n.length - 1].route + o.serializationUrlParams(t));
            }
        }, o.getShareParams(t));
    },
    changeUnitTab: function(e) {
        var t = this, o = e.currentTarget.dataset.index;
        o !== this.data.unitTab && (wx.showLoading({
            title: "切换中"
        }), setTimeout(function() {
            t.setData({
                unitTab: o
            }), wx.hideLoading();
        }, 200));
    },
    getRooms: function(i) {
        var a = this;
        return o.request({
            url: t.service.getPricePerRoomInBld.replace("{projectId}", i)
        }).then(function(t) {
            var i = a.resolveRooms(t), r = "";
            i.RoomPriceList.forEach(function(e) {
                r += e.HouseNo, e.List.forEach(function(e) {
                    e.RoomPriceList.forEach(function(e) {
                        e.TotalPrice = e.TotalPrice ? parseInt(e.TotalPrice / 1e4) : 0, e.Acreage = e.Acreage ? e.Acreage.toFixed(2) : 0;
                    });
                });
            });
            var n = i.RoomFile.map(function(e) {
                return o.formatUrl(e);
            });
            a.setData({
                list: i.RoomPriceList,
                roomFiles: n,
                buildingNoText: r
            }, function() {
                setTimeout(function() {
                    var t = wx.createSelectorQuery();
                    t.select(".pricePerRoom__top").boundingClientRect(), t.exec(function(t) {
                        a.setData({
                            listH: e.globalData.screenHeight - e.globalData.navH - t[0].height
                        });
                    });
                }, 200);
            });
        });
    },
    resolveRooms: function(e) {
        return {
            RoomPriceList: e.RoomPriceList.map(function(e) {
                return e.FloorList && e.FloorList.length ? (e.List = e.FloorList.map(function(e) {
                    return e.RoomList && e.RoomList.length ? e.RoomPriceList = e.RoomList.map(function(e) {
                        return e.Id = e.RoomId, e.IsReal = !0, e;
                    }) : e.RoomPriceList = [], e;
                }), e) : (e.List = [], e);
            }),
            RoomFile: e.Images.map(function(e) {
                return e;
            })
        };
    },
    checkHouseDetail: function(e) {
        var t = e.currentTarget.dataset, i = t.id, a = t.isreal, r = t.islimitroom, n = t.roomname, s = "";
        a && n && (r ? o.wxToast("该房源限售") : a && (s = "/pck_building/detail_pricePerHouse/detail_pricePerHouse?roomId=" + i, 
        wx.vibrateShort(), wx.navigateTo({
            url: s
        })));
    },
    savePricePerRoomImg: function() {
        var t = this.data.roomFiles;
        t.length < 2 ? (wx.showLoading({
            title: "下载中"
        }), o.promisify(wx.downloadFile)({
            url: t[0]
        }).then(function(e) {
            200 === e.statusCode ? o.promisify(wx.saveImageToPhotosAlbum)({
                filePath: e.tempFilePath
            }).then(function() {
                wx.showToast({
                    title: "保存成功"
                });
            }).catch(function() {
                o.wxToast("保存失败");
            }) : o.wxToast("下载失败");
        }).catch(function() {
            o.wxToast("下载失败");
        })) : (e.globalData.pricePerRoomFiles = t, wx.navigateTo({
            url: "/pck_building/pricePerRoom_imgs/pricePerRoom_imgs"
        }));
    },
    onShareAppMessage: function() {
        return o.extractShareFn({
            util: o,
            app: e
        });
    }
});