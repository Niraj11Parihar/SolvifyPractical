import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, getSchools } from "../../services/api";
import { GraduationCap, SchoolIcon} from "lucide-react";

function User() {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const groupedStudents = schools.reduce((acc, school) => {
    acc[school._id] = students.filter((student) => student.schoolId === school._id);
    return acc;
  }, {});

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-white">Students and Their Schools</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
    <GraduationCap className="h-5 w-5 mr-2" />
    Students by School
  </h3>
  <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
    {Object.keys(groupedStudents).map((schoolId) => {
      const school = schools.find((s) => s._id === schoolId);
      return (
        <div key={schoolId} className="bg-gray-50 rounded-lg p-5 border border-gray-100">
          <div className="flex items-center mb-4">
            <SchoolIcon className="h-5 w-5 text-indigo-600 mr-2" />

            <h4 className="text-lg font-semibold text-gray-900">{school?.name}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 rounded-l-lg">Name</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {groupedStudents[schoolId].map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.age}</td>
                    <td className="px-4 py-3">{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    })}
    {students.length === 0 && (
      <div className="text-center py-8 text-gray-500">
        <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-400" />
        <p>No students found. Add your first student!</p>
      </div>
    )}
  </div>
</div>


    </div>
  );
}

export default User;
