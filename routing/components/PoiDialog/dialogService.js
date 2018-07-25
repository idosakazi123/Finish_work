angular.module("citiesApp")
    .service('poiDialog', ['$mdDialog', function($mdDialog) {
        var self = this;

        self.open = function (poi) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'components/PoiDialog/dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                multiple: true,
              
                resolve: {
                    poiData: function () {
                        return poi;
                    },
                }
            })
        }

        function DialogController($scope, $mdDialog, poiData) {
            window.self = this;
            window.sc = $scope;
            $scope.poi = poiData;
      
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }
    }]
);