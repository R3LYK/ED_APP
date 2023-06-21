import Teacher from "../../schemas/teachers.js";

const storeClassCodes = async (req, res) => {
  const { TeacherId, classCode } = req.body;

  console.log("TeacherId:", TeacherId);
  console.log("classCode:", classCode);

  try {
    // Find the user by TeacherId
    const user = await Teacher.findById(TeacherId);
    console.log("found teacher:", user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the classCode field with the new class codes
    user.classCodes = classCode;
    await user.save();

    res.status(200).json({ message: "Class codes stored successfully" });
  } catch (error) {
    console.error("Error storing class codes:", error);
    res.status(500).json({ message: "Error storing class codes" });
  }
};

export default { storeClassCodes };
