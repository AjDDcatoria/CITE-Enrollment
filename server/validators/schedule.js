const validator = require("validator");
const CustomError = require("../utils/customError");
const { STATUS } = require("../utils/types");

function validateSchedule(newRoom, instructorRooms) {
  if (validator.isEmpty(newRoom.roomName)) {
    throw new CustomError(
      "Room name must not be null or empty",
      STATUS.UNAUTHORIZE
    );
  }

  if (!isValidTime(newRoom.schedStart) || !isValidTime(newRoom.schedEnd)) {
    throw new CustomError("Schedul must be valid", STATUS.INVALID);
  }

  const newStartTime = timeToMinutes(newRoom.schedStart);
  const newEndTime = timeToMinutes(newRoom.schedEnd);

  for (const room of instructorRooms.rooms) {
    const startTime = timeToMinutes(room.schedStart);
    const endTime = timeToMinutes(room.schedEnd);

    if (newStartTime >= startTime && newStartTime < endTime) {
      throw new CustomError(
        `Overlap detected with room ${room.roomName}. Please choose a different time.`,
        STATUS.UNAUTHORIZE
      );
    }

    if (newEndTime > startTime && newEndTime <= endTime) {
      throw new CustomError(
        `Overlap detected with room ${room.roomName}. Please choose a different time.`,
        STATUS.UNAUTHORIZE
      );
    }
  }
}

function isValidTime(timeString) {
  const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9])$/i;
  return timeRegex.test(timeString);
}

function timeToMinutes(timeString) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

module.exports = validateSchedule;
