angular.module('starter.controllers', ["ngCordova"])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$cordovaDeviceMotion) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.data = {
        x: 0,
        y: 0,
        z: 0

    }

   

    $scope.getAcc = function () {
      
  

      $cordovaDeviceMotion.getCurrentAcceleration().then(success, fail);
      function success(acc){

         $scope.data= acc;
         

      }
      function fail(reason){
          alert(JSON.stringify(reason));
      }
      

    }




        var options = { frequency: 300 };
        var watchId;

        watchId = $cordovaDeviceMotion.watchAcceleration(options).then(null, fail, notify);

        function notify(acc) {

            $scope.data = acc;


        }

        function fail(reason) {
            alert(JSON.stringify(reason));
        }
     
    

});
