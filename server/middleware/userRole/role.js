const CustomError = require("../../utils/customError");
const { STATUS } = require("../../utils/types");
const ROLE = {
  department_chair: "chair",
  student: "student",
  instructor: "instructor",
};

const authRole = (role) => {
  return (req, res, next) => {
    const user = req.session.currentUser;
    if (user.role !== role) {
      throw new CustomError("Unauthorized", STATUS.UNAUTHORIZE);
    }
    next();
  };
};

module.exports = { authRole, ROLE };
