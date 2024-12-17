import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login';
import ProfileSetup from './components/pages/ProfileSetup';
import Registeration from './components/pages/Registeration';
import { useAuthContext } from './components/contex/AuthContex';
import ProductList from './components/pages/ProductList';
import UserDiscovery from './components/pages/UserDiscovery';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProfileDisplay from './components/pages/ProfileDisplay';
import DashBoard from './components/pages/DashBoard';

function App() {
  const { authUser } = useAuthContext();
  
  return (
    <div>
      <Navbar />
      {authUser ? (
        <div className="bg-gray-100 min-h-screen flex gap-10">
          <Sidebar />
          <Routes>
            {/* <Route path="/" element={<UserDiscovery/>}/> */}
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/filterProfile" element={<UserDiscovery />} />
            <Route path="/profilelist" element={<ProductList />} />
            <Route path="/profile-display/:userId" element={<ProfileDisplay />} />
            <Route path="/createProfile" element={<ProfileSetup />} />
            <Route path="*" element={<DashBoard/>}/>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/signup" element={<Registeration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
