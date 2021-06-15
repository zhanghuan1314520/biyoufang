function e() {
    return ++n;
}

function a() {
    var l = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = arguments[1];
    return l._key = e(), l.show = void 0 === l.show || l.show, n && i(l, "parent", n), 
    (l.children || l).map(function(n, t) {
        n.children ? a(n, l) : (i(n, "parent", l), n._key = e(), n.show = void 0 === n.show || n.show);
    }), l;
}

function l(e) {
    switch (e) {
      case 0:
        e = "HangZhou";
        break;

      case 1:
        e = "normal";
        break;

      case 2:
        e = "QuanZhou";
        break;

      default:
        e = "HangZhou";
    }
    return e;
}

function i(e, a, l) {
    var i = l;
    Object.defineProperty(e, a, {
        configurable: !0,
        enumerable: !1,
        get: function() {
            return i;
        }
    });
}

var n = 0, t = null, u = null, c = null, v = null, m = null, M = null, r = null, s = null;

module.exports = {
    SelectVersion: function(e) {
        var i = l(e), n = s[i];
        return n[3].show = 0 === e, a(n);
    },
    RebuildOrigin: a,
    SelectQuickTag: function(e) {
        return e = l(e), a(r[e]);
    },
    initModuleData: function() {
        n = 0, t = {
            name: "区域",
            selName: "",
            active: !1,
            Multiple: !0,
            selItem: 0,
            children: [ {
                name: "区域",
                Multiple: !1,
                active: !0,
                selItem: 0,
                children: [],
                mixin: "area"
            }, {
                name: "地铁",
                Multiple: !1,
                active: !1,
                selItem: 0,
                children: [],
                mixin: "subway"
            }, {
                name: "附近",
                Multiple: !1,
                active: !1,
                selItem: 0,
                children: [ {
                    name: "不限",
                    active: !0,
                    _sk: "a",
                    Multiple: !1,
                    _endKey: "Distance",
                    value: 0
                }, {
                    name: "1km内",
                    active: !1,
                    _sk: "a",
                    Multiple: !1,
                    _endKey: "Distance",
                    value: 1
                }, {
                    name: "2km内",
                    active: !1,
                    _sk: "a",
                    Multiple: !1,
                    _endKey: "Distance",
                    value: 2
                }, {
                    name: "3km内",
                    active: !1,
                    _sk: "a",
                    Multiple: !1,
                    _endKey: "Distance",
                    value: 3
                } ]
            } ]
        }, u = {
            name: "价格",
            selName: "",
            active: !1,
            Multiple: !0,
            selItem: 0,
            children: [ {
                name: "单价",
                Multiple: !1,
                active: !0,
                selItem: 0,
                children: [ {
                    name: "不限",
                    value: "+",
                    active: !0,
                    _endKey: "MinPrice+maxTotalPrice",
                    Multiple: !1
                }, {
                    name: "1万及以下",
                    value: "10000+null",
                    active: !1,
                    _endKey: "MinPrice+MaxPrice",
                    Multiple: !1
                }, {
                    name: "1-2万",
                    active: !1,
                    value: "10000+20000",
                    _endKey: "MinPrice+MaxPrice",
                    Multiple: !1
                }, {
                    name: "2-3万",
                    active: !1,
                    value: "20000+30000",
                    _endKey: "MinPrice+MaxPrice",
                    Multiple: !1
                }, {
                    name: "3-4万",
                    active: !1,
                    value: "30000+40000",
                    _endKey: "MinPrice+MaxPrice",
                    Multiple: !1
                }, {
                    name: "4-5万",
                    active: !1,
                    value: "40000+50000",
                    _endKey: "MinPrice+MaxPrice",
                    Multiple: !1
                }, {
                    name: "5万以上",
                    active: !1,
                    value: "null+50000",
                    _endKey: "MinPrice+MaxPrice",
                    Multiple: !1
                } ]
            }, {
                name: "总价",
                Multiple: !1,
                active: !1,
                selItem: 0,
                children: [ {
                    name: "不限",
                    active: !0,
                    value: "+",
                    _endKey: "MinTotalPrice+MaxTotalPrice",
                    Multiple: !1
                }, {
                    name: "200万及以下",
                    active: !1,
                    value: "2000000+null",
                    _endKey: "MinTotalPrice+MaxTotalPrice",
                    Multiple: !1
                }, {
                    name: "200-300万",
                    active: !1,
                    value: "2000000+3000000",
                    _endKey: "MinTotalPrice+MaxTotalPrice",
                    Multiple: !1
                }, {
                    name: "300-500万",
                    active: !1,
                    value: "3000000+5000000",
                    _endKey: "MinTotalPrice+MaxTotalPrice",
                    Multiple: !1
                }, {
                    name: "500万及以上",
                    active: !1,
                    value: "null+5000000",
                    _endKey: "MinTotalPrice+MaxTotalPrice",
                    Multiple: !1
                }, {
                    name: "300万内",
                    show: !1,
                    active: !1,
                    value: "3000000+null",
                    _endKey: "MinTotalPrice+MaxTotalPrice",
                    Multiple: !1
                } ]
            } ]
        }, c = {
            name: "面积",
            selName: "",
            active: !1,
            Multiple: !0,
            selItem: 0,
            children: [ {
                name: "面积",
                Multiple: !1,
                active: !0,
                selItem: 0,
                children: [ {
                    name: "不限",
                    value: "null+null",
                    active: !0,
                    _endKey: "MinHouseArea+MaxHouseArea",
                    Multiple: !1
                }, {
                    name: "90m²及以下",
                    value: "90+null",
                    active: !1,
                    _endKey: "MinHouseArea+MaxHouseArea",
                    Multiple: !1
                }, {
                    name: "91m²-119m²",
                    value: "91+119",
                    active: !1,
                    _endKey: "MinHouseArea+MaxHouseArea",
                    Multiple: !1
                }, {
                    name: "120m²-143m²",
                    value: "120+143",
                    active: !1,
                    _endKey: "MinHouseArea+MaxHouseArea",
                    Multiple: !1
                }, {
                    name: "144m²及以上",
                    value: "null+144",
                    active: !1,
                    _endKey: "MinHouseArea+MaxHouseArea",
                    Multiple: !1
                } ]
            }, {
                name: "居室",
                Multiple: !1,
                active: !1,
                selItem: 0,
                children: [ {
                    name: "不限",
                    value: "0",
                    active: !0,
                    _endKey: "RoomNumber",
                    Multiple: !1
                }, {
                    name: "2室及以下",
                    value: "2",
                    active: !1,
                    _endKey: "RoomNumber",
                    Multiple: !1
                }, {
                    name: "3室",
                    value: "3",
                    active: !1,
                    _endKey: "RoomNumber",
                    Multiple: !1
                }, {
                    name: "4室",
                    value: "4",
                    active: !1,
                    _endKey: "RoomNumber",
                    Multiple: !1
                }, {
                    name: "5室及以上",
                    value: "5",
                    active: !1,
                    _endKey: "RoomNumber",
                    Multiple: !1
                } ]
            } ]
        }, v = {
            name: "更多",
            selName: "",
            active: !1,
            Multiple: !0,
            selItem: 0,
            extrainfo: "地铁盘：距离地铁1km，步行10分钟内；近地铁：距离地铁1-1.5km，步行15分钟",
            children: [ {
                name: "距离地铁",
                active: !1,
                selItem: 0,
                Multiple: !0,
                children: [ {
                    name: "地铁盘",
                    _endKey: "SubwayStatus",
                    value: "1",
                    active: !1,
                    Multiple: !1
                }, {
                    name: "近地铁",
                    _endKey: "SubwayStatus",
                    value: "2",
                    active: !1,
                    Multiple: !1
                } ]
            }, {
                name: "销售状态(多选)",
                Multiple: !0,
                active: !1,
                selItem: 0,
                children: [ {
                    name: "待售",
                    value: 6,
                    active: !1,
                    Multiple: !0,
                    _endKey: "SalesStatus"
                }, {
                    name: "即将预售",
                    value: 0,
                    active: !1,
                    Multiple: !0,
                    _endKey: "SalesStatus"
                }, {
                    name: "即将登记",
                    value: 1,
                    Multiple: !0,
                    active: !1,
                    _endKey: "SalesStatus"
                }, {
                    name: "正在登记",
                    value: 2,
                    active: !1,
                    Multiple: !0,
                    _endKey: "SalesStatus"
                }, {
                    name: "即将摇号",
                    value: 3,
                    active: !1,
                    Multiple: !0,
                    _endKey: "SalesStatus"
                }, {
                    name: "即将选房",
                    value: 4,
                    active: !1,
                    Multiple: !0,
                    _endKey: "SalesStatus"
                }, {
                    name: "已选房",
                    value: 5,
                    active: !1,
                    Multiple: !0,
                    _endKey: "SalesStatus"
                }, {
                    name: "在售",
                    value: 7,
                    active: !1,
                    Multiple: !0,
                    _endKey: "SalesStatus"
                } ]
            }, {
                name: "开盘时间",
                active: !1,
                Multiple: !0,
                selItem: 0,
                children: [ {
                    name: "前三月已开",
                    value: 1,
                    active: !1,
                    Multiple: !1,
                    _endKey: "OpenTime"
                }, {
                    name: "本月开盘",
                    value: 2,
                    active: !1,
                    Multiple: !1,
                    _endKey: "OpenTime"
                }, {
                    name: "下月开盘",
                    value: 3,
                    active: !1,
                    Multiple: !1,
                    _endKey: "OpenTime"
                } ]
            }, {
                name: "物业类型",
                active: !1,
                Multiple: !0,
                selItem: 0,
                children: [ {
                    name: "住宅",
                    value: "0",
                    active: !1,
                    Multiple: !1,
                    _endKey: "PropertyType"
                }, {
                    name: "商住",
                    value: "1",
                    active: !1,
                    Multiple: !1,
                    _endKey: "PropertyType"
                } ]
            }, {
                name: "装修类型",
                active: !1,
                Multiple: !0,
                selItem: 0,
                children: [ {
                    name: "毛坯",
                    value: "毛坯",
                    active: !1,
                    Multiple: !1,
                    _endKey: "DecorationType"
                }, {
                    name: "装修",
                    value: "装修",
                    active: !1,
                    Multiple: !1,
                    _endKey: "DecorationType"
                } ]
            }, {
                name: "是否限购",
                Multiple: !0,
                selItem: 0,
                children: [ {
                    name: "限购",
                    _endKey: "IsPurchaseLimit",
                    value: !0,
                    active: !1,
                    Multiple: !1
                }, {
                    name: "不限购",
                    _endKey: "IsPurchaseLimit",
                    value: !1,
                    active: !1,
                    Multiple: !1
                } ]
            } ]
        }, m = [ {
            name: "全部",
            value: "",
            active: !0,
            _endKey: "",
            Multiple: !1,
            _key: e()
        }, {
            name: "近期开盘",
            value: "0,1,2,3,4",
            active: !1,
            _endKey: "SalesStatus",
            Multiple: !0,
            _key: e()
        }, {
            name: "地铁盘",
            value: "1",
            active: !1,
            Multiple: !0,
            _endKey: "SubwayStatus",
            _key: e()
        }, {
            name: "90㎡内",
            value: "90+null",
            active: !1,
            Multiple: !0,
            _endKey: "MinHouseArea+MaxHouseArea",
            _key: e()
        }, {
            name: "300万内",
            value: "3000000+null",
            active: !1,
            Multiple: !0,
            _endKey: "MinTotalPrice+MaxTotalPrice",
            _key: e()
        } ], M = [ t, u, c, v ], r = {
            HangZhou: [ m[0], m[1], m[2], m[3], m[4] ],
            normal: [ m[0], m[1], m[3] ],
            QuanZhou: [ m[0], m[1], m[2], m[3] ]
        }, s = {
            HangZhou: [ M[0], M[1], M[2], M[3] ],
            normal: [ M[0], M[1], M[2], M[3] ],
            QuanZhou: [ M[0], M[1], M[2], M[3] ]
        };
    }
};