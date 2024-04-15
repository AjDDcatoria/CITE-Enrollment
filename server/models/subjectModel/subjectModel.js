const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class SubjectModel extends Model {}

SubjectModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    subjectCode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    subjectName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    unit: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    isPrerequisite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    prerequisite: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: "subjects",
        key: "subjectCode",
      },
    },
  },
  {
    sequelize,
    modelName: "subjects",
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

module.exports = SubjectModel;
