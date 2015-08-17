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
			
		for( var key in hero[matchUp]){
			var safeName = HeroesFactory.getSafeName(key)
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
		team[idx] = HeroesFactory.currentHero
		HeroesFactory.currentHero = null 
		HeroesFactory.getHero(team[idx]).then(function(hero){
			$scope.updateScores(hero, team)
		}).then($scope.compositeSort)
	}
	$scope.getHeroData
})