import mongoose from "mongoose";
import Assignment from "../../schemas/assignments.js";

const getAssignments = async (req, res) => {
  const { teacherId } = req.params;

  console.log("teacherId test:", teacherId);

  try {
    const foundAssignments = await Assignment.find({createdBy: teacherId});

    if (foundAssignments.length === 0) {
      console.log('No assignments found for the teacher');
      return res
        .status(404)
        .json({ message: "No assignments found for the teacher" });
    } else {
      const assignments = foundAssignments.map((assignment) => ({
        assignmentName: assignment.assignmentName,
        questions: assignment.questions,
      }));

      return res.json({ assignments });
    }
  } catch (error) {
    console.error("Error retrieving teacher assignments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { getAssignments };
