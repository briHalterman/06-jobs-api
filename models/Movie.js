// MOVIE MODEL
// create a movie model

// Access Control for Entries
// make sure that a user can’t see or change or delete another user’s records
// purpose of createdBy - limit access to certain entries
// for each CRUD operation, use the ID of the User record for the logged on user
// authentication middleware stores this in req.user when the JWT token is validated
// when creating a Movie entry, store the ID in the createdBy attribute
// when retrieving the Movie entries, or a single Movie entry, or doing an update or delete of a Movie entry, include the ID to filter your Mongoose operation

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
			enum: ['Action', 'Adventure', 'Baliwood', 'Comedy', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Historical Fiction', 'Horror', 'Martial Arts', 'Musical Theatre', 'Mystery', 'Romance', 'Sci-Fi','Sport', 'Suspense', 'Western', 'Other'],
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
	{timestamps: true}
); // automatically get createdAt & updatedAt by default

module.exports = mongoose.model('Movie', MovieSchema);