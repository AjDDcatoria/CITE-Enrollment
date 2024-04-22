const express = require("express");
const router = express.Router();
const InstructorController = require("../controller/instructorController");

const instructor = new InstructorController();

router.post("/create-room", instructor.createRoom);
router.post("/reject-enroll", instructor.rejectEnroll);

module.exports = router;
