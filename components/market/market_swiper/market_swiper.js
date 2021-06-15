getApp();

var t = require("../../../utils/index.js");

Component({
    properties: {
        bannerList: {
            type: Object,
            value: null,
            observer: function() {
                this.data.bannerList[0].eventTrackStatus = 1;
            }
        }
    },
    onHide: function() {
        console.error("组件发生隐藏");
    },
    methods: {
        checkArticle: function(e) {
            var r = e.currentTarget.dataset, n = r.id, a = r.url;
            a && (t.recordAdvertClick({
                advertId: n
            }), t.recordArticleClick({
                articleId: n,
                SourceKey: "Advert"
            }), wx.navigateTo({
                url: a
            }));
        },
        changeItem: function(t) {
            var e = t.detail, r = this.data.bannerList[e.current];
            r.eventTrackStatus || (r.eventTrackStatus = 1);
        },
        handleBannerTrace: function() {
            return this.data.bannerList.map(function(t) {
                if (1 === t.eventTrackStatus) return t.eventTrackStatus = 2, t.Id;
            }).filter(function(t) {
                return t;
            });
        }
    }
});