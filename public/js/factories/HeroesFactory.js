//TODO set up route in server and fix my http req url.

app.factory('HeroesFactory', function($http){
    return {
        currentHero: null,

        //this way also work leaving it in for reference
        // getHero: function(heroName){
        //     console.log("heroNAme from get", heroName)
        //     return $http({
        //         'method': "GET", 
        //         'params': heroName,
        //         'url': '/hero'
        //     }).then(function(response){
        //         return response.data
        //     })
        // }
        getHero: function(heroName){
            console.log("heroName", heroName)
            return $http.get('/hero', {params: heroName}).then(function(response){
                return response.data
                })
            }
        }
})