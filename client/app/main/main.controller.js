'use strict';

angular.module('indiaworksApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.addEmail = function(){
      $http.post('/api/subscriptions', { email: $scope.email });
      $scope.email = '';
    }
  });
