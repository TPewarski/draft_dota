app.controller('DraftArea', function($scope, HeroesFactory, HeroesObj){
	$scope.allies = [null, null, null, null, null]
	$scope.opps = [null, null, null, null, null]

	$scope.updateScores = function(hero, team){
		if(team == $scope.allies){
			console.log("hero.matchUpCoop", hero.matchUpCoop)
			for( var key in hero.matchUpCoop){
				var safeName = HeroesFactory.getSafeName(key)

				// console.log("safeNAme", safeName)
				// console.log("heroesObj of safename", HeroesObj[safeName])
				// console.log("heroesObj of safename . scores", HeroesObj[safeName].scores)
				HeroesObj[safeName].scores.push(hero.matchUpCoop[key])
				console.log("hero obj.name.socres array", HeroesObj[safeName].scores)
				// console.log("key", key)
				// console.log("heroesOb", HeroesObj)
				// console.log(HeroesObj[key])
			}
		}
	}

	$scope.setHero = function(idx, team){
		// console.log("team", team)
		// console.log("team[idx]", team[idx])
		// console.log("currentHero", HeroesFactory.currentHero)
		team[idx] = HeroesFactory.currentHero
		HeroesFactory.currentHero = null 
		// console.log("hero from drafted array", team[idx] )
		HeroesFactory.getHero(team[idx]).then(function(hero){
			// console.log("ajax hero data", hero)
			$scope.updateScores(hero, team)
		})
		// console.log("heroObj[0].name", HeroesObj[0].name)
	
	}
	$scope.getHeroData
})