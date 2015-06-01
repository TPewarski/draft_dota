var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/draft_dota')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))

var heroSchema = new mongoose.Schema({
	name: String,
	matchUpCoop: {/*heroName: coopScore*/},
	matchUpAnti: {/*heroName: antiScore*/},
	roles: []

})
var Hero = module.exports = mongoose.model('Hero', heroSchema)
 