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