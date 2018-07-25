angular.module('citiesApp')
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('checkTokenService',['$http','localStorageModel', function ($http,localStorageModel) {
        let self = this;
        let serverUrl = 'http://localhost:3000/'

        self.checkToken = function(username){
            return new Promise(function (resolve, reject){
                var token = localStorageModel.getLocalStorage(username);
                var tokenvalid = Object.values(token)[0] 
                var jason = JSON.parse('{"token":"'+tokenvalid+'"}') 

                if (jason){
                    //not got http request
                    $http.post(serverUrl + 'users/token',jason).then(                      
                        function (response){
                            //resolve.send(true);
                            return true;
                        },
                        function (error){
                            resolve.send(false);
                            return false;
                        }
                    )
                }
            }) 
        }
    }])

    .service('userDetails',['$rootScope','localStorageModel', function ($rootScope,localStorageModel) {
        let self = this
        self.userName = "guest"
        self.islogin = false

        self.setUserName = function(username){
            self.userName = username
            self.islogin = true
            $rootScope.$broadcast('userLogin', { userName: username })
        }

        self.setUserLogOut = function(){
            self.userName = "guest"
            self.islogin = false
            $rootScope.$broadcast('userLogout', { userName: self.userName })
        }
        
        self.getUserName = function(){
            return self.userName;
        }

        self.getUserToken = function(username){
            return localStorageModel.getLocalStorage(username);
        }
        
    }])

    .service('serverService',[function(){
        let self = this;
        self.serverUrl = 'http://localhost:3000/'
    }])



