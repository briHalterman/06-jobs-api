// MOVIE MODEL
// create a movie model
// set up mongoose
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
    {
        // provide director, title, release year, studio and genre on frontend
        title: {
            type: String,
            required: [true, 'Please provide title.'],
            maxlength: 100
        },
        director: {
            type: String,
            required: [true, 'Please provide director name. (If unknown, type "unknown".)'],
            maxlength: 50
        },
        releaseYear: {
            type: Number,
            required: [true, 'Please provide release year. (If unknown, type "0000".)']
        },
        studio: {
            type: String,
            maxlength: 50,
            required: [true, 'Please provide studio. (If unknown, type "unknown".)']
        },
        genre: {
            type: String,
            enum: ['Action', 'Adventure', 'Animation (Adult)', 'Animation (Childrens)', 'Animation (Family)', 'Baliwood', 'Biblical', 'Biopic', 'Comedy', 'Crime', 'Cultural Relic', 'Documentary (Biographical)', 'Documentary (Natural)', 'Documentary (Social)', 'Documentary (Other)', 'Drama', 'Educational', 'Family', 'Fantasy', 'Film Noir', 'Historical Fiction', 'Horror', 'Martial Arts', 'Musical Theatre', 'Mystery', 'Performance', 'Religious Values', 'Rock Opera', 'Romance', 'RomCom', 'Sci-Fi', 'Silent Film', 'Sport', 'Superhero', 'Suspense', 'Thriller', 'War', 'Western', 'Other'],
            required: [true, 'Please select genre.']
        },
        // subGenre: {},
        favorite: {
            type: Boolean,
            default: false
        },
        userRating: {
            type: Number,
            default: 4.5
        },
        // review: {},

        // most important property - ties movie to actual user
        // every time a movie is created it is assigned to a user
        createdBy: {
            type: mongoose.Types.ObjectId,
            // tie the movie to the user
            ref: 'User',
            required: [true, 'Please provide user.']
        }
    }, 
    {timestamps: true}); // automatically get createdAt & updatedAt by default

module.exports = mongoose.model('Movie', MovieSchema);