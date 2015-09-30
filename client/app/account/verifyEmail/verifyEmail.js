'use strict';

angular.module('indiaworksApp')
  .controller('VerifyEmailCtrl', function ($scope, $http, $stateParams, $location, $timeout) {
    $scope.message = 'Working...';

    $http.post('/api/subscriptions/verify/' + $stateParams.token)
      .then(function (response) {
        if(response.status === 200) {
          $scope.message = 'Email successfully verified!';
          $timeout(redirectToHome, 5000);
        } else {
          $scope.message = 'Some error occurred. Please reload!';
        }
      });

      function redirectToHome() {
        $scope.message = 'Redirecting to homepage...';
        $location.url('/');
      }
  });
