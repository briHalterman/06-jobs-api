// MOVIES CONTROLLER
// get all jobs, get job, create job, update job, delete job --- CRUD functionality
const getAllUserMovies = async (req, res) => {
    res.send("get all user's movies");
};
const getMovie = async (req, res) => {
    res.send('get individual movie');
};
const createMovie = async (req, res) => {
    res.send('create movie entry');
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