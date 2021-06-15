var c = Object.assign || function(c) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (c[i] = r[i]);
    }
    return c;
}, e = {
    recordAdvertScanInRec: "/advert/v3.0/track/view",
    recordAdvertClickInRec: "/advert/v3.0/track/{advertId}/click",
    recordArticleScanInRec: "/article/v3.0/track/view",
    recordArticleClickInRec: "/article/v3.0/track/{articleId}/click",
    recordHosueTypeScanInRec: "/building/v3.0/track/housetype/view",
    recordHosueTypeClickInRec: "/building/v3.0/track/housetype/{houseTypeId}/click",
    recordBuildingClickInRec: "/building/v3.0/track/building/{buildingId}/click",
    recordUserDetailScanInfoInRec: "/track/v3.0/buildingpage/{buildingId}/track",
    recordScanQrCodeTrackInRec: "/advert/v3.5/scancode/track"
};

module.exports = c({}, e);