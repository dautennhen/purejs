(function (angular) {
	angular.module('phonecatFilters', []).filter('checkmark', function () {
		return function (input) {
			console.log(input);
			return input ? '\u2713' : '\u2718';
		};
	});
	var phonecatServices = angular.module('phonecatServices', ['ngResource']);
	phonecatServices.factory('Phone', ['$resource', function ($resource) {
				return $resource('./:phoneId.json', {}, {
					query : {
						method : 'GET',
						params : {
							phoneId : 'phones'
						},
						isArray : true
					}
				});
			}
		]);
	var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatServices']);
	var phonecatControllers = angular.module('phonecatControllers', []);
	phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', function ($scope, Phone) {
				$scope.phones = Phone.query();
				$scope.orderProp = 'age';
				$scope.category = {
					name : 'haha 9999',
					desc : 'hihi 9999'
				}
			}
		]);
	phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
				$scope.phoneId = $routeParams.phoneId;
				console.log('$routeParams', $routeParams);
				$scope.category = {
					name : 'haha',
					desc : 'hihi'
				}
			}
		]);
  phonecatControllers.controller('HahaCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
				$scope.phoneId = $routeParams.phoneId;
        $scope.red = 'true red';
        $scope.blue = '';
        $scope.click = 0;
        $scope.trueBlue = function(){
          if( $('.blue').length == 0 ) {
            $scope.blue = 'blue changed';
            $scope.template.blue = "view/blue.html";
            //setTimeout(function(){
                //$('.blue').html('update blue template');
                console.log('update blue template')
            //}, 11)
            
          }
          $scope.click = $scope.click + 1;
          //$scope.$apply(function() {
            $scope.red = 'true red updated';
            
          //})
        }
        
				 $scope.template = {
          "red": "view/red.html",
          "green": "view/green.html"//,
          /*"blue": "view/blue.html";*/
        }
			}
		]);
    
	phonecatApp.config(['$routeProvider', function ($routeProvider) {
				$routeProvider.when('/phones', {
					templateUrl : 'view/phone-list.html',
					controller : 'PhoneListCtrl'
				}).when('/phones/:phoneId', {
          controller : 'PhoneDetailCtrl',
					templateUrl : 'view/phone-detail.html'
				}).when('/phones/:phoneId/:tpl', {
          controller : 'PhoneListCtrl', 
					templateUrl : function (elem) {
            console.log(elem);//hahaha
            return 'view/' + elem.tpl + '.html'
          }
				}).when('/haha/:phoneId', {
          //singlemodule.html#/haha/khakha
          controller : 'HahaCtrl',
					templateUrl : 'view/mainviews.html'
        }).otherwise({
					redirectTo : '/phones'
				});
			}
		])
})(window.angular);
