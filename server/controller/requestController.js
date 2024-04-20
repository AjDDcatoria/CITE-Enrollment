const asyncHandler = require("../utils/asyncHandler");
const Request = require("../models/requestModel/request");
const credentialsValidate = require("../validators/credentials");
const { STATUS, REQUEST } = require("../utils/types");

class RequestController {
  constructor() {
    this.request = new Request();
  }

  /**
   * @route POST /api/request/post
   */
  requestAccount = asyncHandler(async (req, res) => {
    credentialsValidate(req.body);
    await this.request.reqAccount(req.body);
    res.status(STATUS.CREATED).json({ message: "Request sent!" });
  });

  /**
   * @route POST /api/chair/accept-accounts
   */
  acceptAccount = asyncHandler(async (req, res) => {
    await this.request.acceptRequest(req.body, REQUEST.ACCOUNTS);
    res.status(STATUS.CREATED).json({ message: "Accept sucessfull" });
  });

  /**
   * @route GET /api/chair/get-request-accounts
   */
  getAllrequest = asyncHandler(async (req, res) => {
    const accounts = await this.request.getAllRequest();
    res.status(STATUS.OK).json(accounts);
  });

  /**
   * @route POST /api/chair/reject-accounts
   */
  rejectAccount = asyncHandler(async (req, res) => {
    await this.request.deleteRequest(req.body, REQUEST.ACCOUNTS);
    res.status(STATUS.OK).json({ message: "Deleted sucessful" });
  });

  /**
   * @route POST /api/"chair" or "instructor"/reject-enroll
   */
  rejectEnroll = asyncHandler(async (req, res) => {
    await this.request.deleteRequest(req.body, REQUEST.ENROLL);
    res.status(STATUS.OK).json({ message: "Reject Enroll successful" });
  });

  /**
   * @route POST /api/"chair" or "instructor"/accept-enroll
   */
  acceptEnroll = asyncHandler(async (req, res) => {
    await this.request.acceptRequest(req.body, REQUEST.ENROLL);
    res.status(STATUS.CREATED).json({ message: "Accept Enroll successful" });
  });
}

module.exports = RequestController;
