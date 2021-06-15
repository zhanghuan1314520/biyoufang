module.exports = Behavior({
    methods: {
        formatMyResult: function(t) {
            return t.map(function(t) {
                t.info = {};
                var e = t.info;
                e.id = t.RegistrationId, e.projectId = t.ProjectId, e.sequenceNo = t.LotteryNo, 
                t.RegistrationId ? t.IsGetLotteryData ? e.lotteryStatus = 2 : t.LotteryNo ? e.lotteryStatus = 3 : t.LotteryTime && (e.lotteryStatus = 1) : e.lotteryStatus = 0, 
                e.huseNumber = t.HouseNumber, e.lotteryNo = t.LotteryNo, e.projectName = t.ProjectName, 
                e.registrationName = t.Name || "暂无信息", e.registrationNo = t.RegistrationNo, e.lotteryTime = t.LotteryTime && t.LotteryTime.replace(/-/g, ".").slice(0, -3) || "暂无信息", 
                e.receiverPhone = t.PhoneNumber;
                var r = t.BuyerName && t.BuyerName.split(",") || [], o = t.BuyerIDCard && t.BuyerIDCard.split(",") || [];
                return r = r.concat(t.OtherBuyerNameList && t.OtherBuyerNameList.split(",") || []), 
                o = o.concat(t.OtherBuyerIDCardList && t.OtherBuyerIDCardList.split(",") || []), 
                e.lotteryerList = [], e._lotteryerList = [], r.forEach(function(t, i) {
                    0 === i && e._lotteryerList.push({
                        id: o[i],
                        name: r[i]
                    }), e.lotteryerList.push({
                        id: o[i],
                        name: r[i]
                    });
                }), t;
            });
        },
        formatResult: function(t, e) {
            return t.map(function(t, e) {
                t.info = {};
                var r = t.info;
                r.id = t.Id, r.sequenceNo = t.LotteryNo, t.LotteryNo && (r.lotteryStatus = 3), r.projectName = t.ProjectName, 
                r.registrationNo = t.RegistrationNo, r.projectId = t.ProjectId;
                var o = t.Name.split(","), i = t.IDNumber.split(",");
                return r.lotteryerList = [], r._lotteryerList = [], o.forEach(function(t, e) {
                    0 === e && r._lotteryerList.push({
                        id: i[e],
                        name: o[e]
                    }), r.lotteryerList.push({
                        id: i[e],
                        name: o[e]
                    });
                }), t;
            });
        }
    }
});