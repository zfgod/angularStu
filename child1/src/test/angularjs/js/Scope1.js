function GreetCtrl($scope, $rootScope) {
	$scope.name = 'World';
	$rootScope.department = '外部部门';
}

function ListCtrl($scope) {
	$scope.names = ['Igor', 'Misaako', 'Vojta'];
	$scope.department = '内部部门';
}
