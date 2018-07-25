angular.module('citiesApp')
    .controller('indexController',['$scope','userDetails', function ($scope,userDetails) {
        $scope.userName = userDetails.userName
        $scope.isLogin = userDetails.isLogin

        $scope.$on('userLogin', function(event, args){
            $scope.userName = args.userName;
            $scope.isLogin = true;
        });

        $scope.$on('userLogout', function(event, args){
            $scope.userName = args.userName;
            $scope.isLogin = false;
        });
        
        $scope.logout = function(){
            userDetails.setUserLogOut()
        }



}]);
