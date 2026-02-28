import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Not Authorized to Access" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Invalid Token ${error}` });
  }
};
export default isAuth;
