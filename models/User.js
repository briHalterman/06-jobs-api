// USER MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    // name, email & password
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minLength: 3, // minlength
        maxLength: 50 // maxlength
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        // use regular expression to check for valid email
        match: [
            // Email Validation Regex
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ],
        unique: true // to avoid duplicate emails
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: 6,
        // maxLength: 12 
            // // we will remove maxlength later, once we hash our password
            // hashed password is longer than 12 characters
    }
});

// Middleware (pre and post hooks) functions - passed control during execution of async functions
// pre save - before we save the document
UserSchema.pre('save', async function(next) {
    // generate salt and get password
    const salt = await bcrypt.genSalt(10);
    // use "this" function keyword value - scoped to document
    this.password = await bcrypt.hash(this.password, salt);
    // pass on to next middleware
    next();
}); 

module.exports = mongoose.model('User', UserSchema);