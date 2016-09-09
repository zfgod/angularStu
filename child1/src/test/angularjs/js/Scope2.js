function EventController($scope) {
	$scope.count = 0;
	$scope.$on('MyEvent', function() {
		$scope.count++;
	});
}
function myEvent($scope){
	$scope.count = 0;
	$scope.$on('change', function() {
		$scope.count++;
	});
}