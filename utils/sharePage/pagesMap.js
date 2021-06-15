function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

var t = require("../getter/index.js"), a = function(e) {
    var t = getApp().globalData.cityInfo, a = t ? t.CityId : wx.getStorageSync("cityInfo").CityId;
    return e.includes("?") ? e += "&isShare=1&cityId=" + a + "&shareType=user" : e += "?isShare=1&cityId=" + a + "&shareType=user";
};

module.exports = {
    "pages/detail/detail": function(e) {
        var i = e.util, r = e.app;
        this.setData({
            shareCardVisible: !1
        });
        var n = this.data.userInfo || null, o = "", d = (r.globalData.consultantInfo || {}).Name, l = void 0 === d ? "" : d;
        n && 1 === n.UserType && i.recordShareOperateByBroker("分享项目详情"), i.recordByAld("楼盘分享数", {
            "楼盘ID": this.data.project.BuildingId
        });
        var u = "", s = this.data.project, p = s.BuildingProjectList && s.BuildingProjectList.length > 0 ? s.BuildingProjectList[0] : null, c = this.data.showAsProject, b = c ? p.ProjectName : s.BuildingName;
        n.RealtyConsultantInfo && t.judgeBuildingBelongConsultant(s.BuildingId) && (o = n.RealtyConsultantInfo.Buildings.filter(function(e) {
            return e.BuildingId === s.BuildingId;
        })[0].ShortCode || "", u = u);
        var g = this.formatAppShareText(), h = "/pages/detail/detail?buildingId=" + this.data.buildingId + "&brokerCode=" + u + "&sourceType=1&sourceOpenid=" + n.OpenId + "&fromBroker=" + this.data.itsMe;
        c && (h += "&showAsProject=1&projectId=" + p.ProjectId), r.globalData.brokerCode && (h += "&brokerShortCode=" + o);
        var _ = this.data.itsMe ? "我是【" + b + "】置业顾问" + l + "，欢迎点击咨询" : g;
        return {
            path: a(h),
            title: _,
            imageUrl: this.data.project.BannerUrlList[0].split("?")[0]
        };
    },
    "pages/my/my": function(e) {
        var t = e.util, i = e.app, r = (e.config, e.e, this.data.userInfo), n = r.UserType, o = r.AvatarUrl, d = r.NickName;
        1 === n && (o = i.globalData.consultantInfo.AvatarUrl);
        var l = this.data.memberInfo.InviteCode, u = void 0, s = void 0;
        return 1 === n ? (u = "我是" + i.globalData.consultantInfo.Name + "，邀请你入驻必有房，获取高意向客户！", 
        s = "/ext_features/broker_registion/broker_registrion?InviteCode=" + l + "&checkState=0") : (u = (d || "游客") + "推荐你在杭州买新房用必有房", 
        s = "/pages/my/my"), o = t.formatUrl(o), {
            title: u,
            imageUrl: o,
            path: a(s)
        };
    },
    "pages/list/list": function(e) {
        var t = e.util;
        e.app;
        t.recordShareOperateByBroker("分享项目列表页");
        var i = "/pages/list/list?status=" + this.data.status;
        return {
            title: this.formatShareText(),
            path: a(i)
        };
    },
    "pages/index/index": function(e) {
        var t = e.util, i = e.app;
        t.recordShareOperateByBroker("分享首页");
        var r = "/pages/index/index";
        return i.globalData.brokerCode && (r += "?brokerCode=" + i.globalData.brokerCode), 
        {
            title: "买新房，上必有房",
            path: a(r)
        };
    },
    "pages/broker/broker": function(e) {
        var t = e.util, i = e.app;
        t.recordShareOperateByBroker("分享置业顾问");
        var r = this.data, n = r.itsMe, o = "/pages/broker/broker?brokerId=" + r.brokerId + "&itsMe=" + r.itsMe + "&page=self", d = this.data.broker;
        i.globalData.brokerCode && n && (o += "&brokerCode=" + i.globalData.brokerCode);
        var l = d.Buildings.filter(function(e) {
            return e.IsMain;
        })[0];
        return {
            path: a(o),
            title: (n ? "我" : "这") + "是【" + l.BuildingName + "】置业顾问【" + r.broker.Name + "】，欢迎点击咨询",
            imageUrl: r.broker.PersonalImageUrl
        };
    },
    "pck_building/detail_pricePerRoom/detail_pricePerRoom": function(t) {
        t.util;
        var i = t.app, r = "/pck_building/detail_pricePerRoom/detail_pricePerRoom?projectId=" + this.data.projectId + "&buildingName=" + this.data.buildingName;
        i.globalData.brokerCode && (r += "&brokerCode=" + i.globalData.brokerCode);
        var n = [], o = "";
        return this.data.list.forEach(function(e) {
            n.push(e.HouseNo);
        }), o = [].concat(e(new Set(n))).join(""), {
            title: "【" + this.data.buildingName + o + "】一房一价公示",
            path: a(r)
        };
    },
    "pages/market/market": function(e) {
        e.util, e.app;
        var t = this.data.navMenuList, i = "", r = "/pages/market/market";
        return t[0].isActived ? (i = "最新楼市资讯，尽在必有房", r += "?navType=" + t[0].type) : t[1].isActived ? (i = "超详细！买房问题都在这里解决", 
        r += "?navType=" + t[1].type) : t[2].isActived && (i = "楼盘动态每日速报，让你掌握一手资讯", r += "?navType=" + t[2].type), 
        {
            title: i,
            path: a(r)
        };
    },
    "pck_building/detail_pricePerHouse/detail_pricePerHouse": function(e) {
        e.util;
        var t = e.app, i = "/pck_building/detail_pricePerHouse/detail_pricePerHouse?roomId=" + this.data.roomId;
        t.globalData.brokerCode && (i += "&brokerCode=" + t.globalData.brokerCode);
        var r = this.data.info;
        return {
            title: "【" + r.BuildingName + "】" + r.HouseNo + r.UnitNo + r.RoomName + "房源信息",
            path: a(i)
        };
    },
    "h5_webview/activity_webview/activity_webview": function(e) {
        e.app;
        util.recordShareOperateByBroker("分享活动详情（h5）");
        var t = encodeURIComponent(this.data.url);
        return {
            path: a("/h5_webview/activity_webview/activity_webview?url=" + t)
        };
    },
    "pck_qa/qa_detail/qa_detail": function(e) {
        e.util;
        var t = "邀你回答: " + (this.data.questionCardInfo && this.data.questionCardInfo.Content), i = "/pck_qa/qa_detail/qa_detail?id=" + this.data.qid;
        return {
            title: t,
            path: a(i)
        };
    },
    "h5_webview/webview/webview": function(e) {
        e.util, e.app;
        var t = encodeURIComponent(this.data.url), i = 1 == this.data.status ? "/h5_webview/webview/webview?url=" + t + "&status=1&&buildingName=" + this.data.buildingName + "&buildingNo=" + this.data.buildingNo : "/h5_webview/webview/webview?url=" + t + "&status=" + this.data.status;
        return {
            title: this.formatShareText(),
            path: a(i)
        };
    },
    "h5_webview/knowledge/knowledge": function(e) {
        e.util, e.app;
        return {
            title: "【" + new Date().getFullYear() + "】小白买房全攻略",
            path: a("/h5_webview/knowledge/knowledge")
        };
    },
    "h5_webview/newspaper/newspaper": function(e) {
        e.util, e.app;
        return {
            title: "必有房楼市早报",
            path: a("/h5_webview/newspaper/newspaper")
        };
    },
    "pages/lottery/lottery": function(e) {
        var t = e.util, i = (e.app, void 0), r = void 0, n = void 0;
        if (this.data.projectId) {
            var o = this.data;
            i = "/pages/lottery/lottery?projectId=" + o.projectId + "&projectName=" + o.projectName + "&lotteryTime=" + o.lotteryTime;
        } else t.recordShareOperateByBroker("分享摇号查询"), i = "/pages/lottery/lottery";
        return r = this.data.projectId ? "【" + this.data.projectName + "】摇号结果公示，点击查询你的顺序号" : "摇号查询", 
        n = this.data.projectId ? this.data.coverFileUrl : "/resource/lottery_share.png", 
        {
            title: r,
            path: a(i),
            imageUrl: n
        };
    },
    "h5_webview/loan_select/loan_select": function(e) {
        e.util, e.app;
        return {
            title: "必有房最新LPR利率房贷计算器，快人一步计算您的房贷信息",
            path: a("/h5_webview/loan_select/loan_select"),
            imageUrl: "/h5_webview/images/loanAnalyse/share_img_calculator.png"
        };
    },
    "pages/building/building": function(e) {
        var t = e.util, i = e.app;
        t.recordShareOperateByBroker("分享楼盘列表");
        return {
            title: i.globalData.defaultShareText,
            path: a("/pages/building/building")
        };
    },
    "pages/broker_card/broker_card": function(e) {
        var t = e.util, i = e.app;
        t.recordShareOperateByBroker("分享置业顾问");
        var r = this.data.comingStatus, n = this.data.ConsultantInfo, o = "/pages/broker/broker?brokerId=" + n.Id + "&fromBroker=" + r;
        i.globalData.brokerCode && (o += "&brokerCode=" + i.globalData.brokerCode);
        var d = n.Buildings.filter(function(e) {
            return e.IsMain;
        })[0];
        return {
            title: "你好，" + (r ? "我" : "这") + "是【" + d.BuildingName + "】的置业顾问" + n.Name,
            path: a(o),
            imageUrl: n.PersonalImageUrl
        };
    },
    "h5_webview/loan_analyse/loan_analyse": function(e) {
        e.util, e.app;
        return {
            title: "必有房房贷计算器好用！月供利息一清二楚",
            path: a("/h5_webview/loan_select/loan_select")
        };
    },
    "h5_webview/register_webview/register_webview": function(e) {
        var t = e.util;
        e.app;
        t.recordShareOperateByBroker("分享线上登记（h5）");
        var i = "/h5_webview/register_webview/register_webview?url=" + encodeURIComponent(this.data.url) + "&buildingName=" + this.data.buildingName + "&durationTime=" + this.data.durationTime;
        return {
            path: a(i),
            title: "【" + this.data.buildingName + "】官方在线登记入口" + this.data.durationTime
        };
    },
    "pck_building/detail_newsList/detail_newsList": function(e) {
        e.util, e.app;
        var t = "/pck_building/detail_newsList/detail_newsList?buildingId=" + this.data.buildingId + "&buildingName=" + this.data.buildingName;
        return {
            title: "这是【" + this.data.buildingName + "】的近期动态",
            path: a(t)
        };
    },
    "pck_building/detail_commentList/detail_commentList": function(e) {
        e.util, e.app;
        var t = "这是大家对【" + this.data.buildingName + "】的评价", i = "/pck_building/detail_commentList/detail_commentList";
        return i += "?buildingName=" + this.data.buildingName + "&buildingId=" + this.data.buildingId, 
        {
            title: t,
            path: a(i)
        };
    },
    "ext_features/map/map": function(e) {
        e.util, e.app;
        return {
            title: "不知道哪里有房？试试地图找房吧",
            path: a("/ext_features/map/map")
        };
    },
    "ext_features/map_subway/map_subway": function(e) {
        e.util, e.app;
        return {
            title: "想买地铁房？试试这个功能吧",
            path: a("/ext_features/map_subway/map_subway")
        };
    },
    "pages/lottery_detail/lottery_detail": function(e) {
        e.util, e.app;
        var t = this.data.result, i = "";
        i = t.HouseNumber ? t.isSuccess ? "我成功上岸【" + t.ProjectName + "】了" : "我要做【" + t.ProjectName + "】的“捡漏王”！" : "我在【" + t.ProjectName + "】摇号中击败了" + t.SuccessRate + "%的购房人";
        var r = "/pages/lottery_detail/lottery_detail?registrationId=" + this.data.registrationId + "&projectId=" + (this.data.projectId || "");
        return {
            title: "【" + t.LotteryNo + "】号," + i,
            path: a(r)
        };
    },
    "ext_features/integrals/integrals": function(e) {
        var t = e.util, i = e.app;
        if ("button" === e.e.from) {
            var r = this.data.userInfo, n = r.UserType, o = r.AvatarUrl, d = r.NickName;
            1 === n && (o = i.globalData.consultantInfo.AvatarUrl);
            var l = this.data.code, u = void 0, s = void 0;
            return 1 === n ? (u = "我是" + i.globalData.consultantInfo.Name + "，邀请你入驻必有房，获取高意向客户！", 
            s = "/ext_features/broker_registion/broker_registrion?InviteCode=" + l + "&checkState=0") : (u = (d || "游客") + "推荐你在杭州买新房用必有房", 
            s = "/pages/index/index"), o = t.formatUrl(o), {
                title: u,
                imageUrl: o,
                path: a(s)
            };
        }
    },
    "pck_building/detail_imgs/index": function(e) {
        var t = e.util, i = e.app;
        t.recordShareOperateByBroker("分享楼盘相册");
        var r = "/pck_building/detail_imgs/index?buildingId=" + this.data.buildingId + "&buildingName=" + this.data.buildingName + "&initType=" + this.data.initType;
        return i.globalData.brokerCode && (r += "&brokerCode=" + i.globalData.brokerCode), 
        {
            title: "这是【" + this.data.buildingName + "】的楼盘相册",
            path: a(r)
        };
    },
    "pck_building/detail_surrounding/detail_surrounding": function(e) {
        e.util;
        var t = e.app, i = this.data, r = i.name, n = "/pck_building/detail_surrounding/detail_surrounding?buildingId=" + i.buildingId + "&lat=" + i.lat + "&lng=" + i.lng + "&name=" + r;
        return t.globalData.brokerCode && (n += "&brokerCode=" + t.globalData.brokerCode), 
        {
            title: "这是【" + r + "】的周边配套",
            path: a(n)
        };
    },
    "h5_webview/article_webview/article_webview": function(e) {
        var t = e.util, i = e.app, r = this.data, n = r.title, o = r.url, d = r.id, l = r.type;
        t.recordArticleShare({
            articleId: d,
            isPoster: !1
        });
        var u = i.globalData, s = u.userInfo, p = u.cityInfo, c = "";
        if (s.RealtyConsultantInfo) {
            var b = s.RealtyConsultantInfo.Buildings.filter(function(e) {
                return e.CityId === p.CityId;
            });
            b.length && (c = b[0].ShortCode);
        }
        var g = "/h5_webview/article_webview/article_webview?url=" + encodeURIComponent(o) + "&title=" + encodeURIComponent(n) + "&id=" + d + "&type=" + l + "&brokerId=" + c;
        return console.log(a(g)), {
            path: a(g),
            title: n
        };
    },
    "pck_building/detail_info/detail_info": function(e) {
        var t = e.util;
        e.app;
        t.recordShareOperateByBroker("分享楼盘信息");
        var i = "/pck_building/detail_info/detail_info?buildingId=" + this.data.buildingId;
        return {
            path: a(i)
        };
    },
    "pck_building/detail_houseType/detail_houseType": function(e) {
        e.util;
        var t = e.app, i = "/pck_building/detail_houseType/detail_houseType?buildingId=" + this.data.buildingId + "&showAsProject=" + this.data.showAsProject + "&projectId=" + this.data.projectId + "&buildingName=" + this.data.buildingName;
        return t.globalData.brokerCode && (i += "&brokerCode=" + t.globalData.brokerCode), 
        {
            title: "这是【" + this.data.buildingName + "】的户型",
            path: a(i)
        };
    },
    "pck_building/detail_history/detail_history": function(e) {
        e.util, e.app;
        var t = this.data, i = t.buildingName, r = t.buildingId, n = t.districtName;
        return {
            title: "这是【" + i + "】的历史开盘记录",
            path: a("/pck_building/detail_history/detail_history?buildingId=" + r + "&buildingName=" + i + "&districtName=" + n)
        };
    },
    "ext_features/lottery_latest/lottery_latest": function(e) {
        e.util, e.app;
        return {
            title: "近期摇号楼盘汇总，有你参与的吗？",
            path: a("/ext_features/lottery_latest/lottery_latest")
        };
    },
    "ext_features/market_headline/market_headline": function(e) {
        e.util, e.app;
        return {
            title: "今日杭州楼市有哪些热点新闻？",
            path: a("/ext_features/market_headline/market_headline")
        };
    },
    "pck_advert/pullLongAdvert/index": function(e) {
        var t = e.util, i = (e.app, this.data), r = i.advertId, n = i.adverForm.BuildingName;
        return t.recordLongpageClick({
            advertId: r,
            SourceType: 5
        }), {
            title: n,
            path: a("/pck_advert/pullLongAdvert/index?advertId=" + r)
        };
    },
    "pck_advert/brand-pavilion/index": function() {
        return {
            title: "品牌馆",
            path: a("/pck_advert/brand-pavilion/index")
        };
    },
    "pck_advert/brand-list/index": function() {
        var e = this.data.brand.BrandName;
        return console.log(a("/pck_advert/brand-list/index?brandId=" + this.data.brandId + "&isScene=" + (this.data.isScene ? "1" : "0"))), 
        {
            title: e,
            path: a("/pck_advert/brand-list/index?brandId=" + this.data.brandId + "&isScene=" + (this.data.isScene ? "1" : "0"))
        };
    },
    "pck_poster/lotteryed_poster/index": function() {
        var e = this.data, t = e.projectId;
        return {
            title: e.buildingName + e.buildingNo,
            path: a("/pck_poster/lotteryed_poster/index?projectId=" + t)
        };
    }
};