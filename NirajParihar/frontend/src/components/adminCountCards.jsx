import React, { useState, useEffect } from 'react';
import { getStudents, getSchools } from "../../services/api"; // Import your API functions

function AdminCountCards() {
  const [schoolsCount, setSchoolsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        // fetch schools count
        const schoolResponse = await getSchools(token);
        setSchoolsCount(schoolResponse.data.length);

        // fetch students count
        const studentResponse = await getStudents(token);
        setStudentsCount(studentResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 p-6">
      {/* schools section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-white">Schools</h3>
        <p className="text-4xl font-bold text-white mt-2">{schoolsCount}</p>
        <div className="mt-4 text-4xl text-white opacity-75">
          <span role="img" aria-label="school">🏫</span>
        </div>
      </div>

      {/* students section */}
      <div className="bg-gradient-to-r from-teal-600 to-green-500 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-white">Students</h3>
        <p className="text-4xl font-bold text-white mt-2">{studentsCount}</p>
        <div className="mt-4 text-4xl text-white opacity-75">
          <span role="img" aria-label="student">🎓</span>
        </div>
      </div>
    </div>
  );
}

export default AdminCountCards;
