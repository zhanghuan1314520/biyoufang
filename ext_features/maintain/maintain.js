var a = getApp();

Page({
    data: {
        navH: 0,
        imgsPathInfo: null,
        bgImgUrl: ""
    },
    onLoad: function(t) {
        var g = a.globalData, n = g.navH, i = g.imgsPathInfo, s = i.rootPath + "/images_wx/bg/bg_img_maintain@3x.png";
        this.setData({
            navH: n,
            bgImgUrl: s,
            imgsPathInfo: i
        }), t.msg = "为提升用户体验，平台正在执行升级维护，预计将在{{7月10日23点前}}恢复，给您带来不便，敬请谅解！";
        var o = t.msg || "", m = [];
        o && (m = o.replace(/({{|}})/g, "????").split("????")), 0 === m.length && (m = [ "平台维护中，请稍后再试" ]), 
        this.setData({
            msg: o,
            tipList: m
        });
    },
    onShow: function() {
        a.login();
    }
});