import React, { useEffect, useState } from "react";
import { UserCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllUser, getUser } from "../../services/api";
import Navbar from "./Navbar";
import AdminCountCards from "./adminCountCards";

function Admin() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    getUser(token)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    getAllUser(token)
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all users:", error);
      });
  }, [navigate]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-8">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-xl mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-6">
            Admin Dashboard
          </h1>

          <div className="relative flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            {/* Absolute Positioning for Logout Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none"
              >
                Logout
              </button>
            </div>

            {/* Profile Information */}
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <UserCircle className="w-20 h-20 text-indigo-600" />
            </div>
            <div className="ml-6 flex flex-col justify-center">
              <h2 className="sm:text-2xl font-bold text-gray-800">{`Welcome, ${user?.email}`}</h2>
              <p className="text-lg text-gray-600 mt-2">{`Role: ${user?.role}`}</p>
            </div>
          </div>
        </header>

        {/* Admin Count Cards */}
        <AdminCountCards />

        {/* All Users Section */}
        <div className="w-full">
          {user?.role === "admin" && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-indigo-500" />
                <h3 className="ml-3 text-xl font-semibold text-gray-800">
                  All Users
                </h3>
              </div>

              <div className="overflow-auto max-h-80">
                {allUsers.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-50 text-gray-800">
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((u) => (
                        <tr key={u._id} className="hover:bg-indigo-100">
                          <td className="p-2 border-t">{u.email}</td>
                          <td className="p-2 border-t">{u.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No users found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
