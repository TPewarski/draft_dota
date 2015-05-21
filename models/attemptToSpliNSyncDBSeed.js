//TODO ADAPT MY TESTAPP TO POPULATE DB INSTEAD
//FIGURE OUT THE DETAILS OF SEEDING MONGOOSE SO I CAN SEED DBS ON MY OWN.
// seemed like making too many requests was causing problems
//this page was an attempt to scrape dotamax in 2+ synchronous calls
//not in use
var request = require('request')
var cheerio = require('cheerio')
var Hero = require('./')
var mongoose = require('mongoose');
var async = require('async')
var heroNames = require('./heroNames')
// mongoose.connect('mongodb://localhost/draft_dota')
db = mongoose.connection;
db.on('open', function() {
	console.log('hello')
})

var hero = []
var counter = 0
//heroObj = {name:"", matchUpCoop: [{name: "", score: ''}], matchUpAnti: [{name: '', score: ''}], role: ""}
var scrapeHeroData = function(name, team, callBack){
	var match_up;
	var hero_name = name
	var dbCalls = "/?skill=vh&ladder=y&time=v684"
	var opps = 'match_up_anti/'
	var allies = 'match_up_comb/'
	team == 'opps' ? match_up = opps : match_up = allies
	var url = 'http://dotamax.com/hero/detail/' + match_up + hero_name + dbCalls
	var scoresArray = []

	// The callback function takes 3 parameters, an error, response status code and the html
	// the req parameters are getting the english version of the site at the url
	request({ method: "GET", url: url, headers: { 'Accept-Language': 'en-US,en;q=0.8' } }, function( error, response, html){
		console.log(++counter)
		console.log('response to scraper request', response.statusCode, Date.now());
		if(!error){
			//utilize the cheerio library on the returned html which will essentially give us jjquery functionality
			var $ = cheerio.load(html)
			
			$('span.hero-name-list').each(function(){
				var data = $(this)
				var name = data.text()
				var score = parseFloat(data.parent().next().children().first().text())
				var scoreObj = {}

				//console.log(name, score)
				//console.log(name, heroScore[name])

                scoreObj.name = name
                scoreObj.score = score
                scoresArray.push(scoreObj)

			})
			// console.log(scoresArray)
			callBack(null, scoresArray)

		}
	})
}
var createHeroObj = function(heroNameRoles, callBack){
	var heroObj = {}
	heroObj.name = heroNameRoles.name
	heroObj.roles = heroNameRoles.roles

	async.parallel({
		//heroObj.matchUpCoop = 
		matchUpCoop: function(done){
			console.log("calling scraper")
			scrapeHeroData(heroNameRoles.name, 'allies', function(err, resultsArr){
				//console.log("hit scraper callback")
				done(err, resultsArr)

			})
		},
		//heroObj.matchUpAnti = 
		matchUpAnti: function(done){
			scrapeHeroData(heroNameRoles.name, 'opps', function(err, resultsArr){
				//console.log("hit scraper callback")
				done(err, resultsArr)
			})
		}}, function(err, resultsHash){
		  heroObj.matchUpAnti = resultsHash.matchUpAnti
		  heroObj.matchUpCoop = resultsHash.matchUpCoop
		  callBack(err, heroObj)
		  //console.log("hit async.parallel callback")

		}
	)
	
}
mongoose.connection.db.dropDatabase(function(){
    console.log("Dropped old data, now inserting data");

	async.each(heroNames.slice(0, 50), function(heroName, done){
		createHeroObj(heroName, function(err, resultObj){
			hero.push(resultObj)
			done()
			
		})

	}, function(err){

        async.each(hero,
        function(data, done) {
            Hero.create(data, done);
        }, function(err){
        	if(err){
        		console.log(err)
        	}else{
        		console.log("finished inserting")
        		async.each(heroNames.slice(50, -1), function(heroName, done){
					createHeroObj(heroName, function(err, resultObj){
						hero.push(resultObj)
						done()
						
					})

				}, function(err){

			        async.each(hero,
			        function(data, done) {
			            Hero.create(data, done);
			        }, function(err){
			        	if(err){
			        		console.log(err)
			        	}else{
			        		console.log("finished inserting")
			        		process.kill(0)
			        	}
			        		
			    	})

			    })
			  
        	}
        		
    	})

    })
})




