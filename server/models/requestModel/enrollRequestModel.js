const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const RoomModel = require("../roomModel/roomModel");
const UserModel = require("../userModel/userModel");

class EnrollModel extends Model {}

EnrollModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    studentID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: "users",
        key: "userID",
      },
    },
  },
  {
    sequelize,
    modelName: "enrollees",
  }
);

RoomModel.EnrollModel = RoomModel.hasMany(EnrollModel);
UserModel.EnrollModel = UserModel.hasMany(EnrollModel);

// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("Database synced successfully.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

module.exports = EnrollModel;
