const express = require("express");
const { addStudent, getStudent, updateStudent, deleteStudent } = require("../controller/student.controller");
const authMiddleware = require("../middleware/jwt");
const std_router = express.Router();

std_router.post("/addStudent", authMiddleware, addStudent);
std_router.get("/getStudent", authMiddleware, getStudent);
std_router.put("/updateStudent/:id", authMiddleware, updateStudent);
std_router.delete("/deleteStudent/:id", authMiddleware, deleteStudent);

module.exports = std_router