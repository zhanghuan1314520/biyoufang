var t = getApp(), e = require("../../../utils/index.js");

Component({
    properties: {
        cardInfo: {
            type: Object,
            value: {},
            observer: function() {
                this.openListeningArticleList();
            }
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
        cardOperate: function(t) {
            var r = t.currentTarget.dataset.i;
            this.triggerEvent("cardOperate", this.data.cardInfo.AdvertList[r]), e.recordAdvertClick({
                advertId: this.data.cardInfo.AdvertList[r].Id
            }), e.recordArticleClick({
                articleId: this.data.cardInfo.AdvertList[r].ArticleId,
                SourceKey: "Advert"
            });
        },
        openListeningArticleList: function() {
            var e = this, r = t.globalData.userInfo;
            if (r && r.OpenId) {
                var a = wx.createIntersectionObserver(this, {
                    observeAll: !0
                }).relativeToViewport({
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                });
                a.observe(".card", function(t) {
                    e.data.cardInfo.eventTrackStatus = 1, a.disconnect();
                });
            }
        },
        handleBannerTrace: function() {
            var t = this.data.cardInfo, e = [];
            return 1 === t.eventTrackStatus && (t.eventTrackStatus = 2, e = t.AdvertList.map(function(t) {
                return t.Id;
            }).filter(function(t) {
                return t;
            })), e;
        }
    }
});