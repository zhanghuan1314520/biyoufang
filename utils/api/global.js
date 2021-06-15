var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && (a[c] = t[c]);
    }
    return a;
}, e = {
    checkToken: "/member/v3.0/checktoken",
    checkAudit: "/config/v3.0/weixin/checkaudit",
    getAreaInfoInGlobal: "/basicdata/v3.0/district",
    getSubwayInGlobal: "/basicdata/v3.0/subway",
    getLoanFormula: "/config/v3.0/loanconfig"
};

module.exports = a({}, e);