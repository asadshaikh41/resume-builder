const express = require("express");
require('./db');  // This will ensure that the MongoDB connection is established
const cors = require("cors");
const registerModel = require('./model');
const Resume = require('./resumeModel');  // Import the Resume model

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin : ["https://resume-builder-api-jade.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

// Register Route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await registerModel.findOne({ email: email.trim().toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await registerModel.create({
      name,
      email: email.trim().toLowerCase(),
      password, // Consider hashing the password for security
    });

    res.status(201).json({ message: "Registration successful", newUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user", details: err });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const user = await registerModel.findOne({ email });
    if (user && user.password === password) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err });
  }
});

// Save Resume Route
app.post("/saveResume", async (req, res) => {
  const { name, email, phone, address, skills, experience, education, institute, marks, passingYear, selectedOption, checked } = req.body;

  try {
    // Create a new resume object
    const newResume = new Resume({
      name,
      email,
      phone,
      address,
      skills,
      experience,
      education,
      institute,
      marks,
      passingYear,
      selectedOption,
      checked
    });

    // Save the resume to the database
    await newResume.save();
    res.status(201).json({ message: "Resume saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save resume", error: err });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
