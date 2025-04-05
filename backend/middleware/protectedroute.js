import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedroute = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

     console.log("token",token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userid).select("-password"); 
    if (!user) {
      return res.status(404).json("User not found");
    }
     console.log(user);
     req.user= user;
    next();
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export default protectedroute;