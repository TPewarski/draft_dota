app.controller('DraftArea', function($scope, HeroesFactory, HeroesObj){
	$scope.allies = [null, null, null, null, null]
	$scope.opps = [null, null, null, null, null]

	$scope.updateScores = function(hero, team){
		var teamName;
		if(team == $scope.allies){
			teamName = "allies"
		}else{
			teamName = 'opps'
		}
			// console.log("hero.matchUpCoop", hero.matchUpCoop)
			for( var key in hero.matchUpCoop){
				var safeName = HeroesFactory.getSafeName(key)
				var scoreObj = {}
				scoreObj[hero.name] = hero.matchUpCoop[key]
				scoreObj.team = teamName
				HeroesObj[safeName].scores.push(scoreObj)
				// console.log("scoreObj", scoreObj)
				// console.log("safeName", safeName)
				// console.log("scores Array", HeroesObj[safeName].scores)
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