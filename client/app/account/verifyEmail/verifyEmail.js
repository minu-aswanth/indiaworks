'use strict';

angular.module('indiaworksApp')
  .controller('VerifyEmailCtrl', function ($scope, $http, $stateParams, $location, $timeout) {
    $scope.message = 'Working...';

    $http.post('/api/subscriptions/verify/' + $stateParams.token)
      .success(function (response) {
        $scope.message = 'Email successfully verified!';
        $timeout(redirectToHome, 5000);
      })
      .error(function (response) {
        $scope.message = 'Some error occurred. Please reload!';
      });

      function redirectToHome() {
        $scope.message = 'Redirecting to homepage...';
        $location.url('/');
      }
  });
