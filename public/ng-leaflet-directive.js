(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**!
 * The MIT License
 *
 * Copyright (c) 2013 the angular-leaflet-directive Team, http://tombatossals.github.io/angular-leaflet-directive
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * angular-leaflet-directive
 * https://github.com/tombatossals/angular-leaflet-directive
 *
 * @authors https://github.com/tombatossals/angular-leaflet-directive/graphs/contributors
 */

/*!
*  angular-leaflet-directive  2015-11-06
*  angular-leaflet-directive - An AngularJS directive to easily interact with Leaflet maps
*  git: https://github.com/tombatossals/angular-leaflet-directive
*/
(function (angular) {
  'use strict';

  !function (angular) {
    "use strict";
    angular.module("leaflet-directive", []).directive("leaflet", ["$q", "leafletData", "leafletMapDefaults", "leafletHelpers", "leafletMapEvents", function (a, b, c, d, e) {
      return { restrict: "EA", replace: !0, scope: { center: "=", lfCenter: "=", defaults: "=", maxbounds: "=", bounds: "=", markers: "=", legend: "=", geojson: "=", paths: "=", tiles: "=", layers: "=", controls: "=", decorations: "=", eventBroadcast: "=", markersWatchOptions: "=", geojsonWatchOptions: "=" }, transclude: !0, template: '<div class="angular-leaflet-map"><div ng-transclude></div></div>', controller: ["$scope", function (b) {
          this._leafletMap = a.defer(), this.getMap = function () {
            return this._leafletMap.promise;
          }, this.getLeafletScope = function () {
            return b;
          };
        }], link: function (a, f, g, h) {
          function i() {
            isNaN(g.width) ? f.css("width", g.width) : f.css("width", g.width + "px");
          }function j() {
            isNaN(g.height) ? f.css("height", g.height) : f.css("height", g.height + "px");
          }var k = d.isDefined,
              l = c.setDefaults(a.defaults, g.id),
              m = e.getAvailableMapEvents(),
              n = e.addEvents;a.mapId = g.id, b.setDirectiveControls({}, g.id), k(g.width) && (i(), a.$watch(function () {
            return f[0].getAttribute("width");
          }, function () {
            i(), o.invalidateSize();
          })), k(g.height) && (j(), a.$watch(function () {
            return f[0].getAttribute("height");
          }, function () {
            j(), o.invalidateSize();
          }));var o = new L.Map(f[0], c.getMapCreationDefaults(g.id));if (h._leafletMap.resolve(o), k(g.center) || k(g.lfCenter) || o.setView([l.center.lat, l.center.lng], l.center.zoom), !k(g.tiles) && !k(g.layers)) {
            var p = L.tileLayer(l.tileLayer, l.tileLayerOptions);p.addTo(o), b.setTiles(p, g.id);
          }if (k(o.zoomControl) && k(l.zoomControlPosition) && o.zoomControl.setPosition(l.zoomControlPosition), k(o.zoomControl) && l.zoomControl === !1 && o.zoomControl.removeFrom(o), k(o.zoomsliderControl) && k(l.zoomsliderControl) && l.zoomsliderControl === !1 && o.zoomsliderControl.removeFrom(o), !k(g.eventBroadcast)) {
            var q = "broadcast";n(o, m, "eventName", a, q);
          }o.whenReady(function () {
            b.setMap(o, g.id);
          }), a.$on("$destroy", function () {
            c.reset(), o.remove(), b.unresolveMap(g.id);
          }), a.$on("invalidateSize", function () {
            o.invalidateSize();
          });
        } };
    }]), angular.module("leaflet-directive").factory("leafletBoundsHelpers", ["$log", "leafletHelpers", function (a, b) {
      function c(a) {
        return angular.isDefined(a) && angular.isDefined(a.southWest) && angular.isDefined(a.northEast) && angular.isNumber(a.southWest.lat) && angular.isNumber(a.southWest.lng) && angular.isNumber(a.northEast.lat) && angular.isNumber(a.northEast.lng);
      }var d = b.isArray,
          e = b.isNumber,
          f = b.isFunction,
          g = b.isDefined;return { createLeafletBounds: function (a) {
          return c(a) ? L.latLngBounds([a.southWest.lat, a.southWest.lng], [a.northEast.lat, a.northEast.lng]) : void 0;
        }, isValidBounds: c, createBoundsFromArray: function (b) {
          return d(b) && 2 === b.length && d(b[0]) && d(b[1]) && 2 === b[0].length && 2 === b[1].length && e(b[0][0]) && e(b[0][1]) && e(b[1][0]) && e(b[1][1]) ? { northEast: { lat: b[0][0], lng: b[0][1] }, southWest: { lat: b[1][0], lng: b[1][1] } } : void a.error("[AngularJS - Leaflet] The bounds array is not valid.");
        }, createBoundsFromLeaflet: function (b) {
          if (!(g(b) && f(b.getNorthEast) && f(b.getSouthWest))) return void a.error("[AngularJS - Leaflet] The leaflet bounds is not valid object.");var c = b.getNorthEast(),
              d = b.getSouthWest();return { northEast: { lat: c.lat, lng: c.lng }, southWest: { lat: d.lat, lng: d.lng } };
        } };
    }]), angular.module("leaflet-directive").factory("leafletControlHelpers", ["$rootScope", "$log", "leafletHelpers", "leafletLayerHelpers", "leafletMapDefaults", function (a, b, c, d, e) {
      var f = c.isDefined,
          g = c.isObject,
          h = d.createLayer,
          i = {},
          j = c.errorHeader + " [Controls] ",
          k = function (a, b, c) {
        var d = e.getDefaults(c);if (!d.controls.layers.visible) return !1;var h = !1;return g(a) && Object.keys(a).forEach(function (b) {
          var c = a[b];f(c.layerOptions) && c.layerOptions.showOnSelector === !1 || (h = !0);
        }), g(b) && Object.keys(b).forEach(function (a) {
          var c = b[a];f(c.layerParams) && c.layerParams.showOnSelector === !1 || (h = !0);
        }), h;
      },
          l = function (a) {
        var b = e.getDefaults(a),
            c = { collapsed: b.controls.layers.collapsed, position: b.controls.layers.position, autoZIndex: !1 };angular.extend(c, b.controls.layers.options);var d;return d = b.controls.layers && f(b.controls.layers.control) ? b.controls.layers.control.apply(this, [[], [], c]) : new L.control.layers([], [], c);
      },
          m = { draw: { isPluginLoaded: function () {
            return angular.isDefined(L.Control.Draw) ? !0 : (b.error(j + " Draw plugin is not loaded."), !1);
          }, checkValidParams: function () {
            return !0;
          }, createControl: function (a) {
            return new L.Control.Draw(a);
          } }, scale: { isPluginLoaded: function () {
            return !0;
          }, checkValidParams: function () {
            return !0;
          }, createControl: function (a) {
            return new L.control.scale(a);
          } }, fullscreen: { isPluginLoaded: function () {
            return angular.isDefined(L.Control.Fullscreen) ? !0 : (b.error(j + " Fullscreen plugin is not loaded."), !1);
          }, checkValidParams: function () {
            return !0;
          }, createControl: function (a) {
            return new L.Control.Fullscreen(a);
          } }, search: { isPluginLoaded: function () {
            return angular.isDefined(L.Control.Search) ? !0 : (b.error(j + " Search plugin is not loaded."), !1);
          }, checkValidParams: function () {
            return !0;
          }, createControl: function (a) {
            return new L.Control.Search(a);
          } }, custom: {}, minimap: { isPluginLoaded: function () {
            return angular.isDefined(L.Control.MiniMap) ? !0 : (b.error(j + " Minimap plugin is not loaded."), !1);
          }, checkValidParams: function (a) {
            return f(a.layer) ? !0 : (b.warn(j + ' minimap "layer" option should be defined.'), !1);
          }, createControl: function (a) {
            var c = h(a.layer);return f(c) ? new L.Control.MiniMap(c, a) : void b.warn(j + ' minimap control "layer" could not be created.');
          } } };return { layersControlMustBeVisible: k, isValidControlType: function (a) {
          return -1 !== Object.keys(m).indexOf(a);
        }, createControl: function (a, b) {
          return m[a].checkValidParams(b) ? m[a].createControl(b) : void 0;
        }, updateLayersControl: function (a, b, c, d, e, g) {
          var h,
              j = i[b],
              m = k(d, e, b);if (f(j) && c) {
            for (h in g.baselayers) j.removeLayer(g.baselayers[h]);for (h in g.overlays) j.removeLayer(g.overlays[h]);a.removeControl(j), delete i[b];
          }if (m) {
            j = l(b), i[b] = j;for (h in d) {
              var n = f(d[h].layerOptions) && d[h].layerOptions.showOnSelector === !1;!n && f(g.baselayers[h]) && j.addBaseLayer(g.baselayers[h], d[h].name);
            }for (h in e) {
              var o = f(e[h].layerParams) && e[h].layerParams.showOnSelector === !1;!o && f(g.overlays[h]) && j.addOverlay(g.overlays[h], e[h].name);
            }a.addControl(j);
          }return m;
        } };
    }]), angular.module("leaflet-directive").service("leafletData", ["$log", "$q", "leafletHelpers", function (a, b, c) {
      var d = c.getDefer,
          e = c.getUnresolvedDefer,
          f = c.setResolvedDefer,
          g = {},
          h = this,
          i = function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
      },
          j = ["map", "tiles", "layers", "paths", "markers", "geoJSON", "UTFGrid", "decorations", "directiveControls"];j.forEach(function (a) {
        g[a] = {};
      }), this.unresolveMap = function (a) {
        var b = c.obtainEffectiveMapId(g.map, a);j.forEach(function (a) {
          g[a][b] = void 0;
        });
      }, j.forEach(function (a) {
        var b = i(a);h["set" + b] = function (b, c) {
          var d = e(g[a], c);d.resolve(b), f(g[a], c);
        }, h["get" + b] = function (b) {
          var c = d(g[a], b);return c.promise;
        };
      });
    }]), angular.module("leaflet-directive").service("leafletDirectiveControlsHelpers", ["$log", "leafletData", "leafletHelpers", function (a, b, c) {
      var d = c.isDefined,
          e = c.isString,
          f = c.isObject,
          g = c.errorHeader,
          h = g + "[leafletDirectiveControlsHelpers",
          i = function (c, g, i, j) {
        var k = h + ".extend] ",
            l = {};if (!d(g)) return void a.error(k + "thingToAddName cannot be undefined");if (e(g) && d(i) && d(j)) l[g] = { create: i, clean: j };else {
          if (!f(g) || d(i) || d(j)) return void a.error(k + "incorrect arguments");l = g;
        }b.getDirectiveControls().then(function (a) {
          angular.extend(a, l), b.setDirectiveControls(a, c);
        });
      };return { extend: i };
    }]), angular.module("leaflet-directive").service("leafletGeoJsonHelpers", ["leafletHelpers", "leafletIterators", function (a, b) {
      var c = a,
          d = b,
          e = function (a, b) {
        return this.lat = a, this.lng = b, this;
      },
          f = function (a) {
        return Array.isArray(a) && 2 === a.length ? a[1] : c.isDefined(a.type) && "Point" === a.type ? +a.coordinates[1] : +a.lat;
      },
          g = function (a) {
        return Array.isArray(a) && 2 === a.length ? a[0] : c.isDefined(a.type) && "Point" === a.type ? +a.coordinates[0] : +a.lng;
      },
          h = function (a) {
        if (c.isUndefined(a)) return !1;if (c.isArray(a)) {
          if (2 === a.length && c.isNumber(a[0]) && c.isNumber(a[1])) return !0;
        } else if (c.isDefined(a.type) && "Point" === a.type && c.isArray(a.coordinates) && 2 === a.coordinates.length && c.isNumber(a.coordinates[0]) && c.isNumber(a.coordinates[1])) return !0;var b = d.all(["lat", "lng"], function (b) {
          return c.isDefined(a[b]) && c.isNumber(a[b]);
        });return b;
      },
          i = function (a) {
        if (a && h(a)) {
          var b = null;if (Array.isArray(a) && 2 === a.length) b = new e(a[1], a[0]);else {
            if (!c.isDefined(a.type) || "Point" !== a.type) return a;b = new e(a.coordinates[1], a.coordinates[0]);
          }return angular.extend(a, b);
        }
      };return { getLat: f, getLng: g, validateCoords: h, getCoords: i };
    }]), angular.module("leaflet-directive").service("leafletHelpers", ["$q", "$log", function (a, b) {
      function c(a, c) {
        var d, f;if (angular.isDefined(c)) d = c;else if (0 === Object.keys(a).length) d = "main";else if (Object.keys(a).length >= 1) for (f in a) a.hasOwnProperty(f) && (d = f);else b.error(e + "- You have more than 1 map on the DOM, you must provide the map ID to the leafletData.getXXX call");return d;
      }function d(b, d) {
        var e,
            f = c(b, d);return angular.isDefined(b[f]) && b[f].resolvedDefer !== !0 ? e = b[f].defer : (e = a.defer(), b[f] = { defer: e, resolvedDefer: !1 }), e;
      }var e = "[AngularJS - Leaflet] ",
          f = angular.copy,
          g = f,
          h = function (a, b) {
        var c;if (a && angular.isObject(a)) return null !== b && angular.isString(b) ? (c = a, b.split(".").forEach(function (a) {
          c && (c = c[a]);
        }), c) : b;
      },
          i = function (a) {
        return a.split(".").reduce(function (a, b) {
          return a + '["' + b + '"]';
        });
      },
          j = function (a) {
        return a.reduce(function (a, b) {
          return a + "." + b;
        });
      },
          k = function (a) {
        return angular.isDefined(a) && null !== a;
      },
          l = function (a) {
        return !k(a);
      },
          m = /([\:\-\_]+(.))/g,
          n = /^moz([A-Z])/,
          o = /^((?:x|data)[\:\-_])/i,
          p = function (a) {
        return a.replace(m, function (a, b, c, d) {
          return d ? c.toUpperCase() : c;
        }).replace(n, "Moz$1");
      },
          q = function (a) {
        return p(a.replace(o, ""));
      };return { camelCase: p, directiveNormalize: q, copy: f, clone: g, errorHeader: e, getObjectValue: h, getObjectArrayPath: i, getObjectDotPath: j, defaultTo: function (a, b) {
          return k(a) ? a : b;
        }, isTruthy: function (a) {
          return "true" === a || a === !0;
        }, isEmpty: function (a) {
          return 0 === Object.keys(a).length;
        }, isUndefinedOrEmpty: function (a) {
          return angular.isUndefined(a) || null === a || 0 === Object.keys(a).length;
        }, isDefined: k, isUndefined: l, isNumber: angular.isNumber, isString: angular.isString, isArray: angular.isArray, isObject: angular.isObject, isFunction: angular.isFunction, equals: angular.equals, isValidCenter: function (a) {
          return angular.isDefined(a) && angular.isNumber(a.lat) && angular.isNumber(a.lng) && angular.isNumber(a.zoom);
        }, isValidPoint: function (a) {
          return angular.isDefined(a) ? angular.isArray(a) ? 2 === a.length && angular.isNumber(a[0]) && angular.isNumber(a[1]) : angular.isNumber(a.lat) && angular.isNumber(a.lng) : !1;
        }, isSameCenterOnMap: function (a, b) {
          var c = b.getCenter(),
              d = b.getZoom();return a.lat && a.lng && c.lat.toFixed(4) === a.lat.toFixed(4) && c.lng.toFixed(4) === a.lng.toFixed(4) && d === a.zoom ? !0 : !1;
        }, safeApply: function (a, b) {
          var c = a.$root.$$phase;"$apply" === c || "$digest" === c ? a.$eval(b) : a.$evalAsync(b);
        }, obtainEffectiveMapId: c, getDefer: function (a, b) {
          var e,
              f = c(a, b);return e = angular.isDefined(a[f]) && a[f].resolvedDefer !== !1 ? a[f].defer : d(a, b);
        }, getUnresolvedDefer: d, setResolvedDefer: function (a, b) {
          var d = c(a, b);a[d].resolvedDefer = !0;
        }, rangeIsSupported: function () {
          var a = document.createElement("input");return a.setAttribute("type", "range"), "range" === a.type;
        }, FullScreenControlPlugin: { isLoaded: function () {
            return angular.isDefined(L.Control.Fullscreen);
          } }, MiniMapControlPlugin: { isLoaded: function () {
            return angular.isDefined(L.Control.MiniMap);
          } }, AwesomeMarkersPlugin: { isLoaded: function () {
            return angular.isDefined(L.AwesomeMarkers) && angular.isDefined(L.AwesomeMarkers.Icon);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.AwesomeMarkers.Icon : !1;
          }, equal: function (a, b) {
            return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1;
          } }, VectorMarkersPlugin: { isLoaded: function () {
            return angular.isDefined(L.VectorMarkers) && angular.isDefined(L.VectorMarkers.Icon);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.VectorMarkers.Icon : !1;
          }, equal: function (a, b) {
            return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1;
          } }, DomMarkersPlugin: { isLoaded: function () {
            return angular.isDefined(L.DomMarkers) && angular.isDefined(L.DomMarkers.Icon) ? !0 : !1;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.DomMarkers.Icon : !1;
          }, equal: function (a, b) {
            return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1;
          } }, PolylineDecoratorPlugin: { isLoaded: function () {
            return angular.isDefined(L.PolylineDecorator) ? !0 : !1;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.PolylineDecorator : !1;
          }, equal: function (a, b) {
            return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1;
          } }, MakiMarkersPlugin: { isLoaded: function () {
            return angular.isDefined(L.MakiMarkers) && angular.isDefined(L.MakiMarkers.Icon) ? !0 : !1;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.MakiMarkers.Icon : !1;
          }, equal: function (a, b) {
            return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1;
          } }, ExtraMarkersPlugin: { isLoaded: function () {
            return angular.isDefined(L.ExtraMarkers) && angular.isDefined(L.ExtraMarkers.Icon) ? !0 : !1;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.ExtraMarkers.Icon : !1;
          }, equal: function (a, b) {
            return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1;
          } }, LabelPlugin: { isLoaded: function () {
            return angular.isDefined(L.Label);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.MarkerClusterGroup : !1;
          } }, MarkerClusterPlugin: { isLoaded: function () {
            return angular.isDefined(L.MarkerClusterGroup);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.MarkerClusterGroup : !1;
          } }, GoogleLayerPlugin: { isLoaded: function () {
            return angular.isDefined(L.Google);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.Google : !1;
          } }, LeafletProviderPlugin: { isLoaded: function () {
            return angular.isDefined(L.TileLayer.Provider);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.TileLayer.Provider : !1;
          } }, ChinaLayerPlugin: { isLoaded: function () {
            return angular.isDefined(L.tileLayer.chinaProvider);
          } }, HeatLayerPlugin: { isLoaded: function () {
            return angular.isDefined(L.heatLayer);
          } }, WebGLHeatMapLayerPlugin: { isLoaded: function () {
            return angular.isDefined(L.TileLayer.WebGLHeatMap);
          } }, BingLayerPlugin: { isLoaded: function () {
            return angular.isDefined(L.BingLayer);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.BingLayer : !1;
          } }, WFSLayerPlugin: { isLoaded: function () {
            return void 0 !== L.GeoJSON.WFS;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.GeoJSON.WFS : !1;
          } }, AGSBaseLayerPlugin: { isLoaded: function () {
            return void 0 !== L.esri && void 0 !== L.esri.basemapLayer;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.esri.basemapLayer : !1;
          } }, AGSLayerPlugin: { isLoaded: function () {
            return void 0 !== lvector && void 0 !== lvector.AGS;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof lvector.AGS : !1;
          } }, AGSFeatureLayerPlugin: { isLoaded: function () {
            return void 0 !== L.esri && void 0 !== L.esri.featureLayer;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.esri.featureLayer : !1;
          } }, AGSTiledMapLayerPlugin: { isLoaded: function () {
            return void 0 !== L.esri && void 0 !== L.esri.tiledMapLayer;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.esri.tiledMapLayer : !1;
          } }, AGSDynamicMapLayerPlugin: { isLoaded: function () {
            return void 0 !== L.esri && void 0 !== L.esri.dynamicMapLayer;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.esri.dynamicMapLayer : !1;
          } }, AGSImageMapLayerPlugin: { isLoaded: function () {
            return void 0 !== L.esri && void 0 !== L.esri.imageMapLayer;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.esri.imageMapLayer : !1;
          } }, AGSClusteredLayerPlugin: { isLoaded: function () {
            return void 0 !== L.esri && void 0 !== L.esri.clusteredFeatureLayer;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.esri.clusteredFeatureLayer : !1;
          } }, AGSHeatmapLayerPlugin: { isLoaded: function () {
            return void 0 !== L.esri && void 0 !== L.esri.heatmapFeatureLayer;
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.esri.heatmapFeatureLayer : !1;
          } }, YandexLayerPlugin: { isLoaded: function () {
            return angular.isDefined(L.Yandex);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.Yandex : !1;
          } }, GeoJSONPlugin: { isLoaded: function () {
            return angular.isDefined(L.TileLayer.GeoJSON);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.TileLayer.GeoJSON : !1;
          } }, UTFGridPlugin: { isLoaded: function () {
            return angular.isDefined(L.UtfGrid);
          }, is: function (a) {
            return this.isLoaded() ? a instanceof L.UtfGrid : (b.error("[AngularJS - Leaflet] No UtfGrid plugin found."), !1);
          } }, CartoDB: { isLoaded: function () {
            return cartodb;
          }, is: function () {
            return !0;
          } }, Leaflet: { DivIcon: { is: function (a) {
              return a instanceof L.DivIcon;
            }, equal: function (a, b) {
              return this.is(a) ? angular.equals(a, b) : !1;
            } }, Icon: { is: function (a) {
              return a instanceof L.Icon;
            }, equal: function (a, b) {
              return this.is(a) ? angular.equals(a, b) : !1;
            } } }, watchOptions: { doWatch: !0, isDeep: !0, individual: { doWatch: !0, isDeep: !0 } } };
    }]), angular.module("leaflet-directive").service("leafletIterators", ["$log", "leafletHelpers", function (a, b) {
      var c,
          d = b,
          e = b.errorHeader + "leafletIterators: ",
          f = Object.keys,
          g = d.isFunction,
          h = d.isObject,
          i = Math.pow(2, 53) - 1,
          j = function (a) {
        var b = null !== a && a.length;return d.isNumber(b) && b >= 0 && i >= b;
      },
          k = function (a) {
        return a;
      },
          l = function (a) {
        return function (b) {
          return null === b ? void 0 : b[a];
        };
      },
          m = function (a, b, c) {
        if (void 0 === b) return a;switch (null === c ? 3 : c) {case 1:
            return function (c) {
              return a.call(b, c);
            };case 2:
            return function (c, d) {
              return a.call(b, c, d);
            };case 3:
            return function (c, d, e) {
              return a.call(b, c, d, e);
            };case 4:
            return function (c, d, e, f) {
              return a.call(b, c, d, e, f);
            };}return function () {
          return a.apply(b, arguments);
        };
      },
          n = function (a, b) {
        return function (c) {
          var d = arguments.length;if (2 > d || null === c) return c;for (var e = 1; d > e; e++) for (var f = arguments[e], g = a(f), h = g.length, i = 0; h > i; i++) {
            var j = g[i];b && void 0 !== c[j] || (c[j] = f[j]);
          }return c;
        };
      },
          o = null;c = o = n(f);var p,
          q = function (a, b) {
        var c = f(b),
            d = c.length;if (null === a) return !d;for (var e = Object(a), g = 0; d > g; g++) {
          var h = c[g];if (b[h] !== e[h] || !(h in e)) return !1;
        }return !0;
      },
          r = null;p = r = function (a) {
        return a = c({}, a), function (b) {
          return q(b, a);
        };
      };var s,
          t = function (a, b, c) {
        return null === a ? k : g(a) ? m(a, b, c) : h(a) ? p(a) : l(a);
      },
          u = null;s = u = function (a, b, c) {
        b = t(b, c);for (var d = !j(a) && f(a), e = (d || a).length, g = 0; e > g; g++) {
          var h = d ? d[g] : g;if (!b(a[h], h, a)) return !1;
        }return !0;
      };var v = function (b, c, f, g) {
        return f || d.isDefined(b) && d.isDefined(c) ? d.isFunction(c) ? !1 : (g = d.defaultTo(c, "cb"), a.error(e + g + " is not a function"), !0) : !0;
      },
          w = function (a, b, c) {
        if (!v(void 0, c, !0, "internalCb") && !v(a, b)) for (var d in a) a.hasOwnProperty(d) && c(a[d], d);
      },
          x = function (a, b) {
        w(a, b, function (a, c) {
          b(a, c);
        });
      };return { each: x, forEach: x, every: s, all: u };
    }]), angular.module("leaflet-directive").factory("leafletLayerHelpers", ["$rootScope", "$log", "$q", "leafletHelpers", "leafletIterators", function ($rootScope, $log, $q, leafletHelpers, leafletIterators) {
      function isValidLayerType(a) {
        return isString(a.type) ? -1 === Object.keys(layerTypes).indexOf(a.type) ? ($log.error("[AngularJS - Leaflet] A layer must have a valid type: " + Object.keys(layerTypes)), !1) : layerTypes[a.type].mustHaveUrl && !isString(a.url) ? ($log.error("[AngularJS - Leaflet] A base layer must have an url"), !1) : layerTypes[a.type].mustHaveData && !isDefined(a.data) ? ($log.error('[AngularJS - Leaflet] The base layer must have a "data" array attribute'), !1) : layerTypes[a.type].mustHaveLayer && !isDefined(a.layer) ? ($log.error("[AngularJS - Leaflet] The type of layer " + a.type + " must have an layer defined"), !1) : layerTypes[a.type].mustHaveBounds && !isDefined(a.bounds) ? ($log.error("[AngularJS - Leaflet] The type of layer " + a.type + " must have bounds defined"), !1) : layerTypes[a.type].mustHaveKey && !isDefined(a.key) ? ($log.error("[AngularJS - Leaflet] The type of layer " + a.type + " must have key defined"), !1) : !0 : ($log.error("[AngularJS - Leaflet] A layer must have a valid type defined."), !1);
      }function createLayer(a) {
        if (isValidLayerType(a)) {
          if (!isString(a.name)) return void $log.error("[AngularJS - Leaflet] A base layer must have a name");isObject(a.layerParams) || (a.layerParams = {}), isObject(a.layerOptions) || (a.layerOptions = {});for (var b in a.layerParams) a.layerOptions[b] = a.layerParams[b];var c = { url: a.url, data: a.data, options: a.layerOptions, layer: a.layer, icon: a.icon, type: a.layerType, bounds: a.bounds, key: a.key, apiKey: a.apiKey, pluginOptions: a.pluginOptions, user: a.user };return layerTypes[a.type].createLayer(c);
        }
      }function safeAddLayer(a, b) {
        b && "function" == typeof b.addTo ? b.addTo(a) : a.addLayer(b);
      }function safeRemoveLayer(a, b, c) {
        if (isDefined(c) && isDefined(c.loadedDefer)) {
          if (angular.isFunction(c.loadedDefer)) {
            var d = c.loadedDefer();$log.debug("Loaded Deferred", d);var e = d.length;if (e > 0) for (var f = function () {
              e--, 0 === e && a.removeLayer(b);
            }, g = 0; g < d.length; g++) d[g].promise.then(f);else a.removeLayer(b);
          } else c.loadedDefer.promise.then(function () {
            a.removeLayer(b);
          });
        } else a.removeLayer(b);
      }var Helpers = leafletHelpers,
          isString = leafletHelpers.isString,
          isObject = leafletHelpers.isObject,
          isArray = leafletHelpers.isArray,
          isDefined = leafletHelpers.isDefined,
          errorHeader = leafletHelpers.errorHeader,
          $it = leafletIterators,
          utfGridCreateLayer = function (a) {
        if (!Helpers.UTFGridPlugin.isLoaded()) return void $log.error("[AngularJS - Leaflet] The UTFGrid plugin is not loaded.");var b = new L.UtfGrid(a.url, a.pluginOptions);return b.on("mouseover", function (a) {
          $rootScope.$broadcast("leafletDirectiveMap.utfgridMouseover", a);
        }), b.on("mouseout", function (a) {
          $rootScope.$broadcast("leafletDirectiveMap.utfgridMouseout", a);
        }), b.on("click", function (a) {
          $rootScope.$broadcast("leafletDirectiveMap.utfgridClick", a);
        }), b.on("mousemove", function (a) {
          $rootScope.$broadcast("leafletDirectiveMap.utfgridMousemove", a);
        }), b;
      },
          layerTypes = { xyz: { mustHaveUrl: !0, createLayer: function (a) {
            return L.tileLayer(a.url, a.options);
          } }, mapbox: { mustHaveKey: !0, createLayer: function (a) {
            var b = 3;isDefined(a.options.version) && 4 === a.options.version && (b = a.options.version);var c = 3 === b ? "//{s}.tiles.mapbox.com/v3/" + a.key + "/{z}/{x}/{y}.png" : "//api.tiles.mapbox.com/v4/" + a.key + "/{z}/{x}/{y}.png?access_token=" + a.apiKey;return L.tileLayer(c, a.options);
          } }, geoJSON: { mustHaveUrl: !0, createLayer: function (a) {
            return Helpers.GeoJSONPlugin.isLoaded() ? new L.TileLayer.GeoJSON(a.url, a.pluginOptions, a.options) : void 0;
          } }, geoJSONShape: { mustHaveUrl: !1, createLayer: function (a) {
            return new L.GeoJSON(a.data, a.options);
          } }, geoJSONAwesomeMarker: { mustHaveUrl: !1, createLayer: function (a) {
            return new L.geoJson(a.data, { pointToLayer: function (b, c) {
                return L.marker(c, { icon: L.AwesomeMarkers.icon(a.icon) });
              } });
          } }, geoJSONVectorMarker: { mustHaveUrl: !1, createLayer: function (a) {
            return new L.geoJson(a.data, { pointToLayer: function (b, c) {
                return L.marker(c, { icon: L.VectorMarkers.icon(a.icon) });
              } });
          } }, utfGrid: { mustHaveUrl: !0, createLayer: utfGridCreateLayer }, cartodbTiles: { mustHaveKey: !0, createLayer: function (a) {
            var b = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/{z}/{x}/{y}.png";return L.tileLayer(b, a.options);
          } }, cartodbUTFGrid: { mustHaveKey: !0, mustHaveLayer: !0, createLayer: function (a) {
            return a.url = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/" + a.layer + "/{z}/{x}/{y}.grid.json", utfGridCreateLayer(a);
          } }, cartodbInteractive: { mustHaveKey: !0, mustHaveLayer: !0, createLayer: function (a) {
            var b = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/{z}/{x}/{y}.png",
                c = L.tileLayer(b, a.options);a.url = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/" + a.layer + "/{z}/{x}/{y}.grid.json";var d = utfGridCreateLayer(a);return L.layerGroup([c, d]);
          } }, wms: { mustHaveUrl: !0, createLayer: function (a) {
            return L.tileLayer.wms(a.url, a.options);
          } }, wmts: { mustHaveUrl: !0, createLayer: function (a) {
            return L.tileLayer.wmts(a.url, a.options);
          } }, wfs: { mustHaveUrl: !0, mustHaveLayer: !0, createLayer: function (params) {
            if (Helpers.WFSLayerPlugin.isLoaded()) {
              var options = angular.copy(params.options);return options.crs && "string" == typeof options.crs && (options.crs = eval(options.crs)), new L.GeoJSON.WFS(params.url, params.layer, options);
            }
          } }, group: { mustHaveUrl: !1, createLayer: function (a) {
            var b = [];return $it.each(a.options.layers, function (a) {
              b.push(createLayer(a));
            }), a.options.loadedDefer = function () {
              var b = [];if (isDefined(a.options.layers)) for (var c = 0; c < a.options.layers.length; c++) {
                var d = a.options.layers[c].layerOptions.loadedDefer;isDefined(d) && b.push(d);
              }return b;
            }, L.layerGroup(b);
          } }, featureGroup: { mustHaveUrl: !1, createLayer: function () {
            return L.featureGroup();
          } }, google: { mustHaveUrl: !1, createLayer: function (a) {
            var b = a.type || "SATELLITE";if (Helpers.GoogleLayerPlugin.isLoaded()) return new L.Google(b, a.options);
          } }, here: { mustHaveUrl: !1, createLayer: function (a) {
            var b = a.provider || "HERE.terrainDay";if (Helpers.LeafletProviderPlugin.isLoaded()) return new L.TileLayer.Provider(b, a.options);
          } }, china: { mustHaveUrl: !1, createLayer: function (a) {
            var b = a.type || "";if (Helpers.ChinaLayerPlugin.isLoaded()) return L.tileLayer.chinaProvider(b, a.options);
          } }, agsBase: { mustHaveLayer: !0, createLayer: function (a) {
            return Helpers.AGSBaseLayerPlugin.isLoaded() ? L.esri.basemapLayer(a.layer, a.options) : void 0;
          } }, ags: { mustHaveUrl: !0, createLayer: function (a) {
            if (Helpers.AGSLayerPlugin.isLoaded()) {
              var b = angular.copy(a.options);angular.extend(b, { url: a.url });var c = new lvector.AGS(b);return c.onAdd = function (a) {
                this.setMap(a);
              }, c.onRemove = function () {
                this.setMap(null);
              }, c;
            }
          } }, agsFeature: { mustHaveUrl: !0, createLayer: function (a) {
            if (!Helpers.AGSFeatureLayerPlugin.isLoaded()) return void $log.warn(errorHeader + " The esri plugin is not loaded.");a.options.url = a.url;var b = L.esri.featureLayer(a.options),
                c = function () {
              isDefined(a.options.loadedDefer) && a.options.loadedDefer.resolve();
            };return b.on("loading", function () {
              a.options.loadedDefer = $q.defer(), b.off("load", c), b.on("load", c);
            }), b;
          } }, agsTiled: { mustHaveUrl: !0, createLayer: function (a) {
            return Helpers.AGSTiledMapLayerPlugin.isLoaded() ? (a.options.url = a.url, L.esri.tiledMapLayer(a.options)) : void $log.warn(errorHeader + " The esri plugin is not loaded.");
          } }, agsDynamic: { mustHaveUrl: !0, createLayer: function (a) {
            return Helpers.AGSDynamicMapLayerPlugin.isLoaded() ? (a.options.url = a.url, L.esri.dynamicMapLayer(a.options)) : void $log.warn(errorHeader + " The esri plugin is not loaded.");
          } }, agsImage: { mustHaveUrl: !0, createLayer: function (a) {
            return Helpers.AGSImageMapLayerPlugin.isLoaded() ? (a.options.url = a.url, L.esri.imageMapLayer(a.options)) : void $log.warn(errorHeader + " The esri plugin is not loaded.");
          } }, agsClustered: { mustHaveUrl: !0, createLayer: function (a) {
            return Helpers.AGSClusteredLayerPlugin.isLoaded() ? Helpers.MarkerClusterPlugin.isLoaded() ? L.esri.clusteredFeatureLayer(a.url, a.options) : void $log.warn(errorHeader + " The markercluster plugin is not loaded.") : void $log.warn(errorHeader + " The esri clustered layer plugin is not loaded.");
          } }, agsHeatmap: { mustHaveUrl: !0, createLayer: function (a) {
            return Helpers.AGSHeatmapLayerPlugin.isLoaded() ? Helpers.HeatLayerPlugin.isLoaded() ? L.esri.heatmapFeatureLayer(a.url, a.options) : void $log.warn(errorHeader + " The heatlayer plugin is not loaded.") : void $log.warn(errorHeader + " The esri heatmap layer plugin is not loaded.");
          } }, markercluster: { mustHaveUrl: !1, createLayer: function (a) {
            return Helpers.MarkerClusterPlugin.isLoaded() ? new L.MarkerClusterGroup(a.options) : void $log.warn(errorHeader + " The markercluster plugin is not loaded.");
          } }, bing: { mustHaveUrl: !1, createLayer: function (a) {
            return Helpers.BingLayerPlugin.isLoaded() ? new L.BingLayer(a.key, a.options) : void 0;
          } }, webGLHeatmap: { mustHaveUrl: !1, mustHaveData: !0, createLayer: function (a) {
            if (Helpers.WebGLHeatMapLayerPlugin.isLoaded()) {
              var b = new L.TileLayer.WebGLHeatMap(a.options);return isDefined(a.data) && b.setData(a.data), b;
            }
          } }, heat: { mustHaveUrl: !1, mustHaveData: !0, createLayer: function (a) {
            if (Helpers.HeatLayerPlugin.isLoaded()) {
              var b = new L.heatLayer();return isArray(a.data) && b.setLatLngs(a.data), isObject(a.options) && b.setOptions(a.options), b;
            }
          } }, yandex: { mustHaveUrl: !1, createLayer: function (a) {
            var b = a.type || "map";if (Helpers.YandexLayerPlugin.isLoaded()) return new L.Yandex(b, a.options);
          } }, imageOverlay: { mustHaveUrl: !0, mustHaveBounds: !0, createLayer: function (a) {
            return L.imageOverlay(a.url, a.bounds, a.options);
          } }, iip: { mustHaveUrl: !0, createLayer: function (a) {
            return L.tileLayer.iip(a.url, a.options);
          } }, custom: { createLayer: function (a) {
            return a.layer instanceof L.Class ? angular.copy(a.layer) : void $log.error("[AngularJS - Leaflet] A custom layer must be a leaflet Class");
          } }, cartodb: { mustHaveUrl: !0, createLayer: function (a) {
            return cartodb.createLayer(a.map, a.url);
          } } };return { createLayer: createLayer, safeAddLayer: safeAddLayer, safeRemoveLayer: safeRemoveLayer };
    }]), angular.module("leaflet-directive").factory("leafletLegendHelpers", function () {
      var a = function (a, b, c, d) {
        if (a.innerHTML = "", b.error) a.innerHTML += '<div class="info-title alert alert-danger">' + b.error.message + "</div>";else if ("arcgis" === c) for (var e = 0; e < b.layers.length; e++) {
          var f = b.layers[e];a.innerHTML += '<div class="info-title" data-layerid="' + f.layerId + '">' + f.layerName + "</div>";for (var g = 0; g < f.legend.length; g++) {
            var h = f.legend[g];a.innerHTML += '<div class="inline" data-layerid="' + f.layerId + '"><img src="data:' + h.contentType + ";base64," + h.imageData + '" /></div><div class="info-label" data-layerid="' + f.layerId + '">' + h.label + "</div>";
          }
        } else "image" === c && (a.innerHTML = '<img src="' + d + '"/>');
      },
          b = function (b, c, d, e) {
        return function () {
          var f = L.DomUtil.create("div", c);return L.Browser.touch ? L.DomEvent.on(f, "click", L.DomEvent.stopPropagation) : (L.DomEvent.disableClickPropagation(f), L.DomEvent.on(f, "mousewheel", L.DomEvent.stopPropagation)), a(f, b, d, e), f;
        };
      },
          c = function (a, b) {
        return function () {
          for (var c = L.DomUtil.create("div", b), d = 0; d < a.colors.length; d++) c.innerHTML += '<div class="outline"><i style="background:' + a.colors[d] + '"></i></div><div class="info-label">' + a.labels[d] + "</div>";return L.Browser.touch ? L.DomEvent.on(c, "click", L.DomEvent.stopPropagation) : (L.DomEvent.disableClickPropagation(c), L.DomEvent.on(c, "mousewheel", L.DomEvent.stopPropagation)), c;
        };
      };return { getOnAddLegend: b, getOnAddArrayLegend: c, updateLegend: a };
    }), angular.module("leaflet-directive").factory("leafletMapDefaults", ["$q", "leafletHelpers", function (a, b) {
      function c() {
        return { keyboard: !0, dragging: !0, worldCopyJump: !1, doubleClickZoom: !0, scrollWheelZoom: !0, tap: !0, touchZoom: !0, zoomControl: !0, zoomsliderControl: !1, zoomControlPosition: "topleft", attributionControl: !0, controls: { layers: { visible: !0, position: "topright", collapsed: !0 } }, nominatim: { server: " http://nominatim.openstreetmap.org/search" }, crs: L.CRS.EPSG3857, tileLayer: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", tileLayerOptions: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }, path: { weight: 10, opacity: 1, color: "#0000ff" }, center: { lat: 0, lng: 0, zoom: 1 } };
      }var d = b.isDefined,
          e = b.isObject,
          f = b.obtainEffectiveMapId,
          g = {};return { reset: function () {
          g = {};
        }, getDefaults: function (a) {
          var b = f(g, a);return g[b];
        }, getMapCreationDefaults: function (a) {
          var b = f(g, a),
              c = g[b],
              e = { maxZoom: c.maxZoom, keyboard: c.keyboard, dragging: c.dragging, zoomControl: c.zoomControl, doubleClickZoom: c.doubleClickZoom, scrollWheelZoom: c.scrollWheelZoom, tap: c.tap, touchZoom: c.touchZoom, attributionControl: c.attributionControl, worldCopyJump: c.worldCopyJump, crs: c.crs };if (d(c.minZoom) && (e.minZoom = c.minZoom), d(c.zoomAnimation) && (e.zoomAnimation = c.zoomAnimation), d(c.fadeAnimation) && (e.fadeAnimation = c.fadeAnimation), d(c.markerZoomAnimation) && (e.markerZoomAnimation = c.markerZoomAnimation), c.map) for (var h in c.map) e[h] = c.map[h];return e;
        }, setDefaults: function (a, b) {
          var h = c();d(a) && (h.doubleClickZoom = d(a.doubleClickZoom) ? a.doubleClickZoom : h.doubleClickZoom, h.scrollWheelZoom = d(a.scrollWheelZoom) ? a.scrollWheelZoom : h.doubleClickZoom, h.tap = d(a.tap) ? a.tap : h.tap, h.touchZoom = d(a.touchZoom) ? a.touchZoom : h.doubleClickZoom, h.zoomControl = d(a.zoomControl) ? a.zoomControl : h.zoomControl, h.zoomsliderControl = d(a.zoomsliderControl) ? a.zoomsliderControl : h.zoomsliderControl, h.attributionControl = d(a.attributionControl) ? a.attributionControl : h.attributionControl, h.tileLayer = d(a.tileLayer) ? a.tileLayer : h.tileLayer, h.zoomControlPosition = d(a.zoomControlPosition) ? a.zoomControlPosition : h.zoomControlPosition, h.keyboard = d(a.keyboard) ? a.keyboard : h.keyboard, h.dragging = d(a.dragging) ? a.dragging : h.dragging, d(a.controls) && angular.extend(h.controls, a.controls), e(a.crs) ? h.crs = a.crs : d(L.CRS[a.crs]) && (h.crs = L.CRS[a.crs]), d(a.center) && angular.copy(a.center, h.center), d(a.tileLayerOptions) && angular.copy(a.tileLayerOptions, h.tileLayerOptions), d(a.maxZoom) && (h.maxZoom = a.maxZoom), d(a.minZoom) && (h.minZoom = a.minZoom), d(a.zoomAnimation) && (h.zoomAnimation = a.zoomAnimation), d(a.fadeAnimation) && (h.fadeAnimation = a.fadeAnimation), d(a.markerZoomAnimation) && (h.markerZoomAnimation = a.markerZoomAnimation), d(a.worldCopyJump) && (h.worldCopyJump = a.worldCopyJump), d(a.map) && (h.map = a.map), d(a.path) && (h.path = a.path));var i = f(g, b);return g[i] = h, h;
        } };
    }]), angular.module("leaflet-directive").service("leafletMarkersHelpers", ["$rootScope", "$timeout", "leafletHelpers", "$log", "$compile", "leafletGeoJsonHelpers", function (a, b, c, d, e, f) {
      var g = c.isDefined,
          h = c.defaultTo,
          i = c.MarkerClusterPlugin,
          j = c.AwesomeMarkersPlugin,
          k = c.VectorMarkersPlugin,
          l = c.MakiMarkersPlugin,
          m = c.ExtraMarkersPlugin,
          n = c.DomMarkersPlugin,
          o = c.safeApply,
          p = c,
          q = c.isString,
          r = c.isNumber,
          s = c.isObject,
          t = {},
          u = f,
          v = c.errorHeader,
          w = function (a) {
        var b = "";return ["_icon", "_latlng", "_leaflet_id", "_map", "_shadow"].forEach(function (c) {
          b += c + ": " + h(a[c], "undefined") + " \n";
        }), "[leafletMarker] : \n" + b;
      },
          x = function (a, b) {
        var c = b ? console : d;c.debug(w(a));
      },
          y = function (b) {
        if (g(b) && g(b.type) && "awesomeMarker" === b.type) return j.isLoaded() || d.error(v + " The AwesomeMarkers Plugin is not loaded."), new L.AwesomeMarkers.icon(b);if (g(b) && g(b.type) && "vectorMarker" === b.type) return k.isLoaded() || d.error(v + " The VectorMarkers Plugin is not loaded."), new L.VectorMarkers.icon(b);if (g(b) && g(b.type) && "makiMarker" === b.type) return l.isLoaded() || d.error(v + "The MakiMarkers Plugin is not loaded."), new L.MakiMarkers.icon(b);if (g(b) && g(b.type) && "extraMarker" === b.type) return m.isLoaded() || d.error(v + "The ExtraMarkers Plugin is not loaded."), new L.ExtraMarkers.icon(b);if (g(b) && g(b.type) && "div" === b.type) return new L.divIcon(b);if (g(b) && g(b.type) && "dom" === b.type) {
          n.isLoaded() || d.error(v + "The DomMarkers Plugin is not loaded.");var c = angular.isFunction(b.getMarkerScope) ? b.getMarkerScope() : a,
              f = e(b.template)(c),
              h = angular.copy(b);return h.element = f[0], new L.DomMarkers.icon(h);
        }if (g(b) && g(b.type) && "icon" === b.type) return b.icon;var i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAGmklEQVRYw7VXeUyTZxjvNnfELFuyIzOabermMZEeQC/OclkO49CpOHXOLJl/CAURuYbQi3KLgEhbrhZ1aDwmaoGqKII6odATmH/scDFbdC7LvFqOCc+e95s2VG50X/LLm/f4/Z7neY/ne18aANCmAr5E/xZf1uDOkTcGcWR6hl9247tT5U7Y6SNvWsKT63P58qbfeLJG8M5qcgTknrvvrdDbsT7Ml+tv82X6vVxJE33aRmgSyYtcWVMqX97Yv2JvW39UhRE2HuyBL+t+gK1116ly06EeWFNlAmHxlQE0OMiV6mQCScusKRlhS3QLeVJdl1+23h5dY4FNB3thrbYboqptEFlphTC1hSpJnbRvxP4NWgsE5Jyz86QNNi/5qSUTGuFk1gu54tN9wuK2wc3o+Wc13RCmsoBwEqzGcZsxsvCSy/9wJKf7UWf1mEY8JWfewc67UUoDbDjQC+FqK4QqLVMGGR9d2wurKzqBk3nqIT/9zLxRRjgZ9bqQgub+DdoeCC03Q8j+0QhFhBHR/eP3U/zCln7Uu+hihJ1+bBNffLIvmkyP0gpBZWYXhKussK6mBz5HT6M1Nqpcp+mBCPXosYQfrekGvrjewd59/GvKCE7TbK/04/ZV5QZYVWmDwH1mF3xa2Q3ra3DBC5vBT1oP7PTj4C0+CcL8c7C2CtejqhuCnuIQHaKHzvcRfZpnylFfXsYJx3pNLwhKzRAwAhEqG0SpusBHfAKkxw3w4627MPhoCH798z7s0ZnBJ/MEJbZSbXPhER2ih7p2ok/zSj2cEJDd4CAe+5WYnBCgR2uruyEw6zRoW6/DWJ/OeAP8pd/BGtzOZKpG8oke0SX6GMmRk6GFlyAc59K32OTEinILRJRchah8HQwND8N435Z9Z0FY1EqtxUg+0SO6RJ/mmXz4VuS+DpxXC3gXmZwIL7dBSH4zKE50wESf8qwVgrP1EIlTO5JP9Igu0aexdh28F1lmAEGJGfh7jE6ElyM5Rw/FDcYJjWhbeiBYoYNIpc2FT/SILivp0F1ipDWk4BIEo2VuodEJUifhbiltnNBIXPUFCMpthtAyqws/BPlEF/VbaIxErdxPphsU7rcCp8DohC+GvBIPJS/tW2jtvTmmAeuNO8BNOYQeG8G/2OzCJ3q+soYB5i6NhMaKr17FSal7GIHheuV3uSCY8qYVuEm1cOzqdWr7ku/R0BDoTT+DT+ohCM6/CCvKLKO4RI+dXPeAuaMqksaKrZ7L3FE5FIFbkIceeOZ2OcHO6wIhTkNo0ffgjRGxEqogXHYUPHfWAC/lADpwGcLRY3aeK4/oRGCKYcZXPVoeX/kelVYY8dUGf8V5EBRbgJXT5QIPhP9ePJi428JKOiEYhYXFBqou2Guh+p/mEB1/RfMw6rY7cxcjTrneI1FrDyuzUSRm9miwEJx8E/gUmqlyvHGkneiwErR21F3tNOK5Tf0yXaT+O7DgCvALTUBXdM4YhC/IawPU+2PduqMvuaR6eoxSwUk75ggqsYJ7VicsnwGIkZBSXKOUww73WGXyqP+J2/b9c+gi1YAg/xpwck3gJuucNrh5JvDPvQr0WFXf0piyt8f8/WI0hV4pRxxkQZdJDfDJNOAmM0Ag8jyT6hz0WGXWuP94Yh2jcfjmXAGvHCMslRimDHYuHuDsy2QtHuIavznhbYURq5R57KpzBBRZKPJi8eQg48h4j8SDdowifdIrEVdU+gbO6QNvRRt4ZBthUaZhUnjlYObNagV3keoeru3rU7rcuceqU1mJBxy+BWZYlNEBH+0eH4vRiB+OYybU2hnblYlTvkHinM4m54YnxSyaZYSF6R3jwgP7udKLGIX6r/lbNa9N6y5MFynjWDtrHd75ZvTYAPO/6RgF0k76mQla3FGq7dO+cH8sKn0Vo7nDllwAhqwLPkxrHwWmHJOo+AKJ4rab5OgrM7rVu8eWb2Pu0Dh4eDgXoOfvp7Y7QeqknRmvcTBEyq9m/HQQSCSz6LHq3z0yzsNySRfMS253wl2KyRDbcZPcfJKjZmSEOjcxyi+Y8dUOtsIEH6R2wNykdqrkYJ0RV92H0W58pkfQk7cKevsLK10Py8SdMGfXNXATY+pPbyJR/ET6n9nIfztNtZYRV9XniQu9IA2vOVgy4ir7GCLVmmd+zjkH0eAF9Po6K61pmCXHxU5rHMYd1ftc3owjwRSVRzLjKvqZEty6cRUD7jGqiOdu5HG6MdHjNcNYGqfDm5YRzLBBCCDl/2bk8a8gdbqcfwECu62Fg/HrggAAAABJRU5ErkJggg==",
            o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5ElEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBNwU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzyBjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZhzMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmLNqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoBjq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOtiiajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF174H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzrWQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=";return g(b) && g(b.iconUrl) ? new L.Icon(b) : new L.Icon.Default({ iconUrl: i, shadowUrl: o, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
      },
          z = function (a) {
        g(t[a]) && t.splice(a, 1);
      },
          A = function () {
        t = {};
      },
          B = function (a, b, c) {
        if (a.closePopup(), g(c) && g(c.overlays)) for (var d in c.overlays) if ((c.overlays[d] instanceof L.LayerGroup || c.overlays[d] instanceof L.FeatureGroup) && c.overlays[d].hasLayer(a)) return void c.overlays[d].removeLayer(a);if (g(t)) for (var e in t) t[e].hasLayer(a) && t[e].removeLayer(a);b.hasLayer(a) && b.removeLayer(a);
      },
          C = function (a, b) {
        var c = a._popup._container.offsetHeight,
            d = new L.Point(a._popup._containerLeft, -c - a._popup._containerBottom),
            e = b.layerPointToContainerPoint(d);null !== e && a._popup._adjustPan();
      },
          D = function (a, b) {
        e(a._popup._contentNode)(b);
      },
          E = function (a, c, d) {
        var e = a._popup._contentNode.innerText || a._popup._contentNode.textContent;e.length < 1 && b(function () {
          E(a, c, d);
        });var f = a._popup._contentNode.offsetWidth;return a._popup._updateLayout(), a._popup._updatePosition(), a._popup.options.autoPan && C(a, d), f;
      },
          F = function (b, c, e) {
        var f = angular.isFunction(c.getMessageScope) ? c.getMessageScope() : a,
            h = g(c.compileMessage) ? c.compileMessage : !0;if (h) {
          if (!g(b._popup) || !g(b._popup._contentNode)) return d.error(v + "Popup is invalid or does not have any content."), !1;D(b, f), E(b, c, e);
        }
      },
          G = function (b, c) {
        var d = angular.isFunction(c.getMessageScope) ? c.getMessageScope() : a,
            f = angular.isFunction(c.getLabelScope) ? c.getLabelScope() : d,
            h = g(c.compileMessage) ? c.compileMessage : !0;p.LabelPlugin.isLoaded() && g(c.label) && (g(c.label.options) && c.label.options.noHide === !0 && b.showLabel(), h && g(b.label) && e(b.label._container)(f));
      },
          H = function (a, b, c, e, f, h, i) {
        if (g(b)) {
          if (!u.validateCoords(a)) return d.warn("There are problems with lat-lng data, please verify your marker model"), void B(c, i, h);var j = a === b;if (g(a.iconAngle) && b.iconAngle !== a.iconAngle && c.setIconAngle(a.iconAngle), q(a.layer) || q(b.layer) && (g(h.overlays[b.layer]) && h.overlays[b.layer].hasLayer(c) && (h.overlays[b.layer].removeLayer(c), c.closePopup()), i.hasLayer(c) || i.addLayer(c)), (r(a.opacity) || r(parseFloat(a.opacity))) && a.opacity !== b.opacity && c.setOpacity(a.opacity), q(a.layer) && b.layer !== a.layer) {
            if (q(b.layer) && g(h.overlays[b.layer]) && h.overlays[b.layer].hasLayer(c) && h.overlays[b.layer].removeLayer(c), c.closePopup(), i.hasLayer(c) && i.removeLayer(c), !g(h.overlays[a.layer])) return void d.error(v + "You must use a name of an existing layer");var k = h.overlays[a.layer];if (!(k instanceof L.LayerGroup || k instanceof L.FeatureGroup)) return void d.error(v + 'A marker can only be added to a layer of type "group" or "featureGroup"');k.addLayer(c), i.hasLayer(c) && a.focus === !0 && c.openPopup();
          }if (a.draggable !== !0 && b.draggable === !0 && g(c.dragging) && c.dragging.disable(), a.draggable === !0 && b.draggable !== !0 && (c.dragging ? c.dragging.enable() : L.Handler.MarkerDrag && (c.dragging = new L.Handler.MarkerDrag(c), c.options.draggable = !0, c.dragging.enable())), s(a.icon) || s(b.icon) && (c.setIcon(y()), c.closePopup(), c.unbindPopup(), q(a.message) && c.bindPopup(a.message, a.popupOptions)), s(a.icon) && s(b.icon) && !angular.equals(a.icon, b.icon)) {
            var l = !1;c.dragging && (l = c.dragging.enabled()), c.setIcon(y(a.icon)), l && c.dragging.enable(), c.closePopup(), c.unbindPopup(), q(a.message) && (c.bindPopup(a.message, a.popupOptions), i.hasLayer(c) && a.focus === !0 && c.openPopup());
          }!q(a.message) && q(b.message) && (c.closePopup(), c.unbindPopup()), p.LabelPlugin.isLoaded() && (g(a.label) && g(a.label.message) ? "label" in b && "message" in b.label && !angular.equals(a.label.message, b.label.message) ? c.updateLabelContent(a.label.message) : !angular.isFunction(c.getLabel) || angular.isFunction(c.getLabel) && !g(c.getLabel()) ? (c.bindLabel(a.label.message, a.label.options), G(c, a)) : G(c, a) : (!("label" in a) || "message" in a.label) && angular.isFunction(c.unbindLabel) && c.unbindLabel()), q(a.message) && !q(b.message) && c.bindPopup(a.message, a.popupOptions), q(a.message) && q(b.message) && a.message !== b.message && c.setPopupContent(a.message);var m = !1;a.focus !== !0 && b.focus === !0 && (c.closePopup(), m = !0), (a.focus === !0 && (!g(b.focus) || b.focus === !1) || j && a.focus === !0) && (c.openPopup(), m = !0), b.zIndexOffset !== a.zIndexOffset && c.setZIndexOffset(a.zIndexOffset);var n = c.getLatLng(),
              o = q(a.layer) && p.MarkerClusterPlugin.is(h.overlays[a.layer]);o ? m ? (a.lat !== b.lat || a.lng !== b.lng) && (h.overlays[a.layer].removeLayer(c), c.setLatLng([a.lat, a.lng]), h.overlays[a.layer].addLayer(c)) : n.lat !== a.lat || n.lng !== a.lng ? (h.overlays[a.layer].removeLayer(c), c.setLatLng([a.lat, a.lng]), h.overlays[a.layer].addLayer(c)) : a.lat !== b.lat || a.lng !== b.lng ? (h.overlays[a.layer].removeLayer(c), c.setLatLng([a.lat, a.lng]), h.overlays[a.layer].addLayer(c)) : s(a.icon) && s(b.icon) && !angular.equals(a.icon, b.icon) && (h.overlays[a.layer].removeLayer(c), h.overlays[a.layer].addLayer(c)) : (n.lat !== a.lat || n.lng !== a.lng) && c.setLatLng([a.lat, a.lng]);
        }
      };return { resetMarkerGroup: z, resetMarkerGroups: A, deleteMarker: B, manageOpenPopup: F, manageOpenLabel: G, createMarker: function (a) {
          if (!g(a) || !u.validateCoords(a)) return void d.error(v + "The marker definition is not valid.");var b = u.getCoords(a);if (!g(b)) return void d.error(v + "Unable to get coordinates from markerData.");var c = { icon: y(a.icon), title: g(a.title) ? a.title : "", draggable: g(a.draggable) ? a.draggable : !1, clickable: g(a.clickable) ? a.clickable : !0, riseOnHover: g(a.riseOnHover) ? a.riseOnHover : !1, zIndexOffset: g(a.zIndexOffset) ? a.zIndexOffset : 0, iconAngle: g(a.iconAngle) ? a.iconAngle : 0 };for (var e in a) a.hasOwnProperty(e) && !c.hasOwnProperty(e) && (c[e] = a[e]);var f = new L.marker(b, c);return q(a.message) || f.unbindPopup(), f;
        }, addMarkerToGroup: function (a, b, c, e) {
          return q(b) ? i.isLoaded() ? (g(t[b]) || (t[b] = new L.MarkerClusterGroup(c), e.addLayer(t[b])), void t[b].addLayer(a)) : void d.error(v + "The MarkerCluster plugin is not loaded.") : void d.error(v + "The marker group you have specified is invalid.");
        }, listenMarkerEvents: function (a, b, c, d, e) {
          a.on("popupopen", function () {
            o(c, function () {
              (g(a._popup) || g(a._popup._contentNode)) && (b.focus = !0, F(a, b, e));
            });
          }), a.on("popupclose", function () {
            o(c, function () {
              b.focus = !1;
            });
          }), a.on("add", function () {
            o(c, function () {
              "label" in b && G(a, b);
            });
          });
        }, updateMarker: H, addMarkerWatcher: function (a, b, c, d, e, f) {
          var i = p.getObjectArrayPath("markers." + b);f = h(f, !0);var j = c.$watch(i, function (f, h) {
            return g(f) ? void H(f, h, a, b, c, d, e) : (B(a, e, d), void j());
          }, f);
        }, string: w, log: x };
    }]), angular.module("leaflet-directive").factory("leafletPathsHelpers", ["$rootScope", "$log", "leafletHelpers", function (a, b, c) {
      function d(a) {
        return a.filter(function (a) {
          return k(a);
        }).map(function (a) {
          return e(a);
        });
      }function e(a) {
        return i(a) ? new L.LatLng(a[0], a[1]) : new L.LatLng(a.lat, a.lng);
      }function f(a) {
        return a.map(function (a) {
          return d(a);
        });
      }function g(a, b) {
        for (var c = {}, d = 0; d < l.length; d++) {
          var e = l[d];h(a[e]) ? c[e] = a[e] : h(b.path[e]) && (c[e] = b.path[e]);
        }return c;
      }var h = c.isDefined,
          i = c.isArray,
          j = c.isNumber,
          k = c.isValidPoint,
          l = ["stroke", "weight", "color", "opacity", "fill", "fillColor", "fillOpacity", "dashArray", "lineCap", "lineJoin", "clickable", "pointerEvents", "className", "smoothFactor", "noClip"],
          m = function (a, b) {
        for (var c = {}, d = 0; d < l.length; d++) {
          var e = l[d];h(b[e]) && (c[e] = b[e]);
        }a.setStyle(b);
      },
          n = function (a) {
        if (!i(a)) return !1;for (var b = 0; b < a.length; b++) {
          var c = a[b];if (!k(c)) return !1;
        }return !0;
      },
          o = { polyline: { isValid: function (a) {
            var b = a.latlngs;return n(b);
          }, createPath: function (a) {
            return new L.Polyline([], a);
          }, setPath: function (a, b) {
            a.setLatLngs(d(b.latlngs)), m(a, b);
          } }, multiPolyline: { isValid: function (a) {
            var b = a.latlngs;if (!i(b)) return !1;for (var c in b) {
              var d = b[c];if (!n(d)) return !1;
            }return !0;
          }, createPath: function (a) {
            return new L.multiPolyline([[[0, 0], [1, 1]]], a);
          }, setPath: function (a, b) {
            a.setLatLngs(f(b.latlngs)), m(a, b);
          } }, polygon: { isValid: function (a) {
            var b = a.latlngs;return n(b);
          }, createPath: function (a) {
            return new L.Polygon([], a);
          }, setPath: function (a, b) {
            a.setLatLngs(d(b.latlngs)), m(a, b);
          } }, multiPolygon: { isValid: function (a) {
            var b = a.latlngs;if (!i(b)) return !1;for (var c in b) {
              var d = b[c];if (!n(d)) return !1;
            }return !0;
          }, createPath: function (a) {
            return new L.MultiPolygon([[[0, 0], [1, 1], [0, 1]]], a);
          }, setPath: function (a, b) {
            a.setLatLngs(f(b.latlngs)), m(a, b);
          } }, rectangle: { isValid: function (a) {
            var b = a.latlngs;if (!i(b) || 2 !== b.length) return !1;for (var c in b) {
              var d = b[c];if (!k(d)) return !1;
            }return !0;
          }, createPath: function (a) {
            return new L.Rectangle([[0, 0], [1, 1]], a);
          }, setPath: function (a, b) {
            a.setBounds(new L.LatLngBounds(d(b.latlngs))), m(a, b);
          } }, circle: { isValid: function (a) {
            var b = a.latlngs;return k(b) && j(a.radius);
          }, createPath: function (a) {
            return new L.Circle([0, 0], 1, a);
          }, setPath: function (a, b) {
            a.setLatLng(e(b.latlngs)), h(b.radius) && a.setRadius(b.radius), m(a, b);
          } }, circleMarker: { isValid: function (a) {
            var b = a.latlngs;return k(b) && j(a.radius);
          }, createPath: function (a) {
            return new L.CircleMarker([0, 0], a);
          }, setPath: function (a, b) {
            a.setLatLng(e(b.latlngs)), h(b.radius) && a.setRadius(b.radius), m(a, b);
          } } },
          p = function (a) {
        var b = {};return a.latlngs && (b.latlngs = a.latlngs), a.radius && (b.radius = a.radius), b;
      };return { setPathOptions: function (a, b, c) {
          h(b) || (b = "polyline"), o[b].setPath(a, c);
        }, createPath: function (a, c, d) {
          h(c.type) || (c.type = "polyline");var e = g(c, d),
              f = p(c);return o[c.type].isValid(f) ? o[c.type].createPath(e) : void b.error("[AngularJS - Leaflet] Invalid data passed to the " + c.type + " path");
        } };
    }]), angular.module("leaflet-directive").service("leafletWatchHelpers", function () {
      var a = function (a, b, c, d, e) {
        var f = a[b](c, function (a, b) {
          e(a, b), d.doWatch || f();
        }, d.isDeep);return f;
      },
          b = function (b, c, d, e) {
        return a(b, "$watch", c, d, e);
      },
          c = function (b, c, d, e) {
        return a(b, "$watchCollection", c, d, e);
      };return { maybeWatch: b, maybeWatchCollection: c };
    }), angular.module("leaflet-directive").factory("nominatimService", ["$q", "$http", "leafletHelpers", "leafletMapDefaults", function (a, b, c, d) {
      var e = c.isDefined;return { query: function (c, f) {
          var g = d.getDefaults(f),
              h = g.nominatim.server,
              i = a.defer();return b.get(h, { params: { format: "json", limit: 1, q: c } }).success(function (a) {
            a.length > 0 && e(a[0].boundingbox) ? i.resolve(a[0]) : i.reject("[Nominatim] Invalid address");
          }), i.promise;
        } };
    }]), angular.module("leaflet-directive").directive("bounds", ["$log", "$timeout", "$http", "leafletHelpers", "nominatimService", "leafletBoundsHelpers", function (a, b, c, d, e, f) {
      return { restrict: "A", scope: !1, replace: !1, require: ["leaflet"], link: function (c, g, h, i) {
          var j = d.isDefined,
              k = f.createLeafletBounds,
              l = i[0].getLeafletScope(),
              m = i[0],
              n = d.errorHeader + " [Bounds] ",
              o = function (a) {
            return 0 === a._southWest.lat && 0 === a._southWest.lng && 0 === a._northEast.lat && 0 === a._northEast.lng;
          };m.getMap().then(function (d) {
            l.$on("boundsChanged", function (a) {
              var c = a.currentScope,
                  e = d.getBounds();if (!o(e) && !c.settingBoundsFromScope) {
                c.settingBoundsFromLeaflet = !0;var f = { northEast: { lat: e._northEast.lat, lng: e._northEast.lng }, southWest: { lat: e._southWest.lat, lng: e._southWest.lng }, options: e.options };angular.equals(c.bounds, f) || (c.bounds = f), b(function () {
                  c.settingBoundsFromLeaflet = !1;
                });
              }
            });var f;l.$watch("bounds", function (g) {
              if (!c.settingBoundsFromLeaflet) {
                if (j(g.address) && g.address !== f) return c.settingBoundsFromScope = !0, e.query(g.address, h.id).then(function (a) {
                  var b = a.boundingbox,
                      c = [[b[0], b[2]], [b[1], b[3]]];d.fitBounds(c);
                }, function (b) {
                  a.error(n + " " + b + ".");
                }), f = g.address, void b(function () {
                  c.settingBoundsFromScope = !1;
                });var i = k(g);i && !d.getBounds().equals(i) && (c.settingBoundsFromScope = !0, d.fitBounds(i, g.options), b(function () {
                  c.settingBoundsFromScope = !1;
                }));
              }
            }, !0);
          });
        } };
    }]);var centerDirectiveTypes = ["center", "lfCenter"],
        centerDirectives = {};centerDirectiveTypes.forEach(function (a) {
      centerDirectives[a] = ["$log", "$q", "$location", "$timeout", "leafletMapDefaults", "leafletHelpers", "leafletBoundsHelpers", "leafletMapEvents", function (b, c, d, e, f, g, h, i) {
        var j,
            k = g.isDefined,
            l = g.isNumber,
            m = g.isSameCenterOnMap,
            n = g.safeApply,
            o = g.isValidCenter,
            p = h.isValidBounds,
            q = g.isUndefinedOrEmpty,
            r = g.errorHeader,
            s = function (a, b) {
          return k(a) && p(a) && q(b);
        };return { restrict: "A", scope: !1, replace: !1, require: "leaflet", controller: function () {
            j = c.defer(), this.getCenter = function () {
              return j.promise;
            };
          }, link: function (c, g, p, q) {
            var t = q.getLeafletScope(),
                u = t[a];q.getMap().then(function (c) {
              var g = f.getDefaults(p.id);if (-1 !== p[a].search("-")) return b.error(r + ' The "center" variable can\'t use a "-" on its key name: "' + p[a] + '".'), void c.setView([g.center.lat, g.center.lng], g.center.zoom);if (s(t.bounds, u)) c.fitBounds(h.createLeafletBounds(t.bounds), t.bounds.options), u = c.getCenter(), n(t, function (b) {
                angular.extend(b[a], { lat: c.getCenter().lat, lng: c.getCenter().lng, zoom: c.getZoom(), autoDiscover: !1 });
              }), n(t, function (a) {
                var b = c.getBounds();a.bounds = { northEast: { lat: b._northEast.lat, lng: b._northEast.lng }, southWest: { lat: b._southWest.lat, lng: b._southWest.lng } };
              });else {
                if (!k(u)) return b.error(r + ' The "center" property is not defined in the main scope'), void c.setView([g.center.lat, g.center.lng], g.center.zoom);k(u.lat) && k(u.lng) || k(u.autoDiscover) || angular.copy(g.center, u);
              }var q, v;if ("yes" === p.urlHashCenter) {
                var w = function () {
                  var a,
                      b = d.search();if (k(b.c)) {
                    var c = b.c.split(":");3 === c.length && (a = { lat: parseFloat(c[0]), lng: parseFloat(c[1]), zoom: parseInt(c[2], 10) });
                  }return a;
                };q = w(), t.$on("$locationChangeSuccess", function (b) {
                  var d = b.currentScope,
                      e = w();k(e) && !m(e, c) && angular.extend(d[a], { lat: e.lat, lng: e.lng, zoom: e.zoom });
                });
              }t.$watch(a, function (a) {
                return t.settingCenterFromLeaflet ? void 0 : (k(q) && (angular.copy(q, a), q = void 0), o(a) || a.autoDiscover === !0 ? a.autoDiscover === !0 ? (l(a.zoom) || c.setView([g.center.lat, g.center.lng], g.center.zoom), void (l(a.zoom) && a.zoom > g.center.zoom ? c.locate({ setView: !0, maxZoom: a.zoom }) : k(g.maxZoom) ? c.locate({ setView: !0, maxZoom: g.maxZoom }) : c.locate({ setView: !0 }))) : void (v && m(a, c) || (t.settingCenterFromScope = !0, c.setView([a.lat, a.lng], a.zoom), i.notifyCenterChangedToBounds(t, c), e(function () {
                  t.settingCenterFromScope = !1;
                }))) : void b.warn(r + " invalid 'center'"));
              }, !0), c.whenReady(function () {
                v = !0;
              }), c.on("moveend", function () {
                j.resolve(), i.notifyCenterUrlHashChanged(t, c, p, d.search()), m(u, c) || t.settingCenterFromScope || (t.settingCenterFromLeaflet = !0, n(t, function (b) {
                  t.settingCenterFromScope || angular.extend(b[a], { lat: c.getCenter().lat, lng: c.getCenter().lng, zoom: c.getZoom(), autoDiscover: !1 }), i.notifyCenterChangedToBounds(t, c), e(function () {
                    t.settingCenterFromLeaflet = !1;
                  });
                }));
              }), u.autoDiscover === !0 && c.on("locationerror", function () {
                b.warn(r + " The Geolocation API is unauthorized on this page."), o(u) ? (c.setView([u.lat, u.lng], u.zoom), i.notifyCenterChangedToBounds(t, c)) : (c.setView([g.center.lat, g.center.lng], g.center.zoom), i.notifyCenterChangedToBounds(t, c));
              });
            });
          } };
      }];
    }), centerDirectiveTypes.forEach(function (a) {
      angular.module("leaflet-directive").directive(a, centerDirectives[a]);
    }), angular.module("leaflet-directive").directive("controls", ["$log", "leafletHelpers", "leafletControlHelpers", function (a, b, c) {
      return { restrict: "A", scope: !1, replace: !1, require: "?^leaflet", link: function (d, e, f, g) {
          if (g) {
            var h = c.createControl,
                i = c.isValidControlType,
                j = g.getLeafletScope(),
                k = b.isDefined,
                l = b.isArray,
                m = {},
                n = b.errorHeader + " [Controls] ";g.getMap().then(function (b) {
              j.$watchCollection("controls", function (c) {
                for (var d in m) k(c[d]) || (b.hasControl(m[d]) && b.removeControl(m[d]), delete m[d]);for (var e in c) {
                  var f,
                      g = k(c[e].type) ? c[e].type : e;if (!i(g)) return void a.error(n + " Invalid control type: " + g + ".");if ("custom" !== g) f = h(g, c[e]), b.addControl(f), m[e] = f;else {
                    var j = c[e];if (l(j)) for (var o in j) {
                      var p = j[o];b.addControl(p), m[e] = k(m[e]) ? m[e].concat([p]) : [p];
                    } else b.addControl(j), m[e] = j;
                  }
                }
              });
            });
          }
        } };
    }]), angular.module("leaflet-directive").directive("decorations", ["$log", "leafletHelpers", function (a, b) {
      return { restrict: "A", scope: !1, replace: !1, require: "leaflet", link: function (c, d, e, f) {
          function g(b) {
            return k(b) && k(b.coordinates) && (j.isLoaded() || a.error("[AngularJS - Leaflet] The PolylineDecorator Plugin is not loaded.")), L.polylineDecorator(b.coordinates);
          }function h(a, b) {
            return k(a) && k(b) && k(b.coordinates) && k(b.patterns) ? (a.setPaths(b.coordinates), a.setPatterns(b.patterns), a) : void 0;
          }var i = f.getLeafletScope(),
              j = b.PolylineDecoratorPlugin,
              k = b.isDefined,
              l = {};f.getMap().then(function (a) {
            i.$watch("decorations", function (b) {
              for (var c in l) k(b[c]) && angular.equals(b[c], l) || (a.removeLayer(l[c]), delete l[c]);for (var d in b) {
                var e = b[d],
                    f = g(e);k(f) && (l[d] = f, a.addLayer(f), h(f, e));
              }
            }, !0);
          });
        } };
    }]), angular.module("leaflet-directive").directive("eventBroadcast", ["$log", "$rootScope", "leafletHelpers", "leafletMapEvents", "leafletIterators", function (a, b, c, d, e) {
      return { restrict: "A", scope: !1, replace: !1, require: "leaflet", link: function (b, f, g, h) {
          var i = c.isObject,
              j = c.isDefined,
              k = h.getLeafletScope(),
              l = k.eventBroadcast,
              m = d.getAvailableMapEvents(),
              n = d.addEvents;h.getMap().then(function (b) {
            var c = [],
                d = "broadcast";j(l.map) ? i(l.map) ? ("emit" !== l.map.logic && "broadcast" !== l.map.logic ? a.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.") : d = l.map.logic, i(l.map.enable) && l.map.enable.length >= 0 ? e.each(l.map.enable, function (a) {
              -1 === c.indexOf(a) && -1 !== m.indexOf(a) && c.push(a);
            }) : a.warn("[AngularJS - Leaflet] event-broadcast.map.enable must be an object check your model.")) : a.warn("[AngularJS - Leaflet] event-broadcast.map must be an object check your model.") : c = m, n(b, c, "eventName", k, d);
          });
        } };
    }]), angular.module("leaflet-directive").directive("geojson", ["$log", "$rootScope", "leafletData", "leafletHelpers", "leafletWatchHelpers", "leafletDirectiveControlsHelpers", "leafletIterators", "leafletGeoJsonEvents", function (a, b, c, d, e, f, g, h) {
      var i = e.maybeWatch,
          j = d.watchOptions,
          k = f.extend,
          l = d,
          m = g;return { restrict: "A", scope: !1, replace: !1, require: "leaflet", link: function (a, b, e, f) {
          var g = d.isDefined,
              n = f.getLeafletScope(),
              o = {},
              p = !1;f.getMap().then(function (a) {
            var b = n.geojsonWatchOptions || j,
                f = function (a, b) {
              var c;return c = angular.isFunction(a.onEachFeature) ? a.onEachFeature : function (c, f) {
                d.LabelPlugin.isLoaded() && g(c.properties.description) && f.bindLabel(c.properties.description), h.bindEvents(e.id, f, null, c, n, b, { resetStyleOnMouseout: a.resetStyleOnMouseout, mapId: e.id });
              };
            },
                q = l.isDefined(e.geojsonNested) && l.isTruthy(e.geojsonNested),
                r = function () {
              if (o) {
                var b = function (b) {
                  g(b) && a.hasLayer(b) && a.removeLayer(b);
                };return q ? void m.each(o, function (a) {
                  b(a);
                }) : void b(o);
              }
            },
                s = function (b, d) {
              var h = angular.copy(b);if (g(h) && g(h.data)) {
                var i = f(h, d);g(h.options) || (h.options = { style: h.style, filter: h.filter, onEachFeature: i, pointToLayer: h.pointToLayer });var j = L.geoJson(h.data, h.options);d && l.isString(d) ? o[d] = j : o = j, j.addTo(a), p || (p = !0, c.setGeoJSON(o, e.id));
              }
            },
                t = function (a) {
              if (r(), q) {
                if (!a || !Object.keys(a).length) return;return void m.each(a, function (a, b) {
                  s(a, b);
                });
              }s(a);
            };k(e.id, "geojson", t, r), i(n, "geojson", b, function (a) {
              t(a);
            });
          });
        } };
    }]), angular.module("leaflet-directive").directive("layercontrol", ["$filter", "$log", "leafletData", "leafletHelpers", function (a, b, c, d) {
      return { restrict: "E", scope: { icons: "=?", autoHideOpacity: "=?", showGroups: "=?", title: "@", baseTitle: "@", overlaysTitle: "@" }, replace: !0, transclude: !1, require: "^leaflet", controller: ["$scope", "$element", "$sce", function (a, e, f) {
          b.debug("[Angular Directive - Layers] layers", a, e);var g = d.safeApply,
              h = d.isDefined;angular.extend(a, { baselayer: "", oldGroup: "", layerProperties: {}, groupProperties: {}, rangeIsSupported: d.rangeIsSupported(), changeBaseLayer: function (b, e) {
              d.safeApply(a, function (d) {
                d.baselayer = b, c.getMap().then(function (e) {
                  c.getLayers().then(function (c) {
                    if (!e.hasLayer(c.baselayers[b])) {
                      for (var f in d.layers.baselayers) d.layers.baselayers[f].icon = d.icons.unradio, e.hasLayer(c.baselayers[f]) && e.removeLayer(c.baselayers[f]);e.addLayer(c.baselayers[b]), d.layers.baselayers[b].icon = a.icons.radio;
                    }
                  });
                });
              }), e.preventDefault();
            }, moveLayer: function (b, c, d) {
              var e = Object.keys(a.layers.baselayers).length;if (c >= 1 + e && c <= a.overlaysArray.length + e) {
                var f;for (var h in a.layers.overlays) if (a.layers.overlays[h].index === c) {
                  f = a.layers.overlays[h];break;
                }f && g(a, function () {
                  f.index = b.index, b.index = c;
                });
              }d.stopPropagation(), d.preventDefault();
            }, initIndex: function (b, c) {
              var d = Object.keys(a.layers.baselayers).length;b.index = h(b.index) ? b.index : c + d + 1;
            }, initGroup: function (b) {
              a.groupProperties[b] = a.groupProperties[b] ? a.groupProperties[b] : {};
            }, toggleOpacity: function (b, c) {
              if (c.visible) {
                if (a.autoHideOpacity && !a.layerProperties[c.name].opacityControl) for (var d in a.layerProperties) a.layerProperties[d].opacityControl = !1;a.layerProperties[c.name].opacityControl = !a.layerProperties[c.name].opacityControl;
              }b.stopPropagation(), b.preventDefault();
            }, toggleLegend: function (b) {
              a.layerProperties[b.name].showLegend = !a.layerProperties[b.name].showLegend;
            }, showLegend: function (b) {
              return b.legend && a.layerProperties[b.name].showLegend;
            }, unsafeHTML: function (a) {
              return f.trustAsHtml(a);
            }, getOpacityIcon: function (b) {
              return b.visible && a.layerProperties[b.name].opacityControl ? a.icons.close : a.icons.open;
            }, getGroupIcon: function (b) {
              return b.visible ? a.icons.check : a.icons.uncheck;
            }, changeOpacity: function (b) {
              var d = a.layerProperties[b.name].opacity;c.getMap().then(function (e) {
                c.getLayers().then(function (c) {
                  var f;for (var g in a.layers.overlays) if (a.layers.overlays[g] === b) {
                    f = c.overlays[g];break;
                  }e.hasLayer(f) && (f.setOpacity && f.setOpacity(d / 100), f.getLayers && f.eachLayer && f.eachLayer(function (a) {
                    a.setOpacity && a.setOpacity(d / 100);
                  }));
                });
              });
            }, changeGroupVisibility: function (b) {
              if (h(a.groupProperties[b])) {
                var c = a.groupProperties[b].visible;for (var d in a.layers.overlays) {
                  var e = a.layers.overlays[d];e.group === b && (e.visible = c);
                }
              }
            } });var i = e.get(0);L.Browser.touch ? L.DomEvent.on(i, "click", L.DomEvent.stopPropagation) : (L.DomEvent.disableClickPropagation(i), L.DomEvent.on(i, "mousewheel", L.DomEvent.stopPropagation));
        }], template: '<div class="angular-leaflet-control-layers" ng-show="overlaysArray.length"><h4 ng-if="title">{{ title }}</h4><div class="lf-baselayers"><h5 class="lf-title" ng-if="baseTitle">{{ baseTitle }}</h5><div class="lf-row" ng-repeat="(key, layer) in baselayersArray"><label class="lf-icon-bl" ng-click="changeBaseLayer(key, $event)"><input class="leaflet-control-layers-selector" type="radio" name="lf-radio" ng-show="false" ng-checked="baselayer === key" ng-value="key" /> <i class="lf-icon lf-icon-radio" ng-class="layer.icon"></i><div class="lf-text">{{layer.name}}</div></label></div></div><div class="lf-overlays"><h5 class="lf-title" ng-if="overlaysTitle">{{ overlaysTitle }}</h5><div class="lf-container"><div class="lf-row" ng-repeat="layer in (o = (overlaysArray | orderBy:\'index\':order))" ng-init="initIndex(layer, $index)"><label class="lf-icon-ol-group" ng-if="showGroups &amp;&amp; layer.group &amp;&amp; layer.group != o[$index-1].group"><input class="lf-control-layers-selector" type="checkbox" ng-show="false" ng-change="changeGroupVisibility(layer.group)" ng-model="groupProperties[layer.group].visible"/> <i class="lf-icon lf-icon-check" ng-class="getGroupIcon(groupProperties[layer.group])"></i><div class="lf-text">{{ layer.group }}</div></label><label class="lf-icon-ol"><input class="lf-control-layers-selector" type="checkbox" ng-show="false" ng-model="layer.visible"/> <i class="lf-icon lf-icon-check" ng-class="layer.icon"></i><div class="lf-text">{{layer.name}}</div></label><div class="lf-icons"><i class="lf-icon lf-up" ng-class="icons.up" ng-click="moveLayer(layer, layer.index - orderNumber, $event)"></i> <i class="lf-icon lf-down" ng-class="icons.down" ng-click="moveLayer(layer, layer.index + orderNumber, $event)"></i> <i class="lf-icon lf-toggle-legend" ng-class="icons.toggleLegend" ng-if="layer.legend" ng-click="toggleLegend(layer)"></i> <i class="lf-icon lf-open" ng-class="getOpacityIcon(layer)" ng-click="toggleOpacity($event, layer)"></i></div><div class="lf-legend" ng-if="showLegend(layer)" ng-bind-html="unsafeHTML(layer.legend)"></div><div class="lf-opacity clearfix" ng-if="layer.visible &amp;&amp; layerProperties[layer.name].opacityControl"><label ng-if="rangeIsSupported" class="pull-left" style="width: 50%">0</label><label ng-if="rangeIsSupported" class="pull-left text-right" style="width: 50%">100</label><input ng-if="rangeIsSupported" class="clearfix" type="range" min="0" max="100" class="lf-opacity-control" ng-model="layerProperties[layer.name].opacity" ng-change="changeOpacity(layer)"/><h6 ng-if="!rangeIsSupported">Range is not supported in this browser</h6></div></div></div></div></div>', link: function (a, b, e, f) {
          var g = d.isDefined,
              h = f.getLeafletScope(),
              i = h.layers;a.$watch("icons", function () {
            var b = { uncheck: "fa fa-square-o", check: "fa fa-check-square-o", radio: "fa fa-dot-circle-o", unradio: "fa fa-circle-o", up: "fa fa-angle-up", down: "fa fa-angle-down", open: "fa fa-angle-double-down", close: "fa fa-angle-double-up", toggleLegend: "fa fa-pencil-square-o" };g(a.icons) ? (angular.extend(b, a.icons), angular.extend(a.icons, b)) : a.icons = b;
          }), e.order = !g(e.order) || "normal" !== e.order && "reverse" !== e.order ? "normal" : e.order, a.order = "normal" === e.order, a.orderNumber = "normal" === e.order ? -1 : 1, a.layers = i, f.getMap().then(function (b) {
            h.$watch("layers.baselayers", function (d) {
              var e = {};c.getLayers().then(function (c) {
                var f;for (f in d) {
                  var g = d[f];g.icon = a.icons[b.hasLayer(c.baselayers[f]) ? "radio" : "unradio"], e[f] = g;
                }a.baselayersArray = e;
              });
            }), h.$watch("layers.overlays", function (b) {
              var d = [],
                  e = {};c.getLayers().then(function (c) {
                var f;for (f in b) {
                  var h = b[f];h.icon = a.icons[h.visible ? "check" : "uncheck"], d.push(h), g(a.layerProperties[h.name]) || (a.layerProperties[h.name] = { opacity: g(h.layerOptions.opacity) ? 100 * h.layerOptions.opacity : 100, opacityControl: !1, showLegend: !0 }), g(h.group) && (g(a.groupProperties[h.group]) || (a.groupProperties[h.group] = { visible: !1 }), e[h.group] = g(e[h.group]) ? e[h.group] : { count: 0, visibles: 0 }, e[h.group].count++, h.visible && e[h.group].visibles++), g(h.index) && c.overlays[f].setZIndex && c.overlays[f].setZIndex(b[f].index);
                }for (f in e) a.groupProperties[f].visible = e[f].visibles === e[f].count;a.overlaysArray = d;
              });
            }, !0);
          });
        } };
    }]), angular.module("leaflet-directive").directive("layers", ["$log", "$q", "leafletData", "leafletHelpers", "leafletLayerHelpers", "leafletControlHelpers", function (a, b, c, d, e, f) {
      return { restrict: "A", scope: !1, replace: !1, require: "leaflet", controller: ["$scope", function (a) {
          a._leafletLayers = b.defer(), this.getLayers = function () {
            return a._leafletLayers.promise;
          };
        }], link: function (a, b, g, h) {
          var i = d.isDefined,
              j = {},
              k = h.getLeafletScope(),
              l = k.layers,
              m = e.createLayer,
              n = e.safeAddLayer,
              o = e.safeRemoveLayer,
              p = f.updateLayersControl,
              q = !1;h.getMap().then(function (b) {
            a._leafletLayers.resolve(j), c.setLayers(j, g.id), j.baselayers = {}, j.overlays = {};var d = g.id,
                e = !1;for (var f in l.baselayers) {
              var h = m(l.baselayers[f]);i(h) ? (j.baselayers[f] = h, l.baselayers[f].top === !0 && (n(b, j.baselayers[f]), e = !0)) : delete l.baselayers[f];
            }!e && Object.keys(j.baselayers).length > 0 && n(b, j.baselayers[Object.keys(l.baselayers)[0]]);for (f in l.overlays) {
              var r = m(l.overlays[f]);i(r) ? (j.overlays[f] = r, l.overlays[f].visible === !0 && n(b, j.overlays[f])) : delete l.overlays[f];
            }k.$watch("layers.baselayers", function (a, c) {
              if (angular.equals(a, c)) return q = p(b, d, q, a, l.overlays, j), !0;for (var e in j.baselayers) (!i(a[e]) || a[e].doRefresh) && (b.hasLayer(j.baselayers[e]) && b.removeLayer(j.baselayers[e]), delete j.baselayers[e], a[e] && a[e].doRefresh && (a[e].doRefresh = !1));for (var f in a) if (i(j.baselayers[f])) a[f].top !== !0 || b.hasLayer(j.baselayers[f]) ? a[f].top === !1 && b.hasLayer(j.baselayers[f]) && b.removeLayer(j.baselayers[f]) : n(b, j.baselayers[f]);else {
                var g = m(a[f]);i(g) && (j.baselayers[f] = g, a[f].top === !0 && n(b, j.baselayers[f]));
              }var h = !1;for (var k in j.baselayers) if (b.hasLayer(j.baselayers[k])) {
                h = !0;break;
              }!h && Object.keys(j.baselayers).length > 0 && n(b, j.baselayers[Object.keys(j.baselayers)[0]]), q = p(b, d, q, a, l.overlays, j);
            }, !0), k.$watch("layers.overlays", function (a, c) {
              if (angular.equals(a, c)) return q = p(b, d, q, l.baselayers, a, j), !0;for (var e in j.overlays) if (!i(a[e]) || a[e].doRefresh) {
                if (b.hasLayer(j.overlays[e])) {
                  var f = i(a[e]) ? a[e].layerOptions : null;o(b, j.overlays[e], f);
                }delete j.overlays[e], a[e] && a[e].doRefresh && (a[e].doRefresh = !1);
              }for (var g in a) {
                if (i(j.overlays[g])) a[g].visible && !b.hasLayer(j.overlays[g]) ? n(b, j.overlays[g]) : a[g].visible === !1 && b.hasLayer(j.overlays[g]) && o(b, j.overlays[g], a[g].layerOptions);else {
                  var h = m(a[g]);if (!i(h)) continue;j.overlays[g] = h, a[g].visible === !0 && n(b, j.overlays[g]);
                }a[g].visible && b._loaded && a[g].data && "heatmap" === a[g].type && (j.overlays[g].setData(a[g].data), j.overlays[g].update());
              }q = p(b, d, q, l.baselayers, a, j);
            }, !0);
          });
        } };
    }]), angular.module("leaflet-directive").directive("legend", ["$log", "$http", "leafletHelpers", "leafletLegendHelpers", function (a, b, c, d) {
      return { restrict: "A", scope: !1, replace: !1, require: "leaflet", link: function (e, f, g, h) {
          var i,
              j,
              k,
              l,
              m = c.isArray,
              n = c.isDefined,
              o = c.isFunction,
              p = h.getLeafletScope(),
              q = p.legend;p.$watch("legend", function (a) {
            n(a) && (i = a.legendClass ? a.legendClass : "legend", j = a.position || "bottomright", l = a.type || "arcgis");
          }, !0), h.getMap().then(function (c) {
            p.$watch("legend", function (b) {
              return n(b) ? n(b.url) || "arcgis" !== l || m(b.colors) && m(b.labels) && b.colors.length === b.labels.length ? n(b.url) ? void a.info("[AngularJS - Leaflet] loading legend service.") : (n(k) && (k.removeFrom(c), k = null), k = L.control({ position: j }), "arcgis" === l && (k.onAdd = d.getOnAddArrayLegend(b, i)), void k.addTo(c)) : void a.warn("[AngularJS - Leaflet] legend.colors and legend.labels must be set.") : void (n(k) && (k.removeFrom(c), k = null));
            }), p.$watch("legend.url", function (e) {
              n(e) && b.get(e).success(function (a) {
                n(k) ? d.updateLegend(k.getContainer(), a, l, e) : (k = L.control({ position: j }), k.onAdd = d.getOnAddLegend(a, i, l, e), k.addTo(c)), n(q.loadedData) && o(q.loadedData) && q.loadedData();
              }).error(function () {
                a.warn("[AngularJS - Leaflet] legend.url not loaded.");
              });
            });
          });
        } };
    }]), angular.module("leaflet-directive").directive("markers", ["$log", "$rootScope", "$q", "leafletData", "leafletHelpers", "leafletMapDefaults", "leafletMarkersHelpers", "leafletMarkerEvents", "leafletIterators", "leafletWatchHelpers", "leafletDirectiveControlsHelpers", function (a, b, c, d, e, f, g, h, i, j, k) {
      var l = e.isDefined,
          m = e.errorHeader,
          n = e,
          o = e.isString,
          p = g.addMarkerWatcher,
          q = g.updateMarker,
          r = g.listenMarkerEvents,
          s = g.addMarkerToGroup,
          t = g.createMarker,
          u = g.deleteMarker,
          v = i,
          w = e.watchOptions,
          x = j.maybeWatch,
          y = k.extend,
          z = function (a, b, c) {
        if (Object.keys(a).length) {
          if (c && o(c)) {
            if (!a[c] || !Object.keys(a[c]).length) return;return a[c][b];
          }return a[b];
        }
      },
          A = function (a, b, c, d) {
        return d && o(d) ? (l(b[d]) || (b[d] = {}), b[d][c] = a) : b[c] = a, a;
      },
          B = function (b, c, d, e, f, g) {
        if (!o(b)) return a.error(m + " A layername must be a string"), !1;if (!l(c)) return a.error(m + " You must add layers to the directive if the markers are going to use this functionality."), !1;if (!l(c.overlays) || !l(c.overlays[b])) return a.error(m + ' A marker can only be added to a layer of type "group"'), !1;var h = c.overlays[b];return h instanceof L.LayerGroup || h instanceof L.FeatureGroup ? (h.addLayer(e), !f && g.hasLayer(e) && d.focus === !0 && e.openPopup(), !0) : (a.error(m + ' Adding a marker to an overlay needs a overlay of the type "group" or "featureGroup"'), !1);
      },
          C = function (b, c, d, e, f, g, i, j, k, o) {
        for (var u in c) if (!o[u]) if (-1 === u.search("-")) {
          var v = n.copy(c[u]),
              w = n.getObjectDotPath(k ? [k, u] : [u]),
              x = z(g, u, k);if (l(x)) {
            var y = l(y) ? d[u] : void 0;q(v, y, x, w, i, f, e);
          } else {
            var C = t(v),
                D = (v ? v.layer : void 0) || k;if (!l(C)) {
              a.error(m + " Received invalid data on the marker " + u + ".");continue;
            }if (A(C, g, u, k), l(v.message) && C.bindPopup(v.message, v.popupOptions), l(v.group)) {
              var E = l(v.groupOption) ? v.groupOption : null;s(C, v.group, E, e);
            }if (n.LabelPlugin.isLoaded() && l(v.label) && l(v.label.message) && C.bindLabel(v.label.message, v.label.options), l(v) && (l(v.layer) || l(k))) {
              var F = B(D, f, v, C, j.individual.doWatch, e);if (!F) continue;
            } else l(v.group) || (e.addLayer(C), j.individual.doWatch || v.focus !== !0 || C.openPopup());j.individual.doWatch && p(C, w, i, f, e, j.individual.isDeep), r(C, v, i, j.individual.doWatch, e), h.bindEvents(b, C, w, v, i, D);
          }
        } else a.error('The marker can\'t use a "-" on his key name: "' + u + '".');
      },
          D = function (b, c, d, e, f) {
        var g,
            h,
            i = !1,
            j = !1,
            k = l(c);for (var o in d) i || (a.debug(m + "[markers] destroy: "), i = !0), k && (h = b[o], g = c[o], j = angular.equals(h, g) && e), l(b) && Object.keys(b).length && l(b[o]) && Object.keys(b[o]).length && !j || f && n.isFunction(f) && f(h, g, o);
      },
          E = function (b, c, d, e, f) {
        D(b, c, d, !1, function (b, c, g) {
          a.debug(m + "[marker] is deleting marker: " + g), u(d[g], e, f), delete d[g];
        });
      },
          F = function (b, c, d) {
        var e = {};return D(b, c, d, !0, function (b, c, d) {
          a.debug(m + "[marker] is already rendered, marker: " + d), e[d] = b;
        }), e;
      };return { restrict: "A", scope: !1, replace: !1, require: ["leaflet", "?layers"], link: function (a, b, e, f) {
          var g = f[0],
              h = g.getLeafletScope();g.getMap().then(function (a) {
            var b,
                g = {};b = l(f[1]) ? f[1].getLayers : function () {
              var a = c.defer();return a.resolve(), a.promise;
            };var i = h.markersWatchOptions || w;l(e.watchMarkers) && (i.doWatch = i.individual.doWatch = !l(e.watchMarkers) || n.isTruthy(e.watchMarkers));var j = l(e.markersNested) && n.isTruthy(e.markersNested);b().then(function (b) {
              var c = function (c, d) {
                return j ? void v.each(c, function (c, e) {
                  var f = l(f) ? d[e] : void 0;E(c, f, g[e], a, b);
                }) : void E(c, d, g, a, b);
              },
                  f = function (d, f) {
                c(d, f);var k = null;return j ? void v.each(d, function (c, j) {
                  var m = l(m) ? f[j] : void 0;k = F(d[j], m, g[j]), C(e.id, c, f, a, b, g, h, i, j, k);
                }) : (k = F(d, f, g), void C(e.id, d, f, a, b, g, h, i, void 0, k));
              };y(e.id, "markers", f, c), d.setMarkers(g, e.id), x(h, "markers", i, function (a, b) {
                f(a, b);
              });
            });
          });
        } };
    }]), angular.module("leaflet-directive").directive("maxbounds", ["$log", "leafletMapDefaults", "leafletBoundsHelpers", "leafletHelpers", function (a, b, c, d) {
      return { restrict: "A", scope: !1, replace: !1, require: "leaflet", link: function (a, b, e, f) {
          var g = f.getLeafletScope(),
              h = c.isValidBounds,
              i = d.isNumber;f.getMap().then(function (a) {
            g.$watch("maxbounds", function (b) {
              if (!h(b)) return void a.setMaxBounds();var d = c.createLeafletBounds(b);i(b.pad) && (d = d.pad(b.pad)), a.setMaxBounds(d), e.center || e.lfCenter || a.fitBounds(d);
            });
          });
        } };
    }]), angular.module("leaflet-directive").directive("paths", ["$log", "$q", "leafletData", "leafletMapDefaults", "leafletHelpers", "leafletPathsHelpers", "leafletPathEvents", function (a, b, c, d, e, f, g) {
      return { restrict: "A", scope: !1, replace: !1, require: ["leaflet", "?layers"], link: function (h, i, j, k) {
          var l = k[0],
              m = e.isDefined,
              n = e.isString,
              o = l.getLeafletScope(),
              p = o.paths,
              q = f.createPath,
              r = g.bindPathEvents,
              s = f.setPathOptions;l.getMap().then(function (f) {
            var g,
                h = d.getDefaults(j.id);g = m(k[1]) ? k[1].getLayers : function () {
              var a = b.defer();return a.resolve(), a.promise;
            }, m(p) && g().then(function (b) {
              var d = {};c.setPaths(d, j.id);var g = !m(j.watchPaths) || "true" === j.watchPaths,
                  i = function (a, c) {
                var d = o.$watch('paths["' + c + '"]', function (c, e) {
                  if (!m(c)) {
                    if (m(e.layer)) for (var g in b.overlays) {
                      var h = b.overlays[g];h.removeLayer(a);
                    }return f.removeLayer(a), void d();
                  }s(a, c.type, c);
                }, !0);
              };o.$watchCollection("paths", function (c) {
                for (var k in d) m(c[k]) || (f.removeLayer(d[k]), delete d[k]);for (var l in c) if (0 !== l.search("\\$")) if (-1 === l.search("-")) {
                  if (!m(d[l])) {
                    var p = c[l],
                        t = q(l, c[l], h);if (m(t) && m(p.message) && t.bindPopup(p.message, p.popupOptions), e.LabelPlugin.isLoaded() && m(p.label) && m(p.label.message) && t.bindLabel(p.label.message, p.label.options), m(p) && m(p.layer)) {
                      if (!n(p.layer)) {
                        a.error("[AngularJS - Leaflet] A layername must be a string");continue;
                      }if (!m(b)) {
                        a.error("[AngularJS - Leaflet] You must add layers to the directive if the markers are going to use this functionality.");continue;
                      }if (!m(b.overlays) || !m(b.overlays[p.layer])) {
                        a.error('[AngularJS - Leaflet] A path can only be added to a layer of type "group"');continue;
                      }var u = b.overlays[p.layer];if (!(u instanceof L.LayerGroup || u instanceof L.FeatureGroup)) {
                        a.error('[AngularJS - Leaflet] Adding a path to an overlay needs a overlay of the type "group" or "featureGroup"');continue;
                      }d[l] = t, u.addLayer(t), g ? i(t, l) : s(t, p.type, p);
                    } else m(t) && (d[l] = t, f.addLayer(t), g ? i(t, l) : s(t, p.type, p));r(j.id, t, l, p, o);
                  }
                } else a.error('[AngularJS - Leaflet] The path name "' + l + '" is not valid. It must not include "-" and a number.');
              });
            });
          });
        } };
    }]), angular.module("leaflet-directive").directive("tiles", ["$log", "leafletData", "leafletMapDefaults", "leafletHelpers", function (a, b, c, d) {
      return { restrict: "A", scope: !1, replace: !1, require: "leaflet", link: function (e, f, g, h) {
          var i = d.isDefined,
              j = h.getLeafletScope(),
              k = j.tiles;return i(k) && i(k.url) ? void h.getMap().then(function (a) {
            var d,
                e = c.getDefaults(g.id);j.$watch("tiles", function (c, f) {
              var h = e.tileLayerOptions,
                  j = e.tileLayer;return !i(c.url) && i(d) ? void a.removeLayer(d) : i(d) ? !i(c.url) || !i(c.options) || c.type === f.type && angular.equals(c.options, h) ? void (i(c.url) && d.setUrl(c.url)) : (a.removeLayer(d), h = e.tileLayerOptions, angular.copy(c.options, h), j = c.url, d = "wms" === c.type ? L.tileLayer.wms(j, h) : L.tileLayer(j, h), d.addTo(a), void b.setTiles(d, g.id)) : (i(c.options) && angular.copy(c.options, h), i(c.url) && (j = c.url), d = "wms" === c.type ? L.tileLayer.wms(j, h) : L.tileLayer(j, h), d.addTo(a), void b.setTiles(d, g.id));
            }, !0);
          }) : void a.warn("[AngularJS - Leaflet] The 'tiles' definition doesn't have the 'url' property.");
        } };
    }]), ["markers", "geojson"].forEach(function (a) {
      angular.module("leaflet-directive").directive(a + "WatchOptions", ["$log", "$rootScope", "$q", "leafletData", "leafletHelpers", function (b, c, d, e, f) {
        var g = f.isDefined,
            h = f.errorHeader,
            i = f.isObject,
            j = f.watchOptions;return { restrict: "A", scope: !1, replace: !1, require: ["leaflet"], link: function (c, d, e, f) {
            var k = f[0],
                l = k.getLeafletScope();k.getMap().then(function () {
              g(c[a + "WatchOptions"]) && (i(c[a + "WatchOptions"]) ? angular.extend(j, c[a + "WatchOptions"]) : b.error(h + "[" + a + "WatchOptions] is not an object"), l[a + "WatchOptions"] = j);
            });
          } };
      }]);
    }), angular.module("leaflet-directive").factory("LeafletEventsHelpersFactory", ["$rootScope", "$q", "$log", "leafletHelpers", function (a, b, c, d) {
      var e = d.safeApply,
          f = d.isDefined,
          g = d.isObject,
          h = d.isArray,
          i = d.errorHeader,
          j = function (a, b) {
        this.rootBroadcastName = a, c.debug("LeafletEventsHelpersFactory: lObjectType: " + b + "rootBroadcastName: " + a), this.lObjectType = b;
      };return j.prototype.getAvailableEvents = function () {
        return [];
      }, j.prototype.genDispatchEvent = function (a, b, d, e, f, g, h, i, j) {
        var k = this;return a = a || "", a && (a = "." + a), function (l) {
          var m = k.rootBroadcastName + a + "." + b;c.debug(m), k.fire(e, m, d, l, l.target || f, h, g, i, j);
        };
      }, j.prototype.fire = function (b, c, d, g, h, i, j, k) {
        e(b, function () {
          var e = { leafletEvent: g, leafletObject: h, modelName: j, model: i };f(k) && angular.extend(e, { layerName: k }), "emit" === d ? b.$emit(c, e) : a.$broadcast(c, e);
        });
      }, j.prototype.bindEvents = function (a, b, d, e, j, k, l) {
        var m = [],
            n = "emit",
            o = this;if (f(j.eventBroadcast)) {
          if (g(j.eventBroadcast)) {
            if (f(j.eventBroadcast[o.lObjectType])) {
              if (g(j.eventBroadcast[o.lObjectType])) {
                f(j.eventBroadcast[this.lObjectType].logic) && "emit" !== j.eventBroadcast[o.lObjectType].logic && "broadcast" !== j.eventBroadcast[o.lObjectType].logic && c.warn(i + "Available event propagation logic are: 'emit' or 'broadcast'.");var p = !1,
                    q = !1;f(j.eventBroadcast[o.lObjectType].enable) && h(j.eventBroadcast[o.lObjectType].enable) && (p = !0), f(j.eventBroadcast[o.lObjectType].disable) && h(j.eventBroadcast[o.lObjectType].disable) && (q = !0), p && q ? c.warn(i + "can not enable and disable events at the same time") : p || q ? p ? j.eventBroadcast[this.lObjectType].enable.forEach(function (a) {
                  -1 !== m.indexOf(a) ? c.warn(i + "This event " + a + " is already enabled") : -1 === o.getAvailableEvents().indexOf(a) ? c.warn(i + "This event " + a + " does not exist") : m.push(a);
                }) : (m = this.getAvailableEvents(), j.eventBroadcast[o.lObjectType].disable.forEach(function (a) {
                  var b = m.indexOf(a);-1 === b ? c.warn(i + "This event " + a + " does not exist or has been already disabled") : m.splice(b, 1);
                })) : c.warn(i + "must enable or disable events");
              } else c.warn(i + "event-broadcast." + [o.lObjectType] + " must be an object check your model.");
            } else m = this.getAvailableEvents();
          } else c.error(i + "event-broadcast must be an object check your model.");
        } else m = this.getAvailableEvents();return m.forEach(function (c) {
          b.on(c, o.genDispatchEvent(a, c, n, j, b, d, e, k, l));
        }), n;
      }, j;
    }]).service("leafletEventsHelpers", ["LeafletEventsHelpersFactory", function (a) {
      return new a();
    }]), angular.module("leaflet-directive").factory("leafletGeoJsonEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "LeafletEventsHelpersFactory", "leafletData", function (a, b, c, d, e, f) {
      var g = d.safeApply,
          h = e,
          i = function () {
        h.call(this, "leafletDirectiveGeoJson", "geojson");
      };return i.prototype = new h(), i.prototype.genDispatchEvent = function (b, c, d, e, i, j, k, l, m) {
        var n = h.prototype.genDispatchEvent.call(this, b, c, d, e, i, j, k, l),
            o = this;return function (b) {
          "mouseout" === c && (m.resetStyleOnMouseout && f.getGeoJSON(m.mapId).then(function (a) {
            var c = l ? a[l] : a;c.resetStyle(b.target);
          }), g(e, function () {
            a.$broadcast(o.rootBroadcastName + ".mouseout", b);
          })), n(b);
        };
      }, i.prototype.getAvailableEvents = function () {
        return ["click", "dblclick", "mouseover", "mouseout"];
      }, new i();
    }]), angular.module("leaflet-directive").factory("leafletLabelEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "LeafletEventsHelpersFactory", function (a, b, c, d, e) {
      var f = d,
          g = e,
          h = function () {
        g.call(this, "leafletDirectiveLabel", "markers");
      };return h.prototype = new g(), h.prototype.genDispatchEvent = function (a, b, c, d, e, f, h, i) {
        var j = f.replace("markers.", "");return g.prototype.genDispatchEvent.call(this, a, b, c, d, e, j, h, i);
      }, h.prototype.getAvailableEvents = function () {
        return ["click", "dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
      }, h.prototype.genEvents = function (a, b, c, d, e, g, h, i) {
        var j = this,
            k = this.getAvailableEvents(),
            l = f.getObjectArrayPath("markers." + g);k.forEach(function (b) {
          e.label.on(b, j.genDispatchEvent(a, b, c, d, e.label, l, h, i));
        });
      }, h.prototype.bindEvents = function () {}, new h();
    }]), angular.module("leaflet-directive").factory("leafletMapEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "leafletEventsHelpers", "leafletIterators", function (a, b, c, d, e, f) {
      var g = d.isDefined,
          h = e.fire,
          i = function () {
        return ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "contextmenu", "focus", "blur", "preclick", "load", "unload", "viewreset", "movestart", "move", "moveend", "dragstart", "drag", "dragend", "zoomstart", "zoomanim", "zoomend", "zoomlevelschange", "resize", "autopanstart", "layeradd", "layerremove", "baselayerchange", "overlayadd", "overlayremove", "locationfound", "locationerror", "popupopen", "popupclose", "draw:created", "draw:edited", "draw:deleted", "draw:drawstart", "draw:drawstop", "draw:editstart", "draw:editstop", "draw:deletestart", "draw:deletestop"];
      },
          j = function (a, b, d, e) {
        return e && (e += "."), function (f) {
          var g = "leafletDirectiveMap." + e + b;c.debug(g), h(a, g, d, f, f.target, a);
        };
      },
          k = function (a) {
        a.$broadcast("boundsChanged");
      },
          l = function (a, b, c, d) {
        if (g(c.urlHashCenter)) {
          var e = b.getCenter(),
              f = e.lat.toFixed(4) + ":" + e.lng.toFixed(4) + ":" + b.getZoom();g(d.c) && d.c === f || a.$emit("centerUrlHash", f);
        }
      },
          m = function (a, b, c, d, e) {
        f.each(b, function (b) {
          var f = {};f[c] = b, a.on(b, j(d, b, e, a._container.id || ""), f);
        });
      };return { getAvailableMapEvents: i, genDispatchMapEvent: j, notifyCenterChangedToBounds: k, notifyCenterUrlHashChanged: l, addEvents: m };
    }]), angular.module("leaflet-directive").factory("leafletMarkerEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "LeafletEventsHelpersFactory", "leafletLabelEvents", function (a, b, c, d, e, f) {
      var g = d.safeApply,
          h = d.isDefined,
          i = d,
          j = f,
          k = e,
          l = function () {
        k.call(this, "leafletDirectiveMarker", "markers");
      };return l.prototype = new k(), l.prototype.genDispatchEvent = function (b, c, d, e, f, h, i, j) {
        var l = k.prototype.genDispatchEvent.call(this, b, c, d, e, f, h, i, j);return function (b) {
          "click" === c ? g(e, function () {
            a.$broadcast("leafletDirectiveMarkersClick", h);
          }) : "dragend" === c && (g(e, function () {
            i.lat = f.getLatLng().lat, i.lng = f.getLatLng().lng;
          }), i.message && i.focus === !0 && f.openPopup()), l(b);
        };
      }, l.prototype.getAvailableEvents = function () {
        return ["click", "dblclick", "mousedown", "mouseover", "mouseout", "contextmenu", "dragstart", "drag", "dragend", "move", "remove", "popupopen", "popupclose", "touchend", "touchstart", "touchmove", "touchcancel", "touchleave"];
      }, l.prototype.bindEvents = function (a, b, c, d, e, f) {
        var g = k.prototype.bindEvents.call(this, a, b, c, d, e, f);i.LabelPlugin.isLoaded() && h(b.label) && j.genEvents(a, c, g, e, b, d, f);
      }, new l();
    }]), angular.module("leaflet-directive").factory("leafletPathEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "leafletLabelEvents", "leafletEventsHelpers", function (a, b, c, d, e, f) {
      var g = d.isDefined,
          h = d.isObject,
          i = d,
          j = d.errorHeader,
          k = e,
          l = f.fire,
          m = function (a, b, d, e, f, g, h, i) {
        return a = a || "", a && (a = "." + a), function (j) {
          var k = "leafletDirectivePath" + a + "." + b;c.debug(k), l(e, k, d, j, j.target || f, h, g, i);
        };
      },
          n = function (a, b, d, e, f) {
        var l,
            n,
            p = [],
            q = "broadcast";if (g(f.eventBroadcast)) {
          if (h(f.eventBroadcast)) {
            if (g(f.eventBroadcast.path)) {
              if (h(f.eventBroadcast.paths)) c.warn(j + "event-broadcast.path must be an object check your model.");else {
                void 0 !== f.eventBroadcast.path.logic && null !== f.eventBroadcast.path.logic && ("emit" !== f.eventBroadcast.path.logic && "broadcast" !== f.eventBroadcast.path.logic ? c.warn(j + "Available event propagation logic are: 'emit' or 'broadcast'.") : "emit" === f.eventBroadcast.path.logic && (q = "emit"));var r = !1,
                    s = !1;if (void 0 !== f.eventBroadcast.path.enable && null !== f.eventBroadcast.path.enable && "object" == typeof f.eventBroadcast.path.enable && (r = !0), void 0 !== f.eventBroadcast.path.disable && null !== f.eventBroadcast.path.disable && "object" == typeof f.eventBroadcast.path.disable && (s = !0), r && s) c.warn(j + "can not enable and disable events at the same time");else if (r || s) {
                  if (r) for (l = 0; l < f.eventBroadcast.path.enable.length; l++) n = f.eventBroadcast.path.enable[l], -1 !== p.indexOf(n) ? c.warn(j + "This event " + n + " is already enabled") : -1 === o().indexOf(n) ? c.warn(j + "This event " + n + " does not exist") : p.push(n);else for (p = o(), l = 0; l < f.eventBroadcast.path.disable.length; l++) {
                    n = f.eventBroadcast.path.disable[l];var t = p.indexOf(n);-1 === t ? c.warn(j + "This event " + n + " does not exist or has been already disabled") : p.splice(t, 1);
                  }
                } else c.warn(j + "must enable or disable events");
              }
            } else p = o();
          } else c.error(j + "event-broadcast must be an object check your model.");
        } else p = o();for (l = 0; l < p.length; l++) n = p[l], b.on(n, m(a, n, q, f, p, d));i.LabelPlugin.isLoaded() && g(b.label) && k.genEvents(a, d, q, f, b, e);
      },
          o = function () {
        return ["click", "dblclick", "mousedown", "mouseover", "mouseout", "contextmenu", "add", "remove", "popupopen", "popupclose"];
      };return { getAvailablePathEvents: o, bindPathEvents: n };
    }]);
  }(angular);
})(angular);

},{}]},{},[1]);
