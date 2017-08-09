var myApp = angular.module('myApp', []);
myApp.controller('UserInfoCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.step = 1;

    $scope.nextStep = function() {
        $scope.step++;
    }
    $scope.prevStep = function() {
        $scope.step--;
    }
    
    $scope.savePlayerInfo = function () {
        console.log($scope.player);
        $http.post('/addPlayer', $scope.player);
        $scope.nextStep();
    };

    $scope.resetPlayerForm = function () {
        $scope.step = 1;
        $scope.player = {};
    }

}]);