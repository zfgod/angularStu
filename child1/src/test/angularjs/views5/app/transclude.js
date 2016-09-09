var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
    	restrict:"AE",
    	transclude:true,
    	template:"<div><div ng-transclude></div>Hello everyone!</div>"
    } 
});