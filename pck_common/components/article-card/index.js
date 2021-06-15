var e = require("../../../utils/index");

Component({
    properties: {
        newsInfo: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        goDetail: function(t) {
            var r = this.properties.newsInfo, i = r.ArticleUrl, o = r.Id, c = r.ArticleId, d = r.Title;
            e.navigatePage({
                url: "/h5_webview/article_webview/article_webview?url=" + encodeURIComponent(i) + "&id=" + c + "&title=" + encodeURIComponent(d)
            }), e.recordAdvertClick({
                advertId: o,
                SourceKey: "Advert"
            }), e.recordArticleClick({
                articleId: c,
                SourceKey: "Advert"
            });
        }
    }
});