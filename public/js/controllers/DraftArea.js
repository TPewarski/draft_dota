app.controller('DraftArea', function($scope, HeroesFactory, HeroesObj){
	$scope.allies = [null, null, null, null, null]
	$scope.opps = [null, null, null, null, null]

	// $scope.updateScores = function(heroName, team){
	// 	HeroesFactory.getHero(heroName).then(function(hero){
	// 		console.log("ajax hero", hero)
	// 	})
	// }

	$scope.setHero = function(idx, team){
		// console.log("team", team)
		// console.log("team[idx]", team[idx])
		team[idx] = HeroesFactory.currentHero
		HeroesFactory.currentHero = null 
		console.log("hero from drafted array", team[idx] )
		HeroesFactory.getHero(team[idx]).then(function(hero){
			console.log("ajax hero data", hero)
			// $scope.updateScores(heroName, team)
		})
		// console.log("heroObj[0].name", HeroesObj[0].name)
	
	}
	$scope.getHeroData
})