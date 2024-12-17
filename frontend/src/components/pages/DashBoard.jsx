// import { useState, useEffect } from "react";

// const DashBoard = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Fetch the data from localStorage
//     const storedValue = localStorage.getItem("chat-User");

//     if (storedValue) {
//       try {
//         // Parse the stored string into an object
//         const parsedValue = JSON.parse(storedValue);
//         setData(parsedValue);
//       } catch (error) {
//         console.error("Error parsing localStorage data:", error);
//       }
//     }
//   }, []);

//   return (
//     <div>
//       {data ? (
//         <div>
//           <h2>User Details:</h2>
//           <p><strong>Name:</strong> {data.name}</p>
//           <p><strong>Email:</strong> {data.email}</p>
//           <p><strong>Gender:</strong> {data.gender}</p>
//           {/* <p><strong>Token:</strong> {data.token}</p> */}
//         </div>
//       ) : (
//         <p>No user data found</p>
//       )}
//     </div>
//   );
// };

// export default DashBoard;
import { useState, useEffect } from "react";

const DashBoard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedValue = localStorage.getItem("chat-User");
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
        setData(parsedValue);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-fit flex  justify-center bg-gray-50 md:w-full p-3">
      {data ? (
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg p-4 transition-all duration-300 hover:shadow-2xl">
          {/* Header Section */}
          <div className="text-center mb-4">
            <h1 className="text-5xl font-bold text-blue-600 mb-2">
              Welcome, {data.name.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-500 text-lg">
              Here’s your profile information.
            </p>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
              <p className="text-gray-600 text-sm font-medium">Full Name</p>
              <p className="text-gray-800 text-xl font-semibold">{data.name}</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
              <p className="text-gray-600 text-sm font-medium">Email</p>
              <p className="text-gray-800 text-xl font-semibold">{data.email}</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
              <p className="text-gray-600 text-sm font-medium">Gender</p>
              <p className="text-gray-800 text-xl font-semibold">{data.gender}</p>
            </div>

          </div>

          {/* Log Out Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                localStorage.removeItem("chat-User");
                window.location.reload();
              }}
              className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-all duration-300 shadow-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No User Data Found
          </h2>
          <p className="text-gray-500 text-lg">
            Please log in or sign up to access your dashboard.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashBoard;


