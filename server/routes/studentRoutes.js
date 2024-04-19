const express = require("express");
const router = express.Router();
const StudentController = require("../controller/studentController");

const student = new StudentController();

router.post("/send-enroll", student.sendEnroll);
router.get("/get-available-rooms", student.getAvailableRooms);

module.exports = router;
