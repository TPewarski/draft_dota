var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var prompt = require('prompt')
var app = express()

//use prompt to get a hero

//scrape data for that hero

var avg = function(arr){
	var sum = 0
	var num = 0
	arr.forEach(function(score){
		sum += parseInt(score)
		num += 1

    })
    return sum / num
}
var heroScore = {}

app.get('/scrape/:hero/team/:team', function(req, res){
	//acceptable answers for team will be opps/allies
	var hero = req.params.hero
	var team;
	var dbCalls = "/?skill=vh&ladder=y&time=v684"

	var opps = 'match_up_anti/'
	var allies = 'match_up_comb/'
	req.params.team == 'opps' ? team = opps : team = allies

	var url = 'http://dotamax.com/hero/detail/' + team + hero + dbCalls
	//have to tell the scrape if the score is an allies score or an enemy score

	//make a request to the url
	// The callback function takes 3 parameters, an error, response status code and the html
	// the req parameters are getting the english version of the site at the url

	request({ method: "GET", url: url, headers: { 'Accept-Language': 'en-US,en;q=0.8' } }, function( error, response, html){
		if(!error){
			//utilize the cheerio library on the returned html which will essentially give us jjquery functionality
			var $ = cheerio.load(html)
			var heroJson = {heroes: []}
			

			$('span.hero-name-list').each(function(){
				var data = $(this)
				var name = data.text()
				var score = data.parent().next().children().first().text()

				//console.log(name, score)

				heroScore[name] ? heroScore[name].push(score) : heroScore[name] = [score]
				//console.log(name, heroScore[name])

				

				var avgScore = avg(heroScore[name])

				console.log(name)
				var heroObj = {name: name, score: avgScore}
				console.log(heroObj)
				heroJson.heroes.push(heroObj)

				
				

				

			})
				//console.log(heroJson)

			    res.send(heroJson.heroes.sort(function(a, b){
			    	return b.score-a.score
			    }))


			

		}
	// console.log(heroScore)
	})

})

app.listen('8081')

console.log('Magic happens on port 8081')

exports = module.exports = app;