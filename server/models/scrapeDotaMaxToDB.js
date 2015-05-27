//what if i update the db after a req gets processed
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
	console.log(url)
	var scoresObj = {}

	// The callback function takes 3 parameters, an error, response status code and the html
	// the req parameters are getting the english version of the site at the url
	request({ method: "GET", url: url, headers: { 'Accept-Language': 'en-US,en;q=0.8' } }, function( error, response, html){
		console.log(++counter)
		if(!error){
			console.log('response to scraper request', response.statusCode, Date.now());
			//utilize the cheerio library on the returned html which will essentially give us jjquery functionality
			var $ = cheerio.load(html)
			
			$('span.hero-name-list').each(function(){
				var data = $(this)
				var name = data.text()
				var score = parseFloat(data.parent().next().children().first().text())
				//console.log(score)

				//console.log(name, score)
				//console.log(name, heroScore[name])

                scoresObj[name] = score
                // scoreObj.score = score
                // scoresArray.push(scoreObj)

			})
			// console.log(scoresArray)
			console.log("finished parsing html for this req")
			callBack(null, scoresObj)

		}else{
			console.log(error)

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
			//console.log("inside coop of parallel")
			scrapeHeroData(heroNameRoles.name, 'allies', function(err, resultsObj){
				//console.log("hit scraper callback")
				done(err, resultsObj)

			})
		},
		//heroObj.matchUpAnti = 
		matchUpAnti: function(done){
			scrapeHeroData(heroNameRoles.name, 'opps', function(err, resultsObj){
				//console.log("hit scraper callback")
				done(err, resultsObj)
			})
		}}, function(err, resultsHash){
		  heroObj.matchUpAnti = resultsHash.matchUpAnti
		  heroObj.matchUpCoop = resultsHash.matchUpCoop
		  callBack(err, heroObj)
		  //console.log("hit async.parallel callback")

		}
	)
	
}

async.each(heroNames.slice(0), function(heroName, done){
	createHeroObj(heroName, function(err, resultObj){
		hero.push(resultObj)
		done()
		
	})

}, function(err){

	    mongoose.connection.db.dropDatabase(function(){
	        console.log("Dropped old data, now inserting data");
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
})




