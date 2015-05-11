angular.module('ptdi')
.factory('NewsService', function($resource,$http) {
	var resource = $resource('/infos', null, {
		click: {method: 'GET', url: '/infos/click'}
	});

	var oldArticles = $resource('/page/:page');
	var pages = $resource('/page/count');
	var article = function(id){
		return $http.get('/infos/'+id);
	}

	return {
		resource : resource,
		article : article,
		oldArticles : oldArticles,
		pages : pages
	  };
});