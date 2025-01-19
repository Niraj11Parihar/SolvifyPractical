import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, getSchools } from "../../services/api";
import { GraduationCap, School, LogOut, Search, UserPlus, Building, Loader2 } from "lucide-react";

function User() {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    Promise.all([getStudents(token), getSchools(token)])
      .then(([studentsResponse, schoolsResponse]) => {
        setStudents(studentsResponse.data);
        setSchools(schoolsResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response || error);
        setError("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <Loader2 className="h-8 w-8 text-white animate-spin mb-4" />
        <p className="text-xl font-semibold text-white">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const groupedStudents = schools.reduce((acc, school) => {
    const filteredStudents = students
      .filter((student) => student.schoolId === school._id)
      .filter((student) => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    if (filteredStudents.length > 0) {
      acc[school._id] = filteredStudents;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Building className="h-10 w-10 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Academic Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg 
                     hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Students by School
                </h2>
              </div>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Schools List */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {Object.keys(groupedStudents).map((schoolId) => {
              const school = schools.find((s) => s._id === schoolId);
              return (
                <div key={schoolId} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 px-6 py-4 flex items-center border-b border-gray-200">
                    <School className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{school?.name}</h3>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="w-1/2 px-6 py-3 text-left text-lg font-semibold text-gray-900">Name</th>
                            <th className="w-1/4 px-6 py-3 text-left text-lg font-semibold text-gray-900">Age</th>
                            <th className="w-1/4 px-6 py-3 text-left text-lg font-semibold text-gray-900">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {groupedStudents[schoolId].map((student) => (
                            <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                              <td className="w-1/2 px-6 py-4 whitespace-nowrap text-lg text-gray-900">{student.name}</td>
                              <td className="w-1/4 px-6 py-4 whitespace-nowrap text-lg text-gray-600">{student.age}</td>
                              <td className="w-1/4 px-6 py-4 whitespace-nowrap text-lg text-gray-600">{student.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {(students.length === 0 || Object.keys(groupedStudents).length === 0) && (
              <div className="text-center py-16">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {students.length === 0 ? "No Students Found" : "No matching students"}
                </h3>
                <p className="text-gray-500">
                  {students.length === 0 
                    ? "Get started by adding your first student!"
                    : "Try adjusting your search criteria"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;