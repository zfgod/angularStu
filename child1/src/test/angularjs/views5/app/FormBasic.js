var appModule = angular.module('TestFormModule', []);
appModule.controller("TestFormController",function($scope){
	$scope.user={
		userName:'damoqiongqiu',
		password:''
	};
	$scope.save=function(){
		alert("保存数据!"+$scope.user.userName+$scope.user.password);
	}
});