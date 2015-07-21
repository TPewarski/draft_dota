app.directive('heroIcon', function(HeroesFactory, HeroesObj){
	return {
		restrict: 'E',
		scope: { 
			hero: '='
		},
		transclude: true,
		templateUrl: 'js/directives/heroIcon.html',
		link: function(scope, el, attr){
			// console.log(scope)
			scope.setCurrentHero = function(name){
				HeroesFactory.currentHero = name
				//console.log(HeroesFactory.currentHero)
				// console.log("HeroObj!!!!!", HeroesFactory.heroObjs)
			}
		}

	}
})	