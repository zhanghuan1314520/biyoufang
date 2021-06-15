var t = getApp(), i = require("../../utils/index"), a = require("../../config");

Component({
    behaviors: [],
    data: {
        navH: t.globalData.navH,
        navBarTitle: "分类文章",
        articleList: [],
        pagination: {
            canLoadMore: !1,
            pageNo: 1,
            limit: 10
        },
        initStatus: 0
    },
    methods: {
        getArticeListByCategory: function(t) {
            var e = this, o = this.data, n = o.pagination, r = n.pageNo, s = n.limit, c = o.sourceId;
            c ? i.request({
                url: a.service.getSecondArticleListInAd.replace("{positionKey}", "TitleArticle"),
                data: {
                    pageNo: r,
                    limit: s,
                    sourceId: c,
                    userSystem: 0
                }
            }).then(function(a) {
                a.forEach(function(t) {
                    t.ImageUrl = i.formatUrl(t.ImageUrl), t.MediumLogoUrl = i.formatUrl(t.MediumLogoUrl), 
                    t.PublishTime = i.formatQuestionCreateTime(t.PublishTime);
                }), e.setData({
                    articleList: 1 === r ? a : e.data.articleList.concat(a),
                    "pagination.canLoadMore": a.length === s,
                    initStatus: 1
                }, function() {
                    t && t();
                });
            }).catch(function(i) {
                t && t();
            }) : i.wxToast("缺少参数sourceId");
        },
        onLoad: function(a) {
            var e = this, o = a.id, n = a.title;
            this.setData({
                navBarTitle: n,
                sourceId: o
            }, function() {
                t.checkSession(function() {
                    e.getArticeListByCategory();
                }, i.getShareParams(a));
            });
        },
        onPullDownRefresh: function() {
            this.data.pagination.pageNo = 1, this.getArticeListByCategory(wx.stopPullDownRefresh);
        },
        onReachBottom: function() {
            this.data.pagination.canLoadMore && (++this.data.pagination.pageNo, this.getArticeListByCategory());
        }
    }
});