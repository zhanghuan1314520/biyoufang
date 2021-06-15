var e = require("../../../config.js"), t = require("../../../utils/index.js"), a = getApp();

Component({
    properties: {
        userInfo: {
            type: Object,
            value: {}
        },
        allowMore: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        navH: a.globalData.navH,
        pageNo: 1,
        limit: 10,
        allow: !0,
        list: null,
        message: null,
        oneRequest: !0,
        bgIcons: [ e.imgRootUrl + "/images_wx/weixin_common/news_img_nonotice.png" ]
    },
    methods: {
        initRequest: function() {
            return this.setData({
                pageNo: 1
            }), this.getMyMessage();
        },
        reachBottomRequest: function() {
            var e = this;
            this.data.allow && this.setData({
                pageNo: this.data.pageNo + 1,
                oneRequest: !0
            }, function() {
                e.getMyMessage();
            });
        },
        getMyMessage: function() {
            var e = this.data.userInfo;
            return e && e.WeixinAuthorized ? this.initCustomer() : this.initTourist();
        },
        initTourist: function() {
            var e = this;
            return Promise.resolve().then(function() {
                e.setData({
                    message: []
                });
            });
        },
        initCustomer: function() {
            var a = this;
            if (this.setData({
                allow: !1
            }), this.properties.allowMore && this.setData({
                oneRequest: !0
            }), this.data.oneRequest) return t.request({
                url: e.service.getMyMessageInMsg,
                data: {
                    pageNo: this.data.pageNo,
                    limit: this.data.limit
                }
            }).then(function(e) {
                e.forEach(function(t, s) {
                    var i = s > 0 ? e[s - 1].CreateTime : "";
                    t.time = a.formatMessageTime(t.CreateTime, i).replace(/-/g, "."), t.statusText = a.formatMessageStatus(t.MessageType), 
                    t.icon = a.formatTitleIcon(t.Status), t.MessageType > 10 && a.formatQaContent(t);
                });
                var t = [];
                t = a.properties.allowMore || !a.data.message ? e : a.data.message.concat(e), a.setData({
                    message: t,
                    allow: !(e.length < a.data.limit),
                    oneRequest: !1
                });
            }).catch(function(e) {});
        },
        formatQaContent: function(e) {
            var t = e.Content, a = {
                title: "",
                main: "",
                btm: "",
                sp: ""
            };
            if (11 === e.MessageType) {
                a.title = "回答内容";
                var s = t.slice(4, -22);
                a.main = s.length > 40 ? s.slice(0, 40) + "..." : s, a.btm = "哇哦！你也太厉害了吧！50积分的鼓励请笑纳";
            }
            if (12 === e.MessageType) {
                a.title = "回答内容";
                var i = t.slice(4, -23);
                a.main = i.length > 40 ? i.slice(0, 40) + "..." : i, a.btm = "你完美的解答了用户疑惑！20积分的鼓励请笑纳";
            }
            13 === e.MessageType && (a.title = t, a.sp = "马上去解答 >"), e.Content = a;
        },
        formatMessageTime: function(e, a) {
            var s = e.replace(/[\.\-]/g, "/"), i = a && a.replace(/[\.\-]/g, "/"), r = new Date(), n = r.getFullYear(), o = r.getMonth() + 1, l = r.getDate(), u = new Date(s), c = a && new Date(i);
            if (a && c - u < 6e4) return "";
            var g = u.getFullYear(), m = u.getMonth() + 1, p = u.getDate(), d = l - p;
            return n == g ? l == p && o == m ? e.slice(11, 16) : l != p ? o == m ? 1 == d ? "昨天" + e.slice(11, 16) : e.slice(5, 16) : t.getMaxDate(m) + l - p < 2 ? "昨天" + e.slice(11, 16) : e.slice(5, 16) : e.slice(5, 16) : e.slice(0, -3);
        },
        formatTitleIcon: function(e) {
            switch (e) {
              case 0:
                return "/resource/message/notice_icon_remind_org@3x.png";

              case 1:
                return "/resource/message/notice_icon_remind_gray@3x.png";
            }
        },
        formatMessageStatus: function(e) {
            switch (1 * e) {
              case 0:
                return "反馈提醒";

              case 1:
                return "反馈结果";

              case 2:
                return "加推提醒";

              case 3:
                return "开盘提醒";

              case 4:
                return "登记提醒";

              case 5:
                return "摇号提醒";

              case 6:
                return "楼盘相册审核结果";

              case 7:
                return "楼盘户型审核通过";

              case 8:
                return "楼盘户型审核不通过";

              case 9:
                return "楼盘快讯审核通过";

              case 10:
                return "楼盘快讯审核不通过";

              case 11:
                return "恭喜！你的回答入选为精选回答";

              case 12:
                return "恭喜！你的回答被采纳";

              case 13:
                return "恭喜！你的回答点赞量爆棚";
            }
        },
        checkDetail: function(e) {
            var a = e.currentTarget.dataset.index, s = this.data.message[a];
            if (s.BuildingId) if (5 === s.MessageType) {
                s.CoverFileUrl = t.formatUrl(s.CoverFileUrl);
                var i = "/pages/lottery/lottery?projectId=" + s.ProjectId + "&projectName=" + s.ProjectName + "&lotteried=1";
                wx.navigateTo({
                    url: i
                });
            } else if (s.MessageType < 5) wx.navigateTo({
                url: "/pages/detail/detail?buildingId=" + s.BuildingId + "&isShare=0"
            }); else if (s.MessageType > 10 && s.MessageType < 13) {
                var r = "/pck_qa/qa_detail/qa_detail?page=qaUser&id=" + s.BuildingId;
                wx.navigateTo({
                    url: r
                });
            } else if (13 === s.MessageType) {
                wx.navigateTo({
                    url: "/pck_qa/qa_invite_answer/qa_invite_answer?status=0"
                });
            }
        },
        goBuildingPage: function() {
            wx.switchTab({
                url: "/pages/building/building"
            });
        }
    }
});