// MOVIES ROUTE
const express = require('express');
const router = express.Router();

const { 
    getAllUserMovies, 
    getMovie, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} = require('../controllers/movies');

// syntax option 2 (i like this one)
router.route('/').post(createMovie).get(getAllUserMovies); // domain/api/v1/jobs
router.route('/:id').get(getMovie).delete(deleteMovie).patch(updateMovie); // domain/api/v1/jobs/:id

module.exports = router;