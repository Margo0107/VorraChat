const jwt = require("jsonwebtoken");

const authorWiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
module.exports = authorWiddleware;
