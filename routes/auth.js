// AUTHETICATION ROUTE
// set up router

// imports
const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');

// set up routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;