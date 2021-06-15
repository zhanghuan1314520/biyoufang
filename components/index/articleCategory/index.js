var t = require("../../../utils/index");

Component({
    properties: {
        list: {
            type: Array,
            value: []
        }
    },
    data: {
        activeIndex: 0,
        currentIndex: 0,
        startPlay: !0,
        bgColor: [ "background: linear-gradient(360deg,rgba(178,126,81,1) 0%,rgba(205,163,109,1) 100%);", "background: linear-gradient(360deg,rgba(37,104,186,1) 0%,rgba(91,140,199,1) 100%);", "background: linear-gradient(360deg,rgba(168,34,28,1) 0%,rgba(211,40,32,1) 100%);" ],
        textColor: [ "#B27E51", "#3875BF", "#A8221C" ]
    },
    methods: {
        handleTapClick: function(t) {
            var a = this;
            this.setData({
                currentIndex: t.currentTarget.dataset.index,
                startPlay: !1
            }), clearTimeout(this.data.startPlayTimerId), this.data.startPlayTimerId = setTimeout(function() {
                a.setData({
                    startPlay: !0
                });
            }, 500);
        },
        swipeChange: function(t) {
            this.setData({
                activeIndex: t.detail.current
            });
        },
        handleSecondCategorytap: function(a) {
            var e = a.currentTarget.dataset, r = e.id, i = void 0 === r ? "" : r, n = e.title, d = void 0 === n ? "" : n;
            t.navigatePage({
                url: "/pck_common/acticle_list/index?title=" + d + "&id=" + i
            });
        },
        catchTouchMove: function() {}
    }
});