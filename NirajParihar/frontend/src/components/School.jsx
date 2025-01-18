import React, { useState, useEffect } from "react";
import { getSchools, addSchool, deleteSchool, updateSchool } from "../../services/api";
import { School as SchoolIcon, MapPin, Phone, Mail, Edit, Trash2, Plus, X } from 'lucide-react';
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const School = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [schools, setSchools] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getSchools(token);
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
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
        confirmAlert({
          title: 'Confirm Update',
          message: 'Are you sure you want to update this school?',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => {
                try {
                  await updateSchool(editId, formData, token);
                  setSchools((prev) =>
                    prev.map((school) =>
                      school._id === editId ? { ...school, ...formData } : school
                    )
                  );
                  setEditMode(false);
                  setEditId(null);
                  toast.success('School updated successfully!');
                } catch (error) {
                  console.error("Error updating school:", error);
                  toast.error('Failed to update school. Please try again.');
                }
              }
            },
            {
              label: 'No',
              onClick: () => toast.info('Update operation cancelled.')
            }
          ]
        });
      } else {
        const response = await addSchool(formData, token);
        setSchools((prev) => [...prev, response.data]);
        toast.success("School added successfully!");
      }

      setFormData({ name: "", address: "", phone: "", email: "" });
    } catch (error) {
      console.error("Error submitting school data:", error);
      toast.error("Failed to submit school data.");
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this school?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const token = localStorage.getItem("token");
              await deleteSchool(id, token);
              setSchools((prev) => prev.filter((school) => school._id !== id));
              toast.success("School deleted successfully!");
            } catch (error) {
              console.error("Error deleting school:", error);
              toast.error("Failed to delete school. Please try again.");
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.info('Delete operation cancelled.')
        }
      ]
    });
  };

  const handleEdit = (school) => {
    setFormData({
      name: school.name,
      address: school.address,
      phone: school.phone,
      email: school.email,
    });
    setEditMode(true);
    setEditId(school._id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <SchoolIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">School Management</h2>
          </div>

          <div className="space-y-3">
            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                {editMode ? <Edit className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                {editMode ? "Update School" : "Add New School"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <SchoolIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="School Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Location"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
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
                        Add School
                      </>
                    )}
                  </button>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setFormData({ name: "", address: "", phone: "", email: "" });
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

            {/* Schools List Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <SchoolIcon className="h-5 w-5 mr-2" />
                School List
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {schools.map((school) => (
                  <div key={school._id} className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{school.name}</h4>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {school.address}
                      </p>
                      <p className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {school.phone}
                      </p>
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {school.email}
                      </p>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => handleEdit(school)}
                        className="flex items-center px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(school._id)}
                        className="flex items-center px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {schools.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <SchoolIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No schools found. Add your first school!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default School;