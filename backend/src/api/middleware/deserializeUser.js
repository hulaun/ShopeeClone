// const { verifyToken } = require("../utils/AuthUtils");

// const deserializeUser = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const accessToken =
//     req.cookies.accessToken || (authHeader && authHeader.split(" ")[1]);

//   if (!accessToken) {
//     return next();
//   }

//   const decoded = verifyToken(accessToken);

//   if (decoded) {
//     res.locals.user = decoded;
//   }
//   return next();
// };

// module.exports = deserializeUser;
