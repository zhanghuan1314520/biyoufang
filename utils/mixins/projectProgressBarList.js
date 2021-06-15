module.exports = Behavior({
    methods: {
        formatProgressBarList: function(e) {
            var t = e.VersionType, a = e.ProjectStatus, i = e.LicenseTime, n = e.BuyStartTime, m = e.LotteryTime, o = e.FillRegisterEndTime, l = e.RegisterStartTime, s = e.RegisterEndTime, r = e.IsFixedTime, u = e.NeedYaohao, d = this.initProgressBarList(t), T = Date.now(), f = i && new Date(i.replace(/[\.\-]/g, "/")).getTime() || 0, y = n && new Date(n.replace(/[\.\-]/g, "/")).getTime() || 0, c = m && new Date(m.replace(/[\.\-]/g, "/")).getTime() || 0, p = o && new Date(o.replace(/[\.\-]/g, "/")).getTime() || 0, S = l && new Date(l.replace(/[\.\-]/g, "/")).getTime() || 0, g = s && new Date(s.replace(/[\.\-]/g, "/")).getTime() || 0;
            if (d.forEach(function(a) {
                if (e[a.key] && (a.dateTime = e[a.key].replace(/-/g, ".").slice(5, 10)), "LotteryTime" === a.key) e[a.key] && (a.dateTime = e[a.key].replace(/-/g, ".").slice(5, -3)); else if ("FillRegisterEndTime" === a.key) e[a.key] && (a.dateTime = e[a.key].replace(/-/g, ".").slice(5, 16)); else if ("RegisterEndTime" === a.key) {
                    if (l && s) {
                        var i = l.replace(/-/g, "."), n = s.replace(/-/g, ".");
                        a.dateTime = 1 === t && r ? i.slice(5, 10) + "-" + n.slice(5, 10) + " " + i.slice(11, 16) + "-" + n.slice(11, 16) : i.slice(5, 16) + " - " + n.slice(5, 16);
                    }
                    l && !s && (a.dateTime = l.replace(/-/g, ".").slice(5, 16) + " - 时间待定");
                }
                a.dateTime = a.dateTime ? a.dateTime : "时间待定";
            }), 0 === t) {
                if (y && T >= y || 5 === a) return d.forEach(function(e) {
                    "LotteryTime" === e.key && "时间待定" === e.dateTime && (e.name = "无需摇号", e.dateTime = ""), 
                    e.doneStatus = "full";
                }), d;
                if (m && (c && T > c || 4 === a || 6 === a)) return d.forEach(function(e) {
                    e.doneStatus = "full";
                }), d[4].doneStatus = "half", d;
                if (p && T > p || 3 === a) return d.forEach(function(e) {
                    e.doneStatus = "full";
                }), d[4].doneStatus = "half", d[3].doneStatus = "half", d;
                if (g && T > g || 2 === a) return d[0].doneStatus = "full", d[1].doneStatus = "full", 
                d;
                if (f && T > f || S && T > S || 1 === a) return d[0].doneStatus = "full", d;
            } else 2 === t ? 0 !== y && T > y ? d.map(function(e) {
                e.doneStatus = "full";
            }) : 0 !== f && T > f && (d[0].doneStatus = "full") : 1 === t && (0 !== y && T > y ? d.map(function(e) {
                "LotteryTime" !== e.key || u || (e.name = "无需摇号", e.dateTime = ""), e.doneStatus = "full";
            }) : 0 !== c && T > c ? d.map(function(e, t) {
                t < 3 && (e.doneStatus = "full");
            }) : 0 !== g && T > g ? d.map(function(e, t) {
                t < 2 && (e.doneStatus = "full");
            }) : 0 !== f && T > f && (d[0].doneStatus = "full"));
            return d;
        },
        initProgressBarList: function(e) {
            return [ [ {
                key: "LicenseTime",
                name: "领取预售证",
                type: "top",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "RegisterEndTime",
                name: "意向登记",
                type: "bottom",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "FillRegisterEndTime",
                name: "补资料",
                type: "top",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "LotteryTime",
                name: "摇号",
                type: "bottom",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "BuyStartTime",
                name: "选房",
                type: "top",
                doneStatus: "half",
                dateTime: "时间待定"
            } ], [ {
                key: "LicenseTime",
                name: "领取预售证",
                type: "top",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "RegisterEndTime",
                name: "认筹时间",
                type: "bottom",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "LotteryTime",
                name: "摇号时间",
                type: "top",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "BuyStartTime",
                name: "选房时间",
                type: "bottom",
                doneStatus: "half",
                dateTime: "时间待定"
            } ], [ {
                key: "LicenseTime",
                name: "领取预售证",
                type: "top",
                doneStatus: "half",
                dateTime: "时间待定"
            }, {
                key: "BuyStartTime",
                name: "选房时间",
                type: "bottom",
                doneStatus: "half",
                dateTime: "时间待定"
            } ] ][e];
        }
    }
});