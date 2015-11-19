(function (angular) {
	window.modCommon = angular.module('mainModule', []).config(function ($routeProvider, $routeParams) {
    console.log('$routeParams', $routeParams);
    $routeProvider.when('/:module/:mvc',{
      templateUrl: function(){
        return 'view/mainView.html';//$routeParams.module +'/mainView.html'
      },
      controller: function(){
        return $routeParams.module+ $routeParams.mvc +'Controller'
      }
    })
	});
	
//------------------------------------------
	window.module1 = angular.module('module1', [])
	.controller('module1Controller', function ($rootScope, $scope) {
		$rootScope.abc = 'hihi';
		$scope.name = 'module1Controller';
		$scope.customer = {	name : 'Naomi',	address : '$scope.customer.address'	};
		$scope.obj1 = {	name : 'obj1',	address : 'obj1 address', classname : 'green' };
		$scope.obj2 = {	name : 'obj2',	address : 'obj2 address', classname : 'orange' };
		 
		$scope.confirmed = '';
		//expect($scope.myVar).toEqual(1);
	   $scope.$watch('confirmed', function() {
		   console.log('hey, confirmed has changed!' + $scope.confirmed);
	   });
	   //expect($scope.myVar).toEqual(1);
		$scope.dosth = function (sth) {
			//$scope.confirmed = 'dddddddddd';
		};
		
		$scope.addCategory = function(){
			console.log('addCategory');
		}
		$scope.addProduct = function(){
			var pname = $('.inputproduct').val();
			sendAction('http://localhost:3000', {action: 'addProduct', name: pname}, function(data){
				console.log('addProduct', data);
			})
		}
		$scope.addAll = function(){
			console.log('AddAll');
		}
		
	})
	.controller('module1Controller1', function ($scope, $rootScope) {
		$scope.name = 'module1Controller1';
		//alert($rootScope.abc);
	}).controller('module1Controller2', function ($scope, $rootScope) {
		$scope.name = 'module1Controller2';
	}).controller('module1Controller3', function ($scope, $rootScope) {
		$scope.name = 'module1Controller3';
		$scope.cates = [];
		$scope.renderListProduct = function() {
			getData('http://localhost:3000', {type:'json', action:'parse'}, function(data){
				$scope.$apply(function() {
					$scope.cates = data;
				})
			})
		}
	})
	.value('module1Value', 123)
	.factory('module1Factory', function () {
		return 'module1Value';
	})
	.directive('module1DirectiveAbc', function () {
		return {
			restrict : 'AEC',
			scope : {
				customer : '=info'
			},
			templateUrl : function(elem, attr){
			  return 'view/mainView.html';//'customer-'+attr.type+'.html';
			}
		};
	})
	.filter('module1Filter', function () {});
//------------------------------------------
	angular.module('module2', [])
	.controller('module2Controller', function ($scope) {
		$scope.name = 'module2Controller';
	});
//------------------------------------------	
	angular.element(document).ready(function () {
		angular.bootstrap(document, ['module1', 'module2']);
	});
	
})(window.angular);
