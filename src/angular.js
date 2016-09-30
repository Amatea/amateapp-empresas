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

App.controller("mapController", [ '$scope', function($scope) {
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