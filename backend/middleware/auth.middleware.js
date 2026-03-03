import jwt from "jsonwebtoken";

const protectAdmin = (req, res, next) => {
  let token;

  // Expect header: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id; // attach admin id
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

export default protectAdmin;