angular.module('citiesApp')
 .controller('registerCtrl', ['$http','serverService', function ($http,serverService) {
    let self = this;
    self.countries = {};
    self.categories = {};

    $http.get(serverService.serverUrl + "users/countries").then(
        function(response){
            var countriesArray = response.data.Countries.Country
            var i;
            for (i = 0; i < countriesArray.length; i++) {
                self.countries[i] = countriesArray[i].Name;
            }
        },function (response) {
            //Second function handles error
            console.log("not good at countries")
        }
    );

    $http.get(serverService.serverUrl + "users/categories").then(
        function(response){
            var categoriesObject = response.data
            var i;
            for (i = 0; i < categoriesObject.length; i++) {
                self.categories[i] = categoriesObject[i].category;
            }
        },function (response) {
            //Second function handles error
            console.log("not good at categories")
        }
    );


    self.signUp = function () {
        // register user
        if(checkUserDetailes(self.user)){
            $http.post(serverService.serverUrl + "users/register",self.user).then(
                function (response){
                    alert("hello " + self.user.username + ", you have been registred")
                },function (response) {
                    //Second function handles error
                    console.log("not good")
                }
            );
            location.replace("#/login");
        }
    }
    
    checkUserDetailes = function(user){
        var regex;
        //check username 
        regex = /^[a-zA-Z]+$/;
        if(!regex.test(user.username)){
            alert("user name must have only letters")
            return false;
        }

        //check password
        regex = /^[a-z0-9]+$/i;
        if(!regex.test(user.password)){
            alert("password must have only letters or numbers")
            return false;
        }

        //check email
        regex = /\S+@\S+\.\S+/;
        if(!regex.test(user.email)){
            alert("email must be in a correct order username@mailSuplier.Region")
            return false;
        }       

        return true;
    }
}]);

