const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
/**
 * @param {Error} error - the error object
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {Function} next - the next middleware function
 * @returns {void}
 */
module.exports = (error, req, res, next) => {
  // set status code and status if not provided
  (error.statusCode = error.statusCode || 500),
    (error.status = error.status || "error");
  // send response
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    status: error.status,
    message: error.message,
  });
};
