'use strict';

var app=angular.module('indiaworksApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angular-intro',
  'ipCookie'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

  app.controller('MyController', function ($scope, $timeout, ipCookie) {
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
        exitOnEsc: true,
        nextLabel: '<strong>NEXT!</strong>',
        prevLabel: '<span style="color:green">Previous</span>',
        skipLabel: 'Exit',
        doneLabel: 'Thanks'
    };

    $scope.ShouldAutoStart = false;

}); 