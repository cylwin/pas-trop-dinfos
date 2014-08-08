'use strict';

angular.module('ptdi')
.controller('MainCtrl', function($scope, NewsService) {
    NewsService.resource.get('', function(data){
        $scope.categories = data.categories;
    });

    $scope.getCategorieClass = function(catId) {
        var catClass = {};
        catClass["fdsqfqs123"] = "panel-primary";
        catClass["fsefqd3323sd"] = "panel-success";
        catClass["fs123fqd33"] = "panel-info";
        catClass["fdfqd33fq3"] = "panel-warning";
        catClass["fdkbgofs68f"] = "panel-danger";

        return catClass[catId];
    }
});
