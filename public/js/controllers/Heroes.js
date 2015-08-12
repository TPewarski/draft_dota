app.controller('Heroes', function($scope, HeroesFactory, HeroesObj){
	$scope.heroes = HeroesObj
	$scope.heroesArray = [];

	for(key in HeroesObj){
		Object.defineProperty(HeroesObj[key], 'compositeScore', {
			get: function(){
				// console.log("hit the getter")
				var self = this
				// console.log("Scores Array in getter", this.scores)
				return this.scores.reduce(function(prev, curr){
					// console.log("prev", prev, "curr", curr)
					return {score: prev.score + (curr.score * curr.weightFactor)/self.scores.length}
				}, {score: 0})

			}

		})
		HeroesObj[key].name = key;
		$scope.heroesArray.push(HeroesObj[key]);
	}
	//sorts the array alphabetically when first loaded
	//everytime the draft is updated it orders by composite score.
	$scope.compSortFunc = function(a, b){
		// console.log("a, b", a, b)
		if(a.compositeScore.score > b.compositeScore.score){
			return -1
		}
		if(a.compositeScore.score < b.compositeScore.score){
			return 1
		}
		if(a.compositeScore.score == b.compositeScore.score){
			if (a.name > b.name) {
			    return 1;
			  }
			if (a.name < b.name) {
			    return -1;
			}
			  // a must be equal to b
			  return 0;
		}
		return 0;
	}
	$scope.compositeSort = function(){
		console.log("composite sorting")
		$scope.heroesArray.sort($scope.compSortFunc);
	}
	$scope.heroesArray.sort($scope.compSortFunc)
	console.log("heroesArray", $scope.heroesArray)

	//console.log($scope.heroes)


	// $scope.heroes[0].name = "iceFrog"


	// console.log("controller hit")

	// HeroesFactory.getHeroObj().then(function(heroes){
	// 	heroes[0].name = "iceFrog"
	// 	$scope.heroes = heroes
	// 	$scope.loaded = true
	// 	console.log(heroes[0].name)
	// 	//console.log("scope.heroes:", $scope.heroes)
	// 	$scope.heroes[0].name = "iceFrog"
	// })




}) 