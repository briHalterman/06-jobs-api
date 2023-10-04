//  AUTHENTICATION CONTROLLER
// import model
const User = require('../models/User');
// get status codes
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
    // res.send('register user');
    // res.json(req.body);

    // const { name, email, password } = req.body;
    // if (!name || !email || !password) {
    //     throw new BadRequestError("Please provide name, email and password")
    // }

    const user = await User.create({...req.body});
    // very bad parctice to save passwords as strings as they come in, we will fix that soon

    // res.status(StatusCodes.CREATED).json(req.body);
    res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
    res.send('login user');
};

module.exports = {
    register,
    login
};