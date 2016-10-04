var app = require('angular');
var material = require('angular-material'),
    aria = require('angular-aria'),
    animate = require('angular-animate');

var App = angular.module('App', [
  'ngResource',
  'ngRoute',
  'ngMaterial',
  'leaflet-directive',
  'chart.js'
]);

App.factory('Authentication', [
  function() {
    this.user = window.user;

    return {
      user: this.user
    };
  }
]);

App.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
      		templateUrl: 'partials/inicio.html'
   		 }).
    when('/huella', {
      		templateUrl: 'partials/huella.html'
   		 }).
    otherwise({
      		redirectTo: '/'
    	});
	}
]);

App.directive('chart', function() {
		return {
			restrict: 'E',
			templateUrl: '/partials/chart.html',
		};
})

App.config(['$locationProvider', '$mdThemingProvider',
  function($locationProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal', {
        'default': '500',
        'hue-1': '700'
      })
      .accentPalette('purple', {
        'default': '500'
      })
      .warnPalette('indigo')
  }
]);

App.controller('huellaController', ['$scope', 'Authentication', '$window',
  function($scope, Authentication, $window) {
    $scope.authentication = Authentication;

  }]);

App.controller('mapController', [ '$scope', function($scope) {
    angular.extend($scope, {
                yanaconas: {
                    lat: 3.423004,
                    lng: -76.606897,
                    zoom: 15
                },
                defaults: {
                    zoomAnimation: false,
                    markerZoomAnimation: false,
                    fadeAnimation: false,
                    scrollWheelZoom: false
                }
            });
}]);

App.controller('chartController', ['$scope',
    function($scope) {
      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.series = ['Series A', 'Series B'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };

}]);

  
    
