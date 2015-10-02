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

    $scope.currentStep = ipCookie('myTour') || 1;

    $scope.AfterChangeEvent = function() {
      console.log(this._currentStep + 1);
      $scope.currentStep = this._currentStep + 1;
      ipCookie('myTour', $scope.currentStep, { expires: 7 });
    };

    $scope.CompletedEvent = function() {
      console.log(this._currentStep + 2);
      $scope.currentStep = this._currentStep + 2;
      ipCookie('myTour', $scope.currentStep, { expires: 7 });
    };

    if($scope.currentStep < 3){
      $timeout( function(){$scope.CallMe($scope.currentStep);}, 5000);
    }

    $scope.IntroOptions = {
        steps:[
        {
            step : 1,
            element: document.querySelector('#inputField'),
            intro: "Enter your email to know more about us",
            position: 'left'
        },
        {
            step : 2,
            element: document.querySelector('#facebook'),
            intro: "Like our facebook page",
            position: 'left'
        },
        {
            step : 3,
            element: '#youtube',
            intro: 'Subscribe to our youtube channel',
            position: 'right'
        }
        ],
        showStepNumbers: false,
        exitOnOverlayClick: true,
        exitOnEsc:true,
        nextLabel: '<strong>NEXT!</strong>',
        prevLabel: '<span style="color:green">Previous</span>',
        skipLabel: 'Exit',
        doneLabel: 'Thanks'
    };

    $scope.ShouldAutoStart = false;
  });
