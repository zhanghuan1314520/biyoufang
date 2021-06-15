var e = require("../../../utils/index.js");

Component({
    properties: {
        longpageAdvertId: {
            type: String,
            default: null,
            observer: "createSeeHourseUrl"
        }
    },
    data: {
        seeHourseUrl: ""
    },
    methods: {
        copyServiceWx: function() {
            e.promisify(wx.setClipboardData)({
                data: getApp().globalData.cityInfo.OfficialWechat
            }).then(function() {
                wx.showModal({
                    title: "提示",
                    content: "已复制客服微信\r\n快去添加好友 进群讨论吧",
                    showCancel: !1
                });
            });
        },
        createSeeHourseUrl: function(e) {
            if (e) {
                var t = "/pck_advert/pullLongAdvert/index";
                t += "?advertId=" + this.properties.longpageAdvertId + "&fromBuilding=true", this.setData({
                    seeHourseUrl: t
                });
            }
        }
    }
});