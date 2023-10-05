//  AUTHENTICATION CONTROLLER
// import model
const User = require('../models/User');
// get status codes
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    // res.send('register user');
    // res.json(req.body);

    const { name, email, password } = req.body;

    // if (!name || !email || !password) {
    //     throw new BadRequestError("Please provide name, email and password")
    // }

    // NEVER EVER store user passwords as strings!
    // set up hashed password with bcryptjs
    // generate salt (random bytes) by running genSalt
    const salt = await bcrypt.genSalt(10);  // pass in number of rounds
    const hashedPassword = await bcrypt.hash(password, salt); // pass hash method
    const tempUser = { name, email, password: hashedPassword };
    // ALWAYS ALWAYS HASH YOUR PASSWORDS
    // NEVER EVER EVER STORE THEM AS STRINGS
    
    const user = await User.create({
        // ...req.body
        ...tempUser
    });
    // // very bad parctice to save passwords as strings as they come in, we will fix that soon

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