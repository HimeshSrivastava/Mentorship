import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constant";
import { useAuthContext } from "../contex/AuthContex";
import TextField from '@mui/material/TextField'
import { Button } from "@mui/material";

const Login = () => {
  const { setAuthUser } = useAuthContext();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLoginBackend = async () => {
    try {
      const loginUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      
      if (!loginUser.email || !loginUser.password) {
        alert("Please fill in all fields.");
        return;
      }

      const result = await axios.post(`${API_URL}/api/auth/login`, loginUser);

      localStorage.setItem("chat-User", JSON.stringify(result.data));
      setAuthUser(result.data);
    } catch (error) {
      // Error Handling
      alert("Login failed. Please check your credentials and try again.",error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-cover bg-center bg-white bg-opacity-95" style={{
          backgroundImage: `url('https://images.prismic.io/interiormg/ZkvehCol0Zci9TPt_IMG-Interior-Marketing-Group-New-York-285-Lafayette-Street-7AB-Living-Room.jpg?auto=format,compress&rect=220,0,1572,2667&w=442&h=750')`,
        }}>
          <div className="m-auto text-3xl font-bold bg-slate-100 p-4 bg-opacity-50">
            Login here
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 ">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Welcome Back</h1>
          <p className="text-sm text-gray-500 mb-6">Login to your account and start connecting!</p>

          <div className="space-y-4">
            <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <TextField
              id="email"
              inputRef={emailRef}
              placeholder="Type email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 px-3 py-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <TextField
                inputRef={passwordRef}
                id="password"
                className="w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agree"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I agree to the processing of personal data
              </label>
            </div>

            <Button
              size="large"
              variant="contained"
              onClick={handleLoginBackend}
              className="w-full  hover:bg-blue-800 hover:text-white text-lg font-medium rounded-lg shadow-sm transition duration-200"
            >
              Login
            </Button>

            <p className="text-sm text-gray-500 text-center">
              New to this site?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
