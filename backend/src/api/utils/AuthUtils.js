const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};

const signAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, loginKey: user.loginKey, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

const signRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, loginKey: user.loginKey, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
module.exports = {
  createSalt,
  hashPassword,
  signAccessToken,
  signRefreshToken,
  verifyToken,
};
