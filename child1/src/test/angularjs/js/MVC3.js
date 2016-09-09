function CommonController($scope){
	$scope.commonFn = function(){
    	alert("这里是通用功能！");
    };
}

function controller1($scope) {
    $scope.greeting = {
        text: 'Hello1'
    };
    $scope.testA = function(){
    	alert("test1");
    };
}

function controller2($scope) {
    $scope.greeting = {
        text: 'Hello2'
    };
    $scope.testB = function(){
    	alert("test2");
    }
}