var e = require("../../config.js"), t = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        navH: i.globalData.navH,
        registrationId: "",
        result: null,
        buildingList: [],
        projectId: "",
        pageInfo: {
            pageNo: 1,
            pageNum: 5
        },
        imageRoot: i.globalData.imgsPathInfo.rootPath,
        bgIcons: [ e.imgRootUrl + "/images_wx/weixin_common/yhjg_img_fail.png", e.imgRootUrl + "/images_wx/weixin_common/yhjg_img_win.png", e.imgRootUrl + "/images_wx/weixin_common/byf_lotteryLatest_new.png" ],
        lotteryTime: ""
    },
    onLoad: function(e) {
        var r = this;
        i.checkSession(function() {
            e.registrationId || console.error("摇号详情页缺少 registrationId "), e.projectId || console.error("摇号详情页缺少 projectId "), 
            r.data.lotteryTime = e.lotteryTime || "", r.setData({
                registrationId: e.registrationId,
                isShare: e.isShare ? parseInt(e.isShare) : 0,
                projectId: e.projectId
            }), r.getLotteryResultDetail().then(function() {
                (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).isSuccess || r.getProjectsRecommend();
            });
        }, t.getShareParams(e));
    },
    onShareAppMessage: function() {
        return t.extractShareFn({
            util: t,
            app: i
        });
    },
    getLotteryResultDetail: function() {
        var i = this;
        return t.request({
            url: e.service.getLotteryResultInTool.replace("{registrationId}", this.data.registrationId),
            loading: {
                title: "查询中"
            },
            data: {
                expired: t.isExpiredTime(this.data.lotteryTime)
            }
        }).then(function(e) {
            e.SuccessRate = t.fixedNumber(e.SuccessRate, 2);
            var r = 0;
            return r = 1 === e.LotteryNo ? 100 : e.LotteryNo === e.RegistrationNumber ? 0 : t.fixedNumber((e.RegistrationNumber - e.LotteryNo + 1) / e.RegistrationNumber * 100), 
            e.rankRate = r, e.isSuccess = !!(e.HouseNumber && e.LotteryNo <= e.HouseNumber), 
            i.setData({
                result: e
            }), e;
        });
    },
    getProjectsRecommend: function() {
        var i = this;
        t.request({
            url: e.service.getLotteryresultnBuilding.replace("{projectId}", this.data.projectId),
            data: {}
        }).then(function(e) {
            var t = [];
            t = e && e.length ? i.handleHomeInfoLists(e, 0) : [], i.setData({
                buildingList: t
            });
        });
    },
    handleHomeInfoLists: function(e, i) {
        var r = this;
        return e.map(function(e, a) {
            return e.idx = a + i, e.subscribeStatus = 0, e.followStatus = 0, e.SubwayDistance && e.SubwayDistance <= 1500 && (e.SubwayDistance < 1e3 ? e.BuildingTags = "距地铁" + e.SubwayDistance + "m" + (e.BuildingTags ? "," + e.BuildingTags : "") : e.BuildingTags = "距地铁" + (e.SubwayDistance / 1e3).toFixed(1) + "km" + (e.BuildingTags ? "," + e.BuildingTags : "")), 
            e.propertyType = String(e.PropertyType), e.info = t.formatBuildingInfo(e, r.data.cityInfo), 
            e.eventTrackStatus = 0, e;
        });
    },
    backToHome: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    goLottery: function() {
        wx.navigateTo({
            url: "/pages/lottery/lottery"
        });
    },
    buildCardOperate: function(e) {
        t.buildingJump(e);
    }
});