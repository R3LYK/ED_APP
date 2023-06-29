import AssignmentEvent from "../schemas/assignmentEvent.js";

const createAssignmentEvent = async (req, res) => {
  try {
    const { assignmentId, studentId, dueDate, createdBy } = req.body;
    const { userId } = req.params;

    // Create the assignment event
    const assignmentEvent = new AssignmentEvent({
      assignment: assignmentId,
      student: studentId,
      dueDate: new Date(dueDate),
      createdBy: createdBy,
      role: "student",
    });

    // Save the assignment event to the database
    const createdEvent = await assignmentEvent.save();

    res.status(201).json({ event: createdEvent });
  } catch (error) {
    console.log("Error creating assignment event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the assignment event" });
  }
};

export default { createAssignmentEvent };
