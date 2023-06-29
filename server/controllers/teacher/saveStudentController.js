import Cohort from "../../schemas/cohort.js";
import Teacher from "../../schemas/teachers.js";

const saveStudent = async (req, res) => {
  const { cohortName, cohortCode, teacherId, students } = req.body;
  console.log("saveStudentController", req.body)

  try {
    console.log("Creating class:", cohortName);
    console.log("Students:", students);

    const foundTeacher = await Teacher.findById(teacherId);

    console.log("Teacher found:", foundTeacher);

    // Check if the cohort already exists
    let cohort = await Cohort.findOne({ cohortName });

    if (cohort) {
      // Cohort exists, add the new students to the existing cohort
      cohort.students.push(...students);
    } else {
      // Cohort does not exist, create a new cohort
      cohort = new Cohort({
        cohortName,
        cohortCode,
        teacher: foundTeacher,
        students,
      });
    }

    const savedCohort = await cohort.save();

    console.log("Class saved:", savedCohort);

    res.status(201).json({ message: "Class saved successfully!" });
  } catch (err) {
    console.error("Error saving class:", err);
    res.status(500).json({ message: "Error saving class" });
  }
};

export default { saveStudent };
