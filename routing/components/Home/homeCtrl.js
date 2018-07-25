angular.module('citiesApp')
 .controller('homeCtrl', ['$scope','$http','userDetails','serverService','poiDialog',function($scope,$http,userDetails,serverService,poiDialog) {
    $scope.poiArray = [];
    $scope.userRecentPoiArray = [];
    $scope.userPopularPoiArray = [];

    $scope.onOpenDialog = function(poiData){
        poiDialog.open(poiData);
    }

    if($scope.isLogin){
        $scope.username = userDetails.getUserName()

        $http.get(serverService.serverUrl + "userpoi/popular/" + $scope.username).then(
            function(response){   
                var poiObject = response.data
                var i;
                var getUserPopularPoiArray = [];
                for (i = 0; i < poiObject.length; i++) {
                    getUserPopularPoiArray[i] = {poid: poiObject[i].poid, name: poiObject[i].name, picture: poiObject[i].picture, category: poiObject[i].category, description: poiObject[i].description};
                }

                $scope.userPopularPoiArray[0] = getUserPopularPoiArray[0];
                for(i = 1; i < poiObject.length; i++){
                     if(getUserPopularPoiArray[0].category != getUserPopularPoiArray[i].category){
                        $scope.userPopularPoiArray[1] = getUserPopularPoiArray[i];
                        i=poiObject.length;
                     }
                }
                console.log($scope.userPopularPoiArray)

            },function (response) {
                //Second function handles error
                console.log("not good at random poi")
            }
        );
        
        $http.get(serverService.serverUrl + "userpoi/recent/" + $scope.username).then(
            function(response){   
                var poiObject = response.data
                var i;
                for (i = 0; i < poiObject.length; i++) {
                   $scope.userRecentPoiArray[i] = {poid: poiObject[i].poid, name: poiObject[i].name, picture: poiObject[i].picture, category: poiObject[i].category, description: poiObject[i].description};
               }
            },function (response) {
                //Second function handles error
                console.log("not good at random poi")
            }
        );
    }

    $http.get(serverService.serverUrl + "poi/random").then(
         function(response){   
             var poiObject = response.data
             var i;
             for (i = 0; i < poiObject.length; i++) {
                $scope.poiArray[i] = {poid: poiObject[i].poid, name: poiObject[i].name, picture: poiObject[i].picture, category: poiObject[i].category, description: poiObject[i].description};
            }
         },function (response) {
             //Second function handles error
             console.log("not good at random poi")
         }
     );
    
    $scope.$on('userLogin', function(event, args){       
        $scope.userName = args.userName;
        $scope.isLogin = true;
    });

    $scope.$on('$getGuestPictures', function(){
        $http.get(serverService.serverUrl + 'poi/random').then(
            function(response){
                $scope.randomPictures = response.data;
                console.log($scope.randomPictures)
            }
        )
    })

}]);