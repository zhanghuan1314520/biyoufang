function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp(), a = require("../../config.js"), n = require("../../utils/index.js");

Page({
    data: {
        navH: e.globalData.navH,
        userInfo: null,
        news: [],
        pageNo: 1,
        limit: 10,
        canLoadMore: !0,
        lackImg: e.globalData.imgsPathInfo.rootPath + "/images_wx/my_news/estate_news_null@3x.png",
        tabsList: [ {
            name: "未通过",
            consultantStatus: -1
        }, {
            name: "待审核",
            consultantStatus: 0
        }, {
            name: "已通过",
            consultantStatus: 1
        } ],
        buildings: [],
        currentInfoDetail: {},
        consultantStatus: -1,
        activeIndex: 0,
        activeBuilding: ""
    },
    onLoad: function(t) {},
    onShow: function() {
        var t = this;
        e.checkSession(function() {
            t.setData({
                userInfo: e.globalData.userInfo,
                activeBuilding: "",
                activeIndex: 0
            }), t.getMyNews();
        });
    },
    onReachBottom: function() {
        this.data.canLoadMore && (++this.data.pageNo, this.getMyNews());
    },
    onPullDownRefresh: function() {
        this.data.pageNo = 1, this.getMyNews(wx.stopPullDownRefresh);
    },
    getMyNews: function(e) {
        var i = this, s = this.data, o = s.pageNo, u = s.limit, l = (s.news, s.activeBuilding);
        n.request({
            url: a.service.realtyconsultantNewList.replace("{auditStatus}", this.data.consultantStatus),
            data: {
                pageNo: o,
                buildingId: l
            },
            loading: !e
        }).then(function(a) {
            var s = a.Buildings, l = void 0 === s ? [] : s, c = a.News, d = void 0 === c ? [] : c;
            d.forEach(function(t) {
                t.CreateTime = t.CreateTime.slice(0, 10).replace(/-/g, "."), t.Images.forEach(function(e, a) {
                    t.Images[a] = n.formatUrl(e.FilePath);
                });
            });
            var r = t({
                canLoadMore: d.length === u
            }, "news[" + (o - 1) + "]", d);
            d.length || delete r["news[" + (o - 1) + "]"], l.length && (r.buildings = l), i.setData(r, function() {
                e && e();
            });
        }).catch(function(t) {
            e && e();
        });
    },
    handleTabsChange: function(t) {
        var e = this;
        this.data.consultantStatus !== t.detail.consultantStatus && (this.setData({
            consultantStatus: t.detail.consultantStatus,
            news: [],
            pageNo: 1,
            buildings: [],
            activeIndex: 0,
            activeBuilding: ""
        }, function() {
            e.getMyNews();
        }), wx.pageScrollTo({
            scrollTop: 0
        }));
    },
    handleBuildingTap: function(t) {
        var e = this, a = t.currentTarget.dataset, n = a.index, i = a.buildingId;
        this.data.activeIndex !== n && this.setData({
            activeIndex: n,
            activeBuilding: i,
            news: [],
            pageNo: 1
        }, function() {
            e.getMyNews();
        });
    },
    modifyNews: function(t) {
        var e = t.detail, a = e.Id, n = e.BuildingName;
        wx.navigateTo({
            url: "/pck_broker/update_news/update_news?isEdit=1&id=" + a + "&buildingName=" + n
        });
    },
    deleteNews: function(t) {
        var e = this, i = t.detail, s = i.Id, o = i.Intergral;
        wx.showModal({
            title: "提示",
            content: "删除快讯扣" + o + "积分",
            success: function(t) {
                t.confirm && n.request({
                    url: a.service.deleteBrokerNew.replace("{id}", s),
                    method: "Delete",
                    loading: !0
                }).then(function(t) {
                    n.wxToast("快讯删除成功"), e.setData({
                        pageNo: 1,
                        news: []
                    }, function() {
                        e.getMyNews();
                    });
                });
            }
        });
    },
    goCommit: function() {
        wx.navigateTo({
            url: "/pck_broker/update_news/update_news"
        });
    }
});