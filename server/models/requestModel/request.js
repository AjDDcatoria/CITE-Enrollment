const accountRequestModel = require("./accountRequestModel");
const customError = require("../../utils/customError");
const User = require("../userModel/userModel");
const Auth = require("../userModel/auth");
const { REQUEST, STATUS } = require("../../utils/types");
const EnrollModel = require("./enrollRequestModel");
const RoomModel = require("../roomModel/roomModel");
const Room = require("../roomModel/room");
const UserModel = require("../userModel/userModel");

class Request {
  constructor() {
    this.room = new Room();
    this.auth = new Auth();
  }

  async reqAccount(data) {
    let emailResult = await accountRequestModel.findOne({
      where: { email: data.email },
    });

    if (emailResult) {
      throw new customError(`Email already used`, STATUS.UNAUTHORIZE);
    }

    emailResult = await User.findOne({ where: { email: data.email } });

    if (emailResult) {
      throw new customError(`Email already used`, STATUS.UNAUTHORIZE);
    }

    let idResult = await User.findOne({
      where: { userID: data.userID },
    });

    if (idResult) {
      throw new customError("Someone own this ID", STATUS.UNAUTHORIZE);
    }

    idResult = await accountRequestModel.findOne({
      where: { userID: data.userID },
    });

    if (idResult) {
      throw new customError("Someone already request this ID", 402);
    }

    await accountRequestModel.create(data);
  }

  async getAllRequest() {
    const accounts = await accountRequestModel.findAll();
    return accounts;
  }

  async deleteRequest(data, types) {
    switch (types) {
      case REQUEST.ACCOUNTS: // ! for Accounts
        await accountRequestModel.destroy({ where: { userID: data.userID } });
        break;
      case REQUEST.ENROLL: // ! for Enrollees
        const result = await EnrollModel.findOne({
          where: { studentID: data.studentID, roomId: data.roomId },
        });

        if (!result) {
          throw new customError("Room or student not found", STATUS.NOTFOUND);
        }

        await EnrollModel.destroy({
          where: { studentID: data.studentID, roomId: data.roomId },
        });

        break;
      default:
        throw new customError("Something went Wrong", STATUS.SERVER);
    }
  }

  async acceptRequest(userData, types) {
    let account = null; // ? initial state

    switch (types) {
      case REQUEST.ACCOUNTS: // ! for Accounts
        account = await accountRequestModel.findOne({
          attributes: { exclude: ["createdAt", "updatedAt", "id"] },
          where: { id: userData.id },
        });

        if (!account) {
          throw new customError(`ID not found`, STATUS.NOTFOUND);
        }
        // ! Default password lastname + department
        account.dataValues.password =
          account.dataValues.lastname + account.dataValues.department;

        await this.auth.register(account.dataValues);

        await this.deleteRequest(account.dataValues, REQUEST.ACCOUNTS);

        break;

      case REQUEST.ENROLL: // ! for Enrollees
        account = await EnrollModel.findOne({
          Where: { studentID: userData.studentID, roomId: userData.roomId },
        });

        if (!account) {
          throw new customError("Account not found", STATUS.NOTFOUND);
        }

        userData = await UserModel.findOne({
          where: { userID: account.studentID },
        });

        const roomInfo = {
          id: account.dataValues.roomId,
        };

        await this.room.addClassMember(userData.dataValues, roomInfo);
        await this.deleteRequest(account, REQUEST.ENROLL);

        break;
      default:
        throw new customError("Something went Wrong", STATUS.SERVER);
    }
  }

  async sendEnroll(room, studentInfo) {
    const roomResult = await RoomModel.findOne({ where: { id: room.roomId } });
    if (!roomResult) {
      throw new customError("Room not found", STATUS.NOTFOUND);
    }

    const enrollResult = await EnrollModel.findOne({
      where: { userId: studentInfo.id, roomId: room.roomId },
    });

    if (enrollResult) {
      throw new customError("The request is already sent", STATUS.UNAUTHORIZE);
    }

    await EnrollModel.create({
      studentID: studentInfo.userID,
      roomId: room.roomId,
      userId: studentInfo.id,
    });
  }
}

module.exports = Request;
