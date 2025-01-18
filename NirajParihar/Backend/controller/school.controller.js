const schoolModel = require("../model/school.model");
const studentModel = require("../model/student.model");

const addSchool = async (req, res) => {
  try {
    const school = new schoolModel(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSchool = async (req, res) => {
  try {
    const schools = await schoolModel.find({});
    res.json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSchool = async (req, res) => {
  try {
    const school = await schoolModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }
    res.json(school);
  } catch (error) {
    console.error("Error updating school:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const schoolId = req.params.id;

    const school = await schoolModel.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    const students = await studentModel.find({ schoolId: schoolId });
    if (students.length > 0) {
      await studentModel.deleteMany({ schoolId: schoolId });
    }

    await schoolModel.findByIdAndDelete(schoolId);

    res.json({ message: "School and related students deleted successfully" });
  } catch (error) {
    console.error("Error deleting school:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  addSchool,
  getSchool,
  updateSchool,
  deleteSchool,
};
