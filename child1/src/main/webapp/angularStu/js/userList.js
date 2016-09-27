var myServiceApp = angular.module("MyServiceApp", []);
myServiceApp.filter('type_UserAge',function(){
    return function(input){
        if(input<6){
            return '幼儿小孩'
        }else if(input <18){
            return '少年'
        }else if(input<25){
            return '青年'
        }else {
            return '成年人'
        }
    }
});

myServiceApp.filter('type_UserState',function(){
    return function(input){
        switch (input){
            case 1:
                return '启用';
            case -1:
                return '禁用';
            default:
                return '--';
        }
    }
});

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

myServiceApp.factory('userListService', ['$http',
    function($http) {
        return {
            userList:function (query){
                return $http.post('http://localhost:8081/json/commitUser.do',query,configForm)
            }
        }

    }
]);
myServiceApp.controller('ServiceController', ['$rootScope','$scope','$http','userListService',
    function($rootScope,$scope,$http,userListService) {
        var query = {
            pageSize:6,
            pageIndex:1
        };
        //人群属性下拉
        $scope.ageTypeSelect = [
            {name: '幼儿',id:1},
            {name: '少年',id:2},
            {name: '青年',id:3},
            {name: '成年',id:4}
        ];
        //进入页面加载用户列表
        $http.post('http://localhost:8081/json/userList.do',query,configForm)
            .success(function (res) {
                if(res.code == 200){
                    $scope.users = res.items;
                    $scope.page = res.page;
                    $scope.totalPage = res.totalPage;
                    $scope.totalCount = res.totalCount;
                    $scope.pageSize = res.pageSize;
                }else{
                    alert(res.msg);
                }
            }).error(function () {
                alert("出错了！");
            });
        //分页搜索
        $scope.redirect = function(count){
            var url = 'http://localhost:8081/json/userList.do';
            query.searchName = $scope.searchName;
            query.intValue = $scope.searchAge;
            query.ageType = $scope.ageType;
            query.pageIndex = count;
            $http.post(url,query,configForm)
                .success(function(res){
                    $scope.users = res.items;
                    $scope.page = res.page;
                    $scope.totalPage = res.totalPage;
                    $scope.totalCount = res.totalCount;
                    $scope.pageSize = res.pageSize;
                }).error(function(){
                    console.log("error...");
                });
        };
        //重新搜索列表
        $scope.flashList = function(){
            var url = 'http://localhost:8081/json/userList.do';
            //搜索条件获取
            query.searchName = $scope.searchName;
            query.intValue = $scope.searchAge;
            query.ageType = $scope.ageType;
            query.pageIndex = 1;
            //查询
            $http.post(url,query,configForm)
                .success(function(res){
                    $scope.users = res.items;
                    $scope.page = res.page;
                    $scope.totalPage = res.totalPage;
                    $scope.totalCount = res.totalCount;
                    $scope.pageSize = res.pageSize;
            }).error(function(){
                console.log("error...");
            });
        };
    }
]);

