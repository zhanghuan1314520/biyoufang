var e = require("../../../config.js"), a = require("../../../utils/index.js");

Component({
    properties: {},
    data: {
        bgImg: {
            cg1: e.imgRootUrl + "/images_wx/default_graph/home_img_cg1@3x.png",
            cg2: e.imgRootUrl + "/images_wx/default_graph/home_img_cg2@3x.png",
            cg3: e.imgRootUrl + "/images_wx/default_graph/home_img_cg3@3x.png"
        }
    },
    methods: {
        handTap: function(e) {
            var t = "";
            switch (e.currentTarget.dataset.type) {
              case "1":
                t = "/pages/list/list?status=9";
                break;

              case "2":
                t = "/pages/list/list?status=10";
                break;

              case "3":
                t = "/pck_advert/brand-pavilion/index";
            }
            t && a.navigatePage({
                url: t
            });
        }
    }
});