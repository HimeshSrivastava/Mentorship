import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constant";
import { useAuthContext } from "../contex/AuthContex";

const Registration = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const genderRef = useRef(null);

  const { setAuthUser } = useAuthContext();

  const handleBackend = async () => {
    try {
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
        gender: genderRef.current.value,
      };

      // Form Validation
      if (!user.name || !user.email || !user.password || !user.confirmPassword || !user.gender) {
        alert("Please fill in all fields.");
        return;
      }

      if (user.password !== user.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const result = await axios.post(`${API_URL}/api/auth/signup`, user);

      // Save user data in local storage and update the auth context
      localStorage.setItem("chat-User", JSON.stringify(result.data));
      setAuthUser(result.data);
      console.log(result.data);
    } catch (error) {
      // Error Handling
      console.error("Error during signup:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://img.freepik.com/free-vector/medical-healthcare-blue-background-with-cardiograph_1017-17391.jpg?size=626&ext=jpg')`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center bg-blue-900 bg-opacity-50">
            <img
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              src="https://cdn.pixabay.com/photo/2019/10/02/04/40/registration-4519979_640.jpg"
              alt="Illustration"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Create an Account</h1>
          <p className="text-sm text-gray-500 mb-6">Sign up to get started!</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-3 py-2"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-3 py-2"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-3 py-2"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                ref={confirmPasswordRef}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-3 py-2"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                ref={genderRef}
                id="gender"
                name="gender"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-3 py-2"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleBackend}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white text-lg font-medium py-2 rounded-lg shadow-sm transition duration-200"
            >
              Create Account
            </button>

            <p className="text-sm text-gray-500 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
