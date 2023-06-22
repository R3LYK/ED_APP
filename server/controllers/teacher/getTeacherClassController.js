import Teacher from '../../schemas/teachers.js';

const getTeacherClass = async (req, res) => {
  const { userId } = req.params;

  console.log("userId:", userId);

  try {
    const foundTeacher = await Teacher.findById(userId);

    if (!foundTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    } else {
      const classCodes = foundTeacher.classCodes;
      return res.json({ classCodes });
    }
  } catch (error) {
    console.error("Error retrieving teacher class codes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { getTeacherClass };

