import Teacher from "../schemas/teachers.js";
import bcrypt from "bcrypt";

const handleNewTeacher = async (req, res) => {
  const { title, firstName, lastName, uName, roles, pwd } = req.body;
  console.log(req.body);
  if (!title || !firstName || !lastName || !uName || !roles || !pwd) {
    console.log(req.body);
    return res.status(400).json({ message: "Missing required fields" });
  }
  // check for duplicate usernames in the db
  const duplicate = await Teacher.findOne({ uName }).exec();
  if (duplicate) {
    return res.sendStatus(409); // conflict
  }
  try {
    //encrypts pwd
    const hashedPwd = await bcrypt.hash(pwd, 10); // 10 is the salt
    //create/store teacher in db
    const result = await Teacher.create({
      title,
      firstName,
      lastName,
      uName,
      roles,
      pwd: hashedPwd,
    });

    console.log(result);
    res.status(201).json({ message: `Teacher ${uName} created!!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export default { handleNewTeacher };
