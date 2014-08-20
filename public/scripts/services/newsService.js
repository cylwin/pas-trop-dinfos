angular.module('ptdi')
.factory('NewsService', function($resource) {
	var resource = $resource('/infos', null, {
		click: {method: 'GET', url: '/infos'}
	});
	return {
		resource : resource
	  };
});