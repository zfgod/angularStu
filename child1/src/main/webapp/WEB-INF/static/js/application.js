var configForm = {
    headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
    transformRequest: function (t) {
        return t ? toBodyString(t) : void 0
    }
}, configJson = {
    headers: {"Content-Type": "application/json;charset=UTF-8"}, transformRequest: function (t) {
        return t ? JSON.stringify(t) : void 0
    }
}, app = angular.module("WangCheng", []);
app.config(["$locationProvider", "$httpProvider", function (t, e) {
    e.defaults.headers.post.Accept = "*/*", e.interceptors.push("InterceptorHttp")
}]), app.factory("InterceptorHttp", [function () {
    return {
        responseError: function (t) {
            return 500 == t.status || 404 == t.status ? (ycui.alert({
                content: "系统错误",
                timeout: -1
            }), delete t.data, t) : t
        }, request: function (t) {
            return t
        }, response: function (t) {
            if (t.data && 205 == t.data.status)return -1 != location.href.indexOf("login.html") ? t : (top.location.href = baseUrl + "/login.html", t);
            if (500 == t.status)return ycui.alert({content: "系统错误", timeout: -1}), t;
            if (415 == t.status)return ycui.alert({content: "参数错误", timeout: -1}), t;
            if (t.data && 403 == t.data.code)return ycui.alert({content: t.data.msg, timeout: -1}), t;
            if (t.data && 500 == t.data.code) {
                var e = angular.copy(t.data);
                delete e.code, delete e.success;
                var r = "";
                for (var n in e)r += e[n];
                return ycui.alert({content: r || t.data.msg, timeout: -1}), t
            }
            return t
        }
    }
}]), app.directive("ngAttr", function () {
    return {
        restrict: "A", link: function (t, e, r) {
            t.$watch(r.ngAttr, function (t) {
                for (var r in t)e.attr(r, t[r])
            })
        }
    }
}), app.directive("ngTitle", function () {
    return {
        restrict: "A", link: function (t, e, r) {
            var n = e[0];
            e.append('<div class="yc-showTitle">' + r.ngTitle + "</div>");
            var o = n.querySelector(".yc-showTitle");
            !n.style.position && (n.style.position = "relative"), o.style.position = "absolute", o.style.top = (+n.offsetHeight || 20) + 4 + "px", o.style.left = "50%", o.style.marginLeft = -n.offsetWidth / 2, o.style.fontSize = "12px", e.on("mouseover", function () {
                o.style.visibility = "visible"
            }), e.on("mouseout", function () {
                o.style.visibility = "hidden"
            })
        }
    }
}), app.directive("repeatFinish", ["$timeout", function (t) {
    return {
        link: function (e, r, n) {
            1 == e.$last && t(function () {
                n.repeatFinish && e.$emit(n.repeatFinish)
            })
        }
    }
}]), app.directive("ngPlaceholder", ["$timeout", function (t) {
    return {
        restrict: "A", link: function (e, r, n) {
            var o;
            if (r.attr("ng-model") && e.$watch(n.ngModel, function (t, e) {
                    o && (t ? o.css("display", "none") : o.css("display", "block"))
                }), isSupportPlaceholder())t(function () {
                r.attr("placeholder", n.ngPlaceholder)
            }, 20); else {
                var a = r.parent();
                a.css("position", "relative"), o = document.createElement("span"), o.style.position = "absolute", o.style.left = "5px", o.style.color = "#9f9f9f", o.style.display = "inlineBlock", o.style.lineHeight = "30px", o.style.width = "auto", o.style.display = "none", o.style.top = "0", o.innerHTML = n.ngPlaceholder, a.append(o), o = angular.element(o), 0 == r.val().length && o.css("display", "block"), o.bind("click", function () {
                    o.css("display", "none"), r[0].focus()
                }), r.bind("blur", function () {
                    r.val().length > 0 ? o.css("display", "none") : (o.css({color: "#9f9f9f"}), o.css("display", "block"))
                }), r.bind("input", function () {
                    r.val().length > 0 ? o.css("display", "none") : (o.css({color: "#9f9f9f"}), o.css("display", "block"))
                })
            }
        }
    }
}]), app.filter("dateYMD", function () {
    return function (t) {
        return new Date(t).toLocaleDateString()
    }
}), app.filter("DateFormatFtr", function () {
    return function (t) {
        return t ? getDateFormat(new Date(t)) : ""
    }
}), app.filter("orderTypeFtr", function () {
    return function (t, e) {
        switch (t) {
            case-1:
                return "审核未通过";
            case 0:
                return "审核中";
            case 1:
                return "审核通过";
            default:
                return "--"
        }
    }
}), app.filter("createTypeFtr", function () {
    return function (t) {
        switch (t) {
            case 1:
                return "法务待审";
            case 2:
                return "美编待审";
            case 3:
                return "审核通过";
            default:
                return "审核未通过"
        }
    }
}), app.filter("orderTypeFtr", function () {
    return function (t) {
        switch (t) {
            case 1:
                return "预定广告位";
            case 2:
                return "正式投放";
            case 3:
                return "试用推广";
            case 4:
                return "自用推广";
            case 5:
                return "补偿刊登";
            default:
                return ""
        }
    }
}), app.filter("scheduleTypeFtr", function () {
    return function (t) {
        switch (t) {
            case 0:
                return "正常购买";
            case 1:
                return "免费配送";
            case 2:
                return "自用";
            case 3:
                return "打包";
            default:
                return ""
        }
    }
}), app.filter("customerTypeFtr", function () {
    return function (t) {
        switch (t) {
            case 1:
                return "直客";
            case 2:
                return "代理商";
            case 3:
                return "代理子客户";
            default:
                return ""
        }
    }
}), app.filter("customerLevelFtr", function () {
    return function (t) {
        switch (t) {
            case 1:
                return "低";
            case 2:
                return "中";
            case 3:
                return "高";
            default:
                return ""
        }
    }
}), app.filter("defaultOrderCheckFtr", function () {
    return function (t, e) {
        if (-1 == e)return "--";
        switch (t) {
            case-1:
                return "审核不通过";
            case 0:
                return "审核中";
            case 1:
                return "审核通过";
            default:
                return "--"
        }
    }
}), app.filter("toTwo", function () {
    return function (t) {
        return isNaN(t) || t == 1 / 0 ? "0.00%" : (100 * t).toFixed(2) + "%"
    }
}), app.filter("isDay", function () {
    return function (t) {
        switch (t) {
            case 1:
                return "天";
            case 2:
                return "月";
            case 3:
                return "小时";
            default:
                return "天"
        }
    }
}), app.filter("checkStateFtr", function () {
    return function (t, e) {
        if (-1 == t)return "审核未通过";
        if (1 == t)return "审核通过";
        if (e instanceof Array)for (var r = 0; r < e.length; r++) {
            var n = e[r];
            if (0 == n.checkStepState && -1 != n.state)return "分公司审核" == n.checkName ? "分公司待审" : n.checkName + "待审"
        }
        return "--"
    }
}), app.filter("showStateFtr", function () {
    return function (t) {
        switch (t) {
            case 0:
                return "待投放";
            case 1:
                return "投放中";
            case 2:
                return "已暂停";
            case 3:
                return "已完结";
            case 4:
                return "已撤销";
            case 5:
                return "已终止";
            default:
                return "已终止"
        }
    }
}), app.filter("orderTypeValueFtr", function () {
    return function (t) {
        switch (t) {
            case 1:
                return "撤销";
            case 2:
                return "终止";
            default:
                return
        }
    }
}), app.factory("DictionaryFty", ["$http", function (t) {
    var e = baseUrl + "/dic/languageList.htm", r = baseUrl + "/dic/cityList.htm", n = baseUrl + "/dic/provinceList.htm", o = baseUrl + "/dic/provinceListForCompany.htm";
    return {
        languageList: function () {
            return t.get(e)
        }, cityList: function (e) {
            return t.post(r, e, configForm)
        }, provinceList: function () {
            return t.get(n)
        }, provinceListForCompany: function () {
            return t.get(o)
        }
    }
}]), app.factory("OrdersFty", ["$http", function (t) {
    var e = baseUrl + "/orders/list.htm", r = baseUrl + "/orders/checkInfo.htm", n = baseUrl + "/orders/changeShowState.htm", o = baseUrl + "/orders/add.htm", a = baseUrl + "/orders/orderNames.htm", i = baseUrl + "/orderAdCreative/adSpaceNames.htm", s = baseUrl + "/orderAdCreative/sizes.htm", c = baseUrl + "/orders/getDetail.htm", u = baseUrl + "/orders/update.htm", l = baseUrl + "/orders/checkOrder.htm", f = baseUrl + "/orders/getADSpacesForAddOrder.htm", d = baseUrl + "/orders/DataCount.htm", p = baseUrl + "/orders/adSpaceUsedDetail.htm", m = fileUrl + "/contract/uploadPDF.htm", h = baseUrl + "/orders/judgeADShowDateUsable.htm", g = baseUrl + "/orders/updateContractCode.htm", U = baseUrl + "/orders/cancel.htm", F = baseUrl + "/orders/validData.htm", b = baseUrl + "/orders/validOrderData.htm";
    return {
        ordersList: function (r) {
            return t.post(e, r, configForm)
        }, orderCheckInfo: function (e) {
            return t.post(r, e, configForm)
        }, changeShowState: function (e) {
            return t.post(n, e, configForm)
        }, adSpaceNamesByOrder: function (e) {
            return t.post(i, e, configForm)
        }, adSpaceNamesBySize: function (e) {
            return t.post(s, e, configForm)
        }, orderAdd: function (e) {
            return t.post(o, e, configJson)
        }, orderDetail: function (e) {
            return t.post(c, e, configForm)
        }, orderUpdate: function (e) {
            return t.post(u, e, configJson)
        }, orderCheck: function (e) {
            return t.post(l, e, configForm)
        }, getADSpacesForAddOrder: function (e) {
            return t.post(f, e, configForm)
        }, orderDataCount: function (e) {
            return t.post(d, e, configForm)
        }, adSpaceUsedDetail: function (e) {
            return t.post(p, e, configForm)
        }, orderName: function () {
            return t.get(a)
        }, judgeADShowDateUsable: function (e) {
            return t.post(h, e, configJson)
        }, updateContractCode: function (e) {
            return t.post(g, e, configJson)
        }, orderCancel: function (e) {
            return t.post(U, e, configForm)
        }, validData: function (e) {
            return t.post(F, e, configJson)
        }, validOrderData: function (e) {
            return t.post(b, e, configJson)
        }, contractUploadPDFApi: m
    }
}]), app.factory("ScheduleFty", ["$http", function (t) {
    var e = baseUrl + "/schedule/list.htm", r = baseUrl + "/schedule/ordersDetail.htm", n = baseUrl + "/schedule/downList.htm", o = baseUrl + "/schedule/addADToOrder.htm", a = baseUrl + "/schedule/dLInOrder.htm", i = baseUrl + "/holiday/getHolidaySet.htm", s = baseUrl + "/holiday/initHolidays.htm";
    return {
        scheduleList: function (r) {
            return t.post(e, r, configForm)
        }, scheduleDetail: function (e) {
            return t.post(r, e, configForm)
        }, scheduleDownList: function () {
            return t.get(n)
        }, scheduleADToOrder: function (e) {
            return t.post(o, e, configForm)
        }, dLInOrder: function () {
            return t.get(a)
        }, getHolidaySet: function (e) {
            return t.post(i, e, configForm)
        }, initHolidays: function () {
            return t.get(s)
        }
    }
}]), app.factory("DefaultOrdersFty", ["$http", function (t) {
    var e = baseUrl + "/defaultOrders/list.htm", r = baseUrl + "/defaultOrders/add.htm", n = baseUrl + "/defaultOrders/getOrder.htm", o = baseUrl + "/defaultOrders/orderNamesForAdd.htm", a = baseUrl + "/defaultOrders/orderNamesForSearch.htm", i = baseUrl + "defaultOrders/updateOrder.htm", s = baseUrl + "/defaultOrderAdCreative/list.htm", c = baseUrl + "/defaultOrderAdCreative/getAdCreative.htm", u = baseUrl + "/defaultOrderAdCreative/getPV.htm", l = baseUrl + "/defaultOrderAdCreative/delete.htm", f = baseUrl + "/defaultOrders/DataCount.htm", d = baseUrl + "/defaultOrderAdCreative/DataCount.htm", p = baseUrl + "/defaultOrderAdCreative/update.htm", m = baseUrl + "/defaultOrders/checkEmergency.htm", h = baseUrl + "/defaultOrderAdCreative/checkEmergency.htm", g = baseUrl + "/defaultOrderAdCreative/getSizeList.htm", U = baseUrl + "/defaultOrderAdCreative/add.htm", F = fileUrl + "/defaultOrderAdCreative/upload.htm", b = baseUrl + "/ADSpace/getADspaceByDefaultOrderId.htm", C = baseUrl + "/orders/getMediaByOrderId.htm";
    return {
        getMediaByOrderId: function (e) {
            return t.post(C, e, configForm)
        }, defaultOrdersList: function (r) {
            return t.post(e, r, configForm)
        }, defaultOrdersAdd: function (e) {
            return t.post(r, e, configJson)
        }, defaultOrdersDetail: function (e) {
            return t.post(n, e, configForm)
        }, defaultOrdersName: function (e) {
            return t.post(o, e, configForm)
        }, defaultOrdersNameSearch: function (e) {
            return t.post(a, e, configForm)
        }, defaultOrdersUpdate: function (e) {
            return t.post(i, e, configJson)
        }, defaultAdCreativeList: function (e) {
            return t.post(s, e, configForm)
        }, defaultAdCreativeDetail: function (e) {
            return t.post(c, e, configForm)
        }, defaultAdCreativeGetPV: function (e) {
            return t.post(u, e, configForm)
        }, defaultAdCreativeDelete: function (e) {
            return t.post(l, e, configJson)
        }, defaultOrderDataCount: function (e) {
            return t.post(f, e, configForm)
        }, defaultAdCreativeDataCount: function (e) {
            return t.post(d, e, configForm)
        }, defaultAdCreativeUpdate: function (e) {
            return t.post(p, e, configJson)
        }, defaultOrderCheck: function (e) {
            return t.post(m, e, configForm)
        }, checkEmergencyCheck: function (e) {
            return t.post(h, e, configForm)
        }, defaultAdCreativeSizeList: function (e) {
            return t.post(g, e, configForm)
        }, defaultAdCreativeAdd: function (e) {
            return t.post(U, e, configJson)
        }, getADspaceByDefaultOrderId: function (e) {
            return t.post(b, e, configForm)
        }, defaultAdCreativeUploadApi: F
    }
}]), app.factory("AdCreativeFty", ["$http", function (t) {
    var e = baseUrl + "/orderAdCreative/list.htm", r = baseUrl + "/orderAdCreative/update.htm", n = baseUrl + "/orderAdCreative/changeShowState.htm", o = baseUrl + "/orderAdCreative/batchOpt.htm", a = baseUrl + "/orderAdCreative/orderNamesForAdd.htm", i = baseUrl + "/orderAdCreative/orderNamesForList.htm", s = baseUrl + "/orderAdCreative/adSpaceNames.htm", c = baseUrl + "/orderAdCreative/sizes.htm", u = baseUrl + "/orderAdCreative/checkAdCreative.htm", l = baseUrl + "/orderAdCreative/upload.htm", f = baseUrl + "/orderAdCreative/DataCount.htm", d = baseUrl + "/orderAdCreative/checkInfo.htm", p = baseUrl + "/orderAdCreative/getCreative.htm", m = fileUrl + "/orderAdCreative/upload.htm";
    return {
        adCreativeList: function (r) {
            return t.post(e, r, configForm)
        }, adCreativeUpdate: function (e) {
            return t.post(r, e, configJson)
        }, adCreativeUpState: function (e) {
            return t.post(n, e, configForm)
        }, adCreativeBatchOpt: function (e) {
            return t.post(o, e, configJson)
        }, adCreativeOrderNames: function () {
            return t.get(a)
        }, adSpaceNamesByOrderId: function (e) {
            return t.post(s, e, configForm)
        }, adSpaceSizesByOrderId: function (e) {
            return t.post(c, e, configForm)
        }, adCreativeCheck: function (e) {
            return t.post(u, e, configForm)
        }, adCreativeUpload: function (e) {
            return t.post(l, e, configJson)
        }, adCreativeDataCount: function (e) {
            return t.post(f, e, configForm)
        }, adCreativeCheckInfo: function (e) {
            return t.post(d, e, configForm)
        }, adCreativeInfo: function (e) {
            return t.post(p, e, configForm)
        }, orderNamesForList: function () {
            return t.get(i)
        }, adCreativeUploadFileApi: m
    }
}]), app.factory("ContractFty", ["$http", function (t) {
    var e = baseUrl + "/contracts/updateContracts.htm", r = baseUrl + "/contracts/findContracts.htm", n = baseUrl + "/contracts/addContracts.htm", o = baseUrl + "/contracts/listContracts.htm", a = baseUrl + "/contracts/getContractsByCode.htm";
    return {
        updateContracts: function (r) {
            return t.post(e, r, configForm)
        }, findContracts: function (e) {
            return t.post(r, e, configForm)
        }, addContracts: function (e) {
            return t.post(n, e, configForm)
        }, listContracts: function (e) {
            return t.post(o, e, configForm)
        }, getContractsByCode: function (e) {
            return t.post(a, e, configForm)
        }
    }
}]), app.factory("ResChannelFty", ["$http", function (t) {
    var e = baseUrl + "/channel/getChannel.htm", r = baseUrl + "/channel/pageList.htm", n = baseUrl + "/channel/addMediaChannel.htm", o = baseUrl + "/channel/batchUpdateLevel.htm", a = baseUrl + "/channel/add.htm", i = baseUrl + "/channel/update.htm", s = baseUrl + "/channel/list.htm";
    return {
        getChannel: function (r) {
            return t.post(e, r, configForm)
        }, channelPageList: function (e) {
            return t.post(r, e, configForm)
        }, channelAddMedia: function (e) {
            return t.post(n, e, configJson)
        }, channelBatchUpdateLevel: function (e) {
            return t.post(o, e, configJson)
        }, channelAdd: function (e) {
            return t.post(a, e, configJson)
        }, channelUpdate: function (e) {
            return t.post(i, e, configForm)
        }, channelList: function (e) {
            return t.get(s)
        }
    }
}]), app.factory("ResMediaFty", ["$http", function (t) {
    var e = baseUrl + "/media/add.htm", r = baseUrl + "/media/update.htm", n = baseUrl + "/media/list.htm", o = baseUrl + "/media/pageList.htm", a = baseUrl + "/media/getMedia.htm", i = baseUrl + "/media/companyList.htm", s = baseUrl + "/media/listForOrder.htm", c = baseUrl + "/periodication/downListByMId.htm";
    return {
        mediaAdd: function (r) {
            return t.post(e, r, configJson)
        }, mediaUpdate: function (e) {
            return t.post(r, e, configForm)
        }, mediaList: function (e) {
            return t.post(n, e, configForm)
        }, mediaPageList: function (e) {
            return t.post(o, e, configForm)
        }, getMedia: function (e) {
            return t.post(a, e, configForm)
        }, companyList: function () {
            return t.get(i)
        }, listForOrder: function () {
            return t.get(s)
        }, downListByMIdA: function (e) {
            return t.post(c, e, configForm)
        }
    }
}]), app.factory("ResAdvertisingFty", ["$http", function (t) {
    var e = baseUrl + "/ADSpace/add.htm", r = baseUrl + "/ADSpace/getADSpace.htm", n = baseUrl + "/ADSpace/update.htm", o = baseUrl + "/ADSpace/downListForAdd.htm", a = baseUrl + "/channel/getChannels.htm", i = baseUrl + "/ADSpace/pageList.htm", s = baseUrl + "/ADSpace/downListForSearch.htm", c = baseUrl + "/ADSpace/getJSCode.htm", u = baseUrl + "/ADSpace/checkADSpace.htm", l = baseUrl + "/ADSpace/updatePrice.htm", f = baseUrl + "/ADSpace/getPriceRecord.htm", d = baseUrl + "/ADSpace/remove.htm", p = baseUrl + "/ADSpace/reStart.htm";
    return {
        ADSpaceList: function (e) {
            return t.post(i, e, configForm)
        }, aDSpaceAdd: function (r) {
            return t.post(e, r, configForm)
        }, aDSpaceDownListForAdd: function () {
            return t.get(o)
        }, getChannels: function (e) {
            return t.post(a, e, configForm)
        }, aDSpaceUpdate: function (e) {
            return t.post(n, e, configForm)
        }, aDSpaceDetail: function (e) {
            return t.post(r, e, configForm)
        }, downListForSearch: function () {
            return t.get(s)
        }, getJSCode: function (e) {
            return t.post(c, e, configForm)
        }, checkADSpace: function (e) {
            return t.post(u, e, configForm)
        }, updatePrice: function (e) {
            return t.post(l, e, configForm)
        }, getPriceRecord: function (e) {
            return t.post(f, e, configForm)
        }, remove: function (e) {
            return t.post(d, e, configForm)
        }, reStart: function (e) {
            return t.post(p, e, configForm)
        }
    }
}]), app.factory("ResCreativityFty", ["$http", function (t) {
    var e = baseUrl + "/ADSpaceType/list.htm", r = baseUrl + "/ADSpaceType/pageList.htm";
    return {
        aDSpaceType: function () {
            return t.get(e)
        }, adSpacePageList: function (e) {
            return t.post(r, e, configForm)
        }
    }
}]), app.factory("ResSizeFty", ["$http", function (t) {
    var e = baseUrl + "/size/list.htm", r = baseUrl + "/size//pageList.htm";
    return {
        sizeAllName: function () {
            return t.get(e)
        }, sizePageList: function (e) {
            return t.post(r, e, configForm)
        }
    }
}]), app.factory("CustomerFty", ["$http", function (t) {
    var e = baseUrl + "/customer/getPartCustomer.htm", r = baseUrl + "/customer/getAllCustomer.htm", n = baseUrl + "/customer/getCustomer.htm", o = baseUrl + "/customer/listCustomer.htm", a = baseUrl + "/customer/addCustomer.htm", i = baseUrl + "/customer/updateCustomer.htm", s = baseUrl + "/customer/ReviewCustomer.htm", c = baseUrl + "/customer/getCustomerContacts.htm", u = baseUrl + "/customer/getCustomerFlowUser.htm";
    return {
        getPartCustomer: function (r) {
            return t.post(e, r, configForm)
        }, getAllCustomer: function (e) {
            return t.post(r, e, configForm)
        }, getCustomer: function (e) {
            return t.post(n, e, configForm)
        }, listCustomer: function (e) {
            return t.post(o, e, configForm)
        }, addCustomer: function (e) {
            return t.post(a, e, configJson)
        }, updateCustomer: function (e) {
            return t.post(i, e, configJson)
        }, reviewCustomer: function (e) {
            return t.post(s, e, configJson)
        }, getCustomerContacts: function (e) {
            return t.post(c, e, configForm)
        }, getCustomerFlowUser: function (e) {
            return t.post(u, e, configForm)
        }
    }
}]), app.factory("QualificationFty", ["$http", function (t) {
    var e = baseUrl + "/qualifications/findQualifications.htm", r = baseUrl + "/qualifications/addQualifications.htm", n = baseUrl + "/industry/secondLevelIndustry.htm", o = baseUrl + "/qualifications/updateQualifications.htm", a = baseUrl + "/qualifications/findCustomerQualifications.htm", i = baseUrl + "/industry/firstLevelIndustry.htm", s = baseUrl + "/qualifications/listQualifications.htm", c = baseUrl + "/qualifications/deleteQualifications.htm";
    return {
        findQualifications: function (r) {
            return t.post(e, r, configForm)
        }, addQualifications: function (e) {
            return t.post(r, e, configJson)
        }, secondLevelIndustry: function (e) {
            return t.post(n, e, configForm)
        }, updateQualifications: function (e) {
            return t.post(o, e, configForm)
        }, findCustomerQualifications: function (e) {
            return t.post(a, e, configForm)
        }, firstLevelIndustry: function () {
            return t.get(i)
        }, listQualifications: function (e) {
            return t.post(s, e, configForm)
        }, deleteQualifications: function (e) {
            return t.post(c, e, configForm)
        }
    }
}]), app.factory("SysCompanyFty", ["$http", function (t) {
    var e = baseUrl + "/company/add.htm", r = baseUrl + "/company/getEditCompanyInfo.htm", n = baseUrl + "/company/edit.htm", o = baseUrl + "/company/pageList.htm", a = baseUrl + "/company/list.htm";
    return {
        companyAdd: function (r) {
            return t.post(e, r, configForm)
        }, companyEditInfo: function (e) {
            return t.post(r, e, configForm)
        }, companyEdit: function (e) {
            return t.post(n, e, configForm)
        }, companyPageList: function (e) {
            return t.post(o, e, configForm)
        }, companyList: function (e) {
            return t.post(a, e, configForm)
        }
    }
}]), app.factory("SysDepartmentFty", ["$http", function (t) {
    var e = baseUrl + "/department/list.htm", r = baseUrl + "/department/pageList.htm", n = baseUrl + "/department/getEditDepartmentInfo.htm", o = baseUrl + "/department/edit.htm", a = baseUrl + "/department/add.htm", i = baseUrl + "/department/getCompanyListForDep.htm", s = baseUrl + "/department/getCompany.htm";
    return {
        departmentList: function () {
            return t.get(e)
        }, departmentPageList: function (e) {
            return t.post(r, e, configForm)
        }, departmentEditInfo: function (e) {
            return t.post(n, e, configForm)
        }, departmentEdit: function (e) {
            return t.post(o, e, configForm)
        }, departmentAdd: function (e) {
            return t.post(a, e, configJson)
        }, departmentListForDep: function () {
            return t.get(i)
        }, getCompany: function () {
            return t.get(s)
        }
    }
}]), app.factory("SysLoginUserFty", ["$http", function (t) {
    var e = baseUrl + "/system/getLoginUser.htm", r = baseUrl + "/system/login.htm", n = baseUrl + "/system/loginOut.htm";
    return {
        loginUserInfo: function () {
            return t.get(e)
        }, login: function (e) {
            return t.post(r, e, configJson)
        }, loginOut: function () {
            return t.get(n)
        }
    }
}]), app.factory("SysRoleFty", ["$http", function (t) {
    var e = baseUrl + "/role/getRole.htm", r = baseUrl + "/role/addRole.htm", n = baseUrl + "/role/updateRole.htm";
    return {
        getRole: function (r) {
            return t.post(e, r, configForm)
        }, addRole: function (e) {
            return t.post(r, e, configForm)
        }, updateRole: function (e) {
            return t.post(n, e, configForm)
        }
    }
}]), app.factory("SysRuleUserFty", ["$http", function (t) {
    var e = baseUrl + "/rights/rightsByFirstMenu.htm", r = baseUrl + "/rights/getUserRightsByParentId.htm", n = baseUrl + "/role/listRole.htm", o = baseUrl + "/rights/addRights.htm", a = baseUrl + "/rights/Edit.htm", i = baseUrl + "/rights/levelsRights.htm";
    return {
        rightsByFirstMenu: function () {
            return t.get(e)
        }, getUserRightsByParentId: function (e) {
            return t.post(r, e, configForm)
        }, listRole: function (e) {
            return t.post(n, e, configForm)
        }, rightsRuleAdd: function (e) {
            return t.post(o, e, configForm)
        }, rightsRuleEdit: function (e) {
            return t.post(a, e, configForm)
        }, levelsRights: function () {
            return t.get(i)
        }
    }
}]), app.factory("SysUserFty", ["$http", function (t) {
    var e = baseUrl + "/user/validPwd.htm", r = baseUrl + "/user/updatePwd.htm", n = baseUrl + "/user/getEditUserInfo.htm", o = baseUrl + "/user/list.htm", a = baseUrl + "/user/depAndUserList.htm", i = baseUrl + "/user/paramList.htm", s = baseUrl + "/user/paramListForSearch.htm", c = baseUrl + "/user/edit.htm", u = baseUrl + "/user/add.htm", l = baseUrl + "/user/getEditUserInfo.htm", f = baseUrl + "/user/roleListByCom.htm";
    return {
        validPwd: function (r) {
            return t.post(e, r, configForm)
        }, updatePwd: function (e) {
            return t.post(r, e, configForm)
        }, userInfo: function (e) {
            return t.post(n, e, configForm)
        }, userList: function (e) {
            return t.post(o, e, configForm)
        }, depAndUserList: function (e) {
            return t.post(a, e, configForm)
        }, paramList: function () {
            return t.get(i)
        }, userEdit: function (e) {
            return t.post(c, e, configForm)
        }, userAdd: function (e) {
            return t.post(u, e, configForm)
        }, getEditUserInfo: function (e) {
            return t.post(l, e, configForm)
        }, paramListForSearch: function () {
            return t.get(s)
        }, roleListByCom: function (e) {
            return t.post(f, e, configForm)
        }
    }
}]), app.factory("SysNoticeFty", ["$http", function (t) {
    var e = baseUrl + "/notice/viewAllNotice.htm", r = baseUrl + "/notice/listNotice.htm", n = baseUrl + "/notice/removeNotice.htm", o = baseUrl + "/notice/addNotice.htm", a = baseUrl + "/notice/Edit.htm", i = baseUrl + "/notice/updateNotice.htm";
    return {
        viewAllNotice: function (r) {
            return t.post(e, r, configForm)
        }, noticeList: function (e) {
            return t.post(r, e, configForm)
        }, removeNotice: function (e) {
            return t.post(n, e, configForm)
        }, addNotice: function (e) {
            return t.post(o, e, configForm)
        }, edit: function (e) {
            return t.post(a, e, configForm)
        }, updateNotice: function (e) {
            return t.post(i, e, configForm)
        }
    }
}]), app.factory("SysLogFty", ["$http", function (t) {
    var e = baseUrl + "/log/listOperationLogs.htm", r = baseUrl + "/log/listErrorLogs.htm";
    return {
        operationLogList: function (r) {
            return t.post(e, r, configForm)
        }, errorLogList: function (e) {
            return t.post(r, e, configForm)
        }
    }
}]), app.factory("SysContractTolerantFty", ["$http", function (t) {
    var e = baseUrl + "/contractTolerant/current.htm", r = baseUrl + "/contractTolerant/pageList.htm", n = baseUrl + "/contractTolerant/addContractTolerant.htm";
    return {
        contractTolerantCurrent: function () {
            return t.get(e)
        }, contractTolerantList: function (e) {
            return t.post(r, e, configForm)
        }, contractTolerantAdd: function (e) {
            return t.post(n, e, configForm)
        }
    }
}]), app.factory("ReportCustomerFty", ["$http", function (t) {
    var e = baseUrl + "/CustomerReport/collectCustomerReport.htm", r = baseUrl + "/CustomerReport/collectAgentCustomerReport.htm", n = baseUrl + "/CustomerReport/exportCustomerReport.htm", o = baseUrl + "/CustomerReport/exportAgentCustomerReport.htm", a = baseUrl + "/CustomerReport/CustomerReport.htm", i = baseUrl + "/CustomerReport/AgentCustomerReport.htm";
    return {
        collectCustomerReport: function (r) {
            return t.post(e, r, configForm)
        }, collectAgentCustomerReport: function (e) {
            return t.post(r, e, configForm)
        }, exportCustomerReport: function (e) {
            return t.post(n, e, configForm)
        }, exportAgentCustomerReport: function (e) {
            return t.post(o, e, configForm)
        }, customerReport: function (e) {
            return t.post(a, e, configForm)
        }, agentCustomerReport: function (e) {
            return t.post(i, e, configForm)
        }
    }
}]), app.factory("ReportAdvertiseFty", ["$http", function (t) {
    var e = baseUrl + "/AdvertiseReport/totalCity.htm", r = baseUrl + "/AdvertiseReport/totalADSpace.htm", n = baseUrl + "/AdvertiseReport/totalOS.htm", o = baseUrl + "/AdvertiseReport/collectOS.htm", a = baseUrl + "/AdvertiseReport/collectAdCreative.htm", i = baseUrl + "/AdvertiseReport/collectCity.htm", s = baseUrl + "/AdvertiseReport/collectBrowser.htm", c = baseUrl + "/AdvertiseReport/collectDateReport.htm", u = baseUrl + "/AdvertiseReport/collectOrder.htm", l = baseUrl + "/AdvertiseReport/collectADSpace.htm", f = baseUrl + "/orders/AllNDefaultOrderNames.htm", d = baseUrl + "/AdvertiseReport/totalBrowser.htm", p = baseUrl + "/AdvertiseReport/orderReport.htm", m = baseUrl + "/AdvertiseReport/DateReport.htm", h = baseUrl + "/AdvertiseReport/totalAdCreative.htm", g = baseUrl + "/AdvertiseReport/hourReport.htm", U = baseUrl + "/AdvertiseReport/collectHour.htm", F = baseUrl + "/costReport/orderCostReport.htm", b = baseUrl + "/costReport/collectOrderCostReport.htm", C = baseUrl + "/costReport/contractCostReport.htm", y = baseUrl + "/costReport/collectContractCostReport.htm";
    return {
        collectContractCostReport: function (e) {
            return t.post(y, e, configForm)
        }, contractCostReport: function (e) {
            return t.post(C, e, configForm)
        }, collectOrderCostReport: function (e) {
            return t.post(b, e, configForm)
        }, orderCostReport: function (e) {
            return t.post(F, e, configForm)
        }, totalCity: function (r) {
            return t.post(e, r, configForm)
        }, totalADSpace: function (e) {
            return t.post(r, e, configForm)
        }, totalOS: function (e) {
            return t.post(n, e, configForm)
        }, collectOS: function (e) {
            return t.post(o, e, configForm)
        }, collectAdCreative: function (e) {
            return t.post(a, e, configForm)
        }, collectCity: function (e) {
            return t.post(i, e, configForm)
        }, collectBrowser: function (e) {
            return t.post(s, e, configForm)
        }, collectDateReport: function (e) {
            return t.post(c, e, configForm)
        }, collectOrder: function (e) {
            return t.post(u, e, configForm)
        }, collectADSpace: function (e) {
            return t.post(l, e, configForm)
        }, allNDefaultOrderNames: function (e) {
            return t.post(f, e, configForm)
        }, totalBrowser: function (e) {
            return t.post(d, e, configForm)
        }, orderReport: function (e) {
            return t.post(p, e, configForm)
        }, dateReport: function (e) {
            return t.post(m, e, configForm)
        }, totalAdCreative: function (e) {
            return t.post(h, e, configForm)
        }, totalHour: function (e) {
            return t.post(g, e, configForm)
        }, collectHour: function (e) {
            return t.post(U, e, configForm)
        }
    }
}]), app.factory("ReportResourceFty", ["$http", function (t) {
    var e = baseUrl + "/Resource/AdCreativeConsume.htm", r = baseUrl + "/Resource/ADSpaceConsume.htm", n = baseUrl + "/Resource/collectChannelConsume.htm", o = baseUrl + "/Resource/CollectMediaConsume.htm", a = baseUrl + "/Resource/collectADSpaceConsume.htm", i = baseUrl + "/Resource/collectAdCreativeConsume.htm", s = baseUrl + "/Resource/MediaChannelConsume.htm", c = baseUrl + "/Resource/MediaConsume.htm";
    return {
        adCreativeConsume: function (r) {
            return t.post(e, r, configForm)
        }, aDSpaceConsume: function (e) {
            return t.post(r, e, configForm)
        }, collectChannelConsume: function (e) {
            return t.post(n, e, configForm)
        }, collectMediaConsume: function (e) {
            return t.post(o, e, configForm)
        }, collectADSpaceConsume: function (e) {
            return t.post(a, e, configForm)
        }, collectAdCreativeConsume: function (e) {
            return t.post(i, e, configForm)
        }, mediaChannelConsume: function (e) {
            return t.post(s, e, configForm)
        }, mediaConsume: function (e) {
            return t.post(c, e, configForm)
        }
    }
}]), app.factory("UploadKeyFty", ["$http", function (t) {
    var e = baseUrl + "/uploadKey/getKey.htm";
    return {
        uploadKey: function () {
            return t.get(e)
        }
    }
}]), app.factory("DataSyncFty", ["$http", function (t) {
    var e = baseUrl + "/syn/listSynLogs.htm", r = baseUrl + "/syn/getContract.htm", n = baseUrl + "/syn/pushContractMoney.htm";
    return {
        getContract: function () {
            return t.get(r)
        }, pushContractMoney: function () {
            return t.get(n)
        }, listSynLogs: function (r) {
            return t.post(e, r, configForm)
        }
    }
}]);
/*!!!!! 最后修改于： 2016-8-23 9:13:47 !!!!!*/