var e = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
};

module.exports = e({}, require("./rqeuest/index"), require("./sharePage/index"), require("./formatTime/index"), require("./formatData/index"), require("./plateform/index"), require("./subscribeMessage/index"), require("./eventTrack/index"), require("./apiRequest/index"), {
    debounce: function(e, r) {
        var t = null;
        return function() {
            var i = this, n = Array.prototype.slice.call(arguments);
            null !== t && clearTimeout(t), t = setTimeout(function() {
                e.apply(i, n);
            }, r);
        };
    },
    throttle: function(e, r) {
        var t = null;
        return function() {
            var i = Array.prototype.slice.call(arguments);
            t || (e.apply(this, i), t = setTimeout(function() {
                t = null;
            }, r));
        };
    }
});