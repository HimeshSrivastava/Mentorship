import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constant';

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/mentorship/requests`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleRequest = async (id, action) => {
    try {
      const endpoint = action === 'accept' ? '/mentorship/accept' : '/mentorship/decline';
      const response = await axios.post(
        `${API_URL}${endpoint}`,
        { requestId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );
      alert(response.data.message);
      setRequests((prev) => prev.filter((request) => request._id !== id));
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mentorship Requests</h2>
      {requests.map((request) => (
        <div key={request._id} className="mb-4 border p-4 rounded-lg bg-white shadow">
          <p>User: {request.senderName}</p>
          <div className="mt-2">
            <button
              onClick={() => handleRequest(request._id, 'accept')}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleRequest(request._id, 'decline')}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionRequests;
