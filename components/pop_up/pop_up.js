Component({
    properties: {
        pageData: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        popClickYes: function() {
            var t = {
                type: "yes"
            };
            this.triggerEvent("popClick", t);
        },
        popClickNo: function() {
            var t = {
                type: "no"
            };
            this.triggerEvent("popClick", t);
        }
    }
});