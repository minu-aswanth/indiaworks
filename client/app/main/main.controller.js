'use strict';

angular.module('indiaworksApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, ipCookie) {

    console.log($(window).width());

    $scope.currentStep = ipCookie('myTour') || 1;

    $scope.AfterChangeEvent = function() {
      // console.log(this._currentStep + 1);
      $scope.currentStep = this._currentStep + 1;
      ipCookie('myTour', $scope.currentStep, { expires: 7 });
    };

    $scope.CompletedEvent = function() {
      // console.log(this._currentStep + 2);
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
            element: document.querySelector('#headerIcon'),
            intro: "Hello there! Welcome to IndiaWorks",
            position: 'down'
        },
        {
            step : 2,
            element: document.querySelector('#inputField'),
            intro: "Enter your email to know more about us",
            position: 'top'
        },
        {
            step : 3,
            element: document.querySelector('#facebook'),
            intro: "Like our facebook page",
            position: 'top'
        },
        {
            step : 4,
            element: '#youtube',
            intro: 'Subscribe to our youtube channel',
            position: 'top'
        }
      ],
      showStepNumbers: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: '<strong>NEXT!</strong>',
      prevLabel: '<span style="color:green">Previous</span>',
      skipLabel: 'Stop Tour',
      doneLabel: 'Okay'
    };

    $scope.ShouldAutoStart = false;

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
