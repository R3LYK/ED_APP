import Teacher from "../schemas/teachers.js";
import Student from "../schemas/students.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
  console.log('in login');
  const { uName, pwd } = req.body;
  console.log(req.body);
  if (!uName || !pwd) {
    return res.status(400).json({ message: "Missing username or password" });
  }
  // check if teacher exists
  const foundTeacher = await Teacher.findOne({ uName }).exec();
  const foundStudent = await Student.findOne({ uName }).exec();
  if (!foundTeacher && !foundStudent) {
    return res.sendStatus(401); // unauthorized
  }
  const foundUser = foundTeacher || foundStudent;
  const match = await bcrypt.compare(pwd, foundUser.pwd); // Update the field to 'pwd'
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean); // Filter out any falsey values (false, null, undefined, 0, ""
    // JWTs
    const accessToken = jwt.sign(
      { username: foundUser.uName, roles }, // Added roles to the JWT payload if needed
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" } // 30 seconds is for testing, need to reset to 15 minutes later
    );
    const refreshToken = jwt.sign(
      { username: foundUser.uName, roles }, // Added roles to the JWT payload if needed
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with teacher
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);
    console.log('refresh token: ' + refreshToken);
    // Set cookies
    // Need to add sameSite: 'none' and secure: true for production, 
    // tried to set it for dev, but thunder client didn't like it.
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    }); // 1 day, it's in milliseconds because of course it is...
    res.json({ accessToken, user: foundUser });
  } else {
    console.log('else');
    res.sendStatus(401);
  }
};

export default { handleLogin };
