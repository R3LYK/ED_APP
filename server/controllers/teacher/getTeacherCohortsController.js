import Cohort from "../../schemas/cohort.js";

const getTeacherCohorts = async (req, res) => {
  const { teacherId } = req.params;

  console.log("teacherId:", teacherId);

  try {
    const foundCohorts = await Cohort.find({ teacher: teacherId });

    if (foundCohorts.length === 0) {
      return res
        .status(404)
        .json({ message: "No cohorts found for the teacher" });
    } else {
      const cohorts = foundCohorts.map((cohort) => ({
        cohortName: cohort.cohortName,
        cohortCode: cohort.cohortCode,
        students: cohort.students,
      }));
      return res.json({ cohorts });
    }
  } catch (error) {
    console.error("Error retrieving teacher cohorts:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { getTeacherCohorts };
