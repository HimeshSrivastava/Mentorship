// import profileModel from "../models/profile.model.js";
import Profile from "../models/profile.model.js";
// import mongoose from "mongoose";

// Create or Update Profile
// export const upsertProfile = async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate('user'); 
//     let id;
    
//     if (profiles.length > 0) {
//       const last_profile_array = profiles.slice(-1); // Access the last profile
//       const last_profile = last_profile_array[0];
//       id = last_profile.id + 1; // Increment the ID
//     } else {
//       id = 1; // Start with ID 1 if no profiles exist
//     }

//     const {
//       role,
//       skillsInterests,
//       availability,
//       goals,
//       socialProfiles,
//       bio,
//       profilePicture,
//     } = req.body;

//     // Check for required fields
//     if (!id || !role || !skillsInterests || !availability || !goals || !socialProfiles || !bio) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     // Structure goals object correctly
//     const profileData = {
//       id: id, // Use the converted ObjectId
//       role,
//       skillsInterests,
//       availability,
//       goals: {
//         shortTerm: goals.shortTerm || "",
//         longTerm: goals.longTerm || "",
//       },
//       socialProfiles: {
//         linkedIn: socialProfiles.linkedIn || "",
//         github: socialProfiles.github || "",
//       },
//       bio,
//       profilePicture,
//     };

//     // Find or create the profile
//     const updatedProfile = await Profile.findOneAndUpdate(
//       { id }, // Search for the profile by ID
//       profileData,
//       { new: true, upsert: true } // Create if it doesn't exist
//     );

//     res.status(200).json({
//       success: true,
//       profile: updatedProfile,
//     });
//   } catch (error) {
//     console.error("Error creating or updating profile:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create or update profile",
//     });
//   }
// };
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



// Get Profile by User ID
// export const getProfile = async (req, res) => {
//   try {
//     const { userId } = req.params; 
//     console.log("Received userId:", userId); // Log the received userId

//     // Use findById to search for the profile
//     const profile = await Profile.findById(userId);


//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       profile,
//     });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch profile",
//     });
//   }
// };
// Get Profile by User ID
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
    const profile = await Profile.findOne({ user: userId });

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
