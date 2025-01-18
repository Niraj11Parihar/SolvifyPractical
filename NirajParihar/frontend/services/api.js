import axios from "axios";

const BASE_URL = "http://localhost:4999";

// Authentication
export const registerUser = (data) =>
  axios.post(`${BASE_URL}/Auth/registration`, data);

export const loginUser = (data) => axios.post(`${BASE_URL}/Auth/login`, data);

export const getUser = (token) =>
  axios.get(`${BASE_URL}/Auth/getUser`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllUser = (token) =>
  axios.get(`${BASE_URL}/Auth/getAllUser`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// School
export const addSchool = (data, token) =>
  axios.post(`${BASE_URL}/School/addSchools`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const getSchools = (token) =>
    axios.get(`${BASE_URL}/School/getSchools`, {
      headers: { Authorization: `Bearer ${token}` },
    });

export const updateSchool = (id, data, token) =>
  axios.put(`${BASE_URL}/School/updateSchool/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteSchool = (id, token) =>
  axios.delete(`${BASE_URL}/School/deleteSchool/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Student
export const addStudent = (data, token) =>
  axios.post(`${BASE_URL}/Student/addStudent`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const getStudents = (token) =>
    axios.get(`${BASE_URL}/Student/getStudent`, {
      headers: { Authorization: `Bearer ${token}` },
    });

export const updateStudent = (id, data, token) =>
  axios.put(`${BASE_URL}/Student/updateStudent/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteStudent = (id, token) =>
  axios.delete(`${BASE_URL}/Student/deleteStudent?id=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
