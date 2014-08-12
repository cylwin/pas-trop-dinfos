'use strict';

angular.module('ptdi')
.controller('MainCtrl', function($scope, NewsService) {
    NewsService.resource.get('', function(data){
        $scope.categories = data.categories;
    });

    $scope.getCategorieClass = function(catId) {
        var catClass = {};
        catClass[0] = "panel-success";
        catClass[1] = "panel-primary";
        catClass[2] = "panel-info";
        catClass[3] = "panel-warning";
        catClass[4] = "panel-danger";

        return catClass[catId];
    }
});
