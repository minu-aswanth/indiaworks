'use strict';

angular.module('indiaworksApp')
  .config(function ($stateProvider) {
    // $stateProvider
      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'app/account/login/login.html',
      //   controller: 'LoginCtrl'
      // })
      // .state('signup', {
      //   url: '/signup',
      //   templateUrl: 'app/account/signup/signup.html',
      //   controller: 'SignupCtrl'
      // })
      // .state('settings', {
      //   url: '/settings',
      //   templateUrl: 'app/account/settings/settings.html',
      //   controller: 'SettingsCtrl',
      //   authenticate: true
      // });

    $stateProvider
      .state('verifyEmail', {
        url: '/verify/:token',
        templateUrl: 'app/account/verifyEmail/verifyEmail.html',
        controller: 'VerifyEmailCtrl'
      });

  });