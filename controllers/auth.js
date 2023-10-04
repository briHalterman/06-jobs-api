//  AUTHENTICATION CONTROLLER
// import model
const User = require('../models/User');
// get status codes
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    // res.send('register user');
    // res.json(req.body);
    const user = await User.create({...req.body});
    // res.status(StatusCodes.CREATED).json(req.body);
    res.status(StatusCodes.CREATED).json({ user });
    // very bad parctice to save passwords as strings as they come in, we will fix that soon
};
const login = async (req, res) => {
    res.send('login user');
};

module.exports = {
    register,
    login
};