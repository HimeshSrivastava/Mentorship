import axios from "axios";
import { API_URL } from "../constant";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [profiles, setProfiles] = useState([]);

  // Fetch all profiles
  const getAllProfiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/profiles`);
      if (res.data.success) {
        setProfiles(res.data.profiles);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  // Remove a profile by ID
  const removeProfile = async (id) => {
    try {
      const result = await axios.delete(`${API_URL}/api/profiles/${id}`);
      if (result.data.success) {
        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile._id !== id));
        console.log("Profile removed:", result.data);
      }
    } catch (error) {
      console.error("Error removing profile:", error);
    }
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <h1 className="text-3xl font-bold text-center mt-4 mb-4">All Profiles</h1>

      <div className="hidden md:flex justify-between px-4 py-2 bg-gray-200 text-lg font-semibold shadow-md">
        <p className="w-52 text-center">Role</p>
        <p className="w-52 text-center">Skills</p>
        <p className="w-44 text-center">Availability</p>
        <p className="w-44 text-center">Short-Term Goals</p>
        <p className="w-40  text-center pl-28">LinkedIn</p>
        <p className="w-40 text-center pl-36">GitHub</p>
        <p className="w-44 text-center pl-24">Remove</p>
      </div>

      <div className="flex-grow overflow-y-auto max-h-screen ">
        {profiles.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {profiles.map((profile) => (
              <li
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-md shadow-md"
                key={profile._id}
              >
                <p className="w-full md:w-1/6 text-center">{profile.role}</p>
                <p className="w-full md:w-1/6 text-center">
                  {profile.skillsInterests.join(", ")}
                </p>
                <p className="w-full md:w-1/6 text-center">{profile.availability}</p>
                <p className="w-full md:w-1/6 text-center">{profile.goals?.shortTerm || "N/A"}</p>
                <a
                  href={profile.socialProfiles?.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-1/6 text-center text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.socialProfiles?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-1/6 text-center text-blue-500 hover:underline"
                >
                  Github
                </a>
                <button
                  onClick={() => removeProfile(profile._id)}
                  className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                >
                  <img
                    src="https://cdn-icons-png.freepik.com/256/4682/4682137.png?semt=ais_hybrid"
                    alt="delete_icon"
                    className="w-6 h-6"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-4 text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;