import Student from "../schemas/students.js";
import bcrypt from "bcrypt";

const handleNewStudent = async (req, res) => {
  const { studentID, uName, pwd, roles } = req.body;
  console.log(req.body);
  
  if (!studentID || !uName || !pwd || !roles) {
    console.log("Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }
  
  // Check for duplicate usernames in the database
  const duplicate = await Student.findOne({ uName }).exec();
  if (duplicate) {
    console.log("Duplicate username");
    return res.sendStatus(409); // Conflict
  }
  
  try {
    // Encrypt pwd
    const hashedPwd = await bcrypt.hash(pwd, 10); // 10 is the salt
    
    // Create/store student in the database
    const result = await Student.create({
      studentID,
      uName,
      pwd: hashedPwd,
      roles: roles, // Include the roles field
    });

    console.log(result);
    res.status(201).json({ message: `Student ${uName} created!!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export default { handleNewStudent };
