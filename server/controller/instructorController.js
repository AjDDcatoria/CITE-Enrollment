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

  /**
   * Create a new room with schedule validation and auto add to classMemberModel
   *
   * @route POST api/"chair" or "instructor"/create-room
   * @param {newRoom} req.body - Contains the room information including schedule
   * @param {otherInfo} req.session.currentUser - The creator information
   */
  createRoom = asyncHandler(async (req, res) => {
    const newRoom = req.body;
    const { createdAt, updatedAt, ...otherInfo } = req.session.currentUser;

    const subjectInfo = await this.subject.getSubjectByName(newRoom.roomName);
    const instructorRooms = await this.room.getInstructorRooms(otherInfo.id);

    // validate schedule
    validateSchedule(newRoom, instructorRooms.dataValues);

    // create Room                     instructor
    await this.room.createRoom(newRoom, otherInfo, subjectInfo.dataValues);
    res.status(STATUS.CREATED).json({ message: "Room Created" });
  });

  getClassMember = asyncHandler(async (req, res) => {
    const { roomId } = req.body;

    const members = await this.room.getMembers(roomId);

    res.status(STATUS.OK).json(members);
  });

  /**
   * Retrives the enrollees base on instructors room , including roomId,roomName,
   * student fullname,student id block,year,
   *
   * @route  GET /api/"chair or instructor"/enrollee
   * @param {object} req.session.userID - The instructur or userID that owns rooms
   */

  getEnrollee = asyncHandler(async (req, res) => {
    const { userID } = req.session.currentUser;
    const enrollee = await this.room.getEnrollee(userID);
    res.status(STATUS.OK).json(enrollee);
  });
}

module.exports = InstructorController;
