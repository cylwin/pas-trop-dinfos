'use strict';

angular.module('ptdi')
.controller('AlertbarCtrl', function AlertbarCtrl($scope, $location, ErrorService) {

    $scope.alerts = ErrorService.alerts;

    $scope.closeAlert = function(index) {
        ErrorService.closeAlert(index);
    };

});