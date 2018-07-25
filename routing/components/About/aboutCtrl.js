angular.module('citiesApp')
 .controller('aboutCtrl',['$scope',function($scope) {
    $scope.picArray = [
        {name: "Tokyo flag" , picture: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Flag_of_Tokyo_Prefecture.svg"},
        {name: "Tokyo Tower" , picture: "https://cdn2.i-scmp.com/sites/default/files/styles/980x551/public/2017/07/20/tokyo.jpg?itok=en4pS151"},
        {name: "Tokto Panorma" , picture: "https://www.japan-guide.com/thumb/destination_tokyo.jpg"},
    ];    
}]);