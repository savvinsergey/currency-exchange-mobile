(function(){
  'use strict';

  angular.module('currencyApp.modules.settings')
    .controller('SettingsCtrl',
      ['CurrencySvc', SettingsCtrl ]);

    function SettingsCtrl( CurrencySvc){

      this.limits = {
        usd : angular.copy(CurrencySvc.currency.usd.limits),
        eur : angular.copy(CurrencySvc.currency.eur.limits)
      };

      this.saveLimits = function saveLimits(currency,limits){
        CurrencySvc.currency[currency].limits = limits;
      }

    };

}());
