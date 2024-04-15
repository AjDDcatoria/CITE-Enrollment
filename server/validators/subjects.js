const CustomError = require("../utils/customError");
const { STATUS } = require("../utils/types");

function validateNewSubject(subjectData) {
  if (
    subjectData.subjectName.length == 0 ||
    subjectData.subjectCode.length == 0
  ) {
    throw new CustomError(
      "Subject Info should not be null or Empty",
      STATUS.UNAUTHORIZE
    );
  }

  if (!Number.isInteger(subjectData.unit)) {
    throw new CustomError("Unit must be a number", STATUS.UNAUTHORIZE);
  }

  if (subjectData.unit < 1 || subjectData.unit > 5) {
    throw new CustomError(
      "Unit must be minimum of 1 and maximum of 5",
      STATUS.UNAUTHORIZE
    );
  }

  if (typeof subjectData.isPrerequisite !== "boolean") {
    throw new CustomError("isPrequisite must be a boolean", STATUS.UNAUTHORIZE);
  }
}

module.exports = validateNewSubject;
