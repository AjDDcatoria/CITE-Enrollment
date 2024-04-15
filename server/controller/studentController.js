const asyncHandler = require("../utils/asyncHandler");
const Request = require("../models/requestModel/request");
const { STATUS } = require("../utils/types");

class StudentController {
  constructor() {
    this.request = new Request();
  }
  // Todo sending Enroll Request
  sendEnroll = asyncHandler(async (req, res) => {
    const studentInfo = req.session.currentUser;
    await this.request.sendEnroll(req.body, studentInfo);
    res
      .status(STATUS.CREATED)
      .json({ message: "Request Successfull please wait for comfirmation" });
  });
}

module.exports = StudentController;
