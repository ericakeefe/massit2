angular.module('eeaDoerApp')
  .controller('FaqCtrl', function ($scope,$window) {
  	
          console.log('something fired');
          $scope.something = [];
       //   $('#footer').css('position', 'relative');
          var mq = $window.matchMedia( "(min-height:10px) and (max-height: 1035px )" );
          if (mq.matches) {
           $('#footer').css('position', 'relative');
           }
           else {
            $('#footer').css('position', 'fixed');
           }
  });