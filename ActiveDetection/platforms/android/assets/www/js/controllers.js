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

.controller('AccountCtrl', function($scope,$cordovaDeviceMotion,$http) {
    $scope.settings = {
        enableFriends: true
    };



    var accArray = [];

    //$scope.onSwitchChange = function () {
    //    $scope.isOn ? stop() : start();
    //    $scopr.isOn =!$scopr.isOn;
    //}

    //function start() {
    //    if (!watch) {
           
    //    }
    //}

   

    $scope.getAcc = function () {
      
  

      $cordovaDeviceMotion.getCurrentAcceleration().then(success, fail);
      function success(acc){

         $scope.data= acc;


      }
      function fail(reason){
          alert(JSON.stringify(reason));
      }
      

    }




        var options = { frequency: 1000/32 };
        var watchId;

       // watchId = $cordovaDeviceMotion.watchAcceleration(options).then(null, fail, notify);

        //function notify(acc) {

        //    $scope.data = acc;

        //}

        function fail(reason) {
            alert(JSON.stringify(reason));
        }
     
    
        var startTime;
        var count = 128;
     
        $scope.data = {};
        function getAccArray(acc) {
            if (accArray.length == 0)
                startTime = new Date().getTime();
            $scope.data.acc = acc;
            accArray.push(acc);
            if(accArray.length==count)
            {
                var accArrayX = angular.copy(accArray);
                UbilibPlugin.getParams(paramsGot, fail, accArrayX);
                function paramsGot(ja) {
                
                    var params = ja[0];
                    params.dua_id = 123;
                    params.app_key = "123";
                    $scope.data.paramsTest = params;
                    accArray.length = 0;
                    accArray = [];
                   // alert(accArray.length);
                    $http({
                        method: 'POST',
                        url: "http://ivita.xdua.org/ivita/compute/ActivityRecognizer",
                        data: params,
                        timeout: 5000,
                        headers: {
                            'Content-Type': 'text/html'
                        },
                    }).then(onSuccess, recErr);
                    


                 
                }

                function onSuccess(res) {
                   //alert(JSON.stringify(res.data));
                    $scope.data.dataStatus = JSON.stringify(res.data);
                }
                function recErr(reason) {
                    alert(JSON.stringify(reason));
                }
            }
        }

        var watch;
        watch = $cordovaDeviceMotion.watchAcceleration(options).then(null, fail, getAccArray);
        




});
