const express = require("express");
const {
  addSchool, getSchool, updateSchool, deleteSchool,
} = require("../controller/school.controller");
const authMiddleware = require("../middleware/jwt");
const sch_router = express.Router();

sch_router.post("/addSchools", authMiddleware, addSchool);
sch_router.get("/getSchools", authMiddleware, getSchool);
sch_router.put("/updateSchool/:id", authMiddleware, updateSchool);
sch_router.delete("/deleteSchool/:id", authMiddleware, deleteSchool);

module.exports = sch_router;
