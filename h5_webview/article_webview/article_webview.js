var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
    }
    return e;
}, t = require("../../config.js"), r = require("../../utils/index.js"), i = require("../../utils/getter/index.js"), a = getApp();

Page({
    data: {
        showShare: !1,
        url: null,
        title: null,
        id: null,
        userInfo: null,
        userType: null,
        brokerId: "",
        broker: null,
        brokerImage: null,
        isShare: !1,
        isIpx: a.globalData.isIpx,
        brokerBuilding: {}
    },
    onLoad: function(e) {
        var t = this, i = e.id, n = decodeURIComponent(e.title), l = e.url ? decodeURIComponent(e.url) : null, o = e.scene ? decodeURIComponent(e.scene) : null, s = "1" === e.isShare, d = e.type;
        a.checkSession(function() {
            var n = t.getRightBrokerID(e, a.globalData.userInfo);
            o ? t.getActicleDetailByScene(o) : s && "purchasearticle" !== d && t.getActicleDetailByScene(i, !0, l), 
            s && n && t.getBrokerById(n), t.setData({
                userInfo: a.globalData.userInfo,
                userType: a.globalData.userInfo.UserType,
                url: s && "purchasearticle" !== d ? null : l,
                brokerId: n,
                id: i,
                type: d,
                isShare: s
            }), "purchasearticle" === d ? i && r.recordPurchaseArticleView(i) : s ? (i && r.recordArticleClick({
                articleId: i,
                SourceKey: "Share",
                SharerOpenId: n
            }), i && r.recordArticleScan({
                ArticleIds: [ i ],
                SourceKey: "Share"
            })) : o && r.handleScanqrcodeTrack({
                PageUrl: "h5_webview/article_webview/article_webview?scene=" + o
            }), setTimeout(function() {
                t.setData({
                    showShare: !0
                });
            }, 1e3);
        }, r.getShareParams(e)), n && this.setData({
            title: n
        });
    },
    onShareAppMessage: function() {
        return r.extractShareFn({
            util: r,
            app: a
        });
    },
    getActicleDetailByScene: function(e) {
        var i = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = arguments[2], l = t.service[a ? "getArticleDetailAPI" : "articleShareDetailByCodeAPI"];
        return e && r.request({
            url: l.replace("{id}", e)
        }).then(function(e) {
            var t = e.Id, r = e.LinkUrl, a = decodeURIComponent(r || n);
            i.setData({
                url: a,
                id: t
            });
        }).catch(function(e) {
            setTimeout(function() {
                wx.switchTab({
                    url: "/pages/index/index"
                });
            }, 1e3);
        });
    },
    getRightBrokerID: function(e, t) {
        if (e.brokerId) {
            var n = getCurrentPages();
            return r.recordShareVisit(e.brokerId, n[n.length - 1].route + r.serializationUrlParams(e)), 
            e.brokerId;
        }
        if (1 === t.UserType) return i.getShortCode(t, a.globalData.cityInfo);
    },
    toChat: function(e) {
        var t = e.currentTarget.dataset.unionid;
        if (t) {
            if (t === this.data.userInfo.UnionId) return r.wxToast("不能和自己聊天");
            wx.navigateTo({
                url: "/pck_chat/chat/chat?unionId=" + t
            });
        }
    },
    toBuilding: function(t) {
        (this.data.broker.BuildingId || "") && this.data.brokerBuilding && r.recordBuildingClick(e({
            buildingId: this.data.brokerBuilding.BuildingId,
            SourceKey: "Consultant"
        }, function() {
            return this.data.brokerBuilding.ProjectId ? {
                ProjectId: this.data.brokerBuilding.ProjectId
            } : {};
        }.call(this)));
        var i = "/pages/detail/detail?buildingId=" + this.data.broker.BuildingId + "&isShare=1&sourceType=1&fromBroker=0&&brokerCode=" + this.data.brokerId;
        wx.navigateTo({
            url: i
        });
    },
    drawCanvas: function(e) {
        var t = this, i = wx.createCanvasContext("hidden"), a = this.data.broker;
        i.setTextBaseline("top"), i.setFontSize(24), i.setFillStyle("#042842");
        var n = "置业顾问" + a.Name;
        i.fillText(n, 80, 21);
        var l = e.BuildingName + "--" + r.formatBuildingStatusText(e);
        l = l.length > 13 ? l.slice(0, 13) + "..." : l, i.setFontSize(20), i.setFillStyle("#8A969E"), 
        i.fillText(l, 80, 50), this.addLinearGradient(i, 341, 198, "#FFBC00", "#FCAE51"), 
        i.fillRect(341, 9, 198, 80), this.addLinearGradient(i, 559, 171, "#FF831C", "#FE5E10"), 
        i.fillRect(559, 9, 171, 80), i.setTextBaseline("middle"), i.setFillStyle("#FFF"), 
        i.setFontSize(30), i.fillText("在线咨询TA", 361, 49), i.fillText("查看楼盘", 585, 49), i.draw(!1, function() {
            t.getLocalImage();
        });
    },
    addLinearGradient: function(e, t, r, i, a) {
        var n = e.createLinearGradient(t, 0, t + r, 0);
        n.addColorStop(0, i), n.addColorStop(1, a), e.setFillStyle(n);
    },
    getLocalImage: function() {
        var e = this;
        Promise.all([ this.baseGetLocal({
            x: 80,
            y: 0,
            width: 252,
            height: 93
        }), this.baseGetLocal({
            x: 341,
            y: 9,
            width: 198,
            height: 80
        }), this.baseGetLocal({
            x: 559,
            y: 9,
            width: 171,
            height: 80
        }) ]).then(function(t) {
            e.setData({
                brokerImage: t
            });
        });
    },
    baseGetLocal: function(t) {
        return new Promise(function(r) {
            wx.canvasToTempFilePath(e({}, t, {
                destWidth: t.width,
                destHeight: t.height,
                canvasId: "hidden",
                success: function(e) {
                    r(e.tempFilePath);
                }
            }));
        });
    },
    getBrokerById: function(e) {
        var i = this;
        this.data.isShare && e && r.request({
            url: t.service.getShearInMem.replace("{shortCodeId}", e)
        }).then(function(e) {
            i.formatBroker(e), i.setData({
                broker: e
            }), i.data.isShare && i.getBuildingInfo(e.BuildingId);
        });
    },
    getBuildingInfo: function(e) {
        var i = this;
        r.request({
            url: t.service.getBuildingArticeShare.replace("{buildingId}", e)
        }).then(function(e) {
            i.drawCanvas(e), i.setData({
                brokerBuilding: e
            });
        });
    },
    formatBroker: function(e) {
        var t = [ "即将预售", "即将登记", "正在登记", "即将摇号", "即将选房", "已选房", "近期开盘", "不限购" ], i = [ "待售", "在售", "售罄", "待加推" ];
        e.StatusText = t[e.Status] || "", e.PersonalImageUrl = r.formatUrl(e.PersonalImageUrl), 
        e.BuildingStatusText = i[e.BuildingStatus] || "";
    }
});