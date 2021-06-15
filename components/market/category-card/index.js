getApp();

var t = require("../../../utils/index.js");

Component({
    properties: {
        cardInfo: {
            type: Object,
            value: {},
            observer: function() {}
        },
        type: {
            type: String,
            value: "1"
        }
    },
    data: {
        lines: 3,
        height: ""
    },
    methods: {
        cardOperate: function(e) {
            var r = e.currentTarget.dataset.index;
            this.triggerEvent("cardOperate", this.data.cardInfo.AdvertList[r]), t.recordAdvertClick({
                advertId: this.data.cardInfo.AdvertList[r].Id
            }), t.recordArticleClick({
                articleId: this.data.cardInfo.AdvertList[r].ArticleId,
                SourceKey: "Advert"
            });
        }
    }
});