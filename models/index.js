var mongoose = require('mongoose')
//TODO NOM INSTALL mongooSE

mongoose.connect('mongodb://localhost/draft_dota2')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))

var heroSchema = new mongoose.Schema({
	name: String,
	matchUpCoop: {/*heroName: coopScore*/},
	matchUpAnti: {/*heroName: antiScore*/},
	roles: []

})
var Hero = module.exports = mongoose.model('Hero', heroSchema)
 