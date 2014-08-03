angular.module('ptdi')
.factory('ErrorService', function($timeout) {
	var alerts = [];
	var types = ["success","info","warning","danger"];

	return {
		alerts: alerts,
		addAlert : function(msg, type){
			var alert = {};
			alert.type = types.indexOf(type) === -1 ? "info" : type;
			alert.msg = msg;
			alert.dimissTimeout = $timeout(function(){
				alerts.splice(alerts.indexOf(alert), 1);
			}, 4000, true);

			alerts.push(alert);
		},
		closeAlert : function(alert) {
			$timeout.cancel(alert.dimissTimeout);
			alerts.splice(alerts.indexOf(alert), 1);
		}
	};
});