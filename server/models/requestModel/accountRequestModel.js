const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class AccountRequestModel extends Model {}

AccountRequestModel.init(
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
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("student", "instructor"),
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM("CITE", "CMB", "CAS", "CET", "CTE"),
    },
  },
  {
    sequelize,
    modelName: "request_accounts",
  }
);

module.exports = AccountRequestModel;

// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("Database synced successfully.");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
