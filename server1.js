const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DBUSERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// JWT Secret
const JWT_SECRET = "your_jwt_secret";

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_email_password",
  },
});

// Register endpoint
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(400).json({ error: "User already exists" });
    res.status(201).json({ message: "User registered successfully" });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email,role: user.role } });
  });
});

// Forgot password endpoint
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.status(400).json({ error: "User not found" });

    const user = result[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "10m" });

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email error:", err); // Logs exact error
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Password reset link sent to your email" });
    });
  });
});

// Reset password endpoint
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "UPDATE users SET password = ? WHERE id = ?";
    db.query(sql, [hashedPassword, decoded.id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Password reset successfully" });
    });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

const querystring = require('querystring');
const axios = require('axios');

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange authorization code for tokens
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: '174309633375-kdevml88gr8793kp2pn4f6qpel57iihe.apps.googleusercontent.com',
      client_secret: 'YOUR_CLIENT_SECRET',
      code,
      redirect_uri: 'http://localhost:5173/auth/callback',
      grant_type: 'authorization_code'
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Check if user exists in your database or create new user
    // Then generate your own JWT token and redirect
    const token = generateYourJWTToken(profile); // Implement this function
    
    // Redirect to frontend with token
    res.redirect('http://localhost:5173/?token=' + token);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('http://localhost:5173?error=google_auth_failed');
  }
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token." });

    req.user = user; // contains id and role
    next();
  });
}

module.exports = authenticateToken;

app.get("/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const userQuery = `SELECT name, email FROM users WHERE id = ?`;
  const profileQuery = `SELECT * FROM profiles WHERE user_id = ?`;

  db.query(userQuery, [userId], (err, userResult) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (userResult.length === 0) return res.status(404).json({ error: "User not found" });

    db.query(profileQuery, [userId], (err, profileResult) => {
      if (err) return res.status(500).json({ error: "Database error" });
      
      const profileData = profileResult.length > 0 ? profileResult[0] : {};
      res.json({
        user_name: userResult[0].name,
        user_email: userResult[0].email,
        profile: {
          bio: profileData.bio || "",
          skills: JSON.parse(profileData.skills || "[]"),
          education: JSON.parse(profileData.education || "[]"),
          certifications: JSON.parse(profileData.certifications || "[]"),
          interests: JSON.parse(profileData.interests || "[]"),
          clubs: JSON.parse(profileData.clubs || "[]"),
          socialLinks: JSON.parse(profileData.social_links || "{}")
        }
      });
    });
  });
});

app.put("/profile", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { bio, skills, education, certifications, interests, clubs, socialLinks } = req.body;

  const query = `
    INSERT INTO profiles (user_id, bio, skills, education, certifications, interests, clubs, social_links)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      bio = VALUES(bio),
      skills = VALUES(skills),
      education = VALUES(education),
      certifications = VALUES(certifications),
      interests = VALUES(interests),
      clubs = VALUES(clubs),
      social_links = VALUES(social_links)
  `;

  db.query(query, [
    userId,
    bio,
    JSON.stringify(skills),
    JSON.stringify(education),
    JSON.stringify(certifications),
    JSON.stringify(interests),
    JSON.stringify(clubs),
    JSON.stringify(socialLinks)
  ], (err, result) => {
    if (err) {
      console.log("Database error:", err);  // debug print
      return res.status(500).json({ error: "Database error while saving profile" });
    }
    res.json({ message: "Profile saved successfully" });
  });
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));