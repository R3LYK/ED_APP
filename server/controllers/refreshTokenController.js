import Teacher from "../schemas/teachers.js";
import Student from "../schemas/students.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  console.log('request body: ');
  console.log(req.body); // Log the request body to check the payload

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("No cookie found");
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  // Check if teacher exists
  const foundTeacher = await Teacher.findOne({ refreshToken }).exec();
  const foundStudent = await Student.findOne({ refreshToken }).exec();
  if (!foundTeacher && !foundStudent) {
    return res.sendStatus(401); // Unauthorized
  }
  const foundUser = foundTeacher || foundStudent;

  if (!foundUser) {
    console.log("No user found");
    console.log(refreshToken);
    return res.sendStatus(403); // Forbidden
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }
    const roles = Object.values(foundUser.roles);

    // Generate a new access token
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Set the authentication cookie with the new access token
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // Expires in 15 minutes (in milliseconds)
    });

    console.log("accessToken: " + accessToken);
    console.log("roles: ", roles); // Add this line to log the roles
    console.log("response: ", { roles, accessToken }); // Add this line to log the response

    res.json({ roles, accessToken });
  });
};

export default { handleRefreshToken };
