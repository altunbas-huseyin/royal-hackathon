// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'ngMap', 'starter.controllers',
    'auth0',
    'angular-storage',
    'angular-jwt'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .factory('api', function($http) {
        var config = {
            baseUrl : "https://api.paris.fr/api/data/1.0/",
            token   : "39126f7a669cc58f7814e1f2f2d7b26fdee0e2617c764c225f62aed434df8003"
        };

        return {
            getCategories: function(success) {
                $http({
                    url: config.baseUrl + 'Equipements/get_categories/',
                    method: "GET",
                    params: {
                        token: config.token
                    }
                })
                    .success(function(data) {
                        success(data);
                    });
            },
            getSubCategory: function(cid, offset, limit, success) {
                $http({
                    url: config.baseUrl + 'Equipements/get_equipements/',
                    method: "GET",
                    params: {
                        token: config.token,
                        cid: cid,
                        offset: offset,
                        limit: limit
                    }
                })
                    .success(function(data) {
                        success(data);
                    });
            },
            getCategoryDetail: function(id, success) {
                $http({
                    url: config.baseUrl + 'Equipements/get_equipement/',
                    method: "GET",
                    params: {
                        token: config.token,
                        id: id
                    }
                })
                    .success(function(data) {
                        success(data);
                    });
            }
        }
    })

    .config(function ($stateProvider, $urlRouterProvider,  authProvider, $httpProvider, jwtInterceptorProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: "LoginCtrl"
                    }
                }
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: "HomeCtrl"
                    }
                }
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })

            .state('app.category', {
                url: "/category/:categoryId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category.html",
                        controller: "CategoryCtrl"
                    }
                }
            })

            .state('app.subcategory', {
                url: "/subcategory/:subcategoryId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/subcategory.html",
                        controller: "SubcategoryCtrl"
                    }
                }
            })

            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/map.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
        authProvider.init({
            domain: 'royalhackathon.auth0.com',
            clientID: 'YnuUoMRh1p9EwmVQmhIR3IevNPfJgkju',
            loginState: 'login'
        });
    })
    .run(function(auth) {
      // This hooks al auth events to check everything as soon as the app starts
      auth.hookEvents();
    });

