app.controller('DraftArea', function($scope, HeroesFactory, HeroesObj){
	$scope.allies = [null, null, null, null, null]
	$scope.opps = [null, null, null, null, null]

	$scope.updateScores = function(hero, team){
		var sign;
		var matchUp;
		if(team == $scope.allies){
			matchUp = 'matchUpCoop'
			sign = 1
		}else{
			matchUp = 'matchUpAnti'
			sign = -1
		}
			// console.log("hero.matchUpCoop", hero.matchUpCoop)
		for( var key in hero[matchUp]){
			// console.log("key in heroMatchUp:", key)
			var safeName = HeroesFactory.getSafeName(key)
			// console.log("safeName", safeName)
			var scoreObj = {}
			//this should be hero.name but keeping it safeName for debugging
			scoreObj.name = safeName
			scoreObj.score = hero[matchUp][key] * sign
			scoreObj.weightFactor = 1
			scoreObj.team = sign

			// console.log("scoreObj", scoreObj)
			HeroesObj[safeName].scores.push(scoreObj)
			// console.log("scores Array", HeroesObj[safeName].scores)
			// console.log("Composite Score", HeroesObj[safeName].compositeScore)
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