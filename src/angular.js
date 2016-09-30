var app = require('angular');
var material = require('angular-material'),
    aria = require('angular-aria'),
    animate = require('angular-animate');

var App = angular.module('App', [
  'ngMaterial',
  'leaflet-directive'
]);


App.config(['$locationProvider', '$mdThemingProvider',
  function($locationProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal', {
        'default': '500',
        'hue-1': '700'
      })
      .accentPalette('purple');
  }
]);

App.controller("SimpleMapController", [ '$scope', function($scope) {
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });
}]);