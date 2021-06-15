var t = getApp();

Page({
    data: {
        navH: t.globalData.navH,
        versionType: null
    },
    onLoad: function(t) {
        this.setData({
            versionType: this.getVersionType(),
            table: this.initTableList()
        });
    },
    getVersionType: function() {
        if (t.globalData.cityInfo) return t.globalData.cityInfo.VersionType;
        var a = wx.getStorageSync("cityInfo");
        return a && a.VersionType || 0;
    },
    initTableList: function() {
        return [ [ "人才摇中概率 = 1 - (1-P11) (1-P12) (1-P13)", {
            a: "第一轮摇中概率 P11",
            b: "人才倾斜套数",
            c: "人才报名套数"
        }, {
            a: "第二轮摇中概率 P12",
            b: "一轮未中人才",
            c: "无房倾斜套数"
        }, {
            a: "第三轮摇中概率 P13",
            b: "一二轮未中人才",
            c: "剩余房源"
        } ], [ "无房摇中概率 = 1 - (1-P21) (1-P22)", {
            a: "第二轮摇中概率 P21",
            b: "无房倾斜套数",
            c: "无房报名人数"
        }, {
            a: "第三轮摇中概率 P22",
            b: "一二轮未中无房",
            c: "剩余房源"
        } ], [ {
            a: "其它摇中概率",
            b: "剩余房源",
            c: "其它报名人数"
        } ] ];
    }
});