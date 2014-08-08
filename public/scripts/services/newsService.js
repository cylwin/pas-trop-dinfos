angular.module('ptdi')
.factory('NewsService', function($resource) {
	var resource = $resource('/infos');
	return {
		resource : resource
	  };
});