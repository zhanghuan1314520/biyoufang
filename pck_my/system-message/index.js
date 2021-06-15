var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
}, t = require("../../config.js"), a = require("../../utils/index.js"), s = getApp();

Page({
    data: {
        navH: s.globalData.navH,
        type: "",
        pageNo: 1,
        limit: 10,
        message: [],
        oneRequest: !0,
        allowMore: !0,
        userInfo: null,
        bgIcons: [ t.imgRootUrl + "/images_wx/weixin_common/news_img_nonotice.png" ]
    },
    onLoad: function(e) {
        var t = this, n = e.type;
        s.checkSession(function() {
            t.setData({
                userInfo: s.globalData.userInfo,
                type: n
            }, function() {
                t.initRequest(), s.globalData["sys" === n ? "systemMessageUnRead" : "subscribeMessageUnRead"] = !1, 
                a.showTabBarRedDot();
            });
        });
    },
    initRequest: function() {
        return this.setData({
            pageNo: 1
        }), this.getMyMessage();
    },
    onReachBottom: function() {
        this.data.allowMore && (++this.data.pageNo, this.getMyMessage());
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
        var e = this;
        return a.request({
            url: "sub" === this.data.type ? t.service.getSubMsg : t.service.getSystemMsg,
            data: {
                openId: this.data.userInfo.OpenId,
                userSystem: 0,
                pageNo: this.data.pageNo,
                limit: this.data.limit
            }
        }).then(function(t) {
            t.forEach(function(t, a) {
                t.time = e.transitionPastTime(t.CreateTime), t.statusText = e.formatMessageStatus(t.MessageType), 
                t.MessageType > 10 && e.formatQaContent(t), e.formatSpecialStatus(t);
            }), e.setData({
                message: e.data.message.concat(t),
                allowMore: !(t.length < e.data.limit),
                oneRequest: !1
            });
        }).catch(function(e) {
            console.log(e);
        });
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
            var n = t.slice(4, -23);
            a.main = n.length > 40 ? n.slice(0, 40) + "..." : n, a.btm = "你完美的解答了用户疑惑！20积分的鼓励请笑纳";
        }
        13 === e.MessageType && (a.title = t, a.sp = "马上去解答 >"), e.Content = a;
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
    formatSpecialStatus: function(e) {
        var t = e.MessageType, a = e.Content, s = void 0 === a ? "" : a, n = "";
        try {
            switch (t) {
              case 6:
                var r = s.match(/\d+(?=张审核通过)/gi) || [], i = s.match(/\d+(?=张审核未通过)/gi) || [], o = s.match(/\d+(?=个积分将于)/gi) || [];
                r[0] && (n = r[0] + "张审核通过", s = s.replace(n, '<span style="color: #0091FF">' + n + "</span>")), 
                i[0] && (n = i[0] + "张审核未通过", s = s.replace(n, '<span style="color: #FC4930">' + n + "</span>")), 
                (o[0] || 0 === o[0]) && (n = "审核通过的" + o[0] + "个积分将于1个工作日到账", s = s.replace(n, '<span style="color: #FE5E10;">' + n + "</span>"), 
                n = o[0] + "个积分将于1个工作日到账", s = s.replace(n, '<span style="color: #FE5E10;">' + n + "</span>")), 
                e.Content = s;
                break;

              case 7:
              case 9:
                var c = s.match(/\d+(?=个积分将于)/gi) || [];
                /通过/gi.test(s) && (s = s.replace("通过", '<span style="color: #0091FF">通过</span>')), 
                (c[0] || 0 === c[0]) && (n = c[0] + "个积分将于1个工作日到账", s = s.replace(n, '<span style="color: #FE5E10;">' + n + "</span>")), 
                e.Content = s;
                break;

              case 8:
              case 10:
                /未通过/gi.test(s) && (s = s.replace("未通过", '<span style="color: #FC4930">未通过</span>')), 
                e.Content = s;
                break;

              case 11:
                e.Content = '恭喜！你的回答<span style="color: #FF9B00;">【被精选】</span>';
                break;

              case 12:
                e.Content = '恭喜！你的回答<span style="color: #46C62E;">【被采纳】</span>';
                break;

              case 13:
                e.Content = '恭喜！你的回答<span style="color: #FF9B00;">点赞量爆棚</span>';
            }
        } catch (e) {
            console.log(e);
        }
    },
    checkDetail: function(t) {
        var s = t.currentTarget.dataset.index, n = this.data.message[s];
        if (n.BuildingId) if (5 === n.MessageType) {
            n.CoverFileUrl = a.formatUrl(n.CoverFileUrl);
            var r = "/pages/lottery/lottery?projectId=" + n.ProjectId + "&projectName=" + n.ProjectName + "&lotteried=1";
            wx.navigateTo({
                url: r
            });
        } else if (n.MessageType < 5) n.BuildingId && wx.navigateTo({
            url: "/pages/detail/detail?buildingId=" + n.BuildingId + "&projectId=" + n.ProjectId
        }), n.BuildingId && a.recordBuildingClick(e({
            buildingId: n.BuildingId,
            SourceKey: {
                sys: "SystemMessage",
                sub: "SubscriptionMessage"
            }[this.data.type]
        }, n.ProjectId ? {
            ProjectId: n.ProjectId
        } : {})); else if (n.MessageType > 10 && n.MessageType < 13) {
            var i = "/pck_qa/qa_detail/qa_detail?page=qaUser&id=" + n.BuildingId;
            wx.navigateTo({
                url: i
            });
        } else if (13 === n.MessageType) {
            wx.navigateTo({
                url: "/pck_qa/qa_invite_answer/qa_invite_answer?status=0"
            });
        }
    },
    goBuildingPage: function() {
        wx.switchTab({
            url: "/pages/building/building"
        });
    },
    transitionPastTime: function(e) {
        var t = null;
        switch (Math.abs(a.intervalDays(e))) {
          case 0:
            t = "HH:mm";
            break;

          case 1:
            t = "昨天 HH:mm";
            break;

          case 2:
            t = "MM月DD日 HH:mm";
            break;

          default:
            t = a.isCurrentYear ? "MM月DD日 HH:mm" : "YYYY年MM月DD日";
        }
        return a.formateDate(e, t);
    }
});