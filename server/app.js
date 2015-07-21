//need to fix either my data harvesting or my schema. data is
//getting put in an array
var lsRoutes = require('express-ls-routes')
var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var prompt = require('prompt')
var mongoose = require('mongoose')
var Hero = require('./models')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var heroNames = require('./models/heroNames')
var _ = require('lodash')
var pf = require("pathfinder-ui")
//use prompt to get a hero

//scrape data for that hero

//middleware
// app.use(function (req, res, next) {
// 	console.log('ping: request made')
// 	next();
// });


app.use('/pathfinder', function(req, res, next){
	pf(app)
	next()
}, pf.router)
// app.use('/pathfinder', pf.router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var publicPath = path.join(__dirname, '../public')
var indexHtmlPath = path.join(__dirname, '../index.html')
app.use(express.static(publicPath))

var inside, outside;
inside = [1,2,3];



app.get('/', function (req, res) {
	// console.log("inner app route stack:", _.flatten(app._router.stack))
	inside = _.flatten(app._router.stack);
    res.sendFile(indexHtmlPath);
	// console.log("YOOsadasdasdklnasjfnodsnfojdsnfojdnsjdinfijdsOOOOO", inside === outside)
});

// console.log("Outside of routes stack:", app._router.stack)

app.get('/hero', function(req, res){
	console.log("req.query", req.query)
	if(req.query)
	Hero.findOne(req.query, function(err, heroes){
		res.send(heroes)
	})
})

app.post
/*
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
*/

// app.get('/', function(req, res, next){
// 	res.sendFile(indexHtmlPath)
// })




/*

app.get('/:hero/team/:team', function(req, res){
	console.log("hit the route")
	//acceptable answers for team will be opps/allies
	var hero = req.params.hero

	var team = req.params.team
	var name = hero.name

	Hero.find({name: hero}, function(err, heroObj){
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
*/


var testRouter = require('express').Router();
//app.use('/', testRouter)//i dont think we'll catch this

testRouter.get('/ZZZZ/:Zid', function(req, res, next){

	res.send(testRouter.stack);
})
app.use("/test", testRouter);

testRouter.get('/', function(req, res, next){

	res.json(testRouter.stack);
})
testRouter.post('/postRoute/:id', function(req, res){
	res.send("posted")
})




app.get("/supertestadvil", function(req, res){
	res.send(app._router.stack);
})


app.listen('65534', function(){
	// console.log("in listen: routes stack:", app._router.stack)
	// console.log("inner app route stack:", app._router.stack.filter(function(s) { return s.name == 'router' })[0].handle.stack)
	// console.log("inner app route stack:", _.flatten(testRouter.stack))
	 //pf(app)
	// console.log("PRE FILTER ROUTES", routes)
	// console.log("routes!!!!!", retrieveRoutes(routes))
})

app.get('/hero/:id', lsRoutes(app), function(req, res){
	res.json(200, req.routes)
})

console.log('Hello from port 65534!')

exports = module.exports = app;

