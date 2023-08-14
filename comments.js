// Create web server
var express = require('express');
var router = express.Router();

// Connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/final');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Create a schema for comments
var commentSchema = mongoose.Schema({
    Name: String,
    Comment: String
});

// Create a model for comments
var Comment = mongoose.model('Comment', commentSchema);

// GET comments from database
router.get('/', function(req, res, next) {
    console.log("In the GET route?");
    Comment.find(function(err,commentList) {
        if (err) return console.error(err);
        else {
            console.log(commentList);
            res.json(commentList);
        }
    })
});

// POST comments to database
router.post('/', function(req, res, next) {
    console.log("POST comment route");
    console.log(req.body);
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        else {
            console.log(post);
            res.sendStatus(200);
        }
    });
});

// DELETE comments from database
router.delete('/:id', function(req, res, next) {
    console.log("In the DELETE route?");
    var id = req.params.id;
    Comment.findByIdAndRemove(id, function(err, commentList) {
        if (err) return console.error(err);
        else {
            console.log(commentList);
            res.sendStatus(200);
        }
    });
});

// Make public
module.exports = router;