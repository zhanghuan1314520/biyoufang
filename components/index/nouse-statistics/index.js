require("../../../config.js");

var t = require("../../../utils/index.js");

getApp();

Component({
    properties: {
        statsNavList: {
            type: Array,
            value: []
        }
    },
    data: {
        fontColor: [ "#5005FF", "#F54137", "#00C855", "#1E41FF", "#FF9100" ],
        bgColor: [ "#EBE1FA", "#FFEFEA", "#E4FFF1", "#E9EDFF", "#FAF0E1" ]
    },
    methods: {
        goListPage: function(a) {
            var e = a.currentTarget.dataset || null;
            if (e) {
                var s = this.data.statsNavList[e.id] || null, i = "/pages/list/list?status=" + s.status + "&num=" + s.iconText;
                t.navigatePage({
                    url: i
                });
            }
        },
        getFollowFormid: function(a) {
            t.getFollowFormid(a.detail.formId);
        }
    }
});