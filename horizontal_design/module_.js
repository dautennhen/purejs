(function (angular) {
	/*window.modCommon = angular.module('mainModule', []).config(function ($routeProvider, $routeParams) {
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
	 */
//------------------------------------------
	window.module1 = angular.module('module1', [])
	.controller('module1Controller', function ($rootScope, $scope) {
    $routeProvider.when('/:module/:mvc',{templateUrl: function(){
      console.log('$routeParams.module',$routeParams.module);
      return 'view/mainView.html';//$routeParams.module +'/mainView.html'
    }
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
			console.log('addProduct');
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
		//alert($rootScope.abc);
	}).controller('module1Controller3', function ($scope, $rootScope) {
		$scope.name = 'module1Controller3';
		$scope.loadListProduct = function(){
			console.log('loadListProduct');
		}
		$scope.getProducts = function(){
			
		}
		$scope.cates = $scope.getProducts();
		/*
		$scope.cates = [
			{ name : 'cate1', desc : 'desc1' },
			{ name : 'cate2', desc : 'desc2' },
			{ name : 'cate3', desc : 'desc3' }
		]*/
		//alert($rootScope.abc);
	})
	.value('module1Value', 123)
	.factory('module1Factory', function () {
		return 'module1Value';
	})
	.directive('module1DirectiveAbc', function () {
		return {
			/*restrict : 'AEC',
			scope : {
				customer : '=info'
			},*/
			templateUrl : function(elem, attr){
				console.log('9999---',elem, attr);
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
