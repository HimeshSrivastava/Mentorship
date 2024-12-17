import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constant";

const SendingConnections = () => {
  const [users, setUsers] = useState([]); // List of mentors
  const [status, setStatus] = useState({}); // Tracks request status
  const [loggedInUser, setLoggedInUser] = useState(null); // Logged-in user details

  // Fetch logged-in user details from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-User"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  // Fetch mentors (example API call)
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profiles`);
        if (res.data.success) {
          setUsers(res.data.profiles);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  // Handle sending connection request
  const handleSendRequest = async (mentorEmail) => {
    if (!loggedInUser) {
      alert("Please log in to send connection requests.");
      return;
    }

    try {
      const payload = {
        senderName: loggedInUser.name, // Logged-in user's name
        senderEmail: loggedInUser.email, // Logged-in user's email
        mentorEmail, // Mentor's email to whom the request is being sent
      };

      await axios.post("/api/connections/send-request", payload); // Replace with your API endpoint
      setStatus((prev) => ({ ...prev, [mentorEmail]: "Request Sent" }));
    } catch (error) {
      console.error("Error sending connection request:", error);
      setStatus((prev) => ({ ...prev, [mentorEmail]: "Failed to Send" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Send Connection Requests
      </h1>

      {loggedInUser ? (
        <p className="text-sm text-gray-500 mb-6">
          Logged in as: <strong>{loggedInUser.name}</strong> ({loggedInUser.email})
        </p>
      ) : (
        <p className="text-red-500 mb-6">Please log in to send requests.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.email}
            className="p-4 bg-white shadow-md rounded-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <button
              onClick={() => handleSendRequest(user.email)}
              className={`mt-4 w-full py-2 text-white rounded-md ${
                status[user.email] === "Request Sent"
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={status[user.email] === "Request Sent"}
            >
              {status[user.email] || "Send Request"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendingConnections;
