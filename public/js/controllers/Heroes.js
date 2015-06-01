app.controller('Heroes', function($scope, HeroesFactory){
	$scope.heroes
	console.log("controller hit")	
   HeroesFactory.getHeroObjs().then(function(heroes){
   		$scope.heroes = heroes
   		console.log("scope.heroes:", $scope.heroes)
   })



})