const express = require("express");
const { registration, login, getUser, getAllUsers } = require("../controller/authentication.controller");
const authMiddleware = require("../middleware/jwt");
const auth_router = express.Router();

auth_router.post("/registration", registration);
auth_router.post("/login", login);
auth_router.get("/getUser", authMiddleware, getUser);
auth_router.get("/getAllUser", getAllUsers);

module.exports = auth_router;