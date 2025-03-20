const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    res.status(401).json({
      message: "You are not logged in",
    });
  }

  if (!token) return res.status(404).json({ message: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decoded.id;

  next();
};

module.exports = authMiddleware;
