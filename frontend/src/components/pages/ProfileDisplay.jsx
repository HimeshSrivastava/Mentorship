import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constant";

const ProfileDisplay = () => {
  const { userId } = useParams(); 
  const [mentor, setMentor] = useState(null);
  useEffect(() => {
    const fetchMentorProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profiles/${userId}`);
        setMentor(response.data.profile);
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
      }
    };

    fetchMentorProfile();
  }, [userId]);

  if (!mentor) return <div>Loading...</div>;

  return (
    <div className="mentor-profile max-w-2xl p-4 bg-white rounded-md">
      <img
        src={mentor.profilePicture || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-32 h-32 rounded-full"
      />
      <h2 className="text-2xl font-bold">{mentor.name}</h2>
      <p className="text-lg">{mentor.role}</p>
      <p className="mt-2">{mentor.bio}</p>

      <h3 className="font-semibold mt-4">Skills and Interests</h3>
      <ul>
        {mentor.skillsInterests.map((skill, index) => (
          <li key={index}>- {skill}</li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4">Goals</h3>
      <p>Short Term: {mentor.goals.shortTerm}</p>
      <p>Long Term: {mentor.goals.longTerm}</p>

      <h3 className="font-semibold mt-4">Social Profiles</h3>
      <a href={mentor.socialProfiles.linkedIn} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <br />
      <a href={mentor.socialProfiles.github} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </div>
  );
};

export default ProfileDisplay;
