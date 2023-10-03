require('dotenv').config();
require('express-async-errors');
const express = require('express'); // look for express
const app = express(); // invoke express and set equal to app

// connectDB

// routers
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');

// error handler middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// invoke .json because we want to access data in req.body for POST routes
app.use(express.json());
// extra packages

// routes
// app.get('/', (req, res) => { // forward-slash (/) leads to home page 
//   res.send('jobs api');
// });
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies', moviesRouter);

// pass not found middleware and error handler middleware into app.use()
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// set up port
const port = process.env.PORT || 3000;

// start function
const start = async () => {
  try {
    // invoke app.listen()
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
// more code to come!

start();
