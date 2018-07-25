angular.module('citiesApp')
.controller('loginCtrl', ['$scope','$http','userDetails','serverService','localStorageModel', function ($scope,$http,userDetails,serverService,localStorageModel) {
    let self = this

   $scope.login = function () {
       $http.post(serverService.serverUrl + "users/login",self.user).then(
           function (response){
                localStorageModel.addLocalStorage(self.user.username,response.data)
                userDetails.setUserName(self.user.username);           
                window.location.replace("#/");   
           },function (response) {
               //Second function handles error
               alert("please provide valid details")
           }
       );
   }

    $scope.retrivePassword = function(){
        location.replace("#/forget");
    }
   
}]);