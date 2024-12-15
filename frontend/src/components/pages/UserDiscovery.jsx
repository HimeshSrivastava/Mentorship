import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constant";

function UserDiscovery() {
  const [users, setUsers] = useState([]);
  const [countDislikes, setCountDislikes] = useState(1);
  const [countLikes, setCountlikes] = useState(1);
  const [filters, setFilters] = useState({
    role: "",
    availability: "",
    skills: "",
  });

  
    const increaseLikeCount = () => {
      setCountlikes(prev => prev + 1);
    };

    const increaseDisLikeCount = () => {
      setCountDislikes(prev => prev + 1);
    };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profiles`, {
          params: filters, // Pass filters as query parameters
        });
        setUsers(response.data.profiles || []); // Adjusted based on expected API response structure
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Discover Users</h1>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={filters.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-2"
              placeholder="e.g., Mentor or Mentee"
            />
          </div>
          <div>
            <label className="block font-medium">Availability (hours/week)</label>
            <input
              type="text"
              name="availability"
              value={filters.availability}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-2"
              placeholder="e.g., Weekdays 6 PM - 9 PM"
            />
          </div>
          <div>
            <label className="block font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mt-2"
              placeholder="e.g., React, Node.js"
            />
          </div>
        </div>
      </div>

      {/* Users Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Availability:</strong> {user.availability}</p>
              <p><strong>Skills:</strong> {user.skillsInterests?.join(", ")}</p>
              <button onClick={increaseLikeCount}>Likes:{countLikes}</button>
              <button onClick={increaseDisLikeCount}>dislikes:{countDislikes}</button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No users found. Adjust your filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserDiscovery;
