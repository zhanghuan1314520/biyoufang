function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
}, n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), i = function() {
    function i(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 750;
        if (e(this, i), !t) throw new Error("ctx 必须存在,开启canvas压缩");
        this.ctx = wx.createCanvasContext(t), this.ctxName = t, this.sizeFit = n, this.platform = wx.getSystemInfoSync().platform || "devtools", 
        this.newsImages = [], this.mode = "production", this.wxCompressFlag = !1, this.quality = 50, 
        this.size = 2.5;
    }
    return n(i, [ {
        key: "changeMode",
        value: function(e) {
            return this.mode = "develop" === e ? "develop" : "production", this;
        }
    }, {
        key: "changeSizeFit",
        value: function(e) {
            return this.sizeFit = e, this;
        }
    }, {
        key: "changeWxCompressFlag",
        value: function(e) {
            return this.wxCompressFlag = e, this;
        }
    }, {
        key: "changeSize",
        value: function(e) {
            return this.size = e, this;
        }
    }, {
        key: "chooseImage",
        value: function(e) {
            var n = this;
            return this.newsImages = [], this.promiseify(wx.chooseImage, t({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ]
            }, e)).then(function(e) {
                return n.compressImage(e);
            }).then(function() {
                return n.newsImages;
            }).catch(function(e) {
                console.log(e), "chooseImage:fail cancel" !== e.errMsg && wx.showToast({
                    title: "压缩图片出错",
                    icon: "none",
                    duration: 1e3
                });
            });
        }
    }, {
        key: "compressImage",
        value: function(e) {
            var t = this;
            if (e && e.tempFiles) return this.promiseify().then(function() {
                return t.getImageAndCompress(e.tempFiles, 0);
            });
        }
    }, {
        key: "getImageAndCompress",
        value: function(e, t) {
            var n = this, i = e[t] && e[t].path;
            if (i) return this.promiseify(wx.getFileInfo, {
                filePath: i
            }).then(function(i) {
                return n.doResloveImage(i, e, t);
            });
        }
    }, {
        key: "doResloveImage",
        value: function(e, t, n) {
            var i = this, s = t[n] && t[n].path;
            return "develop" === this.mode && (console.log("正在进行第" + n + "张图片"), console.log("图片压缩前大小：", parseInt(e.size / 1024) + "k")), 
            e.size > 1024 * this.size * 1024 ? this.promiseify(wx.getImageInfo, {
                src: s
            }).then(function(e) {
                if (e.width < 7e3 && e.height < 7e3) {
                    var o = i.ctx, r = i.getFitSize(e), a = r.width, u = r.height;
                    return o.clearRect(0, 0, i.sizeFit, i.sizeFit), o.drawImage(s, 0, 0, a, u), i.drawPromise(o, a, u, t, n);
                }
                return wx.showToast({
                    title: "图片太大,已自动过滤",
                    icon: "none",
                    duration: 1e3
                }), i.getImageAndCompress(t, n + 1);
            }) : this.wxCompressFlag && "devtools" !== this.platform ? this.wxCom(s).then(function(e) {
                return i.newsImages.push(e), i.getImageAndCompress(t, n + 1);
            }) : (this.newsImages.push({
                path: s
            }), this.getImageAndCompress(t, n + 1));
        }
    }, {
        key: "getFitSize",
        value: function(e) {
            var t = e.width, n = e.height, i = this.sizeFit;
            if (t < i && n < i) return {
                width: t,
                height: n
            };
            var s = void 0;
            return t > n ? (s = t / i, {
                width: i,
                height: ~~(n / s)
            }) : (s = n / i, {
                width: ~~(t / s),
                height: i
            });
        }
    }, {
        key: "getlocalImage",
        value: function(e, t, n, i) {
            var s = this;
            return this.delay(500).then(function() {
                return s.getImage(e, t, n, i);
            });
        }
    }, {
        key: "getImage",
        value: function(e, t, n, i) {
            var s = this;
            return this.promiseify(wx.canvasToTempFilePath, {
                x: 0,
                y: 0,
                width: e,
                height: t,
                destWidth: e,
                destHeight: t,
                canvasId: this.ctxName,
                quality: this.quality / 100,
                fileType: "jpg"
            }, 1).then(function(e) {
                return "develop" === s.mode && (console.log("正在进行canvas 压缩"), s.promiseify(wx.getFileInfo, {
                    filePath: e.tempFilePath
                }).then(function(e) {
                    console.log("图片大小", parseInt(e.size / 1024) + "k");
                })), s.wxCompressFlag && "devtools" !== s.platform ? s.wxCom(e.tempFilePath).then(function(e) {
                    return s.newsImages.push(e), s.getImageAndCompress(n, i + 1);
                }) : (s.newsImages.push({
                    path: e.tempFilePath
                }), s.getImageAndCompress(n, i + 1));
            });
        }
    }, {
        key: "promiseify",
        value: function(e, n, i) {
            return new Promise(function(i, s) {
                e ? e(t({
                    success: function(e) {
                        i(e);
                    },
                    fail: function(e) {
                        s(e);
                    }
                }, n)) : i();
            });
        }
    }, {
        key: "wxCom",
        value: function(e) {
            return this.promiseify(wx.compressImage, {
                src: e,
                quality: this.quality
            }).then(function(e) {
                return {
                    path: e.tempFilePath
                };
            });
        }
    }, {
        key: "delay",
        value: function(e) {
            return new Promise(function(t) {
                setTimeout(function() {
                    t();
                }, e);
            });
        }
    }, {
        key: "drawPromise",
        value: function(e, t, n, i, s) {
            var o = this;
            return new Promise(function(t) {
                e.draw(!1, setTimeout(function() {
                    t();
                }, 100));
            }).then(function() {
                return o.getlocalImage(t, n, i, s);
            });
        }
    } ]), i;
}();

exports.default = i;