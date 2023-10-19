// AUTHENTICATION MIDDLEWARE
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // verify token
const { UnauthenticatedError } = require('../errors') // with index.js, we don't need to specify beyond errors directory

// middleware
const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	// check for authorization header and if header starts with 'Bearer '
	// space after Bearer is optional (once we are done with if statement, we are still getting the token and then we split the token anyway)
	if (!authHeader || !authHeader.startsWith('Bearer')) { 
		throw new UnauthenticatedError('Authentication Invalid');
	}
	const token = authHeader.split(' ')[1]; // turn into array and look for second item in array

	try {
	const payload = jwt.verify(token, process.env.JWT_SECRET) // try to get payload
	// attach the user to the movie routes

	req.user = { userId: payload.userId, name: payload.name }; // userId and name from what comes back from verify

	// Alternately:
	// const user = User.findById(payload.id).select('-password');
	// req.user = user;
	// // no functionality to remove user anyway

	// invoke next() - to get to movie routes
	next();

	} catch (error) {
		throw new UnauthenticatedError('Authentication Invalid')
	};
};

// export auth
module.exports = auth;
