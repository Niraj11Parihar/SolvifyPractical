const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const auth_router = require("./router/auth.router");
const sch_router = require("./router/school.router");
const std_router = require("./router/student.router");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
  })
);
app.use(express.json());

app.use("/Auth", auth_router);
app.use("/School", sch_router);
app.use("/Student", std_router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port http://localhost:${PORT}`);
});
