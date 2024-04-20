const asyncHandler = require("../utils/asyncHandler");
const Request = require("../models/requestModel/request");
const { STATUS } = require("../utils/types");
const Room = require("../models/roomModel/room");

class StudentController {
  constructor() {
    this.request = new Request();
    this.room = new Room();
  }
  /**
   * @route POST /api/student/send-enroll
   */
  sendEnroll = asyncHandler(async (req, res) => {
    const studentInfo = req.session.currentUser;
    await this.request.sendEnroll(req.body, studentInfo);
    res
      .status(STATUS.CREATED)
      .json({ message: "Request Successfull please wait for comfirmation" });
  });

  /**
   * Retives avaible rooms for students to enroll
   * @route api/student/get-avaible-rooms
   * @param {userID} - The userID of user or studentID
   */

  getAvailableRooms = asyncHandler(async (req, res) => {
    const { userID } = req.session.currentUser;
    const rooms = await this.room.getAvailableRooms(userID);
    res.status(STATUS.OK).json(rooms);
  });
}

module.exports = StudentController;
