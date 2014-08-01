angular.module('ngNodeBoilerplateApp')
.directive('alertbar', function () {
    return {
        restrict:'EA',
        templateUrl:'scripts/directives/template/alertBar.html',
        transclude:true,
        replace:true
    };
});
