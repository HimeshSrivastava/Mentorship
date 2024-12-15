// import axios from "axios";
// import { useRef } from "react"
// import { Link } from "react-router-dom"
// import { API_URL } from "../constant";
// import { useAuthContext } from "../contex/AuthContex";



// const Login = () => {
//   const {setAuthUser}=useAuthContext();
//   const emailref=useRef(null);
//   const passwordref=useRef(null);

//   const handleLoginbackend =async ()=>{
//     try {
//         const loginUser ={
//           email:emailref.current.value,
//           password:passwordref.current.value,
//         }


//       const result=await axios.post(`${API_URL}/api/auth/login`,loginUser);
//         localStorage.setItem("chat-User",JSON.stringify(result.data));
//         setAuthUser(result.data);

//     } catch (error) {
//       console.log(error);
//     }
//   }


//   return (
//     <div>
//       <div className="bg-[url('https://img.freepik.com/free-vector/medical-healthcare-blue-background-with-cardiograph_1017-17391.jpg?size=626&ext=jpg')] pt-8 bg-cover h-screen">
      
//       <div className="flex flex-col-reverse md:flex-row h-full w-full md:w-[900px] md:h-[400px] gap-16 items-start m-auto border-s-violet-950 bg-white pl-5">
//       <div className="flex flex-col w-1/2 h-1/2 gap-3 md:p-5">
//       <h1 className="font-bold text-xl md:text-2xl text-blue-900 ">Login to your account</h1>
//       <h3 className="font-bold text-sm md:text-xl text-blue-900">E-mail</h3>
//       <input ref={emailref} type="email" name="email" className="bg-slate-200 w-full" placeholder="Enter your email" required/>
//       <h3 className="font-bold text-xl text-blue-900">Password</h3>
//       <input ref={passwordref} type="text" className="bg-slate-200" name="password" placeholder="Enter your password" required/>
//       <p>I agree to the processing of personal data</p>
      
//       <button type="submit" className="bg-blue-700 w-28 h-8 text-lg rounded-sm" onClick={handleLoginbackend}>LOGIN</button>
//       <p>New to this site? <Link to="/signup">Registration</Link></p>
//       </div>
//        <div className="w-1/2 pt-2 h-1/2">
//                <img className="w-96 h-96" src="https://t3.ftcdn.net/jpg/00/63/74/62/360_F_63746248_ikHL5mQRmKXeWumLZk7ABJ9PT80VXjW5.jpg" alt=""/>
//              </div>
//       </div>
//           </div>
        
         
//     </div>
//   )
// }

// export default Login
import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constant";
import { useAuthContext } from "../contex/AuthContex";

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

      const result = await axios.post(`${API_URL}/api/auth/login`, loginUser);
      localStorage.setItem("chat-User", JSON.stringify(result.data));
      setAuthUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/medical-healthcare-blue-background-with-cardiograph_1017-17391.jpg?size=626&ext=jpg')`,
        }}>
          <div className="w-full h-full flex items-center justify-center bg-blue-900 bg-opacity-50">
            <img
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              src="https://t3.ftcdn.net/jpg/00/63/74/62/360_F_63746248_ikHL5mQRmKXeWumLZk7ABJ9PT80VXjW5.jpg"
              alt="Illustration"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Welcome Back</h1>
          <p className="text-sm text-gray-500 mb-6">Login to your account and start connecting!</p>

          <div className="space-y-4">
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

            <button
              type="button"
              onClick={handleLoginBackend}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white text-lg font-medium py-2 rounded-lg shadow-sm transition duration-200"
            >
              Login
            </button>

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
