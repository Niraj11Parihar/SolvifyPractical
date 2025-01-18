import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/registration";
import Admin from "./components/Admin";
import User from "./components/User";
import Login from "./pages/login";
import Student from "./components/Student";
import School from "./components/School";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/student" element={<Student />} />
        <Route path="/school" element={<School/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
