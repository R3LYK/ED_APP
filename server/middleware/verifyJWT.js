import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader); // Log the value of authHeader
  if (!authHeader) {
    console.log(!authHeader);
    console.log('the bug is here');
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];
  console.log("token:", token); // Log the extracted token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // forbidden (invalid token)
    req.user = decoded.username;
    next();
  });
};

export default verifyJWT;
