var myModule = angular.module("MyModule", []);

//注射器加载完所有模块时，此方法执行一次  ？？？注射器
myModule.run(function($templateCache){
	$templateCache.put("cacheHtml","<div>Hello everyone!!!i am zf</div>");
	$templateCache.put("cacheParams","<div>a b c</div>");

});

myModule.directive("hello", function($templateCache) {
    return {
        //restrict: 'AECM',
        restrict: 'E',
        template: $templateCache.get("cacheHtml"),
        replace: true
    }
});
myModule.directive("my", function($templateCache) {
    return {
        restrict: 'AECM',
        //restrict: 'E',
        template:$templateCache.get("cacheParams"),
        replace: true
    }
});
