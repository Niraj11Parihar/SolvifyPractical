import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
      <div className="container mx-auto p-4">
        <ul className="flex justify-between items-center text-white font-semibold">
          <li className="hover:scale-110 transition transform">
            <Link to="/student" className="px-4 py-2 hover:text-indigo-200">
              Student Form
            </Link>
          </li>
          <li className="hover:scale-110 transition transform">
            <Link to="/school" className="px-4 py-2 hover:text-indigo-200">
              School Form
            </Link>
          </li>
          <li className="hover:scale-110 transition transform">
            <Link to="/admin" className="px-4 py-2 hover:text-indigo-200">
              Admin Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
