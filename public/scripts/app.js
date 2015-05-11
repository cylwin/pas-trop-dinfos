'use strict';

/**
 * This is the main module of the web application.
 */
angular.module('ptdi', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .when('/infos/:id',{
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
    })
    .when('/:page',{
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
