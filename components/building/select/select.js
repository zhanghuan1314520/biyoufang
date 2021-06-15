function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

require("../../../utils/index.js");

var e = getApp(), i = require("../../../options/building.js"), n = null;

Component({
    properties: {
        cityInfo: {
            type: Object,
            value: null
        }
    },
    data: {
        navH: e.globalData.navH,
        deviceWidth: null,
        curFilter: -1,
        buildind: null,
        moreFilterTop: 0,
        secondSel: [],
        selOption: [],
        selOptionItem: [],
        lat: 0,
        lng: 0,
        hasLocation: !0,
        fitNum: 6.5,
        quickSubwayFlag: !1
    },
    created: function() {
        i.initModuleData();
    },
    attached: function() {
        var t = this;
        this.initBuildParams(), wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    deviceWidth: e.windowWidth,
                    moreFilterTop: e.screenHeight - e.statusBarHeight + 12,
                    isIphoneX: -1 != e.model.search("iPhone X")
                });
            }
        });
    },
    detached: function() {
        this.cliseMaskAndReset();
    },
    methods: {
        initCity: function() {
            return e.globalData.cityInfo ? e.globalData.cityInfo.VersionType : 0;
        },
        initBuildParams: function() {
            var t = this.initCity(), e = i.SelectVersion(t), n = i.SelectQuickTag(t);
            this.setData({
                building: e,
                quickTag: n
            });
        },
        initSubWayData: function(t) {
            this.initAreaOptions(t), this.initSubWayOptions(t);
        },
        initAreaOptions: function(t) {
            var e = this.getRightItem("area", this.data.building, "mixin");
            t = t.areaOptions, t = this.initData(t, "Name", "PlateList", "Name", 1), e.children = t, 
            i.RebuildOrigin(e);
        },
        initSubWayOptions: function(t) {
            this.setData({
                quickSubwayFlag: t.subWayOptions.length > 1
            });
            var e = this.getRightItem("subway", this.data.building, "mixin");
            t = t.subWayOptions, e.show = !!t.length, t = this.initData(t, "Name", "StationList", "Name"), 
            e.children = t, t = i.RebuildOrigin(e);
        },
        initData: function(t, e, i, n, a) {
            return t && (t.map(function(t) {
                t.name = t[e], t.Multiple = !1, t.active = !1, t.selItem = 0, t.sp = "area", 1 === a ? (t._endKey = "DistrictId", 
                t.value = t.Id) : (t._endKey = "SubwaylineId", t.value = t.Id), t.children = t[i], 
                t.children.forEach(function(t) {
                    t.name = t[n], t.sp = "t", t._endKey = 1 === a ? "PlateId" : "SubwaystationId", 
                    t.value = t.Id, t.Multiple = !0, t.active = !1, t.selItem = 0;
                }), t.children.unshift({
                    name: "不限",
                    sp: "t",
                    Multiple: !1,
                    active: !1,
                    selItem: 0
                });
            }), t.unshift({
                name: "不限",
                children: [],
                Multiple: !1,
                active: !0,
                selItem: 0
            })), t || [];
        },
        initSurrending: function() {
            var t = this;
            wx.getLocation({
                type: "gcj02",
                success: function(e) {
                    t.setData({
                        lat: e.latitude,
                        lng: e.longitude,
                        hasLocation: !0
                    });
                },
                fail: function(e) {
                    "getLocation:fail auth deny" === e.errMsg && wx.showModal({
                        title: "提示",
                        content: "授权失败，需要展示附近的楼盘信息，请点击确定进行授权",
                        success: function(e) {
                            e.cancel || wx.openSetting({
                                success: function() {
                                    t.initSurrending();
                                }
                            });
                        }
                    }), t.setData({
                        hasLocation: !1
                    });
                }
            });
        },
        changeFilter: function(e) {
            var i, n = e.currentTarget.dataset.index, a = (i = {}, t(i, "building[" + n + "].active", !0), 
            t(i, "secondSel", this.secondSelOption(n)), i);
            if (-1 === this.data.curFilter && (a.selOption = this.getAllSelItem()), 3 === n) return a.selOptionItem = this.getAllSelItem(), 
            a.moreFilter = !0, wx.hideTabBar(), this.setData(a);
            var r = this.data.building[n];
            if (this.getFitNum(r.children[r.selItem]), n === this.data.curFilter) return this.closeMask();
            a.curFilter = n, this.resetOuterActive(), this.setData(a), this.triggerEvent("itemClick", {
                eventType: "clickOuter"
            });
        },
        secondSelOption: function(t) {
            if (0 === t) {
                var e = this.getRightItem("area", this.data.building, "mixin"), i = this.checkSecOptionAndReturn(e);
                if (i) return i;
                var n = this.getRightItem("subway", this.data.building, "mixin"), a = this.checkSecOptionAndReturn(n);
                if (a) return a;
            }
            return [];
        },
        checkSecOptionAndReturn: function(t) {
            if (!0 === t.active) {
                var e = t.selItem, i = t.children[e];
                if (i.active) return i.children;
            }
        },
        closeMask: function() {
            this.resetOuterActive(), this.setData({
                curFilter: -1
            }), this.triggerEvent("itemClick", {
                eventType: "closeMask"
            });
        },
        cliseMaskAndReset: function() {
            this.resetPreSel(), this.closeMask();
        },
        submitForm: function() {
            this.resetOuterActive(), this.setData({
                curFilter: -1
            }), this.emitForm(), this.scrollPageTop(0, 0);
        },
        emitForm: function() {
            var t = this, e = [];
            this.data.building.map(function(i) {
                e.push(t.getSelItem(i, []));
            });
            var i = this.formatPostData(e);
            this.triggerEvent("itemClick", {
                eventType: "submitForm",
                formData: i
            });
        },
        changeLeftSub: function(t, e) {
            var i = t.currentTarget.dataset, n = i._key, a = i.index, r = this.data.building, s = this.getRightItem(~~n, r);
            this.specialClick(s), this.chooseSecondSel(s), this.changeSibling(s), this.getFitNum(s), 
            s.active = !e || "不限" === s.name || !s.active, this.changeParentStatus(s, a), e && e(s), 
            this.setData({
                building: r
            });
        },
        changeRightSub: function(t) {
            t.currentTarget.dataset.canclick && (this.changeLeftSub(t), this.changeQuickTag());
        },
        triggerThirdLevel: function(t, e) {
            var i = this;
            this.changeLeftSub(t, function(t) {
                i.setData({
                    secondSel: t.parent.children
                });
            });
        },
        resetAuto: function() {
            var t = this.getRightItem("全部", this.data.quickTag, "name");
            t && this.quickFilter({
                currentTarget: {
                    dataset: {
                        index: "0",
                        _key: t._key
                    }
                }
            });
        },
        quickFilter: function(t) {
            var e = t.currentTarget.dataset, i = (e.index, e._key), n = this.data.quickTag, a = this.getRightItem(i, this.data.quickTag);
            a.active = !a.active, this.changeSibling(a), this.setData({
                quickTag: n
            }), this.scrollPageTop(0, 0), this.handleLinkOptions(1, t);
        },
        scrollPageTop: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 300;
            wx.pageScrollTo({
                scrollTop: t,
                duration: e
            });
        },
        resetAreaFilter: function() {
            var t = this.data, e = t.curFilter, i = t.building;
            if (0 === e || 1 === e || 2 === e) {
                var n = i[e], a = n.children[n.selItem];
                this.changeLeftSub({
                    currentTarget: {
                        dataset: {
                            index: 0,
                            _key: a.children[0]._key
                        }
                    }
                }), this.setData({
                    secondSel: []
                }), this.changeQuickTag();
            }
        },
        confirmAreaFilter: function() {
            this.submitForm();
        },
        selectOption: function(t) {
            this.changeLeftSub(t, this.prevent);
        },
        cancelMoreFilter: function() {
            this.resetPreSel(1), this.resetOuterActive(3), this.changeMoreFilterStatus(), n = setTimeout(function() {
                wx.showTabBar(), clearTimeout(n);
            }, 600);
        },
        ensureMoreFilter: function() {
            this.closeMask(), this.submitForm(), this.changeMoreFilterStatus(), this.changeQuickTag(), 
            n = setTimeout(function() {
                wx.showTabBar(), clearTimeout(n);
            }, 600);
        },
        changeMoreFilterStatus: function() {
            this.setData({
                moreFilter: !this.data.moreFilter
            });
        },
        chooseSecondSel: function(t) {
            "area" === t.sp || "subway" === t.sp ? this.setData({
                secondSel: t.children
            }) : void 0 === t.sp && this.data.secondSel && this.data.secondSel.length > 0 && this.setData({
                secondSel: []
            });
        },
        specialClick: function(t) {
            "附近" !== t.name || this.data.lat || this.initSurrending();
        },
        resetPreSel: function(t) {
            var e = this, i = this.data.building, n = [];
            i.map(function(t) {
                n.push(e.getSelItem(t, []));
            }), (n = this.flatArray(n)).map(function(t) {
                e.getRightItem(t._key, i).active = !1;
            });
            (t ? this.data.selOptionItem : this.data.selOption).map(function(t) {
                var n = e.getRightItem(t._key, i);
                n.active = !0;
                var a = e.changeSibling(n);
                e.changeParentStatus(n, a);
                var r = n.parent.parent;
                r && (r.selItem = e.getIndex(n.parent));
            });
        },
        resetOuterActive: function(t) {
            var e = this, i = this.data.building;
            i.map(function(i, n) {
                if (void 0 === t || n === t) {
                    var a = e.getSelItem(i, []).filter(function(t) {
                        return "null+3000000" !== t.value;
                    });
                    if (i.active = !!a.length, a.length) {
                        var r = e.getRightItem(a[0]._key, i.children), s = r.show && r.name;
                        i.selName = s || "", i.selName = s || "";
                    } else i.selName = "";
                }
            }), this.setData({
                building: i
            });
        },
        handleLinkOptions: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, i = (arguments[1], 
            this.data), n = i.quickTag, a = i.building;
            1 === e && (n.map(function(e) {
                if ("全部" === e.name && e.active && t.changeChildrenFalse(a), "近期开盘" === e.name) {
                    var i = e.value.split(",");
                    t.getRightItem(e._endKey, a, "_endKey").parent.children.map(function(t, n) {
                        i.includes("" + t.value) && (t.active = e.active);
                    });
                }
                if ("地铁盘" === e.name) {
                    var n = t.getRightItem(e._endKey, a, "_endKey");
                    t.changeSibling(n), n.active = e.active;
                }
                if ("90㎡内" === e.name || "300万内" === e.name) {
                    var r = "90㎡内" === e.name, s = t.getRightItem(e.value, a, "value");
                    e.active ? (s.active = !0, t.changeSibling(s), t.changeParentStatus(s, r ? 5 : 1), 
                    s.parent.parent.selItem = r ? 0 : 1) : s.active = !1;
                }
            }), this.setData({
                building: a
            })), this.submitForm();
        },
        changeQuickTag: function() {
            var t = this, e = this.data, i = e.quickTag, n = [];
            e.building.map(function(e) {
                n.push(t.getSelItem(e, []));
            });
            var a = this.formatPostData(n);
            i.map(function(t) {
                t.active = !1;
            }), (a.MaxHouseArea || a.MinHouseArea) && (a["MinHouseArea+MaxHouseArea"] = (a.MinHouseArea || null) + "+" + (a.MaxHouseArea || null)), 
            (a.MinTotalPrice || a.MaxTotalPrice) && (a["MinTotalPrice+MaxTotalPrice"] = (a.MinTotalPrice || null) + "+" + (a.MaxTotalPrice || null)), 
            a.SalesStatus && "0,1,2,3,4" != a.SalesStatus && -1 != a.SalesStatus.indexOf("0,1,2,3,4") && (a.SalesStatus = "0,1,2,3,4");
            for (var r in a) {
                var s = a[r], c = this.getRightItemByKeys([ "_endKey", "value" ], [ r, s ], i);
                c && (c.active = !0);
            }
            this.setData({
                quickTag: i
            });
        },
        getAllSelItem: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, i = [];
            return this.data.building.map(function(e) {
                i.push(t.getSelItem(e, []));
            }), 1 === e ? this.flatArray(i) : i;
        },
        getSelItem: function(t, e) {
            for (var i = t.children, n = 0, a = i.length; n < a; n++) {
                var r = i[n];
                r._endKey && r.active && "不限" !== r.name && e.push({
                    _key: r._key,
                    _endKey: r._endKey,
                    value: r.value
                }), r.children && this.getSelItem(r, e);
            }
            return e;
        },
        formatPostData: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = {};
            return (e = this.flatArray(e)).map(function(e) {
                var n = e._endKey.split("+"), a = String(e.value).split("+");
                n.map(function(e, r) {
                    i[n[r]] ? "null" != a[r] && (i[n[r]] += "," + a[r]) : "null" != a[r] && (i[n[r]] = a[r]), 
                    "Distance" === n[r] && (i.Lat = t.data.lat, i.Lng = t.data.lng);
                });
            }), i;
        },
        flatArray: function(t) {
            for (var e = [], i = 0, n = t.length; i < n; i++) e = e.concat(t[i]);
            return e;
        },
        getRightItemByKeys: function(t, e, i) {
            for (var n in i) {
                if (t.every(function(a, r) {
                    return i[n][t[r]] === e[r];
                })) return i[n];
                if (i[n].children) {
                    var a = this.getRightItemByKeys(t, e, i[n].children);
                    if (a) return a;
                }
            }
        },
        getRightItem: function(t, e) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "_key";
            for (var n in e) {
                if (e[n][i] === t) return e[n];
                if (e[n].children) {
                    var a = this.getRightItem(t, e[n].children, i);
                    if (a) return a;
                }
            }
        },
        changeSibling: function(t) {
            var e = this, i = 0;
            return !1 === t.Multiple ? (t.parent.children || t.parent).map(function(n, a) {
                t._key !== n._key ? (n.active = !1, n.children && e.changeChildrenFalse(n)) : i = a;
            }) : (t.parent.children || t.parent).map(function(n, a) {
                t._key !== n._key && !1 === n.Multiple ? (n.active = !1, n.children && e.changeChildrenFalse(n)) : i = a;
            }), i;
        },
        getIndex: function(t) {
            for (var e = t.parent.children || t.parent, i = e.length, n = 0; n < i; n++) if (t._key == e[n]._key) return n;
            return 0;
        },
        changeChildrenFalse: function(t) {
            var e = this, i = t.children || t;
            try {
                i.map(function(t) {
                    "不限" !== t.name ? t.active = !1 : t.active = !0, t.children && e.changeChildrenFalse(t);
                });
            } catch (e) {
                console.log(t), console.error(i);
            }
        },
        changeParentStatus: function(t, e) {
            if (t) {
                var i = t.parent;
                i.active = !0, (e || 0 === e) && (i.selItem = e), !1 === i.Multiple && this.changeSibling(i);
            }
        },
        getFitNum: function(t) {
            var e = this.data.fitNum;
            if (t && t.parent.children && t.children) {
                var i = t.parent.children.filter(function(t) {
                    return t.show;
                }).length, n = 0;
                t.children && (n = t.children.filter(function(t) {
                    return t.show;
                }).length), e = Math.max(i, n) > 6 ? 6.5 : Math.max(i, n), this.setData({
                    fitNum: e
                });
            }
        },
        prevent: function() {}
    }
});