//link mongoose
var mongoose = require('mongoose');

//Movie schema
var movieSchema = new mongoose.Schema({
created: {
       type: Date,
       default: Date.now
   },
movieTitle: {
        type: String,
        default: '',
        trim: true,
        required: 'Please insert info'
    },
movieRating: {
        type: String,
        default: '',
        trim: true,
        required: 'Please insert info'
    },
movieGenres: {
        type: String,
        default: '',
        trim: true,
        required: 'Please insert info'
    },
movieAgeRating: {
        type: String,
        default: '',
        trim: true,
        required: 'Please insert info'
    },
    movieComments: {
        type: String,
        default: '',
        trim: true,
        required: 'Please insert info'
    },

});

//make public
module.exports = mongoose.model('Movie', movieSchema);
