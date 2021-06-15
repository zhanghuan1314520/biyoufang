function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var e = require("../../config.js"), n = require("../../utils/index.js"), o = (require("../../utils/plugins/michat.js"), 
getApp());

Page({
    data: {
        brokerList: null,
        buildingId: "",
        pagination: {
            pageNo: 1,
            limit: 10,
            canLoadMore: !1
        }
    },
    getBrokers: function() {
        var t = this, o = this.data, a = o.buildingId, i = o.brokerList, r = o.userInfo, c = o.pagination, s = c.pageNo, l = c.limit;
        return n.request({
            url: e.service.getRecommendBrokersInMem.replace("{buildingId}", a),
            data: {
                pageNo: s,
                limit: l
            }
        }).then(function(e) {
            e = e.filter(function(t) {
                return r.UnionId !== t.UnionId;
            }), !i && (i = []), t.setData({
                brokerList: i.concat(t.formatBrokers(e)),
                "pagination.canLoadMore": e.length === l
            });
        });
    },
    toggleFocus: function(e) {
        var o = this;
        n.toggleFollowBroker(e).then(function() {
            var a;
            e.IsFollow || n.wxToast("关注成功");
            var i = "brokerList[" + e.idx + "].IsFollow", r = "brokerList[" + e.idx + "].btnList[0]";
            o.setData((a = {}, t(a, i, !e.IsFollow), t(a, r + ".name", e.IsFollow ? "关注顾问" : "已关注"), 
            t(a, r + ".iconSrc", e.IsFollow ? "/pck_advert/images/pullLong/consultantlist_icon_followe@3x.png" : "/pck_advert/images/pullLong/consultantlist_icon_followed@3x.png"), 
            a));
        });
    },
    formatBrokers: function(t) {
        var e = this;
        return t.map(function(t, o) {
            return t.idx = o, t.PersonalImageUrl = n.formatUrl(t.PersonalImageUrl), t.WorkPermitUrl = n.formatUrl(t.WorkPermitUrl), 
            t.btnList = e.initBtnList(t), t;
        });
    },
    initBtnList: function(t) {
        return [ {
            id: 0,
            name: t.IsFollow ? "已关注" : "关注顾问",
            type: "focus",
            iconSrc: t.IsFollow ? "/pck_advert/images/pullLong/consultantlist_icon_followed@3x.png" : "/pck_advert/images/pullLong/consultantlist_icon_followe@3x.png",
            authorUserInfo: !0,
            authorPhoneNumber: !1
        }, {
            id: 1,
            name: "在线咨询",
            type: "chat",
            iconSrc: "/pck_advert/images/pullLong/contact_icon.png",
            authorUserInfo: !0,
            authorPhoneNumber: !0
        }, {
            id: 2,
            name: "电话咨询",
            type: "phone",
            iconSrc: "/pck_advert/images/pullLong/consultantlist_icon_phone@3x.png",
            authorUserInfo: !1,
            authorPhoneNumber: !1
        } ];
    },
    carteDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        n.navigatePage({
            url: "/pages/broker_card/broker_card?brokerId=" + e
        });
    },
    getUserInfo: function(t) {
        var e = this;
        o.authorizeUserInfo(t, function() {
            e.handleBtnClick(t);
        });
    },
    getPhoneNumber: function(t) {
        var e = this;
        o.authorizePhoneNumber(t, {
            success: function() {
                e.handleBtnClick(t);
            }
        });
    },
    handleBtnClick: function(t) {
        var e = this, o = t.currentTarget.dataset, a = o.type, i = o.consultant;
        switch (a) {
          case "focus":
            this.toggleFocus(i);
            break;

          case "chat":
            var r = i.UnionId;
            n.getTemplateMessageId(6, "MessageRemindNoticeId", r).then(function(t) {
                e.goChatPage(i);
            }).catch(function(t) {
                e.goChatPage(i);
            });
            break;

          case "phone":
            this.makePhone(i);
        }
    },
    goChatPage: function(t) {
        n.navigatePage({
            url: "/pck_chat/chat/chat?unionId=" + t.UnionId + "&chatSourceType=5"
        });
    },
    makePhone: function(t) {
        n.recordInteractTarck(t.Id, this.data.buildingId), n.callPhone(t.PhoneNumber);
    },
    onLoad: function(t) {
        var e = this;
        o.checkSession(function() {
            var n = o.globalData.userInfo;
            e.setData({
                buildingId: t.buildingId,
                userInfo: n
            }, function() {
                e.getBrokers();
            });
        }, t), wx.setNavigationBarTitle({
            title: t.title + "置业顾问"
        });
    },
    onReachBottom: function() {
        var t = this.data.pagination, e = t.canLoadMore, n = t.pageNo;
        e && (this.setData({
            "pagination.pageNo": n + 1
        }), this.getBrokers());
    }
});