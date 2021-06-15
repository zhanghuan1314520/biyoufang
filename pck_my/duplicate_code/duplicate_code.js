var t = getApp(), a = require("../../utils/index.js");

Page({
    data: {
        navH: t.globalData.navH,
        enter: "",
        title: "",
        bgImg: "",
        bgBotImg: "",
        codeImg: "",
        box_title: [],
        operationText: [],
        cityInfo: {},
        wxName: ""
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            enter: t.enter,
            cityInfo: wx.getStorageSync("cityInfo")
        }, function() {
            a.setStructure(t.enter);
        });
    },
    setStructure: function(a) {
        var i = void 0, e = void 0, o = void 0, c = void 0, n = void 0, g = void 0, s = [], m = [];
        "service" === a ? (i = "联系客服", g = "联系客服", e = "/pck_my/images/duplicate_code/jrgfq_img_bj.png", 
        s = [ "功能答疑，增加积分，进群交流", "添加客服，领取自己的专属服务管家" ], c = this.data.cityInfo.officialWechatQrcodeUrl, 
        n = this.data.cityInfo.OfficialWechat) : "public" === a ? (i = "官方公众号", g = "关注官方公众号", 
        e = "/pck_my/images/duplicate_code/lxkf_img_bj.png", o = t.globalData.imgsPathInfo.rootPath + "/images_wx/bg/saoma_img_sl1@3x.png", 
        c = "/pck_my/images/saoma_img_gzhm@3x.png", s = [ "实地跑盘，全面点评，楼市行情，权威解读", "只为帮你买到好房子" ], 
        m = [ "1. 点击微信首页顶部搜索框“ ” ", "2. 输入“必有房” ", "3. 选择“搜一搜 必有房”，然后选择“必有房-公众号”，即可关注我们" ], 
        n = "必有房") : "flock" === a && (i = "加入购房群", g = "加入购房群", e = "/pck_my/images/duplicate_code/jrgfq_img_bj.png", 
        o = t.globalData.imgsPathInfo.rootPath + "/images_wx/bg/saoma_img_sl2@3x.png", c = this.data.cityInfo.officialWechatQrcodeUrl, 
        s = [ "加房产专家微信，在线解答疑问", "入万入业主群，沟通楼市声音" ], m = [ "1. 点击微信首页右上角 +，选择【添加朋友】", "2. 点击顶部输入框，手指长按，选择【粘贴】", "3. 点击“搜索：biyf001”即可" ], 
        n = this.data.cityInfo.OfficialWechat), this.setData({
            title: i,
            bgImg: e,
            bgBotImg: o,
            codeImg: c,
            box_title: s,
            operationText: m,
            wxName: n,
            boxTitle: g
        });
    },
    copyCode: function() {
        "public" === this.data.enter ? this.saveImage() : this.copyInviteCode();
    },
    saveImage: function() {
        wx.saveImageToPhotosAlbum({
            filePath: "/pck_my/images/saoma_img_gzhm@3x.png",
            success: function(t) {
                a.wxToast("图片保存成功");
            },
            fail: function() {
                a.wxToast("图片保存失败"), wx.openSetting();
            }
        });
    },
    copyInviteCode: function(t) {
        a.promisify(wx.setClipboardData)({
            data: this.data.wxName
        }).then(function() {
            wx.showToast({
                title: "微信号已复制"
            });
        });
    }
});