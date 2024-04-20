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

  /**
   * Handles the creation of a new account request.
   * This method checks for the uniqueness of the email and userID in both the account requests and registered users.
   * If the email or userID is already used, it throws a custom error.
   * If the checks pass, it creates a new account request with the provided data.
   *
   * @param {object} data - The account request data containing email, userID, and other relevant information.
   * @throws {customError} - Throws a custom error if the email or userID is already used, with an appropriate status code.
   * @returns {Promise<void>} - A promise that resolves when the account request is successfully created.
   */
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

  /**
   * Deletes a specific request based on the provided data and type.
   * This method supports deleting account creation requests and enrollment requests.
   * For account requests, it deletes based on the userID.
   * For enrollment requests, it first checks if the studentID and roomId combination exists,
   * and if so, deletes the enrollment request. If the combination does not exist, it throws an error.
   * Throws a custom error if the request type is not supported or if the specified request cannot be found.
   *
   * @param {object} data - The data object containing identifiers for the request to be deleted.
   *                        For account requests, this should include `userID`.
   *                        For enrollment requests, this should include both `studentID` and `roomId`.
   * @param {string} types - The type of request to delete, specified by the `REQUEST` enum.
   * @throws {customError} - Throws a custom error if the request cannot be found or if an unsupported type is provided.
   * @returns {Promise<void>} - A promise that resolves when the request is successfully deleted.
   */
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

  /**
   * Accepts a request based on the provided user data and request type.
   * This method handles two types of requests: account creation and enrollment.
   * For account creation requests, it finds the request by ID, sets a default password combining the user's lastname and department,
   * registers the user, and then deletes the request.
   * For enrollment requests, it finds the enrollment request by studentID and roomId, adds the student to the class,
   * and then deletes the enrollment request.
   * Throws a custom error if the request cannot be found or if an unsupported type is provided.
   *
   * @param {object} userData - The data of the user making the request. For account requests, this includes the `id`.
   *                            For enrollment requests, this includes `studentID` and `roomId`.
   * @param {string} types - The type of request to accept, specified by the `REQUEST` enum.
   * @throws {customError} - Throws a custom error if the request cannot be found or if an unsupported type is provided.
   * @returns {Promise<void>} - A promise that resolves when the request is successfully accepted and processed.
   */

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

  /**
   * Sends an enrollment request for a student to join a specific room.
   * This method first checks if the specified room exists. If not, it throws an error indicating the room was not found.
   * Then, it checks if an enrollment request for the student to the specified room already exists.
   * If such a request exists, it throws an error to avoid duplicate requests.
   * If no existing request is found, it creates a new enrollment request with the student's and room's information.
   *
   * @param {object} room - The room object containing the `roomId` to which the student is requesting to enroll.
   * @param {object} studentInfo - The student's information object containing `id` and `userID`, where `id` is a unique identifier for the student and `userID` is the student's user ID.
   * @throws {customError} - Throws a custom error if the room is not found or if an enrollment request already exists for the student in the specified room.
   * @returns {Promise<void>} - A promise that resolves when the enrollment request is successfully created.
   */

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
