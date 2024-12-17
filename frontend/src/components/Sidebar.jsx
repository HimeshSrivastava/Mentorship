import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-3 m-4'>
     <Link to="/createProfile">
        <div className="flex gap-2 items-center max-w-fit bg-slate-300 p-3 rounded-md w-32 md:w-full hover:bg-slate-400 transition">
          <img
            className="w-6 h-6 md:w-10 md:h-10"
            src="https://cdn-icons-png.freepik.com/256/10553/10553142.png?ga=GA1.1.1340374240.1733212174&semt=ais_hybrid"
            alt="Add Product"
          />
          <h2 className="text-sm md:text-lg font-medium text-center md:text-left">
           Create Profile
          </h2>
        </div>
      </Link>
      <Link to="/profilelist">
        <div className="flex gap-4 items-center bg-slate-300 p-3 rounded-md w-full hover:bg-slate-400 transition">
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src="https://cdn-icons-png.freepik.com/256/17551/17551239.png?ga=GA1.1.1340374240.1733212174&semt=ais_hybrid"
            alt="Product List"
          />
          <h2 className="text-sm md:text-lg font-medium text-center md:text-left">
            Profile List
          </h2>
        </div>
      </Link>
      <Link to="/filterProfile">
        <div className="flex gap-4 items-center bg-slate-300 p-3 rounded-md w-full hover:bg-slate-400 transition">
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src="https://cdn-icons-png.freepik.com/256/4124/4124382.png?ga=GA1.1.316645646.1734244423&semt=ais_hybrid"
            alt="Product List"
          />
          <h2 className="text-sm md:text-lg font-medium text-center md:text-left">
           Filter Profile
          </h2>
        </div>
      </Link>

    </div>
  );
};

export default Sidebar;

