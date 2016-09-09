var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        //restrict: 'AECM',
        restrict: 'E',
        templateUrl: 'my/hello.html',//同级目录下my文件夹下的hello.html
        replace: true //作用后续。。。
    }
});