import React, { useState, useEffect } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent, getSchools } from "../../services/api";
import { GraduationCap, User, BookOpen, School as SchoolIcon, Edit, Trash2, Plus, X } from 'lucide-react';
import Navbar from "./Navbar";

const Student = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    schoolId: "",
  });
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    const fetchSchoolsAndStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const schoolResponse = await getSchools(token);
        setSchools(schoolResponse.data);

        const studentResponse = await getStudents(token);
        setStudents(studentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSchoolsAndStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editMode) {
        await updateStudent(currentStudentId, formData, token);
        setStudents((prev) =>
          prev.map((student) =>
            student._id === currentStudentId ? { ...student, ...formData } : student
          )
        );
        setEditMode(false);
        setCurrentStudentId(null);
      } else {
        await addStudent(formData, token);
        setStudents((prev) => [...prev, formData]);
      }

      setFormData({ name: "", age: "", grade: "", schoolId: "" });
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      age: student.age,
      grade: student.grade,
      schoolId: student.schoolId,
    });
    setEditMode(true);
    setCurrentStudentId(student._id);
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await deleteStudent(studentId, token);
        setStudents((prev) => prev.filter((student) => student._id !== studentId));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const groupStudentsBySchool = () => {
    return students.reduce((grouped, student) => {
      const schoolId = student.schoolId;
      if (!grouped[schoolId]) {
        grouped[schoolId] = [];
      }
      grouped[schoolId].push(student);
      return grouped;
    }, {});
  };

  const groupedStudents = groupStudentsBySchool();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
          </div>

          <div className="space-y-3">
            {/* form section */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                {editMode ? <Edit className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                {editMode ? "Edit Student" : "Add New Student"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="grade"
                    placeholder="Grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="relative">
                  <SchoolIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <select
                    name="schoolId"
                    value={formData.schoolId}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none bg-white"
                  >
                    <option value="">Select School</option>
                    {schools.map((school) => (
                      <option key={school._id} value={school._id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    {editMode ? (
                      <>
                        <Edit className="h-5 w-5 mr-2" />
                        Update
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5 mr-2" />
                        Add Student
                      </>
                    )}
                  </button>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setFormData({ name: "", age: "", grade: "", schoolId: "" });
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* students list section */}
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
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-100 text-left">
                              <th className="px-4 py-2 rounded-l-lg">Name</th>
                              <th className="px-4 py-2">Age</th>
                              <th className="px-4 py-2">Grade</th>
                              <th className="px-4 py-2 rounded-r-lg">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {groupedStudents[schoolId].map((student) => (
                              <tr key={student._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{student.name}</td>
                                <td className="px-4 py-3">{student.age}</td>
                                <td className="px-4 py-3">{student.grade}</td>
                                <td className="px-4 py-3">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEdit(student)}
                                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(student._id)}
                                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
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
        </div>
      </div>
    </>
  );
};

export default Student;