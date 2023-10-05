//  AUTHENTICATION CONTROLLER
// import model
const User = require('../models/User');
// get status codes
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

// use JSON web tokens (JWTs) for authenticating user
// store user records in MongoDB, need User model
// store user name, email, and hashed password in database
// never store passwords in plain text, instead cryptographically hash them so that even if the database is compromised, the passwords are not
// cryptography for password comes from bcryptjs npm package 
// hashing is performed in a middleware routine that is added to the User model, which is a pre routine for the save operation
// add instance methods to User model for generating JWT and validating user password
// use function keyword (not the arrow function syntax) so that the function is associated with “this” which is a user instance
// set timestamps on entries
// use authentication middleware to protect routes

const register = async (req, res) => {
    // res.send('register user');
    // res.json(req.body);

    // const { name, email, password } = req.body;

    // if (!name || !email || !password) {
    //     throw new BadRequestError("Please provide name, email and password")
    // }

    // // NEVER EVER store user passwords as strings!
    // // set up hashed password with bcryptjs
    // // generate salt (random bytes) by running genSalt
    // const salt = await bcrypt.genSalt(10);  // pass in number of rounds
    // const hashedPassword = await bcrypt.hash(password, salt); // pass hash method
    // const tempUser = { name, email, password: hashedPassword };
    // // ALWAYS ALWAYS HASH YOUR PASSWORDS
    // // NEVER EVER EVER STORE THEM AS STRINGS
    
    const user = await User.create({
        ...req.body // not a good prectice to send back password
        // ...tempUser
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