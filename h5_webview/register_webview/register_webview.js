require("../../config.js");

var e = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function(i) {
        var n = this;
        a.checkSession(function() {
            n.setData({
                url: decodeURIComponent(i.url),
                buildingName: i.buildingName,
                durationTime: i.durationTime
            });
        }, e.getShareParams(i));
    },
    onShareAppMessage: function() {
        return e.extractShareFn({
            util: e,
            app: a
        });
    }
});