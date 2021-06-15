var e = require("../../../config.js"), t = require("../../../utils/index.js"), n = getApp();

Component({
    properties: {
        comptype: {
            type: String,
            value: "0"
        }
    },
    data: {
        showDialog: !1,
        pageNo: 1,
        limit: 10,
        canLoadMore: !1,
        moments: null,
        loadMoments: !1,
        userInfo: null,
        canPublish: !1,
        imageRoot: n.globalData.imgsPathInfo.rootPath
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            this.setData({
                pageNo: 1,
                canLoadMore: !0,
                moments: null,
                userInfo: n.globalData.userInfo
            }), this.getMoments();
        },
        userOperate: function(e) {
            var n = e.detail;
            console.log(n);
            var i = this.data.userInfo;
            if ("del" === n.eventType) this.handleDel(n.momentInfo); else if ("chat" === n.eventType) i.UnionId !== n.momentInfo.UnionId ? (this.checkChat(), 
            this.baseJump("/pck_chat/chat/chat?unionId=" + n.momentInfo.UnionId)) : t.wxToast("不能和自己聊天"); else if ("phone" === n.eventType) i.UnionId !== n.momentInfo.UnionId ? this.baseMakePhoneCall(n.momentInfo.PhoneNumber) : t.wxToast("不能和自己打电话"); else if ("detail" === n.eventType) {
                var a = "/pages/detail/detail?buildingId=" + n.momentInfo.BuildingId;
                this.baseJump(a);
            } else if ("lookAvatar" === n.eventType) {
                var o = "/pages/broker_card/broker_card?brokerId=" + n.momentInfo.RealtyConsultantId;
                this.baseJump(o);
            }
        },
        dialogOperate: function(e) {
            "sure" === e.detail && this.triggerEvent("userOperate", this.data.options), this.setData({
                showDialog: !1
            });
        },
        handleDel: function(e) {
            this.setData({
                options: e,
                showDialog: !0
            });
        },
        baseJump: function(e) {
            wx.navigateTo({
                url: e
            });
        },
        baseMakePhoneCall: function(e) {
            t.callPhone(e);
        },
        checkChat: function() {
            if (this.data.userInfo.WeixinAuthorized !== n.globalData.userInfo.WeixinAuthorized) {
                var e = this.data.moments;
                e && e.map(function(e, t) {
                    e.WeixinAuthorized = !0;
                }), this.setData({
                    moments: e,
                    userInfo: n.globalData.userInfo
                });
            }
        },
        emitpublish: function() {
            this.triggerEvent("publish");
        },
        getMoments: function() {
            var n = this, i = this.data, a = (i.loadMoments, i.limit), o = i.pageNo, s = i.canLoadMore, r = i.moments, l = i.userInfo;
            r = r || [], s && t.request({
                url: e.service.getMomentsInNews,
                data: {
                    pageNo: o,
                    limit: a
                }
            }).then(function(e) {
                e.CanPublish && n.triggerEvent("canPublish");
                var i = {
                    pageNo: ++o,
                    canLoadMore: e.ArticleList.length === a,
                    canPublish: n.data.CanPublish || e.CanPublish
                }, s = r.length;
                if (e.ArticleList.length || r.length) for (var h = 0; h < e.ArticleList.length; h++) e.ArticleList[h].personalImageUrl = t.formatUrl(e.ArticleList[h].PersonalImageUrl), 
                e.ArticleList[h].WeixinAuthorized = l.WeixinAuthorized, e.ArticleList[h].Images && (e.ArticleList[h].covers = e.ArticleList[h].Images.map(function(e) {
                    return e = t.formatUrl(e);
                })), i["moments[" + s++ + "]"] = e.ArticleList[h]; else i.moments = [], n.triggerEvent("nomoment");
                n.setData(i);
            });
        }
    }
});