'use strict';

angular.module('indiaworksApp')
  .controller('VerifyEmailCtrl', function ($scope, $http, $stateParams, $window, $location) {
    $scope.message = 'Working...';

    $http.post('/api/subscriptions/verify/' + $stateParams.token)
    .success(function (message) {
      $scope.message = 'Successfully verified!';
      $location.url('/');
    })
    .error(function (message) {
      $scope.message = 'Your token has been expired (or) is invalid';
    });
  });
