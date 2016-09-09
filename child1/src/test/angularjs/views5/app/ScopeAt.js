var myModule = angular.module("MyModule", []);
myModule.controller('MyCtrl', ['$scope', function($scope){
	$scope.ctrlFlavor="百威";
}])
myModule.controller('PracticeCtrl',['$scope',function($scope){
    $scope.scopeParam1="可乐鸡翅";
}])
myModule.directive("drink", function() {
    return {
    	restrict:'AE',
        scope:{
        	flavor:'@'
        },
        template:"<div>{{flavor}},adgag</div>"
        // ,
        // link:function(scope,element,attrs){
        // 	scope.flavor=attrs.flavor;
        // }
    }
});
//自定义指令:my-order的配置
myModule.directive("myOrder",function(){
   return{
      //指令范围，我这里使用的element
       restrict:'E',
      //@ - 绑定scope中的属性值
       scope:{
           //指定属性的绑定策略：@
           param1:'@'
       },
       template:"<div>获取scope中的值：{{param1}}</div>"
   }
});