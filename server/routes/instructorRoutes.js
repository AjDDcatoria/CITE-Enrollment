const express = require("express");
const router = express.Router();
const InstructorController = require("../controller/instructorController");

const instructor = new InstructorController();

router.post("/create-room", instructor.createRoom);
router.post("/reject-enroll", instructor.rejectEnroll);
router.get("/enrollee", instructor.getEnrollee);
router.post("/getclassmember", instructor.getClassMember);

module.exports = router;
