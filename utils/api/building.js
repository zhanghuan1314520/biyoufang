var i = Object.assign || function(i) {
    for (var d = 1; d < arguments.length; d++) {
        var n = arguments[d];
        for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (i[t] = n[t]);
    }
    return i;
}, d = {
    getHomeStatisticsInBld: "/building/v3.0/buildings/homepage/statistics",
    getHomeStatisticsDistrict: "/building/v3.0/buildings/homepage/statistics/district",
    getHomeStatisticsStatus: "/building/v3.0/buildings/homepage/statistics/status",
    getBuildingMoreDetailInBld: "/building/v3.2/building/{buildingId}/base",
    getFacilityCountInBld: "/building/v3.0/building/{buildingId}/facilitycount",
    getSurroundingFacilityInBld: "/building/v3.0/building/{buildingId}/facilities",
    getRecentlyProjectInBld: "/building/v3.0/building/{buildingId}/recentlyproject",
    getBuildingsAroundInBld: "/building/v3.0/buildings/periphery/{buildingId}",
    getBuildingsAsPriceInBld: "/building/v3.0/buildings/price/{projectId}",
    getBuildingArticlesInBld: "/article/v3.0/{userSystem}/building/{buildingId}/article/newest",
    getNewsListInBld: "/building/v3.0/building/{buildingId}/news",
    getBuildingArticlesInbld: "/article/v3.0/{userSystem}/building/{buildingId}/article",
    getHistoryProjectInBld: "/building/v3.0/building/{buildingId}/historytrend",
    getPricePerRoomInBld: "/building/v3.0/project/{projectId}/room",
    getRoomInfoDetailInBld: "/building/v3.0/project/room/{roomId}",
    getBuildingListInBuilding: "/building/v3.0/buildings",
    getNoLotteryListInBuilding: "/building/v3.0/buildings/noneedyaohao",
    getBuildingByStatusInbuilding: "/building/v3.0/buildings/status/{projectStatus}",
    getDetailInBld: "/building/v3.0/realtyconsultant/building/news/{快讯id}",
    searchBuildingInBuilding: "/building/v3.0/buildings/search",
    searchBuildingUseConsultant: "/building/v3.0/building/search",
    getLotteryresultnBuilding: "/building/v3.0/buildings/lotteryresult/{projectId}",
    getBuildingMapInbuilding: "/building/v3.0/buildings/map",
    getBuildingSubwayInbuilding: "/building/v3.0/buildings/map?forSubway=true",
    getBUildingImmedInBld: "/building/v3.0/buildings/dengjibao",
    getLastHotBuildingInBld: "/advert/v3.1/building/search/hot",
    getHistorySearchInBld: "/building/v3.0/building/search/record/{openId}",
    recordUserSearchInBld: "/building/v3.0/building/search/record",
    lotteryBuildInBld: "/building/v3.0/project/{projectId}/lottery",
    getListByDistrictId: "/building/v3.0/buildings/district/{districtId}",
    getBuildingArticeShare: "/building/v3.0/building/{buildingId}/share"
};

module.exports = i({}, d);