var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://root:root@ds031832.mlab.com:31832/players', function (err, db){

});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: String,
    sport: String,
    nationality: String,
    gender: String,
    dob: Date,
    location: String,
    team: String,
    association: String,
    interests: String,
    drinksAlcohol: Boolean,
    married: Boolean,
    description: String,
    instagram: String,
    twitter: String
});

var player = mongoose.model('player', playerSchema);

// returns all the players in the db
app.get('/players', function (req, res) {
    player.find({}, function (err, players) {
      if (err) {
          throw err;
      }
        res.send(players);
    });

});

// adds a player to the db
app.post('/addPlayer', function (req, res) {
    var newPlayer = player(req.body);
    newPlayer.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('player saved');
        res.sendStatus(200);
    });
});

// update a player in the db by their id
app.put('players/:id', function (req, res) {
    var id = req.params.id;
    player.findAndModify({query: {_id: mongoose.Types.ObjectId(id)},
        update: {$set: {name: req.body.name,
                        sport: req.body.sport,
                        nationality: req.body.nationality,
                        gender: req.body.gender,
                        dob: req.body.dob,
                        location: req.body.location,
                        team: req.body.team,
                        association: req.body.association,
                        interests: req.body.interests,
                        drinksAlcohol: req.body.drinksAlcohol,
                        married: req.body.married,
                        description: req.body.description,
                        instagram: req.body.instagram,
                        twitter: req.body.twitter
        }},
        new: true}, function (err, doc) {
            res.json(doc);
        });
})

// module.exports = personalInfo;
app.listen(3000);
console.log("server running on port 3000");