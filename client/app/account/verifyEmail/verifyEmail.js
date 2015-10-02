'use strict';

angular.module('indiaworksApp')
  .controller('VerifyEmailCtrl', function ($scope, $http, $stateParams, $location, $timeout) {
    $scope.message = 'Working...';

    $http.post('/api/subscriptions/verify/' + $stateParams.token)
      .success(function (response) {
        $scope.message = 'Email successfully verified!';
        $timeout(stayTuned, 3000);
      })
      .error(function (response) {
        $scope.message = 'Some error occurred. Please reload!';
        $timeout(stayTuned, 3000);
      });

      function stayTuned() {
        $scope.message = 'Stay tuned for Updates!';
        $timeout(redirectToHome, 5000);
      }

      function redirectToHome() {
        $scope.message = 'Redirecting to homepage...';
        $location.url('/');
      }
  });
