const express = require("express");
const router = express.Router();
const RequestController = require("../controller/requestController");
const request = new RequestController();

router.post("/account", request.requestAccount);
module.exports = router;
