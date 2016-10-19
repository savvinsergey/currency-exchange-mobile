(function(){
  'use strict';

  angular.module('currencyApp.config', [])
    .constant('CONFIG',{
      currencyPairs: ['USDRUB','EURRUB'],
      updateTime: 60
    });

}());


