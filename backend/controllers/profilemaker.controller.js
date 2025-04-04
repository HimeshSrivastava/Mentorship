// import profileModel from "../models/profile.model.js";
import mongoose from "mongoose";
import Profile from "../models/profile.model.js";

export const upsertProfile = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from middleware
    const {
      role,
      skillsInterests,
      availability,
      goals,
      socialProfiles,
      bio,
      profilePicture,
    } = req.body;
    
    // Check for required fields
    if (!role || !skillsInterests || !availability || !goals || !socialProfiles || !bio) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Structure goals object correctly
    const profileData = {
      user: userId,
      role,
      skillsInterests,
      availability,
      goals: {
        shortTerm: goals.shortTerm || "",
        longTerm: goals.longTerm || "",
      },
      socialProfiles: {
        linkedIn: socialProfiles.linkedIn || "",
        github: socialProfiles.github || "",
      },
      bio,
      profilePicture,
    };

    // Check if profile already exists for this user
    const existingProfile = await Profile.findOne({ user: userId });

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: userId },
        profileData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    } else {
      // Create new profile
      const newProfile = await Profile.create(profileData);

      return res.status(201).json({
        success: true,
        message: "Profile created successfully",
        profile: newProfile,
      });
    }
  } catch (error) {
    console.error("Error creating or updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create or update profile",
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from URL params
    console.log("Received userId:", userId);

    // Validate that userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    // Find profile by userId
    const profile = await Profile.findById(userId);
    console.log("Profile Query Result:", profile); // Log the result
    

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};


// Delete Profile by User ID
export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params; // This userId will actually be the _id in your database
  
    const deletedProfile = await Profile.findByIdAndDelete(userId);

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete profile",
    });
  }
};


// Get All Profiles (with optional filtering)
export const getAllProfiles = async (req, res) => {
  try {
    const { role, skills, availability } = req.query;

    let query = {};

    if (role) {
      query.role = role; // Filter by Mentor or Mentee
    }

    if (skills) {
      const skillArray = skills.split(",").map((skill) => skill.trim());
      query.skillsInterests = { $in: skillArray }; // Match any of the provided skills
    }

    if (availability) {
      query.availability = { $regex: availability, $options: "i" }; 
    }

    const profiles = await Profile.find(query);

    res.status(200).json({
      success: true,
      profiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
    });
  }
};
