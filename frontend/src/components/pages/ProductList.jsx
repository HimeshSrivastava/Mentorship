import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../constant";
import { useNavigate } from "react-router-dom";


const ProductList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  // Fetch all profiles
  const getAllProfiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/profiles`);
      if (res.data.success) {
        setProfiles(res.data.profiles);
      }
    } catch (error) {
      setError("Error fetching profiles, please try again.",error);
    } finally {
      setLoading(false);
    }
  };

  // Remove a profile by ID
  const removeProfile = async (id) => {
    try {
      const result = await axios.delete(`${API_URL}/api/profiles/${id}`);
      if (result.data.success) {
        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile._id !== id));
      }
    } catch (error) {
      setError("Error removing profile, please try again.", error);
    }
  };

  const selectProfile=(userId)=>{
         navigate(`/profile-display/${userId}`);
  }


  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mt-4 mb-4">All Profiles</h1>

      {/* Loading or Error Handling */}
      {loading ? (
        <p className="text-center mt-4 text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : (
        <>
          {/* Scrollable Profile List */}
          <div className="flex-grow overflow-y-auto max-h-screen px-4">
            <div className="flex flex-wrap gap-6 justify-center">
              {profiles.map((profile) => (
                <div
                  key={profile._id}
                  className="w-full sm:w-72 bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
                >
                  {/* Profile Header */}
                  <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-300 p-4">
                    <h2 className="text-white text-xl font-semibold">{profile.role}</h2>
                  </div>

                  {/* Profile Content */}
                  <div className="p-6 flex flex-col gap-4">
                    {/* Skills */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-700 font-semibold text-sm">Skills/Interests</h3>
                      <p className="text-gray-600 text-sm">{profile.skillsInterests.join(", ")}</p>
                    </div>

                    {/* Availability */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-700 font-semibold text-sm">Availability</h3>
                      <p className="text-gray-600 text-sm">{profile.availability}</p>
                    </div>

                    {/* Goals */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-700 font-semibold text-sm">Short-Term Goal</h3>
                      <p className="text-gray-600 text-sm">{profile.goals?.shortTerm || "N/A"}</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-between items-center">
                      <a
                        href={profile.socialProfiles?.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm hover:underline"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={profile.socialProfiles?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm hover:underline"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center">
                    <button
                      onClick={() => selectProfile(profile._id)}
                      className="w-10 h-10  rounded-full flex items-center justify-center  transition"
                    >
                      <img
                        src="https://cdn-icons-png.freepik.com/256/1265/1265907.png?ga=GA1.1.316645646.1734244423&semt=ais_hybrid"
                        alt="delete_icon"
                        className="w-9 h-9"
                      />
                    </button>
                  </div>
                  {/* Delete Button */}
                  <div className="p-4 flex justify-center">
                    <button
                      onClick={() => removeProfile(profile._id)}
                      className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                    >
                      <img
                        src="https://cdn-icons-png.freepik.com/256/4682/4682137.png?semt=ais_hybrid"
                        alt="delete_icon"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
