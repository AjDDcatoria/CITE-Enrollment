const path = require("path");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
require("cookie-parser");
const { ROLE } = require("../userRole/role");
const CustomError = require("../../utils/customError");
const { STATUS } = require("../../utils/types");

const getToken = (userData) => {
  const env = verifyUser(userData);
  const accessToken = sign({ id: userData.userID, email: userData.email }, env);
  return accessToken;
};

const verifyUser = (userData) => {
  switch (userData.role) {
    case ROLE.student:
      return process.env.STUDENT_TOKEN;
    case ROLE.instructor:
      return process.env.INSTRUCTOR_TOKEN;
    case ROLE.department_chair:
      return process.env.CHAIR_TOKEN;
    default:
      throw new CustomError("Can't find role", STATUS.NOTFOUND);
  }
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access_token"];
  if (!accessToken) {
    throw new CustomError("not Authenticated", STATUS.UNAUTHORIZE);
  }

  const currentUser = req.session.currentUser;
  const env = verifyUser(currentUser);

  try {
    const validToken = verify(accessToken, env);
    if (validToken) {
      res.authenticated = true;
      return next();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getToken, validateToken };
