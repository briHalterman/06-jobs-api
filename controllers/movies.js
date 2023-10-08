// MOVIES CONTROLLER
// only deal with resources as they are associated with a user
// get all moviess, get indiv movie, create movie, update movie, delete movie --- CRUD functionality

// create imports: status codes, movie model, requests (bad request error and not found error)
const Movie = require('../models/Movie');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllUserMovies = async (req, res) => {
    // res.send("get all user's movies");
    const movies = await Movie.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ movies, count: movies.length });
};
const getMovie = async (req, res) => {
    res.send('get individual movie');
};
const createMovie = async (req, res) => {
    // res.send('create movie entry');
    req.body.createdBy = req.user.userId;
    const movie = await Movie.create(req.body);
    // res.json(req.body); // test out auth middleware
    res.status(StatusCodes.CREATED).json({ movie });
};
const updateMovie = async (req, res) => {
    res.send('update movie entry');
};
const deleteMovie = async (req, res) => {
    res.send('delete movie entry');
};

module.exports = {
    getAllUserMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};