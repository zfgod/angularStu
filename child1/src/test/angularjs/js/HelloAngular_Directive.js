var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
        return {
            restrict: 'E',
            template: '<div>Hi everyone!</div>',
            replace: true
        };
    });
myModule.directive("hi", function() {
        return {
            restrict: 'E',
            template: '<div>I am zf!</div>',
            replace: true
        };
    });
myModule.directive("myText", function() {
    return {
        restrict: 'E',
        template: '<div>myText..!</div>',
        replace: true
    };
});