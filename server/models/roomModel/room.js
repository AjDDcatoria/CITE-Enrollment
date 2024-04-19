const sequelize = require("../../config/db.js");
const EnrollModel = require("../requestModel/enrollRequestModel.js");
const UserModel = require("../userModel/userModel");
const ClassMemberModel = require("./classMemberModel.js");
const RoomModel = require("./roomModel");
const path = require("path");
const { Op } = require("sequelize");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

class Room {
  async createRoom(roomInfo, instructorData, subjectInfo) {
    roomInfo = {
      ...roomInfo,
      instructorID: instructorData.userID,
      userId: instructorData.id,
      subjectId: subjectInfo.id,
    };
    await RoomModel.create(roomInfo);

    //Get room info
    const roomData = await RoomModel.findOne({
      where: {
        roomName: roomInfo.roomName,
        instructorID: roomInfo.instructorID,
        schedStart: roomInfo.schedStart,
        schedEnd: roomInfo.schedEnd,
      },
    });
    // Add the creator to Classmember
    await this.addClassMember(instructorData, roomData.dataValues);
  }

  async getRoomsByUser(userId) {
    const roomResult = await UserModel.findOne({
      attributes: ["id", "userID"],
      include: RoomModel,
      where: { id: userId },
    });
    return roomResult;
  }

  async getUserRooms(userId) {
    const room = await sequelize.query(process.env.GETUSERROOM, {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT,
    });

    return room;
  }

  async addClassMember(userData, roomInfo) {
    await ClassMemberModel.create({
      memberID: userData.userID,
      role: userData.role,
      userId: userData.id,
      roomId: roomInfo.id,
    });
  }

  // Use for students thats not included there room where they
  // Already Enrolled
  async getAvailableRooms(userID) {
    let rooms = await sequelize.query(
      process.env.GET_CLASS_ROOM_NAMES_BY_USER,
      {
        replacements: [userID],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    // Arrays of roomNames
    rooms = rooms.map((room) => room.roomName);

    const availableRoom = UserModel.findAll({
      attributes: ["profile", "firstname", "lastname"],
      include: {
        model: RoomModel,
        where: {
          roomName: {
            [Op.notIn]: rooms,
          },
        },
      },
    });
    return availableRoom;
  }
}

module.exports = Room;
