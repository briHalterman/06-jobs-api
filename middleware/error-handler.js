// ERROR HANDLER MIDDLEWARE
// const { CustomAPIError } = require('../errors') // get custom api error
const { StatusCodes } = require('http-status-codes') 
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Try again later.'
  };
  
  // if custom api error, send the response with the status code and send error message
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err === 'ValidationError') {
    // console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field. Please choose another value.`;
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  
  // use status codes library:
  // adds consisteny
  // easier to understand whats happening
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }); 
  return res.status(customError.statusCode).json({ msg: customError.msg });
}
// // we will work on errorHandlerMiddleware to check for multiple mongoose errors instead of always sending back 500 with long error message 

module.exports = errorHandlerMiddleware
