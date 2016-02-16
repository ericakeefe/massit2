angular.module('eeaDoerApp')
  .controller('CtctCtrl', function ($scope,$window) {
  	
          console.log('something fired in contact');
          $scope.something = [];

       var mq = $window.matchMedia( "(min-height: 450px) and (max-height: 1200px )" );
          if (mq.matches) {
           $('#footer').css('position', 'fixed');
           }
           else {
            $('#footer').css('position', 'relative');
           }

         
  });