Component({
    properties: {
        buildingInfo: {
            type: Object,
            value: {}
        },
        project: {
            type: Object,
            value: {}
        },
        projectStatusName: {
            type: String,
            value: ""
        },
        versionType: {
            type: Number,
            value: null
        }
    },
    data: {
        renderMap: {
            "即将摇号": !0,
            "已选房": !0,
            "即将选房": !0
        }
    },
    lifetimes: {
        attached: function() {}
    },
    methods: {}
});