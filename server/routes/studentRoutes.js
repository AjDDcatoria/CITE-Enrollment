const express = require("express");
const router = express.Router();
const StudentController = require("../controller/studentController");

const student = new StudentController();

router.post("/send-enroll", student.sendEnroll);

module.exports = router;
