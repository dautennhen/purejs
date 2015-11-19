(function (angular) {
	var app = angular.module('demo', ['ui.router']);
  
  app.controller('DashboardController', [function ($scope, $routeParams) {
   console.log('DashboardController'); 
  }]);
   app.controller('CampaignController', [function ($scope, $routeParams) {
   console.log('CampaignController'); 
  }]);
   app.controller('SubscriberController', [function ($scope, $routeParams) {
   console.log('SubscriberController'); 
  }]);
   app.controller('SubscriberDetailController', [function ($scope, $routeParams) {
   console.log('SubscriberDetailController'); 
  }]);
  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('app', {
			url : '/',
			views : {
				'header' : {
					templateUrl : 'view/uirouter/header.html'
				},
				'content' : {
					templateUrl : 'view/uirouter/content.html'
				},
				'footer' : {
					templateUrl : 'view/uirouter/footer.html'
				}
			}
		}).state('app.dashboard', {
			url : 'dashboard',
			views : {
				'content@' : {
					templateUrl : 'view/uirouter/dashboard.html',
					controller : 'DashboardController'
				}
			}
		}).state('app.campaigns', {
			url : 'campaigns',
			views : {
				'content@' : {
					templateUrl : 'view/uirouter/campaigns.html',
					controller : 'CampaignController'
				}
			}
		}).state('app.subscribers', {
			url : 'subscribers',
			views : {
				'content@' : {
					templateUrl : 'view/uirouter/subscribers.html',
					controller : 'SubscriberController'
				}
			}
		}).state('app.subscribers.detail', {
			url : '/:id',
			views : {
				'detail@app.subscribers' : {
					templateUrl : 'view/uirouter/subscriber-detail.html',
					controller : 'SubscriberDetailController'
				}
			}
		});
	}]);
})(window.angular);
