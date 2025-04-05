import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import generatewebtoken from "../Utils/generatewebtoken.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, gender } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        console.log(user);
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            gender,
        });

        console.log(newUser);
        await newUser.save();
        const token = generatewebtoken(newUser._id);
        
        
        return res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            gender: newUser.gender,
            token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Server error during signup" });
    }
};

export const login =async(req,res)=>{
       
   const {email, password}=req.body;
    const user=await User.findOne({email});
    const ispasswordcorrect=await bcrypt.compare(password,user?.password || "");

    if(user && ispasswordcorrect){
       const token= generatewebtoken(user._id, res);
        
            return res.status(200).json({
                name: user.name,
                email: user.email,
                gender: user.gender,
                token,
            });
    }
    else{
        return res.status(400).json({error:"invalid credential"});
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const saveProfile = async (req, res) => {
    try {
      const profile = new Profile({
        userId: req.user.id, // Assumes user is authenticated
        role: req.body.role,
        skillsInterests: req.body.skillsInterests,
        availability: req.body.availability,
        goals: req.body.goals,
        socialProfiles: req.body.socialProfiles,
        bio: req.body.bio,
        profilePicture: req.body.profilePicture,
      });
  
      await profile.save();
      res.status(201).json({ success: true, profile });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };