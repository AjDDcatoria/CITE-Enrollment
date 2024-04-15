const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const SubjectModel = require("../subjectModel/subjectModel");
const UserModel = require("../userModel/userModel");

class RoomModel extends Model {}

RoomModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    roomName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: "subjects",
        key: "subjectName",
      },
    },
    instructorID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: "users",
        key: "userID",
      },
    },
    block: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    year: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    schedStart: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00",
    },
    schedEnd: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00",
    },
  },
  {
    sequelize,
    modelName: "rooms",
  }
);

UserModel.RoomModel = UserModel.hasMany(RoomModel);
SubjectModel.RoomModel = SubjectModel.hasOne(RoomModel);

// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("Database synced successfully.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

module.exports = RoomModel;
