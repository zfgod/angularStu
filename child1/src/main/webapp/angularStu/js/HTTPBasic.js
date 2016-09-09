var myModule=angular.module("MyModule",[]);

myModule.controller('LoadDataCtrl', ['$scope','$http', function($scope,$http){
    $http.get('http://localhost:8081/json/user.do',{
        header:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).success(function(res){
        console.log(res);
        $scope.users = res.users;
    }).error(function() {
        console.log("error...");
    });
//
    $http({
        method: 'GET',
        url: 'http://localhost:8081/json/user.do'
    }).success(function(data, status, headers, config) {
        console.log("success...");
        console.log(data);
        $scope.user2s = data.users;
    }).error(function(data, status, headers, config) {
        console.log("error...");
    });

}]);