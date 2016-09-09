var myCSSModule = angular.module('MyCSSModule', []);
myCSSModule.controller('HeaderController', ['$scope',
    function($scope) {
        $scope.isError = false;
        $scope.isWarning = false;
        $scope.showError = function() {
            $scope.messageText = 'Now we will show Error!';
            $scope.isError = true;
            $scope.isWarning = false;
        };
        $scope.showWarning = function() {
            $scope.messageText = 'Just a warning. Please go on.';
            $scope.isWarning = true;
            $scope.isError = false;
        };
    }
])
