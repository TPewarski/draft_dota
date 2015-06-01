app.directive('heroIcon', function(){
	return {
		restrict: 'E',
		scope: { 
			hero: '='
		},
		templateUrl: 'js/directives/heroIcon.html',
		link: function(scope, el, attr){

		}

	}
})