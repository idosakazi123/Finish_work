angular.module('citiesApp')
 .controller('poiCtrl', ['$scope','$http','serverService','userDetails','poiDialog',function($scope,$http,serverService,userDetails,poiDialog){
    let self = this;
    self.poiArray = [];
    $scope.isLogin;
    $scope.poiCategories = {};
    $scope.favoriteCounter = 0;
    $scope.modalShown = false;

    $scope.save = function (poi){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0! WTF
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        
        if(mm<10) {
            mm = '0'+mm
        }
        var username = userDetails.getUserName()
        var poid = poi.poid;
        var token = userDetails.getUserToken(username).token
        var timestamp = yyyy + "-" + mm + '-' + dd;
        $scope.userPoi = {username: username, poid: poid, token: token, timestamp: timestamp, favorite: 0}
        $http.post(serverService.serverUrl + "userpoi/saveuserpoi",$scope.userPoi).then(
            function (response){
                poi.save=true;
                $scope.$broadcast('poisave')
                console.log(poi.poid +"poi has been saved")
            },function (response) {
                console.log(response)
                //Second function handles error
                alert("please try again")
            }
        );
    }

    $scope.onOpenDialog = function(poiData){
        poiDialog.open(poiData);
    }

    $scope.unsave = function (poi){
        var username = userDetails.getUserName()
        var poid = poi.poid;
        var token = userDetails.getUserToken(username).token
        $scope.userPoi = {username: username, poid: poid, token: token}
        $http.post(serverService.serverUrl + "userpoi/delete",$scope.userPoi).then(
            function (response){
                poi.save=false;
                $scope.$broadcast('poiunsave')
                $scope.favoriteCounter = $scope.favoriteCounter - 1;
                console.log(poi.poid + " poi has been unsaved")
            },function (response) {
                //Second function handles error
                alert("please try again")
            }
        );
    }

    $scope.$on('userLogin', function(event, args){
        $scope.isLogin = true;
    });

    $scope.$on('userLogout', function(event, args){
        $scope.isLogin = false;
    });

    $scope.$on('poisave', function(event, args){
        $scope.favoriteCounter++;
    });

    $scope.$on('poiunsave', function(event, args){
        if($scope.favoriteCounter>0){
            $scope.favoriteCounter--;
        }
    });

    $scope.$on('poiset', function(event, args){
        $scope.favoriteCounter = args
    });

    $http.get(serverService.serverUrl + "poireview/rateAll").then(
        function(response){
            var poiObject = response.data
            var username = userDetails.getUserName()
            if(username == "guest"){
                var i;         
                for (i = 0; i < poiObject.length; i++) {
                    //console.log(poiObject[i])
                    self.poiArray[i] = {poid: poiObject[i].poid, name: poiObject[i].name, picture: poiObject[i].picture, category: poiObject[i].category,
                                        description: poiObject[i].description, rate: poiObject[i].average, save: false};
                }
            }
            else{
                $http.get(serverService.serverUrl + "userpoi/" +username).then(
                    function(response){
                        var userpoiObject = []
                        var i;
                        for (i = 0; i < response.data.length; i++) {
                            userpoiObject[i] = response.data[i].poid
                        }
                        $scope.$broadcast('poiset',userpoiObject.length)

                        for (i = 0; i < poiObject.length; i++) {
                            var isSaved = false;
                            if(userpoiObject.includes(poiObject[i].poid)){
                                isSaved=true;
                            }
                            //console.log(poiObject[i])
                            self.poiArray[i] = {poid: poiObject[i].poid, name: poiObject[i].name, picture: poiObject[i].picture, category: poiObject[i].category,
                                                description: poiObject[i].description, rate: poiObject[i].average, save: isSaved};
                        }
                    },function (response) {
                        //Second function handles error
                        console.log("not good at poi")
                    } 
                )
            }
        },function (response) {
            //Second function handles error
            console.log("not good at poi")
        }   
    );

    $http.get(serverService.serverUrl + "users/categories").then(
        function(response){
            var categoriesObject = response.data
            var i;
            $scope.poiCategories[0]=" ";
            for (i = 0; i < categoriesObject.length; i++) {
                $scope.poiCategories[i+1] = categoriesObject[i].category;
            }
        },function (response) {
            //Second function handles error
            console.log("not good at categories")
        }
    );
    
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };

 }]);
 