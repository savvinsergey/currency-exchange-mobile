(function(){
  'use strict';

  angular.module('currencyApp.modules.currency')
    .controller('CurrencyCtrl',
      [ '$scope',
        '$interval',
        'CONFIG',
        'CurrencySvc',
        '$ionicLoading',
         CurrencyCtrl
      ]);

    function CurrencyCtrl($scope, $interval, CONFIG, CurrencySvc, $ionicLoading){

      var self = this;

      function getCurrencyRate(needLoading) {

        if (needLoading) {
          $ionicLoading.show({
            template: 'Loading...'
          });
        }

        CurrencySvc.getCurrentCurrencyRates()
          .then(function (response) {
            var currency,
                limits = {},
                rate,
                prevRate;

            if (!response.data.query.results.rate.length) {
              return;
            }

            response.data.query.results.rate.forEach(function (item) {

              currency = item.id.toLowerCase().substr(0, 3);
              limits = {
                down : self.currency[currency].limits.down,
                up   : self.currency[currency].limits.up
              };

              prevRate = self.currency[currency].prevRate;
              rate = self.currency[currency].rate = (+item.Rate).toFixed(2);

              self.currency[currency].delta = prevRate !== 0 ? +(prevRate - rate).toFixed(2) : 0;
              self.currency[currency].isIncrease = self.currency[currency].delta >= 0;
              self.currency[currency].lastUpdate = response.data.query.created;
              self.currency[currency].prevRate = rate;

              if (self.currency[currency].delta < 0) {
                self.currency[currency].delta *= -1;
              }

              if ((limits.down && rate < limits.down) || (limits.up && rate > limits.up)) {
                CurrencySvc.currencyLimitsNotifyUser(currency.toLowerCase());
              }

            });

            if (needLoading) {
              $ionicLoading.hide();
            }

          }, console.log);
      }

      //---------------------------------------------------//

      this.currency = CurrencySvc.currency;

      this.initialize = function initialize(){
        getCurrencyRate(true);

        $interval(function(){
          getCurrencyRate(false);
        },CONFIG.updateTime * 1000);
      };

      this.doRefresh = function doRefresh(){
        getCurrencyRate();
      };

      $scope.$on("$ionicSlides.sliderInitialized", function sliderInitialized(event, data){
        $scope.slider = data.slider;
      });

    };

}());
