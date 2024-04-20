const CustomError = require("../../utils/customError");
const UserModel = require("./userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { STATUS } = require("../../utils/types");

class Auth {
  async login(userData) {
    if (!validator.isEmail(userData.email)) {
      throw new CustomError(`Invalid email`, STATUS.INVALID);
    }

    const userResult = await UserModel.findOne({
      where: { email: userData.email },
    });

    if (!userResult) {
      throw new CustomError(`Email not found`, STATUS.NOTFOUND);
    }

    const match = await bcrypt.compare(userData.password, userResult.password);
    if (!match) {
      throw new CustomError(`Wrong password`, STATUS.UNAUTHORIZE);
    }

    const { password, ...otherData } = userResult.dataValues;

    return otherData;
  }

  async register(userData) {
    const emailResult = await UserModel.findOne({
      where: { email: userData.email },
    });

    if (emailResult) {
      throw new CustomError(`Email is already Taken`, STATUS.UNAUTHORIZE);
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hasedPassword;
    console.log(userData);
    await UserModel.create(userData);
  }
}

module.exports = Auth;
