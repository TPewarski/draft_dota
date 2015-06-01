//TODO set up route in server and fix my http req url.

app.factory('HeroesFactory', function($http){
    return {
    	getHeroObjs: function(){
    		return $http({
                'method': "GET", 
                //'params': queryParams,
                'url': '/heroObjs'
            }).then(function(response){
                return response.data
            })
    	},
        getHeroes: function(category){
            return $http({
                'method': "GET", 
                //'params': queryParams,
                'url': '/heroes'
            }).then(function(response){
                return response.data
            })
        }
    }
})