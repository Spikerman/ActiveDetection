angular.module('starter.controllers', ["ngCordova"])

.controller('DashCtrl', function ($scope,$http) {


    $scope.answers = [];
    $scope.answer = { content: "response" };
    $scope.chatting={name:"焦帅",message:"who are you"}
    $scope.onBtnClick = function () {
        var msg = {};
        msg.name = $scope.chatting.name;
        msg.said = $scope.chatting.message;


        $http({
            method: 'POST',
            url: "http://caswi.xdua.org/robot",
            data: msg,
            timeout: 5000,
        }).then(onSuccess, onFail);

        function onSuccess(res) {
            $scope.answer.content = JSON.stringify(res.data.data.talk);
            var obj = {};
            obj.content = JSON.stringify(res.data.data.talk);
            $scope.answers.push(obj);
        }

        function onFail(res) {
            alert(JSON.stringify(res));
        }
    }
})



.controller('InfoCtrl', function ($scope,$http) {

    $scope.answer.content = {};

    $scope.onBtnClick() = function () {
        var msg = {};
        msg.name = $scope.chatting.name;
        msg.said = $scope.chatting.message;

        $http({
            method: 'POST',
            url:"http://caswi.xdua.org/robot",
            data: msg,
            timeout: 5000,
        }).then(onSuccess, onFail);

        function onSuccess(res) {
            $scope.answer.content = JSON.stringify(res);
        }

        function onFail(res) {
            alert(JSON.stringify(res));
        }
    }

})

.controller('ChatsCtrl', function($scope, Chats,$http) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
    msg = { features: {}};
    $http({
        method: 'POST',
        url: "http://caswi.xdua.org/ar",
        data: msg,
        timeout: 5000,
    }).then(onSuccess,onSuccess);
    function onSuccess(res){
        alert(JSON.stringify(res.data));
    }
})


.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$cordovaDeviceMotion,$http) {
    $scope.settings = {
        enableFriends: false
    };



    var accArray = [];

    $scope.resultArray = [];
   
    var watch=null;

    $scope.change=function(){
        if ($scope.settings.enableFriends) {
            $scope.testState = "Start";
            if (watch == null) {
                watch = $cordovaDeviceMotion.watchAcceleration(options);
                watch.then(null, fail, getAccArray);

            }
        }
        else {
            $scope.testState = "Stop";
            if (watch != null) {
                watch.clearWatch();
                $scope.data = {};
                watch = null;
                $scope.resultArray = [];
            }
        }
    }
    
    $scope.input = { url: "http://caswi.xdua.org/ar",name:"js" }
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
        $scope.ns = ["js","zsj","lqh","ljx","zx","oy","ht","wxt"];
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
                    var msg = {};
                    msg.features = ja[0];
                    msg.name = $scope.input.name;
                    $scope.data.paramsTest = ja[0];
                    accArray.length = 0;
                    accArray = [];
                    $http({
                        method: 'POST',
                        url: $scope.input.url,
                        data: msg,
                        timeout: 5000,
                    }).then(onSuccess, recErr);
                    


                 
                }

                function onSuccess(res) {
                    $scope.data.results = JSON.stringify(res.data);
                    var obj = {};
                    obj.str = JSON.stringify(res.data);
                    $scope.resultArray.push(obj);

                    //$scope.act = JSON.stringify(res.data.act);
                    //$scope.position = JSON.stringify(res.data.position);
                    //$scope.status = JSON.stringify(res.data.status);
                }
                function recErr(res) {
                    alert(JSON.stringify(res.data));
                }
            }
        }

        
        




});
