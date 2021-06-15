function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../utils/index"), n = require("../../config");

Component({
    data: {
        navH: a.globalData.navH,
        consultantStatus: 1,
        tabsList: [ {
            name: "未通过",
            consultantStatus: 1,
            showDot: !1
        }, {
            name: "待审核",
            consultantStatus: 0,
            showDot: !1
        }, {
            name: "已通过",
            consultantStatus: 2,
            showDot: !1
        } ],
        imageRoot: n.imgRootUrl,
        auditIcon: [ "/ext_features/image/registrion/audit_wait.png", "/ext_features/image/registrion/augit_no_pass.png" ],
        currentInfoDetail: null,
        firstShow: !0,
        realtyConsultantId: "",
        userInfo: {},
        allBuildings: [],
        filterBuildings: []
    },
    methods: {
        onLoad: function(t) {
            this.data.realtyConsultantId = t.realtyConsultantId;
        },
        onShow: function() {
            var t = this;
            a.checkSession(function() {
                t.setData({
                    userInfo: a.globalData.userInfo
                }), t.getConsultantBuildings(t.data.realtyConsultantId);
            });
        },
        getConsultantBuildings: function(a) {
            var s = this;
            return e.request({
                url: n.service.realtyconsultantBuildings.replace("{consultantId}", a)
            }).then(function(e) {
                var n = e.Messages, i = e.Buildings, r = null;
                n.forEach(function(a) {
                    var e = a.ConsultantStatus;
                    if (!a.Read) {
                        switch (e) {
                          case 0:
                            r = 1;
                            break;

                          case 1:
                            r = 0;
                            break;

                          case 2:
                            r = 2;
                        }
                        s.setData(t({}, "tabsList[" + r + "].showDot", !0));
                    }
                }), s.data.allBuildings = i, s.filterBuildingByType(), s.modifyReadStatus(a, s.data.consultantStatus);
            });
        },
        filterBuildingByType: function() {
            var t = this.data.consultantStatus, a = this.data.allBuildings;
            this.setData({
                filterBuildings: a.filter(function(a) {
                    return a.ConsultantStatus === t;
                })
            });
        },
        handleTabsChange: function(t) {
            var a = this;
            this.setData({
                consultantStatus: t.detail.consultantStatus
            }, function() {
                a.filterBuildingByType(), a.modifyReadStatus(a.data.realtyConsultantId, a.data.consultantStatus);
            }), wx.pageScrollTo({
                scrollTop: 0
            });
        },
        changeSelectBuilding: function(t) {
            t.detail.PersonalImageUrl = e.formatUrl(t.detail.PersonalImageUrl), t.detail.WorkPermitUrl = e.formatUrl(t.detail.WorkPermitUrl), 
            this.setData({
                currentInfoDetail: t.detail
            });
        },
        previewImage: function(t) {
            var a = t.currentTarget.dataset.url;
            wx.previewImage({
                urls: [ a ]
            });
        },
        handleClickBtn: function(t) {
            var a = t.currentTarget.dataset.type, n = this.data.currentInfoDetail;
            switch (a) {
              case "modify":
                wx.setStorage({
                    key: "alterPropertyConsultant",
                    data: n,
                    success: function() {
                        e.navigatePage({
                            url: "/ext_features/broker_registion/broker_registrion?checkState=4"
                        });
                    }
                });
                break;

              case "add":
                e.navigatePage({
                    url: "/ext_features/broker_registion/broker_registrion?checkState=3"
                });
            }
        },
        modifyReadStatus: function(a, s) {
            var i = this.data.tabsList, r = i.findIndex(function(t) {
                return t.consultantStatus === s;
            });
            if (i[r].showDot) {
                this.setData(t({}, "tabsList[" + r + "].showDot", !1));
                var o = [ "ConsultantToAudit", "ConsultantReject", "ConsultantPass" ][s];
                a && o && e.request({
                    url: n.service.additioninfoConsultantAPI.replace("{consultantId}", a).replace("{messageType}", o),
                    method: "POST"
                });
            }
        }
    }
});