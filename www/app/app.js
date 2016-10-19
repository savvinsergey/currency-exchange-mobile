(function(){
  'use strict';

  angular.module('currencyApp', [
      'currencyApp.config',
      'currencyApp.modules.currency',
      'currencyApp.modules.settings',
      'ionic',
      'ngCordova'
    ])
    .config(['$stateProvider','$urlRouterProvider',config])
    .run(['$ionicPlatform',run]);

    function config($stateProvider,$urlRouterProvider){

      $stateProvider
        .state('tabs',{
          url: '/tabs',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })
        .state('tabs.currency',{
          url: '/currency',
          views: {
            'currency-content' : {
              templateUrl: 'app/modules/currency/currency.tpl.html',
              controller: 'CurrencyCtrl',
              controllerAs: 'CurrencyVm'
            }
          }
        })
        .state('tabs.settings',{
          url: '/settings',
          views: {
            'settings-content' : {
              templateUrl: 'app/modules/settings/settings.tpl.html',
              controller: 'SettingsCtrl',
              controllerAs: 'SettingsVm'
            }
          }
        });

      $urlRouterProvider.otherwise('/tabs/currency')

    }

    function run($ionicPlatform) {

      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }


      });

    }

}());

