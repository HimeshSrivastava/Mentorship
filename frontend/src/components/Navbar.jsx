// import { Link } from "react-router-dom";
import LogoutButton from "./pages/LogoutButton";


const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-orange-200 h-24">
      <div className="flex items-center  p-4  gap-4">
        
        <img 
          className="w-16 h-16 md:w-20 md:h-20" 
          src="https://cdn-icons-png.freepik.com/256/5950/5950934.png?ga=GA1.1.316645646.1734244423&semt=ais_hybrid" 
          alt="logo" 
        />
        
       
        <p className="text-xl font-bold text-center md:text-2xl">
          MentorShip Plateform
        </p>
      </div>
      <div className="flex gap-4">
        <LogoutButton/>
      </div>
    </div>
  );
};

export default Navbar;

