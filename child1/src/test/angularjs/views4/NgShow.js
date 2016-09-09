var myModule = angular.module('MyModule', []);
myModule.controller('MenuController', ['$scope',
    function($scope) {
        $scope.menuState={ show : false };
        $scope.showMenu = function() {
            $scope.menuState.show = !$scope.menuState.show;
        };
    }
])
