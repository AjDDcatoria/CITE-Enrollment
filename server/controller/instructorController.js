const Request = require("../models/requestModel/request");
const Room = require("../models/roomModel/room");
const Subject = require("../models/subjectModel/subjects");
const asyncHandler = require("../utils/asyncHandler");
const { STATUS } = require("../utils/types");
const validateSchedule = require("../validators/schedule");
const RequestController = require("./requestController");

class InstructorController extends RequestController {
  constructor() {
    super(Request);
    this.room = new Room();
    this.subject = new Subject();
  }

  createRoom = asyncHandler(async (req, res) => {
    const newRoom = req.body;
    const { createdAt, updatedAt, ...otherInfo } = req.session.currentUser;

    const subjectInfo = await this.subject.getSubjectByName(newRoom.roomName);
    const instructorRooms = await this.room.getRoomsByUser(otherInfo.id);

    // validate schedule
    validateSchedule(newRoom, instructorRooms.dataValues);

    // create Room                     instructor
    await this.room.createRoom(newRoom, otherInfo, subjectInfo.dataValues);
    res.status(STATUS.CREATED).json({ message: "Room Created" });
  });
}

module.exports = InstructorController;
