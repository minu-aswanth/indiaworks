'use strict';

angular.module('indiaworksApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
  	$scope.submitted = false;
  	$scope.email = '';
		$scope.message = "";
    $scope.addEmail = function (form) {
	  	$scope.submitted = true;
	  	if(form.$valid) {
				$scope.message = "Working...";
		    $http.post('/api/subscriptions', { email: $scope.email })
		    	.success(function (response) {
	  				$scope.submitted = false;
	    			$scope.email = '';
	  				$scope.message = "Thank you for subscribing !";
		    	})
		    	.error(function (err) {
	  				$scope.submitted = false;
	    			$scope.email = '';
	  				$scope.message = "Thank you for subscribing !";
		    	});
  			$timeout(removeMessage, 5000);
	  	}
    };

  	function removeMessage() {
  		$scope.message = '';
  	}

  });
