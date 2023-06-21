import Teacher from '../schemas/teachers.js';
import Student from '../schemas/students.js';

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); // No Content
  }
  const refreshToken = cookies.jwt;

  const foundTeacher = await Teacher.findOne({ refreshToken }).exec();
  const foundStudent = await Student.findOne({ refreshToken }).exec();

  // Check if token exists in db
  const foundUser = foundTeacher || foundStudent;

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204); // No Content
  }

  // Delete the refresh token from the db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);
};

export default { handleLogout };
