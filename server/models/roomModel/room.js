const sequelize = require("../../config/db.js");
const EnrollModel = require("../requestModel/enrollRequestModel.js");
const UserModel = require("../userModel/userModel");
const ClassMemberModel = require("./classMemberModel.js");
const RoomModel = require("./roomModel");
const path = require("path");
const { Op } = require("sequelize");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

class Room {
  /**
   * Creates a new room with validated schedule then creates a class.
   * ! The reason why we fetch the data after creating a room because the roomInfo
   * ! is not already contain the id of the room that used for connect the foreign key
   * ! for creating classmember Model
   *
   * @param {object} roomInfo - Contains the name of room and schedule
   * @param {object} instructorData - Information about the instructor
   * @param {object} subjectInfo - The subject infomation
   */
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

  /**
   * Returns all the rooms created by the instructor
   *
   * @param {String} userId - the userID or the instructorID
   * @returns {roomResult}  - information about the room
   */
  async getInstructorRooms(userId) {
    const roomResult = await UserModel.findOne({
      attributes: ["id", "userID"],
      include: RoomModel,
      where: { id: userId },
    });
    return roomResult;
  }

  /**
   * Retives there room information where they enroll or owns the room
   *
   * @param {object} userID - The userID of users
   * @returns {object} - Contains room information and the owner
   */
  async getUserRooms(userId) {
    const room = await sequelize.query(process.env.GETUSERROOM, {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT,
    });

    return room;
  }

  /**
   * Adding class member who's enroll into specified room
   * memberID is a userID and userId is who created the room
   * roomId is where the classmember belongs to room
   *
   * @param {object} userData - The user data contains role,userId
   * @param {object} roominfo - The room info contains validated Schedule
   */
  async addClassMember(userData, roomInfo) {
    await ClassMemberModel.create({
      memberID: userData.userID,
      role: userData.role,
      userId: userData.id,
      roomId: roomInfo.id,
    });
  }

  /**
   * Retrives Avaible rooms for students that they can enroll but not
   * include the rooms they already enrolled
   *
   * @param {String} userID - The userID of user or studentID
   * @return {object} - The Avaible rooms that contains who created the room and room info
   */
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

  /**
   * Get the enrollee base on instructor rooms
   * @param {String} instructorID - The instructorID
   * @return {object} - Contains fullname of student,roomName,block,year,roomId
   */
  async getEnrollee(instructorID) {
    const enrollee = await sequelize.query(process.env.GET_ENROLLEE, {
      replacements: [instructorID],
      type: sequelize.QueryTypes.SELECT,
    });
    return enrollee;
  }
}

module.exports = Room;
