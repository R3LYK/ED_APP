import Assignment from "../../schemas/assignments.js";

const saveAssignment = async (req, res) => {
  const { assignmentName, questionsToKeep, createdBy } = req.body;

  // Perform any validation checks if necessary

  try {
    // Create and store the assignment in the database
    console.log("Creating assignment:", assignmentName);
    console.log("Questions to keep:", questionsToKeep);
    console.log("Created by:", createdBy);

    const assignment = await Assignment.create({
      assignmentName,
      questions: questionsToKeep,
      createdBy,
    });

    console.log("Assignment saved:", assignment);

    res.status(201).json({ message: "Assignment saved successfully!" });
  } catch (error) {
    console.error("Error saving assignment:", error);
    res.status(500).json({ message: "Error saving assignment" });
  }
};

export default { saveAssignment };


