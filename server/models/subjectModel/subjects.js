const CustomError = require("../../utils/customError");
const { STATUS } = require("../../utils/types");
const validateNewSubject = require("../../validators/subjects");
const SubjectModel = require("./subjectModel");

class Subject {
  /**
   * Creates a new subject
   * @param {object} subjectData - data for the new subject
   * @param {string} subjectData.subjectName - name of the subject
   * @param {string} subjectData.subjectCode - code of the subject
   * @param {boolean} [subjectData.isPrerequisite=false] - whether the subject is a prerequisite
   * @param {string} [subjectData.prerequisite] - code of the prerequisite subject if it is a prerequisite
   */
  async createSubject(subjectData) {
    validateNewSubject(subjectData);

    let subjectResult = await SubjectModel.findOne({
      where: { subjectName: subjectData.subjectName },
    });

    if (subjectResult) {
      throw new CustomError(`Subject name must be unique`, STATUS.UNAUTHORIZE);
    }

    subjectResult = await SubjectModel.findOne({
      where: { subjectCode: subjectData.subjectCode },
    });

    if (subjectResult) {
      throw new CustomError(
        `${subjectData.subjectCode} is Already taken `,
        STATUS.UNAUTHORIZE
      );
    }

    if (subjectData.isPrerequisite) {
      if (!subjectData.prerequisite) {
        throw new CustomError(`Prerequisite is null`, STATUS.UNAUTHORIZE);
      }

      subjectResult = await SubjectModel.findOne({
        where: { subjectCode: subjectData.prerequisite },
      });

      if (!subjectResult) {
        throw new CustomError(
          `Prerequisite Subject not found`,
          STATUS.NOTFOUND
        );
      }
    }

    await SubjectModel.create(subjectData);
  }

  async getSubjectByName(subjectName) {
    const subject = await SubjectModel.findOne({
      where: { subjectName: subjectName },
    });
    if (!subject) {
      throw new CustomError("Subject not found", STATUS.NOTFOUND);
    }
    return subject;
  }

  async getAllSubject() {
    const subjects = await SubjectModel.findAll();
    return subjects;
  }
}

module.exports = Subject;
