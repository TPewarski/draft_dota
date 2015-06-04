app.directive('heroIcon', function(HeroesFactory){
	return {
		restrict: 'E',
		scope: { 
			hero: '='
		},
		templateUrl: 'js/directives/heroIcon.html',
		link: function(scope, el, attr){
			scope.setCurrentHero = function(name){
				HeroesFactory.currentHero = {name: name}
				//console.log(HeroesFactory.currentHero)
				// console.log("HeroObj!!!!!", HeroesFactory.heroObjs)
			}
		}

	}
})	