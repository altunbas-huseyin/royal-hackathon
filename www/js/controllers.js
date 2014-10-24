angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, store, auth, $state) {
        // Form data for the login modal
        $scope.loginData = {};

        var token = store.get('token');

        if (token) $scope.loginData.token = token;

        $scope.loginData.logout = function () {
            auth.signout();
            store.remove('profile');
            store.remove('token');

            $state.go('app.login');
        }

    })

    .controller('LoginCtrl', function ($scope, api, store, $state, auth, $ionicSideMenuDelegate) {

        $ionicSideMenuDelegate.toggleLeft();

        $scope.login = function () {
            auth.signin({
                authParams: {
                    scope: 'openid offline_access',
                    device: 'Mobile device'
                }
            }, function (profile, token, accessToken, state, refreshToken) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                store.set('refreshToken', refreshToken);
                $state.go('app.home');

                $scope.loginData.token = token;

            }, function () {
                // Error callback
            });
        }

    })
    .controller('HomeCtrl', function ($scope, api) {

        api.getCategories(function (response) {
            if (response.status === "success") {
                $scope.categories = response.data;
            } else {
                alert(response.message);
            }
        });
    })

    .controller('SubcategoryCtrl', function ($scope, api, $stateParams) {

        api.getSubCategory($stateParams.subcategoryId, "1", "50", function (response) {
            if (response.status === "success") {
                $scope.subcategories = response.data;
            } else {
                alert(response.message);
            }
        })

    })

    .controller('CategoryCtrl', function ($scope, api, $stateParams, $ionicModal) {

        $scope.category = {};

        api.getCategoryDetail($stateParams.categoryId, function (response) {
            if (response.status === "success") {
                var data = response.data[0];

                $scope.category = data;


                $scope.$on('mapInitialized', function (event, map) {

                    $scope.map = map;
                    $scope.map.markers = [
                        {
                            lat: data.lat,
                            lng: data.lon
                        }
                    ];

                    $scope.category.positions = [
                        {
                            lat: data.lat,
                            lng: data.lon
                        }
                    ];

                    var myLatLng = new google.maps.LatLng(data.lat, data.lon);

                    map.setCenter(myLatLng);
                });

            } else {
                alert(response.message);
            }

            $scope.goToUrl = function(url) {
                if (url) {
                    var ref = window.open(url, '_blank', 'hidden=yes');
                    ref.show();
                }
            }


            $ionicModal.fromTemplateUrl('map.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.showOnMap = function () {
                $scope.modal.show();
            };
            $scope.category.hideMap = function () {
                $scope.modal.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
        });

    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
