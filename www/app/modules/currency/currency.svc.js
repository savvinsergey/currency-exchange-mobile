(function(){
  'use strict';

  angular.module('currencyApp.modules.currency')
    .factory('CurrencySvc',
      [ '$http',
        'CONFIG',
        '$ionicPlatform',
        '$cordovaVibration',
        '$cordovaLocalNotification',
         CurrencySvc
      ]);

    function CurrencySvc($http, CONFIG, $ionicPlatform, $cordovaVibration, $cordovaLocalNotification){

      var currencyPairs =  CONFIG.currencyPairs.join(',');
      var query = decodeURIComponent('select+*+from+yahoo.finance.xchange+where+pair+=+"' + currencyPairs + '"');
      var env   = decodeURIComponent('store://datatables.org/alltableswithkeys');

      var url   = 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json&env=' + env;

      return {
        currency: {
          usd  : {
            prevRate: 0,
            limits: {
              up: 0,
              down: 0
            }
          },
          eur : {
            prevRate: 0,
            limits: {
              up: 0,
              down: 0
            }
          }
        },

        getCurrentCurrencyRates: function(){
          return $http.get(url);
        },

        currencyLimitsNotifyUser: function(currency){

          this.currency[currency].limits.up = 0;
          this.currency[currency].limits.down = 0;

          $ionicPlatform.ready(function() {

            if (window.cordova && window.cordova.plugins) {
              $cordovaVibration.vibrate(300);
              $cordovaLocalNotification.schedule({
                id: 1,
                title: "Alert for currency limit",
                text: 'Please check: ' + currency
              });
            }

          });

        }

      }

    }

}());
