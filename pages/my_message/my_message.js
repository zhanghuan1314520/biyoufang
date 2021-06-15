var e = require("../../config.js"), t = require("../../utils/index.js"), a = getApp(), n = require("../../utils/plugins/michat/base64.js");

Component({
    data: {
        navH: a.globalData.navH,
        concatList: [],
        stationMessage: null,
        navMenuList: [],
        userInfo: null,
        allowMore: !1,
        chatSubList: [],
        pageStatus: -1,
        showBulkSubscription: 0,
        subscriptionType: null,
        subscriptionId: null,
        systemMessage: null,
        bgIcons: [ e.imgRootUrl + "/images_wx/weixin_common/news_img_nomessage.png" ]
    },
    methods: {
        onLoad: function(e) {},
        onShow: function() {
            var e = this;
            wx.hideTabBarRedDot({
                index: 2
            }), a.checkSession(function() {
                e.setData({
                    userInfo: a.globalData.userInfo
                }), e.initPage();
            });
        },
        onPullDownRefresh: function() {
            this.initPage(wx.stopPullDownRefresh);
        },
        onHide: function() {
            t.showTabBarRedDot();
        },
        initPage: function(e) {
            var n = this;
            this.data.userInfo.WeixinAuthorized ? (this.getNoreadMessage(), this.getChatSubList().then(function() {
                e && e();
                var i = n.fomartConcatList(a.globalData.concatList || []);
                n.triggerBatchSubscribe(n.data.chatSubList, i), n.setData({
                    userInfo: a.globalData.userInfo,
                    pageStatus: 1,
                    concatList: i
                }, function() {
                    t.observe(a.globalData, "concatList", function(e) {
                        var t = n.fomartConcatList(a.globalData.concatList || []);
                        n.triggerBatchSubscribe(n.data.chatSubList, t), n.setData({
                            concatList: t
                        });
                    });
                });
            }).catch(function(t) {
                e && e();
            })) : (e && e(), this.setData({
                pageStatus: 1
            }));
        },
        getChatSubList: function() {
            var a = this, n = this.data.userInfo.UserType;
            return t.request({
                url: e.service.getChatSubInMsg
            }).then(function(e) {
                a.data.subscriptionType = n ? 1 : 6, a.data.subscriptionId = n ? "CustomerConsultationNoticeId" : "MessageRemindNoticeId", 
                a.data.chatSubList = e.UnionIds;
            });
        },
        goSystemMesPage: function() {
            wx.navigateTo({
                url: "/pck_my/system-message/index?type=sys"
            });
        },
        goSubMessagePage: function() {
            wx.navigateTo({
                url: "/pck_my/system-message/index?type=sub"
            });
        },
        fomartConcatList: function() {
            var e = this;
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).map(function(a) {
                a.time = t.formatArticleTime(e.formatChatTime(parseInt(a.timestamp)));
                try {
                    a._payload = JSON.parse(n.decode(a.lastMessage.payload));
                } catch (e) {
                    return console.error("解析聊天内容体时失败: ", e), {
                        _payload: {
                            isFiltered: !0
                        }
                    };
                }
                var i = a._payload.content ? a._payload.content.length : "";
                i % 4 == 0 && (a._payload.content = a._payload.content.replace(/==?$/, ""), i = a._payload.content.length);
                try {
                    a._payload.content = decodeURIComponent(n.decode(a._payload.content));
                } catch (e) {
                    console.error("解析聊天内容时失败: ", e);
                }
                return a._payload.type = a._payload.msgId.indexOf("TEXT") > -1 ? 1 : 2, a._payload.targetName = decodeURIComponent(a._payload.targetName), 
                a._payload.userName = decodeURIComponent(a._payload.userName), a._payload.targetBuildingName = a._payload.targetBuildingName ? decodeURIComponent(a._payload.targetBuildingName) : "", 
                a._payload.buildingName = a._payload.buildingName ? decodeURIComponent(a._payload.buildingName) : "", 
                a;
            }).filter(function(e) {
                return !e._payload.isFiltered;
            });
        },
        formatChatTime: function(e, a) {
            var n = new Date();
            n.getFullYear(), n.getMonth(), n.getDate();
            if (a && Math.abs(a - e) < 6e4) return "";
            var i = new Date(e), o = i.getFullYear(), s = i.getMonth() + 1, r = i.getDate(), u = i.getHours(), c = i.getMinutes(), g = t.fixPrefixion(u) + ":" + t.fixPrefixion(c) + ":00";
            return o + "/" + t.fixPrefixion(s) + "/" + t.fixPrefixion(r) + " " + g;
        },
        goBuildingPage: function() {
            wx.switchTab({
                url: "/pages/building/building"
            });
        },
        triggerBatchSubscribe: function(e, t) {
            var a = this.getChatUnionIdArr(t), n = e.join();
            t.length && this.setData({
                showBulkSubscription: !a.every(function(e) {
                    return n.includes(e);
                })
            });
        },
        getChatUnionIdArr: function(e) {
            var t = this.data.userInfo.UnionId;
            return e.map(function(e) {
                var a = e.lastMessage, n = a.fromAccount, i = a.toAccount;
                return n === t ? i : n;
            });
        },
        bulkSubscriptionMessage: function(e) {
            var a = this, n = this.data, i = n.subscriptionType, o = n.subscriptionId, s = n.concatList, r = this.getChatUnionIdArr(s), u = r.map(function(e) {
                return {
                    MessageType: i,
                    SourceId: e
                };
            });
            t.getTemplateMessageId(i, o, u).then().then(function(e) {
                a.setData({
                    chatSubList: r,
                    showBulkSubscription: !1
                });
            });
        },
        getNoreadMessage: function() {
            var n = this;
            return t.request({
                url: e.service.getNewMsgNum,
                data: {
                    openId: a.globalData.userInfo.OpenId,
                    userSystemType: 0
                }
            }).then(function(e) {
                var i = e.SubscribeMessage, o = e.SystemMessage, s = {}, r = {};
                i && (r = {
                    CreateTime: "",
                    isHaveMsg: i.IsUnread,
                    Content: i.MessageContent
                }, i.MessageCreateTime && (r.CreateTime = t.formatArticleTime(n.formatChatTime(new Date(t.compatibleIOSDate(i.MessageCreateTime)).getTime())))), 
                o && (s = {
                    CreateTime: "",
                    isHaveMsg: o.IsUnread,
                    Content: o.MessageContent
                }, o.MessageCreateTime && (s.CreateTime = t.formatArticleTime(n.formatChatTime(new Date(t.compatibleIOSDate(o.MessageCreateTime)).getTime())))), 
                (o && o.IsUnread || i && i.IsUnread) && (a.globalData.MessageContent = !0), n.setData({
                    systemMessage: s,
                    subMessage: r
                });
            });
        },
        goChat: function(e) {
            var t = this.data.concatList[e.currentTarget.dataset.index];
            wx.setStorageSync("currenntChatInfo", t), wx.navigateTo({
                url: "/pck_chat/chat/chat?unionId=" + e.currentTarget.dataset.id + "&chatSourceType=4"
            });
        }
    }
});