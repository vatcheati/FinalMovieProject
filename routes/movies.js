var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/movie');
var passport = require('passport');

//main page handler
router.get('/', function(req, res, next) {
Movie.find(function (err, movies) {
    //error log
    if (err) {
        console.log(err);
        res.end(err);
    }
     else {
        //else show data
        res.render('movies/index', {
            title: 'Movies',
            movies: movies
            });
        }
    });
});

// Get for add function
router.get('/add', function(req, res, next) {
res.render('movies/add', {
    title: 'Add a Movie'
    });
});

//Post to make add process the form
router.post('/add', function(req, res, next) {
//Saves new movie with info
Movie.create( {
        movieTitle: req.body.movieTitle,
        movieRating: req.body.movieRating,
        movieGenres: req.body.movieGenres,
        movieAgeRating: req.body.movieAgeRating,
        movieComments: req.body.movieComments
        }
    );
//redirects back to movies page
res.redirect('/movies');
});

//Shows populated form
router.get('/:id', function(req, res, next) {
var id = req.params.id;
//find the movie
Movie.findById(id, function(err, article) {
    if (err) {
        console.log(err);
        res.end(err);
        }
    else {
        res.render('movies/edit', {
            title: 'Movie Edit',
            movies: movies
        });
     }
});
});

// Post for edit to update
router.post('/:id', function(req, res, next) {
var id = req.params.id;
// fill movie info
var movie = new Movie( {
        _id: id,
        movieTitle: req.body.movieTitle,
        movieRating: req.body.movieRating,
        movieGenres: req.body.movieGenres,
        movieAgeRating: req.body.movieAgeRating,
        movieComments: req.body.movieComments
    });

Movie.update( { _id: id }, movie,  function(err) {
    if (err) {
        console.log(err);
        res.end(err);
    }
    else {
        res.redirect('/movies');
    }
});
});

// Get for delete function
router.get('/delete/:id', function(req, res, next) {
    // grab the id parameter from the url
    var id = req.params.id;

    Movie.remove({ _id: id }, function(err) {
    if (err) {
    console.log(err);
    res.end(err);
    }
    else {
    res.redirect('/movies');
    }
});
});

// signIn check
function signedUp(req, res, next) {
//see if user is auth
if (req.isAuthenticated()) {
    return next();
    }
else {
     res.redirect('/signIn/login');
    }
}

//make public
module.exports = router;
