/**
 * Created by Yuan on 2016/4/6 0006.
 */
var configForm = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: function (data) {
        if (!data) return undefined;
        return toBodyString(data);
    }
};

var configJson = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: function (data) {
        if (!data) return undefined;
        return JSON.stringify(data);
    }
};

/*统一的请求拦截 通用的angular.filter angular.factory 全局变量constant（不能修改） value（可修改）*/
var app = angular.module('WangCheng', []);
app.config(["$locationProvider", "$httpProvider", function ($locationProvider, $httpProvider) {
    $httpProvider.defaults.headers.post['Accept'] = '*/*';
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.interceptors.push('InterceptorHttp');
}]);

app.factory("InterceptorHttp", [function () {
    return {
        responseError:function (response) {
            if (response.status == 500 || response.status == 404) {
                ycui.alert({
                    content: "系统错误",
                    timeout: -1
                });
                delete response.data;
                return response;
            }
            return response;
        },
        request:function (request) {
            return request
        },
        response: function (response) {
            //登陆拦截
            if (response.data && response.data.status == 205) {
                if(location.href.indexOf('login.html') != -1){
                    return response;
                }else{
                    top.location.href = baseUrl + "/login.html";
                    return response;
                }
            }
            //统一的错误处理
            if (response.status == 500) {
                ycui.alert({
                    content: "系统错误",
                    timeout: -1
                });
                return response;
            }
            //统一的错误处理
            if (response.status == 415) {
                ycui.alert({
                    content: "参数错误",
                    timeout: -1
                });
                return response;
            }
            if (response.data && response.data.code == 403) {
                ycui.alert({
                    content: response.data.msg,
                    timeout: -1
                });
                return response;
            }
            //统一的自定义错误处理
            if (response.data && response.data.code == 500) {
                var data = angular.copy(response.data);
                delete data.code;
                delete data.success;
                var msg = "";
                for(var i in data){
                    msg += data[i];
                }
                ycui.alert({
                    content: msg || response.data.msg,
                    timeout: -1
                });
                return response;
            }
            return response;
        }
    };
}]);

app.directive('ngAttr', function () {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            scope.$watch(attr.ngAttr, function (newValue) {
                for (var i in newValue) {
                    element.attr(i, newValue[i]);
                }
            });
        }
    };
});

app.directive('ngTitle',function () {
    return {
        restrict: "A",
        link:function (scope, element, attr) {
            var dom = element[0];
            element.append('<div class="yc-showTitle">'+attr.ngTitle+'</div>');
            var $title = dom.querySelector('.yc-showTitle');
            !dom.style.position && (dom.style.position = 'relative');
            $title.style.position = 'absolute';
            $title.style.top = (+dom.offsetHeight || 20)+4 + 'px';
            $title.style.left = '50%';
            $title.style.marginLeft = -dom.offsetWidth/2;
            $title.style.fontSize = '12px';

            element.on('mouseover',function () {
                $title.style.visibility = 'visible';
            });
            element.on('mouseout',function () {
                $title.style.visibility = 'hidden';
            });
        }
    };
});

app.directive('repeatFinish',['$timeout',function($timeout){
    return {
        link: function(scope,element,attr){
            if(scope.$last == true){
                $timeout(function () {
                    if(attr.repeatFinish){
                        scope.$emit(attr.repeatFinish);
                    }
                });
            }
        }
    }
}]);


/*兼容IE9的placeholder*/
app.directive('ngPlaceholder', ["$timeout",function ($timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            var span;
            if (element.attr("ng-model")) {
                scope.$watch(attr.ngModel, function (newValue, oldValue) {
                    if (span) {
                        if (newValue) {
                            span.css("display", "none");
                        } else {
                            span.css("display", "block");
                        }
                    }
                });
            }
            if (!isSupportPlaceholder()) {
                var parent = element.parent();
                parent.css("position", "relative");
                span = document.createElement("span");
                span.style.position = "absolute";
                span.style.left = "5px";
                span.style.color = "#9f9f9f";
                span.style.display = "inlineBlock";
                span.style.lineHeight = "30px";
                span.style.width = "auto";
                span.style.display = "none";
                span.style.top = "0";
                span.innerHTML = attr.ngPlaceholder;
                parent.append(span);
                span = angular.element(span);

                if (element.val().length == 0) {
                    span.css("display", "block");
                }

                span.bind("click", function () {
                    span.css("display", "none");
                    element[0].focus();
                });

                element.bind('blur', function () {
                    if (element.val().length > 0) {
                        span.css("display", "none");
                    } else {
                        span.css({"color": "#9f9f9f"});
                        span.css("display", "block");
                    }
                });

                element.bind("input", function () {
                    if (element.val().length > 0) {
                        span.css("display", "none");
                    } else {
                        span.css({"color": "#9f9f9f"});
                        span.css("display", "block");
                    }
                });
            } else {
                $timeout(function () {
                    element.attr("placeholder", attr.ngPlaceholder);
                },20);
            }
        }
    };
}]);

/*通用的 filter */
app.filter('dateYMD', function () {
    return function (input) {
        return new Date(input).toLocaleDateString()
    };
});

app.filter("DateFormatFtr", function () {
    return function (input) {
        if (input) {
            return getDateFormat(new Date(input));
        } else {
            return '';
        }
    };
});

app.filter('orderTypeFtr', function () {
    return function (input,type) {
        switch (input) {
            case -1:
                return "审核未通过";
            case 0:
                return "审核中";
            case 1:
                return "审核通过";
            default:
                return "--";
        }
    };
});

app.filter('createTypeFtr', function () {
    return function (input) {
        switch (input) {
            case 1:
                return "法务待审";
            case 2:
                return "美编待审";
            case 3:
                return "审核通过";
            default:
                return "审核未通过";
        }
    };
});

/**
 * 1=预定| 2=确定正式投放| 3=试用推广| 4=内部自用推广|5=补偿刊登
 */
app.filter("orderTypeFtr", function () {
    return function (input) {
        switch (input) {
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
                return "";
        }
    };
});

app.filter("scheduleTypeFtr", function () {
    return function (input) {
        switch (input) {
            case 0:
                return "正常购买";
            case 1:
                return "免费配送";
            case 2:
                return "自用";
            case 3:
                return "打包";
            default:
                return "";
        }
    };
});

app.filter("customerTypeFtr", function () {
    return function (input) {
        switch (input) {
            case 1:
                return "直客";
            case 2:
                return "代理商";
            case 3:
                return "代理子客户";
            default:
                return "";
        }
    };
});

app.filter("customerLevelFtr", function () {
    return function (input) {
        switch (input) {
            case 1:
                return "低";
            case 2:
                return "中";
            case 3:
                return "高";
            default:
                return "";
        }
    };
});

app.filter("defaultOrderCheckFtr", function () {
    return function (input,data) {
        if(data == -1){
            return "--";
        }
        switch (input) {
            case -1:
                return "审核不通过";
            case 0:
                return "审核中";
            case 1:
                return "审核通过";
            default:
                return "--";
        }
    };
});

app.filter("toTwo", function () {
    return function (input) {
        if (isNaN(input) || (input == Infinity)) {
            return "0.00%";
        } else {
            return (input * 100).toFixed(2) + "%";
        }
    };
});

//广告位刊例价
app.filter("isDay", function () {
    return function (input) {
        switch (input){
            case 1:
                return '天';
            case 2:
                return '月';
            case 3:
                return '小时';
            default : return "天"
        }
    }
})

//审核未通过=-1，总公司业务一级待审核=1，总公司业务二级待审核=2，分公司审核待核=3，分公司二级审核=4，审核通过=5
app.filter("checkStateFtr", function () {
    return function (input,data) {
        if(input == -1){
            return '审核未通过';
        }
        if(input == 1){
            return '审核通过';
        }
        if(data instanceof Array){
            for(var i = 0;i<data.length;i++){
                var da = data[i];
                if(da.checkStepState == 0 && da.state != -1){
                    if(da.checkName == '分公司审核'){
                        return '分公司待审';
                    }
                    return da.checkName + '待审';
                }
            }
        }
        return '--';
    }
});
//<!--<!--0=待投放|1=投放中|2=已暂停|3=已完结|4=已撤销|5=已终止-->-->

app.filter("showStateFtr", function () {
    return function (input) {
        switch (input){
            case 0:
                return '待投放';
            case 1:
                return '投放中';
            case 2:
                return '已暂停';
            case 3:
                return '已完结';
            case 4:
                return '已撤销';
            case 5:
                return '已终止';
            default : return "已终止"
        }
    }
});

app.filter("orderTypeValueFtr", function () {
    return function (input) {
        switch (input){
            case 1:
                return '撤销';
            case 2:
                return '终止';
            default:
                return
        }
    }
});

/**
 * 字典管理（城市 语言接口）
 */
app.factory("DictionaryFty", ["$http", function ($http) {
    var languageListApi = baseUrl + "/dic/languageList.htm";
    var cityListApi = baseUrl + "/dic/cityList.htm";
    var provinceListApi = baseUrl + "/dic/provinceList.htm";
    var provinceListForCompanyApi = baseUrl + "/dic/provinceListForCompany.htm";
    return {
        languageList: function () {
            return $http.get(languageListApi);
        },
        /* id */
        cityList: function (query) {
            return $http.post(cityListApi, query, configForm);
        },
        provinceList: function () {
            return $http.get(provinceListApi);
        },
        provinceListForCompany: function () {
            return $http.get(provinceListForCompanyApi);
        }
    };
}]);

/**
 * 订单管理 投放订单
 */
app.factory("OrdersFty", ["$http", function ($http) {
    var batchCheckApi = baseUrl + '/orders/batchCheck.htm';
    //接口1：分页搜索订单列表接口
    var ordersListApi = baseUrl + "/orders/list.htm";
    //接口2：获取订单的审核详情
    var orderCheckInfoApi = baseUrl + "/orders/checkInfo.htm";
    //接口3：更改订单的投放状态
    var changeShowStateApi = baseUrl + "/orders/changeShowState.htm";
    //接口4：添加订单接口 Content-Type: application/json
    var orderAddApi = baseUrl + "/orders/add.htm";
    //接口5：广告订单名称下拉列表接口
    var orderNameApi = baseUrl + "/orders/orderNames.htm";
    //接口6：订单对应的广告位下拉列表接口
    var adSpaceNamesByOrderApi = baseUrl + "/orderAdCreative/adSpaceNames.htm";
    //接口6.2：订单对应的尺寸下拉接口
    var adSpaceNamesBySizeApi = baseUrl + "/orderAdCreative/sizes.htm";
    //接口7：查看订单的详情
    var orderDetailApi = baseUrl + "/orders/getDetail.htm";
    //接口8：修改订单信息 Content-Type: application/json
    var orderUpdateApi = baseUrl + "/orders/update.htm";
    //接口9：订单审核
    var orderCheckApi = baseUrl + "/orders/checkOrder.htm";
    //接口10：订单创建时获取广告位来添加（列表数据）
    var getADSpacesForAddOrderApi = baseUrl + "/orders/getADSpacesForAddOrder.htm";
    //接口11：订单列表数据汇总接口
    var orderDataCountApi = baseUrl + "/orders/DataCount.htm";
    //接口13：显示订单对应的广告位占用信息接口
    var adSpaceUsedDetailApi = baseUrl + "/orders/adSpaceUsedDetail.htm";
    //接口12：合同附件上传文件服务器
    var contractUploadPDFApi = fileUrl + "/contract/uploadPDF.htm";
    //接口15：订单--创建和修改--广告位和投放档期与轮播上限的校验
    var judgeADShowDateUsableApi = baseUrl + "/orders/judgeADShowDateUsable.htm";
    //接口14：订单---合同号 --- 修改
    var updateContractCodeApi = baseUrl + "/orders/updateContractCode.htm";
    //接口16：订单---撤销/终止
    var orderCancelApi = baseUrl + '/orders/cancel.htm';
    //接口17：判断广告位是否已经产生数据
    var validDataApi = baseUrl + '/orders/validData.htm';
    //接口17：判断订单是否已经产生数据
    var validOrderDataApi = baseUrl + '/orders/validOrderData.htm';
    return {
        batchCheck:function (query) {
            return $http.post(batchCheckApi,query,configJson);  
        },
        ordersList: function (query) {
            return $http.post(ordersListApi, query, configForm);
        },
        orderCheckInfo: function (query) {
            return $http.post(orderCheckInfoApi, query, configForm);
        },
        changeShowState: function (query) {
            return $http.post(changeShowStateApi, query, configForm);
        },
        adSpaceNamesByOrder: function (query) {
            return $http.post(adSpaceNamesByOrderApi, query, configForm);
        },
        adSpaceNamesBySize: function (query) {
            return $http.post(adSpaceNamesBySizeApi, query, configForm);
        },
        orderAdd: function (query) {
            return $http.post(orderAddApi, query, configJson);
        },
        orderDetail: function (query) {
            return $http.post(orderDetailApi, query, configForm);
        },
        orderUpdate: function (query) {
            return $http.post(orderUpdateApi, query, configJson);
        },
        orderCheck: function (query) {
            return $http.post(orderCheckApi, query, configForm);
        },
        getADSpacesForAddOrder: function (query) {
            return $http.post(getADSpacesForAddOrderApi, query, configForm);
        },
        orderDataCount: function (query) {
            return $http.post(orderDataCountApi, query, configForm);
        },
        adSpaceUsedDetail: function (query) {
            return $http.post(adSpaceUsedDetailApi, query, configForm);
        },
        orderName: function () {
            return $http.get(orderNameApi);
        },
        judgeADShowDateUsable: function (query) {
            return $http.post(judgeADShowDateUsableApi, query, configJson);
        },
        updateContractCode: function (query) {
            return $http.post(updateContractCodeApi, query, configJson);
        },
        orderCancel:function (query) {
            return $http.post(orderCancelApi,query,configForm);
        },
        validData:function (query) {
            return $http.post(validDataApi,query,configJson);
        },
        validOrderData:function (query) {
            return $http.post(validOrderDataApi,query,configJson);
        },
        contractUploadPDFApi: contractUploadPDFApi
    };
}]);

/**
 * 订单管理 排期管理
 */
app.factory("ScheduleFty", ["$http", function ($http) {
    //接口1：分页搜索排期接口
    var scheduleListApi = baseUrl + "/schedule/list.htm";
    //接口2 ：广告位排期详情接口
    var scheduleDetailApi = baseUrl + "/schedule/ordersDetail.htm";
    //接口3：排期查询 下拉列表数据获取
    var scheduleDownListApi = baseUrl + "/schedule/downList.htm";
    //接口4：添加广告位进订单
    var scheduleADToOrderApi = baseUrl + "/schedule/addADToOrder.htm";
    //广告位搜索下拉列表接口
    var dLInOrderApi = baseUrl + '/schedule/dLInOrder.htm';
    //获取节假日
    var getHolidaySetApi = baseUrl + '/holiday/getHolidaySet.htm';
    //设置节假日
    var initHolidaysApi = baseUrl + '/holiday/initHolidays.htm';
    
    return {
        scheduleList: function (query) {
            return $http.post(scheduleListApi, query, configForm);
        },
        scheduleDetail: function (query) {
            return $http.post(scheduleDetailApi, query, configForm);
        },
        scheduleDownList: function () {
            return $http.get(scheduleDownListApi);
        },
        scheduleADToOrder: function (query) {
            return $http.post(scheduleADToOrderApi, query, configForm);
        },
        dLInOrder:function () {
            return $http.get(dLInOrderApi);
        },
        getHolidaySet:function (query) {
            return $http.post(getHolidaySetApi,query,configForm);
        },
        initHolidays:function () {
            return $http.get(initHolidaysApi);
        }
    };
}]);

/**
 * 订单管理 默认订单创意管理
 */
app.factory("DefaultOrdersFty", ["$http", function ($http) {
    //接口1：默认订单列表
    var defaultOrdersListApi = baseUrl + "/defaultOrders/list.htm";
    //接口2：添加订单（默认广告、优先广告） Content-Type:application/json
    var defaultOrdersAddApi = baseUrl + "/defaultOrders/add.htm";
    //接口3：获取默认订单信息
    var defaultOrdersDetailApi = baseUrl + "/defaultOrders/getOrder.htm";
    //接口4.1：获取默认订单的名称下拉 添加
    var defaultOrdersNameApi = baseUrl + "/defaultOrders/orderNamesForAdd.htm";
    //接口4.2：获取默认订单的名称下拉 添加
    var defaultOrdersNameSearchApi = baseUrl + "/defaultOrders/orderNamesForSearch.htm";
    //接口5：修改默认订单的信息 Content-Type:application/json
    var defaultOrdersUpdateApi = baseUrl + "defaultOrders/updateOrder.htm";
    //接口6：创意分页搜索列表
    var defaultAdCreativeListApi = baseUrl + "/defaultOrderAdCreative/list.htm";
    //接口7：获取创意信息
    var defaultAdCreativeDetailApi = baseUrl + "/defaultOrderAdCreative/getAdCreative.htm";
    //接口8：获取默认订单创意的投放数据
    var defaultAdCreativeGetPVApi = baseUrl + "/defaultOrderAdCreative/getPV.htm";
    //接口9：默认订单创意的删除(单个和批量）
    var defaultAdCreativeDeleteApi = baseUrl + "/defaultOrderAdCreative/delete.htm";
    //接口10：默认订单的数据汇总
    var defaultOrderDataCountApi = baseUrl + "/defaultOrders/DataCount.htm";
    //接口11：默认订单的创意的数据汇总
    var defaultAdCreativeDataCountApi = baseUrl + "/defaultOrderAdCreative/DataCount.htm";
    //接口12：默认广告 创意的修改 contentType:application/json
    var defaultAdCreativeUpdateApi = baseUrl + "/defaultOrderAdCreative/update.htm";
    //接口13：紧急订单的审核
    var defaultOrderCheckApi = baseUrl + "/defaultOrders/checkEmergency.htm";
    //接口14：紧急创意的审核
    var checkEmergencyCheckApi = baseUrl + "/defaultOrderAdCreative/checkEmergency.htm";
    //接口2：根据默认广告订单ID加载对应的尺寸
    var defaultAdCreativeSizeListApi = baseUrl + "/defaultOrderAdCreative/getSizeList.htm";
    //接口4：默认广告创意参数的提交 ContentType: application/json
    var defaultAdCreativeAddApi = baseUrl + "/defaultOrderAdCreative/add.htm";
    //接口3：默认广告创意的上传
    var defaultAdCreativeUploadApi = fileUrl + "/defaultOrderAdCreative/upload.htm";
    //默认订单获取广告
    var getADspaceByDefaultOrderIdApi = baseUrl + '/ADSpace/getADspaceByDefaultOrderId.htm';
    //功能： 默认订单获取媒体
    var getMediaByOrderIdApi = baseUrl + '/orders/getMediaByOrderId.htm';

    return {
        getMediaByOrderId:function (query) {
            return $http.post(getMediaByOrderIdApi,query,configForm);
        },
        defaultOrdersList: function (query) {
            return $http.post(defaultOrdersListApi, query, configForm);
        },
        defaultOrdersAdd: function (query) {
            return $http.post(defaultOrdersAddApi, query, configJson);
        },
        defaultOrdersDetail: function (query) {
            return $http.post(defaultOrdersDetailApi, query, configForm);
        },
        defaultOrdersName: function (query) {
            return $http.post(defaultOrdersNameApi, query, configForm);
        },
        defaultOrdersNameSearch: function (query) {
            return $http.post(defaultOrdersNameSearchApi, query, configForm);
        },
        defaultOrdersUpdate: function (query) {
            return $http.post(defaultOrdersUpdateApi, query, configJson);
        },
        defaultAdCreativeList: function (query) {
            return $http.post(defaultAdCreativeListApi, query, configForm);
        },
        defaultAdCreativeDetail: function (query) {
            return $http.post(defaultAdCreativeDetailApi, query, configForm);
        },
        defaultAdCreativeGetPV: function (query) {
            return $http.post(defaultAdCreativeGetPVApi, query, configForm);
        },
        defaultAdCreativeDelete: function (query) {
            return $http.post(defaultAdCreativeDeleteApi, query, configJson);
        },
        defaultOrderDataCount: function (query) {
            return $http.post(defaultOrderDataCountApi, query, configForm);
        },
        defaultAdCreativeDataCount: function (query) {
            return $http.post(defaultAdCreativeDataCountApi, query, configForm);
        },
        defaultAdCreativeUpdate: function (query) {
            return $http.post(defaultAdCreativeUpdateApi, query, configJson);
        },
        defaultOrderCheck: function (query) {
            return $http.post(defaultOrderCheckApi, query, configForm);
        },
        checkEmergencyCheck: function (query) {
            return $http.post(checkEmergencyCheckApi, query, configForm);
        },
        defaultAdCreativeSizeList: function (query) {
            return $http.post(defaultAdCreativeSizeListApi, query, configForm);
        },
        defaultAdCreativeAdd: function (query) {
            return $http.post(defaultAdCreativeAddApi, query, configJson);
        },
        getADspaceByDefaultOrderId:function (query) {
            return $http.post(getADspaceByDefaultOrderIdApi, query, configForm);
        },
        defaultAdCreativeUploadApi: defaultAdCreativeUploadApi
    };
}]);

/**
 * 订单管理 创意管理
 */
app.factory("AdCreativeFty", ["$http", function ($http) {
    //接口1：创意列表——分页搜索接口
    var adCreativeListApi = baseUrl + "/orderAdCreative/list.htm";
    //接口2：创意——修改 Content-Type: application/json
    var adCreativeUpdateApi = baseUrl + "/orderAdCreative/update.htm";
    //接口3：修改创意——投放状态
    var adCreativeUpStateApi = baseUrl + "/orderAdCreative/changeShowState.htm";
    //接口4：批量操作接口：删除（含单个）、暂停、投放 Content-Type: application/json
    var adCreativeBatchOptApi = baseUrl + "/orderAdCreative/batchOpt.htm";
    //接口5.2 接口5.1：广告订单名称下拉列表接口
    var adCreativeOrderNamesApi = baseUrl + "/orderAdCreative/orderNamesForAdd.htm";
    //接口5.1：广告订单名称下拉列表接口(创意列表搜索使用)
    var orderNamesForListApi = baseUrl + "/orderAdCreative/orderNamesForList.htm";
    //接口6.1：订单对应的广告位下拉列表接口
    var adSpaceNamesByOrderIdApi = baseUrl + "/orderAdCreative/adSpaceNames.htm";
    //接口6.2：订单对应的尺寸下拉接口
    var adSpaceSizesByOrderIdApi = baseUrl + "/orderAdCreative/sizes.htm";
    //接口7：审核创意
    var adCreativeCheckApi = baseUrl + "/orderAdCreative/checkAdCreative.htm";
    //接口9：创意素材参数提交接口 Content-Type: application/json
    var adCreativeUploadApi = baseUrl + "/orderAdCreative/upload.htm";
    //接口10：创意列表——数据汇总接口
    var adCreativeDataCountApi = baseUrl + "/orderAdCreative/DataCount.htm";
    //接口11：创意——审核详情获取接口
    var adCreativeCheckInfoApi = baseUrl + "/orderAdCreative/checkInfo.htm";
    //接口12：单个创意——详情获取接口
    var adCreativeInfoApi = baseUrl + "/orderAdCreative/getCreative.htm";

    //接口8：创意素材上传（单个文件）
    var adCreativeUploadFileApi = fileUrl + "/orderAdCreative/upload.htm";

    return {
        adCreativeList: function (query) {
            return $http.post(adCreativeListApi, query, configForm);
        },
        adCreativeUpdate: function (query) {
            return $http.post(adCreativeUpdateApi, query, configJson);
        },
        adCreativeUpState: function (query) {
            return $http.post(adCreativeUpStateApi, query, configForm);
        },
        adCreativeBatchOpt: function (query) {
            return $http.post(adCreativeBatchOptApi, query, configJson);
        },
        adCreativeOrderNames: function () {
            return $http.get(adCreativeOrderNamesApi);
        },
        adSpaceNamesByOrderId: function (query) {
            return $http.post(adSpaceNamesByOrderIdApi, query, configForm);
        },
        adSpaceSizesByOrderId: function (query) {
            return $http.post(adSpaceSizesByOrderIdApi, query, configForm);
        },
        adCreativeCheck: function (query) {
            return $http.post(adCreativeCheckApi, query, configForm);
        },
        adCreativeUpload: function (query) {
            return $http.post(adCreativeUploadApi, query, configJson);
        },
        adCreativeDataCount: function (query) {
            return $http.post(adCreativeDataCountApi, query, configForm);
        },
        adCreativeCheckInfo: function (query) {
            return $http.post(adCreativeCheckInfoApi, query, configForm);
        },
        adCreativeInfo: function (query) {
            return $http.post(adCreativeInfoApi, query, configForm);
        },
        orderNamesForList: function () {
            return $http.get(orderNamesForListApi);
        },
        adCreativeUploadFileApi: adCreativeUploadFileApi
    };
}]);

/**
 * 订单管理 合同号管理
 *
 */
app.factory('ContractFty',['$http',function ($http) {
    //修改合同号
    var updateContractsApi = baseUrl + '/contracts/updateContracts.htm';
    //合同号详情
    var findContractsApi = baseUrl + '/contracts/findContracts.htm';
    //添加合同号
    var addContractsApi = baseUrl + '/contracts/addContracts.htm';
    //合同号列表
    var listContractsApi = baseUrl + '/contracts/listContracts.htm';
    //根据合同号获取合同
    var getContractsByCodeApi = baseUrl + '/contracts/getContractsByCode.htm';
    return {
        updateContracts:function (query) {
            return $http.post(updateContractsApi,query,configForm);
        },
        findContracts:function (query) {
            return $http.post(findContractsApi,query,configForm);
        },
        addContracts:function (query) {
            return $http.post(addContractsApi,query,configForm);
        },
        listContracts:function (query) {
            return $http.post(listContractsApi,query,configForm);
        },
        getContractsByCode:function (query) {
            return $http.post(getContractsByCodeApi,query,configForm);
        }
    }
}]);

/**
 * 订单管理 内容管理
 *
 */
app.factory('ContentFty',['$http',function ($http) {
    var contentAddApi = baseUrl + '/content/add.htm';
    var editCheckApi = baseUrl + '/content/check.htm'; //编辑内容 发布
    var editContentApi = baseUrl + '/content/editContent.htm';//编辑内容 非发布
    var contentListApi = baseUrl + '/content/list.htm';
    var contentOneApi = baseUrl + '/content/getOne.htm';
    var ordersListApi = baseUrl + '/content/orders.htm';
    var contentDeleteApi = baseUrl + '/content/delete.htm';
    return {
        contentDelete:function (query) {
            return $http.post(contentDeleteApi,query,configJson);
        },
        ordersList:function (query) {
            return $http.post(ordersListApi,query,configForm);
        },
        contentAdd:function (query) {
            return $http.post(contentAddApi,query,configJson);
        },
        editCheck:function (query) {
            return $http.post(editCheckApi,query,configJson);
        },
        editContent:function (query) {
            return $http.post(editContentApi,query,configJson);
        },
        contentList:function (query) {
            return $http.post(contentListApi,query,configForm);
        },
        contentOne:function (query) {
            return $http.post(contentOneApi,query,configForm);
        }
    }
}]);

/**
 * 订单管理 流程管理
 */
app.factory('FlowFty',['$http',function($http){
    var flowListApi = baseUrl + '/flow/list.htm';
    var flowTemplatesApi = baseUrl + '/flow/templates.htm';
    var flowsApi = baseUrl + '/flow/flows.htm';//获取对应模板下的流程
    var flowsEditApi = baseUrl + '/flow/editFlows.htm';
    return {
        flowList:function(query){
            return $http.post(flowListApi,query,configForm);
        },
        flowTemplates:function(){
            return $http.get(flowTemplatesApi);
        },
        flows:function(query){
            return $http.post(flowsApi,query,configForm);
        },
        flowsEdit:function(query){
            return $http.post(flowsEditApi,query,configJson);
        }
    }
}])

/**
 * 资源管理 频道管理
 */
app.factory("ResChannelFty", ["$http", function ($http) {
    var getChannelsByMediaApi = baseUrl + '/channel/getChannelsByMedia.htm';//媒体联动获取频道下拉
    var getChannelApi = baseUrl + "/channel/getChannel.htm";//接口3
    //接口5： 频道列表分页展示和搜索接口
    var channelPageListApi = baseUrl + "/channel/pageList.htm";
    //接口7：添加频道
    var channelAddMediaApi = baseUrl + "/channel/addMediaChannel.htm";
    //接口6：批量修改频道级别
    var channelBatchUpdateLevelApi = baseUrl + "/channel/batchUpdateLevel.htm";
    //接口1：多行文本添加频道接口
    var channelAddApi = baseUrl + "/channel/add.htm";
    //接口2： 修改频道接口
    var channelUpdateApi = baseUrl + "/channel/update.htm";
    //接口4： 获取频道下拉列表接口
    var channelListApi = baseUrl + "/channel/list.htm";
    return {
        getChannelsByMedia:function (query) {
            return $http.post(getChannelsByMediaApi, query, configForm);
        },
        getChannel: function (query) {
            return $http.post(getChannelApi, query, configForm);
        },
        channelPageList: function (query) {
            return $http.post(channelPageListApi, query, configForm);
        },
        channelAddMedia: function (query) {
            return $http.post(channelAddMediaApi, query, configJson);
        },
        channelBatchUpdateLevel: function (query) {
            return $http.post(channelBatchUpdateLevelApi, query, configJson);
        },
        channelAdd: function (query) {
            return $http.post(channelAddApi, query, configJson);
        },
        channelUpdate: function (query) {
            return $http.post(channelUpdateApi, query, configForm);
        },
        channelList: function (query) {
            return $http.get(channelListApi);
        }
    };
}]);

/**
 * 资源管理 媒体管理
 */
app.factory("ResMediaFty", ["$http", function ($http) {
    //媒体批量添加提交接口
    var mediaAddApi = baseUrl + "/media/add.htm";
    //接口2：修改媒体信息接口
    var mediaUpdateApi = baseUrl + "/media/update.htm";
    //接口4： 获取媒体下拉列表接口
    var mediaListApi = baseUrl + "/media/list.htm";
    //接口5：媒体分页列表展示和搜索接口
    var mediaPageListApi = baseUrl + "/media/pageList.htm";
    //接口3： 获取单个媒体信息接口
    var getMediaApi = baseUrl + '/media/getMedia.htm';
    //获取公司下拉（媒体所属公司）
    var companyListApi = baseUrl + "/media/companyList.htm";
    //默认订单添加，媒体下拉列表
    var listForOrderApi = baseUrl + "/media/listForOrder.htm";
    //通过媒体ID获取页面（刊例）
    var downListByMIdApi = baseUrl + '/periodication/downListByMId.htm';
    return {
        mediaAdd: function (query) {
            return $http.post(mediaAddApi, query, configJson);
        },
        mediaUpdate: function (query) {
            return $http.post(mediaUpdateApi, query, configForm);
        },
        mediaList: function (query) {
            return $http.post(mediaListApi, query, configForm);
        },
        mediaPageList: function (query) {
            return $http.post(mediaPageListApi, query, configForm);
        },
        getMedia: function (query) {
            return $http.post(getMediaApi, query, configForm);
        },
        companyList:function () {
            return $http.get(companyListApi);
        },
        listForOrder:function () {
            return $http.get(listForOrderApi);
        },
        downListByMIdA:function (query) {
            return $http.post(downListByMIdApi, query, configForm);
        }
    };
}]);

/**
 * 资源管理 广告位管理
 */
app.factory("ResAdvertisingFty", ["$http", function ($http) {
    //接口1：添加广告位
    var aDSpaceAddApi = baseUrl + "/ADSpace/add.htm";
    //接口2：获取广告位信息（修改广告位信息专用）
    var aDSpaceDetailApi = baseUrl + "/ADSpace/getADSpace.htm";
    //接口3：修改广告位信息
    var aDSpaceUpdateApi = baseUrl + "/ADSpace/update.htm";
    //接口8：广告位添加下拉列表获取接口
    var aDSpaceDownListForAddApi = baseUrl + "/ADSpace/downListForAdd.htm";
    //接口13：获取媒体对应的频道
    var getChannelsApi = baseUrl + "/channel/getChannels.htm";
    //接口6： 广告位分页列表展示及搜索接口
    var ADSpaceListApi = baseUrl + "/ADSpace/pageList.htm";
    //接口7：媒体、频道、创意类型下拉接口
    var downListForSearchApi = baseUrl + "/ADSpace/downListForSearch.htm";
    //
    var getJSCodeApi = baseUrl + "/ADSpace/getJSCode.htm";
    //
    var checkADSpaceApi = baseUrl + "/ADSpace/checkADSpace.htm";
    //接口12： 刊例价--编辑
    var updatePriceApi = baseUrl + "/ADSpace/updatePrice.htm";
    //接口13：刊例价--编辑记录
    var getPriceRecordApi = baseUrl + '/ADSpace/getPriceRecord.htm';
    //禁用
    var removeApi = baseUrl + '/ADSpace/remove.htm';
    //启用
    var reStartApi = baseUrl + '/ADSpace/reStart.htm';
    return {
        ADSpaceList: function (query) {
            return $http.post(ADSpaceListApi, query, configForm);
        },
        aDSpaceAdd: function (query) {
            return $http.post(aDSpaceAddApi, query, configForm);
        },
        aDSpaceDownListForAdd: function () {
            return $http.get(aDSpaceDownListForAddApi);
        },
        getChannels: function (query) {
            return $http.post(getChannelsApi, query, configForm);
        },
        aDSpaceUpdate: function (query) {
            return $http.post(aDSpaceUpdateApi, query, configForm);
        },
        aDSpaceDetail: function (query) {
            return $http.post(aDSpaceDetailApi, query, configForm);
        },
        downListForSearch: function () {
            return $http.get(downListForSearchApi);
        },
        getJSCode: function (query) {
            return $http.post(getJSCodeApi, query, configJson);
        },
        checkADSpace: function (query) {
            return $http.post(checkADSpaceApi, query, configForm);
        },
        updatePrice:function (query) {
            return $http.post(updatePriceApi,query,configForm);
        },
        getPriceRecord:function (query) {
            return $http.post(getPriceRecordApi,query,configForm);
        },
        remove:function (query) {
            return $http.post(removeApi,query,configForm);
        },
        reStart:function (query) {
            return $http.post(reStartApi,query,configForm);
        }
    };
}]);

/**
 * 资源管理 创意管理
 */
app.factory("ResCreativityFty", ["$http", function ($http) {
    var ADSpaceTypeApi = baseUrl + "/ADSpaceType/list.htm";//接口4：获取创意下拉列表
    //接口5：创意分页展示列表和搜索接口
    var adSpacePageListApi = baseUrl + "/ADSpaceType/pageList.htm";
    return {
        aDSpaceType: function () {
            return $http.get(ADSpaceTypeApi);
        },
        adSpacePageList: function (query) {
            return $http.post(adSpacePageListApi, query, configForm);
        }
    };
}]);

/**
 * 资源管理 尺寸管理
 */
app.factory("ResSizeFty", ["$http", function ($http) {
    var sizeAllNameApi = baseUrl + "/size/list.htm";
    var sizePageListApi = baseUrl + "/size//pageList.htm";
    return {
        sizeAllName: function () {
            return $http.get(sizeAllNameApi);
        },
        sizePageList: function (query) {
            return $http.post(sizePageListApi, query, configForm);
        }
    };
}]);

/**
 * 客户管理 客户
 */
app.factory("CustomerFty", ["$http", function ($http) {
    //获取指定类型以外的客户
    var getPartCustomerApi = baseUrl + "/customer/getPartCustomer.htm";
    //获取所有客户
    var getAllCustomerApi = baseUrl + "/customer/getAllCustomer.htm";
    //查看客户
    var getCustomerApi = baseUrl + "/customer/getCustomer.htm";
    //列表
    var listCustomerApi = baseUrl + "/customer/listCustomer.htm";
    //添加客户
    var addCustomerApi = baseUrl + "/customer/addCustomer.htm";
    //修改客户
    var updateCustomerApi = baseUrl + "/customer/updateCustomer.htm";
    //审核客户
    var reviewCustomerApi = baseUrl + '/customer/ReviewCustomer.htm';
    //获取客户下的联系人
    var getCustomerContactsApi = baseUrl + "/customer/getCustomerContacts.htm";
    //获取业务员列表
    var getCustomerFlowUserApi = baseUrl + "/customer/getCustomerFlowUser.htm";
    return {
        getPartCustomer: function (query) {
            return $http.post(getPartCustomerApi, query, configForm);
        },
        getAllCustomer: function (query) {
            return $http.post(getAllCustomerApi, query, configForm);
        },
        getCustomer: function (query) {
            return $http.post(getCustomerApi, query, configForm);
        },
        listCustomer: function (query) {
            return $http.post(listCustomerApi, query, configForm);
        },
        addCustomer:function (query) {
            return $http.post(addCustomerApi,query,configJson);
        },
        updateCustomer:function (query) {
            return $http.post(updateCustomerApi,query,configJson);
        },
        reviewCustomer:function (query) {
            return $http.post(reviewCustomerApi,query,configJson);
        },
        getCustomerContacts:function (query) {
            return $http.post(getCustomerContactsApi,query,configForm);
        },
        getCustomerFlowUser:function (query) {
            return $http.post(getCustomerFlowUserApi,query,configForm);
        }
    };
}]);
/**
 * 客户管理 资质
 */
app.factory("QualificationFty", ["$http", function ($http) {
    //获取资质列表
    var findQualificationsUrl = baseUrl + "/qualifications/findQualifications.htm";
    //添加资质
    var addQualificationsUrl = baseUrl + "/qualifications/addQualifications.htm";
    //获取二级行业
    var secondLevelIndustryUrl = baseUrl + "/industry/secondLevelIndustry.htm";
    //修改资质
    var updateQualificationsUrl = baseUrl + "/qualifications/updateQualifications.htm";
    //获取客服下的资质
    var findCustomerQualificationsUrl = baseUrl + "/qualifications/findCustomerQualifications.htm";
    //查询行业
    var firstLevelIndustryUrl = baseUrl + "/industry/firstLevelIndustry.htm";
    //条件展示资质列表
    var listQualificationsUrl = baseUrl + "/qualifications/listQualifications.htm";
    //删除资质
    var deleteQualificationsUrl = baseUrl + "/qualifications/deleteQualifications.htm";
    return {
        findQualifications: function (query) {
            return $http.post(findQualificationsUrl, query, configForm);
        },
        addQualifications: function (query) {
            return $http.post(addQualificationsUrl, query, configJson);
        },
        secondLevelIndustry: function (query) {
            return $http.post(secondLevelIndustryUrl, query, configForm);
        },
        updateQualifications: function (query) {
            return $http.post(updateQualificationsUrl, query, configForm);
        },
        findCustomerQualifications: function (query) {
            return $http.post(findCustomerQualificationsUrl, query, configForm);
        },
        firstLevelIndustry: function () {
            return $http.get(firstLevelIndustryUrl);
        },
        listQualifications: function (query) {
            return $http.post(listQualificationsUrl, query, configForm);
        },
        deleteQualifications: function (query) {
            return $http.post(deleteQualificationsUrl, query, configForm);
        }

    };

}]);

/**
 * 系统管理 公司管理
 */
app.factory('SysCompanyFty', ["$http", function ($http) {
    var companyAddApi = baseUrl + "/company/add.htm";
    var companyEditInfoApi = baseUrl + "/company/getEditCompanyInfo.htm";
    var companyEditApi = baseUrl + "/company/edit.htm";
    var companyPageListApi = baseUrl + "/company/pageList.htm";
    //接口5：获取公司下拉列表--全部，无权限控制
    var companyListApi = baseUrl + "/company/list.htm";
   
    return {
        companyAdd: function (query) {
            return $http.post(companyAddApi, query, configForm);
        },
        companyEditInfo: function (query) {
            return $http.post(companyEditInfoApi, query, configForm);
        },
        companyEdit: function (query) {
            return $http.post(companyEditApi, query, configForm);
        },
        companyPageList: function (query) {
            return $http.post(companyPageListApi, query, configForm);
        },
        companyList: function (query) {
            return $http.post(companyListApi, query, configForm);
        }
    };
}]);

app.factory('SysDepartmentFty', ["$http", function ($http) {
    var departmentListApi = baseUrl + "/department/list.htm";
    var departmentPageListApi = baseUrl + "/department/pageList.htm";
    var departmentEditInfoApi = baseUrl + "/department/getEditDepartmentInfo.htm";
    var departmentEditApi = baseUrl + "/department/edit.htm";
    var departmentAddApi = baseUrl + "/department/add.htm";
    var departmentListForDepApi = baseUrl + "/department/getCompanyListForDep.htm";
    var getCompanyApi = baseUrl + "/department/getCompany.htm";
    return {
        departmentList: function () {
            return $http.get(departmentListApi);
        },
        departmentPageList: function (query) {
            return $http.post(departmentPageListApi, query, configForm);
        },
        departmentEditInfo: function (query) {
            return $http.post(departmentEditInfoApi, query, configForm);
        },
        departmentEdit: function (query) {
            return $http.post(departmentEditApi, query, configForm);
        },
        departmentAdd: function (query) {
            return $http.post(departmentAddApi, query, configJson);
        },
        departmentListForDep: function () {
            return $http.get(departmentListForDepApi);
        },
        getCompany: function () {
            return $http.get(getCompanyApi);
        }
    };
}]);
/**
 * 系统管理 用户登陆管理
 */
app.factory("SysLoginUserFty", ["$http", function ($http) {
    var loginUserInfoApi = baseUrl + "/system/getLoginUser.htm";
    var loginApi = baseUrl + "/system/login.htm";
    var loginOutApi = baseUrl + "/system/loginOut.htm";
    return {
        loginUserInfo: function () {
            return $http.get(loginUserInfoApi);
        },
        login: function (query) {
            return $http.post(loginApi, query, configJson);
        },
        loginOut: function () {
            return $http.get(loginOutApi);
        }
    };
}]);

/**
 * 系统管理 角色管理
 */
app.factory("SysRoleFty",["$http", function ($http) {
    //获取角色信息
    var getRoleApi = baseUrl + '/role/getRole.htm';
    //新增角色
    var addRoleApi = baseUrl + '/role/addRole.htm';
    //修改角色
    var updateRoleApi = baseUrl + '/role/updateRole.htm';
    return {
        getRole:function (query) {
            return $http.post(getRoleApi,query,configForm);
        },
        addRole:function (query) {
            return $http.post(addRoleApi,query,configForm);
        },
        updateRole:function (query) {
            return $http.post(updateRoleApi,query,configForm);
        }
    }
}])

/**
 * 系统管理 权限管理
 */
app.factory("SysRuleUserFty", ["$http", function ($http) {
    var rightsByFirstMenuApi = baseUrl + "/rights/rightsByFirstMenu.htm"; //获取用户菜单权限信息
    var ruleByParentIdApi = baseUrl + "/rights/getUserRightsByParentId.htm"; //根据父级获取子级权限信息
    var listRoleApi = baseUrl + "/role/listRole.htm";
    var rightsRuleAddApi = baseUrl + "/rights/addRights.htm";
    var rightsRuleEditApi = baseUrl + "/rights/Edit.htm";
    //分级获取所有权限
    var levelsRightsApi = baseUrl + '/rights/levelsRights.htm';
    return {
        rightsByFirstMenu: function () {
            return $http.get(rightsByFirstMenuApi);
        },
        getUserRightsByParentId: function (query) {
            return $http.post(ruleByParentIdApi, query, configForm);
        },
        listRole: function (query) {
            return $http.post(listRoleApi, query, configForm);
        },
        rightsRuleAdd: function (query) {
            return $http.post(rightsRuleAddApi, query, configForm);
        },
        rightsRuleEdit: function (query) {
            return $http.post(rightsRuleEditApi, query, configForm);
        },
        levelsRights:function () {
            return $http.get(levelsRightsApi);
        }
    };
}]);

/**
 * 系统管理 用户管理
 */
app.factory("SysUserFty", ["$http", function ($http) {
    var initPwdApi = baseUrl + '/user/initPwd.htm';
    //接口7.1：原密码输入验证接口
    var validPwdApi = baseUrl + "/user/validPwd.htm";
    //接口7：密码修改接口
    var updatePwdApi = baseUrl + "/user/updatePwd.htm";
    //接口4：获取要编辑的用户的信息
    var userInfoApi = baseUrl + "/user/getEditUserInfo.htm";
    //用户列表数据 分页查询接口
    var userListApi = baseUrl + "/user/list.htm";
    //接口10：根据所选公司获取一级部门和上级领导人员
    var depAndUserListApi = baseUrl + "/user/depAndUserList.htm";
    //接口9：用户添加公司、角色选择列表获取
    var paramListApi = baseUrl + "/user/paramList.htm";
    //接口9-2：用户搜索--公司、角色选择列表获取
    var paramListForSearchApi = baseUrl + '/user/paramListForSearch.htm';
    //用户修改
    var userEditApi = baseUrl + "/user/edit.htm";
    //用户添加
    var userAddApi = baseUrl + '/user/add.htm';
    //接口4：获取要编辑的用户的信息
    var getEditUserInfoApi = baseUrl + "/user/getEditUserInfo.htm";
    //根据公司获取权限列表
    var roleListByComApi = baseUrl + '/user/roleListByCom.htm';
    return {
        initPwd:function (query) {
            return $http.post(initPwdApi,query,configJson);
        },
        validPwd: function (query) {
            return $http.post(validPwdApi, query, configForm);
        },
        updatePwd: function (query) {
            return $http.post(updatePwdApi, query, configForm);
        },
        userInfo: function (query) {
            return $http.post(userInfoApi, query, configForm);
        },
        userList: function (query) {
            return $http.post(userListApi, query, configForm);
        },
        depAndUserList:function (query) {
            return $http.post(depAndUserListApi,query,configForm);
        },
        paramList:function () {
            return $http.get(paramListApi);
        },
        userEdit:function (query) {
            return $http.post(userEditApi,query,configJson);
        },
        userAdd:function (query) {
            return $http.post(userAddApi,query,configJson);
        },
        getEditUserInfo:function (query) {
            return $http.post(getEditUserInfoApi,query,configForm);
        },
        paramListForSearch:function () {
            return $http.get(paramListForSearchApi);
        },
        roleListByCom:function (query) {
            return $http.post(roleListByComApi,query,configForm);
        }
    };
}]);

/**
 * 系统管理 公告管理
 */
app.factory("SysNoticeFty", ["$http", function ($http) {
    var viewAllNoticeApi = baseUrl + "/notice/viewAllNotice.htm";
    var noticeListApi = baseUrl + "/notice/listNotice.htm";
    var removeNoticeApi = baseUrl + '/notice/removeNotice.htm';
    var addNoticeApi = baseUrl + '/notice/addNotice.htm';
    var editApi = baseUrl + '/notice/Edit.htm';
    var updateNoticeApi = baseUrl + '/notice/updateNotice.htm';
    //未读公告
    var viewUnreadNoticeApi = baseUrl + '/notice/viewUnreadNotice.htm';
    var noticeReadApi = baseUrl + '/notice/read.htm';
    var enableNoticeApi = baseUrl + '/notice/enableNotice.htm';
    return {
        enableNotice:function (query) {
            return $http.post(enableNoticeApi,query,configForm);  
        },
        noticeRead:function (query) {
            return $http.post(noticeReadApi,query,configForm);
        },
        viewUnreadNotice:function (query) {
              return $http.post(viewUnreadNoticeApi,query,configForm);
        },
        viewAllNotice: function (query) {
            return $http.post(viewAllNoticeApi, query, configForm);
        },
        noticeList: function (query) {
            return $http.post(noticeListApi, query, configForm);
        },
        removeNotice:function (query) {
            return $http.post(removeNoticeApi,query,configForm);
        },
        addNotice:function (query) {
            return $http.post(addNoticeApi,query,configForm);
        },
        edit:function (query) {
            return $http.post(editApi,query,configForm);
        },
        updateNotice:function (query) {
            return $http.post(updateNoticeApi,query,configForm);
        }
    };
}]);
/***
 * 系统管理  日志管理
 */
app.factory("SysLogFty", ["$http", function ($http) {
    var operationLosListApi = baseUrl + "/log/listOperationLogs.htm", errorLogListApi = baseUrl + "/log/listErrorLogs.htm";
    return {
        operationLogList: function (query) {
            return $http.post(operationLosListApi, query, configForm)
        },errorLogList: function (query) {
            return $http.post(errorLogListApi, query, configForm)
        }
    }
}]);
/***
 * 系统管理  容错率管理
 */
app.factory("SysContractTolerantFty", ["$http", function ($http) {
    var contractTolerantCurrentApi = baseUrl + "/contractTolerant/current.htm", contractTolerantListApi = baseUrl + "/contractTolerant/pageList.htm", addContractTolerantApi = baseUrl + "/contractTolerant/addContractTolerant.htm";
    return {
        contractTolerantCurrent: function () {
            return $http.get(contractTolerantCurrentApi)
        },contractTolerantList: function (query) {
            return $http.post(contractTolerantListApi, query, configForm)
        },contractTolerantAdd: function (query) {
            return $http.post(addContractTolerantApi, query, configForm)
        }
    }
}]);
/***
 * 系统管理 角标管理
 */
app.factory("SysMarkFty", ["$http", function ($http) {
    var addAdMarkApi = baseUrl + '/AdMark/addAdMark.htm';//添加
    var adMarkListApi = baseUrl + '/AdMark/adMarkList.htm';//列表
    var getAdMarkApi = baseUrl + '/AdMark/getAdMark.htm';
    var updateAdMarkApi = baseUrl + '/AdMark/updateAdMark.htm';
    var deleteAdMarkApi = baseUrl + '/AdMark/deleteAdMark.htm';
    var enableAdMarkApi = baseUrl + '/AdMark/enableAdMark.htm';
    var adMarkSelectApi = baseUrl + '/AdMark/select.htm';
    return {
        adMarkSelect:function () {
            return $http.get(adMarkSelectApi);
        },
        enableAdMark:function (query) {
            return $http.post(enableAdMarkApi,query,configForm);
        },
        deleteAdMark:function (query) {
            return $http.post(deleteAdMarkApi,query,configForm);
        },
        addAdMark:function (query) {
            return $http.post(addAdMarkApi,query,configForm);
        },
        adMarkList:function (query) {
            return $http.post(adMarkListApi,query,configForm);
        },
        getAdMark:function (query) {
            return $http.post(getAdMarkApi,query,configForm);
        },
        updateAdMark:function (query) {
            return $http.post(updateAdMarkApi,query,configForm);
        }
    }
}]);

/***
 * 系统管理 特效管理
 */
app.factory('SysSpecialFty',['$http',function ($http) {
    /**
     * SpecialEffectsName
     * specialEffectsUrl
     * rmark
     * @type {string}
     */
    var specialAddUrl = baseUrl + '/SpecialEffects/add.htm';
    var specialUpdateUrl = baseUrl + '/SpecialEffects/update.htm';
    var getSpecialApi = baseUrl + '/SpecialEffects/get.htm';
    var specialListUrl = baseUrl + '/SpecialEffects/list.htm';
    var specialDelete = baseUrl + '/SpecialEffects/delete.htm';
    var specialSelectApi = baseUrl + '/SpecialEffects/select.htm';
    return {
        specialSelect:function () {
            return $http.get(specialSelectApi);  
        },
        specialAdd:function (query) {
            return $http.post(specialAddUrl,query,configForm);
        },
        specialUpdate:function (query) {
            return $http.post(specialUpdateUrl,query,configForm);
        },
        getSpecial:function (query) {
            return $http.post(getSpecialApi,query,configForm);
        },
        specialList:function (query) {
            return $http.post(specialListUrl,query,configForm);
        },
        specialDelete:function (query) {
            return $http.post(specialDelete,query,configForm);
        }
    }

}])

/***
 * 系统管理 系统监控
 */
app.factory('SysMonitorFty',['$http',function ($http) {
    var monitorAddApi = baseUrl + '/monitorType/add.htm';
    var getMonitorApi = baseUrl + '/monitorType/get.htm';
    var monitorUpdateApi = baseUrl + '/monitorType/update.htm';
    var monitorListApi = baseUrl + '/monitorType/list.htm';
    var monitorStateApi = baseUrl + '/monitorType/changeState.htm';
    var monitorDelApi = baseUrl + '/monitorType/delete.htm';
    var monitorDetailsListApi = baseUrl + '/monitorDetails/list.htm';
    return {
        monitorDetailsList:function (query) {
            return $http.post(monitorDetailsListApi,query,configForm);  
        },
        monitorAdd:function (query) {
            return $http.post(monitorAddApi,query,configForm);
        },
        getMonitor:function (query) {
            return $http.post(getMonitorApi,query,configForm);
        },
        monitorUpdate:function (query) {
            return $http.post(monitorUpdateApi,query,configForm);
        },
        monitorList:function (query) {
            return $http.post(monitorListApi,query,configForm);
        },
        monitorState:function (query) {
            return $http.post(monitorStateApi,query,configForm);
        },
        monitorDel:function (query) {
            return $http.post(monitorDelApi,query,configForm);
        }
    }

}]);


/**
 * 报表管理 客户报表管理
 */
app.factory("ReportCustomerFty", ["$http", function ($http) {
    //客户数据报表汇总
    var collectCustomerReportApi = baseUrl + "/CustomerReport/collectCustomerReport.htm";
    //代理客户数据报表汇总
    var collectAgentCustomerReportApi = baseUrl + "/CustomerReport/collectAgentCustomerReport.htm";
    //客户数据报表导出
    var exportCustomerReportApi = baseUrl + "/CustomerReport/exportCustomerReport.htm";
    //代理客户数据报表导出
    var exportAgentCustomerReportApi = baseUrl + "/CustomerReport/exportAgentCustomerReport.htm";
    //客户数据报表
    var customerReportApi = baseUrl + "/CustomerReport/CustomerReport.htm";
    //代理客户
    var agentCustomerReportApi = baseUrl + "/CustomerReport/AgentCustomerReport.htm";
    return {
        collectCustomerReport: function (query) {
            return $http.post(collectCustomerReportApi, query, configForm);
        },
        collectAgentCustomerReport: function (query) {
            return $http.post(collectAgentCustomerReportApi, query, configForm);
        },
        exportCustomerReport: function (query) {
            return $http.post(exportCustomerReportApi, query, configForm);
        },
        exportAgentCustomerReport: function (query) {
            return $http.post(exportAgentCustomerReportApi, query, configForm);
        },
        customerReport: function (query) {
            return $http.post(customerReportApi, query, configForm);
        },
        agentCustomerReport: function (query) {
            return $http.post(agentCustomerReportApi, query, configForm);
        }
    };
}]);
/**
 * 报表管理 广告位管理
 */
app.factory("ReportAdvertiseFty", ["$http", function ($http) {
    //地域报表
    var totalCityApi = baseUrl + "/AdvertiseReport/totalCity.htm";
    //广告位报表
    var totalADSpaceApi = baseUrl + "/AdvertiseReport/totalADSpace.htm";
    //操作系统报表
    var totalOSApi = baseUrl + "/AdvertiseReport/totalOS.htm";
    //操作系统报表汇总
    var collectOSApi = baseUrl + "/AdvertiseReport/collectOS.htm";
    //创意报表汇总
    var collectAdCreativeApi = baseUrl + "/AdvertiseReport/collectAdCreative.htm";
    //地域报表汇总
    var collectCityApi = baseUrl + "/AdvertiseReport/collectCity.htm";
    //浏览器报表汇总
    var collectBrowserApi = baseUrl + "/AdvertiseReport/collectBrowser.htm";
    //日期报表汇总
    var collectDateReportApi = baseUrl + "/AdvertiseReport/collectDateReport.htm";
    //订单报表汇总
    var collectOrderApi = baseUrl + "/AdvertiseReport/collectOrder.htm";
    //广告位报表汇总
    var collectADSpaceApi = baseUrl + "/AdvertiseReport/collectADSpace.htm";
    //报表订单下拉接口
    var allNDefaultOrderNamesApi = baseUrl + "/orders/AllNDefaultOrderNames.htm";
    //浏览器报表
    var totalBrowserApi = baseUrl + "/AdvertiseReport/totalBrowser.htm";
    //订单报表
    var orderReportApi = baseUrl + "/AdvertiseReport/orderReport.htm";
    //日期报表
    var dateReportApi = baseUrl + "/AdvertiseReport/DateReport.htm";
    //创意报表
    var totalAdCreativeApi = baseUrl + "/AdvertiseReport/totalAdCreative.htm";
    //时段报表列表
    var totalHourApi = baseUrl + "/AdvertiseReport/hourReport.htm";
    //时段报表汇总
    var collectHourApi = baseUrl + "/AdvertiseReport/collectHour.htm";
    //订单消耗报表
    var orderCostReportApi = baseUrl + '/costReport/orderCostReport.htm';
    //订单消耗报表汇总
    var collectOrderCostReportApi = baseUrl + '/costReport/collectOrderCostReport.htm';
    //合同消耗报表
    var contractCostReportApi  = baseUrl + '/costReport/contractCostReport.htm';
    //合同消耗汇总
    var collectContractCostReportApi = baseUrl + '/costReport/collectContractCostReport.htm';
    return {
        collectContractCostReport:function (query) {
            return $http.post(collectContractCostReportApi,query,configForm);  
        },
        contractCostReport:function (query) {
            return $http.post(contractCostReportApi,query,configForm);
        },
        collectOrderCostReport:function (query) {
            return $http.post(collectOrderCostReportApi,query,configForm);
        },
        orderCostReport:function (query) {
          return $http.post(orderCostReportApi,query,configForm)
        },
        totalCity: function (query) {
            return $http.post(totalCityApi, query, configForm);
        },
        totalADSpace: function (query) {
            return $http.post(totalADSpaceApi, query, configForm);
        },
        totalOS: function (query) {
            return $http.post(totalOSApi, query, configForm);
        },
        collectOS: function (query) {
            return $http.post(collectOSApi, query, configForm);
        },
        collectAdCreative: function (query) {
            return $http.post(collectAdCreativeApi, query, configForm);
        },
        collectCity: function (query) {
            return $http.post(collectCityApi, query, configForm);
        },
        collectBrowser: function (query) {
            return $http.post(collectBrowserApi, query, configForm);
        },
        collectDateReport: function (query) {
            return $http.post(collectDateReportApi, query, configForm);
        },
        collectOrder: function (query) {
            return $http.post(collectOrderApi, query, configForm);
        },
        collectADSpace: function (query) {
            return $http.post(collectADSpaceApi, query, configForm);
        },
        allNDefaultOrderNames: function (query) {
            return $http.post(allNDefaultOrderNamesApi, query, configForm);
        },
        totalBrowser: function (query) {
            return $http.post(totalBrowserApi, query, configForm);
        },
        orderReport: function (query) {
            return $http.post(orderReportApi, query, configForm);
        },
        dateReport: function (query) {
            return $http.post(dateReportApi, query, configForm);
        },
        totalAdCreative: function (query) {
            return $http.post(totalAdCreativeApi, query, configForm);
        },
        totalHour:function (query) {
            return $http.post(totalHourApi, query, configForm);
        },
        collectHour:function (query) {
            return $http.post(collectHourApi, query, configForm);
        }
    };
}]);
/**
 * 报表管理 资源管理
 */
app.factory("ReportResourceFty", ["$http", function ($http) {
    //创意类型消耗报表
    var adCreativeConsumeApi = baseUrl + "/Resource/AdCreativeConsume.htm";
    //广告位消耗报表
    var aDSpaceConsumeApi = baseUrl + "/Resource/ADSpaceConsume.htm";
    //频道消耗报表汇总
    var collectChannelConsumeApi = baseUrl + "/Resource/collectChannelConsume.htm";
    //媒体消耗报表汇总
    var collectMediaConsumeApi = baseUrl + "/Resource/CollectMediaConsume.htm";
    //广告位消耗报表汇总
    var collectADSpaceConsumeApi = baseUrl + "/Resource/collectADSpaceConsume.htm";
    //创意类型消耗报表汇总
    var collectAdCreativeConsumeApi = baseUrl + "/Resource/collectAdCreativeConsume.htm";
    //频道消耗报表
    var mediaChannelConsumeApi = baseUrl + "/Resource/MediaChannelConsume.htm";
    //媒体消耗报表
    var mediaConsumeApi = baseUrl + "/Resource/MediaConsume.htm";
    return {
        adCreativeConsume: function (query) {
            return $http.post(adCreativeConsumeApi, query, configForm);
        },
        aDSpaceConsume: function (query) {
            return $http.post(aDSpaceConsumeApi, query, configForm);
        },
        collectChannelConsume: function (query) {
            return $http.post(collectChannelConsumeApi, query, configForm);
        },
        collectMediaConsume: function (query) {
            return $http.post(collectMediaConsumeApi, query, configForm);
        },
        collectADSpaceConsume: function (query) {
            return $http.post(collectADSpaceConsumeApi, query, configForm);
        },
        collectAdCreativeConsume: function (query) {
            return $http.post(collectAdCreativeConsumeApi, query, configForm);
        },
        mediaChannelConsume: function (query) {
            return $http.post(mediaChannelConsumeApi, query, configForm);
        },
        mediaConsume: function (query) {
            return $http.post(mediaConsumeApi, query, configForm);
        }
    };
}]);

/**
 * 文件上傳key
 */
app.factory("UploadKeyFty",["$http",function ($http) {
    var uploadKeyApi = baseUrl + "/uploadKey/getKey.htm";
    return {
        uploadKey:function () {
            return $http.get(uploadKeyApi);
        }
    };
}]);

app.factory("DataSyncFty",["$http",function ($http) {
    var listSynLogsApi = baseUrl + "/syn/listSynLogs.htm";
    var getContractApi = baseUrl + "/syn/getContract.htm";
    var pushContractMoneyApi = baseUrl + "/syn/pushContractMoney.htm";
    return {
        getContract:function () {
            return $http.get(getContractApi);
        },
        pushContractMoney:function () {
            return $http.get(pushContractMoneyApi);
        },
        listSynLogs:function (query) {
            return $http.post(listSynLogsApi,query,configForm);
        }
    };
}]);
