Component({
    properties: {
        topTabBarList: {
            type: Array,
            value: []
        }
    },
    observers: {
        topTabBarList: function(t) {
            var r = Math.round(this.properties.topTabBarList.length / 2), e = 0, i = t.filter(function(t) {
                return t.isActived;
            })[0] || null;
            i && (e = i.id > r ? i.id * i.width : -i.id * i.width) && this.setData({
                scrollLeft: e
            });
        }
    },
    data: {
        scrollLeft: 0
    },
    lifetimes: {
        attached: function() {}
    },
    methods: {
        scrollTo: function(t) {
            var r = t.currentTarget.dataset || null;
            if (r) {
                var e = this.properties.topTabBarList[r.id] || null;
                if (e) {
                    if (e.isActived) return;
                    this.triggerEvent("operateTopTabBarInfo", {
                        eventType: "scrollTo",
                        topTabBarInfo: e
                    }, {});
                }
            }
        },
        scrollToLower: function(t) {}
    }
});