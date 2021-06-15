var t = Object.assign || function(t) {
    for (var o = 1; o < arguments.length; o++) {
        var e = arguments[o];
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }
    return t;
}, o = {
    getQuotesAbstractInTool: "/tool/v3.0/housingmarket",
    getLotteryLatestInTool: "/tool/v3.0/project/lottery",
    getRegistrationsInTool: "/building/v3.0/project/{projectId}/registrations/statistics",
    getLotteryRejestInTool: "/tool/v3.0/project/{projectId}/registrations",
    getLotteryResultInTool: "/Tool/V3.0/project/registrations/{registrationId}"
};

module.exports = t({}, o);