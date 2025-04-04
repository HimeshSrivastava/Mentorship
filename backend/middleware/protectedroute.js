import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedroute = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // console.log(req.headers);

     console.log("token",token)
    // if (!token) {
    //   return res.status(400).json("Token not found");
    // }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userid).select("-password"); 
    if (!user) {
      return res.status(404).json("User not found");
    }
     console.log(user);
     req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export default protectedroute;