'use strict';

angular.module('ptdi')
.controller('MainCtrl', function($scope, NewsService, $routeParams) {
    
    $scope.encodeURIComponent = encodeURIComponent;
    
    if(!$routeParams.page)
        NewsService.resource.get('', function(data){
            $scope.categories = data.categories;

        });
    else{
        NewsService.oldArticles.get({page:$routeParams.page},function(data){
            $scope.categories = data.categories;
            console.log($scope.categories);
        });
    }

    NewsService.pages.get(function(data){
        $scope.nbPages = data.count / 5;
    });

    $scope.url = window.location.origin;
    
    $scope.currentPage = ($routeParams.page) ? $routeParams.page : 0;

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
