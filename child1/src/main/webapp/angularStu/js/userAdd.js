/* module */
var userAddApp=angular.module("UserAddApp",[]);

/*  filter*/

/* controller*/
userAddApp.controller("UserAddCtrl",['$rootScope','$scope','$http',
    function($rootScope,$scope,$http){
        $scope.addUser = function(data){
            var url = "http://localhost:8081/json/addUser.do";
            $http.post(url,data,configJson)
                .success(function(res){
                    if(res.code && res.code == 1){
                        alert(res.msg);
                        window.location.href = "userList.html";
                    }
                })
                .error(function(){
                    alert("添加失败");
                });
        };
    }]
);

