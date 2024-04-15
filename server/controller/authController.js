const Auth = require("../models/userModel/auth");
const asyncHandler = require("../utils/asyncHandler");
const token = require("../middleware/token/jwt");
const CustomError = require("../utils/customError");
const { STATUS } = require("../utils/types");

class AuthController {
  constructor() {
    this.auth = new Auth();
  }

  login = asyncHandler(async (req, res) => {
    if (req.session.currentUser) {
      throw new CustomError(`This device has already Login`, STATUS.FORBIDDEN);
    }

    const userResult = await this.auth.login(req.body);
    const access_token = token.getToken(userResult);

    res.cookie("access_token", access_token, {
      httpOnly: false,
    });

    req.session.currentUser = userResult;
    const { userID, email, ...other } = userResult;
    res.status(STATUS.OK).json(other);
  });

  logout = asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
      if (err) throw new CustomError("Error destroy session", STATUS.SERVER);
    });

    return res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(STATUS.OK)
      .json({ message: "Logout Successfull." });
  });
}

module.exports = AuthController;
