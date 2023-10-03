// MOVIES ROUTE
const express = require('express');
const router = express.Router();

const { 
    getAllUserMovies, 
    getMovie, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} = require('../controllers/jobs');

// syntax option 2 (i like this one)
router.route('/').post(createMovie).get(getAllUserMovies);
router.route('/:id').get(getMovie).delete(deleteMovie).patch(updateMovie);

module.exports = router;