module.exports = {
    getShortCode: function(n, t) {
        var u = n.RealtyConsultantInfo, l = t.CityId;
        if (u && u.Buildings.length) {
            var o = u.Buildings.filter(function(n) {
                return n.CityId === l;
            });
            return o.length ? o[0].ShortCode : "";
        }
        return "";
    },
    judgeConsultantIntoCurrentCity: function(n) {
        var t = getApp().globalData, u = t.consultantInfo, l = t.userInfo, o = null;
        return l && l.RealtyConsultantInfo ? o = l.RealtyConsultantInfo.Buildings : u && u.Buildings && (o = u.Buildings), 
        !!o && o.some(function(t) {
            return n === t.CityId;
        });
    },
    judgeBuildingBelongConsultant: function(n) {
        var t = getApp().globalData, u = t.consultantInfo, l = t.userInfo, o = null;
        return l && l.RealtyConsultantInfo ? o = l.RealtyConsultantInfo.Buildings : u && u.Buildings && (o = u.Buildings), 
        !!o && o.some(function(t) {
            return n === t.BuildingId;
        });
    }
};