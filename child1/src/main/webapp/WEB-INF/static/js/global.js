function intAddZero(e, a) {
    for (var t = e.toString().length; a > t;)e = "0" + e, t++;
    return e
}
function toQueryPair(e, a) {
    return "undefined" == typeof a ? e : e + "=" + encodeURIComponent(null === a ? "" : String(a))
}
function toBodyString(e) {
    var a = [];
    for (var t in e) {
        var n = e[t];
        if (n && n.constructor == Array) {
            for (var r, i = [], o = 0, l = n.length; l > o; o++)r = n[o], i.push(toQueryPair(t, r));
            a = a.concat(i)
        } else a.push(toQueryPair(t, n))
    }
    return a.join("&")
}
function fillZero(e) {
    return 9 >= e ? "0" + e : "" + e
}
function chDate(e) {
    for (var a = [], t = e.split("-"), n = 0; n < t.length; n++)a.push(fillZero(t[n]));
    return a.join("-")
}
function getLocalTime(e) {
    return new Date(1e3 * parseInt(e)).toLocaleDateString().replace(/:\d{1,2}$/, " ")
}
function getLocalTimeHour(e) {
    return new Date(1e3 * parseInt(e)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
}
function getDateFormat(e) {
    var a = e || new Date;
    return a.getFullYear() + "-" + fillZero(+a.getMonth() + 1) + "-" + fillZero(a.getDate())
}
function isSupportPlaceholder() {
    var e = document.createElement("input");
    return "placeholder"in e
}
var baseUrl = "//localhost:8081", fileUrl = "//xhwCreative.adpush.cn", xadnUrl = "//xhwCreative.adpush.cn", jsssssssss = '<script sid="<%id%>" type="text/javascript" src="' + xadnUrl + '/js/xadn.js?r=.cntv.cn/adplayer/adBlockDetector/adv_index"></script>', login_session = !0;
$(function () {
    $(document.body).click(function () {
        var e = top.document;
        $(e).find(".frame-top-setting-list,.frame-info").stop(!0).slideUp("fast")
    }), $(".frame-info").click(function (e) {
        e.stopPropagation()
    }), $(document.body).keyup(function (e) {
        var a = e.keyCode ? e.keyCode : e.which;
        if (13 == a) {
            var t = $("div.yc-search-wraper").find("input:focus[type=text]");
            1 == t.length && t.next("i.yc-icon").trigger("click")
        }
    })
});
var getUrlSearch = function (e) {
    e = decodeURIComponent(e);
    var a = e.substr(e.lastIndexOf("?") + 1, e.length), t = a.split("&"), n = "{";
    return t.forEach(function (e, a) {
        var r = e.split("=");
        n += t.length - 1 == a ? '"' + r[0] + '":"' + r[1] + '"' : '"' + r[0] + '":"' + r[1] + '",'
    }), n += "}", JSON.parse(n)
}, stringToDate = function (e) {
    var a = e.split("-");
    3 != a.length && (a = e.split("/"));
    var t = new Date;
    return t.setDate(a[2]), t.setFullYear(a[0]), t.setMonth(a[1] - 1), t.setHours(0, 0, 0, 0), t
}, getDateArray = function (e) {
    for (var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], t = e && stringToDate(e), n = t.getMonth(), r = 29; 31 >= r && (t.setDate(r), t.getMonth() == n); r++)a.push(r);
    return a
}, getWeekArray = function (e, a) {
    function t(e) {
        switch (e) {
            case 0:
                return "日";
            case 1:
                return "一";
            case 2:
                return "二";
            case 3:
                return "三";
            case 4:
                return "四";
            case 5:
                return "五";
            case 6:
                return "六"
        }
    }

    var n = [], r = getDateArray(e), i = stringToDate(e);
    return r.forEach(function (e) {
        i.setDate(e), "EN" == a ? n.push(i.getDay()) : n.push(t(i.getDay()))
    }), n
}, array1Change2 = function (e, a) {
    for (var t = [], n = [], r = 1, i = e.length; i >= r; r++)n.push(e[r - 1]), r % a == 0 ? (t.push(n), n = []) : r == i && (t.push(n), n = []);
    return t
}, proportionPhoto = function (e, a, t, n) {
    if (e = Number(e), a = Number(a), t = Number(t), n = Number(n), t >= e && n >= a)return [e, a];
    var r = e / a, i = t / n;
    return r >= 1 && i >= 1 ? e / t > a / n ? [t, Math.floor(t * a / e)] : [Math.floor(e * n / a), n] : r >= 1 && 1 >= i ? [t, Math.floor(a * t / e)] : 1 >= r && i >= 1 ? [Math.floor(n * e / a), n] : 1 >= r && 1 >= i ? a / n > e / t ? [Math.floor(e * n / a), n] : [t, Math.floor(t * a / e)] : void 0
}, photoAndSwfPreview = function (e) {
    var a = proportionPhoto(e.size[0], e.size[1], e.width, e.height), t = "", n = "", r = parseGet(baseUrl + "/views/preview.html", e), i = "<a style='width: " + a[0] + "px; height: 100%; position: absolute; cursor: pointer; opacity: 0; background-color: rgb(255, 255, 255);' href='" + r + "' target='_blank'></a>";
    return e.style && (n = "top:" + (e.height - a[1]) / 2 + "px;"), t = -1 != e.src.lastIndexOf(".swf") ? i + "<object width='" + a[0] + "' height='" + a[1] + "' align='middle' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0'><param name='allowScriptAccess' value='always'><param name='movie' value='" + e.src + "'><param name='quality' value='high'><param name='bgcolor' value='#000'><param name='height' value='" + a[1] + "'><param name='width' value='" + a[0] + "'><param name='FlashVars' value='true'><param name='allowFullScreen' value='true'><param name='wmode' value='transparent'><param name='loop' value='true'><embed width='" + a[0] + "' height='" + a[1] + "' pluginspage='http://www.macromedia.com/go/getflashplayer' src='" + e.src + "' type='application/x-shockwave-flash' wmode='transparent' flashvars='false' allowfullscreen='true' loop='true' allowscriptaccess='always' bgcolor='#000' quality='high'></object>" : i + "<img src='" + e.src + "' width='" + a[0] + "' height='" + a[1] + "'>", "<div style='margin: 0 auto;position: relative;width: " + a[0] + "px;height: auto;" + n + "'>" + t + "</div>"
}, photoAndSwfPreview2 = function (e, a) {
    var t = proportionPhoto(e.size[0], e.size[1], e.width, e.height), n = "", r = "", i = parseGet(baseUrl + "/views/preview.html", e), o = "<a style='width: " + t[0] + "px; height: 100%; display:block;position: absolute; cursor: pointer; opacity: 0; background-color: rgb(255, 255, 255);' href='" + i + "' target='_blank'></a>";
    e.style && (r = "top:" + (e.height - t[1]) / 2 + "px;"), n = -1 != e.src.lastIndexOf(".swf") ? o + "<object width='" + t[0] + "' height='" + t[1] + "' align='middle' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0'><param name='allowScriptAccess' value='always'><param name='movie' value='" + e.src + "'><param name='quality' value='high'><param name='bgcolor' value='#000'><param name='height' value='" + t[1] + "'><param name='width' value='" + t[0] + "'><param name='FlashVars' value='true'><param name='allowFullScreen' value='true'><param name='wmode' value='transparent'><param name='loop' value='true'><embed width='" + t[0] + "' height='" + t[1] + "' pluginspage='http://www.macromedia.com/go/getflashplayer' src='" + e.src + "' type='application/x-shockwave-flash' wmode='transparent' flashvars='false' allowfullscreen='true' loop='true' allowscriptaccess='always' bgcolor='#000' quality='high'></object>" : o + "<img style='margin-left: 5px' src='" + e.src + "' width='" + t[0] + "' height='" + t[1] + "'>";
    var l = parseGet(baseUrl + "/views/preview.html", a), s = proportionPhoto(a.size[0], a.size[1], a.width, a.height), c = "<a style='width: " + s[0] + "px; height: 100%; display:block;position: absolute; cursor: pointer; opacity: 0; background-color: rgb(255, 255, 255);' href='" + l + "' target='_blank'></a>", m = "";
    return m = -1 != e.src.lastIndexOf(".swf") ? c + "<object width='" + s[0] + "' height='" + s[1] + "' align='middle' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0'><param name='allowScriptAccess' value='always'><param name='movie' value='" + a.src + "'><param name='quality' value='high'><param name='bgcolor' value='#000'><param name='height' value='" + s[1] + "'><param name='width' value='" + s[0] + "'><param name='FlashVars' value='true'><param name='allowFullScreen' value='true'><param name='wmode' value='transparent'><param name='loop' value='true'><embed width='" + s[0] + "' height='" + s[1] + "' pluginspage='http://www.macromedia.com/go/getflashplayer' src='" + a.src + "' type='application/x-shockwave-flash' wmode='transparent' flashvars='false' allowfullscreen='true' loop='true' allowscriptaccess='always' bgcolor='#000' quality='high'></object>" : c + "<img style='margin-left: 5px' src='" + a.src + "' width='" + s[0] + "' height='" + s[1] + "'>", "<div style='margin: 0 auto;position: relative;width: auto;height: auto;" + r + "'><div style='display: inline-block;'>" + n + "</div><div style='display: inline-block;'>" + m + "</div></div>"
};
Date.prototype.dateFormat = function (e) {
    e = e || "yyyy-MM-dd";
    var a = this.getFullYear(), t = intAddZero(this.getMonth() + 1, 2), n = intAddZero(this.getDate(), 2), r = intAddZero(this.getHours(), 2), i = intAddZero(this.getMinutes(), 2), o = intAddZero(this.getSeconds(), 2);
    return e.replace("yyyy", a).replace("MM", t).replace("dd", n).replace("HH", r).replace("mm", i).replace("ss", o)
}, Date.prototype.getLastDate = function () {
    var e = this.getDate();
    return this.calendar(1, -(+e - 1)).calendar(2, 1).calendar(1, -1), this
}, Date.prototype.calendar = function (e, a) {
    switch (e) {
        case 1:
            var t = this.getDate();
            return this.setDate(t + a), this;
        case 2:
            var n = this.getMonth();
            return this.setMonth(n + a), this;
        case 3:
            var r = this.getFullYear();
            return this.setFullYear(r + a), this;
        case 4:
            var i = this.getHours();
            return this.setHours(i + a), this;
        case 5:
            var o = this.getMinutes();
            return this.setMinutes(o + a), this;
        case 6:
            var l = this.getSeconds();
            return this.setSeconds(l + a), this
    }
}, Date.differDate = function (e, a) {
    return !(e instanceof Date) && (e = new Date(e)), !(a instanceof Date) && (a = new Date(a)), Math.ceil((a.getTime() - e.getTime()) / 864e5)
}, Date.differMonth = function (e, a) {
    return !(e instanceof Date) && (e = new Date(e)), !(a instanceof Date) && (a = new Date(a)), a.getMonth() - e.getMonth()
}, Date.stringForTime = function (e) {
    var a = e.split(""), t = [];
    return a.forEach(function (e, a) {
        "1" === e && t.push(intAddZero(a, 2) + ":00-" + intAddZero(a, 2) + ":59")
    }), t
}, Date.fullMonth = function (e, a) {
    var t = e, n = a;
    !(e instanceof Date) && (e = new Date(e)), !(a instanceof Date) && (a = new Date(a));
    var r = e.getDate(), i = a.getDate(), o = Date.differDate(e, a) + 1, l = e.getMonth(), s = a.getMonth(), c = new Date(t).getLastDate().getDate(), m = new Date(n).getLastDate().getDate();
    return e.getFullYear != a.getFullYear ? !0 : s - l >= 2 ? !0 : s - l == 0 ? o >= c : s - l == 1 && (1 == r || m == i)
};
var createArray = function (e, a) {
    for (var t = [], n = 0; e > n; n++)t.push(a);
    return t
}, arrayFilter = function (e) {
    var a = [];
    return e.forEach(function (e) {
        e && a.push(e)
    }), a
}, countElement = function (e, a) {
    var t = 0;
    return e.forEach(function (e) {
        e == a && t++
    }), t
}, containElement = function (e, a) {
    for (var t = 0; t < e.length; t++)if (e[t] === a)return !0;
    return !1
}, getFrontElement = function (e, a) {
    for (var t = [], n = 0; a > n; n++) {
        if (!e[n])return t;
        t.push(e[n])
    }
    return t
}, getFirstOb = function (e) {
    if (e)for (var a in e)return a
}, getSearch = function (e) {
    var a = new RegExp("(?:^|&)" + e + "=([^&]*)(?:&|$)", "i");
    return ((location.search.split("?")[1] || "").match(a) || [])[1] || ""
}, parseGet = function (e, a) {
    var t, n = "";
    for (t in a)a.hasOwnProperty(t) && (n += t + "=" + a[t] + "&");
    return e + "?" + n + "_=" + 1 * new Date
}, YcSessionStorage = function (e, a, t) {
    t instanceof Array && t.forEach(function (e) {
        delete a[e]
    }), window.sessionStorage.setItem(e, JSON.stringify(a))
}, exportFun = function (e, a) {
    var t = 0;
    for (var n in a)a[n] || (e.splice(t, 1), --t), t++
}, isFunction = function (e) {
    return e instanceof Function
}, isArray = function (e) {
    return e instanceof Array
};
!function () {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    Math.uuid = function (a, t) {
        var n, r = e, i = [];
        if (t = t || r.length, a)for (n = 0; a > n; n++)i[n] = r[0 | Math.random() * t]; else {
            var o;
            for (i[8] = i[13] = i[18] = i[23] = "-", i[14] = "4", n = 0; 36 > n; n++)i[n] || (o = 0 | 16 * Math.random(), i[n] = r[19 == n ? 3 & o | 8 : o])
        }
        return i.join("")
    }, Math.uuidFast = function () {
        for (var a, t = e, n = new Array(36), r = 0, i = 0; 36 > i; i++)8 == i || 13 == i || 18 == i || 23 == i ? n[i] = "-" : 14 == i ? n[i] = "4" : (2 >= r && (r = 33554432 + 16777216 * Math.random() | 0), a = 15 & r, r >>= 4, n[i] = t[19 == i ? 3 & a | 8 : a]);
        return n.join("")
    }, Math.uuidCompact = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
            var a = 16 * Math.random() | 0, t = "x" == e ? a : 3 & a | 8;
            return t.toString(16)
        })
    }
}();
var menuContrast = {
    AdOrder: {
        1: ["QueryScheduling"],
        2: ["ViewPutOrder", "ManagePutOrders"],
        3: ["ViewDefaultOrder", "ManageDefaultOrder", "EmergencyOrderManagement", "EmergencyCreativeAudit", "EmergencyOrderReview", "DefaultOrderReview", "DefaultCreativeReview"],
        4: ["ViewContract", "ManageContract"]
    },
    ResourceManage: {
        1: ["ViewMediaChannelADSpace", "ManageMediaChannelADSpace"],
        2: ["ViewMediaChannelADSpace", "ManageMediaChannelADSpace"],
        3: ["ViewMediaChannelADSpace", "ManageMediaChannelADSpace"],
        4: ["ViewCreativeType", "ManageCreativeType"],
        5: ["ViewSize", "ManageSize"]
    },
    CustomerManage: {
        1: ["ViewCustomer", "ManageCustomer", "AuditCustomer"],
        2: ["ViewCustomer", "ManageCustomer", "AuditCustomer"]
    },
    DataReport: {
        1: ["ViewCustomerReport"],
        2: ["ViewResourceConsumptionReport"],
        3: ["ViewAdvertisingReport"],
        4: ["ViewContrastReport"],
        5: ["ViewOrderCostReport"],
        6: ["ViewContractCostReport"]
    },
    SystemSet: {
        1: ["ViewCompany", "ManageCompany"],
        2: ["ViewDepartment", "ManageDepartment"],
        3: ["ViewRole", "ManageRole"],
        4: ["ViewUser", "ManageUser"],
        5: ["ViewNotice", "ManageNotice"],
        6: ["ViewOperationLog", "ViewErrorLog"],
        7: ["ViewTolerantRate", "ManageTolerantRate"]
    }
}, ruleContrast = {
    ViewCustomer: [["ClientManage/clientManageh.html"], ["ClientManage/QualificationManage.html"]],
    ManageCustomer: [["ClientManage/clientManageh.html", "ClientManage/clientEdit.html", "ClientManage/clientAdd.html"], ["ClientManage/QualificationManage.html", "ClientManage/QualificationAdd.html", "ClientManage/QualificationEdit.html"]],
    QueryScheduling: ["ADManage/listManage.html"],
    ViewPutOrder: ["ADManage/putListManage.html", "ADManage/putCreateManage.html", "ADManage/putAdd.html", "ADManage/putEdit.html", "ADManage/putListAdd.html", "ADManage/putListEdit.html", "ADManage/putCheck.html"],
    ManagePutOrders: ["ADManage/putListManage.html", "ADManage/putCreateManage.html", "ADManage/putAdd.html", "ADManage/putEdit.html", "ADManage/putListAdd.html", "ADManage/putListEdit.html", "ADManage/putCheck.html"],
    ViewDefaultOrder: ["ADManage/trueAdvertisement.html", "ADManage/trueCreateAd.html", "ADManage/trueAdvertisementAdd.html", "ADManage/trueAdvertisementEdit.html", "ADManage/trueCreateListAdd.html", "ADManage/trueCreateListEdit.html", "ADManage/trueAdvertisementAudit.html"],
    ManageDefaultOrder: ["ADManage/trueAdvertisement.html", "ADManage/trueCreateAd.html", "ADManage/trueAdvertisementAdd.html", "ADManage/trueAdvertisementEdit.html", "ADManage/trueCreateListAdd.html", "ADManage/trueCreateListEdit.html", "ADManage/trueAdvertisementAudit.html"],
    EmergencyOrderManagement: ["ADManage/trueAdvertisement.html"],
    EmergencyCreativeAudit: ["ADManage/trueCreateAd.html"],
    EmergencyOrderReview: ["ADManage/trueAdvertisementAudit.html"],
    DefaultOrderReview: ["ADManage/trueAdvertisementAudit.html"],
    ViewMedia: ["ResourceManage/mediaManage.html", "ResourceManage/mediaCompile.html", "ResourceManage/mediaIncreased.html"],
    ManageMedia: ["ResourceManage/mediaManage.html", "ResourceManage/mediaCompile.html", "ResourceManage/mediaIncreased.html"],
    ViewChannel: ["ResourceManage/channelManage.html", "ResourceManage/channelCompile.html", "ResourceManage/channelIncrease"],
    ManageChannel: ["ResourceManage/channelManage.html", "ResourceManage/channelCompile.html", "ResourceManage/channelIncrease"],
    ViewCreativeType: ["ResourceManage/createManage.html", "ResourceManage/createCompile.html", "ResourceManage/createIncreased.html"],
    ManageCreativeType: ["ResourceManage/createManage.html", "ResourceManage/createCompile.html", "ResourceManage/createIncreased.html"],
    ViewSize: ["ResourceManage/sizeManage.html", "ResourceManage/sizeCompile.html", "ResourceManage/sizeIncreased.html"],
    ManageSize: ["ResourceManage/sizeManage.html", "ResourceManage/sizeCompile.html", "ResourceManage/sizeIncreased.html"],
    ViewADSpace: ["ResourceManage/advertiseManage.html", "ResourceManage/advertiseCompile.html", "ResourceManage/advertiseIncrease.html"],
    ManageADSpace: ["ResourceManage/advertiseManage.html", "ResourceManage/advertiseCompile.html", "ResourceManage/advertiseIncrease.html"],
    ViewCustomerReport: ["ReportManage/clientReport.html"],
    ViewResourceConsumptionReport: ["ReportManage/resourceReport.html"],
    ViewAdvertisingReport: ["ReportManage/adReport.html"],
    ViewContrastReport: ["ReportManage/contrastReport.html"],
    ViewOrderCostReport: ["ReportManage/orderConsume.html"],
    ViewContractCostReport: ["ReportManage/contractConsume.html"],
    ViewCompany: ["SystemManage/companyManage.html", "SystemManage/companyIncreased.html", "SystemManage/companyCompile.html"],
    ManageCompany: ["SystemManage/companyManage.html", "SystemManage/companyIncreased.html", "SystemManage/companyCompile.html"],
    ViewDepartment: ["SystemManage/departmentManage.html", "SystemManage/departmentIncreased.html", "SystemManage/departmentCompile.html"],
    ManageDepartment: ["SystemManage/departmentManage.html", "SystemManage/departmentIncreased.html", "SystemManage/departmentCompile.html"],
    ViewRole: ["SystemManage/roleManage.html", "SystemManage/roleIncreased.html", "SystemManage/roleCheck.html", "SystemManage/roleCompile.html"],
    ManageRole: ["SystemManage/roleManage.html", "SystemManage/roleIncreased.html", "SystemManage/roleCheck.html", "SystemManage/roleCompile.html"],
    ViewUser: ["SystemManage/userManage.html", "SystemManage/userIncreased.html", "SystemManage/userCompile.html"],
    ManageUser: ["SystemManage/userManage.html", "SystemManage/userIncreased.html", "SystemManage/userCompile.html"],
    ViewOperationLog: ["SystemManage/logManage.html"],
    ViewErrorLog: ["SystemManage/logManage.html"],
    ViewContract: ["ADManage/contractList.html", "ADManage/contractAdd.html", "ADManage/contractEdit.html"],
    ManageContract: ["ADManage/contractList.html", "ADManage/contractAdd.html", "ADManage/contractEdit.html"],
    ManageTolerantRate: ["SystemManage/contractTolerantManage.html", "SystemManage/contractTolerantIncreased.html"],
    ViewTolerantRate: ["SystemManage/contractTolerantManage.html", "SystemManage/contractTolerantIncreased.html"],
    ViewMediaChannelADSpace: [["ResourceManage/mediaManage.html"], ["ResourceManage/channelManage.html"], ["ResourceManage/advertiseManage.html"]],
    ManageMediaChannelADSpace: [["ResourceManage/mediaManage.html", "ResourceManage/mediaCompile.html", "ResourceManage/mediaIncreased.html"], ["ResourceManage/channelManage.html", "ResourceManage/channelCompile.html", "ResourceManage/channelIncrease"], ["ResourceManage/advertiseManage.html", "ResourceManage/advertiseIncrease.html", "ResourceManage/advertiseCompile.html"]],
    ManageNotice: ["SystemManage/afficheManage.html", "SystemManage/affcheIncreased.html", "SystemManage/affcheCompile.html"],
    ViewNotice: ["SystemManage/afficheManage.html", "SystemManage/affcheIncreased.html", "SystemManage/affcheCompile.html"]
};
/*!!!!! 最后修改于： 2016-8-23 9:13:48 !!!!!*/