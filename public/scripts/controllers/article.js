'use strict';

angular.module('ptdi')
.controller('ArticleCtrl', function($scope, NewsService, $routeParams) {

    //console.log($scope.categories);
    NewsService.article($routeParams.id).success(function  (data, status, headers, config) {
        $scope.article = data;
    }).error(function(data, status, headers, config){
        $scope.article = undefined;
    });

    $scope.url = window.location.origin;

    $scope.getCategorieClass = function(catId) {
        var catClass = {};
        catClass[0] = "panel-success";
        catClass[1] = "panel-primary";
        catClass[2] = "panel-info";
        catClass[3] = "panel-warning";
        catClass[4] = "panel-danger";

        return catClass[catId];
    }

    $scope.openLink = function(_id){
        NewsService.resource.click({_id: _id});
    }
});
