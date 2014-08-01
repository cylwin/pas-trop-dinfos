'use strict';

angular.module('ngNodeBoilerplateApp')
.controller('AlertbarCtrl', function AlertbarCtrl($scope, $location, ErrorService) {

    $scope.alerts = ErrorService.alerts;

    $scope.closeAlert = function(index) {
        ErrorService.closeAlert(index);
    };

});