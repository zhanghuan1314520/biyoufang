var e = require("./pagesMap");

module.exports = {
    extractShareFn: function(r) {
        var t = getCurrentPages(), a = t[t.length - 1];
        return e[a.route].call(a, r);
    },
    getShareParams: function(e) {
        return {
            isShare: e.isShare || 0,
            cityId: e.cityId || null
        };
    }
};