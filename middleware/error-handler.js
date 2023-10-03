// ERROR HANDLER MIDDLEWARE
const { CustomAPIError } = require('../errors') // get custom api error
const { StatusCodes } = require('http-status-codes') 
const errorHandlerMiddleware = (err, req, res, next) => {
  // if custom api error, send the response with the status code and send error message
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  // use status codes library:
  // adds consisteny
  // easier to understand whats happening
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }) 
}
// we will work on errorHandlerMiddleware to check for multiple mongoose errors instead of always sending back 500 with long error message 

module.exports = errorHandlerMiddleware
