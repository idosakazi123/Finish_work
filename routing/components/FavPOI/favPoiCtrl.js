angular.module('citiesApp')
 .controller('favPoiCtrl', ['$scope','$http','serverService','userDetails','poiDialog',function($scope,$http,serverService,userDetails,poiDialog){
    let self = this;
    self.poiArray = [];
    //$scope.poiCategories = {};
    $scope.username = userDetails.getUserName()

    if(!($scope.username=="guest")){
        $http.get(serverService.serverUrl + "userpoi/all/" + $scope.username).then(
            function(response){
                var poiObject = response.data
                var i;
                for (i = 0; i < poiObject.length; i++) {
                    self.poiArray[i] = {poid: poiObject[i].poid, name: poiObject[i].name, picture: poiObject[i].picture, category: poiObject[i].category,
                        description: poiObject[i].description, rate: poiObject[i].average, save: true};
                }
            },function (response) {
                //Second function handles error
                console.log("not good at fav poi")
            }   
        );
    }

    $scope.onOpenDialog = function(poiData){
        poiDialog.open(poiData);
    }


 }]);