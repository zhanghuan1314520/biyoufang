Component({
    properties: {
        articleCardInfo: {
            type: Object,
            value: {}
        }
    },
    data: {},
    lifetimes: {
        attached: function() {}
    },
    methods: {
        goArticleDetailPage: function() {
            this.triggerEvent("operateArticleCardInfo", {
                eventType: "goDetailPage",
                articleInfo: this.properties.articleCardInfo
            }, {});
        }
    }
});