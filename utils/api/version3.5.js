module.exports = {
    getBuildingDetailInBld: "/building/v3.5/building/{buildingId}",
    getProjectDetailByProjectCodeInBld: "/building/v3.5/building/{buildingCode}/project/{projectCode}",
    getProjectDetailByBuildingCodeInBld: "/building/v3.5/building/code/{buildingCode}",
    buildingSubscriptionApi: "/follow/v3.5/subscription/building/{buildingId}",
    cancelBuildingSubscriptionApi: "/follow/v3.5/subscription/{subscriptionId}",
    getHouseTypesInBld: "/building/v3.5/building/{buildingId}/houseTypes",
    realtyconsultantBuildings: "/member/v3.5/realtyconsultant/{consultantId}/buildings",
    additioninfoConsultantAPI: "/message/v3.5/consultant/{consultantId}/read/{messageType}",
    myAttentionBuildinginFlw: "/follow/v3.5/follow/building",
    buildingsBrandAPI: "/building/v3.5/buildings/brand/{brandId}",
    articleShareDetailAPI: "/article/v3.5/article/{id}/poster",
    articleShareDetailByCodeAPI: "/article/v3.5/article/{id}/shortcode",
    lotteryBuildByCodeInBld: "/building/v3.5/project/{shortCode}/registrations/statistics/code",
    getNewMsgNum: "/message/v3.5/message/newest",
    recordArticleShareInRec: "/track/v3.5/article/{articleId}/share"
};