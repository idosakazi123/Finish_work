let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule', 'ngMaterial', 'ngMessages']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {
    $locationProvider.hashPrefix('');

    $routeProvider.when('/', {
        templateUrl: 'components/Home/home.html',
        controller : 'homeCtrl'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutCtrl'
        })
        .when('/poi', {
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/login', {
            templateUrl: 'components/Login/login.html',
            controller : 'loginCtrl as loginCtrl'
        })
        .when('/forget', {
            templateUrl: 'components/Forget/forget.html',
            controller : 'forgetCtrl as forgetCtrl'
        })
        .when('/register', {
            templateUrl: 'components/Register/register.html',
            controller : 'registerCtrl as registerCtrl'
        })
        .when('/favPoi', {
            templateUrl: 'components/FavPOI/favPoi.html',
            controller : 'favPoiCtrl as favPoiCtrl'
        })
        .otherwise({ 
            redirectTo: '/' 
        });
}]);












