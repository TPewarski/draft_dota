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
            hero = {}
            hero.name = heroName
            console.log("heroName", hero)
            return $http.get('/hero', {params: hero}).then(function(response){
                return response.data
                })
            },
        getSafeName: function(name){
            var safeName = name.toLowerCase().replace(/ /g, "_") 
            //in case you refactor use .replace(/'/, "") to take care of nature*'s* prophet
            var irregularNames = {
                "clockwerk": "rattletrap",
                "io": "wisp",
                "centaur_warrunner": "centaur",
                "timbersaw": "shredder",
                "anti-mage": "antimage",
                "vengeful_spirit": "vengefulspirit",
                "treant_protector": "treant",
                "windranger": "windrunner",
                "zeus": "zuus",
                "nature's_prophet": "furion",
                "wraith_king": "skeleton_king",
                "lifestealer": "life_stealer",
                "doom": "doom_bringer",
                "magnus": "magnataur",
                "shadow_fiend": "nevermore",
                "necrophos": "necrolyte",
                "queen_of_pain": "queenofpain",
                "outworld_devourer": "obsidian_destroyer"
            }

            if (safeName in irregularNames) safeName = irregularNames[safeName]
            return safeName

        }
    }
})