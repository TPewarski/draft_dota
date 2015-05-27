//need to fix either my data harvesting or my schema. data is
//getting put in an array

var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var prompt = require('prompt')
var mongoose = require('mongoose')
var Hero = require('./models')
var app = express()
var path = require('path')
//use prompt to get a hero

//scrape data for that hero

app.use(function (req, res, next) {
	console.log('ping')
	next();
});
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
			//console.log("hit first if in getTotalScore")
			return avgOppsScore * weightFactor + avgAllyScore * (1-weightFactor)
			
		}
		else if(heroScore[heroName]["oppsScore"].length > 0){
			//console.log("returns avg oppsScore")
			return avgOppsScore 
		}
		else{
			//console.log("returns avg ally score")
			return avgAllyScore
		}
}

var indexHtmlPath = path.join(__dirname, '../index.html')

// {name: {allyScore: [num], oppsScore: [num], avail: true/false

app.get('/', function(req, res, next){
	res.sendFile(indexHtmlPath)
})
app.get('/:hero/team/:team', function(req, res){
	console.log("hit the route")
	//acceptable answers for team will be opps/allies
	var hero = req.params.hero

	var team = req.params.team
	var name = hero.name

	Hero.findOne({name: hero}, function(err, heroObj){
		//console.log(heroObj)
		heroScore[name] = {oppsScore: [], allyScore: [], avail: false}
		//console.log(heroScore[name])

		if(team == "opps"){
			console.log("in opps")
			var heroJson = {heroes: []}

			for(var heroName in heroObj.matchUpAnti){
				//console.log("heroName", heroName)
				//console.log("AM's matchupanti", heroObj.matchUpAnti)
				var score = heroObj.matchUpAnti[heroName] * -1
			//console.log(score)
				heroScore[heroName] ? heroScore[heroName]["oppsScore"].push(score) : heroScore[heroName] = {oppsScore: [score], allyScore: [], avail: true}
				//console.log("heroScore of heroNAme", heroScore[heroName])
				if(heroScore[heroName]["avail"]){
					var oppWeightFactor = .6
					var totalScore = getTotalScore(heroName, oppWeightFactor)
					//console.log(totalScore)
					var heroJsonObj = {name: heroName, score: totalScore.toFixed(2)}
					// console.log(heroObj)
					heroJson.heroes.push(heroJsonObj)

				}
			}
		    res.send(heroJson.heroes.sort(function(a, b){
		    	return b.score-a.score
		    }))
		}else{
			console.log("in allies")
			var heroJson = {heroes: []}
			for(var heroName in heroObj.matchUpAnti){

				var score = heroObj.matchUpCoop[heroName]
				//console.log(score)
				heroScore[heroName] ? heroScore[heroName]["allyScore"].push(score) : heroScore[heroName] = {oppsScore: [], allyScore: [score], avail: true}
				if(heroScore[heroName]["avail"]){
						var oppWeightFactor = .65
						var totalScore = getTotalScore(heroName, oppWeightFactor)
						//console.log(totalScore)
						var heroJsonObj = {name: heroName, score: totalScore.toFixed(2)}
						// console.log(heroObj)
						heroJson.heroes.push(heroJsonObj)

					}
			}
			//console.log(heroJson)
			res.send(heroJson.heroes.sort(function(a, b){
		    	return b.score-a.score
		    }))	
		}


	   
	})


})

app.listen('8080')

console.log('Magic happens on port 8080')

exports = module.exports = app;