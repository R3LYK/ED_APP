import ClassCode from "../../schemas/classCodes.js";

const addClassCode = async (req, res) => {
  const { classType, classCode, role } = req.body;

  console.log("classType:", classType);
  console.log("classCode:", classCode);
  console.log("role:", role);

  try {
    if (role !== 1001 && role !== 1002) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingClass = await ClassCode.findOne({ classType });

    if (existingClass) {
      const existingCode = existingClass.classCode && existingClass.classCode.find((code) => code === classCode);

      if (existingCode) {
        return res.status(409).json({ message: "Class code already exists for the classType" });
      }

      existingClass.classCode = existingClass.classCode || [];
      existingClass.classCode.push(classCode);
      await existingClass.save();

      return res.status(200).json({ message: "Class code added to existing classType" });
    }

    const newClass = await ClassCode.create({
      classType,
      classCode: [classCode],
    });

    return res.status(201).json({ message: "New classType and classCode created", newClass });
  } catch (error) {
    console.error("Error saving classCode:", error);
    res.status(500).json({ message: "Error saving classCode" });
  }
};

export default { addClassCode };


