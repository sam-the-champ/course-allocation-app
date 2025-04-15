// General error handler middleware
// You can use this to return consistent error responses
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Logs full error to server console
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Something went wrong on the server',
    });
  };
  
  module.exports = errorHandler;
  