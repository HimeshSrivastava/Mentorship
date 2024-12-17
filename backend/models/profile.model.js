import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
  //   id:{
  //     type:Number,
  //     required:true,
  // },
    role: {
      type: String,
      enum: ["Mentor", "Mentee"],
      required: true,

    },
    skillsInterests: {
      type: [String], // Array of strings for multi-select options
      required: true,
    },
    availability: {
      type: String, // Example: "Weekdays 6 PM - 9 PM"
      required: true,
    },
    goals: {
      shortTerm: {
        type: String,
        required: false,
        maxlength: 300, // Optional limit for short-term goals
      },
      longTerm: {
        type: String,
        required: false,
        maxlength: 300, // Optional limit for long-term goals
      },
    },
    socialProfiles: {
      linkedIn: {
        type: String,
        validate: {
          validator: (url) =>
            /^https?:\/\/(www\.)?linkedin\.com\/.+/.test(url),
          message: "Invalid LinkedIn URL",
        },
        required: false,
      },
      github: {
        type: String,
        validate: {
          validator: (url) =>
            /^https?:\/\/(www\.)?github\.com\/.+/.test(url),
          message: "Invalid GitHub URL",
        },
        required: false,
      },
    },
    bio: {
      type: String,
      maxlength: 500, // Optional short bio with character limit
      required: false,
    },
    profilePicture: {
      type: String, // URL to the profile picture
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);


export default mongoose.model("Profile", ProfileSchema);
