var e = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function(t) {
        var a = this;
        e.checkSession(function() {
            a.setData({
                url: decodeURIComponent(t.url)
            });
        }, util.getShareParams(t));
    },
    onShareAppMessage: function() {
        return util.extractShareFn({
            app: e
        });
    }
});