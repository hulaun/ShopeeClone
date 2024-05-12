require("dotenv").config();
const jwt = require("jsonwebtoken");

export function signJwt(object, options = {}) {
  return jwt.sign(
    object,
    process.env.ACCESS_TOKEN_SECRET,
    ...(options && options)
  );
}
export function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
