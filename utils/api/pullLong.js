var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
}, t = {
    getLongPullAdvert: "/advertext/v3.1/longpage/{advertId}",
    getLongPullAvatar: "/advertext/v3.1/longpage/{advertId}/avatars",
    recordLongpageClick: "/advertext/v3.1/longpage/{advertId}/click",
    recordLongpageAppointment: "/advertext/v3.1/longpage/{advertId}/appointment"
};

module.exports = e({}, t);