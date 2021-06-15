var e = require("../rqeuest/index.js").request, r = require("../../config.js");

module.exports = Behavior({
    methods: {
        recondBrokerChat: function(t) {
            var o = t.ToAccount, c = (t.ToAccountUserType, t.ChatSourceType), s = t.ConsultantId;
            return o && s && 0 !== c ? e({
                url: r.service.chatTrack,
                method: "POST",
                data: t
            }) : Promise.reject({
                msg: "缺少关键参数"
            });
        }
    }
});