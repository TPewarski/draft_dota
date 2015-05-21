var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var prompt = require('prompt')
var app = express()

//use prompt to get a hero

//scrape data for that hero
var heroScore = {}

var avg = function(arr){
	if(!arr.length) return 0
	var sum = 0
	var num = 0
	arr.forEach(function(score){
		sum += score
		num += 1

    })
    return sum / num
}

var getTotalScore = function(heroName, weightFactor){
		var avgOppsScore, avgAllyScore, totalScore; 
		var weightFactor = weightFactor;
		avgOppsScore = avg(heroScore[heroName]["oppsScore"])
		//console.log(heroName, heroScore[heroName]["oppsScore"].length )
		//console.log("avg opps score:", avgOppsScore)
		avgAllyScore = avg(heroScore[heroName]["allyScore"])
		if(heroScore[heroName]["oppsScore"].length > 0 && heroScore[heroName]["allyScore"].length > 0){
			console.log("hit first if in getTotalScore")
			return avgOppsScore * weightFactor + avgAllyScore * (1-weightFactor)
			
		}
		else if(heroScore[heroName]["oppsScore"].length > 0){
			console.log("returns avg oppsScore")
			return avgOppsScore 
		}
		else{
			console.log("returns avg ally score")
			return avgAllyScore
		}
}


// {name: {allyScore: [num], oppsScore: [num], avail: true/false}}

app.get('/scrape/:hero/team/:team', function(req, res){
	console.log("hit the route")
	//acceptable answers for team will be opps/allies
	var hero = req.params.hero
	var team;

	var dbCalls = "/?skill=vh&ladder=y&time=v684"
	var opps = 'match_up_anti/'
	var allies = 'match_up_comb/'

	req.params.team == 'opps' ? team = opps : team = allies
	var url = 'http://dotamax.com/hero/detail/' + team + hero + dbCalls
	console.log(url)
	//have to tell the scrape if the score is an allies score or an enemy score

	//make a request to the url
	// The callback function takes 3 parameters, an error, response status code and the html
	// the req parameters are getting the english version of the site at the url

	request({ method: "GET", url: url, headers: { 'Accept-Language': 'en-US,en;q=0.8' } }, function( error, response, html){
		console.log("hit the callback")

		if(!error){
			//utilize the cheerio library on the returned html which will essentially give us jjquery functionality

			var $ = cheerio.load(html)
			var heroJson = {heroes: []}
			

			$('span.hero-name-list').each(function(){
				var data = $(this)
				var name = data.text()
				var score = parseFloat(data.parent().next().children().first().text())

				//console.log(name, score)
				if(req.params.team == "opps"){
					score=score*-1
					//console.log(score)
					heroScore[name] ? heroScore[name]["oppsScore"].push(score) : heroScore[name] = {oppsScore: [score], allyScore: [], avail: true}
				}else{
					heroScore[name] ? heroScore[name]["allyScore"].push(score) : heroScore[name] = {oppsScore: [], allyScore: [score], avail: true}
				}
				//console.log(name, heroScore[name])

                var oppWeightFactor = .7
				var totalScore = getTotalScore(name, oppWeightFactor)
				//console.log(totalScore)
				var heroObj = {name: name, score: totalScore.toFixed(2)}
				// console.log(heroObj)
				heroJson.heroes.push(heroObj)

				
				

				

			})
				//console.log(heroScore)
				//console.log(heroJson)

			    res.send(heroJson.heroes.sort(function(a, b){
			    	return b.score-a.score
			    }))


			

		}else{
			res.send(error)
		}
	// console.log(heroScore)
	})

})

app.listen('8080')

console.log('Magic happens on port 8080')

exports = module.exports = app;