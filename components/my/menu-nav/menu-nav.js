getApp();

Component({
    properties: {
        menuNavList: {
            type: Array,
            value: []
        },
        userInfo: {
            type: Object,
            value: {}
        }
    },
    methods: {
        operateMenuNavInfo: function(e) {
            var t = e.detail.recordParams || e.currentTarget.dataset, a = t.id;
            switch (t.name) {
              case "我的楼盘":
                this.triggerEvent("operateParent", {
                    eventType: "myBuilding"
                }, {});
                break;

              default:
                var n = this.properties.menuNavList[a] || null;
                n && this.triggerEvent("operateMenuNavInfo", {
                    eventType: "goPage",
                    menuNavInfo: n
                }, {});
            }
        },
        noop: function() {}
    }
});