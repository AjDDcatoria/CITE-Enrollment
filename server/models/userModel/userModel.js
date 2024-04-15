const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    userID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("student", "instructor", "chair"),
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM("CITE", "CMB", "CAS", "CET", "CTE"),
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("Database synced successfully.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

module.exports = UserModel;
