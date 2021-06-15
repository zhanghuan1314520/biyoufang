function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../config.js"), e = require("../../utils/index.js"), o = getApp(), n = require("../../utils/plugins/michat/base64.js"), s = require("../../options/chat.js");

Component({
    behaviors: [ require("../../utils/mixins/chatFillPoint") ],
    data: {
        title: "我的聊天",
        navH: o.globalData.navH,
        userInfo: null,
        isIpx: !1,
        brokerCardStatus: 1,
        chatHandlerStatus: 0,
        canLoadMore: !1,
        loadingMore: !1,
        limit: 10,
        user: null,
        chatInfo: null,
        commonList: null,
        messageList: [],
        messageListInit: !1,
        inputContent: "",
        curFormId: "",
        keyBoardH: 0,
        isAuthPhoneInfoToTheBroker: !0,
        contentH: o.globalData.screenHeight - o.globalData.navH,
        avatarUrl: "",
        targetAvatarUrl: "",
        keyBoardDuration: 0,
        template: 0,
        otherSystem: 0,
        isScanQrCode: !1,
        timerIdArr: [],
        chatSourceType: 4
    },
    methods: {
        onLoad: function(t) {
            var a = this;
            wx.hideShareMenu(), t.scene && (t.unionId = decodeURIComponent(t.scene), this.data.isScanQrCode = !0), 
            o.checkSession(function() {
                var e = o.globalData.userInfo;
                a.setData({
                    userInfo: e,
                    loadOptions: t,
                    chatSourceType: t.chatSourceType || 4
                }), e.UnionId && a.registerInit(t);
            }, t);
        },
        onUnload: function() {
            this.data.user.registerServerAckHandler(o.globalData.mimc.serverAck), this.data.user.registerP2PMsgHandler(o.globalData.mimc.receiveP2PMsg), 
            wx.removeStorage({
                key: "currenntChatInfo"
            }), this.data.timerIdArr.forEach(function(t) {
                clearTimeout(t);
            });
        },
        authorizeUserInfo: function(t) {
            this.registerInit(this.data.loadOptions);
        },
        registerInit: function(t) {
            var a = this;
            o.globalData.mimcUser ? this.loadInit(t) : require("../../utils/plugins/michat.js").init(o).then(function() {
                setTimeout(function() {
                    a.loadInit(t);
                }, 1e3);
            });
        },
        loadInit: function(t) {
            var a = this, n = o.globalData, s = n.mimcUser, r = n.userInfo, i = n.consultantInfo, c = r.UserType, u = 1 == c ? i.AvatarUrl : r.AvatarUrl ? r.AvatarUrl : "", d = 1 == c ? i.Name : r.NickName, l = 1 == c ? r.RealtyConsultantInfo.Buildings[0].BuildingName : "", m = 1 == c ? r.RealtyConsultantInfo.RealtyConsultantId : "";
            u = e.formatUrl(u), this.setData({
                isIpx: o.globalData.isIpx,
                user: s,
                unionId: t.unionId || "",
                avatarUrl: u,
                buildingName: encodeURIComponent(l),
                userName: encodeURIComponent(d),
                consultantId: encodeURIComponent(m)
            }), 1 !== parseInt(t.template) || o.globalData.hasChatLogin ? this.init() : e.observe(o.globalData, "hasChatLogin", function(t) {
                t && a.setData({
                    user: o.globalData.mimcUser
                }, function() {
                    a.init();
                });
            });
        },
        init: function() {
            var t = this;
            this.getAcceptInfo().then(function() {
                t.data.user.registerServerAckHandler(function() {
                    t.serverAck();
                }), t.data.user.registerP2PMsgHandler(function(a) {
                    t.receiveP2PMsg(a);
                }), t.getRecordMsg();
            });
        },
        serverAck: function(a, e, n, s) {
            var r = this;
            this.data.messageList.forEach(function(a, e) {
                a.loading && r.setData(t({}, "messageList[" + e + "].loading", !1));
            }), o.globalData.mimc.getContactList();
        },
        receiveP2PMsg: function(t) {
            var a = t.getSequence(), s = t.getFromAccount(), r = o.globalData.userInfo.UnionId, i = t.getBizType(), c = t.getTimeStamp(), u = t.getPayload();
            if (s === this.data.chatInfo.UnionId) {
                wx.request({
                    url: "https://mimc.chat.xiaomi.net/api/msg/p2p/extra/update",
                    method: "POST",
                    header: {
                        token: o.globalData.mimcUser.getToken()
                    },
                    data: {
                        sequence: a,
                        fromAccount: s,
                        toAccount: r,
                        extra: "READ"
                    }
                });
                var d = this.data.messageList, l = {
                    sequence: a,
                    payload: u,
                    ts: c,
                    fromAccount: s,
                    toAccount: r,
                    bizType: i,
                    extra: "READ"
                };
                l._payLoad = JSON.parse(u), l._payLoad.content = decodeURIComponent(n.decode(l._payLoad.content)), 
                l._payLoad.time = this.formatChatTime(l._payLoad.timestamp), d.push(l), this.setData({
                    messageList: d
                }, function() {
                    e.scrollPageToBottom();
                });
            }
        },
        getUserSystemByLastMessage: function(t) {
            var a = 0, e = 0, o = t || wx.getStorageSync("currenntChatInfo"), n = this.data.userInfo;
            if (!o) return {
                userSystem: a,
                otherSystem: e
            };
            try {
                n.UnionId === (t ? o.fromAccount : o.lastMessage.fromAccount) ? (a = t ? o._payLoad.otherSystem : o._payload.otherSystem, 
                e = t ? o._payLoad.userSystem : o._payload.userSystem) : (a = t ? o._payLoad.userSystem : o._payload.userSystem, 
                e = t ? o._payLoad.otherSystem : o._payload.otherSystem);
            } catch (t) {
                return {
                    userSystem: 0,
                    otherSystem: 0
                };
            }
            return {
                userSystem: a,
                otherSystem: e
            };
        },
        getAcceptInfo: function() {
            var t = this, o = "";
            return o = this.data.isScanQrCode ? a.service.getAccountInMsgByQrCode.replace("{consultantCode}", this.data.unionId) : a.service.getAccountInMsg.replace("{userKey}", this.data.unionId), 
            e.request({
                url: o,
                data: {
                    userSystem: 0
                }
            }).then(function(a) {
                a.isBroker = !!a.BuildingName, a.isBroker ? a.PersonalImageUrl = e.formatUrl(a.PersonalImageUrl) : a.AvatarUrl = e.formatUrl(a.AvatarUrl), 
                t.setData({
                    chatInfo: a,
                    commonList: a.isBroker ? s.common_user : s.common_broker,
                    title: a.isBroker ? a.Name : a.NickName,
                    targetName: a.isBroker ? encodeURIComponent(a.Name) : encodeURIComponent(a.NickName),
                    targetAvatarUrl: a.isBroker ? e.formatUrl(a.PersonalImageUrl) : e.formatUrl(a.AvatarUrl),
                    targetBuildingName: a.isBroker ? encodeURIComponent(a.BuildingName) : "",
                    targetConsultantId: a.ConsultantId ? encodeURIComponent(a.ConsultantId) : ""
                });
            }).catch(function(t) {});
        },
        getRecordMsg: function(t) {
            var a = this;
            t = t || {}, o.globalData.mimc.getRecordMsg({
                toAccount: this.data.chatInfo.UnionId,
                utcToTime: t.utcToTime || new Date().getTime(),
                count: this.data.limit
            }, function(s) {
                if (200 === s.code && s.data) {
                    var r = s.data.messages || [], i = {}, c = !1, u = r.map(function(t, e) {
                        try {
                            t._payLoad = JSON.parse(n.decode(t.payload)), t._payLoad.content = decodeURIComponent(n.decode(t._payLoad.content));
                        } catch (a) {
                            t._payLoad.content = "[无法解析的消息类型]";
                        }
                        return t._payLoad.time = a.formatChatTime(1 * t._payLoad.timestamp || t.ts), "READ" !== t.extra && t.toAccount === a.data.userInfo.UnionId && (i[t.sequence] = "READ", 
                        !c && (c = !0)), t;
                    });
                    c && wx.request({
                        url: "https://mimc.chat.xiaomi.net/api/msg/p2p/extra/multiupdate",
                        method: "POST",
                        header: {
                            token: o.globalData.mimcUser.getToken()
                        },
                        data: {
                            toAccount: o.globalData.userInfo.UnionId,
                            fromAccount: a.data.chatInfo.UnionId,
                            sequenceExtraMap: i
                        },
                        success: function() {
                            o.globalData.mimc.getContactList();
                        }
                    }), a.setData({
                        canLoadMore: r.length === a.data.limit,
                        loadingMore: !1,
                        messageList: u.concat(a.data.messageList || [])
                    }, function() {
                        a.getOtherSystem(), t.notNeedScrollToBottom ? wx.pageScrollTo({
                            scrollTop: a.data.canLoadMore ? 50 : 0
                        }) : (e.scrollPageToBottom(), a.setData({
                            messageListInit: !0
                        }));
                    });
                } else a.setData({
                    chatHandlerStatus: 2
                });
            });
        },
        getOtherSystem: function() {
            var t = this.data.messageList;
            if (t && t.length) for (var a = t.length - 1; a >= 0; a--) if (t[a].fromAccount !== this.data.userInfo.UnionId) {
                var e = t[a]._payLoad.userSystem || 0;
                this.setData({
                    otherSystem: e
                });
                break;
            }
        },
        toggleBrokerStatus: function() {
            var t = this.data.brokerCardStatus;
            this.setData({
                brokerCardStatus: !t
            });
        },
        callBroker: function() {
            if (this.data.chatInfo.PhoneNumber) {
                var t = this.data.chatInfo, a = t.PhoneNumber;
                e.recordInteractTarck(t.ConsultantId, t.BuildingId ? t.BuildingId : null).then(function(t) {}), 
                e.callPhone(a);
            }
        },
        copyWechat: function() {
            this.data.chatInfo.WechatNumber ? e.promisify(wx.setClipboardData)({
                data: this.data.chatInfo.WechatNumber
            }).then(function() {
                wx.showToast({
                    title: "微信号已复制"
                });
            }) : wx.showToast({
                title: "暂无微信号",
                icon: "none"
            });
        },
        toggleChatHandler: function(t) {
            var a = parseInt(t.currentTarget.dataset.type), e = this.data.chatHandlerStatus;
            this.setData({
                chatHandlerStatus: a == e ? 0 : a,
                keyBoardH: 0
            });
        },
        onFocus: function(t) {
            this.setData({
                chatHandlerStatus: 0,
                keyBoardH: t.detail.height
            });
        },
        onBlur: function(t) {
            this.setData({
                keyBoardH: 0
            });
        },
        inputing: function(t) {
            this.setData({
                inputContent: t.detail.value
            });
        },
        sendMessage: function(t) {
            var a = this, n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null) || this.data.inputContent;
            if ("" !== e.trim(n)) {
                var s = this.data.avatarUrl, r = this.data.targetAvatarUrl, i = this.data.targetName, c = this.data.userName, u = this.data.buildingName, d = this.data.targetBuildingName, l = this.data.targetConsultantId, m = this.data.consultantId, g = this.data.messageList || [], h = new Date().getTime();
                this.recondUserChat(), g.push({
                    sequence: "temp_seq_" + h,
                    ts: h,
                    fromAccount: o.globalData.userInfo.unionId,
                    toAccount: this.data.chatInfo.UnionId,
                    bizType: "TEXT",
                    loading: !0,
                    _payLoad: {
                        timestamp: h,
                        content: n,
                        avatarUrl: s,
                        time: this.formatChatTime(h)
                    }
                });
                this.getUserSystem();
                this.setData({
                    messageList: g,
                    inputContent: "",
                    chatHandlerStatus: 0,
                    keyBoardH: 0
                }, function() {
                    a.closeLoading(g.length - 1), e.scrollPageToBottom(), n = encodeURIComponent(n), 
                    o.globalData.mimc.sendMsg({
                        msg: n,
                        avatarUrl: s,
                        targetAvatarUrl: r,
                        targetName: i,
                        userName: c,
                        buildingName: u,
                        targetBuildingName: d,
                        targetConsultantId: l,
                        consultantId: m,
                        userSystem: a.getUserSystemByLastMessage(a.data.messageList[a.data.messageList.length - 2]).userSystem,
                        otherSystem: a.getUserSystemByLastMessage(a.data.messageList[a.data.messageList.length - 2]).otherSystem,
                        toUser: a.data.chatInfo.UnionId,
                        fromUser: o.globalData.userInfo.UnionId
                    });
                });
            } else this.setData({
                inputContent: "",
                keyBoardH: 0
            });
        },
        closeLoading: function(a) {
            var e = this, o = setTimeout(function() {
                e.data.messageList[a].loading && e.setData(t({}, "messageList[" + a + "].loading", !1));
            }, 5e3);
            this.data.timerIdArr.push(o);
        },
        getUserSystem: function() {
            return 0;
        },
        onPageScroll: function(t) {
            var a = this.data, e = a.loadingMore, o = a.canLoadMore;
            !e && o && t.scrollTop < 25 && this.data.messageListInit && (this.setData({
                loadingMore: !0
            }), this.getRecordMsg({
                utcToTime: this.data.messageList[0].ts,
                notNeedScrollToBottom: !0
            }));
        },
        borderHeightChange: function(t) {
            var a = t.detail.duration;
            this.setData({
                keyBoardDuration: a
            });
        },
        chooseImageFromAlbum: function() {
            var t = this;
            e.promisify(wx.chooseImage)({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "album" ]
            }).then(function(a) {
                wx.showLoading({
                    title: "上传中.."
                }), t.uploadImg(a.tempFilePaths[0]);
            });
        },
        chooseImageFromCamera: function() {
            var t = this;
            e.promisify(wx.chooseImage)({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "camera" ]
            }).then(function(a) {
                t.uploadImg(a.tempFilePaths[0]);
            });
        },
        uploadImg: function(t) {
            var n = this, s = this.data.avatarUrl, r = this.data.targetAvatarUrl, i = this.data.targetName, c = this.data.userName, u = this.data.buildingName, d = this.data.targetBuildingName, l = this.data.targetConsultantId, m = this.data.consultantId;
            e.uploadRequest({
                path: t,
                loading: !0,
                url: a.service.uploadChatImageInFile
            }).then(function(t) {
                if (t && t.FilePath) {
                    if ("0002" === t.ReturnCode) return e.wxToast("图片过大");
                    if ("0001" === t.ReturnCode) return e.wxToast("文件格式不正确");
                    var a = e.formatUrl(t.FilePath), g = n.data.messageList, h = new Date().getTime();
                    n.recondUserChat(), g.push({
                        sequence: "temp_seq_" + h,
                        ts: h,
                        fromAccount: o.globalData.userInfo.UnionId,
                        toAccount: n.data.chatInfo.UnionId,
                        bizType: "IMAGE",
                        loading: !0,
                        _payLoad: {
                            timestamp: h,
                            avatarUrl: s,
                            content: a,
                            time: n.formatChatTime(h)
                        }
                    }), n.setData({
                        messageList: g,
                        chatHandlerStatus: 0
                    }, function() {
                        e.scrollPageToBottom(), n.closeLoading(g.length - 1);
                    }), a = encodeURIComponent(a), o.globalData.mimc.sendMsg({
                        msg: a,
                        avatarUrl: s,
                        targetAvatarUrl: r,
                        userName: c,
                        targetName: i,
                        buildingName: u,
                        targetBuildingName: d,
                        targetConsultantId: l,
                        consultantId: m,
                        bizType: "IMAGE",
                        toUser: n.data.chatInfo.UnionId,
                        fromUser: o.globalData.userInfo.UnionId
                    });
                }
            });
        },
        checkImage: function(t) {
            var a = t.currentTarget.dataset.url;
            "" !== a ? wx.previewImage({
                urls: [ a ]
            }) : e.wxToast("啊哦，图片找不到了哦～");
        },
        imgLoadError: function(t) {
            var a = {};
            a["messageList[" + t.target.dataset.index + "]._payLoad.content"] = "", this.setData(a);
        },
        sendCommonMsg: function(t) {
            var a = t.currentTarget.dataset.index, e = this.data.commonList[a];
            this.sendMessage(null, e);
        },
        formatChatTime: function(t) {
            switch (e.daysApart(t)) {
              case 0:
                return e.formateDate(t, "HH:mm");

              case 1:
                return e.formateDate(t, "昨天 HH:mm");

              default:
                return e.formateDate(t, "YYYY") == new Date(t).getFullYear() ? e.formateDate(t, "MM/DD HH:mm") : e.formateDate(t, "YYYY/MM/DD");
            }
        },
        disconnect: function() {
            console.log("michat断开回调"), this.data.user.logout(), this.data.user.login();
        },
        logout: function() {
            this.data.user.logout();
        },
        toggleFocus: function() {
            var a = this, o = this.data.chatInfo;
            e.toggleFollowBroker(o).then(function() {
                o.IsFollow || wx.showToast({
                    title: "关注成功"
                }), a.setData(t({}, "chatInfo.IsFollow", !o.IsFollow));
            });
        },
        recondUserChat: function() {
            try {
                var t = this.data, a = t.userInfo, e = t.messageList, o = t.chatInfo, n = t.chatSourceType, s = a.UnionId, r = a.RealtyConsultantInfo, i = a.UserType, c = this.data.chatInfo, u = c.BuildingName, d = c.BuildingId, l = e.length && e[e.length - 1];
                !d && r && r.Buildings[0] && (d = r.Buildings[0].BuildingId, u = r.Buildings[0].BuildingName), 
                (l && l.toAccount === s || !e.length) && this.recondBrokerChat({
                    ToAccount: o.UnionId,
                    ToAccountUserType: o.isBroker ? 1 : 0,
                    ChatSourceType: Number(n),
                    ConsultantId: i && r.RealtyConsultantId || o.ConsultantId,
                    BuildingName: u,
                    BuildingId: d
                });
            } catch (t) {
                console.log(t);
            }
        }
    }
});