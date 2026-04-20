// const { validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs');

// const db = require('../config/dbConnection');
// const register = (req , res)=> {
//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//       return res.status(400).json({errors:errors.array()});
//     }

//     db.query(
//       `select * from users where lower(email) = lower(${db.escape(
//         req.body.email
//       )});`,
//       (err, result)=>{
//         if(result && result.length){
//           return res.status(400).json({msg: 'Email already exists'});
//         }
//         else{
//           bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
//             if (err) throw err;
//             db.query(
//               `INSERT INTO users (name, email, password) VALUES (${db.escape(
//                 req.body.name
//               )}, ${db.escape(req.body.email)}, ${db.escape(hashedPassword)})`,
//               (err, result) => {
//                 if (err) throw err;
//                 res.json({msg: 'User registered successfully'});
//               }
//             );
//           });
//         }
//       }
//     )
// }

// module.exports = {
//   register
// }

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConnection');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful!", token });
  });
};

// Transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',  // Change to your email
    pass: 'your-email-password'  // Use App Password if 2FA is enabled
  }
});

// Forgot Password
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: "User not found!" });
    }

    const token = crypto.randomBytes(20).toString('hex');
    db.query("UPDATE users SET reset_token = ? WHERE email = ?", [token, email]);

    // Send Reset Email
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset Link',
      text: `Click the link to reset your password: http://localhost:3000/auth/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(500).json({ message: "Error sending email!" });
      res.json({ message: "Password reset email sent!" });
    });
  });
};

// Reset Password
exports.resetPassword = (req, res) => {
  const { token, newPassword } = req.body;

  db.query("SELECT * FROM users WHERE reset_token = ?", [token], async (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?", 
      [hashedPassword, token], (err, result) => {
        if (err) throw err;
        res.json({ message: "Password reset successfully!" });
      }
    );
  });
};

exports.getProfile = (req, res) => {
  db.query("SELECT id, name, email FROM users WHERE id = ?", [req.user.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};
