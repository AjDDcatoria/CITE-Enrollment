const validator = require("validator");
const CustomError = require("../utils/customError");
const { STATUS } = require("../utils/types");

const validateCredentials = (data) => {
  return (req, res, next) => {
    if (!validator.isEmail(data.email)) {
      throw new CustomError(`Invalid email`, STATUS.INVALID);
    }

    if (!["student", "instructor"].includes(data.role)) {
      throw new CustomError(
        "Request should be either student or instructor",
        STATUS.INVALID
      );
    }

    const departments = ["CITE", "CMB", "CAS", "CET", "CTE"];
    if (!departments.includes(data.department)) {
      throw new CustomError(
        `Department ${data.department} is not valid`,
        STATUS.INVALID
      );
    }
    next();
  };
};

module.exports = validateCredentials;
