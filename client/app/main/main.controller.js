'use strict';

angular.module('indiaworksApp')
  .controller('MainCtrl', function ($scope, $http) {
  	$scope.submitted = false;
  	$scope.email = '';
		$scope.message = "";
    $scope.addEmail = function (form) {
	  	$scope.submitted = true;
	  	if(form.$valid) {
				$scope.message = "Working...";
		    $http.post('/api/subscriptions', { email: $scope.email })
		    	.then(function (response) {
		    		if(response.status === 201) {
		    			$scope.email = '';
		  			} else {
		  				$scope.message = "Thank you for subscribing !";
		  			}
		    	});
	  	}
    };
  });
