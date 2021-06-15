var a = getApp();

Page({
    data: {
        navH: a.globalData.navH
    },
    onLoad: function(a) {
        var n = JSON.parse(a.serviceLoanInfo);
        this.setData({
            serviceLoanInfo: n
        });
    },
    back: function() {
        wx.navigateBack();
    }
});