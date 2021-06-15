function InvalidCharacterError(e) {
    this.message = e;
}

function MIMCUser(e, t, r) {
    function o() {
        wx.connectSocket({
            url: "wss://wsapp.chat.xiaomi.net"
        }), wx.onSocketOpen(function(e) {
            A = !0, (e = new proto.ims.ClientHeader()).setServer("xiaomi.com"), e.setCmd("CONN"), 
            e.setId(l()), e = e.serializeBinary();
            var t = new proto.ims.XMMsgConn();
            t.setVersion(106), t.setModel(_window.navigator.appName), t.setOs(parseFloat(_window.navigator.appVersion)), 
            t.setUdid("websocket"), t.setSdk(31), i(e = c(e, t = t.serializeBinary()));
        }), wx.onSocketClose(function(e) {
            void 0 !== O && null !== O ? O() : console.log("DisconnHandler is not registered."), 
            E = !1, clearInterval(_), clearInterval(C), clearInterval(V);
        }), wx.onSocketMessage(function(e) {
            s(e);
        }), wx.onSocketError(function(e) {
            clearInterval(_), clearInterval(C), clearInterval(V), console.log("init websocket err.");
        });
    }
    function s(e) {
        if (e.data.constructor == ArrayBuffer) d(e.data); else {
            var t = new FileReader();
            t.onload = function() {
                d(this.result);
            }, t.readAsArrayBuffer(e.data);
        }
    }
    function i(e) {
        try {
            A ? wx.sendSocketMessage({
                data: e
            }) : console.log("websocket未连接......");
        } catch (e) {
            console.log("websocket send err=" + e);
        }
    }
    function n(e, t, r) {
        var o = t + "&";
        return e.forEach(function(e, t, r) {
            o = o + t + "=" + e + "&";
        }), o += r, e = new Uint8Array(y(o)), e = b(h(e)), goog.global.btoa(e);
    }
    function a() {
        if (0 !== P.length) {
            for (var t = Array(P.length), r = 0; r < P.length; r++) {
                var o = new proto.UCGroup();
                o.setAppid(e), o.setTopicid(P[r]), t[r] = o;
            }
            (r = new proto.UCPing()).setGroupList(t), p(r.serializeBinary(), proto.UC_MSG_TYPE.PING, l());
        }
    }
    function p(r, o) {
        var s = new proto.MIMCUser();
        s.setAppid(e), s.setAppaccount(t), s.setUuid(F), s.setResource(S);
        var n = new proto.UCPacket();
        return n.setUser(s), n.setType(o), n.setPayload(r), r = l(), n.setPacketid(r), (o = new proto.MIMCPacket()).setPacketid(r), 
        o.setPackage(z), o.setType(proto.MIMC_MSG_TYPE.UC_PACKET), o.setPayload(n.serializeBinary()), 
        n = c(u("SECMSG", r), o.serializeBinary()), i(n), r;
    }
    function g() {
        var e = new proto.ims.XMMsgPing();
        i(e = c(u("PING", l()), e.serializeBinary()));
    }
    function u(e, t) {
        var r = new proto.ims.ClientHeader();
        return r.setChid(9), r.setUuid(F), r.setServer("xiaomi.com"), r.setResource(S), 
        r.setCmd(e), r.setId(t), r.serializeBinary();
    }
    function l() {
        var e = "web" + new Date().getTime() + m;
        return m++, m %= 1e3, e;
    }
    function c(e, t) {
        var r = e.length, o = t.length, s = 18 + r + o, i = new ArrayBuffer(s), n = new DataView(i);
        n.setUint8(0, 194), n.setUint8(1, 254), n.setUint8(2, 0), n.setUint8(3, 4), n.setUint16(4, 3), 
        n.setUint16(6, 2), n.setUint16(8, r), n.setUint32(10, o);
        for (var a = 0; a < r; a++) n.setUint8(14 + a, e[a]);
        for (a = 0; a < o; a++) n.setUint8(14 + r + a, t[a]);
        return e = f(i.slice(0, s - 4)), n.setUint32(s - 4, e), i;
    }
    function d(r) {
        var o = new DataView(r);
        o.getUint16(0), o.getUint16(2), o.getUint16(4), o.getUint16(6);
        var s = o.getUint16(8), d = o.getUint32(10);
        o = o.getUint32(14 + s + d);
        var h = f(r.slice(0, 14 + s + d));
        if (o === h) switch (o = new Uint8Array(r.slice(14, 14 + s)), s = new Uint8Array(r.slice(14 + s, 14 + s + d)), 
        (r = proto.ims.ClientHeader.deserializeBinary(o)).getCmd()) {
          case "CONN":
            if (L = proto.ims.XMMsgConnResp.deserializeBinary(s).getChallenge(), !0 === E) console.log("user already login."), 
            R(!0, null, null, null); else if (void 0 !== w && null !== w) {
                var M = w();
                if (200 !== M.code) void 0 !== R && null !== R ? R(!1, "get token failed", "token info code:" + M.code, "token info message:" + M.message) : console.log("statusChange is not registered"); else {
                    F = M.data.miUserId, x = goog.global.atob(M.data.miUserSecurityKey), z = M.data.appPackage, 
                    I = M.data.token;
                    var m = M.data.appAccount;
                    if (t !== m) M = "app account(" + t + ") is not same from the account(" + m + ") get from token", 
                    console.log(M), R(!1, null, "account not same", M); else if (e !== M.data.appId) M = "appid(" + e + ") is not same from the appid(" + M.data.appId + ") get from token", 
                    console.log(M), R(!1, null, "appid not same", M); else {
                        m = l();
                        var A = new Map();
                        A.set("challenge", L), A.set("chid", M.data.miChid), A.set("client_attrs", ""), 
                        A.set("cloud_attrs", ""), A.set("from", F + "@xiaomi.com/" + S), A.set("id", m), 
                        A.set("kick", 0), A.set("to", "xiaomi.com"), A.set("token", M.data.token), A = n(A, "XIAOMI-PASS", M.data.miUserSecurityKey);
                        var O = new proto.ims.XMMsgBind();
                        O.setToken(M.data.token), O.setKick(0), O.setMethod("XIAOMI-PASS"), O.setSig(A), 
                        M = O.serializeBinary(), i(M = c(u("BIND", m), M));
                    }
                }
            } else console.log("fetchMIMCToken is not registered");
            _ = setInterval(g, 3e4);
            break;

          case "BIND":
            (M = proto.ims.XMMsgBindResp.deserializeBinary(s)).getResult() && (E = !0, C = setInterval(a, 1e4)), 
            void 0 !== R && null !== R ? R(M.getResult(), M.getErrorType(), M.getErrorReason(), M.getErrorDesc()) : console.log("statusChange is not registered");
            break;

          case "SECMSG":
            r = x + "_" + r.getId(), s = b(s), d = [], o = 0;
            var V, q = "";
            for (V = 0; 256 > V; V++) d[V] = V;
            for (V = 0; 256 > V; V++) o = (o + d[V] + r.charCodeAt(V % r.length)) % 256, h = d[V], 
            d[V] = d[o], d[o] = h;
            for (r = o = V = 0; r < s.length; r++) o = (o + d[V = (V + 1) % 256]) % 256, h = d[V], 
            d[V] = d[o], d[o] = h, q += String.fromCharCode(s.charCodeAt(r) ^ d[(d[V] + d[o]) % 256]);
            switch (r = new Uint8Array(y(q)), (r = proto.MIMCPacket.deserializeBinary(r)).getType()) {
              case proto.MIMC_MSG_TYPE.PACKET_ACK:
                M = r.getPayload(), M = proto.MIMCPacketAck.deserializeBinary(M), void 0 !== v && null !== v ? v(M.getPacketid(), M.getSequence(), M.getTimestamp(), M.getErrormsg()) : console.log("serverAckHandler is not registered");
                break;

              case proto.MIMC_MSG_TYPE.COMPOUND:
                if (M = r.getPayload(), M = proto.MIMCPacketList.deserializeBinary(M), A = M.getMaxsequence(), 
                (m = new proto.MIMCSequenceAck()).setUuid(F), m.setResource(S), m.setSequence(A), 
                (A = new proto.MIMCPacket()).setType(proto.MIMC_MSG_TYPE.SEQUENCE_ACK), A.setPayload(m.serializeBinary()), 
                m = c(u("SECMSG", l()), A.serializeBinary()), i(m), M.getUuid() === F && M.getResource() === S) for (M = M.getPacketsList(), 
                m = 0; m < M.length; m++) try {
                    var $ = M[m];
                    switch ($.getType()) {
                      case proto.MIMC_MSG_TYPE.P2P_MESSAGE:
                        var Q = $.getPayload(), J = $.getPacketid(), Y = $.getSequence(), K = $.getTimestamp();
                        if (!G.has(Y)) {
                            G.add(Y);
                            var Z = proto.MIMCP2PMessage.deserializeBinary(Q), ee = Z.getFrom(), te = Z.getTo(), re = new H();
                            re.setPacketId(J), re.setSequence(Y), re.setFromAccount(ee.getAppaccount()), re.setFromResource(ee.getResource()), 
                            re.setToAccount(te.getAppaccount()), re.setToResource(te.getResource()), re.setPayload(j(Z.getPayload())), 
                            re.setTimeStamp(K), re.setBizType(Z.getBiztype()), void 0 !== U && null !== U ? U(re) : console.log("msgHandler is not registered");
                        }
                        break;

                      case proto.MIMC_MSG_TYPE.P2T_MESSAGE:
                        var oe = $.getPayload(), se = $.getPacketid(), ie = $.getSequence(), ne = $.getTimestamp();
                        if (!G.has(ie)) {
                            G.add(ie);
                            var ae = proto.MIMCP2TMessage.deserializeBinary(oe), pe = ae.getFrom(), ge = ae.getTo(), ue = new X();
                            ue.setPacketId(se), ue.setSequence(ie), ue.setFromAccount(pe.getAppaccount()), ue.setFromResource(pe.getResource()), 
                            ue.setTopicId(ge.getTopicid()), ue.setPayload(j(ae.getPayload())), ue.setTimeStamp(ne), 
                            ue.setBizType(ae.getBiztype()), void 0 !== T && null !== T ? T(ue) : console.log("groupMsgHandler is not registered");
                        }
                        break;

                      default:
                        $.getPayload();
                    }
                } catch (e) {
                    console.log("handleMIMCPacket " + m + " fail, err=" + e.message);
                }
                break;

              case proto.MIMC_MSG_TYPE.UC_PACKET:
                if ($ = r.getPayload(), $ = proto.UCPacket.deserializeBinary($), (Q = $.getUser()).getUuid() !== F && Q.getResource() !== S) console.log("uid | resource not the same."); else switch ($.getType()) {
                  case proto.UC_MSG_TYPE.JOIN_RESP:
                    M = $.getPayload(), M = proto.UCJoinResp.deserializeBinary(M), m = M.getGroup(), 
                    0 === M.getCode() && P.push(m.getTopicid()), void 0 !== k && null !== k ? k(m.getTopicid(), M.getCode(), M.getMessage(), B.get(m.getTopicid())) : console.log("ucJoinRespHandler is not registered"), 
                    B.has(m.getTopicid()) && B.delete(m.getTopicid());
                    break;

                  case proto.UC_MSG_TYPE.QUIT_RESP:
                    if (M = $.getPayload(), M = proto.UCQuitResp.deserializeBinary(M), m = M.getGroup(), 
                    0 === M.getCode()) for (A = 0; A < P.length; A++) P[A] === m.getTopicid() && P.slice(A, 1);
                    void 0 !== D && null !== D ? D(m.getTopicid(), M.getCode(), M.getMessage(), B.get(m.getTopicid())) : console.log("ucQuitRespHandler is not registered"), 
                    B.has(m.getTopicid()) && B.delete(m.getTopicid());
                    break;

                  case proto.UC_MSG_TYPE.MESSAGE_LIST:
                    for ($ = $.getPayload(), $ = proto.UCMessageList.deserializeBinary($), Q = $.getGroup(), 
                    J = $.getMaxsequence(), (Y = new proto.UCSequenceAck()).setGroup(Q), Y.setSequence(J), 
                    p(Y.serializeBinary(), proto.UC_MSG_TYPE.SEQ_ACK, l()), $ = $.getMessageList(), 
                    Q = 0; Q < $.length; Q++) try {
                        M = $[Q], m = M.getGroup(), A = M.getUser(), (O = new X()).setPacketId(M.getPacketid()), 
                        O.setSequence(M.getSequence()), O.setFromAccount(A.getAppaccount()), O.setFromResource(A.getResource()), 
                        O.setTopicId(m.getTopicid()), O.setPayload(j(M.getPayload())), O.setTimeStamp(M.getTimestamp()), 
                        O.setBizType(M.getBiztype()), void 0 !== W && null !== W ? W(O) : console.log("ucMsgHandler is not registered");
                    } catch (e) {
                        console.log("handleUCMessage " + Q + " fail, err=" + e.message);
                    }
                    break;

                  case proto.UC_MSG_TYPE.DISMISS:
                    for (M = $.getPayload(), M = proto.UCDismiss.deserializeBinary(M).getGroup(), m = 0; m < P.length; m++) P[m] === M.getTopicid() && P.slice(m, 1);
                    void 0 !== N && null !== N ? N(M.getTopicid()) : console.log("ucDismissHandler is not registered"), 
                    B.has(M.getTopicid()) && B.delete(M.getTopicid());
                    break;

                  case proto.UC_MSG_TYPE.PONG:
                    $.getPayload();
                    break;

                  default:
                    $.getType();
                }
                break;

              default:
                r.getPayload();
            }
            break;

          case "KICK":
            try {
                wx.closeSocket();
            } catch (e) {
                console.log("websocket close err=" + e);
            }
        }
    }
    function f(e) {
        for (var t, r = 1, o = 0, s = 0, i = (e = new Uint8Array(e)).length; 0 < i; ) {
            i -= t = 5550 < i ? 5550 : i;
            do {
                o += r += e[s++];
            } while (--t);
            r %= 65521, o %= 65521;
        }
        return (o << 16 | r) >>> 0;
    }
    function h(e) {
        var t, r = 16 + (e.length + 8 >>> 6 << 4), o = new Uint8Array(r << 2);
        o.set(new Uint8Array(e.buffer)), o = new Uint32Array(o.buffer);
        var s = new DataView(o.buffer);
        for (t = 0; t < r; t++) o[t] = s.getUint32(t << 2);
        o[e.length >> 2] |= 128 << 24 - 8 * (3 & e.length), o[r - 1] = e.length << 3, r = [];
        var i = [ function() {
            return p[1] & p[2] | ~p[1] & p[3];
        }, function() {
            return p[1] ^ p[2] ^ p[3];
        }, function() {
            return p[1] & p[2] | p[1] & p[3] | p[2] & p[3];
        }, function() {
            return p[1] ^ p[2] ^ p[3];
        } ], n = function(e, t) {
            return e << t | e >>> 32 - t;
        }, a = [ 1518500249, 1859775393, -1894007588, -899497514 ], p = [ 1732584193, -271733879, null, null, -1009589776 ];
        for (p[2] = ~p[0], p[3] = ~p[1], t = 0; t < o.length; t += 16) {
            var g = p.slice(0);
            for (e = 0; 80 > e; e++) r[e] = 16 > e ? o[t + e] : n(r[e - 3] ^ r[e - 8] ^ r[e - 14] ^ r[e - 16], 1), 
            s = n(p[0], 5) + i[e / 20 | 0]() + p[4] + r[e] + a[e / 20 | 0] | 0, p[1] = n(p[1], 30), 
            p.pop(), p.unshift(s);
            for (e = 0; 5 > e; e++) p[e] = p[e] + g[e] | 0;
        }
        for (s = new DataView(new Uint32Array(p).buffer), t = 0; 5 > t; t++) p[t] = s.getUint32(t << 2);
        return new Uint8Array(new Uint32Array(p).buffer);
    }
    function y(e) {
        for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), o = 0, s = e.length; o < s; o++) r[o] = e.charCodeAt(o);
        return t;
    }
    function b(e) {
        for (var t = "", r = 0; r < e.byteLength; r++) t += String.fromCharCode(e[r]);
        return t;
    }
    function M(e) {
        for (var t = 0, r = new Uint8Array(4 * e.length), o = 0; o != e.length; o++) {
            var s = e.charCodeAt(o);
            if (128 > s) r[t++] = s; else {
                if (2048 > s) r[t++] = s >> 6 | 192; else {
                    if (55295 < s && 56320 > s) {
                        if (++o == e.length) throw "UTF-8 encode: incomplete surrogate pair";
                        var i = e.charCodeAt(o);
                        if (56320 > i || 57343 < i) throw "UTF-8 encode: second char code 0x" + i.toString(16) + " at index " + o + " in surrogate pair out of range";
                        s = 65536 + ((1023 & s) << 10) + (1023 & i), r[t++] = s >> 18 | 240, r[t++] = s >> 12 & 63 | 128;
                    } else r[t++] = s >> 12 | 224;
                    r[t++] = s >> 6 & 63 | 128;
                }
                r[t++] = 63 & s | 128;
            }
        }
        return r.subarray(0, t);
    }
    function j(e) {
        var t, r = "", o = e.length;
        for (t = 0; t < o; ) {
            var s = e[t++];
            switch (s >> 4) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
                r += String.fromCharCode(s);
                break;

              case 12:
              case 13:
                var i = e[t++];
                r += String.fromCharCode((31 & s) << 6 | 63 & i);
                break;

              case 14:
                i = e[t++];
                var n = e[t++];
                r += String.fromCharCode((15 & s) << 12 | (63 & i) << 6 | (63 & n) << 0);
            }
        }
        return r;
    }
    var _, C, F = "", m = 0, E = !1, S = "", I = "", A = !1, P = [], B = new Map();
    if (r) S = r; else try {
        S = md5(_window.navigator.userAgent);
    } catch (e) {
        S = "resWeb", console.log("md5 failed,err=" + e);
    }
    var U, T, v, w, R, O, k, D, W, N, L, x, z, G = new Set(), V = setInterval(function() {
        if (!1 !== E) return wx.request({
            url: "https://mimc.chat.xiaomi.net/api/uctopic/topics",
            method: "GET",
            header: {
                "content-type": "application/json",
                token: I
            },
            success: function(e) {
                if (200 === e.code && "success" === e.message) {
                    e = e.data;
                    for (var t = 0; t < e.length; t++) P.push(e[t]);
                }
            }
        }), clearInterval(V), !0;
    }, 1e3);
    this.registerP2PMsgHandler = function(e) {
        U = e;
    }, this.registerGroupMsgHandler = function(e) {
        T = e;
    }, this.registerServerAckHandler = function(e) {
        v = e;
    }, this.registerFetchToken = function(e) {
        w = e;
    }, this.registerStatusChange = function(e) {
        R = e;
    }, this.registerDisconnHandler = function(e) {
        O = e;
    }, this.registerUCJoinRespHandler = function(e) {
        k = e;
    }, this.registerUCQuitRespHandler = function(e) {
        D = e;
    }, this.registerUCMsgHandler = function(e) {
        W = e;
    }, this.registerUCDismissHandler = function(e) {
        N = e;
    }, this.getToken = function() {
        return !1 === E && console.log("user not login, token is null."), I;
    }, this.getUuid = function() {
        return !1 === E && console.log("user not login, uuid is null."), F;
    }, this.login = function() {
        o();
    }, this.logout = function() {
        i(c(u("UBND", l()), ""));
    }, this.sendMessage = function(e, t, r) {
        return this.sendMessage(e, t, "", void 0 === r || r);
    }, this.sendMessage = function(r, o, s, n) {
        if (n = void 0 === n || n, !1 === E) throw console.log("user not login."), "user not login";
        if (10240 < o.length) throw console.log("packet len > 10k"), "packet len > 10k";
        var a = new proto.MIMCUser();
        a.setAppid(e), a.setAppaccount(t), a.setUuid(F), a.setResource(S);
        var p = new proto.MIMCUser();
        return p.setAppid(e), p.setAppaccount(r), (r = new proto.MIMCP2PMessage()).setFrom(a), 
        r.setTo(p), r.setPayload(M(o)), r.setIsstore(n), r.setBiztype(s), o = l(), (s = new proto.MIMCPacket()).setPacketid(o), 
        s.setPackage(z), s.setType(proto.MIMC_MSG_TYPE.P2P_MESSAGE), s.setPayload(r.serializeBinary()), 
        r = c(u("SECMSG", o), s.serializeBinary()), i(r), o;
    }, this.sendGroupMessage = function(e, t, r) {
        return this.sendGroupMessage(e, t, "", void 0 === r || r);
    }, this.sendGroupMessage = function(r, o, s, n) {
        if (n = void 0 === n || n, !1 === E) throw console.log("user not login."), "user not login.";
        if (10240 < o.length) throw console.log("packet len > 10k"), "packet len > 10k";
        var a = new proto.MIMCGroup();
        a.setAppid(e), a.setTopicid(r);
        var p = new proto.MIMCUser();
        return p.setAppid(e), p.setAppaccount(t), p.setUuid(F), p.setResource(S), (r = new proto.MIMCP2TMessage()).setFrom(p), 
        r.setTo(a), r.setPayload(M(o)), r.setIsstore(n), r.setBiztype(s), o = l(), (s = new proto.MIMCPacket()).setPacketid(o), 
        s.setPackage(z), s.setType(proto.MIMC_MSG_TYPE.P2T_MESSAGE), s.setPayload(r.serializeBinary()), 
        r = c(u("SECMSG", o), s.serializeBinary()), i(r), o;
    }, this.pull = function() {
        if (!1 === E) throw console.log("user not login."), "user not login.";
        if (10240 < groupMessage.length) throw console.log("packet len > 10k"), "packet len > 10k";
        var e = new proto.MIMCPull();
        e.setUuid(F), e.setResource(S), e = l();
        var t = new proto.MIMCPacket();
        return t.setPacketid(e), t.setPackage(z), t.setType(proto.MIMC_MSG_TYPE.PULL), t = c(u("SECMSG", e), t.serializeBinary()), 
        i(t), e;
    }, this.createUnlimitedGroup = function(t, r, o) {
        if (!1 === E) throw console.log("user not login."), "user not login.";
        wx.request({
            url: "https://mimc.chat.xiaomi.net/api/uctopic",
            method: "POST",
            header: {
                "content-type": "application/json",
                token: I
            },
            success: function(s) {
                if (200 === s.code && "success" === s.message) {
                    s = s.data.topicId;
                    var i = new proto.UCGroup();
                    i.setAppid(e), i.setTopicid(s);
                    var n = new proto.UCJoin();
                    n.setGroup(i), p(n.serializeBinary(), proto.UC_MSG_TYPE.JOIN, l()), B.set(s, o), 
                    r(s, t, !0, "", o);
                } else console.log("create uc group failed,code=" + result.code + ",message=" + result.message), 
                r(0, t, !1, result.message, o);
            },
            fail: function(e) {
                console.log("create uc group failed,fail=", e), r(0, t, !1, "statusCode=" + e.statusCode, o);
            }
        });
    }, this.dismissUnlimitedGroup = function(e, t, r) {
        if (!1 === E) throw console.log("user not login."), "user not login.";
        wx.request({
            url: "https://mimc.chat.xiaomi.net/api/uctopic",
            method: "DELETE",
            header: {
                "content-type": "application/json",
                token: I,
                topicId: e
            },
            success: function(o) {
                if (200 === o.code && "success" === o.message) {
                    for (o = 0; o < P.length; o++) P[o] === e && P.slice(o, 1);
                    t(!0, e, r);
                } else console.log("dismiss uc group failed,code=" + o.code + ",message=" + o.message), 
                t(!1, e, r);
            },
            fail: function(o) {
                console.log("dismiss uc group failed,readyState=" + xhr.readyState + ",status=" + xhr.status), 
                t(!1, e, r);
            }
        });
    }, this.joinUnlimitedGroup = function(t, r) {
        if (!1 === E) throw console.log("user not login."), "user not login.";
        return B.set(t, r), (r = new proto.UCGroup()).setAppid(e), r.setTopicid(t), (t = new proto.UCJoin()).setGroup(r), 
        p(t.serializeBinary(), proto.UC_MSG_TYPE.JOIN, l());
    }, this.quitUnlimitedGroup = function(t, r) {
        if (!1 === E) throw console.log("user not login."), "user not login.";
        return B.set(t, r), (r = new proto.UCGroup()).setAppid(e), r.setTopicid(t), (t = new proto.UCQuit()).setGroup(r), 
        p(t.serializeBinary(), proto.UC_MSG_TYPE.QUIT, l());
    }, this.sendUnlimitedGroupMessage = function(e, t, r) {
        return this.sendUnlimitedGroupMessage(e, t, "", void 0 !== r && r);
    }, this.sendUnlimitedGroupMessage = function(r, o, s, i) {
        if (i = void 0 !== i && i, !1 === E) throw console.log("user not login."), "user not login.";
        if (10240 < o.length) throw console.log("packet len > 10k"), "packet len > 10k";
        var n = new proto.MIMCUser();
        n.setAppid(e), n.setAppaccount(t), n.setUuid(F), n.setResource(S);
        var a = new proto.UCGroup();
        return a.setAppid(e), a.setTopicid(r), (r = new proto.UCMessage()).setGroup(a), 
        r.setPayload(M(o)), r.setIsstore(!1), r.setUser(n), o = l(), r.setPacketid(o), r.setBiztype(s), 
        r.setIsstore(i), p(r.serializeBinary(), proto.UC_MSG_TYPE.MESSAGE, o);
    };
    var H = function() {
        var e, t, r, o, s, i, n, a, p;
        this.setPacketId = function(t) {
            e = t;
        }, this.getPacketId = function() {
            return e;
        }, this.setFromAccount = function(e) {
            r = e;
        }, this.getFromAccount = function() {
            return r;
        }, this.setFromResource = function(e) {
            o = e;
        }, this.getFromResource = function() {
            return o;
        }, this.setToAccount = function(e) {
            s = e;
        }, this.getToAccount = function() {
            return s;
        }, this.setToResource = function(e) {
            i = e;
        }, this.getToResource = function() {
            return i;
        }, this.setSequence = function(e) {
            t = e;
        }, this.getSequence = function() {
            return t;
        }, this.setPayload = function(e) {
            n = e;
        }, this.getPayload = function() {
            return n;
        }, this.setTimeStamp = function(e) {
            a = e;
        }, this.getTimeStamp = function() {
            return a;
        }, this.setBizType = function(e) {
            p = e;
        }, this.getBizType = function() {
            return p;
        };
    }, X = function() {
        var e, t, r, o, s, i, n, a;
        this.setPacketId = function(t) {
            e = t;
        }, this.getPacketId = function() {
            return e;
        }, this.setFromAccount = function(e) {
            r = e;
        }, this.getFromAccount = function() {
            return r;
        }, this.setFromResource = function(e) {
            o = e;
        }, this.getFromResource = function() {
            return o;
        }, this.setSequence = function(e) {
            t = e;
        }, this.getSequence = function() {
            return t;
        }, this.setTopicId = function(e) {
            s = e;
        }, this.getTopicId = function() {
            return s;
        }, this.setPayload = function(e) {
            i = e;
        }, this.getPayload = function() {
            return i;
        }, this.setTimeStamp = function(e) {
            n = e;
        }, this.getTimeStamp = function() {
            return n;
        }, this.setBizType = function(e) {
            a = e;
        }, this.getBizType = function() {
            return a;
        };
    };
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, $jscomp = $jscomp || {};

$jscomp.scope = {}, $jscomp.findInternal = function(e, t, r) {
    e instanceof String && (e = String(e));
    for (var o = e.length, s = 0; s < o; s++) {
        var i = e[s];
        if (t.call(r, i, s, e)) return {
            i: s,
            v: i
        };
    }
    return {
        i: -1,
        v: void 0
    };
}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, 
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, r) {
    e != Array.prototype && e != Object.prototype && (e[t] = r.value);
}, $jscomp.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
}, $jscomp.global = $jscomp.getGlobal(void 0), $jscomp.polyfill = function(e, t, r, o) {
    if (t) {
        for (r = $jscomp.global, e = e.split("."), o = 0; o < e.length - 1; o++) {
            var s = e[o];
            s in r || (r[s] = {}), r = r[s];
        }
        (t = t(o = r[e = e[e.length - 1]])) != o && null != t && $jscomp.defineProperty(r, e, {
            configurable: !0,
            writable: !0,
            value: t
        });
    }
}, $jscomp.polyfill("Array.prototype.findIndex", function(e) {
    return e || function(e, t) {
        return $jscomp.findInternal(this, e, t).i;
    };
}, "es6", "es3"), $jscomp.checkStringArgs = function(e, t, r) {
    if (null == e) throw new TypeError("The 'this' value for String.prototype." + r + " must not be null or undefined");
    if (t instanceof RegExp) throw new TypeError("First argument to String.prototype." + r + " must not be a regular expression");
    return e + "";
}, $jscomp.polyfill("String.prototype.repeat", function(e) {
    return e || function(e) {
        var t = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > e || 1342177279 < e) throw new RangeError("Invalid count value");
        e |= 0;
        for (var r = ""; e; ) 1 & e && (r += t), (e >>>= 1) && (t += t);
        return r;
    };
}, "es6", "es3"), $jscomp.polyfill("Array.prototype.find", function(e) {
    return e || function(e, t) {
        return $jscomp.findInternal(this, e, t).v;
    };
}, "es6", "es3"), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
}, $jscomp.Symbol = function() {
    var e = 0;
    return function(t) {
        return $jscomp.SYMBOL_PREFIX + (t || "") + e++;
    };
}(), $jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this);
        }
    }), $jscomp.initSymbolIterator = function() {};
}, $jscomp.arrayIterator = function(e) {
    var t = 0;
    return $jscomp.iteratorPrototype(function() {
        return t < e.length ? {
            done: !1,
            value: e[t++]
        } : {
            done: !0
        };
    });
}, $jscomp.iteratorPrototype = function(e) {
    return $jscomp.initSymbolIterator(), e = {
        next: e
    }, e[$jscomp.global.Symbol.iterator] = function() {
        return this;
    }, e;
}, $jscomp.makeIterator = function(e) {
    $jscomp.initSymbolIterator();
    var t = e[Symbol.iterator];
    return t ? t.call(e) : $jscomp.arrayIterator(e);
}, $jscomp.owns = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
}, $jscomp.polyfill("WeakMap", function(e) {
    function t(e) {
        $jscomp.owns(e, o) || $jscomp.defineProperty(e, o, {
            value: {}
        });
    }
    function r(e) {
        var r = Object[e];
        r && (Object[e] = function(e) {
            return t(e), r(e);
        });
    }
    if (function() {
        if (!e || !Object.seal) return !1;
        try {
            var t = Object.seal({}), r = Object.seal({}), o = new e([ [ t, 2 ], [ r, 3 ] ]);
            return 2 == o.get(t) && 3 == o.get(r) && (o.delete(t), o.set(r, 4), !o.has(t) && 4 == o.get(r));
        } catch (e) {
            return !1;
        }
    }()) return e;
    var o = "$jscomp_hidden_" + Math.random().toString().substring(2);
    r("freeze"), r("preventExtensions"), r("seal");
    var s = 0, i = function(e) {
        if (this.id_ = (s += Math.random() + 1).toString(), e) {
            $jscomp.initSymbol(), $jscomp.initSymbolIterator(), e = $jscomp.makeIterator(e);
            for (var t; !(t = e.next()).done; ) t = t.value, this.set(t[0], t[1]);
        }
    };
    return i.prototype.set = function(e, r) {
        if (t(e), !$jscomp.owns(e, o)) throw Error("WeakMap key fail: " + e);
        return e[o][this.id_] = r, this;
    }, i.prototype.get = function(e) {
        return $jscomp.owns(e, o) ? e[o][this.id_] : void 0;
    }, i.prototype.has = function(e) {
        return $jscomp.owns(e, o) && $jscomp.owns(e[o], this.id_);
    }, i.prototype.delete = function(e) {
        return !(!$jscomp.owns(e, o) || !$jscomp.owns(e[o], this.id_)) && delete e[o][this.id_];
    }, i;
}, "es6", "es3"), $jscomp.MapEntry = function() {}, $jscomp.polyfill("Map", function(e) {
    if (!$jscomp.ASSUME_NO_NATIVE_MAP && function() {
        if (!e || !e.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
            var t = Object.seal({
                x: 4
            }), r = new e($jscomp.makeIterator([ [ t, "s" ] ]));
            if ("s" != r.get(t) || 1 != r.size || r.get({
                x: 4
            }) || r.set({
                x: 4
            }, "t") != r || 2 != r.size) return !1;
            var o = r.entries(), s = o.next();
            return !s.done && s.value[0] == t && "s" == s.value[1] && !((s = o.next()).done || 4 != s.value[0].x || "t" != s.value[1] || !o.next().done);
        } catch (e) {
            return !1;
        }
    }()) return e;
    $jscomp.initSymbol(), $jscomp.initSymbolIterator();
    var t = new WeakMap(), r = function(e) {
        if (this.data_ = {}, this.head_ = i(), this.size = 0, e) {
            e = $jscomp.makeIterator(e);
            for (var t; !(t = e.next()).done; ) t = t.value, this.set(t[0], t[1]);
        }
    };
    r.prototype.set = function(e, t) {
        var r = o(this, e);
        return r.list || (r.list = this.data_[r.id] = []), r.entry ? r.entry.value = t : (r.entry = {
            next: this.head_,
            previous: this.head_.previous,
            head: this.head_,
            key: e,
            value: t
        }, r.list.push(r.entry), this.head_.previous.next = r.entry, this.head_.previous = r.entry, 
        this.size++), this;
    }, r.prototype.delete = function(e) {
        return !(!(e = o(this, e)).entry || !e.list || (e.list.splice(e.index, 1), e.list.length || delete this.data_[e.id], 
        e.entry.previous.next = e.entry.next, e.entry.next.previous = e.entry.previous, 
        e.entry.head = null, this.size--, 0));
    }, r.prototype.clear = function() {
        this.data_ = {}, this.head_ = this.head_.previous = i(), this.size = 0;
    }, r.prototype.has = function(e) {
        return !!o(this, e).entry;
    }, r.prototype.get = function(e) {
        return (e = o(this, e).entry) && e.value;
    }, r.prototype.entries = function() {
        return s(this, function(e) {
            return [ e.key, e.value ];
        });
    }, r.prototype.keys = function() {
        return s(this, function(e) {
            return e.key;
        });
    }, r.prototype.values = function() {
        return s(this, function(e) {
            return e.value;
        });
    }, r.prototype.forEach = function(e, t) {
        for (var r, o = this.entries(); !(r = o.next()).done; ) r = r.value, e.call(t, r[1], r[0], this);
    }, r.prototype[Symbol.iterator] = r.prototype.entries;
    var o = function(e, r) {
        var o = r && (void 0 === r ? "undefined" : _typeof(r));
        "object" == o || "function" == o ? t.has(r) ? o = t.get(r) : (o = "" + ++n, t.set(r, o)) : o = "p_" + r;
        var s = e.data_[o];
        if (s && $jscomp.owns(e.data_, o)) for (e = 0; e < s.length; e++) {
            var i = s[e];
            if (r !== r && i.key !== i.key || r === i.key) return {
                id: o,
                list: s,
                index: e,
                entry: i
            };
        }
        return {
            id: o,
            list: s,
            index: -1,
            entry: void 0
        };
    }, s = function(e, t) {
        var r = e.head_;
        return $jscomp.iteratorPrototype(function() {
            if (r) {
                for (;r.head != e.head_; ) r = r.previous;
                for (;r.next != r.head; ) return r = r.next, {
                    done: !1,
                    value: t(r)
                };
                r = null;
            }
            return {
                done: !0,
                value: void 0
            };
        });
    }, i = function() {
        var e = {};
        return e.previous = e.next = e.head = e;
    }, n = 0;
    return r;
}, "es6", "es3"), $jscomp.polyfill("Set", function(e) {
    if (!$jscomp.ASSUME_NO_NATIVE_SET && function() {
        if (!e || !e.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
            var t = Object.seal({
                x: 4
            }), r = new e($jscomp.makeIterator([ t ]));
            if (!r.has(t) || 1 != r.size || r.add(t) != r || 1 != r.size || r.add({
                x: 4
            }) != r || 2 != r.size) return !1;
            var o = r.entries(), s = o.next();
            return !s.done && s.value[0] == t && s.value[1] == t && (!(s = o.next()).done && s.value[0] != t && 4 == s.value[0].x && s.value[1] == s.value[0] && o.next().done);
        } catch (e) {
            return !1;
        }
    }()) return e;
    $jscomp.initSymbol(), $jscomp.initSymbolIterator();
    var t = function(e) {
        if (this.map_ = new Map(), e) {
            e = $jscomp.makeIterator(e);
            for (var t; !(t = e.next()).done; ) this.add(t.value);
        }
        this.size = this.map_.size;
    };
    return t.prototype.add = function(e) {
        return this.map_.set(e, e), this.size = this.map_.size, this;
    }, t.prototype.delete = function(e) {
        return e = this.map_.delete(e), this.size = this.map_.size, e;
    }, t.prototype.clear = function() {
        this.map_.clear(), this.size = 0;
    }, t.prototype.has = function(e) {
        return this.map_.has(e);
    }, t.prototype.entries = function() {
        return this.map_.entries();
    }, t.prototype.values = function() {
        return this.map_.values();
    }, t.prototype.keys = t.prototype.values, t.prototype[Symbol.iterator] = t.prototype.values, 
    t.prototype.forEach = function(e, t) {
        var r = this;
        this.map_.forEach(function(o) {
            return e.call(t, o, o, r);
        });
    }, t;
}, "es6", "es3");

var COMPILED = !0, _window = {}, navigator = {
    userAgent: "mimc-uniapp/1.0",
    appName: "xiaomi",
    appVersion: "1.0"
};

_window.navigator = navigator;

var goog = goog || {};

if (goog.global = void 0, InvalidCharacterError.prototype = Error(), InvalidCharacterError.prototype.name = "InvalidCharacterError", 
void 0 == goog.global) {
    goog.global = {};
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    void 0 == goog.global.atob && (goog.global.atob = function(e) {
        if (1 == (e = String(e).replace(/[=]+$/, "")).length % 4) throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var t, r, o = 0, s = 0, i = ""; r = e.charAt(s++); ~r && (t = o % 4 ? 64 * t + r : r, 
        o++ % 4) ? i += String.fromCharCode(255 & t >> (-2 * o & 6)) : 0) r = chars.indexOf(r);
        return i;
    }), void 0 == goog.global.btoa && (goog.global.btoa = function(e) {
        e = String(e);
        for (var t, r, o = 0, s = chars, i = ""; e.charAt(0 | o) || (s = "=", o % 1); i += s.charAt(63 & t >> 8 - o % 1 * 8)) {
            if (255 < (r = e.charCodeAt(o += .75))) throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            t = t << 8 | r;
        }
        return i;
    });
}

goog.isDef = function(e) {
    return void 0 !== e;
}, goog.isString = function(e) {
    return "string" == typeof e;
}, goog.isBoolean = function(e) {
    return "boolean" == typeof e;
}, goog.isNumber = function(e) {
    return "number" == typeof e;
}, goog.exportPath_ = function(e, t, r) {
    e = e.split("."), r = r || goog.global, e[0] in r || !r.execScript || r.execScript("var " + e[0]);
    for (var o; e.length && (o = e.shift()); ) !e.length && goog.isDef(t) ? r[o] = t : r = r[o] && r[o] !== Object.prototype[o] ? r[o] : r[o] = {};
}, goog.define = function(e, t) {
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && void 0 === goog.global.CLOSURE_UNCOMPILED_DEFINES.nodeType && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, e) ? t = goog.global.CLOSURE_UNCOMPILED_DEFINES[e] : goog.global.CLOSURE_DEFINES && void 0 === goog.global.CLOSURE_DEFINES.nodeType && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, e) && (t = goog.global.CLOSURE_DEFINES[e])), 
    goog.exportPath_(e, t);
}, goog.DEBUG = !0, goog.LOCALE = "en", goog.TRUSTED_SITE = !0, goog.STRICT_MODE_COMPATIBLE = !1, 
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG, goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1, 
goog.provide = function(e) {
    if (goog.isInModuleLoader_()) throw Error("goog.provide can not be used within a goog.module.");
    if (!COMPILED && goog.isProvided_(e)) throw Error('Namespace "' + e + '" already declared.');
    goog.constructNamespace_(e);
}, goog.constructNamespace_ = function(e, t) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[e];
        for (var r = e; (r = r.substring(0, r.lastIndexOf("."))) && !goog.getObjectByName(r); ) goog.implicitNamespaces_[r] = !0;
    }
    goog.exportPath_(e, t);
}, goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/, goog.module = function(e) {
    if (!goog.isString(e) || !e || -1 == e.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_()) throw Error("Module " + e + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    if (goog.moduleLoaderState_.moduleName = e, !COMPILED) {
        if (goog.isProvided_(e)) throw Error('Namespace "' + e + '" already declared.');
        delete goog.implicitNamespaces_[e];
    }
}, goog.module.get = function(e) {
    return goog.module.getInternal_(e);
}, goog.module.getInternal_ = function(e) {
    if (!COMPILED) {
        if (e in goog.loadedModules_) return goog.loadedModules_[e];
        if (!goog.implicitNamespaces_[e]) return null != (e = goog.getObjectByName(e)) ? e : null;
    }
    return null;
}, goog.moduleLoaderState_ = null, goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_;
}, goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0;
}, goog.setTestOnly = function(e) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw e = e || "", Error("Importing test-only code into non-debug environment" + (e ? ": " + e : "."));
}, goog.forwardDeclare = function(e) {}, COMPILED || (goog.isProvided_ = function(e) {
    return e in goog.loadedModules_ || !goog.implicitNamespaces_[e] && goog.isDefAndNotNull(goog.getObjectByName(e));
}, goog.implicitNamespaces_ = {
    "goog.module": !0
}), goog.getObjectByName = function(e, t) {
    e = e.split("."), t = t || goog.global;
    for (var r = 0; r < e.length; r++) if (t = t[e[r]], !goog.isDefAndNotNull(t)) return null;
    return t;
}, goog.globalize = function(e, t) {
    t = t || goog.global;
    for (var r in e) t[r] = e[r];
}, goog.addDependency = function(e, t, r, o) {
    if (goog.DEPENDENCIES_ENABLED) {
        var s = goog.getLoader_();
        s && s.addDependency(e, t, r, o);
    }
}, goog.ENABLE_DEBUG_LOADER = !0, goog.logToConsole_ = function(e) {
    goog.global.console && goog.global.console.error(e);
}, goog.require = function(e) {
    if (goog.ENABLE_DEBUG_LOADER && goog.debugLoader_ && goog.getLoader_().earlyProcessLoad(e), 
    !COMPILED) {
        if (goog.isProvided_(e)) {
            if (goog.isInModuleLoader_()) return goog.module.getInternal_(e);
        } else if (goog.ENABLE_DEBUG_LOADER) {
            var t = goog.moduleLoaderState_;
            goog.moduleLoaderState_ = null;
            try {
                var r = goog.getLoader_();
                r ? r.load(e) : goog.logToConsole_("Could not load " + e + " because there is no debug loader.");
            } finally {
                goog.moduleLoaderState_ = t;
            }
        }
        return null;
    }
}, goog.basePath = "", goog.nullFunction = function() {}, goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
}, goog.addSingletonGetter = function(e) {
    e.instance_ = void 0, e.getInstance = function() {
        return e.instance_ ? e.instance_ : (goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = e), 
        e.instance_ = new e());
    };
}, goog.instantiatedSingletons_ = [], goog.LOAD_MODULE_USING_EVAL = !0, goog.SEAL_MODULE_EXPORTS = goog.DEBUG, 
goog.loadedModules_ = {}, goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER, 
goog.TRANSPILE = "detect", goog.TRANSPILER = "transpile.js", goog.DEBUG_LOADER = "", 
goog.hasBadLetScoping = null, goog.useSafari10Workaround = function() {
    if (null == goog.hasBadLetScoping) {
        try {
            var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";');
        } catch (e) {
            a = !1;
        }
        goog.hasBadLetScoping = a;
    }
    return goog.hasBadLetScoping;
}, goog.workaroundSafari10EvalBug = function(e) {
    return "(function(){" + e + "\n;})();\n";
}, goog.loadModule = function(e) {
    var t = goog.moduleLoaderState_;
    try {
        if (goog.moduleLoaderState_ = {
            moduleName: void 0,
            declareLegacyNamespace: !1
        }, goog.isFunction(e)) var r = e.call(void 0, {}); else {
            if (!goog.isString(e)) throw Error("Invalid module definition");
            goog.useSafari10Workaround() && (e = goog.workaroundSafari10EvalBug(e)), r = goog.loadModuleFromSource_.call(void 0, e);
        }
        var o = goog.moduleLoaderState_.moduleName;
        if (!goog.isString(o) || !o) throw Error('Invalid module name "' + o + '"');
        goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(o, r) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == (void 0 === r ? "undefined" : _typeof(r)) && null != r && Object.seal(r), 
        goog.loadedModules_[o] = r;
    } finally {
        goog.moduleLoaderState_ = t;
    }
}, goog.loadModuleFromSource_ = function(a) {
    return eval(a), {};
}, goog.normalizePath_ = function(e) {
    e = e.split("/");
    for (var t = 0; t < e.length; ) "." == e[t] ? e.splice(t, 1) : t && ".." == e[t] && e[t - 1] && ".." != e[t - 1] ? e.splice(--t, 2) : t++;
    return e.join("/");
}, goog.loadFileSync_ = function(e) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(e);
    try {
        var t = new goog.global.XMLHttpRequest();
        return t.open("get", e, !1), t.send(), 0 == t.status || 200 == t.status ? t.responseText : null;
    } catch (e) {
        return null;
    }
}, goog.transpile_ = function(a, b) {
    var c = goog.global.$jscomp;
    c || (goog.global.$jscomp = c = {});
    var d = c.transpile;
    if (!d) {
        var e = goog.basePath + goog.TRANSPILER, f = goog.loadFileSync_(e);
        if (f) {
            if (function() {
                eval(f + "\n//# sourceURL=" + e);
            }.call(goog.global), goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
            goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile, c = goog.global.$jscomp, 
            d = c.transpile;
        }
    }
    return d || (d = c.transpile = function(e, t) {
        return goog.logToConsole_(t + " requires transpilation but no transpiler was found."), 
        e;
    }), d(a, b);
}, goog.typeOf = function(e) {
    var t = void 0 === e ? "undefined" : _typeof(e);
    if ("object" == t) {
        if (!e) return "null";
        if (e instanceof Array) return "array";
        if (e instanceof Object) return t;
        var r = Object.prototype.toString.call(e);
        if ("[object Window]" == r) return "object";
        if ("[object Array]" == r || "number" == typeof e.length && void 0 !== e.splice && void 0 !== e.propertyIsEnumerable && !e.propertyIsEnumerable("splice")) return "array";
        if ("[object Function]" == r || void 0 !== e.call && void 0 !== e.propertyIsEnumerable && !e.propertyIsEnumerable("call")) return "function";
    } else if ("function" == t && void 0 === e.call) return "object";
    return t;
}, goog.isNull = function(e) {
    return null === e;
}, goog.isDefAndNotNull = function(e) {
    return null != e;
}, goog.isArray = function(e) {
    return "array" == goog.typeOf(e);
}, goog.isArrayLike = function(e) {
    var t = goog.typeOf(e);
    return "array" == t || "object" == t && "number" == typeof e.length;
}, goog.isDateLike = function(e) {
    return goog.isObject(e) && "function" == typeof e.getFullYear;
}, goog.isFunction = function(e) {
    return "function" == goog.typeOf(e);
}, goog.isObject = function(e) {
    var t = void 0 === e ? "undefined" : _typeof(e);
    return "object" == t && null != e || "function" == t;
}, goog.getUid = function(e) {
    return e[goog.UID_PROPERTY_] || (e[goog.UID_PROPERTY_] = ++goog.uidCounter_);
}, goog.hasUid = function(e) {
    return !!e[goog.UID_PROPERTY_];
}, goog.removeUid = function(e) {
    null !== e && "removeAttribute" in e && e.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete e[goog.UID_PROPERTY_];
    } catch (e) {}
}, goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0), goog.uidCounter_ = 0, 
goog.getHashCode = goog.getUid, goog.removeHashCode = goog.removeUid, goog.cloneObject = function(e) {
    var t = goog.typeOf(e);
    if ("object" == t || "array" == t) {
        if (e.clone) return e.clone();
        t = "array" == t ? [] : {};
        for (var r in e) t[r] = goog.cloneObject(e[r]);
        return t;
    }
    return e;
}, goog.bindNative_ = function(e, t, r) {
    return e.call.apply(e.bind, arguments);
}, goog.bindJs_ = function(e, t, r) {
    if (!e) throw Error();
    if (2 < arguments.length) {
        var o = Array.prototype.slice.call(arguments, 2);
        return function() {
            var r = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(r, o), e.apply(t, r);
        };
    }
    return function() {
        return e.apply(t, arguments);
    };
}, goog.bind = function(e, t, r) {
    return Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_, 
    goog.bind.apply(null, arguments);
}, goog.partial = function(e, t) {
    var r = Array.prototype.slice.call(arguments, 1);
    return function() {
        var t = r.slice();
        return t.push.apply(t, arguments), e.apply(this, t);
    };
}, goog.mixin = function(e, t) {
    for (var r in t) e[r] = t[r];
}, goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date();
}, goog.globalEval = function(e) {
    if (goog.global.execScript) goog.global.execScript(e, "JavaScript"); else {
        if (!goog.global.eval) throw Error("goog.globalEval not available");
        if (null == goog.evalWorksForGlobals_) {
            try {
                goog.global.eval("var _evalTest_ = 1;");
            } catch (e) {}
            if (void 0 !== goog.global._evalTest_) {
                try {
                    delete goog.global._evalTest_;
                } catch (e) {}
                goog.evalWorksForGlobals_ = !0;
            } else goog.evalWorksForGlobals_ = !1;
        }
        if (goog.evalWorksForGlobals_) goog.global.eval(e); else {
            var t = window.document, r = t.createElement("SCRIPT");
            r.type = "text/javascript", r.defer = !1, r.appendChild(t.createTextNode(e)), t.head.appendChild(r), 
            t.head.removeChild(r);
        }
    }
}, goog.evalWorksForGlobals_ = null, goog.getCssName = function(e, t) {
    if ("." == String(e).charAt(0)) throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + e);
    var r = function(e) {
        return goog.cssNameMapping_[e] || e;
    }, o = function(e) {
        e = e.split("-");
        for (var t = [], o = 0; o < e.length; o++) t.push(r(e[o]));
        return t.join("-");
    };
    return o = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? r : o : function(e) {
        return e;
    }, e = t ? e + "-" + o(t) : o(e), goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(e) : e;
}, goog.setCssNameMapping = function(e, t) {
    goog.cssNameMapping_ = e, goog.cssNameMappingStyle_ = t;
}, !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING), 
goog.getMsg = function(e, t) {
    return t && (e = e.replace(/\{\$([^}]+)}/g, function(e, r) {
        return null != t && r in t ? t[r] : e;
    })), e;
}, goog.getMsgWithFallback = function(e, t) {
    return e;
}, goog.exportSymbol = function(e, t, r) {
    goog.exportPath_(e, t, r);
}, goog.exportProperty = function(e, t, r) {
    e[t] = r;
}, goog.inherits = function(e, t) {
    function r() {}
    r.prototype = t.prototype, e.superClass_ = t.prototype, e.prototype = new r(), e.prototype.constructor = e, 
    e.base = function(e, r, o) {
        for (var s = Array(arguments.length - 2), i = 2; i < arguments.length; i++) s[i - 2] = arguments[i];
        return t.prototype[r].apply(e, s);
    };
}, goog.base = function(e, t, r) {
    var o = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !o) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (o.superClass_) {
        for (var s = Array(arguments.length - 1), i = 1; i < arguments.length; i++) s[i - 1] = arguments[i];
        return o.superClass_.constructor.apply(e, s);
    }
    for (s = Array(arguments.length - 2), i = 2; i < arguments.length; i++) s[i - 2] = arguments[i];
    i = !1;
    for (var n = e.constructor; n; n = n.superClass_ && n.superClass_.constructor) if (n.prototype[t] === o) i = !0; else if (i) return n.prototype[t].apply(e, s);
    if (e[t] === o) return e.constructor.prototype[t].apply(e, s);
    throw Error("goog.base called from a method of one name to a method of a different name");
}, goog.scope = function(e) {
    if (goog.isInModuleLoader_()) throw Error("goog.scope is not supported within a goog.module.");
    e.call(goog.global);
}, COMPILED || (goog.global.COMPILED = COMPILED), goog.defineClass = function(e, t) {
    var r = t.constructor, o = t.statics;
    return r && r != Object.prototype.constructor || (r = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    }), r = goog.defineClass.createSealingConstructor_(r, e), e && goog.inherits(r, e), 
    delete t.constructor, delete t.statics, goog.defineClass.applyProperties_(r.prototype, t), 
    null != o && (o instanceof Function ? o(r) : goog.defineClass.applyProperties_(r, o)), 
    r;
}, goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG, goog.defineClass.createSealingConstructor_ = function(e, t) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES) return e;
    var r = !goog.defineClass.isUnsealable_(t);
    return function t() {
        var o = e.apply(this, arguments) || this;
        return o[goog.UID_PROPERTY_] = o[goog.UID_PROPERTY_], this.constructor === t && r && Object.seal instanceof Function && Object.seal(o), 
        o;
    };
}, goog.defineClass.isUnsealable_ = function(e) {
    return e && e.prototype && e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
}, goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), 
goog.defineClass.applyProperties_ = function(e, t) {
    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    for (var o = 0; o < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; o++) r = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[o], 
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
}, goog.tagUnsealableClass = function(e) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
}, goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable", 
goog.DEPENDENCIES_ENABLED && (goog.inHtmlDocument_ = function() {
    var e = window.document;
    return null != e && "write" in e;
}, goog.findBasePath_ = function() {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH) && goog.isString(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH; else if (goog.inHtmlDocument_()) {
        var e = window.document, t = e.currentScript;
        for (t = (e = t ? [ t ] : e.getElementsByTagName("SCRIPT")).length - 1; 0 <= t; --t) {
            var r = e[t].src, o = r.lastIndexOf("?");
            if (o = -1 == o ? r.length : o, "base.js" == r.substr(o - 7, 7)) {
                goog.basePath = r.substr(0, o - 7);
                break;
            }
        }
    }
}, goog.findBasePath_(), goog.Transpiler = function() {
    this.requiresTranspilation_ = null;
}, goog.Transpiler.prototype.createRequiresTranspilation_ = function() {
    function a(e, t) {
        d ? c[e] = !0 : t() ? c[e] = !1 : d = c[e] = !0;
    }
    function b(a) {
        try {
            return !!eval(a);
        } catch (e) {
            return !1;
        }
    }
    var c = {
        es3: !1
    }, d = !1, e = _window.navigator && _window.navigator.userAgent ? _window.userAgent : "";
    return a("es5", function() {
        return b("[1,].length==1");
    }), a("es6", function() {
        var t = e.match(/Edge\/(\d+)(\.\d)*/i);
        return !(t && 15 > Number(t[1])) && b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()');
    }), a("es6-impl", function() {
        return !0;
    }), a("es7", function() {
        return b("2 ** 2 == 4");
    }), a("es8", function() {
        return b("async () => 1, true");
    }), c;
}, goog.Transpiler.prototype.needsTranspile = function(e) {
    if ("always" == goog.TRANSPILE) return !0;
    if ("never" == goog.TRANSPILE) return !1;
    if (this.requiresTranspilation_ || (this.requiresTranspilation_ = this.createRequiresTranspilation_()), 
    e in this.requiresTranspilation_) return this.requiresTranspilation_[e];
    throw Error("Unknown language mode: " + e);
}, goog.Transpiler.prototype.transpile = function(e, t) {
    return goog.transpile_(e, t);
}, goog.transpiler_ = new goog.Transpiler(), goog.DebugLoader = function() {
    this.dependencies_ = {
        loadFlags: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {},
        deferred: {}
    }, this.oldIeWaiting_ = !1, this.queuedModules_ = [], this.lastNonModuleScriptIndex_ = 0;
}, goog.DebugLoader.IS_OLD_IE_ = !(goog.global.atob || !window.document || !window.document.all), 
goog.DebugLoader.prototype.earlyProcessLoad = function(e) {
    goog.DebugLoader.IS_OLD_IE_ && this.maybeProcessDeferredDep_(e);
}, goog.DebugLoader.prototype.load = function(e) {
    var t = this.getPathFromDeps_(e);
    if (!t) throw e = "goog.require could not find: " + e, this.logToConsole(e), Error(e);
    var r = [], o = {}, s = this.dependencies_, i = this;
    for (function e(t) {
        if (!(t in s.written || t in s.visited)) {
            if (s.visited[t] = !0, t in s.requires) for (var n in s.requires[t]) if (!i.isProvided(n)) {
                if (!(n in s.nameToPath)) throw Error("Undefined nameToPath for " + n);
                e(s.nameToPath[n]);
            }
            t in o || (o[t] = !0, r.push(t));
        }
    }(t), e = 0; e < r.length; e++) t = r[e], this.dependencies_.written[t] = !0;
    for (e = 0; e < r.length; e++) {
        if (!(t = r[e])) throw Error("Undefined script input");
        var n = s.loadFlags[t] || {}, a = n.lang || "es3";
        a = this.getTranspiler().needsTranspile(a), "goog" == n.module || a ? this.importProcessedScript_(goog.basePath + t, "goog" == n.module, a) : this.importScript_(goog.basePath + t);
    }
}, goog.DebugLoader.prototype.addDependency = function(e, t, r, o) {
    var s;
    e = e.replace(/\\/g, "/");
    var i = this.dependencies_;
    o && "boolean" != typeof o || (o = o ? {
        module: "goog"
    } : {});
    for (var n = 0; s = t[n]; n++) i.nameToPath[s] = e, i.loadFlags[e] = o;
    for (o = 0; t = r[o]; o++) e in i.requires || (i.requires[e] = {}), i.requires[e][t] = !0;
}, goog.DebugLoader.prototype.importScript_ = function(e, t) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.bind(this.writeScriptTag_, this))(e, t) && (this.dependencies_.written[e] = !0);
}, goog.DebugLoader.prototype.importProcessedScript_ = function(e, t, r) {
    this.importScript_("", 'goog.debugLoader_.retrieveAndExec_("' + e + '", ' + t + ", " + r + ");");
}, goog.DebugLoader.prototype.retrieveAndExec_ = function(e, t, r) {
    if (!COMPILED) {
        var o = e;
        e = this.normalizePath(e);
        var s = goog.global.CLOSURE_IMPORT_SCRIPT || goog.bind(this.writeScriptTag_, this), i = this.loadFileSync(e);
        if (null == i) throw Error('Load of "' + e + '" failed');
        r && (i = this.getTranspiler().transpile(i, e)), i = t ? this.wrapModule_(e, i) : i + "\n//# sourceURL=" + e, 
        goog.DebugLoader.IS_OLD_IE_ && this.oldIeWaiting_ ? (this.dependencies_.deferred[o] = i, 
        this.queuedModules_.push(o)) : s(e, i);
    }
}, goog.DebugLoader.prototype.wrapModule_ = function(e, t) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(t + "\n//# sourceURL=" + e + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + t + "\n;return exports});\n//# sourceURL=" + e + "\n";
}, goog.DebugLoader.prototype.loadQueuedModules_ = function() {
    var e = this.queuedModules_.length;
    if (0 < e) {
        var t = this.queuedModules_;
        this.queuedModules_ = [];
        for (var r = 0; r < e; r++) this.maybeProcessDeferredPath_(t[r]);
    }
    this.oldIeWaiting_ = !1;
}, goog.DebugLoader.prototype.maybeProcessDeferredDep_ = function(e) {
    this.isDeferredModule_(e) && this.allDepsAreAvailable_(e) && (e = this.getPathFromDeps_(e), 
    this.maybeProcessDeferredPath_(goog.basePath + e));
}, goog.DebugLoader.prototype.isDeferredModule_ = function(e) {
    var t = (e = this.getPathFromDeps_(e)) && this.dependencies_.loadFlags[e] || {}, r = t.lang || "es3";
    return !(!e || "goog" != t.module && !this.getTranspiler().needsTranspile(r)) && goog.basePath + e in this.dependencies_.deferred;
}, goog.DebugLoader.prototype.allDepsAreAvailable_ = function(e) {
    if ((e = this.getPathFromDeps_(e)) && e in this.dependencies_.requires) for (var t in this.dependencies_.requires[e]) if (!this.isProvided(t) && !this.isDeferredModule_(t)) return !1;
    return !0;
}, goog.DebugLoader.prototype.maybeProcessDeferredPath_ = function(e) {
    if (e in this.dependencies_.deferred) {
        var t = this.dependencies_.deferred[e];
        delete this.dependencies_.deferred[e], goog.globalEval(t);
    }
}, goog.DebugLoader.prototype.writeScriptSrcNode_ = function(e) {
    window.document.write('<script type="text/javascript" src="' + e + '"><\/script>');
}, goog.DebugLoader.prototype.appendScriptSrcNode_ = function(e) {
    var t = window.document, r = t.createElement("script");
    r.type = "text/javascript", r.src = e, r.defer = !1, r.async = !1, t.head.appendChild(r);
}, goog.DebugLoader.prototype.writeScriptTag_ = function(e, t) {
    if (this.inHtmlDocument()) {
        var r = window.document;
        if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == r.readyState) {
            if (/\bdeps.js$/.test(e)) return !1;
            throw Error('Cannot write "' + e + '" after document load');
        }
        return void 0 === t ? goog.DebugLoader.IS_OLD_IE_ ? (this.oldIeWaiting_ = !0, t = " onreadystatechange='goog.debugLoader_.onScriptLoad_(this, " + ++this.lastNonModuleScriptIndex_ + ")' ", 
        r.write('<script type="text/javascript" src="' + e + '"' + t + "><\/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? this.appendScriptSrcNode_(e) : this.writeScriptSrcNode_(e) : r.write('<script type="text/javascript">' + this.protectScriptTag_(t) + "<\/script>"), 
        !0;
    }
    return !1;
}, goog.DebugLoader.prototype.protectScriptTag_ = function(e) {
    return e.replace(/<\/(SCRIPT)/gi, "\\x3c/$1");
}, goog.DebugLoader.prototype.onScriptLoad_ = function(e, t) {
    return "complete" == e.readyState && this.lastNonModuleScriptIndex_ == t && this.loadQueuedModules_(), 
    !0;
}, goog.DebugLoader.prototype.getPathFromDeps_ = function(e) {
    return e in this.dependencies_.nameToPath ? this.dependencies_.nameToPath[e] : null;
}, goog.DebugLoader.prototype.getTranspiler = function() {
    return goog.transpiler_;
}, goog.DebugLoader.prototype.isProvided = function(e) {
    return goog.isProvided_(e);
}, goog.DebugLoader.prototype.inHtmlDocument = function() {
    return goog.inHtmlDocument_();
}, goog.DebugLoader.prototype.logToConsole = function(e) {
    goog.logToConsole_(e);
}, goog.DebugLoader.prototype.loadFileSync = function(e) {
    return goog.loadFileSync_(e);
}, goog.DebugLoader.prototype.normalizePath = function(e) {
    return goog.normalizePath_(e);
}, goog.debugLoader_ = null, goog.registerDebugLoader = function(e) {
    if (goog.debugLoader_) throw Error("Debug loader already registered!");
    if (!(e instanceof goog.DebugLoader)) throw Error("Not a goog.DebugLoader.");
    goog.debugLoader_ = e;
}, goog.getLoader_ = function() {
    if (!goog.debugLoader_ && goog.DEBUG_LOADER) throw Error("Loaded debug loader file but no loader was registered!");
    return goog.debugLoader_ || (goog.debugLoader_ = new goog.DebugLoader()), goog.debugLoader_;
}, function() {
    if (goog.DEBUG_LOADER) {
        var e = new goog.DebugLoader();
        e.importScript_(goog.basePath + goog.DEBUG_LOADER);
    }
    goog.global.CLOSURE_NO_DEPS || (e = e || new goog.DebugLoader(), goog.DEBUG_LOADER || goog.registerDebugLoader(e), 
    e.importScript_(goog.basePath + "deps.js"));
}());

var mimc = {
    md5: {}
};

!function(e) {
    function t(e, t) {
        var r = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r;
    }
    function r(e, r, o, s, i, n) {
        return e = t(t(r, e), t(s, n)), t(e << i | e >>> 32 - i, o);
    }
    function o(e, t, o, s, i, n, a) {
        return r(t & o | ~t & s, e, t, i, n, a);
    }
    function s(e, t, o, s, i, n, a) {
        return r(t & s | o & ~s, e, t, i, n, a);
    }
    function i(e, t, o, s, i, n, a) {
        return r(o ^ (t | ~s), e, t, i, n, a);
    }
    function n(e, n) {
        e[n >> 5] |= 128 << n % 32, e[14 + (n + 64 >>> 9 << 4)] = n;
        var a = 1732584193, p = -271733879, g = -1732584194, u = 271733878;
        for (n = 0; n < e.length; n += 16) {
            var l = a, c = p, d = g, f = u;
            p = i(p = i(p = i(p = i(p = r((g = r((u = r((a = r((p = r((g = r((u = r((a = r((p = r((g = r((u = r((a = r((p = r((g = r((u = r((a = r((p = s(p = s(p = s(p = s(p = o(p = o(p = o(p = o(p, g = o(g, u = o(u, a = o(a, p, g, u, e[n], 7, -680876936), p, g, e[n + 1], 12, -389564586), a, p, e[n + 2], 17, 606105819), u, a, e[n + 3], 22, -1044525330), g = o(g, u = o(u, a = o(a, p, g, u, e[n + 4], 7, -176418897), p, g, e[n + 5], 12, 1200080426), a, p, e[n + 6], 17, -1473231341), u, a, e[n + 7], 22, -45705983), g = o(g, u = o(u, a = o(a, p, g, u, e[n + 8], 7, 1770035416), p, g, e[n + 9], 12, -1958414417), a, p, e[n + 10], 17, -42063), u, a, e[n + 11], 22, -1990404162), g = o(g, u = o(u, a = o(a, p, g, u, e[n + 12], 7, 1804603682), p, g, e[n + 13], 12, -40341101), a, p, e[n + 14], 17, -1502002290), u, a, e[n + 15], 22, 1236535329), g = s(g, u = s(u, a = s(a, p, g, u, e[n + 1], 5, -165796510), p, g, e[n + 6], 9, -1069501632), a, p, e[n + 11], 14, 643717713), u, a, e[n], 20, -373897302), g = s(g, u = s(u, a = s(a, p, g, u, e[n + 5], 5, -701558691), p, g, e[n + 10], 9, 38016083), a, p, e[n + 15], 14, -660478335), u, a, e[n + 4], 20, -405537848), g = s(g, u = s(u, a = s(a, p, g, u, e[n + 9], 5, 568446438), p, g, e[n + 14], 9, -1019803690), a, p, e[n + 3], 14, -187363961), u, a, e[n + 8], 20, 1163531501), g = s(g, u = s(u, a = s(a, p, g, u, e[n + 13], 5, -1444681467), p, g, e[n + 2], 9, -51403784), a, p, e[n + 7], 14, 1735328473), u, a, e[n + 12], 20, -1926607734)) ^ g ^ u, a, p, e[n + 5], 4, -378558)) ^ p ^ g, u, a, e[n + 8], 11, -2022574463)) ^ a ^ p, g, u, e[n + 11], 16, 1839030562)) ^ u ^ a, p, g, e[n + 14], 23, -35309556)) ^ g ^ u, a, p, e[n + 1], 4, -1530992060)) ^ p ^ g, u, a, e[n + 4], 11, 1272893353)) ^ a ^ p, g, u, e[n + 7], 16, -155497632)) ^ u ^ a, p, g, e[n + 10], 23, -1094730640)) ^ g ^ u, a, p, e[n + 13], 4, 681279174)) ^ p ^ g, u, a, e[n], 11, -358537222)) ^ a ^ p, g, u, e[n + 3], 16, -722521979)) ^ u ^ a, p, g, e[n + 6], 23, 76029189)) ^ g ^ u, a, p, e[n + 9], 4, -640364487)) ^ p ^ g, u, a, e[n + 12], 11, -421815835)) ^ a ^ p, g, u, e[n + 15], 16, 530742520)) ^ u ^ a, p, g, e[n + 2], 23, -995338651), g = i(g, u = i(u, a = i(a, p, g, u, e[n], 6, -198630844), p, g, e[n + 7], 10, 1126891415), a, p, e[n + 14], 15, -1416354905), u, a, e[n + 5], 21, -57434055), g = i(g, u = i(u, a = i(a, p, g, u, e[n + 12], 6, 1700485571), p, g, e[n + 3], 10, -1894986606), a, p, e[n + 10], 15, -1051523), u, a, e[n + 1], 21, -2054922799), g = i(g, u = i(u, a = i(a, p, g, u, e[n + 8], 6, 1873313359), p, g, e[n + 15], 10, -30611744), a, p, e[n + 6], 15, -1560198380), u, a, e[n + 13], 21, 1309151649), g = i(g, u = i(u, a = i(a, p, g, u, e[n + 4], 6, -145523070), p, g, e[n + 11], 10, -1120210379), a, p, e[n + 2], 15, 718787259), u, a, e[n + 9], 21, -343485551), 
            a = t(a, l), p = t(p, c), g = t(g, d), u = t(u, f);
        }
        return [ a, p, g, u ];
    }
    function a(e) {
        var t, r = "", o = 32 * e.length;
        for (t = 0; t < o; t += 8) r += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return r;
    }
    function p(e) {
        var t, r = [];
        for (r[(e.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var o = 8 * e.length;
        for (t = 0; t < o; t += 8) r[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return r;
    }
    function g(e) {
        return a(n(p(e), 8 * e.length));
    }
    function u(e, t) {
        var r = p(e), o = [], s = [];
        for (o[15] = s[15] = void 0, 16 < r.length && (r = n(r, 8 * e.length)), e = 0; 16 > e; e += 1) o[e] = 909522486 ^ r[e], 
        s[e] = 1549556828 ^ r[e];
        return t = n(o.concat(p(t)), 512 + 8 * t.length), a(n(s.concat(t), 640));
    }
    function l(e) {
        var t, r = "";
        for (t = 0; t < e.length; t += 1) {
            var o = e.charCodeAt(t);
            r += "0123456789abcdef".charAt(o >>> 4 & 15) + "0123456789abcdef".charAt(15 & o);
        }
        return r;
    }
    function c(e, t, r) {
        return t ? r ? e = u(unescape(encodeURIComponent(t)), unescape(encodeURIComponent(e))) : (e = u(unescape(encodeURIComponent(t)), unescape(encodeURIComponent(e))), 
        e = l(e)) : e = r ? g(unescape(encodeURIComponent(e))) : l(g(unescape(encodeURIComponent(e)))), 
        e;
    }
    "function" == typeof define && define.amd ? define(function() {
        return c;
    }) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = c : e.md5 = c;
}(void 0);

var jspb = {
    BinaryConstants: {},
    ConstBinaryMessage: function() {},
    BinaryMessage: function() {}
};

jspb.BinaryConstants.FieldType = {
    INVALID: -1,
    DOUBLE: 1,
    FLOAT: 2,
    INT64: 3,
    UINT64: 4,
    INT32: 5,
    FIXED64: 6,
    FIXED32: 7,
    BOOL: 8,
    STRING: 9,
    GROUP: 10,
    MESSAGE: 11,
    BYTES: 12,
    UINT32: 13,
    ENUM: 14,
    SFIXED32: 15,
    SFIXED64: 16,
    SINT32: 17,
    SINT64: 18,
    FHASH64: 30,
    VHASH64: 31
}, jspb.BinaryConstants.WireType = {
    INVALID: -1,
    VARINT: 0,
    FIXED64: 1,
    DELIMITED: 2,
    START_GROUP: 3,
    END_GROUP: 4,
    FIXED32: 5
}, jspb.BinaryConstants.FieldTypeToWireType = function(e) {
    var t = jspb.BinaryConstants.FieldType, r = jspb.BinaryConstants.WireType;
    switch (e) {
      case t.INT32:
      case t.INT64:
      case t.UINT32:
      case t.UINT64:
      case t.SINT32:
      case t.SINT64:
      case t.BOOL:
      case t.ENUM:
      case t.VHASH64:
        return r.VARINT;

      case t.DOUBLE:
      case t.FIXED64:
      case t.SFIXED64:
      case t.FHASH64:
        return r.FIXED64;

      case t.STRING:
      case t.MESSAGE:
      case t.BYTES:
        return r.DELIMITED;

      case t.FLOAT:
      case t.FIXED32:
      case t.SFIXED32:
        return r.FIXED32;

      default:
        return r.INVALID;
    }
}, jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1, jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817e-45, 
jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875e-38, jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886e38, 
jspb.BinaryConstants.FLOAT64_EPS = 5e-324, jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014e-308, 
jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157e308, jspb.BinaryConstants.TWO_TO_20 = 1048576, 
jspb.BinaryConstants.TWO_TO_23 = 8388608, jspb.BinaryConstants.TWO_TO_31 = 2147483648, 
jspb.BinaryConstants.TWO_TO_32 = 4294967296, jspb.BinaryConstants.TWO_TO_52 = 4503599627370496, 
jspb.BinaryConstants.TWO_TO_63 = 0x8000000000000000, jspb.BinaryConstants.TWO_TO_64 = 0x10000000000000000, 
jspb.BinaryConstants.ZERO_HASH = "\0\0\0\0\0\0\0\0", goog.dom = {}, goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
}, goog.debug = {}, goog.debug.Error = function(e) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error); else {
        var t = Error().stack;
        t && (this.stack = t);
    }
    e && (this.message = String(e)), this.reportErrorToServer = !0;
}, goog.inherits(goog.debug.Error, Error), goog.debug.Error.prototype.name = "CustomError", 
goog.asserts = {}, goog.asserts.ENABLE_ASSERTS = goog.DEBUG, goog.asserts.AssertionError = function(e, t) {
    goog.debug.Error.call(this, goog.asserts.subs_(e, t)), this.messagePattern = e;
}, goog.inherits(goog.asserts.AssertionError, goog.debug.Error), goog.asserts.AssertionError.prototype.name = "AssertionError", 
goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
    throw e;
}, goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER, goog.asserts.subs_ = function(e, t) {
    for (var r = "", o = (e = e.split("%s")).length - 1, s = 0; s < o; s++) r += e[s] + (s < t.length ? t[s] : "%s");
    return r + e[o];
}, goog.asserts.doAssertFailure_ = function(e, t, r, o) {
    var s = "Assertion failed";
    if (r) {
        s += ": " + r;
        var i = o;
    } else e && (s += ": " + e, i = t);
    e = new goog.asserts.AssertionError("" + s, i || []), goog.asserts.errorHandler_(e);
}, goog.asserts.setErrorHandler = function(e) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = e);
}, goog.asserts.assert = function(e, t, r) {
    return goog.asserts.ENABLE_ASSERTS && !e && goog.asserts.doAssertFailure_("", null, t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.fail = function(e, t) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (e ? ": " + e : ""), Array.prototype.slice.call(arguments, 1)));
}, goog.asserts.assertNumber = function(e, t, r) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isNumber(e) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertString = function(e, t, r) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isString(e) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertFunction = function(e, t, r) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isFunction(e) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertObject = function(e, t, r) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isObject(e) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertArray = function(e, t, r) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isArray(e) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertBoolean = function(e, t, r) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(e) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertElement = function(e, t, r) {
    return !goog.asserts.ENABLE_ASSERTS || goog.isObject(e) && e.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertInstanceof = function(e, t, r, o) {
    return !goog.asserts.ENABLE_ASSERTS || e instanceof t || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [ goog.asserts.getType_(t), goog.asserts.getType_(e) ], r, Array.prototype.slice.call(arguments, 3)), 
    e;
}, goog.asserts.assertFinite = function(e, t, r) {
    return !goog.asserts.ENABLE_ASSERTS || "number" == typeof e && isFinite(e) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [ e ], t, Array.prototype.slice.call(arguments, 2)), 
    e;
}, goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var e in Object.prototype) goog.asserts.fail(e + " should not be enumerable in Object.prototype.");
}, goog.asserts.getType_ = function(e) {
    return e instanceof Function ? e.displayName || e.name || "unknown type name" : e instanceof Object ? e.constructor.displayName || e.constructor.name || Object.prototype.toString.call(e) : null === e ? "null" : void 0 === e ? "undefined" : _typeof(e);
}, goog.array = {}, goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE, goog.array.ASSUME_NATIVE_FUNCTIONS = !1, 
goog.array.peek = function(e) {
    return e[e.length - 1];
}, goog.array.last = goog.array.peek, goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(e, t, r) {
    return goog.asserts.assert(null != e.length), Array.prototype.indexOf.call(e, t, r);
} : function(e, t, r) {
    if (r = null == r ? 0 : 0 > r ? Math.max(0, e.length + r) : r, goog.isString(e)) return goog.isString(t) && 1 == t.length ? e.indexOf(t, r) : -1;
    for (;r < e.length; r++) if (r in e && e[r] === t) return r;
    return -1;
}, goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(e, t, r) {
    return goog.asserts.assert(null != e.length), Array.prototype.lastIndexOf.call(e, t, null == r ? e.length - 1 : r);
} : function(e, t, r) {
    if (0 > (r = null == r ? e.length - 1 : r) && (r = Math.max(0, e.length + r)), goog.isString(e)) return goog.isString(t) && 1 == t.length ? e.lastIndexOf(t, r) : -1;
    for (;0 <= r; r--) if (r in e && e[r] === t) return r;
    return -1;
}, goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(e, t, r) {
    goog.asserts.assert(null != e.length), Array.prototype.forEach.call(e, t, r);
} : function(e, t, r) {
    for (var o = e.length, s = goog.isString(e) ? e.split("") : e, i = 0; i < o; i++) i in s && t.call(r, s[i], i, e);
}, goog.array.forEachRight = function(e, t, r) {
    var o = e.length, s = goog.isString(e) ? e.split("") : e;
    for (--o; 0 <= o; --o) o in s && t.call(r, s[o], o, e);
}, goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(e, t, r) {
    return goog.asserts.assert(null != e.length), Array.prototype.filter.call(e, t, r);
} : function(e, t, r) {
    for (var o = e.length, s = [], i = 0, n = goog.isString(e) ? e.split("") : e, a = 0; a < o; a++) if (a in n) {
        var p = n[a];
        t.call(r, p, a, e) && (s[i++] = p);
    }
    return s;
}, goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(e, t, r) {
    return goog.asserts.assert(null != e.length), Array.prototype.map.call(e, t, r);
} : function(e, t, r) {
    for (var o = e.length, s = Array(o), i = goog.isString(e) ? e.split("") : e, n = 0; n < o; n++) n in i && (s[n] = t.call(r, i[n], n, e));
    return s;
}, goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(e, t, r, o) {
    return goog.asserts.assert(null != e.length), o && (t = goog.bind(t, o)), Array.prototype.reduce.call(e, t, r);
} : function(e, t, r, o) {
    var s = r;
    return goog.array.forEach(e, function(r, i) {
        s = t.call(o, s, r, i, e);
    }), s;
}, goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(e, t, r, o) {
    return goog.asserts.assert(null != e.length), goog.asserts.assert(null != t), o && (t = goog.bind(t, o)), 
    Array.prototype.reduceRight.call(e, t, r);
} : function(e, t, r, o) {
    var s = r;
    return goog.array.forEachRight(e, function(r, i) {
        s = t.call(o, s, r, i, e);
    }), s;
}, goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(e, t, r) {
    return goog.asserts.assert(null != e.length), Array.prototype.some.call(e, t, r);
} : function(e, t, r) {
    for (var o = e.length, s = goog.isString(e) ? e.split("") : e, i = 0; i < o; i++) if (i in s && t.call(r, s[i], i, e)) return !0;
    return !1;
}, goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(e, t, r) {
    return goog.asserts.assert(null != e.length), Array.prototype.every.call(e, t, r);
} : function(e, t, r) {
    for (var o = e.length, s = goog.isString(e) ? e.split("") : e, i = 0; i < o; i++) if (i in s && !t.call(r, s[i], i, e)) return !1;
    return !0;
}, goog.array.count = function(e, t, r) {
    var o = 0;
    return goog.array.forEach(e, function(e, s, i) {
        t.call(r, e, s, i) && ++o;
    }, r), o;
}, goog.array.find = function(e, t, r) {
    return 0 > (t = goog.array.findIndex(e, t, r)) ? null : goog.isString(e) ? e.charAt(t) : e[t];
}, goog.array.findIndex = function(e, t, r) {
    for (var o = e.length, s = goog.isString(e) ? e.split("") : e, i = 0; i < o; i++) if (i in s && t.call(r, s[i], i, e)) return i;
    return -1;
}, goog.array.findRight = function(e, t, r) {
    return 0 > (t = goog.array.findIndexRight(e, t, r)) ? null : goog.isString(e) ? e.charAt(t) : e[t];
}, goog.array.findIndexRight = function(e, t, r) {
    var o = e.length, s = goog.isString(e) ? e.split("") : e;
    for (--o; 0 <= o; o--) if (o in s && t.call(r, s[o], o, e)) return o;
    return -1;
}, goog.array.contains = function(e, t) {
    return 0 <= goog.array.indexOf(e, t);
}, goog.array.isEmpty = function(e) {
    return 0 == e.length;
}, goog.array.clear = function(e) {
    if (!goog.isArray(e)) for (var t = e.length - 1; 0 <= t; t--) delete e[t];
    e.length = 0;
}, goog.array.insert = function(e, t) {
    goog.array.contains(e, t) || e.push(t);
}, goog.array.insertAt = function(e, t, r) {
    goog.array.splice(e, r, 0, t);
}, goog.array.insertArrayAt = function(e, t, r) {
    goog.partial(goog.array.splice, e, r, 0).apply(null, t);
}, goog.array.insertBefore = function(e, t, r) {
    var o;
    2 == arguments.length || 0 > (o = goog.array.indexOf(e, r)) ? e.push(t) : goog.array.insertAt(e, t, o);
}, goog.array.remove = function(e, t) {
    var r;
    return (r = 0 <= (t = goog.array.indexOf(e, t))) && goog.array.removeAt(e, t), r;
}, goog.array.removeLast = function(e, t) {
    return 0 <= (t = goog.array.lastIndexOf(e, t)) && (goog.array.removeAt(e, t), !0);
}, goog.array.removeAt = function(e, t) {
    return goog.asserts.assert(null != e.length), 1 == Array.prototype.splice.call(e, t, 1).length;
}, goog.array.removeIf = function(e, t, r) {
    return 0 <= (t = goog.array.findIndex(e, t, r)) && (goog.array.removeAt(e, t), !0);
}, goog.array.removeAllIf = function(e, t, r) {
    var o = 0;
    return goog.array.forEachRight(e, function(s, i) {
        t.call(r, s, i, e) && goog.array.removeAt(e, i) && o++;
    }), o;
}, goog.array.concat = function(e) {
    return Array.prototype.concat.apply([], arguments);
}, goog.array.join = function(e) {
    return Array.prototype.concat.apply([], arguments);
}, goog.array.toArray = function(e) {
    var t = e.length;
    if (0 < t) {
        for (var r = Array(t), o = 0; o < t; o++) r[o] = e[o];
        return r;
    }
    return [];
}, goog.array.clone = goog.array.toArray, goog.array.extend = function(e, t) {
    for (var r = 1; r < arguments.length; r++) {
        var o = arguments[r];
        if (goog.isArrayLike(o)) {
            var s = e.length || 0, i = o.length || 0;
            e.length = s + i;
            for (var n = 0; n < i; n++) e[s + n] = o[n];
        } else e.push(o);
    }
}, goog.array.splice = function(e, t, r, o) {
    return goog.asserts.assert(null != e.length), Array.prototype.splice.apply(e, goog.array.slice(arguments, 1));
}, goog.array.slice = function(e, t, r) {
    return goog.asserts.assert(null != e.length), 2 >= arguments.length ? Array.prototype.slice.call(e, t) : Array.prototype.slice.call(e, t, r);
}, goog.array.removeDuplicates = function(e, t, r) {
    t = t || e;
    var o = function(e) {
        return goog.isObject(e) ? "o" + goog.getUid(e) : (void 0 === e ? "undefined" : _typeof(e)).charAt(0) + e;
    };
    r = r || o, o = {};
    for (var s = 0, i = 0; i < e.length; ) {
        var n = e[i++], a = r(n);
        Object.prototype.hasOwnProperty.call(o, a) || (o[a] = !0, t[s++] = n);
    }
    t.length = s;
}, goog.array.binarySearch = function(e, t, r) {
    return goog.array.binarySearch_(e, r || goog.array.defaultCompare, !1, t);
}, goog.array.binarySelect = function(e, t, r) {
    return goog.array.binarySearch_(e, t, !0, void 0, r);
}, goog.array.binarySearch_ = function(e, t, r, o, s) {
    for (var i, n = 0, a = e.length; n < a; ) {
        var p = n + a >> 1, g = r ? t.call(s, e[p], p, e) : t(o, e[p]);
        0 < g ? n = p + 1 : (a = p, i = !g);
    }
    return i ? n : ~n;
}, goog.array.sort = function(e, t) {
    e.sort(t || goog.array.defaultCompare);
}, goog.array.stableSort = function(e, t) {
    for (var r = Array(e.length), o = 0; o < e.length; o++) r[o] = {
        index: o,
        value: e[o]
    };
    var s = t || goog.array.defaultCompare;
    for (goog.array.sort(r, function(e, t) {
        return s(e.value, t.value) || e.index - t.index;
    }), o = 0; o < e.length; o++) e[o] = r[o].value;
}, goog.array.sortByKey = function(e, t, r) {
    var o = r || goog.array.defaultCompare;
    goog.array.sort(e, function(e, r) {
        return o(t(e), t(r));
    });
}, goog.array.sortObjectsByKey = function(e, t, r) {
    goog.array.sortByKey(e, function(e) {
        return e[t];
    }, r);
}, goog.array.isSorted = function(e, t, r) {
    t = t || goog.array.defaultCompare;
    for (var o = 1; o < e.length; o++) {
        var s = t(e[o - 1], e[o]);
        if (0 < s || 0 == s && r) return !1;
    }
    return !0;
}, goog.array.equals = function(e, t, r) {
    if (!goog.isArrayLike(e) || !goog.isArrayLike(t) || e.length != t.length) return !1;
    var o = e.length;
    r = r || goog.array.defaultCompareEquality;
    for (var s = 0; s < o; s++) if (!r(e[s], t[s])) return !1;
    return !0;
}, goog.array.compare3 = function(e, t, r) {
    r = r || goog.array.defaultCompare;
    for (var o = Math.min(e.length, t.length), s = 0; s < o; s++) {
        var i = r(e[s], t[s]);
        if (0 != i) return i;
    }
    return goog.array.defaultCompare(e.length, t.length);
}, goog.array.defaultCompare = function(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
}, goog.array.inverseDefaultCompare = function(e, t) {
    return -goog.array.defaultCompare(e, t);
}, goog.array.defaultCompareEquality = function(e, t) {
    return e === t;
}, goog.array.binaryInsert = function(e, t, r) {
    return 0 > (r = goog.array.binarySearch(e, t, r)) && (goog.array.insertAt(e, t, -(r + 1)), 
    !0);
}, goog.array.binaryRemove = function(e, t, r) {
    return 0 <= (t = goog.array.binarySearch(e, t, r)) && goog.array.removeAt(e, t);
}, goog.array.bucket = function(e, t, r) {
    for (var o = {}, s = 0; s < e.length; s++) {
        var i = e[s], n = t.call(r, i, s, e);
        goog.isDef(n) && (o[n] || (o[n] = [])).push(i);
    }
    return o;
}, goog.array.toObject = function(e, t, r) {
    var o = {};
    return goog.array.forEach(e, function(s, i) {
        o[t.call(r, s, i, e)] = s;
    }), o;
}, goog.array.range = function(e, t, r) {
    var o = [], s = 0, i = e;
    if (r = r || 1, void 0 !== t && (s = e, i = t), 0 > r * (i - s)) return [];
    if (0 < r) for (e = s; e < i; e += r) o.push(e); else for (e = s; e > i; e += r) o.push(e);
    return o;
}, goog.array.repeat = function(e, t) {
    for (var r = [], o = 0; o < t; o++) r[o] = e;
    return r;
}, goog.array.flatten = function(e) {
    for (var t = [], r = 0; r < arguments.length; r++) {
        var o = arguments[r];
        if (goog.isArray(o)) for (var s = 0; s < o.length; s += 8192) {
            var i = goog.array.slice(o, s, s + 8192);
            i = goog.array.flatten.apply(null, i);
            for (var n = 0; n < i.length; n++) t.push(i[n]);
        } else t.push(o);
    }
    return t;
}, goog.array.rotate = function(e, t) {
    return goog.asserts.assert(null != e.length), e.length && (0 < (t %= e.length) ? Array.prototype.unshift.apply(e, e.splice(-t, t)) : 0 > t && Array.prototype.push.apply(e, e.splice(0, -t))), 
    e;
}, goog.array.moveItem = function(e, t, r) {
    goog.asserts.assert(0 <= t && t < e.length), goog.asserts.assert(0 <= r && r < e.length), 
    t = Array.prototype.splice.call(e, t, 1), Array.prototype.splice.call(e, r, 0, t[0]);
}, goog.array.zip = function(e) {
    if (!arguments.length) return [];
    for (var t = [], r = arguments[0].length, o = 1; o < arguments.length; o++) arguments[o].length < r && (r = arguments[o].length);
    for (o = 0; o < r; o++) {
        for (var s = [], i = 0; i < arguments.length; i++) s.push(arguments[i][o]);
        t.push(s);
    }
    return t;
}, goog.array.shuffle = function(e, t) {
    t = t || Math.random;
    for (var r = e.length - 1; 0 < r; r--) {
        var o = Math.floor(t() * (r + 1)), s = e[r];
        e[r] = e[o], e[o] = s;
    }
}, goog.array.copyByIndex = function(e, t) {
    var r = [];
    return goog.array.forEach(t, function(t) {
        r.push(e[t]);
    }), r;
}, goog.array.concatMap = function(e, t, r) {
    return goog.array.concat.apply([], goog.array.map(e, t, r));
}, goog.crypt = {}, goog.crypt.stringToByteArray = function(e) {
    for (var t = [], r = 0, o = 0; o < e.length; o++) {
        var s = e.charCodeAt(o);
        255 < s && (t[r++] = 255 & s, s >>= 8), t[r++] = s;
    }
    return t;
}, goog.crypt.byteArrayToString = function(e) {
    if (8192 >= e.length) return String.fromCharCode.apply(null, e);
    for (var t = "", r = 0; r < e.length; r += 8192) {
        var o = goog.array.slice(e, r, r + 8192);
        t += String.fromCharCode.apply(null, o);
    }
    return t;
}, goog.crypt.byteArrayToHex = function(e) {
    return goog.array.map(e, function(e) {
        return 1 < (e = e.toString(16)).length ? e : "0" + e;
    }).join("");
}, goog.crypt.hexToByteArray = function(e) {
    goog.asserts.assert(0 == e.length % 2, "Key string length must be multiple of 2");
    for (var t = [], r = 0; r < e.length; r += 2) t.push(parseInt(e.substring(r, r + 2), 16));
    return t;
}, goog.crypt.stringToUtf8ByteArray = function(e) {
    for (var t = [], r = 0, o = 0; o < e.length; o++) {
        var s = e.charCodeAt(o);
        128 > s ? t[r++] = s : (2048 > s ? t[r++] = s >> 6 | 192 : (55296 == (64512 & s) && o + 1 < e.length && 56320 == (64512 & e.charCodeAt(o + 1)) ? (s = 65536 + ((1023 & s) << 10) + (1023 & e.charCodeAt(++o)), 
        t[r++] = s >> 18 | 240, t[r++] = s >> 12 & 63 | 128) : t[r++] = s >> 12 | 224, t[r++] = s >> 6 & 63 | 128), 
        t[r++] = 63 & s | 128);
    }
    return t;
}, goog.crypt.utf8ByteArrayToString = function(e) {
    for (var t = [], r = 0, o = 0; r < e.length; ) {
        var s = e[r++];
        if (128 > s) t[o++] = String.fromCharCode(s); else if (191 < s && 224 > s) {
            var i = e[r++];
            t[o++] = String.fromCharCode((31 & s) << 6 | 63 & i);
        } else if (239 < s && 365 > s) {
            i = e[r++];
            var n = e[r++];
            s = ((7 & s) << 18 | (63 & i) << 12 | (63 & n) << 6 | 63 & e[r++]) - 65536, t[o++] = String.fromCharCode(55296 + (s >> 10)), 
            t[o++] = String.fromCharCode(56320 + (1023 & s));
        } else i = e[r++], n = e[r++], t[o++] = String.fromCharCode((15 & s) << 12 | (63 & i) << 6 | 63 & n);
    }
    return t.join("");
}, goog.crypt.xorByteArray = function(e, t) {
    goog.asserts.assert(e.length == t.length, "XOR array lengths must match");
    for (var r = [], o = 0; o < e.length; o++) r.push(e[o] ^ t[o]);
    return r;
}, goog.string = {}, goog.string.DETECT_DOUBLE_ESCAPING = !1, goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1, 
goog.string.Unicode = {
    NBSP: " "
}, goog.string.startsWith = function(e, t) {
    return 0 == e.lastIndexOf(t, 0);
}, goog.string.endsWith = function(e, t) {
    var r = e.length - t.length;
    return 0 <= r && e.indexOf(t, r) == r;
}, goog.string.caseInsensitiveStartsWith = function(e, t) {
    return 0 == goog.string.caseInsensitiveCompare(t, e.substr(0, t.length));
}, goog.string.caseInsensitiveEndsWith = function(e, t) {
    return 0 == goog.string.caseInsensitiveCompare(t, e.substr(e.length - t.length, t.length));
}, goog.string.caseInsensitiveEquals = function(e, t) {
    return e.toLowerCase() == t.toLowerCase();
}, goog.string.subs = function(e, t) {
    for (var r = e.split("%s"), o = "", s = Array.prototype.slice.call(arguments, 1); s.length && 1 < r.length; ) o += r.shift() + s.shift();
    return o + r.join("%s");
}, goog.string.collapseWhitespace = function(e) {
    return e.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
}, goog.string.isEmptyOrWhitespace = function(e) {
    return /^[\s\xa0]*$/.test(e);
}, goog.string.isEmptyString = function(e) {
    return 0 == e.length;
}, goog.string.isEmpty = goog.string.isEmptyOrWhitespace, goog.string.isEmptyOrWhitespaceSafe = function(e) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(e));
}, goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe, goog.string.isBreakingWhitespace = function(e) {
    return !/[^\t\n\r ]/.test(e);
}, goog.string.isAlpha = function(e) {
    return !/[^a-zA-Z]/.test(e);
}, goog.string.isNumeric = function(e) {
    return !/[^0-9]/.test(e);
}, goog.string.isAlphaNumeric = function(e) {
    return !/[^a-zA-Z0-9]/.test(e);
}, goog.string.isSpace = function(e) {
    return " " == e;
}, goog.string.isUnicodeChar = function(e) {
    return 1 == e.length && " " <= e && "~" >= e || "" <= e && "�" >= e;
}, goog.string.stripNewlines = function(e) {
    return e.replace(/(\r\n|\r|\n)+/g, " ");
}, goog.string.canonicalizeNewlines = function(e) {
    return e.replace(/(\r\n|\r|\n)/g, "\n");
}, goog.string.normalizeWhitespace = function(e) {
    return e.replace(/\xa0|\s/g, " ");
}, goog.string.normalizeSpaces = function(e) {
    return e.replace(/\xa0|[ \t]+/g, " ");
}, goog.string.collapseBreakingSpaces = function(e) {
    return e.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
}, goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(e) {
    return e.trim();
} : function(e) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1];
}, goog.string.trimLeft = function(e) {
    return e.replace(/^[\s\xa0]+/, "");
}, goog.string.trimRight = function(e) {
    return e.replace(/[\s\xa0]+$/, "");
}, goog.string.caseInsensitiveCompare = function(e, t) {
    return e = String(e).toLowerCase(), t = String(t).toLowerCase(), e < t ? -1 : e == t ? 0 : 1;
}, goog.string.numberAwareCompare_ = function(e, t, r) {
    if (e == t) return 0;
    if (!e) return -1;
    if (!t) return 1;
    for (var o = e.toLowerCase().match(r), s = t.toLowerCase().match(r), i = Math.min(o.length, s.length), n = 0; n < i; n++) {
        r = o[n];
        var a = s[n];
        if (r != a) return e = parseInt(r, 10), !isNaN(e) && (t = parseInt(a, 10), !isNaN(t) && e - t) ? e - t : r < a ? -1 : 1;
    }
    return o.length != s.length ? o.length - s.length : e < t ? -1 : 1;
}, goog.string.intAwareCompare = function(e, t) {
    return goog.string.numberAwareCompare_(e, t, /\d+|\D+/g);
}, goog.string.floatAwareCompare = function(e, t) {
    return goog.string.numberAwareCompare_(e, t, /\d+|\.\d+|\D+/g);
}, goog.string.numerateCompare = goog.string.floatAwareCompare, goog.string.urlEncode = function(e) {
    return encodeURIComponent(String(e));
}, goog.string.urlDecode = function(e) {
    return decodeURIComponent(e.replace(/\+/g, " "));
}, goog.string.newLineToBr = function(e, t) {
    return e.replace(/(\r\n|\r|\n)/g, t ? "<br />" : "<br>");
}, goog.string.htmlEscape = function(e, t) {
    if (t) e = e.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), 
    goog.string.DETECT_DOUBLE_ESCAPING && (e = e.replace(goog.string.E_RE_, "&#101;")); else {
        if (!goog.string.ALL_RE_.test(e)) return e;
        -1 != e.indexOf("&") && (e = e.replace(goog.string.AMP_RE_, "&amp;")), -1 != e.indexOf("<") && (e = e.replace(goog.string.LT_RE_, "&lt;")), 
        -1 != e.indexOf(">") && (e = e.replace(goog.string.GT_RE_, "&gt;")), -1 != e.indexOf('"') && (e = e.replace(goog.string.QUOT_RE_, "&quot;")), 
        -1 != e.indexOf("'") && (e = e.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")), 
        -1 != e.indexOf("\0") && (e = e.replace(goog.string.NULL_RE_, "&#0;")), goog.string.DETECT_DOUBLE_ESCAPING && -1 != e.indexOf("e") && (e = e.replace(goog.string.E_RE_, "&#101;"));
    }
    return e;
}, goog.string.AMP_RE_ = /&/g, goog.string.LT_RE_ = /</g, goog.string.GT_RE_ = />/g, 
goog.string.QUOT_RE_ = /"/g, goog.string.SINGLE_QUOTE_RE_ = /'/g, goog.string.NULL_RE_ = /\x00/g, 
goog.string.E_RE_ = /e/g, goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/, 
goog.string.unescapeEntities = function(e) {
    return goog.string.contains(e, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(e) : goog.string.unescapePureXmlEntities_(e) : e;
}, goog.string.unescapeEntitiesWithDocument = function(e, t) {
    return goog.string.contains(e, "&") ? goog.string.unescapeEntitiesUsingDom_(e, t) : e;
}, goog.string.unescapeEntitiesUsingDom_ = function(e, t) {
    var r = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"'
    }, o = t ? t.createElement("div") : window.document.createElement("div");
    return e.replace(goog.string.HTML_ENTITY_PATTERN_, function(e, t) {
        var s = r[e];
        return s || ("#" == t.charAt(0) && (t = Number("0" + t.substr(1)), isNaN(t) || (s = String.fromCharCode(t))), 
        s || (o.innerHTML = e + " ", s = o.firstChild.nodeValue.slice(0, -1)), r[e] = s);
    });
}, goog.string.unescapePureXmlEntities_ = function(e) {
    return e.replace(/&([^;]+);/g, function(e, t) {
        switch (t) {
          case "amp":
            return "&";

          case "lt":
            return "<";

          case "gt":
            return ">";

          case "quot":
            return '"';

          default:
            return "#" != t.charAt(0) || (t = Number("0" + t.substr(1)), isNaN(t)) ? e : String.fromCharCode(t);
        }
    });
}, goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g, goog.string.whitespaceEscape = function(e, t) {
    return goog.string.newLineToBr(e.replace(/  /g, " &#160;"), t);
}, goog.string.preserveSpaces = function(e) {
    return e.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
}, goog.string.stripQuotes = function(e, t) {
    for (var r = t.length, o = 0; o < r; o++) {
        var s = 1 == r ? t : t.charAt(o);
        if (e.charAt(0) == s && e.charAt(e.length - 1) == s) return e.substring(1, e.length - 1);
    }
    return e;
}, goog.string.truncate = function(e, t, r) {
    return r && (e = goog.string.unescapeEntities(e)), e.length > t && (e = e.substring(0, t - 3) + "..."), 
    r && (e = goog.string.htmlEscape(e)), e;
}, goog.string.truncateMiddle = function(e, t, r, o) {
    if (r && (e = goog.string.unescapeEntities(e)), o && e.length > t) {
        o > t && (o = t);
        var s = e.length - o;
        e = e.substring(0, t - o) + "..." + e.substring(s);
    } else e.length > t && (o = Math.floor(t / 2), s = e.length - o, e = e.substring(0, o + t % 2) + "..." + e.substring(s));
    return r && (e = goog.string.htmlEscape(e)), e;
}, goog.string.specialEscapeChars_ = {
    "\0": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\v": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
}, goog.string.jsEscapeCache_ = {
    "'": "\\'"
}, goog.string.quote = function(e) {
    e = String(e);
    for (var t = [ '"' ], r = 0; r < e.length; r++) {
        var o = e.charAt(r), s = o.charCodeAt(0);
        t[r + 1] = goog.string.specialEscapeChars_[o] || (31 < s && 127 > s ? o : goog.string.escapeChar(o));
    }
    return t.push('"'), t.join("");
}, goog.string.escapeString = function(e) {
    for (var t = [], r = 0; r < e.length; r++) t[r] = goog.string.escapeChar(e.charAt(r));
    return t.join("");
}, goog.string.escapeChar = function(e) {
    if (e in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[e];
    if (e in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[e] = goog.string.specialEscapeChars_[e];
    var t = e.charCodeAt(0);
    if (31 < t && 127 > t) var r = e; else 256 > t ? (r = "\\x", (16 > t || 256 < t) && (r += "0")) : (r = "\\u", 
    4096 > t && (r += "0")), r += t.toString(16).toUpperCase();
    return goog.string.jsEscapeCache_[e] = r;
}, goog.string.contains = function(e, t) {
    return -1 != e.indexOf(t);
}, goog.string.caseInsensitiveContains = function(e, t) {
    return goog.string.contains(e.toLowerCase(), t.toLowerCase());
}, goog.string.countOf = function(e, t) {
    return e && t ? e.split(t).length - 1 : 0;
}, goog.string.removeAt = function(e, t, r) {
    var o = e;
    return 0 <= t && t < e.length && 0 < r && (o = e.substr(0, t) + e.substr(t + r, e.length - t - r)), 
    o;
}, goog.string.remove = function(e, t) {
    return e.replace(t, "");
}, goog.string.removeAll = function(e, t) {
    return t = new RegExp(goog.string.regExpEscape(t), "g"), e.replace(t, "");
}, goog.string.replaceAll = function(e, t, r) {
    return t = new RegExp(goog.string.regExpEscape(t), "g"), e.replace(t, r.replace(/\$/g, "$$$$"));
}, goog.string.regExpEscape = function(e) {
    return String(e).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
}, goog.string.repeat = String.prototype.repeat ? function(e, t) {
    return e.repeat(t);
} : function(e, t) {
    return Array(t + 1).join(e);
}, goog.string.padNumber = function(e, t, r) {
    return e = goog.isDef(r) ? e.toFixed(r) : String(e), -1 == (r = e.indexOf(".")) && (r = e.length), 
    goog.string.repeat("0", Math.max(0, t - r)) + e;
}, goog.string.makeSafe = function(e) {
    return null == e ? "" : String(e);
}, goog.string.buildString = function(e) {
    return Array.prototype.join.call(arguments, "");
}, goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
}, goog.string.compareVersions = function(e, t) {
    var r = 0;
    e = goog.string.trim(String(e)).split("."), t = goog.string.trim(String(t)).split(".");
    for (var o = Math.max(e.length, t.length), s = 0; 0 == r && s < o; s++) {
        var i = e[s] || "", n = t[s] || "";
        do {
            if (i = /(\d*)(\D*)(.*)/.exec(i) || [ "", "", "", "" ], n = /(\d*)(\D*)(.*)/.exec(n) || [ "", "", "", "" ], 
            0 == i[0].length && 0 == n[0].length) break;
            r = 0 == i[1].length ? 0 : parseInt(i[1], 10);
            var a = 0 == n[1].length ? 0 : parseInt(n[1], 10);
            r = goog.string.compareElements_(r, a) || goog.string.compareElements_(0 == i[2].length, 0 == n[2].length) || goog.string.compareElements_(i[2], n[2]), 
            i = i[3], n = n[3];
        } while (0 == r);
    }
    return r;
}, goog.string.compareElements_ = function(e, t) {
    return e < t ? -1 : e > t ? 1 : 0;
}, goog.string.hashCode = function(e) {
    for (var t = 0, r = 0; r < e.length; ++r) t = 31 * t + e.charCodeAt(r) >>> 0;
    return t;
}, goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0, goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++;
}, goog.string.toNumber = function(e) {
    var t = Number(e);
    return 0 == t && goog.string.isEmptyOrWhitespace(e) ? NaN : t;
}, goog.string.isLowerCamelCase = function(e) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(e);
}, goog.string.isUpperCamelCase = function(e) {
    return /^([A-Z][a-z]*)+$/.test(e);
}, goog.string.toCamelCase = function(e) {
    return String(e).replace(/\-([a-z])/g, function(e, t) {
        return t.toUpperCase();
    });
}, goog.string.toSelectorCase = function(e) {
    return String(e).replace(/([A-Z])/g, "-$1").toLowerCase();
}, goog.string.toTitleCase = function(e, t) {
    return t = goog.isString(t) ? goog.string.regExpEscape(t) : "\\s", e.replace(new RegExp("(^" + (t ? "|[" + t + "]+" : "") + ")([a-z])", "g"), function(e, t, r) {
        return t + r.toUpperCase();
    });
}, goog.string.capitalize = function(e) {
    return String(e.charAt(0)).toUpperCase() + String(e.substr(1)).toLowerCase();
}, goog.string.parseInt = function(e) {
    return isFinite(e) && (e = String(e)), goog.isString(e) ? /^\s*-?0x/i.test(e) ? parseInt(e, 16) : parseInt(e, 10) : NaN;
}, goog.string.splitLimit = function(e, t, r) {
    e = e.split(t);
    for (var o = []; 0 < r && e.length; ) o.push(e.shift()), r--;
    return e.length && o.push(e.join(t)), o;
}, goog.string.lastComponent = function(e, t) {
    if (!t) return e;
    "string" == typeof t && (t = [ t ]);
    for (var r = -1, o = 0; o < t.length; o++) if ("" != t[o]) {
        var s = e.lastIndexOf(t[o]);
        s > r && (r = s);
    }
    return -1 == r ? e : e.slice(r + 1);
}, goog.string.editDistance = function(e, t) {
    var r = [], o = [];
    if (e == t) return 0;
    if (!e.length || !t.length) return Math.max(e.length, t.length);
    for (var s = 0; s < t.length + 1; s++) r[s] = s;
    for (s = 0; s < e.length; s++) {
        o[0] = s + 1;
        for (var i = 0; i < t.length; i++) o[i + 1] = Math.min(o[i] + 1, r[i + 1] + 1, r[i] + Number(e[s] != t[i]));
        for (i = 0; i < r.length; i++) r[i] = o[i];
    }
    return o[t.length];
}, _window = {}, navigator = {
    userAgent: "mimc-uniapp/1.0",
    appName: "xiaomi",
    appVersion: "1.0"
}, _window.navigator = navigator, goog.labs = {}, goog.labs.userAgent = {}, goog.labs.userAgent.util = {}, 
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var e = goog.labs.userAgent.util.getNavigator_();
    return e && (e = e.userAgent) ? e : "";
}, goog.labs.userAgent.util.getNavigator_ = function() {
    return _window.navigator;
}, goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_(), 
goog.labs.userAgent.util.setUserAgent = function(e) {
    goog.labs.userAgent.util.userAgent_ = e || goog.labs.userAgent.util.getNativeUserAgentString_();
}, goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_;
}, goog.labs.userAgent.util.matchUserAgent = function(e) {
    var t = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(t, e);
}, goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(e) {
    var t = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(t, e);
}, goog.labs.userAgent.util.extractVersionTuples = function(e) {
    for (var t, r = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, o = []; t = r.exec(e); ) o.push([ t[1], t[2], t[3] || void 0 ]);
    return o;
}, goog.labs.userAgent.platform = {}, goog.labs.userAgent.platform.isAndroid = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android");
}, goog.labs.userAgent.platform.isIpod = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPod");
}, goog.labs.userAgent.platform.isIphone = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
}, goog.labs.userAgent.platform.isIpad = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPad");
}, goog.labs.userAgent.platform.isIos = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
}, goog.labs.userAgent.platform.isMacintosh = function() {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh");
}, goog.labs.userAgent.platform.isLinux = function() {
    return goog.labs.userAgent.util.matchUserAgent("Linux");
}, goog.labs.userAgent.platform.isWindows = function() {
    return goog.labs.userAgent.util.matchUserAgent("Windows");
}, goog.labs.userAgent.platform.isChromeOS = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrOS");
}, goog.labs.userAgent.platform.getVersion = function() {
    var e = goog.labs.userAgent.util.getUserAgent(), t = "";
    return goog.labs.userAgent.platform.isWindows() ? (t = /Windows (?:NT|Phone) ([0-9.]+)/, 
    t = (e = t.exec(e)) ? e[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (t = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, 
    t = (e = t.exec(e)) && e[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (t = /Mac OS X ([0-9_.]+)/, 
    t = (e = t.exec(e)) ? e[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (t = /Android\s+([^\);]+)(\)|;)/, 
    t = (e = t.exec(e)) && e[1]) : goog.labs.userAgent.platform.isChromeOS() && (t = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, 
    t = (e = t.exec(e)) && e[1]), t || "";
}, goog.labs.userAgent.platform.isVersionOrHigher = function(e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), e);
}, goog.object = {}, goog.object.is = function(e, t) {
    return e === t ? 0 !== e || 1 / e == 1 / t : e !== e && t !== t;
}, goog.object.forEach = function(e, t, r) {
    for (var o in e) t.call(r, e[o], o, e);
}, goog.object.filter = function(e, t, r) {
    var o, s = {};
    for (o in e) t.call(r, e[o], o, e) && (s[o] = e[o]);
    return s;
}, goog.object.map = function(e, t, r) {
    var o, s = {};
    for (o in e) s[o] = t.call(r, e[o], o, e);
    return s;
}, goog.object.some = function(e, t, r) {
    for (var o in e) if (t.call(r, e[o], o, e)) return !0;
    return !1;
}, goog.object.every = function(e, t, r) {
    for (var o in e) if (!t.call(r, e[o], o, e)) return !1;
    return !0;
}, goog.object.getCount = function(e) {
    var t, r = 0;
    for (t in e) r++;
    return r;
}, goog.object.getAnyKey = function(e) {
    for (var t in e) return t;
}, goog.object.getAnyValue = function(e) {
    for (var t in e) return e[t];
}, goog.object.contains = function(e, t) {
    return goog.object.containsValue(e, t);
}, goog.object.getValues = function(e) {
    var t, r = [], o = 0;
    for (t in e) r[o++] = e[t];
    return r;
}, goog.object.getKeys = function(e) {
    var t, r = [], o = 0;
    for (t in e) r[o++] = t;
    return r;
}, goog.object.getValueByKeys = function(e, t) {
    var r = goog.isArrayLike(t), o = r ? t : arguments;
    for (r = r ? 0 : 1; r < o.length; r++) {
        if (null == e) return;
        e = e[o[r]];
    }
    return e;
}, goog.object.containsKey = function(e, t) {
    return null !== e && t in e;
}, goog.object.containsValue = function(e, t) {
    for (var r in e) if (e[r] == t) return !0;
    return !1;
}, goog.object.findKey = function(e, t, r) {
    for (var o in e) if (t.call(r, e[o], o, e)) return o;
}, goog.object.findValue = function(e, t, r) {
    return (t = goog.object.findKey(e, t, r)) && e[t];
}, goog.object.isEmpty = function(e) {
    for (var t in e) return !1;
    return !0;
}, goog.object.clear = function(e) {
    for (var t in e) delete e[t];
}, goog.object.remove = function(e, t) {
    var r;
    return (r = t in e) && delete e[t], r;
}, goog.object.add = function(e, t, r) {
    if (null !== e && t in e) throw Error('The object already contains the key "' + t + '"');
    goog.object.set(e, t, r);
}, goog.object.get = function(e, t, r) {
    return null !== e && t in e ? e[t] : r;
}, goog.object.set = function(e, t, r) {
    e[t] = r;
}, goog.object.setIfUndefined = function(e, t, r) {
    return t in e ? e[t] : e[t] = r;
}, goog.object.setWithReturnValueIfNotSet = function(e, t, r) {
    return t in e ? e[t] : (r = r(), e[t] = r);
}, goog.object.equals = function(e, t) {
    for (var r in e) if (!(r in t) || e[r] !== t[r]) return !1;
    for (r in t) if (!(r in e)) return !1;
    return !0;
}, goog.object.clone = function(e) {
    var t, r = {};
    for (t in e) r[t] = e[t];
    return r;
}, goog.object.unsafeClone = function(e) {
    var t = goog.typeOf(e);
    if ("object" == t || "array" == t) {
        if (goog.isFunction(e.clone)) return e.clone();
        t = "array" == t ? [] : {};
        for (var r in e) t[r] = goog.object.unsafeClone(e[r]);
        return t;
    }
    return e;
}, goog.object.transpose = function(e) {
    var t, r = {};
    for (t in e) r[e[t]] = t;
    return r;
}, goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), 
goog.object.extend = function(e, t) {
    for (var r, o, s = 1; s < arguments.length; s++) {
        o = arguments[s];
        for (r in o) e[r] = o[r];
        for (var i = 0; i < goog.object.PROTOTYPE_FIELDS_.length; i++) r = goog.object.PROTOTYPE_FIELDS_[i], 
        Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
}, goog.object.create = function(e) {
    var t = arguments.length;
    if (1 == t && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (t % 2) throw Error("Uneven number of arguments");
    for (var r = {}, o = 0; o < t; o += 2) r[arguments[o]] = arguments[o + 1];
    return r;
}, goog.object.createSet = function(e) {
    var t = arguments.length;
    if (1 == t && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var r = {}, o = 0; o < t; o++) r[arguments[o]] = !0;
    return r;
}, goog.object.createImmutableView = function(e) {
    var t = e;
    return Object.isFrozen && !Object.isFrozen(e) && (t = Object.create(e), Object.freeze(t)), 
    t;
}, goog.object.isImmutableView = function(e) {
    return !!Object.isFrozen && Object.isFrozen(e);
}, goog.object.getAllPropertyNames = function(e, t, r) {
    if (!e) return [];
    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) return goog.object.getKeys(e);
    for (var o = {}; e && (e !== Object.prototype || t) && (e !== Function.prototype || r); ) {
        for (var s = Object.getOwnPropertyNames(e), i = 0; i < s.length; i++) o[s[i]] = !0;
        e = Object.getPrototypeOf(e);
    }
    return goog.object.getKeys(o);
}, goog.labs.userAgent.browser = {}, goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera");
}, goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
}, goog.labs.userAgent.browser.matchEdge_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge");
}, goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox");
}, goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
}, goog.labs.userAgent.browser.matchCoast_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Coast");
}, goog.labs.userAgent.browser.matchIosWebview_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
}, goog.labs.userAgent.browser.matchChrome_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_();
}, goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
}, goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_, 
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_, goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_, 
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_, 
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_, 
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_, goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_, 
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_, 
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_, 
goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk");
}, goog.labs.userAgent.browser.getVersion = function() {
    function e(e) {
        return e = goog.array.find(e, o), r[e] || "";
    }
    var t = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(t);
    t = goog.labs.userAgent.util.extractVersionTuples(t);
    var r = {};
    goog.array.forEach(t, function(e) {
        r[e[0]] = e[1];
    });
    var o = goog.partial(goog.object.containsKey, r);
    return goog.labs.userAgent.browser.isOpera() ? e([ "Version", "Opera" ]) : goog.labs.userAgent.browser.isEdge() ? e([ "Edge" ]) : goog.labs.userAgent.browser.isChrome() ? e([ "Chrome", "CriOS" ]) : (t = t[2]) && t[1] || "";
}, goog.labs.userAgent.browser.isVersionOrHigher = function(e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), e);
}, goog.labs.userAgent.browser.getIEVersion_ = function(e) {
    var t = /rv: *([\d\.]*)/.exec(e);
    if (t && t[1]) return t[1];
    t = "";
    var r = /MSIE +([\d\.]+)/.exec(e);
    if (r && r[1]) if (e = /Trident\/(\d.\d)/.exec(e), "7.0" == r[1]) if (e && e[1]) switch (e[1]) {
      case "4.0":
        t = "8.0";
        break;

      case "5.0":
        t = "9.0";
        break;

      case "6.0":
        t = "10.0";
        break;

      case "7.0":
        t = "11.0";
    } else t = "7.0"; else t = r[1];
    return t;
}, goog.reflect = {}, goog.reflect.object = function(e, t) {
    return t;
}, goog.reflect.objectProperty = function(e, t) {
    return e;
}, goog.reflect.sinkValue = function(e) {
    return goog.reflect.sinkValue[" "](e), e;
}, goog.reflect.sinkValue[" "] = goog.nullFunction, goog.reflect.canAccessProperty = function(e, t) {
    try {
        return goog.reflect.sinkValue(e[t]), !0;
    } catch (e) {}
    return !1;
}, goog.reflect.cache = function(e, t, r, o) {
    return o = o ? o(t) : t, Object.prototype.hasOwnProperty.call(e, o) ? e[o] : e[o] = r(t);
}, goog.labs.userAgent.engine = {}, goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto");
}, goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
}, goog.labs.userAgent.engine.isEdge = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge");
}, goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
}, goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
}, goog.labs.userAgent.engine.getVersion = function() {
    var e = goog.labs.userAgent.util.getUserAgent();
    if (e) {
        e = goog.labs.userAgent.util.extractVersionTuples(e);
        var t = goog.labs.userAgent.engine.getEngineTuple_(e);
        if (t) return "Gecko" == t[0] ? goog.labs.userAgent.engine.getVersionForKey_(e, "Firefox") : t[1];
        var r;
        if ((e = e[0]) && (r = e[2]) && (r = /Trident\/([^\s;]+)/.exec(r))) return r[1];
    }
    return "";
}, goog.labs.userAgent.engine.getEngineTuple_ = function(e) {
    if (!goog.labs.userAgent.engine.isEdge()) return e[1];
    for (var t = 0; t < e.length; t++) {
        var r = e[t];
        if ("Edge" == r[0]) return r;
    }
}, goog.labs.userAgent.engine.isVersionOrHigher = function(e) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), e);
}, goog.labs.userAgent.engine.getVersionForKey_ = function(e, t) {
    return (e = goog.array.find(e, function(e) {
        return t == e[0];
    })) && e[1] || "";
}, _window = {}, navigator = {
    userAgent: "mimc-uniapp/1.0",
    appName: "xiaomi",
    appVersion: "1.0"
}, _window.navigator = navigator, goog.userAgent = {}, goog.userAgent.ASSUME_IE = !1, 
goog.userAgent.ASSUME_EDGE = !1, goog.userAgent.ASSUME_GECKO = !1, goog.userAgent.ASSUME_WEBKIT = !1, 
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1, goog.userAgent.ASSUME_OPERA = !1, goog.userAgent.ASSUME_ANY_VERSION = !1, 
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA, 
goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent();
}, goog.userAgent.getNavigator = function() {
    return _window.navigator;
}, goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera(), 
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE(), 
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge(), 
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE, goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko(), 
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit(), 
goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
}, goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_(), 
goog.userAgent.SAFARI = goog.userAgent.WEBKIT, goog.userAgent.determinePlatform_ = function() {
    var e = goog.userAgent.getNavigator();
    return e && e.platform || "";
}, goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_(), goog.userAgent.ASSUME_MAC = !1, 
goog.userAgent.ASSUME_WINDOWS = !1, goog.userAgent.ASSUME_LINUX = !1, goog.userAgent.ASSUME_X11 = !1, 
goog.userAgent.ASSUME_ANDROID = !1, goog.userAgent.ASSUME_IPHONE = !1, goog.userAgent.ASSUME_IPAD = !1, 
goog.userAgent.ASSUME_IPOD = !1, goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD, 
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh(), 
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows(), 
goog.userAgent.isLegacyLinux_ = function() {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
}, goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_(), 
goog.userAgent.isX11_ = function() {
    var e = goog.userAgent.getNavigator();
    return !!e && goog.string.contains(e.appVersion || "", "X11");
}, goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_(), 
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid(), 
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone(), 
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad(), 
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod(), 
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos(), 
goog.userAgent.determineVersion_ = function() {
    var e = "", t = goog.userAgent.getVersionRegexResult_();
    return t && (e = t ? t[1] : ""), goog.userAgent.IE && null != (t = goog.userAgent.getDocumentMode_()) && t > parseFloat(e) ? String(t) : e;
}, goog.userAgent.getVersionRegexResult_ = function() {
    var e = goog.userAgent.getUserAgentString();
    return goog.userAgent.GECKO ? /rv:([^\);]+)(\)|;)/.exec(e) : goog.userAgent.EDGE ? /Edge\/([\d\.]+)/.exec(e) : goog.userAgent.IE ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e) : goog.userAgent.WEBKIT ? /WebKit\/(\S+)/.exec(e) : goog.userAgent.OPERA ? /(?:Version)[ \/]?(\S+)/.exec(e) : void 0;
}, goog.userAgent.getDocumentMode_ = function() {
    var e = _window.document;
    return e ? e.documentMode : void 0;
}, goog.userAgent.VERSION = goog.userAgent.determineVersion_(), goog.userAgent.compare = function(e, t) {
    return goog.string.compareVersions(e, t);
}, goog.userAgent.isVersionOrHigherCache_ = {}, goog.userAgent.isVersionOrHigher = function(e) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, e, function() {
        return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, e);
    });
}, goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher, goog.userAgent.isDocumentModeOrHigher = function(e) {
    return Number(goog.userAgent.DOCUMENT_MODE) >= e;
}, goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher, goog.userAgent.DOCUMENT_MODE = function() {
    var e = _window.document, t = goog.userAgent.getDocumentMode_();
    if (e && goog.userAgent.IE) return t || ("CSS1Compat" == e.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5);
}(), goog.userAgent.product = {}, goog.userAgent.product.ASSUME_FIREFOX = !1, goog.userAgent.product.ASSUME_IPHONE = !1, 
goog.userAgent.product.ASSUME_IPAD = !1, goog.userAgent.product.ASSUME_ANDROID = !1, 
goog.userAgent.product.ASSUME_CHROME = !1, goog.userAgent.product.ASSUME_SAFARI = !1, 
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI, 
goog.userAgent.product.OPERA = goog.userAgent.OPERA, goog.userAgent.product.IE = goog.userAgent.IE, 
goog.userAgent.product.EDGE = goog.userAgent.EDGE, goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox(), 
goog.userAgent.product.isIphoneOrIpod_ = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
}, goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_(), 
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad(), 
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser(), 
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome(), 
goog.userAgent.product.isSafariDesktop_ = function() {
    return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
}, goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_(), 
goog.crypt.base64 = {}, goog.crypt.base64.byteToCharMap_ = null, goog.crypt.base64.charToByteMap_ = null, 
goog.crypt.base64.byteToCharMapWebSafe_ = null, goog.crypt.base64.ENCODED_VALS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 
goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.ENCODED_VALS_BASE + "+/=", goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_.", 
goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA, 
goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa, 
goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob, 
goog.crypt.base64.encodeByteArray = function(e, t) {
    goog.asserts.assert(goog.isArrayLike(e), "encodeByteArray takes an array as a parameter"), 
    goog.crypt.base64.init_(), t = t ? goog.crypt.base64.byteToCharMapWebSafe_ : goog.crypt.base64.byteToCharMap_;
    for (var r = [], o = 0; o < e.length; o += 3) {
        var s = e[o], i = o + 1 < e.length, n = i ? e[o + 1] : 0, a = o + 2 < e.length, p = a ? e[o + 2] : 0, g = s >> 2;
        s = (3 & s) << 4 | n >> 4, n = (15 & n) << 2 | p >> 6, p &= 63, a || (p = 64, i || (n = 64)), 
        r.push(t[g], t[s], t[n], t[p]);
    }
    return r.join("");
}, goog.crypt.base64.encodeString = function(e, t) {
    return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !t ? (console.log("btoa"), goog.global.btoa(e)) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(e), t);
}, goog.crypt.base64.decodeString = function(e, t) {
    if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !t) return goog.global.atob(e);
    var r = "";
    return goog.crypt.base64.decodeStringInternal_(e, function(e) {
        r += String.fromCharCode(e);
    }), r;
}, goog.crypt.base64.decodeStringToByteArray = function(e, t) {
    var r = [];
    return goog.crypt.base64.decodeStringInternal_(e, function(e) {
        r.push(e);
    }), r;
}, goog.crypt.base64.decodeStringToUint8Array = function(e) {
    goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
    var t = e.length, r = 0;
    "=" === e[t - 2] ? r = 2 : "=" === e[t - 1] && (r = 1);
    var o = new Uint8Array(Math.ceil(3 * t / 4) - r), s = 0;
    return goog.crypt.base64.decodeStringInternal_(e, function(e) {
        o[s++] = e;
    }), o.subarray(0, s);
}, goog.crypt.base64.decodeStringInternal_ = function(e, t) {
    function r(t) {
        for (;o < e.length; ) {
            var r = e.charAt(o++), s = goog.crypt.base64.charToByteMap_[r];
            if (null != s) return s;
            if (!goog.string.isEmptyOrWhitespace(r)) throw Error("Unknown base64 encoding at char: " + r);
        }
        return t;
    }
    goog.crypt.base64.init_();
    for (var o = 0; ;) {
        var s = r(-1), i = r(0), n = r(64), a = r(64);
        if (64 === a && -1 === s) break;
        t(s << 2 | i >> 4), 64 != n && (t(i << 4 & 240 | n >> 2), 64 != a && t(n << 6 & 192 | a));
    }
}, goog.crypt.base64.init_ = function() {
    if (!goog.crypt.base64.byteToCharMap_) {
        goog.crypt.base64.byteToCharMap_ = {}, goog.crypt.base64.charToByteMap_ = {}, goog.crypt.base64.byteToCharMapWebSafe_ = {};
        for (var e = 0; e < goog.crypt.base64.ENCODED_VALS.length; e++) goog.crypt.base64.byteToCharMap_[e] = goog.crypt.base64.ENCODED_VALS.charAt(e), 
        goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[e]] = e, goog.crypt.base64.byteToCharMapWebSafe_[e] = goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(e), 
        e >= goog.crypt.base64.ENCODED_VALS_BASE.length && (goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(e)] = e);
    }
}, jspb.utils = {}, jspb.utils.split64Low = 0, jspb.utils.split64High = 0, jspb.utils.splitUint64 = function(e) {
    var t = e >>> 0;
    e = Math.floor((e - t) / jspb.BinaryConstants.TWO_TO_32) >>> 0, jspb.utils.split64Low = t, 
    jspb.utils.split64High = e;
}, jspb.utils.splitInt64 = function(e) {
    var t = 0 > e, r = (e = Math.abs(e)) >>> 0;
    e = Math.floor((e - r) / jspb.BinaryConstants.TWO_TO_32), e >>>= 0, t && (e = ~e >>> 0, 
    4294967295 < (r = 1 + (~r >>> 0)) && (r = 0, 4294967295 < ++e && (e = 0))), jspb.utils.split64Low = r, 
    jspb.utils.split64High = e;
}, jspb.utils.splitZigzag64 = function(e) {
    var t = 0 > e;
    e = 2 * Math.abs(e), jspb.utils.splitUint64(e), e = jspb.utils.split64Low;
    var r = jspb.utils.split64High;
    t && (0 == e ? 0 == r ? r = e = 4294967295 : (r--, e = 4294967295) : e--), jspb.utils.split64Low = e, 
    jspb.utils.split64High = r;
}, jspb.utils.splitFloat32 = function(e) {
    var t = 0 > e ? 1 : 0;
    if (0 === (e = t ? -e : e)) 0 < 1 / e ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, 
    jspb.utils.split64Low = 2147483648); else if (isNaN(e)) jspb.utils.split64High = 0, 
    jspb.utils.split64Low = 2147483647; else if (e > jspb.BinaryConstants.FLOAT32_MAX) jspb.utils.split64High = 0, 
    jspb.utils.split64Low = (t << 31 | 2139095040) >>> 0; else if (e < jspb.BinaryConstants.FLOAT32_MIN) e = Math.round(e / Math.pow(2, -149)), 
    jspb.utils.split64High = 0, jspb.utils.split64Low = (t << 31 | e) >>> 0; else {
        var r = Math.floor(Math.log(e) / Math.LN2);
        e *= Math.pow(2, -r), e = 8388607 & Math.round(e * jspb.BinaryConstants.TWO_TO_23), 
        jspb.utils.split64High = 0, jspb.utils.split64Low = (t << 31 | r + 127 << 23 | e) >>> 0;
    }
}, jspb.utils.splitFloat64 = function(e) {
    var t = 0 > e ? 1 : 0;
    if (0 === (e = t ? -e : e)) jspb.utils.split64High = 0 < 1 / e ? 0 : 2147483648, 
    jspb.utils.split64Low = 0; else if (isNaN(e)) jspb.utils.split64High = 2147483647, 
    jspb.utils.split64Low = 4294967295; else if (e > jspb.BinaryConstants.FLOAT64_MAX) jspb.utils.split64High = (t << 31 | 2146435072) >>> 0, 
    jspb.utils.split64Low = 0; else if (e < jspb.BinaryConstants.FLOAT64_MIN) {
        var r = e / Math.pow(2, -1074);
        e = r / jspb.BinaryConstants.TWO_TO_32, jspb.utils.split64High = (t << 31 | e) >>> 0, 
        jspb.utils.split64Low = r >>> 0;
    } else {
        var o = Math.floor(Math.log(e) / Math.LN2);
        1024 == o && (o = 1023), e = (r = e * Math.pow(2, -o)) * jspb.BinaryConstants.TWO_TO_20 & 1048575, 
        r = r * jspb.BinaryConstants.TWO_TO_52 >>> 0, jspb.utils.split64High = (t << 31 | o + 1023 << 20 | e) >>> 0, 
        jspb.utils.split64Low = r;
    }
}, jspb.utils.splitHash64 = function(e) {
    var t = e.charCodeAt(0), r = e.charCodeAt(1), o = e.charCodeAt(2), s = e.charCodeAt(3), i = e.charCodeAt(4), n = e.charCodeAt(5), a = e.charCodeAt(6);
    e = e.charCodeAt(7), jspb.utils.split64Low = t + (r << 8) + (o << 16) + (s << 24) >>> 0, 
    jspb.utils.split64High = i + (n << 8) + (a << 16) + (e << 24) >>> 0;
}, jspb.utils.joinUint64 = function(e, t) {
    return t * jspb.BinaryConstants.TWO_TO_32 + e;
}, jspb.utils.joinInt64 = function(e, t) {
    var r = 2147483648 & t;
    return r && (e = 1 + ~e >>> 0, t = ~t >>> 0, 0 == e && (t = t + 1 >>> 0)), e = jspb.utils.joinUint64(e, t), 
    r ? -e : e;
}, jspb.utils.joinZigzag64 = function(e, t) {
    var r = 1 & e;
    return e = (e >>> 1 | t << 31) >>> 0, t >>>= 1, r && 0 == (e = e + 1 >>> 0) && (t = t + 1 >>> 0), 
    e = jspb.utils.joinUint64(e, t), r ? -e : e;
}, jspb.utils.joinFloat32 = function(e, t) {
    t = 2 * (e >> 31) + 1;
    var r = e >>> 23 & 255;
    return e &= 8388607, 255 == r ? e ? NaN : 1 / 0 * t : 0 == r ? t * Math.pow(2, -149) * e : t * Math.pow(2, r - 150) * (e + Math.pow(2, 23));
}, jspb.utils.joinFloat64 = function(e, t) {
    var r = 2 * (t >> 31) + 1, o = t >>> 20 & 2047;
    return e = jspb.BinaryConstants.TWO_TO_32 * (1048575 & t) + e, 2047 == o ? e ? NaN : 1 / 0 * r : 0 == o ? r * Math.pow(2, -1074) * e : r * Math.pow(2, o - 1075) * (e + jspb.BinaryConstants.TWO_TO_52);
}, jspb.utils.joinHash64 = function(e, t) {
    return String.fromCharCode(e >>> 0 & 255, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 & 255, t >>> 0 & 255, t >>> 8 & 255, t >>> 16 & 255, t >>> 24 & 255);
}, jspb.utils.DIGITS = "0123456789abcdef".split(""), jspb.utils.joinUnsignedDecimalString = function(e, t) {
    function r(e) {
        for (var t = 1e7, r = 0; 7 > r; r++) {
            var o = e / (t /= 10) % 10 >>> 0;
            (0 != o || i) && (i = !0, n += s[o]);
        }
    }
    if (2097151 >= t) return "" + (jspb.BinaryConstants.TWO_TO_32 * t + e);
    var o = (e >>> 24 | t << 8) >>> 0 & 16777215;
    e = (16777215 & e) + 6777216 * o + 6710656 * (t = t >> 16 & 65535), o += 8147497 * t, 
    t *= 2, 1e7 <= e && (o += Math.floor(e / 1e7), e %= 1e7), 1e7 <= o && (t += Math.floor(o / 1e7), 
    o %= 1e7);
    var s = jspb.utils.DIGITS, i = !1, n = "";
    return (t || i) && r(t), (o || i) && r(o), (e || i) && r(e), n;
}, jspb.utils.joinSignedDecimalString = function(e, t) {
    var r = 2147483648 & t;
    return r && (e = 1 + ~e >>> 0, t = ~t + (0 == e ? 1 : 0) >>> 0), e = jspb.utils.joinUnsignedDecimalString(e, t), 
    r ? "-" + e : e;
}, jspb.utils.hash64ToDecimalString = function(e, t) {
    jspb.utils.splitHash64(e), e = jspb.utils.split64Low;
    var r = jspb.utils.split64High;
    return t ? jspb.utils.joinSignedDecimalString(e, r) : jspb.utils.joinUnsignedDecimalString(e, r);
}, jspb.utils.hash64ArrayToDecimalStrings = function(e, t) {
    for (var r = Array(e.length), o = 0; o < e.length; o++) r[o] = jspb.utils.hash64ToDecimalString(e[o], t);
    return r;
}, jspb.utils.decimalStringToHash64 = function(e) {
    function t(e, t) {
        for (var r = 0; 8 > r && (1 !== e || 0 < t); r++) t = e * o[r] + t, o[r] = 255 & t, 
        t >>>= 8;
    }
    goog.asserts.assert(0 < e.length);
    var r = !1;
    "-" === e[0] && (r = !0, e = e.slice(1));
    for (var o = [ 0, 0, 0, 0, 0, 0, 0, 0 ], s = 0; s < e.length; s++) t(10, jspb.utils.DIGITS.indexOf(e[s]));
    return r && (function() {
        for (var e = 0; 8 > e; e++) o[e] = 255 & ~o[e];
    }(), t(1, 1)), goog.crypt.byteArrayToString(o);
}, jspb.utils.splitDecimalString = function(e) {
    jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e));
}, jspb.utils.hash64ToHexString = function(e) {
    var t = Array(18);
    t[0] = "0", t[1] = "x";
    for (var r = 0; 8 > r; r++) {
        var o = e.charCodeAt(7 - r);
        t[2 * r + 2] = jspb.utils.DIGITS[o >> 4], t[2 * r + 3] = jspb.utils.DIGITS[15 & o];
    }
    return t.join("");
}, jspb.utils.hexStringToHash64 = function(e) {
    e = e.toLowerCase(), goog.asserts.assert(18 == e.length), goog.asserts.assert("0" == e[0]), 
    goog.asserts.assert("x" == e[1]);
    for (var t = "", r = 0; 8 > r; r++) {
        var o = jspb.utils.DIGITS.indexOf(e[2 * r + 2]), s = jspb.utils.DIGITS.indexOf(e[2 * r + 3]);
        t = String.fromCharCode(16 * o + s) + t;
    }
    return t;
}, jspb.utils.hash64ToNumber = function(e, t) {
    jspb.utils.splitHash64(e), e = jspb.utils.split64Low;
    var r = jspb.utils.split64High;
    return t ? jspb.utils.joinInt64(e, r) : jspb.utils.joinUint64(e, r);
}, jspb.utils.numberToHash64 = function(e) {
    return jspb.utils.splitInt64(e), jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
}, jspb.utils.countVarints = function(e, t, r) {
    for (var o = 0, s = t; s < r; s++) o += e[s] >> 7;
    return r - t - o;
}, jspb.utils.countVarintFields = function(e, t, r, o) {
    var s = 0;
    if (128 > (o = 8 * o + jspb.BinaryConstants.WireType.VARINT)) for (;t < r && e[t++] == o; ) for (s++; ;) {
        var i = e[t++];
        if (0 == (128 & i)) break;
    } else for (;t < r; ) {
        for (i = o; 128 < i; ) {
            if (e[t] != (127 & i | 128)) return s;
            t++, i >>= 7;
        }
        if (e[t++] != i) break;
        for (s++; 0 != (128 & (i = e[t++])); ) ;
    }
    return s;
}, jspb.utils.countFixedFields_ = function(e, t, r, o, s) {
    var i = 0;
    if (128 > o) for (;t < r && e[t++] == o; ) i++, t += s; else for (;t < r; ) {
        for (var n = o; 128 < n; ) {
            if (e[t++] != (127 & n | 128)) return i;
            n >>= 7;
        }
        if (e[t++] != n) break;
        i++, t += s;
    }
    return i;
}, jspb.utils.countFixed32Fields = function(e, t, r, o) {
    return jspb.utils.countFixedFields_(e, t, r, 8 * o + jspb.BinaryConstants.WireType.FIXED32, 4);
}, jspb.utils.countFixed64Fields = function(e, t, r, o) {
    return jspb.utils.countFixedFields_(e, t, r, 8 * o + jspb.BinaryConstants.WireType.FIXED64, 8);
}, jspb.utils.countDelimitedFields = function(e, t, r, o) {
    var s = 0;
    for (o = 8 * o + jspb.BinaryConstants.WireType.DELIMITED; t < r; ) {
        for (var i = o; 128 < i; ) {
            if (e[t++] != (127 & i | 128)) return s;
            i >>= 7;
        }
        if (e[t++] != i) break;
        s++;
        for (var n = 0, a = 1; i = e[t++], n += (127 & i) * a, a *= 128, 0 != (128 & i); ) ;
        t += n;
    }
    return s;
}, jspb.utils.debugBytesToTextFormat = function(e) {
    var t = '"';
    if (e) {
        e = jspb.utils.byteSourceToUint8Array(e);
        for (var r = 0; r < e.length; r++) t += "\\x", 16 > e[r] && (t += "0"), t += e[r].toString(16);
    }
    return t + '"';
}, jspb.utils.debugScalarToTextFormat = function(e) {
    return goog.isString(e) ? goog.string.quote(e) : e.toString();
}, jspb.utils.stringToByteArray = function(e) {
    for (var t = new Uint8Array(e.length), r = 0; r < e.length; r++) {
        var o = e.charCodeAt(r);
        if (255 < o) throw Error("Conversion error: string contains codepoint outside of byte range");
        t[r] = o;
    }
    return t;
}, jspb.utils.byteSourceToUint8Array = function(e) {
    return e.constructor === Uint8Array ? e : e.constructor === ArrayBuffer || e.constructor === Array ? new Uint8Array(e) : e.constructor === String ? goog.crypt.base64.decodeStringToUint8Array(e) : (goog.asserts.fail("Type not convertible to Uint8Array."), 
    new Uint8Array(0));
}, jspb.BinaryIterator = function(e, t, r) {
    this.elements_ = this.nextMethod_ = this.decoder_ = null, this.cursor_ = 0, this.nextValue_ = null, 
    this.atEnd_ = !0, this.init_(e, t, r);
}, jspb.BinaryIterator.prototype.init_ = function(e, t, r) {
    e && t && (this.decoder_ = e, this.nextMethod_ = t), this.elements_ = r || null, 
    this.cursor_ = 0, this.nextValue_ = null, this.atEnd_ = !this.decoder_ && !this.elements_, 
    this.next();
}, jspb.BinaryIterator.instanceCache_ = [], jspb.BinaryIterator.alloc = function(e, t, r) {
    if (jspb.BinaryIterator.instanceCache_.length) {
        var o = jspb.BinaryIterator.instanceCache_.pop();
        return o.init_(e, t, r), o;
    }
    return new jspb.BinaryIterator(e, t, r);
}, jspb.BinaryIterator.prototype.free = function() {
    this.clear(), 100 > jspb.BinaryIterator.instanceCache_.length && jspb.BinaryIterator.instanceCache_.push(this);
}, jspb.BinaryIterator.prototype.clear = function() {
    this.decoder_ && this.decoder_.free(), this.elements_ = this.nextMethod_ = this.decoder_ = null, 
    this.cursor_ = 0, this.nextValue_ = null, this.atEnd_ = !0;
}, jspb.BinaryIterator.prototype.get = function() {
    return this.nextValue_;
}, jspb.BinaryIterator.prototype.atEnd = function() {
    return this.atEnd_;
}, jspb.BinaryIterator.prototype.next = function() {
    var e = this.nextValue_;
    return this.decoder_ ? this.decoder_.atEnd() ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.nextMethod_.call(this.decoder_) : this.elements_ && (this.cursor_ == this.elements_.length ? (this.nextValue_ = null, 
    this.atEnd_ = !0) : this.nextValue_ = this.elements_[this.cursor_++]), e;
}, jspb.BinaryDecoder = function(e, t, r) {
    this.bytes_ = null, this.tempHigh_ = this.tempLow_ = this.cursor_ = this.end_ = this.start_ = 0, 
    this.error_ = !1, e && this.setBlock(e, t, r);
}, jspb.BinaryDecoder.instanceCache_ = [], jspb.BinaryDecoder.alloc = function(e, t, r) {
    if (jspb.BinaryDecoder.instanceCache_.length) {
        var o = jspb.BinaryDecoder.instanceCache_.pop();
        return e && o.setBlock(e, t, r), o;
    }
    return new jspb.BinaryDecoder(e, t, r);
}, jspb.BinaryDecoder.prototype.free = function() {
    this.clear(), 100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
}, jspb.BinaryDecoder.prototype.clone = function() {
    return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
}, jspb.BinaryDecoder.prototype.clear = function() {
    this.bytes_ = null, this.cursor_ = this.end_ = this.start_ = 0, this.error_ = !1;
}, jspb.BinaryDecoder.prototype.getBuffer = function() {
    return this.bytes_;
}, jspb.BinaryDecoder.prototype.setBlock = function(e, t, r) {
    this.bytes_ = jspb.utils.byteSourceToUint8Array(e), this.start_ = goog.isDef(t) ? t : 0, 
    this.end_ = goog.isDef(r) ? this.start_ + r : this.bytes_.length, this.cursor_ = this.start_;
}, jspb.BinaryDecoder.prototype.getEnd = function() {
    return this.end_;
}, jspb.BinaryDecoder.prototype.setEnd = function(e) {
    this.end_ = e;
}, jspb.BinaryDecoder.prototype.reset = function() {
    this.cursor_ = this.start_;
}, jspb.BinaryDecoder.prototype.getCursor = function() {
    return this.cursor_;
}, jspb.BinaryDecoder.prototype.setCursor = function(e) {
    this.cursor_ = e;
}, jspb.BinaryDecoder.prototype.advance = function(e) {
    this.cursor_ += e, goog.asserts.assert(this.cursor_ <= this.end_);
}, jspb.BinaryDecoder.prototype.atEnd = function() {
    return this.cursor_ == this.end_;
}, jspb.BinaryDecoder.prototype.pastEnd = function() {
    return this.cursor_ > this.end_;
}, jspb.BinaryDecoder.prototype.getError = function() {
    return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
}, jspb.BinaryDecoder.prototype.readSplitVarint64_ = function() {
    for (var e, t, r = 0, o = 0; 4 > o; o++) if (e = this.bytes_[this.cursor_++], r |= (127 & e) << 7 * o, 
    128 > e) return this.tempLow_ = r >>> 0, void (this.tempHigh_ = 0);
    if (e = this.bytes_[this.cursor_++], r |= (127 & e) << 28, t = 0 | (127 & e) >> 4, 
    128 > e) this.tempLow_ = r >>> 0, this.tempHigh_ = t >>> 0; else {
        for (o = 0; 5 > o; o++) if (e = this.bytes_[this.cursor_++], t |= (127 & e) << 7 * o + 3, 
        128 > e) return this.tempLow_ = r >>> 0, void (this.tempHigh_ = t >>> 0);
        goog.asserts.fail("Failed to read varint, encoding is invalid."), this.error_ = !0;
    }
}, jspb.BinaryDecoder.prototype.skipVarint = function() {
    for (;128 & this.bytes_[this.cursor_]; ) this.cursor_++;
    this.cursor_++;
}, jspb.BinaryDecoder.prototype.unskipVarint = function(e) {
    for (;128 < e; ) this.cursor_--, e >>>= 7;
    this.cursor_--;
}, jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function() {
    var e = this.bytes_, t = e[this.cursor_ + 0], r = 127 & t;
    return 128 > t ? (this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), 
    r) : (t = e[this.cursor_ + 1], r |= (127 & t) << 7, 128 > t ? (this.cursor_ += 2, 
    goog.asserts.assert(this.cursor_ <= this.end_), r) : (t = e[this.cursor_ + 2], r |= (127 & t) << 14, 
    128 > t ? (this.cursor_ += 3, goog.asserts.assert(this.cursor_ <= this.end_), r) : (t = e[this.cursor_ + 3], 
    r |= (127 & t) << 21, 128 > t ? (this.cursor_ += 4, goog.asserts.assert(this.cursor_ <= this.end_), 
    r) : (t = e[this.cursor_ + 4], r |= (15 & t) << 28, 128 > t ? (this.cursor_ += 5, 
    goog.asserts.assert(this.cursor_ <= this.end_), r >>> 0) : (this.cursor_ += 5, 128 <= e[this.cursor_++] && 128 <= e[this.cursor_++] && 128 <= e[this.cursor_++] && 128 <= e[this.cursor_++] && 128 <= e[this.cursor_++] && goog.asserts.assert(!1), 
    goog.asserts.assert(this.cursor_ <= this.end_), r)))));
}, jspb.BinaryDecoder.prototype.readSignedVarint32 = jspb.BinaryDecoder.prototype.readUnsignedVarint32, 
jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function() {
    return this.readUnsignedVarint32().toString();
}, jspb.BinaryDecoder.prototype.readSignedVarint32String = function() {
    return this.readSignedVarint32().toString();
}, jspb.BinaryDecoder.prototype.readZigzagVarint32 = function() {
    var e = this.readUnsignedVarint32();
    return e >>> 1 ^ -(1 & e);
}, jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function() {
    return this.readSplitVarint64_(), jspb.utils.joinUint64(this.tempLow_, this.tempHigh_);
}, jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function() {
    return this.readSplitVarint64_(), jspb.utils.joinUnsignedDecimalString(this.tempLow_, this.tempHigh_);
}, jspb.BinaryDecoder.prototype.readSignedVarint64 = function() {
    return this.readSplitVarint64_(), jspb.utils.joinInt64(this.tempLow_, this.tempHigh_);
}, jspb.BinaryDecoder.prototype.readSignedVarint64String = function() {
    return this.readSplitVarint64_(), jspb.utils.joinSignedDecimalString(this.tempLow_, this.tempHigh_);
}, jspb.BinaryDecoder.prototype.readZigzagVarint64 = function() {
    return this.readSplitVarint64_(), jspb.utils.joinZigzag64(this.tempLow_, this.tempHigh_);
}, jspb.BinaryDecoder.prototype.readZigzagVarint64String = function() {
    return this.readZigzagVarint64().toString();
}, jspb.BinaryDecoder.prototype.readUint8 = function() {
    var e = this.bytes_[this.cursor_ + 0];
    return this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), e;
}, jspb.BinaryDecoder.prototype.readUint16 = function() {
    var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1];
    return this.cursor_ += 2, goog.asserts.assert(this.cursor_ <= this.end_), e << 0 | t << 8;
}, jspb.BinaryDecoder.prototype.readUint32 = function() {
    var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1], r = this.bytes_[this.cursor_ + 2], o = this.bytes_[this.cursor_ + 3];
    return this.cursor_ += 4, goog.asserts.assert(this.cursor_ <= this.end_), (e << 0 | t << 8 | r << 16 | o << 24) >>> 0;
}, jspb.BinaryDecoder.prototype.readUint64 = function() {
    var e = this.readUint32(), t = this.readUint32();
    return jspb.utils.joinUint64(e, t);
}, jspb.BinaryDecoder.prototype.readUint64String = function() {
    var e = this.readUint32(), t = this.readUint32();
    return jspb.utils.joinUnsignedDecimalString(e, t);
}, jspb.BinaryDecoder.prototype.readInt8 = function() {
    var e = this.bytes_[this.cursor_ + 0];
    return this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), e << 24 >> 24;
}, jspb.BinaryDecoder.prototype.readInt16 = function() {
    var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1];
    return this.cursor_ += 2, goog.asserts.assert(this.cursor_ <= this.end_), (e << 0 | t << 8) << 16 >> 16;
}, jspb.BinaryDecoder.prototype.readInt32 = function() {
    var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1], r = this.bytes_[this.cursor_ + 2], o = this.bytes_[this.cursor_ + 3];
    return this.cursor_ += 4, goog.asserts.assert(this.cursor_ <= this.end_), e << 0 | t << 8 | r << 16 | o << 24;
}, jspb.BinaryDecoder.prototype.readInt64 = function() {
    var e = this.readUint32(), t = this.readUint32();
    return jspb.utils.joinInt64(e, t);
}, jspb.BinaryDecoder.prototype.readInt64String = function() {
    var e = this.readUint32(), t = this.readUint32();
    return jspb.utils.joinSignedDecimalString(e, t);
}, jspb.BinaryDecoder.prototype.readFloat = function() {
    var e = this.readUint32();
    return jspb.utils.joinFloat32(e, 0);
}, jspb.BinaryDecoder.prototype.readDouble = function() {
    var e = this.readUint32(), t = this.readUint32();
    return jspb.utils.joinFloat64(e, t);
}, jspb.BinaryDecoder.prototype.readBool = function() {
    return !!this.bytes_[this.cursor_++];
}, jspb.BinaryDecoder.prototype.readEnum = function() {
    return this.readSignedVarint32();
}, jspb.BinaryDecoder.prototype.readString = function(e) {
    var t = this.bytes_, r = this.cursor_;
    e = r + e;
    for (var o = [], s = ""; r < e; ) {
        var i = t[r++];
        if (128 > i) o.push(i); else {
            if (192 > i) continue;
            if (224 > i) {
                var n = t[r++];
                o.push((31 & i) << 6 | 63 & n);
            } else if (240 > i) {
                n = t[r++];
                var a = t[r++];
                o.push((15 & i) << 12 | (63 & n) << 6 | 63 & a);
            } else 248 > i && (i = (7 & i) << 18 | (63 & (n = t[r++])) << 12 | (63 & (a = t[r++])) << 6 | 63 & t[r++], 
            i -= 65536, o.push(55296 + (i >> 10 & 1023), 56320 + (1023 & i)));
        }
        8192 <= o.length && (s += String.fromCharCode.apply(null, o), o.length = 0);
    }
    return s += goog.crypt.byteArrayToString(o), this.cursor_ = r, s;
}, jspb.BinaryDecoder.prototype.readStringWithLength = function() {
    var e = this.readUnsignedVarint32();
    return this.readString(e);
}, jspb.BinaryDecoder.prototype.readBytes = function(e) {
    if (0 > e || this.cursor_ + e > this.bytes_.length) return this.error_ = !0, goog.asserts.fail("Invalid byte length!"), 
    new Uint8Array(0);
    var t = this.bytes_.subarray(this.cursor_, this.cursor_ + e);
    return this.cursor_ += e, goog.asserts.assert(this.cursor_ <= this.end_), t;
}, jspb.BinaryDecoder.prototype.readVarintHash64 = function() {
    return this.readSplitVarint64_(), jspb.utils.joinHash64(this.tempLow_, this.tempHigh_);
}, jspb.BinaryDecoder.prototype.readFixedHash64 = function() {
    var e = this.bytes_, t = this.cursor_, r = e[t + 0], o = e[t + 1], s = e[t + 2], i = e[t + 3], n = e[t + 4], a = e[t + 5], p = e[t + 6];
    return e = e[t + 7], this.cursor_ += 8, String.fromCharCode(r, o, s, i, n, a, p, e);
}, jspb.BinaryReader = function(e, t, r) {
    this.decoder_ = jspb.BinaryDecoder.alloc(e, t, r), this.fieldCursor_ = this.decoder_.getCursor(), 
    this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER, this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID, 
    this.error_ = !1, this.readCallbacks_ = null;
}, jspb.BinaryReader.instanceCache_ = [], jspb.BinaryReader.alloc = function(e, t, r) {
    if (jspb.BinaryReader.instanceCache_.length) {
        var o = jspb.BinaryReader.instanceCache_.pop();
        return e && o.decoder_.setBlock(e, t, r), o;
    }
    return new jspb.BinaryReader(e, t, r);
}, jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc, jspb.BinaryReader.prototype.free = function() {
    this.decoder_.clear(), this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER, 
    this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID, this.error_ = !1, this.readCallbacks_ = null, 
    100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
}, jspb.BinaryReader.prototype.getFieldCursor = function() {
    return this.fieldCursor_;
}, jspb.BinaryReader.prototype.getCursor = function() {
    return this.decoder_.getCursor();
}, jspb.BinaryReader.prototype.getBuffer = function() {
    return this.decoder_.getBuffer();
}, jspb.BinaryReader.prototype.getFieldNumber = function() {
    return this.nextField_;
}, jspb.BinaryReader.prototype.getWireType = function() {
    return this.nextWireType_;
}, jspb.BinaryReader.prototype.isEndGroup = function() {
    return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
}, jspb.BinaryReader.prototype.getError = function() {
    return this.error_ || this.decoder_.getError();
}, jspb.BinaryReader.prototype.setBlock = function(e, t, r) {
    this.decoder_.setBlock(e, t, r), this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER, 
    this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
}, jspb.BinaryReader.prototype.reset = function() {
    this.decoder_.reset(), this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER, 
    this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
}, jspb.BinaryReader.prototype.advance = function(e) {
    this.decoder_.advance(e);
}, jspb.BinaryReader.prototype.nextField = function() {
    if (this.decoder_.atEnd()) return !1;
    if (this.getError()) return goog.asserts.fail("Decoder hit an error"), !1;
    this.fieldCursor_ = this.decoder_.getCursor();
    var e = this.decoder_.readUnsignedVarint32(), t = e >>> 3;
    return (e &= 7) != jspb.BinaryConstants.WireType.VARINT && e != jspb.BinaryConstants.WireType.FIXED32 && e != jspb.BinaryConstants.WireType.FIXED64 && e != jspb.BinaryConstants.WireType.DELIMITED && e != jspb.BinaryConstants.WireType.START_GROUP && e != jspb.BinaryConstants.WireType.END_GROUP ? (goog.asserts.fail("Invalid wire type"), 
    this.error_ = !0, !1) : (this.nextField_ = t, this.nextWireType_ = e, !0);
}, jspb.BinaryReader.prototype.unskipHeader = function() {
    this.decoder_.unskipVarint(this.nextField_ << 3 | this.nextWireType_);
}, jspb.BinaryReader.prototype.skipMatchingFields = function() {
    var e = this.nextField_;
    for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == e; ) this.skipField();
    this.decoder_.atEnd() || this.unskipHeader();
}, jspb.BinaryReader.prototype.skipVarintField = function() {
    this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (goog.asserts.fail("Invalid wire type for skipVarintField"), 
    this.skipField()) : this.decoder_.skipVarint();
}, jspb.BinaryReader.prototype.skipDelimitedField = function() {
    if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED) goog.asserts.fail("Invalid wire type for skipDelimitedField"), 
    this.skipField(); else {
        var e = this.decoder_.readUnsignedVarint32();
        this.decoder_.advance(e);
    }
}, jspb.BinaryReader.prototype.skipFixed32Field = function() {
    this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (goog.asserts.fail("Invalid wire type for skipFixed32Field"), 
    this.skipField()) : this.decoder_.advance(4);
}, jspb.BinaryReader.prototype.skipFixed64Field = function() {
    this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (goog.asserts.fail("Invalid wire type for skipFixed64Field"), 
    this.skipField()) : this.decoder_.advance(8);
}, jspb.BinaryReader.prototype.skipGroup = function() {
    var e = [ this.nextField_ ];
    do {
        if (!this.nextField()) {
            goog.asserts.fail("Unmatched start-group tag: stream EOF"), this.error_ = !0;
            break;
        }
        if (this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP) e.push(this.nextField_); else if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP && this.nextField_ != e.pop()) {
            goog.asserts.fail("Unmatched end-group tag"), this.error_ = !0;
            break;
        }
    } while (0 < e.length);
}, jspb.BinaryReader.prototype.skipField = function() {
    switch (this.nextWireType_) {
      case jspb.BinaryConstants.WireType.VARINT:
        this.skipVarintField();
        break;

      case jspb.BinaryConstants.WireType.FIXED64:
        this.skipFixed64Field();
        break;

      case jspb.BinaryConstants.WireType.DELIMITED:
        this.skipDelimitedField();
        break;

      case jspb.BinaryConstants.WireType.FIXED32:
        this.skipFixed32Field();
        break;

      case jspb.BinaryConstants.WireType.START_GROUP:
        this.skipGroup();
        break;

      default:
        goog.asserts.fail("Invalid wire encoding for field.");
    }
}, jspb.BinaryReader.prototype.registerReadCallback = function(e, t) {
    goog.isNull(this.readCallbacks_) && (this.readCallbacks_ = {}), goog.asserts.assert(!this.readCallbacks_[e]), 
    this.readCallbacks_[e] = t;
}, jspb.BinaryReader.prototype.runReadCallback = function(e) {
    return goog.asserts.assert(!goog.isNull(this.readCallbacks_)), e = this.readCallbacks_[e], 
    goog.asserts.assert(e), e(this);
}, jspb.BinaryReader.prototype.readAny = function(e) {
    this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(e);
    var t = jspb.BinaryConstants.FieldType;
    switch (e) {
      case t.DOUBLE:
        return this.readDouble();

      case t.FLOAT:
        return this.readFloat();

      case t.INT64:
        return this.readInt64();

      case t.UINT64:
        return this.readUint64();

      case t.INT32:
        return this.readInt32();

      case t.FIXED64:
        return this.readFixed64();

      case t.FIXED32:
        return this.readFixed32();

      case t.BOOL:
        return this.readBool();

      case t.STRING:
        return this.readString();

      case t.GROUP:
        goog.asserts.fail("Group field type not supported in readAny()");

      case t.MESSAGE:
        goog.asserts.fail("Message field type not supported in readAny()");

      case t.BYTES:
        return this.readBytes();

      case t.UINT32:
        return this.readUint32();

      case t.ENUM:
        return this.readEnum();

      case t.SFIXED32:
        return this.readSfixed32();

      case t.SFIXED64:
        return this.readSfixed64();

      case t.SINT32:
        return this.readSint32();

      case t.SINT64:
        return this.readSint64();

      case t.FHASH64:
        return this.readFixedHash64();

      case t.VHASH64:
        return this.readVarintHash64();

      default:
        goog.asserts.fail("Invalid field type in readAny()");
    }
    return 0;
}, jspb.BinaryReader.prototype.readMessage = function(e, t) {
    goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    var r = this.decoder_.getEnd(), o = this.decoder_.readUnsignedVarint32();
    o = this.decoder_.getCursor() + o, this.decoder_.setEnd(o), t(e, this), this.decoder_.setCursor(o), 
    this.decoder_.setEnd(r);
}, jspb.BinaryReader.prototype.readGroup = function(e, t, r) {
    goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP), 
    goog.asserts.assert(this.nextField_ == e), r(t, this), this.error_ || this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP || (goog.asserts.fail("Group submessage did not end with an END_GROUP tag"), 
    this.error_ = !0);
}, jspb.BinaryReader.prototype.getFieldDecoder = function() {
    goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    var e = this.decoder_.readUnsignedVarint32(), t = this.decoder_.getCursor(), r = t + e;
    return e = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), t, e), this.decoder_.setCursor(r), 
    e;
}, jspb.BinaryReader.prototype.readInt32 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readSignedVarint32();
}, jspb.BinaryReader.prototype.readInt32String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readSignedVarint32String();
}, jspb.BinaryReader.prototype.readInt64 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readSignedVarint64();
}, jspb.BinaryReader.prototype.readInt64String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readSignedVarint64String();
}, jspb.BinaryReader.prototype.readUint32 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readUnsignedVarint32();
}, jspb.BinaryReader.prototype.readUint32String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readUnsignedVarint32String();
}, jspb.BinaryReader.prototype.readUint64 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readUnsignedVarint64();
}, jspb.BinaryReader.prototype.readUint64String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readUnsignedVarint64String();
}, jspb.BinaryReader.prototype.readSint32 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readZigzagVarint32();
}, jspb.BinaryReader.prototype.readSint64 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readZigzagVarint64();
}, jspb.BinaryReader.prototype.readSint64String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readZigzagVarint64String();
}, jspb.BinaryReader.prototype.readFixed32 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32), 
    this.decoder_.readUint32();
}, jspb.BinaryReader.prototype.readFixed64 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64), 
    this.decoder_.readUint64();
}, jspb.BinaryReader.prototype.readFixed64String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64), 
    this.decoder_.readUint64String();
}, jspb.BinaryReader.prototype.readSfixed32 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32), 
    this.decoder_.readInt32();
}, jspb.BinaryReader.prototype.readSfixed32String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32), 
    this.decoder_.readInt32().toString();
}, jspb.BinaryReader.prototype.readSfixed64 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64), 
    this.decoder_.readInt64();
}, jspb.BinaryReader.prototype.readSfixed64String = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64), 
    this.decoder_.readInt64String();
}, jspb.BinaryReader.prototype.readFloat = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32), 
    this.decoder_.readFloat();
}, jspb.BinaryReader.prototype.readDouble = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64), 
    this.decoder_.readDouble();
}, jspb.BinaryReader.prototype.readBool = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    !!this.decoder_.readUnsignedVarint32();
}, jspb.BinaryReader.prototype.readEnum = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readSignedVarint64();
}, jspb.BinaryReader.prototype.readString = function() {
    goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    var e = this.decoder_.readUnsignedVarint32();
    return this.decoder_.readString(e);
}, jspb.BinaryReader.prototype.readBytes = function() {
    goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    var e = this.decoder_.readUnsignedVarint32();
    return this.decoder_.readBytes(e);
}, jspb.BinaryReader.prototype.readVarintHash64 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT), 
    this.decoder_.readVarintHash64();
}, jspb.BinaryReader.prototype.readFixedHash64 = function() {
    return goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64), 
    this.decoder_.readFixedHash64();
}, jspb.BinaryReader.prototype.readPackedField_ = function(e) {
    goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
    var t = this.decoder_.readUnsignedVarint32();
    t = this.decoder_.getCursor() + t;
    for (var r = []; this.decoder_.getCursor() < t; ) r.push(e.call(this.decoder_));
    return r;
}, jspb.BinaryReader.prototype.readPackedInt32 = function() {
    return this.readPackedField_(this.decoder_.readSignedVarint32);
}, jspb.BinaryReader.prototype.readPackedInt32String = function() {
    return this.readPackedField_(this.decoder_.readSignedVarint32String);
}, jspb.BinaryReader.prototype.readPackedInt64 = function() {
    return this.readPackedField_(this.decoder_.readSignedVarint64);
}, jspb.BinaryReader.prototype.readPackedInt64String = function() {
    return this.readPackedField_(this.decoder_.readSignedVarint64String);
}, jspb.BinaryReader.prototype.readPackedUint32 = function() {
    return this.readPackedField_(this.decoder_.readUnsignedVarint32);
}, jspb.BinaryReader.prototype.readPackedUint32String = function() {
    return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
}, jspb.BinaryReader.prototype.readPackedUint64 = function() {
    return this.readPackedField_(this.decoder_.readUnsignedVarint64);
}, jspb.BinaryReader.prototype.readPackedUint64String = function() {
    return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
}, jspb.BinaryReader.prototype.readPackedSint32 = function() {
    return this.readPackedField_(this.decoder_.readZigzagVarint32);
}, jspb.BinaryReader.prototype.readPackedSint64 = function() {
    return this.readPackedField_(this.decoder_.readZigzagVarint64);
}, jspb.BinaryReader.prototype.readPackedSint64String = function() {
    return this.readPackedField_(this.decoder_.readZigzagVarint64String);
}, jspb.BinaryReader.prototype.readPackedFixed32 = function() {
    return this.readPackedField_(this.decoder_.readUint32);
}, jspb.BinaryReader.prototype.readPackedFixed64 = function() {
    return this.readPackedField_(this.decoder_.readUint64);
}, jspb.BinaryReader.prototype.readPackedFixed64String = function() {
    return this.readPackedField_(this.decoder_.readUint64String);
}, jspb.BinaryReader.prototype.readPackedSfixed32 = function() {
    return this.readPackedField_(this.decoder_.readInt32);
}, jspb.BinaryReader.prototype.readPackedSfixed64 = function() {
    return this.readPackedField_(this.decoder_.readInt64);
}, jspb.BinaryReader.prototype.readPackedSfixed64String = function() {
    return this.readPackedField_(this.decoder_.readInt64String);
}, jspb.BinaryReader.prototype.readPackedFloat = function() {
    return this.readPackedField_(this.decoder_.readFloat);
}, jspb.BinaryReader.prototype.readPackedDouble = function() {
    return this.readPackedField_(this.decoder_.readDouble);
}, jspb.BinaryReader.prototype.readPackedBool = function() {
    return this.readPackedField_(this.decoder_.readBool);
}, jspb.BinaryReader.prototype.readPackedEnum = function() {
    return this.readPackedField_(this.decoder_.readEnum);
}, jspb.BinaryReader.prototype.readPackedVarintHash64 = function() {
    return this.readPackedField_(this.decoder_.readVarintHash64);
}, jspb.BinaryReader.prototype.readPackedFixedHash64 = function() {
    return this.readPackedField_(this.decoder_.readFixedHash64);
}, jspb.Map = function(e, t) {
    this.arr_ = e, this.valueCtor_ = t, this.map_ = {}, this.arrClean = !0, 0 < this.arr_.length && this.loadFromArray_();
}, jspb.Map.prototype.loadFromArray_ = function() {
    for (var e = 0; e < this.arr_.length; e++) {
        var t = this.arr_[e], r = t[0];
        this.map_[r.toString()] = new jspb.Map.Entry_(r, t[1]);
    }
    this.arrClean = !0;
}, jspb.Map.prototype.toArray = function() {
    if (this.arrClean) {
        if (this.valueCtor_) {
            var e, t = this.map_;
            for (e in t) if (Object.prototype.hasOwnProperty.call(t, e)) {
                var r = t[e].valueWrapper;
                r && r.toArray();
            }
        }
    } else {
        for (this.arr_.length = 0, (t = this.stringKeys_()).sort(), e = 0; e < t.length; e++) {
            var o = this.map_[t[e]];
            (r = o.valueWrapper) && r.toArray(), this.arr_.push([ o.key, o.value ]);
        }
        this.arrClean = !0;
    }
    return this.arr_;
}, jspb.Map.prototype.toObject = function(e, t) {
    for (var r = this.toArray(), o = [], s = 0; s < r.length; s++) {
        var i = this.map_[r[s][0].toString()];
        this.wrapEntry_(i);
        var n = i.valueWrapper;
        n ? (goog.asserts.assert(t), o.push([ i.key, t(e, n) ])) : o.push([ i.key, i.value ]);
    }
    return o;
}, jspb.Map.fromObject = function(e, t, r) {
    t = new jspb.Map([], t);
    for (var o = 0; o < e.length; o++) {
        var s = e[o][0], i = r(e[o][1]);
        t.set(s, i);
    }
    return t;
}, jspb.Map.ArrayIteratorIterable_ = function(e) {
    this.idx_ = 0, this.arr_ = e;
}, jspb.Map.ArrayIteratorIterable_.prototype.next = function() {
    return this.idx_ < this.arr_.length ? {
        done: !1,
        value: this.arr_[this.idx_++]
    } : {
        done: !0,
        value: void 0
    };
}, "undefined" != typeof Symbol && (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function() {
    return this;
}), jspb.Map.prototype.getLength = function() {
    return this.stringKeys_().length;
}, jspb.Map.prototype.clear = function() {
    this.map_ = {}, this.arrClean = !1;
}, jspb.Map.prototype.del = function(e) {
    e = e.toString();
    var t = this.map_.hasOwnProperty(e);
    return delete this.map_[e], this.arrClean = !1, t;
}, jspb.Map.prototype.getEntryList = function() {
    var e = [], t = this.stringKeys_();
    t.sort();
    for (var r = 0; r < t.length; r++) {
        var o = this.map_[t[r]];
        e.push([ o.key, o.value ]);
    }
    return e;
}, jspb.Map.prototype.entries = function() {
    var e = [], t = this.stringKeys_();
    t.sort();
    for (var r = 0; r < t.length; r++) {
        var o = this.map_[t[r]];
        e.push([ o.key, this.wrapEntry_(o) ]);
    }
    return new jspb.Map.ArrayIteratorIterable_(e);
}, jspb.Map.prototype.keys = function() {
    var e = [], t = this.stringKeys_();
    t.sort();
    for (var r = 0; r < t.length; r++) e.push(this.map_[t[r]].key);
    return new jspb.Map.ArrayIteratorIterable_(e);
}, jspb.Map.prototype.values = function() {
    var e = [], t = this.stringKeys_();
    t.sort();
    for (var r = 0; r < t.length; r++) e.push(this.wrapEntry_(this.map_[t[r]]));
    return new jspb.Map.ArrayIteratorIterable_(e);
}, jspb.Map.prototype.forEach = function(e, t) {
    var r = this.stringKeys_();
    r.sort();
    for (var o = 0; o < r.length; o++) {
        var s = this.map_[r[o]];
        e.call(t, this.wrapEntry_(s), s.key, this);
    }
}, jspb.Map.prototype.set = function(e, t) {
    var r = new jspb.Map.Entry_(e);
    return this.valueCtor_ ? (r.valueWrapper = t, r.value = t.toArray()) : r.value = t, 
    this.map_[e.toString()] = r, this.arrClean = !1, this;
}, jspb.Map.prototype.wrapEntry_ = function(e) {
    return this.valueCtor_ ? (e.valueWrapper || (e.valueWrapper = new this.valueCtor_(e.value)), 
    e.valueWrapper) : e.value;
}, jspb.Map.prototype.get = function(e) {
    if (e = this.map_[e.toString()]) return this.wrapEntry_(e);
}, jspb.Map.prototype.has = function(e) {
    return e.toString() in this.map_;
}, jspb.Map.prototype.serializeBinary = function(e, t, r, o, s) {
    var i = this.stringKeys_();
    i.sort();
    for (var n = 0; n < i.length; n++) {
        var a = this.map_[i[n]];
        t.beginSubMessage(e), r.call(t, 1, a.key), this.valueCtor_ ? o.call(t, 2, this.wrapEntry_(a), s) : o.call(t, 2, a.value), 
        t.endSubMessage();
    }
}, jspb.Map.deserializeBinary = function(e, t, r, o, s) {
    for (var i = void 0, n = void 0; t.nextField() && !t.isEndGroup(); ) {
        var a = t.getFieldNumber();
        1 == a ? i = r.call(t) : 2 == a && (e.valueCtor_ ? (n = new e.valueCtor_(), o.call(t, n, s)) : n = o.call(t));
    }
    goog.asserts.assert(void 0 != i), goog.asserts.assert(void 0 != n), e.set(i, n);
}, jspb.Map.prototype.stringKeys_ = function() {
    var e, t = this.map_, r = [];
    for (e in t) Object.prototype.hasOwnProperty.call(t, e) && r.push(e);
    return r;
}, jspb.Map.Entry_ = function(e, t) {
    this.key = e, this.value = t, this.valueWrapper = void 0;
}, jspb.ExtensionFieldInfo = function(e, t, r, o, s) {
    this.fieldIndex = e, this.fieldName = t, this.ctor = r, this.toObjectFn = o, this.isRepeated = s;
}, jspb.ExtensionFieldBinaryInfo = function(e, t, r, o, s, i) {
    this.fieldInfo = e, this.binaryReaderFn = t, this.binaryWriterFn = r, this.binaryMessageSerializeFn = o, 
    this.binaryMessageDeserializeFn = s, this.isPacked = i;
}, jspb.ExtensionFieldInfo.prototype.isMessageType = function() {
    return !!this.ctor;
}, jspb.Message = function() {}, jspb.Message.GENERATE_TO_OBJECT = !0, jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE, 
jspb.Message.GENERATE_TO_STRING = !0, jspb.Message.ASSUME_LOCAL_ARRAYS = !1, jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS = COMPILED, 
jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array, jspb.Message.prototype.getJsPbMessageId = function() {
    return this.messageId_;
}, jspb.Message.getIndex_ = function(e, t) {
    return t + e.arrayIndexOffset_;
}, jspb.Message.initialize = function(e, t, r, o, s, i) {
    if (e.wrappers_ = jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? null : {}, t || (t = r ? [ r ] : []), 
    e.messageId_ = r ? String(r) : void 0, e.arrayIndexOffset_ = 0 === r ? -1 : 0, e.array = t, 
    jspb.Message.initPivotAndExtensionObject_(e, o), e.convertedFloatingPointFields_ = {}, 
    s) for (t = 0; t < s.length; t++) (r = s[t]) < e.pivot_ ? (r = jspb.Message.getIndex_(e, r), 
    e.array[r] = e.array[r] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : [])) : (jspb.Message.maybeInitEmptyExtensionObject_(e), 
    e.extensionObject_[r] = e.extensionObject_[r] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : []));
    i && i.length && goog.array.forEach(i, goog.partial(jspb.Message.computeOneofCase, e));
}, jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [], 
jspb.Message.isArray_ = function(e) {
    return jspb.Message.ASSUME_LOCAL_ARRAYS ? e instanceof Array : goog.isArray(e);
}, jspb.Message.initPivotAndExtensionObject_ = function(e, t) {
    if (e.array.length) {
        var r = e.array.length - 1, o = e.array[r];
        if (o && "object" == (void 0 === o ? "undefined" : _typeof(o)) && !jspb.Message.isArray_(o) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && o instanceof Uint8Array)) return e.pivot_ = r - e.arrayIndexOffset_, 
        void (e.extensionObject_ = o);
    }
    -1 < t ? (e.pivot_ = t, e.extensionObject_ = null) : e.pivot_ = Number.MAX_VALUE;
}, jspb.Message.maybeInitEmptyExtensionObject_ = function(e) {
    var t = jspb.Message.getIndex_(e, e.pivot_);
    e.array[t] || (e.extensionObject_ = e.array[t] = {});
}, jspb.Message.toObjectList = function(e, t, r) {
    for (var o = [], s = 0; s < e.length; s++) o[s] = t.call(e[s], r, e[s]);
    return o;
}, jspb.Message.toObjectExtension = function(e, t, r, o, s) {
    for (var i in r) {
        var n = r[i], a = o.call(e, n);
        if (null != a) {
            for (var p in n.fieldName) if (n.fieldName.hasOwnProperty(p)) break;
            t[p] = n.toObjectFn ? n.isRepeated ? jspb.Message.toObjectList(a, n.toObjectFn, s) : n.toObjectFn(s, a) : a;
        }
    }
}, jspb.Message.serializeBinaryExtensions = function(e, t, r, o) {
    for (var s in r) {
        var i = r[s], n = i.fieldInfo;
        if (!i.binaryWriterFn) throw Error("Message extension present that was generated without binary serialization support");
        var a = o.call(e, n);
        if (null != a) if (n.isMessageType()) {
            if (!i.binaryMessageSerializeFn) throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
            i.binaryWriterFn.call(t, n.fieldIndex, a, i.binaryMessageSerializeFn);
        } else i.binaryWriterFn.call(t, n.fieldIndex, a);
    }
}, jspb.Message.readBinaryExtension = function(e, t, r, o, s) {
    var i = r[t.getFieldNumber()];
    if (i) {
        if (r = i.fieldInfo, !i.binaryReaderFn) throw Error("Deserializing extension whose generated code does not support binary format");
        if (r.isMessageType()) {
            var n = new r.ctor();
            i.binaryReaderFn.call(t, n, i.binaryMessageDeserializeFn);
        } else n = i.binaryReaderFn.call(t);
        r.isRepeated && !i.isPacked ? (t = o.call(e, r)) ? t.push(n) : s.call(e, r, [ n ]) : s.call(e, r, n);
    } else t.skipField();
}, jspb.Message.getField = function(e, t) {
    if (t < e.pivot_) {
        t = jspb.Message.getIndex_(e, t);
        var r = e.array[t];
        return r === jspb.Message.EMPTY_LIST_SENTINEL_ ? e.array[t] = [] : r;
    }
    if (e.extensionObject_) return (r = e.extensionObject_[t]) === jspb.Message.EMPTY_LIST_SENTINEL_ ? e.extensionObject_[t] = [] : r;
}, jspb.Message.getRepeatedField = function(e, t) {
    if (t < e.pivot_) {
        t = jspb.Message.getIndex_(e, t);
        var r = e.array[t];
        return r === jspb.Message.EMPTY_LIST_SENTINEL_ ? e.array[t] = [] : r;
    }
    return (r = e.extensionObject_[t]) === jspb.Message.EMPTY_LIST_SENTINEL_ ? e.extensionObject_[t] = [] : r;
}, jspb.Message.getOptionalFloatingPointField = function(e, t) {
    return null == (e = jspb.Message.getField(e, t)) ? e : +e;
}, jspb.Message.getRepeatedFloatingPointField = function(e, t) {
    var r = jspb.Message.getRepeatedField(e, t);
    if (e.convertedFloatingPointFields_ || (e.convertedFloatingPointFields_ = {}), !e.convertedFloatingPointFields_[t]) {
        for (var o = 0; o < r.length; o++) r[o] = +r[o];
        e.convertedFloatingPointFields_[t] = !0;
    }
    return r;
}, jspb.Message.bytesAsB64 = function(e) {
    return null == e || goog.isString(e) ? e : jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array ? goog.crypt.base64.encodeByteArray(e) : (goog.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf(e)), 
    null);
}, jspb.Message.bytesAsU8 = function(e) {
    return null == e || e instanceof Uint8Array ? e : goog.isString(e) ? goog.crypt.base64.decodeStringToUint8Array(e) : (goog.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf(e)), 
    null);
}, jspb.Message.bytesListAsB64 = function(e) {
    return jspb.Message.assertConsistentTypes_(e), !e.length || goog.isString(e[0]) ? e : goog.array.map(e, jspb.Message.bytesAsB64);
}, jspb.Message.bytesListAsU8 = function(e) {
    return jspb.Message.assertConsistentTypes_(e), !e.length || e[0] instanceof Uint8Array ? e : goog.array.map(e, jspb.Message.bytesAsU8);
}, jspb.Message.assertConsistentTypes_ = function(e) {
    if (goog.DEBUG && e && 1 < e.length) {
        var t = goog.typeOf(e[0]);
        goog.array.forEach(e, function(e) {
            goog.typeOf(e) != t && goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf(e) + " expected " + t);
        });
    }
}, jspb.Message.getFieldWithDefault = function(e, t, r) {
    return null == (e = jspb.Message.getField(e, t)) ? r : e;
}, jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault, jspb.Message.getMapField = function(e, t, r, o) {
    return e.wrappers_ || (e.wrappers_ = {}), t in e.wrappers_ ? e.wrappers_[t] : r ? void 0 : ((r = jspb.Message.getField(e, t)) || (r = [], 
    jspb.Message.setField(e, t, r)), e.wrappers_[t] = new jspb.Map(r, o));
}, jspb.Message.setField = function(e, t, r) {
    t < e.pivot_ ? e.array[jspb.Message.getIndex_(e, t)] = r : (jspb.Message.maybeInitEmptyExtensionObject_(e), 
    e.extensionObject_[t] = r);
}, jspb.Message.setProto3IntField = function(e, t, r) {
    jspb.Message.setFieldIgnoringDefault_(e, t, r, 0);
}, jspb.Message.setProto3FloatField = function(e, t, r) {
    jspb.Message.setFieldIgnoringDefault_(e, t, r, 0);
}, jspb.Message.setProto3BooleanField = function(e, t, r) {
    jspb.Message.setFieldIgnoringDefault_(e, t, r, !1);
}, jspb.Message.setProto3StringField = function(e, t, r) {
    jspb.Message.setFieldIgnoringDefault_(e, t, r, "");
}, jspb.Message.setProto3BytesField = function(e, t, r) {
    jspb.Message.setFieldIgnoringDefault_(e, t, r, "");
}, jspb.Message.setProto3EnumField = function(e, t, r) {
    jspb.Message.setFieldIgnoringDefault_(e, t, r, 0);
}, jspb.Message.setFieldIgnoringDefault_ = function(e, t, r, o) {
    r != o ? jspb.Message.setField(e, t, r) : e.array[jspb.Message.getIndex_(e, t)] = null;
}, jspb.Message.addToRepeatedField = function(e, t, r, o) {
    e = jspb.Message.getRepeatedField(e, t), void 0 != o ? e.splice(o, 0, r) : e.push(r);
}, jspb.Message.setOneofField = function(e, t, r, o) {
    (r = jspb.Message.computeOneofCase(e, r)) && r !== t && void 0 !== o && (e.wrappers_ && r in e.wrappers_ && (e.wrappers_[r] = void 0), 
    jspb.Message.setField(e, r, void 0)), jspb.Message.setField(e, t, o);
}, jspb.Message.computeOneofCase = function(e, t) {
    var r, o;
    return goog.array.forEach(t, function(t) {
        var s = jspb.Message.getField(e, t);
        goog.isDefAndNotNull(s) && (r = t, o = s, jspb.Message.setField(e, t, void 0));
    }), r ? (jspb.Message.setField(e, r, o), r) : 0;
}, jspb.Message.getWrapperField = function(e, t, r, o) {
    if (e.wrappers_ || (e.wrappers_ = {}), !e.wrappers_[r]) {
        var s = jspb.Message.getField(e, r);
        (o || s) && (e.wrappers_[r] = new t(s));
    }
    return e.wrappers_[r];
}, jspb.Message.getRepeatedWrapperField = function(e, t, r) {
    return jspb.Message.wrapRepeatedField_(e, t, r), (t = e.wrappers_[r]) == jspb.Message.EMPTY_LIST_SENTINEL_ && (t = e.wrappers_[r] = []), 
    t;
}, jspb.Message.wrapRepeatedField_ = function(e, t, r) {
    if (e.wrappers_ || (e.wrappers_ = {}), !e.wrappers_[r]) {
        for (var o = jspb.Message.getRepeatedField(e, r), s = [], i = 0; i < o.length; i++) s[i] = new t(o[i]);
        e.wrappers_[r] = s;
    }
}, jspb.Message.setWrapperField = function(e, t, r) {
    e.wrappers_ || (e.wrappers_ = {});
    var o = r ? r.toArray() : r;
    e.wrappers_[t] = r, jspb.Message.setField(e, t, o);
}, jspb.Message.setOneofWrapperField = function(e, t, r, o) {
    e.wrappers_ || (e.wrappers_ = {});
    var s = o ? o.toArray() : o;
    e.wrappers_[t] = o, jspb.Message.setOneofField(e, t, r, s);
}, jspb.Message.setRepeatedWrapperField = function(e, t, r) {
    e.wrappers_ || (e.wrappers_ = {}), r = r || [];
    for (var o = [], s = 0; s < r.length; s++) o[s] = r[s].toArray();
    e.wrappers_[t] = r, jspb.Message.setField(e, t, o);
}, jspb.Message.addToRepeatedWrapperField = function(e, t, r, o, s) {
    jspb.Message.wrapRepeatedField_(e, o, t);
    var i = e.wrappers_[t];
    return i || (i = e.wrappers_[t] = []), r = r || new o(), e = jspb.Message.getRepeatedField(e, t), 
    void 0 != s ? (i.splice(s, 0, r), e.splice(s, 0, r.toArray())) : (i.push(r), e.push(r.toArray())), 
    r;
}, jspb.Message.toMap = function(e, t, r, o) {
    for (var s = {}, i = 0; i < e.length; i++) s[t.call(e[i])] = r ? r.call(e[i], o, e[i]) : e[i];
    return s;
}, jspb.Message.prototype.syncMapFields_ = function() {
    if (this.wrappers_) for (var e in this.wrappers_) {
        var t = this.wrappers_[e];
        if (goog.isArray(t)) for (var r = 0; r < t.length; r++) t[r] && t[r].toArray(); else t && t.toArray();
    }
}, jspb.Message.prototype.toArray = function() {
    return this.syncMapFields_(), this.array;
}, jspb.Message.GENERATE_TO_STRING && (jspb.Message.prototype.toString = function() {
    return this.syncMapFields_(), this.array.toString();
}), jspb.Message.prototype.getExtension = function(e) {
    if (this.extensionObject_) {
        this.wrappers_ || (this.wrappers_ = {});
        var t = e.fieldIndex;
        if (e.isRepeated) {
            if (e.isMessageType()) return this.wrappers_[t] || (this.wrappers_[t] = goog.array.map(this.extensionObject_[t] || [], function(t) {
                return new e.ctor(t);
            })), this.wrappers_[t];
        } else if (e.isMessageType()) return !this.wrappers_[t] && this.extensionObject_[t] && (this.wrappers_[t] = new e.ctor(this.extensionObject_[t])), 
        this.wrappers_[t];
        return this.extensionObject_[t];
    }
}, jspb.Message.prototype.setExtension = function(e, t) {
    this.wrappers_ || (this.wrappers_ = {}), jspb.Message.maybeInitEmptyExtensionObject_(this);
    var r = e.fieldIndex;
    return e.isRepeated ? (t = t || [], e.isMessageType() ? (this.wrappers_[r] = t, 
    this.extensionObject_[r] = goog.array.map(t, function(e) {
        return e.toArray();
    })) : this.extensionObject_[r] = t) : e.isMessageType() ? (this.wrappers_[r] = t, 
    this.extensionObject_[r] = t ? t.toArray() : t) : this.extensionObject_[r] = t, 
    this;
}, jspb.Message.difference = function(e, t) {
    if (!(e instanceof t.constructor)) throw Error("Messages have different types.");
    var r = e.toArray();
    t = t.toArray();
    var o = [], s = 0, i = r.length > t.length ? r.length : t.length;
    for (e.getJsPbMessageId() && (o[0] = e.getJsPbMessageId(), s = 1); s < i; s++) jspb.Message.compareFields(r[s], t[s]) || (o[s] = t[s]);
    return new e.constructor(o);
}, jspb.Message.equals = function(e, t) {
    return e == t || !(!e || !t) && e instanceof t.constructor && jspb.Message.compareFields(e.toArray(), t.toArray());
}, jspb.Message.compareExtensions = function(e, t) {
    e = e || {}, t = t || {};
    var r, o = {};
    for (r in e) o[r] = 0;
    for (r in t) o[r] = 0;
    for (r in o) if (!jspb.Message.compareFields(e[r], t[r])) return !1;
    return !0;
}, jspb.Message.compareFields = function(e, t) {
    if (e == t) return !0;
    if (!goog.isObject(e) || !goog.isObject(t) || e.constructor != t.constructor) return !1;
    if (jspb.Message.SUPPORTS_UINT8ARRAY_ && e.constructor === Uint8Array) {
        if (e.length != t.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r] != t[r]) return !1;
        return !0;
    }
    if (e.constructor === Array) {
        var o = void 0, s = void 0, i = Math.max(e.length, t.length);
        for (r = 0; r < i; r++) {
            var n = e[r], a = t[r];
            if (n && n.constructor == Object && (goog.asserts.assert(void 0 === o), goog.asserts.assert(r === e.length - 1), 
            o = n, n = void 0), a && a.constructor == Object && (goog.asserts.assert(void 0 === s), 
            goog.asserts.assert(r === t.length - 1), s = a, a = void 0), !jspb.Message.compareFields(n, a)) return !1;
        }
        return !o && !s || (o = o || {}, s = s || {}, jspb.Message.compareExtensions(o, s));
    }
    if (e.constructor === Object) return jspb.Message.compareExtensions(e, t);
    throw Error("Invalid type in JSPB array");
}, jspb.Message.prototype.cloneMessage = function() {
    return jspb.Message.cloneMessage(this);
}, jspb.Message.prototype.clone = function() {
    return jspb.Message.cloneMessage(this);
}, jspb.Message.clone = function(e) {
    return jspb.Message.cloneMessage(e);
}, jspb.Message.cloneMessage = function(e) {
    return new e.constructor(jspb.Message.clone_(e.toArray()));
}, jspb.Message.copyInto = function(e, t) {
    goog.asserts.assertInstanceof(e, jspb.Message), goog.asserts.assertInstanceof(t, jspb.Message), 
    goog.asserts.assert(e.constructor == t.constructor, "Copy source and target message should have the same type."), 
    e = jspb.Message.clone(e);
    for (var r = t.toArray(), o = e.toArray(), s = r.length = 0; s < o.length; s++) r[s] = o[s];
    t.wrappers_ = e.wrappers_, t.extensionObject_ = e.extensionObject_;
}, jspb.Message.clone_ = function(e) {
    var t;
    if (goog.isArray(e)) {
        for (var r = Array(e.length), o = 0; o < e.length; o++) null != (t = e[o]) && (r[o] = "object" == (void 0 === t ? "undefined" : _typeof(t)) ? jspb.Message.clone_(t) : t);
        return r;
    }
    if (jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array) return new Uint8Array(e);
    r = {};
    for (o in e) null != (t = e[o]) && (r[o] = "object" == (void 0 === t ? "undefined" : _typeof(t)) ? jspb.Message.clone_(t) : t);
    return r;
}, jspb.Message.registerMessageType = function(e, t) {
    jspb.Message.registry_[e] = t, t.messageId = e;
}, jspb.Message.registry_ = {}, jspb.Message.messageSetExtensions = {}, jspb.Message.messageSetExtensionsBinary = {}, 
jspb.arith = {}, jspb.arith.UInt64 = function(e, t) {
    this.lo = e, this.hi = t;
}, jspb.arith.UInt64.prototype.cmp = function(e) {
    return this.hi < e.hi || this.hi == e.hi && this.lo < e.lo ? -1 : this.hi == e.hi && this.lo == e.lo ? 0 : 1;
}, jspb.arith.UInt64.prototype.rightShift = function() {
    return new jspb.arith.UInt64((this.lo >>> 1 | (1 & this.hi) << 31) >>> 0, this.hi >>> 1 >>> 0);
}, jspb.arith.UInt64.prototype.leftShift = function() {
    return new jspb.arith.UInt64(this.lo << 1 >>> 0, (this.hi << 1 | this.lo >>> 31) >>> 0);
}, jspb.arith.UInt64.prototype.msb = function() {
    return !!(2147483648 & this.hi);
}, jspb.arith.UInt64.prototype.lsb = function() {
    return !!(1 & this.lo);
}, jspb.arith.UInt64.prototype.zero = function() {
    return 0 == this.lo && 0 == this.hi;
}, jspb.arith.UInt64.prototype.add = function(e) {
    return new jspb.arith.UInt64((this.lo + e.lo & 4294967295) >>> 0 >>> 0, ((this.hi + e.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + e.lo ? 1 : 0) >>> 0);
}, jspb.arith.UInt64.prototype.sub = function(e) {
    return new jspb.arith.UInt64((this.lo - e.lo & 4294967295) >>> 0 >>> 0, ((this.hi - e.hi & 4294967295) >>> 0) - (0 > this.lo - e.lo ? 1 : 0) >>> 0);
}, jspb.arith.UInt64.mul32x32 = function(e, t) {
    var r = 65535 & e, o = 65535 & t, s = t >>> 16;
    for (t = r * o + 65536 * (r * s & 65535) + 65536 * ((e >>>= 16) * o & 65535), r = e * s + (r * s >>> 16) + (e * o >>> 16); 4294967296 <= t; ) t -= 4294967296, 
    r += 1;
    return new jspb.arith.UInt64(t >>> 0, r >>> 0);
}, jspb.arith.UInt64.prototype.mul = function(e) {
    var t = jspb.arith.UInt64.mul32x32(this.lo, e);
    return e = jspb.arith.UInt64.mul32x32(this.hi, e), e.hi = e.lo, e.lo = 0, t.add(e);
}, jspb.arith.UInt64.prototype.div = function(e) {
    if (0 == e) return [];
    var t = new jspb.arith.UInt64(0, 0), r = new jspb.arith.UInt64(this.lo, this.hi);
    e = new jspb.arith.UInt64(e, 0);
    for (var o = new jspb.arith.UInt64(1, 0); !e.msb(); ) e = e.leftShift(), o = o.leftShift();
    for (;!o.zero(); ) 0 >= e.cmp(r) && (t = t.add(o), r = r.sub(e)), e = e.rightShift(), 
    o = o.rightShift();
    return [ t, r ];
}, jspb.arith.UInt64.prototype.toString = function() {
    for (var e = "", t = this; !t.zero(); ) {
        var r = (t = t.div(10))[0];
        e = t[1].lo + e, t = r;
    }
    return "" == e && (e = "0"), e;
}, jspb.arith.UInt64.fromString = function(e) {
    for (var t = new jspb.arith.UInt64(0, 0), r = new jspb.arith.UInt64(0, 0), o = 0; o < e.length; o++) {
        if ("0" > e[o] || "9" < e[o]) return null;
        var s = parseInt(e[o], 10);
        r.lo = s, t = t.mul(10).add(r);
    }
    return t;
}, jspb.arith.UInt64.prototype.clone = function() {
    return new jspb.arith.UInt64(this.lo, this.hi);
}, jspb.arith.Int64 = function(e, t) {
    this.lo = e, this.hi = t;
}, jspb.arith.Int64.prototype.add = function(e) {
    return new jspb.arith.Int64((this.lo + e.lo & 4294967295) >>> 0 >>> 0, ((this.hi + e.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + e.lo ? 1 : 0) >>> 0);
}, jspb.arith.Int64.prototype.sub = function(e) {
    return new jspb.arith.Int64((this.lo - e.lo & 4294967295) >>> 0 >>> 0, ((this.hi - e.hi & 4294967295) >>> 0) - (0 > this.lo - e.lo ? 1 : 0) >>> 0);
}, jspb.arith.Int64.prototype.clone = function() {
    return new jspb.arith.Int64(this.lo, this.hi);
}, jspb.arith.Int64.prototype.toString = function() {
    var e = 0 != (2147483648 & this.hi), t = new jspb.arith.UInt64(this.lo, this.hi);
    return e && (t = new jspb.arith.UInt64(0, 0).sub(t)), (e ? "-" : "") + t.toString();
}, jspb.arith.Int64.fromString = function(e) {
    var t = 0 < e.length && "-" == e[0];
    return t && (e = e.substring(1)), null === (e = jspb.arith.UInt64.fromString(e)) ? null : (t && (e = new jspb.arith.UInt64(0, 0).sub(e)), 
    new jspb.arith.Int64(e.lo, e.hi));
}, jspb.BinaryEncoder = function() {
    this.buffer_ = [];
}, jspb.BinaryEncoder.prototype.length = function() {
    return this.buffer_.length;
}, jspb.BinaryEncoder.prototype.end = function() {
    var e = this.buffer_;
    return this.buffer_ = [], e;
}, jspb.BinaryEncoder.prototype.writeSplitVarint64 = function(e, t) {
    for (goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(t == Math.floor(t)), 
    goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32), goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32); 0 < t || 127 < e; ) this.buffer_.push(127 & e | 128), 
    e = (e >>> 7 | t << 25) >>> 0, t >>>= 7;
    this.buffer_.push(e);
}, jspb.BinaryEncoder.prototype.writeSplitFixed64 = function(e, t) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(t == Math.floor(t)), 
    goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32), goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32), 
    this.writeUint32(e), this.writeUint32(t);
}, jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function(e) {
    for (goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32); 127 < e; ) this.buffer_.push(127 & e | 128), 
    e >>>= 7;
    this.buffer_.push(e);
}, jspb.BinaryEncoder.prototype.writeSignedVarint32 = function(e) {
    if (goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31), 
    0 <= e) this.writeUnsignedVarint32(e); else {
        for (var t = 0; 9 > t; t++) this.buffer_.push(127 & e | 128), e >>= 7;
        this.buffer_.push(1);
    }
}, jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_64), 
    jspb.utils.splitInt64(e), this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeSignedVarint64 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_63 && e < jspb.BinaryConstants.TWO_TO_63), 
    jspb.utils.splitInt64(e), this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31), 
    this.writeUnsignedVarint32((e << 1 ^ e >> 31) >>> 0);
}, jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_63 && e < jspb.BinaryConstants.TWO_TO_63), 
    jspb.utils.splitZigzag64(e), this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function(e) {
    this.writeZigzagVarint64(parseInt(e, 10));
}, jspb.BinaryEncoder.prototype.writeUint8 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(0 <= e && 256 > e), 
    this.buffer_.push(e >>> 0 & 255);
}, jspb.BinaryEncoder.prototype.writeUint16 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(0 <= e && 65536 > e), 
    this.buffer_.push(e >>> 0 & 255), this.buffer_.push(e >>> 8 & 255);
}, jspb.BinaryEncoder.prototype.writeUint32 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32), 
    this.buffer_.push(e >>> 0 & 255), this.buffer_.push(e >>> 8 & 255), this.buffer_.push(e >>> 16 & 255), 
    this.buffer_.push(e >>> 24 & 255);
}, jspb.BinaryEncoder.prototype.writeUint64 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_64), 
    jspb.utils.splitUint64(e), this.writeUint32(jspb.utils.split64Low), this.writeUint32(jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeInt8 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(-128 <= e && 128 > e), 
    this.buffer_.push(e >>> 0 & 255);
}, jspb.BinaryEncoder.prototype.writeInt16 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(-32768 <= e && 32768 > e), 
    this.buffer_.push(e >>> 0 & 255), this.buffer_.push(e >>> 8 & 255);
}, jspb.BinaryEncoder.prototype.writeInt32 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31), 
    this.buffer_.push(e >>> 0 & 255), this.buffer_.push(e >>> 8 & 255), this.buffer_.push(e >>> 16 & 255), 
    this.buffer_.push(e >>> 24 & 255);
}, jspb.BinaryEncoder.prototype.writeInt64 = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_63 && e < jspb.BinaryConstants.TWO_TO_63), 
    jspb.utils.splitInt64(e), this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeInt64String = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(+e >= -jspb.BinaryConstants.TWO_TO_63 && +e < jspb.BinaryConstants.TWO_TO_63), 
    jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e)), this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeFloat = function(e) {
    goog.asserts.assert(e >= -jspb.BinaryConstants.FLOAT32_MAX && e <= jspb.BinaryConstants.FLOAT32_MAX), 
    jspb.utils.splitFloat32(e), this.writeUint32(jspb.utils.split64Low);
}, jspb.BinaryEncoder.prototype.writeDouble = function(e) {
    goog.asserts.assert(e >= -jspb.BinaryConstants.FLOAT64_MAX && e <= jspb.BinaryConstants.FLOAT64_MAX), 
    jspb.utils.splitFloat64(e), this.writeUint32(jspb.utils.split64Low), this.writeUint32(jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeBool = function(e) {
    goog.asserts.assert(goog.isBoolean(e) || goog.isNumber(e)), this.buffer_.push(e ? 1 : 0);
}, jspb.BinaryEncoder.prototype.writeEnum = function(e) {
    goog.asserts.assert(e == Math.floor(e)), goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31), 
    this.writeSignedVarint32(e);
}, jspb.BinaryEncoder.prototype.writeBytes = function(e) {
    this.buffer_.push.apply(this.buffer_, e);
}, jspb.BinaryEncoder.prototype.writeVarintHash64 = function(e) {
    jspb.utils.splitHash64(e), this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeFixedHash64 = function(e) {
    jspb.utils.splitHash64(e), this.writeUint32(jspb.utils.split64Low), this.writeUint32(jspb.utils.split64High);
}, jspb.BinaryEncoder.prototype.writeString = function(e) {
    for (var t = this.buffer_.length, r = 0; r < e.length; r++) {
        var o = e.charCodeAt(r);
        if (128 > o) this.buffer_.push(o); else if (2048 > o) this.buffer_.push(o >> 6 | 192), 
        this.buffer_.push(63 & o | 128); else if (65536 > o) if (55296 <= o && 56319 >= o && r + 1 < e.length) {
            var s = e.charCodeAt(r + 1);
            56320 <= s && 57343 >= s && (o = 1024 * (o - 55296) + s - 56320 + 65536, this.buffer_.push(o >> 18 | 240), 
            this.buffer_.push(o >> 12 & 63 | 128), this.buffer_.push(o >> 6 & 63 | 128), this.buffer_.push(63 & o | 128), 
            r++);
        } else this.buffer_.push(o >> 12 | 224), this.buffer_.push(o >> 6 & 63 | 128), this.buffer_.push(63 & o | 128);
    }
    return this.buffer_.length - t;
}, jspb.BinaryWriter = function() {
    this.blocks_ = [], this.totalLength_ = 0, this.encoder_ = new jspb.BinaryEncoder(), 
    this.bookmarks_ = [];
}, jspb.BinaryWriter.prototype.appendUint8Array_ = function(e) {
    var t = this.encoder_.end();
    this.blocks_.push(t), this.blocks_.push(e), this.totalLength_ += t.length + e.length;
}, jspb.BinaryWriter.prototype.beginDelimited_ = function(e) {
    return this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), e = this.encoder_.end(), 
    this.blocks_.push(e), this.totalLength_ += e.length, e.push(this.totalLength_), 
    e;
}, jspb.BinaryWriter.prototype.endDelimited_ = function(e) {
    var t = e.pop();
    for (t = this.totalLength_ + this.encoder_.length() - t, goog.asserts.assert(0 <= t); 127 < t; ) e.push(127 & t | 128), 
    t >>>= 7, this.totalLength_++;
    e.push(t), this.totalLength_++;
}, jspb.BinaryWriter.prototype.writeSerializedMessage = function(e, t, r) {
    this.appendUint8Array_(e.subarray(t, r));
}, jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function(e, t, r) {
    null != e && null != t && null != r && this.writeSerializedMessage(e, t, r);
}, jspb.BinaryWriter.prototype.reset = function() {
    this.blocks_ = [], this.encoder_.end(), this.totalLength_ = 0, this.bookmarks_ = [];
}, jspb.BinaryWriter.prototype.getResultBuffer = function() {
    goog.asserts.assert(0 == this.bookmarks_.length);
    for (var e = new Uint8Array(this.totalLength_ + this.encoder_.length()), t = this.blocks_, r = t.length, o = 0, s = 0; s < r; s++) {
        var i = t[s];
        e.set(i, o), o += i.length;
    }
    return t = this.encoder_.end(), e.set(t, o), o += t.length, goog.asserts.assert(o == e.length), 
    this.blocks_ = [ e ], e;
}, jspb.BinaryWriter.prototype.getResultBase64String = function() {
    return goog.crypt.base64.encodeByteArray(this.getResultBuffer());
}, jspb.BinaryWriter.prototype.beginSubMessage = function(e) {
    this.bookmarks_.push(this.beginDelimited_(e));
}, jspb.BinaryWriter.prototype.endSubMessage = function() {
    goog.asserts.assert(0 <= this.bookmarks_.length), this.endDelimited_(this.bookmarks_.pop());
}, jspb.BinaryWriter.prototype.writeFieldHeader_ = function(e, t) {
    goog.asserts.assert(1 <= e && e == Math.floor(e)), this.encoder_.writeUnsignedVarint32(8 * e + t);
}, jspb.BinaryWriter.prototype.writeAny = function(e, t, r) {
    var o = jspb.BinaryConstants.FieldType;
    switch (e) {
      case o.DOUBLE:
        this.writeDouble(t, r);
        break;

      case o.FLOAT:
        this.writeFloat(t, r);
        break;

      case o.INT64:
        this.writeInt64(t, r);
        break;

      case o.UINT64:
        this.writeUint64(t, r);
        break;

      case o.INT32:
        this.writeInt32(t, r);
        break;

      case o.FIXED64:
        this.writeFixed64(t, r);
        break;

      case o.FIXED32:
        this.writeFixed32(t, r);
        break;

      case o.BOOL:
        this.writeBool(t, r);
        break;

      case o.STRING:
        this.writeString(t, r);
        break;

      case o.GROUP:
        goog.asserts.fail("Group field type not supported in writeAny()");
        break;

      case o.MESSAGE:
        goog.asserts.fail("Message field type not supported in writeAny()");
        break;

      case o.BYTES:
        this.writeBytes(t, r);
        break;

      case o.UINT32:
        this.writeUint32(t, r);
        break;

      case o.ENUM:
        this.writeEnum(t, r);
        break;

      case o.SFIXED32:
        this.writeSfixed32(t, r);
        break;

      case o.SFIXED64:
        this.writeSfixed64(t, r);
        break;

      case o.SINT32:
        this.writeSint32(t, r);
        break;

      case o.SINT64:
        this.writeSint64(t, r);
        break;

      case o.FHASH64:
        this.writeFixedHash64(t, r);
        break;

      case o.VHASH64:
        this.writeVarintHash64(t, r);
        break;

      default:
        goog.asserts.fail("Invalid field type in writeAny()");
    }
}, jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(t));
}, jspb.BinaryWriter.prototype.writeSignedVarint32_ = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(t));
}, jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(t));
}, jspb.BinaryWriter.prototype.writeSignedVarint64_ = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(t));
}, jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(t));
}, jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(t));
}, jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64String(t));
}, jspb.BinaryWriter.prototype.writeInt32 = function(e, t) {
    null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
    this.writeSignedVarint32_(e, t));
}, jspb.BinaryWriter.prototype.writeInt32String = function(e, t) {
    null != t && (t = parseInt(t, 10), goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
    this.writeSignedVarint32_(e, t));
}, jspb.BinaryWriter.prototype.writeInt64 = function(e, t) {
    null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_63 && t < jspb.BinaryConstants.TWO_TO_63), 
    this.writeSignedVarint64_(e, t));
}, jspb.BinaryWriter.prototype.writeInt64String = function(e, t) {
    null != t && (t = jspb.arith.Int64.fromString(t), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), 
    this.encoder_.writeSplitVarint64(t.lo, t.hi));
}, jspb.BinaryWriter.prototype.writeUint32 = function(e, t) {
    null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32), 
    this.writeUnsignedVarint32_(e, t));
}, jspb.BinaryWriter.prototype.writeUint32String = function(e, t) {
    null != t && (t = parseInt(t, 10), goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32), 
    this.writeUnsignedVarint32_(e, t));
}, jspb.BinaryWriter.prototype.writeUint64 = function(e, t) {
    null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_64), 
    this.writeUnsignedVarint64_(e, t));
}, jspb.BinaryWriter.prototype.writeUint64String = function(e, t) {
    null != t && (t = jspb.arith.UInt64.fromString(t), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), 
    this.encoder_.writeSplitVarint64(t.lo, t.hi));
}, jspb.BinaryWriter.prototype.writeSint32 = function(e, t) {
    null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
    this.writeZigzagVarint32_(e, t));
}, jspb.BinaryWriter.prototype.writeSint64 = function(e, t) {
    null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_63 && t < jspb.BinaryConstants.TWO_TO_63), 
    this.writeZigzagVarint64_(e, t));
}, jspb.BinaryWriter.prototype.writeSint64String = function(e, t) {
    null != t && (goog.asserts.assert(+t >= -jspb.BinaryConstants.TWO_TO_63 && +t < jspb.BinaryConstants.TWO_TO_63), 
    this.writeZigzagVarint64String_(e, t));
}, jspb.BinaryWriter.prototype.writeFixed32 = function(e, t) {
    null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32), 
    this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeUint32(t));
}, jspb.BinaryWriter.prototype.writeFixed64 = function(e, t) {
    null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_64), 
    this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeUint64(t));
}, jspb.BinaryWriter.prototype.writeFixed64String = function(e, t) {
    null != t && (t = jspb.arith.UInt64.fromString(t), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), 
    this.encoder_.writeSplitFixed64(t.lo, t.hi));
}, jspb.BinaryWriter.prototype.writeSfixed32 = function(e, t) {
    null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
    this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeInt32(t));
}, jspb.BinaryWriter.prototype.writeSfixed64 = function(e, t) {
    null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_63 && t < jspb.BinaryConstants.TWO_TO_63), 
    this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeInt64(t));
}, jspb.BinaryWriter.prototype.writeSfixed64String = function(e, t) {
    null != t && (t = jspb.arith.Int64.fromString(t), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), 
    this.encoder_.writeSplitFixed64(t.lo, t.hi));
}, jspb.BinaryWriter.prototype.writeFloat = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32), 
    this.encoder_.writeFloat(t));
}, jspb.BinaryWriter.prototype.writeDouble = function(e, t) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), 
    this.encoder_.writeDouble(t));
}, jspb.BinaryWriter.prototype.writeBool = function(e, t) {
    null != t && (goog.asserts.assert(goog.isBoolean(t) || goog.isNumber(t)), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), 
    this.encoder_.writeBool(t));
}, jspb.BinaryWriter.prototype.writeEnum = function(e, t) {
    null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
    this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(t));
}, jspb.BinaryWriter.prototype.writeString = function(e, t) {
    null != t && (e = this.beginDelimited_(e), this.encoder_.writeString(t), this.endDelimited_(e));
}, jspb.BinaryWriter.prototype.writeBytes = function(e, t) {
    null != t && (t = jspb.utils.byteSourceToUint8Array(t), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(t.length), this.appendUint8Array_(t));
}, jspb.BinaryWriter.prototype.writeMessage = function(e, t, r) {
    null != t && (e = this.beginDelimited_(e), r(t, this), this.endDelimited_(e));
}, jspb.BinaryWriter.prototype.writeGroup = function(e, t, r) {
    null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.START_GROUP), 
    r(t, this), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.END_GROUP));
}, jspb.BinaryWriter.prototype.writeFixedHash64 = function(e, t) {
    null != t && (goog.asserts.assert(8 == t.length), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), 
    this.encoder_.writeFixedHash64(t));
}, jspb.BinaryWriter.prototype.writeVarintHash64 = function(e, t) {
    null != t && (goog.asserts.assert(8 == t.length), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), 
    this.encoder_.writeVarintHash64(t));
}, jspb.BinaryWriter.prototype.writeRepeatedInt32 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeSignedVarint32_(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedInt32String = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeInt32String(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedInt64 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeSignedVarint64_(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedInt64String = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeInt64String(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedUint32 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeUnsignedVarint32_(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedUint32String = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeUint32String(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedUint64 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeUnsignedVarint64_(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedUint64String = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeUint64String(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedSint32 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeZigzagVarint32_(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedSint64 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeZigzagVarint64_(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedSint64String = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeZigzagVarint64String_(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeFixed32(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeFixed64(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeFixed64String(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeSfixed32(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeSfixed64(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeSfixed64String(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedFloat = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeFloat(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedDouble = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeDouble(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedBool = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeBool(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedEnum = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeEnum(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedString = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeString(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedBytes = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeBytes(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedMessage = function(e, t, r) {
    if (null != t) for (var o = 0; o < t.length; o++) {
        var s = this.beginDelimited_(e);
        r(t[o], this), this.endDelimited_(s);
    }
}, jspb.BinaryWriter.prototype.writeRepeatedGroup = function(e, t, r) {
    if (null != t) for (var o = 0; o < t.length; o++) this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.START_GROUP), 
    r(t[o], this), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.END_GROUP);
};

jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeFixedHash64(e, t[r]);
}, jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function(e, t) {
    if (null != t) for (var r = 0; r < t.length; r++) this.writeVarintHash64(e, t[r]);
}, jspb.BinaryWriter.prototype.writePackedInt32 = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeSignedVarint32(t[r]);
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedInt32String = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeSignedVarint32(parseInt(t[r], 10));
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedInt64 = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeSignedVarint64(t[r]);
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedInt64String = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) {
            var o = jspb.arith.Int64.fromString(t[r]);
            this.encoder_.writeSplitVarint64(o.lo, o.hi);
        }
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedUint32 = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeUnsignedVarint32(t[r]);
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedUint32String = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeUnsignedVarint32(parseInt(t[r], 10));
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedUint64 = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeUnsignedVarint64(t[r]);
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedUint64String = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) {
            var o = jspb.arith.UInt64.fromString(t[r]);
            this.encoder_.writeSplitVarint64(o.lo, o.hi);
        }
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedSint32 = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeZigzagVarint32(t[r]);
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedSint64 = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeZigzagVarint64(t[r]);
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedSint64String = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeZigzagVarint64(parseInt(t[r], 10));
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedFixed32 = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(4 * t.length), e = 0; e < t.length; e++) this.encoder_.writeUint32(t[e]);
}, jspb.BinaryWriter.prototype.writePackedFixed64 = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(8 * t.length), e = 0; e < t.length; e++) this.encoder_.writeUint64(t[e]);
}, jspb.BinaryWriter.prototype.writePackedFixed64String = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(8 * t.length), e = 0; e < t.length; e++) {
        var r = jspb.arith.UInt64.fromString(t[e]);
        this.encoder_.writeSplitFixed64(r.lo, r.hi);
    }
}, jspb.BinaryWriter.prototype.writePackedSfixed32 = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(4 * t.length), e = 0; e < t.length; e++) this.encoder_.writeInt32(t[e]);
}, jspb.BinaryWriter.prototype.writePackedSfixed64 = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(8 * t.length), e = 0; e < t.length; e++) this.encoder_.writeInt64(t[e]);
}, jspb.BinaryWriter.prototype.writePackedSfixed64String = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(8 * t.length), e = 0; e < t.length; e++) this.encoder_.writeInt64String(t[e]);
}, jspb.BinaryWriter.prototype.writePackedFloat = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(4 * t.length), e = 0; e < t.length; e++) this.encoder_.writeFloat(t[e]);
}, jspb.BinaryWriter.prototype.writePackedDouble = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(8 * t.length), e = 0; e < t.length; e++) this.encoder_.writeDouble(t[e]);
}, jspb.BinaryWriter.prototype.writePackedBool = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(t.length), e = 0; e < t.length; e++) this.encoder_.writeBool(t[e]);
}, jspb.BinaryWriter.prototype.writePackedEnum = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeEnum(t[r]);
        this.endDelimited_(e);
    }
}, jspb.BinaryWriter.prototype.writePackedFixedHash64 = function(e, t) {
    if (null != t && t.length) for (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED), 
    this.encoder_.writeUnsignedVarint32(8 * t.length), e = 0; e < t.length; e++) this.encoder_.writeFixedHash64(t[e]);
}, jspb.BinaryWriter.prototype.writePackedVarintHash64 = function(e, t) {
    if (null != t && t.length) {
        e = this.beginDelimited_(e);
        for (var r = 0; r < t.length; r++) this.encoder_.writeVarintHash64(t[r]);
        this.endDelimited_(e);
    }
};

var proto = {
    protocol: {}
};

proto.protocol.PushServiceConfigMsg = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.protocol.PushServiceConfigMsg, jspb.Message), goog.DEBUG && !COMPILED && (proto.protocol.PushServiceConfigMsg.displayName = "proto.protocol.PushServiceConfigMsg"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.protocol.PushServiceConfigMsg.prototype.toObject = function(e) {
    return proto.protocol.PushServiceConfigMsg.toObject(e, this);
}, proto.protocol.PushServiceConfigMsg.toObject = function(e, t) {
    var r = {
        fetchbucket: jspb.Message.getField(t, 1),
        usebucketv2: jspb.Message.getField(t, 2),
        clientversion: jspb.Message.getField(t, 3),
        cloudversion: jspb.Message.getField(t, 4),
        dots: jspb.Message.getField(t, 5)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.protocol.PushServiceConfigMsg.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.protocol.PushServiceConfigMsg();
    return proto.protocol.PushServiceConfigMsg.deserializeBinaryFromReader(t, e);
}, proto.protocol.PushServiceConfigMsg.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readBool();
        e.setFetchbucket(r);
        break;

      case 2:
        r = t.readBool(), e.setUsebucketv2(r);
        break;

      case 3:
        r = t.readInt32(), e.setClientversion(r);
        break;

      case 4:
        r = t.readInt32(), e.setCloudversion(r);
        break;

      case 5:
        r = t.readInt32(), e.setDots(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.protocol.PushServiceConfigMsg.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.protocol.PushServiceConfigMsg.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.protocol.PushServiceConfigMsg.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeBool(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeBool(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt32(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeInt32(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeInt32(5, r);
}, proto.protocol.PushServiceConfigMsg.prototype.getFetchbucket = function() {
    return jspb.Message.getFieldWithDefault(this, 1, !1);
}, proto.protocol.PushServiceConfigMsg.prototype.setFetchbucket = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.protocol.PushServiceConfigMsg.prototype.clearFetchbucket = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.protocol.PushServiceConfigMsg.prototype.hasFetchbucket = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.protocol.PushServiceConfigMsg.prototype.getUsebucketv2 = function() {
    return jspb.Message.getFieldWithDefault(this, 2, !1);
}, proto.protocol.PushServiceConfigMsg.prototype.setUsebucketv2 = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.protocol.PushServiceConfigMsg.prototype.clearUsebucketv2 = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.protocol.PushServiceConfigMsg.prototype.hasUsebucketv2 = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.protocol.PushServiceConfigMsg.prototype.getClientversion = function() {
    return jspb.Message.getFieldWithDefault(this, 3, 0);
}, proto.protocol.PushServiceConfigMsg.prototype.setClientversion = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.protocol.PushServiceConfigMsg.prototype.clearClientversion = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.protocol.PushServiceConfigMsg.prototype.hasClientversion = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.protocol.PushServiceConfigMsg.prototype.getCloudversion = function() {
    return jspb.Message.getFieldWithDefault(this, 4, 0);
}, proto.protocol.PushServiceConfigMsg.prototype.setCloudversion = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.protocol.PushServiceConfigMsg.prototype.clearCloudversion = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.protocol.PushServiceConfigMsg.prototype.hasCloudversion = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.protocol.PushServiceConfigMsg.prototype.getDots = function() {
    return jspb.Message.getFieldWithDefault(this, 5, 0);
}, proto.protocol.PushServiceConfigMsg.prototype.setDots = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.protocol.PushServiceConfigMsg.prototype.clearDots = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.protocol.PushServiceConfigMsg.prototype.hasDots = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.ims = {}, proto.ims.ClientHeader = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.ims.ClientHeader, jspb.Message), goog.DEBUG && !COMPILED && (proto.ims.ClientHeader.displayName = "proto.ims.ClientHeader"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.ims.ClientHeader.prototype.toObject = function(e) {
    return proto.ims.ClientHeader.toObject(e, this);
}, proto.ims.ClientHeader.toObject = function(e, t) {
    var r = {
        chid: jspb.Message.getField(t, 1),
        uuid: jspb.Message.getField(t, 2),
        server: jspb.Message.getField(t, 3),
        resource: jspb.Message.getField(t, 4),
        cmd: jspb.Message.getField(t, 5),
        subcmd: jspb.Message.getField(t, 6),
        id: jspb.Message.getField(t, 7),
        dirFlag: jspb.Message.getField(t, 8),
        cipher: jspb.Message.getField(t, 9),
        errCode: jspb.Message.getField(t, 10),
        errStr: jspb.Message.getField(t, 11)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.ims.ClientHeader.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.ims.ClientHeader();
    return proto.ims.ClientHeader.deserializeBinaryFromReader(t, e);
}, proto.ims.ClientHeader.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt32();
        e.setChid(r);
        break;

      case 2:
        r = t.readInt64String(), e.setUuid(r);
        break;

      case 3:
        r = t.readString(), e.setServer(r);
        break;

      case 4:
        r = t.readString(), e.setResource(r);
        break;

      case 5:
        r = t.readString(), e.setCmd(r);
        break;

      case 6:
        r = t.readString(), e.setSubcmd(r);
        break;

      case 7:
        r = t.readString(), e.setId(r);
        break;

      case 8:
        r = t.readEnum(), e.setDirFlag(r);
        break;

      case 9:
        r = t.readInt32(), e.setCipher(r);
        break;

      case 10:
        r = t.readInt32(), e.setErrCode(r);
        break;

      case 11:
        r = t.readString(), e.setErrStr(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.ims.ClientHeader.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.ims.ClientHeader.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.ims.ClientHeader.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt32(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeInt64String(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeString(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeString(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeString(6, r), 
    null != (r = jspb.Message.getField(e, 7)) && t.writeString(7, r), null != (r = jspb.Message.getField(e, 8)) && t.writeEnum(8, r), 
    null != (r = jspb.Message.getField(e, 9)) && t.writeInt32(9, r), null != (r = jspb.Message.getField(e, 10)) && t.writeInt32(10, r), 
    null != (r = jspb.Message.getField(e, 11)) && t.writeString(11, r);
}, proto.ims.ClientHeader.MSG_DIR_FLAG = {
    CS_ONEWAY: 1,
    CS_REQ: 2,
    CS_RESP: 3,
    SC_ONEWAY: 4,
    SC_REQ: 5,
    SC_RESP: 6
}, proto.ims.ClientHeader.prototype.getChid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, 0);
}, proto.ims.ClientHeader.prototype.setChid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.ims.ClientHeader.prototype.clearChid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.ims.ClientHeader.prototype.hasChid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.ims.ClientHeader.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "0");
}, proto.ims.ClientHeader.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.ims.ClientHeader.prototype.clearUuid = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.ims.ClientHeader.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.ims.ClientHeader.prototype.getServer = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.ims.ClientHeader.prototype.setServer = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.ims.ClientHeader.prototype.clearServer = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.ims.ClientHeader.prototype.hasServer = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.ims.ClientHeader.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "");
}, proto.ims.ClientHeader.prototype.setResource = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.ims.ClientHeader.prototype.clearResource = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.ims.ClientHeader.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.ims.ClientHeader.prototype.getCmd = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.ims.ClientHeader.prototype.setCmd = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.ims.ClientHeader.prototype.clearCmd = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.ims.ClientHeader.prototype.hasCmd = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.ims.ClientHeader.prototype.getSubcmd = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "");
}, proto.ims.ClientHeader.prototype.setSubcmd = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.ims.ClientHeader.prototype.clearSubcmd = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.ims.ClientHeader.prototype.hasSubcmd = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.ims.ClientHeader.prototype.getId = function() {
    return jspb.Message.getFieldWithDefault(this, 7, "");
}, proto.ims.ClientHeader.prototype.setId = function(e) {
    jspb.Message.setField(this, 7, e);
}, proto.ims.ClientHeader.prototype.clearId = function() {
    jspb.Message.setField(this, 7, void 0);
}, proto.ims.ClientHeader.prototype.hasId = function() {
    return null != jspb.Message.getField(this, 7);
}, proto.ims.ClientHeader.prototype.getDirFlag = function() {
    return jspb.Message.getFieldWithDefault(this, 8, 1);
}, proto.ims.ClientHeader.prototype.setDirFlag = function(e) {
    jspb.Message.setField(this, 8, e);
}, proto.ims.ClientHeader.prototype.clearDirFlag = function() {
    jspb.Message.setField(this, 8, void 0);
}, proto.ims.ClientHeader.prototype.hasDirFlag = function() {
    return null != jspb.Message.getField(this, 8);
}, proto.ims.ClientHeader.prototype.getCipher = function() {
    return jspb.Message.getFieldWithDefault(this, 9, 0);
}, proto.ims.ClientHeader.prototype.setCipher = function(e) {
    jspb.Message.setField(this, 9, e);
}, proto.ims.ClientHeader.prototype.clearCipher = function() {
    jspb.Message.setField(this, 9, void 0);
}, proto.ims.ClientHeader.prototype.hasCipher = function() {
    return null != jspb.Message.getField(this, 9);
}, proto.ims.ClientHeader.prototype.getErrCode = function() {
    return jspb.Message.getFieldWithDefault(this, 10, 0);
}, proto.ims.ClientHeader.prototype.setErrCode = function(e) {
    jspb.Message.setField(this, 10, e);
}, proto.ims.ClientHeader.prototype.clearErrCode = function() {
    jspb.Message.setField(this, 10, void 0);
}, proto.ims.ClientHeader.prototype.hasErrCode = function() {
    return null != jspb.Message.getField(this, 10);
}, proto.ims.ClientHeader.prototype.getErrStr = function() {
    return jspb.Message.getFieldWithDefault(this, 11, "");
}, proto.ims.ClientHeader.prototype.setErrStr = function(e) {
    jspb.Message.setField(this, 11, e);
}, proto.ims.ClientHeader.prototype.clearErrStr = function() {
    jspb.Message.setField(this, 11, void 0);
}, proto.ims.ClientHeader.prototype.hasErrStr = function() {
    return null != jspb.Message.getField(this, 11);
}, proto.ims.XMMsgConn = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.ims.XMMsgConn, jspb.Message), goog.DEBUG && !COMPILED && (proto.ims.XMMsgConn.displayName = "proto.ims.XMMsgConn"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.ims.XMMsgConn.prototype.toObject = function(e) {
    return proto.ims.XMMsgConn.toObject(e, this);
}, proto.ims.XMMsgConn.toObject = function(e, t) {
    var r, o = {
        version: jspb.Message.getField(t, 1),
        model: jspb.Message.getField(t, 2),
        os: jspb.Message.getField(t, 3),
        udid: jspb.Message.getField(t, 4),
        sdk: jspb.Message.getField(t, 5),
        connpt: jspb.Message.getField(t, 6),
        host: jspb.Message.getField(t, 7),
        locale: jspb.Message.getField(t, 8),
        psc: (r = t.getPsc()) && proto.protocol.PushServiceConfigMsg.toObject(e, r),
        andver: jspb.Message.getField(t, 10)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.ims.XMMsgConn.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.ims.XMMsgConn();
    return proto.ims.XMMsgConn.deserializeBinaryFromReader(t, e);
}, proto.ims.XMMsgConn.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readUint32();
        e.setVersion(r);
        break;

      case 2:
        r = t.readString(), e.setModel(r);
        break;

      case 3:
        r = t.readString(), e.setOs(r);
        break;

      case 4:
        r = t.readString(), e.setUdid(r);
        break;

      case 5:
        r = t.readInt32(), e.setSdk(r);
        break;

      case 6:
        r = t.readString(), e.setConnpt(r);
        break;

      case 7:
        r = t.readString(), e.setHost(r);
        break;

      case 8:
        r = t.readString(), e.setLocale(r);
        break;

      case 9:
        r = new proto.protocol.PushServiceConfigMsg(), t.readMessage(r, proto.protocol.PushServiceConfigMsg.deserializeBinaryFromReader), 
        e.setPsc(r);
        break;

      case 10:
        r = t.readInt32(), e.setAndver(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.ims.XMMsgConn.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.ims.XMMsgConn.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.ims.XMMsgConn.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeUint32(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeString(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeInt32(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeString(6, r), 
    null != (r = jspb.Message.getField(e, 7)) && t.writeString(7, r), null != (r = jspb.Message.getField(e, 8)) && t.writeString(8, r), 
    null != (r = e.getPsc()) && t.writeMessage(9, r, proto.protocol.PushServiceConfigMsg.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 10)) && t.writeInt32(10, r);
}, proto.ims.XMMsgConn.prototype.getVersion = function() {
    return jspb.Message.getFieldWithDefault(this, 1, 0);
}, proto.ims.XMMsgConn.prototype.setVersion = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.ims.XMMsgConn.prototype.clearVersion = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.ims.XMMsgConn.prototype.hasVersion = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.ims.XMMsgConn.prototype.getModel = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.ims.XMMsgConn.prototype.setModel = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.ims.XMMsgConn.prototype.clearModel = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.ims.XMMsgConn.prototype.hasModel = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.ims.XMMsgConn.prototype.getOs = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.ims.XMMsgConn.prototype.setOs = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.ims.XMMsgConn.prototype.clearOs = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.ims.XMMsgConn.prototype.hasOs = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.ims.XMMsgConn.prototype.getUdid = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "");
}, proto.ims.XMMsgConn.prototype.setUdid = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.ims.XMMsgConn.prototype.clearUdid = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.ims.XMMsgConn.prototype.hasUdid = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.ims.XMMsgConn.prototype.getSdk = function() {
    return jspb.Message.getFieldWithDefault(this, 5, 0);
}, proto.ims.XMMsgConn.prototype.setSdk = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.ims.XMMsgConn.prototype.clearSdk = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.ims.XMMsgConn.prototype.hasSdk = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.ims.XMMsgConn.prototype.getConnpt = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "");
}, proto.ims.XMMsgConn.prototype.setConnpt = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.ims.XMMsgConn.prototype.clearConnpt = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.ims.XMMsgConn.prototype.hasConnpt = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.ims.XMMsgConn.prototype.getHost = function() {
    return jspb.Message.getFieldWithDefault(this, 7, "");
}, proto.ims.XMMsgConn.prototype.setHost = function(e) {
    jspb.Message.setField(this, 7, e);
}, proto.ims.XMMsgConn.prototype.clearHost = function() {
    jspb.Message.setField(this, 7, void 0);
}, proto.ims.XMMsgConn.prototype.hasHost = function() {
    return null != jspb.Message.getField(this, 7);
}, proto.ims.XMMsgConn.prototype.getLocale = function() {
    return jspb.Message.getFieldWithDefault(this, 8, "");
}, proto.ims.XMMsgConn.prototype.setLocale = function(e) {
    jspb.Message.setField(this, 8, e);
}, proto.ims.XMMsgConn.prototype.clearLocale = function() {
    jspb.Message.setField(this, 8, void 0);
}, proto.ims.XMMsgConn.prototype.hasLocale = function() {
    return null != jspb.Message.getField(this, 8);
}, proto.ims.XMMsgConn.prototype.getPsc = function() {
    return jspb.Message.getWrapperField(this, proto.protocol.PushServiceConfigMsg, 9);
}, proto.ims.XMMsgConn.prototype.setPsc = function(e) {
    jspb.Message.setWrapperField(this, 9, e);
}, proto.ims.XMMsgConn.prototype.clearPsc = function() {
    this.setPsc(void 0);
}, proto.ims.XMMsgConn.prototype.hasPsc = function() {
    return null != jspb.Message.getField(this, 9);
}, proto.ims.XMMsgConn.prototype.getAndver = function() {
    return jspb.Message.getFieldWithDefault(this, 10, 0);
}, proto.ims.XMMsgConn.prototype.setAndver = function(e) {
    jspb.Message.setField(this, 10, e);
}, proto.ims.XMMsgConn.prototype.clearAndver = function() {
    jspb.Message.setField(this, 10, void 0);
}, proto.ims.XMMsgConn.prototype.hasAndver = function() {
    return null != jspb.Message.getField(this, 10);
}, proto.ims.XMMsgConnResp = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.ims.XMMsgConnResp, jspb.Message), goog.DEBUG && !COMPILED && (proto.ims.XMMsgConnResp.displayName = "proto.ims.XMMsgConnResp"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.ims.XMMsgConnResp.prototype.toObject = function(e) {
    return proto.ims.XMMsgConnResp.toObject(e, this);
}, proto.ims.XMMsgConnResp.toObject = function(e, t) {
    var r, o = {
        challenge: jspb.Message.getField(t, 1),
        host: jspb.Message.getField(t, 2),
        psc: (r = t.getPsc()) && proto.protocol.PushServiceConfigMsg.toObject(e, r)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.ims.XMMsgConnResp.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.ims.XMMsgConnResp();
    return proto.ims.XMMsgConnResp.deserializeBinaryFromReader(t, e);
}, proto.ims.XMMsgConnResp.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readString();
        e.setChallenge(r);
        break;

      case 2:
        r = t.readString(), e.setHost(r);
        break;

      case 3:
        r = new proto.protocol.PushServiceConfigMsg(), t.readMessage(r, proto.protocol.PushServiceConfigMsg.deserializeBinaryFromReader), 
        e.setPsc(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.ims.XMMsgConnResp.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.ims.XMMsgConnResp.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.ims.XMMsgConnResp.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeString(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = e.getPsc()) && t.writeMessage(3, r, proto.protocol.PushServiceConfigMsg.serializeBinaryToWriter);
}, proto.ims.XMMsgConnResp.prototype.getChallenge = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.ims.XMMsgConnResp.prototype.setChallenge = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.ims.XMMsgConnResp.prototype.clearChallenge = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.ims.XMMsgConnResp.prototype.hasChallenge = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.ims.XMMsgConnResp.prototype.getHost = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.ims.XMMsgConnResp.prototype.setHost = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.ims.XMMsgConnResp.prototype.clearHost = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.ims.XMMsgConnResp.prototype.hasHost = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.ims.XMMsgConnResp.prototype.getPsc = function() {
    return jspb.Message.getWrapperField(this, proto.protocol.PushServiceConfigMsg, 3);
}, proto.ims.XMMsgConnResp.prototype.setPsc = function(e) {
    jspb.Message.setWrapperField(this, 3, e);
}, proto.ims.XMMsgConnResp.prototype.clearPsc = function() {
    this.setPsc(void 0);
}, proto.ims.XMMsgConnResp.prototype.hasPsc = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.ims.XMMsgBind = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.ims.XMMsgBind, jspb.Message), goog.DEBUG && !COMPILED && (proto.ims.XMMsgBind.displayName = "proto.ims.XMMsgBind"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.ims.XMMsgBind.prototype.toObject = function(e) {
    return proto.ims.XMMsgBind.toObject(e, this);
}, proto.ims.XMMsgBind.toObject = function(e, t) {
    var r = {
        token: jspb.Message.getField(t, 1),
        kick: jspb.Message.getField(t, 2),
        method: jspb.Message.getField(t, 3),
        clientAttrs: jspb.Message.getField(t, 4),
        cloudAttrs: jspb.Message.getField(t, 5),
        sig: jspb.Message.getField(t, 6)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.ims.XMMsgBind.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.ims.XMMsgBind();
    return proto.ims.XMMsgBind.deserializeBinaryFromReader(t, e);
}, proto.ims.XMMsgBind.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readString();
        e.setToken(r);
        break;

      case 2:
        r = t.readString(), e.setKick(r);
        break;

      case 3:
        r = t.readString(), e.setMethod(r);
        break;

      case 4:
        r = t.readString(), e.setClientAttrs(r);
        break;

      case 5:
        r = t.readString(), e.setCloudAttrs(r);
        break;

      case 6:
        r = t.readString(), e.setSig(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.ims.XMMsgBind.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.ims.XMMsgBind.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.ims.XMMsgBind.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeString(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeString(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeString(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeString(6, r);
}, proto.ims.XMMsgBind.prototype.getToken = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.ims.XMMsgBind.prototype.setToken = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.ims.XMMsgBind.prototype.clearToken = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.ims.XMMsgBind.prototype.hasToken = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.ims.XMMsgBind.prototype.getKick = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.ims.XMMsgBind.prototype.setKick = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.ims.XMMsgBind.prototype.clearKick = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.ims.XMMsgBind.prototype.hasKick = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.ims.XMMsgBind.prototype.getMethod = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.ims.XMMsgBind.prototype.setMethod = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.ims.XMMsgBind.prototype.clearMethod = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.ims.XMMsgBind.prototype.hasMethod = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.ims.XMMsgBind.prototype.getClientAttrs = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "");
}, proto.ims.XMMsgBind.prototype.setClientAttrs = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.ims.XMMsgBind.prototype.clearClientAttrs = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.ims.XMMsgBind.prototype.hasClientAttrs = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.ims.XMMsgBind.prototype.getCloudAttrs = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.ims.XMMsgBind.prototype.setCloudAttrs = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.ims.XMMsgBind.prototype.clearCloudAttrs = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.ims.XMMsgBind.prototype.hasCloudAttrs = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.ims.XMMsgBind.prototype.getSig = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "");
}, proto.ims.XMMsgBind.prototype.setSig = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.ims.XMMsgBind.prototype.clearSig = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.ims.XMMsgBind.prototype.hasSig = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.ims.XMMsgBindResp = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.ims.XMMsgBindResp, jspb.Message), goog.DEBUG && !COMPILED && (proto.ims.XMMsgBindResp.displayName = "proto.ims.XMMsgBindResp"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.ims.XMMsgBindResp.prototype.toObject = function(e) {
    return proto.ims.XMMsgBindResp.toObject(e, this);
}, proto.ims.XMMsgBindResp.toObject = function(e, t) {
    var r = {
        result: jspb.Message.getField(t, 1),
        errorType: jspb.Message.getField(t, 2),
        errorReason: jspb.Message.getField(t, 3),
        errorDesc: jspb.Message.getField(t, 4)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.ims.XMMsgBindResp.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.ims.XMMsgBindResp();
    return proto.ims.XMMsgBindResp.deserializeBinaryFromReader(t, e);
}, proto.ims.XMMsgBindResp.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readBool();
        e.setResult(r);
        break;

      case 2:
        r = t.readString(), e.setErrorType(r);
        break;

      case 3:
        r = t.readString(), e.setErrorReason(r);
        break;

      case 4:
        r = t.readString(), e.setErrorDesc(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.ims.XMMsgBindResp.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.ims.XMMsgBindResp.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.ims.XMMsgBindResp.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeBool(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeString(4, r);
}, proto.ims.XMMsgBindResp.prototype.getResult = function() {
    return jspb.Message.getFieldWithDefault(this, 1, !1);
}, proto.ims.XMMsgBindResp.prototype.setResult = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.ims.XMMsgBindResp.prototype.clearResult = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.ims.XMMsgBindResp.prototype.hasResult = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.ims.XMMsgBindResp.prototype.getErrorType = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.ims.XMMsgBindResp.prototype.setErrorType = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.ims.XMMsgBindResp.prototype.clearErrorType = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.ims.XMMsgBindResp.prototype.hasErrorType = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.ims.XMMsgBindResp.prototype.getErrorReason = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.ims.XMMsgBindResp.prototype.setErrorReason = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.ims.XMMsgBindResp.prototype.clearErrorReason = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.ims.XMMsgBindResp.prototype.hasErrorReason = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.ims.XMMsgBindResp.prototype.getErrorDesc = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "");
}, proto.ims.XMMsgBindResp.prototype.setErrorDesc = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.ims.XMMsgBindResp.prototype.clearErrorDesc = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.ims.XMMsgBindResp.prototype.hasErrorDesc = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.ims.XMMsgPing = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.ims.XMMsgPing, jspb.Message), goog.DEBUG && !COMPILED && (proto.ims.XMMsgPing.displayName = "proto.ims.XMMsgPing"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.ims.XMMsgPing.prototype.toObject = function(e) {
    return proto.ims.XMMsgPing.toObject(e, this);
}, proto.ims.XMMsgPing.toObject = function(e, t) {
    var r, o = {
        stats: t.getStats_asB64(),
        psc: (r = t.getPsc()) && proto.protocol.PushServiceConfigMsg.toObject(e, r)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.ims.XMMsgPing.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.ims.XMMsgPing();
    return proto.ims.XMMsgPing.deserializeBinaryFromReader(t, e);
}, proto.ims.XMMsgPing.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readBytes();
        e.setStats(r);
        break;

      case 2:
        r = new proto.protocol.PushServiceConfigMsg(), t.readMessage(r, proto.protocol.PushServiceConfigMsg.deserializeBinaryFromReader), 
        e.setPsc(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.ims.XMMsgPing.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.ims.XMMsgPing.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.ims.XMMsgPing.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeBytes(1, r), null != (r = e.getPsc()) && t.writeMessage(2, r, proto.protocol.PushServiceConfigMsg.serializeBinaryToWriter);
}, proto.ims.XMMsgPing.prototype.getStats = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.ims.XMMsgPing.prototype.getStats_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getStats());
}, proto.ims.XMMsgPing.prototype.getStats_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getStats());
}, proto.ims.XMMsgPing.prototype.setStats = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.ims.XMMsgPing.prototype.clearStats = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.ims.XMMsgPing.prototype.hasStats = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.ims.XMMsgPing.prototype.getPsc = function() {
    return jspb.Message.getWrapperField(this, proto.protocol.PushServiceConfigMsg, 2);
}, proto.ims.XMMsgPing.prototype.setPsc = function(e) {
    jspb.Message.setWrapperField(this, 2, e);
}, proto.ims.XMMsgPing.prototype.clearPsc = function() {
    this.setPsc(void 0);
}, proto.ims.XMMsgPing.prototype.hasPsc = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.ims.XMMsgNotify = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.ims.XMMsgNotify, jspb.Message), goog.DEBUG && !COMPILED && (proto.ims.XMMsgNotify.displayName = "proto.ims.XMMsgNotify"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.ims.XMMsgNotify.prototype.toObject = function(e) {
    return proto.ims.XMMsgNotify.toObject(e, this);
}, proto.ims.XMMsgNotify.toObject = function(e, t) {
    var r = {
        errCode: jspb.Message.getField(t, 1),
        errStr: jspb.Message.getField(t, 2)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.ims.XMMsgNotify.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.ims.XMMsgNotify();
    return proto.ims.XMMsgNotify.deserializeBinaryFromReader(t, e);
}, proto.ims.XMMsgNotify.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt32();
        e.setErrCode(r);
        break;

      case 2:
        r = t.readString(), e.setErrStr(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.ims.XMMsgNotify.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.ims.XMMsgNotify.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.ims.XMMsgNotify.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt32(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r);
}, proto.ims.XMMsgNotify.prototype.getErrCode = function() {
    return jspb.Message.getFieldWithDefault(this, 1, 0);
}, proto.ims.XMMsgNotify.prototype.setErrCode = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.ims.XMMsgNotify.prototype.clearErrCode = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.ims.XMMsgNotify.prototype.hasErrCode = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.ims.XMMsgNotify.prototype.getErrStr = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.ims.XMMsgNotify.prototype.setErrStr = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.ims.XMMsgNotify.prototype.clearErrStr = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.ims.XMMsgNotify.prototype.hasErrStr = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.FilterRequest = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.FilterRequest, jspb.Message), goog.DEBUG && !COMPILED && (proto.FilterRequest.displayName = "proto.FilterRequest"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.FilterRequest.prototype.toObject = function(e) {
    return proto.FilterRequest.toObject(e, this);
}, proto.FilterRequest.toObject = function(e, t) {
    var r, o = {
        id: jspb.Message.getField(t, 1),
        packet: (r = t.getPacket()) && proto.MIMCPacket.toObject(e, r)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.FilterRequest.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.FilterRequest();
    return proto.FilterRequest.deserializeBinaryFromReader(t, e);
}, proto.FilterRequest.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readString();
        e.setId(r);
        break;

      case 2:
        r = new proto.MIMCPacket(), t.readMessage(r, proto.MIMCPacket.deserializeBinaryFromReader), 
        e.setPacket(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.FilterRequest.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.FilterRequest.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.FilterRequest.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeString(1, r), null != (r = e.getPacket()) && t.writeMessage(2, r, proto.MIMCPacket.serializeBinaryToWriter);
}, proto.FilterRequest.prototype.getId = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.FilterRequest.prototype.setId = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.FilterRequest.prototype.clearId = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.FilterRequest.prototype.hasId = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.FilterRequest.prototype.getPacket = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCPacket, 2, 1);
}, proto.FilterRequest.prototype.setPacket = function(e) {
    jspb.Message.setWrapperField(this, 2, e);
}, proto.FilterRequest.prototype.clearPacket = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.FilterRequest.prototype.hasPacket = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.FilterResponse = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.FilterResponse, jspb.Message), goog.DEBUG && !COMPILED && (proto.FilterResponse.displayName = "proto.FilterResponse"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.FilterResponse.prototype.toObject = function(e) {
    return proto.FilterResponse.toObject(e, this);
}, proto.FilterResponse.toObject = function(e, t) {
    var r = {
        id: jspb.Message.getField(t, 1),
        type: jspb.Message.getField(t, 2),
        errorcode: jspb.Message.getField(t, 3),
        isfilter: jspb.Message.getField(t, 4)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.FilterResponse.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.FilterResponse();
    return proto.FilterResponse.deserializeBinaryFromReader(t, e);
}, proto.FilterResponse.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readString();
        e.setId(r);
        break;

      case 2:
        r = t.readEnum(), e.setType(r);
        break;

      case 3:
        r = t.readEnum(), e.setErrorcode(r);
        break;

      case 4:
        r = t.readBool(), e.setIsfilter(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.FilterResponse.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.FilterResponse.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.FilterResponse.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeString(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeEnum(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeEnum(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeBool(4, r);
}, proto.FilterResponse.prototype.getId = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.FilterResponse.prototype.setId = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.FilterResponse.prototype.clearId = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.FilterResponse.prototype.hasId = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.FilterResponse.prototype.getType = function() {
    return jspb.Message.getFieldWithDefault(this, 2, 1);
}, proto.FilterResponse.prototype.setType = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.FilterResponse.prototype.clearType = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.FilterResponse.prototype.hasType = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.FilterResponse.prototype.getErrorcode = function() {
    return jspb.Message.getFieldWithDefault(this, 3, 0);
}, proto.FilterResponse.prototype.setErrorcode = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.FilterResponse.prototype.clearErrorcode = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.FilterResponse.prototype.hasErrorcode = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.FilterResponse.prototype.getIsfilter = function() {
    return jspb.Message.getFieldWithDefault(this, 4, !1);
}, proto.FilterResponse.prototype.setIsfilter = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.FilterResponse.prototype.clearIsfilter = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.FilterResponse.prototype.hasIsfilter = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.PullMessageRequest = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.PullMessageRequest, jspb.Message), goog.DEBUG && !COMPILED && (proto.PullMessageRequest.displayName = "proto.PullMessageRequest"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.PullMessageRequest.prototype.toObject = function(e) {
    return proto.PullMessageRequest.toObject(e, this);
}, proto.PullMessageRequest.toObject = function(e, t) {
    var r = {
        uuid: jspb.Message.getField(t, 1),
        resource: jspb.Message.getField(t, 2)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.PullMessageRequest.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.PullMessageRequest();
    return proto.PullMessageRequest.deserializeBinaryFromReader(t, e);
}, proto.PullMessageRequest.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readUint64String();
        e.setUuid(r);
        break;

      case 2:
        r = t.readString(), e.setResource(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.PullMessageRequest.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.PullMessageRequest.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.PullMessageRequest.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeUint64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r);
}, proto.PullMessageRequest.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.PullMessageRequest.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.PullMessageRequest.prototype.clearUuid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.PullMessageRequest.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.PullMessageRequest.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.PullMessageRequest.prototype.setResource = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.PullMessageRequest.prototype.clearResource = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.PullMessageRequest.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.TopicMessage = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.TopicMessage, jspb.Message), goog.DEBUG && !COMPILED && (proto.TopicMessage.displayName = "proto.TopicMessage"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.TopicMessage.prototype.toObject = function(e) {
    return proto.TopicMessage.toObject(e, this);
}, proto.TopicMessage.toObject = function(e, t) {
    var r, o = {
        topicid: jspb.Message.getField(t, 1),
        packet: (r = t.getPacket()) && proto.MIMCPacket.toObject(e, r),
        uuid: jspb.Message.getField(t, 3),
        resource: jspb.Message.getField(t, 4)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.TopicMessage.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.TopicMessage();
    return proto.TopicMessage.deserializeBinaryFromReader(t, e);
}, proto.TopicMessage.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readUint64String();
        e.setTopicid(r);
        break;

      case 2:
        r = new proto.MIMCPacket(), t.readMessage(r, proto.MIMCPacket.deserializeBinaryFromReader), 
        e.setPacket(r);
        break;

      case 3:
        r = t.readInt64String(), e.setUuid(r);
        break;

      case 4:
        r = t.readString(), e.setResource(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.TopicMessage.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.TopicMessage.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.TopicMessage.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeUint64String(1, r), null != (r = e.getPacket()) && t.writeMessage(2, r, proto.MIMCPacket.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt64String(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeString(4, r);
}, proto.TopicMessage.prototype.getTopicid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.TopicMessage.prototype.setTopicid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.TopicMessage.prototype.clearTopicid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.TopicMessage.prototype.hasTopicid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.TopicMessage.prototype.getPacket = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCPacket, 2, 1);
}, proto.TopicMessage.prototype.setPacket = function(e) {
    jspb.Message.setWrapperField(this, 2, e);
}, proto.TopicMessage.prototype.clearPacket = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.TopicMessage.prototype.hasPacket = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.TopicMessage.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "0");
}, proto.TopicMessage.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.TopicMessage.prototype.clearUuid = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.TopicMessage.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.TopicMessage.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "");
}, proto.TopicMessage.prototype.setResource = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.TopicMessage.prototype.clearResource = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.TopicMessage.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.QueryAppinfoRequest = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.QueryAppinfoRequest, jspb.Message), goog.DEBUG && !COMPILED && (proto.QueryAppinfoRequest.displayName = "proto.QueryAppinfoRequest"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.QueryAppinfoRequest.prototype.toObject = function(e) {
    return proto.QueryAppinfoRequest.toObject(e, this);
}, proto.QueryAppinfoRequest.toObject = function(e, t) {
    var r = {
        appid: jspb.Message.getField(t, 1),
        context: jspb.Message.getField(t, 2)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.QueryAppinfoRequest.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.QueryAppinfoRequest();
    return proto.QueryAppinfoRequest.deserializeBinaryFromReader(t, e);
}, proto.QueryAppinfoRequest.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readUint64String();
        e.setAppid(r);
        break;

      case 2:
        r = t.readString(), e.setContext(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.QueryAppinfoRequest.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.QueryAppinfoRequest.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.QueryAppinfoRequest.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeUint64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r);
}, proto.QueryAppinfoRequest.prototype.getAppid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.QueryAppinfoRequest.prototype.setAppid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.QueryAppinfoRequest.prototype.clearAppid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.QueryAppinfoRequest.prototype.hasAppid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.QueryAppinfoRequest.prototype.getContext = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.QueryAppinfoRequest.prototype.setContext = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.QueryAppinfoRequest.prototype.clearContext = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.QueryAppinfoRequest.prototype.hasContext = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.Appinfo = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.Appinfo, jspb.Message), goog.DEBUG && !COMPILED && (proto.Appinfo.displayName = "proto.Appinfo"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.Appinfo.prototype.toObject = function(e) {
    return proto.Appinfo.toObject(e, this);
}, proto.Appinfo.toObject = function(e, t) {
    var r = {
        appid: jspb.Message.getField(t, 1),
        msgcallbackurl: jspb.Message.getField(t, 2),
        offlinemsgcallbackurl: jspb.Message.getField(t, 3),
        uuidttl: jspb.Message.getField(t, 4),
        context: jspb.Message.getField(t, 5),
        messagefilter: jspb.Message.getField(t, 6),
        ucmsgcallbackurl: jspb.Message.getField(t, 7)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.Appinfo.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.Appinfo();
    return proto.Appinfo.deserializeBinaryFromReader(t, e);
}, proto.Appinfo.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readUint64String();
        e.setAppid(r);
        break;

      case 2:
        r = t.readString(), e.setMsgcallbackurl(r);
        break;

      case 3:
        r = t.readString(), e.setOfflinemsgcallbackurl(r);
        break;

      case 4:
        r = t.readUint64String(), e.setUuidttl(r);
        break;

      case 5:
        r = t.readString(), e.setContext(r);
        break;

      case 6:
        r = t.readString(), e.setMessagefilter(r);
        break;

      case 7:
        r = t.readString(), e.setUcmsgcallbackurl(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.Appinfo.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.Appinfo.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.Appinfo.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeUint64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeUint64String(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeString(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeString(6, r), 
    null != (r = jspb.Message.getField(e, 7)) && t.writeString(7, r);
}, proto.Appinfo.prototype.getAppid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.Appinfo.prototype.setAppid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.Appinfo.prototype.clearAppid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.Appinfo.prototype.hasAppid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.Appinfo.prototype.getMsgcallbackurl = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.Appinfo.prototype.setMsgcallbackurl = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.Appinfo.prototype.clearMsgcallbackurl = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.Appinfo.prototype.hasMsgcallbackurl = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.Appinfo.prototype.getOfflinemsgcallbackurl = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.Appinfo.prototype.setOfflinemsgcallbackurl = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.Appinfo.prototype.clearOfflinemsgcallbackurl = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.Appinfo.prototype.hasOfflinemsgcallbackurl = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.Appinfo.prototype.getUuidttl = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "0");
}, proto.Appinfo.prototype.setUuidttl = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.Appinfo.prototype.clearUuidttl = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.Appinfo.prototype.hasUuidttl = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.Appinfo.prototype.getContext = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.Appinfo.prototype.setContext = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.Appinfo.prototype.clearContext = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.Appinfo.prototype.hasContext = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.Appinfo.prototype.getMessagefilter = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "");
}, proto.Appinfo.prototype.setMessagefilter = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.Appinfo.prototype.clearMessagefilter = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.Appinfo.prototype.hasMessagefilter = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.Appinfo.prototype.getUcmsgcallbackurl = function() {
    return jspb.Message.getFieldWithDefault(this, 7, "");
}, proto.Appinfo.prototype.setUcmsgcallbackurl = function(e) {
    jspb.Message.setField(this, 7, e);
}, proto.Appinfo.prototype.clearUcmsgcallbackurl = function() {
    jspb.Message.setField(this, 7, void 0);
}, proto.Appinfo.prototype.hasUcmsgcallbackurl = function() {
    return null != jspb.Message.getField(this, 7);
}, proto.MIMCPacket = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCPacket, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCPacket.displayName = "proto.MIMCPacket"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCPacket.prototype.toObject = function(e) {
    return proto.MIMCPacket.toObject(e, this);
}, proto.MIMCPacket.toObject = function(e, t) {
    var r = {
        packetid: jspb.Message.getField(t, 1),
        pb_package: jspb.Message.getField(t, 2),
        sequence: jspb.Message.getField(t, 3),
        type: jspb.Message.getField(t, 4),
        payload: t.getPayload_asB64(),
        timestamp: jspb.Message.getField(t, 6)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.MIMCPacket.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCPacket();
    return proto.MIMCPacket.deserializeBinaryFromReader(t, e);
}, proto.MIMCPacket.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readString();
        e.setPacketid(r);
        break;

      case 2:
        r = t.readString(), e.setPackage(r);
        break;

      case 3:
        r = t.readInt64String(), e.setSequence(r);
        break;

      case 4:
        r = t.readEnum(), e.setType(r);
        break;

      case 5:
        r = t.readBytes(), e.setPayload(r);
        break;

      case 6:
        r = t.readInt64String(), e.setTimestamp(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCPacket.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCPacket.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCPacket.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeString(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt64String(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeEnum(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeBytes(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeInt64String(6, r);
}, proto.MIMCPacket.prototype.getPacketid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.MIMCPacket.prototype.setPacketid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.MIMCPacket.prototype.clearPacketid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.MIMCPacket.prototype.hasPacketid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCPacket.prototype.getPackage = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.MIMCPacket.prototype.setPackage = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.MIMCPacket.prototype.clearPackage = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.MIMCPacket.prototype.hasPackage = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.MIMCPacket.prototype.getSequence = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "0");
}, proto.MIMCPacket.prototype.setSequence = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.MIMCPacket.prototype.clearSequence = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.MIMCPacket.prototype.hasSequence = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.MIMCPacket.prototype.getType = function() {
    return jspb.Message.getFieldWithDefault(this, 4, 1);
}, proto.MIMCPacket.prototype.setType = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.MIMCPacket.prototype.clearType = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.MIMCPacket.prototype.hasType = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.MIMCPacket.prototype.getPayload = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.MIMCPacket.prototype.getPayload_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getPayload());
}, proto.MIMCPacket.prototype.getPayload_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getPayload());
}, proto.MIMCPacket.prototype.setPayload = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.MIMCPacket.prototype.clearPayload = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.MIMCPacket.prototype.hasPayload = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.MIMCPacket.prototype.getTimestamp = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "0");
}, proto.MIMCPacket.prototype.setTimestamp = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.MIMCPacket.prototype.clearTimestamp = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.MIMCPacket.prototype.hasTimestamp = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.MIMCPacketList = function(e) {
    jspb.Message.initialize(this, e, 0, -1, proto.MIMCPacketList.repeatedFields_, null);
}, goog.inherits(proto.MIMCPacketList, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCPacketList.displayName = "proto.MIMCPacketList"), 
proto.MIMCPacketList.repeatedFields_ = [ 4 ], jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCPacketList.prototype.toObject = function(e) {
    return proto.MIMCPacketList.toObject(e, this);
}, proto.MIMCPacketList.toObject = function(e, t) {
    var r = {
        uuid: jspb.Message.getField(t, 1),
        resource: jspb.Message.getField(t, 2),
        maxsequence: jspb.Message.getField(t, 3),
        packetsList: jspb.Message.toObjectList(t.getPacketsList(), proto.MIMCPacket.toObject, e)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.MIMCPacketList.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCPacketList();
    return proto.MIMCPacketList.deserializeBinaryFromReader(t, e);
}, proto.MIMCPacketList.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt64String();
        e.setUuid(r);
        break;

      case 2:
        r = t.readString(), e.setResource(r);
        break;

      case 3:
        r = t.readInt64String(), e.setMaxsequence(r);
        break;

      case 4:
        r = new proto.MIMCPacket(), t.readMessage(r, proto.MIMCPacket.deserializeBinaryFromReader), 
        e.addPackets(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCPacketList.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCPacketList.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCPacketList.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt64String(3, r), 0 < (r = e.getPacketsList()).length && t.writeRepeatedMessage(4, r, proto.MIMCPacket.serializeBinaryToWriter);
}, proto.MIMCPacketList.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.MIMCPacketList.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.MIMCPacketList.prototype.clearUuid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.MIMCPacketList.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCPacketList.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.MIMCPacketList.prototype.setResource = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.MIMCPacketList.prototype.clearResource = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.MIMCPacketList.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.MIMCPacketList.prototype.getMaxsequence = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "0");
}, proto.MIMCPacketList.prototype.setMaxsequence = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.MIMCPacketList.prototype.clearMaxsequence = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.MIMCPacketList.prototype.hasMaxsequence = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.MIMCPacketList.prototype.getPacketsList = function() {
    return jspb.Message.getRepeatedWrapperField(this, proto.MIMCPacket, 4);
}, proto.MIMCPacketList.prototype.setPacketsList = function(e) {
    jspb.Message.setRepeatedWrapperField(this, 4, e);
}, proto.MIMCPacketList.prototype.addPackets = function(e, t) {
    return jspb.Message.addToRepeatedWrapperField(this, 4, e, proto.MIMCPacket, t);
}, proto.MIMCPacketList.prototype.clearPacketsList = function() {
    this.setPacketsList([]);
}, proto.MIMCPacketAck = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCPacketAck, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCPacketAck.displayName = "proto.MIMCPacketAck"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCPacketAck.prototype.toObject = function(e) {
    return proto.MIMCPacketAck.toObject(e, this);
}, proto.MIMCPacketAck.toObject = function(e, t) {
    var r = {
        packetid: jspb.Message.getField(t, 1),
        uuid: jspb.Message.getField(t, 2),
        resource: jspb.Message.getField(t, 3),
        sequence: jspb.Message.getField(t, 4),
        timestamp: jspb.Message.getField(t, 5),
        pb_package: jspb.Message.getField(t, 6),
        errormsg: jspb.Message.getField(t, 7)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.MIMCPacketAck.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCPacketAck();
    return proto.MIMCPacketAck.deserializeBinaryFromReader(t, e);
}, proto.MIMCPacketAck.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readString();
        e.setPacketid(r);
        break;

      case 2:
        r = t.readInt64String(), e.setUuid(r);
        break;

      case 3:
        r = t.readString(), e.setResource(r);
        break;

      case 4:
        r = t.readInt64String(), e.setSequence(r);
        break;

      case 5:
        r = t.readInt64String(), e.setTimestamp(r);
        break;

      case 6:
        r = t.readString(), e.setPackage(r);
        break;

      case 7:
        r = t.readString(), e.setErrormsg(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCPacketAck.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCPacketAck.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCPacketAck.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeString(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeInt64String(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeInt64String(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeInt64String(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeString(6, r), 
    null != (r = jspb.Message.getField(e, 7)) && t.writeString(7, r);
}, proto.MIMCPacketAck.prototype.getPacketid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.MIMCPacketAck.prototype.setPacketid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.MIMCPacketAck.prototype.clearPacketid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.MIMCPacketAck.prototype.hasPacketid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCPacketAck.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "0");
}, proto.MIMCPacketAck.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.MIMCPacketAck.prototype.clearUuid = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.MIMCPacketAck.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.MIMCPacketAck.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.MIMCPacketAck.prototype.setResource = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.MIMCPacketAck.prototype.clearResource = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.MIMCPacketAck.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.MIMCPacketAck.prototype.getSequence = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "0");
}, proto.MIMCPacketAck.prototype.setSequence = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.MIMCPacketAck.prototype.clearSequence = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.MIMCPacketAck.prototype.hasSequence = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.MIMCPacketAck.prototype.getTimestamp = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "0");
}, proto.MIMCPacketAck.prototype.setTimestamp = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.MIMCPacketAck.prototype.clearTimestamp = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.MIMCPacketAck.prototype.hasTimestamp = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.MIMCPacketAck.prototype.getPackage = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "");
}, proto.MIMCPacketAck.prototype.setPackage = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.MIMCPacketAck.prototype.clearPackage = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.MIMCPacketAck.prototype.hasPackage = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.MIMCPacketAck.prototype.getErrormsg = function() {
    return jspb.Message.getFieldWithDefault(this, 7, "");
}, proto.MIMCPacketAck.prototype.setErrormsg = function(e) {
    jspb.Message.setField(this, 7, e);
}, proto.MIMCPacketAck.prototype.clearErrormsg = function() {
    jspb.Message.setField(this, 7, void 0);
}, proto.MIMCPacketAck.prototype.hasErrormsg = function() {
    return null != jspb.Message.getField(this, 7);
}, proto.MIMCP2PMessage = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCP2PMessage, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCP2PMessage.displayName = "proto.MIMCP2PMessage"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCP2PMessage.prototype.toObject = function(e) {
    return proto.MIMCP2PMessage.toObject(e, this);
}, proto.MIMCP2PMessage.toObject = function(e, t) {
    var r, o = {
        from: (r = t.getFrom()) && proto.MIMCUser.toObject(e, r),
        to: (r = t.getTo()) && proto.MIMCUser.toObject(e, r),
        payload: t.getPayload_asB64(),
        isstore: jspb.Message.getField(t, 4),
        biztype: jspb.Message.getField(t, 5)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.MIMCP2PMessage.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCP2PMessage();
    return proto.MIMCP2PMessage.deserializeBinaryFromReader(t, e);
}, proto.MIMCP2PMessage.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.MIMCUser();
        t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), e.setFrom(r);
        break;

      case 2:
        r = new proto.MIMCUser(), t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), 
        e.setTo(r);
        break;

      case 3:
        r = t.readBytes(), e.setPayload(r);
        break;

      case 4:
        r = t.readBool(), e.setIsstore(r);
        break;

      case 5:
        r = t.readString(), e.setBiztype(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCP2PMessage.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCP2PMessage.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCP2PMessage.serializeBinaryToWriter = function(e, t) {
    var r = e.getFrom();
    null != r && t.writeMessage(1, r, proto.MIMCUser.serializeBinaryToWriter), null != (r = e.getTo()) && t.writeMessage(2, r, proto.MIMCUser.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeBytes(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeBool(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeString(5, r);
}, proto.MIMCP2PMessage.prototype.getFrom = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 1);
}, proto.MIMCP2PMessage.prototype.setFrom = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.MIMCP2PMessage.prototype.clearFrom = function() {
    this.setFrom(void 0);
}, proto.MIMCP2PMessage.prototype.hasFrom = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCP2PMessage.prototype.getTo = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 2);
}, proto.MIMCP2PMessage.prototype.setTo = function(e) {
    jspb.Message.setWrapperField(this, 2, e);
}, proto.MIMCP2PMessage.prototype.clearTo = function() {
    this.setTo(void 0);
}, proto.MIMCP2PMessage.prototype.hasTo = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.MIMCP2PMessage.prototype.getPayload = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.MIMCP2PMessage.prototype.getPayload_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getPayload());
}, proto.MIMCP2PMessage.prototype.getPayload_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getPayload());
}, proto.MIMCP2PMessage.prototype.setPayload = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.MIMCP2PMessage.prototype.clearPayload = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.MIMCP2PMessage.prototype.hasPayload = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.MIMCP2PMessage.prototype.getIsstore = function() {
    return jspb.Message.getFieldWithDefault(this, 4, !1);
}, proto.MIMCP2PMessage.prototype.setIsstore = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.MIMCP2PMessage.prototype.clearIsstore = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.MIMCP2PMessage.prototype.hasIsstore = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.MIMCP2PMessage.prototype.getBiztype = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.MIMCP2PMessage.prototype.setBiztype = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.MIMCP2PMessage.prototype.clearBiztype = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.MIMCP2PMessage.prototype.hasBiztype = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.MIMCP2TMessage = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCP2TMessage, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCP2TMessage.displayName = "proto.MIMCP2TMessage"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCP2TMessage.prototype.toObject = function(e) {
    return proto.MIMCP2TMessage.toObject(e, this);
}, proto.MIMCP2TMessage.toObject = function(e, t) {
    var r, o = {
        from: (r = t.getFrom()) && proto.MIMCUser.toObject(e, r),
        to: (r = t.getTo()) && proto.MIMCGroup.toObject(e, r),
        payload: t.getPayload_asB64(),
        isstore: jspb.Message.getField(t, 4),
        biztype: jspb.Message.getField(t, 5)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.MIMCP2TMessage.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCP2TMessage();
    return proto.MIMCP2TMessage.deserializeBinaryFromReader(t, e);
}, proto.MIMCP2TMessage.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.MIMCUser();
        t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), e.setFrom(r);
        break;

      case 2:
        r = new proto.MIMCGroup(), t.readMessage(r, proto.MIMCGroup.deserializeBinaryFromReader), 
        e.setTo(r);
        break;

      case 3:
        r = t.readBytes(), e.setPayload(r);
        break;

      case 4:
        r = t.readBool(), e.setIsstore(r);
        break;

      case 5:
        r = t.readString(), e.setBiztype(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCP2TMessage.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCP2TMessage.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCP2TMessage.serializeBinaryToWriter = function(e, t) {
    var r = e.getFrom();
    null != r && t.writeMessage(1, r, proto.MIMCUser.serializeBinaryToWriter), null != (r = e.getTo()) && t.writeMessage(2, r, proto.MIMCGroup.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeBytes(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeBool(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeString(5, r);
}, proto.MIMCP2TMessage.prototype.getFrom = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 1);
}, proto.MIMCP2TMessage.prototype.setFrom = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.MIMCP2TMessage.prototype.clearFrom = function() {
    this.setFrom(void 0);
}, proto.MIMCP2TMessage.prototype.hasFrom = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCP2TMessage.prototype.getTo = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCGroup, 2);
}, proto.MIMCP2TMessage.prototype.setTo = function(e) {
    jspb.Message.setWrapperField(this, 2, e);
}, proto.MIMCP2TMessage.prototype.clearTo = function() {
    this.setTo(void 0);
}, proto.MIMCP2TMessage.prototype.hasTo = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.MIMCP2TMessage.prototype.getPayload = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.MIMCP2TMessage.prototype.getPayload_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getPayload());
}, proto.MIMCP2TMessage.prototype.getPayload_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getPayload());
}, proto.MIMCP2TMessage.prototype.setPayload = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.MIMCP2TMessage.prototype.clearPayload = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.MIMCP2TMessage.prototype.hasPayload = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.MIMCP2TMessage.prototype.getIsstore = function() {
    return jspb.Message.getFieldWithDefault(this, 4, !1);
}, proto.MIMCP2TMessage.prototype.setIsstore = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.MIMCP2TMessage.prototype.clearIsstore = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.MIMCP2TMessage.prototype.hasIsstore = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.MIMCP2TMessage.prototype.getBiztype = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.MIMCP2TMessage.prototype.setBiztype = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.MIMCP2TMessage.prototype.clearBiztype = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.MIMCP2TMessage.prototype.hasBiztype = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.MIMCSequenceAck = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCSequenceAck, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCSequenceAck.displayName = "proto.MIMCSequenceAck"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCSequenceAck.prototype.toObject = function(e) {
    return proto.MIMCSequenceAck.toObject(e, this);
}, proto.MIMCSequenceAck.toObject = function(e, t) {
    var r = {
        uuid: jspb.Message.getField(t, 1),
        resource: jspb.Message.getField(t, 2),
        sequence: jspb.Message.getField(t, 3)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.MIMCSequenceAck.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCSequenceAck();
    return proto.MIMCSequenceAck.deserializeBinaryFromReader(t, e);
}, proto.MIMCSequenceAck.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt64String();
        e.setUuid(r);
        break;

      case 2:
        r = t.readString(), e.setResource(r);
        break;

      case 3:
        r = t.readInt64String(), e.setSequence(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCSequenceAck.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCSequenceAck.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCSequenceAck.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt64String(3, r);
}, proto.MIMCSequenceAck.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.MIMCSequenceAck.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.MIMCSequenceAck.prototype.clearUuid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.MIMCSequenceAck.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCSequenceAck.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.MIMCSequenceAck.prototype.setResource = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.MIMCSequenceAck.prototype.clearResource = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.MIMCSequenceAck.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.MIMCSequenceAck.prototype.getSequence = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "0");
}, proto.MIMCSequenceAck.prototype.setSequence = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.MIMCSequenceAck.prototype.clearSequence = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.MIMCSequenceAck.prototype.hasSequence = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.MIMCPull = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCPull, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCPull.displayName = "proto.MIMCPull"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCPull.prototype.toObject = function(e) {
    return proto.MIMCPull.toObject(e, this);
}, proto.MIMCPull.toObject = function(e, t) {
    var r = {
        uuid: jspb.Message.getField(t, 1),
        resource: jspb.Message.getField(t, 2)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.MIMCPull.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCPull();
    return proto.MIMCPull.deserializeBinaryFromReader(t, e);
}, proto.MIMCPull.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt64String();
        e.setUuid(r);
        break;

      case 2:
        r = t.readString(), e.setResource(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCPull.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCPull.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCPull.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r);
}, proto.MIMCPull.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.MIMCPull.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.MIMCPull.prototype.clearUuid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.MIMCPull.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCPull.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.MIMCPull.prototype.setResource = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.MIMCPull.prototype.clearResource = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.MIMCPull.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.P2PPushMesage = function(e) {
    jspb.Message.initialize(this, e, 0, -1, proto.P2PPushMesage.repeatedFields_, null);
}, goog.inherits(proto.P2PPushMesage, jspb.Message), goog.DEBUG && !COMPILED && (proto.P2PPushMesage.displayName = "proto.P2PPushMesage"), 
proto.P2PPushMesage.repeatedFields_ = [ 2 ], jspb.Message.GENERATE_TO_OBJECT && (proto.P2PPushMesage.prototype.toObject = function(e) {
    return proto.P2PPushMesage.toObject(e, this);
}, proto.P2PPushMesage.toObject = function(e, t) {
    var r, o = {
        from: (r = t.getFrom()) && proto.MIMCUser.toObject(e, r),
        toList: jspb.Message.toObjectList(t.getToList(), proto.MIMCUser.toObject, e),
        payload: t.getPayload_asB64(),
        isstore: jspb.Message.getField(t, 4),
        biztype: jspb.Message.getField(t, 5)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.P2PPushMesage.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.P2PPushMesage();
    return proto.P2PPushMesage.deserializeBinaryFromReader(t, e);
}, proto.P2PPushMesage.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.MIMCUser();
        t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), e.setFrom(r);
        break;

      case 2:
        r = new proto.MIMCUser(), t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), 
        e.addTo(r);
        break;

      case 3:
        r = t.readBytes(), e.setPayload(r);
        break;

      case 4:
        r = t.readBool(), e.setIsstore(r);
        break;

      case 5:
        r = t.readString(), e.setBiztype(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.P2PPushMesage.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.P2PPushMesage.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.P2PPushMesage.serializeBinaryToWriter = function(e, t) {
    var r = e.getFrom();
    null != r && t.writeMessage(1, r, proto.MIMCUser.serializeBinaryToWriter), 0 < (r = e.getToList()).length && t.writeRepeatedMessage(2, r, proto.MIMCUser.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeBytes(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeBool(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeString(5, r);
}, proto.P2PPushMesage.prototype.getFrom = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 1);
}, proto.P2PPushMesage.prototype.setFrom = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.P2PPushMesage.prototype.clearFrom = function() {
    this.setFrom(void 0);
}, proto.P2PPushMesage.prototype.hasFrom = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.P2PPushMesage.prototype.getToList = function() {
    return jspb.Message.getRepeatedWrapperField(this, proto.MIMCUser, 2);
}, proto.P2PPushMesage.prototype.setToList = function(e) {
    jspb.Message.setRepeatedWrapperField(this, 2, e);
}, proto.P2PPushMesage.prototype.addTo = function(e, t) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, e, proto.MIMCUser, t);
}, proto.P2PPushMesage.prototype.clearToList = function() {
    this.setToList([]);
}, proto.P2PPushMesage.prototype.getPayload = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.P2PPushMesage.prototype.getPayload_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getPayload());
}, proto.P2PPushMesage.prototype.getPayload_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getPayload());
}, proto.P2PPushMesage.prototype.setPayload = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.P2PPushMesage.prototype.clearPayload = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.P2PPushMesage.prototype.hasPayload = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.P2PPushMesage.prototype.getIsstore = function() {
    return jspb.Message.getFieldWithDefault(this, 4, !1);
}, proto.P2PPushMesage.prototype.setIsstore = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.P2PPushMesage.prototype.clearIsstore = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.P2PPushMesage.prototype.hasIsstore = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.P2PPushMesage.prototype.getBiztype = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.P2PPushMesage.prototype.setBiztype = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.P2PPushMesage.prototype.clearBiztype = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.P2PPushMesage.prototype.hasBiztype = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.P2TPushMesage = function(e) {
    jspb.Message.initialize(this, e, 0, -1, proto.P2TPushMesage.repeatedFields_, null);
}, goog.inherits(proto.P2TPushMesage, jspb.Message), goog.DEBUG && !COMPILED && (proto.P2TPushMesage.displayName = "proto.P2TPushMesage"), 
proto.P2TPushMesage.repeatedFields_ = [ 2 ], jspb.Message.GENERATE_TO_OBJECT && (proto.P2TPushMesage.prototype.toObject = function(e) {
    return proto.P2TPushMesage.toObject(e, this);
}, proto.P2TPushMesage.toObject = function(e, t) {
    var r, o = {
        from: (r = t.getFrom()) && proto.MIMCUser.toObject(e, r),
        toList: jspb.Message.toObjectList(t.getToList(), proto.MIMCGroup.toObject, e),
        payload: t.getPayload_asB64(),
        isstore: jspb.Message.getField(t, 4),
        biztype: jspb.Message.getField(t, 5)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.P2TPushMesage.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.P2TPushMesage();
    return proto.P2TPushMesage.deserializeBinaryFromReader(t, e);
}, proto.P2TPushMesage.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.MIMCUser();
        t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), e.setFrom(r);
        break;

      case 2:
        r = new proto.MIMCGroup(), t.readMessage(r, proto.MIMCGroup.deserializeBinaryFromReader), 
        e.addTo(r);
        break;

      case 3:
        r = t.readBytes(), e.setPayload(r);
        break;

      case 4:
        r = t.readBool(), e.setIsstore(r);
        break;

      case 5:
        r = t.readString(), e.setBiztype(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.P2TPushMesage.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.P2TPushMesage.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.P2TPushMesage.serializeBinaryToWriter = function(e, t) {
    var r = e.getFrom();
    null != r && t.writeMessage(1, r, proto.MIMCUser.serializeBinaryToWriter), 0 < (r = e.getToList()).length && t.writeRepeatedMessage(2, r, proto.MIMCGroup.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeBytes(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeBool(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeString(5, r);
}, proto.P2TPushMesage.prototype.getFrom = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 1);
}, proto.P2TPushMesage.prototype.setFrom = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.P2TPushMesage.prototype.clearFrom = function() {
    this.setFrom(void 0);
}, proto.P2TPushMesage.prototype.hasFrom = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.P2TPushMesage.prototype.getToList = function() {
    return jspb.Message.getRepeatedWrapperField(this, proto.MIMCGroup, 2);
}, proto.P2TPushMesage.prototype.setToList = function(e) {
    jspb.Message.setRepeatedWrapperField(this, 2, e);
}, proto.P2TPushMesage.prototype.addTo = function(e, t) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, e, proto.MIMCGroup, t);
}, proto.P2TPushMesage.prototype.clearToList = function() {
    this.setToList([]);
}, proto.P2TPushMesage.prototype.getPayload = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.P2TPushMesage.prototype.getPayload_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getPayload());
}, proto.P2TPushMesage.prototype.getPayload_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getPayload());
}, proto.P2TPushMesage.prototype.setPayload = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.P2TPushMesage.prototype.clearPayload = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.P2TPushMesage.prototype.hasPayload = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.P2TPushMesage.prototype.getIsstore = function() {
    return jspb.Message.getFieldWithDefault(this, 4, !1);
}, proto.P2TPushMesage.prototype.setIsstore = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.P2TPushMesage.prototype.clearIsstore = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.P2TPushMesage.prototype.hasIsstore = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.P2TPushMesage.prototype.getBiztype = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "");
}, proto.P2TPushMesage.prototype.setBiztype = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.P2TPushMesage.prototype.clearBiztype = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.P2TPushMesage.prototype.hasBiztype = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.MIMCUser = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCUser, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCUser.displayName = "proto.MIMCUser"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCUser.prototype.toObject = function(e) {
    return proto.MIMCUser.toObject(e, this);
}, proto.MIMCUser.toObject = function(e, t) {
    var r = {
        appid: jspb.Message.getField(t, 1),
        appaccount: jspb.Message.getField(t, 2),
        uuid: jspb.Message.getField(t, 3),
        resource: jspb.Message.getField(t, 4)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.MIMCUser.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCUser();
    return proto.MIMCUser.deserializeBinaryFromReader(t, e);
}, proto.MIMCUser.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt64String();
        e.setAppid(r);
        break;

      case 2:
        r = t.readString(), e.setAppaccount(r);
        break;

      case 3:
        r = t.readInt64String(), e.setUuid(r);
        break;

      case 4:
        r = t.readString(), e.setResource(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCUser.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCUser.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCUser.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeString(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt64String(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeString(4, r);
}, proto.MIMCUser.prototype.getAppid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.MIMCUser.prototype.setAppid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.MIMCUser.prototype.clearAppid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.MIMCUser.prototype.hasAppid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCUser.prototype.getAppaccount = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.MIMCUser.prototype.setAppaccount = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.MIMCUser.prototype.clearAppaccount = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.MIMCUser.prototype.hasAppaccount = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.MIMCUser.prototype.getUuid = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "0");
}, proto.MIMCUser.prototype.setUuid = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.MIMCUser.prototype.clearUuid = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.MIMCUser.prototype.hasUuid = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.MIMCUser.prototype.getResource = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "");
}, proto.MIMCUser.prototype.setResource = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.MIMCUser.prototype.clearResource = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.MIMCUser.prototype.hasResource = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.MIMCGroup = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.MIMCGroup, jspb.Message), goog.DEBUG && !COMPILED && (proto.MIMCGroup.displayName = "proto.MIMCGroup"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.MIMCGroup.prototype.toObject = function(e) {
    return proto.MIMCGroup.toObject(e, this);
}, proto.MIMCGroup.toObject = function(e, t) {
    var r = {
        appid: jspb.Message.getField(t, 1),
        topicid: jspb.Message.getField(t, 2)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.MIMCGroup.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.MIMCGroup();
    return proto.MIMCGroup.deserializeBinaryFromReader(t, e);
}, proto.MIMCGroup.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt64String();
        e.setAppid(r);
        break;

      case 2:
        r = t.readInt64String(), e.setTopicid(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.MIMCGroup.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.MIMCGroup.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.MIMCGroup.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeInt64String(2, r);
}, proto.MIMCGroup.prototype.getAppid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.MIMCGroup.prototype.setAppid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.MIMCGroup.prototype.clearAppid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.MIMCGroup.prototype.hasAppid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.MIMCGroup.prototype.getTopicid = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "0");
}, proto.MIMCGroup.prototype.setTopicid = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.MIMCGroup.prototype.clearTopicid = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.MIMCGroup.prototype.hasTopicid = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCGroup = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCGroup, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCGroup.displayName = "proto.UCGroup"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCGroup.prototype.toObject = function(e) {
    return proto.UCGroup.toObject(e, this);
}, proto.UCGroup.toObject = function(e, t) {
    var r = {
        appid: jspb.Message.getField(t, 1),
        topicid: jspb.Message.getField(t, 2)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.UCGroup.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCGroup();
    return proto.UCGroup.deserializeBinaryFromReader(t, e);
}, proto.UCGroup.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readInt64String();
        e.setAppid(r);
        break;

      case 2:
        r = t.readInt64String(), e.setTopicid(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCGroup.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCGroup.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCGroup.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeInt64String(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeInt64String(2, r);
}, proto.UCGroup.prototype.getAppid = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "0");
}, proto.UCGroup.prototype.setAppid = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.UCGroup.prototype.clearAppid = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCGroup.prototype.hasAppid = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCGroup.prototype.getTopicid = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "0");
}, proto.UCGroup.prototype.setTopicid = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.UCGroup.prototype.clearTopicid = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCGroup.prototype.hasTopicid = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCPacket = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCPacket, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCPacket.displayName = "proto.UCPacket"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCPacket.prototype.toObject = function(e) {
    return proto.UCPacket.toObject(e, this);
}, proto.UCPacket.toObject = function(e, t) {
    var r, o = {
        user: (r = t.getUser()) && proto.MIMCUser.toObject(e, r),
        type: jspb.Message.getField(t, 2),
        payload: t.getPayload_asB64(),
        packetid: jspb.Message.getField(t, 4)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCPacket.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCPacket();
    return proto.UCPacket.deserializeBinaryFromReader(t, e);
}, proto.UCPacket.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.MIMCUser();
        t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), e.setUser(r);
        break;

      case 2:
        r = t.readEnum(), e.setType(r);
        break;

      case 3:
        r = t.readBytes(), e.setPayload(r);
        break;

      case 4:
        r = t.readString(), e.setPacketid(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCPacket.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCPacket.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCPacket.serializeBinaryToWriter = function(e, t) {
    var r = e.getUser();
    null != r && t.writeMessage(1, r, proto.MIMCUser.serializeBinaryToWriter), null != (r = jspb.Message.getField(e, 2)) && t.writeEnum(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeBytes(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeString(4, r);
}, proto.UCPacket.prototype.getUser = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 1, 1);
}, proto.UCPacket.prototype.setUser = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCPacket.prototype.clearUser = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCPacket.prototype.hasUser = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCPacket.prototype.getType = function() {
    return jspb.Message.getFieldWithDefault(this, 2, 1);
}, proto.UCPacket.prototype.setType = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.UCPacket.prototype.clearType = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCPacket.prototype.hasType = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCPacket.prototype.getPayload = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.UCPacket.prototype.getPayload_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getPayload());
}, proto.UCPacket.prototype.getPayload_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getPayload());
}, proto.UCPacket.prototype.setPayload = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.UCPacket.prototype.clearPayload = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.UCPacket.prototype.hasPayload = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.UCPacket.prototype.getPacketid = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "");
}, proto.UCPacket.prototype.setPacketid = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.UCPacket.prototype.clearPacketid = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.UCPacket.prototype.hasPacketid = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.UCExchange = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCExchange, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCExchange.displayName = "proto.UCExchange"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCExchange.prototype.toObject = function(e) {
    return proto.UCExchange.toObject(e, this);
}, proto.UCExchange.toObject = function(e, t) {
    var r, o = {
        feinfo: (r = t.getFeinfo()) && proto.FeInfo.toObject(e, r),
        packet: (r = t.getPacket()) && proto.UCPacket.toObject(e, r),
        pb_package: jspb.Message.getField(t, 3)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCExchange.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCExchange();
    return proto.UCExchange.deserializeBinaryFromReader(t, e);
}, proto.UCExchange.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.FeInfo();
        t.readMessage(r, proto.FeInfo.deserializeBinaryFromReader), e.setFeinfo(r);
        break;

      case 2:
        r = new proto.UCPacket(), t.readMessage(r, proto.UCPacket.deserializeBinaryFromReader), 
        e.setPacket(r);
        break;

      case 3:
        r = t.readString(), e.setPackage(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCExchange.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCExchange.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCExchange.serializeBinaryToWriter = function(e, t) {
    var r = e.getFeinfo();
    null != r && t.writeMessage(1, r, proto.FeInfo.serializeBinaryToWriter), null != (r = e.getPacket()) && t.writeMessage(2, r, proto.UCPacket.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r);
}, proto.UCExchange.prototype.getFeinfo = function() {
    return jspb.Message.getWrapperField(this, proto.FeInfo, 1);
}, proto.UCExchange.prototype.setFeinfo = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCExchange.prototype.clearFeinfo = function() {
    this.setFeinfo(void 0);
}, proto.UCExchange.prototype.hasFeinfo = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCExchange.prototype.getPacket = function() {
    return jspb.Message.getWrapperField(this, proto.UCPacket, 2, 1);
}, proto.UCExchange.prototype.setPacket = function(e) {
    jspb.Message.setWrapperField(this, 2, e);
}, proto.UCExchange.prototype.clearPacket = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCExchange.prototype.hasPacket = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCExchange.prototype.getPackage = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.UCExchange.prototype.setPackage = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.UCExchange.prototype.clearPackage = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.UCExchange.prototype.hasPackage = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.UCJoin = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCJoin, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCJoin.displayName = "proto.UCJoin"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCJoin.prototype.toObject = function(e) {
    return proto.UCJoin.toObject(e, this);
}, proto.UCJoin.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCJoin.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCJoin();
    return proto.UCJoin.deserializeBinaryFromReader(t, e);
}, proto.UCJoin.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCJoin.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCJoin.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCJoin.serializeBinaryToWriter = function(e, t) {
    null != (e = e.getGroup()) && t.writeMessage(1, e, proto.UCGroup.serializeBinaryToWriter);
}, proto.UCJoin.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCJoin.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCJoin.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCJoin.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCJoinResp = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCJoinResp, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCJoinResp.displayName = "proto.UCJoinResp"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCJoinResp.prototype.toObject = function(e) {
    return proto.UCJoinResp.toObject(e, this);
}, proto.UCJoinResp.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r),
        code: jspb.Message.getField(t, 2),
        message: jspb.Message.getField(t, 3)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCJoinResp.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCJoinResp();
    return proto.UCJoinResp.deserializeBinaryFromReader(t, e);
}, proto.UCJoinResp.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      case 2:
        r = t.readInt32(), e.setCode(r);
        break;

      case 3:
        r = t.readString(), e.setMessage(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCJoinResp.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCJoinResp.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCJoinResp.serializeBinaryToWriter = function(e, t) {
    var r = e.getGroup();
    null != r && t.writeMessage(1, r, proto.UCGroup.serializeBinaryToWriter), null != (r = jspb.Message.getField(e, 2)) && t.writeInt32(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r);
}, proto.UCJoinResp.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCJoinResp.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCJoinResp.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCJoinResp.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCJoinResp.prototype.getCode = function() {
    return jspb.Message.getFieldWithDefault(this, 2, 0);
}, proto.UCJoinResp.prototype.setCode = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.UCJoinResp.prototype.clearCode = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCJoinResp.prototype.hasCode = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCJoinResp.prototype.getMessage = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.UCJoinResp.prototype.setMessage = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.UCJoinResp.prototype.clearMessage = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.UCJoinResp.prototype.hasMessage = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.UCQuit = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCQuit, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCQuit.displayName = "proto.UCQuit"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCQuit.prototype.toObject = function(e) {
    return proto.UCQuit.toObject(e, this);
}, proto.UCQuit.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCQuit.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCQuit();
    return proto.UCQuit.deserializeBinaryFromReader(t, e);
}, proto.UCQuit.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCQuit.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCQuit.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCQuit.serializeBinaryToWriter = function(e, t) {
    null != (e = e.getGroup()) && t.writeMessage(1, e, proto.UCGroup.serializeBinaryToWriter);
}, proto.UCQuit.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCQuit.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCQuit.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCQuit.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCQuitResp = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCQuitResp, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCQuitResp.displayName = "proto.UCQuitResp"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCQuitResp.prototype.toObject = function(e) {
    return proto.UCQuitResp.toObject(e, this);
}, proto.UCQuitResp.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r),
        code: jspb.Message.getField(t, 2),
        message: jspb.Message.getField(t, 3)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCQuitResp.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCQuitResp();
    return proto.UCQuitResp.deserializeBinaryFromReader(t, e);
}, proto.UCQuitResp.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      case 2:
        r = t.readInt32(), e.setCode(r);
        break;

      case 3:
        r = t.readString(), e.setMessage(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCQuitResp.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCQuitResp.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCQuitResp.serializeBinaryToWriter = function(e, t) {
    var r = e.getGroup();
    null != r && t.writeMessage(1, r, proto.UCGroup.serializeBinaryToWriter), null != (r = jspb.Message.getField(e, 2)) && t.writeInt32(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeString(3, r);
}, proto.UCQuitResp.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCQuitResp.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCQuitResp.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCQuitResp.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCQuitResp.prototype.getCode = function() {
    return jspb.Message.getFieldWithDefault(this, 2, 0);
}, proto.UCQuitResp.prototype.setCode = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.UCQuitResp.prototype.clearCode = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCQuitResp.prototype.hasCode = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCQuitResp.prototype.getMessage = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
}, proto.UCQuitResp.prototype.setMessage = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.UCQuitResp.prototype.clearMessage = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.UCQuitResp.prototype.hasMessage = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.UCPing = function(e) {
    jspb.Message.initialize(this, e, 0, -1, proto.UCPing.repeatedFields_, null);
}, goog.inherits(proto.UCPing, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCPing.displayName = "proto.UCPing"), 
proto.UCPing.repeatedFields_ = [ 1 ], jspb.Message.GENERATE_TO_OBJECT && (proto.UCPing.prototype.toObject = function(e) {
    return proto.UCPing.toObject(e, this);
}, proto.UCPing.toObject = function(e, t) {
    var r = {
        groupList: jspb.Message.toObjectList(t.getGroupList(), proto.UCGroup.toObject, e)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.UCPing.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCPing();
    return proto.UCPing.deserializeBinaryFromReader(t, e);
}, proto.UCPing.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.addGroup(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCPing.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCPing.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCPing.serializeBinaryToWriter = function(e, t) {
    0 < (e = e.getGroupList()).length && t.writeRepeatedMessage(1, e, proto.UCGroup.serializeBinaryToWriter);
};

proto.UCPing.prototype.getGroupList = function() {
    return jspb.Message.getRepeatedWrapperField(this, proto.UCGroup, 1);
}, proto.UCPing.prototype.setGroupList = function(e) {
    jspb.Message.setRepeatedWrapperField(this, 1, e);
}, proto.UCPing.prototype.addGroup = function(e, t) {
    return jspb.Message.addToRepeatedWrapperField(this, 1, e, proto.UCGroup, t);
}, proto.UCPing.prototype.clearGroupList = function() {
    this.setGroupList([]);
}, proto.UCMessage = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCMessage, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCMessage.displayName = "proto.UCMessage"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCMessage.prototype.toObject = function(e) {
    return proto.UCMessage.toObject(e, this);
}, proto.UCMessage.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r),
        payload: t.getPayload_asB64(),
        sequence: jspb.Message.getField(t, 3),
        isstore: jspb.Message.getField(t, 4),
        user: (r = t.getUser()) && proto.MIMCUser.toObject(e, r),
        timestamp: jspb.Message.getField(t, 6),
        packetid: jspb.Message.getField(t, 7),
        biztype: jspb.Message.getField(t, 8)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCMessage.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCMessage();
    return proto.UCMessage.deserializeBinaryFromReader(t, e);
}, proto.UCMessage.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      case 2:
        r = t.readBytes(), e.setPayload(r);
        break;

      case 3:
        r = t.readInt64String(), e.setSequence(r);
        break;

      case 4:
        r = t.readBool(), e.setIsstore(r);
        break;

      case 5:
        r = new proto.MIMCUser(), t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), 
        e.setUser(r);
        break;

      case 6:
        r = t.readInt64String(), e.setTimestamp(r);
        break;

      case 7:
        r = t.readString(), e.setPacketid(r);
        break;

      case 8:
        r = t.readString(), e.setBiztype(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCMessage.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCMessage.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCMessage.serializeBinaryToWriter = function(e, t) {
    var r = e.getGroup();
    null != r && t.writeMessage(1, r, proto.UCGroup.serializeBinaryToWriter), null != (r = jspb.Message.getField(e, 2)) && t.writeBytes(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt64String(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeBool(4, r), 
    null != (r = e.getUser()) && t.writeMessage(5, r, proto.MIMCUser.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 6)) && t.writeInt64String(6, r), null != (r = jspb.Message.getField(e, 7)) && t.writeString(7, r), 
    null != (r = jspb.Message.getField(e, 8)) && t.writeString(8, r);
}, proto.UCMessage.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCMessage.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCMessage.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCMessage.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCMessage.prototype.getPayload = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
}, proto.UCMessage.prototype.getPayload_asB64 = function() {
    return jspb.Message.bytesAsB64(this.getPayload());
}, proto.UCMessage.prototype.getPayload_asU8 = function() {
    return jspb.Message.bytesAsU8(this.getPayload());
}, proto.UCMessage.prototype.setPayload = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.UCMessage.prototype.clearPayload = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCMessage.prototype.hasPayload = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCMessage.prototype.getSequence = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "0");
}, proto.UCMessage.prototype.setSequence = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.UCMessage.prototype.clearSequence = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.UCMessage.prototype.hasSequence = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.UCMessage.prototype.getIsstore = function() {
    return jspb.Message.getFieldWithDefault(this, 4, !1);
}, proto.UCMessage.prototype.setIsstore = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.UCMessage.prototype.clearIsstore = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.UCMessage.prototype.hasIsstore = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.UCMessage.prototype.getUser = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 5);
}, proto.UCMessage.prototype.setUser = function(e) {
    jspb.Message.setWrapperField(this, 5, e);
}, proto.UCMessage.prototype.clearUser = function() {
    this.setUser(void 0);
}, proto.UCMessage.prototype.hasUser = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.UCMessage.prototype.getTimestamp = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "0");
}, proto.UCMessage.prototype.setTimestamp = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.UCMessage.prototype.clearTimestamp = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.UCMessage.prototype.hasTimestamp = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.UCMessage.prototype.getPacketid = function() {
    return jspb.Message.getFieldWithDefault(this, 7, "");
}, proto.UCMessage.prototype.setPacketid = function(e) {
    jspb.Message.setField(this, 7, e);
}, proto.UCMessage.prototype.clearPacketid = function() {
    jspb.Message.setField(this, 7, void 0);
}, proto.UCMessage.prototype.hasPacketid = function() {
    return null != jspb.Message.getField(this, 7);
}, proto.UCMessage.prototype.getBiztype = function() {
    return jspb.Message.getFieldWithDefault(this, 8, "");
}, proto.UCMessage.prototype.setBiztype = function(e) {
    jspb.Message.setField(this, 8, e);
}, proto.UCMessage.prototype.clearBiztype = function() {
    jspb.Message.setField(this, 8, void 0);
}, proto.UCMessage.prototype.hasBiztype = function() {
    return null != jspb.Message.getField(this, 8);
}, proto.UCPushMessage = function(e) {
    jspb.Message.initialize(this, e, 0, -1, proto.UCPushMessage.repeatedFields_, null);
}, goog.inherits(proto.UCPushMessage, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCPushMessage.displayName = "proto.UCPushMessage"), 
proto.UCPushMessage.repeatedFields_ = [ 2, 3 ], jspb.Message.GENERATE_TO_OBJECT && (proto.UCPushMessage.prototype.toObject = function(e) {
    return proto.UCPushMessage.toObject(e, this);
}, proto.UCPushMessage.toObject = function(e, t) {
    var r, o = {
        user: (r = t.getUser()) && proto.MIMCUser.toObject(e, r),
        groupList: jspb.Message.toObjectList(t.getGroupList(), proto.UCGroup.toObject, e),
        payloadsList: t.getPayloadsList_asB64(),
        isstore: jspb.Message.getField(t, 4),
        timestamp: jspb.Message.getField(t, 5),
        packetid: jspb.Message.getField(t, 6),
        biztype: jspb.Message.getField(t, 7)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCPushMessage.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCPushMessage();
    return proto.UCPushMessage.deserializeBinaryFromReader(t, e);
}, proto.UCPushMessage.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.MIMCUser();
        t.readMessage(r, proto.MIMCUser.deserializeBinaryFromReader), e.setUser(r);
        break;

      case 2:
        r = new proto.UCGroup(), t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), 
        e.addGroup(r);
        break;

      case 3:
        r = t.readBytes(), e.addPayloads(r);
        break;

      case 4:
        r = t.readBool(), e.setIsstore(r);
        break;

      case 5:
        r = t.readInt64String(), e.setTimestamp(r);
        break;

      case 6:
        r = t.readString(), e.setPacketid(r);
        break;

      case 7:
        r = t.readString(), e.setBiztype(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCPushMessage.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCPushMessage.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCPushMessage.serializeBinaryToWriter = function(e, t) {
    var r = e.getUser();
    null != r && t.writeMessage(1, r, proto.MIMCUser.serializeBinaryToWriter), 0 < (r = e.getGroupList()).length && t.writeRepeatedMessage(2, r, proto.UCGroup.serializeBinaryToWriter), 
    0 < (r = e.getPayloadsList_asU8()).length && t.writeRepeatedBytes(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeBool(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeInt64String(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeString(6, r), 
    null != (r = jspb.Message.getField(e, 7)) && t.writeString(7, r);
}, proto.UCPushMessage.prototype.getUser = function() {
    return jspb.Message.getWrapperField(this, proto.MIMCUser, 1, 1);
}, proto.UCPushMessage.prototype.setUser = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCPushMessage.prototype.clearUser = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCPushMessage.prototype.hasUser = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCPushMessage.prototype.getGroupList = function() {
    return jspb.Message.getRepeatedWrapperField(this, proto.UCGroup, 2);
}, proto.UCPushMessage.prototype.setGroupList = function(e) {
    jspb.Message.setRepeatedWrapperField(this, 2, e);
}, proto.UCPushMessage.prototype.addGroup = function(e, t) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, e, proto.UCGroup, t);
}, proto.UCPushMessage.prototype.clearGroupList = function() {
    this.setGroupList([]);
}, proto.UCPushMessage.prototype.getPayloadsList = function() {
    return jspb.Message.getRepeatedField(this, 3);
}, proto.UCPushMessage.prototype.getPayloadsList_asB64 = function() {
    return jspb.Message.bytesListAsB64(this.getPayloadsList());
}, proto.UCPushMessage.prototype.getPayloadsList_asU8 = function() {
    return jspb.Message.bytesListAsU8(this.getPayloadsList());
}, proto.UCPushMessage.prototype.setPayloadsList = function(e) {
    jspb.Message.setField(this, 3, e || []);
}, proto.UCPushMessage.prototype.addPayloads = function(e, t) {
    jspb.Message.addToRepeatedField(this, 3, e, t);
}, proto.UCPushMessage.prototype.clearPayloadsList = function() {
    this.setPayloadsList([]);
}, proto.UCPushMessage.prototype.getIsstore = function() {
    return jspb.Message.getFieldWithDefault(this, 4, !1);
}, proto.UCPushMessage.prototype.setIsstore = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.UCPushMessage.prototype.clearIsstore = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.UCPushMessage.prototype.hasIsstore = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.UCPushMessage.prototype.getTimestamp = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "0");
}, proto.UCPushMessage.prototype.setTimestamp = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.UCPushMessage.prototype.clearTimestamp = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.UCPushMessage.prototype.hasTimestamp = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.UCPushMessage.prototype.getPacketid = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "");
}, proto.UCPushMessage.prototype.setPacketid = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.UCPushMessage.prototype.clearPacketid = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.UCPushMessage.prototype.hasPacketid = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.UCPushMessage.prototype.getBiztype = function() {
    return jspb.Message.getFieldWithDefault(this, 7, "");
}, proto.UCPushMessage.prototype.setBiztype = function(e) {
    jspb.Message.setField(this, 7, e);
}, proto.UCPushMessage.prototype.clearBiztype = function() {
    jspb.Message.setField(this, 7, void 0);
}, proto.UCPushMessage.prototype.hasBiztype = function() {
    return null != jspb.Message.getField(this, 7);
}, proto.UCMessageList = function(e) {
    jspb.Message.initialize(this, e, 0, -1, proto.UCMessageList.repeatedFields_, null);
}, goog.inherits(proto.UCMessageList, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCMessageList.displayName = "proto.UCMessageList"), 
proto.UCMessageList.repeatedFields_ = [ 2 ], jspb.Message.GENERATE_TO_OBJECT && (proto.UCMessageList.prototype.toObject = function(e) {
    return proto.UCMessageList.toObject(e, this);
}, proto.UCMessageList.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r),
        messageList: jspb.Message.toObjectList(t.getMessageList(), proto.UCMessage.toObject, e),
        maxsequence: jspb.Message.getField(t, 3)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCMessageList.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCMessageList();
    return proto.UCMessageList.deserializeBinaryFromReader(t, e);
}, proto.UCMessageList.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      case 2:
        r = new proto.UCMessage(), t.readMessage(r, proto.UCMessage.deserializeBinaryFromReader), 
        e.addMessage(r);
        break;

      case 3:
        r = t.readInt64String(), e.setMaxsequence(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCMessageList.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCMessageList.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCMessageList.serializeBinaryToWriter = function(e, t) {
    var r = e.getGroup();
    null != r && t.writeMessage(1, r, proto.UCGroup.serializeBinaryToWriter), 0 < (r = e.getMessageList()).length && t.writeRepeatedMessage(2, r, proto.UCMessage.serializeBinaryToWriter), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt64String(3, r);
}, proto.UCMessageList.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCMessageList.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCMessageList.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCMessageList.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCMessageList.prototype.getMessageList = function() {
    return jspb.Message.getRepeatedWrapperField(this, proto.UCMessage, 2);
}, proto.UCMessageList.prototype.setMessageList = function(e) {
    jspb.Message.setRepeatedWrapperField(this, 2, e);
}, proto.UCMessageList.prototype.addMessage = function(e, t) {
    return jspb.Message.addToRepeatedWrapperField(this, 2, e, proto.UCMessage, t);
}, proto.UCMessageList.prototype.clearMessageList = function() {
    this.setMessageList([]);
}, proto.UCMessageList.prototype.getMaxsequence = function() {
    return jspb.Message.getFieldWithDefault(this, 3, "0");
}, proto.UCMessageList.prototype.setMaxsequence = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.UCMessageList.prototype.clearMaxsequence = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.UCMessageList.prototype.hasMaxsequence = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.UCSequenceAck = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCSequenceAck, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCSequenceAck.displayName = "proto.UCSequenceAck"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCSequenceAck.prototype.toObject = function(e) {
    return proto.UCSequenceAck.toObject(e, this);
}, proto.UCSequenceAck.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r),
        sequence: jspb.Message.getField(t, 2)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCSequenceAck.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCSequenceAck();
    return proto.UCSequenceAck.deserializeBinaryFromReader(t, e);
}, proto.UCSequenceAck.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      case 2:
        r = t.readInt64String(), e.setSequence(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCSequenceAck.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCSequenceAck.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCSequenceAck.serializeBinaryToWriter = function(e, t) {
    var r = e.getGroup();
    null != r && t.writeMessage(1, r, proto.UCGroup.serializeBinaryToWriter), null != (r = jspb.Message.getField(e, 2)) && t.writeInt64String(2, r);
}, proto.UCSequenceAck.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCSequenceAck.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCSequenceAck.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCSequenceAck.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCSequenceAck.prototype.getSequence = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "0");
}, proto.UCSequenceAck.prototype.setSequence = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.UCSequenceAck.prototype.clearSequence = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCSequenceAck.prototype.hasSequence = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.UCDismiss = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCDismiss, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCDismiss.displayName = "proto.UCDismiss"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCDismiss.prototype.toObject = function(e) {
    return proto.UCDismiss.toObject(e, this);
}, proto.UCDismiss.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCDismiss.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCDismiss();
    return proto.UCDismiss.deserializeBinaryFromReader(t, e);
}, proto.UCDismiss.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCDismiss.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCDismiss.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCDismiss.serializeBinaryToWriter = function(e, t) {
    null != (e = e.getGroup()) && t.writeMessage(1, e, proto.UCGroup.serializeBinaryToWriter);
}, proto.UCDismiss.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCDismiss.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCDismiss.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCDismiss.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCQueryOnlineUsers = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCQueryOnlineUsers, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCQueryOnlineUsers.displayName = "proto.UCQueryOnlineUsers"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCQueryOnlineUsers.prototype.toObject = function(e) {
    return proto.UCQueryOnlineUsers.toObject(e, this);
}, proto.UCQueryOnlineUsers.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCQueryOnlineUsers.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCQueryOnlineUsers();
    return proto.UCQueryOnlineUsers.deserializeBinaryFromReader(t, e);
}, proto.UCQueryOnlineUsers.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCQueryOnlineUsers.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCQueryOnlineUsers.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCQueryOnlineUsers.serializeBinaryToWriter = function(e, t) {
    null != (e = e.getGroup()) && t.writeMessage(1, e, proto.UCGroup.serializeBinaryToWriter);
}, proto.UCQueryOnlineUsers.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCQueryOnlineUsers.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCQueryOnlineUsers.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCQueryOnlineUsers.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCQueryOnlineUsersResp = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.UCQueryOnlineUsersResp, jspb.Message), goog.DEBUG && !COMPILED && (proto.UCQueryOnlineUsersResp.displayName = "proto.UCQueryOnlineUsersResp"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.UCQueryOnlineUsersResp.prototype.toObject = function(e) {
    return proto.UCQueryOnlineUsersResp.toObject(e, this);
}, proto.UCQueryOnlineUsersResp.toObject = function(e, t) {
    var r, o = {
        group: (r = t.getGroup()) && proto.UCGroup.toObject(e, r),
        usercount: jspb.Message.getField(t, 2)
    };
    return e && (o.$jspbMessageInstance = t), o;
}), proto.UCQueryOnlineUsersResp.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.UCQueryOnlineUsersResp();
    return proto.UCQueryOnlineUsersResp.deserializeBinaryFromReader(t, e);
}, proto.UCQueryOnlineUsersResp.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = new proto.UCGroup();
        t.readMessage(r, proto.UCGroup.deserializeBinaryFromReader), e.setGroup(r);
        break;

      case 2:
        r = t.readInt64String(), e.setUsercount(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.UCQueryOnlineUsersResp.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.UCQueryOnlineUsersResp.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.UCQueryOnlineUsersResp.serializeBinaryToWriter = function(e, t) {
    var r = e.getGroup();
    null != r && t.writeMessage(1, r, proto.UCGroup.serializeBinaryToWriter), null != (r = jspb.Message.getField(e, 2)) && t.writeInt64String(2, r);
}, proto.UCQueryOnlineUsersResp.prototype.getGroup = function() {
    return jspb.Message.getWrapperField(this, proto.UCGroup, 1, 1);
}, proto.UCQueryOnlineUsersResp.prototype.setGroup = function(e) {
    jspb.Message.setWrapperField(this, 1, e);
}, proto.UCQueryOnlineUsersResp.prototype.clearGroup = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.UCQueryOnlineUsersResp.prototype.hasGroup = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.UCQueryOnlineUsersResp.prototype.getUsercount = function() {
    return jspb.Message.getFieldWithDefault(this, 2, "0");
}, proto.UCQueryOnlineUsersResp.prototype.setUsercount = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.UCQueryOnlineUsersResp.prototype.clearUsercount = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.UCQueryOnlineUsersResp.prototype.hasUsercount = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.FeInfo = function(e) {
    jspb.Message.initialize(this, e, 0, -1, null, null);
}, goog.inherits(proto.FeInfo, jspb.Message), goog.DEBUG && !COMPILED && (proto.FeInfo.displayName = "proto.FeInfo"), 
jspb.Message.GENERATE_TO_OBJECT && (proto.FeInfo.prototype.toObject = function(e) {
    return proto.FeInfo.toObject(e, this);
}, proto.FeInfo.toObject = function(e, t) {
    var r = {
        feSrcIp: jspb.Message.getField(t, 1),
        feSrcPort: jspb.Message.getField(t, 2),
        feThreadId: jspb.Message.getField(t, 3),
        feUcid: jspb.Message.getField(t, 4),
        feSid: jspb.Message.getField(t, 5),
        feSeqno: jspb.Message.getField(t, 6)
    };
    return e && (r.$jspbMessageInstance = t), r;
}), proto.FeInfo.deserializeBinary = function(e) {
    e = new jspb.BinaryReader(e);
    var t = new proto.FeInfo();
    return proto.FeInfo.deserializeBinaryFromReader(t, e);
}, proto.FeInfo.deserializeBinaryFromReader = function(e, t) {
    for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
      case 1:
        var r = t.readString();
        e.setFeSrcIp(r);
        break;

      case 2:
        r = t.readInt32(), e.setFeSrcPort(r);
        break;

      case 3:
        r = t.readInt32(), e.setFeThreadId(r);
        break;

      case 4:
        r = t.readUint64String(), e.setFeUcid(r);
        break;

      case 5:
        r = t.readUint64String(), e.setFeSid(r);
        break;

      case 6:
        r = t.readUint64String(), e.setFeSeqno(r);
        break;

      default:
        t.skipField();
    }
    return e;
}, proto.FeInfo.prototype.serializeBinary = function() {
    var e = new jspb.BinaryWriter();
    return proto.FeInfo.serializeBinaryToWriter(this, e), e.getResultBuffer();
}, proto.FeInfo.serializeBinaryToWriter = function(e, t) {
    var r = jspb.Message.getField(e, 1);
    null != r && t.writeString(1, r), null != (r = jspb.Message.getField(e, 2)) && t.writeInt32(2, r), 
    null != (r = jspb.Message.getField(e, 3)) && t.writeInt32(3, r), null != (r = jspb.Message.getField(e, 4)) && t.writeUint64String(4, r), 
    null != (r = jspb.Message.getField(e, 5)) && t.writeUint64String(5, r), null != (r = jspb.Message.getField(e, 6)) && t.writeUint64String(6, r);
}, proto.FeInfo.prototype.getFeSrcIp = function() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
}, proto.FeInfo.prototype.setFeSrcIp = function(e) {
    jspb.Message.setField(this, 1, e);
}, proto.FeInfo.prototype.clearFeSrcIp = function() {
    jspb.Message.setField(this, 1, void 0);
}, proto.FeInfo.prototype.hasFeSrcIp = function() {
    return null != jspb.Message.getField(this, 1);
}, proto.FeInfo.prototype.getFeSrcPort = function() {
    return jspb.Message.getFieldWithDefault(this, 2, 0);
}, proto.FeInfo.prototype.setFeSrcPort = function(e) {
    jspb.Message.setField(this, 2, e);
}, proto.FeInfo.prototype.clearFeSrcPort = function() {
    jspb.Message.setField(this, 2, void 0);
}, proto.FeInfo.prototype.hasFeSrcPort = function() {
    return null != jspb.Message.getField(this, 2);
}, proto.FeInfo.prototype.getFeThreadId = function() {
    return jspb.Message.getFieldWithDefault(this, 3, 0);
}, proto.FeInfo.prototype.setFeThreadId = function(e) {
    jspb.Message.setField(this, 3, e);
}, proto.FeInfo.prototype.clearFeThreadId = function() {
    jspb.Message.setField(this, 3, void 0);
}, proto.FeInfo.prototype.hasFeThreadId = function() {
    return null != jspb.Message.getField(this, 3);
}, proto.FeInfo.prototype.getFeUcid = function() {
    return jspb.Message.getFieldWithDefault(this, 4, "0");
}, proto.FeInfo.prototype.setFeUcid = function(e) {
    jspb.Message.setField(this, 4, e);
}, proto.FeInfo.prototype.clearFeUcid = function() {
    jspb.Message.setField(this, 4, void 0);
}, proto.FeInfo.prototype.hasFeUcid = function() {
    return null != jspb.Message.getField(this, 4);
}, proto.FeInfo.prototype.getFeSid = function() {
    return jspb.Message.getFieldWithDefault(this, 5, "0");
}, proto.FeInfo.prototype.setFeSid = function(e) {
    jspb.Message.setField(this, 5, e);
}, proto.FeInfo.prototype.clearFeSid = function() {
    jspb.Message.setField(this, 5, void 0);
}, proto.FeInfo.prototype.hasFeSid = function() {
    return null != jspb.Message.getField(this, 5);
}, proto.FeInfo.prototype.getFeSeqno = function() {
    return jspb.Message.getFieldWithDefault(this, 6, "0");
}, proto.FeInfo.prototype.setFeSeqno = function(e) {
    jspb.Message.setField(this, 6, e);
}, proto.FeInfo.prototype.clearFeSeqno = function() {
    jspb.Message.setField(this, 6, void 0);
}, proto.FeInfo.prototype.hasFeSeqno = function() {
    return null != jspb.Message.getField(this, 6);
}, proto.ErrorCode = {
    OK: 0,
    INTERNAL_ERROR: 1
}, proto.MIMC_MSG_TYPE = {
    P2P_MESSAGE: 1,
    P2T_MESSAGE: 2,
    SEQUENCE_ACK: 3,
    PACKET_ACK: 4,
    PULL: 5,
    COMPOUND: 6,
    RTS_SIGNAL: 7,
    UC_PACKET: 8,
    P2P_PUSH_MESSAGE: 9,
    P2T_PUSH_MESSAGE: 10
}, proto.UC_MSG_TYPE = {
    PING: 1,
    PONG: 2,
    JOIN: 3,
    JOIN_RESP: 4,
    QUIT: 5,
    QUIT_RESP: 6,
    SEQ_ACK: 7,
    MESSAGE: 8,
    MESSAGE_LIST: 9,
    DISMISS: 10,
    QUERY_ONLINE_USERS: 11,
    QUERY_ONLINE_USERS_RESP: 12
}, _window = {}, navigator = {
    userAgent: "mimc-uniapp/1.0",
    appName: "xiaomi",
    appVersion: "1.0"
}, _window.navigator = navigator, module.exports = MIMCUser;