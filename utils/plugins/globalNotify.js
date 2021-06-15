function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = function() {
    function n() {
        t(this, n), this.list = {};
    }
    return e(n, [ {
        key: "instance",
        value: function() {
            return this._instance || (this._instance = new n()), this._instance;
        }
    }, {
        key: "on",
        value: function(t, e) {
            this.list[t] || (this.list[t] = []), this.list[t].push(e);
        }
    }, {
        key: "emit",
        value: function(t) {
            var e = this, n = [].shift.call(arguments), i = this.list[n];
            if (!i || 0 === i.length) return !1;
            var r = [].concat(Array.prototype.slice.call(arguments));
            i.forEach(function(t) {
                t.apply(e, r);
            });
        }
    }, {
        key: "remove",
        value: function(t, e) {
            var n = this.list[t];
            if (!n) return !1;
            e ? n.forEach(function(t, i) {
                t === e && n.splice(i, 1);
            }) : n && (n.length = 0);
        }
    } ]), n;
}();

exports.default = new n();