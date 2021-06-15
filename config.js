function o(o) {
    var t = {
        devlopment: {
            env: "devlopment",
            mimc_appId: "2882303761517967750",
            root: "http://byf-gateway-app.dev.17dengji.com",
            imgRootUrl: "https://m.biyoufang.com",
            ossRootUrl: "https://biyoufang-test.oss-cn-hangzhou.aliyuncs.com/"
        },
        test: {
            env: "test",
            mimc_appId: "2882303761517967750",
            root: "https://test.api.biyoufang.com",
            imgRootUrl: "https://m.biyoufang.com",
            ossRootUrl: "https://biyoufang-test.oss-cn-hangzhou.aliyuncs.com/"
        },
        pre: {
            env: "pre",
            mimc_appId: "2882303761517967750",
            root: "http://api.pre.biyoufang.com",
            imgRootUrl: "https://m.biyoufang.com",
            ossRootUrl: "https://biyoufang.oss-cn-hangzhou.aliyuncs.com/"
        },
        production: {
            env: "production",
            mimc_appId: "2882303761518094312",
            root: "https://api.biyoufang.com",
            imgRootUrl: "https://m.biyoufang.com",
            ossRootUrl: "https://biyoufang.oss-cn-hangzhou.aliyuncs.com/"
        }
    };
    return t[o] || t.devlopment;
}

var t = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (o[s] = i[s]);
    }
    return o;
}, i = "production";

module.exports = {
    currentVersion: "3.12.2",
    rsKey: "4d3ca962b11b934331584f2fb66b205d",
    mimc_appId: o(i).mimc_appId,
    root: o(i).root,
    imgRootUrl: o(i).imgRootUrl,
    ossRootUrl: o(i).ossRootUrl,
    defaultCity: {
        CityId: "330100 ",
        CityName: "杭州市",
        Longitude: 120.15358,
        Latitude: 30.287458,
        VersionType: 0,
        cityName: "杭州"
    },
    service: t({}, require("./utils/api/index.js"))
};