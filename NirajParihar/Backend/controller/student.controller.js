const studentModel = require("../model/student.model");

const addStudent = async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getStudent = async (req, res) => {
  try {
    const students = await studentModel.find({});
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await studentModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
};
