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

  const handlerequest=()=>{
    alert( "contact_no: 18969170");
  }

  if (!mentor) return <div className="loading">Loading...</div>;

  return (
    <div className="mentor-profile max-w-full max-h-full md:w-1/2 items-center mx-auto mt-7 justify-items-center p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="ml-4">
          <h2 className="text-3xl font-extrabold">{mentor.name}</h2>
          <p className="text-3xl font-bold text-gray-600">{mentor.role}</p>
        </div>
      </div>

      <p className="mt-4">{mentor.bio}</p>

      <h3 className="font-semibold mt-6">Skills and Interests</h3>
      <ul className="list-disc ml-4">
        {mentor.skillsInterests.map((skill, index) => (
          <li key={index} className="mt-1">- {skill}</li>
        ))}
      </ul>

      <h3 className="font-semibold mt-6">Goals</h3>
      <p>Short Term: {mentor.goals.shortTerm}</p>
      <p>Long Term: {mentor.goals.longTerm}</p>

      <h3 className="font-semibold mt-6">Availability</h3>
      <p>time slot: {mentor.availability}</p>

      <h3 className="font-semibold mt-6">Bio</h3>
      <p>Description: {mentor.bio}</p>


      <h3 className="font-semibold mt-6">Social Profiles</h3>
      <div className="flex space-x-4">
        <a href={mentor.socialProfiles.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          LinkedIn
        </a>
        <a href={mentor.socialProfiles.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub
        </a>
      </div>
      <img src="https://cdn-icons-png.freepik.com/256/9836/9836733.png?ga=GA1.1.639866762.1734408210&semt=ais_hybrid" alt="" className="w-10 h-10 m-5"  onClick={handlerequest}/>
    </div>
  );
};

export default ProfileDisplay;
