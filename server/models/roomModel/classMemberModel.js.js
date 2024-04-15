const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const RoomModel = require("./roomModel");
const UserModel = require("../userModel/userModel");

class ClassMemberModel extends Model {}

ClassMemberModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    memberID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: "users",
        key: "userID",
      },
    },
    role: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "class_members",
  }
);

UserModel.ClassMemberModel = UserModel.hasMany(ClassMemberModel);
RoomModel.ClassMemberModel = RoomModel.hasOne(ClassMemberModel);

// (async () => {
//   try {
//     await sequelize.sync();
//     console.log("Database synced successfully.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

module.exports = ClassMemberModel;
