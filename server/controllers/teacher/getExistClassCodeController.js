import ClassCode from "../../schemas/classCodes.js";

const getClassCode = async (req, res) => {
  const { classType } = req.query; // Access classType from req.query

  console.log("classType:", classType);

  try {
    const foundClass = await ClassCode.findOne({ classType });

    if (!foundClass) {
      return res.status(404).json({ message: "Class code not found" });
    } else {
      const classCodes = foundClass.classCode;
      return res.json({ classCodes });
    }
  } catch (error) {
    console.error("Error retrieving class codes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { getClassCode };
