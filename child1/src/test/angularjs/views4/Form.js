var userInfoModule = angular.module('UserInfoModule', []);
userInfoModule.controller('UserInfoCtrl', ['$scope',
    function($scope) {
        $scope.userInfo = {
            email: "253445528@qq.com",
            password: "253445528",
            autoLogin: true
        };
        $scope.getFormData = function() {
            console.log($scope.userInfo);
            console.info($scope.userInfo);
        };
        $scope.setFormData = function() {
            $scope.userInfo = {
                email: 'set@126.com',
                password: 'set',
                autoLogin: false
            }
        };
        $scope.resetForm = function() {
            $scope.userInfo = {
                email: "",
                password: "",
                autoLogin: true
            };
        }
        $scope.commitForm = function(){
            var email = $scope.userInfo.email;
            var password = $scope.userInfo.password;
            var autoLogin = $scope.userInfo.autoLogin;
        }
    }
])
