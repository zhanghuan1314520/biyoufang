var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = require("../../config.js"), e = require("../index.js"), o = require("./michat/base64.js"), n = require("./michat/mimc-min.js");

module.exports = {
    mimc_appId: a.mimc_appId,
    mimc_appAccount: "",
    app: null,
    isLogin: !1,
    init: function(t) {
        var a = this;
        return new Promise(function(e, o) {
            a.app = t, a.mimc_appAccount = t.globalData.userInfo.UnionId, a.fetchMIMCToken(function(o) {
                var r = new n(a.mimc_appId, a.mimc_appAccount);
                r.registerFetchToken(function() {
                    return o;
                }), r.registerStatusChange(a.statusChange), r.registerServerAckHandler(a.serverAck), 
                r.registerP2PMsgHandler(a.receiveP2PMsg), r.registerDisconnHandler(a.disconnect), 
                r.login(), t.globalData.mimcUser = r, t.globalData.mimc = a, e();
            }).catch(function(t) {
                o();
            });
        });
    },
    fetchMIMCToken: function(t) {
        var o = getApp();
        return e.request({
            url: a.service.fetchMimcTokenInMsg,
            toastCallBack: function() {}
        }).then(function(a) {
            o.globalData.hasChatMoudle = !0, t && t(a);
        }, function(t) {
            405 == t.ReturnCode && (o.globalData.hasChatMoudle = !1);
        });
    },
    statusChange: function(t, a, e, o) {
        if (t) {
            console.log("login succeed");
            var n = getApp();
            n.globalData.mimc.getContactList(), n.globalData.authToChat && n.globalData.authToChatUnionId && (wx.navigateTo({
                url: "/pck_chat/chat/chat?unionId=" + n.globalData.authToChatUnionId
            }), n.globalData.authToChat = !1, n.globalData.authToChatUnionId = ""), n.globalData.hasChatLogin = !0;
        } else console.log("login failed.errReason=" + e + ",errDesc=" + o + ",errType=" + a);
    },
    getRecordMsg: function(a, e) {
        return a = a || {}, wx.request({
            url: "https://mimc.chat.xiaomi.net/api/msg/p2p/queryOnCount/",
            method: "POST",
            header: {
                token: this.app.globalData.mimcUser.getToken()
            },
            data: t({
                fromAccount: this.mimc_appAccount
            }, a),
            complete: function() {
                wx.hideLoading();
            },
            success: function(t) {
                200 === t.statusCode && e && e(t.data);
            }
        });
    },
    getContactList: function(t) {
        var a = getApp();
        return wx.request({
            url: "https://mimc.chat.xiaomi.net/api/contact/v2",
            header: {
                token: a.globalData.mimcUser.getToken()
            },
            data: {
                msgExtraFlag: !0
            },
            complete: function() {
                wx.hideLoading();
            },
            success: function(e) {
                if (200 === e.statusCode) {
                    var n = e.data.data && e.data.data.contacts || [], r = !1;
                    n.forEach(function(t) {
                        if (!t.lastMessage.msgExtra && t.lastMessage.fromAccount !== a.globalData.userInfo.UnionId && !r) {
                            var e = !1;
                            try {
                                t._payload = JSON.parse(o.decode(t.lastMessage.payload));
                            } catch (t) {
                                console.error("解析聊天内容体时失败: ", t), e = !0;
                            }
                            if (!e) {
                                var n = t._payload.content ? t._payload.content.length : "";
                                n % 4 == 0 && (t._payload.content = t._payload.content.replace(/==?$/, ""), n = t._payload.content.length), 
                                n % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t._payload.content) || (console.log("来未读消息啦"), 
                                r = !0), r = !0;
                            }
                        }
                    }), r && wx.showTabBarRedDot({
                        index: 2
                    }), a.globalData.hasChatNoReader = r, a.globalData.concatList = n, t && t(e.data);
                }
            }
        });
    },
    sendMsg: function(t) {
        if (t.msg) {
            var n = t.fromUser, r = t.toUser, c = t.msg, i = o.encode(c), s = new Date().getTime(), l = t.bizType || "TEXT", g = String(JSON.stringify({
                avatarUrl: t.avatarUrl || "",
                userName: t.userName || "",
                targetAvatarUrl: t.targetAvatarUrl || "",
                targetName: t.targetName || "",
                buildingName: t.buildingName || "",
                targetBuildingName: t.targetBuildingName || "",
                msgId: (t.bizType || "TEXT") + "_" + s,
                timestamp: s,
                content: i,
                userSystem: t.userSystem,
                otherSystem: t.otherSystem,
                targetConsultantId: t.targetConsultantId,
                consultantId: t.consultantId
            }));
            return e.request({
                url: a.service.pushMessageInMsg,
                method: "POST",
                data: {
                    FromAccount: n,
                    ToAccount: r,
                    FromResource: "resWeb",
                    Msg: g,
                    MsgType: l,
                    BizType: l,
                    UserSystem: t.userSystem,
                    ToAccountUserType: t.targetBuildingName ? 1 : 0,
                    BuildingName: decodeURIComponent(t.buildingName || t.targetBuildingName)
                }
            });
        }
    },
    serverAck: function(t, a, e, o) {},
    receiveP2PMsg: function(t) {
        console.log("in global callback for receiveP2PMsg"), getApp().globalData.mimc.getContactList();
    },
    disconnect: function() {
        console.log("disconnect");
        var t = getApp();
        t.globalData.mimcUser.logout(), setTimeout(function() {
            t.globalData.mimc.init(t);
        }, 1e3);
    },
    logout: function() {
        getApp().globalData.mimcUser.logout();
    }
};