const Employee = require("../model/user");
const Contact = require("../model/contact");
const nodemailer = require('nodemailer');


const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kananimeet46867@gmail.com',
    pass: 'rwjdbxwvbramzgfs'     
} 
});

// Registration
exports.register = async (req, res) => {
  try {
    const newUser = await Employee.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err });
  }
};

//  Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Employee.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//  Contact form
exports.Contact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Error saving contact", error: err });
  }
};

// get contect details
exports.massage=async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
}



//  Send OTP
exports.emialotp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    await transporter.sendMail({
      from: 'kananimeet46687@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`
    });

    res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

//  Verify OTP
exports.verifyotp = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ message: 'OTP verified' });
  }
  return res.status(400).json({ message: 'Invalid OTP' });
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Employee.find({});
    // Format response to include `id`
    const formatted = users.map(u => ({
      id: u._id,
      name: u.name,
      email: u.email
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};