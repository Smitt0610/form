const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// POST /add employee
router.post("/add", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add employee", details: err.message });
  }
});

// GET all employees (optional)
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

module.exports = router;
