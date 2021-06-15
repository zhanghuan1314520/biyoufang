var t = require("../../config.js"), e = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        navH: a.globalData.navH,
        nullImg: a.globalData.imgsPathInfo.rootPath + "/images_wx/default_graph/null@3x.png",
        pageNumb: 1
    },
    onLoad: function(t) {
        this.getQuestions();
    },
    onReachBottom: function() {
        this.getQuestions();
    },
    checkDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pck_my/question_detail/question_detail?id=" + e
        });
    },
    getQuestions: function() {
        var a = this, n = this.data.pageNumb;
        return e.request({
            url: t.service.getCommonProblemInAd.replace("{userSystem}", "Weixin"),
            data: {
                pageNo: n,
                pageSize: 10
            }
        }).then(function(t) {
            a.setData({
                questions: 1 === n ? t : a.data.questions.concat(t),
                pageNumb: ++n
            });
        });
    }
});