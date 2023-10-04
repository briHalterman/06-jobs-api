// CONNECT TO THE DATABASE
const mongoose = require('mongoose'); // use mongoose

const connectDB = (url) => {
  // set up connect and pass in the url
  return mongoose.connect(url, {
    // options to remove depreciation warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;

