app.controller('Heroes', function($scope, HeroesFactory, HeroesObj){
	$scope.heroes = HeroesObj
	//console.log($scope.heroes)


	// $scope.heroes[0].name = "iceFrog"


	console.log("controller hit")

	// HeroesFactory.getHeroObj().then(function(heroes){
	// 	heroes[0].name = "iceFrog"
	// 	$scope.heroes = heroes
	// 	$scope.loaded = true
	// 	console.log(heroes[0].name)
	// 	//console.log("scope.heroes:", $scope.heroes)
	// 	$scope.heroes[0].name = "iceFrog"
	// })




}) 