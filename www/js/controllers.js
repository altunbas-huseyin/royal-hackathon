angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('LoginCtrl', function ($scope, api, store, $state, auth) {
      $scope.login = function() {
        auth.signin({
          authParams: {
            scope: 'openid offline_access',
            device: 'Mobile device'
          }
        }, function(profile, token, accessToken, state, refreshToken) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          store.set('refreshToken', refreshToken);
          $state.go('app.home');
        }, function() {
          // Error callback
        });
      }
      $scope.logout = function() {
          auth.signout();
          store.remove('profile');
          store.remove('token');
        }
    })
    .controller('HomeCtrl', function ($scope, api) {

        api.getCategories(function(response) {
            if (response.status === "success") {
                $scope.categories = response.data;
            } else {
                alert(response.message);
            }
        });
    })

    .controller('SubcategoryCtrl', function($scope, api, $stateParams) {

        api.getSubCategory($stateParams.subcategoryId, "1", "50", function(response) {
            if (response.status === "success") {
                $scope.subcategories = response.data;
            } else {
                alert(response.message);
            }
        })

    })

    .controller('CategoryCtrl', function($scope, api, $stateParams) {

        api.getCategoryDetail($stateParams.categoryId, function(response) {
            if (response.status === "success") {
                $scope.category = response.data[0];
            } else {
                alert(response.message);
            }
        })

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
