import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "Missing user or password" });
  }
  // check if user exists
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.sendStatus(401); // unauthorized
  }
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // JWTs
    const accessToken = jwt.sign(
      { 'username': foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "90s" } // 30 seconds is for testing, ned to reset to 15 minutes later
    );
    const refreshToken = jwt.sign(
      { 'username': foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    // Set cookies
    //Need to add sameSite: 'none' and secure: true for production, tried to set it for dev, but thunder client didn't like it.
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }); // 1 day, it's in milliseconds because of course it is...
    res.json({ accessToken });
  } else {
    console.log('else');
    res.sendStatus(401);
  }
};

export default { handleLogin };
