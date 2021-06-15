var e = Object.assign || function(e) {
    for (var s = 1; s < arguments.length; s++) {
        var t = arguments[s];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
}, s = {
    fetchMimcTokenInMsg: "/message/v3.0/mimc/fetchToken",
    getTemplateMessageIdInMsg: "/message/v3.0/templateMessage/templateids",
    getMyMessageInMsg: "/message/v3.0/message",
    getSystemMsg: "/message/v3.5/message/system",
    getSubMsg: "/message/v3.5/message/subscription",
    templateMessageInMsg: "/message/v3.0/templateMessage/subscription",
    bulkSubscriptionImMsg: "/message/v3.3/templatemessage/chatnotices/subscription",
    pushMessageInMsg: "/message/v3.0/mimc/push",
    getChatSubInMsg: "/Message/v3.0/templateMessage/replyreminder"
};

module.exports = e({}, s);