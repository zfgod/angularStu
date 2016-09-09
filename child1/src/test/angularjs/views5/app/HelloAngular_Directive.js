var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        restrict: 'AEMC',
        template: '<div>Hi everyone!iam</div>',
        //replace: false 注释的行不通
        replace:true
    }
});