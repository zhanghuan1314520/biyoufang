var t = getApp(), a = require("../../utils/index.js"), e = require("../../config.js");

Component({
    data: {
        pageData: {
            pageNo: 1,
            limit: 10,
            canLoadMore: !1
        },
        list: [],
        totalIntegral: 0
    },
    methods: {
        getIntegralDetail: function() {
            var t = this, i = this.data.pageData, n = i.limit, o = i.pageNo;
            return a.request({
                url: e.service.realtyConsultantIntegral,
                data: {
                    pageNo: o,
                    limit: n
                }
            }).then(function(a) {
                var e = t.data.list;
                t.setData({
                    list: e.concat(a.ListData),
                    totalIntegral: a.Integral,
                    "pageData.canLoadMore": n === a.ListData.length
                });
            });
        },
        scrolltolower: function() {
            var t = this.data.pageData, a = t.pageNo;
            t.canLoadMore && (this.data.pageData.pageNo = a + 1, this.getIntegralDetail());
        },
        onLoad: function(a) {
            var e = this;
            t.checkSession(function() {
                e.getIntegralDetail();
            }, a);
        }
    }
});