module.exports = Behavior({
    methods: {
        observerViewPort: function(e) {
            var t = e.selector, o = e.callback, r = e.options, c = void 0 === r ? {
                observeAll: !0
            } : r, i = e.margins, s = void 0 === i ? {} : i;
            wx.createIntersectionObserver(this, c).relativeToViewport(s).observe(t, function(e) {
                o(e);
            });
        },
        getElementSize: function(e) {
            var t = e.select, o = e.callback, r = e.selectType, c = void 0 === r ? "select" : r, i = wx.createSelectorQuery();
            i[c](t).boundingClientRect(), i.selectViewport(), i.exec(function(e) {
                o(e);
            });
        }
    }
});