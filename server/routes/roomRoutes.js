const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel/room");
const { STATUS } = require("../utils/types");

const room = new Room();

router.get("/get-room", async (req, res) => {
  try {
    const { id } = req.session.currentUser;
    const rooms = await room.getUserRooms(id);
    res.status(STATUS.OK).json(rooms);
  } catch (error) {
    res.status(STATUS.SERVER).json({ message: error.message });
  }
});

module.exports = router;
