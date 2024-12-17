import { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../constant";
import {toast} from "react-hot-toast";

const ProfileSetup = () => {
  const [image, setImage] = useState(null); // For profile picture
  const roleRef = useRef(null);
  const skillsInterestsRef = useRef(null);
  const availabilityRef = useRef(null);
  const shortTermGoalRef = useRef(null);
  const longTermGoalRef = useRef(null);
  const linkedInRef = useRef(null);
  const githubRef = useRef(null);
  const bioRef = useRef(null);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const setupProfile = async () => {
    try {
      const profileData = {
        role: roleRef.current?.value || "",
        skillsInterests: skillsInterestsRef.current?.value.split(",") || [],
        availability: availabilityRef.current?.value || "",
        goals: {
          shortTerm: shortTermGoalRef.current?.value || "",
          longTerm: longTermGoalRef.current?.value || "",
        },
        socialProfiles: {
          linkedIn: linkedInRef.current?.value || "",
          github: githubRef.current?.value || "",
        },
        bio: bioRef.current?.value || "",
        profilePicture: "",
      };

      // Upload Profile Picture (if selected)
      if (image) {
        let formData = new FormData();
        formData.append("product", image);

        const res = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data?.image_url) {
          profileData.profilePicture = res.data.image_url;
        }
      }

      // Save or Update Profile Data
      const userData = localStorage.getItem("chat-User"); // Retrieve the value from localStorage
let token = "";

if (userData) {
  try {
    const parsedUserData = JSON.parse(userData); // Parse the string into an object
    token = parsedUserData?.token || ""; // Extract the token property
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }
}

if (!token) {
  console.error("Token not found in localStorage");
  alert("You must be logged in to perform this action.");
  return;
}
      const result = await axios.post(`${API_URL}/api/profiles/upsert`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });

      if (result?.data?.success) {
        toast.success("Profile Created");;
        alert("Profile is setup");
      }
    } catch (error) {
      console.error("Error setting up profile:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-2xl p-4">
      <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Role</h2>
        <select
          ref={roleRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          name="role"
          id="role"
        >
          <option value="Mentor">Mentor</option>
          <option value="Mentee">Mentee</option>
        </select>

        <h2 className="text-lg font-semibold">Skills/Interests (comma-separated)</h2>
        <input
          ref={skillsInterestsRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          type="text"
          placeholder="e.g., JavaScript, React, Node.js"
        />

        <h2 className="text-lg font-semibold">Availability</h2>
        <input
          ref={availabilityRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          type="text"
          placeholder="e.g., Weekdays 6 PM - 9 PM"
        />

        <h2 className="text-lg font-semibold">Short-Term Goal</h2>
        <textarea
          ref={shortTermGoalRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          rows="2"
          placeholder="Short-term goal"
        ></textarea>

        <h2 className="text-lg font-semibold">Long-Term Goal</h2>
        <textarea
          ref={longTermGoalRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          rows="2"
          placeholder="Long-term goal"
        ></textarea>

        <h2 className="text-lg font-semibold">LinkedIn Profile</h2>
        <input
          ref={linkedInRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          type="text"
          placeholder="https://www.linkedin.com/in/your-profile"
        />

        <h2 className="text-lg font-semibold">GitHub Profile</h2>
        <input
          ref={githubRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          type="text"
          placeholder="https://www.github.com/your-profile"
        />

        <h2 className="text-lg font-semibold">Bio</h2>
        <textarea
          ref={bioRef}
          className="bg-slate-200 rounded-sm p-2 w-full"
          rows="4"
          placeholder="Tell us about yourself"
        ></textarea>

        <div className="flex flex-col items-center">
          <label htmlFor="file-input">
            <img
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-md"
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://cdn-icons-png.freepik.com/256/16816/16816945.png?ga=GA1.1.1340374240.1733212174&semt=ais_hybrid"
              }
              alt=""
            />
          </label>
          <input
            onChange={imageHandler}
            className="bg-slate-200 rounded-sm hidden"
            type="file"
            name="image"
            id="file-input"
          />
        </div>
        <button
          onClick={setupProfile}
          className="bg-zinc-400 p-3 text-lg sm:text-xl rounded-md hover:bg-zinc-500 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
