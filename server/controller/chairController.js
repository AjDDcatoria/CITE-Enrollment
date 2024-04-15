const Request = require("../models/requestModel/request");
const Room = require("../models/roomModel/room");
const Subject = require("../models/subjectModel/subjects");
const asyncHandler = require("../utils/asyncHandler");
const { STATUS } = require("../utils/types");
const InstructorController = require("./instructorController");
const RequestController = require("./requestController");

class ChairController extends RequestController {
  constructor() {
    super(Request);
    this.subject = new Subject();
  }

  createSubject = asyncHandler(async (req, res) => {
    await this.subject.createSubject(req.body);
    res.status(STATUS.CREATED).json({ message: "Subject Created" });
  });
}

class ChairAsInstructor extends InstructorController {
  constructor() {
    super(Room, Subject);
  }
}

module.exports = { ChairController, ChairAsInstructor };
