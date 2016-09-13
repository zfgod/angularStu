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
myServiceApp.filter('type_UserSex',function(){
    return function(input){
        //switch (input){
        //    "1": return "男";
        //}
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

myServiceApp.factory('userListService', ['$http',
    function($http) {
        return {
            userList:function (query){
                return $http.post('http://localhost:8081/json/commitUser.do',query,configJson)
            }
        }

    }
]);
myServiceApp.controller('ServiceController', ['$rootScope','$scope','$http',
    function($rootScope,$scope,$http) {
        //进入页面加载用户列表
        $http.get('http://localhost:8081/json/userList.do')
            .success(function (res) {
                if(res.code == 200){
                    $scope.users = res.items;
                }else{
                    alert(res.msg);
                }
            }).error(function () {
                alert("出错了！");
            });
        //人群属性下拉
        $scope.ageTypeSelect = [
            {name: '幼儿',id:1},
            {name: '少年',id:2},
            {name: '青年',id:3},
            {name: '成年',id:4}
        ];
        //查看
        $scope.selectOne = function(query){
            $http.post('http://localhost:8081/json/oneDetail.do?id=' + query)
                .success(function (data) {
                    console.log(data);

                }).error(function (){
                    console.log("error...");
                });
        };
        //重新搜索列表
        $scope.flashList = function(){
            var url = 'http://localhost:8081/json/userList.do';
            var query = {pageSize:13,pageIndex:1};
            //搜索条件获取
            $scope.searchName && (query.searchName = $scope.searchName);
            $scope.searchAge && (query.intValue = $scope.searchAge);
            $scope.ageType && (query.ageType = $scope.ageType);
            alert($scope.ageType);
            //查询
            $http.post(url,query,configForm)
                .success(function(res){
                console.log(res);
            }).error(function(){
                console.log("error...");
            });
        }
    }
]);

