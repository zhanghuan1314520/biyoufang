var r = Object.assign || function(r) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
}, e = {
    loginInLogin: "/member/v3.3/login/weixin/{code}"
};

module.exports = r({}, e);