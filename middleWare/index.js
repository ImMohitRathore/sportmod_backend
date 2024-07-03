const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User.model");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      const rootUser = await UserModel.findOne({ "tokens.token": token });
      if (!rootUser) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      req.user = rootUser;

      next();
    } catch (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

module.exports = authenticateJWT;
