require('dotenv').config();
require('express-async-errors');

// SECURITY

// When you deploy to the Internet, you need to be confident that your application is secure. In your case, the risk is very small, because you aren’t storing or retrieving sensitive information. This is fortunate, because security is hard — very hard. The packages the instructor specifies are good starting points.

// security configuration uses the following node packages:

// helmet:    
// most popular
// prevents numerous attacks
// sets headers on your HTML pages to limit what script the pages will load
// provides additional protection against cross site scripting
// quite tricky to configure for a front end (particularly if the front end uses resources to style the application such as Bootstrap)

// cors:
// not really about security   
// Cross Origin Resource Sharing
// allows one web application to call another, subject to configuration limits
// ensures API is accessable from different domain

// xss-clean: 
// sanitizes user input to req.body, req.query, req.params
// averts cross side scripting attacks
// protects against when an attacker is able to insert some JavaScript into your application and have your application run that script, potentially getting access to resources managed by the application - can happen when a script is inserted into a URL that calls the application, or into a REST request, or into an HTML form
// xss-clean package strips those scripts out

// express-rate-limit:
// limits the number of requests that can be issued per minute from a given client
// attackers can’t cause application problems by brute force

// packages must be used whenever an application is deployed publicly to minimize the chance of a security exposure

// import extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit'); // will require configuration

const express = require('express'); // look for express
const app = express(); // invoke express and set equal to app

// connectDB
const connectDB = require('./db/connect');

// place auth middleware in app.js
// authenticate all routes so that only creator can modify own entries
// get middleware and stick it in fron of movies router
// all of our movies routes will be protected
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');

// error handler middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1); // because app will be behind reverse proxy
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })
  // error message defaults to 'Too many requests, please try again later'
  // default status code response = 429
);

// invoke .json because we want to access data in req.body for POST routes
app.use(express.json());

// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
// app.use(rateLimter());

// routes
// app.get('/', (req, res) => { // forward-slash (/) leads to home page 
//   res.send('jobs api');
// });
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies', authenticateUser, moviesRouter);

// pass not found middleware and error handler middleware into app.use()
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// set up port
const port = process.env.PORT || 3000;

// start function
const start = async () => {
  try {
    // invoke connectDB
    await connectDB(process.env.MONGO_URI);
    // invoke app.listen()
    app.listen(port, console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
