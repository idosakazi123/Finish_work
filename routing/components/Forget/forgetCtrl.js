angular.module('citiesApp')
.controller('forgetCtrl', ['$scope','$http','userDetails','serverService','localStorageModel', function ($scope,$http,userDetails,serverService,localStorageModel) {

    $scope.showPassword = function(){
        $http.post(serverService.serverUrl + "users/retrivalPassword",$scope.user).then(
            function (response){
                $scope.error = response.data.ERROR;
                $scope.password = response.data.password;
            },function (response) {
                //Second function handles error
                alert("sorry you enter worng details")
            }
        );
    }

}]);