Component({
    properties: {
        str: {
            type: String,
            value: ""
        },
        key: {
            type: String,
            value: ""
        },
        position: {
            type: Number,
            value: 0
        }
    },
    methods: {
        getHighlightStrArray: function(t, e) {
            return t.replace(new RegExp("" + e, "g"), "%%" + e + "%%").split("%%");
        }
    },
    observers: {
        "str,key": function(t, e) {
            this.setData({
                keyword: e,
                strArr: this.getHighlightStrArray(t, e)
            });
        }
    }
});